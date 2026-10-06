import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HiOutlineEnvelope, 
  HiOutlineLockClosed, 
  HiOutlineEye, 
  HiOutlineEyeSlash,
  HiOutlineShieldCheck,
  HiOutlineShieldExclamation
} from 'react-icons/hi2';
import { useAuth } from '../hooks/useAuth';
import './Auth.css';

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
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-panel">
        <div className="auth-badge-container">
          <div className="auth-badge">
            <HiOutlineShieldCheck size={14} />
            <span>Secure Access</span>
          </div>
        </div>

        <div className="auth-header-section">
          <h1 className="auth-title">Sign In</h1>
          <p className="auth-desc">Access your LAN reservations, tournament brackets, and stats.</p>
        </div>

        {error && (
          <div className="auth-alert-error">
            <HiOutlineShieldExclamation className="auth-alert-icon" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form-body">
          <div className="auth-field-group">
            <label className="auth-label" htmlFor="login-email">Email Address</label>
            <div className="auth-input-container">
              <HiOutlineEnvelope className="auth-input-icon" />
              <input
                type="email"
                id="login-email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="auth-field-group">
            <label className="auth-label" htmlFor="login-password">
              <span>Password</span>
            </label>
            <div className="auth-input-container">
              <HiOutlineLockClosed className="auth-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="login-password"
                className="auth-input has-toggle"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary auth-btn-submit" 
            disabled={loading}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer-prompt">
          <span>Don't have an account?</span>
          <Link to="/register" className="auth-prompt-link">Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
