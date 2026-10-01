import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import {
  Plus, Pencil, Trash2, Video, Image as ImageIcon,
  ExternalLink, Play, MapPin, Building, Eye, Sparkles
} from 'lucide-react';
import type { Project, ProjectCategory } from '@/domain/entities';
import { PROJECT_CATEGORY_LABEL } from '@/core/constants/catalog';
import { formatDate } from '@/core/utils/format';
import { slugify } from '@/core/utils/slug';
import { useAsync } from '@/presentation/hooks/useAsync';
import { services } from '@/app/services';
import { Button } from '@/presentation/components/common/Button';
import { Modal } from '@/presentation/components/common/Modal';
import { SmartImage } from '@/presentation/components/common/SmartImage';
import { FieldWrapper, Input, Select } from '@/presentation/components/common/Field';
import { LoadingBlock } from '@/presentation/components/common/Feedback';
import { DataTable } from '@/presentation/components/admin/DataTable';
import { AdminPageHeader } from '@/presentation/components/admin/AdminPageHeader';
import { Seo } from '@/presentation/components/common/Seo';
import { cn } from '@/core/utils/cn';

const CATS = Object.entries(PROJECT_CATEGORY_LABEL) as [ProjectCategory, string][];

interface FormState {
  name: string;
  client: string;
  category: ProjectCategory;
  location: string;
  cover: string;
  videoUrl: string;
  scale: string;
  area: string;
  completedAt: string;
  featured: boolean;
}

const emptyForm: FormState = {
  name: '',
  client: '',
  category: 'enterprise',
  location: 'Hà Nội',
  cover: '/media/projects/images/project-image-1.jpg',
  videoUrl: '',
  scale: 'Màn hình LED P2.5 · 3840Hz',
  area: '25 m²',
  completedAt: '2025-01-01',
  featured: false,
};

