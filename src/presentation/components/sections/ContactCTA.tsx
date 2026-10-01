import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { COMPANY } from '@/core/constants/site';
import { useI18n } from '@/core/i18n';
import { Container } from '@/presentation/components/common/Container';
import { Button } from '@/presentation/components/common/Button';
import { AuroraBackground } from '@/presentation/components/common/Backgrounds';

/** Reusable contact call-to-action band (UX rule: every page ends with one). */
export function ContactCTA() {
  const { t } = useI18n();
  return (
    <section className="py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-sky-200/80 bg-gradient-to-br from-sky-50 via-cyan-50/50 to-blue-50 px-8 py-14 text-center shadow-lg dark:border-white/10 dark:bg-gradient-to-br dark:from-[#0a1a3a] dark:to-[#04122e] md:px-16">
          <AuroraBackground />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">{t('cta.title')}</h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300">{t('cta.desc')}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/lien-he">
                <Button size="lg" className="bg-gradient-to-r from-brand-cyan to-blue-600 text-slate-950 font-bold shadow-md hover:brightness-110">
                  {t('common.requestConsult')} <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <a href={`tel:${COMPANY.hotline.replace(/\s/g, '')}`}>
                <Button size="lg" variant="outline" className="border-slate-300 bg-white text-slate-800 hover:bg-slate-100 dark:border-white/20 dark:bg-transparent dark:text-white dark:hover:bg-white/10">
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
