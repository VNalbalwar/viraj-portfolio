import { site } from "@/content/profile";
import { fetchFeed } from "@/lib/rss";

/**
 * Reads the Offcuts RSS feed once an hour (ISR), newest post first. A new
 * post shows up on the site without a redeploy. If the feed is down or empty
 * the section falls back to a plain link to the blog.
 */
export async function getOffcutsPosts() {
  try {
    const posts = (await fetchFeed(`${site.offcutsUrl}/rss.xml`)).sort((a, b) =>
      (b.date || "").localeCompare(a.date || "")
    );
    return { live: true, postCount: posts.length, posts };
  } catch (err) {
    console.error("Offcuts sync failed, using fallback:", err.message);
    return { live: false, postCount: 0, posts: [] };
  }
}
