import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function AddReview() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    rating: 5,
    review_text: ''
  });

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      alert('⚠️ Please login to write a review!');
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));

    // Fetch product details
    axios.get(`http://localhost:5000/api/products/${productId}`)
      .then(response => setProduct(response.data.product))
      .catch(error => console.error('Error:', error));
  }, [productId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:5000/api/reviews', {
      product_id: productId,
      user_id: user.id,
      reviewer_name: user.username,
      ...formData
    })
      .then(() => {
        alert('✅ Review added successfully!');
        navigate(`/products/${productId}`);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('❌ Failed to add review. Please try again.');
      });
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        borderRadius: '24px',
        padding: '40px',
        marginBottom: '32px',
        textAlign: 'center',
        color: 'white',
        boxShadow: '0 20px 60px rgba(16, 185, 129, 0.3)'
      }}>
        <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '12px' }}>
          ✍️ Write a Review
        </h1>
        {product && (
          <p style={{ fontSize: '18px', opacity: 0.95 }}>
            Reviewing: <span style={{ fontWeight: 'bold' }}>{product.name}</span>
          </p>
        )}
        <div style={{
          marginTop: '16px',
          background: 'rgba(255,255,255,0.2)',
          padding: '12px 20px',
          borderRadius: '12px',
          display: 'inline-block'
        }}>
          👤 Posting as: <strong>{user.username}</strong>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{
        background: 'white',
        borderRadius: '24px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '28px' }}>
          <label style={{
            display: 'block',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '12px'
          }}>
            Rating *
          </label>
          <select
            value={formData.rating}
            onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
            style={{
              width: '100%',
              padding: '16px 20px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '16px',
              cursor: 'pointer',
              outline: 'none',
              background: 'white'
            }}
          >
            <option value={5}>⭐⭐⭐⭐⭐ (5 stars - Excellent)</option>
            <option value={4}>⭐⭐⭐⭐ (4 stars - Very Good)</option>
            <option value={3}>⭐⭐⭐ (3 stars - Good)</option>
            <option value={2}>⭐⭐ (2 stars - Fair)</option>
            <option value={1}>⭐ (1 star - Poor)</option>
          </select>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{
            display: 'block',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '12px'
          }}>
            Your Review *
          </label>
          <textarea
            required
            value={formData.review_text}
            onChange={(e) => setFormData({...formData, review_text: e.target.value})}
            rows={8}
            placeholder="Share your experience with this product... (minimum 10 characters)"
            style={{
              width: '100%',
              padding: '16px 20px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '16px',
              resize: 'vertical',
              fontFamily: 'inherit',
              outline: 'none'
            }}
          />
        </div>

        <div style={{
          background: '#ecfdf5',
          border: '2px solid #6ee7b7',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '32px',
          fontSize: '14px',
          color: '#065f46'
        }}>
          <strong>💡 Your review will be posted with the "ReviewLens" badge</strong><br />
          This differentiates your review from external platform reviews (Amazon, Flipkart, Reddit, YouTube).
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            type="submit"
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              padding: '18px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)',
              transition: 'all 0.3s'
            }}
          >
            ✅ Submit Review
          </button>
          <Link
            to={`/products/${productId}`}
            style={{
              flex: 1,
              background: '#f3f4f6',
              color: '#374151',
              padding: '18px',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 'bold',
              textDecoration: 'none',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ❌ Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddReview;
