import React, { useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import RequestAssessment from '../components/RequestAssessment';
import ImageCarousel from '../components/ImageCarousel';
import { Utensils, Award, Eye, CreditCard, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const MicroMarketsPage: React.FC = () => {
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

  const keyBenefits = [
    {
      icon: <CreditCard className="h-6 w-6 justify-center text-navy" />,
      title: 'Grab, Tap, & Go',
      description: 'Skip the lines and interruptions—our self-checkout kiosks make purchasing quick and effortless with contactless payment options built for speed and convenience.'
    },
    {
      icon: <Utensils className="h-6 w-6 justify-center text-navy" />,
      title: 'Fresh Selections',
      description: 'Stocked with rotating meals, snacks, and beverages, your micro market delivers fresh, satisfying choices that keep your team fueled and focused.'
    },
    {
      icon: <Award className="h-6 w-6 justify-center text-navy" />,
      title: 'Customized for Your Team',
      description: 'We curate your product mix using real purchase data—offering everything from healthy staples to comfort snacks that reflect your team\'s preferences.'
    },
    {
      icon: <Eye className="h-6 w-6 justify-center text-navy" />,
      title: 'Proactive Service & Restocking',
      description: 'With remote monitoring technology and responsive support, we handle inventory replenishment and machine maintenance—keeping your market full, functional, and worry-free.'
    },
    {
      icon: <TrendingUp className="h-6 w-6 justify-center text-navy" />,
      title: 'Scalable & Stylish',
      description: 'Whether you have 50 employees or 500, our modular layouts complement any breakroom or lounge and scale easily as your team grows—bringing style and utility to every square foot.'
    }
  ];

  const microMarketImages = [
    {
      src: '/Large Micro Market 05',
      alt: 'Large Micro Market Setup',
      title: 'Complete Micro Market Solution',
      description: 'Full-scale micro market with refrigerated beverages, snacks, and self-checkout kiosk for larger office environments.'
    },
    {
      src: '/Large Micro Market 10.1',
      alt: 'Micro Market Product Display',
      title: 'Extensive Product Selection',
      description: 'Wide variety of fresh foods, snacks, and beverages organized in an open-concept retail environment.'
    },
    {
      src: '/Large Micro Market 15.1',
      alt: 'Modern Micro Market Design',
      title: 'Sleek Modern Design',
      description: 'Contemporary micro market layout featuring organized product displays and integrated coffee station.'
    },
    {
      src: '/Medium Micro Market 15.1',
      alt: 'Medium Micro Market Setup',
      title: 'Medium Micro Market Solutions',
      description: 'Perfect mid-size micro market solutions for growing businesses and medium-sized offices.'
    },
    {
      src: '/Medium Micro Market 05 2',
      alt: 'Medium Micro Market Layout',
      title: 'Efficient Medium Layout',
      description: 'Optimized medium micro market design that maximizes product variety while fitting comfortably in mid-sized spaces.'
    },
    {
      src: '/Small Micro Market 06.1',
      alt: 'Compact Micro Market',
      title: 'Compact Micro Market',
      description: 'Space-efficient micro market solution that maximizes product variety in minimal space.'
    },
    {
      src: '/Starter Go Micro',
      alt: 'Starter Micro Market',
      title: 'Starter Micro Market',
      description: 'Entry-level micro market perfect for smaller offices while maintaining full product variety and functionality.'
    }
  ];

  return (
    <PageLayout
      title="Micro Markets - Self-Service Convenience Stores | Smart Market Retail"
      description="Transform your breakroom with Smart Market Retail's Micro Markets. Open-concept self-service stores with fresh food, snacks, beverages, and contactless checkout. Serving Carroll & Baltimore County MD with 24/7 convenience."
      keywords="micro markets, self-service stores, breakroom upgrade, fresh food vending, open concept retail, self-checkout kiosks, office convenience store, unattended retail markets"
    >
      <section className="py-16 md:py-24 relative overflow-hidden pt-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Desktop Layout */}
          <div className="hidden md:block">
            <div className="fade-in mb-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-mint">Micro</span><br />
                <span className="text-coral">Markets</span>
              </h1>
            </div>

            <div className="fade-in">
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-peach">
                Go Micro & Go Plus100
              </h2>
              
              <h3 className="text-xl md:text-xl font-bold mb-6 text-mint">
                Discover the Smartest Breakroom Upgrade
              </h3>
              
              <p className="text-lg text-lavender/80 leading-relaxed mb-6">
                Imagine replacing your old vending machines with a stylish, self-service store, right inside your office. 
                That's exactly what a Micro Market is—a modern, open-concept Unattended Retail solution that gives your employees 
                access to a wide selection of fresh food, snacks, and beverages 24/7. Think of it as your always available, 
                on-site convenience shop.
              </p>

              <div className="mb-8">
                <Link 
                  to="/contact"
                  className="inline-flex items-center bg-gradient-pastel text-navy px-6 py-3 rounded-full font-semibold hover:shadow-neon transition-all"
                >
                  Design My Micro Market
                </Link>
              </div>
            </div>

            {/* Image Carousel */}
            <div className="fade-in mb-12">
              <ImageCarousel
                images={microMarketImages}
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
            <div className="fade-in mb-4">
              <h1 className="text-4xl font-bold mb-4">
                <span className="text-mint">Micro</span><br />
                <span className="text-coral">Markets</span>
              </h1>
            </div>

            <div className="fade-in mb-6">
              <h2 className="text-xl md:text-xl font-bold mb-6 text-peach">
                Go Micro & Go Plus100
              </h2>
              
              <h3 className="text-lg md:text-lg font-bold mb-6 text-mint">
                Discover the Smartest Breakroom Upgrade
              </h3>
            </div>

            {/* Image Carousel - Below header on mobile */}
            <div className="fade-in mb-8">
              <ImageCarousel
                images={microMarketImages}
                className="w-full"
                autoplay={true}
                effect="fade"
                slidesPerView={1}
                spaceBetween={0}
              />
            </div>

            <div className="fade-in">
              <p className="text-lg text-lavender/80 leading-relaxed mb-6">
                Imagine replacing your old vending machines with a stylish, self-service store, right inside your office. 
                That's exactly what a Micro Market is—a modern, open-concept Unattended Retail solution that gives your employees 
                access to a wide selection of fresh food, snacks, and beverages 24/7. Think of it as your always available, 
                on-site convenience shop.
              </p>

              <div className="mb-8">
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center bg-gradient-pastel text-navy px-6 py-3 rounded-full font-semibold hover:shadow-neon transition-all w-full"
                >
                  Design My Micro Market
                </Link>
              </div>
            </div>
          </div>

          <div className="fade-in mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-coral mb-6">Why Choose a Micro Market?</h2>
            <div className="space-y-6">
              {keyBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="p-3 bg-gradient-pastel rounded-lg mr-4 mt-1 flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-mint mb-2">{benefit.title}</h3>
                    <p className="text-peach/80">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-in border-t border-mint/20 pt-8">
            <h2 className="text-2xl font-bold text-mint mb-4">A Smarter Way to Vend</h2>
            <p className="text-Lavender/80 leading-relaxed mb-4">
              Smart Market Retail combines fresh food, sleek design, and intelligent automation to create a Micro Market experience your team will love. It's more than just convenience—it's a modern amenity that fuels productivity, boosts morale, and enhances your workplace environment at zero cost to you. 
            </p>
            <p className="text-Lavender/80 leading-relaxed">
              Let us design a smart, seamless, and fully tailored Micro Market that fits your team's needs and your space perfectly.
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

export default MicroMarketsPage;