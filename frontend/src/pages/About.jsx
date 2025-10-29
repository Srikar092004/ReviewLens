import { useState, useEffect } from 'react';
import axios from 'axios';

function About() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalReviews: 0,
    avgRating: 0
  });

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
        totalProducts: productsRes.data.length,
        totalReviews: reviews.length,
        avgRating: avgRating
      });
    }).catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '24px',
        padding: '80px 40px',
        marginBottom: '60px',
        textAlign: 'center',
        color: 'white',
        boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}></div>
        
        <h1 style={{
          fontSize: '56px',
          fontWeight: 'bold',
          marginBottom: '24px',
          position: 'relative',
          zIndex: 1
        }}>
          About ReviewLens
        </h1>
        <p style={{
          fontSize: '22px',
          opacity: 0.95,
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.6',
          position: 'relative',
          zIndex: 1
        }}>
          Your trusted platform for authentic product reviews and honest ratings. We help consumers make informed purchasing decisions through real user experiences.
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '32px',
        marginBottom: '80px'
      }}>
        {[
          { num: stats.totalProducts, icon: '🛍️', title: 'Products', desc: 'Curated tech products', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
          { num: stats.totalReviews, icon: '💬', title: 'Reviews', desc: 'Authentic user feedback', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
          { num: `⭐ ${stats.avgRating}`, icon: '🏆', title: 'Avg Rating', desc: 'High satisfaction rate', gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' }
        ].map((stat, idx) => (
          <div
            key={idx}
            style={{
              background: stat.gradient,
              borderRadius: '24px',
              padding: '48px 32px',
              textAlign: 'center',
              color: 'white',
              boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
              transition: 'transform 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>{stat.icon}</div>
            <div style={{ fontSize: '52px', fontWeight: 'bold', marginBottom: '12px' }}>
              {stat.num}
            </div>
            <div style={{ fontSize: '22px', fontWeight: '600', marginBottom: '8px' }}>
              {stat.title}
            </div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>
              {stat.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Mission Section */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '60px',
        marginBottom: '60px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          Our Mission
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#4b5563',
          lineHeight: '1.8',
          marginBottom: '24px',
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto 24px'
        }}>
          ReviewLens is a comprehensive product review management platform designed to help 
          consumers make informed purchasing decisions. We aggregate authentic reviews for 
          laptops, mobile phones, and office chairs from real users who have purchased and used these products.
        </p>
        <p style={{
          fontSize: '18px',
          color: '#4b5563',
          lineHeight: '1.8',
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          Our platform enables users to browse products, read honest reviews, and share 
          their own experiences to help others in their buying journey. Every review matters, 
          and together we build a community of informed consumers.
        </p>
      </div>

      {/* Why Choose Us */}
      <div style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        borderRadius: '24px',
        padding: '60px 40px',
        marginBottom: '60px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#1f2937',
          marginBottom: '60px'
        }}>
          Why Choose ReviewLens?
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px'
        }}>
          {[
            { icon: '✓', title: 'Verified Reviews', desc: 'Authentic feedback from real users who have purchased and tested the products', color: '#10b981' },
            { icon: '⚡', title: 'Easy to Use', desc: 'Simple and intuitive interface for browsing, reading, and writing reviews', color: '#f59e0b' },
            { icon: '🎯', title: 'Detailed Ratings', desc: 'Comprehensive 5-star rating system with detailed written feedback', color: '#ef4444' },
            { icon: '🔒', title: 'Trustworthy', desc: 'Transparent and unbiased platform with no sponsored reviews', color: '#8b5cf6' },
            { icon: '🚀', title: 'Always Updated', desc: 'Latest products and reviews added regularly to keep you informed', color: '#3b82f6' },
            { icon: '🤝', title: 'Community Driven', desc: 'Built by users, for users. Your voice matters in our community', color: '#ec4899' }
          ].map((feature, idx) => (
            <div
              key={idx}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '32px',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
              }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                background: feature.color,
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
                fontWeight: 'bold',
                margin: '0 auto 24px',
                boxShadow: `0 10px 30px ${feature.color}40`
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '12px'
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '15px',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories We Cover */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '60px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '48px',
          textAlign: 'center'
        }}>
          Categories We Cover
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          {[
            { icon: '💻', name: 'Laptops & Notebooks', desc: 'From ultrabooks to gaming laptops, find the perfect machine for your needs', count: 'Windows, MacOS, Chromebook' },
            { icon: '📱', name: 'Mobile Phones', desc: 'Latest smartphones with honest reviews on cameras, battery life, and performance', count: 'iOS, Android, Flagship to Budget' },
            { icon: '🪑', name: 'Office Chairs', desc: 'Ergonomic chairs reviewed for comfort, durability, and value for money', count: 'Executive, Gaming, Ergonomic' }
          ].map((cat, idx) => (
            <div
              key={idx}
              style={{
                padding: '32px',
                textAlign: 'center',
                border: '2px solid #e5e7eb',
                borderRadius: '20px',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.background = '#f5f7ff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <div style={{ fontSize: '80px', marginBottom: '20px' }}>{cat.icon}</div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '12px'
              }}>
                {cat.name}
              </h3>
              <p style={{
                fontSize: '15px',
                color: '#6b7280',
                marginBottom: '16px',
                lineHeight: '1.6'
              }}>
                {cat.desc}
              </p>
              <div style={{
                fontSize: '13px',
                color: '#9ca3af',
                fontWeight: '600'
              }}>
                {cat.count}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
