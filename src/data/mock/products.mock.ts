import type { Product, ProductCategorySlug, SpecItem } from '@/domain/entities';
import { slugify, seededRandom, pick } from '@/core/utils/slug';
import { PRODUCT_CATEGORIES } from '@/core/constants/catalog';
import { COUNTRIES, WARRANTIES, PRODUCT_APPLICATIONS, LOREM_VI } from './seed';
import manifest from '@/data/generated/image-manifest.json';

interface ManifestItem {
  id: string;
  name: string;
  category: ProductCategorySlug;
  brand: string;
  sku: string;
  image: string;
}

const ALL_CATEGORIES = PRODUCT_CATEGORIES.map((c) => c.slug);

function specFor(category: ProductCategorySlug, rng: () => number): SpecItem[] {
  const refresh = pick(['1920Hz', '2880Hz', '3840Hz'], rng);
  const bright = (300 + Math.floor(rng() * 800)).toString();
  const brightOut = (4000 + Math.floor(rng() * 4000)).toString();
  switch (category) {
    case 'led-module':
    case 'indoor-led-module':
      return [
        { label: 'Pixel Pitch', value: pick(['P1.25', 'P1.53', 'P1.86', 'P2', 'P2.5'], rng) },
        { label: 'Độ sáng', value: `${bright} nits` },
        { label: 'Tần số quét', value: refresh },
        { label: 'Kích thước module', value: pick(['320×160mm', '256×128mm', '160×160mm'], rng) },
        { label: 'Tỷ lệ tương phản', value: '5000:1' },
        { label: 'Góc nhìn', value: '160°/160°' },
        { label: 'Tuổi thọ', value: '100.000 giờ' },
      ];
    case 'outdoor-led-module':
    case 'led-cabinet':
      return [
        { label: 'Pixel Pitch', value: pick(['P3', 'P4', 'P5', 'P6', 'P8', 'P10'], rng) },
        { label: 'Độ sáng', value: `${brightOut} nits` },
        { label: 'Chuẩn chống nước', value: 'IP65 / IP54' },
        { label: 'Tần số quét', value: refresh },
        { label: 'Vật liệu', value: 'Nhôm đúc (Die-casting)' },
        { label: 'Nhiệt độ hoạt động', value: '-20°C ~ 60°C' },
        { label: 'Tuổi thọ', value: '100.000 giờ' },
      ];
    case 'hospital-equipment':
      return [
        { label: 'Chuẩn kết nối', value: pick(['IP', 'Analog', 'Digital'], rng) },
        { label: 'Nguồn điện', value: pick(['16V DC', '24V DC', '48V DC'], rng) },
        { label: 'Giao thức', value: 'TCP/IP, RS-485' },
        { label: 'Số kênh hỗ trợ', value: pick(['30', '90', '150', '210'], rng) },
        { label: 'Chứng nhận', value: 'CE, ISO 13485' },
      ];
    case 'technology-equipment':
      return [
        { label: 'Bộ xử lý', value: pick(['Intel i5', 'Intel i7', 'ARM Cortex', 'NVIDIA Jetson'], rng) },
        { label: 'Độ phân giải', value: pick(['1080p', '4K UHD', '8K'], rng) },
        { label: 'Cổng kết nối', value: 'HDMI, DP, USB-C, LAN' },
        { label: 'AI', value: 'Computer Vision, Deep Learning' },
        { label: 'Bảo hành', value: '24 tháng' },
      ];
    case 'education-equipment':
      return [
        { label: 'Kích thước', value: pick(['55"', '65"', '75"', '86"', '98"'], rng) },
        { label: 'Độ phân giải', value: '4K UHD 3840×2160' },
        { label: 'Cảm ứng', value: '20 điểm chạm hồng ngoại' },
        { label: 'Hệ điều hành', value: 'Android 13 + Windows OPS' },
        { label: 'Loa tích hợp', value: '2×15W' },
      ];
    case 'audio-equipment':
      return [
        { label: 'Công suất', value: pick(['200W', '400W', '600W', '4×100W'], rng) },
        { label: 'Dải tần', value: '20Hz - 20kHz' },
        { label: 'Trở kháng', value: '8Ω' },
        { label: 'Kết nối', value: 'XLR, Jack 6.3, DMX' },
      ];
    default:
      return [{ label: 'Xuất xứ', value: pick(COUNTRIES, rng) }];
  }
}

