// src/components/locationData.ts
export interface LocationType {
  slug: string;
  name: string;
  path: string;
  image?: string; // Existing field
  description: string; // Existing field
  // New fields below
  title: string;
  hero: {
    peachText: string;
    description: string;
    pexelsId?: string;
    image?: string;
  };
  benefits: {
    title: string;
    items: Array<{
      icon: string; // e.g., "CheckCircle"
      title: string;
      description: string;
    }>;
  };
  painPoints: Array<{
    icon: string; // e.g., "Frown"
    title: string;
    point: string;
  }>;
  customSolutions: Array<{
    title: string;
    description: string;
  }>;
  smartStore: {
    title: string;
    description: string;
    image: string;
    features: string[];
  };
  microMarket: {
    title: string;
    description: string;
    image: string;
    features: string[];
  };
  smartCoolers?: { // Optional
    title: string;
    description: string;
    image: string;
    features: string[];
  };
  faq: Array<{
    question: string;
    answer: string;
  }>;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

// The main array containing all location data.
export const locationTypes: LocationType[] = [
  {
    slug: 'office-buildings',
    name: 'Office Buildings',
    path: '/locations/office-buildings',
    image: '', // Existing image field
    description: "In today's competitive job market, top-tier amenities are essential for attracting and retaining talent. Smart Market Retail offers advanced vending solutions that transform your office breakroom into a hub of convenience and productivity. Our Smart Stores and Micro Markets provide employees with 24/7 access to fresh food, snacks, and beverages, keeping them fueled and focused throughout the day.", // Existing description field
    title: 'Office Buildings', // Example for the new title field
    hero: {
      peachText: 'Enhance Your Workplace with Modern Vending',
      description: 'Transform your office breakroom into a hub of convenience and productivity with our advanced vending solutions.',
      pexelsId: '1170412',
    },
    benefits: {
      title: 'Benefits for the Modern Workplace',
      items: [
        { icon: 'Users', title: 'Boost Employee Morale', description: 'Show appreciation with quality on-site options' },
        { icon: 'Zap', title: 'Increase Productivity', description: 'Keep staff energized and on-site during breaks' },
        { icon: 'Star', title: 'Attract & Retain Talent', description: 'Offer modern amenities that employees value' },
        { icon: 'Clock', title: '24/7 Accessibility', description: 'Cater to all work schedules, day or night' },
      ],
    },
    painPoints: [
      { icon: 'Coffee', title: 'Limited Lunch Options Nearby', point: 'Limited lunch options nearby during busy workdays' },
      { icon: 'Clock', title: 'Cafeteria Rush Hour Delays', point: 'Long lines at cafeteria during peak lunch hours' },
      { icon: 'TrendingDown', title: 'Employee Productivity Loss', point: 'Employees leaving office for food, reducing productivity' },
      { icon: 'Frown', title: 'Unhealthy Workplace Snacking', point: 'Lack of healthy snack options for long work sessions' },
      { icon: 'Users', title: 'Poor Employee Retention', point: 'Poor office culture and employee retention affecting business growth' },
      { icon: 'DollarSign', title: 'Ineffective Amenity Spending', point: 'Rising office amenity costs without measurable employee satisfaction returns' },
    ],
    customSolutions: [
      { title: '24/7 Fresh Food Access', description: 'Provide healthy meals and snacks available around the clock for all work schedules' },
      { title: 'Contactless Payment Systems', description: 'Modern, hygienic payment options that employees prefer' },
      { title: 'Customized Product Selection', description: 'Tailor offerings to your team\'s preferences and dietary needs' },
    ],
    smartStore: {
      title: 'Smart Store Solutions',
      description: "Ideal for smaller office spaces or secondary break areas, our Smart Store vending machines offer a curated selection of popular snacks and drinks. Featuring 'tap, grab, and go' technology, they provide a frictionless experience that gets your team back to work quickly. Remote monitoring ensures machines are always stocked with favorites.",
      features: [
        'Compact footprint fits in any breakroom',
        'Contactless and mobile payment options',
        'Wide selection of snacks and beverages',
        'AI-powered inventory management for fewer stockouts',
      ],
      image: '/Smart Store 700 15.1.jpg',
    },
    microMarket: {
      title: 'Micro Market Solutions',
      description: 'Upgrade your main breakroom into a self-service market. Our Micro Markets offer a wide variety of fresh foods, healthy meals, gourmet coffee, and hundreds of snack and beverage choices. Employees can browse products freely and pay at a self-checkout kiosk, creating a modern, convenient, and satisfying break experience.',
      features: [
        'Extensive variety of fresh food, salads, and sandwiches',
        'Fully customizable to fit your space and culture',
        'Reduces time spent on off-site lunch runs',
        'Creates a vibrant and collaborative breakroom environment',
      ],
      image: '/Large Micro Market 15.1.jpg',
    },
    smartCoolers: {
      title: 'Smart Cooler Food & Beverage Hubs',
      description: 'The perfect addition to any office kitchen or collaborative space. Our Smart Coolers offer a premium selection of cold beverages, fresh meals, and indulgent snack. Secure, cashless payments and grab-and-go technology make it an effortless way to keep your team hydrated and refreshed.',
      features: [
        'Sleek, modern design fits any office aesthetic',
        'Offers a premium, curated beverage and food selection',
        'Secure access and effortless grab-and-go payment',
        'A simple, high-impact amenity for employee wellness',
      ],
      image: '/CoolSmart_AI_Solo_Center.webp',
    },
    faq: [
      { question: 'How quickly can you install vending solutions in our office?', answer: 'Most office installations can be completed within 4-6 weeks of signing, depending on your space requirements and customization needs.' },
      { question: 'Can you accommodate dietary restrictions and preferences?', answer: 'Absolutely! We work with you to stock products that meet your team\'s dietary needs, including gluten-free, vegan, and healthy options.' },
      { question: 'What payment methods do your machines accept?', answer: 'Our smart vending machines accept credit/debit cards, mobile payments (Apple Pay, Google Pay), and can integrate with corporate payment systems.' },
      { question: 'Do you provide ongoing maintenance and restocking?', answer: 'Yes, we handle all maintenance, restocking, and monitoring. Our smart technology alerts us when products are running low or if any issues arise.' },
      { question: 'Can we track usage and spending for expense management?', answer: 'Yes, we provide detailed reporting and analytics that can help with corporate expense tracking and budget planning.' },
    ],
    seo: {
      title: 'Office Building Vending Solutions | Smart Market Retail',
      description: 'Modern vending solutions for office buildings in Carroll & Baltimore County MD. Boost employee morale with Smart Stores and Micro Markets.',
      keywords: 'office vending, office breakroom, smart vending machines, micro markets, employee benefits',
    },
  },
  // ... other location types with full data
];

/**
 * A helper function to find a location's data by its slug.
 * @param {string | undefined} slug - The URL slug of the location.
 * @returns {LocationType | undefined} The location data object or undefined if not found.
 */
export const getLocationBySlug = (slug: string | undefined): LocationType | undefined => {
  if (!slug) return undefined;
  return locationTypes.find(location => location.slug === slug);
};