import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XCircle,
  Check,
  Sparkles,
  Send,
  Gift,
  Copy,
  Download,
  X,
  LockOpen,
  RotateCcw,
  Heart,
} from 'lucide-react';
import { StyleId, THEMES, WeddingData, WishItem } from '../data/weddingData';
import { soundEngine } from '../utils/soundEngine';

interface RsvpWishesSectionProps {
  styleId: StyleId;
  data: WeddingData;
  wishes: WishItem[];
  onAddWish: (wish: WishItem) => void;
  guestName?: string;
}

/**
 * Chiếc Nơ Lụa Vàng Kim 3D Nghệ Thuật đặt trên đỉnh Hộp Quà Mừng Cưới
 */
const LuxurySilkBowSVG: React.FC<{ isUnwrapping: boolean; isIndochine: boolean }> = ({
  isUnwrapping,
  isIndochine,
}) => (
  <motion.div
    animate={
      isUnwrapping
        ? { scale: [1, 1.25, 0.2], y: [0, -28, -65], rotate: [0, -10, 18], opacity: [1, 1, 0] }
        : { scale: [1, 1.04, 1], y: [0, -2, 0] }
    }
    transition={
      isUnwrapping
        ? { duration: 0.65, ease: 'easeInOut' }
        : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
    }
    className="relative z-30 w-44 sm:w-52 h-24 sm:h-28 -mb-5 select-none pointer-events-none drop-shadow-[0_14px_20px_rgba(0,0,0,0.55)]"
  >
    <svg viewBox="0 0 240 125" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="goldRibbonMain" x1="0" y1="0" x2="240" y2="125" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF6D1" />
          <stop offset="28%" stopColor="#F3C969" />
          <stop offset="55%" stopColor="#C8962E" />
          <stop offset="80%" stopColor="#F9DF94" />
          <stop offset="100%" stopColor="#9A6D15" />
        </linearGradient>
        <linearGradient id="goldRibbonShadow" x1="40" y1="20" x2="200" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9E7019" />
          <stop offset="50%" stopColor="#6D4B0B" />
          <stop offset="100%" stopColor="#B88728" />
        </linearGradient>
      </defs>

      {/* Hai dải đuôi ruy-băng uốn lượn mềm mại rủ xuống */}
      <path
        d="M112 72C96 92 74 110 48 122L68 123C90 112 106 96 118 78Z"
        fill="url(#goldRibbonMain)"
      />
      <path
        d="M128 72C144 92 166 110 192 122L172 123C150 112 134 96 122 78Z"
        fill="url(#goldRibbonMain)"
      />

      {/* Cánh nơ lụa tầng sau (tạo chiều sâu 3D) */}
      <path
        d="M116 64C82 22 22 26 26 62C30 92 86 84 116 68Z"
        fill="url(#goldRibbonShadow)"
      />
      <path
        d="M124 64C158 22 218 26 214 62C210 92 154 84 124 68Z"
        fill="url(#goldRibbonShadow)"
      />

      {/* Cánh nơ lụa chính bên trái */}
      <path
        d="M116 64C78 14 14 22 20 64C25 98 84 88 116 68Z"
        fill="url(#goldRibbonMain)"
        stroke="#FFF8DC"
        strokeWidth="1.2"
      />
      {/* Đường gân sáng trong cánh nơ trái */}
      <path
        d="M108 63C76 34 38 40 40 63C42 80 80 76 108 66Z"
        fill="#7E5710"
        fillOpacity="0.38"
      />

      {/* Cánh nơ lụa chính bên phải */}
      <path
        d="M124 64C162 14 226 22 220 64C215 98 156 88 124 68Z"
        fill="url(#goldRibbonMain)"
        stroke="#FFF8DC"
        strokeWidth="1.2"
      />
      {/* Đường gân sáng trong cánh nơ phải */}
      <path
        d="M132 63C164 34 202 40 200 63C198 80 160 76 132 66Z"
        fill="#7E5710"
        fillOpacity="0.38"
      />

      {/* Nút thắt kim hoàn ở tâm nơ */}
      <rect
        x="103"
        y="46"
        width="34"
        height="36"
        rx="12"
        fill="url(#goldRibbonMain)"
        stroke="#FFFBEA"
        strokeWidth="1.6"
      />
    </svg>

    {/* Biểu tượng Trái Tim / Song Hỷ đính giữa tâm nơ */}
    <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#7C2334] border border-[#FFF4C8] shadow-md flex items-center justify-center text-[#FDE68A]">
      {isIndochine ? (
        <span className="font-serif-luxury text-xs font-bold leading-none">囍</span>
      ) : (
        <Heart className="w-3.5 h-3.5 fill-current" />
      )}
    </div>
  </motion.div>
);

