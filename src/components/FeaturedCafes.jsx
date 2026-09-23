import { useEffect, useRef } from 'react';
import { FiMapPin, FiMonitor } from 'react-icons/fi';
import { IoGameControllerOutline } from 'react-icons/io5';
import mapPinAsset from '../assets/3d-map-pin.jpg';
import './FeaturedCafes.css';

const cafesData = [
  {
    id: 1,
    name: 'Cyber Zone Gaming',
    location: 'Lokhandwala, Andheri West',
    rating: '4.8',
    stations: '16 PCs · 4 Consoles',
    price: 'From ₹60/hr',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)', // purple-blue
    status: 'Live Availability',
  },
  {
    id: 2,
    name: 'Arena eSports Lounge',
    location: 'Oshiwara, Andheri West',
    rating: '4.7',
    stations: '12 PCs · 6 Consoles',
    price: 'From ₹80/hr',
    gradient: 'linear-gradient(135deg, #00d4ff 0%, #0d9488 100%)', // cyan-teal
    status: 'Tournaments Live',
  },
  {
    id: 3,
    name: 'Pixel Play Café',
    location: 'Link Road, Andheri West',
    rating: '4.9',
    stations: '20 PCs · 4 Consoles',
    price: 'From ₹65/hr',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)', // amber-orange
    status: 'Top Rated Spot',
  },
  {
    id: 4,
    name: 'Nexus Gaming Hub',
    location: '4 Bungalows, Andheri West',
    rating: '4.8',
    stations: '14 PCs · 8 Consoles',
    price: 'From ₹70/hr',
    gradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)', // green-emerald
    status: 'VR Ready Hub',
  },
];

const FeaturedCafes = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-in');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <section className="section cafes-section" id="cafes" ref={sectionRef}>
      <div className="cafes-ambient-glow-1" aria-hidden="true" />
      <div className="cafes-ambient-glow-2" aria-hidden="true" />

      <div className="container">
        {/* Section Header with 3D Asset */}
        <div className="section-header-grid fade-in">
          <div className="section-header-text">
            <h2 className="section-title">Top Gaming Cafés Near You</h2>
            <p className="section-subtitle">
              Discover the best gaming spots in Andheri West with real-time station availability
            </p>
          </div>
          <div className="section-header-asset">
            <img src={mapPinAsset} alt="Map Pin" className="map-pin-3d" />
          </div>
        </div>

        {/* Horizontal Scrollable Carousel */}
        <div className="cafes-carousel-container fade-in">
          <div className="cafes-scroll-track">
            {cafesData.map((cafe) => (
              <div key={cafe.id} className="card cafe-card">
                {/* 200px Gradient Image Placeholder */}
                <div
                  className="cafe-image-banner"
                  style={{ background: cafe.gradient }}
                >
                  <div className="cafe-image-pattern" />
                  <IoGameControllerOutline className="cafe-image-watermark" />
                  <span className="cafe-status-badge">
                    <span className="cafe-live-dot" />
                    {cafe.status}
                  </span>
                  <span className="cafe-rating-badge">
                    ⭐ {cafe.rating}
                  </span>
                </div>

                {/* Card Content */}
                <div className="cafe-body">
                  <div className="cafe-meta">
                    <h3 className="cafe-name">{cafe.name}</h3>
                    <p className="cafe-location text-secondary">
                      <FiMapPin className="cafe-location-icon" />
                      <span>{cafe.location}</span>
                    </p>
                  </div>

                  <div className="cafe-specs">
                    <div className="cafe-spec-item">
                      <span className="cafe-spec-label">
                        <FiMonitor className="cafe-spec-icon" /> Stations
                      </span>
                      <span className="cafe-stations-val">{cafe.stations}</span>
                    </div>
                    <div className="cafe-spec-item">
                      <span className="cafe-spec-label">Price</span>
                      <span className="cafe-price-val">{cafe.price}</span>
                    </div>
                  </div>

                  <div className="cafe-action-wrap">
                    <button type="button" className="btn btn-primary cafe-book-btn">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Centered View All Link */}
        <div className="cafes-footer fade-in">
          <a href="#cafes" className="cafes-view-all-link">
            View All Cafés <span className="cafes-view-all-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCafes;
