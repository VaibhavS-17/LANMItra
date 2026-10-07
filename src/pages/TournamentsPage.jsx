import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tournamentService } from '../services/tournamentService';
import './TournamentsPage.css';

const TournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const data = await tournamentService.getTournaments();
      setTournaments(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load tournaments.');
      setLoading(false);
    }
  };

  if (loading) return <div className="tournaments-loading">Loading Tournaments...</div>;
  if (error) return <div className="tournaments-error">{error}</div>;

  return (
    <div className="tournaments-page">
      <div className="tournaments-header">
        <h1>Competitive Events</h1>
        <p>Join local tournaments, prove your skills, and win prize pools.</p>
      </div>

      <div className="tournaments-grid">
        {tournaments.length === 0 ? (
          <p className="no-tournaments">No active tournaments right now. Check back soon!</p>
        ) : (
          tournaments.map((t) => (
            <div className="tournament-card" key={t.id} onClick={() => navigate(`/tournaments/${t.id}`)}>
              <div className="tc-header">
                <span className={`status-badge ${t.status.toLowerCase()}`}>{t.status}</span>
                <span className="game-tag">{t.game}</span>
              </div>
              
              <h2 className="tc-title">{t.name}</h2>
              <p className="tc-cafe">📍 {t.cafeName || 'Online/TBA'}</p>
              
              <div className="tc-details">
                <div className="detail-item">
                  <span className="label">Prize Pool</span>
                  <span className="value prize">₹{t.prizePool}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Entry Fee</span>
                  <span className="value">₹{t.entryFee}</span>
                </div>
              </div>
              
              <div className="tc-progress-container">
                <div className="progress-labels">
                  <span>Registered</span>
                  <span>{t.registeredPlayerCount} / {t.maxParticipants || '∞'}</span>
                </div>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: `${t.maxParticipants ? Math.min((t.registeredPlayerCount / t.maxParticipants) * 100, 100) : 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TournamentsPage;
