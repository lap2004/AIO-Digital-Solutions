import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Calculator } from 'lucide-react';
import { MAIN_NAV, COMPANY } from '@/core/constants/site';
import { cn } from '@/core/utils/cn';
import { Logo } from './Logo';
import { ThemeToggle } from '@/presentation/components/common/ThemeToggle';
import { useQuoteStore } from '@/presentation/state/quote.store';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
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
        scrolled
          ? 'border-b border-slate-200/80 bg-white/95 shadow-md dark:border-white/10 dark:bg-[#060b17]/95 backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-20 max-w-[1320px] items-center justify-between gap-6 px-6">
        {/* Brand Logo */}
        <div className="shrink-0">
          <Logo />
        </div>

        {/* Center Navigation: 5 Essential Links Only */}
        <ul className="hidden items-center gap-2 xl:gap-3 md:flex">
          {MAIN_NAV.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-semibold transition',
                    isActive
                      ? 'text-cyan-600 bg-cyan-50 font-bold dark:text-brand-cyan dark:bg-brand-cyan/15'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5',
                  )
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Conversion Actions */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <ThemeToggle />

          {/* Smart Calculator / Quote Button */}
          <Link to="/bao-gia" className="relative">
            <button className="flex items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-50 px-3.5 py-2 text-xs font-bold text-cyan-700 transition hover:bg-brand-cyan hover:text-slate-950 dark:border-brand-cyan/40 dark:bg-brand-cyan/10 dark:text-brand-cyan dark:hover:bg-brand-cyan dark:hover:text-slate-950">
              <Calculator className="h-3.5 w-3.5" />
              <span>Báo giá tự động</span>
              {count > 0 && (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-cyan-500 px-1 text-[10px] font-bold text-white dark:bg-cyan-400 dark:text-slate-950">
                  {count}
                </span>
              )}
            </button>
          </Link>

          {/* Hotline Button */}
          <a
            href={`tel:${COMPANY.hotline.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-cyan to-blue-600 px-4 py-2 text-xs font-bold text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition hover:brightness-110"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>{COMPANY.hotline}</span>
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-white/10"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-200 bg-white/95 backdrop-blur-2xl dark:border-white/10 dark:bg-[#060b17]/95 md:hidden"
          >
            <ul className="space-y-1 px-6 py-4">
              {MAIN_NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-lg px-4 py-3 text-sm font-semibold transition',
                        isActive
                          ? 'bg-cyan-50 font-bold text-cyan-700 dark:bg-brand-cyan/15 dark:text-brand-cyan'
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5',
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}

              <li className="pt-2 flex flex-col gap-2">
                <Link to="/bao-gia" className="w-full">
                  <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-50 py-2.5 text-xs font-bold text-cyan-700 dark:border-brand-cyan/40 dark:bg-brand-cyan/10 dark:text-brand-cyan">
                    <Calculator className="h-4 w-4" />
                    <span>Báo giá tự động {count > 0 && `(${count})`}</span>
                  </button>
                </Link>

                <a
                  href={`tel:${COMPANY.hotline.replace(/\s+/g, '')}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-cyan to-blue-600 py-3 text-xs font-bold text-slate-950 shadow-md"
                >
                  <Phone className="h-4 w-4" />
                  <span>Hotline: {COMPANY.hotline}</span>
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
