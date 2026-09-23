import React, { useState, useEffect } from 'react';
import { HiBars3, HiXMark } from 'react-icons/hi2';
import logo from '../assets/logo-darkmode.png';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Left: Logo */}
        <a href="#" className="navbar-logo" onClick={closeMenu}>
          <img src={logo} alt="LANMitra" className="navbar-logo-img" />
        </a>

        {/* Center: Pill Navigation */}
        <nav className="navbar-nav desktop-only">
          <div className="nav-pill">
            <a href="#cafes" className="navbar-link">Cafés</a>
            <a href="#tournaments" className="navbar-link">Tournaments</a>
            <a href="#leaderboard" className="navbar-link">Leaderboards</a>
          </div>
        </nav>

        {/* Right: Actions */}
        <div className="navbar-actions desktop-only">
          <button className="btn btn-outline navbar-btn">Login</button>
          <button className="btn btn-primary navbar-btn">Sign Up</button>
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
          <a href="#cafes" className="navbar-mobile-link" onClick={closeMenu}>Cafés</a>
          <a href="#tournaments" className="navbar-mobile-link" onClick={closeMenu}>Tournaments</a>
          <a href="#leaderboard" className="navbar-mobile-link" onClick={closeMenu}>Leaderboards</a>
        </nav>
        <div className="navbar-mobile-actions" style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '12px 24px 0 24px' }}>
          <button className="btn btn-outline navbar-btn" style={{ width: '100%' }} onClick={closeMenu}>
            Login
          </button>
          <button className="btn btn-primary navbar-btn" style={{ width: '100%' }} onClick={closeMenu}>
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
