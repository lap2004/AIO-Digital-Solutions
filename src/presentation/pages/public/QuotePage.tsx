import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Trash2, Minus, Plus, FileText, ShoppingCart, Calculator } from 'lucide-react';
import { useQuoteStore } from '@/presentation/state/quote.store';
import { useI18n } from '@/core/i18n';
import { services } from '@/app/services';
import { Container } from '@/presentation/components/common/Container';
import { Card } from '@/presentation/components/common/Card';
import { Button } from '@/presentation/components/common/Button';
import { SmartImage } from '@/presentation/components/common/SmartImage';
import { FieldWrapper, Input, Textarea } from '@/presentation/components/common/Field';
import { EmptyState } from '@/presentation/components/common/Feedback';
import { Seo } from '@/presentation/components/common/Seo';
import { PageHero } from '@/presentation/components/sections/PageHero';
import { SmartCalculator } from '@/presentation/components/business/SmartCalculator';
import { Link } from 'react-router-dom';

const schema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ tên'),
  company: z.string().optional(),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().min(8, 'Số điện thoại không hợp lệ'),
  note: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

export default function QuotePage() {
  const { pick } = useI18n();
  const [activeMode, setActiveMode] = useState<'calculator' | 'basket'>('calculator');
  const { items, setQuantity, remove, clear } = useQuoteStore();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    await services.quotations.create({
      customerName: values.name.trim(),
      company: values.company?.trim() || '',
      email: values.email.trim(),
      phone: values.phone.trim(),
      requestType: 'quote',
      interest: `Báo giá giỏ hàng (${items.length} sản phẩm: ${items.map(i => i.name).slice(0, 2).join(', ')}${items.length > 2 ? '...' : ''})`,
      items: items.map((i) => ({ productId: i.productId, productName: i.name, quantity: i.quantity, unitPrice: 0 })),
      status: 'sent',
      total: 0,
      note: values.note?.trim() || 'Khách gửi yêu cầu báo giá chi tiết cho danh sách sản phẩm đã chọn.',
      validUntil: new Date(Date.now() + 30 * 86400000).toISOString(),
    });
    toast.success('Đã gửi yêu cầu báo giá! AIO sẽ phản hồi trong 24 giờ.');
    clear();
    reset();
  };

  return (
    <>
      <Seo
        title={`${pick('Bảng tính báo giá màn hình LED tự động', 'Smart LED Display Calculator')} | AIO LED`}
        description={pick(
          'Công cụ tính toán kích thước, độ phân giải, số lượng Cabinet và báo giá màn hình LED trong nhà, ngoài trời tự động.',
          'Automated tool for calculating dimensions, native resolution, cabinet count and turnkey LED display quotes.',
        )}
      />
      <PageHero
        eyebrow={pick('Báo giá thông minh', 'Smart Estimator')}
        title={pick('Bảng Tính Báo Giá & Dự Toán LED Tự Động', 'LED Display Estimator & Quote')}
        description={pick(
          'Tính toán kích thước, độ phân giải, linh kiện và nhận bảng dự toán chi tiết hoặc gửi danh sách sản phẩm yêu cầu báo giá.',
          'Calculate dimensions, resolution, components and receive detailed project estimates or submit custom requests.',
        )}
        breadcrumb={[{ label: pick('Báo giá', 'Quote') }]}
      />

      <Container className="pb-24">
        {/* Toggle Mode Switcher */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-2xl border border-slate-200 bg-slate-100/90 p-1.5 backdrop-blur-xl shadow-sm dark:border-white/10 dark:bg-slate-900/90">
            <button
              onClick={() => setActiveMode('calculator')}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all ${
                activeMode === 'calculator'
                  ? 'bg-brand-cyan text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                  : 'text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Calculator className="h-4 w-4" />
              {pick('Bảng tính LED tự động AI', 'Smart LED Calculator AI')}
            </button>

            <button
              onClick={() => setActiveMode('basket')}
              className={`relative flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition-all ${
                activeMode === 'basket'
                  ? 'bg-brand-cyan text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                  : 'text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              {pick('Danh sách sản phẩm đã chọn', 'Selected Products')}
              {items.length > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-[10px] font-bold text-slate-950">
                  {items.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Content Section */}
        {activeMode === 'calculator' ? (
          <SmartCalculator />
        ) : (
          <div>
            {items.length === 0 ? (
              <EmptyState
                icon={<ShoppingCart className="h-10 w-10 opacity-50" />}
                title={pick('Danh sách báo giá đang trống', 'Quote List is Empty')}
                description={pick(
                  'Duyệt danh mục sản phẩm và bấm “Báo giá nhanh” để đưa vào danh sách hoặc sử dụng Bảng tính LED tự động.',
                  'Browse products and click "Quick Quote" to add items or use the Smart LED Calculator.',
                )}
                action={
                  <div className="mt-4 flex gap-3">
                    <Button onClick={() => setActiveMode('calculator')}>
                      {pick('Dùng Bảng tính LED', 'Use LED Calculator')}
                    </Button>
                    <Link to="/san-pham">
                      <Button variant="outline">{pick('Xem sản phẩm', 'View Products')}</Button>
                    </Link>
                  </div>
                }
              />
            ) : (
              <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
                {/* Items */}
                <div className="space-y-4">
                  {items.map((i) => (
                    <Card key={i.productId} className="flex items-center gap-4 p-4">
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface border border-line">
                        <SmartImage src={i.image} alt={i.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="clip-text-2 font-semibold text-ink">{i.name}</p>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex items-center rounded-lg border border-line bg-surface">
                            <button
                              onClick={() => setQuantity(i.productId, i.quantity - 1)}
                              className="flex h-8 w-8 items-center justify-center text-ink hover:text-brand-cyan transition"
                              aria-label="Giảm"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-10 text-center text-sm font-bold text-ink">{i.quantity}</span>
                            <button
                              onClick={() => setQuantity(i.productId, i.quantity + 1)}
                              className="flex h-8 w-8 items-center justify-center text-ink hover:text-brand-cyan transition"
                              aria-label="Tăng"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => remove(i.productId)}
                            className="flex items-center gap-1 text-sm text-muted transition hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" /> {pick('Xóa', 'Remove')}
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))}
                  <button onClick={clear} className="text-sm text-muted hover:text-red-500 transition">
                    {pick('Xóa tất cả', 'Clear all')}
                  </button>
                </div>

                {/* Form */}
                <Card className="h-fit p-7">
                  <h2 className="flex items-center gap-2 text-xl font-bold text-ink">
                    <FileText className="h-5 w-5 text-brand-accent" /> {pick('Thông tin nhận báo giá', 'Contact Information')}
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
                    <FieldWrapper label={pick('Họ và tên', 'Full Name')} required error={errors.name?.message}>
                      <Input {...register('name')} error={errors.name?.message} placeholder="Nguyễn Văn A" />
                    </FieldWrapper>
                    <FieldWrapper label={pick('Công ty / Đơn vị', 'Company')}>
                      <Input {...register('company')} placeholder={pick('Tên công ty', 'Company Name')} />
                    </FieldWrapper>
                    <FieldWrapper label="Email" required error={errors.email?.message}>
                      <Input type="email" {...register('email')} error={errors.email?.message} placeholder="email@example.com" />
                    </FieldWrapper>
                    <FieldWrapper label={pick('Số điện thoại / Zalo', 'Phone Number')} required error={errors.phone?.message}>
                      <Input {...register('phone')} error={errors.phone?.message} placeholder="038 xxx xxxx" />
                    </FieldWrapper>
                    <FieldWrapper label={pick('Ghi chú dự án', 'Note')}>
                      <Textarea {...register('note')} placeholder={pick('Địa điểm lắp đặt, yêu cầu kỹ thuật…', 'Installation site, specs...')} />
                    </FieldWrapper>
                    <Button type="submit" size="lg" className="w-full bg-brand-cyan text-slate-950 font-bold" disabled={isSubmitting}>
                      {isSubmitting
                        ? pick('Đang gửi…', 'Sending...')
                        : `${pick('Gửi yêu cầu', 'Submit Request')} (${items.length} ${pick('sản phẩm', 'products')})`}
                    </Button>
                  </form>
                </Card>
              </div>
            )}
          </div>
        )}
      </Container>
    </>
  );
}
