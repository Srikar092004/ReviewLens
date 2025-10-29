import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import AddReview from './pages/AddReview';
import EditReview from './pages/EditReview';
import DeleteReview from './pages/DeleteReview';
import AllReviews from './pages/AllReviews';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [location]);
  
  const isActive = (path) => location.pathname === path;
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    alert('✅ Logged out successfully!');
  };
  
  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/products', label: 'Products', icon: '🛍️' },
    { path: '/reviews', label: 'Reviews', icon: '⭐' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    { path: '/contact', label: 'Contact', icon: '📧' },
  ];

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '80px'
        }}>
          <Link
            to="/"
            style={{
              fontSize: '28px',
              fontWeight: '900',
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'transform 0.3s'
            }}
          >
            <span style={{ fontSize: '36px' }}>👁️</span>
            ReviewLens
          </Link>

          <div style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}>
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '16px',
                  background: isActive(link.path) ? 'rgba(255,255,255,0.2)' : 'transparent',
                  transition: 'all 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            ))}
            
            {user ? (
              <>
                <div style={{
                  color: 'white',
                  padding: '10px 20px',
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  👤 {user.username}
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    color: 'white',
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    padding: '10px 20px',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '16px',
                    background: isActive('/login') ? 'rgba(255,255,255,0.2)' : 'transparent',
                    transition: 'all 0.3s'
                  }}
                >
                  🔐 Login
                </Link>
                <Link
                  to="/signup"
                  style={{
                    color: '#667eea',
                    background: 'white',
                    textDecoration: 'none',
                    padding: '10px 20px',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '16px',
                    transition: 'all 0.3s'
                  }}
                >
                  🎉 Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      color: 'white',
      marginTop: '80px',
      padding: '60px 20px 30px',
      borderRadius: '24px 24px 0 0'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          <div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontSize: '32px' }}>👁️</span>
              ReviewLens
            </h3>
            <p style={{
              color: 'rgba(255,255,255,0.7)',
              lineHeight: '1.6',
              fontSize: '14px'
            }}>
              Your trusted platform for honest product reviews and ratings. Make informed decisions with real user experiences.
            </p>
          </div>

          <div>
            <h4 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#fbbf24'
            }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Home', 'Products', 'Reviews', 'About', 'Contact'].map(link => (
                <Link
                  key={link}
                  to={`/${link.toLowerCase() === 'home' ? '' : link.toLowerCase()}`}
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.3s'
                  }}
                >
                  → {link}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#fbbf24'
            }}>
              Categories
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['💻 Laptops', '📱 Mobiles', '🪑 Office Chairs'].map(cat => (
                <div
                  key={cat}
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '14px'
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '16px',
              color: '#fbbf24'
            }}>
              Get in Touch
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                📧 support@reviewlens.com
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                📞 +91 1234567891
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                📍 Pune, India
              </div>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '20px',
          textAlign: 'center'
        }}>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '14px'
          }}>
            © 2025 ReviewLens. Product Review Management System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
        <NavBar />
        
        <main style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '40px 20px'
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/reviews/add/:productId" element={<AddReview />} />
            <Route path="/reviews/edit/:id" element={<EditReview />} />
            <Route path="/reviews/delete/:id" element={<DeleteReview />} />
            <Route path="/reviews" element={<AllReviews />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
