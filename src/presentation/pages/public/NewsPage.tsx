import { useState } from 'react';
import { Search } from 'lucide-react';
import { NEWS_CATEGORY_LABEL, newsCategoryLabel } from '@/core/constants/catalog';
import type { NewsCategory } from '@/domain/entities';
import { useI18n } from '@/core/i18n';
import { useAsync } from '@/presentation/hooks/useAsync';
import { useDebounce } from '@/presentation/hooks/useDebounce';
import { services } from '@/app/services';
import { Container } from '@/presentation/components/common/Container';
import { Input } from '@/presentation/components/common/Field';
import { Pagination } from '@/presentation/components/common/Pagination';
import { LoadingBlock, EmptyState } from '@/presentation/components/common/Feedback';
import { Seo } from '@/presentation/components/common/Seo';
import { NewsCard } from '@/presentation/components/business/NewsCard';
import { PageHero } from '@/presentation/components/sections/PageHero';
import { ContactCTA } from '@/presentation/components/sections/ContactCTA';
import { cn } from '@/core/utils/cn';

const PAGE_SIZE = 9;
const CATEGORIES = Object.entries(NEWS_CATEGORY_LABEL) as [NewsCategory, string][];

export default function NewsPage() {
  const { t, lang, pick } = useI18n();
  const [category, setCategory] = useState<NewsCategory | ''>('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const debounced = useDebounce(search);

  const { data, loading } = useAsync(
    () => services.news.list({ search: debounced, category: category || undefined, page, pageSize: PAGE_SIZE }),
    [debounced, category, page],
  );

  return (
    <>
      <Seo title="Tin tức | AIO Digital Solutions" description="Tin tức công nghệ LED, AI, IoT, chuyển đổi số và đô thị thông minh." />
      <PageHero
        eyebrow={t('home.newsEyebrow')}
        title={t('news.heroTitle')}
        description={t('news.heroDesc')}
        breadcrumb={[{ label: t('nav./tin-tuc') }]}
      />

      <Container className="pb-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
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
                {newsCategoryLabel(slug, lang)}
              </button>
            ))}
          </div>
          <div className="relative lg:w-72">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input placeholder={t('common.search')} value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-11" />
          </div>
        </div>

        {loading && !data ? (
          <LoadingBlock />
        ) : data && data.items.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.items.map((a) => (
                <NewsCard key={a.id} article={a} />
              ))}
            </div>
            <Pagination page={data.page} pageSize={data.pageSize} total={data.total} onChange={setPage} />
          </>
        ) : (
          <EmptyState title={pick('Không tìm thấy bài viết', 'Article not found')} />
        )}
      </Container>

      <ContactCTA />
    </>
  );
}
