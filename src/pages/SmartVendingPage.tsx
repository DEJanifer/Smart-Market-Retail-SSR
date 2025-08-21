import React, { useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import RequestAssessment from '../components/RequestAssessment';
import ImageCarousel from '../components/ImageCarousel';
import { Target, Award, Eye, DollarSign, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const SmartVendingPage: React.FC = () => {
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
      icon: <DollarSign className="h-6 w-6 justify-center text-navy" />,
      title: 'Flexible Payment Options',
      description: 'From mobile wallets and credit cards to cash and coins, our credit card vending machines make transactions simple and accessible for everyone.'
    },
    {
      icon: <Target className="h-6 w-6 justify-center text-navy" />,
      title: 'Location-Specific Product Mix',
      description: 'We handpick snack and drink selections based on your audience—whether that means healthy, indulgent, hydrating, or high-energy options. You choose, we deliver.'
    },
    {
      icon: <Eye className="h-6 w-6 justify-center text-navy" />,
      title: 'Real-Time Monitoring',
      description: 'No more empty slots or expired products. Each unit stays connected via cellular data, giving us live updates on inventory and real-time sales data—so your machine stays stocked and ready.'
    },
    {
      icon: <Cpu className="h-6 w-6 justify-center text-navy" />,
      title: 'Fast, Automated Support',
      description: 'Our system flags issues as they happen, allowing us to refill, repair, or restock swiftly—often before anyone reports a problem.'
    },
    {
      icon: <Award className="h-6 w-6 justify-center text-navy" />,
      title: 'Classic Vending, Modern Touch',
      description: 'Keep the ease of traditional vending with the benefits of today\'s technology—smarter, faster, and more reliable than ever.'
    }
  ];

  const traditionalVendingImages = [
    {
      src: '/BevMax Media 2',
      alt: 'BevMax Traditional Vending Machine',
      title: 'BevMax Beverage Solutions',
      description: 'High-capacity beverage vending with modern payment options and smart connectivity for optimal performance.'
    },
    {
      src: '/Merchant Ambient MEDIA2',
      alt: 'Merchant Ambient Vending Machine',
      title: 'Merchant Ambient Snack Solutions',
      description: 'Reliable snack vending with enhanced features, customizable product selection, and real-time monitoring.'
    },
    {
      src: '/Merchant Combo Media 2',
      alt: 'Merchant Combo Vending Machine',
      title: 'Merchant Combo Solutions',
      description: 'Complete snack and beverage combo machines offering maximum variety and convenience in one unit.'
    }
  ];

  return (
    <PageLayout
      title="Smart Traditional Vending - Enhanced Vending Machines | Smart Market Retail"
      description="Upgrade to Smart Market Retail's Smart Traditional Vending machines. Enhanced reliability with modern payment options, remote monitoring, and customizable product selection for Carroll & Baltimore County MD locations."
      keywords="smart traditional vending, enhanced vending machines, reliable vending, modern vending technology, cashless vending, remote monitoring vending, traditional vending upgrade"
    >
        <div className="container mx-auto px-4 md:px-6 bg-transparent pt-20">
          {/* Desktop Layout */}
          <div className="hidden lg:flex gap-12">
            {/* Left Column - Content */}
            <div className="lg:w-2/3">
              <div className="fade-in mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-mint">Smart</span><br />
                  <span className="text-coral">Traditional Vending</span>
                </h1>
              </div>
              
              <div className="fade-in mb-12">
                <p className="text-xl md:text-2xl font-bold mb-6" style={{ color: '#FFCDB2' }}>
                  The Perfect Balance of Reliability and Innovation
                </p>
                <p className="text-lg text-lavender/80 mb-6 leading-relaxed">
                 Looking to elevate your high-traffic space with a smart but familiar vending experience? Our Smart Traditional Vending Machines combine the timeless reliability of classic vending with modern technology to give your visitors exactly what they want—quickly, easily, and conveniently.
                </p>

                <div className="mb-8">
                  <Link 
                    to="/contact"
                    className="inline-flex items-center bg-gradient-pastel text-navy px-6 py-3 rounded-full font-semibold hover:shadow-neon transition-all"
                  >
                    Upgrade My Vending
                  </Link>
                </div>
              </div>

              <div className="fade-in mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-coral mb-6">Why Choose a Smart Traditional Vending Machine?</h2>
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="p-3 bg-gradient-pastel rounded-lg mr-4 mt-1 flex-shrink-0">
                    {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-mint mb-2">{feature.title}</h3>
                        <p className="text-peach/80">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="fade-in border-t border-mint/20 pt-8">
                <h2 className="text-2xl font-bold text-mint mb-4">Smart Way To Vend</h2>
                <p className="text-lg text-lavender/80 leading-relaxed mb-4">
                  Upgrade your space with a sleek, high-capacity vending solution that combines classic convenience with modern technology. With flexible payment options, curated product selections, and real-time remote monitoring, our Smart Traditional Vending Machines deliver reliable refreshment—anytime, anywhere.
                </p>
                <p className="text-lg text-lavender/80 leading-relaxed font-medium">
                  Let Smart Market Retail bring you a smarter, faster, and more satisfying vending experience your team and guests will value every day.
                </p>
              </div>
            </div>

            {/* Right Column - Image Carousel */}
            <div className="lg:w-1/3">
              <div className="fade-in sticky top-24">
                <ImageCarousel
                  images={traditionalVendingImages}
                  className="h-full"
                  autoplay={true}
                  effect="slide"
                  slidesPerView={1}
                  spaceBetween={30}
                  imageFit="cover"
                  aspectRatio="aspect-[2/4]"
                />
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            <div className="fade-in mb-8">
              <h1 className="text-4xl font-bold mb-4">
                <span className="text-mint">Smart</span><br />
                <span className="text-coral">Traditional Vending</span>
              </h1>
            </div>
            
            <div className="fade-in mb-6">
              <p className="text-xl font-bold mb-6" style={{ color: '#FFCDB2' }}>
                The Perfect Balance of Reliability and Innovation
              </p>
            </div>

            {/* Image Carousel - Below header on mobile */}
            <div className="fade-in mb-8">
              <ImageCarousel
                images={traditionalVendingImages}
                className="w-full"
                autoplay={true}
                effect="slide"
                slidesPerView={1}
                spaceBetween={30}
                imageFit="cover"
                aspectRatio="aspect-[2/3]"
              />
            </div>
            
            <div className="fade-in mb-12">
              <p className="text-lg text-lavender/80 mb-6 leading-relaxed">
               Looking to elevate your high-traffic space with a smart but familiar vending experience? Our Smart Traditional Vending Machines combine the timeless reliability of classic vending with modern technology to give your visitors exactly what they want—quickly, easily, and conveniently.
              </p>

              <div className="mb-8">
                <Link 
                  to="/contact"
                  className="inline-flex items-center justify-center bg-gradient-pastel text-navy px-6 py-3 rounded-full font-semibold hover:shadow-neon transition-all w-full"
                >
                  Upgrade My Vending
                </Link>
              </div>
            </div>

            <div className="fade-in mb-12">
              <h2 className="text-2xl font-bold text-coral mb-6">Why Choose a Smart Traditional Vending Machine?</h2>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-3 bg-gradient-pastel rounded-lg mr-4 mt-1 flex-shrink-0">
                    {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-mint mb-2">{feature.title}</h3>
                      <p className="text-peach/80">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade-in border-t border-mint/20 pt-8">
              <h2 className="text-2xl font-bold text-mint mb-4">A Smarter Way To Vend</h2>
              <p className="text-lg text-peach/90 leading-relaxed mb-4">
                Upgrade your space with a sleek, high-capacity vending solution that combines classic convenience with modern technology. With flexible payment options, curated product selections, and real-time remote monitoring, our Smart Traditional Vending Machines deliver reliable refreshment—anytime, anywhere.
              </p>
              <p className="text-lg text-peach/90 leading-relaxed font-medium">
                Let Smart Market Retail bring you a smarter, faster, and more satisfying vending experience your team and guests will value every day.
              </p>
            </div>
          </div>
        </div>

      <div className="fade-in">
        <RequestAssessment />
      </div>
    </PageLayout>
  );
};

export default SmartVendingPage;