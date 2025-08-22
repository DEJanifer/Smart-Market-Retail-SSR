import type { Handler, HandlerEvent } from '@netlify/functions';
import path from 'path';
import fs from 'fs';

const handler: Handler = async (event: HandlerEvent) => {
  const url = event.path;

  try {
    // 1. Read the template file
    const templatePath = path.join(__dirname, '../../dist/client/index.html');
    
    if (!fs.existsSync(templatePath)) {
      console.error('--- Template not found at:', templatePath);
      console.error('--- Current directory:', __dirname);
      console.error('--- Files in dist/client:', fs.existsSync(path.join(__dirname, '../../dist/client')) ? fs.readdirSync(path.join(__dirname, '../../dist/client')) : 'Directory not found');
      throw new Error('Template index.html not found');
    }
    
    const template = fs.readFileSync(templatePath, 'utf-8');
    console.log('--- Template found and loaded ---');

    // 2. Load the server render function (CommonJS require instead of dynamic import)
    const serverPath = path.join(__dirname, '../../dist/server/entry-server.js');
    
    if (!fs.existsSync(serverPath)) {
      console.error('--- Server module not found at:', serverPath);
      console.error('--- Files in dist/server:', fs.existsSync(path.join(__dirname, '../../dist/server')) ? fs.readdirSync(path.join(__dirname, '../../dist/server')) : 'Directory not found');
      throw new Error('Server render module not found');
    }
    
    console.log('--- Loading server module from:', serverPath);
    
    // Use require for CommonJS modules
    delete require.cache[serverPath]; // Clear cache to ensure fresh module
    const serverModule = require(serverPath);
    const render = serverModule.render || serverModule.default?.render;
    
    if (!render) {
      console.error('--- Server module loaded but render function not found');
      console.error('--- Module exports:', Object.keys(serverModule));
      throw new Error('Render function not found in server module');
    }
    
    console.log('--- Server module loaded successfully ---');

    // 3. Render the React app
    const { appHtml, helmet, status } = render(url);
    console.log('--- React app rendered successfully ---');

    // 4. Replace placeholders in template
    let finalHtml = template;
    
    // Replace head content
    if (helmet) {
      const headContent = `${helmet.title || ''}${helmet.meta || ''}${helmet.link || ''}${helmet.script || ''}`;
      finalHtml = finalHtml.replace('<!--app-head-->', headContent);
    }
    
    // Replace body content
    finalHtml = finalHtml.replace('<!--app-html-->', appHtml || '');

    // 5. Verify replacements worked
    if (finalHtml.includes('<!--app-html-->')) {
      console.warn('--- WARNING: <!--app-html--> placeholder was not replaced ---');
    }
    if (finalHtml.includes('<!--app-head-->')) {
      console.warn('--- WARNING: <!--app-head--> placeholder was not replaced ---');
    }
    
    console.log('--- SSR completed successfully ---');

    return {
      statusCode: status || 200,
      headers: { 
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=0, must-revalidate'
      },
      body: finalHtml,
    };
    
  } catch (error) {
    console.error('--- SSR Function ERROR ---');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    
    // Return a basic error page
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/html' },
      body: `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Server Error</title>
          </head>
          <body>
            <h1>500 - Server Error</h1>
            <p>Sorry, something went wrong while loading this page.</p>
            <p>Error: ${error.message}</p>
            <p>Please try refreshing the page.</p>
          </body>
        </html>
      `,
    };
  }
};

export { handler };