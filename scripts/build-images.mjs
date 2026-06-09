import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { scanData } from './data-scanner.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = path.join(ROOT, 'data');
const PUBLIC_DIR = path.join(ROOT, 'public', 'images', 'products');

const FOLDER_CATEGORY = {
  'Tấm LED': 'led-module',
  'Thiết bị công nghệ': 'technology-equipment',
  'Thiết bị giáo dục': 'education-equipment',
  'Thiết bị bệnh viện': 'hospital-equipment',
  'Thiết bị âm thanh': 'audio-equipment',
  'Tấm LED ngoài trời': 'outdoor-led-module',
  'Tấm LED trong nhà': 'indoor-led-module',
  'Tủ LED': 'led-cabinet',
};

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

// 1. Clear out public/images/products entirely
if (fs.existsSync(PUBLIC_DIR)) {
  fs.rmSync(PUBLIC_DIR, { recursive: true, force: true });
}
fs.mkdirSync(PUBLIC_DIR, { recursive: true });

// 2. Copy files from data/ and slugify their names
const folders = fs.readdirSync(DATA_DIR, { withFileTypes: true }).filter((d) => d.isDirectory());

let count = 0;
for (const folder of folders) {
  const rawCategory = FOLDER_CATEGORY[folder.name] || slugify(folder.name);
  const srcDir = path.join(DATA_DIR, folder.name);

  const files = fs.readdirSync(srcDir).filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i));

  for (const file of files) {
    const ext = path.extname(file);
    const base = path.basename(file, ext);
    const category = refineCategory(rawCategory, base);
    const destDir = path.join(PUBLIC_DIR, category);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    const sluggedName = slugify(base) + ext.toLowerCase();
    
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, sluggedName));
    count++;
  }
}
console.log(`Copied and slugified ${count} images from data/ to public/images/products/.`);
