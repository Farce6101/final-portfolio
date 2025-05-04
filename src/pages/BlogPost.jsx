import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaUser, FaFolder, FaTags, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import blogposts from '../data/blogposts';
import '../styles/Blog.css';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);

  useEffect(() => {
    const currentPostIndex = blogposts.findIndex(p => p.slug === slug);
    
    if (currentPostIndex !== -1) {
      // Set the current post
      setPost(blogposts[currentPostIndex]);
      
      // Get previous post (if exists)
      if (currentPostIndex > 0) {
        setPrevPost(blogposts[currentPostIndex - 1]);
      } else {
        setPrevPost(null);
      }
      
      // Get next post (if exists)
      if (currentPostIndex < blogposts.length - 1) {
        setNextPost(blogposts[currentPostIndex + 1]);
      } else {
        setNextPost(null);
      }
    } else {
      setPost(null);
      setPrevPost(null);
      setNextPost(null);
    }
    
    setLoading(false);
  }, [slug]);

  const handleBack = () => {
    navigate('/#blog');
  };
  
  const handleNavigate = (targetSlug) => {
    navigate(`/blog/${targetSlug}`);
  };

  if (loading) {
    return (
      <motion.div 
        className="blog-post-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container blog-post-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading post...</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!post) {
    return (
      <motion.div 
        className="blog-post-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container blog-post-container">
          <div className="not-found">
            <h2>Post Not Found</h2>
            <p>The blog post you're looking for doesn't exist or has been moved.</p>
            <motion.button 
              className="back-button"
              onClick={handleBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowLeft /> Back to Blog
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.section 
      id="blog-post" 
      className="blog-post-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="blog-post-container">
          <motion.button 
            className="back-button"
            onClick={handleBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft /> Back to Blog
          </motion.button>

          <motion.article 
            className="blog-post"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <header className="blog-post-header">
              <h1 className="blog-post-title">{post.title}</h1>
              <div className="blog-post-meta">
                <span>
                  <FaCalendarAlt className="meta-icon" /> {post.date}
                </span>
                <span>
                  <FaUser className="meta-icon" /> {post.author}
                </span>
                <span>
                  <FaFolder className="meta-icon" /> {post.category}
                </span>
              </div>
            </header>

            {post.thumbnail && (
              <motion.div 
                className="blog-post-featured-image"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <img src={post.thumbnail} alt={post.title} />
              </motion.div>
            )}

            <motion.div 
              className="blog-post-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.tags && post.tags.length > 0 && (
              <motion.div 
                className="blog-post-tags"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h3 className="tags-title">
                  <FaTags /> Tags
                </h3>
                <div className="tags-list">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Post Navigation */}
            <motion.div 
              className="post-navigation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="post-navigation-inner">
                {prevPost ? (
                  <motion.div 
                    className="post-nav-item post-nav-prev"
                    whileHover={{ x: -5, transition: { duration: 0.2 } }}
                    onClick={() => handleNavigate(prevPost.slug)}
                  >
                    <div className="post-nav-arrow">
                      <FaChevronLeft />
                    </div>
                    <div className="post-nav-content">
                      <span className="post-nav-label">Previous Post</span>
                      <h4 className="post-nav-title">{prevPost.title}</h4>
                    </div>
                  </motion.div>
                ) : (
                  <div className="post-nav-item post-nav-empty"></div>
                )}
                
                {nextPost ? (
                  <motion.div 
                    className="post-nav-item post-nav-next"
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    onClick={() => handleNavigate(nextPost.slug)}
                  >
                    <div className="post-nav-content">
                      <span className="post-nav-label">Next Post</span>
                      <h4 className="post-nav-title">{nextPost.title}</h4>
                    </div>
                    <div className="post-nav-arrow">
                      <FaChevronRight />
                    </div>
                  </motion.div>
                ) : (
                  <div className="post-nav-item post-nav-empty"></div>
                )}
              </div>
            </motion.div>
          </motion.article>
        </div>
      </div>
    </motion.section>
  );
};

export default BlogPost;