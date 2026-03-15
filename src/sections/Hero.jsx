import './Hero.css';

const codeLines = [
  <><span className="kw">const</span> <span className="vr"> developer</span> <span className="mt">= {'{'}</span></>,
  <>&nbsp;&nbsp;<span className="pr">name</span><span className="mt">:</span> <span className="st">"Maneeshwaran"</span><span className="mt">,</span></>,
  <>&nbsp;&nbsp;<span className="pr">role</span><span className="mt">:</span> <span className="st">"Full Stack Dev"</span><span className="mt">,</span></>,
  <>&nbsp;&nbsp;<span className="pr">status</span><span className="mt">:</span> <span className="st">"Fresher"</span><span className="mt">,</span></>,
  <>&nbsp;&nbsp;<span className="pr">satisfaction</span><span className="mt">:</span> <span className="nv">99</span><span className="mt">,</span></>,
  <>&nbsp;&nbsp;<span className="pr">projects</span><span className="mt">: {'{'}</span></>,
  <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="pr">fullStack</span><span className="mt">:</span> <span className="nv">5</span><span className="mt">,</span></>,
  <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="pr">mini</span><span className="mt">:</span> <span className="st">"20+"</span></>,
  <>&nbsp;&nbsp;<span className="mt">{'}'}</span><span className="mt">,</span></>,
  <>&nbsp;&nbsp;<span className="pr">openToWork</span><span className="mt">:</span> <span className="kw">true</span></>,
  <><span className="mt">{'}'}</span>;</>,
  null,
  <><span className="cm">// Ready to build ⚡</span><span className="typing-cursor" /></>,
];

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-badge">
          <span className="badge-dot" />
          Open to Opportunities
        </div>
        <h1 className="hero-name">
          Maneesh<br />
          <span className="hl">waran</span>
        </h1>
        <p className="hero-role">Full Stack Developer</p>
        <p className="hero-desc">
          A passionate beginner turning ideas into full-stack web experiences.
          Currently building, learning, and shipping — one project at a time.
        </p>
        <div className="hero-ctas">
          <a href="#projects" className="btn-primary">View Projects</a>
          <a href="#contact" className="btn-outline">Get In Touch</a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="code-card">
          <div className="code-header">
            <span className="dot dot-r" />
            <span className="dot dot-y" />
            <span className="dot dot-g" />
            <span className="code-filename">developer.js</span>
          </div>
          <div className="code-body">
            {codeLines.map((line, i) => (
              <div key={i} className="cl">
                <span className="cn">{i + 1}</span>
                <span>{line}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
