import React, { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import RequestAssessment from '../components/RequestAssessment';
import FAQRotator from '../components/FAQRotator';
import { MapPin, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPexelsResponsiveImages } from '../utils/imageUtils';

const LocationPage: React.FC = () => {
  const [expandedLocation, setExpandedLocation] = useState<number | null>(null);

  const toggleLocation = (index: number) => {
    setExpandedLocation(expandedLocation === index ? null : index);
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

  const locationTypes = [
    {
      title: 'Office Buildings',
      description: 'Workers get hungry and thirsty during long days. Smart vending machines give them snacks and drinks right at work, so they stay happy and don\'t waste time going out to buy food.',
      pexelsId: '1170412',
      path: '/locations/office-buildings',
      benefits: [
        'Increase employee satisfaction',
        'Reduce time spent on coffee runs',
        'Modern amenity for tenant attraction',
        'Revenue sharing opportunities'
      ]
    },
    {
      title: 'Colleges & Universities',
      description: 'Students and teachers need food and drinks all day and night. Smart stores work 24/7, take campus cards, and have healthy options that keep everyone fed and focused on learning.',
      image: '/McDaniel College - Westminster MD_small.webp',
      path: '/locations/colleges-universities',
      benefits: [
        '24/7 food and beverage access',
        'Cashless payment options',
        'Healthy and diverse product selection',
        'Minimal maintenance required'
      ]
    },
    {
      title: 'Healthcare Facilities',
      description: 'Doctors and nurses work all hours helping people. Smart vending gives them quick, healthy food and drinks anytime without leaving patients. Patients and visitors get snacks too.',
      pexelsId: '668298',
      path: '/locations/healthcare-facilities',
      benefits: [
        'Support for all shifts',
        'Contactless transactions',
        'Fresh, healthy options',
        'Regular restocking service'
      ]
    },
    {
      title: 'Car Dealerships & Auto Shops',
      description: 'Customers wait while their cars get fixed. Workers get hungry during long repair jobs. Smart vending gives everyone snacks and drinks, making waiting easier and work better.',
      pexelsId: '3807386',
      path: '/locations/car-dealerships',
      benefits: [
        'Customer convenience',
        'Staff refreshments',
        'Reduced overhead',
        'Low maintenance'
      ]
    },
    {
      title: 'Sports & Fitness Centers',
      description: 'People working out need energy drinks and protein snacks before and after exercise. Smart vending gives gym members exactly what they need to stay strong and healthy.',
      pexelsId: '3253501',
      path: '/locations/sports-fitness',
      benefits: [
        'Pre/post workout nutrition',
        'Hydration options',
        'Energy boosters',
        'Health-conscious selections'
      ]
    },
    {
      title: 'Hotels & Motels',
      description: 'Hotel guests get hungry and thirsty at all hours. Smart vending works 24/7 in lobbies and hallways, giving travelers snacks and drinks without bothering hotel staff.',
      pexelsId: '261102',
      path: '/locations/hotels-motels',
      benefits: [
        '24/7 availability',
        'Additional amenity',
        'Premium experience',
        'Minimal staff involvement'
      ]
    },
    {
      title: 'Senior Living',
      description: 'Older adults need easy access to snacks and everyday items. Smart vending is simple to use and gives seniors what they need without leaving their building.',
      pexelsId: '7551617',
      path: '/locations/senior-living',
      benefits: [
        'Convenient access',
        'Customized product mix',
        'Easy payment options',
        'Regular maintenance'
      ]
    },
    {
      title: 'High Schools',
      description: 'Students and teachers get hungry between classes. Smart vending gives them healthy snacks and drinks quickly, so they can focus on learning instead of being hungry.',
      image: '/high school.jpg',
      path: '/locations/high-schools',
      benefits: [
        'Healthy snack options',
        'Cashless payments',
        'Revenue generation',
        'Customizable selections'
      ]
    },
    {
      title: 'Warehouse & Distribution',
      description: 'Workers doing heavy jobs need energy drinks and hearty snacks. Smart vending gives them fuel for hard work, available all day and night for every shift.',
      pexelsId: '4481326',
      path: '/locations/warehouse-distribution',
      benefits: [
        'Break room enhancement',
        '24/7 availability',
        'Energy-boosting options',
        'Minimal supervision needed'
      ]
    },
    {
      title: 'Mid & High-Rise Apartments',
      description: 'People living in apartments sometimes need snacks or drinks without going to the store. Smart vending in the lobby gives residents what they need instantly.',
      image: '/Mid-rise.jpg',
      path: '/locations/apartments-multi-family',
      benefits: [
        'Resident convenience',
        'Property value add',
        'Premium tenant experience',
        'Low maintenance required'
      ]
    },
    {
      title: 'Construction Sites',
      description: 'Construction workers do tough jobs and need energy drinks and filling snacks. Smart vending brings food and drinks right to the work site, keeping workers strong.',
      image: 'Construction site_medium.webp',
      path: '/locations/construction-sites',
      benefits: [
        'Convenient on-site refreshments',
        'Increased worker satisfaction',
        'Time-saving solution',
        'Weather-resistant units'
      ]
    },
    {
      title: 'Other High Traffic Areas',
      description: 'Busy places with lots of people need quick snacks and drinks. Smart vending works anywhere people gather, giving them what they want fast and easy.',
      pexelsId: '3184465',
      path: '/locations/high-traffic-locations',
      benefits: [
        'Flexible installation options',
        'Custom product selection',
        'High-volume capacity',
        'Adaptable to various environments'
      ]
    }
  ];

  return (
    <PageLayout
      title="Vending Locations - Office Buildings, Schools, Healthcare & More | Smart Market Retail"
      description="Smart Market Retail serves diverse locations across Carroll & Baltimore County MD: office buildings, colleges, healthcare facilities, hotels, warehouses, and more. Discover perfect vending solutions for your location type."
      keywords="vending locations, office building vending, school vending, healthcare vending, hotel vending, warehouse vending, apartment vending, construction site vending, Carroll County locations, Baltimore County locations"
    >
      <section className="py-16 md:py-24 relative overflow-hidden pt-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Desktop Card Container */}
          <div className="hidden md:block backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow mb-16">
            <div className="fade-in text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-mint">Prospective</span>{' '}
                <span className="text-coral">Locations</span>
              </h1>
              <p className="text-lg text-lavender/80 max-w-4xl mx-auto mb-6">
                As a local provider, we specialize in placing our Smart Stores and Micro Markets in high-traffic locations across Carroll and Baltimore Counties. From busy office buildings and campuses to healthcare facilities and residential communities, we deliver fresh food, snacks, and essentials—24/7, right where your people need them most. Our solutions are fully managed, cost-free, and designed to enhance your space while keeping your team, tenants, or guests satisfied.
              </p>
              <p className="text-lg text-peach font-semibold mb-8 max-w-4xl mx-auto">
                Let Smart Market Retail bring a modern, hassle-free vending experience to your location.
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 bg-gradient-pastel text-navy px-8 py-3 rounded-full font-semibold hover:shadow-neon transition-all group"
              >
                Request a Location Assessment Today
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
            </div>
          </div>

          {/* Mobile Layout - No Card */}
          <div className="md:hidden">
            <div className="fade-in text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-mint">Prospective</span>{' '}
                <span className="text-coral">Locations</span>
              </h1>
              <p className="text-lg text-lavender/80 max-w-4xl mx-auto mb-6">
                As a local provider, we specialize in placing our Smart Stores and Micro Markets in high-traffic locations across Carroll and Baltimore Counties. From busy office buildings and campuses to healthcare facilities and residential communities, we deliver fresh food, snacks, and essentials—24/7, right where your people need them most. Our solutions are fully managed, cost-free, and designed to enhance your space while keeping your team, tenants, or guests satisfied.
              </p>
              <p className="text-lg text-peach font-semibold mb-8 max-w-4xl mx-auto">
                Let Smart Market Retail bring a modern, hassle-free vending experience to your location.
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 bg-gradient-pastel text-navy px-8 py-3 rounded-full font-semibold hover:shadow-neon transition-all group"
              >
                Request a Location Assessment Today
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
            </div>
          </div>

          {/* Desktop Grid - Hidden on Mobile */}
          <div className="fade-in hidden md:grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {locationTypes.map((location, index) => (
              <Link 
                to={location.path}
                key={index} 
                className="group backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-lg overflow-hidden hover:border-mint/40 transition-all shadow-glow"
              >
                <div className="h-64 overflow-hidden">
                  {location.pexelsId ? (
                    <picture>
                      <source 
                        media="(max-width: 640px)"
                        srcSet={getPexelsResponsiveImages(location.pexelsId).small}
                      />
                      <source 
                        media="(max-width: 1024px)"
                        srcSet={getPexelsResponsiveImages(location.pexelsId).medium}
                      />
                      <img 
                        src={getPexelsResponsiveImages(location.pexelsId).large}
                        alt={location.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                      />
                    </picture>
                  ) : (
                    <img 
                      src={location.image} 
                      alt={location.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <MapPin className="h-5 w-5 text-coral mr-2" />
                    <h2 className="text-xl font-semibold text-mint group-hover:text-coral transition-colors">{location.title}</h2>
                  </div>
                  <p className="text-peach/80 mb-4">{location.description}</p>
                  <h3 className="text-lg font-semibold text-coral mb-3">Key Benefits:</h3>
                  <ul className="space-y-2">
                    {location.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-lavender/80 flex items-center">
                        <span className="w-2 h-2 bg-mint rounded-full mr-2"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Collapsible List - Hidden on Desktop */}
          <div className="fade-in md:hidden space-y-2 mb-16">
            {locationTypes.map((location, index) => (
              <div key={index} className="backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-lg overflow-hidden shadow-glow">
                {/* Collapsible Header */}
                <button
                  onClick={() => toggleLocation(index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-mint/5 transition-colors"
                >
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-coral mr-3 flex-shrink-0" />
                    <h3 className="text-lg font-semibold text-mint">{location.title}</h3>
                  </div>
                  {expandedLocation === index ? (
                    <ChevronUp className="h-5 w-5 text-coral flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-coral flex-shrink-0" />
                  )}
                </button>

                {/* Collapsible Content */}
                {expandedLocation === index && (
                  <div className="border-t border-mint/20">
                    <div className="h-48 overflow-hidden">
                      {location.pexelsId ? (
                        <picture>
                          <source 
                            media="(max-width: 640px)"
                            srcSet={getPexelsResponsiveImages(location.pexelsId).small}
                          />
                          <img 
                            src={getPexelsResponsiveImages(location.pexelsId).medium}
                            alt={location.title}
                            className="w-full h-full object-cover"
                          />
                        </picture>
                      ) : (
                        <img 
                          src={location.image} 
                          alt={location.title} 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-peach/80 text-sm mb-4 leading-relaxed">{location.description}</p>
                      
                      <h4 className="text-base font-semibold text-coral mb-3">Key Benefits:</h4>
                      <ul className="space-y-2 mb-6">
                        {location.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-lavender/80 text-sm flex items-center">
                            <span className="w-2 h-2 bg-mint rounded-full mr-2 flex-shrink-0"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                      
                      <Link 
                        to={location.path}
                        className="inline-flex items-center gap-2 bg-gradient-pastel text-navy px-6 py-3 rounded-full font-semibold hover:shadow-neon transition-all group"
                      >
                        Learn More
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                      </Link>
                    </div>
                  </div>
                )}
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

export default LocationPage;