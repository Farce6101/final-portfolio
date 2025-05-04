import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaFolder, FaArrowRight, FaTag } from 'react-icons/fa';

const BlogCard = ({ post, index, onClick }) => {
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
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  // Animation variants for the image
  const imageVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.5 }
    }
  };

  // Animation variants for the read more button
  const buttonVariants = {
    hidden: { 
      x: -10, 
      opacity: 0 
    },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    hover: { 
      x: 5, 
      color: 'var(--secondary-color)',
      transition: { duration: 0.2 }
    }
  };

  // Get excerpt with length limit
  const getExcerpt = (text, limit = 150) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit).trim() + '...';
  };

  return (
    <motion.div 
      className="blog-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={() => onClick(post)}
      style={{
        backgroundColor: 'var(--secondary-bg)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all var(--transition-normal)',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        border: '1px solid var(--border-color)'
      }}
    >
      <div 
        className="blog-image"
        style={{
          position: 'relative',
          height: '220px',
          overflow: 'hidden'
        }}
      >
        <motion.img 
          src={post.thumbnail} 
          alt={post.title}
          variants={imageVariants}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        
        <div 
          className="blog-category"
          style={{
            position: 'absolute',
            top: 'var(--space-md)',
            right: 'var(--space-md)',
            zIndex: 2
          }}
        >
          <span 
            style={{
              display: 'inline-block',
              padding: '6px 12px',
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem',
              fontWeight: 500,
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {post.category}
          </span>
        </div>
        
        <div
          className="image-overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.6) 100%)',
            zIndex: 1
          }}
        />
      </div>
      
      <div 
        className="blog-content"
        style={{
          padding: 'var(--space-lg)',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          position: 'relative'
        }}
      >
        <div 
          className="blog-meta"
          style={{
            display: 'flex',
            gap: 'var(--space-md)',
            marginBottom: 'var(--space-md)',
            flexWrap: 'wrap',
            fontSize: 'var(--text-xs)'
          }}
        >
          <span 
            className="blog-date"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text-secondary)',
            }}
          >
            <FaCalendarAlt style={{ color: 'var(--primary-color)' }} />
            {post.date}
          </span>
          
          <span 
            className="blog-author"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text-secondary)',
            }}
          >
            <FaUser style={{ color: 'var(--primary-color)' }} />
            {post.author}
          </span>
        </div>
        
        <h3 
          className="blog-title"
          style={{
            fontSize: 'var(--text-md)',
            fontWeight: 600,
            marginBottom: 'var(--space-md)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-heading)',
            lineHeight: 1.3,
            transition: 'color var(--transition-fast)'
          }}
        >
          {post.title}
        </h3>
        
        <p 
          className="blog-excerpt"
          style={{
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: 'var(--space-md)',
            flexGrow: 1,
            fontSize: 'var(--text-sm)'
          }}
        >
          {getExcerpt(post.excerpt)}
        </p>
        
        {post.tags && post.tags.length > 0 && (
          <div 
            className="blog-tags"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-sm)',
              marginBottom: 'var(--space-md)'
            }}
          >
            {post.tags.slice(0, 3).map((tag, i) => (
              <span 
                key={i} 
                className="blog-tag"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 8px',
                  backgroundColor: 'rgba(232, 196, 184, 0.2)',
                  color: 'var(--text-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem'
                }}
              >
                <FaTag style={{ fontSize: '0.7rem' }} />
                {tag}
              </span>
            ))}
            
            {post.tags.length > 3 && (
              <span 
                className="blog-tag"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 8px',
                  backgroundColor: 'rgba(232, 196, 184, 0.2)',
                  color: 'var(--text-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem'
                }}
              >
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}
        
        <div 
          className="blog-read-more"
          style={{
            marginTop: 'auto',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <motion.div 
            className="read-more-link"
            variants={buttonVariants}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--primary-color)',
              fontWeight: 500,
              fontSize: 'var(--text-sm)'
            }}
          >
            Read More <FaArrowRight style={{ transition: 'transform var(--transition-fast)' }} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;