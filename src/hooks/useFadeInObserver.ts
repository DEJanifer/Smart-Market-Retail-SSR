import { useEffect } from 'react';

export const useFadeInObserver = (threshold: number = 0.1) => {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold }
    );

    // Small delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [threshold]);
};