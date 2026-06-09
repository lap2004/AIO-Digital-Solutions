import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Cpu } from 'lucide-react';
import { useAsync } from '@/presentation/hooks/useAsync';
import { services } from '@/app/services';
import { PRODUCT_CATEGORY_LABEL } from '@/core/constants/catalog';
import { Container } from '@/presentation/components/common/Container';
import { Button } from '@/presentation/components/common/Button';
import { Badge } from '@/presentation/components/common/Badge';
import { Card } from '@/presentation/components/common/Card';
import { SmartImage } from '@/presentation/components/common/SmartImage';
import { Icon } from '@/presentation/components/common/Icon';
import { LoadingBlock, EmptyState } from '@/presentation/components/common/Feedback';
import { SectionHeader } from '@/presentation/components/common/SectionHeader';
import { Seo } from '@/presentation/components/common/Seo';
import { AuroraBackground } from '@/presentation/components/common/Backgrounds';
import { Breadcrumb } from '@/presentation/components/sections/Breadcrumb';
import { ProductCard } from '@/presentation/components/business/ProductCard';
import { ProjectCard } from '@/presentation/components/business/ProjectCard';
import { ContactCTA } from '@/presentation/components/sections/ContactCTA';

export default function SolutionDetailPage() {
  const { slug } = useParams();
  const { data: solution, loading } = useAsync(() => services.solutions.getBySlug(slug ?? ''), [slug]);
  const { data: products } = useAsync(
    () =>
      solution
        ? services.products.list({ category: solution.relatedProductCategories[0], pageSize: 4 }).then((r) => r.items)
        : Promise.resolve([]),
    [solution?.id],
  );
  const { data: projects } = useAsync(
    () =>
      solution
        ? services.projects.list({ pageSize: 60 }).then((r) => r.items.filter((p) => solution.relatedProjectIds.includes(p.id)))
        : Promise.resolve([]),
    [solution?.id],
  );

  if (loading) return <div className="pt-32"><LoadingBlock /></div>;
  if (!solution)
    return (
      <div className="pt-40">
        <Container>
          <EmptyState title="Không tìm thấy giải pháp" action={<Link to="/giai-phap"><Button className="mt-4">Về danh sách</Button></Link>} />
        </Container>
      </div>
    );

  return (
    <>
      <Seo title={solution.seo.title} description={solution.seo.description} image={solution.heroImage} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16">
        <AuroraBackground />
        <Container className="relative">
          <Breadcrumb items={[{ label: 'Giải pháp', to: '/giai-phap' }, { label: solution.name }]} />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-glow">
                <Icon name={solution.icon} className="h-8 w-8" />
              </div>
              <h1 className="text-balance text-4xl font-bold leading-tight md:text-5xl">{solution.name}</h1>
              <p className="mt-4 text-lg text-muted">{solution.tagline}</p>
              <Link to="/lien-he" className="mt-8 inline-block">
                <Button size="lg">Tư vấn giải pháp <ArrowRight className="h-5 w-5" /></Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-[#020617]"
            >
              <SmartImage src={solution.heroImage} alt={solution.name} eager className="h-full w-full object-cover" />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Intro + benefits */}
      <section className="py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <SectionHeader align="left" eyebrow="Giới thiệu" title="Tổng quan giải pháp" />
              <p className="mt-5 leading-relaxed text-muted">{solution.introduction}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Lợi ích nổi bật</h3>
              <ul className="mt-5 space-y-3">
                {solution.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-ink">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-cyan" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-16">
        <Container>
          <SectionHeader eyebrow="Tính năng" title="Tính năng chính" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solution.features.map((f) => (
              <Card key={f.title} hover className="p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent/15 text-brand-accent">
                  <Icon name={f.icon} className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Architecture + tech stack */}
      <section className="py-16">
        <Container>
          <SectionHeader eyebrow="Kiến trúc" title={solution.architecture.title} />
          <div className="mt-12 flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
            {solution.architecture.steps.map((step, i) => (
              <div key={step} className="flex flex-1 items-center gap-4">
                <Card className="flex-1 p-5 text-center">
                  <span className="text-xs font-bold text-brand-accent">Bước {i + 1}</span>
                  <p className="mt-1 text-sm font-semibold text-white">{step}</p>
                </Card>
                {i < solution.architecture.steps.length - 1 && (
                  <ArrowRight className="hidden h-5 w-5 shrink-0 text-brand-accent lg:block" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="flex items-center gap-2 text-lg font-bold text-white">
              <Cpu className="h-5 w-5 text-brand-accent" /> Công nghệ sử dụng
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {solution.techStack.map((t) => (
                <Badge key={t} tone="brand">{t}</Badge>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Related products */}
      {products && products.length > 0 && (
        <section className="py-16">
          <Container>
            <SectionHeader align="left" eyebrow="Sản phẩm" title={`Sản phẩm liên quan · ${PRODUCT_CATEGORY_LABEL[solution.relatedProductCategories[0]]}`} />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Related projects */}
      {projects && projects.length > 0 && (
        <section className="py-16">
          <Container>
            <SectionHeader align="left" eyebrow="Dự án" title="Dự án tham khảo" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <ContactCTA />
    </>
  );
}
