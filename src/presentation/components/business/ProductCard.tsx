import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Product } from '@/domain/entities';
import { PRODUCT_CATEGORY_LABEL } from '@/core/constants/catalog';
import { SmartImage } from '@/presentation/components/common/SmartImage';
import { Badge } from '@/presentation/components/common/Badge';

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
    >
      <Link
        to={`/san-pham/${product.slug}`}
        className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#0b1326]/70 shadow-card backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-accent/40 hover:shadow-glow"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#020617]">
          <SmartImage
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute left-3 top-3">
            <Badge tone="brand">{PRODUCT_CATEGORY_LABEL[product.category]}</Badge>
          </div>
          {product.featured && (
            <div className="absolute right-3 top-3">
              <Badge tone="warning">Nổi bật</Badge>
            </div>
          )}
        </div>
        <div className="p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-brand-accent">{product.brand}</p>
          <h3 className="clip-text-2 mt-1.5 min-h-[2.8rem] font-semibold leading-snug text-white transition group-hover:text-brand-cyan">
            {product.name}
          </h3>
          <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
            <span className="text-sm text-muted">{product.sku}</span>
            <span className="flex items-center gap-1 text-sm font-semibold text-brand-cyan opacity-0 transition group-hover:opacity-100">
              Chi tiết <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
