import React from 'react';
import { ChevronDown } from 'lucide-react';

const ScrollArrow: React.FC = () => {
  const scrollToNextSection = () => {
    const heroSection = document.querySelector('section');
    if (heroSection) {
      const nextSection = heroSection.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
      <button
        onClick={scrollToNextSection}
        className="flex flex-col items-center group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded-lg p-2"
        aria-label="Scroll to next section"
      >
        <span className="text-peach/60 text-lg mb-3 group-hover:text-peach transition-colors font-medium">
          Scroll to explore
        </span>
        <div className="animate-bounce">
          <div className="w-20 h-20 rounded-full border-3 border-mint/40 flex items-center justify-center group-hover:border-mint group-hover:bg-mint/10 group-hover:shadow-glow-subtle transition-interactive duration-300 animate-pulse-glow">
            <ChevronDown className="h-10 w-10 text-mint animate-pulse group-hover:scale-110 transition-transform duration-200" />
          </div>
        </div>
      </button>
    </div>
  );
};

export default ScrollArrow;