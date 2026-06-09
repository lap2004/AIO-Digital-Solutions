/** Company + site-wide constants (single source of truth). */

export const COMPANY = {
  legalName: 'CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ SỐ AIO',
  shortName: 'AIO Digital Solutions',
  brand: 'AIO',
  taxCode: '1001326140',
  director: 'Nguyễn Thị Doan',
  address:
    'Số nhà 05, Ngõ 198, Đường Lý Thường Kiệt, Tổ 7 - Kỳ Bá, Phường Trần Lãm, Tỉnh Hưng Yên, Việt Nam',
  addressEn:
    'No. 05, Lane 198, Ly Thuong Kiet Street, Group 7 - Ky Ba, Tran Lam Ward, Hung Yen Province, Vietnam',
  email: 'AIOgroup.led@gmail.com',
  hotline: '038 4204555',
  zalo: 'https://zalo.me/0384204555',
  workingHours: 'Thứ 2 - Thứ 7: 08:00 - 17:30',
  workingHoursEn: 'Mon - Sat: 08:00 - 17:30',
  slogan: 'Giải pháp công nghệ số toàn diện',
  foundedYear: 2025,
} as const;

export interface NavItem {
  label: string;
  to: string;
}

export const MAIN_NAV: NavItem[] = [
  { label: 'Trang chủ', to: '/' },
  { label: 'Về chúng tôi', to: '/gioi-thieu' },
  { label: 'Giải pháp', to: '/giai-phap' },
  { label: 'Sản phẩm', to: '/san-pham' },
  { label: 'Dự án', to: '/du-an' },
  { label: 'Liên hệ', to: '/lien-he' },
];

export interface BusinessArea {
  slug: string;
  title: string;
  titleEn: string;
  tagline: string;
  taglineEn: string;
  icon: string;
  features: string[];
  featuresEn: string[];
  to: string;
}

/** 4 mảng kinh doanh cốt lõi của AIO. */
export const BUSINESS_AREAS: BusinessArea[] = [
  {
    slug: 'thi-cong-lap-dat',
    title: 'Thi công & Lắp đặt màn hình hiển thị',
    titleEn: 'Display installation & deployment',
    tagline:
      'Cung cấp giải pháp thi công, lắp đặt màn hình LED, màn LCD ghép (video wall) và màn standee quảng cáo trọn gói.',
    taglineEn:
      'Turnkey supply and installation of LED screens, LCD video walls and advertising standee displays.',
    icon: 'display',
    features: [
      'Màn hình LED trong nhà & ngoài trời',
      'Màn hình LCD ghép (Video Wall)',
      'Màn hình standee quảng cáo',
      'Tư vấn – thiết kế – thi công trọn gói',
    ],
    featuresEn: [
      'Indoor & outdoor LED screens',
      'LCD video walls',
      'Advertising standee displays',
      'End-to-end consulting – design – installation',
    ],
    to: '/giai-phap',
  },
  {
    slug: 'quan-ly-dieu-khien',
    title: 'Quản lý & Điều khiển hiển thị từ xa',
    titleEn: 'Remote display management & control',
    tagline:
      'Giải pháp quản lý, điều khiển nội dung màn hình quảng cáo, truyền tải thông tin, WiFi Marketing và quản lý tập trung từ xa.',
    taglineEn:
      'Solutions to manage and control advertising content, broadcast information, WiFi Marketing and centralized remote management.',
    icon: 'sliders2',
    features: [
      'Phần mềm CMS quản lý nội dung quảng cáo',
      'Điều khiển & truyền tải thông tin từ xa',
      'WiFi Marketing tại điểm bán',
      'Quản lý tập trung nhiều màn hình',
    ],
    featuresEn: [
      'CMS for advertising content',
      'Remote control & information broadcast',
      'In-store WiFi Marketing',
      'Centralized multi-screen management',
    ],
    to: '/giai-phap/digital-signage',
  },
  {
    slug: 'bao-tri-bao-hanh',
    title: 'Bảo trì, Bảo hành & Sửa chữa',
    titleEn: 'Maintenance, warranty & repair',
    tagline:
      'Dịch vụ bảo trì, bảo hành, mở rộng bảo hành và sửa chữa trực tiếp cho các thiết bị, hệ thống màn hình hiển thị.',
    taglineEn:
      'Maintenance, warranty, extended warranty and on-site repair services for display devices and systems.',
    icon: 'tools',
    features: [
      'Bảo trì định kỳ, kiểm tra hệ thống',
      'Bảo hành & mở rộng bảo hành',
      'Sửa chữa trực tiếp tại hiện trường',
      'Hỗ trợ kỹ thuật phản hồi nhanh',
    ],
    featuresEn: [
      'Periodic maintenance & system checks',
      'Warranty & extended warranty',
      'On-site repair',
      'Fast technical support',
    ],
    to: '/lien-he',
  },
  {
    slug: 'tu-dong-hoa',
    title: 'Tự động hóa & Hệ thống công nghệ',
    titleEn: 'Automation & technology systems',
    tagline:
      'Giải pháp công nghệ tự động hóa cho hệ thống điện, mạng, camera giám sát và nhà máy – nhà xưởng.',
    taglineEn:
      'Automation technology solutions for electrical, network, surveillance camera and factory systems.',
    icon: 'cpu',
    features: [
      'Tự động hóa hệ thống điện',
      'Hạ tầng mạng & truyền dẫn',
      'Camera giám sát thông minh',
      'Tự động hóa nhà máy – nhà xưởng',
    ],
    featuresEn: [
      'Electrical system automation',
      'Network & transmission infrastructure',
      'Smart surveillance cameras',
      'Factory & warehouse automation',
    ],
    to: '/giai-phap',
  },
];

