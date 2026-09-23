import { useEffect, useRef } from 'react'
import { HiCalendarDays, HiArrowRight } from 'react-icons/hi2'
import './UpcomingTournaments.css'

const TOURNAMENTS_DATA = [
  {
    id: 'val-mumbai',
    game: 'VALORANT',
    name: 'Mumbai Valorant Championship',
    date: 'Oct 15, 2026 · 2:00 PM',
    prize: '₹10,000',
    slots: '48/64 Registered',
    percentage: 75,
    format: 'Single Elimination',
    entryFee: '₹200',
  },
  {
    id: 'cs2-showdown',
    game: 'COUNTER-STRIKE 2',
    name: 'CS2 Showdown Series',
    date: 'Oct 20, 2026 · 4:00 PM',
    prize: '₹5,000',
    slots: '28/32 Registered',
    percentage: 87.5,
    format: 'Single Elimination',
    entryFee: '₹150',
  },
  {
    id: 'fifa-cup',
    game: 'EA FC 25',
    name: 'FIFA Pro Cup',
    date: 'Oct 25, 2026 · 12:00 PM',
    prize: '₹8,000',
    slots: '12/16 Registered',
    percentage: 75,
    format: 'Single Elimination',
    entryFee: '₹100',
  },
]

export default function UpcomingTournaments() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    const elements = sectionRef.current?.querySelectorAll('.fade-in')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

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
          {TOURNAMENTS_DATA.map((t, index) => (
            <div
              key={t.id}
              className="card tournament-card fade-in"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="tournament-card-header">
                <span className="badge badge-game">{t.game}</span>
                <span className="tournament-format-badge">{t.format}</span>
              </div>

              <h3 className="tournament-name">{t.name}</h3>

              <div className="tournament-date">
                <HiCalendarDays className="tournament-date-icon" />
                <span>{t.date}</span>
              </div>

              <div className="tournament-prize-block">
                <span className="tournament-prize-label">PRIZE POOL</span>
                <span className="tournament-prize-value">{t.prize}</span>
              </div>

              <div className="tournament-slots-section">
                <div className="tournament-slots-row">
                  <span className="tournament-slots-label">Registration</span>
                  <span className="tournament-slots-count">{t.slots}</span>
                </div>
                <div className="tournament-progress-track">
                  <div
                    className="tournament-progress-fill"
                    style={{ width: `${t.percentage}%` }}
                  />
                </div>
              </div>

              <div className="tournament-footer-meta">
                <div className="tournament-entry-group">
                  <span className="tournament-entry-label">Entry Fee</span>
                  <span className="tournament-entry-value">{t.entryFee}</span>
                </div>
                <button type="button" className="btn btn-primary tournament-register-btn">
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="tournaments-all-wrapper fade-in">
          <a href="#tournaments" className="tournaments-all-link">
            <span>View All Tournaments</span>
            <HiArrowRight className="tournaments-arrow-icon" />
          </a>
        </div>
      </div>
    </section>
  )
}
