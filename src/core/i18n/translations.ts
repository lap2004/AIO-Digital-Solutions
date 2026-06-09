import type { Lang } from './language.store';

/** UI string dictionary. Dynamic catalog content (product/news names) stays as authored. */
export const dictionary = {
  vi: {
    common: {
      contact: 'Liên hệ',
      getQuote: 'Báo giá',
      viewAll: 'Xem tất cả',
      learnMore: 'Tìm hiểu thêm',
      details: 'Chi tiết',
      readMore: 'Đọc thêm',
      send: 'Gửi yêu cầu',
      sending: 'Đang gửi…',
      cancel: 'Hủy',
      save: 'Lưu',
      search: 'Tìm kiếm…',
      requestConsult: 'Yêu cầu tư vấn',
      consultSolution: 'Tư vấn giải pháp',
      backHome: 'Về trang chủ',
      notFound: 'Không tìm thấy',
      loading: 'Đang tải…',
      readingTime: 'phút đọc',
      admin: 'Quản trị',
    },
    nav: {
      '/': 'Trang chủ',
      '/gioi-thieu': 'Về chúng tôi',
      '/giai-phap': 'Giải pháp',
      '/san-pham': 'Sản phẩm',
      '/du-an': 'Dự án',
      '/lien-he': 'Liên hệ',
    },
    home: {
      heroTitlePre: 'Kiến tạo',
      heroTitleHi: 'không gian số',
      heroTitlePost: 'cho doanh nghiệp hiện đại',
      heroDesc:
        'AIO cung cấp giải pháp trọn gói cho hệ thống màn hình hiển thị và tự động hóa: thi công lắp đặt, quản lý điều khiển từ xa, bảo trì – bảo hành và tự động hóa điện – mạng – camera – nhà máy.',
      exploreSolutions: 'Khám phá giải pháp',
      viewProjects: 'Xem dự án tiêu biểu',
      areasEyebrow: 'Lĩnh vực hoạt động',
      areasTitle: '4 mảng kinh doanh cốt lõi của AIO',
      areasDesc:
        'Hệ sinh thái dịch vụ khép kín: từ thi công, vận hành, bảo trì đến tự động hóa toàn diện cho hệ thống của bạn.',
      solutionsEyebrow: 'Giải pháp chi tiết',
      solutionsTitle: 'Giải pháp công nghệ theo từng lĩnh vực',
      solutionsDesc: 'Các giải pháp chuyên sâu thuộc 4 mảng kinh doanh cốt lõi của AIO.',
      allSolutions: 'Tất cả giải pháp',
      productsEyebrow: 'Sản phẩm',
      productsTitle: 'Sản phẩm nổi bật',
      productsDesc: 'Thiết bị chính hãng từ các thương hiệu hàng đầu, phân phối và bảo hành bởi AIO.',
      allProducts: 'Xem tất cả sản phẩm',
      projectsEyebrow: 'Dự án',
      projectsTitle: 'Dự án tiêu biểu',
      projectsDesc: 'Hàng trăm dự án đã triển khai trên khắp 63 tỉnh thành Việt Nam.',
      brandsEyebrow: 'Đối tác',
      brandsTitle: 'Thương hiệu chúng tôi phân phối',
      newsEyebrow: 'Tin tức',
      newsTitle: 'Tin tức & Kiến thức công nghệ',
    },
    cta: {
      title: 'Sẵn sàng triển khai dự án công nghệ của bạn?',
      desc: 'Đội ngũ chuyên gia AIO tư vấn giải pháp, khảo sát và báo giá miễn phí trong 24 giờ.',
    },
    footer: {
      about:
        'Giải pháp công nghệ toàn diện cho hệ thống màn hình hiển thị và tự động hóa: thi công, quản lý điều khiển, bảo trì và tự động hóa điện – mạng – camera – nhà máy.',
      solutions: 'Giải pháp',
      products: 'Sản phẩm',
      company: 'Công ty',
      address: 'Địa chỉ',
      hotline: 'Hotline',
      workingHours: 'Giờ làm việc',
      rights: 'Bảo lưu mọi quyền.',
      represent: 'Người đại diện',
      taxCode: 'MST',
    },
    products: {
      heroTitle: 'Danh mục sản phẩm',
      heroDesc: 'Hơn 250 sản phẩm chính hãng thuộc 8 nhóm ngành công nghệ.',
      all: 'Tất cả',
      found: 'Tìm thấy',
      productsUnit: 'sản phẩm',
      sortNewest: 'Mới nhất',
      sortPriceAsc: 'Giá tăng dần',
      sortPriceDesc: 'Giá giảm dần',
      empty: 'Không tìm thấy sản phẩm',
    },
    projects: {
      heroTitle: 'Dự án tiêu biểu',
      heroDesc: 'Hơn 500 dự án công nghệ đã được AIO triển khai trên toàn quốc.',
    },
    news: {
      heroTitle: 'Tin tức & Kiến thức công nghệ',
      heroDesc: 'Cập nhật xu hướng công nghệ mới nhất và câu chuyện dự án từ AIO.',
    },
    solutions: {
      heroTitle: 'Giải pháp công nghệ cho mọi lĩnh vực',
      heroDesc:
        'AIO cung cấp giải pháp trọn gói, tích hợp phần cứng và phần mềm, được thiết kế riêng cho từng nhu cầu.',
    },
    about: { heroTitle: 'Đối tác công nghệ đáng tin cậy của doanh nghiệp Việt' },
    contact: {
      heroTitle: 'Kết nối với AIO',
      heroDesc: 'Để lại thông tin, đội ngũ chuyên gia của chúng tôi sẽ liên hệ tư vấn trong vòng 24 giờ.',
      openMaps: 'Mở Google Maps →',
      chatZalo: 'Chat qua Zalo',
    },
  },

  en: {
    common: {
      contact: 'Contact',
      getQuote: 'Get a quote',
      viewAll: 'View all',
      learnMore: 'Learn more',
      details: 'Details',
      readMore: 'Read more',
      send: 'Send request',
      sending: 'Sending…',
      cancel: 'Cancel',
      save: 'Save',
      search: 'Search…',
      requestConsult: 'Request consultation',
      consultSolution: 'Get consultation',
      backHome: 'Back to home',
      notFound: 'Not found',
      loading: 'Loading…',
      readingTime: 'min read',
      admin: 'Admin',
    },
    nav: {
      '/': 'Home',
      '/gioi-thieu': 'About us',
      '/giai-phap': 'Solutions',
      '/san-pham': 'Products',
      '/du-an': 'Projects',
      '/lien-he': 'Contact',
    },
    home: {
      heroTitlePre: 'Building the',
      heroTitleHi: 'digital space',
      heroTitlePost: 'for modern enterprises',
      heroDesc:
        'AIO delivers end-to-end solutions for display systems and automation: installation, remote management & control, maintenance – warranty, and automation of power – network – camera – factory.',
      exploreSolutions: 'Explore solutions',
      viewProjects: 'View featured projects',
      areasEyebrow: 'What we do',
      areasTitle: 'AIO’s 4 core business areas',
      areasDesc:
        'A closed-loop service ecosystem: from installation and operation to maintenance and full automation of your systems.',
      solutionsEyebrow: 'Detailed solutions',
      solutionsTitle: 'Technology solutions by domain',
      solutionsDesc: 'In-depth solutions across AIO’s 4 core business areas.',
      allSolutions: 'All solutions',
      productsEyebrow: 'Products',
      productsTitle: 'Featured products',
      productsDesc: 'Genuine equipment from leading brands, distributed and warranted by AIO.',
      allProducts: 'View all products',
      projectsEyebrow: 'Projects',
      projectsTitle: 'Featured projects',
      projectsDesc: 'Hundreds of projects delivered across all 63 provinces of Vietnam.',
      brandsEyebrow: 'Partners',
      brandsTitle: 'Brands we distribute',
      newsEyebrow: 'News',
      newsTitle: 'News & technology insights',
    },
    cta: {
      title: 'Ready to launch your technology project?',
      desc: 'AIO experts provide free consultation, site survey and quotation within 24 hours.',
    },
    footer: {
      about:
        'End-to-end technology solutions for display systems and automation: installation, management & control, maintenance, and automation of power – network – camera – factory.',
      solutions: 'Solutions',
      products: 'Products',
      company: 'Company',
      address: 'Address',
      hotline: 'Hotline',
      workingHours: 'Working hours',
      rights: 'All rights reserved.',
      represent: 'Legal representative',
      taxCode: 'Tax code',
    },
    products: {
      heroTitle: 'Product catalog',
      heroDesc: 'Over 250 genuine products across 8 technology categories.',
      all: 'All',
      found: 'Found',
      productsUnit: 'products',
      sortNewest: 'Newest',
      sortPriceAsc: 'Price: low to high',
      sortPriceDesc: 'Price: high to low',
      empty: 'No products found',
    },
    projects: {
      heroTitle: 'Featured projects',
      heroDesc: 'Over 500 technology projects delivered by AIO nationwide.',
    },
    news: {
      heroTitle: 'News & technology insights',
      heroDesc: 'Stay up to date with the latest technology trends and project stories from AIO.',
    },
    solutions: {
      heroTitle: 'Technology solutions for every domain',
      heroDesc:
        'AIO provides turnkey solutions integrating hardware and software, tailored to each need.',
    },
    about: { heroTitle: 'A trusted technology partner for Vietnamese enterprises' },
    contact: {
      heroTitle: 'Connect with AIO',
      heroDesc: 'Leave your details and our experts will get back to you within 24 hours.',
      openMaps: 'Open Google Maps →',
      chatZalo: 'Chat on Zalo',
    },
  },
} as const;

type Dict = typeof dictionary.vi;

/** Resolve a dot path against the dictionary for a given language. */
export function translate(lang: Lang, path: string): string {
  const segments = path.split('.');
  let node: unknown = dictionary[lang];
  for (const s of segments) {
    if (node && typeof node === 'object' && s in (node as Record<string, unknown>)) {
      node = (node as Record<string, unknown>)[s];
    } else {
      return path;
    }
  }
  return typeof node === 'string' ? node : path;
}

export type { Dict };
