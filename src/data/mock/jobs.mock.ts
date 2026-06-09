import type { Job, JobType } from '@/domain/entities';
import { slugify } from '@/core/utils/slug';

const TYPES: JobType[] = ['full-time', 'full-time', 'full-time', 'contract', 'internship'];

const RAW = [
  { title: 'Kỹ sư Thi công Màn hình LED', department: 'Kỹ thuật', location: 'Hưng Yên', salary: '15 - 25 triệu' },
  { title: 'Kỹ sư Giải pháp IoT / Smart City', department: 'Giải pháp', location: 'Hà Nội', salary: '20 - 35 triệu' },
  { title: 'Chuyên viên AI / Computer Vision', department: 'R&D', location: 'Hà Nội', salary: '25 - 45 triệu' },
  { title: 'Nhân viên Kinh doanh Dự án', department: 'Kinh doanh', location: 'TP. Hồ Chí Minh', salary: '12 - 30 triệu + hoa hồng' },
  { title: 'Project Manager Hệ thống', department: 'PMO', location: 'Hà Nội', salary: '30 - 50 triệu' },
  { title: 'Kỹ thuật viên Bảo trì Hệ thống Bệnh viện', department: 'Dịch vụ', location: 'Toàn quốc', salary: '12 - 20 triệu' },
  { title: 'Thiết kế UI/UX & Đồ họa', department: 'Marketing', location: 'Hà Nội', salary: '12 - 22 triệu' },
  { title: 'Thực tập sinh Lập trình Frontend', department: 'R&D', location: 'Hà Nội', salary: 'Hỗ trợ 4 - 6 triệu' },
];

export const JOBS: Job[] = RAW.map((r, i) => ({
  id: `job-${i}`,
  slug: `${slugify(r.title)}-${i}`,
  title: r.title,
  department: r.department,
  location: r.location,
  type: TYPES[i % TYPES.length],
  salaryRange: r.salary,
  quantity: 1 + (i % 4),
  description: `AIO đang tìm kiếm ${r.title} năng động, đam mê công nghệ để gia nhập đội ngũ ${r.department}.`,
  responsibilities: [
    'Tham gia triển khai và vận hành các dự án công nghệ của công ty',
    'Phối hợp với các phòng ban để đảm bảo tiến độ và chất lượng',
    'Đề xuất cải tiến quy trình và giải pháp kỹ thuật',
  ],
  requirements: [
    'Tốt nghiệp Cao đẳng/Đại học chuyên ngành liên quan',
    'Có tinh thần trách nhiệm, chủ động và ham học hỏi',
    'Ưu tiên ứng viên có kinh nghiệm trong lĩnh vực tương ứng',
  ],
  benefits: [
    'Thu nhập cạnh tranh, xét tăng lương 2 lần/năm',
    'Đóng BHXH đầy đủ, thưởng lễ Tết hấp dẫn',
    'Môi trường trẻ trung, được đào tạo và phát triển',
  ],
  postedAt: `2026-0${1 + (i % 6)}-10`,
  deadline: `2026-0${2 + (i % 6)}-28`,
  featured: i < 3,
}));
