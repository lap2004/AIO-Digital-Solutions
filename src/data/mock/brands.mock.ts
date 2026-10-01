import type { Brand } from '@/domain/entities';
import { slugify } from '@/core/utils/slug';
import { PRODUCTS } from './products.mock';

const COUNTRY_BY_BRAND: Record<string, string> = {
  NovaStar: 'Quốc tế / Trung Quốc',
  Unilumin: 'Trung Quốc',
  Hikvision: 'Trung Quốc',
  Dahua: 'Trung Quốc',
  Samsung: 'Hàn Quốc',
  LG: 'Hàn Quốc',
  Meanwell: 'Đài Loan',
  Kystar: 'Trung Quốc',
  Linsn: 'Trung Quốc',
  Leyard: 'Trung Quốc',
  Absen: 'Trung Quốc',
  Orient: 'Việt Nam',
  Jabra: 'Đan Mạch',
  Roland: 'Nhật Bản',
  Epson: 'Nhật Bản',
  Optoma: 'Đài Loan',
  Medi: 'Hàn Quốc',
  Dell: 'Mỹ',
  AIO: 'Việt Nam',
};

const STRATEGIC_BRANDS = [
  'NovaStar',
  'Unilumin',
  'Samsung',
  'LG',
  'Hikvision',
  'Dahua',
  'Meanwell',
  'Kystar',
  'Absen',
  'Linsn',
  'Leyard',
  'Orient',
];

const fromProducts = Array.from(new Set(PRODUCTS.map((p) => p.brand)));
const allNames = Array.from(new Set([...STRATEGIC_BRANDS, ...fromProducts]));

export const BRANDS: Brand[] = allNames.map((name) => ({
  id: slugify(name),
  name,
  slug: slugify(name),
  logo: '',
  country: COUNTRY_BY_BRAND[name] ?? 'Quốc tế',
  description: `${name} — đối tác công nghệ chiến lược phân phối chính hãng tại AIO Digital Solutions.`,
}));
