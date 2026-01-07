const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'reviewuser',
  password: process.env.DB_PASSWORD || 'reviewpass',
  database: process.env.DB_NAME || 'reviewlens',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
