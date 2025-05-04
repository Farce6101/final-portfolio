import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';

const ProjectCard = ({ project, index }) => {
  // Animation variants for the card
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: index * 0.1 
      }
    },
    hover: { 
      y: -10,
      transition: { 
        duration: 0.3, 
        ease: "easeOut" 
      }
    }
  };

  // Animation variants for the image overlay
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  // Animation variants for the links
  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 0, y: 20 },
    hover: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  // Animation variants for each link button
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 0, y: 20 },
    hover: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  // Generate a background gradient based on the project index
  const getBackgroundGradient = (idx) => {
    const gradients = [
      'linear-gradient(135deg, rgba(199, 145, 127, 0.15), rgba(164, 90, 72, 0.1))',
      'linear-gradient(135deg, rgba(74, 102, 112, 0.15), rgba(140, 168, 145, 0.1))',
      'linear-gradient(135deg, rgba(140, 168, 145, 0.15), rgba(74, 102, 112, 0.1))',
      'linear-gradient(135deg, rgba(164, 90, 72, 0.15), rgba(199, 145, 127, 0.1))'
    ];
    return gradients[idx % gradients.length];
  };

  return (
    <motion.div 
      className="project-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      style={{ 
        backgroundColor: 'var(--secondary-bg)',
        background: getBackgroundGradient(index),
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all var(--transition-normal)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      <span className="project-card-number">
        {String(index + 1).padStart(2, '0')}
      </span>
      
      <div 
        className="project-image"
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: '220px'
        }}
      >
        <img 
          src={project.thumbnail} 
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform var(--transition-normal)'
          }}
        />
        
        <motion.div 
          className="image-overlay"
          variants={overlayVariants}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2
          }}
        >
          <motion.div 
            className="project-links"
            variants={linkVariants}
            style={{
              display: 'flex',
              gap: 'var(--space-md)'
            }}
          >
            <motion.a 
              href={project.repoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-link" 
              title="View Repository"
              variants={buttonVariants}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '45px',
                height: '45px',
                backgroundColor: 'white',
                color: 'var(--primary-color)',
                borderRadius: 'var(--radius-rounded)',
                fontSize: '1.1rem',
                transition: 'all var(--transition-fast)',
                boxShadow: 'var(--shadow-md)'
              }}
              whileHover={{
                y: -3,
                backgroundColor: 'var(--primary-color)',
                color: 'white'
              }}
            >
              <FaGithub />
            </motion.a>
            
            <motion.a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-link" 
              title="Live Preview"
              variants={buttonVariants}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '45px',
                height: '45px',
                backgroundColor: 'white',
                color: 'var(--primary-color)',
                borderRadius: 'var(--radius-rounded)',
                fontSize: '1.1rem',
                transition: 'all var(--transition-fast)',
                boxShadow: 'var(--shadow-md)'
              }}
              whileHover={{
                y: -3,
                backgroundColor: 'var(--primary-color)',
                color: 'white'
              }}
            >
              <FaExternalLinkAlt />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      <div 
        className="project-content"
        style={{
          padding: 'var(--space-lg)',
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}
      >
        <div className="project-header" style={{ marginBottom: 'var(--space-sm)' }}>
          <span 
            className="project-category"
            style={{
              display: 'inline-block',
              marginBottom: 'var(--space-xs)',
              color: 'var(--primary-color)',
              fontSize: '0.9rem',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            {project.category}
          </span>
          
          <h3 
            className="project-title"
            style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: '0 0 var(--space-xs) 0',
              fontFamily: 'var(--font-heading)',
              position: 'relative',
              display: 'inline-block'
            }}
          >
            {project.title}
            <span 
              className="title-underline" 
              style={{
                position: 'absolute',
                bottom: '-2px',
                left: '0',
                width: '100%',
                height: '2px',
                background: 'var(--primary-color)',
                opacity: 0.5,
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform var(--transition-normal)'
              }}
            />
          </h3>
        </div>
        
        <p 
          className="project-description"
          style={{
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: 'var(--space-md)',
            flexGrow: 1
          }}
        >
          {project.description}
        </p>
        
        <div 
          className="project-tech"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginTop: 'auto'
          }}
        >
          {project.technologies.map((tech, i) => (
            <span 
              key={i} 
              className="tech-tag"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 10px',
                backgroundColor: 'rgba(212, 165, 154, 0.1)',
                color: 'var(--primary-color)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                fontWeight: 500,
                transition: 'background-color var(--transition-fast)'
              }}
            >
              <FaCode className="tech-icon" style={{ fontSize: '0.8rem' }} />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;