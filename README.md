# Kachy Wealth and Services — Landing Page

Single-page landing for **Philomena Amakyi Adjei**, Financial Professional with Kachy Wealth and Services. Designed for a QR-code scan-to-call flow.

**Live site:** https://mxw67.github.io/kachywealth/

## Files

| File | Purpose |
|---|---|
| `index.html` | **Deployed file.** Fully self-contained — Tailwind CSS pre-compiled inline, all 8 images embedded as base64. ~226 KB total. No external dependencies except Google Fonts. |
| `index.source.html` | Editing source. Uses local image paths and the Tailwind CDN — easier to iterate on. **Edit this file**, then run the build below. |
| `build-portable.mjs` | Build script. Compiles Tailwind from `index.source.html`, optimizes/embeds every image, writes the final `index.html`. |
| `tailwind.config.js` | Tailwind theme (navy + gold brand palette, custom fonts). |
| `tailwind-input.css` | Tailwind entry file (`@tailwind base; components; utilities;`). |
| `package.json` | Declares the `sharp` and `tailwindcss` dependencies for the build. |
| Image files | Source assets used by both versions. Optimized + inlined at build time. |

## Editing the page

1. Open `index.source.html` and make your changes (text, layout, colors).
2. Rebuild:
   ```bash
   npm install         # first time only
   node build-portable.mjs
   ```
3. Commit & push:
   ```bash
   git add index.html index.source.html
   git commit -m "Update landing copy"
   git push
   ```
4. GitHub Pages redeploys automatically (~30 seconds).

## Contact

Philomena Amakyi Adjei  
**+1 (508) 753-4974**  
Worcester, Massachusetts

---

Underwriting partners: Transamerica, National Life Group, Fidelity Investments, Crump Life Insurance Services.