function buildFromManifest(items: ManifestItem[]): Product[] {
  const usedSlugs = new Set<string>();
  return items.map((it, idx) => {
    const rng = seededRandom(it.id);
    let slug = slugify(it.name) || `san-pham-${idx}`;
    if (usedSlugs.has(slug)) slug = `${slug}-${idx}`;
    usedSlugs.add(slug);
    const cat = PRODUCT_CATEGORIES.find((c) => c.slug === it.category);
    const price = Math.round((2 + rng() * 80) * 1_000_000);
    return {
      id: it.id,
      slug,
      name: it.name,
      sku: it.sku,
      category: it.category,
      brand: it.brand,
      country: pick(COUNTRIES, rng),
      warranty: pick(WARRANTIES, rng),
      price,
      shortDescription: `${it.name} — sản phẩm ${cat?.name ?? ''} chính hãng ${it.brand}, phân phối bởi AIO.`,
      description: `${it.name} thuộc dòng ${cat?.name ?? 'thiết bị công nghệ'} do AIO cung cấp. ${LOREM_VI}`,
      image: it.image,
      gallery: [{ url: it.image, alt: it.name, type: 'image' as const }],
      specifications: specFor(it.category, rng),
      documents: [
        { label: `Catalogue ${it.brand}.pdf`, url: '#', sizeKb: 1200 + Math.floor(rng() * 2400) },
        { label: 'Thông số kỹ thuật.pdf', url: '#', sizeKb: 600 + Math.floor(rng() * 800) },
      ],
      applications: PRODUCT_APPLICATIONS[it.category] ?? [],
      tags: [it.brand, cat?.name ?? '', it.category].filter(Boolean),
      status: 'active' as const,
      featured: rng() > 0.82,
      createdAt: new Date(Date.now() - Math.floor(rng() * 600) * 86400000).toISOString(),
      relatedProductIds: [],
      relatedProjectIds: [],
      seo: {
        title: `${it.name} | AIO Digital Solutions`,
        description: `Mua ${it.name} chính hãng ${it.brand}. Báo giá, thông số kỹ thuật và tư vấn lắp đặt từ AIO.`,
        keywords: [it.name, it.brand, cat?.name ?? ''],
      },
    } satisfies Product;
  });
}

/** Synthetic fallback so the catalog always has ≥ 50 products even without ./data. */
function synthFallback(count: number): Product[] {
  const out: Product[] = [];
  for (let i = 0; i < count; i++) {
    const rng = seededRandom(`synth-${i}`);
    const category = ALL_CATEGORIES[i % ALL_CATEGORIES.length];
    const cat = PRODUCT_CATEGORIES.find((c) => c.slug === category)!;
    const name = `${cat.name} AIO Series ${100 + i}`;
    out.push({
      id: `synth--${i}`,
      slug: slugify(name),
      name,
      sku: `AIO-S${1000 + i}`,
      category,
      brand: 'AIO',
      country: pick(COUNTRIES, rng),
      warranty: pick(WARRANTIES, rng),
      price: Math.round((2 + rng() * 60) * 1_000_000),
      shortDescription: `${name} — giải pháp ${cat.name} cao cấp từ AIO.`,
      description: LOREM_VI,
      image: '',
      gallery: [],
      specifications: specFor(category, rng),
      documents: [],
      applications: PRODUCT_APPLICATIONS[category] ?? [],
      tags: [cat.name],
      status: 'active',
      featured: i < 8,
      createdAt: new Date().toISOString(),
      relatedProductIds: [],
      relatedProjectIds: [],
      seo: { title: `${name} | AIO`, description: name },
    });
  }
  return out;
}

const items = (manifest as { items: ManifestItem[] }).items ?? [];
const base = items.length > 0 ? buildFromManifest(items) : synthFallback(60);

// Wire related products (same category neighbours).
export const PRODUCTS: Product[] = base.map((p) => {
  const sameCat = base.filter((o) => o.category === p.category && o.id !== p.id).slice(0, 4);
  return { ...p, relatedProductIds: sameCat.map((o) => o.id) };
});
