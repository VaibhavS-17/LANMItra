import React, { useState, useEffect } from 'react';
import { cafeService } from '../services/cafeService';
import { stationService } from '../services/stationService';
import { bookingService } from '../services/bookingService';
import './Dashboard.css';

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [myCafes, setMyCafes] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState(null);
  
  // Bookings State
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [bookings, setBookings] = useState([]);
  
  // Stations State
  const [stations, setStations] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStation, setNewStation] = useState({ label: '', type: 'PC', specs: '', hourlyRate: '' });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCafes();
  }, []);

  useEffect(() => {
    if (selectedCafe) {
      if (activeTab === 'bookings') {
        fetchBookings();
      } else if (activeTab === 'stations') {
        fetchStations();
      }
    }
  }, [selectedCafe, activeTab, date]);

  const fetchCafes = async () => {
    try {
      const data = await cafeService.getMyCafes();
      setMyCafes(data);
      if (data.length > 0) {
        setSelectedCafe(data[0]);
      }
    } catch (err) {
      setError('Failed to load your cafes.');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const data = await bookingService.getCafeBookings(selectedCafe.id, date);
      setBookings(data || []);
    } catch (err) {
      console.error(err);
      setBookings([]);
    }
  };

  const fetchStations = async () => {
    try {
      const data = await stationService.getStationsByCafe(selectedCafe.id);
      setStations(data || []);
    } catch (err) {
      console.error(err);
      setStations([]);
    }
  };

  const handleAddStation = async (e) => {
    e.preventDefault();
    try {
      await stationService.addStation(selectedCafe.id, {
        ...newStation,
        hourlyRate: parseFloat(newStation.hourlyRate)
      });
      setNewStation({ label: '', type: 'PC', specs: '', hourlyRate: '' });
      setShowAddForm(false);
      fetchStations();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add station');
    }
  };

  const handleDeactivate = async (stationId) => {
    if (!window.confirm('Are you sure you want to deactivate this station?')) return;
    try {
      await stationService.deactivateStation(selectedCafe.id, stationId);
      fetchStations();
    } catch (err) {
      alert('Failed to deactivate station');
    }
  };

  if (loading) return <div className="dashboard-container"><p>Loading...</p></div>;

  if (myCafes.length === 0) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-content text-center" style={{paddingTop: '60px'}}>
          <h2>Welcome to the Owner Dashboard</h2>
          <p style={{color: '#a0aec0', marginTop: '16px'}}>You don't have any cafes registered yet.</p>
        </div>
      </div>
    );
  }

  if (!selectedCafe) return null;

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>{selectedCafe?.name || 'Cafe'} Dashboard</h1>
          <p>Manage your daily operations and gaming stations.</p>
        </div>

        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            Daily Bookings
          </button>
          <button 
            className={`tab-btn ${activeTab === 'stations' ? 'active' : ''}`}
            onClick={() => setActiveTab('stations')}
          >
            Manage Stations
          </button>
        </div>

        {activeTab === 'bookings' && (
          <div className="dashboard-panel">
            <div className="panel-toolbar">
              <h2>Reservations</h2>
              <input 
                type="date" 
                className="dash-input" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            
            <div className="dash-table-wrapper">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Player</th>
                    <th>Station</th>
                    <th>Time</th>
                    <th>Total Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length === 0 ? (
                    <tr><td colSpan="5" style={{textAlign: 'center', color: '#a0aec0'}}>No bookings for this date.</td></tr>
                  ) : (
                    bookings.map(b => (
                      <tr key={b.id}>
                        <td>
                          <div style={{fontWeight: '600'}}>{b.playerName || 'Unknown'}</div>
                          <div style={{fontSize: '0.85rem', color: '#a0aec0'}}>{b.playerEmail || 'No email'}</div>
                        </td>
                        <td>{b.stationLabel}</td>
                        <td>{b.startTime?.substring(0,5)} - {b.endTime?.substring(0,5)}</td>
                        <td style={{color: 'var(--accent-cyan)'}}>₹{b.totalPrice}</td>
                        <td>
                          <span className={b.status === 'CONFIRMED' ? 'badge-active' : 'badge-inactive'}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'stations' && (
          <div className="dashboard-panel">
            <div className="panel-toolbar">
              <h2>Gaming Stations</h2>
              <button 
                className="btn-add"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                {showAddForm ? 'Cancel' : '+ Add Station'}
              </button>
            </div>

            {showAddForm && (
              <form className="add-station-form" onSubmit={handleAddStation}>
                <div className="form-group">
                  <label>Label</label>
                  <input required type="text" className="dash-input" placeholder="e.g. PC 12" value={newStation.label} onChange={e => setNewStation({...newStation, label: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select className="dash-input" value={newStation.type} onChange={e => setNewStation({...newStation, type: e.target.value})}>
                    <option value="PC">PC</option>
                    <option value="CONSOLE">Console</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Specs (Optional)</label>
                  <input type="text" className="dash-input" placeholder="RTX 4080, 32GB RAM..." value={newStation.specs} onChange={e => setNewStation({...newStation, specs: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Rate / Hour (₹)</label>
                  <input required type="number" min="0" className="dash-input" placeholder="150" value={newStation.hourlyRate} onChange={e => setNewStation({...newStation, hourlyRate: e.target.value})} />
                </div>
                <div style={{display: 'flex', gap: '8px', paddingBottom: '2px'}}>
                  <button type="submit" className="btn-add">Save</button>
                </div>
              </form>
            )}

            <div className="dash-table-wrapper">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Label</th>
                    <th>Type</th>
                    <th>Specs</th>
                    <th>Rate/Hr</th>
                    <th>Status</th>
                    <th style={{textAlign: 'right'}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {stations.length === 0 ? (
                    <tr><td colSpan="6" style={{textAlign: 'center', color: '#a0aec0'}}>No stations added yet.</td></tr>
                  ) : (
                    stations.map(s => (
                      <tr key={s.id}>
                        <td style={{fontWeight: '600'}}>{s.label}</td>
                        <td>{s.type}</td>
                        <td style={{color: '#a0aec0', fontSize: '0.9rem'}}>{s.specs || '-'}</td>
                        <td style={{color: 'var(--accent-cyan)'}}>₹{s.hourlyRate}</td>
                        <td>
                          {s.active ? <span className="badge-active">Active</span> : <span className="badge-inactive">Inactive</span>}
                        </td>
                        <td style={{textAlign: 'right'}}>
                          {s.active && (
                            <button className="btn-deactivate" onClick={() => handleDeactivate(s.id)}>
                              Deactivate
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
