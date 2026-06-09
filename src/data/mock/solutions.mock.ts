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
  tagline: string;
  icon: string;
  intro: string;
  benefits: string[];
  features: { title: string; description: string; icon: string }[];
  arch: string[];
  stack: string[];
  cats: ProductCategorySlug[];
}

const DEFS: Def[] = [
  {
    slug: 'indoor-led-display', name: 'Màn hình LED trong nhà', icon: 'display',
    tagline: 'Hình ảnh sắc nét, mịn màng cho mọi không gian nội thất.',
    intro: 'Giải pháp màn hình LED trong nhà của AIO mang đến độ phân giải cao, màu sắc trung thực và độ bền vượt trội cho hội trường, sảnh doanh nghiệp, studio và trung tâm điều hành.',
    benefits: ['Độ phân giải cao P1.25 - P2.5', 'Màu sắc trung thực, đồng đều', 'Vận hành 24/7 ổn định', 'Bảo hành dài hạn, hỗ trợ tận nơi'],
    features: [
      { title: 'Pixel pitch mịn', description: 'Đa dạng từ P1.25 đến P2.5 phù hợp khoảng cách xem gần.', icon: 'grid-3x3-gap' },
      { title: 'Calibration tự động', description: 'Hiệu chỉnh màu và độ sáng đồng nhất toàn màn hình.', icon: 'sliders' },
      { title: 'Bảo trì mặt trước', description: 'Thay thế module nhanh chóng, tiết kiệm không gian.', icon: 'tools' },
    ],
    arch: ['Nguồn nội dung (PC/Media)', 'Video Processor', 'Bộ điều khiển gửi/nhận', 'Cabinet & Module LED'],
    stack: ['Nova Star', 'Kystar', 'Common Cathode', 'HDR10'],
    cats: ['indoor-led-module', 'led-module', 'led-cabinet'],
  },
  {
    slug: 'outdoor-led-display', name: 'Màn hình LED ngoài trời', icon: 'brightness-high',
    tagline: 'Độ sáng cao, chống chịu mọi điều kiện thời tiết.',
    intro: 'Màn hình LED ngoài trời AIO đạt chuẩn IP65, độ sáng đến 8000 nits, lý tưởng cho biển quảng cáo, mặt tiền tòa nhà và sân vận động.',
    benefits: ['Chuẩn chống nước IP65', 'Độ sáng đến 8000 nits', 'Khung nhôm đúc bền bỉ', 'Tiết kiệm điện năng'],
    features: [
      { title: 'Chống nước IP65', description: 'Hoạt động bền bỉ dưới mưa nắng khắc nghiệt.', icon: 'cloud-rain' },
      { title: 'Độ sáng cao', description: 'Hiển thị rõ nét ngay cả dưới ánh nắng trực tiếp.', icon: 'brightness-high' },
      { title: 'Cảm biến độ sáng', description: 'Tự động điều chỉnh theo môi trường, tiết kiệm điện.', icon: 'speedometer2' },
    ],
    arch: ['Trung tâm nội dung', 'Cloud quản lý từ xa', 'Bộ điều khiển ngoài trời', 'Cabinet LED IP65'],
    stack: ['Nova Star', 'IP65', 'Die-casting', '5G'],
    cats: ['outdoor-led-module', 'led-cabinet'],
  },
  {
    slug: 'control-room-led', name: 'Màn hình LED phòng điều hành', icon: 'columns-gap',
    tagline: 'Trung tâm giám sát vận hành liên tục 24/7.',
    intro: 'Giải pháp tường LED cho trung tâm điều hành (NOC/SOC) với khả năng hiển thị đa nguồn, dự phòng kép và vận hành liên tục.',
    benefits: ['Hiển thị đa nguồn tín hiệu', 'Dự phòng nguồn & nhận kép', 'Mối ghép mịn không viền', 'Quản lý tập trung'],
    features: [
      { title: 'Đa cửa sổ', description: 'Hiển thị nhiều nguồn tín hiệu cùng lúc, tùy biến layout.', icon: 'grid-1x2' },
      { title: 'Failover kép', description: 'Nguồn và card nhận dự phòng đảm bảo không gián đoạn.', icon: 'shield-check' },
      { title: 'Điều khiển KVM', description: 'Quản lý và chuyển đổi tín hiệu linh hoạt.', icon: 'keyboard' },
    ],
    arch: ['Nguồn tín hiệu đa dạng', 'Processor / Controller', 'Wall management', 'Fine-pitch LED Wall'],
    stack: ['Fine Pitch', 'KVM', 'Failover dự phòng kép', 'Calibration tự động'],
    cats: ['indoor-led-module', 'technology-equipment'],
  },
  {
    slug: 'smart-meeting-room', name: 'Phòng họp thông minh', icon: 'easel',
    tagline: 'Họp trực tuyến, trình chiếu và cộng tác liền mạch.',
    intro: 'Trang bị màn hình tương tác, thiết bị hội nghị và hệ thống âm thanh cho phòng họp hiện đại, hỗ trợ làm việc kết hợp.',
    benefits: ['Hội nghị truyền hình chất lượng cao', 'Chia sẻ màn hình không dây', 'Âm thanh khử ồn', 'Đặt phòng thông minh'],
    features: [
      { title: 'Camera hội nghị', description: 'Khung hình tự động bám người nói.', icon: 'camera-video' },
      { title: 'Trình chiếu không dây', description: 'Chia sẻ nội dung từ mọi thiết bị.', icon: 'cast' },
      { title: 'Màn hình tương tác', description: 'Ghi chú, vẽ và cộng tác trực tiếp.', icon: 'pencil-square' },
    ],
    arch: ['Thiết bị người dùng', 'Hệ thống AV trung tâm', 'Nền tảng hội nghị', 'Màn hình tương tác'],
    stack: ['Jabra', 'Cloud Native', 'AI Analytics', 'Wireless'],
    cats: ['education-equipment', 'audio-equipment', 'technology-equipment'],
  },
  {
    slug: 'smart-classroom', name: 'Lớp học thông minh', icon: 'mortarboard',
    tagline: 'Nâng tầm trải nghiệm dạy và học tương tác.',
    intro: 'Giải pháp lớp học thông minh với màn hình tương tác, bảng thông minh, hệ thống âm thanh và phần mềm quản lý giảng dạy.',
    benefits: ['Bài giảng tương tác sinh động', 'Quản lý lớp học tập trung', 'Tích hợp học liệu số', 'Dễ sử dụng cho giáo viên'],
    features: [
      { title: 'Màn hình tương tác 4K', description: '20 điểm chạm, độ phân giải 4K mượt mà.', icon: 'tv' },
      { title: 'Phần mềm giảng dạy', description: 'Soạn và trình bày bài giảng tương tác.', icon: 'book' },
      { title: 'Âm thanh lớp học', description: 'Giọng nói rõ ràng tới mọi vị trí.', icon: 'volume-up' },
    ],
    arch: ['Học liệu số', 'Màn hình tương tác', 'Hệ thống âm thanh', 'Quản lý lớp học'],
    stack: ['Android 13', 'OPS Windows', 'Deep Learning', 'Cloud'],
    cats: ['education-equipment', 'audio-equipment'],
  },
  {
    slug: 'smart-hospital', name: 'Bệnh viện thông minh', icon: 'heart-pulse',
    tagline: 'Số hóa quy trình chăm sóc và vận hành y tế.',
    intro: 'Hệ thống gọi y tá, kiosk lấy số, màn hình xếp hàng và thiết bị thông minh giúp bệnh viện vận hành hiệu quả, nâng cao trải nghiệm bệnh nhân.',
    benefits: ['Gọi y tá nhanh chóng, chính xác', 'Giảm thời gian chờ', 'Quản lý tập trung', 'Tuân thủ tiêu chuẩn y tế'],
    features: [
      { title: 'Hệ thống gọi y tá', description: 'Liên lạc tức thời giữa bệnh nhân và điều dưỡng.', icon: 'bell' },
      { title: 'Kiosk & xếp hàng', description: 'Lấy số tự động, hiển thị thứ tự thông minh.', icon: 'ticket-perforated' },
      { title: 'Tích hợp HIS', description: 'Kết nối hệ thống thông tin bệnh viện.', icon: 'database' },
    ],
    arch: ['Thiết bị đầu giường', 'Bộ quản lý phòng', 'Máy chủ trung tâm', 'Trạm điều dưỡng'],
    stack: ['TCP/IP', 'ISO 13485', 'IoT', 'Edge Computing'],
    cats: ['hospital-equipment', 'technology-equipment'],
  },
  {
    slug: 'smart-city', name: 'Đô thị thông minh', icon: 'buildings',
    tagline: 'Nền tảng dữ liệu đô thị tập trung, kết nối toàn diện.',
    intro: 'AIO xây dựng nền tảng Smart City tích hợp camera AI, cảm biến IoT, bảng thông tin và trung tâm điều hành thông minh (IOC).',
    benefits: ['Giám sát giao thông thông minh', 'Cảnh báo sớm sự cố', 'Dữ liệu tập trung IOC', 'Mở rộng linh hoạt'],
    features: [
      { title: 'Camera AI', description: 'Nhận diện biển số, đám đông, sự cố giao thông.', icon: 'camera-video' },
      { title: 'Nền tảng IoT', description: 'Thu thập dữ liệu cảm biến môi trường, năng lượng.', icon: 'broadcast' },
      { title: 'Trung tâm IOC', description: 'Bảng điều khiển điều hành đô thị tập trung.', icon: 'columns-gap' },
    ],
    arch: ['Cảm biến & Camera', 'Mạng truyền dẫn', 'Nền tảng dữ liệu', 'Trung tâm điều hành IOC'],
    stack: ['Computer Vision', 'LoRaWAN', 'MQTT', 'Digital Twin'],
    cats: ['technology-equipment', 'outdoor-led-module'],
  },
  {
    slug: 'ai-camera', name: 'Camera AI', icon: 'camera-video',
    tagline: 'Phân tích hình ảnh thông minh theo thời gian thực.',
    intro: 'Giải pháp camera AI ứng dụng thị giác máy tính cho an ninh, giao thông và bán lẻ với khả năng phân tích tại biên (edge).',
    benefits: ['Nhận diện khuôn mặt & biển số', 'Phân tích hành vi đám đông', 'Cảnh báo tức thời', 'Tích hợp dễ dàng'],
    features: [
      { title: 'Edge AI', description: 'Xử lý phân tích ngay trên thiết bị, độ trễ thấp.', icon: 'cpu' },
      { title: 'Nhận diện đối tượng', description: 'Người, phương tiện, biển số, sự kiện bất thường.', icon: 'person-bounding-box' },
      { title: 'Báo cáo thông minh', description: 'Thống kê, heatmap và cảnh báo tự động.', icon: 'bar-chart' },
    ],
    arch: ['Camera AI', 'Edge Server', 'Nền tảng phân tích', 'Dashboard cảnh báo'],
    stack: ['NVIDIA Jetson', 'Computer Vision', 'Deep Learning', 'Edge Computing'],
    cats: ['technology-equipment'],
  },
  {
    slug: 'iot-platform', name: 'Nền tảng IoT', icon: 'diagram-3',
    tagline: 'Kết nối, giám sát và điều khiển vạn vật.',
    intro: 'Nền tảng IoT của AIO thu thập dữ liệu từ hàng nghìn cảm biến, trực quan hóa và tự động hóa vận hành cho nhà máy và tòa nhà thông minh.',
    benefits: ['Kết nối đa giao thức', 'Giám sát thời gian thực', 'Tự động hóa luật điều khiển', 'Khả năng mở rộng cao'],
    features: [
      { title: 'Đa giao thức', description: 'MQTT, LoRaWAN, Modbus, BACnet.', icon: 'diagram-2' },
      { title: 'Dashboard thời gian thực', description: 'Trực quan hóa dữ liệu cảm biến tức thì.', icon: 'activity' },
      { title: 'Quy tắc tự động', description: 'Thiết lập kịch bản điều khiển thông minh.', icon: 'gear-wide-connected' },
    ],
    arch: ['Cảm biến & Gateway', 'Message Broker', 'Nền tảng IoT', 'Ứng dụng & Dashboard'],
    stack: ['MQTT', 'LoRaWAN', 'Cloud Native', 'Digital Twin'],
    cats: ['technology-equipment'],
  },
  {
    slug: 'digital-signage', name: 'Digital Signage', icon: 'tv',
    tagline: 'Truyền thông số tại điểm bán, quản lý tập trung.',
    intro: 'Giải pháp biển hiệu số (digital signage) cho chuỗi bán lẻ, ngân hàng và doanh nghiệp với phần mềm quản lý nội dung từ xa.',
    benefits: ['Quản lý nội dung tập trung', 'Lên lịch phát tự động', 'Đa điểm, đa màn hình', 'Phân tích hiệu quả hiển thị'],
    features: [
      { title: 'CMS đám mây', description: 'Quản lý và cập nhật nội dung từ xa.', icon: 'cloud' },
      { title: 'Lên lịch phát', description: 'Tự động phát nội dung theo khung giờ.', icon: 'calendar-event' },
      { title: 'Đa nền tảng', description: 'Màn hình LCD, LED, chân đứng quảng cáo.', icon: 'phone' },
    ],
    arch: ['CMS đám mây', 'Player thiết bị', 'Màn hình hiển thị', 'Báo cáo & phân tích'],
    stack: ['Cloud Native', 'Android', 'AI Analytics', '4K UHD'],
    cats: ['technology-equipment', 'indoor-led-module'],
  },
];

export const SOLUTIONS: Solution[] = DEFS.map((d, i) => ({
  id: d.slug,
  slug: d.slug,
  name: d.name,
  tagline: d.tagline,
  heroImage: img(i * 5),
  introduction: d.intro,
  benefits: d.benefits,
  features: d.features,
  architecture: { title: 'Kiến trúc hệ thống', steps: d.arch },
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
