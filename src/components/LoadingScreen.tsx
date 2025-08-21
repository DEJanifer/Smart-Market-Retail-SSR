import React from 'react';

const LoadingScreen: React.FC = () => {

  return (
    <div className="fixed inset-0 z-[100] bg-navy flex items-center justify-center">
      {/* Animated background - same as main site */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="flowing-waves"></div>
      </div>
      
      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        {/* Logo with fade-in animation */}
        <div className="mb-8 animate-fade-in-up">
          <img 
            src="/Logo - Website_medium.webp"
            alt="Smart Market Retail Logo"
            className="w-32 h-32 md:w-40 md:h-40 object-contain mx-auto"
          />
        </div>
        
        {/* Website name with staggered animation */}
        <div className="mb-4 animate-fade-in-up animation-delay-200">
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="text-mint">SMART MARKET</span>
            <span className="text-coral"> RETAIL</span>
          </h1>
        </div>
        
        {/* Tagline with staggered animation */}
        <div className="mb-8 animate-fade-in-up animation-delay-400">
          <p className="text-lg md:text-xl text-peach font-semibold">
            A SMARTER WAY TO VEND
          </p>
        </div>
        
        {/* Loading bar container */}
        <div className="w-64 md:w-80 animate-fade-in-up animation-delay-600">
          <div className="h-1 bg-navy/30 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-pastel rounded-full animate-loading-bar"></div>
          </div>
        </div>
      </div>
      
      {/* Subtle glow effects */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-mint/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-coral/10 rounded-full blur-3xl animate-pulse animation-delay-300"></div>
    </div>
  );
};

export default LoadingScreen;