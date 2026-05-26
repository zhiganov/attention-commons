# attentioncommons.org Wiki — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a deployable Astro + Starlight knowledge-commons wiki for attentioncommons.org, with the full sidebar IA scaffolded, real content where it exists today, marked stubs elsewhere, and live on Netlify.

**Architecture:** Static Astro site using the Starlight docs framework. Content is Markdown/MDX in `src/content/docs/`, organised into sidebar groups configured in `astro.config.mjs`. No backend. Contributions via GitHub (Starlight "Edit this page" links). Built to `dist/` and served by Netlify; custom domain via registrar DNS.

**Tech Stack:** Astro 5, `@astrojs/starlight`, Pagefind (bundled search), Netlify static hosting.

**Spec:** `docs/plans/2026-05-26-wiki-design.md` (read it first — especially the *Domain emphasis* and *Guardrails* sections).

---

## Guardrails (apply to EVERY content task)

- **Contemplative + integral depth is the substance.** Practices/idea pages must treat lineages, transmission, phenomenology, and Wilber's integral quadrants seriously — not as generic "mindfulness."
- **Viktor's authored writing is not published without sign-off.** The manifesto is a placeholder page representing its *moves* only.
- **Nothing from `active-solidarity/docs/private-notes.md`** (people pipeline, health, money) reaches this site. Public fellow-travellers and published references only.
- **No AI-generated brand assets** (logos, OG art, illustrations). No AI attribution in any copy.

## Source material (read-only inputs)

- `../active-solidarity/research/README.md`
- `../active-solidarity/concept/README.md`
- `../active-solidarity/docs/development-log.md`
- Open issues `zhiganov/active-solidarity#12–#17` (page-level briefs).

## File structure (target)

```
attention-commons/
├── astro.config.mjs          # site metadata + sidebar IA + editLink + theming hook
├── src/
│   ├── content.config.ts     # Starlight docs collection (from template)
│   ├── content/docs/
│   │   ├── index.mdx         # landing / splash
│   │   ├── start/            # Start here
│   │   ├── idea/             # The idea
│   │   ├── governance/       # Governance
│   │   ├── practices/        # Practices
│   │   ├── map/              # Map & strategy
│   │   └── library/          # Library
│   ├── assets/
│   └── styles/custom.css     # theme overrides (frontend-design pass)
├── public/                   # favicon, robots.txt
├── netlify.toml              # build command + publish dir
└── docs/plans/               # this plan + the design spec (already present)
```

---

### Task 1: Scaffold the Starlight project into the existing repo

**Files:**
- Create: project scaffold (`astro.config.mjs`, `package.json`, `src/`, `public/`, `tsconfig.json`)
- Preserve: existing `docs/` and `.git/`

- [ ] **Step 1: Run the Starlight scaffold in the current directory**

Working dir: `C:\Users\temaz\claude-project\attention-commons`

```bash
npm create astro@latest . -- --template starlight
```

Answer the prompts:
- "Directory is not empty, continue?" → **Yes** (it merges; it will not delete `docs/` or `.git/`)
- Install dependencies? → **Yes**
- TypeScript? → **Yes, Strict**
- Initialize git repo? → **No** (already initialised)

- [ ] **Step 2: Start the dev server and verify the default site renders**

```bash
npm run dev
```

Expected: server at `http://localhost:4321/`, default Starlight "My Docs" homepage renders with a sidebar and search box. Stop the server (Ctrl+C) once confirmed.

- [ ] **Step 3: Add a Node `.gitignore` if the scaffold didn't**

Verify `node_modules/`, `dist/`, `.astro/`, and `.env` are ignored. If `.gitignore` is missing any, add them.

```
node_modules/
dist/
.astro/
.env
.env.*
.DS_Store
```

- [ ] **Step 4: Commit the scaffold**

```bash
git add -A
git commit -m "Scaffold Astro + Starlight project"
```

---

### Task 2: Configure site metadata, sidebar IA, and edit links

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Replace the Starlight integration config with the project IA**

