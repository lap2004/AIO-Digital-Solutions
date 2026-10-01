import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Shield, Cpu, SlidersHorizontal, Monitor } from 'lucide-react';
import { BUSINESS_AREAS } from '@/core/constants/site';
import { useI18n } from '@/core/i18n';
import { Container } from '@/presentation/components/common/Container';
import { SectionHeader } from '@/presentation/components/common/SectionHeader';

const ICONS_MAP: Record<string, any> = {
  display: Monitor,
  sliders2: SlidersHorizontal,
  tools: Shield,
  cpu: Cpu,
};

export function BusinessAreas() {
  const { pick } = useI18n();

  return (
    <section className="relative py-20 overflow-hidden">
      <Container className="relative">
        <SectionHeader
          eyebrow={pick('Hệ sinh thái dịch vụ', 'Ecosystem')}
          title={pick('4 Mảng Dịch Vụ Cốt Lõi', '4 Core Business Pillars')}
          description={pick(
            'Giải pháp trọn gói khép kín từ thi công lắp đặt, quản trị CMS Cloud từ xa, bảo trì SLA 2h-4h đến tự động hóa nhà máy.',
            'Turnkey solutions from display installation, remote cloud management, 24/7 SLA maintenance to factory automation.',
          )}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {BUSINESS_AREAS.map((area, i) => {
            const IconComponent = ICONS_MAP[area.icon] || Monitor;
            return (
              <motion.div
                key={area.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="h-full"
              >
                <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500 hover:shadow-xl dark:border-white/10 dark:bg-gradient-to-br dark:from-[#0c162c]/90 dark:to-[#050b18] dark:shadow-card dark:hover:border-brand-cyan/50 dark:hover:shadow-glow">
                  {/* Top Header */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-cyan to-blue-600 text-slate-950 shadow-glow transition-transform duration-300 group-hover:scale-105">
                      <IconComponent className="h-7 w-7" />
                    </div>
                    <div>
                      <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-700 dark:border-brand-cyan/30 dark:bg-brand-cyan/10 dark:text-brand-cyan">
                        {area.pillar}
                      </span>
                      <h3 className="mt-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-cyan-600 lg:text-xl dark:text-white dark:group-hover:text-brand-cyan">
                        {pick(area.title, area.titleEn)}
                      </h3>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                    {pick(area.tagline, area.taglineEn)}
                  </p>

                  {/* Highlights pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {pick(area.highlights, area.highlightsEn).map((h) => (
                      <span
                        key={h}
                        className="rounded-lg border border-slate-200 bg-slate-100/80 px-2 py-0.5 text-[11px] font-semibold text-cyan-700 dark:border-white/5 dark:bg-white/5 dark:text-brand-cyan"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* 3 Key features */}
                  <ul className="mt-5 space-y-2 border-t border-slate-200 pt-4 flex-1 dark:border-white/10">
                    {pick(area.features.slice(0, 3), area.featuresEn.slice(0, 3)).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-cyan-600 dark:text-brand-cyan" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom Action */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-white/10">
                    <Link
                      to={area.to}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 transition-transform group-hover:translate-x-1 dark:text-brand-cyan"
                    >
                      {pick('Xem chi tiết', 'Learn more')}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>

                    <Link
                      to="/bao-gia"
                      className="rounded-xl border border-cyan-500/40 bg-cyan-50 px-3.5 py-1.5 text-xs font-bold text-cyan-700 transition hover:bg-brand-cyan hover:text-slate-950 dark:border-brand-cyan/30 dark:bg-brand-cyan/10 dark:text-white dark:hover:bg-brand-cyan dark:hover:text-slate-950"
                    >
                      {pick('Dự toán', 'Estimate')}
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
