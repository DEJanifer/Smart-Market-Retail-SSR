import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageLayout from '../components/PageLayout';
import RequestAssessment from '../components/RequestAssessment';
import FAQRotator from '../components/FAQRotator';
import { getPexelsResponsiveImages } from '../utils/imageUtils';
import { getLocationBySlug } from '../components/locationData';
import { useIsMobile } from '../hooks/use-mobile';
import { useFadeInObserver } from '../hooks/useFadeInObserver';
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

const LocationTemplatePage: React.FC = () => {
  const { locationSlug } = useParams<{ locationSlug: string }>();
  const locationData = getLocationBySlug(locationSlug);
  const isMobile = useIsMobile();
  
  // State for mobile collapsible sections
  const [expandedBenefits, setExpandedBenefits] = useState<Set<number>>(new Set());
  const [expandedPainPoints, setExpandedPainPoints] = useState<Set<number>>(new Set());
  const [expandedSolutions, setExpandedSolutions] = useState<Set<number>>(new Set());
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Initialize fade-in observer
  useFadeInObserver();

  // If no data is found, redirect to locations page
  if (!locationData) {
    return <Navigate to="/locations" replace />;
  }

  // Icon mapping for dynamic icon rendering
  const iconMap: { [key: string]: React.ElementType } = {
    Clock, Star, Shield, Users, Zap, Heart, BookOpen, Apple, Sun, ThumbsUp, Coffee, DollarSign, CheckCircle,
    TrendingDown, MapPin, Car, Home, Frown, ChevronDown, ChevronUp, AlertCircle, HelpCircle
  };

  const { hero, benefits, painPoints, customSolutions, faq, smartStore, microMarket, smartCoolers, seo, title } = locationData;

  // Toggle functions for mobile collapsible sections
  const toggleBenefit = (index: number) => {
    const newExpanded = new Set(expandedBenefits);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedBenefits(newExpanded);
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

  const toggleSolution = (index: number) => {
    const newExpanded = new Set(expandedSolutions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSolutions(newExpanded);
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

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

  // Reusable component for benefit cards
  const BenefitCard: React.FC<{
    item: typeof benefits.items[0];
    index: number;
    isExpanded: boolean;
    onToggle: () => void;
  }> = ({ item, isExpanded, onToggle }) => {
    const Icon = iconMap[item.icon];

    if (isMobile) {
      return (
        <div className="backdrop-blur-sm border border-mint/20 rounded-lg overflow-hidden">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-mint/5 transition-colors"
          >
            <div className="flex items-center">
              <div className="p-3 bg-gradient-pastel rounded-lg w-12 h-12 flex items-center justify-center mr-4 text-navy">
                {Icon && <Icon size={20} />}
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
      <div className="backdrop-blur-sm p-6 rounded-lg border border-mint/20 hover:border-mint/40 transition-all card-interactive text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-pastel rounded-lg">
            {Icon && <Icon className="h-6 w-6 text-navy" />}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-mint mb-3">{item.title}</h3>
        <p className="text-peach/80 leading-relaxed">{item.description}</p>
      </div>
    );
  };

  // Reusable component for pain point cards
  const PainPointCard: React.FC<{
    item: typeof painPoints[0];
    index: number;
    isExpanded: boolean;
    onToggle: () => void;
  }> = ({ item, isExpanded, onToggle }) => {
    const Icon = iconMap[item.icon];

    if (isMobile) {
      return (
        <div className="backdrop-blur-sm border border-coral/20 rounded-lg overflow-hidden">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-coral/5 transition-colors"
          >
            <div className="flex items-center">
              <div className="p-3 bg-coral/20 rounded-lg w-12 h-12 flex items-center justify-center mr-4 text-coral">
                {Icon && <Icon size={20} />}
              </div>
              <h3 className="text-lg font-semibold text-coral">{item.title}</h3>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-coral flex-shrink-0" />
            ) : (
              <ChevronDown className="h-5 w-5 text-coral flex-shrink-0" />
            )}
          </button>
          {isExpanded && (
            <div className="border-t border-coral/20 p-4">
              <p className="text-lavender/80 leading-relaxed">{item.point}</p>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="backdrop-blur-sm p-6 rounded-lg border border-coral/20 hover:border-coral/40 transition-all card-interactive text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-coral/20 rounded-lg">
            {Icon && <Icon className="h-6 w-6 text-coral" />}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-coral mb-3">{item.title}</h3>
        <p className="text-lavender/80 leading-relaxed">{item.point}</p>
      </div>
    );
  };

  // Reusable component for custom solution cards
  const CustomSolutionCard: React.FC<{
    item: typeof customSolutions[0];
    index: number;
    isExpanded: boolean;
    onToggle: () => void;
  }> = ({ item, isExpanded, onToggle }) => {
    if (isMobile) {
      return (
        <div className="backdrop-blur-sm border border-mint/20 rounded-lg overflow-hidden">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-mint/5 transition-colors"
          >
            <h3 className="text-lg font-semibold text-mint">{item.title}</h3>
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
        <h3 className="text-xl font-semibold text-mint mb-4">{item.title}</h3>
        <p className="text-lavender/80 leading-relaxed">{item.description}</p>
      </div>
    );
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
        <div className="container mx-auto px-4 md:px-6">
          <Link to="/locations" className="inline-flex items-center text-coral hover:text-mint mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Prospective Locations
          </Link>
          
          {/* Desktop Card Container */}
          <div className="hidden md:block backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
            <div className="fade-in text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-mint">{title}</span>
              </h1>
              <p className="text-xl md:text-2xl text-peach font-semibold mb-6">
                {hero.peachText}
              </p>
              <p className="text-lg text-lavender/80 max-w-4xl mx-auto leading-relaxed mb-8">
                {hero.description}
              </p>
              
              {/* Hero Image */}
              {(hero.pexelsId || hero.image) && (
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
                      <img 
                        src={hero.image} 
                        alt={title} 
                        className="w-full h-auto object-cover" 
                        loading="lazy" 
                      />
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Layout - No Card */}
          <div className="md:hidden">
            <div className="fade-in text-center">
              <h1 className="text-4xl font-bold mb-4">
                <span className="text-mint">{title}</span>
              </h1>
              <p className="text-xl text-peach font-semibold mb-6">
                {hero.peachText}
              </p>
              <p className="text-lg text-lavender/80 leading-relaxed mb-8">
                {hero.description}
              </p>
              
              {/* Hero Image - Mobile */}
              {(hero.pexelsId || hero.image) && (
                <div className="mt-8">
                  <div className="rounded-lg overflow-hidden shadow-glow shadow-mint/20">
                    {hero.pexelsId ? (
                      <picture>
                        <source
                          media="(max-width: 640px)"
                          srcSet={getPexelsResponsiveImages(hero.pexelsId).small}
                        />
                        <img
                          src={getPexelsResponsiveImages(hero.pexelsId).medium}
                          alt={title}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                        />
                      </picture>
                    ) : hero.image ? (
                      <img 
                        src={hero.image} 
                        alt={title} 
                        className="w-full h-auto object-cover" 
                        loading="lazy" 
                      />
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Desktop Card Container */}
          <div className="hidden md:block backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
            <div className="fade-in text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-mint">{benefits.title}</span>
              </h2>
              <p className="text-lg text-lavender/80 max-w-3xl mx-auto">
                Discover how our solutions can transform your {title.toLowerCase()} into a modern, convenient destination.
              </p>
            </div>
            
            {/* Desktop Grid */}
            <div className="fade-in grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.items.map((item, index) => (
                <BenefitCard
                  key={index}
                  item={item}
                  index={index}
                  isExpanded={false}
                  onToggle={() => {}}
                />
              ))}
            </div>
          </div>

          {/* Mobile Layout - No Card */}
          <div className="md:hidden">
            <div className="fade-in text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-mint">{benefits.title}</span>
              </h2>
              <p className="text-lg text-lavender/80">
                Discover how our solutions can transform your {title.toLowerCase()} into a modern, convenient destination.
              </p>
            </div>
            
            {/* Mobile Collapsible List */}
            <div className="fade-in space-y-2">
              {benefits.items.map((item, index) => (
                <BenefitCard
                  key={index}
                  item={item}
                  index={index}
                  isExpanded={expandedBenefits.has(index)}
                  onToggle={() => toggleBenefit(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Desktop Card Container */}
          <div className="hidden md:block backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
            <div className="fade-in text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-mint">We Understand Your</span>{' '}
                <span className="text-coral">Challenges</span>
              </h2>
              <p className="text-lg text-lavender/80 max-w-3xl mx-auto">
                Every {title.toLowerCase()} faces unique challenges. We've identified the most common pain points and designed solutions specifically for them.
              </p>
            </div>
            
            {/* Desktop Grid */}
            <div className="fade-in grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {painPoints.map((item, index) => (
                <PainPointCard
                  key={index}
                  item={item}
                  index={index}
                  isExpanded={false}
                  onToggle={() => {}}
                />
              ))}
            </div>
          </div>

          {/* Mobile Layout - No Card */}
          <div className="md:hidden">
            <div className="fade-in text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-mint">We Understand Your</span>{' '}
                <span className="text-coral">Challenges</span>
              </h2>
              <p className="text-lg text-lavender/80">
                Every {title.toLowerCase()} faces unique challenges. We've identified the most common pain points and designed solutions specifically for them.
              </p>
            </div>
            
            {/* Mobile Collapsible List */}
            <div className="fade-in space-y-2">
              {painPoints.map((item, index) => (
                <PainPointCard
                  key={index}
                  item={item}
                  index={index}
                  isExpanded={expandedPainPoints.has(index)}
                  onToggle={() => togglePainPoint(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Solutions Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Desktop Card Container */}
          <div className="hidden md:block backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
            <div className="fade-in text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-mint">Tailored Solutions for</span>{' '}
                <span className="text-coral">{title}</span>
              </h2>
              <p className="text-lg text-lavender/80 max-w-3xl mx-auto">
                Our comprehensive solutions are specifically designed to address the unique needs and challenges of your location type.
              </p>
            </div>
            
            {/* Desktop Grid */}
            <div className="fade-in grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {customSolutions.map((item, index) => (
                <CustomSolutionCard
                  key={index}
                  item={item}
                  index={index}
                  isExpanded={false}
                  onToggle={() => {}}
                />
              ))}
            </div>
          </div>

          {/* Mobile Layout - No Card */}
          <div className="md:hidden">
            <div className="fade-in text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-mint">Tailored Solutions for</span>{' '}
                <span className="text-coral">{title}</span>
              </h2>
              <p className="text-lg text-lavender/80">
                Our comprehensive solutions are specifically designed to address the unique needs and challenges of your location type.
              </p>
            </div>
            
            {/* Mobile Collapsible List */}
            <div className="fade-in space-y-2">
              {customSolutions.map((item, index) => (
                <CustomSolutionCard
                  key={index}
                  item={item}
                  index={index}
                  isExpanded={expandedSolutions.has(index)}
                  onToggle={() => toggleSolution(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Smart Store Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
            <div className="fade-in grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <Link to="/solutions/smart-stores">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-mint hover:text-coral transition-colors cursor-pointer">
                    {smartStore.title}
                  </h2>
                </Link>
                <p className="text-lg text-lavender/80 leading-relaxed mb-8">
                  {smartStore.description}
                </p>
                <div className="space-y-4 mb-8">
                  {smartStore.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-mint mr-3 mt-1 flex-shrink-0" />
                      <span className="text-peach/80 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/solutions/smart-stores" 
                    className="inline-flex items-center gap-2 bg-gradient-pastel text-navy px-6 py-3 rounded-full font-semibold hover:shadow-neon transition-all group"
                  >
                    Learn More About Smart Stores
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                  </Link>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-2 border-2 border-mint text-mint px-6 py-3 rounded-full hover:bg-mint/10 transition-all"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <Link to="/solutions/smart-stores">
                  <div className="rounded-lg overflow-hidden shadow-glow shadow-mint/20">
                    <img 
                      src={smartStore.image} 
                      alt={smartStore.title} 
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300 cursor-pointer" 
                      loading="lazy" 
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Micro Market Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
            <div className="fade-in grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Link to="/solutions/micro-markets">
                  <div className="rounded-lg overflow-hidden shadow-glow shadow-mint/20">
                    <img 
                      src={microMarket.image} 
                      alt={microMarket.title} 
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300 cursor-pointer" 
                      loading="lazy" 
                    />
                  </div>
                </Link>
              </div>
              <div>
                <Link to="/solutions/micro-markets">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-mint hover:text-coral transition-colors cursor-pointer">
                    {microMarket.title}
                  </h2>
                </Link>
                <p className="text-lg text-lavender/80 leading-relaxed mb-8">
                  {microMarket.description}
                </p>
                <div className="space-y-4 mb-8">
                  {microMarket.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-mint mr-3 mt-1 flex-shrink-0" />
                      <span className="text-peach/80 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/solutions/micro-markets" 
                    className="inline-flex items-center gap-2 bg-gradient-pastel text-navy px-6 py-3 rounded-full font-semibold hover:shadow-neon transition-all group"
                  >
                    Learn More About Micro Markets
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                  </Link>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-2 border-2 border-mint text-mint px-6 py-3 rounded-full hover:bg-mint/10 transition-all"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Coolers Section - Only if data exists */}
      {smartCoolers && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
              <div className="fade-in grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <Link to="/solutions/smart-coolers">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-mint hover:text-coral transition-colors cursor-pointer">
                      {smartCoolers.title}
                    </h2>
                  </Link>
                  <p className="text-lg text-lavender/80 leading-relaxed mb-8">
                    {smartCoolers.description}
                  </p>
                  <div className="space-y-4 mb-8">
                    {smartCoolers.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-mint mr-3 mt-1 flex-shrink-0" />
                        <span className="text-peach/80 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      to="/solutions/smart-coolers" 
                      className="inline-flex items-center gap-2 bg-gradient-pastel text-navy px-6 py-3 rounded-full font-semibold hover:shadow-neon transition-all group"
                    >
                      Learn More About Smart Coolers
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                    </Link>
                    <Link 
                      to="/contact" 
                      className="inline-flex items-center gap-2 border-2 border-mint text-mint px-6 py-3 rounded-full hover:bg-mint/10 transition-all"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <Link to="/solutions/smart-coolers">
                    <div className="rounded-lg overflow-hidden shadow-glow shadow-mint/20">
                      <img 
                        src={smartCoolers.image} 
                        alt={smartCoolers.title} 
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300 cursor-pointer" 
                        loading="lazy" 
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
            <div className="fade-in text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-mint">Frequently Asked</span>{' '}
                <span className="text-coral">Questions</span>
              </h2>
              <p className="text-lg text-lavender/80 max-w-3xl mx-auto">
                Get answers to common questions about implementing Smart Market Retail solutions in {title.toLowerCase()}.
              </p>
            </div>
            
            <div className="fade-in max-w-4xl mx-auto space-y-4">
              {faq.map((item, index) => (
                <div 
                  key={index} 
                  className="backdrop-blur-sm bg-navy/30 border border-mint/20 rounded-lg overflow-hidden hover:bg-navy/50 transition-all shadow-glow"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-mint/5 transition-colors group"
                    aria-expanded={expandedFAQ === index}
                  >
                    <h3 className={`text-lg md:text-xl font-bold pr-4 transition-colors ${
                      expandedFAQ === index ? 'text-coral' : 'text-mint group-hover:text-coral'
                    }`}>
                      {item.question}
                    </h3>
                    {expandedFAQ === index ? (
                      <ChevronUp className="text-coral" size={24} />
                    ) : (
                      <ChevronDown className="text-coral" size={24} />
                    )}
                  </button>
                  
                  {expandedFAQ === index && (
                    <div className="px-6 pb-6 animate-fade-in">
                      <div className="text-lavender/90 leading-relaxed border-t border-mint/10 pt-6">
                        {item.answer}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
            <div className="fade-in text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-mint">Ready to Transform Your</span>{' '}
                <span className="text-coral">{title}?</span>
              </h2>
              <p className="text-lg text-lavender/80 max-w-3xl mx-auto mb-8 leading-relaxed">
                Let Smart Market Retail bring modern convenience and enhanced satisfaction to your {title.toLowerCase()}. 
                Our solutions are designed specifically for your needs, installed at no cost to you, and fully managed by our team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 bg-gradient-pastel text-navy px-8 py-4 rounded-full font-semibold hover:shadow-neon transition-all group"
                >
                  Request Free Assessment
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
                <Link 
                  to="/solutions" 
                  className="inline-flex items-center gap-2 border-2 border-mint text-mint px-8 py-4 rounded-full hover:bg-mint/10 transition-all"
                >
                  Explore All Solutions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Rotator Component */}
      <div className="fade-in">
        <FAQRotator />
      </div>
      
      {/* Request Assessment Component */}
      <div className="fade-in">
        <RequestAssessment />
      </div>
    </PageLayout>
  );
};

export default LocationTemplatePage;