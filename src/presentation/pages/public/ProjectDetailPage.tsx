import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Maximize, Building, Layers } from 'lucide-react';
import { useAsync } from '@/presentation/hooks/useAsync';
import { services } from '@/app/services';
import { PROJECT_CATEGORY_LABEL } from '@/core/constants/catalog';
import { formatDate } from '@/core/utils/format';
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

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { data: project, loading } = useAsync(() => services.projects.getBySlug(slug ?? ''), [slug]);
  const { data: products } = useAsync(
    () =>
      project
        ? services.products.list({ pageSize: 200 }).then((r) => r.items.filter((p) => project.relatedProductIds.includes(p.id)).slice(0, 4))
        : Promise.resolve([]),
    [project?.id],
  );

  if (loading) return <div className="pt-32"><LoadingBlock /></div>;
  if (!project)
    return (
      <div className="pt-40">
        <Container>
          <EmptyState title="Không tìm thấy dự án" action={<Link to="/du-an"><Button className="mt-4">Về danh sách</Button></Link>} />
        </Container>
      </div>
    );

  const facts = [
    { icon: Building, label: 'Khách hàng', value: project.client },
    { icon: MapPin, label: 'Địa điểm', value: project.location },
    { icon: Maximize, label: 'Quy mô', value: project.scale },
    { icon: Layers, label: 'Diện tích', value: project.area },
    { icon: Calendar, label: 'Hoàn thành', value: formatDate(project.completedAt) },
  ];

  return (
    <>
      <Seo title={project.seo.title} description={project.seo.description} image={project.cover} />

      <section className="pt-28">
        <Container>
          <Breadcrumb items={[{ label: 'Dự án', to: '/du-an' }, { label: project.name }]} />
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge tone="info">{PROJECT_CATEGORY_LABEL[project.category]}</Badge>
          </div>
          <h1 className="mt-4 max-w-4xl text-balance text-3xl font-bold leading-tight md:text-4xl">{project.name}</h1>

          <div className="mt-8 aspect-[16/8] overflow-hidden rounded-3xl border border-white/10 bg-[#020617]">
            <SmartImage src={project.cover} alt={project.name} eager className="h-full w-full object-cover" />
          </div>

          {/* Facts */}
          <div className="mt-8 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:grid-cols-2 lg:grid-cols-5">
            {facts.map((f) => (
              <div key={f.label} className="flex items-start gap-3">
                <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" />
                <div>
                  <p className="text-xs text-muted">{f.label}</p>
                  <p className="text-sm font-semibold text-white">{f.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Body */}
          <div className="mt-12 grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold">Tổng quan</h2>
                <p className="mt-3 leading-relaxed text-muted">{project.description}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold">Thách thức</h3>
                <p className="mt-3 leading-relaxed text-muted">{project.challenge}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold">Giải pháp của AIO</h3>
                <p className="mt-3 leading-relaxed text-muted">{project.solution}</p>
              </div>

              {project.gallery.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {project.gallery.map((g, i) => (
                    <div key={i} className="aspect-video overflow-hidden rounded-xl border border-white/10 bg-[#020617]">
                      <SmartImage src={g.url} alt={g.alt} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <aside>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-bold text-white">Công nghệ sử dụng</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <Badge key={t} tone="brand">{t}</Badge>
                  ))}
                </div>
                <Link to="/lien-he" className="mt-6 block">
                  <Button className="w-full">Triển khai dự án tương tự</Button>
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {products && products.length > 0 && (
        <section className="py-20">
          <Container>
            <SectionHeader align="left" eyebrow="Thiết bị" title="Sản phẩm trong dự án" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p) => (
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
