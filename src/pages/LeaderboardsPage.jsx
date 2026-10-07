import React, { useState, useEffect } from 'react';
import { leaderboardService } from '../services/leaderboardService';
import './LeaderboardsPage.css';

const LeaderboardsPage = () => {
  const [leaderboards, setLeaderboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [gameFilter, setGameFilter] = useState('');

  const games = ["Valorant", "CS2", "EA FC 25", "Tekken 8", "Dota 2"];

  useEffect(() => {
    fetchLeaderboards();
  }, [gameFilter]);

  const fetchLeaderboards = async () => {
    setLoading(true);
    try {
      const data = await leaderboardService.getLeaderboards(gameFilter);
      setLeaderboards(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load leaderboards.');
    } finally {
      setLoading(false);
    }
  };

  const getRankClass = (index) => {
    if (index === 0) return 'rank-gold';
    if (index === 1) return 'rank-silver';
    if (index === 2) return 'rank-bronze';
    return '';
  };

  return (
    <div className="leaderboards-page">
      <div className="lb-header">
        <h1>Global Rankings</h1>
        <p>Top players across all local cafes. Play matches, climb the Elo ladder.</p>
      </div>

      <div className="lb-controls">
        <select 
          value={gameFilter} 
          onChange={(e) => setGameFilter(e.target.value)}
          className="game-filter"
        >
          <option value="">All Games</option>
          {games.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="lb-loading">Loading standings...</div>
      ) : error ? (
        <div className="lb-error">{error}</div>
      ) : leaderboards.length === 0 ? (
        <div className="lb-empty">No ranked players found for this selection.</div>
      ) : (
        <div className="lb-table-container">
          <table className="lb-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Game</th>
                <th>Elo Score</th>
                <th>Win Rate</th>
                <th>Matches</th>
              </tr>
            </thead>
            <tbody>
              {leaderboards.map((player, index) => (
                <tr key={index} className={getRankClass(index)}>
                  <td className="rank-col">
                    #{index + 1}
                    {index === 0 && ' 👑'}
                  </td>
                  <td className="player-col">{player.playerName}</td>
                  <td>{player.game}</td>
                  <td className="elo-col">{player.eloScore}</td>
                  <td className={`wr-col ${player.winRate >= 50 ? 'wr-positive' : 'wr-negative'}`}>
                    {player.winRate}%
                  </td>
                  <td>{player.matchesPlayed} ({player.wins}W - {player.losses}L)</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeaderboardsPage;
