---
name: Anti-System Drops
colors:
  surface: '#f6faff'
  surface-dim: '#d6dae0'
  surface-bright: '#f6faff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f4fa'
  surface-container: '#eaeef4'
  surface-container-high: '#e4e9ee'
  surface-container-highest: '#dee3e8'
  on-surface: '#171c20'
  on-surface-variant: '#4c4546'
  inverse-surface: '#2c3135'
  inverse-on-surface: '#edf1f7'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#bc0004'
  on-secondary: '#ffffff'
  secondary-container: '#eb0007'
  on-secondary-container: '#fffbff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#251a00'
  on-tertiary-container: '#a47f00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#ffdad5'
  secondary-fixed-dim: '#ffb4a9'
  on-secondary-fixed: '#410000'
  on-secondary-fixed-variant: '#930002'
  tertiary-fixed: '#ffdf94'
  tertiary-fixed-dim: '#f5bf00'
  on-tertiary-fixed: '#251a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#f6faff'
  on-background: '#171c20'
  surface-variant: '#dee3e8'
  hyper-blue: '#40AAFF'
  pure-white: '#FFFFFF'
  alert-red: '#F00007'
  warning-yellow: '#FFC700'
typography:
  display-xl:
    fontFamily: Space Mono
    fontSize: 80px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: -0.04em
  display-xl-mobile:
    fontFamily: Space Mono
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Mono
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Space Mono
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Courier Prime
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 16px
  label-mono:
    fontFamily: Courier Prime
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 14px
spacing:
  unit: 4px
  margin-page: 24px
  gutter: 1px
  border-width: 2px
  heavy-border: 4px
---

## Brand & Style

This design system embodies a **High-Contrast Brutalist** aesthetic, drawing inspiration from the raw, unpolished nature of early internet culture and counter-culture movements. It is designed for an audience that values scarcity, irony, and disruption. The visual identity is intentionally provocative, utilizing "loud" visual cues to create a sense of extreme urgency and cultural "drops."

The UI rejects traditional corporate polish in favor of "raw" structural elements: heavy borders, monospaced fonts, and a utilitarian layout that feels like a high-speed terminal for exclusive content. Every element should feel vital, immediate, and slightly subversive.

## Colors

The palette is anchored by a stark, high-contrast relationship between pure black and white. 

- **Primary Black:** Used for heavy borders, typography, and solid backgrounds to ground the chaos.
- **Alert Red & Warning Yellow:** These are "functional" colors used to signal drops, limited quantities, and high-priority interactions. They should be used at 100% saturation to maximize optical impact.
- **Hyper Blue:** Reserved for interactive links or special digital artifacts to differentiate them from the physical "product" aesthetic.

Avoid gradients or subtle shades. Colors are either on or off.

## Typography

The typography strategy is purely monospaced, mimicking industrial manifests and terminal outputs. 

- **Display & Headlines:** Use **Space Mono** for its geometric, slightly wider stance. Set it tightly with negative letter-spacing for large headlines to create a "blocked-in" look.
- **Body & Utility:** Use **JetBrains Mono** for its exceptional legibility and technical feel.
- **Labels:** Use **Courier Prime** for meta-data and labels, always in uppercase.

Text is a structural element; it should be used to create patterns and define boundaries. Do not use standard sans-serif or serif fonts.

## Layout & Spacing

This design system uses a **Strict Grid** philosophy where the grid itself is often visible. 

- **Grid:** Use a 12-column layout on desktop, but treat gutters as 1px or 2px black lines. 
- **Borders as Spacing:** Elements are separated by hard borders rather than whitespace. 
- **Density:** Information should be dense. Margins are consistent but minimal (24px).
- **Mobile:** Elements stack vertically with 100% width, separated by the standard `heavy-border`.

The layout should feel "boxed in." Every image, text block, and button exists within a hard-lined container.

## Elevation & Depth

There is zero use of shadows, blurs, or Z-axis depth in this system. 

- **Tonal Stacking:** Depth is achieved through color blocks (e.g., a black header over a yellow body).
- **Negative Space:** Use high-contrast color fills to distinguish layers.
- **Flatness:** The UI is strictly 2D. To "elevate" a button, use a "Hard Shadow" offset—a solid black rectangle shifted 4px down and 4px right behind the element, rather than a blur.

## Shapes

The shape language is strictly **Sharp (0)**. There are no rounded corners in this design system. 

- All containers, buttons, and input fields must have 90-degree angles.
- Use 45-degree chamfered corners only for "industrial" tags or labels to mimic physical hang-tags.
- Heavy borders (2px to 4px) are mandatory for all structural components.

## Components

- **Buttons:** Solid background (Primary Black or Alert Red) with white uppercase text. On hover, the color should invert instantly with no transition.
- **Chips/Status:** Use the "Warning Yellow" for status indicators like "LIVE" or "SOLD OUT," always outlined in black.
- **Input Fields:** Rectangular boxes with 2px black borders. Labels should be placed inside the border at the top left, mimicking a form.
- **Cards:** Simple boxes with 4px borders. Any images inside should be flush with the top and side borders, no internal padding for images.
- **Countdown Timers:** Use the largest typography scale (Display XL) for countdowns to emphasize scarcity.
- **Lists:** Separated by 1px horizontal lines, using a monospaced "01.", "02." prefix for all items.