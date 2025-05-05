import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaUser, FaFolder, FaTags, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import blogposts from '../data/blogposts';
import '../styles/Blog.css';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    const currentPostIndex = blogposts.findIndex(p => p.slug === slug);
    
    if (currentPostIndex !== -1) {
      const currentPost = blogposts[currentPostIndex];
      setPost(currentPost);
      
      // Create carousel images array with thumbnail and gallery images
      const images = [currentPost.thumbnail];
      if (currentPost.gallery) {
        images.push(...currentPost.gallery.map(img => img.url));
      }
      setCarouselImages(images);
      
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

  const openLightbox = (image) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
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

            {carouselImages.length > 0 && (
              <motion.div 
                className="blog-post-carousel"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="carousel-container">
                  <button className="carousel-button prev" onClick={prevImage}>
                    <FaChevronLeft />
                  </button>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={carouselImages[currentImageIndex]}
                      alt={`${post.title} - Image ${currentImageIndex + 1}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>
                  <button className="carousel-button next" onClick={nextImage}>
                    <FaChevronRight />
                  </button>
                </div>
              </motion.div>
            )}

            <motion.div 
              className="blog-post-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.gallery && post.gallery.length > 0 && (
              <motion.div 
                className="blog-post-gallery"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h3 className="gallery-title">Photo Gallery</h3>
                <div className="gallery-grid">
                  {post.gallery.map((image, index) => (
                    <motion.div 
                      key={index}
                      className="gallery-item"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => openLightbox(image)}
                    >
                      <img src={image.url} alt={image.caption || `Gallery image ${index + 1}`} />
                      {image.caption && <p className="gallery-caption">{image.caption}</p>}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {lightboxOpen && (
              <motion.div 
                className="lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeLightbox}
              >
                <button className="lightbox-close" onClick={closeLightbox}>
                  <FaTimes />
                </button>
                <div className="lightbox-content">
                  <img src={selectedImage.url} alt={selectedImage.caption || 'Gallery image'} />
                  {selectedImage.caption && (
                    <p className="lightbox-caption">{selectedImage.caption}</p>
                  )}
                </div>
              </motion.div>
            )}

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