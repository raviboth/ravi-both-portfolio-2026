- [x] Setup Atelier #atelier
- [x] [Project scaffolding & global styles](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/plans/project-scaffolding-global-styles.md)

  Initialize Astro project with Svelte integration. Create directory structure, set up fonts (Playfair Display, DM Sans), spring theme CSS custom properties with accessible colors, base reset styles. Configure astro.config.mjs for static output. 80px horizontal padding on all sections.

  [Plan](docs/plans/2026-03-21-portfolio-site-design.md)
- [x] [Storybook setup](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/plans/storybook-setup.md)

  Install storybook/svelte-vite. Configure preview\.ts to load global CSS and fonts. Create stories colocated with components. Stories for Nav, Hero, About, ProjectCard, ProjectModal, Contact, SkillPill, IconPillButton with desktop/mobile variants.

  [Plan](docs/plans/2026-03-21-portfolio-site-design.md)
- [x] [Nav component](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/plans/nav-component.md)

  Build Nav.svelte sticky top bar. Ravi Both left, section links centered (About, Projects, Contact), email button with envelope icon and <ravi@raviboth.com> right-aligned. 80px side padding. Hamburger food icon on mobile opens full-screen overlay menu with large links and 4 social pill buttons.

  [Plan](docs/plans/2026-03-21-portfolio-site-design.md)
- [x] [Hero section](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/plans/hero-section.md)

  Build Hero.svelte editorial layout. Left: headline Business thinking / Engineering hands (accent amber), subtitle, four icon pill buttons (Email, GitHub, LinkedIn, Resume). Right: rounded-corner portrait with name and title below. Mobile: stacks vertically, avatar on top, 2x2 button grid.

  [Plan](docs/plans/2026-03-21-portfolio-site-design.md)
- [x] [About section](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/plans/about-section.md)

  Build About.svelte with section label ABOUT and heading In a Nutshell. Two-column desktop: bio paragraph left, skills/languages/education right. Skills in white pills from resume. Mint background. Mobile stacks vertically.

  [Plan](docs/plans/2026-03-21-portfolio-site-design.md)
- [x] [Project data](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/plans/project-data.md)

  Create data/projects.ts with TypeScript interface (Project and ProjectLink types) and hardcoded data for all 8 projects. Include id, title, shortDesc, longDesc, role, contributions, tech, images array for gallery, links array for flexible link types (Live Site, GitHub, CodePen, Mockup, Screenshots).

  [Plan](docs/plans/2026-03-21-portfolio-site-design.md) [Content](docs/project-content.md)
- [x] [GitHub integration](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/plans/github-integration.md)

  Build src/lib/github.ts to fetch repos at build time via GitHub REST API filtered by portfolio topic tag. Local file cache for dev. Merge function where local projects.ts data overrides GitHub fields. Add portfolio topic to relevant repos.

  [Plan](docs/plans/2026-03-21-portfolio-site-design.md)
- [x] [Projects grid & cards](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/plans/projects-grid-cards.md)

  Build Projects.svelte and ProjectCard.svelte responsive card grid (3 columns desktop, 1 column mobile). Each card has screenshot thumbnail, title, description, tech stack tags. Cards clickable to open gallery modal.

  [Plan](docs/plans/2026-03-21-portfolio-site-design.md)
- [x] [Project modal](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/plans/project-modal.md)

  Build ProjectModal.svelte gallery lightbox modal. Desktop: side-by-side dark gallery panel with screenshots and white content panel. Mobile: stacked gallery on top, content below. Accessibility: focus trapping, ESC to close, aria-modal, body scroll lock.

  [Plan](docs/plans/2026-03-21-portfolio-site-design.md)
- [x] [Contact section & footer](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/plans/contact-section-footer.md)

  Build Contact.svelte with section label CONTACT, heading Lets talk, and description copy. Three pill buttons with icons for Email, LinkedIn, GitHub. Mint background. Footer: dark bar with copyright text centered.

  [Plan](docs/plans/2026-03-21-portfolio-site-design.md)
- [x] [SEO & meta tags](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/plans/seo-meta-tags.md)

  Add meta title, meta description, Open Graph tags to Layout.astro. Semantic HTML throughout. Add favicon.

  [Plan](docs/plans/2026-03-21-portfolio-site-design.md)
- [x] [Responsive polish & animations](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/plans/responsive-polish-animations.md)

  Final pass on responsive breakpoints. Hover lift on cards, smooth scroll, generous whitespace. Ensure WCAG AA contrast throughout. Focus states and keyboard navigation. Skip links.

  [Plan](docs/plans/2026-03-21-portfolio-site-design.md)
- [x] [Fix IconPillButton styling](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/plans/fix-iconpillbutton-styling.md)

  IconPillButton component has incorrect styling (white outline instead of sage green filled). Update to match mockup: sage green background (#6b8f71), white text, font-weight 600. Affects Hero, Contact, and Nav buttons.
  - [x] [Update IconPillButton scoped CSS (task 50)](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/tasks/-Users-raviboth-repos-ravi--quick--portfolio/50.md)
  - [x] [Refactor Nav.svelte mobile overlay pills (task 51)](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/tasks/-Users-raviboth-repos-ravi--quick--portfolio/51.md)
  - [x] [Verify Hero and Contact compatibility (task 52)](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/tasks/-Users-raviboth-repos-ravi--quick--portfolio/52.md)
- [x] [Center avatar in Hero section](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/plans/center-avatar-hero-section.md)
  - [x] [Update Hero.svelte portrait centering (task 53)](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/tasks/-Users-raviboth-repos-ravi--quick--portfolio/53.md)
- [x] [Make the about section 2 matching columns with titles on desktop](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/plans/about-section-two-column-redesign.md)
  - [x] [Restructure About.svelte HTML into two titled columns (task 54)](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/tasks/-Users-raviboth-repos-ravi--quick--portfolio/54.md)
- [x] Hero headline should be the same as the pencil.dev mockup
- [ ] [extract screenshots and write summary for tm.org as portfolio piece](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/plans/tm-org-course-platform.md)
  - [ ] [Capture TM.org screenshots from Wayback Machine (task 56)](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/tasks/-Users-raviboth-repos-ravi--quick--portfolio/56.md)
  - [ ] [Add TM.org project data entry to projects.ts (task 57)](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/tasks/-Users-raviboth-repos-ravi--quick--portfolio/57.md)
  - [ ] [Verify TM.org card and gallery rendering (task 58)](/Users/raviboth/.atelier/projects/-Users-raviboth-repos-ravi--quick--portfolio/tasks/-Users-raviboth-repos-ravi--quick--portfolio/58.md)
