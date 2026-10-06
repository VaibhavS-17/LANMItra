import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';
import { useAuth } from '../hooks/useAuth';
import './Auth.css';
import logo from '../assets/logo-darkmode.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const loggedInUser = await login(email, password);
      if (loggedInUser?.role === 'CAFE_OWNER' || loggedInUser?.role === 'ADMIN') {
        navigate('/dashboard');
      } else {
        navigate('/cafes');
      }
    } catch (err) {
      setError('Invalid email or password.');
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
            <h2 className="auth-image-title">Access Your<br />Network</h2>
            <p className="auth-image-subtitle">
              Log in to manage your bookings, discover competitive tournaments, and track your gameplay stats.
            </p>
          </div>
        </div>

        {/* Right Form Pane */}
        <div className="auth-form-pane">
          
          <div className="auth-route-toggle">
            <Link to="/register" className="auth-route-link">Sign Up</Link>
            <Link to="/login" className="auth-route-link active">Log In</Link>
          </div>

          <h1 className="auth-title">Log In</h1>

          {error && (
            <div className="auth-alert-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
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
                autoComplete="current-password"
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
              {loading ? 'Authenticating...' : 'Log In'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
