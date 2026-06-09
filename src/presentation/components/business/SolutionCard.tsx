import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Solution } from '@/domain/entities';
import { useI18n } from '@/core/i18n';
import { Icon } from '@/presentation/components/common/Icon';

export function SolutionCard({ solution }: { solution: Solution }) {
  const { t } = useI18n();
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45 }}
    >
      <Link
        to={`/giai-phap/${solution.slug}`}
        className="group relative flex h-full min-h-[316px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b1326]/60 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-accent/40 hover:shadow-glow"
      >
        {/* Top accent + glow */}
        <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-gradient transition-transform duration-300 group-hover:scale-x-100" />
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-blue/10 blur-2xl transition-all duration-500 group-hover:bg-brand-cyan/25" />

        <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-glow ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-105">
          <Icon name={solution.icon} className="text-[2rem]" />
        </div>

        <h3 className="clip-text-2 min-h-[3.25rem] text-lg font-bold leading-snug text-white transition group-hover:text-brand-cyan">
          {solution.name}
        </h3>
        <p className="clip-text-2 mt-2.5 text-sm leading-relaxed text-muted">{solution.tagline}</p>

        <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-brand-cyan">
          {t('common.learnMore')}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.div>
  );
}
