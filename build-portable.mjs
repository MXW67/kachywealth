// Builds a single self-contained index-portable.html:
//   1. Compiles Tailwind CSS (no runtime CDN — works on any phone/network)
//   2. Optimizes the hero photo (resize + jpeg)
//   3. Embeds every image as a base64 data URI
//   4. Keeps Google Fonts as remote but uses preconnect + display=swap for fast mobile
//
// Run with: node build-portable.mjs

import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { execSync } from 'node:child_process';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));

const ASSETS = [
  { file: 'PHILO BUSINESS PICTURE.png', optimize: { width: 900, fmt: 'jpeg', q: 82 } },
  { file: 'KACHY copy.png',             optimize: { width: 400, fmt: 'png' } },
  { file: 'KACHY LOGO 2.png',           optimize: { width: 600, fmt: 'png' } },
  { file: 'KACHY LOGO.png',             optimize: { width: 600, fmt: 'png' } },
  { file: 'transamerica_logo.png',      optimize: { width: 500, fmt: 'png' } },
  { file: 'NationalLifeGroup_Logo.png', optimize: { width: 500, fmt: 'png' } },
  { file: 'Fidelity-Logo-500x281.png',  optimize: { width: 500, fmt: 'png' } },
  { file: 'Crump-logo-300x300.jpeg',    optimize: { width: 400, fmt: 'jpeg', q: 88 } },
];

async function toDataUri(spec) {
  const buf = await readFile(join(here, spec.file));
  let pipe = sharp(buf).resize({ width: spec.optimize.width, withoutEnlargement: true });
  let mime;
  if (spec.optimize.fmt === 'jpeg') {
    pipe = pipe.jpeg({ quality: spec.optimize.q ?? 82, mozjpeg: true });
    mime = 'image/jpeg';
  } else {
    pipe = pipe.png({ compressionLevel: 9, palette: true });
    mime = 'image/png';
  }
  const out = await pipe.toBuffer();
  return { dataUri: `data:${mime};base64,${out.toString('base64')}`, bytes: out.length };
}

function compileTailwind() {
  console.log('Compiling Tailwind CSS…');
  execSync(
    'npx --yes tailwindcss@3 -c tailwind.config.js -i tailwind-input.css -o tailwind-output.css --minify',
    { cwd: here, stdio: ['ignore', 'pipe', 'pipe'] }
  );
  return readFile(join(here, 'tailwind-output.css'), 'utf8');
}

async function main() {
  const tailwindCss = await compileTailwind();
  console.log(`  Tailwind CSS: ${(tailwindCss.length / 1024).toFixed(1)} KB\n`);

  let html = await readFile(join(here, 'index.source.html'), 'utf8');

  // 1. Replace Tailwind CDN script + inline runtime config with compiled CSS
  html = html.replace(
    /<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>\s*<script>[\s\S]*?<\/script>/,
    `<style id="tailwind-compiled">\n${tailwindCss}\n</style>`
  );

  // 2. Embed all images
  console.log('Embedding image assets…');
  let totalBytes = 0;
  for (const a of ASSETS) {
    const { dataUri, bytes } = await toDataUri(a);
    totalBytes += bytes;
    const enc = encodeURIComponent(a.file);
    html = html.split(`src="${enc}"`).join(`src="${dataUri}"`);
    html = html.split(`src="${a.file}"`).join(`src="${dataUri}"`);
    html = html.split(`this.src='${enc}'`).join(`this.src='${dataUri}'`);
    html = html.split(`this.src='${a.file}'`).join(`this.src='${dataUri}'`);
    console.log(`  ${a.file.padEnd(36)} -> ${(bytes / 1024).toFixed(1)} KB`);
  }

  // 3. Drop the onerror fallback (now unnecessary — data URIs always succeed)
  html = html.replace(/\s*onerror="[^"]*"/g, '');

  // 4. Tighten <head> for mobile reliability: add format-detection, apple-mobile tags
  html = html.replace(
    '<meta name="theme-color" content="#0E1D3B" />',
    `<meta name="theme-color" content="#0E1D3B" />
<meta name="format-detection" content="telephone=yes" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />`
  );

  const outPath = join(here, 'index.html');
  await writeFile(outPath, html, 'utf8');

  // Cleanup the intermediate file
  try { await rm(join(here, 'tailwind-output.css')); } catch {}

  const finalBytes = Buffer.byteLength(html, 'utf8');
  console.log(`\n✓ Wrote ${outPath}`);
  console.log(`  Image bytes embedded: ${(totalBytes / 1024).toFixed(1)} KB`);
  console.log(`  Final HTML size:      ${(finalBytes / 1024).toFixed(1)} KB`);
  console.log(`\n  No Tailwind CDN. No JS framework. Just HTML + CSS + tiny inline JS.`);
  console.log(`  Works on any phone / tablet / desktop browser. Hostable anywhere.`);
}

main().catch(e => { console.error(e); process.exit(1); });
