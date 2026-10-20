# ravi-both-portfolio-2026

Personal portfolio site, live at https://raviboth.com. Astro 6 with Svelte 5 components, Storybook 10, pnpm. Static build deployed to GitHub Pages from `main`, after CI passes.

## Commands

- `pnpm dev`, `pnpm build`, `pnpm preview`
- `pnpm storybook`: component explorer on port 6006
- `pnpm lint`, `pnpm format`, `pnpm format:check`
- `pnpm typecheck`: `astro check`, then `svelte-check` (stories and `.svelte`). Warnings fail it.
- `pnpm test`: every Storybook story in headless Chromium. First run on a new clone: `pnpm exec playwright install chromium-headless-shell`
- `pnpm fallow`: dead code, complexity and duplication added since the branch left `dev`

## Workflow

- Branch `feature/RBP-<N>-<slug>` off `dev`. Open the PR with `gh pr create --base dev`: the default branch is `main`. Feature PRs squash-merge into `dev`. Release PRs go from `dev` into `main` as a merge commit.
- Both branches are protected: PR only, all CI checks required. Never merge with `gh pr merge --admin`.
- Commits and PR titles follow Conventional Commits with the ticket as scope: `fix(RBP-16): ...`. Release PR titles: `release: <YYYY-MM-DD>: <summary>`. Headers at most 90 characters.
- The commit-msg hook lints messages. The pre-push hook runs lint, format check, typecheck, tests, build and fallow. Do not skip either with `--no-verify`.

## Project management

The Obsidian vault tracks this repo. `.claude/settings.local.json` (gitignored, one per machine) grants the vault's `2. Areas/Code` folder. On this desktop that is `/var/home/ravi/obsidian/2. Areas/Code`. If the grant is missing, ask for the vault path.

- Read `<granted folder>/Repos/ravi-both-portfolio-2026.md` at the start of a session for the current phase and tickets.
- Keep its `## Phases` and `## Tickets` sections current as work lands. Write tickets in the format the comment at the top of `## Tickets` defines, and take new IDs from frontmatter `next-ticket:` (then bump it).
- Epics and promoted tickets live in `<granted folder>/Repos/ravi-both-portfolio-2026 tickets/`.
