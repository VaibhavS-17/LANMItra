import { useEffect, useRef, useState } from 'react';
import { FiMapPin, FiMonitor } from 'react-icons/fi';
import { IoGameControllerOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import mapPinAsset from '../assets/3d-map-pin.jpg';
import API from '../services/api';
import './FeaturedCafes.css';

const FeaturedCafes = () => {
  const sectionRef = useRef(null);
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/cafes').then(res => {
      // Just take top 4 cafes for the homepage
      setCafes(res.data.slice(0, 4));
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    const elements = sectionRef.current?.querySelectorAll('.fade-in');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  return (
    <section className="section cafes-section" id="cafes" ref={sectionRef}>
      <div className="cafes-ambient-glow-1" aria-hidden="true" />
      <div className="cafes-ambient-glow-2" aria-hidden="true" />

      <div className="container">
        <div className="section-header-grid fade-in">
          <div className="section-header-text">
            <h2 className="section-title">Top Gaming Cafes Near You</h2>
            <p className="section-subtitle">
              Discover the best gaming spots with real-time station availability
            </p>
          </div>
          <div className="section-header-asset">
            <img src={mapPinAsset} alt="Map Pin" className="map-pin-3d" />
          </div>
        </div>

        <div className="cafes-carousel-container fade-in">
          <div className="cafes-scroll-track">
            {loading ? <p>Loading cafes...</p> : cafes.map((cafe, idx) => {
              const gradients = [
                'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
                'linear-gradient(135deg, #00d4ff 0%, #0d9488 100%)',
                'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                'linear-gradient(135deg, #10b981 0%, #047857 100%)'
              ];
              const gradient = gradients[idx % gradients.length];
              return (
                <div key={cafe.id} className="card cafe-card">
                  <div className="cafe-image-banner" style={{ background: gradient }}>
                    <div className="cafe-image-pattern" />
                    <IoGameControllerOutline className="cafe-image-watermark" />
                    <span className="cafe-status-badge">
                      <span className="cafe-live-dot" /> Live
                    </span>
                  </div>

                  <div className="cafe-body">
                    <div className="cafe-meta">
                      <h3 className="cafe-name">{cafe.name}</h3>
                      <p className="cafe-location text-secondary">
                        <FiMapPin className="cafe-location-icon" />
                        <span>{cafe.location}</span>
                      </p>
                    </div>

                    <div className="cafe-action-wrap">
                      <Link to={/cafes/ + cafe.id} className="btn btn-primary cafe-book-btn">
                        View & Book
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="cafes-footer fade-in">
          <Link to="/cafes" className="cafes-view-all-link">
            View All Cafes <span className="cafes-view-all-arrow">?</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCafes;
