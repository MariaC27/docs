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
| `index.mdx` | Home page (`mode: custom`) — renders `<Landing work={<Work items={[...]} />} />`; `snippets/landing.jsx` (sidebar rail, hero pond with lily pads, career path river, chat) + `snippets/work.jsx` (Projects cards below the river), styled by `landing.css`. Project/article data lives in `index.mdx` |
| `about/me.mdx` | About me: background, Dartmouth, San Francisco (photo rows via a local `Photo` component), outside of work, what I believe |
| `about/skills.mdx` | API-style skills reference — ACTIVE / FLUENT / FAMILIAR badges, parameter tables |
| `about/changelog.mdx` | Career history formatted as a software changelog — versioned entries, interactive click-to-expand |
| `work/overview.mdx` | Case studies overview (mode: frame) — the homepage's floating project cards (`<Work>` from `snippets/work.jsx`) inside `.wk-host`, which gives them pond colors (style.css) |
| `work/apilens.mdx` | ApiLens case study |
| `work/canvas-annotation-revamp.mdx` | Canvas & Annotation Revamp case study |
| `work/turn-based-audio-annotation.mdx` | Turn-Based Audio Annotation case study |
| `work/portfolio.mdx` | How this portfolio was built (written by Maria) |
| `writing/overview.mdx` | Writing overview (mode: frame) — same floating cards as the Case Studies overview |
| `writing/the-design-process-shift.mdx` | Essay: The Design Process Shift |
| `writing/ux-friction-coefficient.mdx` | Essay: UX Friction Coefficient |
| `api/*.mdx` | API reference for [maria-api](https://github.com/MariaC27/maria-api): `get-me`, `get-skills`, `get-availability`, `post-ask` (also backs the homepage chat), `post-hire`, `post-contact` (`get-work` exists but isn't in the nav) |
| `lab/*.mdx` | Hidden design lab — see "Lab" below |

## Navigation

- `docs.json` defines all navigation — groups, global anchors, redirects
- Global anchors: Home (/) only
- Groups: About (me, skills, changelog), Case Studies (overview, canvas-annotation-revamp, turn-based-audio-annotation, apilens, portfolio), Writing (overview, two essays), API Reference
- Old `/reference/*` URLs redirect to `/about/*` via `redirects` in docs.json
- The homepage has its own sidebar (`NAV` in `snippets/landing.jsx`): keep its links and labels in sync with docs.json and the pages' titles / `sidebarTitle`
- Inner pages get a sidebar collapse button from `sidebar-toggle.js` (Mintlify loads every .js file site-wide). Open, it sits at the sidebar's right edge; closed, it slides to the left of the name, animating only on click. It shares the open/closed choice with the homepage rail via sessionStorage `rv-rail-open`. The header logo image is hidden and replaced by the name in Cormorant italic (style.css, "Sidebar: name and collapse button")
- `mode: frame` is used on overview pages only — removes prose wrapper, enables full-width layout, but loses "On this page" TOC

## Design system

The site uses the "pond" palette, a tinted scale taken from the homepage painting (2026-11-03; replaced the earlier river palette and the orange/cream before it):

- **Theme:** `almond`
- **Pond scale:** 50 `#F2FAF8`, 100 `#E5F2F0`, 200 `#CFE5E2`, 300 `#AFD1CD`, 400 `#8BB6B3`, 500 `#699A97`, 600 `#50807E`, 700 `#3B6666`, 800 `#2C4F4F`, 900 `#1B3536`, 950 `#0C1D1D`, 975 `#060E0F`
- **Primary color:** `#3B6666` (pond 700, light mode) / `#AFD1CD` (pond 300, dark mode) in docs.json; amber `#A35A12` / `#E9A458` as the secondary accent (FLUENT badge)
- **Inner-page backgrounds:** content panel `#E5F2F0` light / `#060E0F` dark in docs.json; surrounding chrome `#CFE5E2` / `#0F2323` (style.css). Mintlify's `#almond-background-color` overlay is cleared, and dark code blocks use pond 950 `#0C1D1D` (via `--shiki-dark-bg`)
- **Fonts:** Cormorant Garamond for titles and headings site-wide (weight 500; its regular is thin) and the name in the top bar; Geist (inner-page body) and Geist Mono (code/mono); the homepage uses Cormorant / Karla / IBM Plex Mono, and the inner sidebar uses Karla. All imported at the top of `style.css`
- **Custom CSS:** `style.css` (whole site) and `landing.css` (homepage only, scoped to `.rv`)

## Editorial styling

- `h1`: Cormorant italic, weight 500
- Section headings (`h2`): Cormorant, subtle border-top rule for visual rhythm
- Drop cap: `.portfolio-dropcap` — float-left, primary color, Cormorant italic
- Pull quote: `border-l-2 portfolio-accent-border-l font-serif italic text-2xl`
- Byline: `.portfolio-byline` — Geist Mono, small, with border-bottom rule

## CSS utility classes (style.css)

- `.portfolio-primary-text` — primary color text
- `.portfolio-accent-chip`, `.portfolio-accent-chip-border` — accent chip styling
- `.portfolio-accent-border-l` — pull quote border
- `.portfolio-dropcap` — drop cap
- `.portfolio-byline` — article byline
- `.skill-badge-active` (pond teal), `.skill-badge-fluent` (amber), `.skill-badge-familiar` (gray)
- `.cl-entry`, `.cl-title`, `.cl-active` — changelog interactive row styles
- `.navbar-link` — removes border/box-shadow from navbar icon buttons
- `.wk-host` — wrapper that gives the floating project cards pond colors on inner pages
- `[data-component-part="card-title"]` — Cormorant for card titles
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

## Homepage (painted pond)

- `snippets/landing.jsx` holds all homepage data (career stops, nav, pads and their previews) and logic; `landing.css` holds its styles, all scoped under `.rv`
- **The pond:** the same deep-water scene in light and dark mode (`#2C4F4F`, `images/pond/pond.jpg`, with a vertically seamless, mirrored strip of its banks in `pond-banks.jpg` down both sides; the big lotuses are painted out of that strip). Tokens are in the "Painted pond" block of `landing.css`. Only the sidebar, the header icon bar, "Ask about me" and the pads' hover previews switch to light colors in light mode ("Light-mode chrome" and the preview block at the end of `landing.css`)
- **Pads:** five watercolor lily pads (`images/pond/lily-pad.png`). Hovering for 0.1s opens a preview: Skills fans out a ring of skill icons, Writing and Case Studies fan out screenshot cards, About Me fans out three photos, API shows its endpoints. On touch, the first tap opens the preview and the second navigates
- **Lotuses:** watercolor lotuses (`images/pond/lotus.png`) mark the career-path stops, float free in the pond and footer, and can be dragged; the header's lotus button adds more
- **Chrome:** a collapsible sidebar rail (icon strip when closed, list with search when open), a frosted top-right icon bar (GitHub, LinkedIn, Medium, email, add a lotus) and a frosted "Ask about me" button that opens a chat panel backed by maria-api `POST /api/ask`
- Mintlify's navbar is hidden on the homepage; its search still works, and the rail's search field opens it
- Snippet gotchas: Mintlify keeps only the imported export, so data and helpers live inside `Landing`; helpers are called as functions, not `<Tags>`; avoid bare one-letter class strings (`'r'` got rewritten to `mint-r`); use background images, not `<img>` (Mintlify wraps `<img>` in a click-to-zoom)

## Lab

- `lab/*.mdx` is a hidden, standalone design lab: `mode: custom`, noindex, not in the nav, no site chrome, its own nav from `snippets/lab-nav.jsx`, root class `.lab-root` (not `.al` — Mintlify rewrites that to `mint-al`). Its styles are at the end of `style.css`, and its prototypes live in `snippets/*-lab.jsx` and `snippets/*-protos.jsx`
- Pages: overview, design system, process log, homepage and river layouts, art direction, UI & fonts, colors (the pond scale and a color audit), lily pads
- **The lab is due for a full audit and reorganization in the next PR.** Until then its pages (the design system and process log especially) may describe earlier versions of the site; this file and the README describe the current one

## Known Tailwind gotchas

- Tailwind classes inside `.map()` callbacks may not be scanned — use CSS classes or inline styles for font-family, background, border on dynamically rendered elements
- Standard mode pages have a `.prose` wrapper that overrides `font-serif` — use `!important` in CSS or inline styles to force font-family on dynamic content
- `mode: frame` pages have no prose wrapper — Tailwind classes work normally
