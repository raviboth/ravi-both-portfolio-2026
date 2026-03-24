export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  role: string;
  contributions: string[];
  tech: string[];
  images: string[];
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    id: "tm-org",
    title: "TM.org Course Platform",
    shortDesc:
      "Full-stack course booking platform built from 0-to-1, connecting students with meditation teachers across the US and UK with AWS microservices, CI/CD, and a CMS-driven template system.",
    longDesc:
      "Course booking platform connecting students with meditation teachers across the US and UK. As one of three key developers, architected and developed the full-stack application from scratch, replacing legacy sites with a modern, unified platform. Built AWS microservices with Node.js and GraphQL for RESTful APIs and DynamoDB integrations handling high-traffic user data. Automated CI/CD pipelines with CircleCI and Docker, and implemented end-to-end and unit testing with Cypress and Jest alongside Sentry error tracking. Led the design system implementation using Figma, Tailwind, and Storybook, creating a reusable component library for UI consistency across products. Architected a flexible template system with Prismic CMS enabling non-technical teams to publish content autonomously. Multi-region support (en-us and en-gb), designed to scale to additional countries.",
    role: "Full-Stack Developer & Architect",
    contributions: [
      "Frontend Architecture & Design System",
      "AWS Microservices & GraphQL APIs",
      "CI/CD Pipelines (CircleCI, Docker)",
      "CMS Template System (Prismic)",
      "Testing & Error Tracking (Cypress, Jest, Sentry)",
      "Mentorship & Code Reviews",
    ],
    tech: ["React", "Next.js", "TypeScript", "Node.js", "AWS", "GraphQL", "DynamoDB", "Docker"],
    images: [
      "/projects/tm-org/1.png",
      "/projects/tm-org/2.png",
      "/projects/tm-org/3.png",
      "/projects/tm-org/4.png",
      "/projects/tm-org/5.png",
      "/projects/tm-org/6.png",
      "/projects/tm-org/7.png",
    ],
    links: [
      {
        label: "Live Site",
        url: "https://tm.org/en-gb",
      },
    ],
  },
  {
    id: "tm-app",
    title: "TM App",
    shortDesc:
      "React Native mobile app for Android and iOS, supporting meditation practice with guided sessions, group meditations, and event discovery.",
    longDesc:
      "React Native mobile app serving as the companion to the TM.org platform. Developed features and bug fixes improving user experience on both Android and iOS. The app includes a custom meditation timer, access to daily group meditations and TM events, a library of videos and knowledge, and integration with the course booking platform.",
    role: "Mobile Developer",
    contributions: [
      "Feature Development",
      "Bug Fixes & UX Improvements",
      "Cross-Platform (Android & iOS)",
    ],
    tech: ["React Native", "TypeScript", "iOS", "Android"],
    images: [
      "/projects/tm-app/Screenshot1.png",
      "/projects/tm-app/Screenshot2.png",
    ],
    links: [
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=org.tm.app&pli=1",
      },
    ],
  },
  {
    id: "bit",
    title: "Brain Innovation Technologies",
    shortDesc:
      "Sales funnel redesign for a B2B wellness site targeting executives, HR, and educational organisations — replacing an information-heavy layout with a conversion-focused architecture.",
    longDesc:
      "Proposed and built a complete sales funnel redesign for Brain Innovation Technologies, a B2B site targeting executives, HR departments, and schools. The original site lacked clear calls to action, buried key endorsements, and had no conversion architecture. The redesign introduces a problem-first narrative that leads with pain points before presenting the solution, prominently features trust signals including an AHA endorsement above the fold, and provides tailored messaging for distinct audience segments. A dedicated research page with filtering, an education page with video lightbox, strategically placed contact modals, curated testimonials, and full SEO foundations (sitemap, structured data, OG tags, llms.txt) complete the conversion-optimised experience.",
    role: "Developer & Conversion Strategist",
    contributions: [
      "Sales Funnel Architecture",
      "Audience-Segmented Messaging",
      "Research & Education Pages",
      "SEO & Structured Data",
      "Responsive Design",
    ],
    tech: ["Astro", "TypeScript", "Tailwind CSS"],
    images: [
      "/projects/bit/1.png",
      "/projects/bit/2.png",
      "/projects/bit/3.png",
      "/projects/bit/4.png",
      "/projects/bit/5.png",
      "/projects/bit/6.png",
    ],
    links: [],
  },
  {
    id: "baansearch",
    title: "BaanSearch",
    shortDesc:
      "Job search link aggregator that generates pre-built search URLs to 60+ job boards with a single set of filters.",
    longDesc:
      "Job search link aggregator for tech professionals. Generate pre-built search URLs to 60+ job boards across ATS systems, major platforms, tech-focused boards, niche sites, and company careers pages — all with a single set of filters. Features smart filtering with role variations, experience level, tri-state technology/industry include/exclude, remote preference, location, and presets. Pure client-side with no backend, dark/light theme support, and filters that persist via localStorage.",
    role: "Creator & Developer",
    contributions: [
      "Architecture & Design",
      "60+ Job Board Integrations",
      "Smart URL Generation",
      "Tri-State Filter UX",
    ],
    tech: ["TypeScript", "esbuild", "Vitest", "Docker"],
    images: [
      "/projects/baansearch/1.png",
      "/projects/baansearch/2.png",
      "/projects/baansearch/3.png",
    ],
    links: [
      {
        label: "Live Site",
        url: "https://raviboth.github.io/baansearch/",
      },
      {
        label: "GitHub",
        url: "https://github.com/raviboth/baansearch",
      },
    ],
  },
  {
    id: "ccusage",
    title: "Claude Code Usage Monitor",
    shortDesc:
      "Lightweight desktop utility for macOS and Linux that tracks Claude Code usage limits in the system tray with a dashboard, alerts, and activity insights.",
    longDesc:
      "A desktop utility that displays Claude Code usage limits in the system tray and a dashboard window. Features a color-coded tray icon showing 5-hour usage percentage, a dashboard with progress bars, reset countdowns, daily activity charts, and usage insights. Includes configurable threshold alerts, reset notifications, and extra usage tracking. Reads OAuth credentials securely from the system keychain with no stored tokens. Built with Python, PyQt6, and SQLite for local trend tracking.",
    role: "Creator & Developer",
    contributions: [
      "Full Application Architecture",
      "System Tray & Dashboard UI",
      "API Integration & Auth",
      "Cross-Platform Builds (macOS & Linux)",
    ],
    tech: ["Python", "PyQt6", "SQLite", "Pillow"],
    images: [
      "/projects/ccusage/dashboard.png",
      "/projects/ccusage/tray.png",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/raviboth/ccusage",
      },
    ],
  },
  {
    id: "sutherland",
    title: "Sutherland",
    shortDesc:
      "Business and appointment card generator site for hospital that creates orders and bills as well as creates PDFs of the cards.",
    longDesc:
      "Business and appointment card generator site for hospital that creates orders and bills as well as creates PDFs of the cards. Collaborative effort with two other developers. Contribution focused on setup and layout. Private Internal dashboard and GitHub repo.",
    role: "Developer",
    contributions: ["Project Setup", "Layout Development", "Team Collaboration"],
    tech: ["HTML/CSS", "jQuery", "Wordpress", "Git", "PHP", "Photoshop"],
    images: [],
    links: [],
  },
  {
    id: "nextgen-purusha",
    title: "NextGen Purusha",
    shortDesc:
      "Meditation focused site built to design specifications with SquareSpace for client convenience.",
    longDesc:
      "Meditation focused site built to design specifications with SquareSpace for client convenience. Designed and developed the full site layout, imagery, and content structure to match the client's vision for a calming, accessible online presence.",
    role: "Designer & Developer",
    contributions: ["UI Design", "Site Development", "Client Collaboration"],
    tech: ["HTML/CSS", "JavaScript", "Photoshop", "SquareSpace"],
    images: ["/projects/nextgen-purusha/1.png"],
    links: [
      {
        label: "Live Site",
        url: "https://maharishipurusha.org/",
      },
    ],
  },
  {
    id: "walker-pewter",
    title: "Walker Pewter",
    shortDesc:
      "Local Pewter artist site designed and created with SquareSpace for client convenience.",
    longDesc:
      "Local Pewter artist site designed and created with SquareSpace for client convenience. Handled end-to-end design and development to showcase the artist's pewter works with an emphasis on visual presentation and easy content management.",
    role: "Designer & Developer",
    contributions: ["UI Design", "Site Development", "Content Strategy"],
    tech: ["HTML/CSS", "Photoshop", "SquareSpace"],
    images: ["/projects/walker-pewter/Walker Pewter 2021 - 1.png", "/projects/walker-pewter/Walker Pewter 2021 - 2.png"],
    links: [],
  },
  {
    id: "phenic-skincare",
    title: "Phenic Skincare",
    shortDesc: "Requested homepage design mockup for a skincare site.",
    longDesc:
      "Requested homepage design mockup for a skincare site. Created a polished visual concept for the brand's homepage, focusing on clean layout, product imagery, and brand identity.",
    role: "Designer",
    contributions: ["Visual Design", "Mockup Creation", "Brand Exploration"],
    tech: ["Photoshop", "Illustrator"],
    images: ["/projects/phenic-skincare/Phenic-Home-Mockup-v1.jpg"],
    links: [],
  },
];
