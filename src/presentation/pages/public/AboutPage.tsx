import { Target, Eye, Award, Users, Rocket, ShieldCheck, Check } from 'lucide-react';
import { COMPANY, COMPANY_STATS, BUSINESS_AREAS } from '@/core/constants/site';
import { useI18n } from '@/core/i18n';
import { Container } from '@/presentation/components/common/Container';
import { Card } from '@/presentation/components/common/Card';
import { StatCard } from '@/presentation/components/common/StatCard';
import { SectionHeader } from '@/presentation/components/common/SectionHeader';
import { Icon } from '@/presentation/components/common/Icon';
import { Seo } from '@/presentation/components/common/Seo';
import { PageHero } from '@/presentation/components/sections/PageHero';
import { ContactCTA } from '@/presentation/components/sections/ContactCTA';

const VALUES = [
  { icon: Award, title: 'Chất lượng', titleEn: 'Quality', desc: 'Cam kết tiêu chuẩn kỹ thuật cao nhất trong từng sản phẩm và dự án.', descEn: 'Committed to the highest technical standards in every product and project.' },
  { icon: Rocket, title: 'Đổi mới', titleEn: 'Innovation', desc: 'Liên tục cập nhật công nghệ mới: AI, IoT, Edge Computing.', descEn: 'Continuously updating new technologies: AI, IoT, Edge Computing.' },
  { icon: Users, title: 'Khách hàng', titleEn: 'Customer', desc: 'Lấy sự hài lòng của khách hàng làm trọng tâm phát triển.', descEn: 'Taking customer satisfaction as the focus of development.' },
  { icon: ShieldCheck, title: 'Tin cậy', titleEn: 'Reliability', desc: 'Bảo hành dài hạn, hỗ trợ kỹ thuật tận nơi 24/7.', descEn: 'Long-term warranty, 24/7 on-site technical support.' },
];

export default function AboutPage() {
  const { t, pick } = useI18n();
  return (
    <>
      <Seo title={`${t('nav./gioi-thieu')} | AIO Digital Solutions`} description={COMPANY.legalName} />
      <PageHero
        eyebrow={t('nav./gioi-thieu')}
        title={t('about.heroTitle')}
        description={`${COMPANY.legalName}`}
        breadcrumb={[{ label: t('nav./gioi-thieu') }]}
      />

      <section className="py-12">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader align="left" eyebrow={pick('Câu chuyện', 'Our Story')} title={pick('Hành trình của AIO', 'AIO Journey')} />
              <div className="mt-5 space-y-4 leading-relaxed text-muted">
                <p>
                  {pick(
                    `Được thành lập từ năm ${COMPANY.foundedYear}, AIO Digital Solutions khởi đầu từ lĩnh vực thi công, lắp đặt màn hình LED. Đến nay, chúng tôi cung cấp hệ sinh thái dịch vụ khép kín quanh hệ thống màn hình hiển thị và tự động hóa: thi công lắp đặt, quản lý điều khiển từ xa, bảo trì – bảo hành và tự động hóa điện – mạng – camera – nhà máy.`,
                    `Founded in ${COMPANY.foundedYear}, AIO Digital Solutions started in the field of construction and installation of LED screens. To date, we provide a closed service ecosystem around display systems and automation: installation, remote control management, maintenance - warranty, and automation of power - network - camera - factory.`
                  )}
                </p>
                <p>
                  {pick(
                    'Với đội ngũ kỹ sư giàu kinh nghiệm và mạng lưới đối tác là các thương hiệu hàng đầu thế giới, AIO tự hào đồng hành cùng hàng trăm doanh nghiệp, cơ quan và tổ chức trên khắp 63 tỉnh thành.',
                    "With a team of experienced engineers and a partner network of the world's leading brands, AIO is proud to accompany hundreds of businesses, agencies, and organizations across 63 provinces and cities."
                  )}
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <Card className="p-7">
                <Target className="h-9 w-9 text-brand-cyan" />
                <h3 className="mt-4 text-lg font-bold text-white">{pick('Sứ mệnh', 'Mission')}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {pick('Mang công nghệ tiên tiến đến gần hơn với doanh nghiệp Việt, thúc đẩy chuyển đổi số bền vững.', 'Bringing advanced technology closer to Vietnamese businesses, promoting sustainable digital transformation.')}
                </p>
              </Card>
              <Card className="p-7">
                <Eye className="h-9 w-9 text-brand-cyan" />
                <h3 className="mt-4 text-lg font-bold text-white">{pick('Tầm nhìn', 'Vision')}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {pick('Trở thành tập đoàn công nghệ hàng đầu Việt Nam trong lĩnh vực giải pháp hiển thị và đô thị thông minh.', 'Becoming a leading technology corporation in Vietnam in the field of display solutions and smart cities.')}
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COMPANY_STATS.map((s) => (
              <StatCard key={s.label} value={s.value} suffix={s.suffix} label={pick(s.label, s.labelEn)} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <SectionHeader eyebrow={t('home.areasEyebrow')} title={t('home.areasTitle')} />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {BUSINESS_AREAS.map((area) => (
              <Card key={area.slug} hover className="p-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-accent/15 text-brand-accent">
                    <Icon name={area.icon} className="text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold leading-tight text-white">{pick(area.title, area.titleEn)}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{pick(area.tagline, area.taglineEn)}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {pick(area.features, area.featuresEn).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-ink">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" /> {f}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <SectionHeader eyebrow={pick('Giá trị cốt lõi', 'Core Values')} title={pick('Điều làm nên AIO', 'What makes AIO')} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <Card key={v.title} hover className="p-7 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-accent/15 text-brand-accent">
                  <v.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">{pick(v.title, v.titleEn)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{pick(v.desc, v.descEn)}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <Card className="p-8">
            <SectionHeader align="left" eyebrow={pick('Thông tin doanh nghiệp', 'Enterprise Information')} title={pick('Hồ sơ pháp lý', 'Legal Profile')} />
            <dl className="mt-6 grid gap-x-10 gap-y-4 text-sm sm:grid-cols-2">
              <div><dt className="text-muted">{pick('Tên công ty', 'Company Name')}</dt><dd className="font-semibold text-white">{COMPANY.legalName}</dd></div>
              <div><dt className="text-muted">{pick('Mã số thuế', 'Tax Code')}</dt><dd className="font-semibold text-white">{COMPANY.taxCode}</dd></div>
              <div><dt className="text-muted">{pick('Người đại diện', 'Representative')}</dt><dd className="font-semibold text-white">{COMPANY.director}</dd></div>
              <div><dt className="text-muted">Email</dt><dd className="font-semibold text-white">{COMPANY.email}</dd></div>
              <div className="sm:col-span-2"><dt className="text-muted">{pick('Địa chỉ', 'Address')}</dt><dd className="font-semibold text-white">{COMPANY.address}</dd></div>
            </dl>
          </Card>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
