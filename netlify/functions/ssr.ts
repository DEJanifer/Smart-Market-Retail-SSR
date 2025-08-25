import type { Handler, HandlerEvent } from '@netlify/functions';
import path from 'path';
import fs from 'fs';

const handler: Handler = async (event: HandlerEvent) => {
  const url = event.path;
  
  console.log('=== SSR Function START ===');
  console.log('Processing URL:', url);
  console.log('Current directory:', __dirname);

  try {
    // 1. Read the template file
    const templatePath = path.join(__dirname, '../../dist/client/index.html');
    console.log('Looking for template at:', templatePath);
    
    if (!fs.existsSync(templatePath)) {
      console.error('Template not found!');
      
      // Return a basic fallback HTML with proper meta tags
      return {
        statusCode: 200,
        headers: { 
          'Content-Type': 'text/html; charset=utf-8',
          'X-SSR-Status': 'template-missing',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        },
        body: `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Smart Market Retail</title>
              <meta property="og:title" content="Smart Market Retail" />
              <meta property="og:description" content="Modern vending solutions for Carroll & Baltimore County, MD" />
              <meta property="og:type" content="website" />
              <meta property="og:url" content="https://smartmarketretail.com${url}" />
              <meta property="og:image" content="https://smartmarketretail.com/Smart Store 700 05.1_large.webp" />
              <meta property="og:image:width" content="1200" />
              <meta property="og:image:height" content="630" />
              <meta name="twitter:card" content="summary_large_image" />
            </head>
            <body>
              <div id="root">Loading Smart Market Retail...</div>
              <script>window.location.reload();</script>
            </body>
          </html>`
      };
    }
    
    let template = fs.readFileSync(templatePath, 'utf-8');
    console.log('Template loaded successfully');

    // 2. Load the server render function
    const serverPath = path.join(__dirname, '../../dist/server/entry-server.js');
    console.log('Looking for server bundle at:', serverPath);
    
    if (!fs.existsSync(serverPath)) {
      console.error('Server bundle not found!');
      
      // Return template with default meta tags for the specific page
      let pageTitle = 'Smart Market Retail';
      let pageDescription = 'Modern vending solutions for Carroll & Baltimore County, MD';
      
      // Determine page-specific defaults based on URL
      if (url.includes('/solutions')) {
        pageTitle = 'Our Vending Solutions | Smart Market Retail';
        pageDescription = 'Discover Smart Market Retail\'s comprehensive vending solutions: Smart Stores, Micro Markets, and Traditional Vending.';
      } else if (url.includes('/about')) {
        pageTitle = 'About Smart Market Retail | Modern Unattended Retail Solutions';
        pageDescription = 'Learn about Smart Market Retail\'s mission to revolutionize vending with innovative Smart Stores and Micro Markets.';
      } else if (url.includes('/blog/')) {
        pageTitle = 'Smart Market Retail Blog';
        pageDescription = 'Stay updated with the latest news, tips, and insights on smart vending and micro markets.';
      }
      
      // Build complete head section with proper meta tags
      const headContent = `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${pageTitle}</title>
        <meta name="description" content="${pageDescription}">
        
        <!-- Open Graph Meta Tags -->
        <meta property="og:title" content="${pageTitle}" />
        <meta property="og:description" content="${pageDescription}" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://smartmarketretail.com${url}" />
        <meta property="og:image" content="https://smartmarketretail.com/Smart Store 700 05.1_large.webp" />
        <meta property="og:image:secure_url" content="https://smartmarketretail.com/Smart Store 700 05.1_large.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Smart Market Retail" />
        <meta property="og:locale" content="en_US" />
        
        <!-- Twitter Card Meta Tags -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${pageTitle}" />
        <meta name="twitter:description" content="${pageDescription}" />
        <meta name="twitter:image" content="https://smartmarketretail.com/Smart Store 700 05.1_large.webp" />
      `;
      
      // Replace everything between <head> and </head>
      template = template.replace(/<head>[\s\S]*?<\/head>/, `<head>${headContent}</head>`);
      
      return {
        statusCode: 200,
        headers: { 
          'Content-Type': 'text/html; charset=utf-8',
          'X-SSR-Status': 'server-bundle-missing',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        },
        body: template
      };
    }

    console.log('Server bundle found, loading...');
    
    // Clear cache for fresh module
    delete require.cache[serverPath];
    const serverModule = require(serverPath);
    const render = serverModule.render || serverModule.default?.render;
    
    if (!render) {
      console.error('Render function not found in server module');
      
      return {
        statusCode: 200,
        headers: { 
          'Content-Type': 'text/html; charset=utf-8',
          'X-SSR-Status': 'render-function-missing',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        },
        body: template
      };
    }
    
    console.log('Render function found, rendering...');

    // 3. Render the React app
    const { appHtml, helmet, status } = render(url);
    console.log('React app rendered successfully');
    console.log('Helmet data present:', !!helmet);
    console.log('Helmet title:', helmet?.title ? 'YES' : 'NO');
    console.log('Helmet meta:', helmet?.meta ? 'YES' : 'NO');

    // 4. Build the final HTML with proper meta tag injection
    let finalHtml = template;
    
    // Build the complete head content from helmet data
    if (helmet) {
      const helmetTitle = helmet.title || '<title>Smart Market Retail</title>';
      const helmetMeta = helmet.meta || '';
      const helmetLink = helmet.link || '';
      const helmetScript = helmet.script || '';
      
      // Extract just the title text from helmet.title (it comes as full <title> tag)
      const titleMatch = helmetTitle.match(/<title[^>]*>(.*?)<\/title>/);
      const titleText = titleMatch ? titleMatch[1] : 'Smart Market Retail';
      
      // Build complete head section with all necessary meta tags
      const newHead = `
        <meta charset="UTF-8">
        <link rel="icon" type="image/png" href="/Logo - Website.png" />
        <link rel="apple-touch-icon" href="/Logo - Website.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${helmetTitle}
        ${helmetMeta}
        ${helmetLink}
        ${helmetScript}
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="preconnect" href="https://images.pexels.com">
        <link rel="dns-prefetch" href="https://images.pexels.com">
        <link rel="preload" as="font" type="font/woff2" href="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" crossorigin>
        <link rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
        <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"></noscript>
        <link rel="preload" as="image" href="/Logo - Website_medium.webp" type="image/webp">
      `;
      
      // Replace the entire head section
      finalHtml = finalHtml.replace(/<head>[\s\S]*?<\/head>/, `<head>${newHead}</head>`);
    } else {
      // If no helmet data, at least inject basic meta tags
      console.warn('No helmet data available, using defaults');
      const defaultHead = `
        <meta charset="UTF-8">
        <link rel="icon" type="image/png" href="/Logo - Website.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Smart Market Retail</title>
        <meta name="description" content="Modern vending solutions for Carroll & Baltimore County, MD">
        <meta property="og:title" content="Smart Market Retail" />
        <meta property="og:description" content="Modern vending solutions for Carroll & Baltimore County, MD" />
        <meta property="og:image" content="https://smartmarketretail.com/Smart Store 700 05.1_large.webp" />
        <meta property="og:url" content="https://smartmarketretail.com${url}" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      `;
      
      finalHtml = finalHtml.replace(/<head>[\s\S]*?<\/head>/, `<head>${defaultHead}</head>`);
    }
    
    // Replace body content
    finalHtml = finalHtml.replace('<!--app-html-->', appHtml || '');
    
    // Log final verification
    const hasOGTitle = finalHtml.includes('property="og:title"');
    const hasOGDescription = finalHtml.includes('property="og:description"');
    const hasOGImage = finalHtml.includes('property="og:image"');
    console.log('Final HTML has OG title:', hasOGTitle);
    console.log('Final HTML has OG description:', hasOGDescription);
    console.log('Final HTML has OG image:', hasOGImage);
    
    // Extract OG values for logging
    const ogTitleMatch = finalHtml.match(/<meta property="og:title" content="([^"]+)"/);
    const ogDescMatch = finalHtml.match(/<meta property="og:description" content="([^"]+)"/);
    console.log('OG Title content:', ogTitleMatch ? ogTitleMatch[1] : 'NOT FOUND');
    console.log('OG Description content:', ogDescMatch ? ogDescMatch[1] : 'NOT FOUND');
    
    console.log('=== SSR Function SUCCESS ===');

    return {
      statusCode: status || 200,
      headers: { 
        'Content-Type': 'text/html; charset=utf-8',
        'X-SSR-Status': 'success',
        'X-SSR-Path': url,
        'X-SSR-Has-Meta': `${hasOGTitle && hasOGDescription && hasOGImage}`,
        'Cache-Control': 'public, max-age=0, must-revalidate'
      },
      body: finalHtml,
    };
    
  } catch (error: any) {
    console.error('=== SSR Function ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    // Return a fallback HTML with proper meta tags
    return {
      statusCode: 500,
      headers: { 
        'Content-Type': 'text/html; charset=utf-8',
        'X-SSR-Status': 'error',
        'X-SSR-Error': error.message,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      },
      body: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Smart Market Retail - Error</title>
            <meta property="og:title" content="Smart Market Retail" />
            <meta property="og:description" content="Modern vending solutions for Carroll & Baltimore County, MD" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://smartmarketretail.com${url}" />
            <meta property="og:image" content="https://smartmarketretail.com/Smart Store 700 05.1_large.webp" />
          </head>
          <body>
            <div style="text-align: center; padding: 50px;">
              <h1>Loading Smart Market Retail...</h1>
              <p>If this page doesn't load, please refresh.</p>
            </div>
            <script>
              setTimeout(function() {
                window.location.reload();
              }, 2000);
            </script>
          </body>
        </html>`
    };
  }
};

export { handler };