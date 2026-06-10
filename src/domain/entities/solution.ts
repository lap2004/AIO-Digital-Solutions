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
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  icon: string;
}

export interface Solution {
  id: string;
  slug: SolutionSlug;
  name: string;
  nameEn?: string;
  tagline: string;
  taglineEn?: string;
  heroImage: string;
  introduction: string;
  introductionEn?: string;
  benefits: string[];
  benefitsEn?: string[];
  features: SolutionFeature[];
  architecture: { title: string; titleEn?: string; steps: string[]; stepsEn?: string[] };
  techStack: string[];
  relatedProductCategories: ProductCategorySlug[];
  relatedProjectIds: string[];
  icon: string;
  seo: SeoMeta;
}
