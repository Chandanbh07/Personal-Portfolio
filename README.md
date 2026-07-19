# Chandanagouda Hiregoudra — Portfolio

Dark, cinematic single-page portfolio with a full form-based contact section
plus the original cinematic sign-off footer, and a second page: a fully
interactive terminal that answers commands about the résumé.

Built with React + Vite + TypeScript + Tailwind CSS + GSAP + Framer Motion + hls.js + React Router + lucide-react.

## Pages

- `/` — Hero, About, Skills, Experience, Work (Projects), Certifications &
  Publication, Contact (form), and a closing cinematic Footer (video
  background, marquee, "Got a project in mind?" CTA, quick links,
  availability status). No education section, per request.
- `/terminal` — an interactive terminal. Type `help` to see commands
  (`whoami`, `about`, `skills`, `experience`, `projects`, `certifications`,
  `contact`, `resume`, `clear`). Reachable via the "Terminal" button in the
  main nav.

## Nav

The floating pill nav links to About, Skills, Experience, Work, and Contact
(Certifications is intentionally left out of the nav, but the section is
still on the page, right after Work). On small screens the links collapse
into a hamburger menu next to the Terminal button.

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

- All résumé content lives in `src/data.ts`.
- `public/resume.pdf` is wired to the "Download Resume" button in the hero.
- `src/components/Contact.tsx` — the form + info-card contact section. The
  form is a front-end mock (simulated send); wire it up to a real endpoint
  like Formspree or EmailJS when ready.
- `src/components/Footer.tsx` — the cinematic sign-off section (video,
  marquee, email CTA, quick links, availability badge).
- `src/components/Projects.tsx` — placeholder screenshot blocks; swap for
  real `<img>`s or add `liveDemo` URLs in `src/data.ts` once ready.
