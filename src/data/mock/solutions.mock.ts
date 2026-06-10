import type { Solution, SolutionSlug, ProductCategorySlug } from '@/domain/entities';
import { PRODUCTS } from './products.mock';
import { PROJECTS } from './projects.mock';

const img = (i: number) => {
  const list = PRODUCTS.filter((p) => p.image);
  return list.length ? list[i % list.length].image : '';
};
const projForCat = (n: number) => PROJECTS.slice(n, n + 3).map((p) => p.id);

interface Def {
  slug: SolutionSlug;
  name: string;
  nameEn: string;
  tagline: string;
  taglineEn: string;
  icon: string;
  intro: string;
  introEn: string;
  benefits: string[];
  benefitsEn: string[];
  features: { title: string; titleEn: string; description: string; descriptionEn: string; icon: string }[];
  arch: string[];
  archEn: string[];
  stack: string[];
  cats: ProductCategorySlug[];
}

const DEFS: Def[] = [
  {
    slug: 'indoor-led-display', name: 'Màn hình LED trong nhà', nameEn: 'Indoor LED Display', icon: 'display',
    tagline: 'Hình ảnh sắc nét, mịn màng cho mọi không gian nội thất.', taglineEn: 'Sharp, smooth images for any indoor space.',
    intro: 'Giải pháp màn hình LED trong nhà của AIO mang đến độ phân giải cao, màu sắc trung thực và độ bền vượt trội cho hội trường, sảnh doanh nghiệp, studio và trung tâm điều hành.',
    introEn: 'AIO\'s indoor LED display solution delivers high resolution, true colors, and outstanding durability for auditoriums, corporate lobbies, studios, and control centers.',
    benefits: ['Độ phân giải cao P1.25 - P2.5', 'Màu sắc trung thực, đồng đều', 'Vận hành 24/7 ổn định', 'Bảo hành dài hạn, hỗ trợ tận nơi'],
    benefitsEn: ['High resolution P1.25 - P2.5', 'True, uniform colors', 'Stable 24/7 operation', 'Long-term warranty, on-site support'],
    features: [
      { title: 'Pixel pitch mịn', titleEn: 'Fine pixel pitch', description: 'Đa dạng từ P1.25 đến P2.5 phù hợp khoảng cách xem gần.', descriptionEn: 'Ranging from P1.25 to P2.5 suitable for close viewing distances.', icon: 'grid-3x3-gap' },
      { title: 'Calibration tự động', titleEn: 'Auto calibration', description: 'Hiệu chỉnh màu và độ sáng đồng nhất toàn màn hình.', descriptionEn: 'Uniform color and brightness calibration across the screen.', icon: 'sliders' },
      { title: 'Bảo trì mặt trước', titleEn: 'Front maintenance', description: 'Thay thế module nhanh chóng, tiết kiệm không gian.', descriptionEn: 'Quick module replacement, saving space.', icon: 'tools' },
    ],
    arch: ['Nguồn nội dung (PC/Media)', 'Video Processor', 'Bộ điều khiển gửi/nhận', 'Cabinet & Module LED'],
    archEn: ['Content source (PC/Media)', 'Video Processor', 'Sending/Receiving controller', 'LED Cabinet & Module'],
    stack: ['Nova Star', 'Kystar', 'Common Cathode', 'HDR10'],
    cats: ['indoor-led-module', 'led-module', 'led-cabinet'],
  },
  {
    slug: 'outdoor-led-display', name: 'Màn hình LED ngoài trời', nameEn: 'Outdoor LED Display', icon: 'brightness-high',
    tagline: 'Độ sáng cao, chống chịu mọi điều kiện thời tiết.', taglineEn: 'High brightness, withstands all weather conditions.',
    intro: 'Màn hình LED ngoài trời AIO đạt chuẩn IP65, độ sáng đến 8000 nits, lý tưởng cho biển quảng cáo, mặt tiền tòa nhà và sân vận động.',
    introEn: 'AIO outdoor LED displays achieve IP65 standard, brightness up to 8000 nits, ideal for billboards, building facades, and stadiums.',
    benefits: ['Chuẩn chống nước IP65', 'Độ sáng đến 8000 nits', 'Khung nhôm đúc bền bỉ', 'Tiết kiệm điện năng'],
    benefitsEn: ['IP65 waterproof standard', 'Brightness up to 8000 nits', 'Durable die-cast aluminum frame', 'Energy saving'],
    features: [
      { title: 'Chống nước IP65', titleEn: 'IP65 waterproof', description: 'Hoạt động bền bỉ dưới mưa nắng khắc nghiệt.', descriptionEn: 'Durable operation under extreme rain and sun.', icon: 'cloud-rain' },
      { title: 'Độ sáng cao', titleEn: 'High brightness', description: 'Hiển thị rõ nét ngay cả dưới ánh nắng trực tiếp.', descriptionEn: 'Clear display even under direct sunlight.', icon: 'brightness-high' },
      { title: 'Cảm biến độ sáng', titleEn: 'Brightness sensor', description: 'Tự động điều chỉnh theo môi trường, tiết kiệm điện.', descriptionEn: 'Auto adjusts to environment, saves energy.', icon: 'speedometer2' },
    ],
    arch: ['Trung tâm nội dung', 'Cloud quản lý từ xa', 'Bộ điều khiển ngoài trời', 'Cabinet LED IP65'],
    archEn: ['Content center', 'Remote cloud management', 'Outdoor controller', 'IP65 LED Cabinet'],
    stack: ['Nova Star', 'IP65', 'Die-casting', '5G'],
    cats: ['outdoor-led-module', 'led-cabinet'],
  },
  {
    slug: 'control-room-led', name: 'Màn hình LED phòng điều hành', nameEn: 'Control Room LED Display', icon: 'columns-gap',
    tagline: 'Trung tâm giám sát vận hành liên tục 24/7.', taglineEn: '24/7 continuous operation monitoring center.',
    intro: 'Giải pháp tường LED cho trung tâm điều hành (NOC/SOC) với khả năng hiển thị đa nguồn, dự phòng kép và vận hành liên tục.',
    introEn: 'LED wall solution for operation centers (NOC/SOC) with multi-source display, dual backup, and continuous operation.',
    benefits: ['Hiển thị đa nguồn tín hiệu', 'Dự phòng nguồn & nhận kép', 'Mối ghép mịn không viền', 'Quản lý tập trung'],
    benefitsEn: ['Multi-source signal display', 'Dual power & receiving backup', 'Seamless borderless joints', 'Centralized management'],
    features: [
      { title: 'Đa cửa sổ', titleEn: 'Multi-window', description: 'Hiển thị nhiều nguồn tín hiệu cùng lúc, tùy biến layout.', descriptionEn: 'Display multiple signals simultaneously, custom layout.', icon: 'grid-1x2' },
      { title: 'Failover kép', titleEn: 'Dual failover', description: 'Nguồn và card nhận dự phòng đảm bảo không gián đoạn.', descriptionEn: 'Backup power and receiving cards ensure no interruption.', icon: 'shield-check' },
      { title: 'Điều khiển KVM', titleEn: 'KVM control', description: 'Quản lý và chuyển đổi tín hiệu linh hoạt.', descriptionEn: 'Flexible signal management and switching.', icon: 'keyboard' },
    ],
    arch: ['Nguồn tín hiệu đa dạng', 'Processor / Controller', 'Wall management', 'Fine-pitch LED Wall'],
    archEn: ['Diverse signal sources', 'Processor / Controller', 'Wall management', 'Fine-pitch LED Wall'],
    stack: ['Fine Pitch', 'KVM', 'Failover dự phòng kép', 'Calibration tự động'],
    cats: ['indoor-led-module', 'technology-equipment'],
  },
  {
    slug: 'smart-meeting-room', name: 'Phòng họp thông minh', nameEn: 'Smart Meeting Room', icon: 'easel',
    tagline: 'Họp trực tuyến, trình chiếu và cộng tác liền mạch.', taglineEn: 'Seamless online meetings, presentation, and collaboration.',
    intro: 'Trang bị màn hình tương tác, thiết bị hội nghị và hệ thống âm thanh cho phòng họp hiện đại, hỗ trợ làm việc kết hợp.',
    introEn: 'Equip interactive displays, conference devices, and audio systems for modern meeting rooms, supporting hybrid work.',
    benefits: ['Hội nghị truyền hình chất lượng cao', 'Chia sẻ màn hình không dây', 'Âm thanh khử ồn', 'Đặt phòng thông minh'],
    benefitsEn: ['High-quality video conferencing', 'Wireless screen sharing', 'Noise-canceling audio', 'Smart room booking'],
    features: [
      { title: 'Camera hội nghị', titleEn: 'Conference camera', description: 'Khung hình tự động bám người nói.', descriptionEn: 'Auto framing tracking the speaker.', icon: 'camera-video' },
      { title: 'Trình chiếu không dây', titleEn: 'Wireless presentation', description: 'Chia sẻ nội dung từ mọi thiết bị.', descriptionEn: 'Share content from any device.', icon: 'cast' },
      { title: 'Màn hình tương tác', titleEn: 'Interactive display', description: 'Ghi chú, vẽ và cộng tác trực tiếp.', descriptionEn: 'Direct note-taking, drawing, and collaboration.', icon: 'pencil-square' },
    ],
    arch: ['Thiết bị người dùng', 'Hệ thống AV trung tâm', 'Nền tảng hội nghị', 'Màn hình tương tác'],
    archEn: ['User devices', 'Central AV system', 'Conference platform', 'Interactive display'],
    stack: ['Jabra', 'Cloud Native', 'AI Analytics', 'Wireless'],
    cats: ['education-equipment', 'audio-equipment', 'technology-equipment'],
  },
  {
    slug: 'smart-classroom', name: 'Lớp học thông minh', nameEn: 'Smart Classroom', icon: 'mortarboard',
    tagline: 'Nâng tầm trải nghiệm dạy và học tương tác.', taglineEn: 'Elevating interactive teaching and learning experiences.',
    intro: 'Giải pháp lớp học thông minh với màn hình tương tác, bảng thông minh, hệ thống âm thanh và phần mềm quản lý giảng dạy.',
    introEn: 'Smart classroom solution with interactive displays, smart boards, audio systems, and teaching management software.',
    benefits: ['Bài giảng tương tác sinh động', 'Quản lý lớp học tập trung', 'Tích hợp học liệu số', 'Dễ sử dụng cho giáo viên'],
    benefitsEn: ['Lively interactive lessons', 'Centralized classroom management', 'Digital learning material integration', 'Easy for teachers to use'],
    features: [
      { title: 'Màn hình tương tác 4K', titleEn: '4K Interactive Display', description: '20 điểm chạm, độ phân giải 4K mượt mà.', descriptionEn: '20 touch points, smooth 4K resolution.', icon: 'tv' },
      { title: 'Phần mềm giảng dạy', titleEn: 'Teaching Software', description: 'Soạn và trình bày bài giảng tương tác.', descriptionEn: 'Prepare and present interactive lessons.', icon: 'book' },
      { title: 'Âm thanh lớp học', titleEn: 'Classroom Audio', description: 'Giọng nói rõ ràng tới mọi vị trí.', descriptionEn: 'Clear voice reaching every corner.', icon: 'volume-up' },
    ],
    arch: ['Học liệu số', 'Màn hình tương tác', 'Hệ thống âm thanh', 'Quản lý lớp học'],
    archEn: ['Digital learning materials', 'Interactive display', 'Audio system', 'Classroom management'],
    stack: ['Android 13', 'OPS Windows', 'Deep Learning', 'Cloud'],
    cats: ['education-equipment', 'audio-equipment'],
  },
  {
    slug: 'smart-hospital', name: 'Bệnh viện thông minh', nameEn: 'Smart Hospital', icon: 'heart-pulse',
    tagline: 'Số hóa quy trình chăm sóc và vận hành y tế.', taglineEn: 'Digitizing healthcare and operation processes.',
    intro: 'Hệ thống gọi y tá, kiosk lấy số, màn hình xếp hàng và thiết bị thông minh giúp bệnh viện vận hành hiệu quả, nâng cao trải nghiệm bệnh nhân.',
    introEn: 'Nurse call systems, queue kiosks, display screens, and smart devices help hospitals operate efficiently, improving patient experience.',
    benefits: ['Gọi y tá nhanh chóng, chính xác', 'Giảm thời gian chờ', 'Quản lý tập trung', 'Tuân thủ tiêu chuẩn y tế'],
    benefitsEn: ['Fast, accurate nurse call', 'Reduced wait time', 'Centralized management', 'Medical standard compliance'],
    features: [
      { title: 'Hệ thống gọi y tá', titleEn: 'Nurse Call System', description: 'Liên lạc tức thời giữa bệnh nhân và điều dưỡng.', descriptionEn: 'Instant communication between patients and nurses.', icon: 'bell' },
      { title: 'Kiosk & xếp hàng', titleEn: 'Kiosk & Queue', description: 'Lấy số tự động, hiển thị thứ tự thông minh.', descriptionEn: 'Auto ticketing, smart queue display.', icon: 'ticket-perforated' },
      { title: 'Tích hợp HIS', titleEn: 'HIS Integration', description: 'Kết nối hệ thống thông tin bệnh viện.', descriptionEn: 'Connect to Hospital Information System.', icon: 'database' },
    ],
    arch: ['Thiết bị đầu giường', 'Bộ quản lý phòng', 'Máy chủ trung tâm', 'Trạm điều dưỡng'],
    archEn: ['Bedside devices', 'Room manager', 'Central server', 'Nursing station'],
    stack: ['TCP/IP', 'ISO 13485', 'IoT', 'Edge Computing'],
    cats: ['hospital-equipment', 'technology-equipment'],
  },
  {
    slug: 'smart-city', name: 'Đô thị thông minh', nameEn: 'Smart City', icon: 'buildings',
    tagline: 'Nền tảng dữ liệu đô thị tập trung, kết nối toàn diện.', taglineEn: 'Centralized urban data platform, comprehensive connectivity.',
    intro: 'AIO xây dựng nền tảng Smart City tích hợp camera AI, cảm biến IoT, bảng thông tin và trung tâm điều hành thông minh (IOC).',
    introEn: 'AIO builds a Smart City platform integrating AI cameras, IoT sensors, information boards, and intelligent operation centers (IOC).',
    benefits: ['Giám sát giao thông thông minh', 'Cảnh báo sớm sự cố', 'Dữ liệu tập trung IOC', 'Mở rộng linh hoạt'],
    benefitsEn: ['Smart traffic monitoring', 'Early incident warning', 'Centralized IOC data', 'Flexible expansion'],
    features: [
      { title: 'Camera AI', titleEn: 'AI Camera', description: 'Nhận diện biển số, đám đông, sự cố giao thông.', descriptionEn: 'License plate, crowd, and traffic incident recognition.', icon: 'camera-video' },
      { title: 'Nền tảng IoT', titleEn: 'IoT Platform', description: 'Thu thập dữ liệu cảm biến môi trường, năng lượng.', descriptionEn: 'Collect data from environment and energy sensors.', icon: 'broadcast' },
      { title: 'Trung tâm IOC', titleEn: 'IOC Center', description: 'Bảng điều khiển điều hành đô thị tập trung.', descriptionEn: 'Centralized urban operation dashboard.', icon: 'columns-gap' },
    ],
    arch: ['Cảm biến & Camera', 'Mạng truyền dẫn', 'Nền tảng dữ liệu', 'Trung tâm điều hành IOC'],
    archEn: ['Sensors & Cameras', 'Transmission network', 'Data platform', 'IOC Operation Center'],
    stack: ['Computer Vision', 'LoRaWAN', 'MQTT', 'Digital Twin'],
    cats: ['technology-equipment', 'outdoor-led-module'],
  },
  {
    slug: 'ai-camera', name: 'Camera AI', nameEn: 'AI Camera', icon: 'camera-video',
    tagline: 'Phân tích hình ảnh thông minh theo thời gian thực.', taglineEn: 'Real-time intelligent image analysis.',
    intro: 'Giải pháp camera AI ứng dụng thị giác máy tính cho an ninh, giao thông và bán lẻ với khả năng phân tích tại biên (edge).',
    introEn: 'AI camera solutions applying computer vision for security, traffic, and retail with edge analytics capabilities.',
    benefits: ['Nhận diện khuôn mặt & biển số', 'Phân tích hành vi đám đông', 'Cảnh báo tức thời', 'Tích hợp dễ dàng'],
    benefitsEn: ['Face & license plate recognition', 'Crowd behavior analysis', 'Instant alerts', 'Easy integration'],
    features: [
      { title: 'Edge AI', titleEn: 'Edge AI', description: 'Xử lý phân tích ngay trên thiết bị, độ trễ thấp.', descriptionEn: 'On-device analytics processing, low latency.', icon: 'cpu' },
      { title: 'Nhận diện đối tượng', titleEn: 'Object Recognition', description: 'Người, phương tiện, biển số, sự kiện bất thường.', descriptionEn: 'People, vehicles, plates, abnormal events.', icon: 'person-bounding-box' },
      { title: 'Báo cáo thông minh', titleEn: 'Smart Reporting', description: 'Thống kê, heatmap và cảnh báo tự động.', descriptionEn: 'Statistics, heatmaps, and automatic alerts.', icon: 'bar-chart' },
    ],
    arch: ['Camera AI', 'Edge Server', 'Nền tảng phân tích', 'Dashboard cảnh báo'],
    archEn: ['AI Camera', 'Edge Server', 'Analytics Platform', 'Alert Dashboard'],
    stack: ['NVIDIA Jetson', 'Computer Vision', 'Deep Learning', 'Edge Computing'],
    cats: ['technology-equipment'],
  },
  {
    slug: 'iot-platform', name: 'Nền tảng IoT', nameEn: 'IoT Platform', icon: 'diagram-3',
    tagline: 'Kết nối, giám sát và điều khiển vạn vật.', taglineEn: 'Connect, monitor, and control everything.',
    intro: 'Nền tảng IoT của AIO thu thập dữ liệu từ hàng nghìn cảm biến, trực quan hóa và tự động hóa vận hành cho nhà máy và tòa nhà thông minh.',
    introEn: 'AIO\'s IoT platform collects data from thousands of sensors, visualizes, and automates operations for smart factories and buildings.',
    benefits: ['Kết nối đa giao thức', 'Giám sát thời gian thực', 'Tự động hóa luật điều khiển', 'Khả năng mở rộng cao'],
    benefitsEn: ['Multi-protocol connectivity', 'Real-time monitoring', 'Control rule automation', 'High scalability'],
    features: [
      { title: 'Đa giao thức', titleEn: 'Multi-protocol', description: 'MQTT, LoRaWAN, Modbus, BACnet.', descriptionEn: 'MQTT, LoRaWAN, Modbus, BACnet.', icon: 'diagram-2' },
      { title: 'Dashboard thời gian thực', titleEn: 'Real-time Dashboard', description: 'Trực quan hóa dữ liệu cảm biến tức thì.', descriptionEn: 'Instant sensor data visualization.', icon: 'activity' },
      { title: 'Quy tắc tự động', titleEn: 'Auto Rules', description: 'Thiết lập kịch bản điều khiển thông minh.', descriptionEn: 'Set up smart control scenarios.', icon: 'gear-wide-connected' },
    ],
    arch: ['Cảm biến & Gateway', 'Message Broker', 'Nền tảng IoT', 'Ứng dụng & Dashboard'],
    archEn: ['Sensors & Gateways', 'Message Broker', 'IoT Platform', 'Apps & Dashboard'],
    stack: ['MQTT', 'LoRaWAN', 'Cloud Native', 'Digital Twin'],
    cats: ['technology-equipment'],
  },
  {
    slug: 'digital-signage', name: 'Digital Signage', nameEn: 'Digital Signage', icon: 'tv',
    tagline: 'Truyền thông số tại điểm bán, quản lý tập trung.', taglineEn: 'In-store digital media, centralized management.',
    intro: 'Giải pháp biển hiệu số (digital signage) cho chuỗi bán lẻ, ngân hàng và doanh nghiệp với phần mềm quản lý nội dung từ xa.',
    introEn: 'Digital signage solutions for retail chains, banks, and enterprises with remote content management software.',
    benefits: ['Quản lý nội dung tập trung', 'Lên lịch phát tự động', 'Đa điểm, đa màn hình', 'Phân tích hiệu quả hiển thị'],
    benefitsEn: ['Centralized content management', 'Automated scheduling', 'Multi-point, multi-screen', 'Display effectiveness analysis'],
    features: [
      { title: 'CMS đám mây', titleEn: 'Cloud CMS', description: 'Quản lý và cập nhật nội dung từ xa.', descriptionEn: 'Remote content management and updates.', icon: 'cloud' },
      { title: 'Lên lịch phát', titleEn: 'Scheduling', description: 'Tự động phát nội dung theo khung giờ.', descriptionEn: 'Auto play content by time slots.', icon: 'calendar-event' },
      { title: 'Đa nền tảng', titleEn: 'Multi-platform', description: 'Màn hình LCD, LED, chân đứng quảng cáo.', descriptionEn: 'LCD screens, LED, standing displays.', icon: 'phone' },
    ],
    arch: ['CMS đám mây', 'Player thiết bị', 'Màn hình hiển thị', 'Báo cáo & phân tích'],
    archEn: ['Cloud CMS', 'Device Player', 'Display Screen', 'Reporting & Analysis'],
    stack: ['Cloud Native', 'Android', 'AI Analytics', '4K UHD'],
    cats: ['technology-equipment', 'indoor-led-module'],
  },
];

export const SOLUTIONS: Solution[] = DEFS.map((d, i) => ({
  id: d.slug,
  slug: d.slug,
  name: d.name,
  nameEn: d.nameEn,
  tagline: d.tagline,
  taglineEn: d.taglineEn,
  heroImage: img(i * 5),
  introduction: d.intro,
  introductionEn: d.introEn,
  benefits: d.benefits,
  benefitsEn: d.benefitsEn,
  features: d.features.map(f => ({
    title: f.title,
    titleEn: f.titleEn,
    description: f.description,
    descriptionEn: f.descriptionEn,
    icon: f.icon,
  })),
  architecture: { title: 'Kiến trúc hệ thống', titleEn: 'System Architecture', steps: d.arch, stepsEn: d.archEn },
  techStack: d.stack,
  relatedProductCategories: d.cats,
  relatedProjectIds: projForCat(i),
  icon: d.icon,
  seo: {
    title: `${d.name} | Giải pháp AIO`,
    description: d.tagline,
    keywords: [d.name, ...d.stack],
  },
}));
