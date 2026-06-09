import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Solution } from '@/domain/entities';
import { Icon } from '@/presentation/components/common/Icon';

export function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45 }}
    >
      <Link
        to={`/giai-phap/${solution.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b1326]/60 p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-accent/40 hover:shadow-glow"
      >
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-blue/10 blur-2xl transition-all duration-500 group-hover:bg-brand-cyan/20" />
        <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-glow">
          <Icon name={solution.icon} className="text-[1.75rem]" />
        </div>
        <h3 className="text-xl font-bold text-white transition group-hover:text-brand-cyan">{solution.name}</h3>
        <p className="clip-text-3 mt-3 flex-1 text-sm leading-relaxed text-muted">{solution.tagline}</p>
        <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-brand-cyan">
          Tìm hiểu thêm
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.div>
  );
}
