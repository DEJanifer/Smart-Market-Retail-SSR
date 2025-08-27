import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Link as LinkIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { faqs, getFAQsByCategory } from '../data/faqs';

const FAQPage: React.FC = () => {
  const [openFAQs, setOpenFAQs] = useState<Set<string>>(new Set());
  const [copySuccess, setCopySuccess] = useState<string>('');
  const location = useLocation();

  // Handle hash-based FAQ opening and scrolling
  useEffect(() => {
    const hash = location.hash.substring(1); // Remove the '#'
    if (hash) {
      // Open the FAQ if it matches the hash
      setOpenFAQs(prev => new Set([...prev, hash]));
      
      // Scroll to the FAQ after a short delay to ensure it's rendered
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.hash]);

  const toggleFAQ = (id: string) => {
    setOpenFAQs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const copyFAQLink = async (faqId: string) => {
    const url = `${window.location.origin}/faq#${faqId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(faqId);
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const generateFAQSchema = () => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    return (
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    );
  };

  const categories = [
    { key: 'general' as const, title: 'General Information', description: 'Learn about Smart Market Retail and our service areas' },
    { key: 'solutions' as const, title: 'Our Solutions', description: 'Micro Markets, Smart Stores, and vending technology' },
    { key: 'process' as const, title: 'Process & Support', description: 'Installation, maintenance, and ongoing support' },
    { key: 'products' as const, title: 'Products & Customization', description: 'Product offerings and customization options' }
  ];

    console.log("FAQPage: Component rendering."); // Check if component renders at all
    console.log("FAQPage: Total FAQs loaded:", faqs.length); // Check if faqs array has data


  return (
    <PageLayout
      title="Frequently Asked Questions (FAQ) | Smart Market Retail | Micro Markets & Smart Stores in Carroll & Baltimore County, MD"
      description="Find answers about Smart Market Retail's Micro Markets, Smart Stores, vending, coffee service, installation, pricing, service, and payments. Serving Carroll & Baltimore County, MD."
      keywords="FAQ, frequently asked questions, micro markets, smart stores, vending, office coffee, installation, service, cashless payments, Carroll County, Baltimore County"
    >
      {generateFAQSchema()}
      
      <link rel="canonical" href="https://smartmarketretail.com/faq" />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-mint">Frequently Asked</span>{' '}
              <span className="text-coral">Questions</span>
            </h1>
            <p className="text-xl md:text-2xl text-lavender/80 max-w-4xl mx-auto leading-relaxed">
              Get answers to the most common questions about our Smart Market solutions, 
              installation process, and services throughout Carroll and Baltimore County, Maryland.
            </p>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            {categories.map(category => {
              const categoryFAQs = getFAQsByCategory(category.key);
              console.log(`FAQPage: Category "${category.key}" has ${categoryFAQs.length} FAQs.`); // Check FAQs per category

              return (
                <div key={category.key} className="mb-16">
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-mint mb-4">
                      {category.title}
                    </h2>
                    <p className="text-lg text-lavender/80">
                      {category.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {categoryFAQs.map(faq => {
                      console.log(`FAQPage: Rendering FAQ ID: ${faq.id}, Question: ${faq.question.substring(0, 30)}...`); // Check individual FAQ rendering
                      return (
                        <div 
                          key={faq.id}
                          id={faq.id}
                          className="bg-navy/50 border border-mint/20 rounded-lg overflow-hidden hover:bg-navy/70 transition-colors scroll-mt-24"
                        >
                          <button
                            onClick={() => toggleFAQ(faq.id)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-mint/5 transition-colors group"
                            aria-expanded={openFAQs.has(faq.id)}
                          >
                            <h3 className={`text-lg md:text-xl font-bold pr-4 transition-colors ${
                              openFAQs.has(faq.id) ? 'text-coral' : 'text-mint group-hover:text-coral'
                            }}`}>
                              {faq.question}
                            </h3>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyFAQLink(faq.id);
                                }}
                                className="p-1 hover:bg-mint/20 rounded transition-colors"
                                title="Copy link to this FAQ"
                              >
                                <LinkIcon 
                                  className={`flex-shrink-0 ${copySuccess === faq.id ? 'text-green-400' : 'text-coral hover:text-mint'}`} 
                                  size={18} 
                                />
                              </button>
                              {openFAQs.has(faq.id) ? (
                                <ChevronUp className="text-coral flex-shrink-0" size={24} />
                              ) : (
                                <ChevronDown className="text-coral flex-shrink-0" size={24} />
                              )}
                            </div>
                          </button>
                          
                          {openFAQs.has(faq.id) && (
                            <div className="px-6 pb-6 animate-fade-in">
                              <div className="text-lavender/90 leading-relaxed border-t border-mint/10 pt-4">
                                {faq.answer}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Explore Solutions Section */}
        <section className="py-12 bg-navy/50 backdrop-blur-sm border-t border-b border-mint/20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-mint">Explore Our</span>{' '}
                <span className="text-coral">Solutions</span>
              </h2>
              <p className="text-lg text-lavender/80 max-w-3xl mx-auto">
                Ready to transform your space? Learn more about our innovative vending and market solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Micro Markets', path: '/solutions/micro-markets', description: 'Open-concept retail spaces' },
                { title: 'Smart Stores', path: '/solutions/smart-store', description: 'Intelligent grab-and-go technology' },
                { title: 'Smart Coolers', path: '/solutions/smart-coolers', description: 'Refrigerated vending solutions' },
                { title: 'Smart Vending', path: '/solutions/smart-vending', description: 'Modern vending machines' }
              ].map((solution, index) => (
                <Link
                  key={index}
                  to={solution.path}
                  className="bg-navy/50 border border-mint/20 rounded-lg p-6 hover:bg-navy/70 transition-colors group"
                >
                  <h3 className="text-xl font-bold text-mint mb-2 group-hover:text-coral transition-colors">
                    {solution.title}
                  </h3>
                  <p className="text-lavender/80">
                    {solution.description}
                  </p>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 btn-primary-interactive group"
              >
                Get Your Free Consultation
                <ChevronDown className="group-hover:translate-x-1 transition-transform rotate-[-90deg]" size={18} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default FAQPage;