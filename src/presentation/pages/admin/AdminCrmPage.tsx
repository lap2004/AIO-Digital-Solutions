import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Phone, Mail, Building2, MoveRight } from 'lucide-react';
import type { Lead, LeadStatus } from '@/domain/entities';
import { LEAD_STATUS_FLOW, LEAD_STATUS_LABEL } from '@/domain/entities';
import { formatCompact } from '@/core/utils/format';
import { useAsync } from '@/presentation/hooks/useAsync';
import { services } from '@/app/services';
import { Badge } from '@/presentation/components/common/Badge';
import { Card } from '@/presentation/components/common/Card';
import { LoadingBlock } from '@/presentation/components/common/Feedback';
import { AdminPageHeader } from '@/presentation/components/admin/AdminPageHeader';
import { Seo } from '@/presentation/components/common/Seo';

const STATUS_TONE: Record<LeadStatus, 'info' | 'warning' | 'purple' | 'brand' | 'success' | 'danger'> = {
  new: 'info', contacted: 'brand', 'quotation-sent': 'purple', negotiation: 'warning', won: 'success', lost: 'danger',
};

export default function AdminCrmPage() {
  const { data, loading, reload } = useAsync(() => services.leads.list(), []);
  const [board, setBoard] = useState<Lead[] | null>(null);
  const leads = board ?? data;

  const move = async (lead: Lead, status: LeadStatus) => {
    setBoard((leads ?? []).map((l) => (l.id === lead.id ? { ...l, status } : l)));
    await services.leads.move(lead.id, status);
    toast.success(`Đã chuyển "${lead.name}" → ${LEAD_STATUS_LABEL[status]}`);
    reload();
    setBoard(null);
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
            <div key={status} className="flex w-72 shrink-0 flex-col">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge tone={STATUS_TONE[status]}>{LEAD_STATUS_LABEL[status]}</Badge>
                  <span className="text-xs text-muted">{list.length}</span>
                </div>
                <span className="text-xs font-semibold text-brand-accent">{formatCompact(value)} ₫</span>
              </div>
              <div className="flex-1 space-y-3 rounded-2xl border border-white/5 bg-white/[0.02] p-3">
                {list.map((lead) => {
                  const idx = LEAD_STATUS_FLOW.indexOf(lead.status);
                  const next = LEAD_STATUS_FLOW[idx + 1];
                  return (
                    <Card key={lead.id} className="p-4">
                      <p className="font-semibold text-white">{lead.name}</p>
                      <div className="mt-2 space-y-1 text-xs text-muted">
                        <p className="flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" /> {lead.company}</p>
                        <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {lead.phone}</p>
                        <p className="flex items-center gap-1.5 truncate"><Mail className="h-3.5 w-3.5" /> {lead.email}</p>
                      </div>
                      <p className="mt-2 text-xs text-ink">Quan tâm: {lead.interest}</p>
                      <p className="mt-1 text-sm font-semibold text-brand-cyan">{formatCompact(lead.estimatedValue)} ₫</p>
                      <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                        <span className="text-[11px] text-muted">{lead.assignedTo || '—'}</span>
                        {next && (
                          <button
                            onClick={() => move(lead, next)}
                            className="flex items-center gap-1 text-xs font-semibold text-brand-cyan hover:underline"
                          >
                            {LEAD_STATUS_LABEL[next]} <MoveRight className="h-3.5 w-3.5" />
                          </button>
                        )}
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
    </>
  );
}
