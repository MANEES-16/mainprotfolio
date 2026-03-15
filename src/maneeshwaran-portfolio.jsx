import { useState, useEffect, useRef, Suspense, useCallback } from "react";

// ── EmailJS config — replace with real credentials from emailjs.com ──────────
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // e.g. "AbCdEfGhIjKlMnOp"
import * as THREE from "three";

// ── Floating 3D Cube (Three.js canvas) ──────────────────────────────────────
function ThreeScene({ variant = "hero" }) {
  const mountRef = useRef(null);
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const W = el.clientWidth, H = el.clientHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.z = 4.5;

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(amb);
    const pt1 = new THREE.PointLight(0x00f0ff, 3, 20);
    pt1.position.set(3, 3, 3);
    scene.add(pt1);
    const pt2 = new THREE.PointLight(0xff6b35, 2, 20);
    pt2.position.set(-3, -2, 2);
    scene.add(pt2);

    let mesh, mesh2, particles;

    if (variant === "hero") {
      // Main wireframe icosahedron
      const geo = new THREE.IcosahedronGeometry(1.4, 1);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x00f0ff, wireframe: false,
        metalness: 0.9, roughness: 0.1,
        transparent: true, opacity: 0.85,
      });
      mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);

      const wgeo = new THREE.IcosahedronGeometry(1.42, 1);
      const wmat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.3 });
      mesh2 = new THREE.Mesh(wgeo, wmat);
      scene.add(mesh2);

      // Particles
      const pGeo = new THREE.BufferGeometry();
      const pts = [];
      for (let i = 0; i < 300; i++) {
        pts.push((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8);
      }
      pGeo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
      const pMat = new THREE.PointsMaterial({ color: 0x00f0ff, size: 0.03, transparent: true, opacity: 0.6 });
      particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);

    } else if (variant === "skills") {
      // Torus knot
      const geo = new THREE.TorusKnotGeometry(0.9, 0.3, 120, 16);
      const mat = new THREE.MeshStandardMaterial({ color: 0xff6b35, metalness: 0.8, roughness: 0.15 });
      mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      const wgeo = new THREE.TorusKnotGeometry(0.9, 0.31, 80, 12);
      const wmat = new THREE.MeshBasicMaterial({ color: 0xff6b35, wireframe: true, transparent: true, opacity: 0.25 });
      mesh2 = new THREE.Mesh(wgeo, wmat);
      scene.add(mesh2);

    } else if (variant === "contact") {
      // Dodecahedron
      const geo = new THREE.DodecahedronGeometry(1.2);
      const mat = new THREE.MeshStandardMaterial({ color: 0xa855f7, metalness: 0.9, roughness: 0.1 });
      mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      const wgeo = new THREE.DodecahedronGeometry(1.22);
      const wmat = new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true, transparent: true, opacity: 0.3 });
      mesh2 = new THREE.Mesh(wgeo, wmat);
      scene.add(mesh2);
    }

    let animId;
    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      if (mesh) { mesh.rotation.x = t * 0.3; mesh.rotation.y = t * 0.5; }
      if (mesh2) { mesh2.rotation.x = t * 0.3; mesh2.rotation.y = t * 0.5; }
      if (particles) { particles.rotation.y = t * 0.05; }
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const W2 = el.clientWidth, H2 = el.clientHeight;
      renderer.setSize(W2, H2);
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [variant]);
  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}

// ── Floating 3D Tech Orb ─────────────────────────────────────────────────────
function TechOrb({ color = 0x00f0ff, size = 0.5 }) {
  const mountRef = useRef(null);
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const S = el.clientWidth;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(S, S);
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
    camera.position.z = 2.5;
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pt = new THREE.PointLight(color, 4, 10);
    pt.position.set(2, 2, 2);
    scene.add(pt);
    const geo = new THREE.SphereGeometry(size, 32, 32);
    const mat = new THREE.MeshStandardMaterial({ color, metalness: 0.9, roughness: 0.05 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);
    const wgeo = new THREE.SphereGeometry(size + 0.02, 12, 12);
    const wmat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.2 });
    scene.add(new THREE.Mesh(wgeo, wmat));
    let id;
    const clock = new THREE.Clock();
    const animate = () => { id = requestAnimationFrame(animate); const t = clock.getElapsedTime(); mesh.rotation.y = t * 0.8; mesh.rotation.x = Math.sin(t * 0.4) * 0.3; renderer.render(scene, camera); };
    animate();
    return () => { cancelAnimationFrame(id); renderer.dispose(); if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement); };
  }, [color, size]);
  return <div ref={mountRef} style={{ width: 60, height: 60 }} />;
}

