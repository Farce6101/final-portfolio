import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProjectCard from './ProjectCard';
import projects from '../../data/projects';
import '../../styles/Projects.css';

const Projects = () => {
  const [displayAll, setDisplayAll] = useState(false);
  const [filter, setFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const filterRef = useRef(null);
  
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

  // Get all available categories from projects
  const categories = ['all', ...new Set(projects.map(proj => proj.category))];

  // Filter projects based on selected category
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  // Show all or only featured projects based on displayAll state
  const visibleProjects = displayAll 
    ? filteredProjects 
    : filteredProjects.filter(project => project.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  const handleFilterChange = (category) => {
    setFilter(category);
    setActiveCategory(category);
    setDisplayAll(false);
    
    // Add subtle scroll to projects container if on mobile
    if (window.innerWidth < 768 && filterRef.current) {
      setTimeout(() => {
        filterRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest'
        });
      }, 100);
    }
  };

  const handleShowMore = () => {
    setDisplayAll(!displayAll);
  };

  const getCategoryLabel = (category) => {
    return category === 'all' ? 'All' : category;
  };

  return (
    <motion.section 
      id="projects" 
      className="projects-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <motion.div
          ref={ref}
          className="projects-container"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div className="section-header" variants={titleVariants}>
            <motion.h2 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="title-highlight">Projects</span>
            </motion.h2>
            <motion.p
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A collection of my recent work. Each project reflects my passion for
              creating exceptional web experiences.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="projects-filter"
            variants={filterVariants}
            ref={filterRef}
          >
            {categories.map((category, index) => (
              <motion.button 
                key={category}
                className={`filter-button ${filter === category ? 'active' : ''}`}
                onClick={() => handleFilterChange(category)}
                variants={buttonVariants}
                whileTap="tap"
                custom={index}
              >
                {getCategoryLabel(category)}
                {filter === category && (
                  <motion.span 
                    className="active-indicator"
                    layoutId="activeFilter"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
          
          <motion.div 
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {visibleProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
              />
            ))}
          </motion.div>
          
          {filteredProjects.length > visibleProjects.length && (
            <motion.div 
              className="projects-more"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.button 
                className="more-button"
                onClick={handleShowMore}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="button-text">
                  {displayAll ? 'Show Less' : 'Show More Projects'}
                </span>
                <span className="button-icon">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={`feather ${displayAll ? 'feather-arrow-up' : 'feather-arrow-down'}`}
                  >
                    {displayAll ? (
                      <>
                        <line x1="12" y1="19" x2="12" y2="5"></line>
                        <polyline points="5 12 12 5 19 12"></polyline>
                      </>
                    ) : (
                      <>
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <polyline points="19 12 12 19 5 12"></polyline>
                      </>
                    )}
                  </svg>
                </span>
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;