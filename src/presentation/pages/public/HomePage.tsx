import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { COMPANY, COMPANY_STATS } from '@/core/constants/site';
import { useAsync } from '@/presentation/hooks/useAsync';
import { services } from '@/app/services';
import { Container } from '@/presentation/components/common/Container';
import { Button } from '@/presentation/components/common/Button';
import { SectionHeader } from '@/presentation/components/common/SectionHeader';
import { StatCard } from '@/presentation/components/common/StatCard';
import { AuroraBackground } from '@/presentation/components/common/Backgrounds';
import { Seo } from '@/presentation/components/common/Seo';
import { SolutionCard } from '@/presentation/components/business/SolutionCard';
import { ProductCard } from '@/presentation/components/business/ProductCard';
import { ProjectCard } from '@/presentation/components/business/ProjectCard';
import { NewsCard } from '@/presentation/components/business/NewsCard';
import { BrandCard } from '@/presentation/components/business/BrandCard';
import { ContactCTA } from '@/presentation/components/sections/ContactCTA';

const HIGHLIGHTS = [
  'Sản xuất & thi công màn hình LED trọn gói',
  'Giải pháp Smart City, AI Camera, IoT',
  'Đội ngũ kỹ sư giàu kinh nghiệm, bảo hành dài hạn',
];

export default function HomePage() {
  const { data: solutions } = useAsync(() => services.solutions.list(), []);
  const { data: products } = useAsync(() => services.products.featured(8), []);
  const { data: projects } = useAsync(() => services.projects.featured(6), []);
  const { data: news } = useAsync(() => services.news.featured(3), []);
  const { data: brands } = useAsync(() => services.brands.list(), []);

  return (
    <>
      <Seo
        title="AIO Digital Solutions — Giải pháp công nghệ số toàn diện"
        description="Sản xuất, thi công, cho thuê màn hình LED; giải pháp Smart City, Camera AI, IoT và chuyển đổi số cho doanh nghiệp."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: COMPANY.legalName,
          email: COMPANY.email,
          address: COMPANY.address,
          taxID: COMPANY.taxCode,
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pb-20 pt-36">
        <AuroraBackground />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="eyebrow">
                <Sparkles className="h-3.5 w-3.5" /> {COMPANY.slogan}
              </span>
              <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.1] md:text-6xl">
                Kiến tạo <span className="text-gradient">không gian số</span> cho doanh nghiệp hiện đại
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                AIO cung cấp giải pháp công nghệ trọn gói: màn hình LED, đô thị thông minh, Camera AI, IoT và
                chuyển đổi số — từ tư vấn, thiết kế đến thi công và vận hành.
              </p>
              <ul className="mt-8 space-y-3">
                {HIGHLIGHTS.map((h) => (
                  <li key={h} className="flex items-center gap-3 text-sm text-ink">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-cyan" /> {h}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link to="/giai-phap">
                  <Button size="lg">
                    Khám phá giải pháp <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/du-an">
                  <Button size="lg" variant="outline">
                    Xem dự án tiêu biểu
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-[#0a1a3a]/80 to-[#04122e]/80 p-8 backdrop-blur-xl">
                <div className="grid h-full grid-cols-2 gap-4">
                  {COMPANY_STATS.map((s) => (
                    <div
                      key={s.label}
                      className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
                    >
                      <span className="text-3xl font-bold text-gradient">
                        {s.value}
                        {s.suffix}
                      </span>
                      <span className="mt-1 text-xs text-muted">{s.label}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute -bottom-5 -right-5 h-24 w-24 rounded-2xl bg-brand-gradient opacity-30 blur-2xl" />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Solutions */}
      <section className="py-20">
        <Container>
          <SectionHeader
            eyebrow="Giải pháp"
            title="Hệ sinh thái giải pháp công nghệ toàn diện"
            description="Từ màn hình LED đến đô thị thông minh — AIO đồng hành cùng doanh nghiệp trên hành trình chuyển đổi số."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(solutions ?? []).slice(0, 6).map((s) => (
              <SolutionCard key={s.id} solution={s} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/giai-phap">
              <Button variant="outline">
                Tất cả giải pháp <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Stats band */}
      <section className="py-10">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COMPANY_STATS.map((s) => (
              <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </Container>
      </section>

      {/* Featured products */}
      <section className="py-20">
        <Container>
          <SectionHeader
            eyebrow="Sản phẩm"
            title="Sản phẩm nổi bật"
            description="Thiết bị chính hãng từ các thương hiệu hàng đầu, phân phối và bảo hành bởi AIO."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(products ?? []).slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/san-pham">
              <Button variant="outline">
                Xem tất cả sản phẩm <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Featured projects */}
      <section className="py-20">
        <Container>
          <SectionHeader
            eyebrow="Dự án"
            title="Dự án tiêu biểu"
            description="Hàng trăm dự án đã triển khai trên khắp 63 tỉnh thành Việt Nam."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(projects ?? []).slice(0, 6).map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* Brands */}
      <section className="py-12">
        <Container>
          <SectionHeader eyebrow="Đối tác" title="Thương hiệu chúng tôi phân phối" />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {(brands ?? []).slice(0, 12).map((b) => (
              <BrandCard key={b.id} brand={b} />
            ))}
          </div>
        </Container>
      </section>

      {/* News */}
      <section className="py-20">
        <Container>
          <SectionHeader eyebrow="Tin tức" title="Tin tức & Kiến thức công nghệ" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {(news ?? []).slice(0, 3).map((a) => (
              <NewsCard key={a.id} article={a} />
            ))}
          </div>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
