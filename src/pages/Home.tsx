import React, { useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import Hero from '../components/Hero';
import BreakroomExperience from '../components/BreakroomExperience';
import Solutions from '../components/Services';
import About from '../components/About';
import BreakroomBuilder from '../components/BreakroomBuilder';
import Benefits from '../components/Benefits';
import Locations from '../components/Locations';

const Home: React.FC = () => {
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

    document.querySelectorAll('.fade-in').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.fade-in').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

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