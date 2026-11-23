import { site, manualStats } from "@/content/profile";
import { fetchFeed } from "@/lib/rss";

/**
 * Reads the Hashnode RSS feed once an hour (ISR). Publish a post on Hashnode
 * and it shows up here on its own. RSS is free; the GraphQL API is not needed.
 */
export async function getPosts() {
  try {
    const posts = await fetchFeed(`https://${site.hashnodeHost}/rss.xml`);
    return { live: true, postCount: posts.length, posts };
  } catch (err) {
    console.error("Hashnode sync failed, using fallback:", err.message);
    return { live: false, postCount: manualStats.fallbackPosts, posts: [] };
  }
}
