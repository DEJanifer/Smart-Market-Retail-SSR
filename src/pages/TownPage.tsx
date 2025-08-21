import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { getTownBySlug } from '../components/serviceAreaData';
import NotFoundPage from './NotFoundPage';
import RequestAssessment from '../components/RequestAssessment';
import FAQRotator from '../components/FAQRotator';
import TownMap from '../components/TownMap';
import { ArrowLeft, CheckCircle, MapPin, Target } from 'lucide-react';
import ServicesList from '../components/ServicesList';
import SolutionsGrid from '../components/SolutionsGrid';

const TownPage: React.FC = () => {
  const { townName } = useParams<{ townName: string }>();
  
  // This now correctly and reliably finds the town data using the imported helper function.
  const town = getTownBySlug(townName);

  // If no town is found, we show the 404 page. This is a crucial safeguard.
  if (!town) {
    console.error(`Town not found for slug: ${townName}`);
    return <NotFoundPage />;
  }

  return (
    <PageLayout
      title={town.metaTitle}
      description={town.metaDescription}
    >
      <div className="py-16 md:py-24 relative overflow-hidden pt-20">
        <div className="container mx-auto px-2 md:px-3 z-10 relative">
          <Link to="/service-area" className="inline-flex items-center text-coral hover:text-mint mb-8">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Service Area
          </Link>
          
          <div className="backdrop-blur-md bg-navy/20 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="text-mint">Custom Micro Markets & Vending in</span>{' '}
                <span className="text-coral">{town.name}, MD</span>
              </h1>
              <p className="text-lg text-mint font-semibold mb-6">{town.county}</p>

              <div className="prose prose-invert lg:prose-xl max-w-none text-lavender/80 mb-8">
                <p>{town.hyperlocalIntro}</p>
              </div>

              {town.image && town.image.url && (
                <div className="mt-8">
                  <div className="rounded-lg overflow-hidden shadow-glow shadow-mint/20">
                    <img 
                      src={town.image.url.includes('_large.webp') ? town.image.url.replace('_large.webp', '_medium.webp') : town.image.url}
                      srcSet={`${town.image.url.includes('_large.webp') ? town.image.url.replace('_large.webp', '_medium.webp') : town.image.url} 800w, ${town.image.url} 1200w`}
                      sizes="(max-width: 1024px) 800px, 1200px"
                      alt={town.image.alt} 
                      className="w-full h-auto object-cover" 
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Solutions for Town Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-2 md:px-3">
          <div className="backdrop-blur-md bg-navy/20 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
            <div className="text-center mb-12">
              <Target className="h-12 w-12 text-coral mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-mint">Solutions for</span>{' '}
                <span className="text-coral">{town.name}</span>
              </h2>
              <p className="text-lg text-lavender/80 max-w-3xl mx-auto">
                Tailored vending solutions designed for your community's unique needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {town.solutionScenarios.map((scenario, index) => (
                <div key={index} className="backdrop-blur-sm bg-navy/30 border border-mint/20 rounded-lg overflow-hidden hover:bg-navy/50 transition-all duration-300">
                  <div className="rounded-t-lg overflow-hidden">
                    <img 
                      src={scenario.imageUrl}
                      alt={scenario.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-mint mb-3">{scenario.title}</h3>
                    <p className="text-lavender/80">{scenario.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Local Relevance Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-2 md:px-3">
          <div className="max-w-4xl mx-auto backdrop-blur-md bg-navy/20 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
            <h2 className="text-3xl md:text-4xl font-bold text-mint mb-6">
              {town.localInsights.title}
            </h2>
            <p className="text-lg text-lavender/80 leading-relaxed">
              {town.localInsights.content}
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-2 md:px-3">
          <div className="max-w-4xl mx-auto backdrop-blur-md bg-navy/20 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
            <div className="text-center mb-12">
              <MapPin className="h-12 w-12 text-coral mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-mint">Find Us in</span>{' '}
                <span className="text-coral">{town.name}</span>
              </h2>
              <p className="text-lg text-lavender/80">
                We serve businesses and facilities throughout {town.name} and the surrounding area
              </p>
            </div>
            
            <TownMap 
              latitude={town.geoCoordinates.latitude}
              longitude={town.geoCoordinates.longitude}
              townName={town.name}
            />
            
            {/* Divider */}
            <div className="border-t border-mint/20 my-12"></div>
            
            {/* Enhanced Landmarks and ZIP Codes Section */}
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-mint mb-6">Key Landmarks</h3>
                <ul className="space-y-3">
                  {town.landmarks.map((landmark, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-coral mr-3 flex-shrink-0" />
                      <span className="text-lavender/80">{landmark}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-mint mb-6">Service Area ZIP Codes</h3>
                <div className="backdrop-blur-sm bg-navy/30 border border-mint/20 rounded-lg p-6">
                  <p className="text-lg text-lavender/80 font-mono">
                    {town.zipCodes.join(' • ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-2 md:px-3 py-12">
        <div className="mb-16 backdrop-blur-md bg-navy/20 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-mint">Our</span>{' '}
              <span className="text-coral">Services</span>
            </h2>
            <p className="text-lg text-lavender/80 mt-4 max-w-3xl mx-auto">A partnership focused on your success.</p>
          </div>
          <ServicesList />
        </div>
        
        <div className="backdrop-blur-md bg-navy/20 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-mint">Our</span>{' '}
              <span className="text-coral">Solutions</span>
            </h2>
            <p className="text-lg text-lavender/80 mt-4 max-w-3xl mx-auto">Modern retail for any space.</p>
          </div>
          <SolutionsGrid />
        </div>
      </div>

      <FAQRotator />
      
      <RequestAssessment />
    </PageLayout>
  );
};

export default TownPage;