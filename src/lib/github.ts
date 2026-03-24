import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { projects as localProjects, type Project, type ProjectLink } from "../data/projects";

// ---------------------------------------------------------------------------
// GitHub API types (minimal subset of REST response)
// ---------------------------------------------------------------------------

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const GITHUB_USER = "raviboth";
const API_URL = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`;
const CACHE_DIR = join(process.cwd(), ".cache");
const CACHE_FILE = join(CACHE_DIR, "github-repos.json");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Title-case a kebab-case string: "drum-machine" -> "Drum Machine" */
function titleCase(name: string): string {
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ---------------------------------------------------------------------------
// Cache read / write
// ---------------------------------------------------------------------------

async function readCache(): Promise<GitHubRepo[] | null> {
  try {
    const raw = await readFile(CACHE_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed as GitHubRepo[];
  } catch {
    return null;
  }
}

async function writeCache(repos: GitHubRepo[]): Promise<void> {
  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(CACHE_FILE, JSON.stringify(repos, null, 2), "utf-8");
}

// ---------------------------------------------------------------------------
// GitHub API fetch
// ---------------------------------------------------------------------------

async function fetchGitHubRepos(token?: string): Promise<GitHubRepo[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "ravi-quick-portfolio-build",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(API_URL, { headers });

  if (!response.ok) {
    throw new Error(
      `GitHub API responded with ${response.status}: ${response.statusText}`,
    );
  }

  const data: GitHubRepo[] = await response.json();

  // Filter to repos with the "portfolio" topic
  return data.filter(
    (repo) => Array.isArray(repo.topics) && repo.topics.includes("portfolio"),
  );
}

// ---------------------------------------------------------------------------
// Mapping: GitHubRepo -> Project
// ---------------------------------------------------------------------------

export function mapGitHubRepoToProject(repo: GitHubRepo): Project {
  const links: ProjectLink[] = [];

  if (repo.html_url) {
    links.push({ label: "GitHub", url: repo.html_url });
  }
  if (repo.homepage) {
    links.push({ label: "Live Site", url: repo.homepage });
  }

  return {
    id: repo.name,
    title: titleCase(repo.name),
    shortDesc: repo.description ?? "",
    longDesc: "",
    role: "Developer",
    contributions: [],
    tech: repo.language ? [repo.language] : [],
    images: [],
    links,
  };
}

// ---------------------------------------------------------------------------
// Merge logic
// ---------------------------------------------------------------------------

export function mergeProjects(
  local: Project[],
  githubRepos: GitHubRepo[],
): Project[] {
  // Build a lookup map of GitHub repos by lowercase name
  const repoMap = new Map<string, GitHubRepo>();
  for (const repo of githubRepos) {
    repoMap.set(repo.name.toLowerCase(), repo);
  }

  const matchedRepoNames = new Set<string>();

  // Merge local projects with any matching GitHub data
  const merged = local.map((project) => {
    const repo = repoMap.get(project.id.toLowerCase());
    if (!repo) return project;

    matchedRepoNames.add(repo.name.toLowerCase());

    const ghProject = mapGitHubRepoToProject(repo);

    return {
      id: project.id,
      title: project.title || ghProject.title,
      shortDesc: project.shortDesc || ghProject.shortDesc,
      longDesc: project.longDesc || ghProject.longDesc,
      role: project.role || ghProject.role,
      contributions:
        project.contributions.length > 0
          ? project.contributions
          : ghProject.contributions,
      tech: project.tech.length > 0 ? project.tech : ghProject.tech,
      images: project.images, // always local
      links: project.links.length > 0 ? project.links : ghProject.links,
    } satisfies Project;
  });

  // Append GitHub-only repos (no local match)
  for (const repo of githubRepos) {
    if (!matchedRepoNames.has(repo.name.toLowerCase())) {
      merged.push(mapGitHubRepoToProject(repo));
    }
  }

  return merged;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fetches GitHub repo metadata, merges with local project data, and returns
 * the combined project list. Falls back to local-only data on any failure.
 */
export async function getProjects(): Promise<Project[]> {
  try {
    // Try to import the token. This uses Astro's env schema.
    // At build time, Astro resolves this; during tests or outside Astro,
    // we fall back gracefully.
    let token: string | undefined;
    try {
      const mod = await import("astro:env/server");
      token = (mod as Record<string, unknown>).GITHUB_TOKEN as
        | string
        | undefined;
    } catch {
      // Not running inside Astro (e.g. tests) — proceed without token
      token = process.env.GITHUB_TOKEN ?? undefined;
    }

    // Step 1: Try reading cache
    let repos = await readCache();

    // Step 2: If no cache, fetch from API and write cache
    if (!repos) {
      repos = await fetchGitHubRepos(token);
      await writeCache(repos);
    }

    // Step 3: Merge and return
    return mergeProjects(localProjects, repos);
  } catch (error) {
    console.warn(
      "[github] Failed to fetch/merge GitHub data, falling back to local projects:",
      error,
    );
    return localProjects;
  }
}