// ── Data ─────────────────────────────────────────────────────────────────────
const skills = [
  { name: "React.js", level: 95, color: "#00f0ff" },
  { name: "Node.js", level: 90, color: "#00f0ff" },
  { name: "TypeScript", level: 88, color: "#a855f7" },
  { name: "Next.js", level: 85, color: "#ff6b35" },
  { name: "MongoDB", level: 82, color: "#00f0ff" },
  { name: "PostgreSQL", level: 80, color: "#a855f7" },
  { name: "Docker", level: 78, color: "#ff6b35" },
  { name: "AWS", level: 75, color: "#00f0ff" },
];

const techStack = ["React", "Node", "TypeScript", "Next.js", "MongoDB", "PostgreSQL", "GraphQL", "Docker", "AWS", "Redis", "Tailwind", "Git"];

const projects = [
  {
    title: "NexaCommerce",
    desc: "Full-stack e-commerce platform with real-time inventory, Stripe payments, and ML-powered product recommendations.",
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    color: "#00f0ff",
    icon: "🛒",
  },
  {
    title: "SyncBoard",
    desc: "Real-time collaborative whiteboard with socket-based synchronization, supporting 1000+ concurrent users.",
    tech: ["React", "Socket.io", "Redis", "PostgreSQL"],
    color: "#a855f7",
    icon: "🎨",
  },
  {
    title: "DevPulse",
    desc: "Developer analytics dashboard aggregating GitHub, Jira, and CI/CD metrics into actionable engineering insights.",
    tech: ["TypeScript", "GraphQL", "AWS", "Docker"],
    color: "#ff6b35",
    icon: "📊",
  },
  {
    title: "AuthForge",
    desc: "Enterprise-grade authentication microservice with OAuth2, RBAC, and zero-trust security architecture.",
    tech: ["Node.js", "PostgreSQL", "JWT", "Redis"],
    color: "#00f0ff",
    icon: "🔐",
  },
];

