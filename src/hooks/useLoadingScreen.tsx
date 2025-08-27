import { useState, useEffect } from 'react';

export const useLoadingScreen = (duration: number = 1500) => {
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Only show loading on client side
    if (typeof window === 'undefined') {
      return;
    }
    
    // Check for external referrer flag
    const isExternalReferrer = 
      (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('externalReferrer') === 'true') || 
      (window as any).__EXTERNAL_REFERRER__ === true;
    
    // Check if user has visited before
    const hasVisited = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('hasVisited') === 'true';
    
    // Only show loading screen for first-time internal visitors
    if (!isExternalReferrer && !hasVisited) {
      setIsLoading(true);
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('hasVisited', 'true');
      }
      
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, duration);
      
      return () => clearTimeout(timer);
    } else {
      // Clear external referrer flag after checking
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem('externalReferrer');
      }
    }
  }, [duration]);
  
  return isLoading;
};