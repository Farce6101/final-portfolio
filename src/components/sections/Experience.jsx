import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBriefcase, FaGraduationCap, FaCode, FaBuilding, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import experiences from '../../data/experiences';
import '../../styles/Experience.css';

const Experience = () => {
  const [activeType, setActiveType] = useState('all');
  
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Get all available types from experiences
  const availableTypes = ['all', ...new Set(experiences.map(exp => exp.type))];

  // Filter experiences based on active type
  const filteredExperiences = activeType === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.type === activeType);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Added title variants
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const handleFilterClick = (type) => {
    setActiveType(type);
  };

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'work':
        return <FaBriefcase className="filter-icon" />;
      case 'education':
        return <FaGraduationCap className="filter-icon" />;
      case 'web application':
        return <FaCode className="filter-icon" />;
      default:
        return <FaCode className="filter-icon" />;
    }
  };

  const getTypeLabel = (type) => {
    // Return the type as is for proper display
    return type;
  };

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <motion.div
          ref={ref}
          className="experience-container"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* New section header with title and subtitle */}
          <motion.div className="section-header" variants={titleVariants}>
            <motion.h2 
              className="section-title"
              variants={itemVariants}
            >
              <span className="title-highlight">Experience</span>
            </motion.h2>
            <motion.p
              className="section-subtitle"
              variants={itemVariants}
            >
              My professional journey and educational background that have shaped my skills and expertise.
            </motion.p>
          </motion.div>
          
          <motion.div className="experience-filter" variants={itemVariants}>
            {availableTypes.map((type) => (
              <button 
                key={type}
                className={`filter-button ${activeType === type ? 'active' : ''}`}
                onClick={() => handleFilterClick(type)}
              >
                {type === 'all' ? 'All' : (
                  <>
                    {getTypeIcon(type)}
                    {getTypeLabel(type)}
                  </>
                )}
              </button>
            ))}
          </motion.div>
          
          {filteredExperiences.length > 0 ? (
            <motion.div className="experience-timeline" variants={containerVariants}>
              {filteredExperiences.map((exp) => (
                <motion.div 
                  key={exp.id}
                  className="timeline-item"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="timeline-icon">
                    {getTypeIcon(exp.type)}
                  </div>
                  
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h3 className="timeline-title">{exp.title}</h3>
                      <span className="timeline-period">
                        <FaCalendarAlt className="timeline-meta-icon" />
                        {exp.period}
                      </span>
                    </div>
                    
                    <div className="timeline-company">
                      <span className="company-name">
                        <FaBuilding className="timeline-meta-icon" />
                        {exp.company}
                      </span>
                      <span className="company-location">
                        <FaMapMarkerAlt className="timeline-meta-icon" />
                        {exp.location}
                      </span>
                    </div>
                    
                    <p className="timeline-description">
                      {exp.description}
                    </p>
                    
                    <div className="timeline-skills">
                      {exp.skills.map((skill, i) => (
                        <span key={i} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="no-experiences"
              variants={itemVariants}
            >
              <p>No experiences found for this category.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;