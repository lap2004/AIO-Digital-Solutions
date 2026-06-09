import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { Project, ProjectCategory } from '@/domain/entities';
import { PROJECT_CATEGORY_LABEL } from '@/core/constants/catalog';
import { formatDate } from '@/core/utils/format';
import { slugify } from '@/core/utils/slug';
import { useAsync } from '@/presentation/hooks/useAsync';
import { services } from '@/app/services';
import { Button } from '@/presentation/components/common/Button';
import { Badge } from '@/presentation/components/common/Badge';
import { Modal } from '@/presentation/components/common/Modal';
import { FieldWrapper, Input, Select } from '@/presentation/components/common/Field';
import { LoadingBlock } from '@/presentation/components/common/Feedback';
import { DataTable } from '@/presentation/components/admin/DataTable';
import { AdminPageHeader } from '@/presentation/components/admin/AdminPageHeader';
import { Seo } from '@/presentation/components/common/Seo';

const CATS = Object.entries(PROJECT_CATEGORY_LABEL) as [ProjectCategory, string][];

interface FormState {
  name: string;
  client: string;
  category: ProjectCategory;
  location: string;
  completedAt: string;
}
const emptyForm: FormState = { name: '', client: '', category: 'enterprise', location: 'Hà Nội', completedAt: '2026-01-01' };

export default function AdminProjectsPage() {
  const { data, loading, reload } = useAsync(() => services.projects.list({ pageSize: 200 }), []);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setOpen(true); };
  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({ name: p.name, client: p.client, category: p.category, location: p.location, completedAt: p.completedAt.slice(0, 10) });
    setOpen(true);
  };

  const save = async () => {
    if (!form.name.trim()) return toast.error('Vui lòng nhập tên dự án');
    if (editing) {
      await services.projects.repo.update(editing.id, { ...form });
      toast.success('Đã cập nhật dự án');
    } else {
      await services.projects.repo.create({
        slug: slugify(form.name) + '-' + Date.now(), name: form.name, category: form.category, client: form.client,
        location: form.location, description: form.name, challenge: '', solution: '', cover: '', gallery: [],
        technologies: [], scale: '', area: '', completedAt: form.completedAt, featured: false, relatedProductIds: [],
        seo: { title: form.name, description: form.name },
      });
      toast.success('Đã thêm dự án');
    }
    setOpen(false);
    reload();
  };

  const remove = async (p: Project) => {
    if (!confirm(`Xóa dự án "${p.name}"?`)) return;
    await services.projects.repo.remove(p.id);
    toast.success('Đã xóa dự án');
    reload();
  };

  const columns = useMemo<ColumnDef<Project, unknown>[]>(
    () => [
      { header: 'Dự án', accessorKey: 'name', cell: ({ row }) => <span className="font-medium text-white">{row.original.name}</span> },
      { header: 'Khách hàng', accessorKey: 'client' },
      { header: 'Lĩnh vực', accessorKey: 'category', cell: ({ getValue }) => <Badge tone="info">{PROJECT_CATEGORY_LABEL[getValue() as ProjectCategory]}</Badge> },
      { header: 'Địa điểm', accessorKey: 'location' },
      { header: 'Hoàn thành', accessorKey: 'completedAt', cell: ({ getValue }) => formatDate(getValue() as string) },
      {
        header: 'Thao tác', id: 'actions', enableSorting: false,
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button onClick={() => openEdit(row.original)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-ink hover:border-brand-accent/50 hover:text-brand-cyan" aria-label="Sửa"><Pencil className="h-4 w-4" /></button>
            <button onClick={() => remove(row.original)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-ink hover:border-red-500/50 hover:text-red-400" aria-label="Xóa"><Trash2 className="h-4 w-4" /></button>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
      <Seo title="Quản lý dự án | AIO" />
      <AdminPageHeader title="Quản lý dự án" description="Quản lý danh mục dự án tiêu biểu" action={<Button onClick={openCreate}><Plus className="h-4 w-4" /> Thêm dự án</Button>} />
      {loading && !data ? <LoadingBlock /> : <DataTable data={data?.items ?? []} columns={columns} searchPlaceholder="Tìm dự án, khách hàng…" />}

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Sửa dự án' : 'Thêm dự án'}>
        <div className="space-y-4">
          <FieldWrapper label="Tên dự án" required><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></FieldWrapper>
          <FieldWrapper label="Khách hàng"><Input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} /></FieldWrapper>
          <div className="grid grid-cols-2 gap-4">
            <FieldWrapper label="Lĩnh vực">
              <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as ProjectCategory })}>
                {CATS.map(([slug, label]) => <option key={slug} value={slug}>{label}</option>)}
              </Select>
            </FieldWrapper>
            <FieldWrapper label="Địa điểm"><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></FieldWrapper>
          </div>
          <FieldWrapper label="Ngày hoàn thành"><Input type="date" value={form.completedAt} onChange={(e) => setForm({ ...form, completedAt: e.target.value })} /></FieldWrapper>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>Hủy</Button>
            <Button onClick={save}>{editing ? 'Lưu' : 'Thêm mới'}</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
