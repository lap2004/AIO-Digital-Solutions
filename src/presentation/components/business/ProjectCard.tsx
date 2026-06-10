import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import type { Project } from '@/domain/entities';
import { projectCategoryLabel } from '@/core/constants/catalog';
import { useI18n } from '@/core/i18n';
import { formatDate } from '@/core/utils/format';
import { SmartImage } from '@/presentation/components/common/SmartImage';
import { Badge } from '@/presentation/components/common/Badge';

export function ProjectCard({ project }: { project: Project }) {
  const { lang, pick } = useI18n();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
    >
      <Link
        to={`/du-an/${project.slug}`}
        className="group relative block overflow-hidden rounded-2xl border border-white/10 shadow-card"
      >
        <div className="relative aspect-[16/11] overflow-hidden bg-[#020617]">
          <SmartImage
            src={project.cover}
            alt={pick(project.name, project.nameEn) ?? ''}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
          <div className="absolute left-4 top-4">
            <Badge tone="info">{projectCategoryLabel(project.category, lang)}</Badge>
          </div>
        </div>
        <div className="text-on-media absolute inset-x-0 bottom-0 p-5">
          <h3 className="clip-text-2 font-bold leading-snug text-white transition group-hover:text-brand-cyan">
            {pick(project.name, project.nameEn)}
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {pick(project.location, project.locationEn)}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {formatDate(project.completedAt)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
