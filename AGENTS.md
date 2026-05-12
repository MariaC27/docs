# Portfolio project instructions

## About this project

- This is a **personal portfolio** built on [Mintlify](https://mintlify.com), adapted from its product-docs template
- The concept: use an AI-native docs platform as a personal knowledge + identity site — demonstrating understanding of Mintlify's architecture while adapting it for a new purpose
- Pages are MDX files with YAML frontmatter
- Configuration lives in `docs.json`
- Run `mint dev` to preview locally
- Run `mint broken-links` to check links

## Page structure

| File | Purpose |
|------|---------|
| `index.mdx` | Home/landing page (hero, explore cards, changelog preview, featured work) |
| `introduction.mdx` | About — personal narrative, principles, colophon |
| `experience.mdx` | Career changelog — version-numbered entries, reverse chronological |
| `skills.mdx` | API-style skills reference — EXPERT / PROFICIENT / FAMILIAR |
| `work/overview.mdx` | Featured work / case studies |
| `agent.mdx` | Agent-friendly structured view with JSON-LD, llms.txt links, crawl log |
| `llms.txt` | Machine-readable context file for LLMs and crawlers |

## Design decisions

- **Colors:** Terracotta/orange primary (#ea580c) — distinct from the default Mintlify green
- **Agent-friendly:** The site is designed for both human visitors and AI agents. Every page links to /agent for structured context. llms.txt follows the llms.txt spec.
- **Changelog as experience:** Career milestones are versioned (v4.2.0, v4.1.0, etc.) to match the docs-native mental model
- **Skills as API reference:** Skills use EXPERT / PROFICIENT / FAMILIAR method-style badges, parameter tables, and code examples

## Style preferences

- Sentence case for all headings
- Terse, confident prose — no filler
- First person on About/Introduction; third person on Agent page (for LLM consumption)
- Placeholder text uses [bracketed format] — replace with real content when provided
- Mono font for version numbers, dates, and technical identifiers

## Filling in placeholders

All [bracketed] text is a placeholder. When the user provides personal info, update:
1. docs.json — name, footer socials
2. index.mdx — name, title, location, status chips, changelog entries, work cards
3. introduction.mdx — bio, principles, working style
4. experience.mdx — real roles, companies, dates, accomplishments
5. skills.mdx — real skills with real code examples
6. work/overview.mdx — real projects with context and outcomes
7. agent.mdx — name, role, JSON-LD, agent instructions
8. llms.txt — all fields
