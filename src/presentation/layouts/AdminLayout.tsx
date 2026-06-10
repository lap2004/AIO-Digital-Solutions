import { Suspense, useState } from 'react';
import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom';
import { LoadingBlock } from '@/presentation/components/common/Feedback';
import {
  LayoutDashboard, Package, Building2, Users, FileText, LogOut, Menu, ExternalLink, Bell,
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

const MOCK_NOTIFS = [
  { id: 1, title: 'Yêu cầu báo giá mới', desc: 'Có yêu cầu báo giá dự án màn hình ghép LED từ tập đoàn Vingroup.', time: '10 phút trước', unread: true },
  { id: 2, title: 'Tin nhắn khách hàng', desc: 'Anh Nguyễn Văn A vừa để lại lời nhắn trên website cần tư vấn gấp.', time: '1 giờ trước', unread: true },
  { id: 3, title: 'Cập nhật hệ thống', desc: 'Dữ liệu tồn kho vừa được đồng bộ thành công với máy chủ.', time: 'Hôm qua', unread: false },
];

export function AdminLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

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
                  <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-white/10 bg-[#0b1326] shadow-card overflow-hidden">
                    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-white/[0.02]">
                      <h3 className="font-semibold text-white">Thông báo</h3>
                      <button className="text-xs text-brand-cyan hover:text-white transition">Đánh dấu đã đọc</button>
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
                      {MOCK_NOTIFS.map(n => (
                        <div key={n.id} className={cn("rounded-xl p-3 transition hover:bg-white/5 cursor-pointer", n.unread && "bg-white/[0.03]")}>
                           <div className="flex items-start gap-3">
                             {n.unread && <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-cyan shadow-[0_0_8px_#00E5FF]"></div>}
                             <div>
                               <p className={cn("text-sm", n.unread ? "font-semibold text-white" : "font-medium text-ink")}>{n.title}</p>
                               <p className="mt-1 text-xs text-muted leading-relaxed line-clamp-2">{n.desc}</p>
                               <p className="mt-2 text-[10px] uppercase tracking-wider text-muted">{n.time}</p>
                             </div>
                           </div>
                        </div>
                      ))}
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
