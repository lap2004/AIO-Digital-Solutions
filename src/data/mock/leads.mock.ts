import type { Lead, LeadSource, LeadStatus } from '@/domain/entities';
import { seededRandom, pick } from '@/core/utils/slug';
import { ENTERPRISE_CLIENTS, FIRST_NAMES, LAST_NAMES, SALES_TEAM } from './seed';

const STATUSES: LeadStatus[] = ['new', 'contacted', 'quotation-sent', 'negotiation', 'won', 'lost'];
const SOURCES: LeadSource[] = ['website', 'referral', 'campaign', 'hotline', 'zalo', 'event'];
const INTERESTS = [
  'Màn hình LED trong nhà P2',
  'LED ngoài trời P5 quảng cáo',
  'Hệ thống gọi y tá bệnh viện',
  'Camera AI giám sát nhà máy',
  'Phòng họp thông minh',
  'Lớp học tương tác 86"',
  'Nền tảng IoT giám sát năng lượng',
];

export const LEADS: Lead[] = Array.from({ length: 28 }, (_, i) => {
  const rng = seededRandom(`lead-${i}`);
  const name = `${pick(LAST_NAMES, rng)} ${pick(FIRST_NAMES, rng)} ${pick(FIRST_NAMES, rng)}`;
  const company = pick(ENTERPRISE_CLIENTS, rng);
  const created = new Date(Date.now() - Math.floor(rng() * 90) * 86400000);
  return {
    id: `lead-${i}`,
    name,
    company,
    email: `lead${i}@${company.split(' ').pop()?.toLowerCase().replace(/[^a-z]/g, '') || 'company'}.vn`,
    phone: `09${Math.floor(10000000 + rng() * 89999999)}`,
    status: STATUSES[i % STATUSES.length],
    source: pick(SOURCES, rng),
    interest: pick(INTERESTS, rng),
    estimatedValue: Math.round((20 + rng() * 480) * 1_000_000),
    assignedTo: pick(SALES_TEAM, rng),
    note: 'Khách hàng quan tâm, cần gửi báo giá chi tiết và lịch khảo sát.',
    createdAt: created.toISOString(),
    updatedAt: created.toISOString(),
  } satisfies Lead;
});
