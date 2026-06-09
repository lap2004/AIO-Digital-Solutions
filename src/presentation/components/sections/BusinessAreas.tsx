import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { BUSINESS_AREAS } from '@/core/constants/site';
import { useI18n } from '@/core/i18n';
import { Container } from '@/presentation/components/common/Container';
import { SectionHeader } from '@/presentation/components/common/SectionHeader';
import { Icon } from '@/presentation/components/common/Icon';

/** 4 mảng kinh doanh cốt lõi — section trọng tâm của trang chủ. */
export function BusinessAreas() {
  const { t, pick } = useI18n();
  return (
    <section className="py-20">
      <Container>
        <SectionHeader
          eyebrow={t('home.areasEyebrow')}
          title={t('home.areasTitle')}
          description={t('home.areasDesc')}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {BUSINESS_AREAS.map((area, i) => (
            <motion.div
              key={area.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <Link
                to={area.to}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b1326]/60 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-accent/40 hover:shadow-glow"
              >
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-blue/10 blur-3xl transition-all duration-500 group-hover:bg-brand-cyan/20" />
                <div className="relative flex items-start gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-glow">
                    <Icon name={area.icon} className="text-[2rem]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-brand-accent">0{i + 1}</span>
                    <h3 className="text-xl font-bold leading-snug text-white transition group-hover:text-brand-cyan">
                      {pick(area.title, area.titleEn)}
                    </h3>
                  </div>
                </div>
                <p className="relative mt-4 text-sm leading-relaxed text-muted">{pick(area.tagline, area.taglineEn)}</p>
                <ul className="relative mt-5 grid flex-1 grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {pick(area.features, area.featuresEn).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" /> {f}
                    </li>
                  ))}
                </ul>
                <span className="relative mt-6 flex items-center gap-2 text-sm font-semibold text-brand-cyan">
                  {t('common.learnMore')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
