import { useMemo, useState, useEffect } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import { Eye } from 'lucide-react';
import type { Quotation, QuotationStatus } from '@/domain/entities';
import { QUOTATION_STATUS_LABEL } from '@/domain/entities';
import { formatCurrency, formatDate } from '@/core/utils/format';
import { useAsync } from '@/presentation/hooks/useAsync';
import { services } from '@/app/services';
import { Badge } from '@/presentation/components/common/Badge';
import { Modal } from '@/presentation/components/common/Modal';
import { Select } from '@/presentation/components/common/Field';
import { LoadingBlock } from '@/presentation/components/common/Feedback';
import { DataTable } from '@/presentation/components/admin/DataTable';
import { AdminPageHeader } from '@/presentation/components/admin/AdminPageHeader';
import { Seo } from '@/presentation/components/common/Seo';

const TONE: Record<QuotationStatus, 'default' | 'info' | 'success' | 'danger'> = {
  draft: 'default', sent: 'info', approved: 'success', rejected: 'danger',
};

export default function AdminQuotationsPage() {
  const { data, loading, reload } = useAsync(() => services.quotations.list(), []);
  const [view, setView] = useState<Quotation | null>(null);

  useEffect(() => {
    const interval = setInterval(() => reload(), 2000);
    return () => clearInterval(interval);
  }, [reload]);

  const changeStatus = async (q: Quotation, status: QuotationStatus) => {
    await services.quotations.update(q.id, { status });
    toast.success(`Đã cập nhật trạng thái báo giá ${q.code}`);
    reload();
    setView((v) => (v ? { ...v, status } : v));
  };

  const columns = useMemo<ColumnDef<Quotation, unknown>[]>(
    () => [
      { header: 'Mã', accessorKey: 'code', cell: ({ getValue }) => <span className="font-mono text-brand-cyan">{getValue() as string}</span> },
      { header: 'Khách hàng', accessorKey: 'customerName', cell: ({ row }) => (
        <div><p className="font-medium text-white">{row.original.customerName}</p><p className="text-xs text-muted">{row.original.company}</p></div>
      ) },
      { header: 'Số SP', accessorFn: (r) => r.items.length, id: 'count' },
      { header: 'Tổng', accessorKey: 'total', cell: ({ getValue }) => formatCurrency(getValue() as number) },
      { header: 'Trạng thái', accessorKey: 'status', cell: ({ getValue }) => <Badge tone={TONE[getValue() as QuotationStatus]}>{QUOTATION_STATUS_LABEL[getValue() as QuotationStatus]}</Badge> },
      { header: 'Ngày tạo', accessorKey: 'createdAt', cell: ({ getValue }) => formatDate(getValue() as string) },
      {
        header: '', id: 'actions', enableSorting: false,
        cell: ({ row }) => (
          <button onClick={() => setView(row.original)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-ink hover:border-brand-accent/50 hover:text-brand-cyan" aria-label="Xem"><Eye className="h-4 w-4" /></button>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <Seo title="Quản lý báo giá | AIO" />
      <AdminPageHeader title="Quản lý báo giá" description="Theo dõi và xử lý yêu cầu báo giá từ khách hàng" />
      {loading && !data ? <LoadingBlock /> : <DataTable data={data ?? []} columns={columns} searchPlaceholder="Tìm mã, khách hàng…" />}

      <Modal open={!!view} onClose={() => setView(null)} title={view ? `Báo giá ${view.code}` : ''} className="max-w-xl">
        {view && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-muted">Khách hàng</p><p className="font-semibold text-white">{view.customerName}</p></div>
              <div><p className="text-muted">Công ty</p><p className="font-semibold text-white">{view.company}</p></div>
              <div><p className="text-muted">Email</p><p className="font-semibold text-white">{view.email}</p></div>
              <div><p className="text-muted">Điện thoại</p><p className="font-semibold text-white">{view.phone}</p></div>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-white/[0.04] text-left text-xs text-muted">
                  <tr><th className="px-3 py-2">Sản phẩm</th><th className="px-3 py-2">SL</th><th className="px-3 py-2 text-right">Đơn giá</th></tr>
                </thead>
                <tbody>
                  {view.items.map((it, i) => (
                    <tr key={i} className="border-t border-white/5">
                      <td className="px-3 py-2 text-white">{it.productName}</td>
                      <td className="px-3 py-2 text-ink">{it.quantity}</td>
                      <td className="px-3 py-2 text-right text-ink">{it.unitPrice ? formatCurrency(it.unitPrice) : 'Liên hệ'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Tổng giá trị</span>
              <span className="text-lg font-bold text-gradient">{view.total ? formatCurrency(view.total) : 'Chờ báo giá'}</span>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Cập nhật trạng thái</label>
              <Select value={view.status} onChange={(e) => changeStatus(view, e.target.value as QuotationStatus)}>
                {(Object.keys(QUOTATION_STATUS_LABEL) as QuotationStatus[]).map((s) => (
                  <option key={s} value={s}>{QUOTATION_STATUS_LABEL[s]}</option>
                ))}
              </Select>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
