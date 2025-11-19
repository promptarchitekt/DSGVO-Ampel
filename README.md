# DSGVO Ampel & KI Kompetenztest

Two zero-data tools that run completely inside the browser:

- **DSGVO Ampel** – guided self-assessment with traffic-light scoring, legal tips, and exportable To-Dos.
- **KI Kompetenztest** – three difficulty levels for the EU AI Act with instant feedback and a learning area.

The project is powered by **Next.js 15 (App Router)** and is optimized for Vercel deployments.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and open one of the cards. All data remains in the browser; no APIs or databases are involved.

## Production build / deploy

```bash
npm run lint
npm run build
npx vercel build
npx vercel deploy --prebuilt --prod
```

`lucide-react` provides the icons, Tailwind handles styling, and no environment variables are required. The default branch is `main`.

## Legal & privacy

Static Impressum/Datenschutz pages are included under `/impressum` and `/datenschutz`. Update the contact details before going live, and keep phone numbers clickable via `tel:+49...` to stay compliant.

## Folder structure

- `app/page.tsx` – landing page with quick links.
- `app/dsgvo-ampel/page.tsx` – full questionnaire experience.
- `app/ki-kompetenztest/page.tsx` – level-based skill-check.
- `app/globals.css` – Tailwind base styles.

Legacy Claude exports (`DSGVO-Ampel_v4.ts`, `KI-Kompetenztest.ts`, etc.) remain locally for reference but are ignored from the public repo.
