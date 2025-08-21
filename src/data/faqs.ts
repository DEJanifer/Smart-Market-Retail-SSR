export interface FAQ {
  id: string;
  category: 'general' | 'solutions' | 'process' | 'products';
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: 'what-is-smart-market-retail',
    category: 'general',
    question: 'What is Smart Market Retail?',
    answer: 'Smart Market Retail is your partner in creating the perfect breakroom experience. We design, install, and manage custom unattended retail solutions, including Micro Markets and Smart Stores, that your employees will love. Our mission is to transform everyday spaces into modern, efficient retail environments with our tech-forward approach.'
  },
  {
    id: 'service-areas',
    category: 'general',
    question: 'What areas do you serve?',
    answer: 'We proudly serve businesses and organizations throughout Carroll County and parts of Baltimore County, Maryland, including towns like Westminster, Eldersburg, Owings Mills, and Reisterstown.'
  },
  {
    id: 'cost-to-business',
    category: 'general',
    question: 'What is the cost to my business for these services?',
    answer: 'There are zero upfront costs for your business. We provide, install, stock, and maintain all equipment at no charge to you. It\'s a no-cost way to enhance your property and provide a valuable amenity.'
  },
  {
    id: 'types-of-locations',
    category: 'general',
    question: 'What types of locations do you service?',
    answer: 'We serve a wide range of high-traffic locations, including office buildings, apartments, hotels, healthcare facilities, colleges, universities, car dealerships, and warehouses. If you have a communal space, we can elevate it.'
  },
  {
    id: 'different-from-traditional-vending',
    category: 'general',
    question: 'How is this different from traditional vending?',
    answer: 'Unlike old vending machines that are prone to issues, our solutions use modern vending technology. We offer a frictionless checkout experience with various cashless vending solutions and use real-time inventory tracking to ensure products are always in stock. This creates a reliable and satisfying experience.'
  },
  {
    id: 'what-is-micro-market',
    category: 'solutions',
    question: 'What exactly is a Micro Market?',
    answer: 'A Micro Market is an unmanned, open-concept retail space that transforms your breakroom into a self-service convenience store. It features open shelving, glass-front coolers, and a self-checkout kiosk, offering a wide variety of fresh food vending options, snacks, and beverages 24/7.'
  },
  {
    id: 'what-is-smart-store',
    category: 'solutions',
    question: 'What is a Smart Store?',
    answer: 'A Smart Store is the future of vending convenience. It\'s an intelligent vending machine that uses grab-and-go technology. Users simply tap a payment method, open the door, take their items, and walk away. Sensors and AI identify the chosen products and bill the user automatically, creating a truly cashierless vending experience.'
  },
  {
    id: 'micro-market-benefits',
    category: 'solutions',
    question: 'What are the benefits of a Micro Market for our office breakroom?',
    answer: 'A Micro Market is one of the best office breakroom ideas to boost morale and productivity. It provides employees with access to fresh meals and healthy options, reducing the need for them to leave the office for lunch. This creates a vibrant, collaborative atmosphere and serves as a premium workplace amenity.'
  },
  {
    id: 'smart-store-security',
    category: 'solutions',
    question: 'Is a Smart Store secure enough for an open area?',
    answer: 'Absolutely. Smart Stores are designed for unmanned retail spaces. The system requires a valid payment method to unlock the door, and internal cameras and sensors track all activity to ensure accurate, secure transactions.'
  },
  {
    id: 'payment-options',
    category: 'solutions',
    question: 'What kind of payment options do you accept?',
    answer: 'Our systems are built for convenience and accept all modern payment methods. This includes credit/debit cards, Apple Pay, Google Pay, and other mobile wallets. This focus on cashless vending solutions ensures transactions are quick and easy for everyone.'
  },
  {
    id: 'office-coffee-service',
    category: 'solutions',
    question: 'What about Office Coffee Service?',
    answer: 'Yes, we provide comprehensive office coffee solutions. We can equip your breakroom with modern bean-to-cup coffee machines that deliver gourmet coffee for the workplace. Our managed coffee services include everything from installation to supplying a variety of fresh ground coffee, ensuring your team always has access to premium coffee without the hassle.'
  },
  {
    id: 'how-to-get-started',
    category: 'process',
    question: 'How do we get started?',
    answer: 'The process begins with a free, no-obligation on-site consultation. We\'ll assess your space, discuss your needs, and recommend the best solution for your location. You can start by filling out the contact form on our website.'
  },
  {
    id: 'installation-time',
    category: 'process',
    question: 'How long does installation take?',
    answer: 'Most installations can be completed within 4-6 weeks from our initial agreement. Our team handles everything from delivery to setup with minimal disruption to your daily operations.'
  },
  {
    id: 'stocking-and-maintenance',
    category: 'process',
    question: 'Who is responsible for stocking and maintaining the market/store?',
    answer: 'We are. Our service is fully managed. We use real-time inventory tracking to know when products are running low and handle all restocking and maintenance proactively. This ensures your market is always clean, full, and operational without any effort from your team.'
  },
  {
    id: 'machine-service',
    category: 'process',
    question: 'What happens if a machine needs service?',
    answer: 'Our smart technology automatically flags any issues as they happen. This allows our support team to respond swiftly, often before you or your employees even notice a problem. This proactive approach ensures guaranteed product delivery and minimal downtime.'
  },
  {
    id: 'product-offerings',
    category: 'products',
    question: 'What kind of products do you offer?',
    answer: 'We offer a vast selection tailored to your location, from healthy snacks, fresh salads, and sandwiches to classic comfort foods, gourmet coffee, and essential sundry items. Our goal is to provide a complete corporate food service within our solutions.'
  },
  {
    id: 'customize-product-selection',
    category: 'products',
    question: 'Can we customize the product selection?',
    answer: 'Absolutely. We work with you to curate a product mix that reflects your team\'s preferences and dietary needs. Whether you need more healthy options, local favorites, or specific brands, we tailor the offerings to ensure satisfaction.'
  },
  {
    id: 'healthy-fresh-food-options',
    category: 'products',
    question: 'Do you provide healthy and fresh food options?',
    answer: 'Yes, providing fresh food vending options is a cornerstone of our service. Our Micro Markets and Smart Coolers are perfect for offering crisp salads, fresh fruit, sandwiches, and other nutritious meals to support a healthy lifestyle.'
  },
  {
    id: 'coffee-service-details',
    category: 'products',
    question: 'How does your coffee service work?',
    answer: 'Our breakroom coffee provider service is comprehensive. We can install a premium bean-to-cup coffee machine that delivers fresh, gourmet coffee for the workplace. We manage the entire service, including supplying the coffee and maintaining the machine.'
  },
  {
    id: 'customization-design',
    category: 'products',
    question: 'Can the look of the market or store be customized to fit our office design?',
    answer: 'Yes. Our solutions are modular and stylish, designed to complement your space. We can customize the layout and design to seamlessly integrate with your environment\'s aesthetic, creating one of the most effective modern breakroom solutions.'
  },
  {
    id: 'micro-market-space-requirements',
    category: 'process',
    question: 'How much space do Micro Markets need?',
    answer: 'Micro Markets are flexible and can be tailored to fit various space sizes. A basic setup requires as little as 100-150 square feet, while larger installations can utilize 300-500 square feet or more. The modular design allows us to work with your available space, whether it\'s a small breakroom corner or a dedicated market area. During our free consultation, we\'ll assess your space and design a solution that maximizes efficiency while fitting perfectly within your layout.'
  },
  {
    id: 'smart-store-cooler-installation-locations',
    category: 'process',
    question: 'Where can Smart Stores and Smart Coolers be installed?',
    answer: 'Smart Stores and Smart Coolers can be installed virtually anywhere with standard electrical access. Popular locations include office lobbies, breakrooms, cafeterias, waiting areas, hotel lobbies, apartment common areas, college dormitories, hospitals, manufacturing facilities, and warehouse break areas. They require minimal floor space (typically 3x3 feet) and standard 110V electrical connection. Our team handles all installation logistics, including any necessary permits or facility coordination.'
  },
  {
    id: 'theft-concerns',
    category: 'process',
    question: 'Is theft a concern?',
    answer: 'Theft is rarely an issue with our solutions due to built-in security features and the nature of workplace environments. Smart Stores require valid payment methods to unlock and use advanced sensors to track all transactions, while Micro Markets are typically located in secure, monitored workplace areas where employees feel accountable. Our real-time monitoring systems also help us quickly identify any unusual activity and address it proactively.'
  }
];

// Top 5 most common questions to feature in the rotating FAQ component
export const topFAQIds = [
  'what-is-smart-market-retail',
  'cost-to-business',
  'what-is-micro-market',
  'payment-options',
  'how-to-get-started'
];

export const getFAQById = (id: string): FAQ | undefined => {
  return faqs.find(faq => faq.id === id);
};

export const getFAQsByCategory = (category: FAQ['category']): FAQ[] => {
  return faqs.filter(faq => faq.category === category);
};

export const getTopFAQs = (): FAQ[] => {
  return topFAQIds.map(id => getFAQById(id)).filter(Boolean) as FAQ[];
};