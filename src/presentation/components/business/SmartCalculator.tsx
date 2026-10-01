import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Maximize2,
  PhoneCall,
  Download,
  Send,
  RotateCcw,
  Sparkles,
  Tv,
} from 'lucide-react';
import { useI18n } from '@/core/i18n';
import { COMPANY } from '@/core/constants/site';
import { formatNumber } from '@/core/utils/format';
import { Button } from '@/presentation/components/common/Button';
import { toast } from 'sonner';
import { services } from '@/app/services';

export interface LEDOption {
  id: string;
  name: string;
  pitch: number;
  category: 'indoor' | 'outdoor' | 'transparent' | 'lcd' | 'standee';
  brightness: string;
  refreshRate: string;
  viewingDistance: string;
  moduleW: number;
  moduleH: number;
  cabinetW: number;
  cabinetH: number;
  unitPriceSqm: number;
  powerMaxPerSqm: number;
  powerAvgPerSqm: number;
  recommendedController: string;
}

export const LED_OPTIONS: LEDOption[] = [
  {
    id: 'indoor-p125',
    name: 'LED P1.25 Trong Nhà (Ultra HD 4K)',
    pitch: 1.25,
    category: 'indoor',
    brightness: '800 nits',
    refreshRate: '3840Hz',
    viewingDistance: '≥ 1.2m',
    moduleW: 320,
    moduleH: 160,
    cabinetW: 640,
    cabinetH: 480,
    unitPriceSqm: 28500000,
    powerMaxPerSqm: 650,
    powerAvgPerSqm: 220,
    recommendedController: 'NovaStar VX1000',
  },
  {
    id: 'indoor-p153',
    name: 'LED P1.53 Trong Nhà (Fine Pitch)',
    pitch: 1.53,
    category: 'indoor',
    brightness: '800 nits',
    refreshRate: '3840Hz',
    viewingDistance: '≥ 1.5m',
    moduleW: 320,
    moduleH: 160,
    cabinetW: 640,
    cabinetH: 480,
    unitPriceSqm: 21500000,
    powerMaxPerSqm: 600,
    powerAvgPerSqm: 200,
    recommendedController: 'NovaStar VX600',
  },
  {
    id: 'indoor-p186',
    name: 'LED P1.86 Trong Nhà (Hội trường VIP)',
    pitch: 1.86,
    category: 'indoor',
    brightness: '800 nits',
    refreshRate: '3840Hz',
    viewingDistance: '≥ 1.8m',
    moduleW: 320,
    moduleH: 160,
    cabinetW: 640,
    cabinetH: 480,
    unitPriceSqm: 16500000,
    powerMaxPerSqm: 580,
    powerAvgPerSqm: 190,
    recommendedController: 'NovaStar TB50',
  },
  {
    id: 'indoor-p20',
    name: 'LED P2.0 Trong Nhà (Doanh nghiệp)',
    pitch: 2.0,
    category: 'indoor',
    brightness: '800 nits',
    refreshRate: '3840Hz',
    viewingDistance: '≥ 2.0m',
    moduleW: 320,
    moduleH: 160,
    cabinetW: 640,
    cabinetH: 480,
    unitPriceSqm: 14200000,
    powerMaxPerSqm: 550,
    powerAvgPerSqm: 180,
    recommendedController: 'NovaStar TB40',
  },
  {
    id: 'indoor-p25',
    name: 'LED P2.5 Trong Nhà (Tiệc cưới & Hội trường)',
    pitch: 2.5,
    category: 'indoor',
    brightness: '1000 nits',
    refreshRate: '3840Hz',
    viewingDistance: '≥ 2.5m',
    moduleW: 320,
    moduleH: 160,
    cabinetW: 640,
    cabinetH: 480,
    unitPriceSqm: 11800000,
    powerMaxPerSqm: 520,
    powerAvgPerSqm: 170,
    recommendedController: 'NovaStar TB30',
  },
  {
    id: 'outdoor-p3',
    name: 'LED P3 Ngoài Trời (IP65 / 6500 nits)',
    pitch: 3.0,
    category: 'outdoor',
    brightness: '6500 nits',
    refreshRate: '3840Hz',
    viewingDistance: '≥ 3.0m',
    moduleW: 192,
    moduleH: 192,
    cabinetW: 960,
    cabinetH: 960,
    unitPriceSqm: 19500000,
    powerMaxPerSqm: 850,
    powerAvgPerSqm: 280,
    recommendedController: 'NovaStar TB60',
  },
  {
    id: 'outdoor-p4',
    name: 'LED P4 Ngoài Trời (Billboard chuẩn)',
    pitch: 4.0,
    category: 'outdoor',
    brightness: '7000 nits',
    refreshRate: '3840Hz',
    viewingDistance: '≥ 4.0m',
    moduleW: 320,
    moduleH: 160,
    cabinetW: 960,
    cabinetH: 960,
    unitPriceSqm: 15500000,
    powerMaxPerSqm: 800,
    powerAvgPerSqm: 260,
    recommendedController: 'NovaStar TB50',
  },
  {
    id: 'outdoor-p5',
    name: 'LED P5 Ngoài Trời (Siêu sáng 8000 nits)',
    pitch: 5.0,
    category: 'outdoor',
    brightness: '8000 nits',
    refreshRate: '3840Hz',
    viewingDistance: '≥ 5.0m',
    moduleW: 320,
    moduleH: 160,
    cabinetW: 960,
    cabinetH: 960,
    unitPriceSqm: 13200000,
    powerMaxPerSqm: 780,
    powerAvgPerSqm: 250,
    recommendedController: 'NovaStar TB30',
  },
  {
    id: 'transparent-p39',
    name: 'LED Trong Suốt (Vách kính Showroom)',
    pitch: 3.91,
    category: 'transparent',
    brightness: '5000 nits',
    refreshRate: '3840Hz',
    viewingDistance: '≥ 3.5m',
    moduleW: 500,
    moduleH: 250,
    cabinetW: 1000,
    cabinetH: 500,
    unitPriceSqm: 24500000,
    powerMaxPerSqm: 700,
    powerAvgPerSqm: 230,
    recommendedController: 'NovaStar TB50',
  },
  {
    id: 'lcd-videowall-55',
    name: 'Màn hình ghép LCD 55" viền 0.88mm (LG)',
    pitch: 0.63,
    category: 'lcd',
    brightness: '700 nits',
    refreshRate: '60Hz 4K',
    viewingDistance: '≥ 0.8m',
    moduleW: 1213,
    moduleH: 684,
    cabinetW: 1213,
    cabinetH: 684,
    unitPriceSqm: 22000000,
    powerMaxPerSqm: 220,
    powerAvgPerSqm: 120,
    recommendedController: 'Matrix Controller 4K',
  },
  {
    id: 'standee-55-touch',
    name: 'Standee Cảm Ứng 55" (Cloud CMS)',
    pitch: 0.63,
    category: 'standee',
    brightness: '500 nits',
    refreshRate: '60Hz',
    viewingDistance: '≥ 0.5m',
    moduleW: 700,
    moduleH: 1800,
    cabinetW: 700,
    cabinetH: 1800,
    unitPriceSqm: 18500000,
    powerMaxPerSqm: 150,
    powerAvgPerSqm: 80,
    recommendedController: 'Android 13 + Cloud CMS',
  },
];

