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
| `index.mdx` | Home/landing page (hero, metadata grid, prose with drop cap, explore cards, changelog preview, featured work) |
| `about/skills.mdx` | API-style skills reference — ACTIVE / FLUENT / FAMILIAR badges, parameter tables |
| `about/changelog.mdx` | Career history formatted as a software changelog — versioned entries, interactive click-to-expand |
| `work/overview.mdx` | Case studies overview (mode: frame) |
| `work/apilens.mdx` | ApiLens case study |
| `work/canvas-annotation-revamp.mdx` | Canvas & Annotation Revamp case study |
| `work/turn-based-audio-annotation.mdx` | Turn-Based Audio Annotation case study |
| `writing/overview.mdx` | Writing overview (mode: frame) |
| `writing/the-design-process-shift.mdx` | Essay: The Design Process Shift |
| `writing/ux-friction-coefficient.mdx` | Essay: UX Friction Coefficient |

## Navigation

- `docs.json` defines all navigation — groups, global anchors, redirects
- Global anchors: Home (/) only
- Groups: About (about/skills, about/changelog), Case Studies, Writing
- Old `/reference/*` URLs redirect to `/about/*` via `redirects` in docs.json
- `mode: frame` is used on overview pages only — removes prose wrapper, enables full-width layout, but loses "On this page" TOC

## Design system

- **Theme:** `almond`
- **Primary color:** `#ea580c` (terracotta/orange)
- **Background:** `#F8F5EF` light / `#1C1917` dark
- **Fonts:** Instrument Serif (headings, italic), Inter (body), JetBrains Mono (code/mono)
- **Custom CSS:** `style.css` — imported via `docs.json`

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
- `.skill-badge-active` (green), `.skill-badge-fluent` (yellow), `.skill-badge-familiar` (gray)
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

## Known Tailwind gotchas

- Tailwind classes inside `.map()` callbacks may not be scanned — use CSS classes or inline styles for font-family, background, border on dynamically rendered elements
- Standard mode pages have a `.prose` wrapper that overrides `font-serif` — use `!important` in CSS or inline styles to force font-family on dynamic content
- `mode: frame` pages have no prose wrapper — Tailwind classes work normally
