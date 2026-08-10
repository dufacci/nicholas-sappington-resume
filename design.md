# Site Design Language — Brief for Google Stitch

This supersedes the earlier off-white resume brief. The landing page at
`nicksappington.com` (`index.html`) is now the reference design — the resume
(`/resume/`) and portfolio (`/portfolio.html`) should read as the same site,
not three unrelated pages.

Stitch takes a **text prompt**, an **uploaded image**, or a **screenshot** — not
code. Paste a prompt below into Stitch's input box, or screenshot the current
`/resume/` or `/portfolio.html` page and upload it alongside the prompt so
Stitch redesigns *from* what's there instead of starting blank.

---

## The design language (extracted from index.html)

- **Palette:** pure black background (`#000000`), dim grey body text (`#555555`),
  near-black hairline rules (`#222222`), pure white (`#ffffff`) for emphasis and
  hover states. Neon accents — green `#39FF14`, yellow `#FFFF00`, magenta
  `#FF00FF`, cyan `#00FFFF` — appear only as rare, momentary flashes on
  interaction, never as base UI color. High-contrast, no gradients.
- **Typography:** monospace only. Courier Prime for labels/index numbers,
  JetBrains Mono for tooltips/utility text. Body copy is uppercase, tracked
  tight on large type.
- **Structure:** a terminal/index-file feel — numbered rows (`# 01`, `# 02`…),
  separated by 1px hairlines, not whitespace. Sharp corners everywhere, no
  rounded elements.
- **Motion:** subtle and purposeful, never decorative for its own sake —
  per-letter hover color-cycling with a 0.3s trail, a hand-drawn squiggle that
  draws itself in on hover, an arrow (↗) that fades in to confirm
  interactivity, a custom cursor-following tooltip.
- **Tone:** raw, confident, slightly subversive — closer to a terminal or an
  index of files than a polished corporate site. Scarcity/under-construction
  states (EJJ, Fucces) are marked with a literal hazard-sign motif and a
  strike-through, not hidden or apologized for.

## Constraints

- Must stay exportable to plain HTML/CSS — the resume is React/Tailwind
  (`src/App.resume.jsx`), the portfolio is static HTML
  (`public/portfolio.html`). Stitch output gets hand-translated into whichever
  of those two the redesign targets.
- Keep real heading order and good contrast — white-on-black already clears
  contrast easily, don't undercut it with low-contrast greys for body copy.

---

## Prompt to paste into Stitch — Resume (`/resume/`)

> Redesign this personal resume page to match a black-terminal, brutalist-mono
> design language: pure black background, dim grey (#555) body text, pure
> white for emphasis and headings, hairline #222 dividers instead of
> whitespace-based sections, all monospace typography (Courier Prime for
> labels, JetBrains Mono for body), uppercase tracked-tight headings, sharp
> 90-degree corners with no rounding, no gradients or soft shadows. Keep the
> content — name, experience, skills, contact — but restructure it like an
> indexed terminal readout rather than a conventional resume layout. Subtle
> hover states are welcome (a letter or line brightening to white) but nothing
> loud. Fully responsive, mobile-first.

*(Attach a screenshot of the current `/resume/` page so Stitch redesigns the
existing content rather than inventing new copy.)*

## Prompt to paste into Stitch — Portfolio (`/portfolio.html`)

> Redesign this case-study / portfolio page to match a black-terminal,
> brutalist-mono design language: pure black background, dim grey (#555) body
> text, pure white for emphasis, hairline #222 dividers, all monospace
> typography (Courier Prime for labels, JetBrains Mono for body copy),
> uppercase tracked headings, sharp corners, no gradients or soft shadows.
> Preserve the existing case-study structure (phases, research, findings) but
> present it like a technical readout or lab report rather than a marketing
> page. Neon accent colors (#39FF14 green, #FFFF00 yellow, #FF00FF magenta,
> #00FFFF cyan) may appear briefly on hover/interaction only, never as base
> color. Fully responsive, mobile-first.

*(Attach a screenshot of the current `/portfolio.html` page.)*

## Tips for using Stitch

- Generate, then refine with follow-up prompts ("more whitespace between
  phases", "make the hazard-stripe motif from the landing page show up on the
  in-progress sections", "try the squiggle-underline hover on links here too").
- When happy, use **Export → HTML/CSS (Tailwind)** and hand the markup back —
  resume goes into `src/App.resume.jsx`, portfolio replaces
  `public/portfolio.html`.
