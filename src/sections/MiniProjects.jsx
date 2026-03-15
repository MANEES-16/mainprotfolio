import Reveal from '../components/Reveal';
import { MINI_PROJECTS } from '../data/data';
import './MiniProjects.css';

const MiniProjects = () => {
  return (
    <section className="mini-projects" id="mini">
      <Reveal>
        <div className="mini-title">
          <div className="section-label" style={{ margin: 0 }}>Mini Projects</div>
          <h2 className="section-title" style={{ fontSize: '1.75rem' }}>
            20<span className="accent-text">+</span> Quick Builds
          </h2>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="mini-grid">
          {MINI_PROJECTS.map((item) => (
            <div key={item.name} className="mini-card">
              <div className="mini-icon">{item.icon}</div>
              <div className="mini-name">{item.name}</div>
              <div className="mini-tech">{item.tech}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
};

export default MiniProjects;
