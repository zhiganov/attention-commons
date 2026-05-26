# Design

Visual system for Attention Commons. Literary / press-editorial register: the page should feel like a well-set reading edition, not a product UI. Restrained colour, serif-led typography, generous reading rhythm. Implemented as Starlight CSS custom-property overrides in `src/styles/custom.css`.

## Theme

Light-primary, with a first-class dark mode. Scene: *a contemplative reader settling into a long essay on attention in a quiet moment — they want warm paper and ink, not a glowing slab.* Default to light (paper). Dark mode is a true evening-reading theme (warm near-black, not blue-black), not an afterthought.

## Color

Strategy: **Restrained** — warm-tinted neutrals carry the surface; a single quiet accent appears at ≤10% (links, active nav, focus, rules). All values OKLCH; neutrals tinted warm (hue ~85) so nothing is pure `#000`/`#fff`.

Light mode:
- Paper (bg): `oklch(0.985 0.006 85)`
- Raised surface (sidebar/code): `oklch(0.965 0.007 85)`
- Ink (text): `oklch(0.265 0.012 85)`
- Muted text: `oklch(0.50 0.012 85)`
- Hairline border: `oklch(0.90 0.008 85)`

Dark mode (warm, not blue):
- Bg: `oklch(0.215 0.008 80)`
- Raised: `oklch(0.255 0.009 80)`
- Text: `oklch(0.92 0.006 85)`
- Muted: `oklch(0.72 0.008 85)`

Accent — a quiet **evergreen** (calm, and quietly evokes "commons" without literal green-washing):
- Light accent: `oklch(0.46 0.062 155)` (links, active states)
- Light accent-low (tint bg): `oklch(0.95 0.02 155)`
- Light accent-high (text-on-tint): `oklch(0.34 0.05 155)`
- Dark accent: `oklch(0.78 0.075 155)`

Map these onto Starlight tokens: `--sl-color-bg`, `--sl-color-bg-nav`, `--sl-color-text`, `--sl-color-gray-*`, `--sl-color-hairline`, `--sl-color-accent`, `--sl-color-accent-low`, `--sl-color-accent-high`. Set both `:root` (dark) and `:root[data-theme='light']` per Starlight 0.39 conventions; verify token names against the installed version.

## Typography

Serif-led, bookish. Self-hosted via `@fontsource` (no external font requests).

- **Body & headings:** `Source Serif 4` (variable; screen-tuned literary serif). Set `--sl-font`. Body weight 400; headings 600. Body size ~1.05rem, line-height ~1.75.
- **Furniture (sidebar, tabs, breadcrumbs, badges):** a quiet system humanist sans, so small navigation text stays crisp and the serif stays reserved for reading. Apply via targeted CSS on Starlight's nav/sidebar classes.
- **Mono:** `IBM Plex Mono` via `@fontsource`; set `--sl-font-mono`.
- Reading measure: cap content at ~70ch (`--sl-content-width` ≈ 45–50rem). Heading scale ≥1.25 ratio.

## Spacing & layout

Generous, varied rhythm; avoid uniform padding. Lean on whitespace and the reading measure rather than boxes and containers. Do not introduce card grids on content pages. The homepage splash CardGrid is the one sanctioned card use; keep cards flat (no nesting, no heavy shadow).

## Components

- **Asides (note / tip / caution):** override Starlight's default **left-stripe border** (banned). Use a full hairline border + a faint accent/neutral background tint + the existing leading icon. No `border-left` accent stripe.
- **Links:** accent colour, underline on hover; current-page nav uses accent text + faint accent-low background, not a side stripe.
- **Code blocks / Expressive Code:** warm, low-contrast theme consistent with the paper surface; not a neon dark block on a light page.
- **Rules / dividers:** hairline colour, used sparingly to separate sections.

## Motion

Minimal. Ease-out only (ease-out-quart/expo); no bounce, no elastic, never animate layout properties. Respect `prefers-reduced-motion`. Transitions limited to colour/opacity on hover/focus (~150ms).
