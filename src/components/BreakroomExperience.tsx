import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Salad, Coffee, Cookie, ChevronDown, ChevronUp } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  text: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, text, icon, isExpanded, onToggle, isMobile }) => {
  if (isMobile) {
    return (
      <div className="backdrop-blur-sm border border-mint/20 rounded-lg overflow-hidden">
        {/* Mobile Collapsible Header */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-mint/5 transition-colors"
        >
          <div className="flex items-center">
            <div className="p-3 bg-gradient-pastel rounded-lg w-12 h-12 flex items-center justify-center mr-4 text-navy">
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-mint">{title}</h3>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-coral flex-shrink-0" />
          ) : (
            <ChevronDown className="h-5 w-5 text-coral flex-shrink-0" />
          )}
        </button>

        {/* Mobile Collapsible Content */}
        {isExpanded && (
          <div className="border-t border-mint/20 p-4">
            <p className="text-peach/80 leading-relaxed">{text}</p>
          </div>
        )}
      </div>
    );
  }

  // Desktop version
  return (
    <div className="flex flex-col p-4 md:p-6 backdrop-blur-sm bg-navy/30 border border-mint/20 rounded-lg hover:border-mint/40 transition-all group">
      <div className="p-3 bg-gradient-pastel rounded-lg w-12 h-12 flex items-center justify-center mb-4 text-navy transition-all duration-300 group-hover:shadow-neon">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-mint group-hover:text-coral transition-colors mb-3">
        {title}
      </h3>
      <p className="text-peach/80 leading-relaxed">
        {text}
      </p>
    </div>
  );
};

const BreakroomExperience: React.FC = () => {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  const toggleFeature = (index: number) => {
    setExpandedFeature(expandedFeature === index ? null : index);
  };

  const features = [
    {
      title: 'Boost Morale & Productivity',
      text: 'A great company culture starts with great perks. Our breakroom solutions keep your team energized and focused throughout the day.',
      icon: <TrendingUp size={24} />
    },
    {
      title: 'Fresh & Healthy Options',
      text: 'From crisp salads and sandwiches to fresh fruit and yogurt, we provide a wide array of nutritious choices for your team.',
      icon: <Salad size={24} />
    },
    {
      title: 'Gourmet Coffee & Beverages',
      text: 'Elevate your coffee game with premium brewers and a curated selection of gourmet coffees and teas.',
      icon: <Coffee size={24} />
    },
    {
      title: 'Indulgent Snacks & Treats',
      text: 'Sometimes you just need a treat. We offer a wide selection of classic candies, chips, and pastries to satisfy every craving.',
      icon: <Cookie size={24} />
    }
  ];

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Desktop Content Container */}
          <div className="hidden md:block backdrop-blur-md bg-navy/40 border border-mint/20 rounded-2xl p-6 md:p-10 shadow-glow">
            {/* Color-coded Heading */}
            <h2 className="text-4xl lg:text-5xl font-bold text-center mb-8">
              <span className="text-mint">Elevate Your</span>{' '}
              <span className="text-coral">Breakroom Experience</span>
            </h2>

            {/* Image directly below H2 */}
            <div className="mb-8">
              <img
                src="/Large Micro Market 05_medium.webp"
                alt="Large micro market installation in modern office breakroom with fresh food options, beverages, and smart vending technology serving Carroll County and Baltimore County Maryland employees"
                className="w-full rounded-xl border border-white/10 shadow-2xl"
                loading="lazy"
                width="800"
                height="600"
              />
            </div>

            {/* Intro Paragraph */}
            <p className="text-lg text-lavender/80 leading-relaxed text-center mb-12 max-w-4xl mx-auto">
              Transform your office breakroom, lobby, or communal space into a modern, convenient, and inviting space that your employees and guests will love. With our Micro Market and Smart Vending Solutions, we can offer a wide variety of fresh and healthy options, gourmet coffee, and delicious snacks, all available 24/7.
            </p>

            {/* Feature Cards Grid - Desktop */}
            <div className="hidden md:grid sm:grid-cols-2 gap-6 mb-12">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  title={feature.title}
                  text={feature.text}
                  icon={feature.icon}
                  isExpanded={false}
                  onToggle={() => {}}
                  isMobile={false}
                />
              ))}
            </div>
            
            {/* Call to Action Section - Desktop */}
            <div className="text-center border-t border-mint/20 pt-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="text-mint">Ready to Transform Your</span> <span className="text-coral">Breakroom?</span>
              </h3>
              <p className="text-base md:text-lg text-lavender/80 mb-4 leading-relaxed max-w-4xl mx-auto">
                Turn your outdated breakroom into a modern amenity that attracts talent and boosts employee satisfaction. Our Micro Markets and Smart Vending solutions bring fresh food, healthy options, and gourmet coffee right to your workplace—creating a space your team will actually want to use.
              </p>
              <p className="text-base md:text-lg text-peach font-semibold mb-6">
                Enhance your workplace culture with Smart Market Retail.
              </p>
              <Link 
                to="/contact" 
                className="inline-block bg-gradient-pastel text-navy px-8 py-3 rounded-full font-semibold hover:shadow-neon transition-all"
              >
                Start Your Transformation
              </Link>
            </div>
          </div>

          {/* Mobile Layout - No Card */}
          <div className="md:hidden">
            {/* Color-coded Heading */}
            <h2 className="text-4xl lg:text-5xl font-bold text-center mb-8">
              <span className="text-mint">Elevate Your</span>{' '}
              <span className="text-coral">Breakroom Experience</span>
            </h2>

            {/* Image directly below H2 */}
            <div className="mb-8">
              <img
                src="/Large Micro Market 05_medium.webp"
                alt="Large micro market installation in modern office breakroom with fresh food options, beverages, and smart vending technology serving Carroll County and Baltimore County Maryland employees"
                className="w-full rounded-xl border border-white/10 shadow-2xl"
                loading="lazy"
                width="800"
                height="600"
              />
            </div>

            {/* Intro Paragraph */}
            <p className="text-lg text-lavender/80 leading-relaxed text-center mb-12 max-w-4xl mx-auto">
              Transform your office breakroom, lobby, or communal space into a modern, convenient, and inviting space that your employees and guests will love. With our Micro Market and Smart Vending Solutions, we can offer a wide variety of fresh and healthy options, gourmet coffee, and delicious snacks, all available 24/7.
            </p>

            {/* Feature Cards List - Mobile */}
            <div className="space-y-2 mb-12">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  title={feature.title}
                  text={feature.text}
                  icon={feature.icon}
                  isExpanded={expandedFeature === index}
                  onToggle={() => toggleFeature(index)}
                  isMobile={true}
                />
              ))}
            </div>

            {/* Call to Action Section - Mobile */}
            <div className="text-center border-t border-mint/20 pt-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                <span className="text-mint">Ready to Transform Your</span> <span className="text-coral">Breakroom?</span>
              </h3>
              <p className="text-base md:text-lg text-lavender/80 mb-4 leading-relaxed max-w-4xl mx-auto">
                Turn your outdated breakroom into a modern amenity that attracts talent and boosts employee satisfaction. Our Micro Markets and Smart Vending solutions bring fresh food, healthy options, and gourmet coffee right to your workplace—creating a space your team will actually want to use.
              </p>
              <p className="text-base md:text-lg text-peach font-semibold mb-6">
                Enhance your workplace culture with Smart Market Retail.
              </p>
              <Link 
                to="/contact" 
                className="inline-block bg-gradient-pastel text-navy px-8 py-3 rounded-full font-semibold hover:shadow-neon transition-all"
              >
                Start Your Transformation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreakroomExperience;