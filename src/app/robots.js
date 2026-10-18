export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    host: "https://pacostudios.org",
    sitemap: "https://pacostudios.org/sitemap.xml",
  };
}
