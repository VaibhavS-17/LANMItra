import React, { useEffect, useRef } from 'react';
import { HiArrowRight } from 'react-icons/hi2';
import { IoGameControllerOutline } from 'react-icons/io5';
import trophyAsset from '../assets/3d-trophy.jpg';
import './LiveLeaderboard.css';

const leaderboardData = [
  {
    rank: 1,
    medal: '🥇',
    player: 'ProPlayer99',
    tag: '#IND1',
    wins: 5,
    losses: 0,
    status: 'Active',
    tier: 'gold'
  },
  {
    rank: 2,
    medal: '🥈',
    player: 'ShadowStrike',
    tag: '#MUM2',
    wins: 4,
    losses: 1,
    status: 'Active',
    tier: 'silver'
  },
  {
    rank: 3,
    medal: '🥉',
    player: 'NeonBlade',
    tag: '#DEL7',
    wins: 4,
    losses: 1,
    status: 'Active',
    tier: 'bronze'
  },
  {
    rank: 4,
    medal: null,
    player: 'CyberWolf_X',
    tag: '#BLR4',
    wins: 3,
    losses: 2,
    status: 'Eliminated',
    tier: 'default'
  },
  {
    rank: 5,
    medal: null,
    player: 'PhantomAce',
    tag: '#PUN9',
    wins: 3,
    losses: 2,
    status: 'Eliminated',
    tier: 'default'
  }
];

export default function LiveLeaderboard() {
  const sectionRef = useRef(null);

  useEffect(() => {
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

    return () => {
      fadeElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <section className="section live-leaderboard-section" id="leaderboard" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header fade-in">
          <div className="leaderboard-title-group">
            <h2 className="section-title">Live Tournament Standings</h2>
            <span className="badge badge-live">
              <span className="live-dot" />
              LIVE
            </span>
          </div>
          <p className="section-subtitle">
            Watch the competition unfold in real-time
          </p>
        </div>

        {/* Leaderboard Layout */}
        <div className="leaderboard-grid fade-in">
          {/* Left Column: The Table */}
          <div className="card leaderboard-card">
            {/* Tournament Sub-header Banner */}
            <div className="tournament-banner">
              <div className="tournament-banner-left">
                <span className="badge badge-game">
                  <IoGameControllerOutline className="badge-icon" />
                  Valorant
                </span>
                <h3 className="tournament-name">
                  Mumbai Valorant Championship — Round 3
                </h3>
              </div>
              <div className="tournament-banner-right">
                <span className="live-status-indicator">
                  <span className="live-dot pulse-slow" />
                  Live Feed
                </span>
              </div>
            </div>

            {/* Table Container for Mobile Scrolling */}
            <div className="table-responsive">
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th className="th-rank">Rank</th>
                    <th className="th-player">Player</th>
                    <th className="th-stat">W</th>
                    <th className="th-stat">L</th>
                    <th className="th-status">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((row) => (
                    <tr
                      key={row.rank}
                      className={`leaderboard-row row-${row.tier} ${
                        row.status === 'Eliminated' ? 'row-eliminated' : ''
                      }`}
                    >
                      <td className="td-rank">
                        <div className="rank-wrapper">
                          {row.medal ? (
                            <span className="rank-medal" title={`Rank ${row.rank}`}>
                              {row.medal}
                            </span>
                          ) : (
                            <span className="rank-number">{row.rank}</span>
                          )}
                        </div>
                      </td>
                      <td className="td-player">
                        <div className="player-info">
                          <div className="player-avatar">
                            {row.player.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="player-meta">
                            <span className="player-name">{row.player}</span>
                            <span className="player-tag">{row.tag}</span>
                          </div>
                        </div>
                      </td>
                      <td className="td-stat td-wins">{row.wins}</td>
                      <td className="td-stat td-losses">{row.losses}</td>
                      <td className="td-status">
                        <span
                          className={`status-pill ${
                            row.status === 'Active' ? 'status-active' : 'status-eliminated'
                          }`}
                        >
                          <span className="status-dot" />
                          <span className="status-text">{row.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* View Full Bracket Link */}
            <div className="leaderboard-footer">
              <a href="#bracket" className="view-bracket-link">
                <span>View Full Bracket</span>
                <HiArrowRight className="link-arrow" />
              </a>
            </div>
          </div>

          {/* Right Column: 3D Asset */}
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
