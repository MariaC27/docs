# Portfolio project instructions

## About this project

- Personal portfolio built on [Mintlify](https://mintlify.com), adapted from its product-docs template
- Concept: adapt an AI-native docs platform as a personal identity site
- Pages are MDX files with YAML frontmatter
- Configuration lives in `docs.json`
- Run `mint dev` to preview locally
- Run `mint broken-links` to check links

## Page structure

| File | Purpose |
|------|---------|
| `index.mdx` | Home page (`mode: custom`) — renders `<Landing work={<Work items={[...]} />} />`; `snippets/landing.jsx` (hero, pond, river) + `snippets/work.jsx` (Projects rows below the river), styled by `landing.css`. Project/article data lives in `index.mdx` |
| `about/skills.mdx` | API-style skills reference — ACTIVE / FLUENT / FAMILIAR badges, parameter tables |
| `about/changelog.mdx` | Career history formatted as a software changelog — versioned entries, interactive click-to-expand |
| `work/overview.mdx` | Case studies overview (mode: frame) — the homepage's floating project cards (`<Work>` from `snippets/work.jsx`) inside `.wk-host`, which gives them pond colors (style.css) |
| `work/apilens.mdx` | ApiLens case study |
| `work/canvas-annotation-revamp.mdx` | Canvas & Annotation Revamp case study |
| `work/turn-based-audio-annotation.mdx` | Turn-Based Audio Annotation case study |
| `writing/overview.mdx` | Writing overview (mode: frame) — same floating cards as the Case Studies overview |
| `writing/the-design-process-shift.mdx` | Essay: The Design Process Shift |
| `writing/ux-friction-coefficient.mdx` | Essay: UX Friction Coefficient |
| `lab/*.mdx` | Hidden standalone design lab (mode: custom, noindex, not in nav, no site chrome; own nav from `snippets/lab-nav.jsx`; root class `.lab-root` — not `.al`, Mintlify rewrites it to `mint-al`): `overview`, `design-system` (keep in sync with `landing.css` tokens), `process` (iteration log of the redesign), `art-styles` (art-direction prototype via `snippets/art-lab.jsx`) |

## Navigation

- `docs.json` defines all navigation — groups, global anchors, redirects
- Global anchors: Home (/) only
- Groups: About (about/skills, about/changelog), Case Studies, Writing
- Old `/reference/*` URLs redirect to `/about/*` via `redirects` in docs.json
- Inner pages get a sidebar collapse button from `sidebar-toggle.js` (Mintlify loads every .js file site-wide); it shares the open/closed choice with the homepage rail via sessionStorage `rv-rail-open`. The header logo image is hidden and replaced by the name in Cormorant italic (style.css, "Sidebar: name and collapse button")
- `mode: frame` is used on overview pages only — removes prose wrapper, enables full-width layout, but loses "On this page" TOC

## Design system

Whole site uses the homepage's "river" palette (changed 2026-10-15 from the old orange/cream):

- **Theme:** `almond`
- **Primary color:** `#3B6666` (pond 700, light mode) / `#AFD1CD` (pond 300, dark mode), from the pond scale on `/lab/colors` (taken from the background painting; the old `#0B7469` teal and `#6FE3D6` cyan were removed 2026-11-03); amber `#A35A12` / `#E9A458` as the secondary accent
- **Background:** content panel `#E5F2F0` light (pond 100, the homepage cards' off-white) / `#060E0F` dark (pond 975, near-black; turquoise only on the outside) in docs.json; surrounding chrome `#CFE5E2` / `#0F2323` (style.css). Mintlify's `#almond-background-color` overlay is cleared, and dark code blocks use pond 950 `#0C1D1D` (via `--shiki-dark-bg`)
- **Fonts:** Instrument Serif (headings, always weight 400 — it has no bold), Geist (body), Geist Mono (code/mono)
- **Custom CSS:** `style.css` (whole site) and `landing.css` (homepage only, scoped to `.rv`)

## Magazine/editorial styling

- `h1`: font-serif italic, `font-weight: 400`
- Section headings (`h2`): subtle border-top rule for visual rhythm
- Drop cap: `.portfolio-dropcap` — float-left, primary color, Instrument Serif italic
- Pull quote: `border-l-2 portfolio-accent-border-l font-serif italic text-2xl`
- Byline: `.portfolio-byline` — JetBrains Mono, small, with border-bottom rule
- Home page has `<hr>` dividers between sections (no numbered labels)

## CSS utility classes (style.css)

- `.portfolio-primary-text` — primary color text
- `.portfolio-accent-chip`, `.portfolio-accent-chip-border` — accent chip styling
- `.portfolio-agent-link`, `.portfolio-dot` — removed (agent page deleted)
- `.portfolio-accent-border-l` — pull quote border
- `.portfolio-dropcap` — drop cap
- `.portfolio-byline` — article byline
- `.skill-badge-active` (teal), `.skill-badge-fluent` (amber), `.skill-badge-familiar` (gray)
- `.cl-entry`, `.cl-title`, `.cl-active` — changelog interactive row styles
- `.navbar-link` — removes border/box-shadow from navbar icon buttons
- `[data-component-part="card-title"]` — Instrument Serif italic for card titles
- `[data-component-part="card-content"]` — smaller font for card descriptions

## Skills page conventions

- Three proficiency levels: ACTIVE / FLUENT / FAMILIAR (not Expert/Proficient/Familiar)
- Path format: `/skills/development/[name]`, `/skills/design/[name]`, `/skills/workflows/[name]`
- Parameter table fields: `years_experience`, `last_used`, `context`, `used_at`
- No code examples in parameter tables

## Changelog conventions

- Entries defined as `export const entries = [...]` array at top of file
- Fields per entry: `version`, `date`, `title`, `sub` (optional subheading), `desc`, `link`, `linkLabel`
- Rendered via `.map()` using native `<details>`/`<summary>` elements for inline expand/collapse
- Font set via `.cl-title` CSS class (not Tailwind) to bypass prose wrapper

## Style preferences

- Sentence case for all headings
- Terse, confident prose — no filler
- First person throughout
- Mono font for version numbers, dates, and technical identifiers

## Homepage (river landing)

- `snippets/landing.jsx` holds all homepage data (stops, nav, explore pads) and logic; `landing.css` holds its styles, all scoped under `.rv`, with light tokens on `.rv` and dark under `.dark .rv`
- Painted pond (2026-11-03, from lab `/lab/ui` option 06): light mode is a sunlit pond with a pale center (`#C6E3DC`, `images/pond/pond-light.jpg`), dark mode is deep water (`#2C4A4D`, `images/pond/pond.jpg`), both with Cormorant Garamond / Karla / IBM Plex Mono (tokens in the "Painted pond" block at the end of `landing.css`). The painting frames the hero and the page bottom; a vertically seamless strip of its banks (`pond-banks-light.jpg` / `pond-banks.jpg`) runs down both sides. Pads and lotuses are watercolor PNGs (`images/pond/lily-pad.png`, `lotus.png`). Inner pages keep the river palette
- Mintlify's navbar is hidden on the homepage; the page has its own rail nav, so keep `NAV` in the snippet in sync with `docs.json`
- Snippet gotchas: Mintlify keeps only the imported export, so data and helpers live inside `Landing`; helpers are called as functions, not `<Tags>`; avoid bare one-letter class strings (`'r'` got rewritten to `mint-r`)

## Known Tailwind gotchas

- Tailwind classes inside `.map()` callbacks may not be scanned — use CSS classes or inline styles for font-family, background, border on dynamically rendered elements
- Standard mode pages have a `.prose` wrapper that overrides `font-serif` — use `!important` in CSS or inline styles to force font-family on dynamic content
- `mode: frame` pages have no prose wrapper — Tailwind classes work normally
