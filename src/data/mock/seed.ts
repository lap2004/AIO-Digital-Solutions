/** Shared seed pools for deterministic mock generation. */
import type { ProductCategorySlug } from '@/domain/entities';

export const VN_CITIES = [
  'Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Hưng Yên',
  'Bắc Ninh', 'Quảng Ninh', 'Thái Bình', 'Nghệ An', 'Bình Dương', 'Đồng Nai',
  'Khánh Hòa', 'Thừa Thiên Huế', 'Lâm Đồng', 'Vĩnh Phúc',
];

export const COUNTRIES = ['Việt Nam', 'Trung Quốc', 'Hàn Quốc', 'Nhật Bản', 'Đài Loan', 'Mỹ', 'Đức'];

export const WARRANTIES = ['12 tháng', '24 tháng', '36 tháng', '60 tháng'];

export const ENTERPRISE_CLIENTS = [
  'Tập đoàn Vingroup', 'Tổng công ty Viettel', 'Ngân hàng BIDV', 'FPT Corporation',
  'Tập đoàn Hòa Phát', 'Tổng công ty Điện lực EVN', 'Vietcombank', 'Tập đoàn TH True Milk',
  'Sun Group', 'Masan Group', 'Bệnh viện Bạch Mai', 'Bệnh viện Vinmec',
  'Đại học Bách Khoa Hà Nội', 'Trường Đại học FPT', 'UBND Tỉnh Hưng Yên',
  'Sở Y tế Hà Nội', 'Aeon Mall', 'Vincom Retail', 'Sân vận động Mỹ Đình', 'Nhà máy Samsung Bắc Ninh',
];

export const TECH_TERMS = [
  'Nova Star', 'Pixel Pitch', 'HDR10', 'Common Cathode', 'Calibration tự động',
  'Edge Computing', 'Computer Vision', 'Deep Learning', 'MQTT', 'LoRaWAN',
  'Digital Twin', '5G', 'Cloud Native', 'AI Analytics', 'Failover dự phòng kép',
];

export const PRODUCT_APPLICATIONS: Record<ProductCategorySlug, string[]> = {
  'led-module': ['Trung tâm điều hành', 'Hội trường sự kiện', 'Studio truyền hình', 'Sảnh doanh nghiệp'],
  'outdoor-led-module': ['Biển quảng cáo ngoài trời', 'Mặt tiền tòa nhà', 'Sân vận động', 'Quảng trường'],
  'indoor-led-module': ['Phòng họp thông minh', 'Showroom', 'Trung tâm thương mại', 'Sân khấu trong nhà'],
  'audio-equipment': ['Hội trường', 'Sân khấu sự kiện', 'Phòng hội nghị', 'Nhà thi đấu'],
  'hospital-equipment': ['Khoa nội trú', 'Phòng mổ', 'Trạm điều dưỡng', 'Khoa cấp cứu'],
  'technology-equipment': ['Trung tâm dữ liệu', 'Phòng điều khiển', 'Hệ thống giám sát', 'Livestream sự kiện'],
  'education-equipment': ['Lớp học thông minh', 'Phòng đào tạo', 'Giảng đường', 'Phòng họp trực tuyến'],
  'led-cabinet': ['Sự kiện cho thuê', 'Sân khấu lưu động', 'Triển lãm', 'Concert'],
};

export const NEWS_TITLE_TEMPLATES = [
  'Xu hướng màn hình LED {x} dẫn dắt thị trường năm 2026',
  'Ứng dụng AI Camera trong giám sát giao thông đô thị thông minh',
  'IoT và bài toán quản lý năng lượng cho nhà máy thông minh',
  'Chuyển đổi số ngành y tế: từ hồ sơ giấy đến bệnh viện thông minh',
  'Giải pháp Smart City: nền tảng dữ liệu đô thị tập trung',
  'Công nghệ Common Cathode giúp tiết kiệm 30% điện năng màn hình LED',
  'AIO bàn giao dự án màn hình LED {x} cho khách hàng doanh nghiệp',
  'Lớp học thông minh thay đổi trải nghiệm dạy và học như thế nào',
  'Digital Signage: kênh truyền thông tại điểm bán hiệu quả',
  'Phân tích thị giác máy tính trong bán lẻ hiện đại',
];

export const AUTHORS = [
  { name: 'Nguyễn Minh Quân', role: 'Solution Architect' },
  { name: 'Trần Thu Hà', role: 'Content Lead' },
  { name: 'Lê Hoàng Nam', role: 'Technical Editor' },
  { name: 'Phạm Khánh Linh', role: 'Marketing' },
];

export const SALES_TEAM = ['Đỗ Văn Hùng', 'Ngô Thị Mai', 'Bùi Quang Huy', 'Vũ Thanh Tâm'];

export const FIRST_NAMES = ['Anh', 'Bình', 'Cường', 'Dung', 'Giang', 'Hải', 'Khoa', 'Lan', 'Minh', 'Nga', 'Phong', 'Quỳnh', 'Sơn', 'Trang', 'Việt'];
export const LAST_NAMES = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Vũ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ'];

export const LOREM_VI =
  'Với hơn một thập kỷ kinh nghiệm, AIO cung cấp giải pháp công nghệ trọn gói từ tư vấn, thiết kế, sản xuất đến thi công và bảo trì. Đội ngũ kỹ sư giàu kinh nghiệm cùng quy trình kiểm soát chất lượng nghiêm ngặt đảm bảo mỗi dự án vận hành ổn định, bền bỉ trong điều kiện khắc nghiệt nhất.';
