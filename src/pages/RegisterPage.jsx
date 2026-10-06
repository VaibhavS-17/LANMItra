import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineUser, HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';
import { useAuth } from '../hooks/useAuth';
import './Auth.css';
import logo from '../assets/logo-darkmode.png';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('PLAYER');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password, role);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-split-card">
        
        {/* Left Visual Pane */}
        <div className="auth-image-pane">
          <div className="auth-image-content">
            <img src={logo} alt="LANMitra" style={{ width: '120px', marginBottom: '24px' }} />
            <h2 className="auth-image-title">Create Your<br />Vision</h2>
            <p className="auth-image-subtitle">
              Join the ultimate ecosystem to book premium battle stations, manage gaming venues, and elevate your play.
            </p>
          </div>
        </div>

        {/* Right Form Pane */}
        <div className="auth-form-pane">
          
          <div className="auth-route-toggle">
            <Link to="/register" className="auth-route-link active">Sign Up</Link>
            <Link to="/login" className="auth-route-link">Log In</Link>
          </div>

          <h1 className="auth-title">Create An Account</h1>

          {error && (
            <div className="auth-alert-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            <div className="auth-role-group">
              <div 
                className={`auth-role-btn ${role === 'PLAYER' ? 'active' : ''}`}
                onClick={() => setRole('PLAYER')}
                role="button"
                tabIndex={0}
                style={{ textAlign: 'center' }}
              >
                Gamer
              </div>
              <div 
                className={`auth-role-btn ${role === 'CAFE_OWNER' ? 'active' : ''}`}
                onClick={() => setRole('CAFE_OWNER')}
                role="button"
                tabIndex={0}
                style={{ textAlign: 'center' }}
              >
                Café Owner
              </div>
            </div>

            <div className="auth-input-group">
              <HiOutlineUser className="auth-icon" />
              <input
                type="text"
                className="auth-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
                autoComplete="name"
              />
            </div>

            <div className="auth-input-group">
              <HiOutlineEnvelope className="auth-icon" />
              <input
                type="email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                required
                autoComplete="email"
              />
            </div>

            <div className="auth-input-group">
              <HiOutlineLockClosed className="auth-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                autoComplete="new-password"
                style={{ paddingRight: '48px' }}
              />
              <button
                type="button"
                className="auth-pwd-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <HiOutlineEyeSlash size={20} /> : <HiOutlineEye size={20} />}
              </button>
            </div>

            <button 
              type="submit" 
              className="auth-submit-btn" 
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create an Account'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
