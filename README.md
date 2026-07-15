# Sam Ivere — Portfolio
## HSPR Technologies

A premium, responsive personal site. Production-fleet themed — your live products presented as a systems dashboard.

### Stack
- React 18 + Vite
- Framer Motion (scroll reveals, hero animation, magnetic button)
- Plain CSS with custom properties (no Tailwind needed)
- Fonts: Cabinet Grotesk (display) + Inter (body) + JetBrains Mono (system/data labels)

### Setup
\`\`\`bash
npm install
npm run dev
\`\`\`

### Edit content
Everything lives in `src/portfolio.config.js`:
- `profile` — name, role, tagline, socials, region
- `projects` — set `status: 'live'` or `'building'`; delete a block to remove a project entirely
- `books` — Selar / Gumroad links
- `channel` — YouTube videos (paste the video ID from the URL)
- `photos` — image URLs for the Field Notes grid

### The signature element
The **Production Fleet** grid (`#systems`) is the centerpiece — each project is a "system" with a live/building status dot. Hover any card to reveal a terminal-style status check. This is built with plain CSS (no JS needed for the hover reveal) so it stays fast.

### Design tokens
All colors and fonts are CSS custom properties at the top of `src/index.css` — change `--amber` or `--teal` there to retheme the whole site in one place.

### Deploy
Push to GitHub → import on vercel.com → deploy.
Point samivere.cc: A record `@` → `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`.

© HSPR Technologies Ltd
