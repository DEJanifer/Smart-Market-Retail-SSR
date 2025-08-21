import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RequestAssessment: React.FC = () => {
  return (
    <div className="py-12 bg-navy/50 backdrop-blur-sm border-t border-b border-mint/20">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          <span className="text-mint">Ready to enhance your</span>{' '}
          <span className="text-coral">location?</span>
        </h3>
        <p className="text-lg text-lavender/80 mb-6 max-w-2xl mx-auto">
          Let Smart Market Retail transform your communal space into a modern amenity your team or guests will truly appreciate.
        </p>
        <Link 
          to="/contact" 
          className="inline-flex items-center gap-2 btn-primary-interactive group"
        >
          Contact Us Today to Get Started
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
        </Link>
      </div>
    </div>
  );
};

export default RequestAssessment;