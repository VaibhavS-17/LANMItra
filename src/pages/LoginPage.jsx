import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';
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
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-panel">
        <h1 className="auth-title">Log in</h1>

        {error && (
          <div className="auth-alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form-body">
          <div className="auth-input-container">
            <input
              type="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              autoComplete="email"
            />
          </div>

          <div className="auth-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              className="auth-input has-toggle"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="auth-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <HiOutlineEyeSlash size={18} /> : <HiOutlineEye size={18} />}
            </button>
          </div>

          <button 
            type="submit" 
            className="auth-btn-submit" 
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Continue'}
          </button>
        </form>

        <div className="auth-footer-prompt">
          Don't have an account?
          <Link to="/register" className="auth-prompt-link">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
