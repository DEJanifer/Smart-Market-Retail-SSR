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
      console.error('Directory contents:', fs.readdirSync(path.join(__dirname, '../../')));
      
      // Return a basic fallback HTML
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
            </head>
            <body>
              <div id="root">Loading Smart Market Retail...</div>
              <script>window.location.reload();</script>
            </body>
          </html>`
      };
    }
    
    const template = fs.readFileSync(templatePath, 'utf-8');
    console.log('Template loaded successfully');

    // 2. Load the server render function
    const serverPath = path.join(__dirname, '../../dist/server/entry-server.js');
    console.log('Looking for server bundle at:', serverPath);
    
    if (!fs.existsSync(serverPath)) {
      console.error('Server bundle not found!');
      console.error('dist/server contents:', fs.existsSync(path.join(__dirname, '../../dist/server')) ? fs.readdirSync(path.join(__dirname, '../../dist/server')) : 'Directory not found');
      
      // Return template with default meta tags
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
      console.error('Module exports:', Object.keys(serverModule));
      
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

    // 4. Build the final HTML
    let finalHtml = template;
    
    // Remove any existing meta tags that we'll be replacing
    finalHtml = finalHtml.replace(/<meta name="description"[^>]*>/g, '');
    finalHtml = finalHtml.replace(/<meta property="og:[^"]*"[^>]*>/g, '');
    finalHtml = finalHtml.replace(/<meta name="twitter:[^"]*"[^>]*>/g, '');
    finalHtml = finalHtml.replace(/<title>[^<]*<\/title>/g, '');
    
    // Add the new head content
    if (helmet) {
      const headContent = `
        ${helmet.title || '<title>Smart Market Retail</title>'}
        ${helmet.meta || ''}
        ${helmet.link || ''}
        ${helmet.script || ''}
      `;
      
      // Insert right after <head> tag
      finalHtml = finalHtml.replace('<head>', `<head>\n${headContent}`);
      
      // Also replace the placeholder if it exists
      finalHtml = finalHtml.replace('<!--app-head-->', '');
    }
    
    // Replace body content
    finalHtml = finalHtml.replace('<!--app-html-->', appHtml || '');
    
    // Log final verification
    const hasOGTitle = finalHtml.includes('property="og:title"');
    const hasOGDescription = finalHtml.includes('property="og:description"');
    console.log('Final HTML has OG title:', hasOGTitle);
    console.log('Final HTML has OG description:', hasOGDescription);
    
    console.log('=== SSR Function SUCCESS ===');

    return {
      statusCode: status || 200,
      headers: { 
        'Content-Type': 'text/html; charset=utf-8',
        'X-SSR-Status': 'success',
        'X-SSR-Path': url,
        'X-SSR-Has-Meta': `${hasOGTitle && hasOGDescription}`,
        'Cache-Control': 'public, max-age=0, must-revalidate'
      },
      body: finalHtml,
    };
    
  } catch (error: any) {
    console.error('=== SSR Function ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    // Return a fallback HTML with basic meta tags
    return {
      statusCode: 500,
      headers: { 
        'Content-Type': 'text/html; charset=utf-8',
        'X-SSR-Status': 'error',
        'X-SSR-Error': error.message
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