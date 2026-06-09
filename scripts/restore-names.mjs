import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

const folders = fs.readdirSync(DATA_DIR, { withFileTypes: true }).filter((d) => d.isDirectory());

for (const folder of folders) {
  const category = FOLDER_CATEGORY[folder.name];
  if (!category) continue;

  const srcDir = path.join(DATA_DIR, folder.name);
  const destDir = path.join(PUBLIC_DIR, category);
  
  if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(srcDir).filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i));

  for (const file of files) {
    const ext = path.extname(file);
    const base = path.basename(file, ext);
    const sluggedName = slugify(base) + ext.toLowerCase();
    
    const originalFile = path.join(srcDir, file);
    const sluggedFile = path.join(destDir, sluggedName);
    const restoredFile = path.join(destDir, file);

    if (fs.existsSync(sluggedFile) && sluggedFile !== restoredFile) {
        fs.renameSync(sluggedFile, restoredFile);
        console.log(`Renamed: ${sluggedName} -> ${file}`);
    } else if (!fs.existsSync(restoredFile)) {
        fs.copyFileSync(originalFile, restoredFile);
        console.log(`Copied: ${file}`);
    }
  }
}
console.log("Done restoring names.");
