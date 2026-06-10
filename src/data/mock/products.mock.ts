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
        { label: 'Pixel Pitch', labelEn: 'Pixel Pitch', value: pick(['P1.25', 'P1.53', 'P1.86', 'P2', 'P2.5'], rng) },
        { label: 'Độ sáng', labelEn: 'Brightness', value: `${bright} nits` },
        { label: 'Tần số quét', labelEn: 'Refresh Rate', value: refresh },
        { label: 'Kích thước module', labelEn: 'Module Size', value: pick(['320×160mm', '256×128mm', '160×160mm'], rng) },
        { label: 'Tỷ lệ tương phản', labelEn: 'Contrast Ratio', value: '5000:1' },
        { label: 'Góc nhìn', labelEn: 'Viewing Angle', value: '160°/160°' },
        { label: 'Tuổi thọ', labelEn: 'Lifespan', value: '100.000 giờ', valueEn: '100,000 hours' },
      ];
    case 'outdoor-led-module':
    case 'led-cabinet':
      return [
        { label: 'Pixel Pitch', labelEn: 'Pixel Pitch', value: pick(['P3', 'P4', 'P5', 'P6', 'P8', 'P10'], rng) },
        { label: 'Độ sáng', labelEn: 'Brightness', value: `${brightOut} nits` },
        { label: 'Chuẩn chống nước', labelEn: 'Waterproof Rating', value: 'IP65 / IP54' },
        { label: 'Tần số quét', labelEn: 'Refresh Rate', value: refresh },
        { label: 'Vật liệu', labelEn: 'Material', value: 'Nhôm đúc (Die-casting)', valueEn: 'Die-cast Aluminum' },
        { label: 'Nhiệt độ hoạt động', labelEn: 'Operating Temp', value: '-20°C ~ 60°C' },
        { label: 'Tuổi thọ', labelEn: 'Lifespan', value: '100.000 giờ', valueEn: '100,000 hours' },
      ];
    case 'hospital-equipment':
      return [
        { label: 'Chuẩn kết nối', labelEn: 'Connection Standard', value: pick(['IP', 'Analog', 'Digital'], rng) },
        { label: 'Nguồn điện', labelEn: 'Power Supply', value: pick(['16V DC', '24V DC', '48V DC'], rng) },
        { label: 'Giao thức', labelEn: 'Protocol', value: 'TCP/IP, RS-485' },
        { label: 'Số kênh hỗ trợ', labelEn: 'Supported Channels', value: pick(['30', '90', '150', '210'], rng) },
        { label: 'Chứng nhận', labelEn: 'Certification', value: 'CE, ISO 13485' },
      ];
    case 'technology-equipment':
      return [
        { label: 'Bộ xử lý', labelEn: 'Processor', value: pick(['Intel i5', 'Intel i7', 'ARM Cortex', 'NVIDIA Jetson'], rng) },
        { label: 'Độ phân giải', labelEn: 'Resolution', value: pick(['1080p', '4K UHD', '8K'], rng) },
        { label: 'Cổng kết nối', labelEn: 'Ports', value: 'HDMI, DP, USB-C, LAN' },
        { label: 'AI', labelEn: 'AI Features', value: 'Computer Vision, Deep Learning' },
        { label: 'Bảo hành', labelEn: 'Warranty', value: '24 tháng', valueEn: '24 months' },
      ];
    case 'education-equipment':
      return [
        { label: 'Kích thước', labelEn: 'Size', value: pick(['55"', '65"', '75"', '86"', '98"'], rng) },
        { label: 'Độ phân giải', labelEn: 'Resolution', value: '4K UHD 3840×2160' },
        { label: 'Cảm ứng', labelEn: 'Touch Tech', value: '20 điểm chạm hồng ngoại', valueEn: '20-point IR touch' },
        { label: 'Hệ điều hành', labelEn: 'Operating System', value: 'Android 13 + Windows OPS' },
        { label: 'Loa tích hợp', labelEn: 'Built-in Speaker', value: '2×15W' },
      ];
    case 'audio-equipment':
      return [
        { label: 'Công suất', labelEn: 'Power Output', value: pick(['200W', '400W', '600W', '4×100W'], rng) },
        { label: 'Dải tần', labelEn: 'Frequency Range', value: '20Hz - 20kHz' },
        { label: 'Trở kháng', labelEn: 'Impedance', value: '8Ω' },
        { label: 'Kết nối', labelEn: 'Connections', value: 'XLR, Jack 6.3, DMX' },
      ];
    default:
      return [{ label: 'Xuất xứ', labelEn: 'Origin', value: pick(COUNTRIES, rng) }];
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
      nameEn: `[EN] ${it.name}`,
      sku: it.sku,
      category: it.category,
      brand: it.brand,
      country: pick(COUNTRIES, rng),
      warranty: pick(WARRANTIES, rng),
      price,
      shortDescription: `${it.name} — sản phẩm ${cat?.name ?? ''} chính hãng ${it.brand}, phân phối bởi AIO.`,
      shortDescriptionEn: `${it.name} — genuine ${cat?.name ?? ''} product from ${it.brand}, distributed by AIO.`,
      description: `${it.name} thuộc dòng ${cat?.name ?? 'thiết bị công nghệ'} do AIO cung cấp. ${LOREM_VI}`,
      descriptionEn: `${it.name} is a ${cat?.name ?? 'technology device'} provided by AIO. With over a decade of experience, AIO provides turnkey technology solutions.`,
      image: it.image,
      gallery: [{ url: it.image, alt: it.name, type: 'image' as const }],
      specifications: specFor(it.category, rng),
      documents: [
        { label: `Catalogue ${it.brand}.pdf`, labelEn: `Catalogue ${it.brand}.pdf`, url: '#', sizeKb: 1200 + Math.floor(rng() * 2400) },
        { label: 'Thông số kỹ thuật.pdf', labelEn: 'Technical Specs.pdf', url: '#', sizeKb: 600 + Math.floor(rng() * 800) },
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
    const nameEn = `[EN] ${cat.name} AIO Series ${100 + i}`;
    out.push({
      id: `synth--${i}`,
      slug: slugify(name),
      name,
      nameEn,
      sku: `AIO-S${1000 + i}`,
      category,
      brand: 'AIO',
      country: pick(COUNTRIES, rng),
      warranty: pick(WARRANTIES, rng),
      price: Math.round((2 + rng() * 60) * 1_000_000),
      shortDescription: `${name} — giải pháp ${cat.name} cao cấp từ AIO.`,
      shortDescriptionEn: `${nameEn} — premium ${cat.name} solution from AIO.`,
      description: LOREM_VI,
      descriptionEn: `With over a decade of experience, AIO provides turnkey technology solutions.`,
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
