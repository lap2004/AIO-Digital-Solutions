import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Clock, ShieldCheck, MessageSquare } from 'lucide-react';
import { COMPANY, FOOTER_LINKS } from '@/core/constants/site';
import { useI18n } from '@/core/i18n';
import { Container } from '@/presentation/components/common/Container';
import { Logo } from './Logo';

const GROUP_KEY: Record<string, string> = {
  'Giải pháp cốt lõi': 'footer.solutions',
  'Sản phẩm nổi bật': 'footer.products',
  'Dịch vụ & Tiện ích': 'footer.company',
};

export function Footer() {
  const { t, pick } = useI18n();

  return (
    <footer className="relative mt-24 border-t border-slate-200 bg-slate-50 text-slate-600 dark:border-white/10 dark:bg-[#040914] dark:text-slate-300">
      {/* Top neon glow beam */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 dark:via-brand-cyan/60 to-transparent" />

      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Company identity column */}
          <div>
            <Logo />
            <p className="mt-5 text-sm font-bold leading-relaxed text-slate-900 dark:text-white">
              {COMPANY.legalName}
            </p>
            <ul className="mt-6 space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600 dark:text-brand-cyan" />
                <span>{pick(COMPANY.address, COMPANY.addressEn)}</span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-cyan-600 dark:text-brand-cyan" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-cyan-600 dark:hover:text-brand-cyan transition">
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-cyan-600 dark:text-brand-cyan" />
                <span>
                  Hotline 24/7: <a href={`tel:${COMPANY.hotline.replace(/\s+/g, '')}`} className="font-bold text-cyan-600 dark:text-brand-cyan hover:underline">{COMPANY.hotline}</a>
                </span>
              </li>
              <li className="flex gap-3">
                <Clock className="h-4 w-4 shrink-0 text-cyan-600 dark:text-brand-cyan" />
                <span>{pick(COMPANY.workingHours, COMPANY.workingHoursEn)}</span>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={COMPANY.zalo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-50 text-blue-600 transition hover:bg-blue-100 dark:border-blue-500/30 dark:bg-blue-600/10 dark:text-blue-400 dark:hover:bg-blue-600/20 px-3.5 py-2 text-xs font-semibold"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Chat Zalo tư vấn</span>
              </a>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400 px-3 py-2 text-xs font-semibold">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Cứu hộ SLA 2h-4h</span>
              </span>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                {t(GROUP_KEY[group.title] ?? group.title)}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link
                      to={link.to}
                      className="text-xs text-slate-600 transition hover:text-cyan-600 dark:text-slate-400 dark:hover:text-brand-cyan"
                    >
                      {pick(link.label, link.labelEn)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex-row dark:border-white/10 dark:text-slate-400">
          <p>
            © {new Date().getFullYear()} {COMPANY.shortName} (AIO LED). Bảo lưu mọi quyền.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/gioi-thieu" className="hover:text-cyan-600 dark:hover:text-brand-cyan transition">
              Hồ sơ năng lực
            </Link>
            <span>·</span>
            <Link to="/bao-gia" className="hover:text-cyan-600 dark:hover:text-brand-cyan transition">
              Báo giá tự động AI
            </Link>
            <span>·</span>
            <Link to="/admin/login" className="hover:text-cyan-600 dark:hover:text-brand-cyan transition">
              {t('common.admin')}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
