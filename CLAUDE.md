# ravi-both-portfolio-2026

Astro 6 + Svelte 5 portfolio site, deployed to GitHub Pages from `main`. Scripts are in `package.json`.

- Branch off `dev` and open PRs with `gh pr create --base dev` (the default branch is `main`). Feature PRs squash into `dev`. Releases go `dev` into `main` as a merge commit.
- Commits and PR titles are Conventional Commits, with the ticket as scope when there is one (`fix(RBP-16): ...`), at most 90 characters. Release PR titles: `release: <YYYY-MM-DD>: <summary>`.
- Never bypass the hooks (`--no-verify`) or the branch rules (`gh pr merge --admin`).
- `pnpm test` needs `pnpm exec playwright install chromium-headless-shell` once per clone.
