# ravi-both-portfolio-2026

Personal portfolio site, live at https://raviboth.com. Astro 6 with Svelte 5 components, Storybook 10, pnpm. Static build deployed to GitHub Pages from `main`.

## Commands

- `pnpm dev`: dev server
- `pnpm lint`, `pnpm format`, `pnpm format:check`
- `pnpm typecheck`: `astro check`, then `svelte-check` (stories and `.svelte`)
- `pnpm test`: every Storybook story in headless Chromium. First run on a new clone: `pnpm exec playwright install chromium-headless-shell`
- `pnpm fallow`: dead code, complexity and duplication added since the branch left `dev`
- `pnpm build`

## Workflow

- Branch `feature/RBP-<N>-<slug>` off `dev`. PR into `dev`, squash merge. Release PR `dev` into `main`, merge commit. Both branches are protected: PR only, all CI checks required.
- Commits and PR titles follow Conventional Commits with the ticket as scope: `fix(RBP-16): ...`. Headers at most 90 characters.
- The pre-push hook runs the CI checks locally. Do not skip it with `--no-verify`.

## Project management

The Obsidian vault tracks this repo. Read `2. Areas/Code/Repos/ravi-both-portfolio-2026.md` at the start of a session for the current phase and tickets. Keep its `## Phases` and `## Tickets` sections current as work lands: new tickets take the ID from frontmatter `next-ticket:` (then bump it), status glyphs `[ ]` todo, `[/]` doing, `[x]` done with `✅ YYYY-MM-DD`. Epics live in `Repos/ravi-both-portfolio-2026 tickets/`. The vault path is granted via `.claude/settings.local.json` (gitignored, per machine).
