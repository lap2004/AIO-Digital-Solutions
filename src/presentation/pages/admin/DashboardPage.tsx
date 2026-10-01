import { useMemo, useEffect, useState } from 'react';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts';
import { Package, Building2, Phone, MessageCircle, AlertCircle, Eye, CheckCircle2, ArrowRight } from 'lucide-react';
import { QUOTATION_STATUS_LABEL } from '@/domain/entities';
import type { Quotation } from '@/domain/entities';
import { PRODUCT_CATEGORIES } from '@/core/constants/catalog';
import { formatNumber, formatDate } from '@/core/utils/format';
import { useAsync } from '@/presentation/hooks/useAsync';
import { services } from '@/app/services';
import { Card } from '@/presentation/components/common/Card';
import { LoadingBlock } from '@/presentation/components/common/Feedback';
import { AdminPageHeader } from '@/presentation/components/admin/AdminPageHeader';
import { Seo } from '@/presentation/components/common/Seo';
import { Link } from 'react-router-dom';
import { cn } from '@/core/utils/cn';

const COLORS = ['#00E5FF', '#0066FF', '#38BDF8', '#7C3AED', '#22C55E', '#F59E0B', '#EF4444', '#14B8A6'];

export default function DashboardPage() {
  const { data: stats, reload } = useAsync(() => services.dashboard(), []);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const { data: products } = useAsync(() => services.products.list({ pageSize: 500 }), []);

  const loadQuotes = async () => {
    try {
      const list = await services.quotations.list();
      setQuotations(list);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    loadQuotes();
    const interval = setInterval(() => {
      reload();
      loadQuotes();
    }, 3000);
    window.addEventListener('aio-quotations-changed', loadQuotes);
    return () => {
      clearInterval(interval);
      window.removeEventListener('aio-quotations-changed', loadQuotes);
    };
  }, [reload]);

  const quotesByStatus = useMemo(() => {
    const map = new Map<string, number>();
    quotations.forEach((q) => map.set(q.status, (map.get(q.status) ?? 0) + 1));
    return Object.entries(QUOTATION_STATUS_LABEL).map(([key, label]) => ({
      name: label,
      value: map.get(key) ?? 0,
    })).filter(d => d.value > 0);
  }, [quotations]);

  const productsByCategory = useMemo(() => {
    const map = new Map<string, number>();
    (products?.items ?? []).forEach((p) => map.set(p.category, (map.get(p.category) ?? 0) + 1));
    return PRODUCT_CATEGORIES.map((c) => ({ name: c.name, value: map.get(c.slug) ?? 0 })).filter((d) => d.value > 0);
  }, [products]);

  const pendingQuotes = useMemo(() => {
    return quotations.filter((q) => q.status === 'sent').slice(0, 5);
  }, [quotations]);

  const totalPending = useMemo(() => {
    return quotations.filter((q) => q.status === 'sent').length;
  }, [quotations]);

  const totalApproved = useMemo(() => {
    return quotations.filter((q) => q.status === 'approved').length;
  }, [quotations]);

  if (!stats) return <LoadingBlock />;

  const tiles = [
    { label: 'Lượt xem website', value: stats.totalVisitors, icon: Eye, tone: 'text-blue-600 dark:text-blue-400' },
    { label: 'Yêu cầu chờ gọi tư vấn', value: totalPending, icon: AlertCircle, tone: 'text-amber-600 dark:text-amber-400', isHighlight: totalPending > 0 },
    { label: 'Hợp đồng đã chốt', value: totalApproved, icon: CheckCircle2, tone: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Sản phẩm LED', value: stats.totalProducts, icon: Package, tone: 'text-cyan-600 dark:text-brand-cyan' },
    { label: 'Dự án thực tế', value: stats.totalProjects, icon: Building2, tone: 'text-purple-600 dark:text-brand-accent' },
  ];

  const cleanPhone = (phone: string) => phone.replace(/[^\d+]/g, '');

  return (
    <>
      <Seo title="Tổng quan | Quản trị AIO" />
      <AdminPageHeader title="Tổng quan hệ thống" description="Bảng điều khiển hoạt động kinh doanh & tiếp nhận tư vấn AIO Digital Solutions" />

      {/* Top Stat Tiles */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {tiles.map((t) => (
          <Card key={t.label} className={cn('p-5', t.isHighlight && 'border-amber-400/80 bg-amber-50/70 dark:border-amber-500/40 dark:bg-amber-500/[0.04]')}>
            <div className="flex items-center justify-between">
              <t.icon className={`h-6 w-6 ${t.tone}`} />
              {t.isHighlight && <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_#F59E0B]" />}
            </div>
            <div className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{formatNumber(t.value)}</div>
            <div className="text-xs text-slate-500 dark:text-muted">{t.label}</div>
          </Card>
        ))}
      </div>

      {/* Urgent Action Needed Box */}
      <div className="mt-6 rounded-2xl border border-amber-300 bg-white p-5 shadow-sm dark:border-amber-500/30 dark:bg-[#0b1326] dark:shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-4 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="flex h-3 w-3 rounded-full bg-amber-500 animate-ping" />
            <h3 className="font-bold text-slate-900 dark:text-white">Yêu cầu Báo giá & Tư vấn mới nhất (Cần gọi ngay)</h3>
          </div>
          <Link
            to="/admin/bao-gia"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-cyan hover:underline"
          >
            Xem tất cả {quotations.length} yêu cầu <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {pendingQuotes.length === 0 ? (
          <div className="py-6 text-center text-xs text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-2">
            <CheckCircle2 className="h-4 w-4" /> Đã xử lý toàn bộ các yêu cầu tư vấn! Không có yêu cầu nào đang chờ.
          </div>
        ) : (
          <div className="mt-3 divide-y divide-slate-100 dark:divide-white/5">
            {pendingQuotes.map((q) => {
              const rawPhone = cleanPhone(q.phone);
              return (
                <div key={q.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 dark:text-white">{q.customerName}</span>
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-cyan-700 dark:bg-white/5 dark:text-brand-cyan">
                        {q.code}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-600 dark:text-muted line-clamp-1">
                      {q.interest || q.note || 'Yêu cầu tư vấn kỹ thuật'}
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-muted">{formatDate(q.createdAt)}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 mr-2">{q.phone}</span>
                    <a
                      href={`tel:${rawPhone}`}
                      className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 shadow-sm transition hover:bg-emerald-500 hover:text-white"
                    >
                      <Phone className="h-3.5 w-3.5" /> Gọi ngay
                    </a>
                    <a
                      href={`https://zalo.me/${rawPhone}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg border border-blue-500/40 bg-blue-500/15 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 shadow-sm transition hover:bg-blue-600 hover:text-white"
                    >
                      <MessageCircle className="h-3.5 w-3.5" /> Zalo
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Charts Grid */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 font-bold text-slate-900 dark:text-white">Doanh thu dự toán theo tháng (tỷ ₫)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={stats.revenueData}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#00E5FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.5} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ background: '#0b1326', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
              <Area type="monotone" dataKey="value" stroke="#00E5FF" strokeWidth={2} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 font-bold text-slate-900 dark:text-white">Tiến độ xử lý Yêu cầu Báo giá</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={quotesByStatus}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.5} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={12} allowDecimals={false} />
              <Tooltip contentStyle={{ background: '#0b1326', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {quotesByStatus.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h3 className="mb-4 font-bold text-slate-900 dark:text-white">Phân bổ sản phẩm LED theo danh mục</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={productsByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={(e: { name?: string; value?: number }) => `${e.name}: ${e.value}`} labelLine={false} fontSize={11}>
                {productsByCategory.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#0b1326', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  );
}
