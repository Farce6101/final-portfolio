import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for scroll-based animations
 * @param {number} threshold - Visibility threshold (0-1)
 * @param {boolean} once - Whether to trigger only once
 * @returns {Array} - [ref, isVisible, direction, progress]
 */
export const useScrollAnimation = (threshold = 0.1, once = true) => {
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState('down');
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const prevScrollY = useRef(0);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update visibility state
        setIsVisible(entry.isIntersecting);
        
        // If we only want to trigger once and it's visible, unobserve
        if (once && entry.isIntersecting) {
          observer.unobserve(element);
        }
        
        // Calculate scroll direction
        const currentScrollY = window.scrollY;
        if (currentScrollY > prevScrollY.current) {
          setDirection('down');
        } else {
          setDirection('up');
        }
        prevScrollY.current = currentScrollY;
        
        // Calculate progress through element
        if (entry.isIntersecting) {
          const elementTop = entry.boundingClientRect.top;
          const windowHeight = window.innerHeight;
          const elementHeight = entry.boundingClientRect.height;
          
          // Calculate normalized progress (0 at top of viewport, 1 at bottom)
          const rawProgress = 1 - (elementTop + elementHeight) / (windowHeight + elementHeight);
          setProgress(Math.max(0, Math.min(1, rawProgress)));
        }
      },
      { threshold, rootMargin: '0px 0px -100px 0px' }
    );
    
    observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, once]);
  
  return [ref, isVisible, direction, progress];
};

/**
 * Custom hook for cursor-following effects
 * @param {number} sensitivity - Movement sensitivity (0-1)
 * @returns {Array} - [ref, position]
 */
export const useCursorFollow = (sensitivity = 0.1) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const handleMouseMove = (e) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      
      // Get mouse position relative to element
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;
      
      // Apply sensitivity
      setPosition({
        x: x * sensitivity,
        y: y * sensitivity
      });
    };
    
    const handleMouseLeave = () => {
      // Smoothly reset position
      setPosition({ x: 0, y: 0 });
    };
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [sensitivity]);
  
  return [ref, position];
};

/**
 * Custom hook for parallax effects
 * @param {number} speed - Parallax speed factor (0-1)
 * @returns {Array} - [ref, offset]
 */
export const useParallax = (speed = 0.2) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const elementTop = ref.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.clientHeight;
      
      // Calculate parallax offset
      const scrollPosition = window.scrollY;
      const elementOffset = elementTop + scrollPosition;
      const windowMiddle = scrollPosition + windowHeight / 2;
      const elementMiddle = elementOffset + ref.current.offsetHeight / 2;
      
      // Calculate distance from middle of viewport
      const distanceFromMiddle = elementMiddle - windowMiddle;
      
      // Apply parallax effect
      setOffset(distanceFromMiddle * speed);
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [speed]);
  
  return [ref, offset];
};

/**
 * Custom hook for text typing animation
 * @param {string[]} phrases - Array of phrases to cycle through
 * @param {number} typingSpeed - Typing speed in ms
 * @param {number} deleteSpeed - Deleting speed in ms
 * @param {number} delayBetween - Delay between phrases in ms
 * @returns {string} - Current display text
 */
export const useTypingEffect = (
  phrases = [],
  typingSpeed = 100,
  deleteSpeed = 50,
  delayBetween = 2000
) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  
  useEffect(() => {
    if (phrases.length === 0) return;
    
    let timeout;
    const phrase = phrases[currentPhrase];
    
    if (isWaiting) {
      timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, delayBetween);
      return () => clearTimeout(timeout);
    }
    
    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false);
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
        setCurrentIndex(0);
      } else {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, deleteSpeed);
      }
    } else {
      if (currentIndex === phrase.length) {
        setIsWaiting(true);
      } else {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev + phrase[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }, typingSpeed);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [
    phrases,
    currentPhrase,
    currentIndex,
    displayText,
    isDeleting,
    isWaiting,
    typingSpeed,
    deleteSpeed,
    delayBetween
  ]);
  
  return displayText;
};

/**
 * Custom hook for smooth scroll to an element
 * @returns {Function} - scrollToElement function
 */
export const useSmoothScroll = () => {
  return useCallback((elementId, options = {}) => {
    const { offset = 0, duration = 1000, easing = 'easeInOutCubic' } = options;
    
    const target = document.getElementById(elementId);
    if (!target) return;
    
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    const easings = {
      linear: t => t,
      easeInQuad: t => t * t,
      easeOutQuad: t => t * (2 - t),
      easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
      easeInCubic: t => t * t * t,
      easeOutCubic: t => (--t) * t * t + 1,
      easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    };
    
    const animation = currentTime => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easings[easing](progress);
      
      window.scrollTo(0, startPosition + distance * easedProgress);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  }, []);
};

/**
 * Custom hook for creating staggered animations for children
 * @param {number} staggerDelay - Delay between each child animation
 * @param {number} baseDelay - Base delay before starting animations
 * @returns {Array} - [containerRef, animationProps]
 */
export const useStaggeredChildren = (staggerDelay = 0.1, baseDelay = 0.2) => {
  const containerRef = useRef(null);
  
  // Generate animation props for Framer Motion
  const animationProps = {
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
  
  return [containerRef, animationProps, itemVariants];
};

/**
 * Custom hook for theme-based animations on dark/light mode switch
 * @param {string} currentTheme - Current theme ('light' or 'dark')
 * @returns {Object} - Animation props for theme transition
 */
export const useThemeTransition = (currentTheme) => {
  // Animation states for light and dark themes
  const themeVariants = {
    light: {
      backgroundColor: 'var(--primary-bg)',
      color: 'var(--text-primary)',
      transition: { duration: 0.5 }
    },
    dark: {
      backgroundColor: 'var(--primary-bg)',
      color: 'var(--text-primary)',
      transition: { duration: 0.5 }
    }
  };
  
  return {
    variants: themeVariants,
    animate: currentTheme,
    initial: false
  };
};