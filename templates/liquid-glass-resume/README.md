# Liquid-Glass Resume (archived template)

This is the "Liquid Glass Shader Edition" resume design that lived at
`/resume/` before the 2026-08 terminal/index redesign. It's kept here intact
because it was a lot of work and may be worth reusing (as-is, or as a
template for another site).

## What's here
- `App.resume.jsx` — the full React component (liquid-glass cards, cyberpunk
  poster shading, Gemini-backed "General Info Agent").
- `liquid-glass.css` — the `.lg-card` / `.lg-a` / `.lg-b` / `.lg-edge-*`
  styles and the `livePulse` / `portfolioPulse` keyframes it depends on.
  This was extracted from `src/index.css`, which now only contains the
  Tailwind import plus the new terminal-index resume's styles.

## How to restore it
1. Copy `App.resume.jsx` back to `src/App.resume.jsx`.
2. Append the contents of `liquid-glass.css` back into `src/index.css` (or
   `import` it directly from `App.resume.jsx`).
3. It expects `lucide-react` (already a project dependency) and the same
   `/nick-photo.png` and `/logos/*` assets in `public/`, which are unchanged.
4. `.env.local`'s `VITE_GEMINI_API_KEY` still powers the "General Info Agent"
   Q&A panel — untouched by the redesign.

Superseded by the terminal/index design in `src/App.resume.jsx` on
2026-08-10, built from the Claude-Design handoff in
`design_handoff_resume_site/` per `design.md`.
