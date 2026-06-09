import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '@/core/constants/catalog';
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
        eyebrow="Sản phẩm"
        title={activeCat ? activeCat.name : 'Danh mục sản phẩm'}
        description={activeCat?.description ?? 'Hơn 250 sản phẩm chính hãng thuộc 8 nhóm ngành công nghệ.'}
        breadcrumb={[{ label: 'Sản phẩm' }]}
      />

      <Container className="pb-10">
        {/* Category chips */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setCategory('')}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition',
              !category ? 'border-transparent bg-brand-gradient text-white' : 'border-white/10 text-ink hover:border-brand-accent/50',
            )}
          >
            Tất cả
          </button>
          {PRODUCT_CATEGORIES.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCategory(c.slug)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition',
                category === c.slug ? 'border-transparent bg-brand-gradient text-white' : 'border-white/10 text-ink hover:border-brand-accent/50',
              )}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input
              placeholder="Tìm kiếm sản phẩm, SKU, thương hiệu…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-11"
            />
          </div>
          <Select value={sort} onChange={(e) => setSort(e.target.value)} className="sm:w-56">
            <option value="newest">Mới nhất</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
          </Select>
        </div>

        {loading && !data ? (
          <LoadingBlock />
        ) : data && data.items.length > 0 ? (
          <>
            <p className="mb-6 text-sm text-muted">Tìm thấy {data.total} sản phẩm</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <Pagination page={data.page} pageSize={data.pageSize} total={data.total} onChange={setPage} />
          </>
        ) : (
          <EmptyState title="Không tìm thấy sản phẩm" description="Thử thay đổi từ khóa hoặc bộ lọc danh mục." />
        )}
      </Container>

      <ContactCTA />
    </>
  );
}
