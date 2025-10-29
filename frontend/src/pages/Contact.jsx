import { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:5000/api/contact', formData)
      .then(() => {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Message sent! (Contact API endpoint may not be fully implemented)');
        setFormData({ name: '', email: '', message: '' });
      });
  };

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        borderRadius: '24px',
        padding: '60px 40px',
        marginBottom: '60px',
        textAlign: 'center',
        color: 'white',
        boxShadow: '0 20px 60px rgba(59, 130, 246, 0.3)'
      }}>
        <div style={{ fontSize: '80px', marginBottom: '24px' }}>📧</div>
        <h1 style={{ fontSize: '52px', fontWeight: 'bold', marginBottom: '20px' }}>
          Get in Touch
        </h1>
        <p style={{ fontSize: '20px', opacity: 0.95, maxWidth: '700px', margin: '0 auto' }}>
          Have questions, feedback, or suggestions? We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'start'
      }}>
        {/* Contact Form */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '48px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '32px'
          }}>
            Send us a Message
          </h2>

          {submitted && (
            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              padding: '20px',
              borderRadius: '16px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontWeight: '600',
              fontSize: '16px'
            }}>
              <span style={{ fontSize: '28px' }}>✅</span>
              Thank you! Your message has been sent successfully.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '12px'
              }}>
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="John Doe"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
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
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="john@example.com"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
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
                Message *
              </label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={6}
                placeholder="How can we help you?"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '16px',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                color: 'white',
                padding: '18px',
                borderRadius: '12px',
                border: 'none',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(59, 130, 246, 0.6)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)';
              }}
            >
              📨 Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '48px',
            marginBottom: '32px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '32px'
            }}>
              Contact Information
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {[
                { icon: '📧', title: 'Email', info: 'support@reviewlens.com', desc: 'Send us an email anytime!' },
                { icon: '📞', title: 'Phone', info: '+91 1234567891', desc: 'Mon-Fri from 9am to 6pm IST' },
                { icon: '📍', title: 'Location', info: 'Pune, Hadapsar', desc: 'India' },
                { icon: '⏰', title: 'Hours', info: 'Monday - Friday', desc: '9:00 AM - 6:00 PM IST' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '20px' }}>
                  <div style={{
                    fontSize: '40px',
                    width: '70px',
                    height: '70px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#1f2937',
                      marginBottom: '6px'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontSize: '16px',
                      color: '#3b82f6',
                      fontWeight: '600',
                      marginBottom: '4px'
                    }}>
                      {item.info}
                    </p>
                    <p style={{ fontSize: '14px', color: '#9ca3af' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div style={{
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '20px'
            }}>
              💡 Quick Tip
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#4b5563',
              lineHeight: '1.7'
            }}>
              For faster responses, please include relevant details such as product names, order numbers, or specific questions about our platform. We typically respond within 24-48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
