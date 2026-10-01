import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Calculator,
  Phone,
  Tv,
} from 'lucide-react';
import { COMPANY, COMPANY_STATS } from '@/core/constants/site';
import { useI18n } from '@/core/i18n';
import { useAsync } from '@/presentation/hooks/useAsync';
import { services } from '@/app/services';
import { Container } from '@/presentation/components/common/Container';
import { Button } from '@/presentation/components/common/Button';
import { AuroraBackground } from '@/presentation/components/common/Backgrounds';
import { Seo } from '@/presentation/components/common/Seo';
import { ProductCard } from '@/presentation/components/business/ProductCard';
import { ContactCTA } from '@/presentation/components/sections/ContactCTA';
import { BusinessAreas } from '@/presentation/components/sections/BusinessAreas';
import { SmartCalculator } from '@/presentation/components/business/SmartCalculator';
import { QualityProcess } from '@/presentation/components/sections/QualityProcess';
import { FeaturedProjectsMedia } from '@/presentation/components/business/FeaturedProjectsMedia';

const PRODUCT_TABS = [
  { id: 'all', label: 'Tất cả', labelEn: 'All' },
  { id: 'indoor-led-module', label: 'LED Trong Nhà', labelEn: 'Indoor LED' },
  { id: 'outdoor-led-module', label: 'LED Ngoài Trời', labelEn: 'Outdoor LED' },
  { id: 'technology-equipment', label: 'Bộ Xử Lý & NovaStar', labelEn: 'NovaStar & Controllers' },
  { id: 'education-equipment', label: 'Màn Ghép & Standee', labelEn: 'Video Wall & Standee' },
];

