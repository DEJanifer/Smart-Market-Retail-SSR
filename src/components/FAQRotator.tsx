import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getTopFAQs } from '../data/faqs';

const FAQRotator: React.FC = () => {
  const topFAQs = getTopFAQs();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedFAQs, setDisplayedFAQs] = useState(topFAQs.slice(0, 3));
  const [expandedFAQs, setExpandedFAQs] = useState<Set<string>>(new Set());

  const toggleFAQ = (faqId: string, event: React.MouseEvent) => {
    event.preventDefault();
    const newExpanded = new Set(expandedFAQs);
    if (newExpanded.has(faqId)) {
      newExpanded.delete(faqId);
    } else {
      newExpanded.add(faqId);
    }
    setExpandedFAQs(newExpanded);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % topFAQs.length;
        
        // Update displayed FAQs for rotation
        const newDisplayedFAQs = [];
        for (let i = 0; i < 3; i++) {
          const faqIndex = (newIndex + i) % topFAQs.length;
          newDisplayedFAQs.push(topFAQs[faqIndex]);
        }
        setDisplayedFAQs(newDisplayedFAQs);
        
        return newIndex;
      });
    }, 18000); // Rotate every 18 seconds

    return () => clearInterval(interval);
  }, [topFAQs.length]);

  const truncateAnswer = (answer: string, maxLength: number = 120) => {
    if (answer.length <= maxLength) return answer;
    return answer.slice(0, maxLength).trim() + '...';
  };

  return (
    <div className="py-12 bg-navy/30 backdrop-blur-sm border-t border-b border-mint/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-mint">Frequently Asked</span>{' '}
            <span className="text-coral">Questions</span>
          </h2>
          <p className="text-lg text-lavender/80 max-w-3xl mx-auto">
            Get quick answers to the most common questions about our Smart Market solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedFAQs.map((faq, index) => {
            const isExpanded = expandedFAQs.has(faq.id);
            return (
              <div
                key={`${faq.id}-${currentIndex}-${index}`}
                className="bg-navy/50 border border-mint/20 rounded-lg p-6 hover:bg-navy/70 transition-all duration-500 animate-fade-in shadow-glow shadow-mint/10 group card-interactive"
              >
                <div 
                  className="md:hidden cursor-pointer"
                  onClick={(e) => toggleFAQ(faq.id, e)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-mint leading-tight group-hover:text-coral transition-colors">
                      {faq.question}
                    </h3>
                    <div className="ml-2 flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-mint" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-mint" />
                      )}
                    </div>
                  </div>
                  <div className={`mt-3 ${isExpanded ? 'block' : 'hidden'}`}>
                    <p className="text-lavender/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
                
                <Link
                  to={`/faq#${faq.id}`}
                  className="hidden md:block"
                >
                  <h3 className="text-lg font-bold text-mint mb-3 leading-tight group-hover:text-coral transition-colors">
                    {faq.question}
                  </h3>
                  <p className="text-lavender/80 leading-relaxed">
                    {truncateAnswer(faq.answer)}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link 
            to="/faq" 
            className="inline-flex items-center gap-2 btn-primary-interactive group"
          >
            View All FAQs
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQRotator;