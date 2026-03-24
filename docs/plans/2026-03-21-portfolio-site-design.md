# Portfolio Site Design

## Goal

Portfolio site for Ravi Both — Full-Stack Engineer & Tech Consultant — showcasing previous work to attract clients, hiring managers, and recruiters. Positioning: "Your Tech Partner for Growing Businesses."

## Tech Stack

- **Framework:** Astro with Svelte components
- **Output:** Static site, no JS shipped unless needed by Svelte interactivity
- **Styling:** Global CSS with custom properties (no CSS framework)
- **Data:** Hardcoded project data in `projects.ts`, with GitHub API integration at build time
- **Component Development:** Storybook for isolated component development and visual testing

## Storybook

Storybook is used to develop and document components in isolation before integrating them into the site.

**Setup:**
- `@storybook/svelte-vite` — Svelte + Vite builder for fast HMR
- Stories colocated with components: `src/components/Nav.stories.ts`
- Global CSS and fonts loaded via `.storybook/preview.ts` decorator

**Stories to create:**
- `Nav.stories.ts` — default state, mobile hamburger, with/without email button
- `Hero.stories.ts` — desktop layout, mobile stacked layout
- `About.stories.ts` — desktop 2-column, mobile stacked
- `ProjectCard.stories.ts` — with image, with placeholder, different tech tag counts
- `ProjectModal.stories.ts` — desktop gallery, mobile gallery, different project data
- `Contact.stories.ts` — desktop inline buttons, mobile stacked buttons
- `SkillPill.stories.ts` — default, on mint bg (white), on white bg (mint)
- `IconPillButton.stories.ts` — Email, GitHub, LinkedIn, Resume variants

**Benefits:**
- Visual regression testing for spring theme consistency
- Develop responsive variants without full page context
- Document component API and props
- Shareable component catalog for review

## Architecture

```
/
├── src/
│   ├── layouts/Layout.astro        # Base HTML shell, fonts, global styles
│   ├── pages/index.astro           # Single page, imports all sections
│   ├── components/
│   │   ├── Nav.svelte              # Sticky nav, hamburger on mobile (client:load)
│   │   ├── Nav.stories.ts          # Storybook stories
│   │   ├── Hero.svelte             # Editorial hero with avatar (client:load)
│   │   ├── Hero.stories.ts
│   │   ├── About.svelte            # Bio, skills, languages (static, no hydration)
│   │   ├── About.stories.ts
│   │   ├── Projects.svelte         # Project card grid (client:load)
│   │   ├── ProjectCard.svelte      # Individual card (child of Projects)
│   │   ├── ProjectCard.stories.ts
│   │   ├── ProjectModal.svelte     # Gallery modal with lightbox (child of Projects)
│   │   ├── ProjectModal.stories.ts
│   │   ├── Contact.svelte          # Email, LinkedIn, GitHub links with icons (static)
│   │   └── Contact.stories.ts
│   ├── data/projects.ts            # Hardcoded project data array
│   ├── lib/github.ts               # Build-time GitHub API fetch + merge
│   └── styles/global.css           # Spring theme variables, base styles
├── .storybook/
│   ├── main.ts                     # Storybook config
│   └── preview.ts                  # Global decorators, CSS, fonts
├── .cache/                         # GitHub API response cache (gitignored)
├── public/projects/                # Project screenshots
├── astro.config.mjs
└── package.json
```

## Visual Design

### Spring Theme (Light Only)

**Colors:**
- Background: soft warm white `#faf9f6`
- Primary: sage/muted green `#6b8f71` (buttons, icons, nav links)
- Primary dark: `#4a7050` (text links, subtitles — WCAG AA compliant)
- Accent: amber `#c47d2e` (headline accent, dividers — WCAG accessible)
- Accent light: peach `#f4a261` (decorative use only — fails WCAG on light bg)
- Text: warm dark `#2d2d2d`
- Text secondary: `#555555`
- Mint background: `#f0f7f1` (About & Contact sections)
- Card background: white `#ffffff`
- Tech tags on mint bg: white `#ffffff`
- Tech tags on white bg: light mint `#e8f5e9`
- Footer: dark `#2d2d2d`

**Typography:**
- Headings: Playfair Display (serif) — bold, used for nav links too
- Body: DM Sans (sans-serif)

**Design Touches:**
- Rounded corners on cards (`12px`) and buttons (`22-26px` pill shape)
- Gentle hover animations (slight lift on cards)
- Smooth scroll between sections
- Generous whitespace throughout
- 80px horizontal padding on all sections (consistent alignment)

**Responsive Breakpoints:**
- Desktop: 1024px+ (3-column project grid, full nav)
- Tablet: 768px–1023px (2-column grid, hamburger nav)
- Mobile: <768px (1-column grid, hamburger nav, stacked hero)

## Sections

### Nav
Sticky top bar. "Ravi Both" on the left (Playfair Display), section links (About, Projects, Contact) centered (Playfair Display bold 18px), email button with envelope icon and "ravi@raviboth.com" right-aligned. 80px side padding matching sections. Hamburger menu (actual hamburger food icon) on mobile with full-screen overlay menu showing large links and social pill buttons.

