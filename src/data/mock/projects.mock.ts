import type { Project, ProjectCategory } from '@/domain/entities';
import { slugify, seededRandom, pick } from '@/core/utils/slug';
import { ENTERPRISE_CLIENTS, VN_CITIES, TECH_TERMS, LOREM_VI } from './seed';
import { PRODUCTS } from './products.mock';

const CATEGORIES: ProjectCategory[] = [
  'government', 'education', 'hospital', 'factory', 'enterprise', 'shopping-mall', 'stadium',
];

const PROJECT_TYPES = [
  'Màn hình LED trung tâm điều hành',
  'Hệ thống Camera AI giám sát',
  'Giải pháp bệnh viện thông minh',
  'Màn hình LED ngoài trời quảng cáo',
  'Phòng họp thông minh',
  'Lớp học tương tác',
  'Nền tảng IoT giám sát',
  'Digital Signage chuỗi bán lẻ',
];

const PROJECT_TYPES_EN = [
  'Control Center LED Display',
  'AI Camera Surveillance System',
  'Smart Hospital Solution',
  'Outdoor Advertising LED Display',
  'Smart Meeting Room',
  'Interactive Classroom',
  'IoT Monitoring Platform',
  'Retail Chain Digital Signage',
];

const productImages = PRODUCTS.filter((p) => p.image).map((p) => p.image);

function coverFor(i: number): string {
  return productImages.length ? productImages[i % productImages.length] : '';
}

export const PROJECTS: Project[] = Array.from({ length: 36 }, (_, i) => {
  const rng = seededRandom(`project-${i}`);
  const client = pick(ENTERPRISE_CLIENTS, rng);
  const type = PROJECT_TYPES[i % PROJECT_TYPES.length];
  const typeEn = PROJECT_TYPES_EN[i % PROJECT_TYPES_EN.length];
  const category = CATEGORIES[i % CATEGORIES.length];
  const city = pick(VN_CITIES, rng);
  const name = `${type} — ${client}`;
  const nameEn = `${typeEn} — ${client}`;
  const year = 2021 + Math.floor(rng() * 5);
  const related = PRODUCTS.filter((_, idx) => idx % 7 === i % 7).slice(0, 4).map((p) => p.id);
  const gallery = Array.from({ length: 4 }, (_, g) => ({
    url: coverFor(i + g + 1),
    alt: `${name} - hình ${g + 1}`,
    type: 'image' as const,
  })).filter((m) => m.url);

  return {
    id: `project-${i}`,
    slug: `${slugify(type)}-${slugify(client)}-${i}`,
    name,
    nameEn,
    category,
    client,
    clientEn: client,
    location: city,
    locationEn: city,
    description: `AIO triển khai ${type.toLowerCase()} cho ${client} tại ${city}. ${LOREM_VI}`,
    descriptionEn: `AIO delivered the ${typeEn.toLowerCase()} for ${client} in ${city}. With over a decade of experience, AIO provides end-to-end technology solutions from consulting, design, manufacturing to installation and maintenance.`,
    challenge: 'Khách hàng cần một hệ thống vận hành ổn định 24/7, dễ quản lý tập trung và đáp ứng tiêu chuẩn kỹ thuật khắt khe.',
    challengeEn: 'The client needed a stable 24/7 operating system, easy to centrally manage, and meeting strict technical standards.',
    solution: `AIO tư vấn, thiết kế và thi công trọn gói, tích hợp ${pick(TECH_TERMS, rng)} và ${pick(TECH_TERMS, rng)} để tối ưu hiệu năng và chi phí vận hành.`,
    solutionEn: `AIO provided turnkey consulting, design and installation, integrating ${pick(TECH_TERMS, rng)} and ${pick(TECH_TERMS, rng)} to optimize performance and operating costs.`,
    cover: coverFor(i),
    gallery,
    technologies: [pick(TECH_TERMS, rng), pick(TECH_TERMS, rng), pick(TECH_TERMS, rng)],
    scale: `${20 + Math.floor(rng() * 480)} điểm / thiết bị`,
    scaleEn: `${20 + Math.floor(rng() * 480)} points / devices`,
    area: `${50 + Math.floor(rng() * 950)} m²`,
    areaEn: `${50 + Math.floor(rng() * 950)} sqm`,
    completedAt: `${year}-${String(1 + Math.floor(rng() * 12)).padStart(2, '0')}-15`,
    featured: rng() > 0.7,
    relatedProductIds: related,
    seo: {
      title: `${name} | Dự án AIO`,
      description: `Dự án ${type} do AIO thực hiện cho ${client} tại ${city}.`,
    },
  } satisfies Project;
});
