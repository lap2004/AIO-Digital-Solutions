import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Sparkles, FileText } from 'lucide-react';
import type { Product } from '@/domain/entities';
import { productCategoryLabel } from '@/core/constants/catalog';
import { useI18n } from '@/core/i18n';
import { SmartImage } from '@/presentation/components/common/SmartImage';
import { Badge } from '@/presentation/components/common/Badge';
import { formatNumber } from '@/core/utils/format';
import { useQuoteStore } from '@/presentation/state/quote.store';
import { toast } from 'sonner';

export function ProductCard({ product }: { product: Product }) {
  const { lang, pick, t } = useI18n();
  const addQuote = useQuoteStore((s) => s.add);

  // Extract key specs for HUD badge
  const pitchSpec = product.specifications?.find((s) => s.label.toLowerCase().includes('pitch'))?.value;
  const refreshSpec = product.specifications?.find((s) => s.label.toLowerCase().includes('tần số') || s.label.toLowerCase().includes('refresh'))?.value;
  const brightSpec = product.specifications?.find((s) => s.label.toLowerCase().includes('sáng') || s.label.toLowerCase().includes('brightness'))?.value;

  const handleQuickQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addQuote({
      id: product.id,
      name: product.name,
      image: product.image,
    }, 1);
    toast.success(`Đã thêm "${product.name}" vào danh sách báo giá!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <div className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-surface shadow-card backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-accent/50 hover:shadow-glow">
        <Link to={`/san-pham/${product.slug}`} className="relative block aspect-[4/3] w-full shrink-0 overflow-hidden bg-slate-900/50">
          <SmartImage
            src={product.image}
            alt={pick(product.name, product.nameEn) ?? ''}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            <Badge tone="brand">{productCategoryLabel(product.category, lang)}</Badge>
            {pitchSpec && (
              <span className="rounded-md border border-cyan-400/40 bg-slate-950/80 px-2 py-0.5 text-[10px] font-bold text-cyan-300 backdrop-blur-md">
                {pitchSpec}
              </span>
            )}
          </div>
          {product.featured && (
            <div className="absolute right-3 top-3">
              <Badge tone="warning">
                <Sparkles className="mr-1 h-3 w-3" />
                {pick('Chính hãng', 'Genuine')}
              </Badge>
            </div>
          )}
        </Link>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-accent">{product.brand}</span>
            <span className="text-[11px] font-medium text-slate-400">{product.sku}</span>
          </div>

          <Link to={`/san-pham/${product.slug}`}>
            <h3 className="clip-text-2 mt-2 font-semibold text-sm sm:text-base leading-snug text-ink transition group-hover:text-brand-cyan">
              {pick(product.name, product.nameEn)}
            </h3>
          </Link>

          {/* Quick HUD Specs Pill */}
          {(refreshSpec || brightSpec) && (
            <div className="mt-2.5 flex items-center gap-2 text-[11px] text-muted">
              {refreshSpec && <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-mono">{refreshSpec}</span>}
              {brightSpec && <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-mono">{brightSpec}</span>}
            </div>
          )}
          
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <span className="text-[11px] font-medium text-muted">{pick('Dự toán:', 'Estimate:')} </span>
              {product.price ? (
                <span className="text-sm font-bold text-brand-cyan">
                  {formatNumber(product.price)} <span className="text-[11px] font-semibold">VNĐ</span>
                </span>
              ) : (
                <span className="text-sm font-bold text-brand-cyan">
                  {pick('Liên hệ báo giá', 'Contact for quote')}
                </span>
              )}
            </div>
            <span className="flex items-center gap-1 text-[11px] text-emerald-400">
              <ShieldCheck className="h-3 w-3" /> {product.warranty || '24T'}
            </span>
          </div>

          <div className="mt-auto pt-4">
            <div className="flex items-center gap-2 border-t border-line pt-3">
              <button
                type="button"
                onClick={handleQuickQuote}
                className="flex-1 rounded-xl border border-brand-cyan/40 bg-brand-cyan/10 py-1.5 text-center text-xs font-semibold text-brand-cyan transition hover:bg-brand-cyan hover:text-slate-950"
              >
                <FileText className="inline mr-1 h-3 w-3" />
                {pick('Báo giá nhanh', 'Quick Quote')}
              </button>
              <Link
                to={`/san-pham/${product.slug}`}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-ink transition hover:border-brand-cyan hover:text-brand-cyan"
                title={t('common.details')}
              >
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
