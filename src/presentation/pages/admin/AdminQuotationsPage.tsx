import { useMemo, useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import {
  Eye, Phone, MessageCircle, Trash2, Clock, CheckCircle2,
  AlertCircle, Sparkles, Filter, RefreshCw, Plus, Printer, FileText, User, Building, Mail
} from 'lucide-react';
import type { Quotation, QuotationStatus, QuotationRequestType } from '@/domain/entities';
import { QUOTATION_STATUS_LABEL } from '@/domain/entities';
import { formatCurrency, formatDate } from '@/core/utils/format';
import { services } from '@/app/services';
import { Modal } from '@/presentation/components/common/Modal';
import { LoadingBlock, EmptyState } from '@/presentation/components/common/Feedback';
import { AdminPageHeader } from '@/presentation/components/admin/AdminPageHeader';
import { Seo } from '@/presentation/components/common/Seo';
import { cn } from '@/core/utils/cn';

const TYPE_STYLE: Record<QuotationRequestType, { label: string; className: string }> = {
  consultation: {
    label: 'Tư vấn 24/7',
    className: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
  },
  calculator: {
    label: 'Bảng tính LED AI',
    className: 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 border-cyan-500/30',
  },
  quote: {
    label: 'Báo giá sản phẩm',
    className: 'bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30',
  },
  contact: {
    label: 'Liên hệ website',
    className: 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30',
  },
};

export default function AdminQuotationsPage() {
  const [data, setData] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<Quotation | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | QuotationStatus>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | QuotationRequestType>('all');

  const loadData = useCallback(async () => {
    try {
      const list = await services.quotations.list();
      setData(list);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 2500);
    const onQuotationsChanged = () => loadData();
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'aio.quotations') loadData();
    };

    window.addEventListener('aio-quotations-changed', onQuotationsChanged);
    window.addEventListener('storage', onStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener('aio-quotations-changed', onQuotationsChanged);
      window.removeEventListener('storage', onStorage);
    };
  }, [loadData]);

  const changeStatus = async (q: Quotation, status: QuotationStatus) => {
    await services.quotations.update(q.id, { status });
    toast.success(`Đã chuyển sang "${QUOTATION_STATUS_LABEL[status]}" (${q.code})`);
    loadData();
    setView((v) => (v && v.id === q.id ? { ...v, status } : v));
  };

  const removeQuotation = async (q: Quotation) => {
    if (window.confirm(`Bạn có chắc muốn xóa yêu cầu báo giá ${q.code} của khách hàng ${q.customerName}?`)) {
      await services.quotations.update(q.id, { status: 'rejected' });
      try {
        const stored = localStorage.getItem('aio.quotations');
        if (stored) {
          const parsed: Quotation[] = JSON.parse(stored);
          const filtered = parsed.filter((item) => item.id !== q.id);
          localStorage.setItem('aio.quotations', JSON.stringify(filtered));
          window.dispatchEvent(new Event('aio-quotations-changed'));
        }
      } catch {
        // ignore
      }
      toast.success(`Đã xóa yêu cầu ${q.code}`);
      if (view?.id === q.id) setView(null);
      loadData();
    }
  };

  const createSampleQuote = async () => {
    const samplePhones = ['0984123456', '0912345678', '0933888999', '0977654321'];
    const sampleNames = ['Nguyễn Văn Tuấn', 'Trần Thị Mai', 'Lê Quốc Hưng', 'Phạm Hoàng Long'];
    const sampleReqs: QuotationRequestType[] = ['consultation', 'calculator', 'quote', 'contact'];
    const randPhone = samplePhones[Math.floor(Math.random() * samplePhones.length)];
    const randName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const randType = sampleReqs[Math.floor(Math.random() * sampleReqs.length)];

    await services.quotations.create({
      customerName: randName,
      company: 'Công ty TNHH Quảng Cáo & Sự Kiện Mới',
      email: `khach_${Date.now()}@gmail.com`,
      phone: randPhone,
      requestType: randType,
      interest: 'Màn hình LED P2.5 trong nhà (4m × 2.5m = 10m²)',
      items: [
        {
          productId: 'indoor-p25',
          productName: 'Màn hình LED P2.5 trong nhà (4m × 2.5m = 10m²)',
          quantity: 1,
          unitPrice: 115000000,
        },
      ],
      status: 'sent',
      total: 115000000,
      note: 'Khách yêu cầu khảo sát thực tế và báo giá trọn gói bao gồm khung sắt và lắp đặt tại Hà Nội.',
      validUntil: new Date(Date.now() + 30 * 86400000).toISOString(),
    });

    toast.success('Đã tạo thử nghiệm 1 yêu cầu tư vấn mới!');
    loadData();
  };

  // Stats calculation
  const stats = useMemo(() => {
    const total = data.length;
    const sent = data.filter((q) => q.status === 'sent').length;
    const contacted = data.filter((q) => q.status === 'contacted').length;
    const approved = data.filter((q) => q.status === 'approved').length;
    const totalValue = data.reduce((sum, q) => sum + (q.total || 0), 0);
    return { total, sent, contacted, approved, totalValue };
  }, [data]);

  // Filtered list
  const filtered = useMemo(() => {
    return data.filter((q) => {
      if (statusFilter !== 'all' && q.status !== statusFilter) return false;
      if (typeFilter !== 'all') {
        const qType = q.requestType || 'quote';
        if (qType !== typeFilter) return false;
      }
      if (search.trim()) {
        const query = search.toLowerCase().trim();
        const matchName = q.customerName.toLowerCase().includes(query);
        const matchPhone = q.phone.toLowerCase().includes(query);
        const matchCode = q.code.toLowerCase().includes(query);
        const matchCompany = q.company.toLowerCase().includes(query);
        const matchNote = q.note.toLowerCase().includes(query);
        const matchInterest = (q.interest || '').toLowerCase().includes(query);
        if (!matchName && !matchPhone && !matchCode && !matchCompany && !matchNote && !matchInterest) {
          return false;
        }
      }
      return true;
    });
  }, [data, statusFilter, typeFilter, search]);

  const cleanPhone = (phone: string) => phone.replace(/[^\d+]/g, '');

  return (
    <>
      <Seo title="Yêu cầu Báo giá & Tư vấn | Quản trị AIO" />

      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <AdminPageHeader
          title="Yêu cầu Báo giá & Tư vấn"
          description="Tiếp nhận thông tin khách hàng gửi từ website, liên hệ tư vấn và chốt đơn"
        />

        <div className="flex items-center gap-2.5">
          <button
            onClick={createSampleQuote}
            className="flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-2 text-xs font-semibold text-cyan-700 dark:text-brand-cyan transition hover:bg-cyan-500/20"
            title="Thử nghiệm tạo 1 yêu cầu mới"
          >
            <Plus className="h-4 w-4" /> Thêm mẫu thử
          </button>
          <button
            onClick={loadData}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-transparent dark:text-muted dark:hover:bg-white/10 dark:hover:text-white"
            title="Làm mới dữ liệu"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="mt-4 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#0b1326] dark:shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-muted">Tổng yêu cầu tiếp nhận</span>
            <FileText className="h-5 w-5 text-cyan-600 dark:text-brand-cyan" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{stats.total}</p>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-muted">Từ mọi kênh biểu mẫu website</p>
        </div>

        {/* Needs Call (Sent) */}
        <div
          onClick={() => setStatusFilter('sent')}
          className={cn(
            'cursor-pointer rounded-2xl border p-4 shadow-sm transition-all dark:shadow-card',
            statusFilter === 'sent'
              ? 'border-amber-500 bg-amber-50/80 shadow-[0_0_15px_rgba(251,191,36,0.3)] dark:border-amber-400/80 dark:bg-amber-500/10'
              : 'border-amber-200 bg-white hover:border-amber-400 dark:border-amber-500/30 dark:bg-[#0b1326] dark:hover:border-amber-500/60',
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4" /> Chờ liên hệ (Gọi ngay)
            </span>
            {stats.sent > 0 && (
              <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_#F59E0B]" />
            )}
          </div>
          <p className="mt-2 text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.sent}</p>
          <p className="mt-1 text-[11px] text-amber-700/80 dark:text-amber-300/80">Khách đang đợi gọi tư vấn</p>
        </div>

        {/* Contacted */}
        <div
          onClick={() => setStatusFilter('contacted')}
          className={cn(
            'cursor-pointer rounded-2xl border p-4 shadow-sm transition-all dark:shadow-card',
            statusFilter === 'contacted'
              ? 'border-blue-500 bg-blue-50/80 shadow-[0_0_15px_rgba(59,130,246,0.3)] dark:border-blue-400/80 dark:bg-blue-500/10'
              : 'border-slate-200 bg-white hover:border-blue-400 dark:border-white/10 dark:bg-[#0b1326] dark:hover:border-blue-500/50',
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <Phone className="h-4 w-4" /> Đang tư vấn / Đã gọi
            </span>
            <Clock className="h-4 w-4 text-blue-500" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{stats.contacted}</p>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-muted">Đang theo sát hỗ trợ kỹ thuật</p>
        </div>

        {/* Approved */}
        <div
          onClick={() => setStatusFilter('approved')}
          className={cn(
            'cursor-pointer rounded-2xl border p-4 shadow-sm transition-all dark:shadow-card',
            statusFilter === 'approved'
              ? 'border-emerald-500 bg-emerald-50/80 shadow-[0_0_15px_rgba(34,197,94,0.3)] dark:border-emerald-400/80 dark:bg-emerald-500/10'
              : 'border-slate-200 bg-white hover:border-emerald-400 dark:border-white/10 dark:bg-[#0b1326] dark:hover:border-emerald-500/50',
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Đã chốt hợp đồng
            </span>
            <Sparkles className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.approved}</p>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-muted">Giao dịch thành công</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#0b1326] dark:shadow-card lg:flex-row lg:items-center lg:justify-between">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setStatusFilter('all')}
            className={cn(
              'rounded-xl px-3 py-1.5 text-xs font-semibold transition',
              statusFilter === 'all'
                ? 'bg-brand-cyan text-slate-950 font-bold shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 dark:text-muted dark:hover:bg-white/5 dark:hover:text-white',
            )}
          >
            Tất cả ({stats.total})
          </button>
          <button
            onClick={() => setStatusFilter('sent')}
            className={cn(
              'flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition',
              statusFilter === 'sent'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-500/10',
            )}
          >
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            Chờ liên hệ ({stats.sent})
          </button>
          <button
            onClick={() => setStatusFilter('contacted')}
            className={cn(
              'rounded-xl px-3 py-1.5 text-xs font-semibold transition',
              statusFilter === 'contacted'
                ? 'bg-blue-600 text-white font-bold'
                : 'text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10',
            )}
          >
            Đang tư vấn ({stats.contacted})
          </button>
          <button
            onClick={() => setStatusFilter('approved')}
            className={cn(
              'rounded-xl px-3 py-1.5 text-xs font-semibold transition',
              statusFilter === 'approved'
                ? 'bg-emerald-600 text-white font-bold'
                : 'text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-500/10',
            )}
          >
            Đã chốt ({stats.approved})
          </button>
          <button
            onClick={() => setStatusFilter('rejected')}
            className={cn(
              'rounded-xl px-3 py-1.5 text-xs font-semibold transition',
              statusFilter === 'rejected'
                ? 'bg-rose-600 text-white font-bold'
                : 'text-slate-500 hover:bg-slate-100 dark:text-muted dark:hover:bg-white/5 dark:hover:text-white',
            )}
          >
            Đã hủy
          </button>
        </div>

        {/* Search & Type Select */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="w-full sm:w-auto rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:border-brand-cyan focus:outline-none dark:border-white/10 dark:bg-[#080e1a] dark:text-ink"
            >
              <option value="all">Mọi loại yêu cầu</option>
              <option value="consultation">Tư vấn 24/7 (Popup)</option>
              <option value="calculator">Bảng tính LED AI</option>
              <option value="quote">Báo giá sản phẩm</option>
              <option value="contact">Liên hệ website</option>
            </select>
          </div>

          <div className="relative min-w-[220px]">
            <input
              type="text"
              placeholder="Tìm theo tên, SĐT, mã..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-brand-cyan focus:outline-none dark:border-white/10 dark:bg-[#080e1a] dark:text-white dark:placeholder-muted"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-900 dark:text-muted dark:hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Quotations List / Table */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0b1326] dark:shadow-card">
        {loading && data.length === 0 ? (
          <div className="p-12 text-center">
            <LoadingBlock />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12">
            <EmptyState
              icon={<Filter className="h-10 w-10 opacity-40 text-brand-cyan" />}
              title="Không tìm thấy yêu cầu phù hợp"
              description="Thử thay đổi bộ lọc hoặc tạo một yêu cầu mẫu mới để kiểm tra."
              action={
                <button
                  onClick={createSampleQuote}
                  className="rounded-xl bg-brand-cyan px-4 py-2 text-xs font-bold text-slate-950 shadow-glow"
                >
                  Tạo yêu cầu mẫu thử
                </button>
              }
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-800 dark:text-ink">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:border-white/10 dark:bg-white/[0.02] dark:text-muted">
                <tr>
                  <th className="px-4 py-3.5">Mã & Ngày gửi</th>
                  <th className="px-4 py-3.5">Khách hàng</th>
                  <th className="px-4 py-3.5 text-center">Gọi & Chat Zalo</th>
                  <th className="px-4 py-3.5">Nhu cầu / Nội dung</th>
                  <th className="px-4 py-3.5">Dự toán</th>
                  <th className="px-4 py-3.5">Trạng thái</th>
                  <th className="px-4 py-3.5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {filtered.map((q) => {
                  const reqType = q.requestType || 'quote';
                  const typeBadge = TYPE_STYLE[reqType] || TYPE_STYLE.quote;
                  const rawPhone = cleanPhone(q.phone);

                  return (
                    <tr
                      key={q.id}
                      className={cn(
                        'transition-colors hover:bg-slate-50/80 dark:hover:bg-white/[0.03]',
                        q.status === 'sent' && 'bg-amber-50/40 dark:bg-amber-500/[0.03]',
                      )}
                    >
                      {/* Code & Time */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {q.status === 'sent' && (
                            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
                          )}
                          <span className="font-mono text-xs font-bold text-cyan-600 dark:text-brand-cyan">{q.code}</span>
                        </div>
                        <p className="mt-1 text-[11px] text-slate-500 dark:text-muted">
                          {formatDate(q.createdAt)} (
                          {new Date(q.createdAt).toLocaleTimeString('vi-VN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                          )
                        </p>
                      </td>

                      {/* Customer Info */}
                      <td className="px-4 py-4">
                        <p className="font-semibold text-slate-900 dark:text-white">{q.customerName}</p>
                        {q.company && q.company !== 'Khách vãng lai' && (
                          <p className="text-xs text-slate-500 dark:text-muted truncate max-w-[180px]">{q.company}</p>
                        )}
                        <span
                          className={cn(
                            'mt-1.5 inline-block rounded-md border px-2 py-0.5 text-[10px] font-medium',
                            typeBadge.className,
                          )}
                        >
                          {typeBadge.label}
                        </span>
                      </td>

                      {/* Direct Call & Zalo Action Buttons */}
                      <td className="px-4 py-4 text-center whitespace-nowrap">
                        <div className="flex flex-col items-center gap-1.5">
                          <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">{q.phone}</span>
                          <div className="flex items-center gap-2">
                            {/* Direct Phone Call */}
                            <a
                              href={`tel:${rawPhone}`}
                              className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 shadow-sm transition hover:bg-emerald-500 hover:text-white"
                              title={`Bấm để gọi ${q.phone}`}
                            >
                              <Phone className="h-3.5 w-3.5" /> Gọi ngay
                            </a>

                            {/* Direct Zalo Chat */}
                            <a
                              href={`https://zalo.me/${rawPhone}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 rounded-lg border border-blue-500/40 bg-blue-500/15 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 shadow-sm transition hover:bg-blue-600 hover:text-white"
                              title={`Chat Zalo với số ${q.phone}`}
                            >
                              <MessageCircle className="h-3.5 w-3.5" /> Zalo
                            </a>
                          </div>
                        </div>
                      </td>

                      {/* Requirements / Products */}
                      <td className="px-4 py-4 max-w-xs">
                        <p className="text-xs font-medium text-slate-900 dark:text-white line-clamp-2">
                          {q.interest || q.items[0]?.productName || 'Yêu cầu tư vấn kỹ thuật'}
                        </p>
                        {q.note && (
                          <p className="mt-1 text-[11px] text-slate-500 dark:text-muted italic line-clamp-1">"{q.note}"</p>
                        )}
                        {q.items.length > 1 && (
                          <p className="mt-1 text-[10px] text-cyan-600 dark:text-cyan-400 font-medium">+{q.items.length - 1} sản phẩm khác</p>
                        )}
                      </td>

                      {/* Estimated Value */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {q.total > 0 ? formatCurrency(q.total) : 'Liên hệ / Khảo sát'}
                        </p>
                      </td>

                      {/* Status Dropdown */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <select
                          value={q.status}
                          onChange={(e) => changeStatus(q, e.target.value as QuotationStatus)}
                          className={cn(
                            'rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition focus:outline-none',
                            q.status === 'sent' && 'border-amber-400 bg-amber-50 text-amber-800 dark:border-amber-500/50 dark:bg-amber-500/10 dark:text-amber-300',
                            q.status === 'contacted' && 'border-blue-400 bg-blue-50 text-blue-800 dark:border-blue-500/50 dark:bg-blue-500/10 dark:text-blue-300',
                            q.status === 'approved' && 'border-emerald-400 bg-emerald-50 text-emerald-800 dark:border-emerald-500/50 dark:bg-emerald-500/10 dark:text-emerald-300',
                            q.status === 'rejected' && 'border-rose-400 bg-rose-50 text-rose-800 dark:border-rose-500/50 dark:bg-rose-500/10 dark:text-rose-300',
                            q.status === 'draft' && 'border-slate-300 bg-slate-50 text-slate-700 dark:border-slate-500/50 dark:bg-slate-500/10 dark:text-slate-300',
                          )}
                        >
                          <option value="sent" className="bg-white text-slate-900 dark:bg-[#0b1326] dark:text-amber-300">
                            Chờ liên hệ (Mới)
                          </option>
                          <option value="contacted" className="bg-white text-slate-900 dark:bg-[#0b1326] dark:text-blue-300">
                            Đang tư vấn / Đã gọi
                          </option>
                          <option value="approved" className="bg-white text-slate-900 dark:bg-[#0b1326] dark:text-emerald-300">
                            Đã chốt hợp đồng
                          </option>
                          <option value="rejected" className="bg-white text-slate-900 dark:bg-[#0b1326] dark:text-rose-300">
                            Hủy / Không nghe máy
                          </option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setView(q)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-cyan-500 hover:text-cyan-600 dark:border-white/10 dark:bg-transparent dark:text-ink dark:hover:border-brand-accent/50 dark:hover:text-brand-cyan"
                            title="Xem chi tiết"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => removeQuotation(q)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-rose-500 hover:text-rose-600 dark:border-white/10 dark:bg-transparent dark:text-ink dark:hover:border-rose-500/50 dark:hover:text-red-400"
                            title="Xóa yêu cầu"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detailed Modal */}
      <Modal
        open={!!view}
        onClose={() => setView(null)}
        title={view ? `Chi tiết Yêu cầu ${view.code}` : ''}
        className="max-w-2xl"
      >
        {view && (
          <div className="space-y-5">
            {/* Direct Phone / Zalo Card */}
            <div className="rounded-2xl border border-cyan-300 bg-gradient-to-r from-cyan-50 via-sky-50/50 to-blue-50 p-4 dark:border-brand-cyan/40 dark:bg-gradient-to-r dark:from-cyan-950/40 dark:via-[#0b1326] dark:to-blue-950/40">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-cyan-800 dark:text-brand-cyan font-bold">Khách hàng cần liên hệ</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{view.customerName}</p>
                  <p className="text-sm font-mono text-emerald-600 dark:text-emerald-400 font-bold">{view.phone}</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <a
                    href={`tel:${cleanPhone(view.phone)}`}
                    className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-sm transition hover:brightness-110"
                  >
                    <Phone className="h-4 w-4" /> Gọi điện ngay
                  </a>
                  <a
                    href={`https://zalo.me/${cleanPhone(view.phone)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-[#0068FF] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:brightness-110"
                  >
                    <MessageCircle className="h-4 w-4" /> Chat Zalo
                  </a>
                </div>
              </div>
            </div>

            {/* Customer Details Grid */}
            <div className="grid grid-cols-2 gap-3.5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs dark:border-white/10 dark:bg-white/[0.02]">
              <div>
                <p className="text-slate-500 dark:text-muted flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" /> Họ và tên:
                </p>
                <p className="mt-1 font-semibold text-slate-900 dark:text-white">{view.customerName}</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-muted flex items-center gap-1.5">
                  <Building className="h-3.5 w-3.5" /> Công ty / Đơn vị:
                </p>
                <p className="mt-1 font-semibold text-slate-900 dark:text-white">{view.company || 'Cá nhân'}</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-muted flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> Email:
                </p>
                <p className="mt-1 font-semibold text-slate-900 dark:text-white">{view.email}</p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-muted flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> Ngày gửi:
                </p>
                <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                  {formatDate(view.createdAt)} - {new Date(view.createdAt).toLocaleTimeString('vi-VN')}
                </p>
              </div>
            </div>

            {/* Note / Message */}
            {view.note && (
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 dark:border-white/10 dark:bg-amber-500/[0.05]">
                <p className="text-xs font-bold text-amber-800 dark:text-amber-400">Nội dung yêu cầu / Ghi chú từ khách hàng:</p>
                <p className="mt-1 text-xs text-slate-800 dark:text-ink leading-relaxed whitespace-pre-wrap">{view.note}</p>
              </div>
            )}

            {/* Items Table */}
            {view.items && view.items.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-muted">
                  Chi tiết sản phẩm / Giải pháp đề xuất:
                </p>
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-white/10 dark:bg-transparent">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-left text-slate-600 dark:bg-white/[0.04] dark:border-white/10 dark:text-muted">
                      <tr>
                        <th className="px-3 py-2">Sản phẩm / Hạng mục</th>
                        <th className="px-3 py-2 text-center">Số lượng</th>
                        <th className="px-3 py-2 text-right">Đơn giá dự toán</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {view.items.map((it, i) => (
                        <tr key={i}>
                          <td className="px-3 py-2.5 font-medium text-slate-900 dark:text-white">{it.productName}</td>
                          <td className="px-3 py-2.5 text-center text-slate-700 dark:text-ink">{it.quantity}</td>
                          <td className="px-3 py-2.5 text-right font-mono text-slate-900 dark:text-ink">
                            {it.unitPrice > 0 ? formatCurrency(it.unitPrice) : 'Liên hệ khảo sát'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Total Value */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-3 dark:border-white/10">
              <span className="text-xs font-medium text-slate-500 dark:text-muted">Tổng giá trị dự toán:</span>
              <span className="text-lg font-bold text-gradient">
                {view.total > 0 ? formatCurrency(view.total) : 'Tư vấn khảo sát'}
              </span>
            </div>

            {/* Change Status */}
            <div className="border-t border-slate-200 pt-3 dark:border-white/10">
              <label className="mb-1.5 block text-xs font-bold text-slate-900 dark:text-ink">Cập nhật tiến trình xử lý:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => changeStatus(view, 'sent')}
                  className={cn(
                    'rounded-xl border p-2 text-xs font-semibold transition',
                    view.status === 'sent'
                      ? 'border-amber-500 bg-amber-100 text-amber-900 dark:border-amber-400 dark:bg-amber-500/20 dark:text-amber-300'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-muted dark:hover:bg-white/5',
                  )}
                >
                  Chờ liên hệ
                </button>
                <button
                  type="button"
                  onClick={() => changeStatus(view, 'contacted')}
                  className={cn(
                    'rounded-xl border p-2 text-xs font-semibold transition',
                    view.status === 'contacted'
                      ? 'border-blue-500 bg-blue-100 text-blue-900 dark:border-blue-400 dark:bg-blue-500/20 dark:text-blue-300'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-muted dark:hover:bg-white/5',
                  )}
                >
                  Đang tư vấn
                </button>
                <button
                  type="button"
                  onClick={() => changeStatus(view, 'approved')}
                  className={cn(
                    'rounded-xl border p-2 text-xs font-semibold transition',
                    view.status === 'approved'
                      ? 'border-emerald-500 bg-emerald-100 text-emerald-900 dark:border-emerald-400 dark:bg-emerald-500/20 dark:text-emerald-300'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-muted dark:hover:bg-white/5',
                  )}
                >
                  Đã chốt hợp đồng
                </button>
                <button
                  type="button"
                  onClick={() => changeStatus(view, 'rejected')}
                  className={cn(
                    'rounded-xl border p-2 text-xs font-semibold transition',
                    view.status === 'rejected'
                      ? 'border-rose-500 bg-rose-100 text-rose-900 dark:border-rose-400 dark:bg-rose-500/20 dark:text-rose-300'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-muted dark:hover:bg-white/5',
                  )}
                >
                  Hủy yêu cầu
                </button>
              </div>
            </div>

            {/* Print & Close */}
            <div className="flex items-center justify-end gap-2 border-t border-slate-200 pt-3 dark:border-white/10">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-white/10 dark:bg-transparent dark:text-ink dark:hover:bg-white/5 dark:hover:text-white"
              >
                <Printer className="h-4 w-4" /> In phiếu
              </button>
              <button
                type="button"
                onClick={() => setView(null)}
                className="rounded-xl bg-slate-200 px-4 py-2 text-xs font-semibold text-slate-800 transition hover:bg-slate-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
