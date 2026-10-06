import React, { useState, useEffect } from 'react';
import { HiBars3, HiXMark } from 'react-icons/hi2';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import logo from '../assets/logo-darkmode.png';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}>
      <div className="container navbar-container">
        {/* Left: Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src={logo} alt="LANMitra" className="navbar-logo-img" />
        </Link>

        {/* Center: Pill Navigation */}
        <nav className="navbar-nav desktop-only">
          <div className="nav-pill">
            <Link to="/cafes" className="navbar-link">Cafés</Link>
            <Link to="/tournaments" className="navbar-link">Tournaments</Link>
            <Link to="/leaderboards" className="navbar-link">Leaderboards</Link>
            {isAuthenticated && (user?.role === 'CAFE_OWNER' || user?.role === 'ADMIN') && (
              <Link to="/dashboard" className="navbar-link">Dashboard</Link>
            )}
            {isAuthenticated && user?.role === 'PLAYER' && (
              <Link to="/bookings/my" className="navbar-link">My Bookings</Link>
            )}
          </div>
        </nav>

        {/* Right: Actions */}
        <div className="navbar-actions desktop-only">
          {isAuthenticated ? (
            <>
              <span style={{ marginRight: '16px', fontWeight: '500' }}>{user?.name || 'User'}</span>
              <button onClick={handleLogout} className="btn btn-outline navbar-btn">Logout</button>
            </>
          ) : !isAuthPage && (
            <>
              <Link to="/login" className="btn btn-outline navbar-btn">Login</Link>
              <Link to="/register" className="btn btn-primary navbar-btn">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <HiXMark size={28} /> : <HiBars3 size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="navbar-mobile-nav">
          <Link to="/cafes" className="navbar-mobile-link" onClick={closeMenu}>Cafés</Link>
          <Link to="/tournaments" className="navbar-mobile-link" onClick={closeMenu}>Tournaments</Link>
          <Link to="/leaderboards" className="navbar-mobile-link" onClick={closeMenu}>Leaderboards</Link>
          {isAuthenticated && (user?.role === 'CAFE_OWNER' || user?.role === 'ADMIN') && (
            <Link to="/dashboard" className="navbar-mobile-link" onClick={closeMenu}>Dashboard</Link>
          )}
          {isAuthenticated && user?.role === 'PLAYER' && (
            <Link to="/bookings/my" className="navbar-mobile-link" onClick={closeMenu}>My Bookings</Link>
          )}
        </nav>
        <div className="navbar-mobile-actions" style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '12px 24px 0 24px' }}>
          {isAuthenticated ? (
            <>
              <div style={{ textAlign: 'center', marginBottom: '8px', fontWeight: '500' }}>Hi, {user?.name || 'User'}</div>
              <button onClick={handleLogout} className="btn btn-outline navbar-btn" style={{ width: '100%' }}>
                Logout
              </button>
            </>
          ) : !isAuthPage && (
            <>
              <Link to="/login" className="btn btn-outline navbar-btn" style={{ width: '100%', textAlign: 'center' }} onClick={closeMenu}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary navbar-btn" style={{ width: '100%', textAlign: 'center' }} onClick={closeMenu}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
