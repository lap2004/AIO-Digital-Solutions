import type { Quotation, QuotationStatus } from '@/domain/entities';
import { seededRandom, pick } from '@/core/utils/slug';
import { ENTERPRISE_CLIENTS, FIRST_NAMES, LAST_NAMES } from './seed';
import { PRODUCTS } from './products.mock';

const STATUSES: QuotationStatus[] = ['draft', 'sent', 'approved', 'rejected'];

export const QUOTATIONS: Quotation[] = Array.from({ length: 18 }, (_, i) => {
  const rng = seededRandom(`quote-${i}`);
  const itemCount = 1 + Math.floor(rng() * 4);
  const items = Array.from({ length: itemCount }, (_, k) => {
    const product = PRODUCTS[(i * 3 + k) % PRODUCTS.length];
    const quantity = 1 + Math.floor(rng() * 20);
    const unitPrice = product.price ?? Math.round((2 + rng() * 40) * 1_000_000);
    return { productId: product.id, productName: product.name, quantity, unitPrice };
  });
  const total = items.reduce((s, it) => s + it.quantity * it.unitPrice, 0);
  const created = new Date(Date.now() - Math.floor(rng() * 60) * 86400000);
  return {
    id: `quote-${i}`,
    code: `BG-2026-${String(1000 + i)}`,
    customerName: `${pick(LAST_NAMES, rng)} ${pick(FIRST_NAMES, rng)}`,
    company: pick(ENTERPRISE_CLIENTS, rng),
    email: `kh${i}@example.vn`,
    phone: `09${Math.floor(10000000 + rng() * 89999999)}`,
    items,
    status: STATUSES[i % STATUSES.length],
    total,
    note: 'Giá chưa bao gồm VAT. Đã bao gồm thi công và bảo hành.',
    createdAt: created.toISOString(),
    validUntil: new Date(created.getTime() + 30 * 86400000).toISOString(),
  } satisfies Quotation;
});
