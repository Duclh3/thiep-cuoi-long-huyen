import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XCircle,
  Share2,
  Check,
  Heart,
  Sparkles,
  Send,
  MessageSquareHeart,
  Gift,
  Copy,
  Download,
  X,
} from 'lucide-react';
import { StyleId, THEMES, WeddingData, WishItem } from '../data/weddingData';

interface RsvpWishesSectionProps {
  styleId: StyleId;
  data: WeddingData;
  wishes: WishItem[];
  onAddWish: (wish: WishItem) => void;
}

const QUICK_WISH_TEMPLATES = [
  'Chúc Thành Long & Thanh Huyền trăm năm hạnh phúc, trọn vẹn yêu thương!',
  'Chúc mừng ngày chung đôi! Mong hành trình phía trước của hai bạn luôn ngập tràn tiếng cười.',
  'Trăm năm tình viên mãn, bạc đầu nghĩa phu thê. Chúc mừng hạnh phúc hai em!',
];

export const RsvpWishesSection: React.FC<RsvpWishesSectionProps> = ({
  styleId,
  data,
  wishes,
  onAddWish,
}) => {
  const theme = THEMES[styleId];

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedKey, setCopiedKey] = useState<'groom' | 'bride' | null>(null);
  const [zoomQrUrl, setZoomQrUrl] = useState<string | null>(null);

  const triggerCelebration = () => {
    confetti({
      particleCount: 95,
      spread: 80,
      origin: { y: 0.65 },
      colors: theme.confettiColors,
    });
    window.triggerWeddingFireworks?.(6);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const now = new Date();
    const formattedTime = `${now.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    })} • ${now.toLocaleDateString('vi-VN')}`;

    const newWish: WishItem = {
      id: `wish-${Date.now()}`,
      name: name.trim(),
      message: message.trim(),
      createdAt: formattedTime,
    };

    onAddWish(newWish);
    triggerCelebration();
    setSubmittedSuccess(true);
    setName('');
    setMessage('');

    setTimeout(() => {
      setSubmittedSuccess(false);
    }, 4500);
  };

  const handleShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCopyBankAccount = (key: 'groom' | 'bride', accountNumber: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(accountNumber);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const qrCards = [
    {
      key: 'groom' as const,
      badge: 'NHÀ TRAI • CHÚ RỂ',
      accentBg: 'bg-[#1D4ED8]/10 text-[#1E3A8A] border-[#1D4ED8]/25',
      btnBg: 'bg-[#1E293B] hover:bg-[#0F172A] text-white',
      info: data.groomQrGift,
      downloadName: 'QR-Mung-Cuoi-Chu-Re-Cao-Thanh-Long.png',
    },
    {
      key: 'bride' as const,
      badge: 'NHÀ GÁI • CÔ DÂU',
      accentBg: 'bg-[#7C2334]/10 text-[#7C2334] border-[#7C2334]/25',
      btnBg: 'bg-[#7C2334] hover:bg-[#5E1926] text-white',
      info: data.brideQrGift,
      downloadName: 'QR-Mung-Cuoi-Co-Dau-Mai-Thanh-Huyen.png',
    },
  ];

  return (
    <>
      {/* PHẦN 1: BỨC TƯỜNG LỜI CHÚC PHA LÊ 3D & HỘP MỪNG CƯỚI QR ĐÔI GỌN GÀNG, NỔI BẬT */}
      <section
        id="section-wishes"
        className="relative py-24 md:py-32 overflow-hidden flex flex-col items-center justify-center px-4"
      >
        <div className="absolute inset-0 z-0 bg-stone-950">
          <img
            src={data.sectionImages.wishesBg}
            alt="Gửi lời chúc đến cặp đôi"
            className="w-full h-full object-cover object-[center_26%] opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/88" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-amber-300/40 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="font-tall-editorial text-[11px] uppercase tracking-[0.28em] text-amber-200">
                SWEET BLESSINGS • SỔ LƯU BÚT VĨNH CỬU
              </span>
            </div>
            <p className="font-script-luxury text-4xl sm:text-5xl text-amber-200 -mb-1">
              Lời Chúc Trăm Năm
            </p>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white drop-shadow-lg">
              Gửi Lời Chúc Đến Cặp Đôi
            </h2>
          </div>

          {/* LƯỚI 2 CỘT CÂN ĐỐI TUYỆT ĐỐI CHIỀU CAO (items-stretch + lg:h-[570px]) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Cột Trái: Form Gửi Lời Chúc Pha Lê */}
            <div className="lg:col-span-6 flex">
              <form
                onSubmit={handleSubmit}
                className="w-full h-full lg:h-[570px] rounded-[28px] bg-black/55 backdrop-blur-2xl border border-amber-300/45 p-6 sm:p-8 shadow-2xl flex flex-col justify-between text-white"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/15">
                    <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-amber-100">
                      Viết Lời Chúc Phúc
                    </h3>
                    <MessageSquareHeart className="w-6 h-6 text-amber-300" />
                  </div>

                  {/* Tên */}
                  <div>
                    <label className="block font-tall-editorial text-xs uppercase tracking-[0.2em] text-amber-200/90 mb-2">
                      Tên của bạn / Gia đình *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên của bạn..."
                        className="w-full rounded-2xl border border-white/25 bg-white/10 px-4 py-3 pr-10 text-sm text-white placeholder:text-white/45 focus:outline-none focus:border-amber-300"
                      />
                      {name.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setName('')}
                          className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                          aria-label="Xóa tên"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Lời nhắn gửi */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-tall-editorial text-xs uppercase tracking-[0.2em] text-amber-200/90">
                        Lời nhắn gửi *
                      </label>
                      <span className="text-[11px] text-amber-300">Chạm chọn nhanh:</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {QUICK_WISH_TEMPLATES.map((tpl, i) => (
                        <button
                          type="button"
                          key={i}
                          onClick={() => setMessage(tpl)}
                          className="cursor-pointer text-left text-[11px] px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 transition-colors truncate max-w-full"
                        >
                          + {tpl.slice(0, 42)}...
                        </button>
                      ))}
                    </div>

                    <div className="relative">
                      <textarea
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Gửi lời chúc tốt đẹp nhất tới Thành Long & Thanh Huyền..."
                        className="w-full rounded-2xl border border-white/25 bg-white/10 p-4 pr-10 text-sm text-white placeholder:text-white/45 focus:outline-none focus:border-amber-300 resize-none"
                      />
                      {message.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setMessage('')}
                          className="cursor-pointer absolute right-3 top-3 text-white/60 hover:text-white"
                          aria-label="Xóa lời chúc"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Chân Card Trái: Nút Gửi & Thông báo */}
                <div className="pt-3 space-y-2.5">
                  <AnimatePresence>
                    {submittedSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-2.5 rounded-xl bg-emerald-500/25 border border-emerald-400/50 text-center text-xs text-emerald-100"
                      >
                        ✨ Cảm ơn bạn! Lời chúc đã được lưu vĩnh viễn vào Sổ Lưu Bút.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    className="cursor-pointer w-full py-4 px-6 rounded-full bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 text-stone-950 font-bold text-xs sm:text-sm uppercase tracking-[0.22em] flex items-center justify-center gap-2 shadow-xl hover:brightness-110 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi Lời Chúc &amp; Bắn Pháo Hoa 🎆</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Cột Phải: Danh Sách Lời Chúc Pha Lê (Bằng đúng chiều cao lg:h-[570px] của Cột Trái) */}
            <div className="lg:col-span-6 flex">
              <div className="w-full h-full lg:h-[570px] rounded-[28px] bg-black/55 backdrop-blur-2xl border border-amber-300/45 p-6 sm:p-8 shadow-2xl text-white flex flex-col justify-between">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/15 shrink-0">
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-amber-100">
                    Lời Chúc Từ Người Thương ({wishes.length})
                  </h3>
                  <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
                </div>

                <div className="flex-1 overflow-y-auto space-y-3.5 pr-1.5">
                  {wishes.map((w) => (
                    <motion.div
                      key={w.id}
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="rounded-2xl bg-white/10 border border-white/15 p-4 sm:p-4.5"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-serif-luxury text-lg sm:text-xl font-semibold text-amber-200">
                          {w.name}
                        </h4>
                        <span className="text-[11px] text-white/60">{w.createdAt}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-light">
                        “{w.message}”
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-amber-200/80 shrink-0">
                  <span>✨ Mọi lời chúc đều được lưu trữ tự động</span>
                  <span className="font-script-luxury text-xl text-amber-200">
                    Long &amp; Huyền
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              HỘP MỪNG CƯỚI & MÃ QR ĐÔI (CHÚ RỂ & CÔ DÂU) — GỌN GÀNG, SÁNG RÕ, NỔI BẬT
             ========================================================================= */}
          <div id="section-qr-gift" className="mt-16 max-w-3xl mx-auto scroll-mt-24">
            <div className="text-center mb-7">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-300/20 border border-amber-300/50 text-amber-200 text-[11px] uppercase tracking-[0.25em] mb-2">
                <Gift className="w-3.5 h-3.5" />
                <span>WEDDING GIFT • HỘP MỪNG CƯỚI</span>
              </div>
              <h3 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white drop-shadow">
                Mừng Cưới Cô Dâu &amp; Chú Rể
              </h3>
              <p className="font-serif-italic text-sm sm:text-base text-white/80 mt-1">
                Chạm vào mã QR để phóng to hoặc sao chép nhanh số tài khoản
              </p>
            </div>

            {/* 2 Thẻ QR Gọn Gàng, Nổi Bật Cạnh Nhau: Chú Rể Cao Thành Long & Cô Dâu Mai Thanh Huyền */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 items-stretch">
              {qrCards.map((card) => {
                const isCopied = copiedKey === card.key;
                return (
                  <div
                    key={card.key}
                    className="rounded-3xl bg-[#FFFDF9] text-stone-900 border-2 border-amber-300/90 p-5 shadow-[0_22px_55px_rgba(0,0,0,0.55)] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div>
                      {/* Huy hiệu Nhà Trai / Nhà Gái */}
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-tall-editorial tracking-[0.22em] uppercase font-semibold border ${card.accentBg}`}
                        >
                          {card.badge}
                        </span>
                        <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                      </div>

                      {/* Khung ảnh QR gọn gàng, đồng bộ chiều cao */}
                      <div
                        onClick={() => setZoomQrUrl(card.info.qrImageUrl)}
                        className="cursor-pointer group relative mx-auto w-48 h-56 sm:w-52 sm:h-60 rounded-2xl bg-white border border-stone-200 p-2 shadow-inner flex items-center justify-center overflow-hidden"
                        title="Chạm để phóng to mã QR"
                      >
                        <img
                          src={card.info.qrImageUrl}
                          alt={card.info.accountHolder}
                          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Thông tin chủ tài khoản & STK nổi bật */}
                      <div className="mt-3.5 text-center space-y-0.5">
                        <p className="text-[11px] font-medium text-stone-500">
                          {card.info.bankBranch}
                        </p>
                        <h4 className="font-tall-editorial text-lg tracking-[0.12em] font-bold text-stone-900 uppercase">
                          {card.info.accountHolder}
                        </h4>
                        <p className="font-mono text-base sm:text-lg font-bold text-[#7C2334] tracking-wider">
                          {card.info.accountNumber}
                        </p>
                      </div>
                    </div>

                    {/* 2 Nút Thao Tác Gọn Đẹp */}
                    <div className="mt-4 pt-3 border-t border-stone-200/80 grid grid-cols-5 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyBankAccount(card.key, card.info.accountNumber)
                        }
                        className={`cursor-pointer col-span-3 py-2.5 px-3 rounded-xl text-[11px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm ${card.btnBg}`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-300" />
                            <span>Đã Chép STK</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Sao Chép STK</span>
                          </>
                        )}
                      </button>

                      <a
                        href={card.info.qrImageUrl}
                        download={card.downloadName}
                        className="cursor-pointer col-span-2 py-2.5 px-3 rounded-xl border border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1 transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Tải QR</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Phóng To Mã QR Khi Chạm Vào */}
      <AnimatePresence>
        {zoomQrUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomQrUrl(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button
              type="button"
              onClick={() => setZoomQrUrl(null)}
              className="cursor-pointer absolute top-5 right-5 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={zoomQrUrl}
              alt="Mã QR Phóng To"
              className="max-h-[82vh] max-w-[90vw] rounded-2xl bg-white p-4 object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHẦN 2: ĐẠI TIỆC KẾT MÀN & LỜI CẢM ƠN (Ảnh nền: LVT08639.jpg) */}
      <section className="relative min-h-[82vh] w-full overflow-hidden flex flex-col items-center justify-center text-center text-white px-4 py-28">
        <div className="absolute inset-0 z-0 bg-stone-950">
          <img
            src={data.sectionImages.thankYouBg}
            alt="Thank you"
            className="w-full h-full object-cover object-[center_25%] opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/80" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <p className="font-script-luxury text-4xl sm:text-5xl text-amber-200 mb-2">
            Forever &amp; Always
          </p>

          <h2 className="font-serif-luxury text-6xl sm:text-8xl font-normal shimmer-gold-text mb-6 drop-shadow-xl">
            {data.thankYouText.title}
          </h2>

          <p className="font-serif-italic text-base sm:text-xl leading-relaxed text-white/95 max-w-2xl mx-auto mb-10 drop-shadow">
            “{data.thankYouText.message}”
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => {
                triggerCelebration();
              }}
              className="cursor-pointer inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 text-stone-950 font-bold text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-transform"
            >
              <Sparkles className="w-4 h-4" />
              <span>🎆 Bắn Pháo Hoa Chúc Phúc</span>
            </button>

            <button
              type="button"
              onClick={handleShareLink}
              className="cursor-pointer inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/80 bg-black/35 hover:bg-white hover:text-stone-900 text-xs uppercase tracking-[0.2em] transition-all duration-300"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Đã Sao Chép Link Thiệp!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Chia Sẻ Thiệp Cưới</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-14 pt-6 border-t border-white/20 text-xs text-white/80 flex items-center justify-center gap-2">
            <span className="font-script-luxury text-2xl text-amber-200">{data.groom.fullName}</span>
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-bounce" />
            <span className="font-script-luxury text-2xl text-amber-200">{data.bride.fullName}</span>
            <span className="opacity-70 font-tall-editorial tracking-widest">• 28.11.2026</span>
          </div>
        </div>
      </section>
    </>
  );
};
