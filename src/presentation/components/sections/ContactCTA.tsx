import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { COMPANY } from '@/core/constants/site';
import { Container } from '@/presentation/components/common/Container';
import { Button } from '@/presentation/components/common/Button';
import { AuroraBackground } from '@/presentation/components/common/Backgrounds';

/** Reusable contact call-to-action band (UX rule: every page ends with one). */
export function ContactCTA() {
  return (
    <section className="py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0a1a3a] to-[#04122e] px-8 py-14 text-center md:px-16">
          <AuroraBackground />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-bold md:text-4xl">
              Sẵn sàng triển khai dự án công nghệ của bạn?
            </h2>
            <p className="mt-4 text-base text-muted">
              Đội ngũ chuyên gia AIO tư vấn giải pháp, khảo sát và báo giá miễn phí trong 24 giờ.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/lien-he">
                <Button size="lg">
                  Yêu cầu tư vấn <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <a href={`tel:${COMPANY.hotline.replace(/\s/g, '')}`}>
                <Button size="lg" variant="outline">
                  <Phone className="h-5 w-5" /> {COMPANY.hotline}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
