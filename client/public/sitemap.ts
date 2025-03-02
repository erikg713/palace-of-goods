import express from "express";
import fs from "fs";
import moment from "moment";

const app = express();
const PORT = process.env.PORT || 3000;

// Simulated database (Replace with your actual database query)
const pages = [
  { loc: "https://palaceofgoods.com/", priority: "1.0", changefreq: "daily" },
  { loc: "https://palaceofgoods.com/shop", priority: "0.9", changefreq: "weekly" },
  { loc: "https://palaceofgoods.com/about", priority: "0.7", changefreq: "monthly" },
];

// Function to generate XML sitemap
const generateSitemap = () => {
  const sitemapHeader = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const sitemapBody = pages
    .map(
      (page) => `
    <url>
      <loc>${page.loc}</loc>
      <lastmod>${moment().format("YYYY-MM-DD")}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>`
    )
    .join("");

  const sitemapFooter = `</urlset>`;

  const sitemapXML = `${sitemapHeader}${sitemapBody}${sitemapFooter}`;

  fs.writeFileSync("public/sitemap.xml", sitemapXML);
  console.log("✅ Sitemap updated successfully!");
};

// 📌 Generate sitemap on server start
generateSitemap();

// 🛠 Serve the sitemap file dynamically
app.get("/sitemap.xml", (req, res) => {
  res.sendFile(__dirname + "/public/sitemap.xml");
});

app.listen(PORT, () => console.log(`🌍 Sitemap server running at http://localhost:${PORT}/sitemap.xml`));
