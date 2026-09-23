import React from 'react';
import { FiGithub, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import logo from '../assets/logo-darkmode.png';
import './Footer.css';

const Footer = () => {
  const playerLinks = [
    'Browse Cafés',
    'Find Tournaments',
    'Leaderboards',
    'How It Works',
  ];

  const businessLinks = [
    'List Your Café',
    'Organize Tournaments',
    'Pricing',
    'Business Dashboard',
  ];

  const supportLinks = [
    'Help Center',
    'Contact Us',
    'Terms of Service',
    'Privacy Policy',
  ];

  const socialLinks = [
    { icon: <FiGithub size={16} />, label: 'GitHub', href: '#' },
    { icon: <FiTwitter size={16} />, label: 'Twitter', href: '#' },
    { icon: <FiInstagram size={16} />, label: 'Instagram', href: '#' },
    { icon: <FiLinkedin size={16} />, label: 'LinkedIn', href: '#' },
  ];

  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* Top Section: 4-Column Grid */}
        <div className="footer-top">
          {/* Column 1: Brand */}
          <div className="footer-column footer-brand">
            <a href="#" className="footer-logo-link" aria-label="LANMitra Home">
              <img src={logo} alt="LANMitra" className="footer-logo" />
            </a>
            <p className="footer-tagline">
              Your gateway to local gaming tournaments and café bookings.
            </p>
            <div className="footer-socials" aria-label="Social media links">
              {socialLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="footer-social-btn"
                  aria-label={item.label}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.preventDefault()}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: For Players */}
          <div className="footer-column">
            <h4 className="footer-heading">For Players</h4>
            <ul className="footer-links">
              {playerLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="footer-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: For Business */}
          <div className="footer-column">
            <h4 className="footer-heading">For Business</h4>
            <ul className="footer-links">
              {businessLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="footer-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="footer-column">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              {supportLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="footer-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider line */}
        <div className="footer-divider" />

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; 2026 LANMitra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
