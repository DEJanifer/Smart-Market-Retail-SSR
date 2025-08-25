import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

interface RenderResult {
  appHtml: string;
  helmet: {
    title?: string;
    meta?: string;
    link?: string;
    script?: string;
  };
  status?: number;
}

export function render(url: string): RenderResult {
  // Create a helmet context to capture the tags
  const helmetContext: any = {};
  
  try {
    // Add data-server-rendered attribute to help with hydration
    const appHtml = ReactDOMServer.renderToString(
      <div data-server-rendered="true">
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </div>
    );

    // Extract helmet data after rendering
    const { helmet } = helmetContext;
    
    // Ensure we have all the necessary helmet components
    // Priority is important here - we want the most specific tags
    const helmetData = {
      title: helmet?.title?.toString() || '<title>Smart Market Retail</title>',
      meta: helmet?.meta?.toString() || '',
      link: helmet?.link?.toString() || '',
      script: helmet?.script?.toString() || '',
    };

    // Debug logging to verify meta tags are captured
    console.log('SSR Rendering URL:', url);
    console.log('SSR Helmet Data:', {
      hasTitle: !!helmetData.title,
      hasMeta: !!helmetData.meta,
      metaLength: helmetData.meta?.length,
      // Log a sample of meta content for debugging
      metaSample: helmetData.meta?.substring(0, 500)
    });

    return {
      appHtml,
      helmet: helmetData,
      status: 200
    };
  } catch (error) {
    console.error('SSR Render Error:', error);
    
    // Return a fallback with basic meta tags
    return {
      appHtml: '<div>Error rendering page</div>',
      helmet: {
        title: '<title>Smart Market Retail</title>',
        meta: `
          <meta property="og:title" content="Smart Market Retail" />
          <meta property="og:description" content="Modern vending solutions for Carroll & Baltimore County, MD" />
          <meta property="og:image" content="https://smartmarketretail.com/Smart Store 700 05.1_large.webp" />
          <meta property="og:url" content="https://smartmarketretail.com" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
        `,
        link: '',
        script: ''
      },
      status: 500
    };
  }
}

// Export as default as well for CommonJS compatibility
module.exports = { render };
module.exports.default = { render };