import { useState, useEffect } from 'react';

export const useLoadingScreen = (duration: number = 750) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Skip loading screen on mobile devices for better LCP
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      setIsLoading(false);
      return;
    }
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return isLoading;
};