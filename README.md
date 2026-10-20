<<<<<<< HEAD
# Haseeb Ahmed — AI Engineer Portfolio

Next.js 16 · Tailwind CSS v4 · Framer Motion · TypeScript

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (fully static)
```

## Editing content

All text (profile, skills, experience, projects, education, certificates) lives in
`src/data/portfolio.ts`. The résumé served by the "Download CV" buttons is
`public/Haseeb-Ahmed-Resume.pdf`.

The "Ask AI" assistant's answers are in `src/components/sections/AskAI.tsx` (`knowledge`).

## Structure

```
src/
  app/                 layout, global styles, page
  components/
    effects/           neural canvas, cursor, loader, scroll progress
    layout/            navbar, command palette (Ctrl/⌘ + K), footer
    sections/          Hero, About, Skills, Experience, Projects, AskAI, Certificates, Contact
    ui/                Reveal, SectionHeading, Magnetic, icons, spotlight helper
  data/portfolio.ts    all portfolio content
```

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new). No environment variables are needed.
=======
