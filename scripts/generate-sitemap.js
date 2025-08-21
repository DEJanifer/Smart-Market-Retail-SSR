import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fm from 'front-matter';
import prettier from 'prettier';

// Import from the compiled JavaScript files in the 'data' subfolder
import { carrollCountyTowns, baltimoreCountyTowns } from './data/serviceAreaData.js';
import { locationTypes } from './data/locationData.js';

// --- Function to Get Blog Post Routes from Local Files ---
const getBlogRoutesFromMarkdown = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const postsDir = path.resolve(__dirname, '../src/posts');
  
  if (!fs.existsSync(postsDir)) {
    console.warn('Posts directory not found, skipping blog routes');
    return [];
  }
  
  const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
  
  return files.map(file => {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { attributes } = fm(content);
    
    // Use slug from front matter, or fall back to filename without extension
    const slug = attributes.slug || path.basename(file, '.md');
    return `/blog/${slug}`;
  });
};

const generateSitemap = async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const today = new Date().toISOString().split('T')[0];
  const baseUrl = 'https://smartmarketretail.com';

  // --- Define Route Categories ---
  const homepageRoute = ['/'];
  const staticRoutes = [
    '/solutions', '/solutions/smart-store', '/solutions/micro-markets',
    '/solutions/smart-coolers', '/solutions/smart-vending', '/about',
    '/locations', '/service-area', '/contact', '/faq'
  ];
  const blogIndexRoute = ['/blog'];

  const blogPostRoutes = getBlogRoutesFromMarkdown();
  const serviceAreaRoutes = [
    ...carrollCountyTowns.map(town => `/service-area/${town.slug}`),
    ...baltimoreCountyTowns.map(town => `/service-area/${town.slug}`),
  ];
  const locationRoutes = locationTypes.map(location => location.path);

  // --- Sitemap Generation Logic ---
  const createUrlEntry = (route, changefreq, priority) => `
    <url>
      <loc>${baseUrl}${route}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>
  `;

  const sitemapEntries = [
    ...homepageRoute.map(route => createUrlEntry(route, 'daily', '1.0')),
    ...blogIndexRoute.map(route => createUrlEntry(route, 'weekly', '0.9')),
    ...blogPostRoutes.map(route => createUrlEntry(route, 'yearly', '0.7')),
    ...serviceAreaRoutes.map(route => createUrlEntry(route, 'monthly', '0.7')),
    ...locationRoutes.map(route => createUrlEntry(route, 'monthly', '0.7')),
    ...staticRoutes.map(route => createUrlEntry(route, 'monthly', '0.8')),
  ].join('');

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapEntries}
    </urlset>
  `;

  const formattedSitemap = await prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  fs.writeFileSync(path.resolve(__dirname, '../public/sitemap.xml'), formattedSitemap);

  console.log('Sitemap generated successfully with dynamic frequencies and priorities!');
};

generateSitemap();