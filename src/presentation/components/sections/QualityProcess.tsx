import { motion } from 'framer-motion';
import { Compass, Cpu, Wrench, CheckCircle2, ShieldCheck } from 'lucide-react';
import { QUALITY_PROCESS } from '@/core/constants/site';
import { useI18n } from '@/core/i18n';
import { Container } from '@/presentation/components/common/Container';
import { SectionHeader } from '@/presentation/components/common/SectionHeader';
import { Link } from 'react-router-dom';

const STEP_ICONS: Record<string, any> = {
  Compass,
  Cpu,
  Wrench,
  CheckCircle2,
  ShieldCheck,
};

export function QualityProcess() {
  const { pick } = useI18n();

  return (
    <section className="relative py-20 overflow-hidden border-t border-b border-slate-200 bg-slate-50/60 dark:border-white/5 dark:bg-[#050b16]">
      <Container className="relative">
        <SectionHeader
          eyebrow={pick('Quy trình thi công', 'Workflow')}
          title={pick('5 Bước Thi Công & Cam Kết SLA', '5-Step Quality Deployment')}
          description={pick(
            'Quy trình kỹ thuật nghiêm ngặt từ khảo sát 3D đến kiểm thử lão hóa 72h trước khi bàn giao.',
            'Strict engineering workflow from 3D survey to 72-hour burn-in stress testing.',
          )}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {QUALITY_PROCESS.map((item, idx) => {
            const IconComp = STEP_ICONS[item.icon] || CheckCircle2;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-md dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-brand-cyan/50 dark:hover:shadow-glow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:bg-brand-cyan/15 dark:text-brand-cyan">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xl font-black text-slate-300 group-hover:text-cyan-600 dark:text-slate-700 dark:group-hover:text-brand-cyan/40">
                    {item.step}
                  </span>
                </div>

                <h3 className="mt-4 text-sm font-bold text-slate-900 transition group-hover:text-cyan-600 dark:text-white dark:group-hover:text-brand-cyan">
                  {pick(item.title, item.titleEn)}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {pick(item.desc, item.descEn)}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* SLA Guarantee Banner */}
        <div className="mt-10 rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-50 via-cyan-50/50 to-emerald-50 p-5 md:p-6 shadow-sm backdrop-blur-xl dark:border-emerald-500/30 dark:bg-gradient-to-r dark:from-emerald-950/40 dark:via-slate-900/80 dark:to-cyan-950/40">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-center md:text-left">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {pick('Cam Kết Cứu Hộ & Bảo Trì SLA 2h - 4h', '2h - 4h Rapid SLA Response')}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 dark:text-slate-300">
                  {pick(
                    'Đội kỹ thuật AIO có mặt trong 2h-4h tại Hà Nội, Hưng Yên; 12h-24h toàn quốc với linh kiện sẵn có.',
                    'Rapid on-site response within 2h-4h in Hanoi & Hung Yen; 12h-24h nationwide.',
                  )}
                </p>
              </div>
            </div>

            <Link
              to="/lien-he"
              className="shrink-0 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-sm transition hover:bg-emerald-400"
            >
              {pick('Liên Hệ Cứu Hộ 24/7', 'Call 24/7 Desk')}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
