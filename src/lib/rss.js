// Shared RSS 2.0 reading for the blog feeds (Hashnode, Offcuts). Tolerant on
// purpose: a feed with odd markup should lose a post, never break the page.

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
 * Fetches a feed (revalidated hourly through ISR) and returns its posts as
 * { title, url, date, summary }. Throws on a network or HTTP error so each
 * caller can pick its own fallback.
 */
export async function fetchFeed(url) {
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`${new URL(url).host} ${res.status}`);
  const xml = await res.text();
  return (xml.match(/<item>[\s\S]*?<\/item>/g) || [])
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
}
