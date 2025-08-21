import React, { useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import RequestAssessment from '../components/RequestAssessment';

import { CreditCard, TrendingUp, Monitor, ShoppingBag, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const SmartCoolersPage: React.FC = () => {
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
      icon: <ShoppingBag className="h-6 w-6 justify-center text-nav" />,
      title: 'Big Capacity, Small Footprint',
      description: 'Our highest-capacity single unit delivers more snacks, more meals, and more variety—all in less space. It’s the smart, space-saving cooler that keeps up with demand while keeping your breakroom, lobby, or lounge sleek and efficient.'
    },
    {
      icon: <CreditCard className="h-6 w-6 justify-center text-nav" />,
      title: 'Cashless Convenience, Seamless Checkout',
      description: 'Tap, Grab, & Go cashless experience. Credit cards, mobile wallets, and QR codes keep payments frictionless, making every transaction as effortless as the next.'
    },
    {
      icon: <TrendingUp className="h-6 w-6 justify-center text-nav" />,
      title: 'Smart Expansion, Maximum Efficiency',
      description: 'CoolSmart delivers up to 40% more storage than other smart coolers with its spacious 28 cu. ft. interior. We can effortlessly scale as your demand grows—no complexity, just smarter growth.'
    },
    {
      icon: <Monitor className="h-6 w-6 justify-center text-nav" />,
      title: 'Real-Time Remote Monitoring',
      description: 'We remotely track sales, monitor inventory, and receive instant system updates ensuring maximum uptime and stocked shelves.'
    },
    {
      icon: <Leaf className="h-6 w-6 justify-center text-nav" />,
      title: 'Built to Save Energy & Money',
      description: 'NAMA Certified and Energy Star Rated, CoolSmart AI Market helps reduce your environmental footprint while delivering reliable, high-performance cooling day in and day out.'
    }
  ];


  return (
    <PageLayout
      title="Smart Coolers - CoolSmart AI Market | Smart Market Retail"
      description="Experience the CoolSmart AI Market - next-generation smart cooler with computer vision, AI-powered security, and cashless convenience. NAMA Certified and Energy Star Rated cooling solutions from Smart Market Retail."
      keywords="smart coolers, CoolSmart AI Market, computer vision vending, AI-powered coolers, smart cooling technology, energy efficient coolers, cashless coolers, intelligent vending"
    >
      <section className="py-16 md:py-24 relative overflow-hidden pt-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Desktop Layout */}
          <div className="hidden md:block">
            <div className="fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span style={{ color: '#7DCEA0' }}>Smart</span><br />
                <span style={{ color: '#FF8E7F' }}>Coolers</span>
              </h1>
              
              <h2 className="text-2xl md:text-2xl font-bold mb-6" style={{ color: '#FFCDB2' }}>
                CoolSmart AI Market
              </h2>
              
              <h3 className="text-2xl md:text-xl font-semibold mb-6 text-mint">
                Next Generation Smart Cooler.
              </h3>
              
              <p className="text-lg text-lavender/80 mb-6 leading-relaxed">
                Tired of vending machines that break down, run out of stock, or serve the same tired snacks? It’s time for an upgrade. The CoolSmart AI Market is a next-generation smart cooler that redefines unattended retail—powered by computer vision and built for speed, security, and scale. This isn't just a cooler. It’s an intelligent, always-on, cashless solution that brings style, substance, best-in-class capacity, and serious convenience to your space. Its time to transform the way your team accesses food and beverages.
              </p>

              <div className="mb-8">
                <Link 
                  to="/contact"
                  className="inline-flex items-center bg-gradient-pastel text-navy px-6 py-3 rounded-full font-semibold hover:shadow-neon transition-all"
                >
                  Get My Smart Cooler
                </Link>
              </div>
            </div>

            {/* Smart Cooler Image */}
            <div className="fade-in mb-12">
              <div className="w-full max-w-4xl mx-auto">
                <img 
                  src="/CoolSmart_AI_Solo_Center_medium.webp" 
                  alt="CoolSmart AI Market - Next Generation Smart Cooler"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            <div className="fade-in">
              <h1 className="text-4xl font-bold mb-6">
                <span style={{ color: '#7DCEA0' }}>Smart</span><br />
                <span style={{ color: '#FF8E7F' }}>Coolers</span>
              </h1>
              
              <h2 className="text-xl font-bold mb-6" style={{ color: '#FFCDB2' }}>
                CoolSmart AI Market
              </h2>
              
              <h3 className="text-lg font-semibold mb-6 text-mint">
                Smarter Cooling. Smarter Vending.
              </h3>
            </div>

            {/* Smart Cooler Image - Below header on mobile */}
            <div className="fade-in mb-8">
              <div className="w-full">
                <img 
                  src="/CoolSmart_AI_Solo_Center_medium.webp" 
                  alt="CoolSmart AI Market - Next Generation Smart Cooler"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
            </div>

            <div className="fade-in">
              <p className="text-lg text-lavender/80 mb-6 leading-relaxed">
               Tired of vending machines that break down, run out of stock, or serve the same tired snacks? It’s time for an upgrade. The CoolSmart AI Market is a next-generation smart cooler that redefines unattended retail—powered by computer vision and built for speed, security, and scale. This isn't just a cooler. It’s an intelligent, always-on, cashless solution that brings style, substance, best-in-class capacity, and serious convenience to your space. Its time to transforming the way your team accesses food and beverages.
              </p>

              <div className="mb-8">
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center bg-gradient-pastel text-navy px-6 py-3 rounded-full font-semibold hover:shadow-neon transition-all w-full"
                >
                  Get My Smart Cooler
                </Link>
              </div>
            </div>
          </div>

          <div className="fade-in mb-8">
            <h3 className="text-2xl font-semibold mb-6 text-coral">Why Choose CoolSmart AI Market?</h3>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="p-3 bg-gradient-pastel rounded-lg mr-4 mt-1 flex-shrink-0 justify-center text-navy">
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
            <p className="text-Lavender/80 leading-relaxed mb-4">
              From busy workplaces to customer-facing spaces, the CoolSmart AI Market delivers a modern, secure, and self-service experience that makes traditional vending feel… outdated. Kick those old machines to the curb and upgrade to the future of vending with this drop-in-replacement.
            </p>
            <p className="text-Lavender/80 leading-relaxed">
              With Smart Market Retail, you get more than a cooler—you get a curated, connected, and cashless retail solution that fits your space and scales with your business.
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

export default SmartCoolersPage;