import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import About from './sections/About';
import Projects from './sections/Projects';
import MiniProjects from './sections/MiniProjects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import './App.css';

function App() {
  return (
    <>
      {/* Custom cursor */}
      <Cursor />

      {/* Grid background */}
      <div className="grid-bg" />

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <main>
        <Hero />
        <Stats />
        <About />
        <Projects />
        <MiniProjects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
