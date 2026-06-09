import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { CheckCircle2, MapPin, Briefcase, Wallet, Calendar, Upload } from 'lucide-react';
import { JOB_TYPE_LABEL } from '@/domain/entities';
import { formatDate } from '@/core/utils/format';
import { useAsync } from '@/presentation/hooks/useAsync';
import { services } from '@/app/services';
import { Container } from '@/presentation/components/common/Container';
import { Card } from '@/presentation/components/common/Card';
import { Badge } from '@/presentation/components/common/Badge';
import { Button } from '@/presentation/components/common/Button';
import { FieldWrapper, Input, Textarea } from '@/presentation/components/common/Field';
import { LoadingBlock, EmptyState } from '@/presentation/components/common/Feedback';
import { Seo } from '@/presentation/components/common/Seo';
import { Breadcrumb } from '@/presentation/components/sections/Breadcrumb';

const schema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ tên'),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().min(8, 'Số điện thoại không hợp lệ'),
  cv: z.string().optional(),
  cover: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

export default function JobDetailPage() {
  const { slug } = useParams();
  const { data: job, loading } = useAsync(() => services.jobs.getBySlug(slug ?? ''), [slug]);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 600));
    toast.success(`Đã gửi hồ sơ ứng tuyển vị trí "${job?.title}". AIO sẽ liên hệ sớm!`);
    reset();
    void values;
  };

  if (loading) return <div className="pt-32"><LoadingBlock /></div>;
  if (!job)
    return (
      <div className="pt-40">
        <Container>
          <EmptyState title="Không tìm thấy vị trí" action={<Link to="/tuyen-dung"><Button className="mt-4">Về danh sách</Button></Link>} />
        </Container>
      </div>
    );

  return (
    <>
      <Seo title={`${job.title} | Tuyển dụng AIO`} description={job.description} />
      <section className="pt-28">
        <Container>
          <Breadcrumb items={[{ label: 'Tuyển dụng', to: '/tuyen-dung' }, { label: job.title }]} />
          <h1 className="mt-6 text-3xl font-bold leading-tight md:text-4xl">{job.title}</h1>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.department}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
            <span className="flex items-center gap-1.5"><Wallet className="h-4 w-4" /> {job.salaryRange}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Hạn: {formatDate(job.deadline)}</span>
            <Badge tone="info">{JOB_TYPE_LABEL[job.type]}</Badge>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-8">
              <p className="leading-relaxed text-muted">{job.description}</p>
              {([['Mô tả công việc', job.responsibilities], ['Yêu cầu', job.requirements], ['Quyền lợi', job.benefits]] as const).map(
                ([title, list]) => (
                  <div key={title}>
                    <h2 className="text-xl font-bold">{title}</h2>
                    <ul className="mt-4 space-y-2.5">
                      {list.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-ink">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-cyan" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              )}
            </div>

            {/* Apply form */}
            <aside>
              <Card className="sticky top-24 p-6">
                <h3 className="text-lg font-bold text-white">Ứng tuyển ngay</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
                  <FieldWrapper label="Họ và tên" required error={errors.name?.message}>
                    <Input {...register('name')} error={errors.name?.message} placeholder="Nguyễn Văn A" />
                  </FieldWrapper>
                  <FieldWrapper label="Email" required error={errors.email?.message}>
                    <Input type="email" {...register('email')} error={errors.email?.message} placeholder="email@example.com" />
                  </FieldWrapper>
                  <FieldWrapper label="Số điện thoại" required error={errors.phone?.message}>
                    <Input {...register('phone')} error={errors.phone?.message} placeholder="09xx xxx xxx" />
                  </FieldWrapper>
                  <FieldWrapper label="Link CV (Google Drive, …)">
                    <Input {...register('cv')} placeholder="https://…" />
                  </FieldWrapper>
                  <FieldWrapper label="Thư giới thiệu">
                    <Textarea {...register('cover')} placeholder="Đôi nét về bạn…" />
                  </FieldWrapper>
                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 py-3 text-sm text-muted transition hover:border-brand-accent/50">
                    <Upload className="h-4 w-4" /> Tải lên CV (PDF)
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
                  </label>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Đang gửi…' : 'Gửi hồ sơ'}
                  </Button>
                </form>
              </Card>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
