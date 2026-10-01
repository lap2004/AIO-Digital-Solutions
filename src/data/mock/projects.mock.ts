import type { Project, ProjectCategory } from '@/domain/entities';
import { slugify } from '@/core/utils/slug';
import { FEATURED_PROJECT_VIDEOS, FEATURED_PROJECT_IMAGES } from '@/data/projectsMedia';

const CATEGORY_MAP: Record<string, ProjectCategory> = {
  'Màn hình LED Trong Nhà': 'enterprise',
  'Màn hình LED Ngoài Trời': 'shopping-mall',
  'Màn hình Ghép LCD Video Wall': 'government',
  'Màn hình LED Hội Trường': 'education',
  'Standee & Màn hình Cảm Ứng': 'shopping-mall',
  'Bảng Điện Tử & Andon Nhà Máy': 'factory',
  'Bệnh viện & Y Tế': 'hospital',
  'Thể Thao & Sân Vận Động': 'stadium',
  'Màn hình LED Trong Suốt': 'shopping-mall',
  'Màn hình LED P2.5 Trong Nhà': 'enterprise',
  'Màn hình LED P3.0 Trong Nhà': 'education',
  'Màn hình LED P4 Ngoài Trời': 'shopping-mall',
  'Màn hình LED P5 Ngoài Trời': 'shopping-mall',
  'Cabinet Nhôm Đúc Định Hình': 'factory',
  'Khung Sắt Định Hình Chịu Lực': 'factory',
  'Đấu nối Tủ Nguồn & Điều Khiển': 'enterprise',
  'Kiểm thử Nghiệm thu 72h': 'factory',
};

// Map all 91 real video projects
const videoProjects: Project[] = FEATURED_PROJECT_VIDEOS.map((v, i) => {
  const catKey = v.category || 'Màn hình LED Trong Nhà';
  const category: ProjectCategory = CATEGORY_MAP[catKey] || 'enterprise';
  const year = v.year || (2024 + (i % 2));
  const coverImg = v.thumbnail || `/media/projects/videos/thumbs/thumb-video-${i + 1}.jpg`;

  return {
    id: `proj-video-${i + 1}`,
    slug: `${slugify(v.title)}-${i + 1}`,
    name: v.title,
    nameEn: v.title,
    category,
    client: `Chủ đầu tư & Doanh nghiệp tại ${v.location}`,
    clientEn: `Enterprise Client at ${v.location}`,
    location: v.location,
    locationEn: v.location,
    description: `AIO tổng thầu thi công lắp đặt trọn gói: ${v.title}. Hệ thống đạt tiêu chuẩn chất lượng cao, tần số làm tươi 3840Hz siêu mượt, xử lý hình ảnh NovaStar chính hãng, bảo hành 24-36 tháng tận nơi.`,
    descriptionEn: `AIO turnkey contractor for ${v.title}. High refresh rate 3840Hz, genuine NovaStar video processor, 24/7 stable operation.`,
    challenge: 'Mặt bằng thi công yêu cầu độ chính xác cơ khí cao, thời gian lắp đặt gấp và đảm bảo an toàn điện tuyệt đối.',
    challengeEn: 'High mechanical precision required under tight installation schedule and strict safety standards.',
    solution: 'AIO thiết kế hệ khung chịu lực CNC chính xác, sử dụng module LED chọn lọc và hệ thống nguồn Meanwell ổn định.',
    solutionEn: 'AIO engineered precise CNC support framing and selected high-grade LED modules with Meanwell power supplies.',
    cover: coverImg,
    videoUrl: v.url,
    gallery: [
      { url: coverImg, alt: v.title, type: 'image' },
      { url: v.url, alt: `${v.title} (Video 4K)`, type: 'video' },
    ],
    technologies: ['NovaStar Processing', 'High Refresh Rate 3840Hz', 'Meanwell Power', 'Die-Cast Aluminum Cabinet'],
    scale: v.specs || 'Hệ thống màn hình LED chuyên dụng',
    scaleEn: v.specs || 'Professional LED Display System',
    area: '25 - 120 m²',
    areaEn: '25 - 120 sqm',
    completedAt: `${year}-${String(1 + (i % 12)).padStart(2, '0')}-15`,
    featured: i < 15,
    relatedProductIds: ['led-p186-indoor', 'led-p25-indoor', 'novastar-tb30', 'meanwell-lrs-350'],
    seo: {
      title: `${v.title} | Dự án AIO`,
      description: `Hình ảnh và video công trình thực tế: ${v.title} do AIO Digital Solutions thi công trọn gói.`,
    },
  };
});

// Map all 131 real photo projects
const imageProjects: Project[] = FEATURED_PROJECT_IMAGES.map((img, i) => {
  const catKey = img.category || 'Màn hình LED Trong Nhà';
  const category: ProjectCategory = CATEGORY_MAP[catKey] || 'enterprise';
  const year = 2024 + (i % 2);

  return {
    id: `proj-img-${i + 1}`,
    slug: `${slugify(img.title)}-${i + 92}`,
    name: img.title,
    nameEn: img.title,
    category,
    client: `Công trình tại ${img.location}`,
    clientEn: `Project at ${img.location}`,
    location: img.location,
    locationEn: img.location,
    description: `AIO hoàn thiện bàn giao hạng mục: ${img.title}. Đảm bảo chất lượng hiển thị sắc nét, đồng đều màu sắc và vận hành ổn định 24/7.`,
    descriptionEn: `AIO successfully commissioned ${img.title} with high visual performance and durability.`,
    challenge: 'Đáp ứng các yêu cầu khắt khe về góc nhìn, độ phẳng bề mặt và độ bền trong điều kiện hoạt động liên tục.',
    challengeEn: 'Meeting strict requirements for viewing angles, surface flatness and continuous duty cycle.',
    solution: 'Ứng dụng giải pháp điều khiển đồng bộ và quy trình kiểm thử lão hóa 72 giờ trước khi bàn giao.',
    solutionEn: 'Applied synchronized control system and 72-hour burn-in quality testing prior to handover.',
    cover: img.url,
    gallery: [{ url: img.url, alt: img.title, type: 'image' }],
    technologies: ['Fine Pitch LED', 'NovaStar Controller', 'IP65 Ingress Protection', 'Energy Efficient Driver'],
    scale: img.category || 'Công trình màn hình LED tiêu chuẩn',
    scaleEn: img.category || 'Standard LED Installation',
    area: '15 - 80 m²',
    areaEn: '15 - 80 sqm',
    completedAt: `${year}-${String(1 + (i % 12)).padStart(2, '0')}-20`,
    featured: i < 10,
    relatedProductIds: ['led-p25-indoor', 'led-p3-outdoor', 'novastar-tb50'],
    seo: {
      title: `${img.title} | Dự án AIO`,
      description: `Ảnh thực tế công trình: ${img.title} tại ${img.location} do AIO thi công.`,
    },
  };
});

export const PROJECTS: Project[] = [...videoProjects, ...imageProjects];
