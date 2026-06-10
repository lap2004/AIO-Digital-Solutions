import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { FileText, ShieldCheck, Globe, Tag, Minus, Plus, FileDown } from 'lucide-react';
import { useAsync } from '@/presentation/hooks/useAsync';
import { services } from '@/app/services';
import { useQuoteStore } from '@/presentation/state/quote.store';
import { productCategoryLabel } from '@/core/constants/catalog';
import { useI18n } from '@/core/i18n';
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
  const { lang, pick } = useI18n();
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
          <EmptyState title={pick('Không tìm thấy sản phẩm', 'Product not found') ?? ""} action={<Link to="/san-pham"><Button className="mt-4">{pick('Về danh mục', 'Back to catalog') ?? ""}</Button></Link>} />
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
        title={`${pick(product.name, product.nameEn) ?? ''} | Sản phẩm AIO`}
        description={product.description ?? ''}
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
              { label: pick('Sản phẩm', 'Products') ?? "", to: '/san-pham' },
              { label: productCategoryLabel(product.category, lang) ?? "", to: `/san-pham?category=${product.category}` },
              { label: pick(product.name, product.nameEn) ?? "" },
            ]}
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            {/* Gallery */}
            <div>
              <div className="aspect-square overflow-hidden rounded-3xl border border-white/10 bg-[#020617]">
                <SmartImage src={product.image} alt={pick(product.name, product.nameEn) ?? ""} eager className="h-full w-full object-cover" />
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
                <Badge tone="brand">{productCategoryLabel(product.category, lang)}</Badge>
                <Badge>{product.brand}</Badge>
                {product.featured && <Badge tone="warning">{pick('Nổi bật', 'Featured') ?? ""}</Badge>}
              </div>
              <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">{pick(product.name, product.nameEn) ?? ''}</h1>
              <p className="mt-4 leading-relaxed text-muted">{pick(product.shortDescription, product.shortDescriptionEn) ?? ""}</p>

              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-ink"><Tag className="h-4 w-4 text-brand-accent" /> SKU: {product.sku}</div>
                <div className="flex items-center gap-2 text-ink"><Globe className="h-4 w-4 text-brand-accent" /> {pick('Xuất xứ:', 'Origin:') ?? ""} {product.country}</div>
                <div className="flex items-center gap-2 text-ink"><ShieldCheck className="h-4 w-4 text-brand-accent" /> {pick('Bảo hành:', 'Warranty:') ?? ""} {product.warranty}</div>
                <div className="flex items-center gap-2 text-ink"><FileText className="h-4 w-4 text-brand-accent" /> {product.brand}</div>
              </div>

              {product.price ? (
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <span className="text-sm text-muted">{pick('Giá tham khảo', 'Reference Price') ?? ""}</span>
                  <div className="text-2xl font-bold text-gradient">{formatCurrency(product.price)}</div>
                  <span className="text-xs text-muted">{pick('(Liên hệ để nhận báo giá tốt nhất theo dự án)', '(Contact for best project quote)')}</span>
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
                  <FileText className="h-5 w-5" /> {pick('Thêm vào báo giá', 'Add to quote') ?? ""}
                </Button>
                <Link to="/lien-he">
                  <Button size="lg" variant="outline">{pick('Tư vấn ngay', 'Consult Now') ?? ""}</Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-16 grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div>
              <h2 className="text-2xl font-bold">{pick('Mô tả sản phẩm', 'Product Description') ?? ""}</h2>
              <p className="mt-4 leading-relaxed text-muted">{pick(product.description, product.descriptionEn) ?? ""}</p>

              {product.applications.length > 0 && (
                <>
                  <h3 className="mt-8 text-xl font-bold">{pick('Ứng dụng', 'Applications') ?? ""}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.applications.map((a) => (
                      <Badge key={a} tone="info">{a}</Badge>
                    ))}
                  </div>
                </>
              )}

              <h3 className="mt-8 text-xl font-bold">{pick('Thông số kỹ thuật', 'Technical Specifications') ?? ""}</h3>
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full text-sm">
                  <tbody>
                    {product.specifications.map((s, i) => (
                      <tr key={s.label} className={i % 2 === 0 ? 'bg-white/[0.03]' : ''}>
                        <td className="w-1/2 px-5 py-3 font-medium text-ink">{pick(s.label, s.labelEn) ?? ""}</td>
                        <td className="px-5 py-3 text-white">{pick(s.value, s.valueEn) ?? ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <aside>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-bold text-white">{pick('Tài liệu kỹ thuật', 'Technical Documents') ?? ""}</h3>
                <ul className="mt-4 space-y-3">
                  {product.documents.length ? (
                    product.documents.map((d) => (
                      <li key={d.label}>
                        <a 
                          href={d.url} 
                          download={d.url !== '#' ? d.label : undefined}
                          target={d.url !== '#' ? '_blank' : undefined}
                          rel={d.url !== '#' ? 'noopener noreferrer' : undefined}
                          onClick={(e) => {
                            if (d.url === '#') {
                              e.preventDefault();
                              toast.info('Tài liệu đang được cập nhật. Vui lòng liên hệ để nhận bản mềm.');
                            }
                          }}
                          className="group flex items-center gap-3 rounded-xl border border-line bg-surface p-3 text-sm transition-all hover:-translate-y-0.5 hover:border-brand-cyan/40 hover:bg-brand-cyan/5 hover:shadow-sm"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-cyan/10 text-brand-cyan transition-colors group-hover:bg-brand-cyan group-hover:text-white">
                            <FileDown className="h-5 w-5" />
                          </div>
                          <span className="flex-1 font-medium text-ink transition-colors group-hover:text-brand-cyan">{pick(d.label, d.labelEn) ?? ""}</span>
                          {d.sizeKb && <span className="text-xs font-semibold text-muted">{Math.round(d.sizeKb / 1024 * 10) / 10} MB</span>}
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
            <SectionHeader align="left" eyebrow={pick('Gợi ý', 'Suggestions') ?? ""} title={pick('Sản phẩm liên quan', 'Related Products') ?? ""} />
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

