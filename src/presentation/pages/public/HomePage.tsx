import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { COMPANY, COMPANY_STATS } from '@/core/constants/site';
import { useI18n } from '@/core/i18n';
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
import { BrandCard } from '@/presentation/components/business/BrandCard';
import { ContactCTA } from '@/presentation/components/sections/ContactCTA';
import { BusinessAreas } from '@/presentation/components/sections/BusinessAreas';

const HIGHLIGHTS_VI = [
  'Thi công, lắp đặt màn hình LED · LCD ghép · standee quảng cáo',
  'Quản lý, điều khiển & truyền tải nội dung từ xa, WiFi Marketing',
  'Bảo trì – bảo hành – sửa chữa thiết bị màn hình',
  'Tự động hóa hệ thống điện, mạng, camera, nhà máy',
];
const HIGHLIGHTS_EN = [
  'Installation of LED screens · LCD video walls · standee displays',
  'Remote content management, control & broadcast, WiFi Marketing',
  'Maintenance – warranty – repair of display devices',
  'Automation of power, network, camera and factory systems',
];

export default function HomePage() {
  const { t, pick } = useI18n();
  const { data: solutions } = useAsync(() => services.solutions.list(), []);
  const { data: products } = useAsync(() => services.products.featured(8), []);
  const { data: projects } = useAsync(() => services.projects.featured(6), []);
  const { data: brands } = useAsync(() => services.brands.list(), []);

  return (
    <>
      <Seo
        title="AIO Digital Solutions — Giải pháp màn hình hiển thị & tự động hóa"
        description="Thi công lắp đặt màn hình LED, LCD ghép, standee quảng cáo; quản lý điều khiển hiển thị từ xa; bảo trì – bảo hành thiết bị; tự động hóa điện – mạng – camera – nhà máy."
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
                <Sparkles className="h-3.5 w-3.5" /> {pick(COMPANY.slogan, 'Total digital technology solutions')}
              </span>
              <h1 className="mt-6 text-balance pb-1 text-4xl font-bold leading-[1.18] md:text-6xl">
                {t('home.heroTitlePre')} <span className="text-gradient">{t('home.heroTitleHi')}</span>{' '}
                {t('home.heroTitlePost')}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t('home.heroDesc')}</p>
              <ul className="mt-8 space-y-3">
                {pick(HIGHLIGHTS_VI, HIGHLIGHTS_EN).map((h) => (
                  <li key={h} className="flex items-center gap-3 text-sm text-ink">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-cyan" /> {h}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link to="/giai-phap">
                  <Button size="lg">
                    {t('home.exploreSolutions')} <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/du-an">
                  <Button size="lg" variant="outline">
                    {t('home.viewProjects')}
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
                      <span className="mt-1 text-xs text-muted">{pick(s.label, s.labelEn)}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute -bottom-5 -right-5 h-24 w-24 rounded-2xl bg-brand-gradient opacity-30 blur-2xl" />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 4 mảng kinh doanh cốt lõi */}
      <BusinessAreas />

      {/* Solutions */}
      <section className="py-20">
        <Container>
          <SectionHeader
            eyebrow={t('home.solutionsEyebrow')}
            title={t('home.solutionsTitle')}
            description={t('home.solutionsDesc')}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(solutions ?? []).slice(0, 6).map((s) => (
              <SolutionCard key={s.id} solution={s} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/giai-phap">
              <Button variant="outline">
                {t('home.allSolutions')} <ArrowRight className="h-4 w-4" />
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
              <StatCard key={s.label} value={s.value} suffix={s.suffix} label={pick(s.label, s.labelEn)} />
            ))}
          </div>
        </Container>
      </section>

      {/* Featured products */}
      <section className="py-20">
        <Container>
          <SectionHeader
            eyebrow={t('home.productsEyebrow')}
            title={t('home.productsTitle')}
            description={t('home.productsDesc')}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(products ?? []).slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/san-pham">
              <Button variant="outline">
                {t('home.allProducts')} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Featured projects */}
      <section className="py-20">
        <Container>
          <SectionHeader
            eyebrow={t('home.projectsEyebrow')}
            title={t('home.projectsTitle')}
            description={t('home.projectsDesc')}
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
          <SectionHeader eyebrow={t('home.brandsEyebrow')} title={t('home.brandsTitle')} />
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {(brands ?? []).slice(0, 12).map((b) => (
              <BrandCard key={b.id} brand={b} />
            ))}
          </div>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
