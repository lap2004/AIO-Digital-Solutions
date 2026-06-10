import type { SeoMeta } from './common';

export type NewsCategory =
  | 'led-technology'
  | 'ai'
  | 'iot'
  | 'digital-transformation'
  | 'smart-city'
  | 'projects';

export interface Author {
  name: string;
  role: string;
  avatar?: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  excerpt: string;
  excerptEn?: string;
  content: string;
  contentEn?: string;
  cover: string;
  category: NewsCategory;
  tags: string[];
  author: Author;
  publishedAt: string;
  featured: boolean;
  readingMinutes: number;
  relatedArticleIds: string[];
  seo: SeoMeta;
}
