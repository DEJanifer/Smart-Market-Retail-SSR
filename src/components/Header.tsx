import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import VisualSitemap from './VisualSitemap';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActiveLink = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-navy/40 backdrop-blur-sm border-b border-mint/20 shadow-glow' : 'bg-navy/20 backdrop-blur-sm border-b border-mint/10'
    }`}>
      <div className="container mx-auto px-4 lg:px-6 py-2 lg:py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              {/* Desktop - Single Line */}
              <span className="hidden lg:inline">
                <span className="text-mint">SMART MARKET</span>
                <span className="text-coral"> RETAIL</span>
              </span>
              {/* Mobile - Two Lines */}
              <span className="lg:hidden flex flex-col leading-none">
                <span className="text-mint">SMART MARKET</span>
                <span className="text-coral">RETAIL</span>
              </span>
            </span>
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/solutions" 
              className={`nav-link-interactive ${
                isActiveLink('/solutions') 
                  ? 'text-coral font-semibold' 
                  : 'text-peach'
              }`}
            >
              Our Solutions
            </Link>
            <Link 
              to="/locations" 
              className={`nav-link-interactive ${
                isActiveLink('/locations') 
                  ? 'text-coral font-semibold' 
                  : 'text-peach'
              }`}
            >
              Prospective Locations
            </Link>
            <Link 
              to="/about" 
              className={`nav-link-interactive ${
                isActiveLink('/about') 
                  ? 'text-coral font-semibold' 
                  : 'text-peach'
              }`}
            >
              About
            </Link>
            <Link 
              to="/service-area" 
              className={`nav-link-interactive ${
                isActiveLink('/service-area') 
                  ? 'text-coral font-semibold' 
                  : 'text-peach'
              }`}
            >
              Service Area
            </Link>
            <Link 
              to="/blog" 
              className={`nav-link-interactive ${
                isActiveLink('/blog') 
                  ? 'text-coral font-semibold' 
                  : 'text-peach'
              }`}
            >
              Blog
            </Link>
            <Link 
              to="/faq" 
              className={`nav-link-interactive ${
                isActiveLink('/faq') 
                  ? 'text-coral font-semibold' 
                  : 'text-peach'
              }`}
            >
              FAQ
            </Link>
            <Link 
              to="/contact" 
              className={`btn-primary-interactive ${
                isActiveLink('/contact')
                  ? 'shadow-neon-intense'
                  : ''
              }`}
            >
              Contact Us
            </Link>
          </nav>
          
          <button 
            className="lg:hidden text-mint p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <X size={24} />
            ) : (
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Sitemap Navigation - Now positioned relative to header */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-navy/95 backdrop-blur-sm z-40 max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="container mx-auto px-4 py-4">
            <div className="bg-navy/50 backdrop-blur-sm border border-mint/20 rounded-lg p-4">
              <VisualSitemap />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;