import { useEffect, useRef, useState } from 'react';
import { HiCalendarDays, HiArrowRight } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { tournamentService } from '../services/tournamentService';
import './UpcomingTournaments.css';

export default function UpcomingTournaments() {
  const sectionRef = useRef(null);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tournamentService.getTournaments().then(res => {
      setTournaments(res.slice(0, 3));
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if(loading) return;
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
    const elements = sectionRef.current?.querySelectorAll('.fade-in');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  return (
    <section className="section" id="tournaments" ref={sectionRef}>
      <div className="container">
        <div className="section-header fade-in">
          <h2 className="section-title">Upcoming Tournaments</h2>
          <p className="section-subtitle">
            Compete with the best. Register now before slots fill up.
          </p>
        </div>

        <div className="tournaments-grid">
          {loading ? <p>Loading...</p> : tournaments.length === 0 ? <p>No active tournaments.</p> : tournaments.map((t, index) => (
            <div
              key={t.id}
              className="card tournament-card fade-in"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="tournament-card-header">
                <span className="badge badge-game">{t.game}</span>
                <span className="tournament-format-badge">{t.status}</span>
              </div>

              <h3 className="tournament-name">{t.name}</h3>

              <div className="tournament-date">
                <HiCalendarDays className="tournament-date-icon" />
                <span>{new Date(t.startDate).toLocaleDateString()}</span>
              </div>

              <div className="tournament-prize-block">
                <span className="tournament-prize-label">PRIZE POOL</span>
                <span className="tournament-prize-value">?{t.prizePool}</span>
              </div>

              <div className="tournament-slots-section">
                <div className="tournament-slots-row">
                  <span className="tournament-slots-label">Registration</span>
                  <span className="tournament-slots-count">{t.registeredPlayerCount} / {t.maxParticipants || '8'}</span>
                </div>
                <div className="tournament-progress-track">
                  <div
                    className="tournament-progress-fill"
                    style={{ width: `${t.maxParticipants ? Math.min((t.registeredPlayerCount / t.maxParticipants)*100, 100) : 100}%` }}
                  />
                </div>
              </div>

              <div className="tournament-footer-meta">
                <div className="tournament-entry-group">
                  <span className="tournament-entry-label">Entry Fee</span>
                  <span className="tournament-entry-value">?{t.entryFee}</span>
                </div>
                <Link to={`/tournaments/${t.id}`} className="btn btn-primary tournament-register-btn">
                  Register Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="tournaments-all-wrapper fade-in">
          <Link to="/tournaments" className="tournaments-all-link">
            <span>View All Tournaments</span>
            <HiArrowRight className="tournaments-arrow-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
}
