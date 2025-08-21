import type { Handler, HandlerEvent } from '@netlify/functions';
import path from 'path';
import fs from 'fs';

const templatePath = path.resolve(__dirname, '..', '..', 'dist', 'client', 'index.html');

const handler: Handler = async (event: HandlerEvent) => {
  const url = event.path;

  try {
    // 1. Read the template file from disk
    const template = fs.readFileSync(templatePath, 'utf-8');
    console.log('--- Template file read successfully ---');

    // 2. Dynamically import your server-rendering function
    const { render } = await import(path.resolve(__dirname, '..', '..', 'dist', 'server', 'entry-server.js'));
    console.log('--- Server-render function imported ---');

    // 3. Render your React app to an HTML string
    const { appHtml, helmet, status } = render(url);
    console.log('--- React app rendered to HTML ---');

    // 4. Perform the replacement using a multiline-aware regex
    //    The 's' flag at the end is the critical fix.
    const finalHtml = template
      .replace('', `${helmet.title}${helmet.meta}${helmet.link}${helmet.script}`)
      .replace(/<div id="root">.*?<\/div>/s, `<div id="root">${appHtml}</div>`);

    // 5. Add a check to confirm the replacement worked before sending
    if (finalHtml.includes('')) {
        console.error('--- FATAL: Replacement failed! The placeholder is still in the final HTML. ---');
    } else {
        console.log('--- SUCCESS: HTML replacement was successful. ---');
    }

    return {
      statusCode: status,
      headers: { 'Content-Type': 'text/html' },
      body: finalHtml,
    };
  } catch (e) {
    console.error('--- SSR Function CRASHED ---', e);
    return {
      statusCode: 500,
      body: 'Internal Server Error. Check function logs for details.',
    };
  }
};

export { handler };