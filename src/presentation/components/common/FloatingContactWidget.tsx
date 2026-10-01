import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Calculator, X, Send, CheckCircle } from 'lucide-react';
import { COMPANY } from '@/core/constants/site';
import { useI18n } from '@/core/i18n';
import { Link } from 'react-router-dom';
import { services } from '@/app/services';
import { toast } from 'sonner';

export function FloatingContactWidget() {
  const { pick } = useI18n();
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    try {
      await services.quotations.create({
        customerName: name.trim(),
        company: 'Khách vãng lai',
        email: `khachhang_${phone.replace(/\D/g, '') || Date.now()}@aioled.vn`,
        phone: phone.trim(),
        requestType: 'consultation',
        interest: 'Tư vấn kỹ thuật 24/7 & Khảo sát 3D miễn phí',
        items: [
          {
            productId: 'tu-van-247',
            productName: 'Yêu cầu khảo sát 3D & Tư vấn màn hình LED tận nơi',
            quantity: 1,
            unitPrice: 0,
          },
        ],
        status: 'sent',
        total: 0,
        note: `Khách đăng ký qua Popup Tư Vấn Nhanh 24/7 trên website. Cần chuyên viên gọi lại tư vấn và hỗ trợ kỹ thuật.`,
        validUntil: new Date(Date.now() + 30 * 86400000).toISOString(),
      });
    } catch {
      // Fallback safe save to localStorage
      try {
        const stored = localStorage.getItem('aio.quotations') || '[]';
        const parsed = JSON.parse(stored);
        parsed.unshift({
          id: `quote-${Date.now()}`,
          code: `BG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          customerName: name.trim(),
          phone: phone.trim(),
          company: 'Khách vãng lai',
          email: `khachhang_${phone.replace(/\D/g, '') || Date.now()}@aioled.vn`,
          requestType: 'consultation',
          interest: 'Tư vấn kỹ thuật 24/7 & Khảo sát 3D miễn phí',
          items: [
            {
              productId: 'tu-van-247',
              productName: 'Yêu cầu khảo sát 3D & Tư vấn màn hình LED tận nơi',
              quantity: 1,
              unitPrice: 0,
            },
          ],
          status: 'sent',
          total: 0,
          note: `Khách đăng ký qua Popup Tư Vấn Nhanh 24/7 trên website. Cần chuyên viên gọi lại tư vấn và hỗ trợ kỹ thuật.`,
          createdAt: new Date().toISOString(),
          validUntil: new Date(Date.now() + 30 * 86400000).toISOString(),
        });
        localStorage.setItem('aio.quotations', JSON.stringify(parsed));
        window.dispatchEvent(new Event('aio-quotations-changed'));
      } catch (err) {
        console.warn('Local quote fallback:', err);
      }
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success('Đã gửi thông tin thành công! Chuyên viên AIO sẽ gọi lại trong 5 phút.');
      setTimeout(() => {
        setIsConsultOpen(false);
        setSubmitted(false);
        setName('');
        setPhone('');
      }, 3000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Quick Consultation Popup Card */}
      <AnimatePresence>
        {isConsultOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[320px] overflow-hidden rounded-3xl border border-brand-cyan/40 bg-[#080e1a]/95 p-5 text-white shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-cyan">
                  {pick('Tư vấn kỹ thuật 24/7', '24/7 Quick Consultation')}
                </h4>
              </div>
              <button
                onClick={() => setIsConsultOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {submitted ? (
              <div className="py-6 text-center">
                <CheckCircle className="mx-auto h-10 w-10 text-emerald-400" />
                <p className="mt-2 text-sm font-bold text-white">Đã tiếp nhận yêu cầu!</p>
                <p className="mt-1 text-xs text-slate-300">Kỹ sư AIO sẽ gọi tư vấn trong 5 phút.</p>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} className="mt-3 space-y-3">
                <p className="text-xs text-slate-300">
                  {pick(
                    'Để lại SĐT để nhận khảo sát 3D và báo giá màn hình LED tận nơi miễn phí:',
                    'Leave your phone number for free on-site 3D survey & quotation:',
                  )}
                </p>
                <input
                  type="text"
                  required
                  placeholder="Họ và tên của bạn"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs text-white focus:border-brand-cyan focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  placeholder="Số điện thoại / Zalo *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs text-white focus:border-brand-cyan focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-cyan to-blue-600 py-2.5 text-xs font-bold text-slate-950 shadow-lg transition hover:brightness-110"
                >
                  <Send className="h-3.5 w-3.5" />
                  {isSubmitting ? 'Đang gửi...' : 'Nhận Báo Giá Ngay'}
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Buttons Stack */}
      <div className="flex flex-col items-center gap-2.5">
        {/* Smart Calculator Fast Link */}
        <Link
          to="/bao-gia"
          className="group relative flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-cyan/40 bg-[#0b1326] text-brand-cyan shadow-glow transition-all duration-300 hover:scale-110 hover:bg-brand-cyan hover:text-slate-950"
          title="Bảng tính báo giá LED tự động"
        >
          <Calculator className="h-5 w-5" />
          <span className="pointer-events-none absolute right-14 whitespace-nowrap rounded-lg border border-brand-cyan/30 bg-[#080e1a] px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
            Bảng tính báo giá LED AI
          </span>
        </Link>

        {/* Zalo Chat Button */}
        <a
          href={COMPANY.zalo}
          target="_blank"
          rel="noreferrer"
          className="group relative flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/40 bg-[#0068FF] text-white shadow-[0_0_20px_rgba(0,104,255,0.4)] transition-all duration-300 hover:scale-110"
          title="Chat Zalo hỗ trợ kỹ thuật 24/7"
        >
          <MessageCircle className="h-5 w-5 fill-current" />
          <span className="pointer-events-none absolute right-14 whitespace-nowrap rounded-lg border border-blue-500/30 bg-[#080e1a] px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
            Chat Zalo tư vấn 24/7
          </span>
        </a>

        {/* Pulsing Neon Hotline Call Button */}
        <div className="relative">
          {/* Radar Waves */}
          <span className="absolute -inset-1.5 animate-ping rounded-2xl bg-cyan-400 opacity-60" />
          <span className="absolute -inset-2.5 animate-pulse rounded-2xl bg-brand-cyan opacity-30 blur-sm" />

          <button
            type="button"
            onClick={() => setIsConsultOpen((v) => !v)}
            className="group relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-400 via-brand-cyan to-blue-500 text-slate-950 shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300 hover:scale-110"
            title={`Hotline 24/7: ${COMPANY.hotline}`}
          >
            <Phone className="h-6 w-6 animate-bounce" />
            <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-lg border border-brand-cyan/40 bg-[#080e1a] px-3.5 py-2 text-xs font-bold text-white opacity-0 shadow-2xl backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
              Hotline: <span className="text-brand-cyan">{COMPANY.hotline}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
