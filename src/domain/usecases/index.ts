/**
 * Use-cases — application business rules.
 * Each is a thin, testable function that orchestrates one or more repositories.
 * Presentation never talks to repositories directly; it goes through these.
 */
import type {
  Lead,
  Product,
  QueryParams,
} from '@/domain/entities';
import type {
  LeadRepository,
  NewsRepository,
  ProductRepository,
  ProjectRepository,
  QuotationRepository,
  SolutionRepository,
} from '@/domain/repositories';

export const getProducts = (repo: ProductRepository) => (params?: QueryParams) => repo.list(params);
export const getProductBySlug = (repo: ProductRepository) => (slug: string) => repo.getBySlug(slug);
export const getFeaturedProducts = (repo: ProductRepository) => (limit?: number) => repo.featured(limit);
export const getRelatedProducts = (repo: ProductRepository) => (id: string, limit?: number) =>
  repo.related(id, limit);

export const getProjects = (repo: ProjectRepository) => (params?: QueryParams) => repo.list(params);
export const getProjectBySlug = (repo: ProjectRepository) => (slug: string) => repo.getBySlug(slug);

export const getNews = (repo: NewsRepository) => (params?: QueryParams) => repo.list(params);
export const getArticleBySlug = (repo: NewsRepository) => (slug: string) => repo.getBySlug(slug);

export const getSolutions = (repo: SolutionRepository) => () => repo.list();
export const getSolutionBySlug = (repo: SolutionRepository) => (slug: string) => repo.getBySlug(slug);

export const submitLead =
  (repo: LeadRepository) =>
  async (input: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
    const existing = await repo.list();
    const duplicate = existing.find((l) => l.email === input.email || l.phone === input.phone);
    if (duplicate) {
      throw new Error('Email hoặc số điện thoại này đã được đăng ký. Chúng tôi sẽ sớm liên hệ lại với bạn!');
    }
    return repo.create(input);
  };

export const moveLeadStage =
  (repo: LeadRepository) =>
  (id: string, status: Lead['status']) =>
    repo.update(id, { status });

/** Aggregate dashboard metrics from multiple repositories. */
export interface RevenueData {
  month: string;
  value: number;
}
export interface DashboardStats {
  totalProducts: number;
  totalProjects: number;
  totalNews: number;
  totalLeads: number;
  wonLeads: number;
  pipelineValue: number;
  totalQuotations: number;
  totalVisitors: number;
  revenueData: RevenueData[];
}

export const getDashboardStats =
  (deps: {
    products: ProductRepository;
    projects: ProjectRepository;
    news: NewsRepository;
    leads: LeadRepository;
    quotations: QuotationRepository;
  }) =>
  async (): Promise<DashboardStats> => {
    const [products, projects, news, leads, quotations] = await Promise.all([
      deps.products.list({ pageSize: 1 }),
      deps.projects.list({ pageSize: 1 }),
      deps.news.list({ pageSize: 1 }),
      deps.leads.list(),
      deps.quotations.list(),
    ]);
    return {
      totalProducts: products.total,
      totalProjects: projects.total,
      totalNews: news.total,
      totalLeads: leads.length,
      wonLeads: leads.filter((l) => l.status === 'won').length,
      pipelineValue: leads
        .filter((l) => l.status !== 'lost')
        .reduce((s, l) => s + l.estimatedValue, 0),
      totalQuotations: quotations.length,
      totalVisitors: (() => {
        try {
          const sessions = JSON.parse(localStorage.getItem('aio.active_sessions') || '{}');
          const now = Date.now();
          return Object.values(sessions).filter((time: any) => now - time < 5000).length || 1;
        } catch {
          return 1;
        }
      })(),
      revenueData: (() => {
        const map = new Map<string, number>();
        for (let i = 1; i <= 12; i++) map.set(`T${i}`, 0);
        leads.forEach((l) => {
          if (l.status === 'won') {
            const date = new Date(l.updatedAt);
            const m = `T${date.getMonth() + 1}`;
            map.set(m, (map.get(m) || 0) + l.estimatedValue / 1_000_000_000);
          }
        });
        return Array.from(map.entries()).map(([month, val]) => ({ month, value: Number(val.toFixed(2)) }));
      })(),
    };
  };

export type { Product };
