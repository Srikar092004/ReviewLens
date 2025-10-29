import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(response => {
        setProduct(response.data.product);
        setReviews(response.data.reviews);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <div style={{
          width: '80px',
          height: '80px',
          border: '8px solid #f3f3f3',
          borderTop: '8px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }}></div>
        <p style={{ fontSize: '20px', color: '#666' }}>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 40px', background: 'white', borderRadius: '24px' }}>
        <div style={{ fontSize: '80px', marginBottom: '20px' }}>😞</div>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '12px' }}>Product not found</h2>
        <Link to="/products" style={{ color: '#667eea', textDecoration: 'underline' }}>← Back to Products</Link>
      </div>
    );
  }

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 'No ratings';

  const getCategoryIcon = (category) => {
    const icons = { 'Laptop': '💻', 'Mobile': '📱', 'Chair': '🪑' };
    return icons[category] || '📦';
  };

  const getCategoryGradient = (category) => {
    const gradients = {
      'Laptop': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'Mobile': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'Chair': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    };
    return gradients[category] || 'linear-gradient(135deg, #888 0%, #666 100%)';
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'Amazon': '🛒',
      'Flipkart': '🛍️',
      'Reddit': '🔴',
      'YouTube': '▶️'
    };
    return icons[platform] || '💬';
  };

  const getPlatformColor = (platform) => {
    const colors = {
      'Amazon': '#FF9900',
      'Flipkart': '#2874F0',
      'Reddit': '#FF4500',
      'YouTube': '#FF0000'
    };
    return colors[platform] || '#6b7280';
  };

  return (
    <div>
      <Link
        to="/products"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          background: 'white',
          borderRadius: '12px',
          textDecoration: 'none',
          color: '#667eea',
          fontWeight: '600',
          marginBottom: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'all 0.3s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(-5px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}
      >
        ← Back to Products
      </Link>

      <div style={{
        background: 'white',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        marginBottom: '40px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0'
        }}>
          <div style={{
            background: getCategoryGradient(product.category),
            padding: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <span style={{ fontSize: '200px' }}>
              {getCategoryIcon(product.category)}
            </span>
            <div style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'rgba(255,255,255,0.9)',
              padding: '10px 20px',
              borderRadius: '20px',
              fontWeight: 'bold',
              fontSize: '16px'
            }}>
              {product.category}
            </div>
          </div>

          <div style={{ padding: '60px' }}>
            <h1 style={{
              fontSize: '42px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '16px',
              lineHeight: '1.2'
            }}>
              {product.name}
            </h1>
            
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              marginBottom: '24px',
              fontWeight: '600'
            }}>
              Brand: {product.brand}
            </p>
            
            <div style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#667eea',
              marginBottom: '24px'
            }}>
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            
            <p style={{
              fontSize: '16px',
              color: '#4b5563',
              lineHeight: '1.8',
              marginBottom: '32px'
            }}>
              {product.description}
            </p>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '32px',
              padding: '20px',
              background: '#f9fafb',
              borderRadius: '16px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '42px',
                  fontWeight: 'bold',
                  color: '#fbbf24',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  ⭐ {avgRating}
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
                  Average Rating
                </div>
              </div>
              <div style={{
                width: '2px',
                height: '50px',
                background: '#e5e7eb'
              }}></div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '42px',
                  fontWeight: 'bold',
                  color: '#667eea'
                }}>
                  {reviews.length}
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
                  Total Reviews
                </div>
              </div>
            </div>
            
            {/* Login prompt or Write Review button */}
            {(() => {
            const userData = localStorage.getItem('user');
            if (userData) {
                return (
                <Link
                    to={`/reviews/add/${product.id}`}
                    style={{
                    display: 'block',
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    padding: '18px',
                    borderRadius: '16px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)',
                    transition: 'all 0.3s',
                    marginBottom: '20px'
                    }}
                    onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(16, 185, 129, 0.6)';
                    }}
                    onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
                    }}
                >
                    ✍️ Write a Review
                </Link>
                );
            } else {
                return (
                <Link
                    to="/login"
                    style={{
                    display: 'block',
                    textAlign: 'center',
                    background: '#eff6ff',
                    border: '2px solid #bfdbfe',
                    color: '#1e40af',
                    padding: '18px',
                    borderRadius: '16px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    marginBottom: '20px'
                    }}
                >
                    🔐 Login to Write a Review
                </Link>
                );
            }
            })()}

            {/* Info about reviews */}
            <div style={{
            background: '#eff6ff',
            border: '2px solid #bfdbfe',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            color: '#1e40af'
            }}>
            <strong>ℹ️ About Reviews:</strong> All reviews are sourced from Amazon, Flipkart, Reddit, YouTube, and ReviewLens users. We aggregate authentic user feedback.
            </div>

          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div>
        <h2 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span>💬</span> Customer Reviews from Multiple Platforms
        </h2>
        
        {reviews.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '80px 40px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>📝</div>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px', color: '#1f2937' }}>
              No reviews yet
            </h3>
            <p style={{ fontSize: '16px', color: '#6b7280' }}>
              Check back later for reviews from Amazon, Flipkart, Reddit, and YouTube!
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
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.12)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
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
                  marginBottom: '16px',
                  paddingRight: '140px'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}>
                      {review.reviewer_name}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#9ca3af' }}>
                      Reviewed on {review.platform}
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '4px',
                    fontSize: '24px'
                  }}>
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
