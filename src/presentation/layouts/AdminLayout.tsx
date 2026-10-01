import { Suspense, useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom';
import { LoadingBlock } from '@/presentation/components/common/Feedback';
import {
  LayoutDashboard, Package, Building2, FileText, LogOut, Menu, ExternalLink, Bell,
} from 'lucide-react';
import { USER_ROLE_LABEL } from '@/domain/entities';
import { useAuthStore } from '@/presentation/state/auth.store';
import { Logo } from '@/presentation/components/sections/Logo';
import { ThemeToggle } from '@/presentation/components/common/ThemeToggle';
import { cn } from '@/core/utils/cn';
import { services } from '@/app/services';

const NAV = [
  { to: '/admin', label: 'Tổng quan', icon: LayoutDashboard, end: true },
  { to: '/admin/bao-gia', label: 'Báo giá & Tư vấn', icon: FileText, showBadge: true },
  { to: '/admin/san-pham', label: 'Sản phẩm', icon: Package },
  { to: '/admin/du-an', label: 'Dự án thực tế', icon: Building2 },
];

export function AdminLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [recentQuotes, setRecentQuotes] = useState<any[]>([]);

  const fetchQuotes = async () => {
    try {
      const list = await services.quotations.list();
      const pending = list.filter((q) => q.status === 'sent');
      setPendingCount(pending.length);
      setRecentQuotes(list.slice(0, 5));
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchQuotes();
    const interval = setInterval(fetchQuotes, 3000);
    window.addEventListener('aio-quotations-changed', fetchQuotes);
    return () => {
      clearInterval(interval);
      window.removeEventListener('aio-quotations-changed', fetchQuotes);
    };
  }, []);

  if (!user) return <Navigate to="/admin/login" replace />;

  return (
    <div className="flex min-h-screen bg-[#020617]">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 border-r border-white/10 bg-[#0b1326] transition-transform lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center border-b border-white/10 px-5">
          <Logo to="/admin" />
        </div>
        <nav className="space-y-1.5 p-3">
          {NAV.map(({ to, label, icon: Icon, end, showBadge }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition',
                  isActive
                    ? 'bg-brand-gradient text-white shadow-glow'
                    : 'text-ink hover:bg-white/5 hover:text-white',
                )
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 shrink-0" />
                <span>{label}</span>
              </div>
              {showBadge && pendingCount > 0 && (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-amber-400 px-1.5 text-[11px] font-bold text-slate-950 shadow-[0_0_10px_rgba(251,191,36,0.6)]">
                  {pendingCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="absolute inset-x-0 bottom-0 border-t border-white/10 p-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-ink transition hover:bg-white/5 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" /> Xem website
          </a>
        </div>
      </aside>

      {open && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-[#020617]/85 px-5 backdrop-blur-xl">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Mở menu">
            <Menu className="h-5 w-5 text-white" />
          </button>
          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
            
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifs(!showNotifs)} 
                className="relative flex h-10 w-10 items-center justify-center rounded-lg text-muted transition hover:bg-white/10 hover:text-white" 
                aria-label="Thông báo"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-2.5 top-2.5 flex h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_8px_#00E5FF]"></span>
              </button>
              
              {showNotifs && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifs(false)} />
                  <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl border border-white/10 bg-[#0b1326] shadow-card overflow-hidden">
                    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-white/[0.02]">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-white">Yêu cầu Báo giá & Tư vấn</h3>
                        {pendingCount > 0 && (
                          <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                            {pendingCount} mới
                          </span>
                        )}
                      </div>
                      <NavLink
                        to="/admin/bao-gia"
                        onClick={() => setShowNotifs(false)}
                        className="text-xs text-brand-cyan hover:text-white transition"
                      >
                        Xem tất cả
                      </NavLink>
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
                      {recentQuotes.length === 0 ? (
                        <div className="py-6 text-center text-xs text-muted">Chưa có yêu cầu mới</div>
                      ) : (
                        recentQuotes.map((q) => (
                          <div
                            key={q.id}
                            onClick={() => {
                              setShowNotifs(false);
                              navigate('/admin/bao-gia');
                            }}
                            className={cn(
                              'rounded-xl p-3 transition hover:bg-white/5 cursor-pointer',
                              q.status === 'sent' && 'bg-cyan-500/[0.06] border border-cyan-500/20',
                            )}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                {q.status === 'sent' && (
                                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                                )}
                                <span className="text-xs font-bold text-white">{q.customerName}</span>
                              </div>
                              <span className="text-[10px] font-mono text-brand-cyan">{q.code}</span>
                            </div>
                            <p className="mt-1 text-xs text-ink/80 line-clamp-1">{q.interest || q.note || 'Yêu cầu tư vấn'}</p>
                            <div className="mt-2 flex items-center justify-between text-[11px] text-muted">
                              <span className="font-medium text-emerald-400">{q.phone}</span>
                              <span>{new Date(q.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="text-right">
              <p className="text-sm font-semibold text-white">{user.name}</p>
              <p className="text-xs text-brand-accent">{USER_ROLE_LABEL[user.role]}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient font-bold text-white">
              {user.name.charAt(0)}
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/admin/login');
              }}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-muted transition hover:bg-white/10 hover:text-red-400"
              aria-label="Đăng xuất"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>
        <main className="flex-1 p-5 lg:p-8">
          <Suspense fallback={<LoadingBlock />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
