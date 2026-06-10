import type {
  Brand, Job, Lead, NewsArticle, Paginated, Product, Project,
  Quotation, QueryParams, Solution,
} from '@/domain/entities';
import type {
  BrandRepository, JobRepository, LeadRepository, NewsRepository,
  ProductRepository, ProjectRepository, QuotationRepository, SolutionRepository,
} from '@/domain/repositories';
import { PRODUCTS } from '@/data/mock/products.mock';
import { PROJECTS } from '@/data/mock/projects.mock';
import { NEWS } from '@/data/mock/news.mock';
import { SOLUTIONS } from '@/data/mock/solutions.mock';
import { BRANDS } from '@/data/mock/brands.mock';
import { JOBS } from '@/data/mock/jobs.mock';

const delay = <T>(value: T, ms = 120): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

const uid = () => Math.random().toString(36).slice(2, 10);

function paginate<T>(items: T[], params?: QueryParams): Paginated<T> {
  const page = Math.max(1, Number(params?.page ?? 1));
  const pageSize = Math.max(1, Number(params?.pageSize ?? 12));
  const start = (page - 1) * pageSize;
  return { items: items.slice(start, start + pageSize), total: items.length, page, pageSize };
}

function matchSearch(haystack: string, search?: string): boolean {
  if (!search) return true;
  return haystack.toLowerCase().includes(search.toLowerCase());
}

/* ----------------------------- Products ----------------------------- */
class InMemoryProductRepository implements ProductRepository {
  private get data(): Product[] {
    try {
      const stored = localStorage.getItem('aio.products');
      return stored ? JSON.parse(stored) : [...PRODUCTS];
    } catch {
      return [...PRODUCTS];
    }
  }
  private set data(products: Product[]) {
    localStorage.setItem('aio.products', JSON.stringify(products));
  }

  async list(params?: QueryParams): Promise<Paginated<Product>> {
    const current = this.data;
    let items = current.filter((p) => matchSearch(`${p.name} ${p.sku} ${p.brand}`, params?.search));
    if (params?.category) items = items.filter((p) => p.category === params.category);
    if (params?.brand) items = items.filter((p) => p.brand === params.brand);
    if (params?.sort === 'price-asc') items = [...items].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    if (params?.sort === 'price-desc') items = [...items].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    if (params?.sort === 'newest')
      items = [...items].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    return delay(paginate(items, params));
  }
  async getBySlug(slug: string) {
    return delay(this.data.find((p) => p.slug === slug) ?? null);
  }
  async getById(id: string) {
    return delay(this.data.find((p) => p.id === id) ?? null);
  }
  async featured(limit = 8) {
    return delay(this.data.filter((p) => p.featured).slice(0, limit));
  }
  async related(id: string, limit = 4) {
    const current = this.data;
    const product = current.find((p) => p.id === id);
    if (!product) return delay([]);
    const rel = product.relatedProductIds
      .map((rid) => current.find((p) => p.id === rid))
      .filter((p): p is Product => Boolean(p));
    return delay(rel.slice(0, limit));
  }
  async create(input: Omit<Product, 'id'>) {
    const product = { ...input, id: `product-${uid()}` } as Product;
    const current = this.data;
    current.unshift(product);
    this.data = current;
    return delay(product);
  }
  async update(id: string, patch: Partial<Product>) {
    const current = this.data;
    const idx = current.findIndex((p) => p.id === id);
    if (idx < 0) throw new Error('Không tìm thấy sản phẩm');
    current[idx] = { ...current[idx], ...patch };
    this.data = current;
    return delay(current[idx]);
  }
  async remove(id: string) {
    this.data = this.data.filter((p) => p.id !== id);
    return delay(undefined);
  }
}

/* ----------------------------- Projects ----------------------------- */
class InMemoryProjectRepository implements ProjectRepository {
  private get data(): Project[] {
    try {
      const stored = localStorage.getItem('aio.projects');
      return stored ? JSON.parse(stored) : [...PROJECTS];
    } catch {
      return [...PROJECTS];
    }
  }
  private set data(projects: Project[]) {
    localStorage.setItem('aio.projects', JSON.stringify(projects));
  }

  async list(params?: QueryParams): Promise<Paginated<Project>> {
    const current = this.data;
    let items = current.filter((p) => matchSearch(`${p.name} ${p.client} ${p.location}`, params?.search));
    if (params?.category) items = items.filter((p) => p.category === params.category);
    return delay(paginate(items, params));
  }
  async getBySlug(slug: string) {
    return delay(this.data.find((p) => p.slug === slug) ?? null);
  }
  async featured(limit = 6) {
    return delay(this.data.filter((p) => p.featured).slice(0, limit));
  }
  async create(input: Omit<Project, 'id'>) {
    const project = { ...input, id: `project-${uid()}` } as Project;
    const current = this.data;
    current.unshift(project);
    this.data = current;
    return delay(project);
  }
  async update(id: string, patch: Partial<Project>) {
    const current = this.data;
    const idx = current.findIndex((p) => p.id === id);
    if (idx < 0) throw new Error('Không tìm thấy dự án');
    current[idx] = { ...current[idx], ...patch };
    this.data = current;
    return delay(current[idx]);
  }
  async remove(id: string) {
    this.data = this.data.filter((p) => p.id !== id);
    return delay(undefined);
  }
}

