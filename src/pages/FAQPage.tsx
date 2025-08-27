import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Link as LinkIcon, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { faqs, getFAQsByCategory } from '../data/faqs';

const FAQPage: React.FC = () => {
  const [openFAQs, setOpenFAQs] = useState<Set<string>>(new Set());
  const [copySuccess, setCopySuccess] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const location = useLocation();

  // Handle hash-based FAQ opening and scrolling
  useEffect(() => {
    const hash = location.hash.substring(1);
    if (hash) {
      setOpenFAQs(prev => new Set([...prev, hash]));
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

  // Filter FAQs based on search and category
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { key: 'all', title: 'All Questions', count: faqs.length },
    { key: 'general' as const, title: 'General', count: getFAQsByCategory('general').length },
    { key: 'solutions' as const, title: 'Solutions', count: getFAQsByCategory('solutions').length },
    { key: 'process' as const, title: 'Process', count: getFAQsByCategory('process').length },
    { key: 'products' as const, title: 'Products', count: getFAQsByCategory('products').length }
  ];

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

  return (
    <PageLayout
      title="Frequently Asked Questions (FAQ) | Smart Market Retail | Micro Markets & Smart Stores in Carroll & Baltimore County, MD"
      description="Find answers about Smart Market Retail's Micro Markets, Smart Stores, vending, coffee service, installation, pricing, service, and payments. Serving Carroll & Baltimore County, MD."
      keywords="FAQ, frequently asked questions, micro markets, smart stores, vending, office coffee, installation, service, cashless payments, Carroll County, Baltimore County"
    >
      {generateFAQSchema()}
      <link rel="canonical" href="https://smartmarketretail.com/faq" />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-mint">Frequently Asked</span>{' '}
                <span className="text-coral">Questions</span>
              </h1>
              <p className="text-xl md:text-2xl text-lavender/80 leading-relaxed mb-8">
                Get answers to the most common questions about our Smart Market solutions, 
                installation process, and services throughout Carroll and Baltimore County, Maryland.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-mint/60" size={20} />
                <input
                  type="text"
                  placeholder="Search frequently asked questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-navy/60 border border-mint/20 rounded-lg text-lavender placeholder-lavender/60 focus:outline-none focus:border-coral transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-4 py-8">
        <div className="backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-xl p-6 shadow-glow">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeCategory === category.key
                    ? 'bg-mint text-navy shadow-neon'
                    : 'bg-navy/60 text-mint border border-mint/20 hover:bg-mint/10'
                }`}
              >
                {category.title} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-xl p-8 shadow-glow text-center">
              <p className="text-xl text-lavender/80">
                No FAQs found matching your search. Try different keywords or browse all categories.
              </p>
            </div>
          ) : (
            filteredFAQs.map(faq => (
              <div 
                key={faq.id}
                id={faq.id}
                className="backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-xl overflow-hidden hover:bg-navy/60 transition-all shadow-glow scroll-mt-24"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-mint/5 transition-colors group"
                  aria-expanded={openFAQs.has(faq.id)}
                >
                  <h3 className={`text-lg md:text-xl font-bold pr-4 transition-colors ${
                    openFAQs.has(faq.id) ? 'text-coral' : 'text-mint group-hover:text-coral'
                  }`}>
                    {faq.question}
                  </h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyFAQLink(faq.id);
                      }}
                      className="p-2 hover:bg-mint/20 rounded-lg transition-colors"
                      title="Copy link to this FAQ"
                    >
                      <LinkIcon 
                        className={`${copySuccess === faq.id ? 'text-green-400' : 'text-coral hover:text-mint'}`} 
                        size={18} 
                      />
                    </button>
                    {openFAQs.has(faq.id) ? (
                      <ChevronUp className="text-coral" size={24} />
                    ) : (
                      <ChevronDown className="text-coral" size={24} />
                    )}
                  </div>
                </button>
                
                {openFAQs.has(faq.id) && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <div className="text-lavender/90 leading-relaxed border-t border-mint/10 pt-6">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 pb-16">
        <div className="backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 md:p-12 shadow-glow">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-mint">Still Have</span>{' '}
              <span className="text-coral">Questions?</span>
            </h2>
            <p className="text-lg text-lavender/80 mb-8 leading-relaxed">
              Can't find what you're looking for? Our team is here to help. 
              Get in touch for personalized answers and a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center gap-2 bg-gradient-pastel text-navy px-8 py-4 rounded-full font-semibold hover:shadow-neon transition-all group"
              >
                Contact Us Today
                <ChevronDown className="group-hover:translate-x-1 transition-transform rotate-[-90deg]" size={18} />
              </Link>
              <Link 
                to="/solutions" 
                className="inline-flex items-center justify-center gap-2 border-2 border-mint text-mint px-8 py-4 rounded-full hover:bg-mint/10 transition-all"
              >
                Explore Our Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="backdrop-blur-sm bg-navy/40 border border-mint/20 rounded-2xl p-8 shadow-glow">
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
              { 
                title: 'Micro Markets', 
                path: '/solutions/micro-markets', 
                description: 'Open-concept retail spaces with fresh food and snacks'
              },
              { 
                title: 'Smart Stores', 
                path: '/solutions/smart-store', 
                description: 'Intelligent grab-and-go technology with AI checkout'
              },
              { 
                title: 'Smart Coolers', 
                path: '/solutions/smart-coolers', 
                description: 'Refrigerated vending solutions for beverages'
              },
              { 
                title: 'Smart Vending', 
                path: '/solutions/smart-vending', 
                description: 'Modern vending machines with cashless payments'
              }
            ].map((solution, index) => (
              <Link
                key={index}
                to={solution.path}
                className="bg-navy/60 border border-mint/20 rounded-xl p-6 hover:bg-navy/80 hover:border-coral/40 transition-all group hover-scale"
              >
                <h3 className="text-xl font-bold text-mint mb-3 group-hover:text-coral transition-colors">
                  {solution.title}
                </h3>
                <p className="text-lavender/80 leading-relaxed">
                  {solution.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default FAQPage;