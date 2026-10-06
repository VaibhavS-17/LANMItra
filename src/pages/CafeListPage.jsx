import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiMagnifyingGlass, HiMapPin } from 'react-icons/hi2';
import { cafeService } from '../services/cafeService';
import './Cafe.css';

const CafeListPage = () => {
  const [cafes, setCafes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCafes();
  }, []);

  const fetchCafes = async (query = '') => {
    setLoading(true);
    try {
      const data = await cafeService.getAllCafes(query);
      setCafes(data);
    } catch (err) {
      setError('Failed to load cafés.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCafes(searchTerm);
  };

  return (
    <div className="cafe-page-container">
      <div className="cafe-list-header">
        <h1 className="cafe-list-title">Discover Partner Cafés</h1>
        <p style={{ color: '#a0aec0', fontSize: '1.1rem' }}>Find the best premium gaming stations near you.</p>
        
        <form className="cafe-search-container" onSubmit={handleSearch}>
          <HiMagnifyingGlass className="cafe-search-icon" />
          <input
            type="text"
            className="cafe-search-input"
            placeholder="Search by name or city (e.g. Andheri)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading cafés...</div>
      ) : error ? (
        <div style={{ textAlign: 'center', color: '#fca5a5' }}>{error}</div>
      ) : (
        <div className="cafe-grid">
          {cafes.map((cafe) => (
            <Link to={`/cafes/${cafe.id}`} key={cafe.id} className="cafe-card">
              <div 
                className="cafe-card-image"
                style={{ 
                  backgroundImage: `url(${cafe.imageUrl || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="cafe-card-content">
                <h3 className="cafe-card-title">{cafe.name}</h3>
                <div className="cafe-card-location">
                  <HiMapPin size={16} />
                  <span>{cafe.address}, {cafe.city}</span>
                </div>
                
                <div className="cafe-card-footer">
                  <span className="cafe-card-badge">{cafe.isActive ? 'Open Now' : 'Closed'}</span>
                  <span style={{ fontSize: '0.85rem', color: '#a0aec0' }}>
                    {cafe.openingTime && cafe.closingTime ? `${cafe.openingTime.substring(0,5)} - ${cafe.closingTime.substring(0,5)}` : 'Hours unlisted'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
          {cafes.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#7a8291' }}>
              No cafés found matching your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CafeListPage;
