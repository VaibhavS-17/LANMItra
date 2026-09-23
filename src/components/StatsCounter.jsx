import React, { useEffect, useRef, useState } from 'react';
import './StatsCounter.css';

const statsData = [
  {
    id: 'cafes',
    target: 500,
    suffix: '+',
    label: 'Gaming Cafés',
  },
  {
    id: 'players',
    target: 10000,
    suffix: '+',
    label: 'Active Players',
  },
  {
    id: 'tournaments',
    target: 1200,
    suffix: '+',
    label: 'Tournaments Hosted',
  },
  {
    id: 'bookings',
    target: 50000,
    suffix: '+',
    label: 'Bookings Made',
  },
];

export default function StatsCounter() {
  const [counts, setCounts] = useState(statsData.map(() => 0));
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const current = sectionRef.current;
    if (!current) return;

    let animFrameId = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          // Toggle visible class for fade-in effect
          current.classList.add('visible');

          const duration = 2000; // ~2 seconds count-up
          let startTime = null;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Smooth cubic ease-out
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            setCounts(
              statsData.map((stat) => Math.floor(easedProgress * stat.target))
            );

            if (progress < 1) {
              animFrameId = requestAnimationFrame(step);
            } else {
              setCounts(statsData.map((stat) => stat.target));
            }
          };

          animFrameId = requestAnimationFrame(step);
          observer.unobserve(current);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(current);

    return () => {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section className="stats-counter-section fade-in" ref={sectionRef}>
      <div className="container">
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div key={stat.id} className="stat-card">
              <div className="stat-number">
                {counts[index].toLocaleString()}
                <span className="stat-suffix">{stat.suffix}</span>
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
