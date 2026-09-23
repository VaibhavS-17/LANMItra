import { useEffect, useRef } from 'react';
import { HiComputerDesktop, HiTrophy, HiCheck } from 'react-icons/hi2';
import './BusinessCTA.css';

const businessOptions = [
  {
    id: 'cafe',
    type: 'cafe',
    icon: HiComputerDesktop,
    title: 'Own a Gaming Café?',
    description:
      'List your café on LANMitra, reach thousands of gamers, and manage bookings effortlessly from a single dashboard.',
    bullets: [
      'Real-time booking management',
      'Reach 10,000+ local gamers',
      'Analytics & revenue tracking',
    ],
    buttonText: 'Register Your Café',
    buttonClass: 'btn-primary',
  },
  {
    id: 'tournament',
    type: 'tournament',
    icon: HiTrophy,
    title: 'Organize Tournaments?',
    description:
      'Create tournaments in minutes with automatic bracket generation, live leaderboards, and built-in dispute resolution.',
    bullets: [
      'Auto bracket generation',
      'Live result tracking',
      'Built-in dispute resolution',
    ],
    buttonText: 'Create a Tournament',
    buttonClass: 'btn-primary btn-tournament',
  },
];

const BusinessCTA = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
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

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <section className="section business-cta" ref={sectionRef}>
      <div className="container">
        <div className="section-header fade-in">
          <h2 className="section-title">Grow Your Gaming Business</h2>
          <p className="section-subtitle">
            Whether you own a café or organize tournaments, LANMitra has you covered
          </p>
        </div>

        <div className="business-grid">
          {businessOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <div
                key={option.id}
                className={`card business-card business-card-${option.type} fade-in`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="business-card-content">
                  <div className={`business-icon-wrapper ${option.type}-icon`}>
                    <IconComponent className="business-icon" />
                  </div>

                  <h3 className="business-card-title">{option.title}</h3>
                  <p className="business-card-desc">{option.description}</p>

                  <ul className="business-bullet-list">
                    {option.bullets.map((bullet, idx) => (
                      <li key={idx} className="business-bullet-item">
                        <span className={`bullet-check-badge ${option.type}-check`}>
                          <HiCheck className="bullet-check-icon" />
                        </span>
                        <span className="bullet-text">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="business-card-action">
                  <button className={`btn ${option.buttonClass}`}>
                    {option.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BusinessCTA;
