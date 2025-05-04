import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import '../../styles/Hero.css'
const Hero = () => {
  // State for the typing animation
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  
  // State for scroll progress
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Refs for elements
  const heroRef = useRef(null);
  const backgroundShapesRef = useRef(null);
  
  // Array of phrases to cycle through
  const phrases = [
    'Frontend Developer',
    'UI/UX Designer',
    'Web Developer',
    'Creative Coder'
  ];

  // Effect for viewport height calculation
  useEffect(() => {
    const updateVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    updateVH();
    window.addEventListener('resize', updateVH);
    return () => window.removeEventListener('resize', updateVH);
  }, []);
  
  // Effect for scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const heroHeight = heroRef.current?.offsetHeight || 0;
      const progress = Math.min(scrollTop / heroHeight, 1);
      setScrollProgress(progress);
      
      // Parallax effect on shapes
      if (backgroundShapesRef.current) {
        const shapes = backgroundShapesRef.current.children;
        Array.from(shapes).forEach((shape, index) => {
          const speed = 1 - (index % 3) * 0.2;
          const yPos = scrollTop * speed * -0.2;
          shape.style.transform = `translateY(${yPos}px)`;
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing animation effect
  useEffect(() => {
    const phrase = phrases[currentPhrase];
    
    if (currentIndex < phrase.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + phrase[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 100); // Typing speed
      
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayText('');
        setCurrentIndex(0);
        setCurrentPhrase(prev => (prev + 1) % phrases.length);
      }, 2000); // Wait time before changing phrase
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, currentPhrase, phrases]);

  // Calculate styles based on scroll
  const opacityStyle = {
    opacity: 1 - scrollProgress * 1.5
  };

  return (
    <section 
      id="home" 
      className="hero-section" 
      ref={heroRef}
    >
      {/* Animated background shapes */}
      <div className="hero-background">
        <div ref={backgroundShapesRef} className="background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
        <div className="hero-gradient"></div>
      </div>
      
      <div className="container hero-container">
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={opacityStyle}
          >
            <motion.div
              className="hero-subtitle-container"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="accent-line"></div>
              <h4 className="hero-subtitle">Hi, I'm</h4>
            </motion.div>
            
            <h1 className="hero-title">
              <motion.span 
                className="name-highlight"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Faustine Delica
              </motion.span>
            </h1>
            
            <div className="hero-job">
              <span className="typing-text">{displayText}</span>
              <span className="typing-cursor">|</span>
            </div>
            
            <motion.p 
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              I build exceptional digital experiences that are fast,
              accessible, visually appealing, and responsive.
              Bringing creative ideas to life is my passion.
            </motion.p>
            
            <motion.div 
              className="hero-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <a href="#projects" className="button primary-button">
                View My Work 
                <FaArrowRight className="button-icon" />
              </a>
              <a href="#contact" className="button secondary-button">
                Contact Me
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={opacityStyle}
          >
            <div className="image-frame"></div>
            <div className="image-container">
              <img src="/hero-profile.jpg" alt="Profile" />
              <div className="image-overlay"></div>
            </div>
            <div className="hero-pattern"></div>
          </motion.div>
        </div>
      </div>
      
      <div className="scroll-indicator" style={opacityStyle}>
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  );
};

export default Hero;