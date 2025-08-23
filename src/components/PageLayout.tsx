import React, { ReactNode } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import VisualSitemap from './VisualSitemap';

const generateSchemaMarkup = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Smart Market Retail",
    "url": "https://smartmarketretail.com",
    "logo": "https://smartmarketretail.com/Logo - Website.png",
    "email": "info@smartmarketretail.com",
    "sameAs": [
      "https://www.facebook.com/smartmarketretail",
      "https://www.linkedin.com/company/smartmarketretail"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "VendingMachineSupplier",
    "name": "Smart Market Retail",
    "telephone": "(410) 220-5652",
    "email": "info@smartmarketretail.com",
    "url": "https://smartmarketretail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "405 North Center Street, STE 25, #1034",
      "addressLocality": "Westminster",
      "addressRegion": "MD",
      "postalCode": "21157",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "GeoShape",
      "name": "Carroll County and Baltimore County, Maryland",
      "description": "Smart vending solutions and micro-market services in Carroll County and Baltimore County, Maryland"
    }
  };

  return { organizationSchema, localBusinessSchema };
};

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;  
  ogType?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, title, description, keywords, ogImage, ogType }) => {
  const { organizationSchema, localBusinessSchema } = generateSchemaMarkup();

  return (
    <HelmetProvider>
      <div className="flex flex-col min-h-screen text-lavender font-sans">
        
        <div className="background-wrapper"></div>

        <div className="relative z-10 flex flex-col flex-grow">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
  
                {/* Add Open Graph tags */}
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                {ogImage && <meta property="og:image" content={ogImage} />}
                {ogType && <meta property="og:type" content={ogType} />}
                <meta property="og:url" content={window.location.href} />
                
                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                {ogImage && <meta name="twitter:image" content={ogImage} />}
                
                {keywords && <meta name="keywords" content={keywords} />}
                <script type="application/ld+json">
                  {JSON.stringify(organizationSchema)}
                </script>
                <script type="application/ld+json">
                  {JSON.stringify(localBusinessSchema)}
                </script>
            </Helmet>
            
            {/* The Header is fixed with a z-index of 50 */}
            <Header />
            
            {/* This new grid creates three columns: a left gutter, a centered content area, and a right gutter. */}
            <div className="w-full flex-grow grid grid-cols-1 xl:grid-cols-[1fr,minmax(0,1280px),1fr]">
              
              {/* Left Gutter Column: This holds the sitemap */}
              <aside className="hidden xl:block justify-self-end py-8 pr-8">
                {/* The 'top' value has been adjusted to 'top-28' to perfectly align with the main content's top padding.
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
        </div>
      </div>
    </HelmetProvider>
  );
};

export default PageLayout;
