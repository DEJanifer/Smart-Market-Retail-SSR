import type { Handler } from '@netlify/functions';
import * as path from 'path';
import * as fs from 'fs';

const handler: Handler = async (event) => {
  const url = event.path || '/';
  
  console.log('=== SSR Function START ===');
  console.log('Processing URL:', url);
  console.log('Method:', event.httpMethod);
  
  // Handle non-GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  // Skip SSR for static assets
  if (url.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)$/)) {
    return {
      statusCode: 404,
      body: 'Not Found'
    };
  }

  try {
    // Load the template - use multiple possible paths
    const possibleTemplatePaths = [
      path.join(__dirname, '../../dist/client/index.html'),
      path.join(process.cwd(), 'dist/client/index.html'),
      path.join(__dirname, '../dist/client/index.html')
    ];
    
    let template = '';
    let templatePath = '';
    
    for (const possiblePath of possibleTemplatePaths) {
      console.log('Checking template path:', possiblePath);
      if (fs.existsSync(possiblePath)) {
        templatePath = possiblePath;
        template = fs.readFileSync(possiblePath, 'utf-8');
        console.log('Template found at:', templatePath);
        break;
      }
    }
    
    if (!template) {
      console.error('Template not found in any location');
      // Return a basic fallback HTML
      return {
        statusCode: 200,
        headers: { 
          'Content-Type': 'text/html; charset=utf-8',
          'X-SSR-Status': 'template-missing'
        },
        body: `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Smart Market Retail</title>
              <meta property="og:title" content="Smart Market Retail" />
              <meta property="og:description" content="Modern vending solutions for Carroll & Baltimore County, MD" />
              <meta property="og:image" content="https://smartmarketretail.com/Smart Store 700 05.1_large.webp" />
              <meta property="og:url" content="https://smartmarketretail.com${url}" />
              <meta property="og:type" content="website" />
              <meta name="twitter:card" content="summary_large_image" />
            </head>
            <body>
              <div id="root"></div>
              <script>window.location.reload();</script>
            </body>
          </html>`
      };
    }

    // Try to load and use the server render function
    const possibleServerPaths = [
      path.join(__dirname, '../../dist/server/entry-server.js'),
      path.join(process.cwd(), 'dist/server/entry-server.js'),
      path.join(__dirname, '../dist/server/entry-server.js')
    ];
    
    let serverModule: any = null;
    let serverPath = '';
    
    for (const possiblePath of possibleServerPaths) {
      console.log('Checking server bundle at:', possiblePath);
      if (fs.existsSync(possiblePath)) {
        serverPath = possiblePath;
        // Clear require cache for hot reloading
        delete require.cache[possiblePath];
        try {
          serverModule = require(possiblePath);
          console.log('Server bundle loaded from:', serverPath);
          break;
        } catch (e) {
          console.error('Failed to load server bundle:', e);
        }
      }
    }
    
    if (!serverModule) {
      console.warn('Server bundle not found, returning client-only template');
      return {
        statusCode: 200,
        headers: { 
          'Content-Type': 'text/html; charset=utf-8',
          'X-SSR-Status': 'client-only-no-bundle'
        },
        body: template
      };
    }

    // Get the render function
    const render = serverModule.render || serverModule.default?.render;
    
    if (!render || typeof render !== 'function') {
      console.error('Render function not found in server module');
      return {
        statusCode: 200,
        headers: { 
          'Content-Type': 'text/html; charset=utf-8',
          'X-SSR-Status': 'client-only-no-render'
        },
        body: template
      };
    }

    console.log('Calling render function for URL:', url);
    
    // Render the app
    const { appHtml, helmet, status } = render(url);
    
    console.log('Render successful, HTML length:', appHtml?.length);
    console.log('Has helmet data:', !!helmet);

    // Build the final HTML
    let finalHtml = template;
    
    // Replace the app div with rendered HTML
    finalHtml = finalHtml.replace(
      '<!--app-html-->',
      appHtml || ''
    );
    
    // If no <!--app-html--> comment, try the div replacement
    if (!finalHtml.includes(appHtml || '')) {
      finalHtml = finalHtml.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml || ''}</div>`
      );
    }
    
    // Replace helmet placeholders or inject into head
    if (helmet) {
      // Replace title
      if (helmet.title) {
        finalHtml = finalHtml.replace(
          /<title>.*?<\/title>/,
          helmet.title
        );
        // Also try replacing the placeholder
        finalHtml = finalHtml.replace(
          '<!--app-head-->',
          helmet.title + (helmet.meta || '') + (helmet.link || '')
        );
      }
      
      // If we still have meta tags and no placeholder was replaced, inject before </head>
      if (helmet.meta && !finalHtml.includes(helmet.meta)) {
        finalHtml = finalHtml.replace(
          '</head>',
          `${helmet.meta}\n${helmet.link || ''}\n</head>`
        );
      }
    }

    console.log('=== SSR Function SUCCESS ===');
    console.log('Final HTML includes SSR content:', finalHtml.includes(appHtml || 'IMPOSSIBLE_STRING'));

    return {
      statusCode: status || 200,
      headers: { 
        'Content-Type': 'text/html; charset=utf-8',
        'X-SSR-Status': 'success',
        'X-SSR-Path': url,
        'Cache-Control': 'public, max-age=0, must-revalidate'
      },
      body: finalHtml,
    };
    
  } catch (error: any) {
    console.error('=== SSR Function ERROR ===');
    console.error('Error:', error);
    console.error('Stack:', error.stack);
    
    // Return client-side fallback on error
    return {
      statusCode: 200,
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
            <title>Smart Market Retail</title>
            <script>window.location.reload();</script>
          </head>
          <body>
            <div id="root"></div>
          </body>
        </html>`
    };
  }
};

export { handler };