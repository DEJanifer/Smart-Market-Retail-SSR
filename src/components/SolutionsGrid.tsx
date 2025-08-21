import React from 'react';
import { Link } from 'react-router-dom';

const solutionCards = [
  {
    title: 'Smart Store',
    image: '/Smart Store 600 Duo - Solo Center.webp',
    alt: 'Smart Store Solution',
    description: 'Our most premium modern vending solution. A true Tap, Grab, & Go cashless experience with real-time inventory monitoring.',
    link: '/solutions/smart-store'
  },
  {
    title: 'Smart Cooler',
    image: '/CoolSmart_AI_Solo_Center_medium.webp',
    alt: 'Smart Cooler Solution',
    description: 'Our highest-capacity single unit delivers more snacks, more meals, and more variety—all in less space.',
    link: '/solutions/smart-coolers'
  },
  {
    title: 'Micro Market',
    image: '/Small Micro Market 06.1.webp',
    alt: 'Micro Market Solution',
    description: 'Enjoy an onsite, self-serve convenience store with fresh food, self-checkout, and extensive product variety.',
    link: '/solutions/micro-markets'
  },
  {
    title: 'Smart Traditional Vending',
    image: '/Merchant Combo Media 2.webp',
    alt: 'Smart Traditional Vending Solution',
    description: 'Traditional Vending Machines with intelligence. Cash & cashless payment options and remote inventory monitoring capabilities.',
    link: '/solutions/smart-vending'
  }
];

const SolutionsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      {solutionCards.map((solution, index) => (
        <Link key={index} to={solution.link} className="group backdrop-blur-sm bg-navy/30 border border-mint/20 rounded-lg overflow-hidden card-interactive hover:border-mint/40 flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-navy">
          <div className="aspect-video overflow-hidden">
            <img src={solution.image} alt={solution.alt} className="w-full h-full object-contain bg-navy/20 transition-transform group-hover:scale-105 duration-300" />
          </div>
          <div className="p-4 md:p-6 flex flex-col flex-grow">
            <h3 className="text-lg md:text-xl font-semibold text-mint group-hover:text-coral transition-colors mb-2">{solution.title}</h3>
            <p className="text-peach/80 text-sm md:text-base leading-relaxed">{solution.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SolutionsGrid;