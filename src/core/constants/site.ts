/** Company + site-wide constants (single source of truth). */

export const COMPANY = {
  legalName: 'CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ SỐ AIO',
  legalNameEn: 'AIO DIGITAL TECHNOLOGY SOLUTIONS JOINT STOCK COMPANY',
  shortName: 'AIO Digital Solutions',
  brand: 'AIO LED',
  domain: 'https://aioled.vn',
  taxCode: '1001326140',
  director: 'Nguyễn Thị Doan',
  address:
    'Số nhà 05, Ngõ 198, Đường Lý Thường Kiệt, Tổ 7 - Kỳ Bá, Phường Trần Lãm, Tỉnh Hưng Yên, Việt Nam',
  addressEn:
    'No. 05, Lane 198, Ly Thuong Kiet Street, Group 7 - Ky Ba, Tran Lam Ward, Hung Yen Province, Vietnam',
  email: 'AIOgroup.led@gmail.com',
  hotline: '038 4204555',
  zalo: 'https://zalo.me/0384204555',
  workingHours: 'Thứ 2 - Chủ Nhật: 24/7 Kỹ thuật hỗ trợ',
  workingHoursEn: 'Mon - Sun: 24/7 Technical Support',
  slogan: 'Tổng thầu Giải pháp Màn hình LED & Tự động hóa Toàn diện',
  sloganEn: 'Turnkey LED Display & Automation Solutions Contractor',
  foundedYear: 2025,
} as const;

export interface NavItem {
  label: string;
  to: string;
}

export const MAIN_NAV: NavItem[] = [
  { label: 'Trang chủ', to: '/' },
  { label: 'Giải pháp', to: '/giai-phap' },
  { label: 'Sản phẩm', to: '/san-pham' },
  { label: 'Dự án', to: '/du-an' },
  { label: 'Giới thiệu', to: '/gioi-thieu' },
];

export interface BusinessArea {
  slug: string;
  pillar: string;
  title: string;
  titleEn: string;
  tagline: string;
  taglineEn: string;
  icon: string;
  features: string[];
  featuresEn: string[];
  highlights: string[];
  highlightsEn: string[];
  to: string;
}

