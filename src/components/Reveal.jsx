import useReveal from '../hooks/useReveal';
import './Reveal.css';

const Reveal = ({ children, delay = 0 }) => {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default Reveal;
