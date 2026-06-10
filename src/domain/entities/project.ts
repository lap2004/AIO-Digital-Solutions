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
  nameEn?: string;
  category: ProjectCategory;
  client: string;
  clientEn?: string;
  location: string;
  locationEn?: string;
  description: string;
  descriptionEn?: string;
  challenge: string;
  challengeEn?: string;
  solution: string;
  solutionEn?: string;
  cover: string;
  gallery: MediaAsset[];
  videoUrl?: string;
  technologies: string[];
  scale: string;
  scaleEn?: string;
  area: string;
  areaEn?: string;
  completedAt: string;
  featured: boolean;
  relatedProductIds: string[];
  seo: SeoMeta;
}
