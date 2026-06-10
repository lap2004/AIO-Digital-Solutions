import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Product } from '@/domain/entities';
import { productCategoryLabel } from '@/core/constants/catalog';
import { useI18n } from '@/core/i18n';
import { SmartImage } from '@/presentation/components/common/SmartImage';
import { Badge } from '@/presentation/components/common/Badge';
import { formatNumber } from '@/core/utils/format';

export function ProductCard({ product }: { product: Product }) {
  const { lang, pick, t } = useI18n();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <Link
        to={`/san-pham/${product.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-surface shadow-card backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-accent/40 hover:shadow-glow"
      >
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-slate-100 dark:bg-[#020617]">
          <SmartImage
            src={product.image}
            alt={pick(product.name, product.nameEn) ?? ''}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute left-4 top-4">
            <Badge tone="brand">{productCategoryLabel(product.category, lang)}</Badge>
          </div>
          {product.featured && (
            <div className="absolute right-4 top-4">
              <Badge tone="warning">{pick('Nổi bật', 'Featured')}</Badge>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-accent">{product.brand}</p>
          <h3 className="clip-text-2 mt-2 font-semibold leading-snug text-ink transition group-hover:text-brand-cyan">
            {pick(product.name, product.nameEn)}
          </h3>
          
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs font-medium text-muted">{pick('Giá:', 'Price:')}</span>
            {product.price ? (
              <span className="flex items-baseline gap-1 text-brand-cyan">
                <span className="text-[1.15rem] font-bold">
                  {formatNumber(product.price)}
                </span>
                <span className="text-xs font-semibold">VNĐ</span>
              </span>
            ) : (
              <span className="text-[1.15rem] font-bold text-brand-cyan">
                {pick('Liên hệ', 'Contact')}
              </span>
            )}
          </div>
          <div className="mt-auto pt-6">
            <div className="flex items-center justify-between border-t border-line pt-4">
              <span className="text-sm font-medium text-muted">{product.sku}</span>
              <span className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-cyan/10 px-3 py-1.5 text-xs font-semibold text-brand-cyan transition-all duration-300 group-hover:bg-brand-cyan group-hover:text-white">
                {t('common.details')} <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
