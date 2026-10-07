import React, { useState, useEffect } from 'react';
import { cafeService } from '../services/cafeService';
import { stationService } from '../services/stationService';
import { bookingService } from '../services/bookingService';
import { tournamentService } from '../services/tournamentService';
import API from '../services/api';
import './Dashboard.css';

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview'); // overview, cafes, tournaments, leaderboards
  const [innerTab, setInnerTab] = useState('bookings'); // bookings, stations (inside overview)
  
  const [myCafes, setMyCafes] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState(null);
  
  // Bookings State
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [bookings, setBookings] = useState([]);
  
  // Stations State
  const [stations, setStations] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStation, setNewStation] = useState({ label: '', type: 'PC', specs: '', hourlyRate: '' });

  // Cafe Registration State
  const [newCafe, setNewCafe] = useState({ name: '', address: '', city: '', phone: '', openingTime: '10:00:00', closingTime: '23:00:00', description: '' });
  
  // Tournament State
  const [newTournament, setNewTournament] = useState({ name: '', game: 'Valorant', startDate: '', endDate: '', prizePool: '', entryFee: '', maxParticipants: 32 });
  
  // Leaderboard State
  const [matchResult, setMatchResult] = useState({ playerEmail: '', game: 'Valorant', won: true });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCafes();
  }, []);

  useEffect(() => {
    if (selectedCafe && activeTab === 'overview') {
      if (innerTab === 'bookings') fetchBookings();
      else if (innerTab === 'stations') fetchStations();
    }
  }, [selectedCafe, activeTab, innerTab, date]);

  const fetchCafes = async () => {
    try {
      const data = await cafeService.getMyCafes();
      setMyCafes(data);
      if (data.length > 0 && !selectedCafe) {
        setSelectedCafe(data[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    if(!selectedCafe) return;
    try {
      const data = await bookingService.getCafeBookings(selectedCafe.id, date);
      setBookings(data || []);
    } catch (err) {
      setBookings([]);
    }
  };

  const fetchStations = async () => {
    if(!selectedCafe) return;
    try {
      const data = await stationService.getStationsByCafe(selectedCafe.id);
      setStations(data || []);
    } catch (err) {
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
      alert('Failed to add station');
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

  const handleCreateCafe = async (e) => {
    e.preventDefault();
    try {
      await cafeService.createCafe(newCafe);
      alert('Cafe Registered Successfully!');
      setNewCafe({ name: '', address: '', city: '', phone: '', openingTime: '10:00:00', closingTime: '23:00:00', description: '' });
      fetchCafes();
      setActiveTab('overview');
    } catch (err) {
      alert('Failed to create cafe');
    }
  };

  const handleCreateTournament = async (e) => {
    e.preventDefault();
    if(!selectedCafe) return alert("Select a cafe first");
    try {
      await tournamentService.createTournament({
        ...newTournament,
        cafeId: selectedCafe.id,
        startDate: new Date(newTournament.startDate).toISOString(),
        endDate: new Date(newTournament.endDate).toISOString(),
        prizePool: parseFloat(newTournament.prizePool),
        entryFee: parseFloat(newTournament.entryFee),
        maxParticipants: parseInt(newTournament.maxParticipants)
      });
      alert('Tournament Created Successfully!');
      setNewTournament({ name: '', game: 'Valorant', startDate: '', endDate: '', prizePool: '', entryFee: '', maxParticipants: 32 });
    } catch (err) {
      alert('Failed to create tournament');
    }
  };

  const handleUpdateLeaderboard = async (e) => {
    e.preventDefault();
    try {
      await API.post('/leaderboards/update', {
        playerEmail: matchResult.playerEmail,
        game: matchResult.game,
        won: matchResult.won
      });
      alert('Match result submitted and Elo updated!');
      setMatchResult({ ...matchResult, playerEmail: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update Elo. Check if email is correct.');
    }
  };

  if (loading) return <div className="dashboard-container"><p>Loading...</p></div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Owner Dashboard</h1>
          <p>Manage your business, tournaments, and leaderboards.</p>
        </div>

        {/* TOP LEVEL TABS */}
        <div className="dashboard-tabs">
          <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
          <button className={`tab-btn ${activeTab === 'cafes' ? 'active' : ''}`} onClick={() => setActiveTab('cafes')}>My Cafes</button>
          <button className={`tab-btn ${activeTab === 'tournaments' ? 'active' : ''}`} onClick={() => setActiveTab('tournaments')}>Tournaments</button>
          <button className={`tab-btn ${activeTab === 'leaderboards' ? 'active' : ''}`} onClick={() => setActiveTab('leaderboards')}>Leaderboards</button>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <>
            {myCafes.length === 0 ? (
               <div className="text-center" style={{paddingTop: '40px'}}>
                 <h2>Welcome to the Owner Dashboard</h2>
                 <p style={{color: '#a0aec0', marginTop: '16px', marginBottom: '24px'}}>You don't have any cafes registered yet.</p>
                 <button className="btn btn-primary" onClick={() => setActiveTab('cafes')}>Register Your First Cafe</button>
               </div>
            ) : (
               <div style={{ marginTop: '20px' }}>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{marginRight: '10px', color: '#a0aec0'}}>Select Cafe: </label>
                    <select className="dash-input" style={{width: '250px', display: 'inline-block'}} value={selectedCafe?.id || ''} onChange={(e) => setSelectedCafe(myCafes.find(c => c.id == e.target.value))}>
                      {myCafes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>

                  <div className="dashboard-tabs" style={{ borderBottom: '1px solid #2d3748', paddingBottom: '0' }}>
                    <button className={`tab-btn ${innerTab === 'bookings' ? 'active' : ''}`} onClick={() => setInnerTab('bookings')}>Daily Bookings</button>
                    <button className={`tab-btn ${innerTab === 'stations' ? 'active' : ''}`} onClick={() => setInnerTab('stations')}>Manage Stations</button>
                  </div>

                  {innerTab === 'bookings' && (
                    <div className="dashboard-panel">
                      <div className="panel-toolbar">
                        <h2>Reservations</h2>
                        <input type="date" className="dash-input" value={date} onChange={(e) => setDate(e.target.value)} />
                      </div>
                      <div className="dash-table-wrapper">
                        <table className="dash-table">
                          <thead>
                            <tr>
                              <th>Player</th>
                              <th>Station</th>
                              <th>Time</th>
                              <th>Price</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bookings.length === 0 ? (
                              <tr><td colSpan="5" style={{textAlign: 'center', color: '#a0aec0'}}>No bookings.</td></tr>
                            ) : (
                              bookings.map(b => (
                                <tr key={b.id}>
                                  <td>
                                    <div style={{fontWeight: '600'}}>{b.playerName || 'Unknown'}</div>
                                    <div style={{fontSize: '0.85rem', color: '#a0aec0'}}>{b.playerEmail}</div>
                                  </td>
                                  <td>{b.stationLabel}</td>
                                  <td>{b.startTime?.substring(0,5)} - {b.endTime?.substring(0,5)}</td>
                                  <td style={{color: 'var(--accent-cyan)'}}>₹{b.totalPrice}</td>
                                  <td><span className={b.status === 'CONFIRMED' ? 'badge-active' : 'badge-inactive'}>{b.status}</span></td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {innerTab === 'stations' && (
                    <div className="dashboard-panel">
                      <div className="panel-toolbar">
                        <h2>Gaming Stations</h2>
                        <button className="btn-add" onClick={() => setShowAddForm(!showAddForm)}>
                          {showAddForm ? 'Cancel' : '+ Add Station'}
                        </button>
                      </div>

                      {showAddForm && (
                        <form className="add-station-form" onSubmit={handleAddStation}>
                          <div className="form-group">
                            <label>Label</label>
                            <input required type="text" className="dash-input" placeholder="PC 12" value={newStation.label} onChange={e => setNewStation({...newStation, label: e.target.value})} />
                          </div>
                          <div className="form-group">
                            <label>Type</label>
                            <select className="dash-input" value={newStation.type} onChange={e => setNewStation({...newStation, type: e.target.value})}>
                              <option value="PC">PC</option>
                              <option value="CONSOLE">Console</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Specs</label>
                            <input type="text" className="dash-input" value={newStation.specs} onChange={e => setNewStation({...newStation, specs: e.target.value})} />
                          </div>
                          <div className="form-group">
                            <label>Rate / Hour (₹)</label>
                            <input required type="number" min="0" className="dash-input" value={newStation.hourlyRate} onChange={e => setNewStation({...newStation, hourlyRate: e.target.value})} />
                          </div>
                          <button type="submit" className="btn-add">Save</button>
                        </form>
                      )}

                      <div className="dash-table-wrapper">
                        <table className="dash-table">
                          <thead>
                            <tr>
                              <th>Label</th>
                              <th>Type</th>
                              <th>Rate/Hr</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {stations.length === 0 ? (
                              <tr><td colSpan="5" style={{textAlign: 'center'}}>No stations.</td></tr>
                            ) : (
                              stations.map(s => (
                                <tr key={s.id}>
                                  <td style={{fontWeight: '600'}}>{s.label}</td>
                                  <td>{s.type}</td>
                                  <td style={{color: 'var(--accent-cyan)'}}>₹{s.hourlyRate}</td>
                                  <td>{s.active ? <span className="badge-active">Active</span> : <span className="badge-inactive">Inactive</span>}</td>
                                  <td>{s.active && <button className="btn-deactivate" onClick={() => handleDeactivate(s.id)}>Deactivate</button>}</td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
               </div>
            )}
          </>
        )}

        {/* CAFES TAB */}
        {activeTab === 'cafes' && (
          <div className="dashboard-panel" style={{ marginTop: '20px' }}>
            <h2>Register a New Cafe</h2>
            <form className="add-station-form" style={{ gridTemplateColumns: '1fr 1fr', display: 'grid', gap: '20px' }} onSubmit={handleCreateCafe}>
              <div className="form-group">
                <label>Cafe Name</label>
                <input required type="text" className="dash-input" value={newCafe.name} onChange={e => setNewCafe({...newCafe, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>City</label>
                <input required type="text" className="dash-input" value={newCafe.city} onChange={e => setNewCafe({...newCafe, city: e.target.value})} />
              </div>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>Address</label>
                <input required type="text" className="dash-input" value={newCafe.address} onChange={e => setNewCafe({...newCafe, address: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input required type="text" className="dash-input" value={newCafe.phone} onChange={e => setNewCafe({...newCafe, phone: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Opening Time</label>
                <input required type="time" className="dash-input" value={newCafe.openingTime} onChange={e => setNewCafe({...newCafe, openingTime: e.target.value + ':00'})} />
              </div>
              <div className="form-group">
                <label>Closing Time</label>
                <input required type="time" className="dash-input" value={newCafe.closingTime} onChange={e => setNewCafe({...newCafe, closingTime: e.target.value + ':00'})} />
              </div>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>Description</label>
                <textarea className="dash-input" style={{ minHeight: '80px' }} value={newCafe.description} onChange={e => setNewCafe({...newCafe, description: e.target.value})}></textarea>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Register Cafe</button>
              </div>
            </form>
          </div>
        )}

        {/* TOURNAMENTS TAB */}
        {activeTab === 'tournaments' && (
          <div className="dashboard-panel" style={{ marginTop: '20px' }}>
            <h2>Create Tournament</h2>
            <p style={{color: '#a0aec0', marginBottom: '20px'}}>Host a new tournament at your selected cafe.</p>
            {myCafes.length === 0 ? (
              <p style={{color: '#fc8181'}}>You must register a cafe first.</p>
            ) : (
              <form className="add-station-form" style={{ gridTemplateColumns: '1fr 1fr', display: 'grid', gap: '20px' }} onSubmit={handleCreateTournament}>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label>Hosting Cafe</label>
                  <select className="dash-input" value={selectedCafe?.id || ''} onChange={(e) => setSelectedCafe(myCafes.find(c => c.id == e.target.value))}>
                    {myCafes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Tournament Name</label>
                  <input required type="text" className="dash-input" value={newTournament.name} onChange={e => setNewTournament({...newTournament, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Game</label>
                  <select className="dash-input" value={newTournament.game} onChange={e => setNewTournament({...newTournament, game: e.target.value})}>
                    <option value="Valorant">Valorant</option>
                    <option value="CS2">CS2</option>
                    <option value="EA FC 25">EA FC 25</option>
                    <option value="Tekken 8">Tekken 8</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Start Date & Time</label>
                  <input required type="datetime-local" className="dash-input" value={newTournament.startDate} onChange={e => setNewTournament({...newTournament, startDate: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>End Date & Time</label>
                  <input required type="datetime-local" className="dash-input" value={newTournament.endDate} onChange={e => setNewTournament({...newTournament, endDate: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Prize Pool (₹)</label>
                  <input required type="number" className="dash-input" value={newTournament.prizePool} onChange={e => setNewTournament({...newTournament, prizePool: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Entry Fee (₹)</label>
                  <input required type="number" className="dash-input" value={newTournament.entryFee} onChange={e => setNewTournament({...newTournament, entryFee: e.target.value})} />
                </div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label>Max Participants</label>
                  <input required type="number" className="dash-input" value={newTournament.maxParticipants} onChange={e => setNewTournament({...newTournament, maxParticipants: e.target.value})} />
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Tournament</button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* LEADERBOARDS TAB */}
        {activeTab === 'leaderboards' && (
          <div className="dashboard-panel" style={{ marginTop: '20px' }}>
            <h2>Submit Match Results</h2>
            <p style={{color: '#a0aec0', marginBottom: '20px'}}>Update a player's global Elo score after a verified LAN match.</p>
            <form className="add-station-form" style={{ maxWidth: '500px' }} onSubmit={handleUpdateLeaderboard}>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label>Player Email</label>
                <input required type="email" className="dash-input" placeholder="player@example.com" value={matchResult.playerEmail} onChange={e => setMatchResult({...matchResult, playerEmail: e.target.value})} />
              </div>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label>Game</label>
                <select className="dash-input" value={matchResult.game} onChange={e => setMatchResult({...matchResult, game: e.target.value})}>
                  <option value="Valorant">Valorant</option>
                  <option value="CS2">CS2</option>
                  <option value="EA FC 25">EA FC 25</option>
                  <option value="Tekken 8">Tekken 8</option>
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label>Match Result</label>
                <select className="dash-input" value={matchResult.won} onChange={e => setMatchResult({...matchResult, won: e.target.value === 'true'})}>
                  <option value="true">Player Won</option>
                  <option value="false">Player Lost</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Result & Update Elo</button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default OwnerDashboard;
