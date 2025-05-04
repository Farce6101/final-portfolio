import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa'; 
import { useEffect } from 'react';
import '../../styles/Footer.css';
import siteConfig from '../../data/siteConfig';

const Footer = () => {
  const year = new Date().getFullYear();
  
  // Import social links from site configuration
  const { social } = siteConfig;
  
  // Function to handle internal navigation links
  const handleInternalLink = (e) => {
    const targetId = e.currentTarget.getAttribute('href');
    
    // Check if we're on the homepage
    const isHomepage = window.location.pathname === '/' || 
                      window.location.pathname === '/index.html';
    
    if (isHomepage) {
      // If on homepage, perform smooth scroll
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Get the height of any fixed headers
        const header = document.querySelector('.header') || document.querySelector('header');
        const headerOffset = header ? header.offsetHeight : 0;
        
        // Calculate the position to scroll to
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 20;
        
        // Smooth scroll to the target
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without scrolling (optional)
        history.pushState(null, '', targetId);
      }
    } else {
      // If not on homepage, navigate to homepage with hash
      window.location.href = '/' + targetId;
    }
  };
  
  // Add event listeners to all internal links
  useEffect(() => {
    const internalLinks = document.querySelectorAll('.footer-links a[href^="#"]');
    
    internalLinks.forEach(link => {
      link.addEventListener('click', handleInternalLink);
    });
    
    // Clean up event listeners
    return () => {
      internalLinks.forEach(link => {
        link.removeEventListener('click', handleInternalLink);
      });
    };
  }, []);
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>{siteConfig.title || 'Portfolio'}</h3>
            <p>{siteConfig.about?.tagline || 'Building amazing web experiences'}</p>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-social">
            <h4>Connect With Me</h4>
            <div className="social-icons">
              {social?.github && (
                <a 
                  href={social.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="GitHub"
                  className="social-icon"
                >
                  <FaGithub />
                </a>
              )}
              
              {social?.linkedin && (
                <a 
                  href={social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="LinkedIn"
                  className="social-icon"
                >
                  <FaLinkedin />
                </a>
              )}
              
              {social?.twitter && (
                <a 
                  href={social.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Twitter"
                  className="social-icon"
                >
                  <FaTwitter />
                </a>
              )}
              
              {social?.instagram && (
                <a 
                  href={social.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Instagram"
                  className="social-icon"
                >
                  <FaInstagram />
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {year} {siteConfig.name || 'D.Farce Portfolio'}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;