import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import path from 'path';
import fs from 'fs';

// Adjust the path to correctly locate the index.html in the deployed environment
const templatePath = path.resolve(__dirname, '..', '..', 'dist', 'client', 'index.html');
const template = fs.readFileSync(templatePath, 'utf-8');

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const url = event.path; 

  try {
    // Dynamically import the server entry file
    const { render } = await import(path.resolve(__dirname, '..', '..', 'dist', 'server', 'entry-server.js'));
    const { appHtml, helmet, status } = render(url);

    // This is the corrected replacement logic
    const html = template
      .replace('', `${helmet.title}${helmet.meta}${helmet.link}${helmet.script}`)
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    return {
      statusCode: status,
      headers: { 'Content-Type': 'text/html' },
      body: html,
    };
  } catch (e) {
    // Log the error for debugging in Netlify's function logs
    console.error('SSR Error:', e);
    return {
      statusCode: 500,
      body: 'Internal Server Error during SSR. Check function logs.',
    };
  }
};

export { handler };