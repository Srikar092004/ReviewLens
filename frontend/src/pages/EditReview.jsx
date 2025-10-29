import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function EditReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    reviewer_name: '',
    rating: 5,
    review_text: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      alert('⚠️ Please login first!');
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));

    // Fetch review
    axios.get(`http://localhost:5000/api/reviews/${id}`)
      .then(response => {
        const review = response.data;
        
        // Check if user owns this review
        if (review.user_id !== JSON.parse(userData).id) {
          setError('You can only edit your own reviews!');
          setLoading(false);
          return;
        }
        
        setFormData({
          reviewer_name: review.reviewer_name,
          rating: review.rating,
          review_text: review.review_text
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Failed to load review');
        setLoading(false);
      });
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.put(`http://localhost:5000/api/reviews/${id}`, {
      ...formData,
      user_id: user.id
    })
      .then(() => {
        alert('✅ Review updated successfully!');
        navigate('/reviews');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('❌ Failed to update review');
      });
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px 0', fontSize: '20px' }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ maxWidth: '600px', margin: '100px auto', textAlign: 'center' }}>
        <div style={{ fontSize: '80px', marginBottom: '20px' }}>🚫</div>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', color: '#dc2626' }}>
          {error}
        </h2>
        <Link to="/reviews" style={{
          display: 'inline-block',
          background: '#667eea',
          color: 'white',
          padding: '14px 28px',
          borderRadius: '12px',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}>
          ← Back to Reviews
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        borderRadius: '24px',
        padding: '40px',
        marginBottom: '32px',
        textAlign: 'center',
        color: 'white',
        boxShadow: '0 20px 60px rgba(245, 158, 11, 0.3)'
      }}>
        <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '12px' }}>
          ✏️ Edit Review
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.95 }}>
          Update your review details
        </p>
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
            Your Name *
          </label>
          <input
            type="text"
            required
            value={formData.reviewer_name}
            onChange={(e) => setFormData({...formData, reviewer_name: e.target.value})}
            style={{
              width: '100%',
              padding: '16px 20px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '16px',
              outline: 'none'
            }}
          />
        </div>

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
              background: 'white'
            }}
          >
            <option value={5}>⭐⭐⭐⭐⭐ (5 stars)</option>
            <option value={4}>⭐⭐⭐⭐ (4 stars)</option>
            <option value={3}>⭐⭐⭐ (3 stars)</option>
            <option value={2}>⭐⭐ (2 stars)</option>
            <option value={1}>⭐ (1 star)</option>
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
            style={{
              width: '100%',
              padding: '16px 20px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '16px',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            type="submit"
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
              padding: '18px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            💾 Update Review
          </button>
          <Link
            to="/reviews"
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

export default EditReview;
