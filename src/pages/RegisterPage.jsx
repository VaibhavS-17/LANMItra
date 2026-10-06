import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';
import { useAuth } from '../hooks/useAuth';
import './Auth.css';

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
    <div className="auth-wrapper">
      <div className="auth-panel">
        <h1 className="auth-title">Create account</h1>

        {error && (
          <div className="auth-alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form-body">
          <div className="auth-role-tabs">
            <div 
              className={`auth-role-card ${role === 'PLAYER' ? 'active' : ''}`}
              onClick={() => setRole('PLAYER')}
              role="button"
              tabIndex={0}
            >
              Player
            </div>
            <div 
              className={`auth-role-card ${role === 'CAFE_OWNER' ? 'active' : ''}`}
              onClick={() => setRole('CAFE_OWNER')}
              role="button"
              tabIndex={0}
            >
              Café Owner
            </div>
          </div>

          <div className="auth-input-container">
            <input
              type="text"
              className="auth-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              required
              autoComplete="name"
            />
          </div>

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
              autoComplete="new-password"
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
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </form>

        <div className="auth-footer-prompt">
          Already have an account?
          <Link to="/login" className="auth-prompt-link">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
