import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Admin() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:5000/api/products'),
      axios.get('http://localhost:5000/api/reviews')
    ])
      .then(([productsRes, reviewsRes]) => {
        setProducts(productsRes.data);
        setReviews(reviewsRes.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px 0', fontSize: '20px' }}>Loading dashboard...</div>;
  }

  const stats = {
    totalProducts: products.length,
    totalReviews: reviews.length,
    avgRating: reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0,
    byCategory: {
      laptop: products.filter(p => p.category === 'Laptop').length,
      mobile: products.filter(p => p.category === 'Mobile').length,
      chair: products.filter(p => p.category === 'Chair').length
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
        borderRadius: '24px',
        padding: '60px 40px',
        marginBottom: '40px',
        textAlign: 'center',
        color: 'white',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{ fontSize: '80px', marginBottom: '20px' }}>👤</div>
        <h1 style={{ fontSize: '52px', fontWeight: 'bold', marginBottom: '16px' }}>
          Admin Dashboard
        </h1>
        <p style={{ fontSize: '20px', opacity: 0.9 }}>
          Manage products, reviews, and monitor platform statistics
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        marginBottom: '60px'
      }}>
        {[
          { num: stats.totalProducts, title: 'Total Products', desc: `${stats.byCategory.laptop} Laptops • ${stats.byCategory.mobile} Mobiles • ${stats.byCategory.chair} Chairs`, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', icon: '🛍️' },
          { num: stats.totalReviews, title: 'Total Reviews', desc: `${(stats.totalReviews / stats.totalProducts).toFixed(1)} reviews per product`, gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', icon: '💬' },
          { num: `⭐ ${stats.avgRating}`, title: 'Average Rating', desc: 'Across all products', gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', icon: '📊' }
        ].map((stat, idx) => (
          <div
            key={idx}
            style={{
              background: stat.gradient,
              borderRadius: '20px',
              padding: '32px',
              color: 'white',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              transition: 'transform 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>{stat.icon}</div>
            <div style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '8px' }}>
              {stat.num}
            </div>
            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              {stat.title}
            </div>
            <div style={{ fontSize: '13px', opacity: 0.9 }}>
              {stat.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        {/* Recent Reviews */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span>💬</span> Recent Reviews
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {reviews.slice(0, 5).map(review => (
              <div
                key={review.id}
                style={{
                  padding: '20px',
                  background: '#f9fafb',
                  borderRadius: '16px',
                  border: '2px solid #e5e7eb',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.background = '#f5f7ff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.background = '#f9fafb';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px'
                }}>
                  <div>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}>
                      {review.reviewer_name}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>
                      {review.product_name}
                    </div>
                  </div>
                  <div style={{ fontSize: '18px' }}>
                    {'⭐'.repeat(review.rating)}
                  </div>
                </div>
                <p style={{
                  fontSize: '14px',
                  color: '#4b5563',
                  lineHeight: '1.5',
                  marginBottom: '12px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {review.review_text}
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Link
                    to={`/reviews/edit/${review.id}`}
                    style={{
                      padding: '6px 16px',
                      background: '#f59e0b',
                      color: 'white',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '13px',
                      fontWeight: '600'
                    }}
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/reviews/delete/${review.id}`}
                    style={{
                      padding: '6px 16px',
                      background: '#ef4444',
                      color: 'white',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '13px',
                      fontWeight: '600'
                    }}
                  >
                    Delete
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products Overview */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span>📦</span> Products Overview
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {products.map(product => {
              const productReviews = reviews.filter(r => r.product_id === product.id);
              const avgRating = productReviews.length > 0
                ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
                : 'N/A';
              
              return (
                <div
                  key={product.id}
                  style={{
                    padding: '20px',
                    background: '#f9fafb',
                    borderRadius: '16px',
                    border: '2px solid #e5e7eb',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#667eea';
                    e.currentTarget.style.background = '#f5f7ff';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.background = '#f9fafb';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#1f2937',
                        marginBottom: '4px'
                      }}>
                        {product.name}
                      </div>
                      <div style={{
                        fontSize: '13px',
                        color: '#6b7280',
                        marginBottom: '8px'
                      }}>
                        {product.category} • ${product.price}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#fbbf24',
                        marginBottom: '4px'
                      }}>
                        ⭐ {avgRating}
                      </div>
                      <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                        {productReviews.length} reviews
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
