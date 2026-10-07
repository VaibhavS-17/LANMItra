import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { leaderboardService } from '../services/leaderboardService';
import { bookingService } from '../services/bookingService';
import './PlayerProfilePage.css';

const PlayerProfilePage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, bookingsRes] = await Promise.all([
          leaderboardService.getMyStats().catch(() => []),
          bookingService.getMyBookings().catch(() => [])
        ]);
        setStats(statsRes || []);
        setBookings(bookingsRes || []);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="profile-container"><p>Loading profile...</p></div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-content">
        
        {/* HEADER */}
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.name ? user.name.substring(0, 2).toUpperCase() : 'GM'}
          </div>
          <div className="profile-info">
            <h1>{user?.name || 'Gamer'}</h1>
            <p>{user?.email}</p>
            <span className="profile-role-badge">{user?.role === 'CAFE_OWNER' ? 'CAFE OWNER' : 'PLAYER'}</span>
          </div>
        </div>

        {/* COMPETITIVE STATS */}
        <h2 className="profile-section-title">Competitive Stats</h2>
        {stats.length === 0 ? (
          <p style={{ color: '#a0aec0', marginBottom: '40px' }}>No competitive matches played yet.</p>
        ) : (
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <span className="stat-game-name">{stat.game}</span>
                <div className="stat-row">
                  <span className="stat-label">Elo Rank</span>
                  <span className="stat-value">{stat.eloScore}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Matches</span>
                  <span className="stat-value">{stat.matchesPlayed}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Win Rate</span>
                  <span className="stat-value">{stat.winRate}%</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* RECENT BOOKINGS */}
        <h2 className="profile-section-title">Recent Bookings</h2>
        {bookings.length === 0 ? (
          <p style={{ color: '#a0aec0' }}>No bookings made yet.</p>
        ) : (
          <div className="dash-table-wrapper" style={{ marginTop: '0', background: 'transparent', border: 'none' }}>
            <table className="dash-table" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
              <thead>
                <tr>
                  <th>Cafe</th>
                  <th>Station</th>
                  <th>Date & Time</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id}>
                    <td><div style={{fontWeight: '600'}}>{b.cafeName}</div></td>
                    <td>{b.stationLabel}</td>
                    <td>{b.date} {b.startTime?.substring(0,5)}</td>
                    <td style={{color: 'var(--accent-cyan)'}}>₹{b.totalPrice}</td>
                    <td><span className={b.status === 'CONFIRMED' ? 'badge-active' : 'badge-inactive'}>{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default PlayerProfilePage;
