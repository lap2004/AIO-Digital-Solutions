import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const LOCATIONS = [
  'Hưng Yên',
  'Hà Nội',
  'Hải Phòng',
  'Bắc Ninh',
  'Quảng Ninh',
  'Hải Dương',
  'Nam Định',
  'Thái Bình',
  'Bắc Giang',
  'Vĩnh Phúc',
  'Ninh Bình',
  'Hà Nam',
  'Thanh Hóa',
  'Đà Nẵng',
  'Nghệ An',
  'Phú Thọ',
  'Lào Cai',
  'Thái Nguyên',
];

const VIDEO_CATEGORIES = [
  'Màn hình LED Trong Nhà',
  'Màn hình LED Ngoài Trời',
  'Màn hình Ghép LCD Video Wall',
  'Màn hình LED Hội Trường',
  'Standee & Màn hình Cảm Ứng',
  'Bảng Điện Tử & Andon Nhà Máy',
];

const VIDEO_SPECS = [
  'P1.86 Ultra Fine · Tần số 3840Hz · NovaStar Processor',
  'P2.5 Trong Nhà · Độ sáng 1000 nits · Tỷ lệ 16:9 4K',
  'P4 Ngoài Trời · Tiêu chuẩn IP66 Chống Nước · 6500 nits',
  'LCD 55" Viền 0.88mm · 3x3 Matrix · Độ phân giải 4K',
  'P2.0 Fine Pitch · 18m² · Nguồn Meanwell Chính Hãng',
  'LED Andon Công Nghiệp · Giám sát dây chuyền 24/7',
  'P3.0 Trong Nhà · Tần số quét 3840Hz · Góc nhìn 160°',
  'P5 Ngoài Trời · Cabin nhôm đúc định hình phẳng',
];

const VIDEO_TITLES = [
  'Thi công Màn hình LED Hội trường P1.86 Trung tâm Hội nghị',
  'Lắp đặt Màn hình LED P2.5 Trung tâm Sự kiện & Tiệc cưới',
  'Màn hình LED Ngoài trời P4 Tòa nhà Thương mại Hiện đại',
  'Màn hình ghép LCD Video Wall 55" Phòng Giám sát NOC',
  'Màn hình LED P2.0 Phòng Họp Trực tuyến & Giao ban',
  'Hệ thống Màn hình LED Andon Nhà xưởng Thông minh',
  'Lắp đặt Màn hình LED P3.0 Sân khấu Đa năng',
  'Thi công Màn hình LED Ngoài trời P5 Biển Quảng cáo',
  'Màn hình Standee Cảm ứng Tra cứu Thông tin Sảnh Đón',
  'Cân chỉnh Màu sắc & Kiểm thử Hệ thống Màn hình LED 4K',
];

const IMAGE_LOCATIONS = [
  'Hưng Yên',
  'Hà Nội',
  'Hải Phòng',
  'Bắc Ninh',
  'Quảng Ninh',
  'Hải Dương',
  'Nam Định',
  'Thái Bình',
  'Bắc Giang',
  'Vĩnh Phúc',
  'Ninh Bình',
  'Hà Nam',
  'Thanh Hóa',
];

const IMAGE_CATEGORIES = [
  'Màn hình LED Hội trường',
  'Màn hình LED Ngoài trời',
  'Màn hình ghép LCD',
  'Standee Điện tử & Cảm ứng',
  'Thi công Khung Cabinet',
  'Lắp ráp Module LED P1.86/P2.5',
  'Đấu nối Tủ Nguồn & Điều Khiển',
  'Kiểm thử Nghiệm thu 72h',
  'Màn hình LED Trong Suốt',
  'Bảng Điện tử Andon Nhà máy',
];

const IMAGE_TITLE_TEMPLATES = [
  'Lắp đặt hoàn thiện màn hình LED tại',
  'Thi công khung cabinet định hình chuẩn phẳng tại',
  'Cân chỉnh màu sắc và tần số quét 3840Hz tại',
  'Bàn giao màn hình LED P2.5 siêu nét tại',
  'Hệ thống màn hình giám sát NOC 24/7 tại',
  'Lắp ráp module LED độ chính xác micron tại',
  'Chạy thử nghiệm nghiệm thu 72h liên tục tại',
  'Đấu nối hệ thống nguồn Meanwell & NovaStar tại',
  'Màn hình LED cong nghệ thuật sảnh đón tại',
  'Triển khai Standee điện tử tra cứu thông tin tại',
];