/** 4 mảng kinh doanh & dịch vụ cốt lõi của AIO. */
export const BUSINESS_AREAS: BusinessArea[] = [
  {
    slug: 'thi-cong-lap-dat-man-hinh-led-lcd',
    pillar: 'MẢNG 1',
    title: 'Thi công & Lắp đặt Màn hình LED, LCD ghép, Standee',
    titleEn: 'LED Display, LCD Video Wall & Standee Installation',
    tagline:
      'Cung cấp và thi công trọn gói màn hình LED trong nhà/ngoài trời, màn hình LED trong suốt, màn hình ghép LCD viền siêu mỏng và Standee quảng cáo cảm ứng.',
    taglineEn:
      'Turnkey delivery and installation of Indoor/Outdoor LED screens, Transparent LED, Ultra-narrow bezel LCD Video Walls and Interactive Standees.',
    icon: 'display',
    features: [
      'LED Trong Nhà (P0.9 - P2.5) quét 3840Hz, chuẩn DCI-P3',
      'LED Ngoài Trời (P3 - P10) chống nước IP65/IP66, 6000-8000 nits',
      'Màn hình LED trong suốt 70-85% cho vách kính showroom',
      'Màn hình ghép LCD LG/Samsung 55" viền siêu mỏng 0.88mm/1.74mm',
      'Standee quảng cáo & Tra cứu cảm ứng 43", 55", 65"',
      'Linh kiện chính hãng NovaStar (Taurus, Armor), Meanwell, Processor 4K',
    ],
    featuresEn: [
      'Indoor LED (P0.9 - P2.5) 3840Hz refresh rate, DCI-P3 color gamut',
      'Outdoor LED (P3 - P10) IP65/IP66 waterproof, 6000-8000 nits',
      'Transparent LED (70-85% transparency) for showroom glass walls',
      'LCD Video Wall 55" ultra-thin bezel 0.88mm/1.74mm (LG/Samsung)',
      'Digital Standee & Interactive Touch Displays (43", 55", 65")',
      'Genuine NovaStar, Meanwell power supplies & 4K Processors',
    ],
    highlights: ['Cabinet nhôm đúc định hình', 'Độ tương phản 5000:1', 'Bảo hành 24-36 tháng'],
    highlightsEn: ['Die-cast Aluminum Cabinet', '5000:1 High Contrast', '24-36M Warranty'],
    to: '/giai-phap',
  },
  {
    slug: 'quan-ly-tap-trung-wifi-marketing',
    pillar: 'MẢNG 2',
    title: 'Quản lý tập trung, Điều khiển từ xa & WiFi Marketing',
    titleEn: 'Centralized CMS, Remote Control & WiFi Marketing',
    tagline:
      'Nền tảng Cloud Signage quản lý đồng bộ hàng trăm màn hình qua Internet, phân phối nội dung đa vùng và tích hợp cổng WiFi Marketing thu thập dữ liệu khách hàng.',
    taglineEn:
      'Cloud Signage platform managing hundreds of screens synchronously via Internet, multi-window layout broadcasting and smart WiFi Marketing portal.',
    icon: 'sliders2',
    features: [
      'Phần mềm CMS Cloud Signage lên lịch phát sóng tự động',
      'Chia vùng hiển thị đa cửa sổ (Video, Banner, Ticker, Web)',
      'WiFi Marketing đăng nhập thương hiệu & khảo sát khách hàng',
      'Giám sát trạng thái nguồn, nhiệt độ, bật/tắt từ xa qua App & Web',
      'Cảnh báo sự cố thời gian thực qua SMS / Telegram / Email',
      'Đồng bộ tức thì nội dung toàn chuỗi cửa hàng chỉ bằng 1 cú nhấp',
    ],
    featuresEn: [
      'Cloud Signage CMS with automated broadcast scheduling',
      'Multi-window display division (Video, Banner, Live Ticker, Web)',
      'Smart WiFi Marketing portal with brand splash & survey data collection',
      'Real-time remote monitoring of power, temperature & on/off state',
      'Instant incident alerts via SMS, Telegram and Email',
      'Instant nationwide multi-branch synchronization in 1 click',
    ],
    highlights: ['Cloud Server 99.9% Uptime', 'Bảo mật SSL 256-bit', 'App iOS / Android'],
    highlightsEn: ['99.9% Cloud Uptime', 'SSL 256-bit Security', 'iOS / Android App'],
    to: '/giai-phap',
  },
  {
    slug: 'bao-tri-sua-chua-sla-mo-rong',
    pillar: 'MẢNG 3',
    title: 'Bảo trì, Bảo hành mở rộng & Sửa chữa trực tiếp',
    titleEn: '24/7 SLA Maintenance, Extended Warranty & On-site Repair',
    tagline:
      'Dịch vụ cứu hộ màn hình khẩn cấp trong 2h-4h, bảo dưỡng định kỳ làm sạch công nghiệp, cân chỉnh màu sắc & cung cấp thiết bị dự phòng thay thế ngay lập tức.',
    taglineEn:
      '2h-4h emergency display repair response, periodic industrial maintenance, color calibration and instant standby backup unit replacement.',
    icon: 'tools',
    features: [
      'Sửa chữa khẩn cấp tại chỗ: Thay IC driver, hàn điểm chết LED, đổi card/nguồn',
      'Thời gian phản hồi kỹ thuật nhanh chóng từ 2h - 4h',
      'Gói bảo dưỡng định kỳ (SLA): Vệ sinh bụi công nghiệp, kiểm tra tản nhiệt & chống sét',
      'Cân chỉnh màu sắc & độ sáng chuyên sâu (Screen Calibration)',
      'Gói mở rộng bảo hành (Extended Warranty) lên tới 5 năm',
      'Cung cấp thiết bị dự phòng chạy song song, không gián đoạn hoạt động',
    ],
    featuresEn: [
      'On-site emergency repair: IC replacement, dead pixel rework, card/PSU swaps',
      'Fast 2h - 4h SLA on-site technical response time',
      'Periodic SLA maintenance: industrial dust cleaning, cooling & lightning protection checks',
      'Deep optical color and brightness screen calibration',
      'Extended Warranty packages up to 5 years coverage',
      'Standby backup equipment pool to prevent any operational downtime',
    ],
    highlights: ['SLA 2h - 4h tại chỗ', 'Linh kiện thay thế sẵn kho', 'Hỗ trợ 24/7/365'],
    highlightsEn: ['2h - 4h On-site SLA', 'In-stock Spare Parts', '24/7/365 Support'],
    to: '/lien-he',
  },
  {
    slug: 'tu-dong-hoa-dien-mang-camera-nha-xuong',
    pillar: 'MẢNG 4',
    title: 'Tự động hóa & Hạ tầng công nghệ (Điện, Mạng, Camera, Nhà xưởng)',
    titleEn: 'Industrial Automation & Tech Infrastructure (Power, Network, AI Camera, Smart Factory)',
    tagline:
      'Tích hợp tủ điện PLC lập trình thông minh, hệ thống cáp quang mạng lõi Switch PoE, Camera AI giám sát an ninh và màn hình hiển thị Andon tiến độ sản xuất nhà xưởng.',
    taglineEn:
      'Turnkey integration of smart PLC power cabinets, core fiber network PoE switches, AI surveillance cameras and industrial Andon factory display systems.',
    icon: 'cpu',
    features: [
      'Tự động hóa điện & chiếu sáng: Tủ điện PLC, hẹn giờ thông minh, chống quá tải',
      'Hạ tầng mạng & truyền dẫn cáp quang tốc độ cao, Switch PoE chịu tải nặng',
      'Camera AI an ninh: Nhận diện khuôn mặt, cảnh báo xâm nhập khu vực cấm',
      'Giám sát an toàn lao động (PPE Detection: Mũ bảo hộ, áo phản quang)',
      'Hệ thống hiển thị Andon LED nhà máy: Theo dõi năng suất & cảnh báo lỗi chuyền tức thì',
      'Tích hợp phần mềm điều khiển trung tâm BMS / SCADA nhà xưởng',
    ],
    featuresEn: [
      'Electrical & lighting automation: PLC cabinets, smart timer, overload protection',
      'High-speed core fiber network infrastructure & enterprise PoE switches',
      'AI security cameras: Face recognition, perimeter intrusion alerts',
      'Safety compliance monitoring (PPE detection: helmets, vests, safety zones)',
      'Factory Andon LED display system: Real-time production output & line fault alerts',
      'Integrated centralized BMS / SCADA factory control dashboard',
    ],
    highlights: ['Chuẩn công nghiệp IP66', 'Camera AI nhận diện 0.2s', 'Andon Realtime'],
    highlightsEn: ['IP66 Industrial Grade', '0.2s AI Face Recognition', 'Realtime Andon'],
    to: '/giai-phap',
  },
];

