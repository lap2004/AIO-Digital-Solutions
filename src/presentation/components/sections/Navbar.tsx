import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, Phone } from 'lucide-react';
import { MAIN_NAV } from '@/core/constants/site';
import { cn } from '@/core/utils/cn';
import { useI18n } from '@/core/i18n';
import { Logo } from './Logo';
import { Button } from '@/presentation/components/common/Button';
import { LanguageSwitcher } from '@/presentation/components/common/LanguageSwitcher';
import { ThemeToggle } from '@/presentation/components/common/ThemeToggle';
import { useQuoteStore } from '@/presentation/state/quote.store';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { t } = useI18n();
  const count = useQuoteStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'border-b border-white/10 bg-[#020617]/85 backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-20 max-w-[1320px] items-center gap-4 px-6 py-3">
        <div className="shrink-0">
          <Logo />
        </div>

        <ul className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {MAIN_NAV.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3.5 py-2 text-sm font-medium transition',
                    isActive ? 'text-brand-cyan' : 'text-ink hover:text-white',
                  )
                }
              >
                {t(`nav.${item.to}`)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <ThemeToggle />
          <LanguageSwitcher />
          <Link to="/bao-gia" className="relative">
            <Button variant="outline" size="sm" className="w-[140px]">
              <FileText className="h-4 w-4" /> {t('common.getQuote')}
              {count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-cyan px-1 text-[11px] font-bold text-background">
                  {count}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/lien-he">
            <Button size="sm" className="w-[120px]">
              <Phone className="h-4 w-4" /> {t('common.contact')}
            </Button>
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <LanguageSwitcher />
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-[#020617]/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="space-y-1 px-6 py-4">
              {MAIN_NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-lg px-4 py-3 text-sm font-medium transition',
                        isActive ? 'bg-white/10 text-brand-cyan' : 'text-ink hover:bg-white/5',
                      )
                    }
                  >
                    {t(`nav.${item.to}`)}
                  </NavLink>
                </li>
              ))}
              <li className="flex gap-3 pt-2">
                <Link to="/bao-gia" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    {t('common.getQuote')} {count > 0 && `(${count})`}
                  </Button>
                </Link>
                <Link to="/lien-he" className="flex-1">
                  <Button size="sm" className="w-full">
                    <Phone className="h-4 w-4" /> {t('common.contact')}
                  </Button>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
