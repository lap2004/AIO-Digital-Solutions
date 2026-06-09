import { useI18n } from '@/core/i18n';
import { useAsync } from '@/presentation/hooks/useAsync';
import { services } from '@/app/services';
import { Container } from '@/presentation/components/common/Container';
import { LoadingBlock } from '@/presentation/components/common/Feedback';
import { Seo } from '@/presentation/components/common/Seo';
import { SolutionCard } from '@/presentation/components/business/SolutionCard';
import { PageHero } from '@/presentation/components/sections/PageHero';
import { ContactCTA } from '@/presentation/components/sections/ContactCTA';

export default function SolutionsPage() {
  const { t } = useI18n();
  const { data, loading } = useAsync(() => services.solutions.list(), []);

  return (
    <>
      <Seo title="Giải pháp | AIO Digital Solutions" description="Các giải pháp công nghệ: màn hình LED, Smart City, AI Camera, IoT, bệnh viện và giáo dục thông minh." />
      <PageHero
        eyebrow={t('nav./giai-phap')}
        title={t('solutions.heroTitle')}
        description={t('solutions.heroDesc')}
        breadcrumb={[{ label: t('nav./giai-phap') }]}
      />
      <Container className="pb-10">
        {loading ? (
          <LoadingBlock />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(data ?? []).map((s) => (
              <SolutionCard key={s.id} solution={s} />
            ))}
          </div>
        )}
      </Container>
      <ContactCTA />
    </>
  );
}
