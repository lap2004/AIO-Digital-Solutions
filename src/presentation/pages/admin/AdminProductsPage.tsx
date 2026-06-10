import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { Product, ProductCategorySlug } from '@/domain/entities';
import { PRODUCT_CATEGORIES, PRODUCT_CATEGORY_LABEL } from '@/core/constants/catalog';
import { formatCurrency } from '@/core/utils/format';
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

interface FormState {
  name: string;
  sku: string;
  category: ProductCategorySlug;
  brand: string;
  price: number;
  image: string;
  status: Product['status'];
  featured: boolean;
  warranty: string;
}

const emptyForm: FormState = {
  name: '', sku: '', category: 'led-module', brand: 'AIO', price: 0, image: '', status: 'active', featured: false, warranty: '24 tháng',
};

export default function AdminProductsPage() {
  const { data, loading, reload } = useAsync(() => services.products.list({ pageSize: 500 }), []);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setOpen(true); };
  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, sku: p.sku, category: p.category, brand: p.brand, price: p.price ?? 0, image: p.image, status: p.status, featured: p.featured, warranty: p.warranty ?? '' });
    setOpen(true);
  };

  const save = async () => {
    if (!form.name.trim()) return toast.error('Vui lòng nhập tên sản phẩm');
    try {
      if (editing) {
        await services.products.repo.update(editing.id, { ...form });
        toast.success('Đã cập nhật sản phẩm');
      } else {
        await services.products.repo.create({
          slug: slugify(form.name), name: form.name, sku: form.sku || `AIO-${Date.now()}`,
          category: form.category, brand: form.brand, country: 'Việt Nam', warranty: form.warranty,
          price: form.price, shortDescription: form.name, description: form.name, image: form.image,
          gallery: form.image ? [{ url: form.image, alt: form.name }] : [], specifications: [], documents: [],
          applications: [], tags: [form.brand], status: form.status, featured: form.featured,
          createdAt: new Date().toISOString(), relatedProductIds: [], relatedProjectIds: [],
          seo: { title: form.name, description: form.name },
        });
        toast.success('Đã thêm sản phẩm');
      }
      setOpen(false);
      reload();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Có lỗi xảy ra');
    }
  };

  const remove = async (p: Product) => {
    if (!confirm(`Xóa sản phẩm "${p.name}"?`)) return;
    await services.products.repo.remove(p.id);
    toast.success('Đã xóa sản phẩm');
    reload();
  };

  const columns = useMemo<ColumnDef<Product, unknown>[]>(
    () => [
      {
        header: 'Sản phẩm',
        accessorKey: 'name',
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-[#020617]">
              <SmartImage src={row.original.image} alt={row.original.name} className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-medium text-white">{row.original.name}</p>
              <p className="text-xs text-muted">{row.original.sku}</p>
            </div>
          </div>
        ),
      },
      { header: 'Danh mục', accessorKey: 'category', cell: ({ getValue }) => PRODUCT_CATEGORY_LABEL[getValue() as string] },
      { header: 'Thương hiệu', accessorKey: 'brand' },
      { header: 'Giá', accessorKey: 'price', cell: ({ getValue }) => (getValue() ? formatCurrency(getValue() as number) : '—') },

      {
        header: 'Thao tác',
        id: 'actions',
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button onClick={() => openEdit(row.original)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-ink hover:border-brand-accent/50 hover:text-brand-cyan" aria-label="Sửa">
              <Pencil className="h-4 w-4" />
            </button>
            <button onClick={() => remove(row.original)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-ink hover:border-red-500/50 hover:text-red-400" aria-label="Xóa">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
      <Seo title="Quản lý sản phẩm | AIO" />
      <AdminPageHeader
        title="Quản lý sản phẩm"
        description="Thêm, sửa, xóa và tìm kiếm sản phẩm"
        action={<Button onClick={openCreate}><Plus className="h-4 w-4" /> Thêm sản phẩm</Button>}
      />

      {loading && !data ? <LoadingBlock /> : <DataTable data={data?.items ?? []} columns={columns} searchPlaceholder="Tìm sản phẩm, SKU…" />}

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}>
        <div className="space-y-4">
          <FieldWrapper label="Tên sản phẩm" required>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </FieldWrapper>
          <div className="grid grid-cols-2 gap-4">
            <FieldWrapper label="SKU">
              <Input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
            </FieldWrapper>
            <FieldWrapper label="Thương hiệu">
              <Input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
            </FieldWrapper>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FieldWrapper label="Danh mục">
              <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as ProductCategorySlug })}>
                {PRODUCT_CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </Select>
            </FieldWrapper>
            <FieldWrapper label="Giá (₫)">
              <div className="relative">
                <Input
                  type="text"
                  value={form.price ? form.price.toLocaleString('vi-VN') : ''}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setForm({ ...form, price: Number(val) });
                  }}
                  className="pr-12 text-right font-medium tracking-wider"
                  placeholder="0"
                />
                <span className="absolute inset-y-0 right-4 flex items-center text-sm font-medium text-muted">
                  VNĐ
                </span>
              </div>
            </FieldWrapper>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FieldWrapper label="Bảo hành">
              <Input value={form.warranty} onChange={(e) => setForm({ ...form, warranty: e.target.value })} placeholder="VD: 24 tháng, Trọn đời..." />
            </FieldWrapper>
            <FieldWrapper label="Đường dẫn ảnh">
              <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="/data-assets/…" />
            </FieldWrapper>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]">
            <div>
              <p className="text-sm font-medium text-white">Sản phẩm nổi bật</p>
              <p className="text-xs text-muted">Hiển thị ưu tiên trên trang chủ và đầu danh sách sản phẩm</p>
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
            <Button variant="ghost" onClick={() => setOpen(false)}>Hủy</Button>
            <Button onClick={save}>{editing ? 'Lưu thay đổi' : 'Thêm mới'}</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
