import type { Brand } from '@/domain/entities';
import { slugify } from '@/core/utils/slug';
import { PRODUCTS } from './products.mock';

const COUNTRY_BY_BRAND: Record<string, string> = {
  Orient: 'Việt Nam', Leyard: 'Trung Quốc', Kystar: 'Trung Quốc', Jabra: 'Đan Mạch',
  Roland: 'Nhật Bản', Epson: 'Nhật Bản', Optoma: 'Đài Loan', Medi: 'Hàn Quốc',
  Sonelco: 'Tây Ban Nha', Aiphone: 'Nhật Bản', Bitcare: 'Hàn Quốc', Dell: 'Mỹ',
  'Allied Telesis': 'Nhật Bản', MeekBase: 'Trung Quốc', Starview: 'Việt Nam',
  Absen: 'Trung Quốc', Unilumin: 'Trung Quốc', AIO: 'Việt Nam',
};

const fromProducts = Array.from(new Set(PRODUCTS.map((p) => p.brand)));
const extra = ['Absen', 'Unilumin'];
const names = Array.from(new Set([...fromProducts, ...extra]));

export const BRANDS: Brand[] = names.map((name) => ({
  id: slugify(name),
  name,
  slug: slugify(name),
  logo: '',
  country: COUNTRY_BY_BRAND[name] ?? 'Quốc tế',
  description: `${name} — thương hiệu đối tác phân phối chính hãng tại AIO Digital Solutions.`,
}));
