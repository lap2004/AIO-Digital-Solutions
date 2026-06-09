import type { DocumentRef, MediaAsset, SeoMeta, SpecItem } from './common';

export type ProductCategorySlug =
  | 'led-module'
  | 'outdoor-led-module'
  | 'indoor-led-module'
  | 'audio-equipment'
  | 'hospital-equipment'
  | 'technology-equipment'
  | 'education-equipment'
  | 'led-cabinet';

export type ProductStatus = 'active' | 'draft' | 'archived';

export interface ProductCategory {
  slug: ProductCategorySlug;
  name: string;
  description: string;
  icon: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  category: ProductCategorySlug;
  brand: string;
  country: string;
  warranty: string;
  price?: number;
  shortDescription: string;
  description: string;
  image: string;
  gallery: MediaAsset[];
  videoUrl?: string;
  specifications: SpecItem[];
  documents: DocumentRef[];
  applications: string[];
  tags: string[];
  status: ProductStatus;
  featured: boolean;
  createdAt: string;
  relatedProductIds: string[];
  relatedProjectIds: string[];
  seo: SeoMeta;
}
