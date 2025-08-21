import React, { useState } from 'react';
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPexelsResponsiveImages } from '../utils/imageUtils';

const Locations: React.FC = () => {
  const [expandedLocation, setExpandedLocation] = useState<number | null>(null);

  const toggleLocation = (index: number) => {
    setExpandedLocation(expandedLocation === index ? null : index);
  };

  const locationTypes = [
    {
      title: 'Office Buildings',
      description: 'Keep your team fueled and focused without needing to leave the workplace. Our Smart Vending solutions provide convenient, on-site access to snacks, beverages, and essentials—helping employees stay energized and productive throughout the day.',
      pexelsId: '1170412',
      path: '/locations/office-buildings'
    },
    {
      title: 'Colleges & Universities',
      description: 'Support the needs of busy students and faculty with around the clock access to indulgent snacks, fresh foods, hydrating & energizing beverages, and even sundry essentials—right on campus. Our cashless Smart Vending solutions can even accept campus cards.',
      image: '/McDaniel College - Westminster MD_small.webp',
      path: '/locations/colleges-universities'
    },
    {
      title: 'Healthcare Facilities',
      description: 'Doctors and nurses work all hours helping patients. Smart vending gives them quick, healthy food and drinks anytime without leaving patients. Patients and visitors get snacks too.',
      pexelsId: '668298',
      path: '/locations/healthcare-facilities'
    },
    {
      title: 'Car Dealerships & Auto Shops',
      description: 'Customers wait while their cars get fixed. Workers get hungry during long repair jobs. Smart vending gives everyone snacks and drinks, making waiting easier and work better.',
      pexelsId: '3807386',
      path: '/locations/car-dealerships'
    },
    {
      title: 'Sports & Fitness Centers',
      description: 'People working out need energy drinks and protein snacks before and after exercise. Smart vending gives gym members exactly what they need to stay strong and healthy.',
      pexelsId: '3253501',
      path: '/locations/sports-fitness'
    },
    {
      title: 'Hotels & Motels',
      description: 'Travelers expect convenience at any hour. Our 24/7 solutions operate in lobbies, hallways, and guest areas—offering snacks, beverages, and essentials without placing extra demands on your staff.',
      pexelsId: '261102',
      path: '/locations/hotels-motels'
    },
    {
      title: 'Senior Living',
      description: 'Provide residents with effortless access to snacks, beverages, and everyday essentials—right where they live. Our Smart Vending solutions are easy to use, always stocked, and eliminate the need to leave the building for daily needs, supporting comfort and independence',
      pexelsId: '7551617',
      path: '/locations/senior-living'
    },
    {
      title: 'High Schools',
      description: 'Students and teachers get hungry between classes. Smart vending gives them healthy snacks and drinks quickly, so they can focus on learning instead of being hungry.',
      image: '/high school.jpg',
      path: '/locations/high-schools'
    },
    {
      title: 'Warehouse & Distribution',
      description: 'Keep your workforce energized and productive with convenient access to hearty snacks, drinks, and essentials. Our solutions provide reliable, round-the-clock fuel for every shift—right on-site, with no downtime and minimal disruption.',
      pexelsId: '4481326',
      path: '/locations/warehouse-distribution'
    },
    {
      title: 'Mid & High-Rise Apartments',
      description: 'Give residents instant access to snacks, beverages, and everyday essentials—without a trip to the store. Our Smart Vending solutions fit seamlessly into lobbies or common areas, offering convenient, 24/7 self-serve options just steps from their door.',
      image: '/Mid-rise.jpg',
      path: '/locations/apartments'
    },
    {
      title: 'Construction Sites',
      description: 'Support your crew with convenient, on-site access to energizing snacks and drinks. We can deliver the fuel workers need to stay strong and focused—right at the job site, available all day for every shift.',
      image: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      path: '/locations/construction-sites'
    },
    {
      title: 'Other High Traffic Areas',
      description: 'From transit hubs to event venues and retail establishments, busy spaces demand fast, reliable refreshment. Our Smart Vending solutions serve crowds effortlessly—offering quick, self-serve access to snacks and drinks wherever people gather.',
      pexelsId: '3184465',
      path: '/locations/high-traffic'
    }
  ];

  return (
    <section id="locations" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Desktop Card Container */}
        <div className="hidden md:block backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-mint">Where We</span> <span className="text-coral">Operate</span>
            </h2>
            <p className="text-lg text-lavender/80 max-w-3xl mx-auto">
              We strategically place our Smart Stores and Micro Markets in high-traffic locations throughout Carroll and Baltimore Counties, Maryland—bringing convenient, 24/7 access to fresh food, snacks, and essentials right where people work, live, and move. Whether it's an office building, campus, healthcare facility, or residential property, we deliver modern vending experiences where they're needed most.
            </p>
          </div>
          
          {/* Desktop Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {locationTypes.map((location, index) => (
              <Link 
                to={location.path}
                key={index} 
                className="group relative rounded-lg overflow-hidden backdrop-blur-sm bg-navy/30 border border-mint/20 hover:border-mint/40 transition-all"
              >
                <div className="h-48 overflow-hidden">
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
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-5 w-5 text-coral mr-2" />
                    <h3 className="text-lg font-semibold text-mint group-hover:text-coral transition-colors">{location.title}</h3>
                  </div>
                  <p className="text-peach/80 text-sm">{location.description}</p>
                </div>
              </Link>
            ))}
          </div>
          
          {/* New Ready to Add Smarter Vending Section */}
          <div className="text-center border-t border-mint/20 pt-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="text-mint">Ready to Add Smarter Vending Solutions</span> <span className="text-coral">to Your Location?</span>
            </h3>
            <p className="text-lg text-lavender/80 mb-4 max-w-4xl mx-auto">
              Let Smart Market Retail elevate your property with seamless, on-site convenience. Bring 24/7 retail to the busiest places people live, work, and gather.
            </p>
            <p className="text-lg text-peach font-semibold mb-6 max-w-4xl mx-auto">
              Contact us today to explore placement opportunities at your location.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-gradient-pastel text-navy px-8 py-3 rounded-full font-semibold hover:shadow-neon transition-all"
            >
              Request a Location Assessment
            </Link>
          </div>
        </div>

        {/* Mobile Layout - No Card */}
        <div className="md:hidden">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-mint">Where We</span> <span className="text-coral">Operate</span>
            </h2>
            <p className="text-lg text-lavender/80">
              We strategically place our Smart Stores and Micro Markets in high-traffic locations throughout Carroll and Baltimore Counties, Maryland—bringing convenient, 24/7 access to fresh food, snacks, and essentials right where people work, live, and move. Whether it's an office building, campus, healthcare facility, or residential property, we deliver modern vending experiences where they're needed most.
            </p>
          </div>
          
          {/* Mobile Collapsible List */}
          <div className="space-y-2 mb-12">
            {locationTypes.map((location, index) => (
              <div key={index} className="backdrop-blur-sm border border-mint/20 rounded-lg overflow-hidden">
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
                      <Link 
                        to={location.path}
                        className="inline-flex items-center gap-2 bg-gradient-pastel text-navy px-6 py-3 rounded-full font-semibold hover:shadow-neon transition-all group"
                      >
                        Learn More
                        <MapPin className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* New Ready to Add Smarter Vending Section - Mobile */}
          <div className="text-center border-t border-mint/20 pt-8">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-mint">Ready to Add Smarter Vending Solutions</span> <span className="text-coral">to Your Location?</span>
            </h3>
            <p className="text-lg text-lavender/80 mb-4">
              Let Smart Market Retail elevate your property with seamless, on-site convenience. Bring 24/7 retail to the busiest places people live, work, and gather.
            </p>
            <p className="text-lg text-peach font-semibold mb-6">
              Contact us today to explore placement opportunities at your location.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-gradient-pastel text-navy px-8 py-3 rounded-full font-semibold hover:shadow-neon transition-all"
            >
              Request a Location Assessment
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;