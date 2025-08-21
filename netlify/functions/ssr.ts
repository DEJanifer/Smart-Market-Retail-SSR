import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import path from 'path';
import fs from 'fs';

// Import the server-side render function from your built SSR bundle.
// The path is relative to the function's execution environment on Netlify.
// Assuming 'dist' is at the project root, and the function is in 'netlify/functions'.
const { render } = require(path.join(__dirname, '..', '..', 'dist', 'server', 'entry-server.js'));

// Read the client-side index.html template.
// This template will be used to inject the server-rendered React app.
const templatePath = path.join(__dirname, '..', '..', 'dist', 'client', 'index.html');
const template = fs.readFileSync(templatePath, 'utf-8');

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const url = event.path; // Get the requested URL path

  try {
    // Perform Server-Side Rendering using your application's render function.
    // This function generates the HTML content and extracts Helmet data for SEO.
    const { appHtml, helmet, status } = render(url);

    // Inject the server-rendered content and Helmet data into the index.html template.
    const html = template
      .replace('<!--app-head-->', `${helmet.title}${helmet.meta}${helmet.link}${helmet.script}`)
      .replace('<!--app-html-->', appHtml);

    // Return the server-rendered HTML with the appropriate status code.
    return {
      statusCode: status,
      headers: { 'Content-Type': 'text/html' },
      body: html,
    };
  } catch (e) {
    // Log any errors that occur during SSR for debugging.
    console.error('SSR Error:', e);
    // Return a 500 Internal Server Error response.
    return {
      statusCode: 500,
      body: 'Internal Server Error during SSR',
    };
  }
};

export { handler };