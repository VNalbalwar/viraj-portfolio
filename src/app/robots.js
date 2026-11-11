import { site } from "@/content/profile";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
