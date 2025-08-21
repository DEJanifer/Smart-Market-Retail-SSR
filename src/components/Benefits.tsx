import React, { useState } from 'react';
import { DollarSign, Users, Star, Package, Settings, Building, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Benefits: React.FC = () => {
  const [expandedBenefit, setExpandedBenefit] = useState<number | null>(null);

  const toggleBenefit = (index: number) => {
    setExpandedBenefit(expandedBenefit === index ? null : index);
  };

  const benefits = [
    {
      icon: <DollarSign className="h-6 w-6 text-coral" />,
      title: 'Zero Upfront Costs',
      text: 'We install, stock, and maintain all equipment at no charge to you—no capital investment or ongoing expenses required.'
    },
    {
      icon: <Users className="h-6 w-6 text-coral" />,
      title: 'Increased Tenant Satisfaction',
      text: 'Give residents, employees, or guests instant access to snacks, drinks, and essentials without leaving the property.'
    },
    {
      icon: <Star className="h-6 w-6 text-coral" />,
      title: 'Premium On-Site Amenity',
      text: 'Elevate your building\'s appeal with smart, self-service options that reflect a modern, tech-forward environment.'
    },
    {
      icon: <Package className="h-6 w-6 text-coral" />,
      title: 'Customizable Product Offerings',
      text: 'We tailor each machine or market\'s selection to suit your audience—healthy options, local favorites, and everyday essentials.'
    },
    {
      icon: <Settings className="h-6 w-6 text-coral" />,
      title: 'Fully Managed Operations',
      text: 'We handle restocking, maintenance, and service through real-time monitoring—eliminating hassle and minimizing disruptions.'
    },
    {
      icon: <Building className="h-6 w-6 text-coral" />,
      title: 'Space-Efficient & Scalable',
      text: 'Our modular designs fit virtually any location and can easily grow with your property\'s needs.'
    }
  ];

  const BenefitCard: React.FC<{
    benefit: typeof benefits[0];
    isExpanded: boolean;
    onToggle: () => void;
    isMobile: boolean;
  }> = ({ benefit, isExpanded, onToggle, isMobile }) => {
    if (isMobile) {
      return (
        <div className="backdrop-blur-sm border border-mint/20 rounded-lg overflow-hidden">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-mint/5 transition-colors"
          >
            <div className="flex items-center">
              <div className="mr-3 flex-shrink-0">
                {benefit.icon}
              </div>
              <h4 className="text-lg font-semibold text-mint">{benefit.title}</h4>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-coral flex-shrink-0" />
            ) : (
              <ChevronDown className="h-5 w-5 text-coral flex-shrink-0" />
            )}
          </button>

          {isExpanded && (
            <div className="border-t border-mint/20 p-4">
              <p className="text-peach/80 leading-relaxed">{benefit.text}</p>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex flex-col p-4 md:p-6 backdrop-blur-sm bg-navy/30 border border-mint/20 rounded-lg hover:border-mint/40 transition-all group">
        <div className="flex items-center mb-3">
          <div className="mr-3 flex-shrink-0">
            {benefit.icon}
          </div>
          <h4 className="text-lg font-semibold text-mint group-hover:text-coral transition-colors">{benefit.title}</h4>
        </div>
        <p className="text-peach/80 text-sm md:text-base leading-relaxed">{benefit.text}</p>
      </div>
    );
  };

  return (
    <div className="flex flex-col p-4 md:p-6 backdrop-blur-sm bg-navy/30 border border-mint/20 rounded-lg card-interactive hover:border-mint/40 group">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Desktop Card Container */}
        <div className="hidden md:block backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              <span className="text-mint">Benefits for Property Owners &</span> <span className="text-coral">Managers</span>
            </h2>
            <p className="text-base md:text-lg text-lavender/80 mb-6 leading-relaxed max-w-4xl mx-auto">
              Enhance your property with modern, no-cost vending solutions that increase convenience, add value, and require zero effort on your end.
            </p>
          </div>
          
          {/* Desktop Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8 md:mb-12">
            {benefits.map((benefit, index) => (
              <BenefitCard 
                key={index}
                benefit={benefit}
                isExpanded={false}
                onToggle={() => {}}
                isMobile={false}
              />
            ))}
          </div>
          
          {/* Call to Action - Updated to match Services section style */}
          <div className="text-center border-t border-mint/20 pt-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="text-mint">Ready to Upgrade Your</span> <span className="text-coral">Property?</span>
            </h3>
            <p className="text-base md:text-lg text-lavender/80 mb-4 leading-relaxed max-w-4xl mx-auto">
              With Smart Market Retail, you gain a valuable, turnkey amenity that improves satisfaction, enhances property image, and requires no extra work from your team.
            </p>
            <p className="text-base md:text-lg text-peach font-semibold mb-6">
              Let us bring frictionless vending to your property—contact us today to get started.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-gradient-pastel text-navy px-8 py-3 rounded-full font-semibold hover:shadow-neon transition-all"
            >
              Contact Us Today
            </Link>
          </div>
        </div>

        {/* Mobile Layout - No Card */}
        <div className="md:hidden">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-mint">Benefits for Property Owners &</span> <span className="text-coral">Managers</span>
            </h2>
            <p className="text-base text-lavender/80 mb-6 leading-relaxed">
              Enhance your property with modern, no-cost vending solutions that increase convenience, add value, and require zero effort on your end.
            </p>
          </div>
          
          {/* Mobile Collapsible List */}
          <div className="space-y-2 mb-8">
            {benefits.map((benefit, index) => (
              <BenefitCard 
                key={index}
                benefit={benefit}
                isExpanded={expandedBenefit === index}
                onToggle={() => toggleBenefit(index)}
                isMobile={true}
              />
            ))}
          </div>
          
          {/* Call to Action - Mobile version matching Services section style */}
          <div className="text-center border-t border-mint/20 pt-8">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-mint">Ready to Upgrade Your</span> <span className="text-coral">Property?</span>
            </h3>
            <p className="text-base text-lavender/80 mb-4 leading-relaxed">
              With Smart Market Retail, you gain a valuable, turnkey amenity that improves satisfaction, enhances property image, and requires no extra work from your team.
            </p>
            <p className="text-base text-peach font-semibold mb-6">
              Let us bring frictionless vending to your property—contact us today to get started.
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-gradient-pastel text-navy px-8 py-3 rounded-full font-semibold hover:shadow-neon transition-all"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;