
import type { Handler, HandlerEvent } from '@netlify/functions';
import path from 'path';
import fs from 'fs';

const handler: Handler = async (event: HandlerEvent) => {
  const url = event.path;

  try {
    // 1. Try to read the template file from different possible locations
    let template = '';
    const possibleTemplatePaths = [
      path.join(__dirname, 'index.html'), // If we copied it to functions directory
      path.join(__dirname, '../../dist/client/index.html'), // Relative to function
      path.join(process.cwd(), 'dist/client/index.html'), // From current working directory
    ];

    let templateFound = false;
    for (const templatePath of possibleTemplatePaths) {
      try {
        if (fs.existsSync(templatePath)) {
          template = fs.readFileSync(templatePath, 'utf-8');
          console.log(`--- Template found at: ${templatePath} ---`);
          templateFound = true;
          break;
        }
      } catch (err) {
        // Continue to next path
      }
    }

    if (!templateFound) {
      // If we can't find the template file, log debugging info
      console.error('--- Template not found. Debugging info: ---');
      console.error('__dirname:', __dirname);
      console.error('process.cwd():', process.cwd());
      console.error('Files in __dirname:', fs.readdirSync(__dirname));
      
      throw new Error('Template index.html not found');
    }

    // 2. Import the server render function
    let render;
    const possibleServerPaths = [
      path.join(__dirname, '../../dist/server/entry-server.js'),
      path.join(process.cwd(), 'dist/server/entry-server.js'),
    ];

    for (const serverPath of possibleServerPaths) {
      try {
        if (fs.existsSync(serverPath)) {
          const module = await import(serverPath);
          render = module.render;
          console.log(`--- Server module found at: ${serverPath} ---`);
          break;
        }
      } catch (err) {
        // Continue to next path
      }
    }

    if (!render) {
      console.error('--- Server module not found. Debugging info: ---');
      console.error('Searched paths:', possibleServerPaths);
      throw new Error('Server render module not found');
    }

    // 3. Render the React app
    const { appHtml, helmet, status } = render(url);
    console.log('--- React app rendered successfully ---');

    // 4. Replace placeholders in template
    let finalHtml = template;
    
    // Replace head content
    if (finalHtml.includes('<!--app-head-->')) {
      finalHtml = finalHtml.replace('<!--app-head-->', 
        `${helmet.title}${helmet.meta}${helmet.link}${helmet.script}`);
    }
    
    // Replace body content
    if (finalHtml.includes('<!--app-html-->')) {
      finalHtml = finalHtml.replace('<!--app-html-->', appHtml);
    }

    // 5. Verify replacements worked
    if (finalHtml.includes('<!--app-html-->') || finalHtml.includes('<!--app-head-->')) {
      console.error('--- WARNING: Some placeholders were not replaced ---');
      console.error('Still has <!--app-html-->:', finalHtml.includes('<!--app-html-->'));
      console.error('Still has <!--app-head-->:', finalHtml.includes('<!--app-head-->'));
    } else {
      console.log('--- SUCCESS: All placeholders replaced ---');
    }

    return {
      statusCode: status || 200,
      headers: { 
        'Content-Type': 'text/html',
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
          </body>
        </html>
      `,
    };
  }
};

export { handler };