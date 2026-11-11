import { site, manualStats } from "@/content/profile";

const decode = (s) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : "";
};

/**
 * Reads the Hashnode RSS feed once an hour (ISR). Publish a post on Hashnode
 * and it shows up here on its own. RSS is free; the GraphQL API is not needed.
 */
export async function getPosts() {
  try {
    const res = await fetch(`https://${site.hashnodeHost}/rss.xml`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Hashnode ${res.status}`);
    const xml = await res.text();
    const posts = (xml.match(/<item>[\s\S]*?<\/item>/g) || [])
      .map((item) => {
        const date = new Date(tag(item, "pubDate"));
        const summary = tag(item, "description");
        return {
          title: tag(item, "title"),
          url: tag(item, "link"),
          date: isNaN(date) ? null : date.toISOString(),
          summary: summary.length > 150 ? `${summary.slice(0, 147).trimEnd()}…` : summary,
        };
      })
      .filter((p) => p.title && p.url.startsWith("https://"));
    return { live: true, postCount: posts.length, posts };
  } catch (err) {
    console.error("Hashnode sync failed, using fallback:", err.message);
    return { live: false, postCount: manualStats.fallbackPosts, posts: [] };
  }
}
