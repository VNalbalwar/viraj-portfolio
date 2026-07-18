// Cached for 1 hour — revalidates in the background (ISR)
export const revalidate = 3600;

async function fetchGitHubRepos() {
  try {
    const res = await fetch("https://api.github.com/users/VNalbalwar", {
      headers: { Accept: "application/vnd.github.v3+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.public_repos === "number" ? data.public_repos : null;
  } catch {
    return null;
  }
}

async function fetchHashnodePosts() {
  try {
    // Hashnode GraphQL API moved to paid (May 2026) — use RSS feed instead
    const res = await fetch("https://virajblogs.hashnode.dev/rss.xml", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const xml = await res.text();
    const matches = xml.match(/<item>/g);
    return matches ? matches.length : null;
  } catch {
    return null;
  }
}

export async function GET() {
  const [githubRepos, hashnodePosts] = await Promise.all([
    fetchGitHubRepos(),
    fetchHashnodePosts(),
  ]);

  return Response.json({
    githubRepos,   // null if fetch failed → client falls back to static value
    hashnodePosts, // null if fetch failed → client falls back to static value
  });
}
