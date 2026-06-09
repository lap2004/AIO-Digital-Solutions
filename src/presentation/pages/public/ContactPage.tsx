import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Mail, MapPin, Phone, Clock, MessageCircle, Send } from 'lucide-react';
import { COMPANY } from '@/core/constants/site';
import { useI18n } from '@/core/i18n';
import { services } from '@/app/services';
import { Container } from '@/presentation/components/common/Container';
import { Card } from '@/presentation/components/common/Card';
import { Button } from '@/presentation/components/common/Button';
import { FieldWrapper, Input, Textarea } from '@/presentation/components/common/Field';
import { Seo } from '@/presentation/components/common/Seo';
import { PageHero } from '@/presentation/components/sections/PageHero';

const schema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ tên'),
  company: z.string().optional(),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().min(8, 'Số điện thoại không hợp lệ'),
  interest: z.string().min(2, 'Vui lòng nhập nhu cầu'),
  message: z.string().min(5, 'Vui lòng nhập nội dung'),
});
type FormValues = z.infer<typeof schema>;

const CONTACTS = [
  { icon: MapPin, label: 'Địa chỉ', value: COMPANY.address },
  { icon: Mail, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { icon: Phone, label: 'Hotline', value: COMPANY.hotline, href: `tel:${COMPANY.hotline.replace(/\s/g, '')}` },
  { icon: Clock, label: 'Giờ làm việc', value: COMPANY.workingHours },
];

export default function ContactPage() {
  const { t } = useI18n();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await services.leads.submit({
        name: values.name,
        company: values.company ?? '',
        email: values.email,
        phone: values.phone,
        status: 'new',
        source: 'website',
        interest: values.interest,
        estimatedValue: 0,
        assignedTo: '',
        note: values.message,
      });
      toast.success('Đã gửi liên hệ! Đội ngũ AIO sẽ phản hồi trong 24 giờ.');
      reset();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Đã có lỗi xảy ra');
    }
  };

  return (
    <>
      <Seo title="Liên hệ | AIO Digital Solutions" description="Liên hệ AIO để được tư vấn giải pháp công nghệ và báo giá miễn phí." />
      <PageHero
        eyebrow={t('nav./lien-he')}
        title={t('contact.heroTitle')}
        description={t('contact.heroDesc')}
        breadcrumb={[{ label: t('nav./lien-he') }]}
      />

      <Container className="pt-8 pb-20 lg:pt-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              {CONTACTS.map((c) => (
                <Card key={c.label} className="flex items-start gap-4 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-accent/15 text-brand-accent">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="font-semibold text-white hover:text-brand-cyan">{c.value}</a>
                    ) : (
                      <p className="font-semibold text-white">{c.value}</p>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Map placeholder (offline-safe) */}
            <Card className="relative overflow-hidden p-0">
              <div className="relative flex min-h-[14rem] flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#0a1a3a] to-[#04122e] px-6 py-10 text-center">
                <div className="pointer-events-none absolute inset-0 tech-grid opacity-60" />
                <MapPin className="relative h-9 w-9 text-brand-cyan" />
                <p className="relative max-w-sm text-sm leading-relaxed text-ink">{COMPANY.address}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="relative inline-block text-sm font-semibold text-brand-cyan hover:underline"
                >
                  {t('contact.openMaps')}
                </a>
              </div>
            </Card>

            <a href={COMPANY.zalo} target="_blank" rel="noreferrer" className="block mt-4">
              <Button variant="outline" className="w-full">
                <MessageCircle className="h-4 w-4" /> {t('contact.chatZalo')}
              </Button>
            </a>
          </div>

          {/* Form */}
          <Card className="p-7 lg:p-9">
            <h2 className="text-2xl font-bold">Gửi yêu cầu tư vấn</h2>
            <p className="mt-2 text-sm text-muted">Các trường có dấu * là bắt buộc.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-5 sm:grid-cols-2">
              <FieldWrapper label="Họ và tên" required error={errors.name?.message}>
                <Input {...register('name')} error={errors.name?.message} placeholder="Nguyễn Văn A" />
              </FieldWrapper>
              <FieldWrapper label="Công ty" error={errors.company?.message}>
                <Input {...register('company')} placeholder="Tên công ty" />
              </FieldWrapper>
              <FieldWrapper label="Email" required error={errors.email?.message}>
                <Input type="email" {...register('email')} error={errors.email?.message} placeholder="email@example.com" />
              </FieldWrapper>
              <FieldWrapper label="Số điện thoại" required error={errors.phone?.message}>
                <Input {...register('phone')} error={errors.phone?.message} placeholder="09xx xxx xxx" />
              </FieldWrapper>
              <div className="sm:col-span-2">
                <FieldWrapper label="Nhu cầu quan tâm" required error={errors.interest?.message}>
                  <Input {...register('interest')} error={errors.interest?.message} placeholder="VD: Màn hình LED ngoài trời, Camera AI…" />
                </FieldWrapper>
              </div>
              <div className="sm:col-span-2">
                <FieldWrapper label="Nội dung" required error={errors.message?.message}>
                  <Textarea {...register('message')} error={errors.message?.message} rows={5} placeholder="Mô tả chi tiết nhu cầu của bạn…" />
                </FieldWrapper>
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Đang gửi…' : <>Gửi yêu cầu <Send className="h-4 w-4" /></>}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </Container>
    </>
  );
}