export const COMPANY_STATS = [
  { value: 300, suffix: '+', label: 'Công trình hoàn thành', labelEn: 'Delivered Projects' },
  { value: 1, suffix: '+', label: 'Năm kinh nghiệm', labelEn: 'Year of Experience' },
  { value: 34, suffix: '', label: 'Tỉnh thành phục vụ', labelEn: 'Provinces Covered' },
  { value: 99.8, suffix: '%', label: 'Tỷ lệ SLA đúng hẹn', labelEn: 'On-time SLA Rate' },
];

export const QUALITY_PROCESS = [
  {
    step: '01',
    title: 'Khảo sát & Tư vấn 3D',
    titleEn: '3D Site Survey & Consultation',
    desc: 'Đo đạc vị trí thực tế, tính toán góc nhìn tối ưu, kết cấu chịu lực và lên bản vẽ mô phỏng 3D trực quan.',
    descEn: 'On-site precision measurement, optical viewing angle calculation, structural load analysis and 3D mockup.',
    icon: 'Compass',
  },
  {
    step: '02',
    title: 'Thiết kế kỹ thuật & Dự toán',
    titleEn: 'Engineering Design & Costing',
    desc: 'Thiết kế chi tiết hệ thống khung cơ khí, sơ đồ nguyên lý điện, sơ đồ cáp tín hiệu và bảng tính dự toán minh bạch.',
    descEn: 'Detailed mechanical frame design, electrical schematics, data wiring topology and transparent itemized quotation.',
    icon: 'Cpu',
  },
  {
    step: '03',
    title: 'Thi công & Lắp đặt chuẩn mực',
    titleEn: 'Precision Assembly & Mounting',
    desc: 'Lắp đặt Cabinet nhôm đúc chuẩn phẳng, đấu nối nguồn Meanwell, card NovaStar và hệ thống làm mát chống sét.',
    descEn: 'High-precision die-cast cabinet mounting, Meanwell power wiring, NovaStar controller setup and lightning surge protection.',
    icon: 'Wrench',
  },
  {
    step: '04',
    title: 'Cân chỉnh & Kiểm thử 72h (Aging Test)',
    titleEn: 'Calibration & 72h Burn-in Aging',
    desc: 'Cân chỉnh phổ màu quang học, độ đồng đều ánh sáng và chạy thử nghiệm liên tục 72h trước khi bàn giao.',
    descEn: 'Optical spectral color balancing, brightness uniformity calibration and continuous 72-hour burn-in stress test.',
    icon: 'CheckCircle2',
  },
  {
    step: '05',
    title: 'Bàn giao & Bảo trì 24/7 SLA 2h-4h',
    titleEn: 'Handover & 24/7 Fast SLA Support',
    desc: 'Đào tạo chuyển giao công nghệ, cấp tài khoản CMS Cloud và cam kết bảo hành trực tiếp tận nơi nhanh chóng.',
    descEn: 'User training, Cloud CMS provisioning and commitment to fast on-site emergency repair response within 2h-4h.',
    icon: 'ShieldCheck',
  },
];

