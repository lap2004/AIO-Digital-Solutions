import type { MediaAsset, SeoMeta } from './common';

export type ProjectCategory =
  | 'government'
  | 'education'
  | 'hospital'
  | 'factory'
  | 'enterprise'
  | 'shopping-mall'
  | 'stadium';

export interface Project {
  id: string;
  slug: string;
  name: string;
  category: ProjectCategory;
  client: string;
  location: string;
  description: string;
  challenge: string;
  solution: string;
  cover: string;
  gallery: MediaAsset[];
  videoUrl?: string;
  technologies: string[];
  scale: string;
  area: string;
  completedAt: string;
  featured: boolean;
  relatedProductIds: string[];
  seo: SeoMeta;
}