/* ------------------------------- News ------------------------------- */
class InMemoryNewsRepository implements NewsRepository {
  private get data(): NewsArticle[] {
    try {
      const stored = localStorage.getItem('aio.news');
      return stored ? JSON.parse(stored) : [...NEWS];
    } catch {
      return [...NEWS];
    }
  }
  private set data(news: NewsArticle[]) {
    localStorage.setItem('aio.news', JSON.stringify(news));
  }

  async list(params?: QueryParams): Promise<Paginated<NewsArticle>> {
    const current = this.data;
    let items = current.filter((a) => matchSearch(`${a.title} ${a.tags.join(' ')}`, params?.search));
    if (params?.category) items = items.filter((a) => a.category === params.category);
    if (params?.tag) items = items.filter((a) => a.tags.includes(String(params.tag)));
    items = [...items].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
    return delay(paginate(items, params));
  }
  async getBySlug(slug: string) {
    return delay(this.data.find((a) => a.slug === slug) ?? null);
  }
  async featured(limit = 4) {
    return delay(this.data.filter((a) => a.featured).slice(0, limit));
  }
  async create(input: Omit<NewsArticle, 'id'>) {
    const article = { ...input, id: `news-${uid()}` } as NewsArticle;
    const current = this.data;
    current.unshift(article);
    this.data = current;
    return delay(article);
  }
  async update(id: string, patch: Partial<NewsArticle>) {
    const current = this.data;
    const idx = current.findIndex((a) => a.id === id);
    if (idx < 0) throw new Error('Không tìm thấy bài viết');
    current[idx] = { ...current[idx], ...patch };
    this.data = current;
    return delay(current[idx]);
  }
  async remove(id: string) {
    this.data = this.data.filter((a) => a.id !== id);
    return delay(undefined);
  }
}

/* ---------------------------- Solutions ----------------------------- */
class InMemorySolutionRepository implements SolutionRepository {
  async list(): Promise<Solution[]> {
    return delay([...SOLUTIONS]);
  }
  async getBySlug(slug: string) {
    return delay(SOLUTIONS.find((s) => s.slug === slug) ?? null);
  }
}

/* ------------------------------ Brands ------------------------------ */
class InMemoryBrandRepository implements BrandRepository {
  async list(): Promise<Brand[]> {
    return delay([...BRANDS]);
  }
}

/* ------------------------------- Jobs ------------------------------- */
class InMemoryJobRepository implements JobRepository {
  private data: Job[] = [...JOBS];
  async list(params?: QueryParams): Promise<Paginated<Job>> {
    let items = this.data.filter((j) => matchSearch(`${j.title} ${j.department} ${j.location}`, params?.search));
    if (params?.department) items = items.filter((j) => j.department === params.department);
    return delay(paginate(items, { ...params, pageSize: params?.pageSize ?? 20 }));
  }
  async getBySlug(slug: string) {
    return delay(this.data.find((j) => j.slug === slug) ?? null);
  }
}

/* ------------------------------ Leads ------------------------------- */
class InMemoryLeadRepository implements LeadRepository {
  private get data(): Lead[] {
    try {
      const stored = localStorage.getItem('aio.leads');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
  private set data(leads: Lead[]) {
    localStorage.setItem('aio.leads', JSON.stringify(leads));
  }
  async list(): Promise<Lead[]> {
    return delay([...this.data]);
  }
  async create(input: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    const lead: Lead = { ...input, id: `lead-${uid()}`, createdAt: now, updatedAt: now };
    const current = this.data;
    current.unshift(lead);
    this.data = current;
    return delay(lead);
  }
  async update(id: string, patch: Partial<Lead>) {
    const current = this.data;
    const idx = current.findIndex((l) => l.id === id);
    if (idx < 0) throw new Error('Không tìm thấy lead');
    current[idx] = { ...current[idx], ...patch, updatedAt: new Date().toISOString() };
    this.data = current;
    return delay(current[idx]);
  }
  async remove(id: string) {
    this.data = this.data.filter((l) => l.id !== id);
    return delay(undefined);
  }
}

/* --------------------------- Quotations ----------------------------- */
class InMemoryQuotationRepository implements QuotationRepository {
  private get data(): Quotation[] {
    try {
      const stored = localStorage.getItem('aio.quotations');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
  private set data(quotations: Quotation[]) {
    localStorage.setItem('aio.quotations', JSON.stringify(quotations));
  }
  async list(): Promise<Quotation[]> {
    return delay([...this.data]);
  }
  async create(input: Omit<Quotation, 'id' | 'code' | 'createdAt'>) {
    const quotation: Quotation = {
      ...input,
      id: `quote-${uid()}`,
      code: `BG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
    };
    const current = this.data;
    current.unshift(quotation);
    this.data = current;
    return delay(quotation);
  }
  async update(id: string, patch: Partial<Quotation>) {
    const current = this.data;
    const idx = current.findIndex((q) => q.id === id);
    if (idx < 0) throw new Error('Không tìm thấy báo giá');
    current[idx] = { ...current[idx], ...patch };
    this.data = current;
    return delay(current[idx]);
  }
  async remove(id: string) {
    this.data = this.data.filter((q) => q.id !== id);
    return delay(undefined);
  }
}

export const productRepository = new InMemoryProductRepository();
export const projectRepository = new InMemoryProjectRepository();
export const newsRepository = new InMemoryNewsRepository();
export const solutionRepository = new InMemorySolutionRepository();
export const brandRepository = new InMemoryBrandRepository();
export const jobRepository = new InMemoryJobRepository();
export const leadRepository = new InMemoryLeadRepository();
export const quotationRepository = new InMemoryQuotationRepository();
