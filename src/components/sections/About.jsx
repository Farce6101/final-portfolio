import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import siteConfig from '../../data/siteConfig';
import '../../styles/About.css'
const About = () => {
  // Reference for the skill bars animation
  const skillsRef = useRef(null);
  
  // Split skills into two columns
  const { about } = siteConfig;
  const skillsFirstHalf = about.skills.slice(0, Math.ceil(about.skills.length / 2));
  const skillsSecondHalf = about.skills.slice(Math.ceil(about.skills.length / 2));
  
  // Create intersection observer for scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add class to trigger animations when section is in view
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.2 }
    );
    
    // Observe all animate-on-scroll elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));
    
    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring"
      }
    }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        bounce: 0.4
      }
    }
  };
  
  const skillItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <motion.section 
      id="about" 
      className="about-section"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container">
        <div className="about-container">
          {/* Section Title */}
          <motion.div 
            className="section-header"
            variants={titleVariants}
          >
            <h2 className="section-title">
              <span className="title-highlight">About Me</span>
            </h2>
            <p className="section-subtitle">
              Here you'll find more information about me, what I do, and my current skills in terms
              of programming and technology
            </p>
          </motion.div>
          
          {/* Main Content */}
          <div className="about-content">
            {/* About Text */}
            <motion.div 
              className="about-text-column"
              variants={contentVariants}
            >
              <h3 className="about-tagline">{about.tagline}</h3>
              
              <div className="about-description">
                {about.description.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="animate-on-scroll from-bottom">{paragraph}</p>
                ))}
              </div>
              
              <motion.div
                className="about-cta"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href={about.resumeUrl} 
                  className="resume-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </motion.div>
            </motion.div>
            
            {/* About Image */}
            <motion.div 
              className="about-image-container"
              variants={imageVariants}
            >
              <div className="about-image-wrapper">
                <div className="image-backdrop"></div>
                <div className="image-frame"></div>
                <div className="about-image">
                  <img src="/about-profile.jpg" alt="Profile" />
                  <div className="image-overlay"></div>
                </div>
                <div className="about-pattern"></div>
              </div>
            </motion.div>
          </div>
          
          {/* Skills Section */}
          <motion.div 
            className="skills-container"
            variants={contentVariants}
            ref={skillsRef}
          >
            <h3 className="skills-title">Skills & Technologies</h3>
            
            <div className="skills-grid">
              {/* First Column */}
              <div className="skills-column">
                <ul className="skills-list">
                  {skillsFirstHalf.map((skill, index) => (
                    <motion.li 
                      key={index}
                      custom={index}
                      variants={skillItemVariants}
                      whileHover={{ x: 5, backgroundColor: 'rgba(212, 165, 154, 0.2)' }}
                      className="skill-item"
                    >
                      <div className="skill-content">
                        <span className="skill-icon">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        <span>{skill}</span>
                      </div>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{ width: `${85 - index * 5}%` }}></div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              {/* Second Column */}
              <div className="skills-column">
                <ul className="skills-list">
                  {skillsSecondHalf.map((skill, index) => (
                    <motion.li 
                      key={index}
                      custom={index + skillsFirstHalf.length}
                      variants={skillItemVariants}
                      whileHover={{ x: 5, backgroundColor: 'rgba(212, 165, 154, 0.2)' }}
                      className="skill-item"
                    >
                      <div className="skill-content">
                        <span className="skill-icon">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                        <span>{skill}</span>
                      </div>
                      <div className="skill-bar">
                        <div className="skill-progress" style={{ width: `${90 - index * 5}%` }}></div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;