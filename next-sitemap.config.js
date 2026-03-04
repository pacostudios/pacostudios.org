/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://pacostudios.org",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ["/sitemap.xml", "/sitemap-*.xml"],
  generateIndexSitemap: false,
};
