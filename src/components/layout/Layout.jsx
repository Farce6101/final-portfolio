import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

const Layout = ({ children, toggleTheme, currentTheme }) => {
  const [sidebarWidth, setSidebarWidth] = useState('var(--sidebar-width)');
  const [isMobile, setIsMobile] = useState(false);

  // Handle mobile detection
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarWidth(mobile ? '0px' : 'var(--sidebar-width)');
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll to section when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            const offsetTop = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    };

    // Initial check for hash in URL
    if (window.location.hash) {
      setTimeout(handleHashChange, 100);
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update CSS variables for viewport height
  useEffect(() => {
    const updateVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    updateVH();
    window.addEventListener('resize', updateVH);
    return () => window.removeEventListener('resize', updateVH);
  }, []);

  const mainContentStyle = {
    paddingLeft: !isMobile ? sidebarWidth : '0px',
    transition: 'padding-left 0.3s ease'
  };

  return (
    <motion.div
      className="layout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Sidebar toggleTheme={toggleTheme} currentTheme={currentTheme} />
      <main 
        className="main-content" 
        style={mainContentStyle}
      >
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </motion.div>
  );
};

export default Layout;