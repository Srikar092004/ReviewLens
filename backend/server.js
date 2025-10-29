const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'reviewlens_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// ============ AUTH ROUTES ============

// Register new user
app.post('/api/auth/register', (req, res) => {
    const { username, email, password } = req.body;
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    
    db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Username or email already exists' });
            }
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: result.insertId, username, email, message: 'Registration successful' });
    });
});

// Login user
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT id, username, email FROM users WHERE email = ? AND password = ?';
    
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.json(results[0]);
    });
});

// ============ EXISTING ROUTES ============

app.get('/api/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.get('/api/products/:id', (req, res) => {
    const productSql = 'SELECT * FROM products WHERE id = ?';
    const reviewsSql = 'SELECT r.*, u.username FROM reviews r LEFT JOIN users u ON r.user_id = u.id WHERE r.product_id = ? ORDER BY r.id DESC';
    
    db.query(productSql, [req.params.id], (err, productResults) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        db.query(reviewsSql, [req.params.id], (err, reviewResults) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            
            res.json({
                product: productResults[0],
                reviews: reviewResults
            });
        });
    });
});

app.get('/api/reviews', (req, res) => {
    const sql = `
        SELECT 
            r.*, 
            p.name as product_name, 
            p.category, 
            COALESCE(u.username, r.reviewer_name) as display_name,
            r.reviewer_name,
            r.platform
        FROM reviews r 
        JOIN products p ON r.product_id = p.id 
        LEFT JOIN users u ON r.user_id = u.id 
        ORDER BY r.id DESC
    `;
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Reviews query error:', err);
            return res.status(500).json({ error: err.message });
        }
        
        // Ensure platform exists for all reviews
        const processedResults = results.map(review => ({
            ...review,
            platform: review.platform || 'Amazon',
            reviewer_name: review.display_name || review.reviewer_name
        }));
        
        res.json(processedResults);
    });
});


app.get('/api/reviews/:id', (req, res) => {
    const sql = 'SELECT * FROM reviews WHERE id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0]);
    });
});

app.post('/api/reviews', (req, res) => {
    const { product_id, user_id, reviewer_name, rating, review_text } = req.body;
    const sql = 'INSERT INTO reviews (product_id, user_id, reviewer_name, rating, review_text, platform) VALUES (?, ?, ?, ?, ?, ?)';
    
    db.query(sql, [product_id, user_id, reviewer_name, rating, review_text, 'ReviewLens'], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: result.insertId, message: 'Review added successfully' });
    });
});

app.put('/api/reviews/:id', (req, res) => {
    const { reviewer_name, rating, review_text, user_id } = req.body;
    
    // Check if user owns this review
    const checkSql = 'SELECT user_id FROM reviews WHERE id = ?';
    db.query(checkSql, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Review not found' });
        }
        if (results[0].user_id !== user_id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        
        const updateSql = 'UPDATE reviews SET reviewer_name = ?, rating = ?, review_text = ? WHERE id = ?';
        db.query(updateSql, [reviewer_name, rating, review_text, req.params.id], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Review updated successfully' });
        });
    });
});

app.delete('/api/reviews/:id', (req, res) => {
    const { user_id } = req.body;
    
    // Check if user owns this review
    const checkSql = 'SELECT user_id FROM reviews WHERE id = ?';
    db.query(checkSql, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Review not found' });
        }
        if (results[0].user_id !== user_id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        
        const deleteSql = 'DELETE FROM reviews WHERE id = ?';
        db.query(deleteSql, [req.params.id], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Review deleted successfully' });
        });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
