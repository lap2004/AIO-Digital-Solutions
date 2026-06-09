/** Shared value objects used across entities. */

export interface SeoMeta {
  title: string;
  description: string;
  ogImage?: string;
  keywords?: string[];
}

export interface MediaAsset {
  url: string;
  alt: string;
  type?: 'image' | 'video';
}

export interface SpecItem {
  label: string;
  value: string;
}

export interface DocumentRef {
  label: string;
  url: string;
  sizeKb?: number;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface QueryParams {
  search?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
  [key: string]: string | number | boolean | undefined;
}
