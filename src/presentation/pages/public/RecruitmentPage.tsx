import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Wallet, ArrowRight } from 'lucide-react';
import { JOB_TYPE_LABEL } from '@/domain/entities';
import { useAsync } from '@/presentation/hooks/useAsync';
import { services } from '@/app/services';
import { Container } from '@/presentation/components/common/Container';
import { Card } from '@/presentation/components/common/Card';
import { Badge } from '@/presentation/components/common/Badge';
import { Button } from '@/presentation/components/common/Button';
import { LoadingBlock, EmptyState } from '@/presentation/components/common/Feedback';
import { Seo } from '@/presentation/components/common/Seo';
import { PageHero } from '@/presentation/components/sections/PageHero';
import { ContactCTA } from '@/presentation/components/sections/ContactCTA';

export default function RecruitmentPage() {
  const { data, loading } = useAsync(() => services.jobs.list({ pageSize: 50 }), []);

  return (
    <>
      <Seo title="Tuyển dụng | AIO Digital Solutions" description="Cơ hội nghề nghiệp tại AIO — gia nhập đội ngũ công nghệ năng động." />
      <PageHero
        eyebrow="Tuyển dụng"
        title="Gia nhập đội ngũ AIO"
        description="Cùng nhau kiến tạo những giải pháp công nghệ tạo nên khác biệt."
        breadcrumb={[{ label: 'Tuyển dụng' }]}
      />

      <Container className="pb-10">
        {loading ? (
          <LoadingBlock />
        ) : data && data.items.length > 0 ? (
          <div className="space-y-4">
            {data.items.map((job) => (
              <Card key={job.id} hover className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{job.title}</h3>
                    {job.featured && <Badge tone="warning">Hot</Badge>}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                    <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.department}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
                    <span className="flex items-center gap-1.5"><Wallet className="h-4 w-4" /> {job.salaryRange}</span>
                    <Badge tone="info">{JOB_TYPE_LABEL[job.type]}</Badge>
                  </div>
                </div>
                <Link to={`/tuyen-dung/${job.slug}`}>
                  <Button variant="outline">Xem & Ứng tuyển <ArrowRight className="h-4 w-4" /></Button>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState title="Hiện chưa có vị trí tuyển dụng" />
        )}
      </Container>

      <ContactCTA />
    </>
  );
}
