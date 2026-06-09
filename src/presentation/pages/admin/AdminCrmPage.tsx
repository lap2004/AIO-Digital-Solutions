import { useMemo, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Phone, Mail, Building2, MoveRight, FileText, Tag, Trash2 } from 'lucide-react';
import type { Lead, LeadStatus } from '@/domain/entities';
import { LEAD_STATUS_FLOW, LEAD_STATUS_LABEL } from '@/domain/entities';
import { formatCompact } from '@/core/utils/format';
import { useAsync } from '@/presentation/hooks/useAsync';
import { services } from '@/app/services';
import { Modal } from '@/presentation/components/common/Modal';
import { Button } from '@/presentation/components/common/Button';
import { Badge } from '@/presentation/components/common/Badge';
import { Card } from '@/presentation/components/common/Card';
import { LoadingBlock } from '@/presentation/components/common/Feedback';
import { AdminPageHeader } from '@/presentation/components/admin/AdminPageHeader';
import { Seo } from '@/presentation/components/common/Seo';

const STATUS_TONE: Record<LeadStatus, 'info' | 'warning' | 'purple' | 'brand' | 'success' | 'danger'> = {
  new: 'info', contacted: 'brand', negotiation: 'warning', won: 'success', lost: 'danger',
};

export default function AdminCrmPage() {
  const { data, loading, reload } = useAsync(() => services.leads.list(), []);
  const [board, setBoard] = useState<Lead[] | null>(null);
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);
  const leads = board ?? data;

  useEffect(() => {
    const interval = setInterval(() => reload(), 2000);
    return () => clearInterval(interval);
  }, [reload]);

  const move = async (lead: Lead, status: LeadStatus) => {
    setBoard((leads ?? []).map((l) => (l.id === lead.id ? { ...l, status } : l)));
    await services.leads.move(lead.id, status);
    toast.success(`Đã chuyển "${lead.name}" → ${LEAD_STATUS_LABEL[status]}`);
    reload();
    setBoard(null);
  };

  const removeLead = async (lead: Lead) => {
    if (!confirm(`Bạn có chắc muốn xóa khách hàng "${lead.name}" không? Thao tác này không thể hoàn tác.`)) return;
    await services.leads.remove(lead.id);
    toast.success(`Đã xóa "${lead.name}"`);
    reload();
  };

  const grouped = useMemo(() => {
    const map = new Map<LeadStatus, Lead[]>();
    LEAD_STATUS_FLOW.forEach((s) => map.set(s, []));
    (leads ?? []).forEach((l) => map.get(l.status)?.push(l));
    return map;
  }, [leads]);

  if (loading && !data) return <LoadingBlock />;

  return (
    <>
      <Seo title="CRM - Khách hàng | AIO" />
      <AdminPageHeader title="CRM — Pipeline khách hàng" description="Quản lý cơ hội bán hàng theo từng giai đoạn" />

      <div className="flex gap-4 overflow-x-auto pb-4">
        {LEAD_STATUS_FLOW.map((status) => {
          const list = grouped.get(status) ?? [];
          const value = list.reduce((s, l) => s + l.estimatedValue, 0);
          return (
            <div key={status} className="flex min-w-[260px] flex-1 flex-col">
              <div className="mb-3 flex flex-col gap-1.5">
                <div className="flex items-start justify-between gap-2">
                  <Badge tone={STATUS_TONE[status]} className="w-fit">{LEAD_STATUS_LABEL[status]}</Badge>
                  <span className="shrink-0 text-xs font-semibold text-brand-accent">{formatCompact(value)} ₫</span>
                </div>
                <span className="text-xs text-muted">{list.length} khách hàng</span>
              </div>
              <div className="flex-1 space-y-3 rounded-2xl border border-white/5 bg-white/[0.02] p-3">
                {list.map((lead) => {
                  const idx = LEAD_STATUS_FLOW.indexOf(lead.status);
                  const next = LEAD_STATUS_FLOW[idx + 1];
                  return (
                    <Card key={lead.id} className="p-4">
                      <p className="font-semibold text-white">{lead.name}</p>
                      <div className="mt-2 space-y-2 text-xs text-muted">
                        {lead.company && (
                          <p className="flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" /> {lead.company}</p>
                        )}
                        <a href={`tel:${lead.phone.replace(/\s/g, '')}`} className="flex w-fit items-center gap-1.5 text-white/90 hover:text-brand-cyan hover:underline">
                          <Phone className="h-3.5 w-3.5" /> {lead.phone}
                        </a>
                        <a href={`mailto:${lead.email}`} className="flex w-fit items-center gap-1.5 truncate text-white/90 hover:text-brand-cyan hover:underline">
                          <Mail className="h-3.5 w-3.5" /> {lead.email}
                        </a>
                      </div>
                      <p className="mt-2 text-xs text-ink">Quan tâm: {lead.interest}</p>
                      {lead.estimatedValue > 0 && (
                        <p className="mt-1 text-sm font-semibold text-brand-cyan">{formatCompact(lead.estimatedValue)} ₫</p>
                      )}
                      <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                        <button
                          onClick={() => setViewingLead(lead)}
                          className="flex items-center gap-1 text-[11px] font-medium text-muted hover:text-white"
                        >
                          <FileText className="h-3.5 w-3.5" /> Xem chi tiết
                        </button>
                        {lead.status === 'negotiation' ? (
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => move(lead, 'lost')}
                              className="text-xs font-semibold text-red-400 hover:underline"
                            >
                              Thất bại
                            </button>
                            <button
                              onClick={() => move(lead, 'won')}
                              className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:underline"
                            >
                              Thành công <MoveRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : lead.status === 'won' || lead.status === 'lost' ? (
                          <button
                            onClick={() => removeLead(lead)}
                            className="flex items-center gap-1 text-xs font-medium text-red-400/80 hover:text-red-400 hover:underline"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Xóa đơn
                          </button>
                        ) : next && next !== 'lost' ? (
                          <button
                            onClick={() => move(lead, next)}
                            className="flex items-center gap-1 text-xs font-semibold text-brand-cyan hover:underline"
                          >
                            {LEAD_STATUS_LABEL[next]} <MoveRight className="h-3.5 w-3.5" />
                          </button>
                        ) : null}
                      </div>
                    </Card>
                  );
                })}
                {list.length === 0 && <p className="py-6 text-center text-xs text-muted">Trống</p>}
              </div>
            </div>
          );
        })}
      </div>

      <Modal open={!!viewingLead} onClose={() => setViewingLead(null)} title="Chi tiết khách hàng">
        {viewingLead && (
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2">
                <Badge tone={STATUS_TONE[viewingLead.status]}>{LEAD_STATUS_LABEL[viewingLead.status]}</Badge>
                <span className="text-xs text-muted">{new Date(viewingLead.createdAt).toLocaleString('vi-VN')}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white">{viewingLead.name}</h3>
              {viewingLead.company && <p className="text-sm text-muted">{viewingLead.company}</p>}
            </div>

            <div className="grid gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-sm">
              <a href={`tel:${viewingLead.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-white/90 hover:text-brand-cyan hover:underline">
                <Phone className="h-4 w-4 text-brand-cyan" /> {viewingLead.phone}
              </a>
              <a href={`mailto:${viewingLead.email}`} className="flex items-center gap-2 text-white/90 hover:text-brand-cyan hover:underline">
                <Mail className="h-4 w-4 text-brand-cyan" /> {viewingLead.email}
              </a>
            </div>

            <div className="space-y-3">
              <div>
                <p className="flex items-center gap-2 text-sm font-medium text-white">
                  <Tag className="h-4 w-4 text-brand-accent" /> Nhu cầu quan tâm
                </p>
                <p className="mt-1 rounded-lg bg-white/5 p-3 text-sm text-ink">{viewingLead.interest}</p>
              </div>

              {viewingLead.note && (
                <div>
                  <p className="flex items-center gap-2 text-sm font-medium text-white">
                    <FileText className="h-4 w-4 text-brand-accent" /> Nội dung lời nhắn
                  </p>
                  <p className="mt-1 whitespace-pre-wrap rounded-lg bg-white/5 p-3 text-sm text-ink">{viewingLead.note}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="ghost" onClick={() => setViewingLead(null)}>Đóng</Button>
              <a href={`tel:${viewingLead.phone.replace(/\s/g, '')}`}>
                <Button>Gọi ngay</Button>
              </a>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
