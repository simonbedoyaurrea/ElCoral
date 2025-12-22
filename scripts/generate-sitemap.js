import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import slugify from "../src/utils/slugify.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Escribimos en public por defecto para que esté disponible en dev y en deploys estáticos
const publicDir = path.join(__dirname, "..", "dist");
const dataDir = path.join(__dirname, "..", "src", "data");
const productsDir = path.join(dataDir, "Products");
const blogDir = path.join(dataDir, "blog");

function readJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (e) {
    console.error("Error reading JSON", filePath, e);
    return null;
  }
}

async function generateSitemap() {
  // Allow overriding the site URL via environment variable
  let SITE_URL = process.env.SITE_URL || "https://el-coral.vercel.app";

  // Ensure HTTPS protocol
  if (SITE_URL && !SITE_URL.startsWith("http")) {
    SITE_URL = `https://${SITE_URL}`;
  }

  // Ensure public dir exists
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  // 1. Home
  const urls = new Set();
  urls.add(`${SITE_URL}/`);

  // 2. Categories
  const categoriesPath = path.join(dataDir, "Categories.json");
  const categoriesData = readJSON(categoriesPath);
  if (categoriesData && Array.isArray(categoriesData)) {
    categoriesData.forEach((c) => {
      const link = c.link || (c.slug ? `/categorias/${c.slug}` : null);
      if (link) urls.add(`${SITE_URL}${link}`);
    });
  }

  // 3. Products (scan files in Products folder)
  let productFiles = [];
  try {
    productFiles = fs
      .readdirSync(productsDir)
      .filter((f) => f.endsWith(".json"));
  } catch (e) {
    console.error("Unable to list products folder", e);
  }

  productFiles.forEach((file) => {
    const filePath = path.join(productsDir, file);
    const data = readJSON(filePath);
    const products = data?.products || data?.productos || [];
    products.forEach((p) => {
      const slug = p.slug || slugify(p.name || "");
      if (!slug) return;
      urls.add(`${SITE_URL}/productos/${slug}`);
    });
  });

  // 4. Blog index
  urls.add(`${SITE_URL}/blog`);

  // 5. Blog posts (scan blog folder)
  let blogFiles = [];
  try {
    blogFiles = fs.readdirSync(blogDir).filter((f) => f.endsWith(".json"));
  } catch (e) {
    console.error("Unable to list blog folder", e);
  }

  blogFiles.forEach((file) => {
    const filePath = path.join(blogDir, file);
    const data = readJSON(filePath);
    const posts = data?.posts || [];
    posts.forEach((p) => {
      const slug = p.slug || slugify(p.title || "");
      if (!slug) return;
      urls.add(`${SITE_URL}/ideas/${slug}`);
    });
  });

  const lastmod = new Date().toISOString().split("T")[0];
  const pri = (url) => {
    if (url === `${SITE_URL}/`) return "1.0";
    if (url.endsWith("/blog")) return "0.7";
    if (url.includes("/ideas/")) return "0.6";
    if (url.includes("/productos/")) return "0.8";
    if (url.includes("/categorias/")) return "0.7";
    return "0.5";
  };

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];
  Array.from(urls)
    .sort()
    .forEach((u) => {
      xml.push("  <url>");
      xml.push(`    <loc>${u}</loc>`);
      xml.push(`    <lastmod>${lastmod}</lastmod>`);
      xml.push(`    <priority>${pri(u)}</priority>`);
      xml.push("  </url>");
    });
  xml.push("</urlset>");

  const sitemapPath = path.join(publicDir, "sitemap.xml");
  fs.writeFileSync(sitemapPath, xml.join("\n"), "utf8");
  console.log("Sitemap generated:", sitemapPath);
}

generateSitemap().catch((e) => {
  console.error("Error generating sitemap", e);
  process.exit(1);
});
