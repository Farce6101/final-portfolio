import { useState, useEffect } from 'react';
import { FaHome, FaUser, FaBriefcase, FaCode, FaBlog, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/Sidebar.css';

const navItems = [
  { id: 'home', label: 'Home', icon: <FaHome />, path: '/' },
  { id: 'about', label: 'About', icon: <FaUser />, path: '/#about' },
  { id: 'experience', label: 'Experience', icon: <FaBriefcase />, path: '/#experience' },
  { id: 'projects', label: 'Projects', icon: <FaCode />, path: '/#projects' },
  { id: 'blog', label: 'Blog', icon: <FaBlog />, path: '/#blog' },
  { id: 'contact', label: 'Contact', icon: <FaEnvelope />, path: '/#contact' },
];

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update active section based on scroll and location
  useEffect(() => {
    const path = location.pathname;
    const hash = location.hash;
    
    // Handle blog post pages
    if (path.startsWith('/blog/')) {
      setActiveSection('blog');
      return;
    }
    
    // Handle direct navigation via hash
    if (hash && hash.length > 1) {
      // Remove the # character
      const sectionId = hash.substring(1);
      setActiveSection(sectionId);
    }
    
    // Handle home page sections
    const sections = ['home', 'about', 'experience', 'projects', 'blog', 'contact'];
    
    const observerOptions = {
      root: null,
      // Adjust rootMargin to be more precise
      rootMargin: '-25% 0px -25% 0px',
      threshold: 0.2 // Increase threshold for better detection
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log(`Section in view: ${entry.target.id}`);
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      } else {
        console.warn(`Element with id "${sectionId}" not found`);
      }
    });

    // Clean up
    return () => {
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [location.pathname, location.hash]);

  // Debug active section changes
  useEffect(() => {
    console.log(`Active section changed to: ${activeSection}`);
  }, [activeSection]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (path, id) => {
    // Close mobile menu
    if (isMobile) {
      setMobileMenuOpen(false);
    }
    
    // Close desktop sidebar
    setIsExpanded(false);

    // Set active section directly for immediate feedback
    setActiveSection(id);

    if (path === '/') {
      // Navigate to home page and scroll to top
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path.startsWith('/#')) {
      const hash = path.replace('/#', '');
      
      if (location.pathname !== '/') {
        // If we're not on home page, navigate first then scroll
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        // If we're on home page, just scroll
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      navigate(path);
    }
  };

  // Sidebar variants for framer-motion
  const sidebarVariants = {
    expanded: {
      width: 'var(--sidebar-extended-width)',
      transition: { duration: 0.3 }
    },
    collapsed: {
      width: 'var(--sidebar-width)',
      transition: { duration: 0.3 }
    }
  };

  // Mobile menu variants
  const mobileMenuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    },
    closed: {
      opacity: 0,
      x: "-100%",
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <motion.nav 
          className="sidebar"
          initial="collapsed"
          animate={isExpanded ? "expanded" : "collapsed"}
          variants={sidebarVariants}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          <div className="sidebar-content">
            <div className="logo">
              {isExpanded ? <h2>D.Farce</h2> : <span>D.</span>}
            </div>
            
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a 
                    href={item.path}
                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.path, item.id);
                    }}
                  >
                    <span className="icon">{item.icon}</span>
                    {isExpanded && <span className="label">{item.label}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.nav>
      )}

      {/* Mobile Menu Button */}
      {isMobile && (
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="mobile-menu-header">
              <h2>Portfolio</h2>
              <button className="close-menu" onClick={toggleMobileMenu}>
                <FaTimes />
              </button>
            </div>
            
            <ul className="mobile-nav-list">
              {navItems.map((item) => (
                <motion.li 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.indexOf(item) * 0.1 }}
                >
                  <a 
                    href={item.path}
                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.path, item.id);
                    }}
                  >
                    <span className="icon">{item.icon}</span>
                    <span className="label">{item.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;