Set `astro.config.mjs` to:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://attentioncommons.org',
  integrations: [
    starlight({
      title: 'Attention Commons',
      description:
        'A knowledge commons for attention: the idea that attention is a shared resource being enclosed by the attention economy, and the counter-tradition that holds the wisdom about attention in common.',
      editLink: {
        baseUrl: 'https://github.com/zhiganov/attention-commons/edit/main/',
      },
      lastUpdated: true,
      pagefind: true,
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/zhiganov/attention-commons' },
      ],
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Start here',
          items: [
            { slug: 'start/what-is-attention-commons' },
            { slug: 'start/three-directions' },
            { slug: 'start/how-to-contribute' },
          ],
        },
        {
          label: 'The idea',
          items: [
            { slug: 'idea/attention-as-a-commons' },
            { slug: 'idea/the-enclosure-claim' },
            { slug: 'idea/the-bounded-commons-problem' },
            { slug: 'idea/commons-vs-ground' },
          ],
        },
        {
          label: 'Governance',
          items: [
            { slug: 'governance/ostrom-principles-for-attention' },
            { slug: 'governance/monitoring-commons' },
            { slug: 'governance/civilizational-frame-vs-practical-questions' },
            { slug: 'governance/theory-of-change' },
          ],
        },
        {
          label: 'Practices',
          items: [
            { slug: 'practices/practice-commons-and-licensing' },
            { slug: 'practices/living-traditions-and-lineages' },
            { slug: 'practices/the-kit-form' },
          ],
        },
        {
          label: 'Map & strategy',
          items: [
            { slug: 'map/four-quadrant-map' },
            { slug: 'map/three-horizons' },
          ],
        },
        {
          label: 'Library',
          items: [
            { slug: 'library/reading-and-sources' },
            { slug: 'library/fellow-travellers' },
          ],
        },
      ],
    }),
  ],
});
```

- [ ] **Step 2: Create the empty custom CSS file referenced above**

Create `src/styles/custom.css` with a single placeholder comment so the build resolves it (theming happens in Task 5):

```css
/* Attention Commons theme overrides — populated in the frontend-design pass (Task 5). */
```

- [ ] **Step 3: Build to verify the config is valid (expect failures for missing pages)**

```bash
npm run build
```

Expected: build FAILS with errors that the sidebar `slug`s have no matching content files. This confirms the sidebar is wired; Task 3 creates the pages. (If it fails for any *other* reason, fix that first.)

- [ ] **Step 4: Commit the config**

```bash
git add astro.config.mjs src/styles/custom.css
git commit -m "Configure site metadata, sidebar IA, and edit links"
```

---

### Task 3: Create every page as a structured stub (full IA, deployable)

**Files:**
- Delete: default template pages under `src/content/docs/` (e.g. `guides/`, `reference/`) and the default `index.mdx` body
- Create: one `.md` file per sidebar slug from Task 2 (18 pages)

Each page starts as a structured stub: real frontmatter + a one-line lede + the section's planned subheadings + a draft marker linking the tracking issue. This makes the whole wiki buildable and deployable now; prose is filled in Task 4 and incrementally as materials arrive.

- [ ] **Step 1: Remove default template content**

```bash
rm -rf src/content/docs/guides src/content/docs/reference
```

- [ ] **Step 2: Create the splash homepage** `src/content/docs/index.mdx`

```mdx
---
title: Attention Commons
description: A knowledge commons for attention as a shared resource.
template: splash
hero:
  tagline: Attention is a shared resource being enclosed by the attention economy. This is a commons for the wisdom about attending well.
  actions:
    - text: What is Attention Commons?
      link: /start/what-is-attention-commons/
      icon: right-arrow
    - text: Browse on GitHub
      link: https://github.com/zhiganov/attention-commons
      icon: external
      variant: minimal
---

import { Card, CardGrid } from '@astrojs/starlight/components';

<CardGrid>
  <Card title="The idea" icon="open-book">
    Attention as a commons — the enclosure claim and how the commons frame actually holds.
  </Card>
  <Card title="Governance" icon="setting">
    Ostrom's design principles, monitoring as collective interoception, a theory of change.
  </Card>
  <Card title="Practices" icon="heart">
    Contemplative lineages, a practice commons, and the kit form for shared practice.
  </Card>
  <Card title="Map & strategy" icon="puzzle">
    The integral four-quadrant map and the three horizons of change.
  </Card>
</CardGrid>
```

- [ ] **Step 3: Create the 18 content stubs**

For each slug below, create the file with this exact frontmatter+stub shape (substituting the per-page `title`, `description`, lede, subheadings, and issue link from the table):

Template:
```md
---
title: <PAGE TITLE>
description: <ONE-SENTENCE DESCRIPTION>
---

<ONE-LINE LEDE>