export const COMPANY_STATS = [
  { value: 500, suffix: '+', label: 'Dự án triển khai', labelEn: 'Projects delivered' },
  { value: 12, suffix: '+', label: 'Năm kinh nghiệm', labelEn: 'Years of experience' },
  { value: 63, suffix: '', label: 'Tỉnh thành phủ sóng', labelEn: 'Provinces covered' },
  { value: 98, suffix: '%', label: 'Khách hàng hài lòng', labelEn: 'Customer satisfaction' },
];

export const FOOTER_LINKS = [
  {
    title: 'Giải pháp',
    links: [
      { label: 'Màn hình LED trong nhà', labelEn: 'Indoor LED Display', to: '/giai-phap/indoor-led-display' },
      { label: 'Màn hình LED ngoài trời', labelEn: 'Outdoor LED Display', to: '/giai-phap/outdoor-led-display' },
      { label: 'Smart City', labelEn: 'Smart City', to: '/giai-phap/smart-city' },
      { label: 'Camera AI', labelEn: 'AI Camera', to: '/giai-phap/ai-camera' },
      { label: 'Nền tảng IoT', labelEn: 'IoT Platform', to: '/giai-phap/iot-platform' },
    ],
  },
  {
    title: 'Sản phẩm',
    links: [
      { label: 'LED Module', labelEn: 'LED Module', to: '/san-pham?category=led-module' },
      { label: 'LED ngoài trời', labelEn: 'Outdoor LED', to: '/san-pham?category=outdoor-led-module' },
      { label: 'Thiết bị bệnh viện', labelEn: 'Hospital Equipment', to: '/san-pham?category=hospital-equipment' },
      { label: 'Thiết bị giáo dục', labelEn: 'Education Equipment', to: '/san-pham?category=education-equipment' },
      { label: 'Thiết bị công nghệ', labelEn: 'Technology Equipment', to: '/san-pham?category=technology-equipment' },
    ],
  },
  {
    title: 'Công ty',
    links: [
      { label: 'Về chúng tôi', labelEn: 'About us', to: '/gioi-thieu' },
      { label: 'Dự án tiêu biểu', labelEn: 'Featured Projects', to: '/du-an' },
      { label: 'Liên hệ', labelEn: 'Contact', to: '/lien-he' },
    ],
  },
] as const;
