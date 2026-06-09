import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { COMPANY, FOOTER_LINKS } from '@/core/constants/site';
import { Container } from '@/presentation/components/common/Container';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[#020617]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent" />
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {COMPANY.legalName}. Giải pháp công nghệ số toàn diện: màn hình LED, Smart City, Camera AI, IoT
              và chuyển đổi số.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                <span>{COMPANY.address}</span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-brand-accent" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white">
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-brand-accent" />
                <span>Hotline: {COMPANY.hotline}</span>
              </li>
              <li className="flex gap-3">
                <Clock className="h-4 w-4 shrink-0 text-brand-accent" />
                <span>{COMPANY.workingHours}</span>
              </li>
            </ul>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-muted transition hover:text-brand-cyan">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-muted md:flex-row">
          <p>
            © {new Date().getFullYear()} {COMPANY.shortName}. MST: {COMPANY.taxCode}. Bảo lưu mọi quyền.
          </p>
          <p>
            Người đại diện: {COMPANY.director} ·{' '}
            <Link to="/admin/login" className="hover:text-brand-cyan">
              Quản trị
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
