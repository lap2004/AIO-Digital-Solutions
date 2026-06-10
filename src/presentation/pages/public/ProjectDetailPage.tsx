import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Maximize, Building, Layers } from 'lucide-react';
import { useAsync } from '@/presentation/hooks/useAsync';
import { services } from '@/app/services';
import { projectCategoryLabel } from '@/core/constants/catalog';
import { useI18n } from '@/core/i18n';
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
  const { lang, pick } = useI18n();
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
          <EmptyState title={pick('Không tìm thấy dự án', 'Project not found') ?? ""} action={<Link to="/du-an"><Button className="mt-4">{pick('Về danh sách', 'Back to list') ?? ""}</Button></Link>} />
        </Container>
      </div>
    );

  const facts = [
    { icon: Building, label: pick('Khách hàng', 'Client'), value: pick(project.client, project.clientEn) },
    { icon: MapPin, label: pick('Địa điểm', 'Location'), value: pick(project.location, project.locationEn) },
    { icon: Maximize, label: pick('Quy mô', 'Scale'), value: pick(project.scale, project.scaleEn) },
    { icon: Layers, label: pick('Diện tích', 'Area'), value: pick(project.area, project.areaEn) },
    { icon: Calendar, label: pick('Hoàn thành', 'Completed'), value: formatDate(project.completedAt) },
  ];

  return (
    <>
      <Seo title={`${pick(project.name, project.nameEn) ?? ''} | Dự án AIO`} description={project.description ?? ''} image={project.cover} />

      <section className="pt-28">
        <Container>
          <Breadcrumb items={[{ label: pick('Dự án', 'Projects') ?? "", to: '/du-an' }, { label: pick(project.name, project.nameEn) ?? "" }]} />
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge tone="info">{projectCategoryLabel(project.category, lang)}</Badge>
          </div>
          <h1 className="mt-8 text-3xl font-bold leading-tight md:text-5xl">{pick(project.name, project.nameEn) ?? ''}</h1>

          <div className="mt-8 aspect-[16/8] overflow-hidden rounded-3xl border border-white/10 bg-[#020617]">
            <SmartImage src={project.cover} alt={pick(project.name, project.nameEn) ?? ""} eager className="h-full w-full object-cover" />
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
                <h2 className="text-2xl font-bold">{pick('Tổng quan', 'Overview') ?? ""}</h2>
                <p className="mt-3 leading-relaxed text-muted">{pick(project.description, project.descriptionEn) ?? ""}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold">{pick('Thách thức', 'Challenge') ?? ""}</h3>
                <p className="mt-3 leading-relaxed text-muted">{pick(project.challenge, project.challengeEn) ?? ""}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold">{pick('Giải pháp của AIO', "AIO's Solution") ?? ""}</h3>
                <p className="mt-3 leading-relaxed text-muted">{pick(project.solution, project.solutionEn) ?? ""}</p>
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
                <h3 className="font-bold text-white">{pick('Công nghệ sử dụng', 'Tech Stack') ?? ""}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <Badge key={t} tone="brand">{t}</Badge>
                  ))}
                </div>
                <Link to="/lien-he" className="mt-6 block">
                  <Button className="w-full">{pick('Triển khai dự án tương tự', 'Deploy similar project') ?? ""}</Button>
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {products && products.length > 0 && (
        <section className="py-20">
          <Container>
            <SectionHeader align="left" eyebrow={pick('Thiết bị', 'Equipment') ?? ""} title={pick('Sản phẩm trong dự án', 'Products in project') ?? ""} />
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

