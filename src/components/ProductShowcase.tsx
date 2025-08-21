import React from 'react';
import ImageCarousel from './ImageCarousel';


const ProductShowcase: React.FC = () => {
  const showcaseImages = [
    {
      src: '/CoolSmart AI - Solo - Center',
      alt: 'Smart Vending Machine',
      title: 'Smart AI Vending',
      description: 'Experience the future of vending with our AI-powered machines featuring touchless payments and real-time inventory management.'
    },
    {
      src: '/Large Micro Market 05',
      alt: 'Micro Market Solution',
      title: 'Micro Markets',
      description: 'Transform your breakroom with our open-concept retail solution offering fresh food, snacks, and beverages 24/7.'
    },
    {
      src: 'https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      pexelsId: '4481326',
      alt: 'Modern Office Vending',
      title: 'Enhanced Traditional Vending',
      description: 'Reliable vending technology enhanced with modern features like cashless payments and remote monitoring.'
    },
    {
      src: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      pexelsId: '1170412',
      alt: 'Office Building Installation',
      title: 'Perfect for Any Location',
      description: 'Our solutions fit seamlessly into office buildings, healthcare facilities, schools, and more.'
    }
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-mint">Our</span>{' '}
            <span className="text-coral">Solutions</span>
          </h2>
          <p className="text-lg text-lavender/80 max-w-3xl mx-auto">
            Discover our comprehensive range of smart vending solutions designed to meet your specific needs and exceed expectations.
          </p>
        </div>
        
        <ImageCarousel
          images={showcaseImages}
          className="max-w-6xl mx-auto"
          autoplay={true}
          effect="slide"
          slidesPerView={2}
          spaceBetween={30}
        />
      </div>
    </section>
  );
};

export default ProductShowcase;