// ── Main Component ───────────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen]           = useState(false);

  // ── Contact form state ──────────────────────────────────────────────────
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [formError, setFormError] = useState({});
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null); // "success" | "error" | null

  const validateForm = () => {
    const errs = {};
    if (!form.name.trim())    errs.name    = "Name is required";
    if (!form.email.trim())   errs.email   = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (formError[name]) setFormError(prev => ({ ...prev, [name]: "" }));
  };

  const handleSend = async () => {
    const errs = validateForm();
    if (Object.keys(errs).length) { setFormError(errs); return; }

    setSending(true);
    setSendStatus(null);

    // Load EmailJS SDK dynamically
    try {
      if (!window.emailjs) {
        await new Promise((res, rej) => {
          const s = document.createElement("script");
          s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
          s.onload = res; s.onerror = rej;
          document.head.appendChild(s);
        });
      }
      window.emailjs.init(EMAILJS_PUBLIC_KEY);
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:    form.name,
        from_email:   form.email,
        message:      form.message,
        to_name:      "Maneeshwaran",
      });
      setSendStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setSendStatus("error");
    } finally {
      setSending(false);
    }
  };
  const [typed, setTyped] = useState("");
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef(null);

  const titles = ["Full Stack Developer", "React Architect", "API Engineer", "Cloud Builder"];
  const [titleIdx, setTitleIdx] = useState(0);

  useEffect(() => {
    const title = titles[titleIdx];
    let i = 0;
    setTyped("");
    const t = setInterval(() => {
      setTyped(title.slice(0, ++i));
      if (i >= title.length) {
        clearInterval(t);
        setTimeout(() => setTitleIdx((p) => (p + 1) % titles.length), 2000);
      }
    }, 70);
    return () => clearInterval(t);
  }, [titleIdx]);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSkillsVisible(true); }, { threshold: 0.2 });
    if (skillsRef.current) obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  const navLinks = ["Home", "About", "Skills", "Projects", "Contact"];

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={styles.root}>
      {/* Background grid */}
      <div style={styles.gridBg} />
      <div style={styles.gradientOrb1} />
      <div style={styles.gradientOrb2} />

      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.navLogo}>
          <span style={styles.logoAccent}>M</span>
          <span style={{ color: "#e2e8f0" }}>aneeshwaran</span>
        </div>
        <div style={styles.navLinks}>
          {navLinks.map((n) => (
            <button key={n} onClick={() => scrollTo(n)} style={styles.navBtn}>
              {n}
            </button>
          ))}
          <button style={styles.hireBtn}>Hire Me</button>
        </div>
        <button style={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        {menuOpen && (
          <div style={styles.mobileMenu}>
            {navLinks.map((n) => (
              <button key={n} onClick={() => scrollTo(n)} style={styles.mobileLink}>{n}</button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.badge}>🚀 Available for Work</div>
          <h1 style={styles.heroName}>
            Hi, I'm <span style={styles.nameGlow}>Maneeshwaran</span>
          </h1>
          <div style={styles.typedWrapper}>
            <span style={styles.typedText}>{typed}</span>
            <span style={styles.cursor}>|</span>
          </div>
          <p style={styles.heroDesc}>
            Crafting high-performance web applications from pixel-perfect UIs to robust backend systems.
            I turn complex problems into elegant digital experiences.
          </p>
          <div style={styles.heroBtns}>
            <button onClick={() => scrollTo("Projects")} style={styles.primaryBtn}>View Projects →</button>
            <button onClick={() => scrollTo("Contact")} style={styles.ghostBtn}>Let's Talk</button>
          </div>
          <div style={styles.statsRow}>
            {[["3+", "Years Exp."], ["20+", "Projects"], ["15+", "Clients"], ["99%", "Satisfaction"]].map(([val, label]) => (
              <div key={label} style={styles.stat}>
                <span style={styles.statVal}>{val}</span>
                <span style={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.heroCanvas}>
          <ThreeScene variant="hero" />
          <div style={styles.canvasGlow} />
        </div>
      </section>

      {/* TECH MARQUEE */}
      <div style={styles.marqueeWrap}>
        <div style={styles.marqueeTrack}>
          {[...techStack, ...techStack].map((t, i) => (
            <span key={i} style={styles.marqueeItem}>{t}</span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" style={styles.section}>
        <div style={styles.sectionInner}>
          <div style={styles.aboutGrid}>
            <div style={styles.aboutLeft}>
              <span style={styles.sectionTag}>// about_me</span>
              <h2 style={styles.sectionTitle}>Architecting the <span style={styles.accent}>Full Stack</span></h2>
              <p style={styles.bodyText}>
                I'm a passionate full-stack developer with a deep love for building scalable, maintainable systems.
                From crafting responsive React interfaces to designing high-throughput Node.js APIs, I own the entire development lifecycle.
              </p>
              <p style={styles.bodyText}>
                My approach combines engineering rigor with creative problem-solving — I believe great software is both
                technically excellent and genuinely delightful to use.
              </p>
              <div style={styles.pillsRow}>
                {["Problem Solver", "Clean Code Advocate", "Performance Obsessed", "Team Player"].map(p => (
                  <span key={p} style={styles.pill}>{p}</span>
                ))}
              </div>
            </div>
            <div style={styles.aboutRight}>
              <div style={styles.codeCard}>
                <div style={styles.codeDots}>
                  <span style={{...styles.dot, background:"#ff5f56"}}/>
                  <span style={{...styles.dot, background:"#ffbd2e"}}/>
                  <span style={{...styles.dot, background:"#27c93f"}}/>
                </div>
                <pre style={styles.codeText}>{`const maneeshwaran = {
  role: "Full Stack Developer",
  location: "India 🇮🇳",
  experience: "3+ years",
  
  frontend: ["React", "Next.js", "TypeScript"],
  backend:  ["Node.js", "Express", "NestJS"],
  database: ["MongoDB", "PostgreSQL", "Redis"],
  devops:   ["Docker", "AWS", "CI/CD"],
  
  superpower: "Turning coffee ☕ into code",
  
  currentlyBuilding: "Something awesome 🚀",
  openToWork: true,
};`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={styles.section} ref={skillsRef}>
        <div style={styles.sectionInner}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={styles.sectionTag}>// tech_stack</span>
            <h2 style={styles.sectionTitle}>Skills & <span style={styles.accent}>Expertise</span></h2>
          </div>
          <div style={styles.skillsGrid}>
            <div style={styles.skillBars}>
              {skills.map((s) => (
                <div key={s.name} style={styles.skillItem}>
                  <div style={styles.skillMeta}>
                    <span style={styles.skillName}>{s.name}</span>
                    <span style={{ ...styles.skillPct, color: s.color }}>{s.level}%</span>
                  </div>
                  <div style={styles.barTrack}>
                    <div style={{
                      ...styles.barFill,
                      width: skillsVisible ? `${s.level}%` : "0%",
                      background: `linear-gradient(90deg, ${s.color}, ${s.color}88)`,
                      transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
                    }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={styles.orbScene}>
              <ThreeScene variant="skills" />
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={styles.section}>
        <div style={styles.sectionInner}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={styles.sectionTag}>// featured_work</span>
            <h2 style={styles.sectionTitle}>Featured <span style={styles.accent}>Projects</span></h2>
          </div>
          <div style={styles.projectsGrid}>
            {projects.map((p) => (
              <div key={p.title} style={styles.projectCard} className="project-card">
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ ...styles.orbContainer }}>
                    <TechOrb color={parseInt(p.color.replace("#", "0x"))} size={0.35} />
                  </div>
                  <span style={{ fontSize: 28 }}>{p.icon}</span>
                  <h3 style={{ ...styles.projectTitle, color: p.color }}>{p.title}</h3>
                </div>
                <p style={styles.projectDesc}>{p.desc}</p>
                <div style={styles.techPills}>
                  {p.tech.map(t => (
                    <span key={t} style={{ ...styles.techPill, borderColor: p.color + "66", color: p.color }}>{t}</span>
                  ))}
                </div>
                <div style={styles.projectLinks}>
                  <button style={{ ...styles.linkBtn, color: p.color }}>GitHub →</button>
                  <button style={{ ...styles.linkBtn, color: p.color }}>Live Demo ↗</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={styles.section}>
        <div style={styles.sectionInner}>
          <div style={styles.contactGrid}>
            <div>
              <span style={styles.sectionTag}>// get_in_touch</span>
              <h2 style={styles.sectionTitle}>Let's Build <span style={styles.accent}>Together</span></h2>
              <p style={styles.bodyText}>
                Have a project in mind? I'd love to discuss how we can bring your vision to life.
                Whether it's a startup MVP or enterprise platform — let's talk.
              </p>
              <div style={styles.contactLinks}>
                {[
                  { icon: "✉️", label: "maneeshwaran@dev.com" },
                  { icon: "💼", label: "linkedin.com/in/maneeshwaran" },
                  { icon: "🐙", label: "github.com/maneeshwaran" },
                ].map(({ icon, label }) => (
                  <div key={label} style={styles.contactItem}>
                    <span>{icon}</span>
                    <span style={{ color: "#00f0ff" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={styles.contactForm}>
              {/* Name */}
              <div style={{ marginBottom: 16 }}>
                <label style={styles.formLabel}>Name</label>
                <input
                  name="name" type="text" placeholder="Your name"
                  value={form.name} onChange={handleFormChange}
                  style={{ ...styles.formInput, ...(formError.name ? styles.inputError : {}) }}
                />
                {formError.name && <span style={styles.errMsg}>{formError.name}</span>}
              </div>
              {/* Email */}
              <div style={{ marginBottom: 16 }}>
                <label style={styles.formLabel}>Email</label>
                <input
                  name="email" type="email" placeholder="your@email.com"
                  value={form.email} onChange={handleFormChange}
                  style={{ ...styles.formInput, ...(formError.email ? styles.inputError : {}) }}
                />
                {formError.email && <span style={styles.errMsg}>{formError.email}</span>}
              </div>
              {/* Message */}
              <div style={{ marginBottom: 16 }}>
                <label style={styles.formLabel}>Message</label>
                <textarea
                  name="message" placeholder="Tell me about your project..."
                  value={form.message} onChange={handleFormChange} rows={4}
                  style={{ ...styles.formInput, ...(formError.message ? styles.inputError : {}) }}
                />
                {formError.message && <span style={styles.errMsg}>{formError.message}</span>}
              </div>

              {/* Status messages */}
              {sendStatus === "success" && (
                <div style={styles.successBox}>
                  ✅ Message sent! Maneeshwaran will get back to you soon.
                </div>
              )}
              {sendStatus === "error" && (
                <div style={styles.errorBox}>
                  ❌ Something went wrong. Please check your EmailJS credentials or try again.
                </div>
              )}

              <button
                onClick={handleSend}
                disabled={sending}
                style={{ ...styles.submitBtn, opacity: sending ? 0.7 : 1, cursor: sending ? "not-allowed" : "pointer" }}
              >
                {sending ? "Sending… ⏳" : "Send Message 🚀"}
              </button>

              <p style={styles.emailjsNote}>
                Powered by{" "}
                <a href="https://www.emailjs.com" target="_blank" rel="noreferrer"
                   style={{ color: "#00f0ff", textDecoration: "none" }}>EmailJS</a>
                {" "}— replace the credentials at the top of the file.
              </p>
            </div>
            <div style={styles.contactCanvas}>
              <ThreeScene variant="contact" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <span style={{ color: "#475569" }}>© 2025 </span>
        <span style={{ color: "#00f0ff" }}>Maneeshwaran</span>
        <span style={{ color: "#475569" }}> · Crafted with React & Three.js</span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #030712; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #00f0ff44; border-radius: 2px; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes orbFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes gradMove { 0%{transform:translate(0,0)} 50%{transform:translate(60px,40px)} 100%{transform:translate(0,0)} }
        .project-card:hover { transform: translateY(-6px) !important; border-color: #00f0ff55 !important; }
      `}</style>
    </div>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  root: { fontFamily: "'Syne', sans-serif", background: "#030712", color: "#e2e8f0", minHeight: "100vh", overflowX: "hidden", position: "relative" },
  gridBg: { position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(0,240,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,0.03) 1px,transparent 1px)", backgroundSize: "50px 50px", zIndex: 0, pointerEvents: "none" },
  gradientOrb1: { position: "fixed", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,#00f0ff12,transparent 70%)", top: -200, right: -200, zIndex: 0, animation: "gradMove 8s ease-in-out infinite", pointerEvents: "none" },
  gradientOrb2: { position: "fixed", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,#a855f712,transparent 70%)", bottom: -100, left: -100, zIndex: 0, animation: "gradMove 10s ease-in-out infinite reverse", pointerEvents: "none" },
  nav: { position: "fixed", top: 0, width: "100%", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 48px", background: "rgba(3,7,18,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,240,255,0.1)" },
  navLogo: { fontFamily: "'Space Mono',monospace", fontSize: 20, fontWeight: 700, letterSpacing: 1 },
  logoAccent: { color: "#00f0ff", fontSize: 24 },
  navLinks: { display: "flex", gap: 8, alignItems: "center" },
  navBtn: { background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: "8px 16px", fontFamily: "'Syne',sans-serif", fontSize: 15, transition: "color .2s", ":hover": { color: "#00f0ff" } },
  hireBtn: { background: "linear-gradient(135deg,#00f0ff,#0066ff)", border: "none", color: "#030712", padding: "8px 20px", borderRadius: 6, cursor: "pointer", fontWeight: 700, fontFamily: "'Syne',sans-serif", fontSize: 14 },
  menuToggle: { display: "none", background: "none", border: "none", color: "#00f0ff", fontSize: 24, cursor: "pointer" },
  mobileMenu: { position: "absolute", top: "100%", left: 0, right: 0, background: "#0f172a", border: "1px solid #00f0ff22", display: "flex", flexDirection: "column", padding: 16 },
  mobileLink: { background: "none", border: "none", color: "#94a3b8", padding: "12px 16px", cursor: "pointer", fontFamily: "'Syne',sans-serif", fontSize: 15, textAlign: "left" },
  hero: { minHeight: "100vh", display: "flex", alignItems: "center", padding: "100px 48px 60px", position: "relative", zIndex: 1, gap: 48 },
  heroContent: { flex: 1, maxWidth: 600 },
  badge: { display: "inline-block", background: "#00f0ff18", border: "1px solid #00f0ff44", color: "#00f0ff", padding: "6px 16px", borderRadius: 20, fontSize: 13, fontFamily: "'Space Mono',monospace", marginBottom: 24 },
  heroName: { fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16 },
  nameGlow: { color: "#00f0ff", textShadow: "0 0 40px #00f0ff66" },
  typedWrapper: { fontSize: "clamp(1.2rem,2.5vw,1.8rem)", color: "#a855f7", fontFamily: "'Space Mono',monospace", marginBottom: 24, height: 40 },
  typedText: {},
  cursor: { animation: "blink 1s infinite", color: "#00f0ff" },
  heroDesc: { color: "#94a3b8", lineHeight: 1.7, marginBottom: 32, fontSize: 16 },
  heroBtns: { display: "flex", gap: 16, marginBottom: 48, flexWrap: "wrap" },
  primaryBtn: { background: "linear-gradient(135deg,#00f0ff,#0066ff)", border: "none", color: "#030712", padding: "14px 32px", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontFamily: "'Syne',sans-serif", fontSize: 16 },
  ghostBtn: { background: "none", border: "1px solid #00f0ff55", color: "#00f0ff", padding: "14px 32px", borderRadius: 8, cursor: "pointer", fontFamily: "'Syne',sans-serif", fontSize: 16 },
  statsRow: { display: "flex", gap: 32, flexWrap: "wrap" },
  stat: { display: "flex", flexDirection: "column" },
  statVal: { fontSize: 28, fontWeight: 800, color: "#00f0ff" },
  statLabel: { fontSize: 13, color: "#64748b" },
  heroCanvas: { flex: 1, height: 500, maxWidth: 500, position: "relative", animation: "orbFloat 4s ease-in-out infinite" },
  canvasGlow: { position: "absolute", inset: 0, background: "radial-gradient(circle at center,#00f0ff08,transparent 70%)", pointerEvents: "none" },
  marqueeWrap: { overflow: "hidden", borderTop: "1px solid #1e293b", borderBottom: "1px solid #1e293b", background: "#0a0f1e", padding: "14px 0", position: "relative", zIndex: 1 },
  marqueeTrack: { display: "flex", gap: 48, animation: "marquee 20s linear infinite", width: "max-content" },
  marqueeItem: { color: "#475569", fontFamily: "'Space Mono',monospace", fontSize: 13, whiteSpace: "nowrap", letterSpacing: 2 },
  section: { padding: "100px 48px", position: "relative", zIndex: 1 },
  sectionInner: { maxWidth: 1200, margin: "0 auto" },
  sectionTag: { fontFamily: "'Space Mono',monospace", color: "#475569", fontSize: 13, display: "block", marginBottom: 8 },
  sectionTitle: { fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 800, marginBottom: 16 },
  accent: { color: "#00f0ff" },
  aboutGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" },
  aboutLeft: {},
  aboutRight: {},
  bodyText: { color: "#94a3b8", lineHeight: 1.8, marginBottom: 16 },
  pillsRow: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 24 },
  pill: { background: "#0f172a", border: "1px solid #1e293b", color: "#94a3b8", padding: "6px 14px", borderRadius: 20, fontSize: 13 },
  codeCard: { background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: 12, overflow: "hidden" },
  codeDots: { display: "flex", gap: 6, padding: "12px 16px", background: "#0f172a" },
  dot: { width: 12, height: 12, borderRadius: "50%", display: "inline-block" },
  codeText: { fontFamily: "'Space Mono',monospace", fontSize: 12, color: "#94a3b8", padding: "20px", lineHeight: 1.8, overflowX: "auto" },
  skillsGrid: { display: "grid", gridTemplateColumns: "1fr 400px", gap: 64, alignItems: "center" },
  skillBars: { display: "flex", flexDirection: "column", gap: 20 },
  skillItem: {},
  skillMeta: { display: "flex", justifyContent: "space-between", marginBottom: 8 },
  skillName: { color: "#e2e8f0", fontWeight: 600 },
  skillPct: { fontFamily: "'Space Mono',monospace", fontSize: 13 },
  barTrack: { height: 6, background: "#1e293b", borderRadius: 3, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 3 },
  orbScene: { height: 400 },
  projectsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 },
  projectCard: { background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: 16, padding: 24, transition: "transform .3s, border-color .3s", cursor: "pointer" },
  orbContainer: { flexShrink: 0 },
  projectTitle: { fontSize: 20, fontWeight: 700 },
  projectDesc: { color: "#94a3b8", fontSize: 14, lineHeight: 1.7, marginBottom: 16 },
  techPills: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 },
  techPill: { border: "1px solid", padding: "3px 10px", borderRadius: 12, fontSize: 12, fontFamily: "'Space Mono',monospace" },
  projectLinks: { display: "flex", gap: 16 },
  linkBtn: { background: "none", border: "none", cursor: "pointer", fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 700 },
  contactGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" },
  contactLinks: { marginTop: 24, display: "flex", flexDirection: "column", gap: 12 },
  contactItem: { display: "flex", gap: 12, alignItems: "center", color: "#64748b", fontFamily: "'Space Mono',monospace", fontSize: 13 },
  contactForm: { background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: 16, padding: 32 },
  formLabel: { display: "block", color: "#64748b", fontSize: 13, marginBottom: 6, fontFamily: "'Space Mono',monospace" },
  formInput: { width: "100%", background: "#030712", border: "1px solid #1e293b", color: "#e2e8f0", padding: "12px 16px", borderRadius: 8, fontFamily: "'Syne',sans-serif", fontSize: 15, outline: "none", resize: "vertical" },
  submitBtn: { width: "100%", background: "linear-gradient(135deg,#00f0ff,#0066ff)", border: "none", color: "#030712", padding: "14px", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontFamily: "'Syne',sans-serif", fontSize: 16, marginTop: 8 },
  inputError: { borderColor: "#f87171 !important", border: "1px solid #f87171" },
  errMsg: { color: "#f87171", fontSize: 12, marginTop: 4, display: "block", fontFamily: "'Space Mono',monospace" },
  successBox: { background: "#052e16", border: "1px solid #16a34a", color: "#4ade80", padding: "12px 16px", borderRadius: 8, marginBottom: 12, fontSize: 14 },
  errorBox:   { background: "#1c0a09", border: "1px solid #dc2626", color: "#f87171",  padding: "12px 16px", borderRadius: 8, marginBottom: 12, fontSize: 14 },
  emailjsNote: { textAlign: "center", color: "#475569", fontSize: 12, marginTop: 12, fontFamily: "'Space Mono',monospace" },
  contactCanvas: { display: "none" },
  footer: { textAlign: "center", padding: "24px", borderTop: "1px solid #1e293b", fontFamily: "'Space Mono',monospace", fontSize: 13, position: "relative", zIndex: 1 },
};
