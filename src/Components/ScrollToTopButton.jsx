import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa'; 
import './ScrollToTopButton.css';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // Scroll event handler
  useEffect(() => {
    let scrollTimer;
    
    const handleScroll = () => {
      // Show button if scrolled more than half the page
      const scrolledHalfway = window.scrollY > (document.body.scrollHeight - window.innerHeight) / 2;
      setIsVisible(scrolledHalfway);
      
      // Set scrolling state
      setIsScrolling(true);
      
      // Clear previous timer
      clearTimeout(scrollTimer);
      
      // Set a timer to reset isScrolling after scrolling stops
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 300); // 300ms delay after scrolling stops
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Only show button when visible and not actively scrolling
  const shouldShowButton = isVisible && !isScrolling;

  return (
    <button 
      className={`scroll-to-top ${shouldShowButton ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTopButton;