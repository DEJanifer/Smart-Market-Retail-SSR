import React from 'react';
import { Helmet } from 'react-helmet-async';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  title = 'SMART MARKET RETAIL - A Smarter Way to Vend',
  description = 'SMART MARKET RETAIL provides innovative vending solutions including Smart Stores, Micro Markets, and traditional vending services across Carroll and Baltimore County, Maryland.',
  keywords = 'vending machines, smart vending, micro markets, office vending, Carroll County, Baltimore County, Maryland',
  ogImage,
  ogType = 'website'
}) => {
  // Ensure we have a proper base URL
  const baseUrl = 'https://smartmarketretail.com';
  
  // Process the ogImage to ensure it's an absolute URL
  const getAbsoluteImageUrl = (image?: string) => {
    if (!image) {
      // Default OG image if none provided
      return `${baseUrl}/Smart Store 700 05.1_large.webp`;
    }
    
    // If it's already an absolute URL, return as is
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    }
    
    // If it starts with /, remove it to avoid double slashes
    const cleanPath = image.startsWith('/') ? image.slice(1) : image;
    
    // Return absolute URL
    return `${baseUrl}/${cleanPath}`;
  };

  const absoluteOgImage = getAbsoluteImageUrl(ogImage);
  const currentUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : baseUrl;

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        
        {/* Open Graph Meta Tags - These are critical for rich links */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content={absoluteOgImage} />
        <meta property="og:image:secure_url" content={absoluteOgImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={title} />
        <meta property="og:site_name" content="Smart Market Retail" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags - Also important for some platforms */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={absoluteOgImage} />
        <meta name="twitter:image:alt" content={title} />
        
        {/* Additional Meta Tags for better compatibility */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="canonical" href={currentUrl} />
      </Helmet>
      
      {children}
    </>
  );
};

export default PageLayout;