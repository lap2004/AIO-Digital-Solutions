/**
 * Repository container — the single composition root the presentation layer
 * imports. Swap these implementations for HTTP-backed ones (using httpClient)
 * without touching pages or use-cases.
 */
import {
  brandRepository, jobRepository, leadRepository, newsRepository,
  productRepository, projectRepository, quotationRepository, solutionRepository,
} from './in-memory';

export const repositories = {
  products: productRepository,
  projects: projectRepository,
  news: newsRepository,
  solutions: solutionRepository,
  brands: brandRepository,
  jobs: jobRepository,
  leads: leadRepository,
  quotations: quotationRepository,
};

export type Repositories = typeof repositories;
