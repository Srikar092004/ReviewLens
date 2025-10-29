import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Fetching reviews...');
    axios.get('http://localhost:5000/api/reviews')
      .then(response => {
        console.log('Reviews received:', response.data);
        setReviews(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
        setError('Failed to load reviews');
        setLoading(false);
      });
  }, []);

  const getPlatformIcon = (platform) => {
    const icons = {
      'Amazon': '🛒',
      'Flipkart': '🛍️',
      'Reddit': '🔴',
      'YouTube': '▶️',
      'ReviewLens': '👁️'
    };
    return icons[platform] || '💬';
  };

  const getPlatformColor = (platform) => {
    const colors = {
      'Amazon': '#FF9900',
      'Flipkart': '#2874F0',
      'Reddit': '#FF4500',
      'YouTube': '#FF0000',
      'ReviewLens': '#667eea'
    };
    return colors[platform] || '#6b7280';
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '6px solid #f3f3f3',
          borderTop: '6px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }}></div>
        <p style={{ fontSize: '18px', color: '#666' }}>Loading reviews...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>⚠️</div>
        <h2 style={{ fontSize: '24px', color: '#dc2626', marginBottom: '16px' }}>{error}</h2>
        <button 
          onClick={() => window.location.reload()}
          style={{
            background: '#667eea',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{
        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        borderRadius: '24px',
        padding: '60px 40px',
        marginBottom: '40px',
        textAlign: 'center',
        color: 'white',
        boxShadow: '0 20px 60px rgba(139, 92, 246, 0.3)'
      }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
          💬 All Reviews
        </h1>
        <p style={{ fontSize: '20px', opacity: 0.95, marginBottom: '12px' }}>
          {reviews.length} authentic reviews from multiple platforms
        </p>
        <p style={{ fontSize: '16px', opacity: 0.85 }}>
          Amazon, Flipkart, Reddit, YouTube & ReviewLens users
        </p>
      </div>

      {reviews.length === 0 ? (
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '80px 40px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>📝</div>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>
            No reviews yet
          </h3>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>
            Be the first to write a review!
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {reviews.map(review => (
            <div
              key={review.id}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '32px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                transition: 'all 0.3s',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
              }}
            >
              {/* Platform Badge */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: getPlatformColor(review.platform),
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}>
                <span>{getPlatformIcon(review.platform)}</span>
                {review.platform}
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '20px',
                paddingRight: '140px'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    {review.reviewer_name}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ fontWeight: '600' }}>{review.product_name}</span>
                    <span>•</span>
                    <span style={{
                      background: '#e0e7ff',
                      color: '#4f46e5',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {review.category}
                    </span>
                  </p>
                </div>
                <div style={{ fontSize: '28px' }}>
                  {'⭐'.repeat(review.rating)}
                </div>
              </div>
              
              <p style={{
                fontSize: '16px',
                color: '#4b5563',
                lineHeight: '1.8'
              }}>
                {review.review_text}
              </p>

              {/* Show edit/delete only for user's own ReviewLens reviews */}
              {(() => {
                const userData = localStorage.getItem('user');
                if (userData && review.platform === 'ReviewLens') {
                  const user = JSON.parse(userData);
                  if (review.user_id === user.id) {
                    return (
                      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                        <Link
                          to={`/reviews/edit/${review.id}`}
                          style={{
                            padding: '10px 20px',
                            background: '#f59e0b',
                            color: 'white',
                            borderRadius: '10px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '14px',
                            transition: 'all 0.3s'
                          }}
                        >
                          ✏️ Edit
                        </Link>
                        <Link
                          to={`/reviews/delete/${review.id}`}
                          style={{
                            padding: '10px 20px',
                            background: '#ef4444',
                            color: 'white',
                            borderRadius: '10px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '14px',
                            transition: 'all 0.3s'
                          }}
                        >
                          🗑️ Delete
                        </Link>
                      </div>
                    );
                  }
                }
                return null;
              })()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllReviews;
