/** Company + site-wide constants (single source of truth). */

export const COMPANY = {
  legalName: 'CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ SỐ AIO',
  shortName: 'AIO Digital Solutions',
  brand: 'AIO',
  taxCode: '1001326140',
  director: 'Nguyễn Thị Doan',
  address:
    'Số nhà 05, Ngõ 198, Đường Lý Thường Kiệt, Tổ 7 - Kỳ Bá, Phường Trần Lãm, Tỉnh Hưng Yên, Việt Nam',
  email: 'AIOgroup.led@gmail.com',
  hotline: '1900 0000',
  zalo: 'https://zalo.me/',
  workingHours: 'Thứ 2 - Thứ 7: 08:00 - 17:30',
  slogan: 'Giải pháp công nghệ số toàn diện',
  foundedYear: 2015,
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
  { label: 'Tin tức', to: '/tin-tuc' },
  { label: 'Tuyển dụng', to: '/tuyen-dung' },
  { label: 'Liên hệ', to: '/lien-he' },
];

export const COMPANY_STATS = [
  { value: 500, suffix: '+', label: 'Dự án triển khai' },
  { value: 12, suffix: '+', label: 'Năm kinh nghiệm' },
  { value: 63, suffix: '', label: 'Tỉnh thành phủ sóng' },
  { value: 98, suffix: '%', label: 'Khách hàng hài lòng' },
];

export const FOOTER_LINKS = [
  {
    title: 'Giải pháp',
    links: [
      { label: 'Màn hình LED trong nhà', to: '/giai-phap/indoor-led-display' },
      { label: 'Màn hình LED ngoài trời', to: '/giai-phap/outdoor-led-display' },
      { label: 'Smart City', to: '/giai-phap/smart-city' },
      { label: 'Camera AI', to: '/giai-phap/ai-camera' },
      { label: 'Nền tảng IoT', to: '/giai-phap/iot-platform' },
    ],
  },
  {
    title: 'Sản phẩm',
    links: [
      { label: 'LED Module', to: '/san-pham?category=led-module' },
      { label: 'LED ngoài trời', to: '/san-pham?category=outdoor-led-module' },
      { label: 'Thiết bị bệnh viện', to: '/san-pham?category=hospital-equipment' },
      { label: 'Thiết bị giáo dục', to: '/san-pham?category=education-equipment' },
      { label: 'Thiết bị công nghệ', to: '/san-pham?category=technology-equipment' },
    ],
  },
  {
    title: 'Công ty',
    links: [
      { label: 'Về chúng tôi', to: '/gioi-thieu' },
      { label: 'Dự án tiêu biểu', to: '/du-an' },
      { label: 'Tin tức', to: '/tin-tuc' },
      { label: 'Tuyển dụng', to: '/tuyen-dung' },
      { label: 'Liên hệ', to: '/lien-he' },
    ],
  },
] as const;
