import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
const Hero: React.FC = () => {
  return <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 z-10">
        {/* Desktop Card Container */}
        <div className="hidden md:block backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-mint leading-tight">
                Your Partner in Crafting the Perfect <span style={{
                color: '#FF8E7F'
              }}>Breakroom Experience</span>
              </h1>
              
              <p className="text-lg md:text-xl text-peach mb-4 font-bold leading-relaxed">
                We design, install, and manage custom micro markets and smart vending solutions that your employees will love. It's more than a breakroom; it's a cornerstone of your company culture.
              </p>
              

              <p className="text-lg text-mint hover:text-coral transition-colors font-semibold mb-8">
                <a href="https://members.carrollcountychamber.org/memberdirectory/Details/smart-market-retail-4244419" target="_blank" rel="noopener noreferrer">
                  We Are Proud Members of the Carroll County Chamber of Commerce
                </a>
              </p>
                
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mx-0 px-0">
                <Link to="/contact" className="bg-gradient-pastel text-navy px-8 py-3 rounded-full font-semibold hover:shadow-neon transition-all flex items-center justify-center gap-2 group">
                  Get Started <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
                <Link to="/solutions" className="border-2 border-mint text-mint px-8 py-3 rounded-full hover:bg-mint/10 transition-all">
                  Explore Solutions
                </Link>
              </div>
            </div>
            
            {/* Desktop image - shown only on large screens */}
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              <picture>
                <source srcSet="/Logo - Website_small.webp 480w, /Logo - Website_medium.webp 800w, /Logo - Website_large.webp 1200w" sizes="(max-width: 640px) 480px, (max-width: 1024px) 800px, 500px" type="image/webp" />
                <img src="/Logo - Website_medium.webp" alt="Smart Market Retail Vending Machine" className="w-full max-w-[500px] h-auto object-contain" fetchpriority="high" />
              </picture>
            </div>
          </div>
        </div>

        {/* Mobile Layout - No Card */}
        <div className="md:hidden">
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              {/* Main title is hidden on mobile */}

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-mint leading-tight">
                Your Partner in Crafting the Perfect <span style={{
                color: '#FF8E7F'
              }}>Breakroom Experience</span>
              </h1>
              
              {/* Mobile image - shown only on small screens */}
              <div className="flex justify-center mb-4">
                <picture>
                  <source srcSet="/Logo - Website_small.webp 300w, /Logo - Website_medium.webp 600w" sizes="(max-width: 480px) 300px, 400px" type="image/webp" />
                  <img src="/Logo - Website_medium.webp" alt="Smart Market Retail Vending Machine" className="w-full max-w-[300px] h-auto object-contain" fetchpriority="high" />
                </picture>
              </div>

              <p className="text-lg text-peach mb-4 font-bold leading-relaxed">
                We design, install, and manage custom Micro Markets and Smart Vending solutions that your employees will love. It's more than a breakroom; it's a cornerstone of your company culture.
              </p>
              
              <p className="text-lg text-mint hover:text-coral transition-colors font-semibold mb-8">
                <a href="https://members.carrollcountychamber.org/memberdirectory/Details/smart-market-retail-4244419" target="_blank" rel="noopener noreferrer">
                  We Are Proud Members of the Carroll County Chamber of Commerce
                </a>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/contact" className="bg-gradient-pastel text-navy px-8 py-3 rounded-full font-semibold hover:shadow-neon transition-all flex items-center justify-center gap-2 group">
                  Get Started <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
                <Link to="/solutions" className="border-2 border-mint text-mint px-8 py-3 rounded-full hover:bg-mint/10 transition-all text-center">
                  Explore Solutions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;