import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '@/presentation/layouts/PublicLayout';
import { AdminLayout } from '@/presentation/layouts/AdminLayout';

// Public pages (code-split)
const HomePage = lazy(() => import('@/presentation/pages/public/HomePage'));
const AboutPage = lazy(() => import('@/presentation/pages/public/AboutPage'));
const SolutionsPage = lazy(() => import('@/presentation/pages/public/SolutionsPage'));
const SolutionDetailPage = lazy(() => import('@/presentation/pages/public/SolutionDetailPage'));
const ProductsPage = lazy(() => import('@/presentation/pages/public/ProductsPage'));
const ProductDetailPage = lazy(() => import('@/presentation/pages/public/ProductDetailPage'));
const ProjectsPage = lazy(() => import('@/presentation/pages/public/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('@/presentation/pages/public/ProjectDetailPage'));
const NewsPage = lazy(() => import('@/presentation/pages/public/NewsPage'));
const NewsDetailPage = lazy(() => import('@/presentation/pages/public/NewsDetailPage'));
const RecruitmentPage = lazy(() => import('@/presentation/pages/public/RecruitmentPage'));
const JobDetailPage = lazy(() => import('@/presentation/pages/public/JobDetailPage'));
const ContactPage = lazy(() => import('@/presentation/pages/public/ContactPage'));
const QuotePage = lazy(() => import('@/presentation/pages/public/QuotePage'));
const NotFoundPage = lazy(() => import('@/presentation/pages/public/NotFoundPage'));

// Admin pages (code-split)
const LoginPage = lazy(() => import('@/presentation/pages/admin/LoginPage'));
const DashboardPage = lazy(() => import('@/presentation/pages/admin/DashboardPage'));
const AdminProductsPage = lazy(() => import('@/presentation/pages/admin/AdminProductsPage'));
const AdminProjectsPage = lazy(() => import('@/presentation/pages/admin/AdminProjectsPage'));
const AdminNewsPage = lazy(() => import('@/presentation/pages/admin/AdminNewsPage'));
const AdminCrmPage = lazy(() => import('@/presentation/pages/admin/AdminCrmPage'));
const AdminQuotationsPage = lazy(() => import('@/presentation/pages/admin/AdminQuotationsPage'));

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/gioi-thieu', element: <AboutPage /> },
      { path: '/giai-phap', element: <SolutionsPage /> },
      { path: '/giai-phap/:slug', element: <SolutionDetailPage /> },
      { path: '/san-pham', element: <ProductsPage /> },
      { path: '/san-pham/:slug', element: <ProductDetailPage /> },
      { path: '/du-an', element: <ProjectsPage /> },
      { path: '/du-an/:slug', element: <ProjectDetailPage /> },
      { path: '/tin-tuc', element: <NewsPage /> },
      { path: '/tin-tuc/:slug', element: <NewsDetailPage /> },
      { path: '/tuyen-dung', element: <RecruitmentPage /> },
      { path: '/tuyen-dung/:slug', element: <JobDetailPage /> },
      { path: '/lien-he', element: <ContactPage /> },
      { path: '/bao-gia', element: <QuotePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  { path: '/admin/login', element: <LoginPage /> },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'san-pham', element: <AdminProductsPage /> },
      { path: 'du-an', element: <AdminProjectsPage /> },
      { path: 'tin-tuc', element: <AdminNewsPage /> },
      { path: 'crm', element: <AdminCrmPage /> },
      { path: 'bao-gia', element: <AdminQuotationsPage /> },
    ],
  },
]);
