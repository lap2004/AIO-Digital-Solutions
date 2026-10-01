import { execSync } from 'node:child_process';

console.log('Compressing video-89 (first 60s)...');
execSync(
  'ffmpeg -y -i "public/media/projects/videos/project-video-89.mp4" -t 60 -vf "scale=854:-2" -c:v libx264 -crf 30 -preset ultrafast -b:v 750k -c:a aac -b:a 48k -movflags +faststart "public/media/projects/videos/web/project-video-89.mp4"',
  { stdio: 'inherit' }
);

console.log('Compressing video-90 (first 60s)...');
execSync(
  'ffmpeg -y -i "public/media/projects/videos/project-video-90.mp4" -t 60 -vf "scale=854:-2" -c:v libx264 -crf 30 -preset ultrafast -b:v 750k -c:a aac -b:a 48k -movflags +faststart "public/media/projects/videos/web/project-video-90.mp4"',
  { stdio: 'inherit' }
);

console.log('All 91 videos compressed successfully!');
