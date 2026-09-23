import { useState, useEffect, useRef } from 'react'
import {
  HiMagnifyingGlass,
  HiCalendarDays,
  HiTrophy,
  HiPencilSquare,
  HiComputerDesktop,
  HiChartBar,
  HiCurrencyRupee,
} from 'react-icons/hi2'
import { IoGameController } from 'react-icons/io5'
import './HowItWorks.css'

const TRACK_DATA = {
  players: [
    {
      step: '01',
      title: 'Browse',
      description: 'Find gaming cafés and tournaments near you',
      icon: HiMagnifyingGlass,
    },
    {
      step: '02',
      title: 'Book or Register',
      description: 'Reserve a station or sign up for a tournament',
      icon: HiCalendarDays,
    },
    {
      step: '03',
      title: 'Play',
      description: 'Show up at the café and start gaming',
      icon: IoGameController,
    },
    {
      step: '04',
      title: 'Compete & Win',
      description: 'Climb the leaderboard and win prizes',
      icon: HiTrophy,
    },
  ],
  owners: [
    {
      step: '01',
      title: 'List Your Café',
      description: 'Add your café with location and contact details',
      icon: HiPencilSquare,
    },
    {
      step: '02',
      title: 'Add Stations',
      description: 'Set up your PC/console stations with specs and pricing',
      icon: HiComputerDesktop,
    },
    {
      step: '03',
      title: 'Manage Bookings',
      description: 'Track and manage all reservations from your dashboard',
      icon: HiChartBar,
    },
    {
      step: '04',
      title: 'Grow Revenue',
      description: 'Reach thousands of gamers and fill your stations',
      icon: HiCurrencyRupee,
    },
  ],
}

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('players')
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
  }, [activeTab])

  const steps = TRACK_DATA[activeTab]

  return (
    <section className="section" id="how-it-works" ref={sectionRef}>
      <div className="container">
        <div className="section-header fade-in">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Get started in minutes</p>
        </div>

        <div className="how-tabs-container fade-in">
          <div className="how-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'players'}
              className={`how-tab-btn ${activeTab === 'players' ? 'active' : ''}`}
              onClick={() => setActiveTab('players')}
            >
              For Players
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'owners'}
              className={`how-tab-btn ${activeTab === 'owners' ? 'active' : ''}`}
              onClick={() => setActiveTab('owners')}
            >
              For Café Owners
            </button>
          </div>
        </div>

        <div className="how-steps-track" key={activeTab}>
          {steps.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={item.step}
                className="how-step-card card fade-in"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="step-icon-outer">
                  <div className="step-icon-inner">
                    <Icon className="step-react-icon" />
                  </div>
                  <span className="step-number-badge">{item.step}</span>
                </div>

                <div className="step-text-content">
                  <h3 className="step-title">{item.title}</h3>
                  <p className="step-description">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
