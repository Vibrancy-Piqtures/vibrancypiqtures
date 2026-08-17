'use client';

import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const scrolledHalfway =
        window.scrollY > (document.body.scrollHeight - window.innerHeight) / 2;
      setIsVisible(scrolledHalfway);

      setIsScrolling(true);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => setIsScrolling(false), 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shouldShowButton = isVisible && !isScrolling;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-15 right-7 
        w-12 h-12 md:w-11 md:h-11 
        rounded-full 
        flex items-center justify-center 
        text-xl 
        border-none cursor-pointer 
        z-1000 
        backdrop-blur-sm 
        transition-all duration-300 ease-out 
        translate-y-5 
        opacity-0 invisible
        ${shouldShowButton ? 'opacity-100 visible translate-y-0' : ''}
        /* Light theme */
        bg-[rgba(221,221,221,0.2)] 
        text-[#114747] 
        hover:bg-[rgba(218,218,218,0.35)]
        shadow-[0_2px_8px_rgba(0,0,0,0.15)]
        /* Dark theme */
        dark:bg-[rgba(64,64,64,0.6)]
        dark:text-white
        dark:hover:bg-[rgba(90,90,90,0.7)]
        dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)]
      `}
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTopButton;