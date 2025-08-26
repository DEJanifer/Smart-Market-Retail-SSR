import { useState, useEffect } from 'react';

export const useLoadingScreen = (duration: number = 1500) => {
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Only show loading on client side
    if (typeof window === 'undefined') {
      return;
    }
    
    // Check if this is the first visit
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (!hasVisited) {
      setIsLoading(true);
      sessionStorage.setItem('hasVisited', 'true');
      
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration]);
  
  return isLoading;
};