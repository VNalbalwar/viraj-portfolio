import { site, projectOverrides, hiddenRepos, manualStats } from "@/content/profile";

const API = "https://api.github.com";

function headers() {
  const h = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "portfolio-site",
  };
  // Optional. Without it GitHub allows 60 requests/hour per IP, which is
  // plenty at one refresh per hour, but a token makes it bulletproof.
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

const humanize = (name) =>
  name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bJs\b/g, "JS")
    .replace(/\bAi\b/g, "AI");

function toProject(repo) {
  const o = projectOverrides[repo.name] || {};
  const tech = o.tech || [repo.language, ...(repo.topics || []).slice(0, 2)].filter(Boolean);
  return {
    id: repo.name,
    title: o.title || humanize(repo.name),
    desc: o.desc || repo.description || null,
    tech,
    language: repo.language || null,
    thumbKey: o.thumbKey || null,
    featured: Boolean(o.featured),
    github: repo.html_url,
    live: repo.homepage || null,
    stars: repo.stargazers_count || 0,
    pushedAt: repo.pushed_at || null,
  };
}

// Used when GitHub is unreachable: the curated list still renders.
function fallbackProjects() {
  return Object.entries(projectOverrides).map(([name, o]) => ({
    id: name,
    title: o.title || humanize(name),
    desc: o.desc || null,
    tech: o.tech || [],
    language: null,
    thumbKey: o.thumbKey || null,
    featured: Boolean(o.featured),
    github: `https://github.com/${site.githubUser}/${name}`,
    live: null,
    stars: 0,
    pushedAt: null,
  }));
}

function sortProjects(list) {
  const order = Object.keys(projectOverrides);
  const rank = (p) => {
    const i = order.indexOf(p.id);
    return p.featured ? i : 1000;
  };
  return list.sort((a, b) => {
    const r = rank(a) - rank(b);
    if (r !== 0) return r;
    return (b.pushedAt || "").localeCompare(a.pushedAt || "");
  });
}

/**
 * Fetches public repos once an hour (ISR). New repos appear on the site
 * without a redeploy; forks and hidden repos are skipped.
 */
export async function getGithub() {
  try {
    const opts = { headers: headers(), next: { revalidate: 3600 } };
    const [userRes, reposRes] = await Promise.all([
      fetch(`${API}/users/${site.githubUser}`, opts),
      fetch(`${API}/users/${site.githubUser}/repos?per_page=100&sort=pushed`, opts),
    ]);
    if (!userRes.ok || !reposRes.ok) throw new Error(`GitHub ${userRes.status}/${reposRes.status}`);
    const user = await userRes.json();
    const repos = await reposRes.json();

    const projects = sortProjects(
      repos
        .filter((r) => !r.private && !r.archived && !hiddenRepos.includes(r.name))
        .filter((r) => !r.fork || projectOverrides[r.name])
        .map(toProject)
    );

    return { live: true, repoCount: user.public_repos, projects };
  } catch (err) {
    console.error("GitHub sync failed, using fallback:", err.message);
    return {
      live: false,
      repoCount: manualStats.fallbackRepos,
      projects: sortProjects(fallbackProjects()),
    };
  }
}