const PRESETS = [
  { label: 'Hội trường 120" (2.6m × 1.5m)', w: 2.6, h: 1.5 },
  { label: 'Sân khấu 150" (3.2m × 1.8m)', w: 3.2, h: 1.8 },
  { label: 'Sự kiện 200" (4.5m × 2.5m)', w: 4.5, h: 2.5 },
  { label: 'Mặt tiền (6m × 3.5m)', w: 6.0, h: 3.5 },
  { label: 'Billboard (8m × 4.5m)', w: 8.0, h: 4.5 },
];

export function SmartCalculator() {
  const { pick } = useI18n();

  const [selectedEnv, setSelectedEnv] = useState<'all' | 'indoor' | 'outdoor' | 'transparent' | 'lcd' | 'standee'>('all');
  const [selectedOptionId, setSelectedOptionId] = useState<string>('indoor-p186');
  const [width, setWidth] = useState<number>(4.0);
  const [height, setHeight] = useState<number>(2.5);

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const activeLED = useMemo(() => {
    return LED_OPTIONS.find((o) => o.id === selectedOptionId) ?? LED_OPTIONS[0];
  }, [selectedOptionId]);

  const availableOptions = useMemo(() => {
    if (selectedEnv === 'all') return LED_OPTIONS;
    return LED_OPTIONS.filter((o) => o.category === selectedEnv);
  }, [selectedEnv]);

  const calculations = useMemo(() => {
    const area = Math.max(0.1, Number((width * height).toFixed(2)));
    const pixelWidth = Math.round((width * 1000) / activeLED.pitch);
    const pixelHeight = Math.round((height * 1000) / activeLED.pitch);
    const totalPixels = pixelWidth * pixelHeight;
    const megaPixels = (totalPixels / 1_000_000).toFixed(2);

    let standard = 'HD';
    if (pixelWidth >= 3840 && pixelHeight >= 2160) standard = '4K UHD';
    else if (pixelWidth >= 2560 || pixelHeight >= 1440) standard = '2K QHD';
    else if (pixelWidth >= 1920 && pixelHeight >= 1080) standard = 'Full HD';

    const moduleCountW = Math.ceil((width * 1000) / activeLED.moduleW);
    const moduleCountH = Math.ceil((height * 1000) / activeLED.moduleH);
    const totalModules = moduleCountW * moduleCountH;

    const modulesPerCabinet = Math.max(
      1,
      Math.round((activeLED.cabinetW / activeLED.moduleW) * (activeLED.cabinetH / activeLED.moduleH))
    );
    const totalCabinets = Math.ceil(totalModules / modulesPerCabinet);

    const powerAvgKw = Number(((area * activeLED.powerAvgPerSqm) / 1000).toFixed(1));
    const meanwellPowerUnits = Math.ceil((area * activeLED.powerMaxPerSqm) / 250);

    const rawCost = area * activeLED.unitPriceSqm;
    const frameAndInstall = Math.round(area * 1500000);
    const controlSystemCost = activeLED.category === 'indoor' ? 12000000 : 20000000;
    const totalEstimate = rawCost + frameAndInstall + controlSystemCost;

    return {
      area,
      pixelWidth,
      pixelHeight,
      megaPixels,
      standard,
      totalModules,
      totalCabinets,
      powerAvgKw,
      meanwellPowerUnits,
      totalEstimate,
    };
  }, [width, height, activeLED]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      toast.error('Vui lòng nhập Họ tên và Số điện thoại!');
      return;
    }

    setIsSubmitting(true);
    try {
      await services.quotations.create({
        customerName,
        company: '',
        email: 'khachhang@aioled.vn',
        phone: customerPhone,
        items: [
          {
            productId: activeLED.id,
            productName: `${activeLED.name} (${width}m × ${height}m = ${calculations.area}m²)`,
            quantity: 1,
            unitPrice: calculations.totalEstimate,
          },
        ],
        status: 'sent',
        total: calculations.totalEstimate,
        note: `[Bảng tính tự động]: Kích thước ${width}m x ${height}m (${calculations.area}m2). Độ phân giải: ${calculations.pixelWidth}x${calculations.pixelHeight}px. Ghi chú: ${customerNote}`,
        validUntil: new Date(Date.now() + 30 * 86400000).toISOString(),
      });

      toast.success('Đã gửi yêu cầu dự toán thành công!');
      setShowQuoteModal(true);
    } catch {
      toast.error('Có lỗi xảy ra, vui lòng gọi hotline 038 4204555.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur-xl dark:border-brand-cyan/30 dark:bg-[#080e1a]/95 dark:shadow-2xl md:p-8">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-200 pb-6 dark:border-white/10 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-700 dark:border-brand-cyan/30 dark:bg-brand-cyan/10 dark:text-brand-cyan">
            <Sparkles className="h-3.5 w-3.5" />
            {pick('Công cụ báo giá AI', 'AI Estimator')}
          </div>
          <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
            {pick('Bảng Tính Dự Toán Màn Hình LED Tự Động', 'LED Screen Cost Estimator')}
          </h2>
        </div>

        <a
          href={COMPANY.zalo}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-400"
        >
          <PhoneCall className="h-3.5 w-3.5" />
          <span>Tư vấn: 038 4204555</span>
        </a>
      </div>

      {/* Grid: 2 Columns */}
      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Left Inputs (5 cols) */}
        <div className="space-y-4 lg:col-span-5">
          {/* Step 1: Environment */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 dark:border-white/10 dark:bg-white/[0.02]">
            <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-700 dark:text-brand-cyan flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" /> 1. Môi trường lắp đặt
            </label>
            <div className="mt-2.5 grid grid-cols-3 gap-1.5">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'indoor', label: 'Trong nhà' },
                { id: 'outdoor', label: 'Ngoài trời' },
                { id: 'transparent', label: 'Trong suốt' },
                { id: 'lcd', label: 'Màn ghép' },
                { id: 'standee', label: 'Standee' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedEnv(tab.id as any)}
                  className={`rounded-lg py-1.5 text-xs font-semibold transition ${
                    selectedEnv === tab.id
                      ? 'bg-brand-cyan text-slate-950 font-bold shadow-sm'
                      : 'border border-slate-200/80 bg-white text-slate-700 hover:text-slate-950 dark:border-transparent dark:bg-white/5 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Pitch selector */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 dark:border-white/10 dark:bg-white/[0.02]">
            <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-700 dark:text-brand-cyan flex items-center gap-1.5">
              <Tv className="h-3.5 w-3.5" /> 2. Loại màn hình & Pitch
            </label>
            <div className="mt-2.5 max-h-[160px] space-y-1.5 overflow-y-auto pr-1">
              {availableOptions.map((opt) => {
                const isSelected = opt.id === selectedOptionId;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedOptionId(opt.id)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs transition ${
                      isSelected
                        ? 'border border-cyan-500/60 bg-cyan-50 text-cyan-950 font-bold dark:border-brand-cyan/60 dark:bg-brand-cyan/15 dark:text-white'
                        : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-white/5 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'
                    }`}
                  >
                    <span className="truncate">{opt.name}</span>
                    <span className="ml-2 shrink-0 rounded bg-cyan-100 px-1.5 py-0.5 text-[10px] font-mono font-bold text-cyan-800 dark:bg-white/10 dark:text-brand-cyan">
                      P{opt.pitch}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Dimensions */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 dark:border-white/10 dark:bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-cyan-700 dark:text-brand-cyan flex items-center gap-1.5">
                <Maximize2 className="h-3.5 w-3.5" /> 3. Kích thước hiển thị
              </label>
              <button
                type="button"
                onClick={() => {
                  setWidth(4.0);
                  setHeight(2.5);
                }}
                className="text-[10px] text-slate-500 hover:text-cyan-700 flex items-center gap-1 dark:text-slate-400 dark:hover:text-brand-cyan"
              >
                <RotateCcw className="h-3 w-3" /> Mặc định
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-slate-600 dark:text-slate-400">Rộng (W) mét:</span>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  value={width}
                  onChange={(e) => setWidth(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900 focus:border-brand-cyan focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div>
                <span className="text-[11px] text-slate-600 dark:text-slate-400">Cao (H) mét:</span>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  value={height}
                  onChange={(e) => setHeight(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-900 focus:border-brand-cyan focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Presets */}
            <div className="mt-3 flex flex-wrap gap-1">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setWidth(p.w);
                    setHeight(p.h);
                  }}
                  className="rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-[10px] text-slate-700 hover:border-cyan-500/40 hover:text-cyan-700 dark:border-white/5 dark:bg-white/5 dark:text-slate-300 dark:hover:border-brand-cyan/40 dark:hover:text-white"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Live HUD Output (7 cols) */}
        <div className="space-y-4 lg:col-span-7">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md text-slate-900 dark:border-cyan-500/40 dark:bg-[#07132b] dark:text-white dark:shadow-[0_0_40px_rgba(0,102,255,0.18)]">
            {/* Top Stat Ribbon */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-center dark:border-transparent dark:bg-white/[0.06]">
                <span className="text-[10px] text-slate-500 dark:text-slate-300 font-medium">Diện tích</span>
                <p className="text-xl font-black text-cyan-600 dark:text-brand-cyan">{calculations.area} m²</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-center dark:border-transparent dark:bg-white/[0.06]">
                <span className="text-[10px] text-slate-500 dark:text-slate-300 font-medium">Độ phân giải</span>
                <p className="text-sm font-black text-slate-900 dark:text-white mt-1">
                  {calculations.pixelWidth} × {calculations.pixelHeight}
                </p>
                <span className="text-[9px] text-cyan-600 dark:text-brand-cyan font-bold">{calculations.standard}</span>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-center dark:border-transparent dark:bg-white/[0.06]">
                <span className="text-[10px] text-slate-500 dark:text-slate-300 font-medium">Khoảng cách</span>
                <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">{activeLED.viewingDistance}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-center dark:border-transparent dark:bg-white/[0.06]">
                <span className="text-[10px] text-slate-500 dark:text-slate-300 font-medium">Điện năng</span>
                <p className="text-xl font-black text-amber-500 dark:text-amber-400">~{calculations.powerAvgKw} kW</p>
              </div>
            </div>

            {/* Hardware Breakdown List */}
            <div className="mt-4 space-y-1.5 rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 text-xs dark:border-transparent dark:bg-black/50">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Số lượng Module LED:</span>
                <strong className="text-slate-900 dark:text-white font-bold">{calculations.totalModules} tấm</strong>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Cabinet nhôm đúc & Nguồn Meanwell:</span>
                <strong className="text-slate-900 dark:text-white font-bold">
                  {calculations.totalCabinets} Cabinet · {calculations.meanwellPowerUnits} Bộ nguồn
                </strong>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Bộ điều khiển NovaStar:</span>
                <strong className="text-cyan-700 dark:text-brand-cyan font-bold">{activeLED.recommendedController}</strong>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Bảo hành chính hãng:</span>
                <strong className="text-emerald-700 dark:text-emerald-400 font-bold">24 - 36 Tháng (Cứu hộ 2h - 4h)</strong>
              </div>
            </div>

            {/* Price Banner */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl bg-cyan-50/90 border border-cyan-500/30 p-3.5 dark:border-brand-cyan/40 dark:bg-gradient-to-r dark:from-cyan-500/20 dark:to-blue-600/20">
              <div>
                <span className="text-[11px] text-slate-600 dark:text-slate-200">Dự toán trọn gói tham khảo:</span>
                <p className="text-2xl font-black text-cyan-600 dark:text-brand-cyan">
                  ~ {formatNumber(calculations.totalEstimate)} <span className="text-xs text-slate-700 dark:text-white">VNĐ</span>
                </p>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-300 sm:text-right">Đã gồm Cabinet, nguồn, khung & công lắp</span>
            </div>
          </div>

          {/* Quick Lead Form */}
          <form onSubmit={handleFormSubmit} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 space-y-2.5 dark:border-white/10 dark:bg-white/[0.02]">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Nhận file báo giá chi tiết qua Zalo / Email
            </p>

            <div className="grid gap-2 sm:grid-cols-2">
              <input
                type="text"
                required
                placeholder="Họ và tên *"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-brand-cyan focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white"
              />
              <input
                type="tel"
                required
                placeholder="Số điện thoại / Zalo *"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-brand-cyan focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <input
              type="text"
              placeholder="Ghi chú thêm: Địa điểm lắp đặt, yêu cầu thời gian..."
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-brand-cyan focus:outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white"
            />

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-brand-cyan to-blue-600 text-slate-950 font-bold text-xs sm:text-sm py-3"
            >
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Đang gửi...' : 'Gửi Dự Toán & Nhận Báo Giá Chi Tiết'}
            </Button>
          </form>
        </div>
      </div>

      {/* Quote Summary Modal */}
      <AnimatePresence>
        {showQuoteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl border border-brand-cyan/40 bg-[#081022] p-6 shadow-2xl text-white"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white">DỰ TOÁN MÀN HÌNH LED</h3>
                <button
                  onClick={() => setShowQuoteModal(false)}
                  className="rounded-lg bg-white/10 px-2.5 py-1 text-xs text-slate-300 hover:text-white"
                >
                  Đóng
                </button>
              </div>

              <div className="mt-4 space-y-2 text-xs">
                <p><span className="text-slate-400">Khách hàng:</span> <strong>{customerName}</strong> ({customerPhone})</p>
                <p><span className="text-slate-400">Sản phẩm:</span> <strong>{activeLED.name}</strong></p>
                <p><span className="text-slate-400">Kích thước:</span> <strong>{width}m × {height}m = {calculations.area} m²</strong></p>
                <p><span className="text-slate-400">Độ phân giải:</span> <strong className="text-brand-cyan">{calculations.pixelWidth} × {calculations.pixelHeight} px</strong></p>
                <p><span className="text-slate-400">Dự toán tổng:</span> <strong className="text-lg text-brand-cyan">{formatNumber(calculations.totalEstimate)} VNĐ</strong></p>
              </div>

              <div className="mt-5 flex gap-2.5">
                <Button onClick={() => window.print()} variant="outline" className="flex-1 border-white/20 text-xs">
                  <Download className="mr-1.5 h-3.5 w-3.5" /> In phiếu
                </Button>
                <a
                  href={`https://zalo.me/0384204555?text=${encodeURIComponent(
                    `Chào AIO, tôi là ${customerName} (${customerPhone}). Nhờ AIO gửi báo giá chi tiết màn hình ${activeLED.name} ${width}m x ${height}m.`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white hover:bg-blue-500"
                >
                  <PhoneCall className="mr-1.5 h-3.5 w-3.5" /> Chat Zalo Ngay
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
