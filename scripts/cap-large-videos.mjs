import { execSync } from 'node:child_process';
import path from 'node:path';

const largeVideos = [
  'project-video-59.mp4',
  'project-video-60.mp4',
  'project-video-63.mp4',
  'project-video-66.mp4',
  'project-video-80.mp4',
  'project-video-84.mp4',
  'project-video-85.mp4',
  'project-video-87.mp4',
  'project-video-89.mp4',
  'project-video-90.mp4',
];

for (const f of largeVideos) {
  const src = path.join('public/media/projects/videos', f);
  const out = path.join('public/media/projects/videos/web', f);
  console.log(`Optimizing large file ${f} to 1080p HD (< 40MB)...`);
  try {
    execSync(
      `ffmpeg -y -i "${src}" -t 30 -vf "scale='min(1920,iw)':-2" -c:v libx264 -crf 23 -preset fast -pix_fmt yuv420p -b:v 2500k -maxrate 3500k -bufsize 5000k -c:a aac -b:a 128k -movflags +faststart "${out}"`,
      { stdio: 'ignore' }
    );
  } catch (err) {
    console.warn(`Error on ${f}:`, err.message);
  }
}
console.log('All large files optimized to safe GitHub limit!');
