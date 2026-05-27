# Kachy Wealth Landing Page — Build Log

**Project:** A single-page landing site for **Philomena Amakyi Adjei**, financial professional with **Kachy Wealth and Services**, optimized for a QR-code scan-to-call flow.

**Live URL:** https://mxw67.github.io/kachywealth/

**Repo:** https://github.com/MXW67/kachywealth

**Local folder:** `C:\Users\LeaMX\Downloads\PHILOMINA`

---

## Table of Contents

1. [Brief](#brief)
2. [Tooling — installed skills](#tooling--installed-skills)
3. [Information gathering](#information-gathering)
4. [Design direction](#design-direction)
5. [Build — v1 (initial page)](#build--v1-initial-page)
6. [Iteration — underwriting partners](#iteration--underwriting-partners)
7. [Iteration — make it portable](#iteration--make-it-portable)
8. [Iteration — phone/device compatibility](#iteration--phonedevice-compatibility)
9. [Deployment — GitHub + Pages](#deployment--github--pages)
10. [Iteration — bigger Kachy logo](#iteration--bigger-kachy-logo)
11. [Final file structure](#final-file-structure)
12. [How to update the site](#how-to-update-the-site)
13. [New workflow rule (going forward)](#new-workflow-rule-going-forward)

---

## Brief

> "Design a landing page for a Financial Educator. People will find what she does as soon as they scan a QR code which redirects to the landing page."

The page had to:
- Read clearly on a phone within seconds of a QR scan
- Make her phone number tappable and prominent
- Identify the brand (Kachy Wealth and Services) instantly
- Communicate her services and mission without overwhelming
- Surface partner/underwriter credibility

---

## Tooling — installed skills

Installed the **impeccable** skill from `pbakaus/impeccable` for production-grade frontend design guidance:

```bash
npx skills add pbakaus/impeccable -g -y
```

The skill provides design laws (color strategy, typography, motion), register conventions (brand vs. product), and an anti-pattern catalogue (no gradient text, no side-stripe borders, no SaaS hero-metric templates, no em dashes, etc.).

---

## Information gathering

Confirmed with Philomena's brief:

| Field | Value |
|---|---|
| **Name** | Philomena Amakyi Adjei |
| **Role** | Financial Professional |
| **Business** | Kachy Wealth and Services |
| **Services** | Probate court system, retirement solutions, Million Dollar Baby plan, disability/income replacement, multiple income streams, Trust & Keyman executive plans |
| **Mission** | *"We work so hard in America and we are so poor because we do not have any plan put in place. It's about time we fix our accounts. Nobody is going to protect or grow your money except you. Take action now and grow your money."* |
| **CTA** | Phone call: **+1 (508) 753-4974** |
| **Location** | Worcester, Massachusetts |
| **Underwriting partners** | Transamerica, National Life Group, Fidelity Investments, Crump Life Insurance Services |
| **Brand assets** | KACHY logo (navy + gold), Philomena business portrait |

---

## Design direction

This is a **brand register** task (marketing/landing), not product UI. The page IS the product.

**Color strategy: Committed.** Navy + gold pulled directly from her existing Kachy logo. Cream background to avoid the cliché sterile "fintech-white-on-navy" reflex. A nod to her green dress in the photo via the photo plinth.

- **Navy 900:** `#0E1D3B`
- **Gold 500/600:** `#C99A3D` / `#B8862C`
- **Cream 50:** `#FBF7EE`

**Typography.** Fraunces (variable serif, editorial) for display + Inter for body. Heavy weight + size contrast between hierarchy levels (1.5+ ratio).

**Anti-references explicitly avoided:**
- ❌ Generic SaaS card grids for services → ✅ Editorial numbered list (01–06)
- ❌ Hero-metric template (big number, small label) → ✅ Pull-quote mission with literary feel
- ❌ Gradient text → ✅ Italic gold accents on key words
- ❌ Glassmorphism, em dashes, side-stripe borders → none used
- ❌ Sterile category reflex ("fintech navy + white") → broken with cream + serif + photo plinth

**Scene sentence (informed every decision):**
> "A working American scans Philomena's QR code at a community event in Massachusetts, glances at their phone while standing, has 15 seconds to decide whether to tap her phone number."

This forced: mobile-first, photo visible immediately, phone number HUGE and tappable, scannable content.

---

## Build — v1 (initial page)

Single HTML file, Tailwind via CDN, Google Fonts (Fraunces + Inter), self-contained.

### Section order (top to bottom)

1. **Top bar** — Kachy logo + "Call" pill button
2. **Hero** — editorial serif headline *"Nobody is going to protect your money except you"* + intro + tap-to-call button, paired with Philomena's photo on a navy-gradient plinth
3. **Mission quote** — her CTA copy treated as a magazine pull-quote with a giant gold quotation mark and italic gold accents on the punchlines
4. **Services** — numbered editorial list (01–06), serif name + sans description
5. **Big CTA panel** — navy block with a gold "Tap to call" card centering the phone number
6. **Footer** — Underwriting partner, Kachy wordmark, phone, copyright, disclaimer

### Files (v1)

- `index.html` — main page
- `.claude/launch.json` — preview server config (`npx serve` on port 4173)

---

## Iteration — underwriting partners

You added four partner logos to the folder:
- `transamerica_logo.png`
- `NationalLifeGroup_Logo.png`
- `Fidelity-Logo-500x281.png`
- `Crump-logo-300x300.jpeg`

Replaced the styled-text Transamerica wordmark in the footer with a proper "Underwriting Partners" row:

- **Mobile:** 2-column grid
- **Desktop:** 4-column row
- Each logo in a uniform white card with a small label underneath so the four very different brand backgrounds (red, green, blue, white) read as one cohesive bar

---

## Iteration — make it portable

**Problem:** You wanted the site openable anywhere without a local server.

**Solution:** Built `build-portable.mjs` to:
1. Optimize the hero photo (21.7 MB → 60.8 KB) via `sharp` (resize 900px wide, JPEG q=82)
2. Embed every image as a base64 data URI
3. Output `index-portable.html` (later renamed to `index.html`)

**Result:** Single 226 KB HTML file. No external image dependencies.

---

## Iteration — phone/device compatibility

**Problem:** You couldn't open the file on your phone.

**Root causes identified:**
- Tailwind **CDN** runtime JIT can be slow/unreliable on mobile networks
- Some Android browsers handle `file://` HTML files poorly (open in text viewer instead of browser)
- iOS restricts `file://` access for security

**Solution:**
1. Pre-compiled Tailwind CSS via the official CLI (`tailwindcss@3`) — no runtime CDN dependency. Output: ~15.6 KB of CSS, inlined into the HTML.
2. Added mobile-friendly meta tags (`format-detection`, `apple-mobile-web-app-capable`, etc.).
3. Recommended deploying to GitHub Pages since QR codes need URLs, not files.

After this iteration, the file became: **pure HTML + inline CSS + tiny inline JS + embedded base64 images.** Works on every modern browser.

---

## Deployment — GitHub + Pages

**Auth flow:**
1. Installed GitHub CLI 2.92.0 via `winget install --id GitHub.cli`
2. Ran `gh auth login --web` → device code `5F78-2585` → authorized in browser
3. Authenticated as **MXW67**
4. Set git identity: `MXW67` / `288343811+MXW67@users.noreply.github.com` (privacy email)

**Repo prep:**
- Renamed `index.html` → `index.source.html` (dev source with relative image refs)
- Updated `build-portable.mjs` to read `index.source.html` and write `index.html`
- Updated `tailwind.config.js` content path
- Rebuilt: fresh `index.html` is the deployable artifact
- Wrote `.gitignore` (excludes `node_modules/`, `.claude/`)
- Wrote `README.md` with rebuild instructions

**Push:**
```bash
git init -b main
git remote add origin https://github.com/MXW67/kachywealth.git
git add <files>
git commit -m "Initial landing page for Philomena Amakyi Adjei"
git push -u origin main
```

**Enable Pages:**
- Repo was private; GitHub Pages on free plan requires public → flipped repo to public with `gh repo edit --visibility public --accept-visibility-change-consequences`
- Enabled Pages on `main` branch root: `gh api -X POST repos/MXW67/kachywealth/pages -f source[branch]=main -f source[path]=/`
- Pages built in ~30 seconds
- Verified: **HTTP 200**, content matches, HTTPS enforced

**🎉 Live at: https://mxw67.github.io/kachywealth/**

---

## Iteration — bigger Kachy logo

**Problem:** On mobile, the brand logo was 48×48 px and the side wordmark was hidden — people couldn't immediately tell what site they were on.

**Fix:** Bumped the header logo to:
- Mobile: **80 px** (was 48)
- Tablet: **96 px** (was 56)
- Desktop: **112 px** (was 56)

Removed the redundant side text since the logo lockup itself already contains "KACHY / WEALTH AND SERVICES".

Pushed; live ETag changed from `6a16fe25` → `6a170217` after ~70 seconds.

---

## Final file structure

```
PHILOMINA/
├── index.html                       ← 226 KB — the deployed file
├── index.source.html                ← Dev source (uses local image refs)
├── build-portable.mjs               ← Node build script (uses sharp + tailwindcss)
├── tailwind.config.js               ← Brand palette + fonts
├── tailwind-input.css               ← Tailwind entry (base/components/utilities)
├── package.json                     ← Declares sharp + tailwindcss deps
├── package-lock.json
├── README.md                        ← User-facing rebuild docs
├── BUILD_LOG.md                     ← This file
├── PHILO BUSINESS PICTURE.png       ← Source assets, embedded at build time
├── KACHY copy.png
├── KACHY LOGO.png
├── KACHY LOGO 2.png
├── transamerica_logo.png
├── NationalLifeGroup_Logo.png
├── Fidelity-Logo-500x281.png
├── Crump-logo-300x300.jpeg
├── .gitignore                       ← Excludes node_modules/, .claude/
├── .claude/
│   └── launch.json                  ← Local preview config (not pushed)
└── node_modules/                    ← Build dependencies (not pushed)
```

---

## How to update the site

1. **Edit `index.source.html`** for any text, layout, or color change.
2. **Rebuild:**
   ```bash
   node build-portable.mjs
   ```
   This regenerates `index.html` with fresh embedded images and compiled CSS.
3. **Preview locally** (npx serve, port 4173, the `.claude/launch.json` config is set up for this).
4. **Get approval**, then push:
   ```bash
   git add index.source.html index.html
   git commit -m "Your change description"
   git push
   ```
5. GitHub Pages redeploys automatically in ~30–60 seconds.

---

## New workflow rule (going forward)

🛑 **No more direct pushes to GitHub.**

From now on, every change follows this loop:

1. Make edits to `index.source.html`
2. Rebuild `index.html` locally
3. Verify on the local preview server (port 4173)
4. Show the result and **wait for explicit approval**
5. Only after approval: commit and push to `MXW67/kachywealth`

This applies to copy edits, design tweaks, new sections, partner additions — every change.

---

## Contact

**Philomena Amakyi Adjei**
Financial Professional, Kachy Wealth and Services
📞 **+1 (508) 753-4974**
📍 Worcester, Massachusetts

**Underwriting partners:** Transamerica · National Life Group · Fidelity Investments · Crump Life Insurance Services
