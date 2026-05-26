# attentioncommons.org — design spec (v1)

**Date:** 2026-05-26
**Status:** approved (design), pending implementation plan
**Owner:** Artem Zhiganov

## Purpose

A public **knowledge commons / wiki** for Attention Commons — a browsable, contributable knowledge base about attention as a commons: the idea, its governance, its practices, and the source tradition behind it. This is the "practice commons" direction from the [active-solidarity README](https://github.com/zhiganov/active-solidarity) made concrete and public.

Not (in v1): a marketing landing page, a community/membership hub, or a live multi-user wiki app.

## Stack

- **Astro + [Starlight](https://github.com/withastro/starlight)** — Astro's official documentation/knowledge-base framework. Chosen because it ships the wiki UX out of the box: left-sidebar navigation, built-in full-text search (Pagefind), Markdown/MDX content, and automatic "Edit this page on GitHub" links.
- **Static output.** No backend, no database.
- **Content** lives as Markdown/MDX in `src/content/docs/`, organised into the sidebar groups below.

## Repository

- New **public** repo: `zhiganov/attention-commons`.
- Local path: `C:\Users\temaz\claude-project\attention-commons\`.
- Separate from `active-solidarity`, which remains the **private working space** (origin notes, development log, private notes, raw conversation exports). Those do **not** move here.

## Editing & contribution model

- **Git + Markdown via GitHub.** Contributions through GitHub's edit-in-browser flow or pull requests; Starlight renders an "Edit this page" link on every page.
- A friendly web editor (**Keystatic**) is a **deferred** enhancement — it sits on top of the same Git Markdown files for less-technical contributors (e.g. Viktor) and requires no architecture change. Out of scope for v1.
- `CONTRIBUTING.md` explains how to add/edit a page and the licensing/attribution norm.

## Information architecture

Sidebar groups → pages (approved structure; "good enough for v1"):

- **Start here**
  - What Attention Commons is (the coherent external statement — [active-solidarity#16](https://github.com/zhiganov/active-solidarity/issues/16))
  - The three directions (conceptual ground · practice commons · civic movement)
  - How to use & contribute to this wiki
- **The idea**
  - Attention as a commons
  - The enclosure claim
  - The bounded-commons problem & its resolutions
  - Commons vs. ground (the layered framing)
- **Governance**
  - Ostrom's design principles, for attention ([active-solidarity#13](https://github.com/zhiganov/active-solidarity/issues/13))
  - Monitoring commons / collective interoception
  - Civilizational frame vs. practical questions
  - Theory of change ([active-solidarity#17](https://github.com/zhiganov/active-solidarity/issues/17))
- **Practices**
  - Practice commons & CC licensing ([active-solidarity#14](https://github.com/zhiganov/active-solidarity/issues/14))
  - Living traditions & lineages
  - The kit form (Climate Fresk as reference)
- **Map & strategy**
  - The four-quadrant map & the "pink zones" ([active-solidarity#15](https://github.com/zhiganov/active-solidarity/issues/15))
  - Three horizons
- **Library**
  - Reading & source trail (Bollier, Ostrom, P2P Foundation, Ken McLeod, …)
  - Public fellow-travellers

## Content migration

- Source material: `active-solidarity/research/README.md`, `concept/README.md`, and `docs/development-log.md` (as a *source* to write from, not to copy).
- Each themed section of those files becomes a focused single-topic page under the IA above (Starlight is one-topic-per-page).
- `active-solidarity` keeps `development-log.md`, `origin.md`, `private-notes.md`, and raw exports. None migrate.
- Initial pages may be stubs with a clear "draft / pending" marker where the underlying GitHub issue (#12–#17) is still open — the wiki structure can exist before every page is fully written.

## Guardrails (hard constraints)

1. **Viktor's authored writing is his.** The Culture of Attention manifesto is his book material. Represent the *idea via its moves* and leave an explicit placeholder; do **not** publish his manifesto text (or other authored writing) on the public site without his explicit go-ahead.
2. **Nothing private.** No content from `active-solidarity/docs/private-notes.md` (people, pipeline, health, money) reaches the public site. Public fellow-travellers only, ideas-and-published-references only.
3. **No generated brand assets.** No AI-generated logos/illustrations/OG art (workspace rule). Use Starlight theming + simple typography/colour; icons from an icon library if needed.
4. **No AI attribution** in any user-facing copy.

## Deployment

- **Netlify** (free OSS tier — the workspace convention for non-Harmonica sites; Vercel is reserved for Harmonica). Static build, no adapter needed.
- Custom domain **attentioncommons.org** → Netlify. DNS records must be set by Artem at the registrar (exact records provided at deploy time).
- Standard OG/Twitter meta + canonical URL.

## Out of scope (v1 — YAGNI)

- Live multi-user editing backend; accounts/auth.
- Keystatic CMS (deferred enhancement).
- Custom logo / full brand system.
- Bilingual RU/EN. **English only** for v1. (Starlight has first-class i18n, so this is a clean v2 add if the Russian-speaking audience needs it.)

## Open items for implementation plan

- Exact Starlight scaffold command + current project structure (verify against current Starlight docs).
- Per-page migration map (which source paragraphs → which page).
- Theming pass (typography/colour) — handled with the frontend-design skill during implementation.
- Netlify site creation + DNS instructions.
- GitHub repo creation + first push.
