import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    axios.post('http://localhost:5000/api/auth/register', {
      username: formData.username,
      email: formData.email,
      password: formData.password
    })
      .then(() => {
        alert('✅ Registration successful! Please login.');
        navigate('/login');
      })
      .catch(error => {
        setError(error.response?.data?.error || 'Registration failed');
      });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '60px auto' }}>
      <div style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        borderRadius: '24px',
        padding: '40px',
        marginBottom: '32px',
        textAlign: 'center',
        color: 'white',
        boxShadow: '0 20px 60px rgba(16, 185, 129, 0.3)'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
        <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '12px' }}>
          Join ReviewLens
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.95 }}>
          Create an account to start reviewing products
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
            Username
          </label>
          <input
            type="text"
            required
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            placeholder="Choose a username"
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

        <div style={{ marginBottom: '24px' }}>
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
            minLength={6}
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            placeholder="Choose a strong password"
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
            Confirm Password
          </label>
          <input
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            placeholder="Re-enter your password"
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
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            padding: '18px',
            borderRadius: '12px',
            border: 'none',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)',
            transition: 'all 0.3s',
            marginBottom: '20px'
          }}
        >
          🚀 Create Account
        </button>

        <div style={{ textAlign: 'center', fontSize: '16px', color: '#6b7280' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#10b981', fontWeight: 'bold', textDecoration: 'none' }}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
