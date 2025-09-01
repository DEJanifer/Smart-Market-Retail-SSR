import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import ImageCarousel from '../components/ImageCarousel';
import FAQRotator from '../components/FAQRotator';
import { Users, Target, Award, Heart, Zap, Shield, Smartphone, Eye, CreditCard, Building, DollarSign, Palette, ShoppingBag, BarChart3, UserX, Cpu, ArrowRight, ChevronDown, ChevronUp, Search, Settings, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFadeInObserver } from '../hooks/useFadeInObserver';

const AboutPage: React.FC = () => {
  useFadeInObserver();
  
  const [expandedValue, setExpandedValue] = useState<number | null>(null);
  const [expandedOffering, setExpandedOffering] = useState<number | null>(null);
  const [expandedProcess, setExpandedProcess] = useState<number | null>(null);

  const toggleValue = (index: number) => {
    setExpandedValue(expandedValue === index ? null : index);
  };

  const toggleOffering = (index: number) => {
    setExpandedOffering(expandedOffering === index ? null : index);
  };

  const toggleProcess = (index: number) => {
    setExpandedProcess(expandedProcess === index ? null : index);
  };

  const aboutImages = [
    {
      src: '/Smart Store 700 05.1',
      alt: 'Smart Vending Machine in a Carroll County office environment',
      title: 'Modern Office Solutions',
      description: 'Sleek vending machines that enhance any professional workspace with style and functionality.'
    },
    {
      src: '/Smart Store 700 10.1',
      alt: 'Advanced vending technology with cashless payments available in Maryland',
      title: 'Cutting-Edge Technology',
      description: 'State-of-the-art machines featuring touchscreen interfaces and cashless payment systems.'
    },
    {
      src: '/Smart Store 700 15.1',
      alt: 'Intelligent vending solutions with remote inventory monitoring',
      title: 'Smart Solutions',
      description: 'Intelligent inventory management and real-time monitoring for optimal performance.'
    },
    {
      src: '/Large Micro Market 05',
      alt: 'A modern Micro Market solution for businesses in Westminster, MD',
      title: 'Micro Market Innovation',
      description: 'Open-concept retail solutions offering fresh food and beverages 24/7.'
    },
    {
      src: '/Smart Store 700 30.1',
      alt: 'User-friendly smart store experience with touchless vending solutions',
      title: 'Intuitive User Experience',
      description: 'User-friendly interfaces and seamless interactions that make purchasing effortless.'
    },
    {
      src: '/Medium Micro Market 05 2',
      alt: 'A medium-sized micro market setup for employee breakroom services',
      title: 'Medium Micro Market Solutions',
      description: 'Perfect mid-size micro market solutions for growing businesses and medium-sized offices.'
    },
    {
      src: '/Starter Go Micro',
      alt: 'A starter micro market from a full-service vending company',
      title: 'Starter Micro Market',
      description: 'Entry-level micro market perfect for smaller spaces and growing businesses.'
    },
    {
      src: '/Small Micro Market 06.1',
      alt: 'A compact micro market for office pantry solutions in Maryland',
      title: 'Compact Micro Market',
      description: 'Space-efficient micro market solution that maximizes product variety in minimal space.'
    },
    {
      src: '/Smart Store 600 05.1',
      alt: 'Smart Store 600 Series',
      title: 'Smart Store 600 Series',
      description: 'Compact smart store solution perfect for smaller locations while maintaining full functionality.'
    }
  ];

  const values = [
    {
      icon: <Zap size={24} className="justify-center text-navy" />,
      title: 'Convenience First',
      description: 'We prioritize speed, ease, and availability for today\'s on-the-go customers.'
    },
    {
      icon: <Target size={24} className="justify-center text-navy" />,
      title: 'Innovation-Driven',
      description: 'We leverage smart technology and automation to stay ahead of retail trends.'
    },
    {
      icon: <Users size={24} className="justify-center text-navy" />,
      title: 'Customer-Centric Service',
      description: 'We tailor our offerings to each location\'s unique needs and users.'
    },
    {
      icon: <Shield size={24} className="justify-center text-navy" />,
      title: 'Integrity & Transparency',
      description: 'We believe in clear communication and dependable service.'
    },
    {
      icon: <Award size={24} className="justify-center text-navy" />,
      title: 'Efficiency & Sustainability',
      description: 'We reduce waste, cut costs, and optimize space and operations.'
    },
    {
      icon: <Heart size={24} className="justify-center text-navy" />,
      title: 'Always Evolving',
      description: 'We continuously learn, adapt, and improve to serve our clients better.'
    }
  ];

  const processSteps = [
    {
      icon: <Search size={24} />,
      title: 'Discovery & Assessment',
      description: 'We start by understanding your unique space, foot traffic patterns, and employee preferences. Through comprehensive site evaluation and stakeholder conversations, we identify the perfect solution that aligns with your goals and budget.'
    },
    {
      icon: <Palette size={24} />,
      title: 'Custom Design & Curation',
      description: 'Our team designs a tailored solution that seamlessly integrates with your environment. We curate product selections based on your audience preferences and create a layout that maximizes convenience while enhancing your space\'s aesthetic.'
    },
    {
      icon: <Settings size={24} />,
      title: 'Seamless Installation',
      description: 'We handle everything from delivery to setup with minimal disruption to your operations. Our certified technicians ensure proper installation, conduct thorough testing, and provide comprehensive training for your team.'
    },
    {
      icon: <Handshake size={24} />,
      title: 'Ongoing Partnership & Optimization',
      description: 'Your success is our success. We provide continuous monitoring, regular restocking, maintenance, and performance analytics. We\'re always available to adjust product mix, expand services, or optimize based on usage patterns.'
    }
  ];

  const offerings = [
    {
      icon: <Smartphone size={24} className="justify-center text-navy" />,
      title: 'AI-Powered Convenience',
      description: 'Smart, self-service retail solutions designed for speed, ease, and 24/7 access.'
    },
    {
      icon: <Eye size={24} className="justify-center text-navy" />,
      title: 'Real-Time Inventory Monitoring',
      description: 'We track stock remotely to ensure shelves stay full and service stays seamless.'
    },
    {
      icon: <CreditCard size={24} className="justify-center text-navy" />,
      title: 'Contactless Payments',
      description: 'Support for cards, mobile wallets, and campus credentials for frictionless checkout.'
    },
    {
      icon: <Building size={24} className="justify-center text-navy" />,
      title: 'Tailored to Your Space',
      description: 'Custom-configured setups for offices, schools, hospitals, residential buildings, and more.'
    },
    {
      icon: <DollarSign size={24} className="justify-center text-navy" />,
      title: 'Zero Cost to You',
      description: 'Installation, stocking, and service come at no expense to the host location.'
    },
    {
      icon: <Palette size={24} className="justify-center text-navy" />,
      title: 'Smart Design Meets Function',
      description: 'Sleek, user-first machines that elevate your space and serve your audience.'
    },
    {
      icon: <ShoppingBag size={24} className="justify-center text-navy" />,
      title: 'Curated Product Selection',
      description: 'Snacks, beverages, and essentials chosen to match your patrons\' preferences.'
    },
    {
      icon: <BarChart3 size={24} className="justify-center text-navy" />,
      title: 'Scalable & Flexible',
      description: 'Our solutions grow with you and adapt to your traffic, needs, and layout.'
    },
    {
      icon: <UserX size={24} className="justify-center text-navy" />,
      title: 'No Staffing Needed',
      description: 'Fully autonomous systems that eliminate the need for manual labor or supervision.'
    },
    {
      icon: <Cpu size={24} className="justify-center text-navy" />,
      title: 'Future-Proof Retail',
      description: 'Stay ahead of consumer expectations with cutting-edge, unattended retail technology.'
    }
  ];

  const ValueCard: React.FC<{
    value: typeof values[0];
    index: number;
    isExpanded: boolean;
    onToggle: () => void;
    isMobile: boolean;
  }> = ({ value, isExpanded, onToggle, isMobile }) => {
    if (isMobile) {
      return (
        <div className="backdrop-blur-sm border border-mint/20 rounded-lg overflow-hidden">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-mint/5 transition-colors"
          >
            <div className="flex items-center">
              <div className="p-3 bg-gradient-pastel rounded-lg w-12 h-12 flex items-center justify-center mr-4 text-navy">
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold text-mint">{value.title}</h3>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-coral flex-shrink-0" />
            ) : (
              <ChevronDown className="h-5 w-5 text-coral flex-shrink-0" />
            )}
          </button>

          {isExpanded && (
            <div className="border-t border-mint/20 p-4">
              <p className="text-peach/80 leading-relaxed">{value.description}</p>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="backdrop-blur-sm p-6 rounded-lg border border-mint/20 hover:border-mint/40 transition-all">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-gradient-pastel rounded-lg mr-4">
            {value.icon}
          </div>
          <h3 className="text-xl font-semibold text-mint">{value.title}</h3>
        </div>
        <p className="text-peach/80 leading-relaxed">{value.description}</p>
      </div>
    );
  };

  const OfferingCard: React.FC<{
    offering: typeof offerings[0];
    index: number;
    isExpanded: boolean;
    onToggle: () => void;
    isMobile: boolean;
  }> = ({ offering, isExpanded, onToggle, isMobile }) => {
    if (isMobile) {
      return (
        <div className="backdrop-blur-sm border border-mint/20 rounded-lg overflow-hidden">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-mint/5 transition-colors"
          >
            <div className="flex items-center">
              <div className="p-3 bg-gradient-pastel rounded-lg w-12 h-12 flex items-center justify-center mr-4 text-navy">
                {offering.icon}
              </div>
              <h3 className="text-lg font-semibold text-mint">{offering.title}</h3>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-coral flex-shrink-0" />
            ) : (
              <ChevronDown className="h-5 w-5 text-coral flex-shrink-0" />
            )}
          </button>

          {isExpanded && (
            <div className="border-t border-mint/20 p-4">
              <p className="text-peach/80 leading-relaxed">{offering.description}</p>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="backdrop-blur-sm p-6 rounded-lg border border-mint/20 hover:border-mint/40 transition-all text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-pastel rounded-lg">
            {offering.icon}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-mint mb-3">{offering.title}</h3>
        <p className="text-peach/80 text-sm leading-relaxed">{offering.description}</p>
      </div>
    );
  };

  return (
    <PageLayout
      title="About Smart Market Retail - Modern Unattended Retail Solutions | Carroll & Baltimore County MD"
      description="Learn about Smart Market Retail's mission to revolutionize vending with innovative Smart Stores and Micro Markets. Serving Carroll & Baltimore County Maryland with cutting-edge unattended retail technology and exceptional service."
      keywords="about smart market retail, unattended retail company, vending company Maryland, smart vending technology, micro market solutions, Carroll County vending, Baltimore County vending, modern vending services"
    >
      {/* Hero Section */}
      <section id="hero" className="py-16 md:py-24 relative overflow-hidden pt-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Desktop Card Container */}
          <div className="hidden md:block backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
            <div className="fade-in text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-mint">About SMART MARKET </span>{' '}
                <span className="text-coral">RETAIL</span>
              </h1>
              <p className="text-xl text-peach font-semibold mb-4">
                Unattended Retail Solutions for Today's Busy Consumers
              </p>
              <p className="text-lg text-lavender/80 max-w-4xl mx-auto leading-relaxed">
                We're revolutionizing the unattended retail industry with innovative Smart Stores and Micro Markets that deliver exceptional convenience, reliability, and user experience. Our mission is to transform everyday spaces into modern, efficient retail environments.
              </p>
            </div>

            <div className="fade-in mb-12">
              <ImageCarousel
                images={aboutImages}
                className="max-w-5xl mx-auto"
                autoplay={true}
                effect="slide"
                slidesPerView={1}
                spaceBetween={30}
              />
            </div>

            <div className="fade-in text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 bg-gradient-pastel text-navy px-8 py-3 rounded-full font-semibold hover:shadow-neon transition-all group"
                >
                  Inquire Today <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
                <Link 
                  to="/solutions" 
                  className="inline-flex items-center gap-2 border-2 border-mint text-mint px-8 py-3 rounded-full hover:bg-mint/10 transition-all"
                >
                  Explore Solutions
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Layout - No Card */}
          <div className="md:hidden">
            <div className="fade-in text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-mint">About SMART MARKET </span>{' '}
                <span className="text-coral">RETAIL</span>
              </h1>
              <p className="text-xl text-peach font-semibold mb-4">
                Unattended Retail Solutions for Today's Busy Consumers
              </p>
              <p className="text-lg text-lavender/80 max-w-4xl mx-auto leading-relaxed">
                We're revolutionizing the unattended retail industry with innovative Smart Stores and Micro Markets that deliver exceptional convenience, reliability, and user experience. Our mission is to transform everyday spaces into modern, efficient retail environments.
              </p>
            </div>

            <div className="fade-in mb-12">
              <ImageCarousel
                images={aboutImages}
                className="max-w-5xl mx-auto"
                autoplay={true}
                effect="slide"
                slidesPerView={1}
                spaceBetween={30}
              />
            </div>

            <div className="fade-in text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 bg-gradient-pastel text-navy px-8 py-3 rounded-full font-semibold hover:shadow-neon transition-all group"
                >
                  Inquire Today <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
                <Link 
                  to="/solutions" 
                  className="inline-flex items-center gap-2 border-2 border-mint text-mint px-8 py-3 rounded-full hover:bg-mint/10 transition-all"
                >
                  Explore Solutions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="who-we-are" className="py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Desktop Card Container */}
          <div className="hidden md:block backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
            <div className="fade-in max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                <span className="text-mint">Who We</span> <span className="text-coral">Are</span>
              </h2>
              <div className="space-y-8 text-lg text-lavender/80 leading-relaxed">
                <div>
                  <h3 className="text-2xl font-bold text-mint mb-4">More Than a Room—<span className="text-coral">It's Your Company's Heartbeat</span></h3>
                  <p>
                    We believe a breakroom is the most underestimated room in any business. It's where your company culture comes to life, where first impressions are made on new hires, and where your team recharges to do their best work. For too long, this vital space has been neglected—an afterthought serviced by outdated technology and unreliable vendors. We saw the frustration, the lost productivity, and the missed opportunity.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-mint mb-4">The Modern Solution <span className="text-coral">To An Outdated Problem</span></h3>
                  <p>
                    That's why we founded Smart Market Retail. We are here to transform your breakroom from a hidden liability into your greatest asset. We replace frustrating, old vending machines and uninspired snack closets with state-of-the-art <strong>Micro Markets</strong>, <strong>AI-powered Smart Vending</strong>, <strong>Smart Stores</strong>, and premium <strong>Office Coffee Service</strong>. We provide comprehensive breakroom solutions that turn underutilized spaces into vibrant hubs of convenience and connection.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-mint mb-4">Your Local Partner in <span className="text-coral">Carroll & Baltimore County</span></h3>
                  <p>
                    As a local, owner-operated business led by me, Devin, and based right here in Westminster, MD, our name and reputation are on every installation. Unlike faceless national corporations, we are your neighbors, serving businesses and properties from Eldersburg to Manchester and throughout Carroll County. We act as your strategic partner, using data and direct feedback to curate a selection of products that your employees and customers will actually love.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-mint mb-4">Our No-Cost <span className="text-coral">Promise to You</span></h3>
                  <p>
                    Here's what truly makes our partnership different: We believe a world-class amenity shouldn't be a line-item expense. For our qualifying partners, we provide the equipment, the cutting-edge technology, the professional installation, and the regular stocking and service at absolutely no cost to your business. Our success is tied directly to providing an amenity your people are excited to use.
                  </p>
                </div>
                
                <p>
                  If you're ready to stop dealing with complaints and start providing an amenity that attracts talent, boosts satisfaction, and strengthens your company culture, then we're ready to help. Let's build a better breakroom, together.
                </p>
                
                <p>
                  <a href="https://members.carrollcountychamber.org/memberdirectory/Details/smart-market-retail-4244419" target="_blank" rel="noopener noreferrer" className="text-mint hover:text-coral transition-colors mt-6 font-semibold">
                    We Are Proud Members of the Carroll County Chamber of Commerce 
                  </a>
                </p>
              </div>
              
              {/* Google Maps iframe */}
              <div className="fade-in mt-8 flex justify-center">
                <div className="w-full max-w-4xl">
                  <iframe 
                    title="Smart Market Retail Service Area Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d325916.9427159213!2d-77.03641594999999!3d39.534632499999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a660e10fa47b17f%3A0xf85df10180a8ac38!2sSmart%20Market%20Retail!5e1!3m2!1sen!2sus!4v1756737844913!5m2!1sen!2sus"
                    width="100%" 
                    height="450" 
                    style={{border:0}} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg shadow-glow"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout - No Card */}
          <div className="md:hidden">
            <div className="fade-in max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                  <span className="text-mint">Who We</span> <span className="text-coral">Are</span>
                </h2>
                <div className="space-y-8 text-lg text-lavender/80 leading-relaxed">
                  <div>
                  <h3 className="text-2xl font-bold text-mint mb-4">More Than a Room—
                    <br /><span className="text-coral">It's Your Company's Heartbeat</span></h3>
                  <p>
                    We believe a breakroom is the most underestimated room in any business. It's where your company culture comes to life, where first impressions are made on new hires, and where your team recharges to do their best work. For too long, this vital space has been neglected—an afterthought serviced by outdated technology and unreliable vendors. We saw the frustration, the lost productivity, and the missed opportunity.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-mint mb-4">The Modern Solution 
                    <br /><span className="text-coral">To An Outdated Problem</span></h3>
                  <p>
                    That's why we founded Smart Market Retail. We are here to transform your breakroom from a hidden liability into your greatest asset. We replace frustrating, old vending machines and uninspired snack closets with state-of-the-art <strong>Micro Markets</strong>, <strong>AI-powered Smart Vending</strong>, <strong>Smart Stores</strong>, and premium <strong>Office Coffee Service</strong>. We provide comprehensive breakroom solutions that turn underutilized spaces into vibrant hubs of convenience and connection.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-mint mb-4">Your Local Partner
                    <br /><span className="text-coral">In Carroll & Baltimore County</span></h3>
                  <p>
                    As a local, owner-operated business led by me, Devin, and based right here in Westminster, MD, our name and reputation are on every installation. Unlike faceless national corporations, we are your neighbors, serving businesses and properties from Eldersburg to Manchester and throughout Carroll County. We act as your strategic partner, using data and direct feedback to curate a selection of products that your employees and customers will actually love.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-mint mb-4">Our No-Cost <span className="text-coral">Promise to You</span></h3>
                  <p>
                    Here's what truly makes our partnership different: We believe a world-class amenity shouldn't be a line-item expense. For our qualifying partners, we provide the equipment, the cutting-edge technology, the professional installation, and the regular stocking and service at absolutely no cost to your business. Our success is tied directly to providing an amenity your people are excited to use.
                  </p>
                </div>
                
                <p>
                  If you're ready to stop dealing with complaints and start providing an amenity that attracts talent, boosts satisfaction, and strengthens your company culture, then we're ready to help. Let's build a better breakroom, together.
                </p>

                <p>
                  <a href="https://members.carrollcountychamber.org/memberdirectory/Details/smart-market-retail-4244419" target="_blank" rel="noopener noreferrer" className="text-mint hover:text-coral transition-colors mt-6 font-semibold">
                    We Are Proud Members of the Carroll County Chamber of Commerce 
                  </a>
                </p>
              </div>
              
              {/* Google Maps iframe */}
              <div className="fade-in mt-8 flex justify-center">
                <div className="w-full max-w-4xl">
                  <iframe 
                    title="Smart Market Retail Service Area Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d325916.9427159213!2d-77.03641594999999!3d39.534632499999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a660e10fa47b17f%3A0xf85df10180a8ac38!2sSmart%20Market%20Retail!5e1!3m2!1sen!2sus!4v1756737844913!5m2!1sen!2sus"
                    width="350" 
                    height="300" 
                    style={{border:0}} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg shadow-glow"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Collaborative Process Section */}
      <section id="our-process" className="py-16 md:py-24 bg-navy/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="fade-in text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-mint">Our Collaborative</span> <span className="text-coral">Process</span>
            </h2>
            <p className="text-lg text-lavender/80 max-w-3xl mx-auto">
              A proven four-step journey that ensures your breakroom solution perfectly matches your needs and exceeds expectations.
            </p>
          </div>

          {/* Desktop Timeline */}
          <div className="fade-in hidden md:block max-w-6xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-16 left-0 w-full h-0.5 bg-gradient-to-r from-mint via-coral to-lavender"></div>
              
              <div className="grid grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                  <div key={index} className="relative">
                    {/* Step Number Circle */}
                    <div className="relative z-10 w-12 h-12 bg-gradient-pastel rounded-full flex items-center justify-center text-navy font-bold text-lg mx-auto mb-6 shadow-glow">
                      {index + 1}
                    </div>
                    
                    {/* Card */}
                    <div className="backdrop-blur-sm p-6 rounded-lg border border-mint/20 hover:border-mint/40 transition-all text-center h-full">
                      <div className="flex justify-center mb-4">
                        <div className="p-3 bg-gradient-pastel rounded-lg text-navy">
                          {step.icon}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-mint mb-3">{step.title}</h3>
                      <p className="text-peach/80 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Collapsible List */}
          <div className="fade-in md:hidden space-y-2">
            {processSteps.map((step, index) => (
              <div key={index} className="backdrop-blur-sm border border-mint/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleProcess(index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-mint/5 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-pastel rounded-full flex items-center justify-center text-navy font-bold text-sm mr-3">
                      {index + 1}
                    </div>
                    <div className="p-2 bg-gradient-pastel rounded-lg w-10 h-10 flex items-center justify-center mr-3 text-navy">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-mint">{step.title}</h3>
                  </div>
                  {expandedProcess === index ? (
                    <ChevronUp className="h-5 w-5 text-coral flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-coral flex-shrink-0" />
                  )}
                </button>

                {expandedProcess === index && (
                  <div className="border-t border-mint/20 p-4">
                    <p className="text-peach/80 leading-relaxed">{step.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="fade-in text-center mt-28">
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-gradient-pastel text-navy px-8 py-3 rounded-full font-semibold hover:shadow-neon transition-all group"
            >
              Start Your Journey <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section id="our-values" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="fade-in text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-mint">Our</span> <span className="text-coral">Values</span>
            </h2>
            <p className="text-lg text-lavender/80 max-w-3xl mx-auto">
              The principles that guide everything we do and drive our commitment to excellence.
            </p>
          </div>

          {/* Desktop Grid - Hidden on Mobile */}
          <div className="fade-in hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <ValueCard 
                key={index}
                value={value}
                index={index}
                isExpanded={false}
                onToggle={() => {}}
                isMobile={false}
              />
            ))}
          </div>

          {/* Mobile Collapsible List - Hidden on Desktop */}
          <div className="fade-in md:hidden space-y-2">
            {values.map((value, index) => (
              <ValueCard 
                key={index}
                value={value}
                index={index}
                isExpanded={expandedValue === index}
                onToggle={() => toggleValue(index)}
                isMobile={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section id="what-we-offer" className="py-16 bg-navy/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="fade-in text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-mint">What We</span> <span className="text-coral">Offer</span>
            </h2>
            <p className="text-lg text-lavender/80 max-w-3xl mx-auto">
              Comprehensive unattended retail solutions designed to exceed expectations and deliver exceptional value.
            </p>
          </div>

          <div className="fade-in max-w-6xl mx-auto">
            {/* Desktop Grid - Hidden on Mobile */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {offerings.map((offering, index) => (
                <OfferingCard 
                  key={index}
                  offering={offering}
                  index={index}
                  isExpanded={false}
                  onToggle={() => {}}
                  isMobile={false}
                />
              ))}
            </div>

            {/* Mobile Collapsible List - Hidden on Desktop */}
            <div className="md:hidden space-y-2">
              {offerings.map((offering, index) => (
                <OfferingCard 
                  key={index}
                  offering={offering}
                  index={index}
                  isExpanded={expandedOffering === index}
                  onToggle={() => toggleOffering(index)}
                  isMobile={true}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="fade-in">
        <FAQRotator />
      </div>

      {/* Why Choose Smart Market Retail Section */}
      <section id="why-choose-us" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="fade-in max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              <span className="text-mint">Why Choose</span> <span className="text-coral">Us?</span>
            </h2>
            
            <div className="text-lg text-lavender/80 leading-relaxed space-y-6 mb-8">
              <p>
                We combine the best of cutting-edge technology, reliable service, and user-first design to bring your location an all-in-one retail solution. Our story is built on solving everyday access challenges—without adding costs or complexity. Guided by strong values, we tailor every machine and market to fit your audience and space. And as the industry shifts toward smart, contactless, and autonomous experiences, we help you stay ahead of the curve. Whether you want to increase tenant satisfaction, boost employee morale, or simply offer better service—we're your unattended retail partner.
              </p>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold text-mint mb-2">SMART MARKET <span className="text-coral">RETAIL</span></p>
              <p className="text-xl text-peach/90 font-semibold">A SMARTER WAY TO VEND</p>
            </div>

            <div className="mt-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact" 
                  className="inline-block bg-gradient-pastel text-navy px-8 py-3 rounded-full font-semibold hover:shadow-neon transition-all"
                >
                  Partner With Us Today
                </Link>
                <Link 
                  to="/solutions" 
                  className="inline-block border-2 border-mint text-mint px-8 py-3 rounded-full hover:bg-mint/10 transition-all"
                >
                  Explore Our Solutions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutPage;