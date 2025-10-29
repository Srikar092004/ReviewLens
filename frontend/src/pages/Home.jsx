import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [stats, setStats] = useState({ products: 0, reviews: 0, avgRating: 0 });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:5000/api/products'),
      axios.get('http://localhost:5000/api/reviews')
    ]).then(([productsRes, reviewsRes]) => {
      const reviews = reviewsRes.data;
      const avgRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0;
      setStats({
        products: productsRes.data.length,
        reviews: reviews.length,
        avgRating
      });
    }).catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '0' }}>
      {/* Hero Section - Gradient Background */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '24px',
        padding: '80px 40px',
        marginBottom: '60px',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '300px',
          height: '300px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}></div>
        
        <h1 style={{
          fontSize: '64px',
          fontWeight: '900',
          color: 'white',
          marginBottom: '24px',
          textShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}>
          Welcome to <span style={{ color: '#fbbf24' }}>ReviewLens</span>
        </h1>
        
        <p style={{
          fontSize: '24px',
          color: 'rgba(255,255,255,0.95)',
          marginBottom: '16px',
          fontWeight: '500'
        }}>
          Your trusted platform for honest product reviews and ratings
        </p>
        
        <p style={{
          fontSize: '18px',
          color: 'rgba(255,255,255,0.8)',
          marginBottom: '40px',
          maxWidth: '800px',
          margin: '0 auto 40px'
        }}>
          Make informed decisions with real user experiences on laptops, mobiles, and office chairs
        </p>
        
        <Link
          to="/products"
          style={{
            display: 'inline-block',
            background: 'white',
            color: '#667eea',
            padding: '18px 48px',
            borderRadius: '50px',
            fontSize: '20px',
            fontWeight: 'bold',
            textDecoration: 'none',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.background = '#fbbf24';
            e.target.style.color = '#1f2937';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.background = 'white';
            e.target.style.color = '#667eea';
          }}
        >
          Explore Products →
        </Link>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '32px',
        marginBottom: '80px'
      }}>
        {[
          { num: `${stats.products}+`, title: 'Products Listed', desc: 'Top-rated tech products', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
          { num: `${stats.reviews}+`, title: 'User Reviews', desc: 'Authentic experiences', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
          { num: `⭐ ${stats.avgRating}`, title: 'Average Rating', desc: 'High satisfaction rate', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }
        ].map((stat, idx) => (
          <div
            key={idx}
            style={{
              background: stat.gradient,
              borderRadius: '20px',
              padding: '40px',
              textAlign: 'center',
              color: 'white',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '12px' }}>
              {stat.num}
            </div>
            <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
              {stat.title}
            </div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>
              {stat.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Categories Section */}
      <div style={{ marginBottom: '80px' }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#1f2937',
          marginBottom: '48px'
        }}>
          Browse by Category
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          {[
            { icon: '💻', name: 'Laptops', desc: 'Top laptops for work, gaming, and creativity', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
            { icon: '📱', name: 'Mobiles', desc: 'Latest smartphones with cutting-edge features', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
            { icon: '🪑', name: 'Chairs', desc: 'Ergonomic chairs for ultimate comfort', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }
          ].map((cat, idx) => (
            <Link
              key={idx}
              to="/products"
              style={{
                background: 'white',
                borderRadius: '24px',
                overflow: 'hidden',
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
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
              <div style={{
                background: cat.gradient,
                padding: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '100px' }}>{cat.icon}</span>
              </div>
              <div style={{ padding: '24px' }}>
                <h3 style={{
                  fontSize: '26px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>
                  {cat.name}
                </h3>
                <p style={{ fontSize: '16px', color: '#6b7280' }}>
                  {cat.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        borderRadius: '24px',
        padding: '60px 40px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#1f2937',
          marginBottom: '48px'
        }}>
          Why Choose ReviewLens?
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px'
        }}>
          {[
            { icon: '✓', title: 'Verified Reviews', desc: 'Authentic feedback from real users' },
            { icon: '⚡', title: 'Easy to Use', desc: 'Simple and intuitive interface' },
            { icon: '🎯', title: 'Detailed Ratings', desc: 'Comprehensive product analysis' },
            { icon: '🔒', title: 'Trustworthy', desc: 'Transparent and unbiased' }
          ].map((feature, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                fontWeight: 'bold',
                margin: '0 auto 20px',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '8px'
              }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
