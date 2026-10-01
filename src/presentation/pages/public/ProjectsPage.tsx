import { useState } from 'react';
import { PROJECT_CATEGORY_LABEL, projectCategoryLabel } from '@/core/constants/catalog';
import type { ProjectCategory } from '@/domain/entities';
import { useI18n } from '@/core/i18n';
import { useAsync } from '@/presentation/hooks/useAsync';
import { Container } from '@/presentation/components/common/Container';
import { Pagination } from '@/presentation/components/common/Pagination';
import { LoadingBlock, EmptyState } from '@/presentation/components/common/Feedback';
import { Seo } from '@/presentation/components/common/Seo';
import { services } from '@/app/services';
import { ProjectCard } from '@/presentation/components/business/ProjectCard';
import { PageHero } from '@/presentation/components/sections/PageHero';
import { ContactCTA } from '@/presentation/components/sections/ContactCTA';
import { FeaturedProjectsMedia } from '@/presentation/components/business/FeaturedProjectsMedia';
import { cn } from '@/core/utils/cn';

const PAGE_SIZE = 9;
const CATEGORIES = Object.entries(PROJECT_CATEGORY_LABEL) as [ProjectCategory, string][];

export default function ProjectsPage() {
  const { t, lang, pick } = useI18n();
  const [category, setCategory] = useState<ProjectCategory | ''>('');
  const [page, setPage] = useState(1);

  const { data, loading } = useAsync(
    () => services.projects.list({ category: category || undefined, page, pageSize: PAGE_SIZE }),
    [category, page],
  );

  return (
    <>
      <Seo title="Dự án thực tế | AIO Digital Solutions" description="Tổng hợp video và hình ảnh các công trình màn hình LED, LCD ghép, Standee do AIO LED hoàn thành trên 34+ tỉnh thành." />
      <PageHero
        eyebrow="300+ CÔNG TRÌNH HOÀN THÀNH"
        title="Dự Án Đã Triển Khai Thực Tế"
        description="Trực quan video ghi hình hiện trường và album ảnh thực tế các công trình màn hình LED, LCD ghép, Standee do AIO LED trực tiếp hoàn thiện và bàn giao."
        breadcrumb={[{ label: t('nav./du-an') }]}
      />

      {/* 6-Video & Photo Auto-Scroll Carousel */}
      <FeaturedProjectsMedia showHeader={false} />

      <Container className="pt-10 pb-10 lg:pt-14 lg:pb-16 border-t border-surface-800/60">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-ink mb-2">Tra Cứu Danh Mục Công Trình</h3>
          <p className="text-xs text-muted">Lọc theo loại hình màn hình và lĩnh vực ứng dụng</p>
        </div>
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <button
            onClick={() => { setCategory(''); setPage(1); }}
            className={cn(
              'whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300',
              !category
                ? 'border-transparent bg-brand-gradient text-slate-950 font-bold shadow-md'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-cyan-500 hover:text-cyan-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-brand-accent/50 dark:hover:text-white',
            )}
          >
            {t('products.all')}
          </button>
          {CATEGORIES.map(([slug]) => (
            <button
              key={slug}
              onClick={() => { setCategory(slug); setPage(1); }}
              className={cn(
                'whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300',
                category === slug
                  ? 'border-transparent bg-brand-gradient text-slate-950 font-bold shadow-md'
                  : 'border border-slate-200 bg-white text-slate-700 hover:border-cyan-500 hover:text-cyan-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-brand-accent/50 dark:hover:text-white',
              )}
            >
              {projectCategoryLabel(slug, lang)}
            </button>
          ))}
        </div>

        {loading && !data ? (
          <LoadingBlock />
        ) : data && data.items.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.items.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
            <Pagination page={data.page} pageSize={data.pageSize} total={data.total} onChange={setPage} />
          </>
        ) : (
          <EmptyState title={pick('Chưa có dự án', 'No projects yet')} />
        )}
      </Container>

      <ContactCTA />
    </>
  );
}
