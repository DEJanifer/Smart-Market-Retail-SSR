import express from 'express';
import compression from 'compression';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;

async function createServer() {
  const app = express();

  // Add compression middleware
  app.use(compression());

  if (!isProduction) {
    // Development mode: Use Vite's dev server with SSR
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });

    app.use(vite.ssrLoadModule);
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;

      try {
        // Get the index.html template
        let template = fs.readFileSync(
          path.resolve('index.html'),
          'utf-8'
        );

        // Apply Vite HTML transforms
        template = await vite.transformIndexHtml(url, template);

        // Load the server entry module
        const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');

        // Render the app HTML
        const { appHtml, helmet, status } = render(url);

        // Inject the rendered content into the template
        const html = template
          .replace('<!--app-head-->', `${helmet.title}${helmet.meta}${helmet.link}${helmet.script}`)
          .replace('<!--app-html-->', appHtml);

        res.status(status).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    // Production mode: Serve static files and use built SSR
    app.use(express.static(path.resolve('dist/client')));

    app.use('*', async (req, res) => {
      const url = req.originalUrl;

      try {
        // Read the built template
        const template = fs.readFileSync(
          path.resolve('dist/client/index.html'),
          'utf-8'
        );

        // Import the built server entry
        const { render } = await import(path.resolve('dist/server/entry-server.js'));

        // Render the app HTML
        const { appHtml, helmet, status } = render(url);

        // Inject the rendered content into the template
        const html = template
          .replace('<!--app-head-->', `${helmet.title}${helmet.meta}${helmet.link}${helmet.script}`)
          .replace('<!--app-html-->', appHtml);

        res.status(status).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e) {
        console.error(e);
        res.status(500).end('Internal Server Error');
      }
    });
  }

  return app;
}

createServer().then(app => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});