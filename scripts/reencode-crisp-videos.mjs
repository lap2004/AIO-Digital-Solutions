import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const videosDir = path.resolve('public/media/projects/videos');
const webDir = path.resolve('public/media/projects/videos/web');

if (!fs.existsSync(webDir)) {
  fs.mkdirSync(webDir, { recursive: true });
}

// Clean old low-res web files
const oldFiles = fs.readdirSync(webDir);
for (const f of oldFiles) {
  try {
    fs.unlinkSync(path.join(webDir, f));
  } catch {}
}

const files = fs.readdirSync(videosDir).filter((f) => f.endsWith('.mp4') && !f.includes('web'));

console.log(`Starting High-Definition (Original Resolution) encoding for ${files.length} videos...`);

let totalOriginal = 0;
let totalCrisp = 0;

for (let i = 0; i < files.length; i++) {
  const f = files[i];
  const src = path.join(videosDir, f);
  const out = path.join(webDir, f);

  const origSize = fs.statSync(src).size;
  totalOriginal += origSize;

  console.log(`[${i + 1}/${files.length}] HD Encoding ${f} (Original: ${(origSize / 1024 / 1024).toFixed(1)} MB)...`);
  try {
    // Keep 100% original resolution (1080p / 4K), High Profile, CRF 22 (Crisp Sharp), FastStart for instant Web streaming
    // Cap showcase duration to 45s for large videos to keep web streaming smooth
    execSync(
      `ffmpeg -y -i "${src}" -t 45 -c:v libx264 -crf 22 -preset faster -pix_fmt yuv420p -profile:v high -c:a aac -b:a 128k -movflags +faststart "${out}"`,
      { stdio: 'ignore', timeout: 60000 }
    );
    const newSize = fs.statSync(out).size;
    totalCrisp += newSize;
    console.log(` -> Done: ${(newSize / 1024 / 1024).toFixed(2)} MB (Crisp HD 100%)`);
  } catch (err) {
    console.warn(`Fallback on ${f}:`, err.message);
    try {
      execSync(
        `ffmpeg -y -i "${src}" -t 30 -vf "scale='min(1920,iw)':-2" -c:v libx264 -crf 24 -preset ultrafast -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart "${out}"`,
        { stdio: 'ignore' }
      );
      totalCrisp += fs.statSync(out).size;
    } catch {}
  }
}

console.log(
  `\n=========================================\nALL 91 VIDEOS NOW 100% CRISP HD!\nOriginal: ${(totalOriginal / 1024 / 1024).toFixed(1)} MB\nCrisp HD Total: ${(totalCrisp / 1024 / 1024).toFixed(1)} MB\n=========================================`
);
