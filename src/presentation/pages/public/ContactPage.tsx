import { useState, useRef, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
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
import { useAsync } from '@/presentation/hooks/useAsync';
import { motion, AnimatePresence } from 'framer-motion';

const schema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ tên'),
  company: z.string().optional(),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().min(8, 'Số điện thoại không hợp lệ'),
  interest: z.string().min(2, 'Vui lòng nhập nhu cầu'),
  message: z.string().min(5, 'Vui lòng nhập nội dung'),
});
type FormValues = z.infer<typeof schema>;

export default function ContactPage() {
  const { t, pick } = useI18n();

  const { data: products } = useAsync(() => services.products.list({ pageSize: 500 }), []);
  const { register, handleSubmit, reset, control, setValue, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const CONTACTS = [
    { icon: MapPin, label: pick('Địa chỉ', 'Address'), value: COMPANY.address },
    { icon: Mail, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { icon: Phone, label: 'Hotline', value: COMPANY.hotline, href: `tel:${COMPANY.hotline.replace(/\s/g, '')}` },
    { icon: Clock, label: pick('Giờ làm việc', 'Working Hours'), value: COMPANY.workingHours },
  ];

  const interestValue = useWatch({ control, name: 'interest' }) || '';
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProducts = products?.items.filter(p => 
    p.name.toLowerCase().includes(interestValue.toLowerCase())
  ) || [];

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
            <h2 className="text-2xl font-bold">{pick('Gửi yêu cầu tư vấn', 'Send consultation request')}</h2>
            <p className="mt-2 text-sm text-muted">{pick('Các trường có dấu * là bắt buộc.', 'Fields marked with * are required.')}</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-5 sm:grid-cols-2">
              <FieldWrapper label={pick('Họ và tên', 'Full Name')} required error={errors.name?.message}>
                <Input {...register('name')} error={errors.name?.message} placeholder="Nguyễn Văn A" />
              </FieldWrapper>
              <FieldWrapper label={pick('Công ty', 'Company')} error={errors.company?.message}>
                <Input {...register('company')} placeholder={pick('Tên công ty', 'Company Name')} />
              </FieldWrapper>
              <FieldWrapper label="Email" required error={errors.email?.message}>
                <Input type="email" {...register('email')} error={errors.email?.message} placeholder="email@example.com" />
              </FieldWrapper>
              <FieldWrapper label={pick('Số điện thoại', 'Phone Number')} required error={errors.phone?.message}>
                <Input {...register('phone')} error={errors.phone?.message} placeholder="09xx xxx xxx" />
              </FieldWrapper>
              <div className="sm:col-span-2 relative" ref={suggestionRef}>
                <FieldWrapper label={pick('Nhu cầu quan tâm', 'Interest')} required error={errors.interest?.message}>
                  <Input 
                    {...register('interest')} 
                    error={errors.interest?.message} 
                    placeholder={pick('VD: Màn hình LED ngoài trời, Camera AI…', 'e.g. Outdoor LED Screen, AI Camera...')}
                    onFocus={() => setShowSuggestions(true)}
                    autoComplete="off"
                  />
                  <AnimatePresence>
                    {showSuggestions && filteredProducts.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 right-0 z-50 mt-1 w-full overflow-hidden rounded-xl border border-line bg-surface shadow-card backdrop-blur-md"
                      >
                        <div className="max-h-60 overflow-y-auto p-1 hide-scrollbar">
                          {filteredProducts.map(p => (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => {
                                setValue('interest', p.name, { shouldValidate: true });
                                setShowSuggestions(false);
                              }}
                              className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm text-ink transition-colors duration-150 hover:bg-black/5 dark:hover:bg-white/10"
                            >
                              {p.name}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </FieldWrapper>
              </div>
              <div className="sm:col-span-2">
                <FieldWrapper label={pick('Nội dung', 'Message')} required error={errors.message?.message}>
                  <Textarea {...register('message')} error={errors.message?.message} rows={5} placeholder={pick('Mô tả chi tiết nhu cầu của bạn…', 'Describe your requirements in detail...')} />
                </FieldWrapper>
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? pick('Đang gửi…', 'Sending...') : <>{pick('Gửi yêu cầu', 'Send Request')} <Send className="h-4 w-4" /></>}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </Container>
    </>
  );
}
