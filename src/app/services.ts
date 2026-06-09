/**
 * Application service layer — binds use-cases to the concrete repository
 * container. Pages import `services` and never touch repositories directly,
 * keeping the dependency direction Presentation → UseCase → Repository.
 */
import { repositories } from '@/data/repositories';
import {
  getArticleBySlug, getDashboardStats, getFeaturedProducts, getNews, getProductBySlug,
  getProducts, getProjectBySlug, getProjects, getRelatedProducts, getSolutionBySlug,
  getSolutions, moveLeadStage, submitLead,
} from '@/domain/usecases';

export const services = {
  // catalog
  products: {
    list: getProducts(repositories.products),
    getBySlug: getProductBySlug(repositories.products),
    featured: getFeaturedProducts(repositories.products),
    related: getRelatedProducts(repositories.products),
    getById: (id: string) => repositories.products.getById(id),
    repo: repositories.products,
  },
  projects: {
    list: getProjects(repositories.projects),
    getBySlug: getProjectBySlug(repositories.projects),
    featured: (n?: number) => repositories.projects.featured(n),
    repo: repositories.projects,
  },
  news: {
    list: getNews(repositories.news),
    getBySlug: getArticleBySlug(repositories.news),
    featured: (n?: number) => repositories.news.featured(n),
    repo: repositories.news,
  },
  solutions: {
    list: getSolutions(repositories.solutions),
    getBySlug: getSolutionBySlug(repositories.solutions),
  },
  brands: { list: () => repositories.brands.list() },
  jobs: {
    list: (params?: Parameters<typeof repositories.jobs.list>[0]) => repositories.jobs.list(params),
    getBySlug: (slug: string) => repositories.jobs.getBySlug(slug),
  },
  leads: {
    list: () => repositories.leads.list(),
    submit: submitLead(repositories.leads),
    move: moveLeadStage(repositories.leads),
    update: (id: string, patch: Parameters<typeof repositories.leads.update>[1]) =>
      repositories.leads.update(id, patch),
    remove: (id: string) => repositories.leads.remove(id),
  },
  quotations: {
    list: () => repositories.quotations.list(),
    update: (id: string, patch: Parameters<typeof repositories.quotations.update>[1]) =>
      repositories.quotations.update(id, patch),
    create: (input: Parameters<typeof repositories.quotations.create>[0]) =>
      repositories.quotations.create(input),
  },
  dashboard: getDashboardStats(repositories),
};
