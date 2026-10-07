import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tournamentService } from '../services/tournamentService';
import './TournamentDetailPage.css';

const TournamentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [teamName, setTeamName] = useState('');
  const [registering, setRegistering] = useState(false);
  const [registerMessage, setRegisterMessage] = useState('');

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isPlayer = currentUser && currentUser.role === 'PLAYER';

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const fetchDetails = async () => {
    try {
      const data = await tournamentService.getTournamentDetails(id);
      setTournament(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load tournament details.');
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isPlayer) {
      navigate('/login');
      return;
    }

    setRegistering(true);
    setRegisterMessage('');
    
    try {
      await tournamentService.registerForTournament(id, teamName);
      setRegisterMessage('Successfully registered!');
      setTeamName('');
      fetchDetails(); // refresh count
    } catch (err) {
      setRegisterMessage(err.response?.data || 'Failed to register. You might already be registered or it is full.');
    } finally {
      setRegistering(false);
    }
  };

  if (loading) return <div className="td-loading">Loading details...</div>;
  if (error || !tournament) return <div className="td-error">{error || 'Not found'}</div>;

  const isFull = tournament.maxParticipants && tournament.registeredPlayerCount >= tournament.maxParticipants;
  const canRegister = tournament.status === 'UPCOMING' && !isFull;

  return (
    <div className="tournament-detail-page">
      <div className="td-hero">
        <span className={`status-badge ${tournament.status.toLowerCase()}`}>{tournament.status}</span>
        <h1>{tournament.name}</h1>
        <p className="game-subtitle">{tournament.game} | 📍 {tournament.cafeName || 'TBA'}</p>
        
        <div className="td-stats-row">
          <div className="td-stat">
            <span className="label">Prize Pool</span>
            <span className="value prize">₹{tournament.prizePool}</span>
          </div>
          <div className="td-stat">
            <span className="label">Entry Fee</span>
            <span className="value">₹{tournament.entryFee}</span>
          </div>
          <div className="td-stat">
            <span className="label">Registered</span>
            <span className="value">{tournament.registeredPlayerCount} / {tournament.maxParticipants || '∞'}</span>
          </div>
        </div>
      </div>

      <div className="td-content">
        <div className="td-main">
          <h2>About the Tournament</h2>
          <p>Dates: {new Date(tournament.startDate).toLocaleString()} - {tournament.endDate ? new Date(tournament.endDate).toLocaleString() : 'TBD'}</p>
          <p>Rules and bracket information will be distributed to registered participants via Discord prior to the start time.</p>
        </div>
        
        <div className="td-sidebar">
          <div className="registration-card">
            <h3>Registration</h3>
            {registerMessage && (
              <div className={`reg-message ${registerMessage.includes('Success') ? 'success' : 'error'}`}>
                {registerMessage}
              </div>
            )}
            
            {canRegister ? (
              <form onSubmit={handleRegister} className="reg-form">
                {isPlayer ? (
                  <>
                    <div className="form-group">
                      <label>Team Name / IGN</label>
                      <input 
                        type="text" 
                        value={teamName} 
                        onChange={(e) => setTeamName(e.target.value)} 
                        placeholder="Enter team or player name"
                        required 
                      />
                    </div>
                    <button type="submit" disabled={registering} className="btn-register">
                      {registering ? 'Registering...' : 'Join Tournament'}
                    </button>
                  </>
                ) : (
                  <button type="button" onClick={() => navigate('/login')} className="btn-register">
                    Log in as Gamer to Join
                  </button>
                )}
              </form>
            ) : (
              <div className="reg-closed">
                {isFull ? 'Tournament is Full' : 'Registration Closed'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetailPage;
