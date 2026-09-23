import React from 'react';
import { HiMagnifyingGlass, HiChevronDown } from 'react-icons/hi2';
import './HeroSection.css';
import heroAsset from '../assets/hero-3d-asset.jpg';
import heroLeftAsset from '../assets/hero-left-asset.jpg';

const HeroSection = () => {
  return (
    <section className="hero-section" id="hero">
      {/* Background Neon Green Glow */}
      <div className="hero-bottom-glow" aria-hidden="true" />
      
      {/* Floating 3D Background Assets */}
      <div className="hero-bg-asset-right" aria-hidden="true">
        <img src={heroAsset} alt="Gaming Setup" className="hero-bg-asset-img" />
      </div>
      
      <div className="hero-bg-asset-left" aria-hidden="true">
        <img src={heroLeftAsset} alt="Network Globe" className="hero-bg-asset-img" />
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-line">
              Find Your <span className="hero-title-cyan">Arena</span>.
            </span>
            <span className="hero-title-line">Dominate the Game.</span>
          </h1>

          <p className="hero-subtext">
            Book stations · Compete in tournaments · Win
          </p>

          {/* Static Search Bar */}
          <div className="hero-search card">
            <HiMagnifyingGlass className="hero-search-icon" />
            <input
              type="text"
              className="hero-search-input"
              placeholder="Search cafés or tournaments..."
              readOnly
              aria-label="Search cafés or tournaments"
            />
            <button type="button" className="btn btn-primary hero-search-btn" tabIndex={-1}>
              Search
            </button>
          </div>

          {/* Call to Action Buttons */}
          <div className="hero-cta-group">
            <a href="#cafes" className="btn btn-primary hero-cta-btn">
              Book a Station
            </a>
            <a href="#tournaments" className="btn btn-outline hero-cta-btn">
              Browse Tournaments
            </a>
          </div>
        </div>
      </div>

      {/* Animated Bouncing Scroll Indicator */}
      <a href="#cafes" className="hero-scroll-indicator" aria-label="Scroll to content">
        <span className="hero-scroll-label">Scroll to explore</span>
        <HiChevronDown className="hero-scroll-chevron" />
      </a>
    </section>
  );
};

export default HeroSection;
