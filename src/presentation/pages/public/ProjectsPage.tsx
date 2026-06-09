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
import { cn } from '@/core/utils/cn';

const PAGE_SIZE = 9;
const CATEGORIES = Object.entries(PROJECT_CATEGORY_LABEL) as [ProjectCategory, string][];

export default function ProjectsPage() {
  const { t, lang } = useI18n();
  const [category, setCategory] = useState<ProjectCategory | ''>('');
  const [page, setPage] = useState(1);

  const { data, loading } = useAsync(
    () => services.projects.list({ category: category || undefined, page, pageSize: PAGE_SIZE }),
    [category, page],
  );

  return (
    <>
      <Seo title="Dự án | AIO Digital Solutions" description="Các dự án màn hình LED, Smart City, bệnh viện và doanh nghiệp tiêu biểu do AIO triển khai." />
      <PageHero
        eyebrow={t('home.projectsEyebrow')}
        title={t('projects.heroTitle')}
        description={t('projects.heroDesc')}
        breadcrumb={[{ label: t('nav./du-an') }]}
      />

      <Container className="pb-10">
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => { setCategory(''); setPage(1); }}
            className={cn('rounded-full border px-4 py-2 text-sm font-medium transition', !category ? 'border-transparent bg-brand-gradient text-white' : 'border-white/10 text-ink hover:border-brand-accent/50')}
          >
            {t('products.all')}
          </button>
          {CATEGORIES.map(([slug]) => (
            <button
              key={slug}
              onClick={() => { setCategory(slug); setPage(1); }}
              className={cn('rounded-full border px-4 py-2 text-sm font-medium transition', category === slug ? 'border-transparent bg-brand-gradient text-white' : 'border-white/10 text-ink hover:border-brand-accent/50')}
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
          <EmptyState title="Chưa có dự án" />
        )}
      </Container>

      <ContactCTA />
    </>
  );
}
