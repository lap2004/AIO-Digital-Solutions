import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Solution } from '@/domain/entities';
import { useI18n } from '@/core/i18n';
import { Icon } from '@/presentation/components/common/Icon';
import { cn } from '@/core/utils/cn';

export function SolutionCard({ solution, className }: { solution: Solution; className?: string }) {
  const { t, pick } = useI18n();
  return (
    <motion.div
      className={cn("h-full", className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45 }}
    >
      <Link
        to={`/giai-phap/${solution.slug}`}
        className="group relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-brand-cyan/30 hover:shadow-xl dark:border-white/5 dark:bg-[#0b1326] dark:shadow-card dark:hover:border-brand-accent/30 dark:hover:shadow-glow"
      >
        {/* Soft Animated Glows - DARK MODE ONLY */}
        <div className="absolute -right-20 -top-20 hidden h-48 w-48 rounded-full bg-brand-cyan/10 blur-[80px] transition-all duration-500 group-hover:scale-150 group-hover:bg-brand-cyan/20 dark:block" />
        <div className="absolute -bottom-20 -left-20 hidden h-48 w-48 rounded-full bg-brand-accent/5 blur-[80px] transition-all duration-500 group-hover:scale-150 group-hover:bg-brand-accent/15 dark:block" />
        
        {/* Top Gradient Line - DARK MODE ONLY */}
        <div className="absolute inset-x-0 top-0 hidden h-[2px] w-full bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 dark:block" />

        {/* Floating Icon Container */}
        <div className="relative z-10 mb-8 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient shadow-glow transition-all duration-500 group-hover:-translate-y-2">
          <Icon name={solution.icon} className="text-[28px] text-white" />
        </div>

        {/* Text Content */}
        <div className="relative z-10 mt-auto flex flex-col">
          <h3 className="text-[1.35rem] font-bold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-brand-cyan dark:text-white">
            {pick(solution.name, solution.nameEn)}
          </h3>
          
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-500 transition-colors duration-300 dark:text-white/70">
            {pick(solution.tagline, solution.taglineEn)}
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand-cyan transition-transform duration-300 group-hover:translate-x-2">
            {t('common.learnMore')}
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
