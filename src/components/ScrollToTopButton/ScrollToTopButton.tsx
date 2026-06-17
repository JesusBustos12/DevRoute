"use client";

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import styles from './ScrollToTopButton.module.css';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    
    // Check initial scroll
    toggleVisibility();

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button 
      className={styles.scrollToTop} 
      onClick={scrollToTop}
      aria-label="Volver arriba"
    >
      <ArrowUp size={20} />
    </button>
  );
}