function getInitialGuestName(propName?: string): string {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const paramName = params.get('guest') || params.get('name') || params.get('u');
    if (paramName && paramName.trim()) {
      return paramName.trim();
    }
  }
  if (propName && propName.trim() && propName !== 'Bạn & Người Thương') {
    return propName.trim();
  }
  return '';
}

export const RsvpWishesSection: React.FC<RsvpWishesSectionProps> = ({
  styleId,
  data,
  wishes,
  onAddWish,
  guestName,
}) => {
  const theme = THEMES[styleId];

  const [name, setName] = useState(() => getInitialGuestName(guestName));
  const [message, setMessage] = useState('');
  const [attendance, setAttendance] = useState('Có, chắc chắn mình sẽ tham dự!');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [copiedKey, setCopiedKey] = useState<'groom' | 'bride' | null>(null);
  const [zoomQrUrl, setZoomQrUrl] = useState<string | null>(null);

  // Tự động điền tên người chúc nếu param link có tên khách
  useEffect(() => {
    const initial = getInitialGuestName(guestName);
    if (initial) {
      setName(initial);
    }
  }, [guestName]);

  // Trạng thái Hộp Quà Mừng Cưới 3D: Mặc định đóng kín, phải mở hộp mới thấy mã QR
  const [isGiftBoxOpen, setIsGiftBoxOpen] = useState(false);
  const [isBoxUnwrapping, setIsBoxUnwrapping] = useState(false);

  const triggerCelebration = () => {
    confetti({
      particleCount: 95,
      spread: 80,
      origin: { y: 0.65 },
      colors: theme.confettiColors,
    });
    window.triggerWeddingFireworks?.(6);
  };

  const handleOpenGiftBox = () => {
    if (isGiftBoxOpen || isBoxUnwrapping) return;
    setIsBoxUnwrapping(true);
    soundEngine.playOpenChime();

    // Bắn pháo giấy ánh kim & pháo hoa chúc mừng khoảnh khắc mở hộp
    confetti({
      particleCount: 110,
      spread: 95,
      origin: { y: 0.7 },
      colors: ['#FFD700', '#FFF6D6', '#F43F5E', '#D4AF37', '#FBBF24'],
    });
    window.triggerWeddingFireworks?.(6);

    setTimeout(() => {
      setIsGiftBoxOpen(true);
      setIsBoxUnwrapping(false);
    }, 620);
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
      message: `${message.trim()} — [${attendance}]`,
      createdAt: formattedTime,
    };

    onAddWish(newWish);
    triggerCelebration();
    setSubmittedSuccess(true);
    setMessage('');

    setTimeout(() => {
      setSubmittedSuccess(false);
    }, 4500);
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
      badge: 'Nhà Trai • Chú Rể',
      scriptTitle: 'Mừng Cưới Chú Rể',
      displayHolder: 'Cao Thành Long',
      accentBg: 'bg-[#1D4ED8]/10 text-[#1E3A8A] border-[#1D4ED8]/25',
      sealBg: 'from-[#1E3A8A] to-[#0F172A]',
      btnBg: 'bg-[#1E293B] hover:bg-[#0F172A] text-white',
      info: data.groomQrGift,
      downloadName: 'QR-Mung-Cuoi-Chu-Re-Cao-Thanh-Long.png',
    },
    {
      key: 'bride' as const,
      badge: 'Nhà Gái • Cô Dâu',
      scriptTitle: 'Mừng Cưới Cô Dâu',
      displayHolder: 'Mai Thanh Huyền',
      accentBg: 'bg-[#7C2334]/10 text-[#7C2334] border-[#7C2334]/25',
      sealBg: 'from-[#881D30] to-[#4C0D19]',
      btnBg: 'bg-[#7C2334] hover:bg-[#5E1926] text-white',
      info: data.brideQrGift,
      downloadName: 'QR-Mung-Cuoi-Co-Dau-Mai-Thanh-Huyen.png',
    },
  ];

  // Màu sắc vỏ hộp quà 3D tùy biến sang trọng theo từng phong cách
  const boxStyleConfig =
    styleId === 'editorial'
      ? {
          lidBg: 'linear-gradient(135deg, #26221E 0%, #141210 55%, #0A0908 100%)',
          bodyBg: 'linear-gradient(160deg, #1F1C18 0%, #12100E 55%, #080706 100%)',
          subtitle: 'Vogue Couture Gift Box',
        }
      : styleId === 'cinematic'
      ? {
          lidBg: 'linear-gradient(135deg, #32213A 0%, #1B1222 55%, #0E0914 100%)',
          bodyBg: 'linear-gradient(160deg, #27192E 0%, #150E1B 55%, #0B070E 100%)',
          subtitle: 'Starlight Treasure Box',
        }
      : styleId === 'indochine'
      ? {
          lidBg: 'linear-gradient(135deg, #8E1622 0%, #630C14 55%, #3E050A 100%)',
          bodyBg: 'linear-gradient(160deg, #7A111B 0%, #520910 55%, #330408 100%)',
          subtitle: 'Bảo Rương Song Hỷ Hoàng Gia',
        }
      : {
          lidBg: 'linear-gradient(135deg, #802436 0%, #5A1523 55%, #380A14 100%)',
          bodyBg: 'linear-gradient(160deg, #6E1C2C 0%, #4A101C 55%, #2C070F 100%)',
          subtitle: 'Hộp Quà Tình Yêu Fine Art',
        };

  return (
    <>
      {/* PHẦN 1: BỨC TƯỜNG LỜI CHÚC PHA LÊ 3D & TUYỆT TÁC HỘP QUÀ MỪNG CƯỚI 3D */}
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

        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-script-luxury text-4xl sm:text-5xl font-normal text-amber-200 drop-shadow-lg">
              Gửi Lời Chúc
            </h2>
          </div>

          {/* FORM GỬI LỜI CHÚC & XÁC NHẬN THAM DỰ GỌN GÀNG, TỐI GIẢN */}
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto rounded-3xl bg-black/50 backdrop-blur-xl border border-amber-300/35 p-5 sm:p-6 shadow-2xl space-y-3 text-white"
          >
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên của bạn là gì?"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 pr-9 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-amber-300"
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

            <div className="relative">
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Gửi lời chúc đến Dâu Rể..."
                className="w-full rounded-xl border border-white/20 bg-white/10 p-3.5 pr-9 text-sm text-white placeholder:text-white/50 focus:outline-none focus:border-amber-300 resize-none"
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

            <div className="relative">
              <select
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-stone-900/90 px-4 py-2.5 text-sm text-amber-100 focus:outline-none focus:border-amber-300"
              >
                <option value="Có, chắc chắn mình sẽ tham dự!">
                  Bạn có tham dự không? — Có, chắc chắn tham dự
                </option>
                <option value="Mình bận mất rồi, xin gửi lời chúc hạnh phúc!">
                  Mình bận mất rồi, xin gửi lời chúc hạnh phúc
                </option>
                <option value="Đang sắp xếp thời gian">Đang sắp xếp thời gian</option>
              </select>
            </div>

            <AnimatePresence>
              {submittedSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-2 rounded-xl bg-emerald-500/25 border border-emerald-400/50 text-center text-xs text-emerald-100"
                >
                  ✨ Cảm ơn bạn! Lời chúc &amp; xác nhận đã được gửi.
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="cursor-pointer w-full py-3 px-5 rounded-full bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 text-stone-950 font-semibold text-xs sm:text-sm tracking-[0.08em] flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all"
            >
              <Send className="w-3.5 h-3.5 shrink-0" />
              <span>Gửi Lời Chúc &amp; Xác Nhận</span>
            </button>

            {/* Danh sách lời chúc gọn nhẹ ngay bên dưới (chỉ hiển thị khi có lời chúc) */}
            {wishes.length > 0 && (
              <div className="pt-3 border-t border-white/15 max-h-56 overflow-y-auto space-y-2.5 pr-1">
                {wishes.map((w) => (
                  <div
                    key={w.id}
                    className="rounded-xl bg-white/10 border border-white/10 px-3.5 py-2.5 text-left"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-serif-luxury italic text-base font-semibold text-amber-200">
                        {w.name}
                      </span>
                      <span className="text-[10px] text-white/50">{w.createdAt}</span>
                    </div>
                    <p className="font-serif-italic text-xs sm:text-sm text-white/90 mt-0.5 leading-relaxed">
                      “{w.message}”
                    </p>
                  </div>
                ))}
              </div>
            )}
          </form>

          {/* =========================================================================
              TUYỆT TÁC HỘP QUÀ MỪNG CƯỚI 3D — PHẢI MỞ HỘP MỚI HIỆN 2 MÃ QR BÊN TRONG
             ========================================================================= */}
          <div id="section-qr-gift" className="mt-20 max-w-4xl mx-auto scroll-mt-24">
            <div className="text-center mb-7">
              <h3 className="font-script-luxury text-4xl sm:text-6xl font-normal text-amber-200 drop-shadow">
                Hộp Quà Mừng Cưới
              </h3>
            </div>

            <AnimatePresence mode="wait">
              {!isGiftBoxOpen ? (
                /* =====================================================================
                   TRẠNG THÁI 1: HỘP QUÀ HỶ SỰ 3D TINH GỌN — CHỈ HƯỚNG DẪN CHẠM ĐỂ MỞ
                   ===================================================================== */
                <motion.div
                  key="closed-3d-gift-box"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 1.08,
                    filter: 'blur(6px)',
                    transition: { duration: 0.4 },
                  }}
                  className="relative flex flex-col items-center justify-center py-4 sm:py-6 select-none"
                >
                  {/* Hào quang ánh kim tỏa sáng phía sau hộp quà */}
                  <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-r from-amber-300/30 via-rose-400/20 to-amber-500/30 blur-3xl animate-pulse" />

                  {/* Các hạt kim tuyến & trái tim bay lơ lửng quanh hộp quà */}
                  {[...Array(6)].map((_, idx) => (
                    <motion.span
                      key={idx}
                      animate={{
                        y: [0, -24 - (idx % 3) * 10, 0],
                        x: [0, (idx % 2 === 0 ? 1 : -1) * (8 + idx * 3), 0],
                        opacity: [0.3, 0.95, 0.3],
                        scale: [0.8, 1.15, 0.8],
                      }}
                      transition={{
                        duration: 2.6 + (idx % 3) * 0.6,
                        repeat: Infinity,
                        delay: idx * 0.25,
                      }}
                      style={{
                        top: `${16 + (idx * 12) % 68}%`,
                        left: `${16 + (idx * 14) % 68}%`,
                      }}
                      className="pointer-events-none absolute text-amber-200 text-sm sm:text-base z-20"
                    >
                      {idx % 2 === 0 ? '✨' : '♥'}
                    </motion.span>
                  ))}

                  {/* KHỐI HỘP QUÀ 3D TƯƠNG TÁC (CHẠM VÀO ĐỂ BUNG NẮP) */}
                  <motion.div
                    onClick={handleOpenGiftBox}
                    whileHover={{ scale: 1.04, y: -4 }}
                    whileTap={{ scale: 0.96 }}
                    animate={
                      isBoxUnwrapping
                        ? {
                            rotate: [0, -3, 3, -4, 4, 0],
                            scale: [1, 1.05, 1.1],
                          }
                        : {
                            y: [0, -7, 0],
                          }
                    }
                    transition={
                      isBoxUnwrapping
                        ? { duration: 0.55 }
                        : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
                    }
                    className="cursor-pointer relative z-20 flex flex-col items-center w-full max-w-[270px] sm:max-w-[310px] group"
                  >
                    {/* Luồng sáng vàng rực rỡ phóng lên khi nắp hộp bật mở */}
                    <AnimatePresence>
                      {isBoxUnwrapping && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.4, y: 30 }}
                          animate={{ opacity: 1, scale: 1.5, y: -30 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.55 }}
                          className="pointer-events-none absolute top-10 inset-x-4 h-40 rounded-full bg-gradient-to-t from-amber-300 via-yellow-100 to-transparent blur-2xl z-20"
                        />
                      )}
                    </AnimatePresence>

                    {/* 1. CHIẾC NƠ LỤA VÀNG KIM 3D TRÊN ĐỈNH */}
                    <LuxurySilkBowSVG
                      isUnwrapping={isBoxUnwrapping}
                      isIndochine={styleId === 'indochine'}
                    />

                    {/* 2. NẮP HỘP QUÀ 3D (BẬT MỞ TUNG LÊN KHI CHẠM) */}
                    <motion.div
                      animate={
                        isBoxUnwrapping
                          ? { y: -70, rotateX: 45, rotateZ: -6, scale: 1.08, opacity: 0 }
                          : { y: 0, rotateX: 0, rotateZ: 0, scale: 1, opacity: 1 }
                      }
                      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
                      style={{ background: boxStyleConfig.lidBg }}
                      className="relative z-20 w-[106%] h-13 sm:h-15 rounded-2xl border-2 border-[#F5D77F] shadow-[0_14px_30px_rgba(0,0,0,0.65)] flex items-center justify-center overflow-hidden"
                    >
                      <div className="pointer-events-none absolute inset-1.5 rounded-xl border border-[#FDE68A]/35" />
                      <div className="pointer-events-none absolute inset-x-0 h-3 bg-gradient-to-r from-[#B88728] via-[#FFF2B2] to-[#B88728] opacity-85" />
                      <div className="pointer-events-none relative z-10 w-10 sm:w-11 h-full bg-gradient-to-r from-[#B88728] via-[#FFF4C2] to-[#B88728] border-x border-white/50 shadow-md" />
                    </motion.div>

                    {/* 3. THÂN HỘP QUÀ 3D TINH TẾ — CHỈ CÓ NƠ VÀNG & NÚT BẤM MỞ */}
                    <div
                      style={{ background: boxStyleConfig.bodyBg }}
                      className="relative z-10 w-full h-48 sm:h-52 rounded-b-[28px] rounded-t-[6px] border-2 border-t-0 border-[#F5D77F] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.85)] flex flex-col items-center justify-center overflow-hidden"
                    >
                      {/* Khung viền hoa văn góc hộp */}
                      <div className="pointer-events-none absolute inset-2.5 rounded-[20px] border border-[#FDE68A]/35" />
                      <span className="pointer-events-none absolute top-3.5 left-3.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#FDE68A]/80" />
                      <span className="pointer-events-none absolute top-3.5 right-3.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#FDE68A]/80" />
                      <span className="pointer-events-none absolute bottom-3.5 left-3.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#FDE68A]/80" />
                      <span className="pointer-events-none absolute bottom-3.5 right-3.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#FDE68A]/80" />

                      {/* Dải ruy-băng lụa vàng chạy dọc & ngang thân hộp */}
                      <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 sm:w-11 bg-gradient-to-r from-[#A6781E] via-[#FFF4C2] to-[#A6781E] border-x border-white/40 opacity-95 shadow-lg" />
                      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-9 sm:h-10 bg-gradient-to-b from-[#A6781E] via-[#FFF4C2] to-[#A6781E] border-y border-white/40 opacity-95 shadow-md" />

                      {/* Khóa Tròn Kim Hoàn & Nút Hướng Dẫn Chạm Mở Hộp ở Tâm */}
                      <div className="relative z-20 flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FFF6D1] via-[#E5B85B] to-[#9A6D15] p-1 shadow-[0_10px_25px_rgba(0,0,0,0.6)] border-2 border-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <div className="w-full h-full rounded-full bg-[#631523] flex items-center justify-center text-[#FDE68A]">
                            <Gift className="w-6 h-6 animate-bounce" />
                          </div>
                        </div>

                        <div className="px-5 py-2.5 rounded-full bg-[#FFFDF8] text-[#631523] border-2 border-[#D4AF37] shadow-[0_10px_25px_rgba(0,0,0,0.55)] inline-flex items-center gap-2 font-serif-luxury italic font-bold text-sm sm:text-base whitespace-nowrap group-hover:bg-amber-50 transition-colors">
                          <LockOpen className="w-4 h-4 text-[#B88728] shrink-0" />
                          <span>Chạm Để Mở Hộp Quà</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                /* =====================================================================
                   TRẠNG THÁI 2: HỘP QUÀ ĐÃ MỞ — 2 PHONG BAO MÃ QR TRỒI LÊN RỰC RỠ
                   ===================================================================== */
                <motion.div
                  key="opened-3d-qr-cards"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Thanh trạng thái Nắp Hộp Đã Mở + Nút Đóng Hộp Lại (Căn giữa) */}
                  <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center text-center gap-2.5 px-5 py-3.5 rounded-2xl bg-black/50 backdrop-blur-xl border border-amber-300/45 text-amber-100 shadow-xl"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-amber-300/20 border border-amber-300/50 flex items-center justify-center text-amber-300 shrink-0">
                        <Gift className="w-3.5 h-3.5" />
                      </span>
                      <span className="font-serif-italic text-sm sm:text-base text-amber-100">
                        Hộp quà mừng cưới đã mở — Chọn Nhà Trai hoặc Nhà Gái bên dưới
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsGiftBoxOpen(false)}
                      className="cursor-pointer inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-amber-300/45 text-xs font-serif-italic text-amber-200 transition-colors mx-auto"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Đóng Hộp Quà Lại</span>
                    </button>
                  </motion.div>

                  {/* 2 Phong Bao / Thẻ QR Mừng Cưới Trồi Lên Từ Trong Hộp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 items-stretch">
                    {qrCards.map((card, idx) => {
                      const isCopied = copiedKey === card.key;
                      return (
                        <motion.div
                          key={card.key}
                          initial={{ opacity: 0, y: 75, scale: 0.84, rotateX: 22 }}
                          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                          transition={{
                            type: 'spring',
                            stiffness: 110,
                            damping: 15,
                            delay: idx * 0.12,
                          }}
                          className="relative rounded-[28px] bg-[#FFFDF9] text-stone-900 border-2 border-[#D4AF37] p-5 sm:p-6 shadow-[0_25px_65px_rgba(0,0,0,0.65)] flex flex-col justify-between overflow-hidden"
                        >
                          {/* Viền hoa văn mạ vàng mảnh bên trong phong bao */}
                          <div className="pointer-events-none absolute inset-2 rounded-[22px] border border-[#D4AF37]/40" />

                          {/* Nắp phong bao lụa trang trí ở đỉnh thẻ */}
                          <div
                            className={`mx-auto -mt-5 mb-3 px-5 py-1 rounded-b-2xl bg-gradient-to-r ${card.sealBg} text-[#FDE68A] border-x border-b border-[#D4AF37] shadow-md flex items-center gap-1.5`}
                          >
                            <Sparkles className="w-3 h-3" />
                            <span className="font-tall-editorial text-[11px] tracking-[0.16em]">
                              {card.badge}
                            </span>
                            <Sparkles className="w-3 h-3" />
                          </div>

                          <div className="relative z-10">
                            <p className="font-script-luxury text-3xl sm:text-4xl text-center text-[#7C2334] mb-2">
                              {card.scriptTitle}
                            </p>

                            {/* Khung ảnh QR sang trọng — Chạm để phóng to */}
                            <div
                              onClick={() => setZoomQrUrl(card.info.qrImageUrl)}
                              className="cursor-pointer group relative mx-auto w-48 h-56 sm:w-52 sm:h-60 rounded-2xl bg-white border-2 border-[#E5D5B5] p-2.5 shadow-inner flex items-center justify-center overflow-hidden"
                              title="Chạm để phóng to mã QR"
                            >
                              <img
                                src={card.info.qrImageUrl}
                                alt={card.info.accountHolder}
                                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                              />
                              <span className="absolute bottom-1.5 inset-x-2 text-center text-[10px] font-serif-italic text-stone-500 bg-white/90 rounded-full py-0.5">
                                Chạm vào mã QR để phóng to
                              </span>
                            </div>

                            {/* Thông tin chủ tài khoản & STK mềm mại, rõ nét */}
                            <div className="mt-4 text-center space-y-0.5">
                              <p className="font-serif-italic text-xs sm:text-sm text-stone-600">
                                {card.info.bankBranch}
                              </p>
                              <h4 className="font-serif-luxury italic text-2xl sm:text-3xl font-semibold text-stone-900">
                                {card.displayHolder}
                              </h4>
                              <p className="font-tall-editorial text-xs tracking-[0.18em] text-stone-500">
                                ({card.info.accountHolder})
                              </p>
                              <p className="font-serif-luxury text-lg sm:text-xl font-bold text-[#7C2334] tracking-wider pt-0.5">
                                STK: {card.info.accountNumber}
                              </p>
                            </div>
                          </div>

                          {/* 2 Nút Thao Tác Gọn Đẹp */}
                          <div className="relative z-10 mt-4 pt-3 border-t border-stone-200/80 grid grid-cols-5 gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleCopyBankAccount(card.key, card.info.accountNumber)
                              }
                              className={`cursor-pointer col-span-3 py-2.5 px-2.5 sm:px-3 rounded-xl text-xs font-serif-italic tracking-wide font-semibold flex items-center justify-center gap-1.5 whitespace-nowrap transition-all shadow-sm ${card.btnBg}`}
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                                  <span className="whitespace-nowrap">Đã Chép STK</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5 shrink-0" />
                                  <span className="whitespace-nowrap">Sao Chép STK</span>
                                </>
                              )}
                            </button>

                            <a
                              href={card.info.qrImageUrl}
                              download={card.downloadName}
                              className="cursor-pointer col-span-2 py-2.5 px-2.5 sm:px-3 rounded-xl border border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-serif-italic tracking-wide font-semibold flex items-center justify-center gap-1 whitespace-nowrap transition-all"
                            >
                              <Download className="w-3.5 h-3.5 shrink-0" />
                              <span className="whitespace-nowrap">Tải QR</span>
                            </a>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox Phóng To Mã QR Khi Chạm Vào — Render qua Portal để luôn phủ toàn màn hình điện thoại */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {zoomQrUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setZoomQrUrl(null)}
                className="fixed inset-0 z-[100] w-screen h-[100dvh] bg-black/92 backdrop-blur-xl flex flex-col items-center justify-center p-4"
              >
                <div className="w-full max-w-sm flex items-center justify-between mb-3">
                  <span className="font-script-luxury text-2xl text-amber-200">
                    Mã QR Mừng Cưới
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoomQrUrl(null)}
                    className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/15 hover:bg-white/30 border border-white/25 text-white text-xs font-serif-italic"
                    aria-label="Đóng"
                  >
                    <X className="w-4 h-4" />
                    <span>Đóng</span>
                  </button>
                </div>
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  src={zoomQrUrl}
                  alt="Mã QR Phóng To"
                  className="max-h-[75dvh] max-w-[88vw] rounded-2xl bg-white p-4 object-contain shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
                <p className="mt-3 text-xs font-serif-italic text-white/75">
                  Chạm vào nền tối hoặc nút Đóng để quay lại
                </p>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* PHẦN 2: ĐẠI TIỆC KẾT MÀN & LỜI CẢM ƠN (Đặt chữ ở phía trên vùng rèm để không che cô dâu chú rể) */}
      <section className="relative min-h-[82vh] w-full overflow-hidden flex flex-col items-center justify-start text-center text-white px-4 pt-8 sm:pt-12 pb-64">
        <div className="absolute inset-0 z-0 bg-stone-950">
          <img
            src={data.sectionImages.thankYouBg}
            alt="Thank you"
            className="w-full h-full object-cover object-[center_68%] opacity-95"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-black/55" />
        </div>

        <div className="relative z-10 w-full max-w-2xl mx-auto px-2 sm:px-4">
          <h2 className="font-script-luxury text-5xl sm:text-7xl font-normal shimmer-gold-text mb-2 sm:mb-3 drop-shadow-xl">
            {data.thankYouText.title}
          </h2>

          <p className="font-serif-italic text-xs sm:text-lg leading-relaxed text-white/95 max-w-xl mx-auto px-1 drop-shadow">
            “{data.thankYouText.message}”
          </p>
        </div>
      </section>
    </>
  );
};
