# Chandanagouda Hiregoudra — Portfolio

Dark, cinematic single-page portfolio (the "Michael Smith" template) rebuilt
with Chandanagouda's real résumé content, plus a second page: a fully
interactive terminal that answers commands about the résumé.

Built with React + Vite + TypeScript + Tailwind CSS + GSAP + Framer Motion + hls.js + React Router.

## Pages

- `/` — the main portfolio: Hero, About, Skills, Experience, Projects,
  Certifications & Publication, Contact. (No education section, per request.)
- `/terminal` — an interactive terminal. Type `help` to see commands
  (`whoami`, `about`, `skills`, `experience`, `projects`, `certifications`,
  `contact`, `resume`, `clear`). Reachable via the "Terminal" button in the
  main nav.

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Content & customization

- All résumé content lives in `src/data.ts` — edit there to update copy,
  skills, projects, certifications, etc.
- `public/resume.pdf` is wired to the "Download Resume" button in the hero —
  swap that file whenever the résumé updates.
- **Project cards** (`src/components/Projects.tsx`) are built in the layout
  style you referenced (category tag, title, description, tech pills, GitHub
  + optional live-demo link) but with a placeholder screenshot block at the
  top of each card — swap that `div` for an `<img>` once you have real
  screenshots or add `liveDemo` URLs in `src/data.ts`.
- **Experience card** (`src/components/Experience.tsx`) follows the timeline
  layout you referenced (dot + line, title, org, date badge, bullets, tech
  pills), populated with your actual academic/project experience from the
  résumé — not the reference company's content.
- **About section** (`src/components/About.tsx`) uses the exact copy and
  stats you provided.
- Hero/footer background video streams via HLS from a Mux demo source
  (hls.js) — carried over from the original template.
