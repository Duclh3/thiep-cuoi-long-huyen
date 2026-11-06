import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Heart,
  Music,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  Gift,
  LockOpen,
  Lock,
  RotateCcw,
  X,
  Copy,
  Check,
  Download,
  ChevronLeft,
  ChevronRight,
  Send,
  Navigation,
} from 'lucide-react';
import { WeddingData, WishItem } from '../data/weddingData';
import { parseWishItem } from '../utils/wishHelper';

interface BurgundyCallaInvitationProps {
  data: WeddingData;
  wishes: WishItem[];
  onAddWish: (wish: WishItem) => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onStartMusic: () => void;
  guestName?: string;
  onOpenAdmin?: () => void;
}

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

/**
 * Con Dấu Sáp Đỏ Rượu 3D (Burgundy Wine Wax Seal)
 */
const BurgundyWaxSeal: React.FC<{ isOpening?: boolean }> = ({ isOpening }) => (
  <motion.div
    animate={isOpening ? { scale: [1, 1.15, 0.3], opacity: [1, 1, 0] } : { scale: [1, 1.05, 1] }}
    transition={isOpening ? { duration: 0.55 } : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
    className="relative w-15 h-15 sm:w-18 sm:h-18 rounded-full flex items-center justify-center select-none shadow-[0_8px_22px_rgba(70,12,24,0.5)]"
    style={{
      background: 'radial-gradient(circle at 35% 30%, #9B2240 0%, #681427 55%, #3D0713 100%)',
      boxShadow:
        '0 8px 22px rgba(60, 10, 20, 0.5), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -3px 6px rgba(0,0,0,0.6)',
    }}
  >
    <div className="w-[82%] h-[82%] rounded-full border border-[#D98296]/60 shadow-inner flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-[#FEE8ED] drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
        <span className="font-serif-luxury font-bold text-xs sm:text-sm tracking-wider">Đ &amp; H</span>
        <Sparkles className="w-2.5 h-2.5 text-[#FCE79C] mt-0.5" />
      </div>
    </div>
  </motion.div>
);

/**
 * Nhành hoa Calla Lily Đỏ Tím buông dải ren trang trí góc trái phong bì
 */
const CallaLaceDecoration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative pointer-events-none select-none ${className}`}>
    {/* Cành hoa Calla Tím Đỏ */}
    <div className="relative w-20 sm:w-24 h-24 sm:h-28 flex items-center justify-center">
      <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-[0_6px_12px_rgba(0,0,0,0.35)]">
        <defs>
          <linearGradient id="callaPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A82845" />
            <stop offset="60%" stopColor="#661025" />
            <stop offset="100%" stopColor="#3A0512" />
          </linearGradient>
          <linearGradient id="callaStemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6C835A" />
            <stop offset="100%" stopColor="#38492C" />
          </linearGradient>
          <linearGradient id="goldSpadix" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
        {/* Cuống hoa uốn cong mềm mại */}
        <path d="M 45 45 Q 40 85 30 115" stroke="url(#callaStemGrad)" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M 52 48 Q 50 85 42 118" stroke="url(#callaStemGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Nụ hoa Calla vươn cao */}
        <path
          d="M 46 45 C 30 40 25 15 48 8 C 65 5 72 25 58 42 Z"
          fill="url(#callaPetalGrad)"
        />
        {/* Nhụy vàng nhô ra */}
        <path d="M 48 20 Q 49 14 50 10" stroke="url(#goldSpadix)" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Cánh hoa Calla thứ hai */}
        <path
          d="M 32 52 C 20 46 18 28 35 22 C 48 20 52 35 42 50 Z"
          fill="url(#callaPetalGrad)"
          opacity="0.9"
        />
      </svg>
    </div>

    {/* Dải ren tua rua rủ xuống mềm mại */}
    <div className="absolute top-16 left-3 w-10 flex flex-col items-center opacity-85">
      <svg viewBox="0 0 40 80" className="w-full h-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
        <path
          d="M 5 0 Q 8 20 6 40 Q 4 60 8 80 M 15 0 Q 18 25 14 50 Q 12 65 16 80 M 25 0 Q 22 22 26 45 Q 28 65 24 80 M 35 0 Q 32 28 34 55 Q 36 70 33 80"
          stroke="#7A1C32"
          strokeWidth="1.2"
          strokeDasharray="2,3"
          fill="none"
        />
        {/* Hạt ngọc trang trí ở đuôi ren */}
        <circle cx="8" cy="78" r="2" fill="#E6C2CD" />
        <circle cx="16" cy="76" r="2.5" fill="#FFFFFF" />
        <circle cx="24" cy="79" r="2" fill="#E6C2CD" />
        <circle cx="33" cy="77" r="2.5" fill="#FFFFFF" />
      </svg>
    </div>
  </div>
);

/**
 * Khung Oval Ren Hoa & Chuỗi Ngọc Trai Sang Trọng (Mô phỏng 100% video mẫu 2)
 */
const PearlLaceOvalFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[390px] p-5 sm:p-7">
    {/* Vòng chuỗi ngọc trai 3D quấn quanh góc ngoài */}
    <div className="pointer-events-none absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-32 sm:w-40 h-32 sm:h-40 opacity-70">
      <svg viewBox="0 0 140 140" className="w-full h-full">
        <path
          d="M 10 130 C 50 90 90 60 130 10"
          stroke="none"
          id="pearlPath"
        />
        {/* Chuỗi ngọc trai tròn trắng bóng */}
        {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135].map((pos, idx) => (
          <circle
            key={idx}
            cx={20 + idx * 10}
            cy={120 - idx * 9}
            r={idx % 2 === 0 ? 4.5 : 3.5}
            fill="url(#pearl3dGrad)"
            stroke="#D9B8C4"
            strokeWidth="0.5"
            className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
          />
        ))}
        <defs>
          <radialGradient id="pearl3dGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#F9EEF2" />
            <stop offset="85%" stopColor="#DFC3CE" />
            <stop offset="100%" stopColor="#B38D9D" />
          </radialGradient>
        </defs>
      </svg>
    </div>

    {/* Viền ren hoa Oval chính */}
    <div
      className="relative rounded-[50%/42%] p-5 sm:p-7 border-2 border-dashed border-[#C991A5]/60 bg-gradient-to-b from-[#FFFDFC] via-[#FAF4F7] to-[#F7EDF2] shadow-[0_16px_36px_rgba(110,24,46,0.12),inset_0_0_24px_rgba(255,255,255,0.9)]"
      style={{
        boxShadow:
          '0 14px 34px rgba(100, 20, 40, 0.12), inset 0 0 0 6px #FFFFFF, inset 0 0 0 8px rgba(201, 145, 165, 0.35)',
      }}
    >
      {/* Vòng chấm ren hoa văn viền oval */}
      <div className="pointer-events-none absolute inset-2 rounded-[50%/42%] border border-dotted border-[#AA4D6C]/40" />

      {/* Nội dung bên trong khung oval */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {children}
      </div>

      {/* Bông hoa Calla điểm xuyết góc dưới phải của khung oval */}
      <div className="pointer-events-none absolute -bottom-5 -right-3 sm:-bottom-7 sm:-right-4 w-16 sm:w-20 h-20 sm:h-24">
        <svg viewBox="0 0 80 100" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]">
          <path d="M 20 85 Q 40 55 50 25" stroke="#48603A" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path
            d="M 50 25 C 65 20 70 5 52 2 C 38 0 35 15 45 28 Z"
            fill="url(#callaMiniPetal)"
          />
          <path d="M 51 12 Q 52 8 53 5" stroke="#FFE082" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <defs>
            <linearGradient id="callaMiniPetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A82845" />
              <stop offset="70%" stopColor="#661025" />
              <stop offset="100%" stopColor="#350410" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  </div>
);

export const BurgundyCallaInvitation: React.FC<BurgundyCallaInvitationProps> = ({
  data,
  wishes,
  onAddWish,
  isMusicPlaying,
  onToggleMusic,
  onStartMusic,
  guestName,
  onOpenAdmin,
}) => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isBoxUnwrapping, setIsBoxUnwrapping] = useState(false);
  const [isGiftBoxOpen, setIsGiftBoxOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  // Gallery trượt ngang + xem ảnh lớn (giống frame_008 trong video)
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);

  // Form gửi lời chúc
  const [guestInputName, setGuestInputName] = useState(() => getInitialGuestName(guestName));
  const [guestWish, setGuestWish] = useState('');
  const [attendance, setAttendance] = useState('Có, chắc chắn mình sẽ tham dự!');
  const [wishSubmitted, setWishSubmitted] = useState(false);

  useEffect(() => {
    const initial = getInitialGuestName(guestName);
    if (initial) setGuestInputName(initial);
  }, [guestName]);

  const handleOpenEnvelope = () => {
    if (isEnvelopeOpen) return;
    setIsEnvelopeOpen(true);
    onStartMusic();
    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#7D1E3A', '#D4AF37', '#F7D6E0', '#FFFDF9'],
    });
  };

  const handleOpenGiftBox = () => {
    if (isGiftBoxOpen || isBoxUnwrapping) return;
    setIsBoxUnwrapping(true);
    setTimeout(() => {
      setIsGiftBoxOpen(true);
      setIsBoxUnwrapping(false);
    }, 550);
  };

  const handleCopy = (key: string, text: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestInputName.trim() || !guestWish.trim()) return;

    const now = new Date();
    const formattedTime = `${now.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    })} • ${now.toLocaleDateString('vi-VN')}`;

    const newWish: WishItem = {
      id: `wish-${Date.now()}`,
      name: guestInputName.trim(),
      message: guestWish.trim(),
      attendance: attendance,
      createdAt: formattedTime,
    };

    onAddWish(newWish);
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#7D1E3A', '#D4AF37', '#FADCE6'],
    });
    setWishSubmitted(true);
    setGuestWish('');
    setTimeout(() => setWishSubmitted(false), 4000);
  };

  // Danh sách ảnh album của Đức & Hậu
  const galleryPhotos = data.album9Images.map((img) => img.url);

  return (
    <div className="min-h-screen w-full bg-[#240B13] text-[#331B23] flex justify-center items-start overflow-x-hidden md:py-10 md:px-6 relative">
      {/* Background toàn màn hình: Tông hồng tím pastel dịu dàng, sang trọng */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none opacity-30 filter blur-[3px]"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1600&auto=format&fit=crop")',
        }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#240B13]/90 via-[#3B121F]/80 to-[#240B13]/95 pointer-events-none" />

      {/* Nút Admin kín đáo ngoài màn hình khi thiệp chưa mở */}
      {!isEnvelopeOpen && onOpenAdmin && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenAdmin();
          }}
          title="Quản trị"
          className="cursor-pointer fixed top-2.5 left-2.5 z-50 p-2 text-white/30 hover:text-white opacity-30 hover:opacity-100 transition-all rounded-full"
          aria-label="Admin"
        >
          <Lock className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Khung Thiệp Dọc Mobile-First */}
      <div
        className={`w-full max-w-[460px] md:max-w-3xl lg:max-w-4xl bg-[#FAF5F7] shadow-[0_25px_80px_rgba(0,0,0,0.6)] md:rounded-3xl md:border md:border-[#EAD3DC] relative z-10 overflow-hidden transition-all duration-500 ${
          isEnvelopeOpen ? 'pb-12' : 'min-h-[100dvh] md:min-h-[780px] flex flex-col justify-center'
        }`}
      >
        {/* Thanh Tiêu Đề Mảnh Căn Giữa */}
        <div className="sticky top-0 z-40 bg-[#FAF5F7]/95 backdrop-blur-md border-b border-[#EAD3DC] px-4 md:px-8 py-3 flex items-center justify-center text-[#7D1E3A]">
          <span className="font-serif-luxury text-xs sm:text-sm tracking-[0.14em] uppercase font-semibold text-center">
            THIỆP MỜI CƯỚI {data.groom.shortName} &amp; {data.bride.shortName}
          </span>
        </div>

        {/* =====================================================================
            PHẦN 1: PHONG BÌ TƯƠNG TÁC MỞ ĐẦU (BURGUNDY CALLA ENVELOPE)
           ===================================================================== */}
        <section
          className={`relative w-full flex flex-col items-center justify-center transition-all duration-700 px-4 sm:px-6 ${
            isEnvelopeOpen ? 'py-6 border-b border-[#EAD3DC]' : 'py-10 my-auto'
          }`}
        >
          {/* Lời Mời Trang Trọng & Tên Khách */}
          <div className="text-center mb-5 sm:mb-7">
            <p className="font-serif-luxury text-xs sm:text-sm uppercase tracking-[0.22em] text-[#8C3A50] mb-2 font-medium">
              TRÂN TRỌNG KÍNH MỜI
            </p>
            <p className="font-script-luxury text-3xl sm:text-4xl md:text-5xl text-[#7D1E3A]">
              {guestName || 'Bạn & Người Thương'}
            </p>
          </div>

          {/* VỎ PHONG BÌ NHUNG ĐỎ BORDEAUX SANG TRỌNG */}
          <div
            onClick={handleOpenEnvelope}
            className={`relative w-full max-w-[340px] sm:max-w-[380px] h-[210px] sm:h-[240px] rounded-2xl cursor-pointer select-none transition-transform duration-300 ${
              !isEnvelopeOpen ? 'hover:scale-[1.02] shadow-[0_18px_45px_rgba(80,14,30,0.35)]' : 'shadow-md opacity-90'
            }`}
            style={{
              background: 'linear-gradient(145deg, #7A1C32 0%, #581022 55%, #380714 100%)',
            }}
          >
            {/* Nhánh hoa Calla Lily & Dải ren rủ ở góc trái */}
            <CallaLaceDecoration className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 z-20" />

            {/* Khung viền chỉ vàng kim tuyến */}
            <div className="pointer-events-none absolute inset-2.5 rounded-xl border border-[#D9A0B1]/40" />

            {/* Nắp gập hình chữ V viền ren hoa */}
            <div className="pointer-events-none absolute top-0 inset-x-0 h-28 overflow-hidden z-10">
              <svg viewBox="0 0 100 48" className="w-full h-full" preserveAspectRatio="none">
                <polygon
                  points="0,0 100,0 50,44"
                  fill="rgba(90, 16, 35, 0.95)"
                  stroke="#D9A0B1"
                  strokeWidth="0.8"
                  strokeDasharray="2,1"
                />
              </svg>
            </div>

            {/* Con Dấu Sáp Đỏ Rượu ở Tâm Phong Bì */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <BurgundyWaxSeal isOpening={isEnvelopeOpen} />
            </div>

            {/* Bàn tay / Vòng sóng hướng dẫn chạm mở thiệp */}
            {!isEnvelopeOpen && (
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-[#FCE79C]/60 z-20"
              />
            )}
          </div>

          {/* Ngày Cưới Bên Dưới Phong Bì */}
          <div className="text-center mt-4">
            <span className="font-serif-luxury text-sm tracking-[0.2em] text-[#8C3A50]">
              {data.weddingDate.displayDate}
            </span>
            {!isEnvelopeOpen && (
              <motion.p
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="text-xs text-[#7D1E3A] font-serif-italic mt-2 flex items-center justify-center gap-1.5"
              >
                <span>Chạm vào con dấu sáp để mở thiệp</span>
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              </motion.p>
            )}
          </div>
        </section>

        {/* =====================================================================
            PHẦN 2: NỘI DUNG THIỆP CƯỚI CHÍNH KHI ĐÃ MỞ (BURGUNDY CALLA STYLE)
           ===================================================================== */}
        {isEnvelopeOpen && (
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-10 sm:space-y-14"
          >
            {/* HERO ẢNH CƯỚI TRÀN VIỀN + DÒNG CHỮ "WE ARE Getting Married" */}
            <section className="relative w-full aspect-[4/5] sm:aspect-[16/10] overflow-hidden bg-stone-100">
              <img
                src={data.sectionImages.hero}
                alt="Lê Huy Đức & Phan Thị Hậu"
                className="w-full h-full object-cover object-[center_25%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#240B13]/85 via-transparent to-black/25 flex flex-col justify-end p-6 sm:p-10 text-white text-center">
                <p className="font-serif-luxury text-xs sm:text-sm tracking-[0.28em] uppercase text-[#F9DCE4] mb-1">
                  WE ARE
                </p>
                <h2 className="font-script-luxury text-4xl sm:text-6xl text-[#FFE6EE] drop-shadow-md">
                  Getting Married
                </h2>
                <p className="font-serif-luxury text-xs sm:text-sm tracking-[0.16em] text-white/90 mt-2">
                  {data.groom.fullName} &amp; {data.bride.fullName}
                </p>
              </div>
            </section>

            {/* THÔNG TIN HAI BÊN GIA ĐÌNH & KHUNG OVAL REN HOA NGỌC TRAI */}
            <section className="px-4 sm:px-8 space-y-6">
              {/* Hai bên gia đình */}
              <div className="grid grid-cols-2 gap-4 text-center max-w-md mx-auto py-2">
                <div className="space-y-1">
                  <p className="font-serif-luxury font-bold text-xs sm:text-sm tracking-wider text-[#7D1E3A]">
                    NHÀ TRAI
                  </p>
                  <p className="text-xs sm:text-sm text-[#331B23]">Ông. Lê Huy Báu</p>
                  <p className="text-xs sm:text-sm text-[#331B23]">Bà. Nguyễn Thị Nga</p>
                </div>
                <div className="space-y-1">
                  <p className="font-serif-luxury font-bold text-xs sm:text-sm tracking-wider text-[#7D1E3A]">
                    NHÀ GÁI
                  </p>
                  <p className="text-xs sm:text-sm text-[#331B23]">Ông. Phan Văn Hùng</p>
                  <p className="text-xs sm:text-sm text-[#331B23]">Bà. Vũ Thị Mai</p>
                </div>
              </div>

              {/* Lời mời hôn lễ */}
              <div className="text-center">
                <p className="font-serif-luxury text-xs sm:text-sm uppercase tracking-[0.18em] text-[#8C3A50]">
                  TRÂN TRỌNG KÍNH MỜI TỚI DỰ
                </p>
                <p className="font-serif-luxury font-bold text-sm sm:text-base text-[#7D1E3A] tracking-wider mt-0.5">
                  LỄ THÀNH HÔN CỦA GIA ĐÌNH CHÚNG MÌNH
                </p>
              </div>

              {/* KHUNG OVAL REN HOA NGỌC TRAI TINH XẢO */}
              <PearlLaceOvalFrame>
                {/* Tên dâu rể bằng chữ script mềm mại bay bổng */}
                <h3 className="font-script-luxury text-4xl sm:text-5xl text-[#7D1E3A] leading-tight mb-2">
                  Lê Huy Đức
                  <span className="block text-2xl sm:text-3xl font-serif-italic text-[#A84A64] my-0.5">&amp;</span>
                  Phan Thị Hậu
                </h3>

                <p className="font-serif-luxury text-[11px] sm:text-xs uppercase tracking-[0.16em] text-[#8C3A50] mt-1">
                  ĐƯỢC TỔ CHỨC VÀO LÚC
                </p>
                <p className="font-serif-luxury font-bold text-sm sm:text-base text-[#331B23] tracking-wider">
                  11:00, CHỦ NHẬT
                </p>

                {/* Bảng ô lịch Ngày - Tháng - Năm */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 my-3 text-xs sm:text-sm font-serif-luxury text-[#7D1E3A] border-y border-[#C991A5]/40 py-1.5 w-full max-w-[240px]">
                  <span>THÁNG 03</span>
                  <span className="font-bold text-xl sm:text-2xl text-[#7D1E3A] px-2 border-x border-[#C991A5]/50">
                    03
                  </span>
                  <span>NĂM 2024</span>
                </div>

                <p className="text-xs sm:text-sm font-serif-italic text-[#694853] mb-3">
                  (Tức ngày 23 tháng 01 năm Giáp Thìn)
                </p>

                <p className="font-serif-luxury font-bold text-xs sm:text-sm uppercase tracking-wider text-[#7D1E3A]">
                  TẠI TƯ GIA NHÀ TRAI
                </p>
                <p className="text-xs sm:text-sm text-[#331B23] mt-0.5 mb-4">
                  Thôn Phú Xá - Xã Văn Môn - Huyện Yên Phong - Bắc Ninh
                </p>

                {/* Nút Chỉ Đường Google Maps */}
                <a
                  href="https://maps.google.com/?q=V%C4%83n+M%C3%B4n,+Y%C3%AAn+Phong,+B%E1%BA%AFc+Ninh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-[#7D1E3A] text-white text-xs font-serif-luxury uppercase tracking-wider font-semibold shadow-md hover:bg-[#60152B] transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#FADCE6]" />
                  <span>CHỈ ĐƯỜNG</span>
                </a>
              </PearlLaceOvalFrame>
            </section>

            {/* =====================================================================
                PHẦN 3: OUR STORY & 2 POLAROID DÂU RỂ (GIỐNG FRAME 007 & 012)
               ===================================================================== */}
            <section className="px-4 sm:px-8 space-y-6">
              <div className="text-center">
                <h3 className="font-script-luxury text-4xl sm:text-5xl text-[#7D1E3A]">
                  Our story
                </h3>
              </div>

              {/* Lời tự sự tình yêu của Đức & Hậu */}
              <div className="max-w-md mx-auto text-center px-4">
                <p className="font-serif-italic text-xs sm:text-sm leading-relaxed text-[#593944]">
                  Tình yêu của Đức và Hậu là một hành trình kỳ diệu, vượt qua bao thử thách để cùng nhau bước đến ngày trọng đại - đám cưới của chúng mình.
                </p>
                <p className="font-serif-italic text-xs sm:text-sm leading-relaxed text-[#593944] mt-2.5">
                  Đám cưới này là lời cam kết chân thành, là sự bắt đầu của một chương mới - nơi chúng mình cùng vun đắp tổ ấm, cùng sẻ chia mọi vui buồn và cùng nắm tay nhau đi đến cuối con đường mang tên hạnh phúc.
                </p>
              </div>

              {/* 2 TẤM ẢNH POLAROID NGHIÊNG GẮN DẤU SÁP ĐỎ */}
              <div className="relative max-w-sm mx-auto h-[320px] sm:h-[360px] flex items-center justify-center">
                {/* Polaroid Cô Dâu (Nghiêng trái) */}
                <motion.div
                  initial={{ rotate: -8, x: -30, opacity: 0 }}
                  whileInView={{ rotate: -6, x: -35, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="absolute top-2 left-6 sm:left-10 w-40 sm:w-48 bg-white p-2.5 pb-5 rounded shadow-[0_12px_24px_rgba(80,14,30,0.18)] border border-stone-200 z-10"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-stone-100 mb-2">
                    <img
                      src={data.bride.avatar}
                      alt={data.bride.fullName}
                      className="w-full h-full object-cover object-[center_20%]"
                    />
                  </div>
                  <p className="font-script-luxury text-xl text-[#7D1E3A] text-center leading-none">
                    Cô dâu
                  </p>
                  <p className="font-serif-luxury text-[10px] sm:text-xs uppercase tracking-wider text-[#331B23] text-center mt-0.5">
                    {data.bride.fullName}
                  </p>
                </motion.div>

                {/* Polaroid Chú Rể (Nghiêng phải) */}
                <motion.div
                  initial={{ rotate: 8, x: 30, opacity: 0 }}
                  whileInView={{ rotate: 7, x: 35, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="absolute bottom-2 right-6 sm:right-10 w-40 sm:w-48 bg-white p-2.5 pb-5 rounded shadow-[0_12px_24px_rgba(80,14,30,0.18)] border border-stone-200 z-10"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-stone-100 mb-2">
                    <img
                      src={data.groom.avatar}
                      alt={data.groom.fullName}
                      className="w-full h-full object-cover object-[center_20%]"
                    />
                  </div>
                  <p className="font-script-luxury text-xl text-[#7D1E3A] text-center leading-none">
                    Chú rể
                  </p>
                  <p className="font-serif-luxury text-[10px] sm:text-xs uppercase tracking-wider text-[#331B23] text-center mt-0.5">
                    {data.groom.fullName}
                  </p>
                </motion.div>

                {/* Con Dấu Sáp Đỏ Rượu Ghim Nối 2 Bức Ảnh Ở Tâm */}
                <div className="relative z-20 pointer-events-none drop-shadow-md">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9B2240] via-[#681427] to-[#3D0713] border border-[#FADCE6] flex items-center justify-center">
                    <Heart className="w-4 h-4 text-[#FCE79C] fill-current" />
                  </div>
                </div>
              </div>
            </section>

            {/* =====================================================================
                PHẦN 4: ALBUM ẢNH CƯỚI ĐỨC & HẬU (ẢNH LỚN + THUMBNAIL TRƯỢT NGANG GIỐNG FRAME 008)
               ===================================================================== */}
            <section className="px-4 sm:px-8 space-y-4">
              <div className="text-center">
                <p className="font-serif-luxury text-xs uppercase tracking-[0.2em] text-[#8C3A50]">
                  SWEET MEMORIES
                </p>
                <h3 className="font-script-luxury text-4xl sm:text-5xl text-[#7D1E3A]">
                  Album Ảnh Cưới
                </h3>
              </div>

              {/* KHUNG ẢNH LỚN NỔI BẬT */}
              <div
                onClick={() => setLightboxUrl(galleryPhotos[selectedGalleryIdx])}
                className="cursor-zoom-in relative w-full aspect-[4/5] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-stone-100 shadow-[0_16px_36px_rgba(80,14,30,0.15)] border-2 border-white group"
              >
                <img
                  src={galleryPhotos[selectedGalleryIdx]}
                  alt="Ảnh cưới Đức & Hậu"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-1.5 rounded-full bg-black/60 text-white text-xs font-serif-luxury">
                    Chạm để phóng to
                  </span>
                </div>
              </div>

              {/* THANH TRƯỢT THUMBNAIL NGANG BÊN DƯỚI (GIỐNG HỆT FRAME 008) */}
              <div
                ref={thumbnailScrollRef}
                className="flex items-center gap-2.5 overflow-x-auto py-2 px-1 scrollbar-none scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {galleryPhotos.map((photo, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedGalleryIdx(idx)}
                    className={`cursor-pointer shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedGalleryIdx === idx
                        ? 'border-[#7D1E3A] scale-105 shadow-md shadow-[#7D1E3A]/25'
                        : 'border-white opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={photo} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </section>

            {/* =====================================================================
                PHẦN 5: HỘP QUÀ MỪNG CƯỚI (BURGUNDY CALLA STYLE)
               ===================================================================== */}
            <section className="px-4 sm:px-8 space-y-4">
              <div className="text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7D1E3A]/10 text-[#7D1E3A] text-xs font-serif-luxury tracking-wider uppercase mb-1">
                  <Gift className="w-3.5 h-3.5" />
                  <span>MỪNG CƯỚI DÂU RỂ</span>
                </div>

                <h3 className="font-script-luxury text-4xl text-[#7D1E3A] mb-1">
                  Hộp Quà Mừng Cưới
                </h3>
                <p className="text-xs text-[#694853] mb-5">
                  {!isGiftBoxOpen
                    ? 'Chạm vào phong bao bên dưới để mở mã QR mừng cưới'
                    : 'Chạm vào mã QR để phóng to hoặc sao chép số tài khoản'}
                </p>

                <AnimatePresence mode="wait">
                  {!isGiftBoxOpen ? (
                    /* Hộp quà đóng nhỏ gọn */
                    <motion.div
                      key="closed-calla-box"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      onClick={handleOpenGiftBox}
                      className="cursor-pointer relative mx-auto w-full max-w-[240px] sm:max-w-[260px] h-36 sm:h-40 rounded-2xl border border-[#D9A0B1] p-3.5 shadow-lg flex flex-col items-center justify-between overflow-hidden bg-gradient-to-br from-[#7A1C32] via-[#5C1024] to-[#3B0715] group hover:border-[#FCE79C]"
                    >
                      <div className="pointer-events-none absolute inset-1.5 rounded-xl border border-white/20" />
                      <div className="relative z-10 my-auto">
                        <BurgundyWaxSeal />
                      </div>

                      <div className="relative z-10 w-full flex items-center justify-center pt-1">
                        <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF5F7] text-[#7D1E3A] text-xs font-serif-luxury italic whitespace-nowrap shadow-sm group-hover:bg-[#FCE79C] group-hover:text-[#3B0715] transition-colors text-center">
                          <LockOpen className="w-3.5 h-3.5 text-[#7D1E3A] shrink-0" />
                          <span className="whitespace-nowrap font-semibold">Chạm Để Mở Mã QR</span>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    /* Thẻ QR mở ra */
                    <motion.div
                      key="opened-calla-cards"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* QR Chú rể */}
                        <div className="bg-white rounded-2xl p-4 border border-[#EAD3DC] shadow-sm text-center">
                          <p className="font-serif-luxury font-bold text-xs text-[#7D1E3A] mb-1">
                            {data.groomQrGift.roleLabel}
                          </p>
                          <div
                            onClick={() => setLightboxUrl(data.groomQrGift.qrImageUrl)}
                            className="cursor-zoom-in w-36 h-36 mx-auto rounded-xl overflow-hidden border border-stone-200 p-2 bg-stone-50 mb-2.5"
                          >
                            <img
                              src={data.groomQrGift.qrImageUrl}
                              alt="QR Chú rể"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <p className="text-xs font-semibold text-[#331B23]">
                            {data.groomQrGift.accountHolder}
                          </p>
                          <div className="flex items-center justify-center gap-1 text-xs text-[#694853] mt-0.5">
                            <span>STK: {data.groomQrGift.accountNumber}</span>
                            <button
                              type="button"
                              onClick={() => handleCopy('groom', data.groomQrGift.accountNumber)}
                              className="cursor-pointer p-1 text-[#7D1E3A] hover:text-[#60152B]"
                              title="Sao chép STK"
                            >
                              {copiedKey === 'groom' ? (
                                <Check className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                          <p className="text-[11px] text-[#8C3A50] mt-0.5">
                            {data.groomQrGift.bankBranch}
                          </p>
                        </div>

                        {/* QR Cô dâu */}
                        <div className="bg-white rounded-2xl p-4 border border-[#EAD3DC] shadow-sm text-center">
                          <p className="font-serif-luxury font-bold text-xs text-[#7D1E3A] mb-1">
                            {data.brideQrGift.roleLabel}
                          </p>
                          <div
                            onClick={() => setLightboxUrl(data.brideQrGift.qrImageUrl)}
                            className="cursor-zoom-in w-36 h-36 mx-auto rounded-xl overflow-hidden border border-stone-200 p-2 bg-stone-50 mb-2.5"
                          >
                            <img
                              src={data.brideQrGift.qrImageUrl}
                              alt="QR Cô dâu"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <p className="text-xs font-semibold text-[#331B23]">
                            {data.brideQrGift.accountHolder}
                          </p>
                          <div className="flex items-center justify-center gap-1 text-xs text-[#694853] mt-0.5">
                            <span>STK: {data.brideQrGift.accountNumber}</span>
                            <button
                              type="button"
                              onClick={() => handleCopy('bride', data.brideQrGift.accountNumber)}
                              className="cursor-pointer p-1 text-[#7D1E3A] hover:text-[#60152B]"
                              title="Sao chép STK"
                            >
                              {copiedKey === 'bride' ? (
                                <Check className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                          <p className="text-[11px] text-[#8C3A50] mt-0.5">
                            {data.brideQrGift.bankBranch}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsGiftBoxOpen(false)}
                        className="cursor-pointer text-xs text-[#7D1E3A] hover:underline"
                      >
                        Đóng hộp quà mừng
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* =====================================================================
                PHẦN 6: GỬI LỜI CHÚC (YOUR WISHES GIỐNG FRAME 010 TRONG VIDEO)
               ===================================================================== */}
            <section className="px-4 sm:px-8 space-y-6">
              <div className="text-center">
                <h3 className="font-serif-luxury font-bold text-lg sm:text-xl tracking-[0.14em] text-[#7D1E3A] uppercase">
                  YOUR WISHES
                </h3>
                <p className="font-serif-italic text-xs text-[#694853] mt-0.5">
                  Messages from our loved ones
                </p>
              </div>

              {/* Form gửi lời nhắn & xác nhận tham dự */}
              <form
                onSubmit={handleSubmitForm}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EAD3DC] shadow-sm max-w-md mx-auto space-y-3.5"
              >
                <div>
                  <label className="block text-xs font-medium text-[#593944] mb-1">
                    Tên của bạn
                  </label>
                  <input
                    type="text"
                    required
                    value={guestInputName}
                    onChange={(e) => setGuestInputName(e.target.value)}
                    placeholder="Nhập họ và tên của bạn..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-[#7D1E3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#593944] mb-1">
                    Gửi lời nhắn đến cô dâu chú rể
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={guestWish}
                    onChange={(e) => setGuestWish(e.target.value)}
                    placeholder="Viết lời chúc ngọt ngào nhất gửi tặng Đức & Hậu..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-[#7D1E3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#593944] mb-1">
                    Bạn sẽ đến tham dự chung vui chứ?
                  </label>
                  <select
                    value={attendance}
                    onChange={(e) => setAttendance(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-[#7D1E3A] bg-white"
                  >
                    <option value="Có, chắc chắn mình sẽ tham dự!">Có, chắc chắn mình sẽ tham dự!</option>
                    <option value="Rất tiếc, mình bận việc không thể tham dự được">
                      Rất tiếc, mình bận việc không thể tham dự được
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="cursor-pointer w-full py-3 rounded-xl bg-[#7D1E3A] text-white text-xs sm:text-sm font-serif-luxury font-bold uppercase tracking-wider shadow-md hover:bg-[#60152B] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>GỬI LỜI NHẮN &amp; XÁC NHẬN</span>
                </button>

                {wishSubmitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-center text-emerald-700 font-medium"
                  >
                    Cảm ơn bạn thật nhiều! Lời chúc của bạn đã được gửi tới dâu rể.
                  </motion.p>
                )}
              </form>

              {/* Danh sách lời chúc hiển thị công khai (Chỉ tên & lời chúc, không lộ tham dự) */}
              <div className="max-w-md mx-auto space-y-3 pt-2">
                {wishes.slice(0, 8).map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-white/80 border border-[#EAD3DC] text-left shadow-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-serif-luxury font-bold text-xs sm:text-sm text-[#7D1E3A]">
                        {item.name}
                      </p>
                      <Heart className="w-3 h-3 text-[#A82845] fill-current" />
                    </div>
                    <p className="text-xs text-[#331B23] leading-relaxed">{item.message}</p>
                    {item.createdAt && (
                      <p className="text-[10px] text-stone-400 mt-1">{item.createdAt}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* =====================================================================
                PHẦN 7: LỜI CẢM ƠN (THANK YOU)
               ===================================================================== */}
            <section className="px-6 sm:px-12 py-8 text-center bg-gradient-to-b from-transparent via-[#F7EDF1] to-[#F2E1E8] rounded-3xl mx-4 sm:mx-8">
              <h4 className="font-script-luxury text-4xl sm:text-5xl text-[#7D1E3A] mb-2">
                Lời cảm ơn!
              </h4>
              <p className="font-serif-italic text-xs sm:text-sm leading-relaxed text-[#593944] max-w-md mx-auto">
                {data.thankYouText.message}
              </p>
              <p className="font-serif-luxury text-xs tracking-[0.2em] text-[#8C3A50] mt-4 font-semibold uppercase">
                {data.groom.shortName} &amp; {data.bride.shortName}
              </p>
            </section>
          </motion.div>
        )}
      </div>

      {/* Lightbox phóng to ảnh */}
      {lightboxUrl &&
        createPortal(
          <div
            onClick={() => setLightboxUrl(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              type="button"
              onClick={() => setLightboxUrl(null)}
              className="cursor-pointer absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full bg-white/10"
              aria-label="Đóng"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={lightboxUrl}
              alt="Ảnh phóng to"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>,
          document.body
        )}
    </div>
  );
};
