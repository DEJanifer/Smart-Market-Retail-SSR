import React from 'react';
import { Link } from 'react-router-dom';
import SolutionsGrid from './SolutionsGrid';

const About: React.FC = () => {
  return (
    <section id="about" className="py-12 md:py-16 lg:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Desktop Card Container */}
        <div className="hidden md:block backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
          <div className="flex flex-col items-center gap-8 md:gap-12">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                <span className="text-mint">A Partnership Focused on Your</span> <span className="text-coral">Success</span>
              </h2>
              <p className="text-base md:text-lg text-lavender/80 mb-4 md:mb-6 leading-relaxed max-w-5xl mx-auto px-2">
                Our Unattended Retail solutions are redefining modern vending—combining sleek, cutting-edge technology with unbeatable reliability and service. Designed to exceed today's expectations, our solutions make it effortless to deliver a premium, frictionless user experience with a curated selection of popular products rarely found in standard vending. Modern convenience done right, A Smarter Way to Vend.
              </p>
            </div>
          </div>
          
          {/* Solutions Grid Section */}
          <div className="mb-8 md:mb-12 max-w-6xl mx-auto">
            <SolutionsGrid />
          </div>
        
        {/* Call to Action Section */}
        <div className="text-center border-t border-mint/20 pt-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            <span className="text-mint">Ready to Upgrade With</span> <span className="text-coral">Modern Solutions?</span>
          </h3>
          <p className="text-base md:text-lg text-lavender/80 mb-4 leading-relaxed max-w-4xl mx-auto">
            Ditch outdated vending machines and impress your team or tenants with a sleek, tech-forward amenity. Smart Market Retail delivers Smart Stores, Smart Coolers, Micro Markets, and Smart Vending solutions that elevate convenience and reflect the modern standards your space deserves—without adding to your cost.
          </p>
          <p className="text-base md:text-lg text-peach font-semibold mb-6">
            Upgrade today your space with Smart Market Retail.
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-gradient-pastel text-navy px-8 py-3 rounded-full font-semibold hover:shadow-neon transition-all"
          >
            Upgrade With Us Today
          </Link>
        </div>
        </div>

        {/* Mobile Layout - No Card */}
        <div className="md:hidden">
          <div className="flex flex-col items-center gap-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                <span className="text-mint">A Partnership Focused on Your</span> <span className="text-coral">Success</span>
              </h2>
              <p className="text-base text-lavender/80 mb-4 leading-relaxed px-2">
                Our Unattended Retail solutions are redefining modern vending—combining sleek, cutting-edge technology with unbeatable reliability and service. Designed to exceed today's expectations, our solutions make it effortless to deliver a premium, frictionless user experience with a curated selection of popular products rarely found in standard vending. Modern convenience done right, A Smarter Way to Vend.
              </p>
            </div>
          </div>
          
          {/* Solutions Grid Section */}
          <div className="mb-8">
            <SolutionsGrid />
          </div>
        
        {/* Call to Action Section - Mobile */}
        <div className="text-center border-t border-mint/20 pt-8">
          <h3 className="text-2xl font-bold mb-4">
            <span className="text-mint">Ready to Upgrade to a</span> <span className="text-coral">Modern Solution?</span>
          </h3>
          <p className="text-base text-lavender/80 mb-4 leading-relaxed">
            Ditch outdated vending machines and impress your team or tenants with a sleek, tech-forward amenity. Smart Market Retail delivers Smart Stores, Smart Coolers, Micro Markets, and Smart Vending solutions that elevate convenience and reflect the modern standards your space deserves—without adding to your cost.
          </p>
          <p className="text-base text-peach font-semibold mb-6">
            Upgrade today your space with Smart Market Retail.
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-gradient-pastel text-navy px-8 py-3 rounded-full font-semibold hover:shadow-neon transition-all"
          >
            Upgrade With Us Today
          </Link>
        </div>
        </div>
      </div>
    </section>
  );
};

export default About;