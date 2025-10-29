import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DeleteReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/reviews/${id}`)
      .then(response => {
        setReview(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/reviews/${id}`)
      .then(() => {
        alert('✅ Review deleted successfully!');
        navigate('/reviews');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('❌ Failed to delete review');
      });
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '100px 0' }}>Loading...</div>;
  if (!review) return <div style={{ textAlign: 'center', padding: '100px 0' }}>Review not found</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        borderRadius: '24px',
        padding: '40px',
        marginBottom: '32px',
        textAlign: 'center',
        color: 'white',
        boxShadow: '0 20px 60px rgba(239, 68, 68, 0.3)'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '12px' }}>⚠️</div>
        <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '12px' }}>
          Delete Review?
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.95 }}>
          This action cannot be undone
        </p>
      </div>

      {/* Review Details */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '40px',
        marginBottom: '24px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px', color: '#1f2937' }}>
          Review Details
        </h3>
        
        <div style={{
          background: '#f9fafb',
          padding: '24px',
          borderRadius: '16px',
          marginBottom: '24px'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontWeight: 'bold', color: '#4b5563' }}>Reviewer:</span>
            <span style={{ marginLeft: '12px', color: '#1f2937' }}>{review.reviewer_name}</span>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontWeight: 'bold', color: '#4b5563' }}>Rating:</span>
            <span style={{ marginLeft: '12px', fontSize: '20px' }}>
              {'⭐'.repeat(review.rating)}
            </span>
          </div>
          <div>
            <span style={{ fontWeight: 'bold', color: '#4b5563' }}>Review:</span>
            <p style={{ marginTop: '8px', color: '#1f2937', lineHeight: '1.6' }}>
              {review.review_text}
            </p>
          </div>
        </div>

        <div style={{
          background: '#fef2f2',
          border: '2px solid #fecaca',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '32px'
        }}>
          <p style={{ color: '#dc2626', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>⚠️</span>
            Are you sure you want to permanently delete this review?
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            onClick={handleDelete}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: 'white',
              padding: '18px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(239, 68, 68, 0.4)',
              transition: 'all 0.3s'
            }}
          >
            🗑️ Yes, Delete Review
          </button>
          <button
            onClick={() => navigate(-1)}
            style={{
              flex: 1,
              background: '#f3f4f6',
              color: '#374151',
              padding: '18px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            ← No, Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteReview;
