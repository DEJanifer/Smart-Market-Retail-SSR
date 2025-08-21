
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { matchRoutes } from 'react-router-dom';
import App from './App';

// Define the route configuration for 404 detection
const routes = [
  { path: '/' },
  { path: '/about' },
  { path: '/solutions' },
  { path: '/solutions/micro-markets' },
  { path: '/solutions/smart-vending' },
  { path: '/solutions/smart-coolers' },
  { path: '/solutions/smart-store' },
  { path: '/locations' },
  { path: '/service-area' },
  { path: '/service-area/:townName' },
  { path: '/contact' },
  { path: '/blog' },
  { path: '/blog/:postId' },
  { path: '/locations/:locationSlug' },
];

export interface RenderResult {
  appHtml: string;
  helmet: {
    title: string;
    meta: string;
    link: string;
    script: string;
  };
  status: number;
}

export function render(url: string): RenderResult {
  // Create a helmet context to collect head tags
  const helmetContext = {};
  
  // Check if the URL matches any of our defined routes
  const matches = matchRoutes(routes, url);
  const status = matches ? 200 : 404;

  // Render the app with StaticRouter for SSR
  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  // Extract helmet data from context
  const helmet = (helmetContext as any).helmet || {
    title: { toString: () => '' },
    meta: { toString: () => '' },
    link: { toString: () => '' },
    script: { toString: () => '' },
  };

  return {
    appHtml: `<div data-server-rendered="true">${appHtml}</div>`,
    helmet: {
      title: helmet.title.toString(),
      meta: helmet.meta.toString(),
      link: helmet.link.toString(),
      script: helmet.script.toString(),
    },
    status,
  };
}