:::note[Draft]
This page is a stub. Tracking: [active-solidarity#<N>](https://github.com/zhiganov/active-solidarity/issues/<N>).
:::

## <SUBHEADING 1>

## <SUBHEADING 2>
```

Pages (file → title → issue → subheadings):

| File | Title | Issue | Subheadings |
|---|---|---|---|
| `start/what-is-attention-commons.md` | What is Attention Commons | #16 | What it is · Why it matters · The short version |
| `start/three-directions.md` | The three directions | — | Conceptual ground · Practice commons · Civic & cultural movement |
| `start/how-to-contribute.md` | How to contribute | — | Editing a page · What belongs here · Attribution & licence |
| `idea/attention-as-a-commons.md` | Attention as a commons | #12 | The claim · What "commons" means · Why attention |
| `idea/the-enclosure-claim.md` | The enclosure claim | #12 | The attention economy · Enclosure, old and new · Alienation |
| `idea/the-bounded-commons-problem.md` | The bounded-commons problem | #12 | The tension · Resolution A: community as commons · Resolution B: knowledge commons |
| `idea/commons-vs-ground.md` | Commons vs. ground | #12 | The layered framing · Governable vs. recognisable |
| `governance/ostrom-principles-for-attention.md` | Ostrom's design principles, for attention | #13 | The eight principles · Translated for a practice community · A reusable blueprint |
| `governance/monitoring-commons.md` | Monitoring as collective interoception | — | Not surveillance · Noticing shared attention · Course-correcting before capture |
| `governance/civilizational-frame-vs-practical-questions.md` | Civilizational frame vs. practical questions | #17 | Two kinds of work · Keeping them distinct · The Ostromian questions |
| `governance/theory-of-change.md` | Theory of change | #17 | The three moves · Three horizons · Stakes and traction |
| `practices/practice-commons-and-licensing.md` | Practice commons & licensing | #14 | CC BY-SA for practices · Attribution to lineage · Open transmission vs. integrity |
| `practices/living-traditions-and-lineages.md` | Living traditions & lineages | — | Lineage as governance · Contemplative depth · The science of deep states |
| `practices/the-kit-form.md` | The kit form | — | Climate Fresk as reference · Downloadable, runnable · Free facilitation |
| `map/four-quadrant-map.md` | The four-quadrant map | #15 | Integral quadrants · The three "pink zones" · The continuous vertical |
| `map/three-horizons.md` | Three horizons | #17 | H1 / H2 / H3 · Reading the present · Bridging to the future |
| `library/reading-and-sources.md` | Reading & sources | — | Commons · Contemplative · Futures & integral |
| `library/fellow-travellers.md` | Fellow travellers | — | People · Projects · (public only) |

(Note: `idea/*` pages share issue #12; that is intentional — they decompose the one research page.)

- [ ] **Step 4: Add the manifesto placeholder note to `idea/commons-vs-ground.md`**

At the bottom of that page, add:
```md
:::caution[Manifesto pending]
A *Culture of Attention* manifesto exists in draft (Viktor Shiryaev's, written for his book). It is represented here only by its moves until he approves publishing the text.
:::
```

- [ ] **Step 5: Build to verify the whole wiki compiles and search indexes**

```bash
npm run build
```

Expected: PASS, `dist/` produced, log shows Pagefind indexing the pages. Zero broken-slug errors.

- [ ] **Step 6: Commit the IA**

```bash
git add -A
git commit -m "Create full sidebar IA as structured stubs"
```

---

### Task 4: Write the flagship pages from existing material

Only the pages whose content already exists in `active-solidarity` are written now (contemplative/integral depth per guardrails). The rest stay stubs until materials arrive.

**Files (write real content, replacing the stub body):**
- `src/content/docs/start/what-is-attention-commons.md`
- `src/content/docs/start/three-directions.md`
- `src/content/docs/idea/attention-as-a-commons.md`
- `src/content/docs/idea/the-enclosure-claim.md`
- `src/content/docs/library/reading-and-sources.md`

- [ ] **Step 1: Write `start/what-is-attention-commons.md`**

Draw from `active-solidarity/README.md` (the three-directions section) and `concept/README.md` ("What this is now"). Cover: the enclosure claim in two sentences; the commons counter-tradition; the Culture-of-Attention umbrella; that this is provisional. Keep the project's provisional tone. Remove the draft `:::note`.

- [ ] **Step 2: Write `start/three-directions.md`**

Use the three directions verbatim-in-spirit from `active-solidarity/README.md`: (1) conceptual ground, (2) practice commons (CC-like ethos, attribution to lineages), (3) civic & cultural movement. Remove the draft note.

- [ ] **Step 3: Write `idea/attention-as-a-commons.md`**

Draw from `research/README.md` ("Attention as a commons — the core") and `development-log.md`. Cover the claim, what "commons" means (Ostrom + Bollier's commoning-as-social-practice), and why attention qualifies. Integral note: place it in the collective quadrants. Remove the draft note. Keep `#12` referenced as further reading.

- [ ] **Step 4: Write `idea/the-enclosure-claim.md`**

From `research/README.md` + `development-log.md`: attention economy (Williams, Crawford, CHT), the English-enclosures analogy, Marxist alienation, the AI/agentic-attention extension. Remove the draft note.

- [ ] **Step 5: Write `library/reading-and-sources.md`**

Transcribe the source trail from `development-log.md` and `research/README.md` into three grouped link lists: Commons (Ostrom, Bollier, P2P Foundation), Contemplative (Ken McLeod / Unfettered Mind, Buddhist modernism, Pure Land, Davidson/Lutz), Futures & integral (Wilber, Pollock, Noema "Second Axial Age", Atlas wayfinding). Public links only. Remove the draft note.

- [ ] **Step 6: Build and spot-check links**

```bash
npm run build
```
Expected: PASS. Open `dist/` preview with `npm run preview` and click through the five written pages + the homepage; confirm no broken internal links and search returns them.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Write flagship pages from existing active-solidarity material"
```

---

### Task 5: Theming pass (frontend-design skill)

**Files:**
- Modify: `src/styles/custom.css`
- Possibly modify: `astro.config.mjs` (font `<head>` links)

- [ ] **Step 1: Invoke the frontend-design skill** for the visual treatment — accent colour, gray scale, type pairing (a readable serif/sans for body, a calm accent), spacing, dark/light. Constraints: no generated logos/illustrations; calm, library-like, contemplative feel; icon-library icons only. Override Starlight CSS custom properties (`--sl-color-accent`, `--sl-color-accent-low/high`, `--sl-font`, etc.) in `custom.css`.

- [ ] **Step 2: Build and review in `npm run preview`** at light and dark, desktop and mobile widths. Adjust until it reads calm and intentional, not default-Starlight.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "Theme: calm contemplative palette and typography"
```

---

### Task 6: Favicon, 404, robots, and social meta

**Files:**
- Create: `public/robots.txt`
- Replace: `public/favicon.svg` → a PNG favicon (no AI-generated art; a simple typographic/glyph mark or a plain wordmark favicon)
- Create: `src/content/docs/404.md`

- [ ] **Step 1: Add `public/robots.txt`**

```
User-agent: *
Allow: /
Sitemap: https://attentioncommons.org/sitemap-index.xml
```

- [ ] **Step 2: Add a `404.md`**

```md
---
title: Not found
template: splash
---

That page isn't here. Try the [start page](/start/what-is-attention-commons/) or search.
```

- [ ] **Step 3: Confirm `site` is set in `astro.config.mjs`** (done in Task 2) so Starlight emits canonical + OG URLs and a sitemap. Build and verify `dist/sitemap-index.xml` exists.

```bash
npm run build
```
Expected: PASS; `dist/sitemap-index.xml` present.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add robots, 404, sitemap-ready meta"
```

---

### Task 7: Create the GitHub repo and push

**Files:** none (remote setup)

- [ ] **Step 1: Create the public repo and push**

```bash
gh repo create zhiganov/attention-commons --public --source . --remote origin --description "A knowledge commons for attention — attentioncommons.org" --push
```

- [ ] **Step 2: Verify**

```bash
gh repo view zhiganov/attention-commons --web
```
Expected: repo exists, code pushed, README/site visible. Confirm the "Edit this page" links resolve to `github.com/zhiganov/attention-commons/edit/main/...` once deployed.

---

### Task 8: Deploy to Netlify and connect the domain

**Files:**
- Create: `netlify.toml`

- [ ] **Step 1: Add `netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

- [ ] **Step 2: Commit and push**

```bash
git add netlify.toml
git commit -m "Add Netlify build config"
git push
```

- [ ] **Step 3: Create the Netlify site from the repo**

In the Netlify UI (or `npx netlify-cli init`): "Add new site → Import from Git → GitHub → zhiganov/attention-commons". Build settings auto-detected from `netlify.toml`. Deploy. Expected: a `*.netlify.app` URL builds green and serves the wiki with working search.

- [ ] **Step 4: Connect the custom domain** — Artem action

In Netlify: Domain settings → Add custom domain → `attentioncommons.org`. Then at the **domain registrar**, set the DNS records Netlify specifies (typically an `A`/`ALIAS` to Netlify's load balancer + a `CNAME` for `www`). Enable HTTPS (Let's Encrypt) once DNS resolves.

- [ ] **Step 5: Verify live**

Visit `https://attentioncommons.org`. Confirm: homepage renders, sidebar IA present, search works, an "Edit this page" link opens GitHub, HTTPS valid.

---

## Notes for the implementer

- This is a content site: there are no unit tests. The build (`npm run build`) is the gate — it fails on broken sidebar slugs and bad MDX, and it runs Pagefind indexing. Treat a green build + a manual click-through as "passing."
- Stubs are intentional product scope (see spec: incremental materials). Do not block deploy on filling every page.
- Heavy builds can exhaust the Windows shell — if `npm run build` crashes the shell, run it from PowerShell (per workspace note).
