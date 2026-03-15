import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">M<span>.</span></div>
      <ul className="nav-links">
        {['about', 'projects', 'mini', 'contact'].map((section) => (
          <li key={section}>
            <a href={`#${section}`}>{section}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
