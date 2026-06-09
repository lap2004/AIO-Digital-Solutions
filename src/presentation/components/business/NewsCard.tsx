import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import type { NewsArticle } from '@/domain/entities';
import { NEWS_CATEGORY_LABEL } from '@/core/constants/catalog';
import { formatDate } from '@/core/utils/format';
import { SmartImage } from '@/presentation/components/common/SmartImage';
import { Badge } from '@/presentation/components/common/Badge';

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
    >
      <Link
        to={`/tin-tuc/${article.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b1326]/70 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/40 hover:shadow-glow"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-[#020617]">
          <SmartImage
            src={article.cover}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute left-3 top-3">
            <Badge tone="purple">{NEWS_CATEGORY_LABEL[article.category]}</Badge>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="clip-text-3 font-semibold leading-snug text-white transition group-hover:text-brand-cyan">
            {article.title}
          </h3>
          <p className="clip-text-2 mt-2 flex-1 text-sm text-muted">{article.excerpt}</p>
          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-xs text-muted">
            <span>{formatDate(article.publishedAt)}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {article.readingMinutes} phút đọc
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
