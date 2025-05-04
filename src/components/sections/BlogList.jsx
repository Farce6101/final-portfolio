import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSpinner, FaFilter, FaTimes } from 'react-icons/fa';
import BlogCard from './BlogCard';
import blogposts from '../../data/blogposts';
import '../../styles/Blog.css';

// Simple custom hooks for animations
const useScrollAnimation = (threshold = 0.1, once = true) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (once && entry.isIntersecting) {
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin: '0px 0px -100px 0px' }
    );
    
    observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, once]);
  
  return [ref, isVisible];
};

const useStaggeredChildren = (staggerDelay = 0.1, baseDelay = 0.2) => {
  const containerRef = useRef(null);
  
  // Generate animation props for Framer Motion
  const containerProps = {
    variants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: baseDelay
        }
      }
    },
    initial: "hidden",
    animate: "visible"
  };
  
  // Generate item variants for children
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return [containerRef, containerProps, itemVariants];
};

const BlogList = () => {
  const [postsPerPage, setPostsPerPage] = useState(3);
  const [activeFilter, setActiveFilter] = useState('all');
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  
  // Custom animation hooks
  const [ref, inView] = useScrollAnimation(0.1, true);
  const [containerRef, containerProps, itemVariants] = useStaggeredChildren(0.1, 0.2);
  
  // Extract unique categories from blogposts data
  useEffect(() => {
    try {
      const uniqueCategories = [...new Set(blogposts.map(post => post.category))];
      setAvailableCategories(['all', ...uniqueCategories]);
      setActiveFilter('all');
    } catch (err) {
      setError('Failed to load categories');
    }
  }, []);

  // Update displayed posts when filter or postsPerPage changes
  useEffect(() => {
    try {
      setLoading(true);
      const filtered = activeFilter === 'all' 
        ? [...blogposts] 
        : blogposts.filter(post => post.category === activeFilter);
      
      setDisplayedPosts(filtered.slice(0, postsPerPage));
      setLoading(false);
    } catch (err) {
      setError('Failed to load posts');
      setLoading(false);
    }
  }, [activeFilter, postsPerPage]);

  // Handle filter change
  const handleFilterClick = (category) => {
    setLoading(true);
    setActiveFilter(category);
    setPostsPerPage(3);
    setIsFilterMenuOpen(false);
  };

  // Handle load more
  const handleLoadMore = () => {
    setPostsPerPage(prev => prev + 3);
  };

  // Navigate to blog post (using anchor href instead of react-router)
  const handlePostClick = (post) => {
    window.location.href = `/blog/${post.slug}`;
  };

  // Toggle filter menu on mobile
  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  // Get all filtered posts count
  const filteredPostsCount = activeFilter === 'all' 
    ? blogposts.length 
    : blogposts.filter(post => post.category === activeFilter).length;

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, type: "spring" }
    }
  };

  const filterButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { 
        delay: i * 0.05,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: { 
      y: -3,
      backgroundColor: activeFilter === 'all' ? 'var(--primary-color)' : 'transparent',
      color: activeFilter === 'all' ? 'white' : 'var(--primary-color)',
      borderColor: 'var(--primary-color)',
      boxShadow: 'var(--shadow-sm)',
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.section 
      id="blog" 
      className="blog-section"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      ref={ref}
    >
      <div className="container">
        <div className="blog-container">
          <motion.div 
            className="section-header text-center"
            variants={titleVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <h2 className="section-title">
              <span className="title-highlight">Blog</span>
            </h2>
            <p className="section-subtitle">
              Thoughts, stories and ideas about web development, design and creativity
            </p>
          </motion.div>
          
          <div className="blog-filter-container">
            {/* Mobile filter toggle */}
            <motion.button 
              className="filter-toggle-mobile"
              onClick={toggleFilterMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isFilterMenuOpen ? <FaTimes /> : <FaFilter />}
              <span>{activeFilter === 'all' ? 'All Categories' : activeFilter}</span>
            </motion.button>
            
            {/* Desktop filter buttons */}
            <motion.div 
              className="blog-filter"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
            >
              {availableCategories.map((category, i) => (
                <motion.button
                  key={category}
                  custom={i}
                  className={`filter-button ${activeFilter === category ? 'active' : ''}`}
                  onClick={() => handleFilterClick(category)}
                  disabled={loading}
                  variants={filterButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {category === 'all' ? 'All Posts' : category}
                  {activeFilter === category && (
                    <motion.span 
                      className="active-indicator" 
                      layoutId="activeFilterBlog" 
                      transition={{ type: "spring", bounce: 0.2 }} 
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
            
            {/* Mobile filter dropdown */}
            <AnimatePresence>
              {isFilterMenuOpen && (
                <motion.div 
                  className="filter-dropdown"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {availableCategories.map((category) => (
                    <button
                      key={category}
                      className={`dropdown-item ${activeFilter === category ? 'active' : ''}`}
                      onClick={() => handleFilterClick(category)}
                    >
                      {category === 'all' ? 'All Posts' : category}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {loading && displayedPosts.length === 0 ? (
            <div className="loading-state">
              <FaSpinner className="loading-spinner" />
              <p>Loading posts...</p>
            </div>
          ) : (
            <motion.div 
              className="blog-grid"
              ref={containerRef}
              {...containerProps}
            >
              <AnimatePresence>
                {displayedPosts.map((post, index) => (
                  <BlogCard 
                    key={post.id} 
                    post={post}
                    index={index}
                    onClick={handlePostClick}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
          
          {postsPerPage < filteredPostsCount && !loading && (
            <motion.div 
              className="blog-more"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.button 
                className="load-more-button"
                onClick={handleLoadMore}
                whileHover={{ 
                  y: -5,
                  boxShadow: 'var(--shadow-md)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <>
                    <FaSpinner className="loading-spinner" />
                    Loading...
                  </>
                ) : (
                  `Load More Posts (${filteredPostsCount - postsPerPage} remaining)`
                )}
              </motion.button>
            </motion.div>
          )}

          {filteredPostsCount === 0 && !loading && (
            <motion.div 
              className="no-posts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p>No posts found in this category</p>
              <motion.button 
                className="filter-button"
                onClick={() => handleFilterClick('all')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Posts
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default BlogList;