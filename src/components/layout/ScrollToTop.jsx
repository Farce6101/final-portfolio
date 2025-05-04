import { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      style={{
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '0',
        height: '0',
        padding: '0',
        background: 'transparent',
        borderLeft: '20px solid transparent',
        borderRight: '20px solid transparent',
        borderBottom: '30px solid var(--primary-color)',
        cursor: 'pointer',
        border: 'none',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        zIndex: 9999,
        transition: 'opacity 0.3s'
      }}
    />
  );
};

export default ScrollToTop;