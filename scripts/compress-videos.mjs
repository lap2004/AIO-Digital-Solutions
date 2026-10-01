import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const videosDir = path.resolve('public/media/projects/videos');
const webDir = path.resolve('public/media/projects/videos/web');

if (!fs.existsSync(webDir)) {
  fs.mkdirSync(webDir, { recursive: true });
}

// Clean old files if needed
const existingWebFiles = fs.readdirSync(webDir);
for (const f of existingWebFiles) {
  try {
    fs.unlinkSync(path.join(webDir, f));
  } catch {}
}

const files = fs.readdirSync(videosDir).filter((f) => f.endsWith('.mp4') && !f.includes('web'));

console.log(`Found ${files.length} raw video files to compress for Web streaming...`);

let totalOriginal = 0;
let totalCompressed = 0;

for (let i = 0; i < files.length; i++) {
  const f = files[i];
  const src = path.join(videosDir, f);
  const out = path.join(webDir, f);

  const origSize = fs.statSync(src).size;
  totalOriginal += origSize;

  console.log(`[${i + 1}/${files.length}] Compressing ${f} (${(origSize / 1024 / 1024).toFixed(1)} MB)...`);
  try {
    // Highly efficient web streaming settings: 480p/720p H.264, 850k bitrate, faststart
    execSync(
      `ffmpeg -y -i "${src}" -vf "scale='min(854,iw)':-2" -c:v libx264 -crf 30 -preset ultrafast -b:v 750k -maxrate 1000k -bufsize 1500k -c:a aac -b:a 48k -movflags +faststart "${out}"`,
      { stdio: 'ignore', timeout: 30000 }
    );
    const newSize = fs.statSync(out).size;
    totalCompressed += newSize;
    console.log(` -> Done: ${(newSize / 1024 / 1024).toFixed(2)} MB`);
  } catch (err) {
    console.warn(`Failed on ${f}:`, err.message);
  }
}

console.log(
  `\nCOMPRESSION COMPLETE:\nOriginal: ${(totalOriginal / 1024 / 1024).toFixed(1)} MB\nWeb Total: ${(totalCompressed / 1024 / 1024).toFixed(1)} MB`
);
