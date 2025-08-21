import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { locationTypes } from './locationData';
import { allTowns } from './serviceAreaData'; // Correctly imports 'allTowns'
import { Home, Zap, Star, Settings, MapPin, Info, Mail, Newspaper, Building, Briefcase, ChevronDown, ChevronRight, ShoppingCart, Refrigerator, Coffee, Building2, HelpCircle } from 'lucide-react';

// A reusable component for creating collapsible sections in the sitemap.
const CollapsibleSection: React.FC<{
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  initialOpen?: boolean;
}> = ({
  title,
  icon: Icon,
  children,
  initialOpen = false
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  // --- FIX ---
  // The alignment class was changed from 'justify-between' to 'justify-start' for the button.
  // A 'text-left' class was added to the title div to handle text wrapping.
  return <div>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-start text-lg font-semibold text-mint mb-3 hover:text-coral transition-colors duration-300">
        <div className="flex items-center text-left">
          <Icon className="mr-2 h-5 w-5 flex-shrink-0" /> {title}
        </div>
        <div className="ml-auto">
            {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </div>
      </button>
      {isOpen && <ul className="space-y-2 pl-7 border-l-2 border-navy/50 ml-2">
          {children}
        </ul>}
    </div>;
};
const VisualSitemap: React.FC = () => {
  const location = useLocation();

  // Defines the sections within the "Home" category.
  const homeSections = [{
    name: 'SMART MARKET RETAIL',
    hash: '#hero',
    icon: Zap,
    activeOn: ['/']
  }, {
    name: 'Future of Vending',
    hash: '#about',
    icon: Info,
    activeOn: ['/about']
  }, {
    name: 'Property Benefits',
    hash: '#benefits',
    icon: Star,
    activeOn: []
  }, {
    name: 'Our Services',
    hash: '#services',
    icon: Settings,
    activeOn: []
  }, {
    name: 'Where We Operate',
    hash: '#locations',
    icon: MapPin,
    activeOn: ['/locations']
  }];

  // Defines the links for the "Our Solutions" category.
  const solutionLinks = [{
    name: 'Smart Stores',
    path: '/solutions/smart-stores',
    icon: ShoppingCart
  }, {
    name: 'Micro Markets',
    path: '/solutions/micro-markets',
    icon: Building2
  }, {
    name: 'Smart Coolers',
    path: '/solutions/smart-coolers',
    icon: Refrigerator
  }, {
    name: 'Smart Traditional Vending',
    path: '/solutions/smart-vending',
    icon: Coffee
  }];
  return <div className="backdrop-blur-sm bg-navy/40 p-6 rounded-lg border border-mint/20 shadow-glow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        <span className="text-mint">Site</span> <span className="text-coral">Navigation</span>
      </h2>
      <div className="h-0.5 bg-gradient-to-r from-transparent via-coral via-lavender to-mint opacity-80 mb-4"></div>
      <div className="flex flex-col space-y-4">
        
        <CollapsibleSection title="Home" icon={Home}>
          {homeSections.map(section => <li key={section.name}>
              <a href={`/${section.hash}`} className={`text-sm flex items-center transition-colors duration-300 ${section.activeOn.includes(location.pathname) ? 'text-coral' : 'text-lavender hover:text-coral'}`}>
                <section.icon className="mr-3 h-4 w-4" />
                {section.name}
              </a>
            </li>)}
        </CollapsibleSection>

        <CollapsibleSection title="Our Solutions" icon={Briefcase}>
            {solutionLinks.map(link => <li key={link.name} className="text-[7DCEA0] text-[#7dcea0]">
                    <Link to={link.path} className={`text-sm flex items-center transition-colors duration-300 ${location.pathname === link.path ? 'text-coral' : 'text-lavender hover:text-coral'}`}>
                        <link.icon className="mr-3 h-4 w-4" />
                        {link.name}
                    </Link>
                </li>)}
        </CollapsibleSection>

        <CollapsibleSection title="Prospective Locations" icon={Building}>
            {locationTypes.map(loc => <li key={loc.slug}>
                    <Link to={loc.path} className={`text-sm transition-colors duration-300 ${location.pathname === loc.path ? 'text-coral' : 'text-lavender hover:text-coral'}`}>
                        {loc.title}
                    </Link>
                </li>)}
        </CollapsibleSection>
        
        <CollapsibleSection title="Service Area" icon={MapPin}>
            {allTowns.map(town => <li key={town.slug}>
                    <Link to={`/service-area/${town.slug}`} className={`text-sm transition-colors duration-300 ${location.pathname === `/service-area/${town.slug}` ? 'text-coral' : 'text-lavender hover:text-coral'}`}>
                        {town.name}
                    </Link>
                </li>)}
        </CollapsibleSection>

        <div>
          <Link to="/about" className={`w-full flex items-center text-lg font-semibold hover:text-coral transition-colors duration-300 ${location.pathname === '/about' ? 'text-coral' : 'text-mint'}`}>
            <Info className="mr-2 h-5 w-5" /> About
          </Link>
        </div>
        
        <div>
          <Link to="/blog" className={`w-full flex items-center text-lg font-semibold hover:text-coral transition-colors duration-300 ${location.pathname === '/blog' ? 'text-coral' : 'text-mint'}`}>
            <Newspaper className="mr-2 h-5 w-5" /> Blog
          </Link>
        </div>

        <div>
          <Link to="/faq" className={`w-full flex items-center text-lg font-semibold hover:text-coral transition-colors duration-300 ${location.pathname === '/faq' ? 'text-coral' : 'text-mint'}`}>
            <HelpCircle className="mr-2 h-5 w-5" /> FAQ
          </Link>
        </div>

        <div>
          <Link to="/contact" className="w-full flex items-center text-lg font-semibold text-mint hover:text-coral transition-colors duration-300">
            <Mail className="mr-2 h-5 w-5" /> Contact
          </Link>
        </div>

      </div>
    </div>;
};
export default VisualSitemap;