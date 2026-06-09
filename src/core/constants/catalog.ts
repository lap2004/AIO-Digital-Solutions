import type {
  NewsCategory,
  ProductCategory,
  ProjectCategory,
} from '@/domain/entities';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { slug: 'led-module', name: 'LED Module', description: 'Module màn hình LED full color đa pixel pitch P1.25 - P6.', icon: 'LayoutGrid' },
  { slug: 'outdoor-led-module', name: 'LED Module ngoài trời', description: 'Module LED ngoài trời chống nước, độ sáng cao P3 - P10.', icon: 'Sun' },
  { slug: 'indoor-led-module', name: 'LED Module trong nhà', description: 'Module LED trong nhà mịn nét P1.25 - P2.5.', icon: 'Monitor' },
  { slug: 'audio-equipment', name: 'Thiết bị âm thanh', description: 'Loa, line array, ampli, mixer, micro không dây.', icon: 'Speaker' },
  { slug: 'hospital-equipment', name: 'Thiết bị bệnh viện', description: 'Hệ thống gọi y tá, kiosk, màn hình xếp hàng thông minh.', icon: 'HeartPulse' },
  { slug: 'technology-equipment', name: 'Thiết bị công nghệ', description: 'Camera AI, server, video processor, controller.', icon: 'Cpu' },
  { slug: 'education-equipment', name: 'Thiết bị giáo dục', description: 'Màn hình tương tác, bảng thông minh, máy chiếu.', icon: 'GraduationCap' },
  { slug: 'led-cabinet', name: 'LED Cabinet', description: 'Cabinet LED trong nhà, ngoài trời và cho thuê.', icon: 'Box' },
];

export const PRODUCT_CATEGORY_LABEL: Record<string, string> = Object.fromEntries(
  PRODUCT_CATEGORIES.map((c) => [c.slug, c.name]),
);

export const PROJECT_CATEGORY_LABEL: Record<ProjectCategory, string> = {
  government: 'Cơ quan nhà nước',
  education: 'Giáo dục',
  hospital: 'Y tế - Bệnh viện',
  factory: 'Nhà máy',
  enterprise: 'Doanh nghiệp',
  'shopping-mall': 'Trung tâm thương mại',
  stadium: 'Sân vận động',
};

export const NEWS_CATEGORY_LABEL: Record<NewsCategory, string> = {
  'led-technology': 'Công nghệ LED',
  ai: 'Trí tuệ nhân tạo',
  iot: 'IoT',
  'digital-transformation': 'Chuyển đổi số',
  'smart-city': 'Đô thị thông minh',
  projects: 'Dự án',
};
