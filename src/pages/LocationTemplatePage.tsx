import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageLayout from '../components/PageLayout';
import RequestAssessment from '../components/RequestAssessment';
import { getPexelsResponsiveImages } from '../utils/imageUtils';
import { getLocationBySlug } from '../components/locationData'; // Corrected import path
import { useIsMobile } from '../hooks/use-mobile';
import { 
  CheckCircle, 
  Clock, 
  Shield, 
  Users, 
  Star, 
  ArrowRight,
  ArrowLeft, 
  Zap, 
  Heart, 
  BookOpen, 
  Apple, 
  Sun, 
  ThumbsUp,
  Coffee,
  DollarSign,
  TrendingDown,
  MapPin,
  Car,
  Home,
  Frown,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

// This component will serve as the template for all individual location pages.
const LocationTemplatePage: React.FC = () => {
  // Get the 'locationSlug' from the URL, e.g., "office-buildings"
  const { locationSlug } = useParams<{ locationSlug: string }>();
  // Fetch the corresponding data from our centralized data file.
  const locationData = getLocationBySlug(locationSlug);
  
  // State for FAQ accordion
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  // State for collapsible cards on mobile
  const isMobile = useIsMobile();
  const [expandedBenefits, setExpandedBenefits] = useState<Set<number>>(new Set());
  const [expandedSolutions, setExpandedSolutions] = useState<Set<number>>(new Set());
  const [expandedPainPoints, setExpandedPainPoints] = useState<Set<number>>(new Set());

  // If no data is found for the given slug, redirect to the main locations page.
  if (!locationData) {
    return <Navigate to="/locations" replace />;
  }

  // A map to dynamically select the correct Lucide icon based on the string in our data file.
  const iconMap: { [key: string]: React.ElementType } = {
    Clock, Star, Shield, Users, Zap, Heart, BookOpen, Apple, Sun, ThumbsUp, Coffee, DollarSign, CheckCircle,
    TrendingDown, MapPin, Car, Home, Frown, ChevronDown, ChevronUp, AlertCircle, HelpCircle
  };

  const { hero, benefits, painPoints, customSolutions, faq, smartStore, microMarket, smartCoolers, seo, title } = locationData;

  // Generate FAQ Schema for SEO
  const generateFAQSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faq.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const toggleBenefit = (index: number) => {
    const newExpanded = new Set(expandedBenefits);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedBenefits(newExpanded);
  };

  const toggleSolution = (index: number) => {
    const newExpanded = new Set(expandedSolutions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSolutions(newExpanded);
  };

  const togglePainPoint = (index: number) => {
    const newExpanded = new Set(expandedPainPoints);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedPainPoints(newExpanded);
  };

  return (
    <PageLayout
      title={seo.title}
      description={seo.description}
      keywords={seo.keywords}
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generateFAQSchema())}
        </script>
      </Helmet>
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden pt-20">
        <div className="container mx-auto px-2 md:px-3 z-10 relative">
          <Link to="/locations" className="inline-flex items-center text-coral hover:text-mint mb-8">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Prospective Locations
          </Link>
          
          <div className="bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-mint">{title}</span>
            </h1>
            <p className="text-xl text-peach font-semibold mb-4">
              {hero.peachText}
            </p>
            <p className="text-lg text-lavender/80 max-w-4xl mx-auto leading-relaxed mb-8">
              {hero.description}
            </p>
            <div className="mt-8">
              <div className="rounded-lg overflow-hidden shadow-glow shadow-mint/20">
                {hero.pexelsId ? (
                   <picture>
                    <source
                      media="(max-width: 640px)"
                      srcSet={getPexelsResponsiveImages(hero.pexelsId).small}
                    />
                    <source
                      media="(max-width: 1024px)"
                      srcSet={getPexelsResponsiveImages(hero.pexelsId).medium}
                    />
                    <img
                      src={getPexelsResponsiveImages(hero.pexelsId).large}
                      alt={title}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </picture>
                ) : hero.image ? (
                  <img src={hero.image} alt={title} className="w-full h-auto object-cover" loading="lazy" />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Overview Section */}
      <section className="py-16 bg-navy/30">
        <div className="container mx-auto px-2 md:px-3">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-mint">{benefits.title}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.items.map((item, index) => {
              const Icon = iconMap[item.icon];
              const isExpanded = expandedBenefits.has(index);
              return (
                <div key={index} className="bg-navy/50 p-6 rounded-lg border border-mint/20 text-center transform hover:scale-105 transition-transform duration-300">
                  {isMobile ? (
                    <div 
                      className="cursor-pointer"
                      onClick={() => toggleBenefit(index)}
                    >
                      <div className="flex items-center justify-center mb-2">
                        {Icon && <Icon className="h-8 w-8 text-coral mr-2" />}
                        <h3 className="text-lg font-semibold text-mint">{item.title}</h3>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-mint ml-2" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-mint ml-2" />
                        )}
                      </div>
                      {isExpanded && (
                        <p className="text-peach/80 text-sm animate-fade-in">{item.description}</p>
                      )}
                    </div>
                  ) : (
                    <>
                      {Icon && <Icon className="h-8 w-8 text-coral mx-auto mb-4" />}
                      <h3 className="text-lg font-semibold text-mint mb-2">{item.title}</h3>
                      <p className="text-peach/80 text-sm">{item.description}</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* We Understand Your Challenges Section */}
      <section className="py-16 bg-navy/30">
        <div className="container mx-auto px-2 md:px-3">
          <div className="bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-mint">We Understand Your</span> <span className="text-coral">Challenges</span>
            </h2>
            <p className="text-lg text-lavender/80 max-w-3xl mx-auto">
              Every location type faces unique challenges. We've identified the most common pain points and designed solutions specifically for them.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {painPoints.map((painPoint, index) => {
              const Icon = iconMap[painPoint.icon];
              const isExpanded = expandedPainPoints.has(index);
              return (
                <div key={index} className="bg-navy/80 p-6 rounded-lg border border-coral/20 text-center transform hover:scale-105 transition-transform duration-300">
                  {isMobile ? (
                    <div 
                      className="cursor-pointer"
                      onClick={() => togglePainPoint(index)}
                    >
                      <div className="flex items-center justify-center mb-2">
                        {Icon && <Icon className="h-8 w-8 text-coral mr-2" />}
                        <h3 className="text-lg font-semibold text-coral">{painPoint.title}</h3>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-coral ml-2" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-coral ml-2" />
                        )}
                      </div>
                      {isExpanded && (
                        <p className="text-lavender/80 text-sm leading-relaxed animate-fade-in">{painPoint.point}</p>
                      )}
                    </div>
                  ) : (
                    <>
                      {Icon && <Icon className="h-8 w-8 text-coral mx-auto mb-4" />}
                      <h3 className="text-lg font-semibold text-coral mb-2">{painPoint.title}</h3>
                      <p className="text-lavender/80 text-sm leading-relaxed">{painPoint.point}</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tailored Solutions Section */}
      <section className="py-16 bg-navy/30">
        <div className="container mx-auto px-2 md:px-3">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-mint">Tailored Solutions for</span> <span className="text-coral">{title}</span>
            </h2>
            <p className="text-lg text-lavender/80 max-w-3xl mx-auto">
              Our comprehensive solutions are specifically designed to address the unique needs and challenges of your location type.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {customSolutions.map((solution, index) => {
              const isExpanded = expandedSolutions.has(index);
              return (
                <div key={index} className="bg-navy/50 p-6 rounded-lg border border-mint/20">
                  {isMobile ? (
                    <div 
                      className="cursor-pointer"
                      onClick={() => toggleSolution(index)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-mint">{solution.title}</h3>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-mint ml-2" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-mint ml-2" />
                        )}
                      </div>
                      {isExpanded && (
                        <p className="text-lavender/80 leading-relaxed animate-fade-in">{solution.description}</p>
                      )}
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold text-mint mb-4">{solution.title}</h3>
                      <p className="text-lavender/80 leading-relaxed">{solution.description}</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Smart Store Section */}
      <section className="py-16 overflow-hidden">
        <div className="container mx-auto px-2 md:px-3">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <Link to="/solutions/smart-store">
                <h2 className="text-3xl font-bold mb-4 text-mint hover:text-coral transition-colors cursor-pointer">
                  {smartStore.title}
                </h2>
              </Link>
              <p className="mb-6 text-lavender/80 leading-relaxed">{smartStore.description}</p>
              <ul className="space-y-3">
                {smartStore.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-mint mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lavender">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/solutions/smart-store" className="inline-flex items-center mt-6 text-coral font-semibold hover:text-mint transition-colors">
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <Link to="/solutions/smart-store">
                <img src={smartStore.image} alt={smartStore.title} className="rounded-lg shadow-lg w-full h-auto object-cover hover-scale cursor-pointer" loading="lazy" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Micro Market Section */}
      <section className="py-16 bg-navy/30 overflow-hidden">
        <div className="container mx-auto px-2 md:px-3">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Link to="/solutions/micro-markets">
                <img src={microMarket.image} alt={microMarket.title} className="rounded-lg shadow-lg w-full h-auto object-cover hover-scale cursor-pointer" loading="lazy" />
              </Link>
            </div>
            <div>
              <Link to="/solutions/micro-markets">
                <h2 className="text-3xl font-bold mb-4 text-mint hover:text-coral transition-colors cursor-pointer">
                  {microMarket.title}
                </h2>
              </Link>
              <p className="mb-6 text-lavender/80 leading-relaxed">{microMarket.description}</p>
              <ul className="space-y-3">
                {microMarket.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-mint mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lavender">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/solutions/micro-markets" className="inline-flex items-center mt-6 text-coral font-semibold hover:text-mint transition-colors">
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Coolers Section */}
      {smartCoolers && (
        <section className="py-16 overflow-hidden">
          <div className="container mx-auto px-2 md:px-3">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <Link to="/solutions/smart-coolers">
                  <h2 className="text-3xl font-bold mb-4 text-mint hover:text-coral transition-colors cursor-pointer">
                    {smartCoolers.title}
                  </h2>
                </Link>
                <p className="mb-6 text-lavender/80 leading-relaxed">{smartCoolers.description}</p>
                <ul className="space-y-3">
                  {smartCoolers.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-mint mr-3 mt-1 flex-shrink-0" />
                      <span className="text-lavender">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/solutions/smart-coolers" className="inline-flex items-center mt-6 text-coral font-semibold hover:text-mint transition-colors">
                  Learn More <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <div className="order-1 md:order-2">
                <Link to="/solutions/smart-coolers">
                  <img src={smartCoolers.image} alt={smartCoolers.title} className="rounded-lg shadow-lg w-full h-auto object-cover hover-scale cursor-pointer" loading="lazy" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Frequently Asked Questions Section */}
      <section className="py-16">
        <div className="container mx-auto px-2 md:px-3">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-mint">Frequently Asked</span> <span className="text-coral">Questions</span>
            </h2>
            <p className="text-lg text-lavender/80 max-w-3xl mx-auto">
              Get answers to common questions about implementing Smart Market Retail solutions in {title.toLowerCase()}.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {faq.map((item, index) => (
              <div key={index} className="mb-4 bg-navy/50 rounded-lg border border-mint/20 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-navy/70 transition-colors"
                  aria-expanded={expandedFAQ === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-lg font-semibold text-mint pr-4">{item.question}</h3>
                  {expandedFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-coral flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-coral flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div 
                    id={`faq-answer-${index}`}
                    className="px-6 pb-6 animate-fade-in"
                  >
                    <p className="text-lavender/90 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <RequestAssessment />
    </PageLayout>
  );
};

export default LocationTemplatePage;