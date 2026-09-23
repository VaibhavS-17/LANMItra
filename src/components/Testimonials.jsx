import { useEffect, useRef } from 'react';
import { HiStar } from 'react-icons/hi2';
import './Testimonials.css';

const testimonialsData = [
  {
    id: 1,
    quote:
      'Finally a platform that makes finding local tournaments easy! Registered for my first Valorant tournament and the bracket system was seamless.',
    name: 'Arjun M.',
    role: 'Player',
    badgeClass: 'badge-player',
    initials: 'AM',
    avatarColor: 'cyan',
    stars: 5,
  },
  {
    id: 2,
    quote:
      'LANMitra doubled our weekday bookings. Gamers can now find us online and book stations in advance. Game changer for our business!',
    name: 'Priya S.',
    role: 'Café Owner',
    badgeClass: 'badge-owner',
    initials: 'PS',
    avatarColor: 'purple',
    stars: 5,
  },
  {
    id: 3,
    quote:
      'Organizing tournaments used to be a nightmare with spreadsheets. Now brackets generate automatically and results update in real-time.',
    name: 'Rahul K.',
    role: 'Organizer',
    badgeClass: 'badge-organizer',
    initials: 'RK',
    avatarColor: 'amber',
    stars: 5,
  },
];

const Testimonials = () => {
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
    <section className="section testimonials-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header fade-in">
          <h2 className="section-title">What Gamers Are Saying</h2>
          <p className="section-subtitle">
            Join thousands of satisfied players and café owners
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonialsData.map((item, index) => (
            <div
              key={item.id}
              className="card testimonial-card fade-in"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="testimonial-header">
                <svg
                  className="testimonial-quote-icon"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <div
                  className="testimonial-stars"
                  aria-label={`${item.stars} out of 5 stars`}
                >
                  {[...Array(item.stars)].map((_, i) => (
                    <HiStar key={i} className="star-icon" />
                  ))}
                </div>
              </div>

              <blockquote className="testimonial-quote">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <div className="testimonial-author">
                <div className={`author-avatar avatar-${item.avatarColor}`}>
                  {item.initials}
                </div>
                <div className="author-details">
                  <h4 className="author-name">{item.name}</h4>
                  <span className={`badge ${item.badgeClass}`}>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
