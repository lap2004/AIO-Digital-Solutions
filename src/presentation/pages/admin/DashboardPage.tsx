import { useMemo, useEffect } from 'react';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts';
import { Package, Building2, FileText, TrendingUp, Eye } from 'lucide-react';
import { LEAD_STATUS_LABEL } from '@/domain/entities';
import { PRODUCT_CATEGORIES } from '@/core/constants/catalog';
import { formatCompact, formatNumber } from '@/core/utils/format';
import { useAsync } from '@/presentation/hooks/useAsync';
import { services } from '@/app/services';
import { Card } from '@/presentation/components/common/Card';
import { LoadingBlock } from '@/presentation/components/common/Feedback';
import { AdminPageHeader } from '@/presentation/components/admin/AdminPageHeader';
import { Seo } from '@/presentation/components/common/Seo';

const COLORS = ['#00E5FF', '#0066FF', '#38BDF8', '#7C3AED', '#22C55E', '#F59E0B', '#EF4444', '#14B8A6'];


export default function DashboardPage() {
  const { data: stats, reload } = useAsync(() => services.dashboard(), []);
  const { data: leads } = useAsync(() => services.leads.list(), []);
  const { data: products } = useAsync(() => services.products.list({ pageSize: 500 }), []);

  useEffect(() => {
    const interval = setInterval(() => reload(), 2000);
    return () => clearInterval(interval);
  }, [reload]);

  const leadsByStatus = useMemo(() => {
    const map = new Map<string, number>();
    (leads ?? []).forEach((l) => map.set(l.status, (map.get(l.status) ?? 0) + 1));
    return Object.entries(LEAD_STATUS_LABEL).map(([key, label]) => ({ name: label, value: map.get(key) ?? 0 }));
  }, [leads]);

  const productsByCategory = useMemo(() => {
    const map = new Map<string, number>();
    (products?.items ?? []).forEach((p) => map.set(p.category, (map.get(p.category) ?? 0) + 1));
    return PRODUCT_CATEGORIES.map((c) => ({ name: c.name, value: map.get(c.slug) ?? 0 })).filter((d) => d.value > 0);
  }, [products]);

  if (!stats) return <LoadingBlock />;

  const tiles = [
    { label: 'Lượt truy cập hiện tại', value: stats.totalVisitors, icon: Eye, tone: 'text-blue-400' },
    { label: 'Sản phẩm', value: stats.totalProducts, icon: Package, tone: 'text-brand-cyan' },
    { label: 'Dự án', value: stats.totalProjects, icon: Building2, tone: 'text-brand-accent' },
    { label: 'Báo giá', value: stats.totalQuotations, icon: FileText, tone: 'text-amber-400' },
    { label: 'Deal thành công', value: stats.wonLeads, icon: TrendingUp, tone: 'text-emerald-400' },
  ];

  return (
    <>
      <Seo title="Tổng quan | Quản trị AIO" />
      <AdminPageHeader title="Tổng quan" description="Bảng điều khiển hệ thống AIO Digital Solutions" />

      {/* Tiles */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {tiles.map((t) => (
          <Card key={t.label} className="p-5">
            <t.icon className={`h-7 w-7 ${t.tone}`} />
            <div className="mt-3 text-2xl font-bold text-white">{formatNumber(t.value)}</div>
            <div className="text-xs text-muted">{t.label}</div>
          </Card>
        ))}
      </div>

      {/* Pipeline value highlight */}
      <Card className="mt-4 flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted">Tổng giá trị pipeline (đang theo đuổi)</p>
          <p className="text-3xl font-bold text-gradient">{formatNumber(stats.pipelineValue)} ₫</p>
        </div>
        <span className="text-sm text-emerald-400">{stats.wonLeads} deal đã chốt</span>
      </Card>

      {/* Charts */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 font-bold text-white">Doanh thu theo tháng (tỷ ₫)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={stats.revenueData}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00E5FF" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#00E5FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip contentStyle={{ background: '#0b1326', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
              <Area type="monotone" dataKey="value" stroke="#00E5FF" strokeWidth={2} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 font-bold text-white">Khách hàng theo trạng thái</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={leadsByStatus}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={12} allowDecimals={false} />
              <Tooltip contentStyle={{ background: '#0b1326', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {leadsByStatus.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h3 className="mb-4 font-bold text-white">Phân bổ sản phẩm theo danh mục</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={productsByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} label={(e: { name?: string; value?: number }) => `${e.name}: ${e.value}`} labelLine={false} fontSize={11}>
                {productsByCategory.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#0b1326', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <p className="mt-4 text-right text-xs text-muted">Dữ liệu thực tế · {formatCompact(stats.pipelineValue)} pipeline</p>
    </>
  );
}
