import type { NewsArticle, NewsCategory } from '@/domain/entities';
import { slugify, seededRandom, pick } from '@/core/utils/slug';
import { NEWS_TITLE_TEMPLATES, AUTHORS, TECH_TERMS, LOREM_VI } from './seed';
import { PRODUCTS } from './products.mock';

const CATEGORIES: NewsCategory[] = [
  'led-technology', 'ai', 'iot', 'digital-transformation', 'smart-city', 'projects',
];

const productImages = PRODUCTS.filter((p) => p.image).map((p) => p.image);

const paragraph = (rng: () => number) =>
  `${LOREM_VI} Công nghệ ${pick(TECH_TERMS, rng)} kết hợp ${pick(TECH_TERMS, rng)} đang mở ra hướng tiếp cận mới cho doanh nghiệp Việt Nam.`;

const paragraphEn = (rng: () => number) =>
  `With over a decade of experience, AIO provides turnkey technology solutions. The technology ${pick(TECH_TERMS, rng)} combined with ${pick(TECH_TERMS, rng)} is opening up new approaches for businesses.`;

export const NEWS: NewsArticle[] = Array.from({ length: 54 }, (_, i) => {
  const rng = seededRandom(`news-${i}`);
  const template = NEWS_TITLE_TEMPLATES[i % NEWS_TITLE_TEMPLATES.length];
  const title = template.replace('{x}', pick(['P1.25', 'Common Cathode', 'ngoài trời', 'COB'], rng)) + ` (#${i + 1})`;
  const titleEn = `[EN] ${title}`;
  const category = CATEGORIES[i % CATEGORIES.length];
  const author = pick(AUTHORS, rng);
  const day = 1 + Math.floor(rng() * 28);
  const month = 1 + Math.floor(rng() * 12);
  const content = Array.from({ length: 5 }, () => paragraph(rng)).join('\n\n');
  const contentEn = Array.from({ length: 5 }, () => paragraphEn(rng)).join('\n\n');

  return {
    id: `news-${i}`,
    slug: `${slugify(template).slice(0, 50)}-${i}`,
    title,
    titleEn,
    excerpt: `${paragraph(rng).slice(0, 160)}…`,
    excerptEn: `${paragraphEn(rng).slice(0, 160)}…`,
    content,
    contentEn,
    cover: productImages.length ? productImages[(i * 3) % productImages.length] : '',
    category,
    tags: [pick(TECH_TERMS, rng), pick(TECH_TERMS, rng)],
    author: { name: author.name, role: author.role },
    publishedAt: `2025-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    featured: rng() > 0.8,
    readingMinutes: 3 + Math.floor(rng() * 6),
    relatedArticleIds: [],
    seo: { title: `${title} | Tin tức AIO`, description: title },
  } satisfies NewsArticle;
}).map((article, _i, all) => ({
  ...article,
  relatedArticleIds: all
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3)
    .map((a) => a.id),
}));
