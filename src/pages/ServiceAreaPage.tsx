import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { allTowns } from '../components/serviceAreaData';
import { locationTypes } from '../components/locationData';
import { MapPin, Building, ArrowRight } from 'lucide-react';
import { useFadeInObserver } from '../hooks/useFadeInObserver';

const ServiceAreaPage: React.FC = () => {
  const carrollCounty = allTowns.filter(town => town.county === 'Carroll County');
  const baltimoreCounty = allTowns.filter(town => town.county === 'Baltimore County');

  useFadeInObserver();

  return (
    <PageLayout
      title="Service Area | Smart Market Retail | Carroll & Baltimore County, MD"
      description="Smart Market Retail proudly serves businesses throughout Carroll County and parts of Baltimore County, Maryland. Find out if your town is in our service area."
      keywords="service area, Carroll County, Baltimore County, Maryland, vending services, micro markets, smart stores, Westminster, Eldersburg, Reisterstown, Owings Mills"
    >
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden pt-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Desktop Card Container */}
          <div className="hidden md:block backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
            <div className="fade-in text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-mint">Our Service</span>{' '}
                <span className="text-coral">Area</span>
              </h1>
              <p className="text-lg text-lavender/80 max-w-3xl mx-auto leading-relaxed">
                We provide premier unattended retail solutions to businesses and organizations throughout Central Maryland, bringing modern convenience to your workplace.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-12">
              {/* Carroll County Section */}
              <div className="fade-in">
                <h2 className="text-3xl font-bold text-mint mb-6 flex items-center justify-center">
                  <MapPin className="mr-3"/> Carroll County
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {carrollCounty.map(town => (
                    <Link 
                      key={town.slug} 
                      to={`/service-area/${town.slug}`} 
                      className="backdrop-blur-sm bg-navy/30 border border-mint/20 p-4 rounded-lg text-center hover:bg-mint/10 hover:border-mint/40 hover:text-coral transition-all group"
                    >
                      <span className="group-hover:font-semibold transition-all">{town.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Baltimore County Section */}
              <div className="fade-in">
                <h2 className="text-3xl font-bold text-mint mb-6 flex items-center justify-center">
                  <MapPin className="mr-3"/> Baltimore County
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {baltimoreCounty.map(town => (
                    <Link 
                      key={town.slug} 
                      to={`/service-area/${town.slug}`} 
                      className="backdrop-blur-sm bg-navy/30 border border-mint/20 p-4 rounded-lg text-center hover:bg-mint/10 hover:border-mint/40 hover:text-coral transition-all group"
                    >
                      <span className="group-hover:font-semibold transition-all">{town.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Locations We Serve Section */}
              <div className="fade-in">
                <h2 className="text-3xl font-bold text-mint mb-6 flex items-center justify-center">
                  <Building className="mr-3"/> Locations We Serve
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {locationTypes.map(loc => (
                    <Link 
                      key={loc.slug} 
                      to={loc.path} 
                      className="backdrop-blur-sm bg-navy/30 border border-mint/20 p-4 rounded-lg text-center hover:bg-mint/10 hover:border-mint/40 hover:text-coral transition-all group"
                    >
                      <span className="group-hover:font-semibold transition-all">{loc.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="fade-in text-center">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 bg-gradient-pastel text-navy px-8 py-3 rounded-full font-semibold hover:shadow-neon transition-all group"
                >
                  Request Service Assessment <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Layout - No Card */}
          <div className="md:hidden">
            <div className="fade-in text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-mint">Our Service</span>{' '}
                <span className="text-coral">Area</span>
              </h1>
              <p className="text-lg text-lavender/80 max-w-3xl mx-auto leading-relaxed">
                We provide premier unattended retail solutions to businesses and organizations throughout Central Maryland.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-12">
              {/* Carroll County Section */}
              <div className="fade-in">
                <h2 className="text-3xl font-bold text-mint mb-6 flex items-center justify-center">
                  <MapPin className="mr-3"/> Carroll County
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {carrollCounty.map(town => (
                    <Link 
                      key={town.slug} 
                      to={`/service-area/${town.slug}`} 
                      className="bg-navy/30 p-4 rounded-lg text-center hover:bg-navy/50 hover:text-coral transition-colors"
                    >
                      {town.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Baltimore County Section */}
              <div className="fade-in">
                <h2 className="text-3xl font-bold text-mint mb-6 flex items-center justify-center">
                  <MapPin className="mr-3"/> Baltimore County
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {baltimoreCounty.map(town => (
                    <Link 
                      key={town.slug} 
                      to={`/service-area/${town.slug}`} 
                      className="bg-navy/30 p-4 rounded-lg text-center hover:bg-navy/50 hover:text-coral transition-colors"
                    >
                      {town.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Locations We Serve Section */}
              <div className="fade-in">
                <h2 className="text-3xl font-bold text-mint mb-6 flex items-center justify-center">
                  <Building className="mr-3"/> Locations We Serve
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {locationTypes.map(loc => (
                    <Link 
                      key={loc.slug} 
                      to={loc.path} 
                      className="bg-navy/30 p-4 rounded-lg text-center hover:bg-navy/50 hover:text-coral transition-colors"
                    >
                      {loc.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="fade-in text-center">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 bg-gradient-pastel text-navy px-8 py-3 rounded-full font-semibold hover:shadow-neon transition-all group"
                >
                  Request Service Assessment <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="fade-in rounded-lg overflow-hidden shadow-glow shadow-mint/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d197364.3169302638!2d-77.15833182343748!3d39.57516889999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c81512b795c043%3A0x67ba72164d1f2849!2sCarroll%20County%2C%20MD!5e0!3m2!1sen!2sus!4v1692048383406!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Service Area Map"
            ></iframe>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ServiceAreaPage;