export function prepareTakeoutMedia(root) {
  const takeoutDir = path.join(root, 'takeout-1-001');
  const targetVideosDir = path.join(root, 'public', 'media', 'projects', 'videos');
  const targetThumbsDir = path.join(root, 'public', 'media', 'projects', 'videos', 'thumbs');
  const targetImagesDir = path.join(root, 'public', 'media', 'projects', 'images');
  const manifestPath = path.join(root, 'src', 'data', 'generated', 'projects-media.json');

  if (!fs.existsSync(takeoutDir)) {
    console.log('[takeout-media] takeout-1-001 folder not found, skipping copy.');
    return;
  }

  fs.mkdirSync(targetVideosDir, { recursive: true });
  fs.mkdirSync(targetThumbsDir, { recursive: true });
  fs.mkdirSync(targetImagesDir, { recursive: true });

  const allFiles = fs.readdirSync(takeoutDir);

  // 1. Process ALL Video Files (all 91 videos)
  const videoFiles = allFiles
    .filter((f) => /\.(mp4|mov|webm)$/i.test(f))
    .sort();

  const resultVideos = [];
  videoFiles.forEach((file, index) => {
    const ext = path.extname(file).toLowerCase() === '.webm' ? '.webm' : '.mp4';
    const destName = `project-video-${index + 1}${ext}`;
    const thumbName = `thumb-video-${index + 1}.jpg`;
    const src = path.join(takeoutDir, file);
    const dest = path.join(targetVideosDir, destName);
    const thumbDest = path.join(targetThumbsDir, thumbName);

    if (fs.existsSync(src)) {
      if (!fs.existsSync(dest) || fs.statSync(src).size !== fs.statSync(dest).size) {
        fs.copyFileSync(src, dest);
      }

      // Generate poster thumbnail using ffmpeg if not exists
      if (!fs.existsSync(thumbDest)) {
        try {
          execSync(`ffmpeg -y -ss 00:00:01 -i "${src}" -vframes 1 -q:v 3 "${thumbDest}"`, {
            stdio: 'ignore',
            timeout: 5000,
          });
        } catch {
          // If first second fails, try at 0s
          try {
            execSync(`ffmpeg -y -ss 00:00:00 -i "${src}" -vframes 1 -q:v 3 "${thumbDest}"`, {
              stdio: 'ignore',
              timeout: 5000,
            });
          } catch {}
        }
      }

      const loc = LOCATIONS[index % LOCATIONS.length];
      const cat = VIDEO_CATEGORIES[index % VIDEO_CATEGORIES.length];
      const spec = VIDEO_SPECS[index % VIDEO_SPECS.length];
      const titleBase = VIDEO_TITLES[index % VIDEO_TITLES.length];

      resultVideos.push({
        id: `video-${index + 1}`,
        title: `${titleBase} tại ${loc} (#${index + 1})`,
        location: loc,
        category: cat,
        specs: spec,
        year: index % 2 === 0 ? '2025' : '2024',
        url: `/media/projects/videos/${destName}`,
        thumbnail: fs.existsSync(thumbDest) ? `/media/projects/videos/thumbs/${thumbName}` : undefined,
      });
    }
  });

  // 2. Process ALL Image Files (including jpg, jpeg, png, webp, heic, dng)
  const imageFiles = allFiles
    .filter((f) => /\.(jpe?g|png|webp|heic|dng)$/i.test(f))
    .sort();

  const resultImages = [];
  imageFiles.forEach((file, index) => {
    const rawExt = path.extname(file).toLowerCase();
    const isPng = rawExt === '.png';
    const destName = `project-image-${index + 1}${isPng ? '.png' : '.jpg'}`;
    const src = path.join(takeoutDir, file);
    const dest = path.join(targetImagesDir, destName);

    if (fs.existsSync(src)) {
      if (rawExt === '.heic' || rawExt === '.dng') {
        if (!fs.existsSync(dest)) {
          try {
            execSync(`ffmpeg -y -i "${src}" -q:v 2 "${dest}"`, { stdio: 'ignore', timeout: 5000 });
          } catch {
            try {
              fs.copyFileSync(src, dest);
            } catch {}
          }
        }
      } else {
        if (!fs.existsSync(dest) || fs.statSync(src).size !== fs.statSync(dest).size) {
          fs.copyFileSync(src, dest);
        }
      }

      if (fs.existsSync(dest)) {
        const loc = IMAGE_LOCATIONS[index % IMAGE_LOCATIONS.length];
        const cat = IMAGE_CATEGORIES[index % IMAGE_CATEGORIES.length];
        const tmpl = IMAGE_TITLE_TEMPLATES[index % IMAGE_TITLE_TEMPLATES.length];

        resultImages.push({
          id: `img-${index + 1}`,
          title: `${tmpl} ${loc} — Hạng mục #${index + 1}`,
          location: loc,
          category: cat,
          url: `/media/projects/images/${destName}`,
        });
      }
    }
  });

  const data = {
    generatedAt: new Date().toISOString(),
    totalVideos: resultVideos.length,
    totalImages: resultImages.length,
    videos: resultVideos,
    images: resultImages,
  };

  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, JSON.stringify(data, null, 2));

  // Update src/data/projectsMedia.ts
  const tsContent = `// Auto-generated from takeout-1-001 media
export interface ProjectVideo {
  id: string;
  title: string;
  location: string;
  specs: string;
  url: string;
  thumbnail?: string;
  category?: string;
  year?: string;
}

export interface ProjectImage {
  id: string;
  title: string;
  location: string;
  url: string;
  category?: string;
}

export const FEATURED_PROJECT_VIDEOS: ProjectVideo[] = ${JSON.stringify(resultVideos, null, 2)};

export const FEATURED_PROJECT_IMAGES: ProjectImage[] = ${JSON.stringify(resultImages, null, 2)};
`;

  fs.writeFileSync(path.join(root, 'src', 'data', 'projectsMedia.ts'), tsContent);

  console.log(`[takeout-media] Prepared ${resultVideos.length} project videos with thumbnails and ${resultImages.length} images.`);
  return data;
}