### Hero
Editorial layout. Large statement headline "Business thinking. *Engineering hands.*" on the left — "Engineering hands." in accent amber `#c47d2e`. Subtitle: "MBA in Business Process Improvement. 7+ years full-stack engineering. One person, full lifecycle." Four pill buttons with icons: Email, GitHub, LinkedIn, Resume. Right side: rounded-corner portrait photo (24px radius) with "Ravi Both" and "Full-Stack Engineer & Tech Consultant" below. Mobile: stacks vertically — avatar on top centered, name/title, headline, subtitle, 2x2 button grid.

### About
Section label "ABOUT" + heading "In a Nutshell". Two-column layout on desktop: bio paragraph on the left ("I help small businesses, startups, and non-profits build the right technology..."), skills/languages/education on the right. Skills in white pills: React, Next.js, TypeScript, Node.js, GraphQL, AWS, React Native, Tailwind, Docker, CI/CD, Cypress, DynamoDB, Figma. Languages: English, Dutch, German. Education: MBA, M.I.U. Mobile: stacks vertically. Mint `#f0f7f1` background.

### Projects
Section label "PROJECTS" + heading "Selected Work". Responsive card grid (3 columns desktop, 1 column mobile). Each card: AI-generated or real screenshot thumbnail (200px height desktop, 160px mobile), title (Playfair Display), one-line description, tech stack tags. Clicking a card opens a **gallery modal**.

**Gallery Modal (Desktop):** Side-by-side — dark left panel with main screenshot, prev/next navigation arrows, "1/4" counter, thumbnail strip; white right panel with close X button, title, role, accent divider, description, key contributions, tech tags, and link buttons rendered from the project's `links` array (e.g. Live Site, GitHub, CodePen, Mockup).

**Gallery Modal (Mobile):** Stacked — dark gallery on top with main screenshot and nav arrows, white content below with title + close X on same row, scrollable content.

**Modal accessibility:** Focus trapping, ESC to close, `aria-modal="true"`, body scroll lock when open, close button visible.

### Contact
Section label "CONTACT" + heading "Let's talk". Description: "Every business deserves a tech partner who speaks both business and code. Let's talk about what you're building." Three pill buttons with icons: Email, LinkedIn, GitHub. Mint `#f0f7f1` background.

### Footer
Dark `#2d2d2d` bar with centered "© 2026 Ravi Both - Spring edition" in `#aaaaaa`.

## Project Data Shape

```ts
interface ProjectLink {
  label: string,           // "Live Site", "GitHub", "CodePen", "Mockup", "Screenshots"
  url: string
}

interface Project {
  id: string,
  title: string,
  shortDesc: string,
  longDesc: string,
  role: string,
  contributions: string[],
  tech: string[],
  images: string[],        // Array for gallery lightbox
  links: ProjectLink[]     // Flexible link array — supports Live Site, GitHub, CodePen, etc.
}
```

## Projects to Showcase

1. NextGen Purusha — Meditation site (SquareSpace) | HTML/CSS, JavaScript
2. Walker Pewter — Pewter artist site (SquareSpace) | HTML/CSS, Photoshop
3. Sutherland — Hospital business card generator | PHP, jQuery, Git
4. Pomodoro Timer — 25+5 timer app | React, SASS
5. Drum Machine — Akai MPC-inspired sound trigger | React, SASS
6. Markdown Previewer — Live markdown parser | React
7. Phenic Skincare — Homepage design mockup | Photoshop, Illustrator
8. Raviboth.com — Personal portfolio site | React, SASS, Figma

## GitHub Integration

Projects can be auto-pulled from GitHub at build time, supplemented by local hardcoded data.

**Strategy:**
- Fetch repos via GitHub REST API, filtered by `portfolio` topic tag
- Local project data in `projects.ts` takes precedence (override/supplement GitHub data)
- GitHub data provides: repo name, description, language, URL, stars — auto-generates a GitHub link in `links` array
- Local data adds: custom title, long description, role, contributions, images, additional links (Live Site, CodePen, Mockup, etc.)

**Implementation (`src/lib/github.ts`):**
- Build-time fetch only — no client-side API calls
- Local file cache (`.cache/`, 1hr TTL) during dev to stay under 60 req/hr unauthenticated limit
- Consider GitHub PAT for production builds (higher rate limit)
- Merge function: local fields override GitHub fields when both exist

**Slug strategy:**
- Repo name normalized to kebab-case by default
- Overridable by local data `id` field

**Setup required:**
- Add `portfolio` topic tag to relevant GitHub repos
- Project screenshots stored locally in `public/projects/`, not pulled from GitHub

## SEO

- Meta title: "Ravi Both | Full-Stack Engineer & Tech Consultant"
- Meta description: "I help small businesses, startups, and non-profits build the right technology. MBA + 7 years full-stack engineering."
- Open Graph tags (title, description, image) for link sharing
- Semantic HTML throughout (nav, main, section, footer)

## WCAG Accessibility

- All text passes AA contrast ratios (darkened green `#4a7050` for text, amber `#c47d2e` for accent text)
- Button text at 14px+ bold passes AA Large on `#6b8f71` backgrounds
- Focus states and keyboard navigation required
- Modal: focus trap, ESC close, `aria-modal="true"`, body scroll lock
- Semantic HTML: nav, main, section, footer
- Skip links for keyboard navigation
