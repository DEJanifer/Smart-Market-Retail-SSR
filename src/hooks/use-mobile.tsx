import { useEffect, useState } from 'react';

export const useIsMobile = () => {
  // Default to false for SSR
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Only run on client side
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initial value
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  return isMobile;
};