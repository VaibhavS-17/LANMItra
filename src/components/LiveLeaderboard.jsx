import React, { useEffect, useRef, useState } from 'react';
import { HiArrowRight } from 'react-icons/hi2';
import { IoGameControllerOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { leaderboardService } from '../services/leaderboardService';
import trophyAsset from '../assets/3d-trophy.jpg';
import './LiveLeaderboard.css';

export default function LiveLeaderboard() {
  const sectionRef = useRef(null);
  const [leaderboards, setLeaderboards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    leaderboardService.getLeaderboards('').then(res => {
      setLeaderboards(res.slice(0, 5));
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if(loading) return;
    const current = sectionRef.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const fadeElements = current.querySelectorAll('.fade-in');
    fadeElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loading]);

  const getRankMedal = (index) => {
    if(index === 0) return '??';
    if(index === 1) return '??';
    if(index === 2) return '??';
    return null;
  };
  
  const getRankTier = (index) => {
    if(index === 0) return 'gold';
    if(index === 1) return 'silver';
    if(index === 2) return 'bronze';
    return 'default';
  }

  return (
    <section className="section live-leaderboard-section" id="leaderboard" ref={sectionRef}>
      <div className="container">
        <div className="section-header fade-in">
          <div className="leaderboard-title-group">
            <h2 className="section-title">Live Standings</h2>
            <span className="badge badge-live">
              <span className="live-dot" />
              LIVE
            </span>
          </div>
          <p className="section-subtitle">
            Watch the competition unfold in real-time
          </p>
        </div>

        <div className="leaderboard-grid fade-in">
          <div className="card leaderboard-card">
            <div className="tournament-banner">
              <div className="tournament-banner-left">
                <span className="badge badge-game">
                  <IoGameControllerOutline className="badge-icon" />
                  Global Ranked
                </span>
                <h3 className="tournament-name">
                  Top Local Players
                </h3>
              </div>
            </div>

            <div className="table-responsive">
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th className="th-rank">Rank</th>
                    <th className="th-player">Player</th>
                    <th className="th-stat">W</th>
                    <th className="th-stat">L</th>
                    <th className="th-status">Elo</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="5">Loading...</td></tr>
                  ) : leaderboards.length === 0 ? (
                    <tr><td colSpan="5">No rankings found.</td></tr>
                  ) : leaderboards.map((row, index) => {
                    const medal = getRankMedal(index);
                    const tier = getRankTier(index);
                    return (
                    <tr
                      key={index}
                      className={`leaderboard-row row-${tier}`}
                    >
                      <td className="td-rank">
                        <div className="rank-wrapper">
                          {medal ? (
                            <span className="rank-medal" title={`Rank ${index+1}`}>
                              {medal}
                            </span>
                          ) : (
                            <span className="rank-number">{index+1}</span>
                          )}
                        </div>
                      </td>
                      <td className="td-player">
                        <div className="player-info">
                          <div className="player-meta">
                            <span className="player-name">{row.playerName}</span>
                            <span className="player-tag">{row.game}</span>
                          </div>
                        </div>
                      </td>
                      <td className="td-stat td-wins">{row.wins}</td>
                      <td className="td-stat td-losses">{row.losses}</td>
                      <td className="td-status">
                        <span className="status-pill status-active">
                          <span className="status-text">{row.eloScore}</span>
                        </span>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>

            <div className="leaderboard-footer">
              <Link to="/leaderboards" className="view-bracket-link">
                <span>View Full Leaderboard</span>
                <HiArrowRight className="link-arrow" />
              </Link>
            </div>
          </div>

          <div className="leaderboard-image-column">
             <div className="trophy-wrapper">
               <img src={trophyAsset} alt="Championship Trophy" className="trophy-3d-asset" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
