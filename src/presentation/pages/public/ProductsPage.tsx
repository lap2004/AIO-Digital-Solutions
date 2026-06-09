import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { PRODUCT_CATEGORIES, productCategoryLabel } from '@/core/constants/catalog';
import { useI18n } from '@/core/i18n';
import { useAsync } from '@/presentation/hooks/useAsync';
import { useDebounce } from '@/presentation/hooks/useDebounce';
import { services } from '@/app/services';
import { Container } from '@/presentation/components/common/Container';
import { Input, Select } from '@/presentation/components/common/Field';
import { Pagination } from '@/presentation/components/common/Pagination';
import { LoadingBlock, EmptyState } from '@/presentation/components/common/Feedback';
import { Seo } from '@/presentation/components/common/Seo';
import { ProductCard } from '@/presentation/components/business/ProductCard';
import { PageHero } from '@/presentation/components/sections/PageHero';
import { ContactCTA } from '@/presentation/components/sections/ContactCTA';
import { cn } from '@/core/utils/cn';

const PAGE_SIZE = 12;

export default function ProductsPage() {
  const { t, lang } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') ?? '';
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const debounced = useDebounce(search);

  const { data, loading } = useAsync(
    () => services.products.list({ search: debounced, category: category || undefined, sort, page, pageSize: PAGE_SIZE }),
    [debounced, category, sort, page],
  );

  const setCategory = (slug: string) => {
    setPage(1);
    setSearchParams(slug ? { category: slug } : {});
  };

  const activeCat = useMemo(() => PRODUCT_CATEGORIES.find((c) => c.slug === category), [category]);

  return (
    <>
      <Seo title="Sản phẩm | AIO Digital Solutions" description="Danh mục sản phẩm LED, thiết bị bệnh viện, giáo dục và công nghệ chính hãng." />
      <PageHero
        eyebrow={t('home.productsEyebrow')}
        title={activeCat ? productCategoryLabel(activeCat.slug, lang) : t('products.heroTitle')}
        description={activeCat ? activeCat.description : t('products.heroDesc')}
        breadcrumb={[{ label: t('nav./san-pham') }]}
      />

      <Container className="pt-6 pb-10 lg:pt-8 lg:pb-16">
        {/* Category chips */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setCategory('')}
            className={cn(
              'whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300',
              !category
                ? 'border-transparent bg-brand-gradient text-white shadow-glow'
                : 'border-white/10 bg-white/5 text-ink hover:border-brand-accent/50 hover:bg-white/10 hover:text-white',
            )}
          >
            {t('products.all')}
          </button>
          {PRODUCT_CATEGORIES.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategory(c.slug)}
              className={cn(
                'whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300',
                category === c.slug
                  ? 'border-transparent bg-brand-gradient text-white shadow-glow'
                  : 'border-white/10 bg-white/5 text-ink hover:border-brand-accent/50 hover:bg-white/10 hover:text-white',
              )}
            >
              {productCategoryLabel(c.slug, lang)}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input
              placeholder={t('common.search')}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-11"
            />
          </div>
          <Select value={sort} onChange={(e) => setSort(e.target.value)} className="sm:w-56">
            <option value="newest">{t('products.sortNewest')}</option>
            <option value="price-asc">{t('products.sortPriceAsc')}</option>
            <option value="price-desc">{t('products.sortPriceDesc')}</option>
          </Select>
        </div>

        {loading && !data ? (
          <LoadingBlock />
        ) : data && data.items.length > 0 ? (
          <>
            <p className="mb-6 text-sm text-muted">{t('products.found')} {data.total} {t('products.productsUnit')}</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <Pagination page={data.page} pageSize={data.pageSize} total={data.total} onChange={setPage} />
          </>
        ) : (
          <EmptyState title={t('products.empty')} />
        )}
      </Container>

      <ContactCTA />
    </>
  );
}
