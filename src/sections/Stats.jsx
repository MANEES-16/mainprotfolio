import { useEffect, useRef, useState } from 'react';
import Reveal from '../components/Reveal';
import { STATS } from '../data/data';
import './Stats.css';

const SatBar = () => {
  const ref = useRef(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setFilled(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="sat-bar-wrap" ref={ref}>
      <div className="sat-bar" style={{ width: filled ? '99%' : '0%' }} />
    </div>
  );
};

const Stats = () => {
  return (
    <Reveal>
      <div className="stats-bar">
        {STATS.map((stat) => (
          <div key={stat.label} className="stat-item">
            <div className="stat-number">
              {stat.number}
              {stat.unit && <span className="stat-unit">{stat.unit}</span>}
            </div>
            <div className="stat-label">{stat.label}</div>
            {stat.hasBar && <SatBar />}
          </div>
        ))}
      </div>
    </Reveal>
  );
};

export default Stats;
