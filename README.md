# personal portfolio

### [https://mariacristoforo.com/](https://mariacristoforo.com/)


Personal portfolio built on [Mintlify](https://mintlify.com). Uses Mintlify's organizational patterns and agent-friendliness as a foundation, layered with custom components, styling, and content.

The homepage is a fully custom page: a painted lily-pond scene where the main sections are lily pads, my career history is a river of lotuses, and projects float as cards on the water. The rest of the site uses Mintlify's own layout, restyled to match the pond (colors, fonts, sidebar).

## Structure

```
index.mdx           — Home (custom page: pond, career path, projects)
about/
  me.mdx            — About me
  skills.mdx        — Skills as an API reference
  changelog.mdx     — Career history as a software changelog
work/
  overview.mdx      — Case studies, as floating cards
  apilens.mdx
  canvas-annotation-revamp.mdx
  turn-based-audio-annotation.mdx
  portfolio.mdx     — How this site was made
writing/
  overview.mdx      — Articles, as floating cards
  the-design-process-shift.mdx
  ux-friction-coefficient.mdx
api/
  get-me.mdx
  get-skills.mdx
  get-availability.mdx
  post-ask.mdx
  post-hire.mdx
  post-contact.mdx
lab/                — Hidden design lab (see below)
```

The API reference section is backed by a live serverless API: [maria-api](https://github.com/MariaC27/maria-api). Its `POST /ask` endpoint also powers the "Ask about me" chat on the homepage.

### Design and code

```
snippets/landing.jsx  — Homepage: hero pond, lily pads and hover previews, career path, chat, sidebar
snippets/work.jsx     — Floating project cards (homepage Projects section and both overview pages)
landing.css           — Homepage styles, scoped under .rv
style.css             — Site-wide styles: fonts, colors, inner-page sidebar, overview cards, lab
sidebar-toggle.js     — Collapse button for the inner pages' sidebar (Mintlify loads .js files site-wide)
images/pond/          — The pond painting, its repeating side strip, and the watercolor lily pad and lotus
docs.json             — Navigation, theme colors, backgrounds
```

- **Look:** a painted pond in deep turquoise water, the same in light and dark mode. Light mode only changes the sidebar, the top-right icon bar and "Ask about me".
- **Colors:** one tinted scale taken from the painting (the "pond" scale, `#F2FAF8` → `#060E0F`, accent `#3B6666`). Inner pages use its pale aqua in light mode and near-black with a turquoise frame in dark mode.
- **Fonts:** Cormorant Garamond for titles and headings everywhere; Karla and IBM Plex Mono on the homepage and in the sidebar; Geist for inner-page body text.

### The lab

`/lab/*` is a hidden, unlisted design lab (noindex, not in the navigation): prototypes, a design system, a color audit, and a process log from the redesign. It's due for a full audit and reorganization in the next PR, so its pages may not reflect the current site yet.

## Running locally

Install the Mintlify CLI:

```bash
npm i -g mint
```

Start the dev server:

```bash
mint dev
```

## Built with

- [Mintlify](https://mintlify.com) — docs platform and AI assistant
- [Magic Patterns](https://magicpatterns.com) — initial UI prototyping
- [Claude Design](https://claude.ai) and [Claude Code](https://claude.com/claude-code) — homepage prototype and the pond redesign
- [Anthropic API](https://anthropic.com) — Claude Opus powers the "Ask about me" chat (`/ask`); Claude Haiku powers the `/hire` match evaluation
- [Resend](https://resend.com) — email notifications for `/hire` and `/contact`
