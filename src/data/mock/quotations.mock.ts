import type { Quotation, QuotationStatus, QuotationRequestType } from '@/domain/entities';
import { seededRandom, pick } from '@/core/utils/slug';
import { ENTERPRISE_CLIENTS, FIRST_NAMES, LAST_NAMES } from './seed';
import { PRODUCTS } from './products.mock';

const STATUSES: QuotationStatus[] = ['sent', 'contacted', 'approved', 'rejected', 'sent'];
const REQUEST_TYPES: QuotationRequestType[] = ['consultation', 'calculator', 'quote', 'contact'];

const SAMPLE_NOTES = [
  'Khách để lại SĐT qua Popup Tư Vấn 24/7. Cần khảo sát 3D màn hình LED hội trường.',
  '[Bảng tính tự động]: Kích thước 4m x 2.5m (10m2). Màn hình LED P2.5 trong nhà. Cần liên hệ báo giá thi công trọn gói.',
  'Cần tư vấn màn hình LED ngoài trời P3.91 chống nước lắp tại mặt tiền showroom ô tô.',
  'Yêu cầu báo giá 2 bộ Standee điện tử cảm ứng 55 inch cho trung tâm thương mại.',
  'Khách hàng cần khảo sát gấp trong tuần này để kịp khai trương chi nhánh mới.',
];

export const QUOTATIONS: Quotation[] = Array.from({ length: 12 }, (_, i) => {
  const rng = seededRandom(`quote-${i}`);
  const reqType = REQUEST_TYPES[i % REQUEST_TYPES.length];
  const itemCount = 1 + Math.floor(rng() * 3);
  const items = Array.from({ length: itemCount }, (_, k) => {
    const product = PRODUCTS[(i * 3 + k) % PRODUCTS.length];
    const quantity = 1 + Math.floor(rng() * 10);
    const unitPrice = product.price ?? Math.round((2 + rng() * 40) * 1_000_000);
    return { productId: product.id, productName: product.name, quantity, unitPrice };
  });
  const total = items.reduce((s, it) => s + it.quantity * it.unitPrice, 0);
  const created = new Date(Date.now() - Math.floor(rng() * 10) * 86400000 - Math.floor(rng() * 3600000));
  return {
    id: `quote-${i}`,
    code: `BG-2026-${String(1000 + i)}`,
    customerName: `${pick(LAST_NAMES, rng)} ${pick(FIRST_NAMES, rng)}`,
    company: i % 2 === 0 ? pick(ENTERPRISE_CLIENTS, rng) : 'Khách hàng cá nhân',
    email: `khachhang_${i + 1}@gmail.com`,
    phone: `09${Math.floor(10000000 + rng() * 89999999)}`,
    requestType: reqType,
    interest: items[0]?.productName || 'Tư vấn giải pháp LED',
    items,
    status: STATUSES[i % STATUSES.length],
    total: reqType === 'consultation' ? 0 : total,
    note: SAMPLE_NOTES[i % SAMPLE_NOTES.length],
    createdAt: created.toISOString(),
    validUntil: new Date(created.getTime() + 30 * 86400000).toISOString(),
  } satisfies Quotation;
});

