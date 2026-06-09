import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Trash2, Minus, Plus, FileText, ShoppingCart } from 'lucide-react';
import { useQuoteStore } from '@/presentation/state/quote.store';
import { services } from '@/app/services';
import { Container } from '@/presentation/components/common/Container';
import { Card } from '@/presentation/components/common/Card';
import { Button } from '@/presentation/components/common/Button';
import { SmartImage } from '@/presentation/components/common/SmartImage';
import { FieldWrapper, Input, Textarea } from '@/presentation/components/common/Field';
import { EmptyState } from '@/presentation/components/common/Feedback';
import { Seo } from '@/presentation/components/common/Seo';
import { PageHero } from '@/presentation/components/sections/PageHero';
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
  const { items, setQuantity, remove, clear } = useQuoteStore();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    await services.quotations.create({
      customerName: values.name,
      company: values.company ?? '',
      email: values.email,
      phone: values.phone,
      items: items.map((i) => ({ productId: i.productId, productName: i.name, quantity: i.quantity, unitPrice: 0 })),
      status: 'sent',
      total: 0,
      note: values.note ?? '',
      validUntil: new Date(Date.now() + 30 * 86400000).toISOString(),
    });
    toast.success('Đã gửi yêu cầu báo giá! AIO sẽ phản hồi trong 24 giờ.');
    clear();
    reset();
  };

  return (
    <>
      <Seo title="Yêu cầu báo giá | AIO Digital Solutions" description="Gửi danh sách sản phẩm để nhận báo giá chi tiết từ AIO." />
      <PageHero
        eyebrow="Báo giá"
        title="Yêu cầu báo giá"
        description="Thêm sản phẩm vào danh sách và gửi thông tin để nhận báo giá theo dự án."
        breadcrumb={[{ label: 'Báo giá' }]}
      />

      <Container className="pb-20">
        {items.length === 0 ? (
          <EmptyState
            icon={<ShoppingCart className="h-10 w-10 opacity-50" />}
            title="Danh sách báo giá trống"
            description="Duyệt sản phẩm và bấm “Thêm vào báo giá” để bắt đầu."
            action={<Link to="/san-pham"><Button className="mt-4">Xem sản phẩm</Button></Link>}
          />
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            {/* Items */}
            <div className="space-y-4">
              {items.map((i) => (
                <Card key={i.productId} className="flex items-center gap-4 p-4">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#020617]">
                    <SmartImage src={i.image} alt={i.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="clip-text-2 font-semibold text-white">{i.name}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center rounded-lg border border-white/10">
                        <button onClick={() => setQuantity(i.productId, i.quantity - 1)} className="flex h-8 w-8 items-center justify-center text-ink hover:text-white" aria-label="Giảm">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-10 text-center text-sm font-semibold text-white">{i.quantity}</span>
                        <button onClick={() => setQuantity(i.productId, i.quantity + 1)} className="flex h-8 w-8 items-center justify-center text-ink hover:text-white" aria-label="Tăng">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button onClick={() => remove(i.productId)} className="flex items-center gap-1 text-sm text-muted transition hover:text-red-400">
                        <Trash2 className="h-4 w-4" /> Xóa
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
              <button onClick={clear} className="text-sm text-muted hover:text-red-400">Xóa tất cả</button>
            </div>

            {/* Form */}
            <Card className="h-fit p-7">
              <h2 className="flex items-center gap-2 text-xl font-bold"><FileText className="h-5 w-5 text-brand-accent" /> Thông tin liên hệ</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
                <FieldWrapper label="Họ và tên" required error={errors.name?.message}>
                  <Input {...register('name')} error={errors.name?.message} placeholder="Nguyễn Văn A" />
                </FieldWrapper>
                <FieldWrapper label="Công ty">
                  <Input {...register('company')} placeholder="Tên công ty" />
                </FieldWrapper>
                <FieldWrapper label="Email" required error={errors.email?.message}>
                  <Input type="email" {...register('email')} error={errors.email?.message} placeholder="email@example.com" />
                </FieldWrapper>
                <FieldWrapper label="Số điện thoại" required error={errors.phone?.message}>
                  <Input {...register('phone')} error={errors.phone?.message} placeholder="09xx xxx xxx" />
                </FieldWrapper>
                <FieldWrapper label="Ghi chú">
                  <Textarea {...register('note')} placeholder="Yêu cầu thêm về dự án…" />
                </FieldWrapper>
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Đang gửi…' : `Gửi yêu cầu (${items.length} sản phẩm)`}
                </Button>
              </form>
            </Card>
          </div>
        )}
      </Container>
    </>
  );
}
