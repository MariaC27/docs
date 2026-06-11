# personal portfolio

### [https://mariacristoforo.com/](https://mariacristoforo.com/)


Personal portfolio built on [Mintlify](https://mintlify.com). Uses Mintlify's organizational patterns and agent-friendliness as a foundation, layered with custom components, styling, and content.

## Structure

```
index.mdx           — Home
about/
  skills.mdx        — Skills as an API reference
  changelog.mdx     — Career history as a software changelog
work/
  overview.mdx
  apilens.mdx
  canvas-annotation-revamp.mdx
  turn-based-audio-annotation.mdx
  portfolio.mdx     — How this site was made
writing/
  overview.mdx
  the-design-process-shift.mdx
  ux-friction-coefficient.mdx
api/
  get-me.mdx
  get-skills.mdx
  get-availability.mdx
  post-hire.mdx
  post-contact.mdx
```

The API reference section is backed by a live serverless API: [maria-api](https://github.com/MariaC27/maria-api).

## Running locally

Install the Mintlify CLI:

```bash
npm i -g mintlify
```

Start the dev server:

```bash
mintlify dev
```

## Built with

- [Mintlify](https://mintlify.com) — docs platform and AI assistant
- [Magic Patterns](https://magicpatterns.com) — initial UI prototyping
- [Anthropic API](https://anthropic.com) — Claude Haiku powers the `/hire` match evaluation
- [Resend](https://resend.com) — email notifications for `/hire` and `/contact`

