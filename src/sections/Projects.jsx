import { useRef } from 'react';
import Reveal from '../components/Reveal';
import { PROJECTS } from '../data/data';
import './Projects.css';

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mx', `${x}%`);
    cardRef.current.style.setProperty('--my', `${y}%`);
  };

  return (
    <div
      ref={cardRef}
      className={`project-card${project.featured ? ' featured' : ''}`}
      onMouseMove={handleMouseMove}
    >
      <div className="project-glow" />
      <div className="project-num">{project.num}</div>
      <div className="project-type">{project.type}</div>
      <div className="project-name">{project.name}</div>
      <p className="project-desc">{project.desc}</p>
      <div className="project-stack">
        {project.stack.map((s) => (
          <span key={s} className="stack-tag">{s}</span>
        ))}
      </div>
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="project-link"
      >
        View on GitHub →
      </a>
    </div>
  );
};

const Projects = () => {
  return (
    <section className="projects" id="projects">
      <Reveal>
        <div className="projects-header">
          <div>
            <div className="section-label">Full Stack Projects</div>
            <h2 className="section-title">
              5 Things I <em>Built</em>
            </h2>
          </div>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="project-grid">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.num} project={project} />
          ))}
        </div>
      </Reveal>
    </section>
  );
};

export default Projects;
