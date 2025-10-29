import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

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

  const getProductStats = (productId) => {
    const productReviews = reviews.filter(r => r.product_id === productId);
    const avgRating = productReviews.length > 0
      ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
      : 0;
    return { reviewCount: productReviews.length, avgRating };
  };

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

  const filteredProducts = filter === 'All'
    ? products
    : products.filter(p => p.category === filter);

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
        <p style={{ fontSize: '20px', color: '#666' }}>Loading amazing products...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '24px',
        padding: '60px 40px',
        marginBottom: '40px',
        textAlign: 'center',
        color: 'white',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
          Discover Products
        </h1>
        <p style={{ fontSize: '20px', opacity: 0.9 }}>
          Browse our curated collection of {products.length} top-rated tech products
        </p>
      </div>

      {/* Filter Buttons */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '40px', flexWrap: 'wrap' }}>
        {[
          { name: 'All', icon: '🌟' },
          { name: 'Laptop', icon: '💻' },
          { name: 'Mobile', icon: '📱' },
          { name: 'Chair', icon: '🪑' }
        ].map(category => {
          const count = category.name === 'All' 
            ? products.length 
            : products.filter(p => p.category === category.name).length;
          const isActive = filter === category.name;
          
          return (
            <button
              key={category.name}
              onClick={() => setFilter(category.name)}
              style={{
                padding: '14px 28px',
                borderRadius: '50px',
                border: 'none',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                background: isActive 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'white',
                color: isActive ? 'white' : '#333',
                boxShadow: isActive 
                  ? '0 8px 20px rgba(102, 126, 234, 0.4)'
                  : '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transform: isActive ? 'scale(1.05)' : 'scale(1)'
              }}
              onMouseOver={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }
              }}
            >
              <span style={{ fontSize: '20px' }}>{category.icon}</span>
              <span>{category.name}</span>
              <span style={{
                background: isActive ? 'rgba(255,255,255,0.3)' : '#f0f0f0',
                padding: '2px 10px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '32px'
        }}>
          {filteredProducts.map(product => {
            const stats = getProductStats(product.id);
            return (
              <div
                key={product.id}
                style={{
                  background: 'white',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                }}
              >
                {/* Product Image */}
                <div style={{
                  background: getCategoryGradient(product.category),
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <span style={{ fontSize: '100px' }}>
                    {getCategoryIcon(product.category)}
                  </span>
                  {stats.reviewCount > 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      background: 'white',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}>
                      <span style={{ color: '#fbbf24' }}>⭐</span>
                      <span>{stats.avgRating}</span>
                    </div>
                  )}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'rgba(255,255,255,0.9)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#333'
                  }}>
                    {product.category}
                  </div>
                </div>

                {/* Product Info */}
                <div style={{ padding: '24px' }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    color: '#1f2937',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {product.name}
                  </h3>
                  
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    marginBottom: '12px',
                    fontWeight: '600'
                  }}>
                    {product.brand}
                  </p>
                  
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    marginBottom: '16px',
                    height: '40px',
                    overflow: 'hidden',
                    lineHeight: '1.4'
                  }}>
                    {product.description}
                  </p>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    paddingTop: '16px',
                    borderTop: '1px solid #e5e7eb'
                  }}>
                    <div style={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                        color: '#667eea'
                    }}>
                        ₹{product.price.toLocaleString('en-IN')}
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginBottom: '4px'
                      }}>
                        <span style={{ color: '#fbbf24' }}>⭐</span>
                        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
                          {stats.avgRating > 0 ? stats.avgRating : 'New'}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        {stats.reviewCount} reviews
                      </div>
                    </div>
                  </div>
                  
                  <Link
                    to={`/products/${product.id}`}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      padding: '14px',
                      borderRadius: '16px',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                      transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.6)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                    }}
                  >
                    View Details & Reviews →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '80px 40px',
          background: 'white',
          borderRadius: '24px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>😢</div>
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '12px', color: '#1f2937' }}>
            No products found
          </h3>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>
            Try selecting a different category
          </p>
        </div>
      )}
    </div>
  );
}

export default Products;
