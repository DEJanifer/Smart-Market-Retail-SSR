import type { Handler, HandlerEvent } from '@netlify/functions';
import path from 'path';
import fs from 'fs';

const templatePath = path.resolve(__dirname, '..', '..', 'dist', 'client', 'index.html');
const template = fs.readFileSync(templatePath, 'utf-8');

const handler: Handler = async (event: HandlerEvent) => {
  const url = event.path;

  try {
    const { render } = await import(path.resolve(__dirname, '..', '..', 'dist', 'server', 'entry-server.js'));
    const { appHtml, helmet, status } = render(url);

    // This robust replacement uses a regular expression to find the entire root div
    const html = template
      .replace('', `${helmet.title}${helmet.meta}${helmet.link}${helmet.script}`)
      .replace(/<div id="root">.*?<\/div>/, `<div id="root">${appHtml}</div>`);

    return {
      statusCode: status,
      headers: { 'Content-Type': 'text/html' },
      body: html,
    };
  } catch (e) {
    console.error('SSR Error:', e);
    return {
      statusCode: 500,
      body: 'Internal Server Error. Check function logs in your Netlify dashboard.',
    };
  }
};

export { handler };