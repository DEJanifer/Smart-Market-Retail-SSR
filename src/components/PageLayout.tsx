import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import VisualSitemap from './VisualSitemap';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  skipMetaTags?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  title = 'SMART MARKET RETAIL - A Smarter Way to Vend',
  description = 'SMART MARKET RETAIL provides innovative vending solutions including Smart Stores, Micro Markets, and traditional vending services across Carroll and Baltimore County, Maryland.',
  keywords = 'vending machines, smart vending, micro markets, office vending, Carroll County, Baltimore County, Maryland',
  ogImage = '/Smart Store 700 05.1_large.webp',
  ogType = 'website',
  skipMetaTags = false
}) => {
  const baseUrl = 'https://smartmarketretail.com';
  const [currentUrl, setCurrentUrl] = useState(baseUrl);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);
  
  // Process the ogImage to ensure it's an absolute URL
  const getAbsoluteImageUrl = (image?: string) => {
    if (!image) {
      return `${baseUrl}/Smart Store 700 05.1_large.webp`;
    }
    
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    }
    
    const cleanPath = image.startsWith('/') ? image.slice(1) : image;
    return `${baseUrl}/${cleanPath}`;
  };

  const absoluteOgImage = getAbsoluteImageUrl(ogImage);
  const metaUrl = isMounted ? currentUrl : baseUrl;

  return (
    <>
      {!skipMetaTags && (
        <Helmet>
          {/* Basic Meta Tags */}
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          
          {/* Open Graph Meta Tags */}
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content={ogType} />
          <meta property="og:url" content={metaUrl} />
          <meta property="og:image" content={absoluteOgImage} />
          <meta property="og:image:secure_url" content={absoluteOgImage} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content={title} />
          <meta property="og:site_name" content="Smart Market Retail" />
          <meta property="og:locale" content="en_US" />
          
          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={absoluteOgImage} />
          <meta name="twitter:image:alt" content={title} />
          
          {/* Additional Meta Tags */}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <link rel="canonical" href={metaUrl} />
        </Helmet>
      )}
      
      <Header />
      
      <div className="w-full flex-grow grid grid-cols-1 xl:grid-cols-[1fr,minmax(0,1280px),1fr]">
        <aside className="hidden xl:block justify-self-end py-8 pr-8">
          <div className="sticky top-48 w-64 z-40">
            <VisualSitemap />
          </div>
        </aside>

        <main className="py-8 px-4 md:px-6 col-span-1 xl:col-start-2">
          {children}
        </main>

        <div className="hidden xl:block"></div>
      </div>

      <Footer />
    </>
  );
};

export default PageLayout;