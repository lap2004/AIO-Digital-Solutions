import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { COMPANY, FOOTER_LINKS } from '@/core/constants/site';
import { useI18n } from '@/core/i18n';
import { Container } from '@/presentation/components/common/Container';
import { Logo } from './Logo';

const GROUP_KEY: Record<string, string> = {
  'Giải pháp': 'footer.solutions',
  'Sản phẩm': 'footer.products',
  'Công ty': 'footer.company',
};

export function Footer() {
  const { t, pick } = useI18n();
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[#020617]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent" />
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {COMPANY.legalName}. {t('footer.about')}
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                <span>{pick(COMPANY.address, COMPANY.addressEn)}</span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-brand-accent" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white">
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-brand-accent" />
                <span>{t('footer.hotline')}: {COMPANY.hotline}</span>
              </li>
              <li className="flex gap-3">
                <Clock className="h-4 w-4 shrink-0 text-brand-accent" />
                <span>{pick(COMPANY.workingHours, COMPANY.workingHoursEn)}</span>
              </li>
            </ul>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">{t(GROUP_KEY[group.title] ?? group.title)}</h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-muted transition hover:text-brand-cyan">
                      {pick(link.label, link.labelEn)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-muted md:flex-row">
          <p>
            © {new Date().getFullYear()} {COMPANY.shortName}. {t('footer.taxCode')}: {COMPANY.taxCode}. {t('footer.rights')}
          </p>
          <p>
            {t('footer.represent')}: {COMPANY.director} ·{' '}
            <Link to="/admin/login" className="hover:text-brand-cyan">
              {t('common.admin')}
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
