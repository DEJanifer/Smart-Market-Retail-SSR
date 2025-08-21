import React, { useState } from 'react';
import { ShoppingBag, Coffee, Settings, Shield, Users, Building, ChevronDown, ChevronUp } from 'lucide-react';

const services = [
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

const ServicesList: React.FC = () => {
    const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

    const toggleCard = (index: number) => {
        const newExpanded = new Set(expandedCards);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedCards(newExpanded);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => {
                const isExpanded = expandedCards.has(index);
                return (
                    <div 
                        key={index} 
                        className="backdrop-blur-sm bg-navy/30 p-6 rounded-lg border border-mint/20 hover:border-mint/40 transition-all group cursor-pointer md:cursor-default"
                        onClick={() => toggleCard(index)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="p-3 bg-gradient-pastel rounded-lg w-12 h-12 flex items-center justify-center mr-4 text-navy group-hover:shadow-neon transition-all">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-mint group-hover:text-coral transition-colors">{service.title}</h3>
                            </div>
                            <div className="md:hidden">
                                {isExpanded ? (
                                    <ChevronUp className="w-5 h-5 text-mint" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-mint" />
                                )}
                            </div>
                        </div>
                        <div className={`mt-4 md:mt-0 md:block ${isExpanded ? 'block' : 'hidden md:block'}`}>
                            <p className="text-peach/80 leading-relaxed md:mt-4">{service.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ServicesList;