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

const productImages = PRODUCTS.filter((p) => p.image).map((p) => p.image);

function coverFor(i: number): string {
  return productImages.length ? productImages[i % productImages.length] : '';
}

export const PROJECTS: Project[] = Array.from({ length: 36 }, (_, i) => {
  const rng = seededRandom(`project-${i}`);
  const client = pick(ENTERPRISE_CLIENTS, rng);
  const type = PROJECT_TYPES[i % PROJECT_TYPES.length];
  const category = CATEGORIES[i % CATEGORIES.length];
  const city = pick(VN_CITIES, rng);
  const name = `${type} — ${client}`;
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
    category,
    client,
    location: city,
    description: `AIO triển khai ${type.toLowerCase()} cho ${client} tại ${city}. ${LOREM_VI}`,
    challenge:
      'Khách hàng cần một hệ thống vận hành ổn định 24/7, dễ quản lý tập trung và đáp ứng tiêu chuẩn kỹ thuật khắt khe.',
    solution: `AIO tư vấn, thiết kế và thi công trọn gói, tích hợp ${pick(TECH_TERMS, rng)} và ${pick(TECH_TERMS, rng)} để tối ưu hiệu năng và chi phí vận hành.`,
    cover: coverFor(i),
    gallery,
    technologies: [pick(TECH_TERMS, rng), pick(TECH_TERMS, rng), pick(TECH_TERMS, rng)],
    scale: `${20 + Math.floor(rng() * 480)} điểm / thiết bị`,
    area: `${50 + Math.floor(rng() * 950)} m²`,
    completedAt: `${year}-${String(1 + Math.floor(rng() * 12)).padStart(2, '0')}-15`,
    featured: rng() > 0.7,
    relatedProductIds: related,
    seo: {
      title: `${name} | Dự án AIO`,
      description: `Dự án ${type} do AIO thực hiện cho ${client} tại ${city}.`,
    },
  } satisfies Project;
});
