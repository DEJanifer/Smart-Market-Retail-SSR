import React, { useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import RequestAssessment from '../components/RequestAssessment';
import ImageCarousel from '../components/ImageCarousel';
import { Award, Eye, CreditCard, Building, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const SmartStorePage: React.FC = () => {
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

  const features = [
    {
      icon: <CreditCard className="h-6 w-6 justify-center text-navy" />,
      title: 'Tap, Grab, & Go',
      description: 'Enjoy instant access with our seamless payment system—just tap a credit card or use Apple Pay/Google Pay, take what you need, and be on your way in seconds.'
    },
    {
      icon: <Cpu className="h-6 w-6 justify-center text-navy" />,
      title: 'AI-Powered Stocking',
      description: 'Our system uses real-time analytics to track buying behavior and keep inventory optimized—ensuring your machine is always filled with the most in-demand items.'
    },
    {
      icon: <Award className="h-6 w-6 justify-center text-navy" />,
      title: 'Curated for Your Crowd',
      description: 'From local favorites and trending snacks to wellness-friendly meals and everyday essentials, we tailor each product mix to your audience and environment.'
    },
    {
      icon: <Eye className="h-6 w-6 justify-center text-navy" />,
      title: 'Always-On Monitoring',
      description: 'Built-in smart alerts keep us one step ahead—restocks and maintenance are triggered automatically, keeping your machine running smoothly with minimal disruption.'
    },
    {
      icon: <Building className="h-6 w-6 justify-center text-navy" />,
      title: 'Flexible Footprint',
      description: 'Our modular Smart Stores are designed to grow with you—available in single to quad cabinet configurations that fit neatly into any space and expand as needed.'
    }
  ];

  const smartStoreImages = [
    {
      src: '/Smart Store 700 05.1',
      alt: 'Smart Store in Office Environment',
      title: 'Modern Office Solutions',
      description: 'Sleek Smart Store machines that enhance any professional workspace with style and functionality.'
    },
    {
      src: '/Smart Store 700 10.1',
      alt: 'Advanced Smart Store Technology',
      title: 'Cutting-Edge Technology',
      description: 'State-of-the-art Smart Store machines featuring touchscreen interfaces and cashless payment systems.'
    },
    {
      src: '/Smart Store 700 15.1',
      alt: 'Smart Store Solutions',
      title: 'Smart Solutions',
      description: 'Intelligent inventory management and real-time monitoring for optimal Smart Store performance.'
    },
    {
      src: '/Smart Store 700 20.1',
      alt: 'Premium Smart Store Experience',
      title: 'Premium Experience',
      description: 'High-quality products and reliable Smart Store service that exceeds customer expectations.'
    },
    {
      src: '/Smart Store 700 25.1',
      alt: 'Innovative Smart Store Technology',
      title: 'Innovation at Work',
      description: 'Revolutionary Smart Store technology that transforms the way people access refreshments.'
    },
    {
      src: '/Smart Store 700 30.1',
      alt: 'Smart Store User Experience',
      title: 'Intuitive User Experience',
      description: 'User-friendly Smart Store interfaces and seamless interactions that make purchasing effortless and enjoyable.'
    },
    {
      src: '/Smart Store 700 35.1',
      alt: 'Smart Store in Modern Environment',
      title: 'Seamless Integration',
      description: 'Smart Stores that blend perfectly into any modern workspace or public area.'
    }
  ];

  return (
    <PageLayout
      title="Smart Stores - AI-Powered Vending Machines | Smart Market Retail"
      description="Experience the future of vending with Smart Market Retail's Smart Stores. AI-powered vending machines with Tap, Grab & Go convenience, contactless payments, and real-time inventory management for Carroll & Baltimore County MD."
      keywords="smart stores, AI vending machines, smart vending technology, contactless vending, tap grab go, intelligent vending, modern vending machines, automated retail, smart inventory management"
    >
      <section className="py-16 md:py-24 relative overflow-hidden pt-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Desktop Layout */}
          <div className="hidden md:block">
            <div className="fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span style={{ color: '#7DCEA0' }}>Smart</span><br />
                <span style={{ color: '#FF8E7F' }}>Stores</span>
              </h1>
              
              <h2 className="text-xl md:text-2xl font-bold mb-6" style={{ color: '#FFCDB2' }}>
                Smart Store 600 & 700 Duo
              </h2>

              <h3 className="text-xl md:text-xl font-semibold mb-6 text-mint">
                Meet the Future of Convenience
              </h3>
              
              <p className="text-lg text-lavender/80 mb-6 leading-relaxed">
               Introducing the Smart Store 600 & 700—our most advanced, scalable, AI-powered unattended retail solution. It’s not just a vending machine; it’s a fully modernized, intelligent shopping experience that fits right into your breakroom, lobby, or common area. With smart inventory management, 24/7 availability, and a sleek, professional look, the Smart Store is designed to turn heads and keep customers coming back. By installing a Smart Store, you’re giving your building a premium, low-maintenance amenity that boosts satisfaction, reflects positively on your property, and requires zero oversight from your team. You're unlocking A Smarter Way To Vend. 
              </p>

              <div className="mb-8">
                <Link 
                  to="/contact"
                  className="inline-flex items-center bg-gradient-pastel text-navy px-6 py-3 rounded-full font-semibold hover:shadow-neon transition-all"
                >
                  Install My Smart Store
                </Link>
              </div>
            </div>

            {/* Image Carousel */}
            <div className="fade-in mb-12">
              <ImageCarousel
                images={smartStoreImages}
                className="w-full max-w-full px-4 sm:px-6 mx-auto"
                autoplay={true}
                effect="fade"
                slidesPerView={1}
                spaceBetween={0}
              />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="fade-in">
              <h1 className="text-4xl font-bold mb-6">
                <span style={{ color: '#7DCEA0' }}>Smart</span><br />
                <span style={{ color: '#FF8E7F' }}>Stores</span>
              </h1>

              <h2 className="text-xl md:text-xl font-bold mb-6" style={{ color: '#FFCDB2' }}>
                Smart Store 600 & 700 Duo
              </h2>

              <h3 className="text-lg md:text-gl font-semibold mb-6 text-mint">
                Meet the Future of Convenience
              </h3>
            </div>

            {/* Image Carousel - Below header on mobile */}
            <div className="fade-in mb-8">
              <ImageCarousel
                images={smartStoreImages}
                className="w-full"
                autoplay={true}
                effect="fade"
                slidesPerView={1}
                spaceBetween={0}
              />
            </div>

            <div className="fade-in">
              <p className="text-lg text-lavender/80 mb-6 leading-relaxed">
                Tired of outdated vending machines that break down, run out of stock, or offer the same boring snacks? 
                It's time for an upgrade. Our Smart Store Machines bring your office a frictionless, intelligent, 
                and stylish Unattended Retail solution that's always available—and always impresses.
              </p>
              
              <p className="text-lg leading-relaxed mb-8" style={{ color: '#E0B0FF', opacity: 0.8 }}>
                With Smart Market Retail, you're not just installing a vending machine. You're unlocking a smarter way to serve your team.
              </p>

              <div className="mb-8">
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center bg-gradient-pastel text-navy px-6 py-3 rounded-full font-semibold hover:shadow-neon transition-all w-full"
                >
                  Install My Smart Store
                </Link>
              </div>
            </div>
          </div>

          <div className="fade-in mb-8">
            <h3 className="text-2xl font-semibold mb-6 text-coral">Why Choose Smart Stores?</h3>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="p-3 bg-gradient-pastel rounded-lg mr-4 mt-1 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-mint mb-2">{feature.title}</h4>
                    <p className="text-peach/80">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-in border-t border-mint/20 pt-8">
            <h3 className="text-2xl font-bold text-mint mb-4">A Smarter Way to Vend</h3>
            <p className="text-lavender/80 leading-relaxed mb-4">
              Blending advanced load-sensing tech, curated product selection, and sleek, space-saving design, our Smart Stores transform ordinary breakrooms into modern, self-serve marketplaces. With Smart Market Retail, you're not just getting vending—you're getting a fast, tailored, and hassle-free experience available around the clock.
            </p>
            <p className="text-lavender/80 leading-relaxed">
              Let us deliver a smart, stylish, and always-ready solution your team will actually look forward to using.
            </p>
          </div>
        </div>
      </section>

      <div className="fade-in">
        <RequestAssessment />
      </div>
    </PageLayout>
  );
};

export default SmartStorePage;