export const FOOTER_LINKS = [
  {
    title: 'Giải pháp cốt lõi',
    titleEn: 'Core Solutions',
    links: [
      { label: 'Màn hình LED Trong Nhà', labelEn: 'Indoor LED Displays', to: '/giai-phap' },
      { label: 'Màn hình LED Ngoài Trời', labelEn: 'Outdoor LED Displays', to: '/giai-phap' },
      { label: 'Màn hình ghép LCD Video Wall', labelEn: 'LCD Video Walls', to: '/giai-phap' },
      { label: 'Màn hình LED Trong Suốt', labelEn: 'Transparent LED Displays', to: '/giai-phap' },
      { label: 'Phần mềm CMS & WiFi Marketing', labelEn: 'Cloud CMS & WiFi Marketing', to: '/giai-phap' },
      { label: 'Tự động hóa Điện & Nhà Xưởng', labelEn: 'Electrical & Factory Automation', to: '/giai-phap' },
    ],
  },
  {
    title: 'Sản phẩm nổi bật',
    titleEn: 'Featured Products',
    links: [
      { label: 'Module LED P1.25 / P1.53 / P2 / P2.5', labelEn: 'Indoor LED Modules', to: '/san-pham?category=indoor-led-module' },
      { label: 'Module LED P3 / P4 / P5 / P10 Ngoài Trời', labelEn: 'Outdoor LED Modules', to: '/san-pham?category=outdoor-led-module' },
      { label: 'Standee Quảng Cáo 43" - 65"', labelEn: 'Digital Advertising Standees', to: '/san-pham?category=technology-equipment' },
      { label: 'Bộ xử lý hình ảnh NovaStar 4K', labelEn: 'NovaStar 4K Video Processors', to: '/san-pham?category=technology-equipment' },
      { label: 'Camera AI Giám Sát An Ninh', labelEn: 'Smart AI Security Cameras', to: '/san-pham?category=technology-equipment' },
    ],
  },
  {
    title: 'Dịch vụ & Tiện ích',
    titleEn: 'Services & Tools',
    links: [
      { label: 'Bảng tính báo giá LED tự động', labelEn: 'Smart LED Calculator', to: '/bao-gia' },
      { label: 'Dịch vụ Bảo trì & Cứu hộ màn hình', labelEn: '24/7 SLA Maintenance', to: '/lien-he' },
      { label: 'Dự án tiêu biểu toàn quốc', labelEn: 'Delivered Projects', to: '/du-an' },
      { label: 'Hồ sơ năng lực AIO', labelEn: 'Company Profile', to: '/gioi-thieu' },
      { label: 'Liên hệ tư vấn 24/7', labelEn: 'Contact Support', to: '/lien-he' },
    ],
  },
] as const;

