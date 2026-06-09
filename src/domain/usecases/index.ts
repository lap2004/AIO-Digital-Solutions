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
  (input: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) =>
    repo.create(input);

export const moveLeadStage =
  (repo: LeadRepository) =>
  (id: string, status: Lead['status']) =>
    repo.update(id, { status });

/** Aggregate dashboard metrics from multiple repositories. */
export interface DashboardStats {
  totalProducts: number;
  totalProjects: number;
  totalNews: number;
  totalLeads: number;
  wonLeads: number;
  pipelineValue: number;
  totalQuotations: number;
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
    };
  };

export type { Product };
