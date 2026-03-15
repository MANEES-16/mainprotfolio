import Reveal from '../components/Reveal';
import { SKILLS } from '../data/data';
import './About.css';

const About = () => {
  return (
    <section className="about" id="about">
      <Reveal>
        <div className="section-label">About Me</div>
        <h2 className="section-title">
          Building<br />from <em>scratch</em>
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <p className="about-text">
          Hey! I'm Maneeshwaran, a fresh full-stack developer who dives deep into every
          project with curiosity and energy. With zero years of industry experience but a
          portfolio packed with real projects, I've proven that learning by building is
          the most effective path.
        </p>
        <p className="about-text">
          From pixel-perfect UIs to wiring up databases and RESTful APIs — I've touched
          every layer of the stack. My 5 full-stack projects and 20+ mini builds are my
          proof of work.
        </p>

        <div className="skills-grid">
          {SKILLS.map((cat) => (
            <div key={cat.title} className="skill-cat">
              <div className="skill-cat-title">{cat.title}</div>
              <div className="skill-tags">
                {cat.tags.map((tag) => (
                  <span key={tag} className="skill-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
};

export default About;
