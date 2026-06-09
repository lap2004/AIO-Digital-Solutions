import type {
  Brand,
  Job,
  Lead,
  NewsArticle,
  Paginated,
  Product,
  Project,
  Quotation,
  QueryParams,
  Solution,
} from '@/domain/entities';

/** Read-only catalog repositories (public site). */
export interface ProductRepository {
  list(params?: QueryParams): Promise<Paginated<Product>>;
  getBySlug(slug: string): Promise<Product | null>;
  getById(id: string): Promise<Product | null>;
  featured(limit?: number): Promise<Product[]>;
  related(id: string, limit?: number): Promise<Product[]>;
  // CRUD (admin)
  create(input: Omit<Product, 'id'>): Promise<Product>;
  update(id: string, patch: Partial<Product>): Promise<Product>;
  remove(id: string): Promise<void>;
}

export interface ProjectRepository {
  list(params?: QueryParams): Promise<Paginated<Project>>;
  getBySlug(slug: string): Promise<Project | null>;
  featured(limit?: number): Promise<Project[]>;
  create(input: Omit<Project, 'id'>): Promise<Project>;
  update(id: string, patch: Partial<Project>): Promise<Project>;
  remove(id: string): Promise<void>;
}

export interface NewsRepository {
  list(params?: QueryParams): Promise<Paginated<NewsArticle>>;
  getBySlug(slug: string): Promise<NewsArticle | null>;
  featured(limit?: number): Promise<NewsArticle[]>;
  create(input: Omit<NewsArticle, 'id'>): Promise<NewsArticle>;
  update(id: string, patch: Partial<NewsArticle>): Promise<NewsArticle>;
  remove(id: string): Promise<void>;
}

export interface SolutionRepository {
  list(): Promise<Solution[]>;
  getBySlug(slug: string): Promise<Solution | null>;
}

export interface BrandRepository {
  list(): Promise<Brand[]>;
}

export interface JobRepository {
  list(params?: QueryParams): Promise<Paginated<Job>>;
  getBySlug(slug: string): Promise<Job | null>;
}

export interface LeadRepository {
  list(): Promise<Lead[]>;
  create(input: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lead>;
  update(id: string, patch: Partial<Lead>): Promise<Lead>;
  remove(id: string): Promise<void>;
}

export interface QuotationRepository {
  list(): Promise<Quotation[]>;
  create(input: Omit<Quotation, 'id' | 'code' | 'createdAt'>): Promise<Quotation>;
  update(id: string, patch: Partial<Quotation>): Promise<Quotation>;
  remove(id: string): Promise<void>;
}
