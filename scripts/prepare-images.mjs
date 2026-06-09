/**
 * prepare-images.mjs — writes the product-image manifest from the REAL files
 * in ./data. Normally you do NOT need to run this manually: the Vite plugin in
 * vite.config.ts regenerates it automatically on `npm run dev` / `npm run build`.
 * Provided as a standalone command for CI or debugging.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { scanData } from './data-scanner.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'src', 'data', 'generated', 'image-manifest.json');

const manifest = scanData(ROOT);
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(manifest, null, 2));

const byCat = manifest.items.reduce((a, it) => ((a[it.category] = (a[it.category] ?? 0) + 1), a), {});
console.log(`[prepare-images] ${manifest.count} products from ./data`);
console.log('[prepare-images] Per category:', byCat);
