import { Suspense, useState } from 'react';
import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom';
import { LoadingBlock } from '@/presentation/components/common/Feedback';
import {
  LayoutDashboard, Package, Building2, Users, FileText, LogOut, Menu, ExternalLink,
} from 'lucide-react';
import { USER_ROLE_LABEL } from '@/domain/entities';
import { useAuthStore } from '@/presentation/state/auth.store';
import { Logo } from '@/presentation/components/sections/Logo';
import { ThemeToggle } from '@/presentation/components/common/ThemeToggle';
import { cn } from '@/core/utils/cn';

const NAV = [
  { to: '/admin', label: 'Tổng quan', icon: LayoutDashboard, end: true },
  { to: '/admin/san-pham', label: 'Sản phẩm', icon: Package },
  { to: '/admin/du-an', label: 'Dự án', icon: Building2 },
  { to: '/admin/crm', label: 'CRM - Khách hàng', icon: Users },
  { to: '/admin/bao-gia', label: 'Báo giá', icon: FileText },
];

export function AdminLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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
        <nav className="space-y-1 p-3">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition',
                  isActive
                    ? 'bg-brand-gradient text-white shadow-glow'
                    : 'text-ink hover:bg-white/5 hover:text-white',
                )
              }
            >
              <Icon className="h-5 w-5" />
              {label}
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
