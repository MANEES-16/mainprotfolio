import { useEffect, useRef } from 'react';
import './Cursor.css';

const Cursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const mx = useRef(0);
  const my = useRef(0);
  const fx = useRef(0);
  const fy = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mx.current = e.clientX;
      my.current = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX - 6 + 'px';
        cursorRef.current.style.top = e.clientY - 6 + 'px';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    let rafId;
    const animate = () => {
      fx.current += (mx.current - fx.current) * 0.12;
      fy.current += (my.current - fy.current) * 0.12;
      if (followerRef.current) {
        followerRef.current.style.left = fx.current - 18 + 'px';
        followerRef.current.style.top = fy.current - 18 + 'px';
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const handleEnter = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'scale(2.5)';
      if (followerRef.current) followerRef.current.style.transform = 'scale(1.5)';
    };
    const handleLeave = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'scale(1)';
      if (followerRef.current) followerRef.current.style.transform = 'scale(1)';
    };

    const interactives = document.querySelectorAll('a, button');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
    </>
  );
};

export default Cursor;
