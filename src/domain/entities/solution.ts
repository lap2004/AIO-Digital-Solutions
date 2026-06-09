import type { SeoMeta } from './common';
import type { ProductCategorySlug } from './product';

export type SolutionSlug =
  | 'indoor-led-display'
  | 'outdoor-led-display'
  | 'control-room-led'
  | 'smart-meeting-room'
  | 'smart-classroom'
  | 'smart-hospital'
  | 'smart-city'
  | 'ai-camera'
  | 'iot-platform'
  | 'digital-signage';

export interface SolutionFeature {
  title: string;
  description: string;
  icon: string;
}

export interface Solution {
  id: string;
  slug: SolutionSlug;
  name: string;
  tagline: string;
  heroImage: string;
  introduction: string;
  benefits: string[];
  features: SolutionFeature[];
  architecture: { title: string; steps: string[] };
  techStack: string[];
  relatedProductCategories: ProductCategorySlug[];
  relatedProjectIds: string[];
  icon: string;
  seo: SeoMeta;
}
