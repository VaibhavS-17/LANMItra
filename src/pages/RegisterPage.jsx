import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HiOutlineUser, 
  HiOutlineEnvelope, 
  HiOutlineLockClosed, 
  HiOutlineEye, 
  HiOutlineEyeSlash,
  HiOutlineComputerDesktop,
  HiOutlineBuildingStorefront,
  HiOutlineShieldExclamation,
  HiOutlineCheckBadge
} from 'react-icons/hi2';
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
      setError('Password must be at least 8 characters in length.');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password, role);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to complete registration. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-panel">
        <div className="auth-badge-container">
          <div className="auth-badge">
            <HiOutlineCheckBadge size={14} />
            <span>Join LANMitra</span>
          </div>
        </div>

        <div className="auth-header-section">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-desc">Choose your profile type to register on the platform.</p>
        </div>

        {error && (
          <div className="auth-alert-error">
            <HiOutlineShieldExclamation className="auth-alert-icon" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form-body">
          {/* Professional Role Selection */}
          <div className="auth-field-group">
            <label className="auth-label">Account Type</label>
            <div className="auth-role-tabs">
              <div 
                className={`auth-role-card ${role === 'PLAYER' ? 'active' : ''}`}
                onClick={() => setRole('PLAYER')}
                role="button"
                tabIndex={0}
              >
                <div className="auth-role-header">
                  <HiOutlineComputerDesktop className="auth-role-icon" />
                  <span className="auth-role-name">Player</span>
                </div>
                <span className="auth-role-desc">Book rigs & compete in events</span>
              </div>

              <div 
                className={`auth-role-card ${role === 'CAFE_OWNER' ? 'active' : ''}`}
                onClick={() => setRole('CAFE_OWNER')}
                role="button"
                tabIndex={0}
              >
                <div className="auth-role-header">
                  <HiOutlineBuildingStorefront className="auth-role-icon" />
                  <span className="auth-role-name">Café Operator</span>
                </div>
                <span className="auth-role-desc">Manage venue & workstations</span>
              </div>
            </div>
          </div>

          <div className="auth-field-group">
            <label className="auth-label" htmlFor="reg-name">Full Name</label>
            <div className="auth-input-container">
              <HiOutlineUser className="auth-input-icon" />
              <input
                type="text"
                id="reg-name"
                className="auth-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Mercer"
                required
                autoComplete="name"
              />
            </div>
          </div>

          <div className="auth-field-group">
            <label className="auth-label" htmlFor="reg-email">Email Address</label>
            <div className="auth-input-container">
              <HiOutlineEnvelope className="auth-input-icon" />
              <input
                type="email"
                id="reg-email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="auth-field-group">
            <label className="auth-label" htmlFor="reg-password">
              <span>Password</span>
            </label>
            <div className="auth-input-container">
              <HiOutlineLockClosed className="auth-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="reg-password"
                className="auth-input has-toggle"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="new-password"
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
            <span className="auth-hint">Must contain at least 8 characters.</span>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary auth-btn-submit" 
            disabled={loading}
          >
            {loading ? 'Creating Profile...' : 'Complete Registration'}
          </button>
        </form>

        <div className="auth-footer-prompt">
          <span>Already have an account?</span>
          <Link to="/login" className="auth-prompt-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
