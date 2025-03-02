import { createWriteStream } from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';

// Define your website base URL
const siteUrl = 'https://yourdomain.com'; // Replace with your actual domain

// Define your static pages
const pages = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/marketplace', changefreq: 'daily', priority: 0.9 }, // Example
];

// Create a sitemap stream
const sitemapStream = new SitemapStream({ hostname: siteUrl });

(async () => {
  // Write sitemap to a file
  const writeStream = createWriteStream('./public/sitemap.xml');
  sitemapStream.pipe(writeStream);

  for (const page of pages) {
    sitemapStream.write(page);
  }

  sitemapStream.end();

  await streamToPromise(sitemapStream);

  console.log('Sitemap successfully generated!');
})();
