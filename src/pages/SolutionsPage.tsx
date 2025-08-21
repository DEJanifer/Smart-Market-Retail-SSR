import React, { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import RequestAssessment from '../components/RequestAssessment';
import FAQRotator from '../components/FAQRotator';
import ImageCarousel from '../components/ImageCarousel';
import { Coffee, Smartphone, Store, CheckCircle, Zap, Utensils, Building, TrendingUp, Settings, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const SolutionsPage: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

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

  const solutionsImages = [
    {
      src: '/Smart Store 700 05.1',
      alt: 'Smart Vending Machine in Office Environment',
      title: 'Modern Office Solutions',
      description: 'Sleek vending machines that enhance any professional workspace with style and functionality.'
    },
    {
      src: '/Smart Store 700 10.1',
      alt: 'Advanced Vending Technology',
      title: 'Cutting-Edge Technology',
      description: 'State-of-the-art machines featuring touchscreen interfaces and cashless payment systems.'
    },
    {
      src: '/Smart Store 700 15.1',
      alt: 'Smart Vending Solutions',
      title: 'Smart Solutions',
      description: 'Intelligent inventory management and real-time monitoring for optimal performance.'
    },
    {
      src: '/Smart Store 700 20.1',
      alt: 'Premium Vending Experience',
      title: 'Premium Experience',
      description: 'High-quality products and reliable service that exceeds customer expectations.'
    },
    {
      src: '/Smart Store 700 25.1',
      alt: 'Innovative Retail Technology',
      title: 'Innovation at Work',
      description: 'Revolutionary vending technology that transforms the way people access refreshments.'
    },
    {
      src: '/Smart Store 700 30.1',
      alt: 'Smart Store User Experience',
      title: 'Intuitive User Experience',
      description: 'User-friendly interfaces and seamless interactions that make purchasing effortless and enjoyable.'
    },
    {
      src: '/Smart Store 700 35.1',
      alt: 'Smart Store in Modern Environment',
      title: 'Seamless Integration',
      description: 'Smart stores that blend perfectly into any modern workspace or public area.'
    },
    {
      src: '/Small Micro Market 10.1',
      alt: 'Small Micro Market Solution',
      title: 'Compact Micro Market',
      description: 'Space-efficient micro market solution that maximizes product variety in minimal space.'
    },
    {
      src: '/Large Micro Market 15.1',
      alt: 'Large Micro Market Setup',
      title: 'Complete Micro Market Experience',
      description: 'Full-scale micro market with extensive product selection and modern self-checkout technology.'
    },
    {
      src: '/Smart Store 600 & Cafection Emblem',
      alt: 'Smart Store 600 with Coffee Solutions',
      title: 'Smart Store 600 Series',
      description: 'Compact smart store solution with integrated coffee options for complete beverage service.'
    },
    {
      src: '/Large Micro Market 05',
      alt: 'Large Micro Market Installation',
      title: 'Premium Micro Market',
      description: 'Comprehensive micro market setup featuring fresh food options and extensive product variety.'
    },
    {
      src: '/Medium Micro Market 05 2',
      alt: 'Medium Micro Market Configuration',
      title: 'Medium Micro Market Solutions',
      description: 'Perfect mid-size micro market solutions for growing businesses and medium-sized offices.'
    }
  ];

  const whyUnattendedRetail = [
    {
      icon: <Zap className="h-6 w-6 justify-center text-navy" />,
      title: 'Seamless, Self-Service Convenience',
      description: 'Say goodbye to long lines, limited options, and off-site runs. With contactless, Grab, Tap & Go kiosks, your team or guests can get what they need in seconds—any time of day.'
    },
    {
      icon: <Utensils className="h-6 w-6 justify-center text-navy" />,
      title: 'Fresh Food & Smart Selections',
      description: 'Our markets are stocked with a rotating variety of meals, snacks, beverages, and essentials—all curated to suit your location\'s tastes and needs. Healthy, indulgent, and everything in between.'
    },
    {
      icon: <Building className="h-6 w-6 justify-center text-navy" />,
      title: 'Designed for Your Space',
      description: 'From sleek hotel lobbies to busy warehouse breakrooms, our scalable layouts fit beautifully into any environment—bringing both function and style to unused square footage.'
    },
    {
      icon: <TrendingUp className="h-6 w-6 justify-center text-navy" />,
      title: 'Productivity & Morale Boost',
      description: 'When refreshments are just steps away, people stay onsite, energized, and focused. It\'s a win-win for efficiency and workplace satisfaction.'
    },
    {
      icon: <Settings className="h-6 w-6 justify-center text-navy" />,
      title: 'No Hassle, Fully Managed',
      description: 'We handle it all—installation, restocking, service, and monitoring. No staffing, no stocking, no stress.'
    },
    {
      icon: <DollarSign className="h-6 w-6 justify-center text-navy" />,
      title: 'Cost-Free Enhancement',
      description: 'Best of all, there\'s no cost to your business. We bring the tech, the products, and the support—you enjoy the benefits.'
    }
  ];

  const solutions = [
    {
      id: 'smart-stores',
      title: 'Smart Stores',
      icon: <Smartphone className="h-8 w-8 text-coral" />,
      description: 'The future of vending convenience is here. Smart Store Machines provide frictionless, intelligent, and stylish vending – always available, always impressive. We combine cutting-edge AI with sleek design to deliver an unmatched Unattended Retail solution.',
      image: '/Smart Store 700 05.1',
      link: '/solutions/smart-stores',
      benefits: [
        'Tap, Grab, & Go with our cashless vending machines supporting credit cards and mobile pay',
        'AI-driven remote inventory monitoring using real-time sales data and trends',
        'Fresh and tailored options beyond standard chips and sodas',
        'Smart support with automatic notifications for restocking',
        'Scalable and space-saving design for any environment'
      ]
    },
    {
      id: 'micro-markets',
      title: 'Micro Markets',
      icon: <Building className="h-8 w-8 text-coral" />,
      description: 'Discover the smartest breakroom upgrade. Our Micro Markets are a self-service store right inside your office - an open-concept Unattended Retail solution that gives employees access to fresh food, snacks, and even sundry items. Your always-available, on-site convenience shop.',
      image: '/Large Micro Market 15.2',
      link: '/solutions/micro-markets',
      benefits: [
        'Frictionless self-checkout with our modern credit card vending machine kiosks',
        'Fresh food options always, stocked with rotating seasonal selections',
        'Tailored product offerings based on team preferences',
        'Prompt and personalized support with real-time inventory monitoring',
        'Scalable and stylish design that grows with your needs'
      ]
    },
    {
      id: 'smart-coolers',
      title: 'Smart Coolers',
      icon: <Store className="h-8 w-8 text-coral" />,
      description: 'Meet the CoolSmart AI Market—a next-generation cooler solution that redefines unattended retail. This computer vision–powered, smart vending system is designed for speed, security, and scale, delivering intelligence and flexibility that modern businesses demand.',
      image: '/CoolSmart_AI_Solo_Center',
      link: '/solutions/smart-coolers',
      benefits: [
        'Our highest capacity single unit! More snacks, more food, less space.',
        'Cashless convenience with credit card readers, Apple Pay, and Google Pay',
        'Tailored product offerings based on host preferences',
        'Real-time remote monitoring for maximum uptime and stocked shelves',
        'NAMA Certified and Energy Star Rated for efficiency'
      ]
    },
    {
      id: 'smart-traditional-vending',
      title: 'Smart Traditional Vending',
      icon: <Coffee className="h-8 w-8 text-coral" />,
      description: 'The perfect balance of tradition and innovation. Our Smart Traditional Vending machines offer reliable service with modern enhancements that improve efficiency, expand payment options, and provide more snacks and beverages options than older models.',
      image: '/Merchant Combo Media 2',
      link: '/solutions/smart-vending',
      benefits: [
        'Accepts all payment types including cash, credit card vending, and mobile payment',
        'Remote inventory monitoring for real-time sales data and proactive restocking',
        'Energy-efficient operation with advanced cooling systems',
        'Custom product selection tailored to location demographics',
        'Modern but familiar and vending interaction'
      ]
    }
  ];

  const UnattendedRetailCard: React.FC<{
    item: typeof whyUnattendedRetail[0];
    index: number;
    isExpanded: boolean;
    onToggle: () => void;
    isMobile: boolean;
  }> = ({ item, isExpanded, onToggle, isMobile }) => {
    if (isMobile) {
      return (
        <div className="backdrop-blur-sm border border-mint/20 rounded-lg overflow-hidden">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-mint/5 transition-colors"
          >
            <div className="flex items-center">
              <div className="p-3 bg-gradient-pastel rounded-lg w-12 h-12 flex items-center justify-center mr-4 text-navy">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-mint">{item.title}</h3>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-coral flex-shrink-0" />
            ) : (
              <ChevronDown className="h-5 w-5 text-coral flex-shrink-0" />
            )}
          </button>

          {isExpanded && (
            <div className="border-t border-mint/20 p-4">
              <p className="text-peach/80 leading-relaxed">{item.description}</p>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="backdrop-blur-sm p-6 rounded-lg border border-mint/20 hover:border-mint/40 transition-all card-interactive">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-gradient-pastel rounded-lg mr-4">
            {item.icon}
          </div>
          <h3 className="text-lg font-semibold text-mint">{item.title}</h3>
        </div>
        <p className="text-peach/80 leading-relaxed">{item.description}</p>
      </div>
    );
  };

  return (
    <PageLayout
      title="Our Vending Solutions - Smart Stores, Micro Markets & Traditional Vending | Smart Market Retail"
      description="Discover Smart Market Retail's comprehensive vending solutions: Smart Stores with AI technology, Micro Markets for fresh food, and Smart Traditional Vending. Serving Carroll & Baltimore County MD with 24/7 unattended retail."
      keywords="smart vending solutions, smart stores, micro markets, traditional vending, AI vending machines, unattended retail, office vending, contactless payments, fresh food vending, Carroll County, Baltimore County"
    >
      <section className="py-16 md:py-24 relative overflow-hidden pt-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Desktop Card Container */}
          <div className="hidden md:block backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow mb-16">
            <div className="fade-in text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-mint">Our</span>{' '}
                <span className="text-coral">Solutions</span>
              </h1>
              <p className="text-lg text-lavender/80 max-w-4xl mx-auto mb-6">
                Today's workforce expects more than just a old vending machine—they want fresh, fast, and flexible access to food and drinks without leaving the building. That's where our Unattended Retail solutions shine. Discover our comprehensive range of modern vending solutions designed to meet your specific needs and exceed expectations. From cutting-edge innovation to smarter traditional reliability, we have the perfect solution for your space.
              </p>
            </div>
            
            {/* Image Carousel - Desktop Only */}
            <div className="fade-in">
              <div className="max-w-4xl mx-auto">
                <ImageCarousel
                  images={solutionsImages}
                  className="w-full"
                  autoplay={true}
                  effect="fade"
                  slidesPerView={1}
                  spaceBetween={0}
                  aspectRatio="aspect-video"
                />
              </div>
            </div>
          </div>

          {/* Mobile Layout - No Card */}
          <div className="md:hidden">
            <div className="fade-in text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-mint">Our</span>{' '}
                <span className="text-coral">Solutions</span>
              </h1>
              <p className="text-lg text-lavender/80 max-w-4xl mx-auto mb-6">
                Today's workforce expects more than just a old vending machine—they want fresh, fast, and flexible access to food and drinks without leaving the building. That's where our Unattended Retail solutions shine. Discover our comprehensive range of modern vending solutions designed to meet your specific needs and exceed expectations. From cutting-edge innovation to smarter traditional reliability, we have the perfect solution for your space.
              </p>
            </div>
          </div>

          {/* Image Carousel Section - Mobile Only */}
          <div className="md:hidden fade-in mb-20">
            <div className="max-w-4xl mx-auto">
              <ImageCarousel
                images={solutionsImages}
                className="w-full"
                autoplay={true}
                effect="fade"
                slidesPerView={1}
                spaceBetween={0}
                aspectRatio="aspect-video"
              />
            </div>
          </div>

          {/* Why Embrace Unattended Retail Section */}
          <section className="py-12 md:py-16 lg:py-24">
            {/* Desktop Card Container */}
            <div className="hidden md:block backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow mb-20">
              <div className="fade-in mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    <span className="text-mint">Why Embrace Unattended Retail</span>{' '}
                    <span className="text-coral">at Your Location?</span>
                  </h2>
                </div>

                {/* Desktop Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {whyUnattendedRetail.map((item, index) => (
                    <UnattendedRetailCard 
                      key={index}
                      item={item}
                      index={index}
                      isExpanded={false}
                      onToggle={() => {}}
                      isMobile={false}
                    />
                  ))}
                </div>

                <div className="text-center">
                  <Link 
                    to="/contact"
                    className="inline-flex items-center bg-gradient-pastel text-navy px-8 py-3 rounded-full font-semibold hover:shadow-neon transition-all"
                  >
                    Inquire Today
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Layout - No Card */}
            <div className="md:hidden">
              <div className="fade-in mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    <span className="text-mint">Why Embrace Unattended Retail</span>{' '}
                    <span className="text-coral">at Your Location?</span>
                  </h2>
                </div>

                {/* Mobile Collapsible List */}
                <div className="space-y-2 mb-12">
                  {whyUnattendedRetail.map((item, index) => (
                    <UnattendedRetailCard 
                      key={index}
                      item={item}
                      index={index}
                      isExpanded={expandedItem === index}
                      onToggle={() => toggleItem(index)}
                      isMobile={true}
                    />
                  ))}
                </div>

                <div className="text-center">
                  <Link 
                    to="/contact"
                    className="inline-flex items-center bg-gradient-pastel text-navy px-8 py-3 rounded-full font-semibold hover:shadow-neon transition-all"
                  >
                    Inquire Today
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <div className="space-y-16">
            {solutions.map((solution, index) => (
              <div key={solution.id} className="fade-in">
                {/* Desktop Layout */}
                <div className="hidden md:block backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow card-interactive">
                  <div className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-12 items-center`}>
                    <div className="md:w-1/2">
                      <div className="rounded-lg overflow-hidden">
                        <div className="aspect-[3/4] overflow-hidden">
                          <picture>
                            <source 
                              srcSet={`${solution.image}_small.webp 480w, ${solution.image}_medium.webp 800w, ${solution.image}_large.webp 1200w`}
                              sizes="(max-width: 640px) 480px, (max-width: 1024px) 800px, 600px"
                              type="image/webp"
                            />
                            <img 
                              src={`${solution.image}_large.webp`}
                              alt={solution.title}
                              className="w-full h-full object-contain"
                              fetchPriority="high"
                            />
                          </picture>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-1/2">
                      <div className="flex items-center mb-6">
                        {solution.icon}
                        <h2 className="text-3xl md:text-4xl font-bold ml-4">
                          <span className="text-mint">{solution.title}</span>
                        </h2>
                      </div>
                      
                      <p className="text-lg text-lavender/80 leading-relaxed mb-8">
                        {solution.description}
                      </p>
                      
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold text-coral mb-4">Key Benefits:</h3>
                        <div className="space-y-3">
                          {solution.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-coral mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-peach/80">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link 
                          to={solution.link}
                          className="inline-flex items-center bg-gradient-pastel text-navy px-6 py-3 rounded-full font-semibold hover:shadow-neon transition-all"
                        >
                          Learn More About {solution.title}
                        </Link>
                        <Link 
                          to="/contact"
                          className="inline-flex items-center border-2 border-mint text-mint px-6 py-3 rounded-full hover:bg-mint/10 transition-all"
                        >
                          Inquire Today
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-6 shadow-glow card-interactive">
                  <div className="flex items-center mb-6">
                    {solution.icon}
                    <h2 className="text-3xl font-bold ml-4">
                      <span className="text-mint">{solution.title}</span>
                    </h2>
                  </div>

                  <div className="rounded-lg overflow-hidden mb-6">
                    <div className="aspect-[3/4] overflow-hidden">
                      <picture>
                        <source 
                          srcSet={`${solution.image}_small.webp 480w, ${solution.image}_medium.webp 800w, ${solution.image}_large.webp 1200w`}
                          sizes="(max-width: 640px) 480px, (max-width: 1024px) 800px, 100vw"
                          type="image/webp"
                        />
                        <img 
                          src={`${solution.image}_large.webp`}
                          alt={solution.title}
                          className="w-full h-full object-contain"
                          fetchPriority="high"
                        />
                      </picture>
                    </div>
                  </div>
                  
                  <p className="text-lg text-lavender/80 leading-relaxed mb-8">
                    {solution.description}
                  </p>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-coral mb-4">Key Benefits:</h3>
                    <div className="space-y-3">
                      {solution.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-coral mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-peach/80">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <Link 
                      to={solution.link}
                      className="inline-flex items-center justify-center bg-gradient-pastel text-navy px-6 py-3 rounded-full font-semibold hover:shadow-neon transition-all"
                    >
                      Learn More About {solution.title}
                    </Link>
                    <Link 
                      to="/contact"
                      className="inline-flex items-center justify-center border-2 border-mint text-mint px-6 py-3 rounded-full hover:bg-mint/10 transition-all"
                    >
                      Inquire Today
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="fade-in">
        <FAQRotator />
      </div>
      
      <div className="fade-in">
        <RequestAssessment />
      </div>
    </PageLayout>
  );
};

export default SolutionsPage;