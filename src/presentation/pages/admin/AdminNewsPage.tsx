import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { NewsArticle, NewsCategory } from '@/domain/entities';
import { NEWS_CATEGORY_LABEL } from '@/core/constants/catalog';
import { formatDate } from '@/core/utils/format';
import { slugify } from '@/core/utils/slug';
import { useAsync } from '@/presentation/hooks/useAsync';
import { services } from '@/app/services';
import { Button } from '@/presentation/components/common/Button';
import { Badge } from '@/presentation/components/common/Badge';
import { Modal } from '@/presentation/components/common/Modal';
import { FieldWrapper, Input, Select, Textarea } from '@/presentation/components/common/Field';
import { LoadingBlock } from '@/presentation/components/common/Feedback';
import { DataTable } from '@/presentation/components/admin/DataTable';
import { AdminPageHeader } from '@/presentation/components/admin/AdminPageHeader';
import { Seo } from '@/presentation/components/common/Seo';

const CATS = Object.entries(NEWS_CATEGORY_LABEL) as [NewsCategory, string][];

interface FormState {
  title: string;
  category: NewsCategory;
  excerpt: string;
  content: string;
  featured: boolean;
}
const emptyForm: FormState = { title: '', category: 'led-technology', excerpt: '', content: '', featured: false };

export default function AdminNewsPage() {
  const { data, loading, reload } = useAsync(() => services.news.list({ pageSize: 200 }), []);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<NewsArticle | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setOpen(true); };
  const openEdit = (a: NewsArticle) => {
    setEditing(a);
    setForm({ title: a.title, category: a.category, excerpt: a.excerpt, content: a.content, featured: a.featured });
    setOpen(true);
  };

  const save = async () => {
    if (!form.title.trim()) return toast.error('Vui lòng nhập tiêu đề');
    if (editing) {
      await services.news.repo.update(editing.id, { ...form });
      toast.success('Đã cập nhật bài viết');
    } else {
      await services.news.repo.create({
        slug: slugify(form.title) + '-' + Date.now(), title: form.title, excerpt: form.excerpt || form.title,
        content: form.content || form.title, cover: '', category: form.category, tags: [],
        author: { name: 'AIO Editor', role: 'Content' }, publishedAt: new Date().toISOString().slice(0, 10),
        featured: form.featured, readingMinutes: 4, relatedArticleIds: [],
        seo: { title: form.title, description: form.excerpt || form.title },
      });
      toast.success('Đã thêm bài viết');
    }
    setOpen(false);
    reload();
  };

  const remove = async (a: NewsArticle) => {
    if (!confirm(`Xóa bài viết "${a.title}"?`)) return;
    await services.news.repo.remove(a.id);
    toast.success('Đã xóa bài viết');
    reload();
  };

  const columns = useMemo<ColumnDef<NewsArticle, unknown>[]>(
    () => [
      { header: 'Tiêu đề', accessorKey: 'title', cell: ({ row }) => <span className="line-clamp-1 max-w-md font-medium text-white">{row.original.title}</span> },
      { header: 'Chuyên mục', accessorKey: 'category', cell: ({ getValue }) => <Badge tone="purple">{NEWS_CATEGORY_LABEL[getValue() as NewsCategory]}</Badge> },
      { header: 'Tác giả', accessorFn: (r) => r.author.name, id: 'author' },
      { header: 'Ngày đăng', accessorKey: 'publishedAt', cell: ({ getValue }) => formatDate(getValue() as string) },
      { header: 'Nổi bật', accessorKey: 'featured', cell: ({ getValue }) => (getValue() ? <Badge tone="warning">Có</Badge> : '—') },
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
      <Seo title="Quản lý tin tức | AIO" />
      <AdminPageHeader title="Quản lý tin tức" description="Soạn và quản lý bài viết" action={<Button onClick={openCreate}><Plus className="h-4 w-4" /> Viết bài</Button>} />
      {loading && !data ? <LoadingBlock /> : <DataTable data={data?.items ?? []} columns={columns} searchPlaceholder="Tìm bài viết…" />}

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Sửa bài viết' : 'Viết bài mới'} className="max-w-2xl">
        <div className="space-y-4">
          <FieldWrapper label="Tiêu đề" required><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></FieldWrapper>
          <FieldWrapper label="Chuyên mục">
            <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as NewsCategory })}>
              {CATS.map(([slug, label]) => <option key={slug} value={slug}>{label}</option>)}
            </Select>
          </FieldWrapper>
          <FieldWrapper label="Tóm tắt"><Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} /></FieldWrapper>
          <FieldWrapper label="Nội dung"><Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} /></FieldWrapper>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="h-4 w-4 accent-brand-cyan" />
            <span className="text-sm text-ink">Bài viết nổi bật</span>
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>Hủy</Button>
            <Button onClick={save}>{editing ? 'Lưu' : 'Đăng bài'}</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
