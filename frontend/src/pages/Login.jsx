import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    axios.post('http://localhost:5000/api/auth/login', formData)
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));
        alert('✅ Login successful!');
        navigate('/products');
      })
      .catch(error => {
        setError(error.response?.data?.error || 'Login failed');
      });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '60px auto' }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '24px',
        padding: '40px',
        marginBottom: '32px',
        textAlign: 'center',
        color: 'white',
        boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔐</div>
        <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '12px' }}>
          Welcome Back
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.95 }}>
          Login to write and manage your reviews
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{
        background: 'white',
        borderRadius: '24px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
      }}>
        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '24px',
            fontWeight: '600'
          }}>
            ❌ {error}
          </div>
        )}

        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '12px'
          }}>
            Email Address
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="your.email@example.com"
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

        <div style={{ marginBottom: '32px' }}>
          <label style={{
            display: 'block',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '12px'
          }}>
            Password
          </label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            placeholder="Enter your password"
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

        <button
          type="submit"
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '18px',
            borderRadius: '12px',
            border: 'none',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.3s',
            marginBottom: '20px'
          }}
        >
          🔓 Login
        </button>

        <div style={{ textAlign: 'center', fontSize: '16px', color: '#6b7280' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#667eea', fontWeight: 'bold', textDecoration: 'none' }}>
            Sign Up
          </Link>
        </div>

        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: '#f3f4f6',
          borderRadius: '12px',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <strong>Test Account:</strong><br />
          Email: john@example.com<br />
          Password: password123
        </div>
      </form>
    </div>
  );
}

export default Login;
