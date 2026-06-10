import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Container } from '@/presentation/components/common/Container';
import { Button } from '@/presentation/components/common/Button';
import { AuroraBackground } from '@/presentation/components/common/Backgrounds';
import { Seo } from '@/presentation/components/common/Seo';
import { useI18n } from '@/core/i18n';

export default function NotFoundPage() {
  const { pick } = useI18n();
  return (
    <section className="relative flex min-h-[70vh] items-center pt-20">
      <Seo title={`404 — ${pick('Không tìm thấy trang', 'Page Not Found')} | AIO`} />
      <AuroraBackground />
      <Container className="relative text-center">
        <p className="font-display text-8xl font-bold text-gradient">404</p>
        <h1 className="mt-4 text-3xl font-bold">{pick('Không tìm thấy trang', 'Page Not Found')}</h1>
        <p className="mt-3 text-muted">{pick('Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển.', 'The page you are looking for does not exist or has been moved.')}</p>
        <Link to="/" className="mt-8 inline-block">
          <Button size="lg"><Home className="h-5 w-5" /> {pick('Về trang chủ', 'Back to Home')}</Button>
        </Link>
      </Container>
    </section>
  );
}
