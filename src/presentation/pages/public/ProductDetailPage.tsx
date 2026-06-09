import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { FileText, ShieldCheck, Globe, Tag, Minus, Plus, FileDown } from 'lucide-react';
import { useAsync } from '@/presentation/hooks/useAsync';
import { services } from '@/app/services';
import { useQuoteStore } from '@/presentation/state/quote.store';
import { PRODUCT_CATEGORY_LABEL } from '@/core/constants/catalog';
import { formatCurrency } from '@/core/utils/format';
import { Container } from '@/presentation/components/common/Container';
import { Button } from '@/presentation/components/common/Button';
import { Badge } from '@/presentation/components/common/Badge';
import { SmartImage } from '@/presentation/components/common/SmartImage';
import { LoadingBlock, EmptyState } from '@/presentation/components/common/Feedback';
import { SectionHeader } from '@/presentation/components/common/SectionHeader';
import { Seo } from '@/presentation/components/common/Seo';
import { Breadcrumb } from '@/presentation/components/sections/Breadcrumb';
import { ProductCard } from '@/presentation/components/business/ProductCard';
import { ContactCTA } from '@/presentation/components/sections/ContactCTA';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [qty, setQty] = useState(1);
  const addToQuote = useQuoteStore((s) => s.add);

  const { data: product, loading } = useAsync(() => services.products.getBySlug(slug ?? ''), [slug]);
  const { data: related } = useAsync(
    () => (product ? services.products.related(product.id, 4) : Promise.resolve([])),
    [product?.id],
  );

  if (loading) return <div className="pt-32"><LoadingBlock /></div>;
  if (!product)
    return (
      <div className="pt-40">
        <Container>
          <EmptyState title="Không tìm thấy sản phẩm" action={<Link to="/san-pham"><Button className="mt-4">Về danh mục</Button></Link>} />
        </Container>
      </div>
    );

  const handleAdd = () => {
    addToQuote({ id: product.id, name: product.name, image: product.image }, qty);
    toast.success(`Đã thêm "${product.name}" vào yêu cầu báo giá`);
  };

  return (
    <>
      <Seo
        title={product.seo.title}
        description={product.seo.description}
        image={product.image}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          sku: product.sku,
          brand: { '@type': 'Brand', name: product.brand },
          description: product.shortDescription,
        }}
      />

      <section className="pt-28">
        <Container>
          <Breadcrumb
            items={[
              { label: 'Sản phẩm', to: '/san-pham' },
              { label: PRODUCT_CATEGORY_LABEL[product.category], to: `/san-pham?category=${product.category}` },
              { label: product.name },
            ]}
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            {/* Gallery */}
            <div>
              <div className="aspect-square overflow-hidden rounded-3xl border border-white/10 bg-[#020617]">
                <SmartImage src={product.image} alt={product.name} eager className="h-full w-full object-cover" />
              </div>
              {product.gallery.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {product.gallery.map((g, i) => (
                    <div key={i} className="aspect-square overflow-hidden rounded-xl border border-white/10 bg-[#020617]">
                      <SmartImage src={g.url} alt={g.alt} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="brand">{PRODUCT_CATEGORY_LABEL[product.category]}</Badge>
                <Badge>{product.brand}</Badge>
                {product.featured && <Badge tone="warning">Nổi bật</Badge>}
              </div>
              <h1 className="mt-4 text-3xl font-bold leading-tight">{product.name}</h1>
              <p className="mt-4 leading-relaxed text-muted">{product.shortDescription}</p>

              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-ink"><Tag className="h-4 w-4 text-brand-accent" /> SKU: {product.sku}</div>
                <div className="flex items-center gap-2 text-ink"><Globe className="h-4 w-4 text-brand-accent" /> Xuất xứ: {product.country}</div>
                <div className="flex items-center gap-2 text-ink"><ShieldCheck className="h-4 w-4 text-brand-accent" /> Bảo hành: {product.warranty}</div>
                <div className="flex items-center gap-2 text-ink"><FileText className="h-4 w-4 text-brand-accent" /> {product.brand}</div>
              </div>

              {product.price ? (
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <span className="text-sm text-muted">Giá tham khảo</span>
                  <div className="text-2xl font-bold text-gradient">{formatCurrency(product.price)}</div>
                  <span className="text-xs text-muted">(Liên hệ để nhận báo giá tốt nhất theo dự án)</span>
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="flex items-center rounded-xl border border-white/10">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-12 w-12 items-center justify-center text-ink hover:text-white" aria-label="Giảm">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-semibold text-white">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="flex h-12 w-12 items-center justify-center text-ink hover:text-white" aria-label="Tăng">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <Button size="lg" onClick={handleAdd}>
                  <FileText className="h-5 w-5" /> Thêm vào báo giá
                </Button>
                <Link to="/lien-he">
                  <Button size="lg" variant="outline">Tư vấn ngay</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-16 grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div>
              <h2 className="text-2xl font-bold">Mô tả sản phẩm</h2>
              <p className="mt-4 leading-relaxed text-muted">{product.description}</p>

              {product.applications.length > 0 && (
                <>
                  <h3 className="mt-8 text-xl font-bold">Ứng dụng</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.applications.map((a) => (
                      <Badge key={a} tone="info">{a}</Badge>
                    ))}
                  </div>
                </>
              )}

              <h3 className="mt-8 text-xl font-bold">Thông số kỹ thuật</h3>
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full text-sm">
                  <tbody>
                    {product.specifications.map((s, i) => (
                      <tr key={s.label} className={i % 2 === 0 ? 'bg-white/[0.03]' : ''}>
                        <td className="w-1/2 px-5 py-3 font-medium text-ink">{s.label}</td>
                        <td className="px-5 py-3 text-white">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <aside>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-bold text-white">Tài liệu kỹ thuật</h3>
                <ul className="mt-4 space-y-3">
                  {product.documents.length ? (
                    product.documents.map((d) => (
                      <li key={d.label}>
                        <a href={d.url} className="flex items-center gap-3 rounded-xl border border-white/10 p-3 text-sm transition hover:border-brand-accent/40">
                          <FileDown className="h-5 w-5 text-brand-accent" />
                          <span className="flex-1 text-ink">{d.label}</span>
                          {d.sizeKb && <span className="text-xs text-muted">{Math.round(d.sizeKb / 1024 * 10) / 10} MB</span>}
                        </a>
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-muted">Liên hệ để nhận tài liệu chi tiết.</li>
                  )}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {related && related.length > 0 && (
        <section className="py-20">
          <Container>
            <SectionHeader align="left" eyebrow="Gợi ý" title="Sản phẩm liên quan" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <ContactCTA />
    </>
  );
}