export default function HomePage() {
  const { pick } = useI18n();
  const [activeProductTab, setActiveProductTab] = useState('all');

  const { data: allProducts } = useAsync(() => services.products.list({ page: 1, pageSize: 50 }), []);

  // Filter products by tab
  const filteredProducts = useMemo(() => {
    if (!allProducts?.items) return [];
    if (activeProductTab === 'all') return allProducts.items.slice(0, 8);
    return allProducts.items.filter((p) => p.category === activeProductTab).slice(0, 8);
  }, [allProducts, activeProductTab]);

  return (
    <>
      <Seo
        title="AIO LED — Tổng Thầu Màn Hình LED, LCD Ghép & Tự Động Hóa"
        description="Tổng thầu thi công màn hình LED trong nhà, ngoài trời, LCD ghép, Standee quảng cáo, CMS Cloud Signage và tự động hóa nhà máy chuyên nghiệp."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: COMPANY.legalName,
          alternateName: COMPANY.brand,
          url: COMPANY.domain,
          logo: `${COMPANY.domain}/favicon.svg`,
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: COMPANY.hotline,
            contactType: 'customer service',
            areaServed: 'VN',
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Số nhà 05, ngõ 198 đường Lý Thường Kiệt, tổ 7 - Kỳ Bá',
            addressLocality: 'Phường Trần Lãm',
            addressRegion: 'Tỉnh Hưng Yên',
            addressCountry: 'VN',
          },
          taxID: COMPANY.taxCode,
        }}
      />

      {/* ========================================================
          1. HERO SHOWCASE (Clean, High-Tech, Punchy)
          ======================================================== */}
      <section className="relative overflow-hidden pb-16 pt-32 lg:pt-36">
        <AuroraBackground />
        
        {/* Subtle Tech Grid Lines */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />

        <Container className="relative z-10">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/40 bg-brand-cyan/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-cyan backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5" />
                {pick('Tổng Thầu Giải Pháp Màn Hình LED & Tự Động Hóa', 'Turnkey LED & Automation Contractor')}
              </div>

              <h1 className="mt-5 text-balance text-3xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
                {pick('Giải Pháp Hiển Thị', 'Smart Display')}{' '}
                <span className="bg-gradient-to-r from-brand-cyan via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {pick('LED Công Nghệ Cao', 'LED Solutions')}
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {pick(
                  'Thi công màn hình LED P0.9 - P10, Màn hình ghép LCD, Standee cảm ứng, Cloud Signage và Tự động hóa nhà máy với cam kết cứu hộ SLA 2h - 4h.',
                  'Turnkey supply and installation of Ultra HD LED displays, LCD video walls, interactive standees, cloud signage and factory automation.',
                )}
              </p>

              {/* 3 Quick Badges */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                {[
                  'LED P0.9 - P10 Chuẩn 3840Hz',
                  'CMS Cloud Quản Lý Tập Trung',
                  'Cứu Hộ & Bảo Trì SLA 2h-4h',
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100/80 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan-600 dark:text-brand-cyan" />
                    {item}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#smart-calculator"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-cyan via-cyan-400 to-blue-600 px-6 py-3.5 text-xs font-bold text-slate-950 shadow-glow transition hover:brightness-110 sm:text-sm"
                >
                  <Calculator className="h-4 w-4" />
                  {pick('Bảng Tính Báo Giá Tự Động AI', 'Smart LED Calculator')}
                </a>

                <Link to="/san-pham">
                  <Button size="lg" variant="outline" className="rounded-xl border-slate-300 text-xs font-bold text-slate-800 hover:bg-slate-100 sm:text-sm dark:border-white/20 dark:text-white dark:hover:bg-white/10">
                    {pick('Xem Sản Phẩm', 'View Products')} <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* 4 Stats */}
              <div className="mt-10 grid grid-cols-2 gap-4 border-t border-slate-200 pt-6 dark:border-white/10 sm:grid-cols-4">
                {COMPANY_STATS.map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-black text-brand-cyan lg:text-3xl">
                      {s.value}
                      {s.suffix}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">{pick(s.label, s.labelEn)}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Sleek Simulated Display HUD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-xl backdrop-blur-xl dark:border-brand-cyan/30 dark:bg-gradient-to-br dark:from-[#0a162e] dark:via-[#071022] dark:to-[#040914] dark:shadow-glow">
                {/* HUD Live Header */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      AIO COMMAND NOC
                    </span>
                  </div>
                  <span className="rounded bg-cyan-100 dark:bg-brand-cyan/20 px-2 py-0.5 text-[10px] font-mono font-bold text-cyan-800 dark:text-brand-cyan border border-cyan-300 dark:border-transparent">
                    SLA 24/7 ONLINE
                  </span>
                </div>

                {/* Simulated Screen */}
                <div className="relative mt-4 aspect-video overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#030816] p-4 shadow-inner">
                  <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
                  
                  <div className="relative z-10 flex h-full flex-col justify-between text-center">
                    <div className="flex justify-between text-[10px] text-cyan-300 font-mono">
                      <span>NOVASTAR 4K</span>
                      <span>3840Hz · DCI-P3</span>
                    </div>

                    <div className="py-2">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400">Trạng thái vận hành</span>
                      <h4 className="mt-0.5 text-base font-extrabold text-white">
                        {COMPANY.brand}
                      </h4>
                      <p className="text-[11px] font-mono text-cyan-300">Ultra HD 4K · Zero Downtime</p>
                    </div>

                    <div className="flex justify-between border-t border-cyan-900/50 pt-1.5 text-[10px] text-slate-400 font-mono">
                      <span>TEMP: 32°C</span>
                      <span className="text-emerald-400">MEANWELL: 100% OK</span>
                    </div>
                  </div>
                </div>

                {/* 3 Metric Pills */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 dark:border-white/5 dark:bg-white/[0.02]">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Tần số quét</span>
                    <p className="font-bold text-cyan-600 dark:text-brand-cyan">3840 Hz</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 dark:border-white/5 dark:bg-white/[0.02]">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Độ sáng max</span>
                    <p className="font-bold text-amber-500 dark:text-amber-400">8000 Nits</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 dark:border-white/5 dark:bg-white/[0.02]">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Cứu hộ SLA</span>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">2h - 4h</p>
                  </div>
                </div>

                {/* Hotline call */}
                <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.02] px-3.5 py-2.5 text-xs">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-cyan-600 dark:text-brand-cyan" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Tư vấn kỹ thuật:</span>
                  </div>
                  <a href={`tel:${COMPANY.hotline.replace(/\s+/g, '')}`} className="font-bold text-cyan-600 dark:text-brand-cyan hover:underline">
                    {COMPANY.hotline}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ========================================================
          2. FEATURED PROJECTS SHOWCASE (6-Video Auto-Scroll + Real Photos)
          ======================================================== */}
      <FeaturedProjectsMedia
        title={pick('Dự Án Đã Hoàn Thành Thực Tế', 'Delivered Real-World Projects')}
        subtitle={pick(
          'Trực quan các công trình màn hình LED & Màn hình hiển thị chuyên dụng do AIO LED trực tiếp tư vấn, sản xuất và thi công hoàn thiện.',
          'Real project videos and photos deployed by AIO LED across 34+ provinces.'
        )}
      />

      {/* ========================================================
          3. 4 BUSINESS CORE PILLARS (Concise & Visual)
          ======================================================== */}
      <BusinessAreas />

      {/* ========================================================
          4. SMART LED CALCULATOR
          ======================================================== */}
      <section id="smart-calculator" className="py-20 scroll-mt-20">
        <Container>
          <SmartCalculator />
        </Container>
      </section>

      {/* ========================================================
          5. FEATURED PRODUCTS CATALOG
          ======================================================== */}
      <section className="py-20">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:border-brand-cyan/30 dark:bg-brand-cyan/10 dark:text-brand-cyan">
                <Tv className="h-3.5 w-3.5" />
                {pick('Danh mục thiết bị', 'Products')}
              </div>
              <h2 className="mt-2.5 text-2xl font-bold text-slate-900 md:text-3xl dark:text-white">
                {pick('Sản Phẩm & Thiết Bị Chính Hãng', 'Featured Products & Equipment')}
              </h2>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {PRODUCT_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveProductTab(tab.id)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    activeProductTab === tab.id
                      ? 'border border-brand-cyan bg-brand-cyan text-slate-950 font-bold shadow-glow'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-white/20 dark:hover:text-white'
                  }`}
                >
                  {pick(tab.label, tab.labelEn)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/san-pham">
              <Button variant="outline" size="lg" className="rounded-xl border-slate-300 text-xs font-bold text-slate-800 hover:bg-slate-100 sm:text-sm dark:border-white/20 dark:text-white dark:hover:bg-white/10">
                {pick('Xem Tất Cả Sản Phẩm', 'View All Products')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* ========================================================
          6. 5-STEP QUALITY PROCESS
          ======================================================== */}
      <QualityProcess />

      {/* ========================================================
          7. CONTACT & CONSULTATION CTA
          ======================================================== */}
      <ContactCTA />
    </>
  );
}
