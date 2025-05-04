import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaPaperPlane,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaDribbble,
  FaBehance,
  FaFacebook,
  FaYoutube,
  FaPinterest,
  FaMedium
} from 'react-icons/fa';
import emailjs from 'emailjs-com';
import siteConfig from '../../data/siteConfig';
import '../../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  
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

  // Define all animation variants
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

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    return errors;
  };
  
  // Function to get the correct icon component based on platform name
  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <FaGithub />;
      case 'linkedin':
        return <FaLinkedin />;
      case 'twitter':
        return <FaTwitter />;
      case 'instagram':
        return <FaInstagram />;
      case 'dribbble':
        return <FaDribbble />;
      case 'behance':
        return <FaBehance />;
      case 'facebook':
        return <FaFacebook />;
      case 'youtube':
        return <FaYoutube />;
      case 'pinterest':
        return <FaPinterest />;
      case 'medium':
        return <FaMedium />;
      default:
        return <FaEnvelope />;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      setFormStatus(null);
      
      try {
        // Initialize emailjs with your user ID
        emailjs.init(siteConfig.contact.emailjsUserId);
        
        // Send the email
        await emailjs.send(
          siteConfig.contact.emailjsServiceId,
          siteConfig.contact.emailjsTemplateId,
          {
            from_name: formData.name,
            reply_to: formData.email,
            subject: formData.subject,
            message: formData.message
          }
        );
        
        // Reset form data
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Set success status
        setFormStatus('success');
      } catch (error) {
        console.error('Email sending failed:', error);
        setFormStatus('error');
      }
      
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.div
          ref={ref}
          className="contact-container"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div className="section-header" variants={titleVariants}>
            <motion.h2 
              className="section-title"
              variants={itemVariants}
            >
              <span className="title-highlight">Get in touch</span>
            </motion.h2>
            <motion.p
              className="section-subtitle"
              variants={itemVariants}
            >
              Get in touch with me. I'm always open to discussing new projects,
              creative ideas or opportunities to be part of your vision.
            </motion.p>
          </motion.div>
          

          
          <div className="contact-content">
            <motion.div className="contact-info" variants={containerVariants}>
              <motion.div className="info-item" variants={itemVariants}>
                <div className="info-icon">
                  <FaEnvelope />
                </div>
                <div className="info-content">
                  <h3>Email</h3>
                  <p><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
                </div>
              </motion.div>
              
              <motion.div className="info-item" variants={itemVariants}>
                <div className="info-icon">
                  <FaPhone />
                </div>
                <div className="info-content">
                  <h3>Phone</h3>
                  <p><a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a></p>
                </div>
              </motion.div>
              
              <motion.div className="info-item" variants={itemVariants}>
                <div className="info-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="info-content">
                  <h3>Location</h3>
                  <p>{siteConfig.location}</p>
                </div>
              </motion.div>
              
              <motion.div className="contact-social" variants={itemVariants}>
                <h3>Connect With Me</h3>
                <div className="social-links">
                  {Object.entries(siteConfig.social || {}).map(([platform, url]) => (
                    <a 
                      key={platform} 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label={platform}
                    >
                      {getSocialIcon(platform)}
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div className="contact-form-container" variants={containerVariants}>
              <motion.form 
                className="contact-form"
                onSubmit={handleSubmit}
                variants={itemVariants}
              >
                {formStatus === 'success' && (
                  <div className="form-success">
                    <p>{siteConfig.contact.successMessage}</p>
                  </div>
                )}
                
                {formStatus === 'error' && (
                  <div className="form-error">
                    <p>{siteConfig.contact.errorMessage}</p>
                  </div>
                )}
                
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={formErrors.name ? 'error' : ''}
                  />
                  {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className={formErrors.email ? 'error' : ''}
                  />
                  {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className={formErrors.subject ? 'error' : ''}
                  />
                  {formErrors.subject && <span className="error-message">{formErrors.subject}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows="6"
                    className={formErrors.message ? 'error' : ''}
                  ></textarea>
                  {formErrors.message && <span className="error-message">{formErrors.message}</span>}
                </div>
                
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <FaPaperPlane className="send-icon" />
                    </>
                  )}
                </button>
              </motion.form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;