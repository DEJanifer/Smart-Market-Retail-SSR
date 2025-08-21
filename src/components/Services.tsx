import React, { useState } from 'react';
import { ShoppingBag, Coffee, Settings, Shield, Users, Building, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, isExpanded, onToggle, isMobile }) => {
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
            <p className="text-peach/80 leading-relaxed">{description}</p>
          </div>
        )}
      </div>
    );
  }

  // Desktop version
  return (
    <div className="backdrop-blur-sm bg-navy/30 p-6 rounded-lg border border-mint/20 card-interactive hover:border-mint/40 group">
      <div className="p-3 bg-gradient-pastel rounded-lg w-12 h-12 flex items-center justify-center mb-4 text-navy transition-interactive duration-300 group-hover:shadow-neon-intense">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-mint group-hover:text-coral transition-interactive duration-200">{title}</h3>
      <p className="text-peach/80 leading-relaxed">{description}</p>
    </div>
  );
};

const Solutions: React.FC = () => {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const toggleService = (index: number) => {
    setExpandedService(expandedService === index ? null : index);
  };

  const solutions = [
    {
      title: "Product Selection",
      description: "We tailor our product offerings to your audience—featuring a curated range of snacks, beverages, fresh food, and premium items that align with your location's unique needs.",
      icon: <ShoppingBag size={24} />
    },
    {
      title: "Smart Machines & Micro Markets",
      description: "Our sleek, Smart Stores and Micro Markets are equipped with real-time inventory tracking and remote diagnostics—ensuring optimal performance with minimal downtime.",
      icon: <Coffee size={24} />
    },
    {
      title: "Maintenance & Stocking",
      description: "We handle everything from replenishment to repairs with proactive servicing that keeps your machines clean, full, and fully operational.",
      icon: <Settings size={24} />
    },
    {
      title: "Quality Assurance",
      description: "We uphold high standards for product freshness, equipment cleanliness, and user satisfaction—because your reputation matters, and so does ours.",
      icon: <Shield size={24} />
    },
    {
      title: "Customer Support",
      description: "We are committed and ready to address any issues quickly, providing seamless service for both you and your users.",
      icon: <Users size={24} />
    },
    {
      title: "Location Analysis",
      description: "Using data-driven insights, we identify the best placement strategy to maximize visibility, engagement, and product availability.",
      icon: <Building size={24} />
    }
  ];

  return (
    <section id="solutions" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Desktop Card Container */}
        <div className="hidden md:block backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-mint">Our</span> <span className="text-coral">Services</span>
            </h2>
            <p className="text-lg text-lavender/80 max-w-3xl mx-auto">
              Smart Market Retail offers end-to-end Unattended Retail solutions designed to enhance convenience, increase satisfaction, and fit seamlessly into your space. We combine advanced smart vending technology, curated products, and proactive service to deliver a smarter vending experience.
            </p>
          </div>
          
          {/* Desktop Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {solutions.map((solution, index) => (
              <ServiceCard 
                key={index} 
                title={solution.title} 
                description={solution.description} 
                icon={solution.icon}
                isExpanded={false}
                onToggle={() => {}}
                isMobile={false}
              />
            ))}
          </div>

          {/* Ready to Upgrade Section */}
          <div className="text-center border-t border-mint/20 pt-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="text-mint">Ready to Upgrade Your</span> <span className="text-coral">Communal Space?</span>
            </h3>
            <p className="text-lg text-lavender/80 mb-4 max-w-4xl mx-auto">
              Contact Smart Market Retail today to bring intelligent, self-serve convenience to your location—at no cost to you.
            </p>
            <p className="text-lg text-peach font-semibold mb-6 max-w-4xl mx-auto">
              Smarter vending, zero hassle—designed to serve your space and satisfy your people.
            </p>
            <Link 
              to="/contact" 
              className="btn-primary-interactive"
            >
              Inquire with Us Today
            </Link>
          </div>
        </div>

        {/* Mobile Layout - No Card */}
        <div className="md:hidden">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-mint">Our</span> <span className="text-coral">Services</span>
            </h2>
            <p className="text-lg text-lavender/80">
              Smart Market Retail offers end-to-end Unattended Retail solutions designed to enhance convenience, increase satisfaction, and fit seamlessly into your space. We combine advanced smart vending technology, curated products, and proactive service to deliver a smarter vending experience.
            </p>
          </div>
          
          {/* Mobile Collapsible List */}
          <div className="space-y-2 mb-12">
            {solutions.map((solution, index) => (
              <ServiceCard 
                key={index} 
                title={solution.title} 
                description={solution.description} 
                icon={solution.icon}
                isExpanded={expandedService === index}
                onToggle={() => toggleService(index)}
                isMobile={true}
              />
            ))}
          </div>

          {/* Ready to Upgrade Section - Mobile */}
          <div className="text-center border-t border-mint/20 pt-8">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-mint">Ready to Upgrade Your</span> <span className="text-coral">Communal Space?</span>
            </h3>
            <p className="text-lg text-lavender/80 mb-4">
              Contact Smart Market Retail today to bring intelligent, self-serve convenience to your location—at no cost to you.
            </p>
            <p className="text-lg text-peach font-semibold mb-6">
              Smarter vending, zero hassle—designed to serve your space and satisfy your people.
            </p>
            <Link 
              to="/contact" 
              className="btn-primary-interactive"
            >
              Inquire with Us Today
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;