export default function AdminProjectsPage() {
  const { data, loading, reload } = useAsync(() => services.projects.list({ pageSize: 500 }), []);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [previewMedia, setPreviewMedia] = useState<Project | null>(null);
  const [activeMediaFilter, setActiveMediaFilter] = useState<'all' | 'video' | 'image'>('all');

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({
      name: p.name,
      client: p.client,
      category: p.category,
      location: p.location,
      cover: p.cover,
      videoUrl: p.videoUrl || '',
      scale: p.scale || '',
      area: p.area || '',
      completedAt: p.completedAt.slice(0, 10),
      featured: p.featured,
    });
    setOpen(true);
  };

  const save = async () => {
    if (!form.name.trim()) return toast.error('Vui lòng nhập tên dự án');
    try {
      if (editing) {
        await services.projects.repo.update(editing.id, { ...form });
        toast.success('Đã cập nhật dự án thành công');
      } else {
        await services.projects.repo.create({
          slug: slugify(form.name) + '-' + Date.now(),
          name: form.name,
          category: form.category,
          client: form.client || `Công trình tại ${form.location}`,
          location: form.location,
          description: `AIO thi công lắp đặt trọn gói ${form.name}. Vận hành ổn định 24/7.`,
          challenge: 'Yêu cầu kỹ thuật chính xác và bàn giao đúng tiến độ.',
          solution: 'AIO thiết kế hệ khung chịu lực, module LED chính hãng và nguồn Meanwell.',
          cover: form.cover || '/media/projects/images/project-image-1.jpg',
          videoUrl: form.videoUrl || undefined,
          gallery: form.cover ? [{ url: form.cover, alt: form.name, type: 'image' }] : [],
          technologies: ['NovaStar Processing', '3840Hz Refresh', 'Meanwell Power'],
          scale: form.scale,
          area: form.area,
          completedAt: form.completedAt,
          featured: form.featured,
          relatedProductIds: [],
          seo: { title: form.name, description: form.name },
        });
        toast.success('Đã thêm dự án mới thành công');
      }
      setOpen(false);
      reload();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Có lỗi xảy ra');
    }
  };

  const remove = async (p: Project) => {
    if (!confirm(`Bạn có chắc muốn xóa dự án "${p.name}"?`)) return;
    await services.projects.repo.remove(p.id);
    toast.success('Đã xóa dự án thành công');
    reload();
  };

  // Stats
  const items = data?.items ?? [];
  const stats = useMemo(() => {
    const total = items.length;
    const videoCount = items.filter((p) => Boolean(p.videoUrl)).length;
    const imageCount = items.filter((p) => !p.videoUrl).length;
    const uniqueLocations = new Set(items.map((p) => p.location)).size;
    return { total, videoCount, imageCount, uniqueLocations };
  }, [items]);

  const filteredItems = useMemo(() => {
    if (activeMediaFilter === 'video') return items.filter((p) => Boolean(p.videoUrl));
    if (activeMediaFilter === 'image') return items.filter((p) => !p.videoUrl);
    return items;
  }, [items, activeMediaFilter]);

  const columns = useMemo<ColumnDef<Project, unknown>[]>(
    () => [
      {
        header: 'Dự án thực tế',
        accessorKey: 'name',
        cell: ({ row }) => {
          const p = row.original;
          const hasVideo = Boolean(p.videoUrl);

          return (
            <div className="flex items-center gap-3">
              {/* Cover thumbnail with play overlay */}
              <div
                onClick={() => setPreviewMedia(p)}
                className="group relative h-14 w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[#020617] shadow-sm transition hover:scale-105 hover:border-brand-cyan/60"
                title="Bấm để xem trước video / ảnh"
              >
                <SmartImage
                  src={p.cover || '/media/projects/images/project-image-1.jpg'}
                  alt={p.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:brightness-110"
                />
                {hasVideo ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] transition group-hover:bg-black/20">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-cyan/90 text-slate-950 shadow-glow">
                      <Play className="h-3 w-3 fill-current ml-0.5" />
                    </span>
                  </div>
                ) : (
                  <div className="absolute bottom-1 right-1 rounded bg-black/60 px-1 text-[9px] text-white">
                    <ImageIcon className="h-2.5 w-2.5" />
                  </div>
                )}
              </div>

              {/* Title & Info */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p
                    onClick={() => setPreviewMedia(p)}
                    className="cursor-pointer truncate font-medium text-white transition hover:text-brand-cyan"
                    title={p.name}
                  >
                    {p.name}
                  </p>
                  {p.featured && (
                    <span className="flex h-4 items-center gap-0.5 rounded bg-amber-400/20 px-1 text-[9px] font-bold text-amber-300">
                      <Sparkles className="h-2.5 w-2.5" /> Nổi bật
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted">
                  <span className="flex items-center gap-1 text-slate-300">
                    <MapPin className="h-3 w-3 text-brand-cyan" /> {p.location}
                  </span>
                  <span>•</span>
                  <span className="truncate max-w-[200px]">{p.scale || 'Hệ thống chuẩn AIO'}</span>
                </div>
              </div>
            </div>
          );
        },
      },
      {
        header: 'Phương tiện',
        id: 'mediaType',
        cell: ({ row }) => {
          const hasVideo = Boolean(row.original.videoUrl);
          return hasVideo ? (
            <span className="inline-flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-500/15 px-2.5 py-1 text-xs font-semibold text-brand-cyan shadow-sm">
              <Video className="h-3.5 w-3.5" /> Video 4K
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-lg border border-purple-500/30 bg-purple-500/15 px-2.5 py-1 text-xs font-semibold text-purple-300 shadow-sm">
              <ImageIcon className="h-3.5 w-3.5" /> Ảnh chụp HD
            </span>
          );
        },
      },
      {
        header: 'Lĩnh vực',
        accessorKey: 'category',
        cell: ({ getValue }) => (
          <span className="rounded-lg bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300">
            {PROJECT_CATEGORY_LABEL[getValue() as ProjectCategory] || 'Doanh nghiệp'}
          </span>
        ),
      },
      {
        header: 'Hoàn thành',
        accessorKey: 'completedAt',
        cell: ({ getValue }) => (
          <span className="text-xs text-muted font-mono">{formatDate(getValue() as string)}</span>
        ),
      },
      {
        header: 'Thao tác',
        id: 'actions',
        enableSorting: false,
        cell: ({ row }) => {
          const p = row.original;
          return (
            <div className="flex items-center gap-1.5">
              {/* Preview Button */}
              <button
                onClick={() => setPreviewMedia(p)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-ink transition hover:border-brand-cyan hover:text-brand-cyan"
                title="Xem trước video / ảnh"
              >
                <Eye className="h-4 w-4" />
              </button>

              {/* View on live site */}
              <a
                href={`/du-an/${p.slug}`}
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-ink transition hover:border-white/30 hover:text-white"
                title="Mở trên website"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              {/* Edit */}
              <button
                onClick={() => openEdit(p)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-ink transition hover:border-brand-accent/50 hover:text-brand-cyan"
                title="Sửa thông tin"
              >
                <Pencil className="h-4 w-4" />
              </button>

              {/* Delete */}
              <button
                onClick={() => remove(p)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-ink transition hover:border-red-500/50 hover:text-red-400"
                title="Xóa dự án"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
      <Seo title="Quản lý dự án thực tế | Quản trị AIO" />

      {/* Header */}
      <AdminPageHeader
        title="Quản lý dự án thực tế"
        description="Quản lý danh mục 220+ công trình màn hình LED, hình ảnh và video thi công thực tế trên toàn quốc"
        action={
          <Button onClick={openCreate} className="bg-brand-cyan text-slate-950 font-bold shadow-glow">
            <Plus className="h-4 w-4" /> Thêm dự án mới
          </Button>
        }
      />

      {/* Top Stat Tiles */}
      <div className="mt-4 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-[#0b1326] p-4 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted">Tổng số công trình</span>
            <Building className="h-5 w-5 text-brand-cyan" />
          </div>
          <p className="mt-2 text-2xl font-bold text-white">{stats.total}</p>
          <p className="mt-1 text-[11px] text-muted">Đã kiểm thử và nghiệm thu</p>
        </div>

        <div
          onClick={() => setActiveMediaFilter('video')}
          className={cn(
            'cursor-pointer rounded-2xl border p-4 shadow-card transition-all',
            activeMediaFilter === 'video'
              ? 'border-cyan-400 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
              : 'border-white/10 bg-[#0b1326] hover:border-cyan-500/50',
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-brand-cyan flex items-center gap-1.5">
              <Video className="h-4 w-4" /> Video công trình HD/4K
            </span>
            <span className="flex h-2 w-2 rounded-full bg-brand-cyan animate-pulse" />
          </div>
          <p className="mt-2 text-2xl font-bold text-white">{stats.videoCount}</p>
          <p className="mt-1 text-[11px] text-cyan-300/80">91 Video phát trực tiếp mượt mà</p>
        </div>

        <div
          onClick={() => setActiveMediaFilter('image')}
          className={cn(
            'cursor-pointer rounded-2xl border p-4 shadow-card transition-all',
            activeMediaFilter === 'image'
              ? 'border-purple-400 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
              : 'border-white/10 bg-[#0b1326] hover:border-purple-500/50',
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-purple-400 flex items-center gap-1.5">
              <ImageIcon className="h-4 w-4" /> Hình ảnh thi công thực tế
            </span>
            <ImageIcon className="h-4 w-4 text-purple-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-white">{stats.imageCount}</p>
          <p className="mt-1 text-[11px] text-muted">131 Hình ảnh hoàn thiện</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0b1326] p-4 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> Tỉnh thành phủ sóng
            </span>
            <MapPin className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-400">{stats.uniqueLocations} tỉnh thành</p>
          <p className="mt-1 text-[11px] text-muted">Miền Bắc & Toàn Quốc</p>
        </div>
      </div>

      {/* Quick Filter Tabs */}
      <div className="mt-5 flex items-center gap-2">
        <button
          onClick={() => setActiveMediaFilter('all')}
          className={cn(
            'rounded-xl px-3.5 py-1.5 text-xs font-semibold transition',
            activeMediaFilter === 'all'
              ? 'bg-brand-cyan text-slate-950 font-bold'
              : 'bg-[#0b1326] text-muted hover:bg-white/5 hover:text-white',
          )}
        >
          Tất cả dự án ({stats.total})
        </button>
        <button
          onClick={() => setActiveMediaFilter('video')}
          className={cn(
            'flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition',
            activeMediaFilter === 'video'
              ? 'bg-cyan-500 text-slate-950 font-bold'
              : 'bg-[#0b1326] text-cyan-300 hover:bg-cyan-500/10',
          )}
        >
          <Video className="h-3.5 w-3.5" /> Có Video 4K ({stats.videoCount})
        </button>
        <button
          onClick={() => setActiveMediaFilter('image')}
          className={cn(
            'flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition',
            activeMediaFilter === 'image'
              ? 'bg-purple-500 text-white font-bold'
              : 'bg-[#0b1326] text-purple-300 hover:bg-purple-500/10',
          )}
        >
          <ImageIcon className="h-3.5 w-3.5" /> Ảnh thực tế ({stats.imageCount})
        </button>
      </div>

      {/* Main DataTable */}
      <div className="mt-3">
        {loading && !data ? (
          <LoadingBlock />
        ) : (
          <DataTable
            data={filteredItems}
            columns={columns}
            searchPlaceholder="Tìm kiếm tên dự án, tỉnh thành, quy mô, thông số kỹ thuật..."
          />
        )}
      </div>

      {/* Preview Video / Photo Modal */}
      <Modal
        open={!!previewMedia}
        onClose={() => setPreviewMedia(null)}
        title={previewMedia?.name || 'Chi tiết phương tiện dự án'}
        className="max-w-3xl"
      >
        {previewMedia && (
          <div className="space-y-4">
            {/* Player or Large Image */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black aspect-video flex items-center justify-center">
              {previewMedia.videoUrl ? (
                <video
                  src={previewMedia.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-contain"
                />
              ) : (
                <img
                  src={previewMedia.cover || '/media/projects/images/project-image-1.jpg'}
                  alt={previewMedia.name}
                  className="h-full w-full object-contain"
                />
              )}
            </div>

            {/* Details & Specs */}
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-muted">Địa điểm:</span>
                  <p className="font-semibold text-white">{previewMedia.location}</p>
                </div>
                <div>
                  <span className="text-muted">Lĩnh vực:</span>
                  <p className="font-semibold text-white">
                    {PROJECT_CATEGORY_LABEL[previewMedia.category] || 'Doanh nghiệp'}
                  </p>
                </div>
                <div>
                  <span className="text-muted">Thông số / Quy mô:</span>
                  <p className="font-semibold text-brand-cyan">{previewMedia.scale || 'Chuẩn AIO LED'}</p>
                </div>
                <div>
                  <span className="text-muted">Thời gian hoàn thành:</span>
                  <p className="font-semibold text-white">{formatDate(previewMedia.completedAt)}</p>
                </div>
              </div>
              <p className="mt-3 text-muted leading-relaxed">{previewMedia.description}</p>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-3">
              <a
                href={`/du-an/${previewMedia.slug}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-cyan hover:underline"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Xem bài viết dự án trên web
              </a>
              <button
                type="button"
                onClick={() => setPreviewMedia(null)}
                className="rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit / Create Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editing ? 'Sửa thông tin dự án' : 'Thêm dự án công trình mới'}
        className="max-w-2xl"
      >
        <div className="space-y-4">
          <FieldWrapper label="Tên dự án công trình" required>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="VD: Thi công Màn hình LED P2.5 Hội trường..."
            />
          </FieldWrapper>

          <div className="grid grid-cols-2 gap-4">
            <FieldWrapper label="Chủ đầu tư / Khách hàng">
              <Input
                value={form.client}
                onChange={(e) => setForm({ ...form, client: e.target.value })}
                placeholder="VD: Tập đoàn Vingroup, UBND..."
              />
            </FieldWrapper>
            <FieldWrapper label="Địa điểm / Tỉnh thành" required>
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="VD: Hưng Yên, Hà Nội, Hải Phòng..."
              />
            </FieldWrapper>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FieldWrapper label="Lĩnh vực / Danh mục">
              <Select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as ProjectCategory })}
              >
                {CATS.map(([slug, label]) => (
                  <option key={slug} value={slug}>
                    {label}
                  </option>
                ))}
              </Select>
            </FieldWrapper>
            <FieldWrapper label="Ngày hoàn thành">
              <Input
                type="date"
                value={form.completedAt}
                onChange={(e) => setForm({ ...form, completedAt: e.target.value })}
              />
            </FieldWrapper>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FieldWrapper label="Thông số kỹ thuật (Scale)">
              <Input
                value={form.scale}
                onChange={(e) => setForm({ ...form, scale: e.target.value })}
                placeholder="VD: P1.86 Ultra Fine · 3840Hz · NovaStar"
              />
            </FieldWrapper>
            <FieldWrapper label="Diện tích hiển thị">
              <Input
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                placeholder="VD: 35 m²"
              />
            </FieldWrapper>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FieldWrapper label="Đường dẫn ảnh bìa (Cover Image)">
              <Input
                value={form.cover}
                onChange={(e) => setForm({ ...form, cover: e.target.value })}
                placeholder="/media/projects/images/project-image-1.jpg"
              />
            </FieldWrapper>
            <FieldWrapper label="Đường dẫn Video (.mp4) (Nếu có)">
              <Input
                value={form.videoUrl}
                onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                placeholder="/media/projects/videos/web/project-video-1.mp4"
              />
            </FieldWrapper>
          </div>

          {/* Featured toggle */}
          <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <div>
              <p className="text-sm font-medium text-white">Dự án tiêu biểu nổi bật</p>
              <p className="text-xs text-muted">Ưu tiên hiển thị trên trang chủ và đầu danh sách dự án</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-slate-700 transition-all after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-brand-cyan peer-checked:after:translate-x-full peer-focus:outline-none"></div>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button onClick={save} className="bg-brand-cyan text-slate-950 font-bold shadow-glow">
              {editing ? 'Lưu thay đổi' : 'Thêm mới'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
