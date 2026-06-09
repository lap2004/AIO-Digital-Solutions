/**
 * data-scanner.mjs
 * ------------------------------------------------------------------
 * Scans ./data/<Vietnamese category>/*.{jpg,png,webp} and builds a typed
 * product-image manifest from the REAL filenames in that folder.
 *
 * Used by the inline Vite plugin (see vite.config.ts) so the catalog is
 * generated from real data automatically on `npm run dev` / `npm run build`.
 * No images are copied or renamed — they are served in place from /data-assets.
 * ------------------------------------------------------------------
 */
import fs from 'node:fs';
import path from 'node:path';

const IMG_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);

/** Default category slug per source folder. */
export const FOLDER_CATEGORY = {
  'Tấm LED': 'led-module',
  'Thiết bị công nghệ': 'technology-equipment',
  'Thiết bị giáo dục': 'education-equipment',
  'Thiết bị bệnh viện': 'hospital-equipment',
  'Thiết bị âm thanh': 'audio-equipment',
};

const KNOWN_BRANDS = [
  'Orient', 'Leyard', 'Kystar', 'Jabra', 'Roland', 'Epson', 'Optoma', 'Medi',
  'Sonelco', 'Aiphone', 'Bitcare', 'Dell', 'Allied Telesis', 'MeekBase',
  'Starview', 'Spark', 'Haotai', 'Bigtoper', 'FPT', 'Magic Taiwan', 'HDmovie',
  'KingKong', 'Vietjack', 'Absen', 'Unilumin',
];

function slugify(input) {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 90);
}

function refineCategory(folderCategory, name) {
  const n = name.toLowerCase();
  if (folderCategory === 'led-module') {
    if (n.includes('cho thuê') || n.includes('hộp') || n.includes('tủ') || n.includes('rental'))
      return 'led-cabinet';
    if (n.includes('ngoài trời')) return 'outdoor-led-module';
    if (n.includes('trong nhà')) return 'indoor-led-module';
    return 'led-module';
  }
  if (folderCategory === 'technology-equipment') {
    if (/(\bloa\b|tai nghe|micro|mixer|amplifier|line array|âm thanh|\bđèn\b|dmx)/.test(n))
      return 'audio-equipment';
    return 'technology-equipment';
  }
  return folderCategory;
}

function detectBrand(name) {
  const hit = KNOWN_BRANDS.find((b) => name.toLowerCase().includes(b.toLowerCase()));
  return hit ?? 'AIO';
}

function detectModel(name) {
  const m = name.match(/\b([A-Z0-9]{2,}(?:[-.][A-Z0-9]+)+)\b/);
  return m ? m[1] : null;
}

const enc = (s) => encodeURIComponent(s);

/**
 * @param {string} rootDir project root (contains ./data)
 * @returns {{generatedAt:string,count:number,items:Array}}
 */
export function scanData(rootDir) {
  const dataDir = path.join(rootDir, 'data');
  const items = [];
  if (!fs.existsSync(dataDir)) {
    return { generatedAt: new Date().toISOString(), count: 0, items };
  }

  const usedIds = new Set();
  const folders = fs.readdirSync(dataDir, { withFileTypes: true }).filter((d) => d.isDirectory());

  for (const folder of folders) {
    const folderCategory = FOLDER_CATEGORY[folder.name] ?? 'technology-equipment';
    const srcDir = path.join(dataDir, folder.name);
    const files = fs
      .readdirSync(srcDir)
      .filter((f) => IMG_EXT.has(path.extname(f).toLowerCase()))
      .sort();

    for (const file of files) {
      const ext = path.extname(file);
      const base = path.basename(file, ext);
      const category = refineCategory(folderCategory, base);

      let id = `${category}--${slugify(base)}`;
      let i = 1;
      while (usedIds.has(id)) id = `${category}--${slugify(base)}-${i++}`;
      usedIds.add(id);

      const model = detectModel(base);
      // Served in place by the dev middleware / copied to dist/data-assets on build.
      const image = `/data-assets/${enc(folder.name)}/${enc(file)}`;

      items.push({
        id,
        name: base.trim(),
        category,
        brand: detectBrand(base),
        sku: model
          ? `AIO-${model.replace(/[^A-Z0-9]/gi, '')}`
          : `AIO-${slugify(base).toUpperCase().replace(/-/g, '').slice(0, 10)}`,
        image,
      });
    }
  }

  return { generatedAt: new Date().toISOString(), count: items.length, items };
}
