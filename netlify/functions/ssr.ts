import type { Handler, HandlerEvent } from '@netlify/functions';
import path from 'path';
import fs from 'fs';

const handler: Handler = async (event: HandlerEvent) => {
  const url = event.path;
  
  console.log('=== SSR Function START ===');
  console.log('Processing URL:', url);
  console.log('Referrer:', event.headers?.referer || 'none');
  console.log('User-Agent:', event.headers?.['user-agent'] || 'none');

  // Check if this is an external referrer
  const referrer = event.headers?.referer || '';
  const isExternalReferrer = referrer && 
    !referrer.includes('smartmarketretail.com') && 
    !referrer.includes('localhost') &&
    !referrer.includes('127.0.0.1') &&
    !referrer.includes('netlify');

  try {
    // 1. Read the template file
    const templatePath = path.join(__dirname, '../../dist/client/index.html');
    console.log('Looking for template at:', templatePath);
    
    if (!fs.existsSync(templatePath)) {
      console.error('Template not found!');
      
      // Return a basic fallback HTML that will client-side render
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
              <script>
                // Prevent hydration issues
                if (typeof window !== 'undefined') {
                  sessionStorage.setItem('hasVisited', 'true');
                  sessionStorage.setItem('externalReferrer', 'true');
                }
                // Force reload to get proper assets
                setTimeout(() => { window.location.href = window.location.href; }, 100);
              </script>
            </head>
            <body>
              <div id="root">Loading Smart Market Retail...</div>
            </body>
          </html>`
      };
    }
    
    let template = fs.readFileSync(templatePath, 'utf-8');
    console.log('Template loaded successfully');

    // For external referrers, skip SSR and return client-rendered version
    if (isExternalReferrer) {
      console.log('External referrer detected, returning client-side render template');
      
      // Inject scripts to handle external referrer
      const modifiedTemplate = template.replace(
        '<div id="root"></div>',
        `<div id="root"></div>
        <script>
          // Flag this as external referrer to prevent loading screen
          if (typeof window !== 'undefined') {
            window.__EXTERNAL_REFERRER__ = true;
            sessionStorage.setItem('hasVisited', 'true');
            sessionStorage.setItem('externalReferrer', 'true');
          }
        </script>`
      );
      
      return {
        statusCode: 200,
        headers: { 
          'Content-Type': 'text/html; charset=utf-8',
          'X-SSR-Status': 'client-render-external',
          'X-SSR-Referrer': referrer,
          'Cache-Control': 'public, max-age=0, must-revalidate'
        },
        body: modifiedTemplate
      };
    }

    // 2. Try to load and use the server render function
    const serverPath = path.join(__dirname, '../../dist/server/entry-server.js');
    console.log('Looking for server bundle at:', serverPath);
    
    // If server bundle doesn't exist, return client-side template
    if (!fs.existsSync(serverPath)) {
      console.warn('Server bundle not found, returning client-side template');
      
      const modifiedTemplate = template.replace(
        '<div id="root"></div>',
        `<div id="root"></div>
        <script>
          // No server bundle available
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('hasVisited', 'true');
          }
        </script>`
      );
      
      return {
        statusCode: 200,
        headers: { 
          'Content-Type': 'text/html; charset=utf-8',
          'X-SSR-Status': 'client-render-no-bundle',
          'Cache-Control': 'public, max-age=0, must-revalidate'
        },
        body: modifiedTemplate
      };
    }

    console.log('Server bundle found, attempting SSR...');
    
    try {
      // Clear cache for fresh module
      delete require.cache[serverPath];
      const serverModule = require(serverPath);
      const render = serverModule.render || serverModule.default?.render;
      
      if (!render) {
        throw new Error('Render function not found in server module');
      }
      
      console.log('Render function found, rendering...');

      // 3. Render the React app
      const { appHtml, helmet, status } = render(url);
      console.log('React app rendered successfully');

      // 4. Build the final HTML with proper meta tag injection
      let finalHtml = template;
      
      // Replace the app placeholder with rendered HTML
      finalHtml = finalHtml.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml || ''}</div>`
      );
      
      // If we have helmet data, update meta tags
      if (helmet && helmet.title) {
        // Update title
        finalHtml = finalHtml.replace(
          /<title>.*?<\/title>/,
          helmet.title.toString()
        );
        
        // Add meta tags if they exist
        if (helmet.meta) {
          finalHtml = finalHtml.replace(
            '</head>',
            `${helmet.meta.toString()}\n</head>`
          );
        }
      }
      
      console.log('=== SSR Function SUCCESS ===');

      return {
        statusCode: status || 200,
        headers: { 
          'Content-Type': 'text/html; charset=utf-8',
          'X-SSR-Status': 'success',
          'X-SSR-Path': url,
          'X-SSR-Referrer': referrer || 'none',
          'Cache-Control': 'public, max-age=0, must-revalidate'
        },
        body: finalHtml,
      };
      
    } catch (renderError: any) {
      console.error('SSR Render Error:', renderError.message);
      
      // If SSR fails, return client-side template
      const modifiedTemplate = template.replace(
        '<div id="root"></div>',
        `<div id="root"></div>
        <script>
          // SSR failed, using client-side render
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('hasVisited', 'true');
            console.log('SSR failed, using client-side render');
          }
        </script>`
      );
      
      return {
        statusCode: 200,
        headers: { 
          'Content-Type': 'text/html; charset=utf-8',
          'X-SSR-Status': 'client-render-error',
          'X-SSR-Error': renderError.message,
          'Cache-Control': 'public, max-age=0, must-revalidate'
        },
        body: modifiedTemplate
      };
    }
    
  } catch (error: any) {
    console.error('=== SSR Function ERROR ===');
    console.error('Error:', error.message);
    
    // Return a basic HTML that forces client-side render
    return {
      statusCode: 200,
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
            <title>Smart Market Retail</title>
            <meta property="og:title" content="Smart Market Retail" />
            <meta property="og:description" content="Modern vending solutions for Carroll & Baltimore County, MD" />
            <script>
              // Reload to get proper page
              if (typeof window !== 'undefined') {
                sessionStorage.setItem('hasVisited', 'true');
                setTimeout(() => { window.location.href = window.location.href; }, 500);
              }
            </script>
          </head>
          <body>
            <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
              <h1>Loading Smart Market Retail...</h1>
              <p>Please wait a moment...</p>
            </div>
          </body>
        </html>`
    };
  }
};

export { handler };