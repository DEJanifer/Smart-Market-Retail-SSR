import React, { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import LoadingScreen from '../components/LoadingScreen';
import Hero from '../components/Hero';
import BreakroomExperience from '../components/BreakroomExperience';
import Solutions from '../components/Services';
import About from '../components/About';
import BreakroomBuilder from '../components/BreakroomBuilder';
import Benefits from '../components/Benefits';
import Locations from '../components/Locations';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check for external referrer flag
    const isExternalReferrer = sessionStorage.getItem('externalReferrer') === 'true' || 
                               (window as any).__EXTERNAL_REFERRER__ === true;
    
    // Check if user has visited before
    const hasVisited = sessionStorage.getItem('hasVisited') === 'true';
    
    // Only show loading screen for first-time internal visitors
    if (!isExternalReferrer && !hasVisited) {
      setIsLoading(true);
      sessionStorage.setItem('hasVisited', 'true');
      
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    } else {
      // Clear external referrer flag after checking
      sessionStorage.removeItem('externalReferrer');
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (!isLoading && isClient) {
      document.querySelectorAll('.fade-in').forEach((el) => {
        observer.observe(el);
      });
    }

    return () => {
      document.querySelectorAll('.fade-in').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [isLoading, isClient]);

  // Only show loading screen if conditions are met
  if (isClient && isLoading) {
    return <LoadingScreen />;
  }

  // Always render the page content
  return (
    <PageLayout
      title="SMART MARKET RETAIL - A Smarter Way to Vend | Carroll & Baltimore County MD"
      description="Transform your workspace with Smart Market Retail's AI-powered vending machines and micro markets. Serving Carroll & Baltimore County Maryland with 24/7 unattended retail solutions, fresh food, and contactless payments."
      keywords="smart vending machines, micro markets, unattended retail, office vending, Carroll County MD, Baltimore County MD, contactless payments, AI vending, smart stores, breakroom solutions"
    >
      <div>
        <div id="hero" className="fade-in pt-12 lg:pt-0">
          <Hero />
        </div>
        
        <div id="breakroom-experience" className="fade-in">
          <BreakroomExperience />
        </div>

        <div id="breakroom-builder" className="fade-in">
          <BreakroomBuilder />
        </div>
        
        <div id="about" className="fade-in">
          <About />
        </div>
        
        <div id="benefits" className="fade-in">
          <Benefits />
        </div>
        
        <div id="solutions" className="fade-in">
          <Solutions />
        </div>
        
        <div id="locations" className="fade-in">
          <Locations />
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;