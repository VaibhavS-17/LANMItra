import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiMapPin, HiClock, HiPhone } from 'react-icons/hi2';
import { cafeService } from '../services/cafeService';
import { stationService } from '../services/stationService';
import './Cafe.css';

const CafeDetailPage = () => {
  const { id } = useParams();
  const [cafe, setCafe] = useState(null);
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cafeData, stationsData] = await Promise.all([
          cafeService.getCafeById(id),
          stationService.getStationsByCafe(id)
        ]);
        setCafe(cafeData);
        setStations(stationsData);
      } catch (err) {
        setError('Failed to load café details.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  if (loading) return <div className="cafe-page-container" style={{ textAlign: 'center' }}>Loading...</div>;
  if (error) return <div className="cafe-page-container" style={{ textAlign: 'center', color: '#fca5a5' }}>{error}</div>;
  if (!cafe) return <div className="cafe-page-container" style={{ textAlign: 'center' }}>Café not found.</div>;

  return (
    <>
      <div 
        className="cafe-detail-hero"
        style={{ 
          backgroundImage: `url(${cafe.imageUrl || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200'})`
        }}
      >
        <div className="cafe-hero-content">
          <h1 className="cafe-hero-title">{cafe.name}</h1>
          <div className="cafe-hero-meta">
            <span><HiMapPin size={20} /> {cafe.city}</span>
            <span><HiClock size={20} /> {cafe.openingTime?.substring(0,5)} - {cafe.closingTime?.substring(0,5)}</span>
          </div>
        </div>
      </div>

      <div className="cafe-detail-body">
        {/* Left Column: Description & Stations */}
        <div>
          <h2 className="cafe-section-title">About the Venue</h2>
          <div className="cafe-description-section">
            <p>{cafe.description || 'Welcome to one of our premium partner LAN cafés. Prepare for the ultimate gaming experience with top-tier rigs and an immersive environment.'}</p>
          </div>

          <h2 className="cafe-section-title" style={{ marginTop: '48px' }}>Available Stations</h2>
          <div className="station-grid">
            {stations.filter(s => s.isActive).length === 0 ? (
              <p style={{ color: '#7a8291' }}>No active stations found.</p>
            ) : (
              stations.filter(s => s.isActive).map(station => (
                <div key={station.id} className="station-card">
                  <div className="station-info">
                    <h4>{station.label}</h4>
                    <div className="station-specs">{station.specs}</div>
                    <div className="station-price">₹{station.hourlyRate} / hour</div>
                  </div>
                  <Link to={`/bookings/new?stationId=${station.id}`} className="btn-book">
                    Book Now
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Sidebar Info */}
        <div>
          <div className="cafe-sidebar">
            <div className="sidebar-item">
              <h5>Location</h5>
              <p>{cafe.address}</p>
              <p>{cafe.city}</p>
            </div>
            
            <div className="sidebar-item">
              <h5>Contact</h5>
              <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HiPhone /> {cafe.phone || 'Not provided'}
              </p>
            </div>
            
            <div className="sidebar-item">
              <h5>Status</h5>
              {cafe.isActive ? (
                <span style={{ color: '#4ade80', fontWeight: '500' }}>● Open for bookings</span>
              ) : (
                <span style={{ color: '#f87171', fontWeight: '500' }}>● Currently Closed</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CafeDetailPage;
