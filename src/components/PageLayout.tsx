import React from 'react';
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
  skipMetaTags?: boolean; // New prop to skip meta tags when they're handled by child components
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  title = 'SMART MARKET RETAIL - A Smarter Way to Vend',
  description = 'SMART MARKET RETAIL provides innovative vending solutions including Smart Stores, Micro Markets, and traditional vending services across Carroll and Baltimore County, Maryland.',
  keywords = 'vending machines, smart vending, micro markets, office vending, Carroll County, Baltimore County, Maryland',
  ogImage,
  ogType = 'website',
  skipMetaTags = false // Default to false for backward compatibility
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
      {/* Only render meta tags if not skipped (for pages that handle their own meta tags like BlogPostPage) */}
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
          <meta property="og:url" content={currentUrl} />
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
          <link rel="canonical" href={currentUrl} />
        </Helmet>
      )}
      
      {/* The Header is fixed with a z-index of 50 */}
      <Header />
      
      {/* This new grid creates three columns: a left gutter, a centered content area, and a right gutter. */}
      <div className="w-full flex-grow grid grid-cols-1 xl:grid-cols-[1fr,minmax(0,1280px),1fr]">
        
        {/* Left Gutter Column: This holds the sitemap */}
        <aside className="hidden xl:block justify-self-end py-8 pr-8">
          {/* The 'top' value has been adjusted to 'top-48' to perfectly align with the main content's top padding.
              This accounts for the header height plus the content's own top padding.
          */}
          <div className="sticky top-48 w-64 z-40">
            <VisualSitemap />
          </div>
        </aside>

        {/* Main Content Column: This remains perfectly centered. */}
        <main className="py-8 px-4 md:px-6 col-span-1 xl:col-start-2">
          {children}
        </main>

        {/* Right Gutter Column: This is empty, ensuring the main content stays centered. */}
        <div className="hidden xl:block"></div>
      </div>

      <Footer />
    </>
  );
};

export default PageLayout;