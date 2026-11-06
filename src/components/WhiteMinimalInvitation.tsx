import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  MapPin,
  Music,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  Copy,
  Download,
  Gift,
  LockOpen,
  Lock,
  RotateCcw,
  X,
  Heart,
} from 'lucide-react';
import { WeddingData, WishItem } from '../data/weddingData';
import { soundEngine } from '../utils/soundEngine';
import { parseWishItem } from '../utils/wishHelper';

interface WhiteMinimalInvitationProps {
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

const assetUrl = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

/**
 * Ảnh Bó Hoa Rum Đỏ Rượu & Hồng Trắng & Cẩm Tú Cầu Xanh Thật (Tách nền + viền sticker trắng giống hệt video mẫu)
 */
const MinimalCallaBouquetImg: React.FC<{
  className?: string;
  flipX?: boolean;
  flipY?: boolean;
}> = ({ className = '', flipX = false, flipY = false }) => {
  const scaleTransform = `${flipX ? 'scale-x-[-1]' : ''} ${flipY ? 'scale-y-[-1]' : ''}`.trim();
  return (
    <img
      src={assetUrl('/images/minimal-calla-bouquet.png')}
      alt="Hoa cưới trang trí"
      draggable={false}
      className={`pointer-events-none select-none object-contain drop-shadow-[0_0_2px_#ffffff] drop-shadow-[0_6px_14px_rgba(43,37,35,0.16)] ${scaleTransform} ${className}`}
    />
  );
};

/**
 * Ảnh 2 Cành Hoa Rum Đỏ Rượu Dáng Dài Nằm Nghiêng Dưới Ảnh Cô Dâu (Giống hệt giây 00:13 trong video)
 */
const DiagonalCallaStemsImg: React.FC<{ className?: string; flipX?: boolean }> = ({
  className = '',
  flipX = false,
}) => (
  <img
    src={assetUrl('/images/minimal-calla-stems.png')}
    alt="Cành hoa Rum đỏ rượu"
    draggable={false}
    className={`pointer-events-none select-none object-contain drop-shadow-[0_0_2px_#ffffff] drop-shadow-[0_5px_12px_rgba(43,37,35,0.15)] ${
      flipX ? 'scale-x-[-1]' : ''
    } ${className}`}
  />
);

/**
 * Con dấu sáp đỏ rượu in nổi cánh bướm vàng 3D ở tâm phong bì
 */
const MinimalButterflyWaxSeal: React.FC = () => (
  <div
    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-[0_6px_16px_rgba(46,7,14,0.38)] select-none"
    style={{
      background: 'radial-gradient(circle at 32% 28%, #6D2331 0%, #4A141F 58%, #2B0910 100%)',
      boxShadow:
        '0 6px 16px rgba(45, 10, 18, 0.38), inset 0 2px 3px rgba(255,255,255,0.22), inset 0 -3px 6px rgba(0,0,0,0.55)',
    }}
  >
    <div className="w-[82%] h-[82%] rounded-full border border-[#8E3B4B]/70 flex items-center justify-center">
      <svg viewBox="0 0 64 64" className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
        <defs>
          <linearGradient id="minGoldButterfly" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FCE79C" />
            <stop offset="0.45" stopColor="#D4AF37" />
            <stop offset="0.8" stopColor="#9E7618" />
            <stop offset="1" stopColor="#F7DF8B" />
          </linearGradient>
        </defs>
        <path
          d="M30 31C23 19 10 14 8 23C6 30 14 36 25 36C15 39 11 47 16 51C21 55 28 48 31 39L32 35L33 39C36 48 43 55 48 51C53 47 49 39 39 36C50 36 58 30 56 23C54 14 41 19 34 31L32 33L30 31Z"
          fill="url(#minGoldButterfly)"
        />
      </svg>
    </div>
  </div>
);

/**
 * Chiếc Nơ Lụa Vàng Kim 3D Nghệ Thuật đặt trên đỉnh Hộp Quà Mừng Cưới
 */
const MinimalSilkBow3D: React.FC<{ isUnwrapping: boolean }> = ({ isUnwrapping }) => (
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
    className="relative z-30 w-40 sm:w-44 h-22 sm:h-24 -mb-4 select-none pointer-events-none drop-shadow-[0_12px_18px_rgba(0,0,0,0.45)]"
  >
    <svg viewBox="0 0 240 125" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="minGoldRibbonMain" x1="0" y1="0" x2="240" y2="125" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF6D1" />
          <stop offset="28%" stopColor="#F3C969" />
          <stop offset="55%" stopColor="#C8962E" />
          <stop offset="80%" stopColor="#F9DF94" />
          <stop offset="100%" stopColor="#9A6D15" />
        </linearGradient>
        <linearGradient id="minGoldRibbonShadow" x1="40" y1="20" x2="200" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9E7019" />
          <stop offset="50%" stopColor="#6D4B0B" />
          <stop offset="100%" stopColor="#B88728" />
        </linearGradient>
      </defs>
      <path d="M112 72C96 92 74 110 48 122L68 123C90 112 106 96 118 78Z" fill="url(#minGoldRibbonMain)" />
      <path d="M128 72C144 92 166 110 192 122L172 123C150 112 134 96 122 78Z" fill="url(#minGoldRibbonMain)" />
      <path d="M116 64C82 22 22 26 26 62C30 92 86 84 116 68Z" fill="url(#minGoldRibbonShadow)" />
      <path d="M124 64C158 22 218 26 214 62C210 92 154 84 124 68Z" fill="url(#minGoldRibbonShadow)" />
      <path
        d="M116 64C78 14 14 22 20 64C25 98 84 88 116 68Z"
        fill="url(#minGoldRibbonMain)"
        stroke="#FFF8DC"
        strokeWidth="1.2"
      />
      <path d="M108 63C76 34 38 40 40 63C42 80 80 76 108 66Z" fill="#7E5710" fillOpacity="0.38" />
      <path
        d="M124 64C162 14 226 22 220 64C215 98 156 88 124 68Z"
        fill="url(#minGoldRibbonMain)"
        stroke="#FFF8DC"
        strokeWidth="1.2"
      />
      <path d="M132 63C164 34 202 40 200 63C198 80 160 76 132 66Z" fill="#7E5710" fillOpacity="0.38" />
      <rect
        x="103"
        y="46"
        width="34"
        height="36"
        rx="12"
        fill="url(#minGoldRibbonMain)"
        stroke="#FFFBEA"
        strokeWidth="1.6"
      />
    </svg>
    <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#5A1523] border border-[#FFF4C8] shadow-md flex items-center justify-center text-[#FDE68A]">
      <Heart className="w-3 h-3 fill-current" />
    </div>
  </motion.div>
);

export const WhiteMinimalInvitation: React.FC<WhiteMinimalInvitationProps> = ({
  data,
  wishes,
  onAddWish,
  isMusicPlaying,
  onToggleMusic,
  onStartMusic,
  guestName,
  onOpenAdmin,
}) => {
  // Trạng thái mở thiệp: Phải nhấp vào phong bì mới mở khóa toàn bộ nội dung thiệp bên dưới
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  // Đồng hồ đếm ngược tới ngày cưới 28/11/2026
  const calculateTimeLeft = () => {
    const target = new Date(data.weddingDate.isoDate).getTime();
    const now = new Date().getTime();
    const diff = Math.max(0, target - now);
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [data.weddingDate.isoDate]);

  // Form gửi lời chúc & xác nhận tham dự (tự động điền tên từ param link)
  const [guestInputName, setGuestInputName] = useState(() => getInitialGuestName(guestName));
  const [guestWish, setGuestWish] = useState('');
  const [attendance, setAttendance] = useState('Có, chắc chắn mình sẽ tham dự!');
  const [wishSubmitted, setWishSubmitted] = useState(false);

  useEffect(() => {
    const initial = getInitialGuestName(guestName);
    if (initial) {
      setGuestInputName(initial);
    }
  }, [guestName]);

  // Hộp quà mừng cưới 3D (Hiển thị sẵn phần hộp quà, ấn vào hộp mới mở ra 2 mã QR)
  const [isGiftBoxOpen, setIsGiftBoxOpen] = useState(false);
  const [isBoxUnwrapping, setIsBoxUnwrapping] = useState(false);
  const [copiedKey, setCopiedKey] = useState<'groom' | 'bride' | null>(null);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const handleOpenEnvelope = () => {
    if (!isEnvelopeOpen) {
      soundEngine.playOpenChime();
      onStartMusic();
      setIsEnvelopeOpen(true);
    }
  };

  const handleOpenGiftBox = () => {
    if (isGiftBoxOpen || isBoxUnwrapping) return;
    setIsBoxUnwrapping(true);
    soundEngine.playOpenChime();
    confetti({
      particleCount: 105,
      spread: 90,
      origin: { y: 0.7 },
      colors: ['#5A1824', '#D4AF37', '#F4ACB7', '#FFF8F0'],
    });
    setTimeout(() => {
      setIsGiftBoxOpen(true);
      setIsBoxUnwrapping(false);
    }, 600);
  };

  const handleScrollToGiftBox = () => {
    const el = document.getElementById('section-qr-gift');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleCopyBank = (key: 'groom' | 'bride', accountNumber: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(accountNumber);
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
      particleCount: 80,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#5A1824', '#D4AF37', '#F4ACB7'],
    });
    setWishSubmitted(true);
    setGuestWish('');
    setTimeout(() => setWishSubmitted(false), 4000);
  };

  // Danh sách 4 sự kiện (Bữa cơm thân mật & Lễ Vu Quy / Thành Hôn) hiển thị theo đúng mẫu thẻ trong video
  const minimalEvents = [
    {
      id: 'min-tiec-trai',
      title: 'BỮA CƠM THÂN MẬT (NHÀ TRAI)',
      subTime: 'ĐƯỢC TỔ CHỨC VÀO LÚC 16:30 - THỨ SÁU',
      dateSolar: '27.11.2026',
      dateLunar: '(TỨC NGÀY 19 THÁNG 10 NĂM BÍNH NGỌ)',
      venueScript: 'Tại Tư Gia Nhà Trai',
      addressUpper: 'THÔN AN BÌNH - XÃ VIỆT TIẾN - TỈNH HƯNG YÊN',
      mapUrl: data.partyEvents[0]?.mapUrl || 'https://maps.app.goo.gl/WDerErbiJRg7TZNJ6?g_st=ic',
    },
    {
      id: 'min-tiec-gai',
      title: 'BỮA CƠM THÂN MẬT (NHÀ GÁI)',
      subTime: 'ĐƯỢC TỔ CHỨC VÀO LÚC 17:00 - THỨ SÁU',
      dateSolar: '27.11.2026',
      dateLunar: '(TỨC NGÀY 19 THÁNG 10 NĂM BÍNH NGỌ)',
      venueScript: 'Tại Tư Gia Nhà Gái',
      addressUpper: 'XÓM 16, THÔN BÃI SẬY 2 - XÃ TRIỆU VIỆT VƯƠNG - TỈNH HƯNG YÊN',
      mapUrl: data.partyEvents[1]?.mapUrl || 'https://maps.app.goo.gl/jdfuUia47BASgpRA9?g_st=ic',
    },
    {
      id: 'min-vu-quy',
      title: 'LỄ VU QUY',
      subTime: 'ĐƯỢC TỔ CHỨC VÀO LÚC 11:15 - THỨ BẢY',
      dateSolar: '28.11.2026',
      dateLunar: '(TỨC NGÀY 20 THÁNG 10 NĂM BÍNH NGỌ)',
      venueScript: 'Tại Tư Gia Nhà Gái',
      addressUpper: 'XÓM 16, THÔN BÃI SẬY 2 - XÃ TRIỆU VIỆT VƯƠNG - TỈNH HƯNG YÊN',
      mapUrl: data.ceremonySection.items[0]?.mapUrl || 'https://maps.app.goo.gl/jdfuUia47BASgpRA9?g_st=ic',
    },
    {
      id: 'min-thanh-hon',
      title: 'LỄ THÀNH HÔN',
      subTime: 'ĐƯỢC TỔ CHỨC VÀO LÚC 13:05 - THỨ BẢY',
      dateSolar: '28.11.2026',
      dateLunar: '(TỨC NGÀY 20 THÁNG 10 NĂM BÍNH NGỌ)',
      venueScript: 'Tại Tư Gia Nhà Trai',
      addressUpper: 'THÔN AN BÌNH - XÃ VIỆT TIẾN - TỈNH HƯNG YÊN',
      mapUrl: data.ceremonySection.items[1]?.mapUrl || 'https://maps.app.goo.gl/WDerErbiJRg7TZNJ6?g_st=ic',
    },
  ];

  // Danh sách 8 ảnh cưới xếp lưới 2 cột so le giống hệt phần Album Hình Cưới trong video
  const galleryPhotos = [
    data.album9Images[0]?.url || data.sectionImages.hero,
    data.album9Images[1]?.url || data.sectionImages.heroLeftFloat,
    data.album9Images[2]?.url || data.sectionImages.heroRightFloat,
    data.album9Images[4]?.url || data.sectionImages.kissPhoto,
    data.album9Images[5]?.url || data.carousel3DImages[2]?.url,
    data.album9Images[6]?.url || data.carousel3DImages[3]?.url,
    data.album9Images[7]?.url || data.carousel3DImages[4]?.url,
    data.album9Images[8]?.url || data.carousel3DImages[5]?.url,
  ].filter(Boolean);

  const handleStepLightbox = (dir: -1 | 1, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxUrl || galleryPhotos.length === 0) return;
    const idx = galleryPhotos.indexOf(lightboxUrl);
    const nextIdx = (idx + dir + galleryPhotos.length) % galleryPhotos.length;
    setLightboxUrl(galleryPhotos[nextIdx]);
  };

  // Lịch tháng 11/2026: Ngày 1/11/2026 là Chủ Nhật (6 ô trống đầu từ Thứ 2 -> Thứ 7)
  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const emptyLeading = 6;
  const totalDays = 30;

  return (
    <div className="min-h-screen w-full bg-[#EFECE6] text-[#2B2523] flex justify-center items-start overflow-x-hidden md:py-10 md:px-6">
      {/* Nút Admin kín đáo ngoài màn hình chưa mở thiệp */}
      {!isEnvelopeOpen && onOpenAdmin && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenAdmin();
          }}
          title="Quản trị"
          className="cursor-pointer fixed top-3 left-3 z-50 p-2 text-stone-500/25 hover:text-stone-800 opacity-25 hover:opacity-100 transition-all rounded-full"
          aria-label="Admin Login"
        >
          <Lock className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Khung Thiệp Dọc Chuẩn Mobile-First, Tối Ưu Hiển Thị Sang Trọng Cả Trên Màn Hình Máy Tính */}
      <div
        className={`w-full max-w-[460px] md:max-w-3xl lg:max-w-4xl bg-[#FAF8F5] shadow-[0_0_60px_rgba(0,0,0,0.09)] md:shadow-[0_25px_80px_rgba(43,37,35,0.16)] md:rounded-3xl md:border md:border-[#E5DDD2] relative overflow-hidden transition-all duration-500 ${
          isEnvelopeOpen ? 'pb-10' : 'min-h-[100dvh] md:min-h-[780px] flex flex-col justify-center'
        }`}
      >
        {/* Thanh Tiêu Đề Mảnh Trên Đỉnh Căn Giữa Tối Giản */}
        <div className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 px-4 md:px-8 py-3 flex items-center justify-center text-[#2B2523]">
          <span className="font-condensed-minimal text-xs sm:text-sm md:text-base tracking-[0.12em] uppercase font-normal truncate px-2 text-center">
            THIỆP MỜI CƯỚI {data.groom.shortName} &amp; {data.bride.shortName}
          </span>
        </div>

        {/* =====================================================================
            PHẦN 1: PHONG BÌ TƯƠNG TÁC MỞ ĐẦU (00:00 -> 00:05)
            - Khi chưa mở (!isEnvelopeOpen): Chiếm trọn màn hình đầu tiên, khóa nội dung bên dưới.
            - Khi ấn mở (isEnvelopeOpen): Mở nắp phong bì, đẩy 2 ảnh Polaroid lên và mở khóa toàn bộ thiệp!
           ===================================================================== */}
        <section
          className={`px-5 md:px-10 flex flex-col items-center text-center relative transition-all duration-700 ${
            isEnvelopeOpen
              ? 'pt-10 md:pt-14 pb-8'
              : 'flex-1 min-h-[calc(100dvh-52px)] md:min-h-[720px] justify-center py-8'
          }`}
        >
          {/* Dòng chữ tay phía trên phong bì: "Nhấp để mở" -> đổi thành "Save our date!" khi mở */}
          <AnimatePresence mode="wait">
            <motion.p
              key={isEnvelopeOpen ? 'save-date' : 'tap-open'}
              initial={{ opacity: 0, y: 6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: isEnvelopeOpen ? 1 : [1, 1.04, 1],
              }}
              exit={{ opacity: 0, y: -6 }}
              transition={{
                duration: 0.35,
                scale: { duration: 2.2, repeat: isEnvelopeOpen ? 0 : Infinity, ease: 'easeInOut' },
              }}
              onClick={handleOpenEnvelope}
              className="cursor-pointer font-handwritten-minimal text-3xl sm:text-4xl md:text-5xl text-[#3A302C] mb-12 md:mb-16 select-none"
            >
              {isEnvelopeOpen ? 'Save our date!' : 'Nhấp để mở'}
            </motion.p>
          </AnimatePresence>

          {/* Khối Phong Bì Trắng Kem + Ảnh Hoa Rum Thật Ở 2 Viền Góc + Con Dấu Sáp Bướm Vàng */}
          <div
            onClick={handleOpenEnvelope}
            className="cursor-pointer relative w-[286px] sm:w-[320px] h-[192px] sm:h-[212px] my-2 md:my-6 md:scale-115 transform origin-center select-none group"
            style={{ perspective: '1200px' }}
          >
            {/* ẢNH HOA VIỀN CẠNH TRÁI TRÊN PHONG BÌ (Giống hệt giây 00:00 & 00:04 trong video) */}
            <MinimalCallaBouquetImg className="absolute -top-16 -left-9 w-28 sm:w-32 z-30 -rotate-6" />

            {/* ẢNH HOA VIỀN CẠNH PHẢI DƯỚI PHONG BÌ (Giống hệt giây 00:00 & 00:04 trong video) */}
            <MinimalCallaBouquetImg
              flipX
              className="absolute -bottom-16 -right-8 w-32 sm:w-36 z-30 rotate-6"
            />

            {/* Nền mặt trong phong bì */}
            <div
              className="absolute inset-0 rounded-[4px] shadow-[0_18px_40px_rgba(68,48,32,0.13)] border border-[#E6DFD5]"
              style={{ background: 'linear-gradient(180deg, #EFE9E0 0%, #E7DFD3 100%)' }}
            />

            {/* 2 Tấm Ảnh Polaroid Trồi Lên Từ Trong Phong Bì Khi Mở (Giống hệt giây 00:01 - 00:05) */}
            <AnimatePresence>
              {isEnvelopeOpen && (
                <>
                  {/* Polaroid Trái: Nghiêng nhẹ sang trái + chữ ký "Long - Huyền" */}
                  <motion.div
                    key="open-polaroid-left"
                    initial={{ y: 35, x: -10, rotate: 0, opacity: 0, scale: 0.86 }}
                    animate={{ y: -56, x: -66, rotate: -6, opacity: 1, scale: 1 }}
                    exit={{ y: 30, opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 top-2 -translate-x-1/2 z-15 w-[130px] sm:w-[142px] bg-white p-1.5 pb-4 shadow-[0_12px_28px_rgba(0,0,0,0.15)] border border-stone-200/80"
                  >
                    <div className="aspect-[3/3.6] w-full overflow-hidden bg-stone-100">
                      <img
                        src={data.sectionImages.kissPhoto}
                        alt="Long & Huyền"
                        className="w-full h-full object-cover object-[center_24%]"
                      />
                    </div>
                    <p className="font-handwritten-minimal text-lg text-[#3A302C] text-center mt-1 leading-none">
                      Long - Huyền
                    </p>
                  </motion.div>

                  {/* Polaroid Phải: Nghiêng nhẹ sang phải + ngày "28.11.2026" */}
                  <motion.div
                    key="open-polaroid-right"
                    initial={{ y: 35, x: 10, rotate: 0, opacity: 0, scale: 0.86 }}
                    animate={{ y: -52, x: 62, rotate: 6, opacity: 1, scale: 1 }}
                    exit={{ y: 30, opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.8, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 top-2 -translate-x-1/2 z-16 w-[130px] sm:w-[142px] bg-white p-1.5 pb-4 shadow-[0_12px_28px_rgba(0,0,0,0.16)] border border-stone-200/80"
                  >
                    <div className="aspect-[3/3.6] w-full overflow-hidden bg-stone-100">
                      <img
                        src={data.sectionImages.hero}
                        alt="28.11.2026"
                        className="w-full h-full object-cover object-[center_22%]"
                      />
                    </div>
                    <p className="font-condensed-minimal text-[11px] tracking-[0.12em] text-[#3A302C] text-center mt-1.5 leading-none">
                      28.11.2026
                    </p>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Thân trước phong bì (2 cánh bên + cánh dưới) */}
            <svg
              viewBox="0 0 360 240"
              className="pointer-events-none absolute inset-0 w-full h-full z-20 rounded-[4px] overflow-hidden"
              preserveAspectRatio="none"
            >
              <polygon points="0,0 180,126 0,240" fill="#F5F0E8" stroke="#E5DDD0" strokeWidth="1" />
              <polygon points="360,0 180,126 360,240" fill="#F1EAE0" stroke="#E5DDD0" strokeWidth="1" />
              <polygon points="0,240 180,118 360,240" fill="#F8F4ED" stroke="#E2D9CB" strokeWidth="1.2" />
            </svg>

            {/* Nắp trên phong bì (Mở lật lên khi isEnvelopeOpen = true) */}
            <motion.div
              initial={false}
              animate={{ rotateX: isEnvelopeOpen ? 180 : 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              style={{
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d',
                zIndex: isEnvelopeOpen ? 5 : 25,
              }}
              className="pointer-events-none absolute top-0 left-0 right-0 h-[126px]"
            >
              <svg viewBox="0 0 360 126" className="w-full h-full" preserveAspectRatio="none">
                <polygon points="0,0 360,0 180,122" fill="#FBF8F3" stroke="#E2D8C8" strokeWidth="1.2" />
              </svg>
            </motion.div>

            {/* Con dấu sáp bướm vàng ở chính giữa phong bì */}
            <motion.div
              animate={!isEnvelopeOpen ? { scale: [1, 1.07, 1] } : { scale: 1 }}
              transition={{ duration: 2, repeat: !isEnvelopeOpen ? Infinity : 0, ease: 'easeInOut' }}
              className="absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 z-30"
            >
              <MinimalButterflyWaxSeal />
            </motion.div>

            {/* Tấm ảnh Polaroid nghiêng ở góc trái dưới khi phong bì đang đóng (Giống hệt giây 00:00) */}
            <AnimatePresence>
              {!isEnvelopeOpen && (
                <motion.div
                  key="closed-corner-polaroid"
                  initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
                  animate={{ opacity: 1, rotate: -7, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.25 } }}
                  className="absolute -left-3 -bottom-6 z-30 w-[108px] sm:w-[118px] bg-white p-1.5 pb-5 shadow-[0_12px_25px_rgba(0,0,0,0.16)] border border-stone-200/80"
                >
                  <div className="aspect-[3/3.7] w-full overflow-hidden bg-stone-100">
                    <img
                      src={data.sectionImages.heroLeftFloat}
                      alt="Thành Long & Thanh Huyền"
                      className="w-full h-full object-cover object-[center_20%]"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Phần chữ bên dưới phong bì: Chuyển từ "Thiệp Mời THÀNH LONG & THANH HUYỀN" sang "We can't wait to celebrate with you" */}
          <div className="mt-12 min-h-[96px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {!isEnvelopeOpen ? (
                <motion.div
                  key="closed-caption"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  onClick={handleOpenEnvelope}
                  className="cursor-pointer space-y-1.5"
                >
                  <p className="font-handwritten-minimal text-3xl sm:text-4xl text-[#3A302C]">
                    Thiệp Mời
                  </p>
                  <h1
                    style={{ fontFamily: "'Dancing Script', 'Playfair Display', cursive" }}
                    className="text-2xl sm:text-3xl font-semibold tracking-wide text-[#2B2523]"
                  >
                    {data.groom.shortName} &amp; {data.bride.shortName}
                  </h1>
                  <p className="font-condensed-minimal text-xs tracking-[0.14em] text-[#5C504A]">
                    28.11.2026
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="opened-caption"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="pt-2 flex flex-col items-center"
                >
                  <p className="font-handwritten-minimal text-3xl sm:text-4xl text-[#3A302C] leading-snug">
                    We can’t wait to
                    <br />
                    celebrate with you
                  </p>
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="mt-3 text-stone-400 flex flex-col items-center"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* =====================================================================
            TOÀN BỘ NỘI DUNG THIỆP CƯỚI BÊN DƯỚI:
            CHỈ HIỂN THỊ SAU KHI NGƯỜI DÙNG ĐÃ NHẤP MỞ PHONG BÌ (isEnvelopeOpen === true)
           ===================================================================== */}
        <AnimatePresence>
          {isEnvelopeOpen && (
            <motion.div
              key="invitation-unlocked-content"
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* =====================================================================
                  PHẦN 2: LỊCH ẢNH THÁNG 11 - 2026 & ĐỒNG HỒ ĐẾM NGƯỢC (00:06 -> 00:09)
                 ===================================================================== */}
              <section className="pt-2 pb-10 relative">
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  className="font-handwritten-minimal text-3xl sm:text-4xl md:text-5xl text-center text-[#3A302C] mb-3"
                >
                  Tháng 11 - 2026
                </motion.p>

                {/* Khung Lịch Đè Lên Ảnh Cưới Có Viền Mờ Trắng Trên/Dưới Giống Hệt Video */}
                <div className="relative w-full aspect-[4/3.1] md:aspect-[16/7.5] md:max-h-[460px] overflow-hidden">
                  <img
                    src={data.sectionImages.countdown}
                    alt="Tháng 11 - 2026"
                    className="w-full h-full object-cover object-[center_28%] opacity-85"
                  />
                  {/* Lớp sương mờ trắng ở mép trên & mép dưới giống hệt video */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-white/25 to-[#FAF8F5]" />

                  {/* Lưới Lịch Tháng 11/2026 */}
                  <div className="absolute inset-0 px-6 sm:px-8 md:px-12 py-4 flex flex-col justify-center max-w-xl mx-auto">
                    <div className="grid grid-cols-7 text-center mb-2">
                      {weekDays.map((wd) => (
                        <span
                          key={wd}
                          className="font-condensed-minimal text-[10px] sm:text-[11px] md:text-xs tracking-[0.08em] text-[#3A302C] font-normal"
                        >
                          {wd}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-y-1.5 md:gap-y-2.5 text-center">
                      {Array.from({ length: emptyLeading }).map((_, idx) => (
                        <div key={`empty-${idx}`} className="h-6 sm:h-7 md:h-8" />
                      ))}
                      {Array.from({ length: totalDays }).map((_, idx) => {
                        const day = idx + 1;
                        const isSpecial = day === 27 || day === 28;
                        return (
                          <div
                            key={day}
                            className="relative h-6 sm:h-7 md:h-8 flex items-center justify-center"
                          >
                            {isSpecial && (
                              <Heart
                                className={`pointer-events-none absolute w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 ${
                                  day === 28
                                    ? 'fill-white text-white drop-shadow-[0_2px_6px_rgba(90,24,36,0.35)] scale-110'
                                    : 'fill-white/85 text-white/90 drop-shadow-sm'
                                }`}
                              />
                            )}
                            <span
                              className={`relative z-10 font-condensed-minimal text-xs sm:text-sm md:text-base ${
                                isSpecial ? 'font-medium text-[#5A1824]' : 'text-[#2B2523]'
                              }`}
                            >
                              {day}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Huy Hiệu Oval Chữ Ký L & H + 4 Ô Đếm Ngược Kem Mịn + ẢNH HOA VIỀN CẠNH PHẢI */}
                <div className="relative px-6 pt-5 pb-4 text-center max-w-xl mx-auto">
                  {/* ẢNH HOA VIỀN CẠNH PHẢI XOAY RỦ XUỐNG (Giống hệt giây 00:08 - 00:10 trong video) */}
                  <MinimalCallaBouquetImg
                    flipY
                    className="absolute -top-16 -right-8 w-36 sm:w-40 md:w-48 z-20 rotate-[14deg]"
                  />

                  {/* Khung Oval Đôi Chứa Chữ Ký L & H */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="mx-auto w-16 h-22 rounded-[50%] border border-stone-500 p-1 flex items-center justify-center mb-4"
                  >
                    <div className="w-full h-full rounded-[50%] border border-stone-400 flex flex-col items-center justify-center font-handwritten-minimal text-2xl text-[#3A302C] leading-none">
                      <span className="-ml-2">L</span>
                      <span className="ml-2 -mt-1">H</span>
                    </div>
                  </motion.div>

                  <p className="font-condensed-minimal text-xs sm:text-sm tracking-[0.14em] uppercase text-[#3A302C] mb-4">
                    HAPPILY EVER AFTER STARTS IN...
                  </p>

                  {/* 4 Ô Đếm Ngược Kem Mịn (NGÀY | GIỜ | PHÚT | GIÂY) */}
                  <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 max-w-xs sm:max-w-md mx-auto relative z-10">
                    {[
                      { label: 'NGÀY', val: timeLeft.days },
                      { label: 'GIỜ', val: timeLeft.hours },
                      { label: 'PHÚT', val: timeLeft.minutes },
                      { label: 'GIÂY', val: timeLeft.seconds },
                    ].map((item, idx) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.45, delay: idx * 0.08 }}
                        className="rounded-xl bg-[#F3ECE4] border border-[#E6DDD2] py-3 md:py-4 px-1.5 md:px-3 text-center shadow-sm"
                      >
                        <span className="block font-condensed-minimal text-lg sm:text-xl md:text-2xl font-normal text-[#2B2523]">
                          {String(item.val).padStart(2, '0')}
                        </span>
                        <span className="block font-condensed-minimal text-[10px] sm:text-xs tracking-[0.1em] uppercase text-[#6E625C] mt-0.5">
                          {item.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* =====================================================================
                  PHẦN 3: ẢNH CHÍNH + 2 POLAROID CHÚ RỂ & CÔ DÂU + HAI BÊN GIA ĐÌNH (00:10 -> 00:13)
                 ===================================================================== */}
              <section className="px-5 md:px-8 py-6 text-center relative max-w-3xl mx-auto">
                {/* Ảnh Đôi Đứng Chính Giữa Có Bó Hoa Rum Thật Ở Viền Cạnh Trái Dưới (Giống hệt giây 00:10 - 00:12) */}
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.65 }}
                  className="relative mx-auto w-[78%] max-w-[295px] md:max-w-[340px] bg-white p-2.5 md:p-3 shadow-[0_14px_35px_rgba(0,0,0,0.08)] border border-stone-200/80 mb-10"
                >
                  <div className="aspect-[3/4.1] overflow-hidden bg-stone-100">
                    <img
                      src={data.sectionImages.hero}
                      alt="Thành Long & Thanh Huyền"
                      className="w-full h-full object-cover object-[center_22%]"
                    />
                  </div>
                  {/* ẢNH HOA VIỀN CẠNH TRÁI DƯỚI KHUNG ẢNH ĐÔI */}
                  <MinimalCallaBouquetImg className="absolute -bottom-12 -left-12 w-34 sm:w-38 md:w-44 z-20 rotate-[8deg]" />
                </motion.div>

                {/* Lời Kính Mời */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  className="font-condensed-minimal text-xs sm:text-sm md:text-base tracking-[0.08em] uppercase text-[#3A302C] leading-relaxed mb-8 max-w-xl mx-auto"
                >
                  <p>TRÂN TRỌNG KÍNH MỜI BẠN</p>
                  <p>DÀNH THỜI GIAN QUÝ GIÁ THAM DỰ LỄ CƯỚI CỦA</p>
                </motion.div>

                {/* 2 Khung Polaroid Chú Rể & Cô Dâu Đặt Cạnh Nhau Giống Hệt Giây 00:12 */}
                <div className="grid grid-cols-2 gap-3.5 sm:gap-6 md:gap-8 items-start px-1 relative z-10 max-w-xl mx-auto">
                  {/* Polaroid Chú Rể */}
                  <motion.div
                    initial={{ opacity: 0, x: -28, rotate: -3 }}
                    whileInView={{ opacity: 1, x: 0, rotate: -1.5 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white p-2 md:p-3 pb-4 md:pb-6 shadow-[0_12px_28px_rgba(0,0,0,0.09)] border border-stone-200/80"
                  >
                    <div className="aspect-[3/3.8] overflow-hidden bg-stone-100 mb-2">
                      <img
                        src={data.groom.avatar}
                        alt={data.groom.fullName}
                        className="w-full h-full object-cover object-[center_18%]"
                      />
                    </div>
                    <p className="font-handwritten-minimal text-2xl md:text-3xl text-[#3A302C] leading-none">
                      Chú rể
                    </p>
                    <p className="font-condensed-minimal text-xs sm:text-sm md:text-base tracking-[0.1em] uppercase text-[#2B2523] mt-1">
                      {data.groom.shortName}
                    </p>
                  </motion.div>

                  {/* Polaroid Cô Dâu (Nghiêng nhẹ sang phải giống hệt video) */}
                  <motion.div
                    initial={{ opacity: 0, x: 28, rotate: 6 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 3.5 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.6, delay: 0.08 }}
                    className="bg-white p-2 md:p-3 pb-4 md:pb-6 shadow-[0_12px_28px_rgba(0,0,0,0.09)] border border-stone-200/80 mt-2"
                  >
                    <div className="aspect-[3/3.8] overflow-hidden bg-stone-100 mb-2">
                      <img
                        src={data.bride.avatar}
                        alt={data.bride.fullName}
                        className="w-full h-full object-cover object-[center_18%]"
                      />
                    </div>
                    <p className="font-handwritten-minimal text-2xl md:text-3xl text-[#3A302C] leading-none">
                      Cô dâu
                    </p>
                    <p className="font-condensed-minimal text-xs sm:text-sm md:text-base tracking-[0.1em] uppercase text-[#2B2523] mt-1">
                      {data.bride.shortName}
                    </p>
                  </motion.div>
                </div>

                {/* ẢNH 2 CÀNH HOA RUM ĐỎ RƯỢU NẰM NGHIÊNG BÊN DƯỚI ẢNH CÔ DÂU RA VIỀN CẠNH PHẢI (Giống hệt giây 00:13) */}
                <div className="relative h-16 -mt-3 mb-2 flex justify-end max-w-xl mx-auto">
                  <DiagonalCallaStemsImg className="w-48 sm:w-56 md:w-64 -mr-4 rotate-[-6deg] z-20" />
                </div>

                {/* Thông Tin Hai Bên Gia Đình (NHÀ TRAI | NHÀ GÁI) */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  className="grid grid-cols-2 gap-4 md:gap-12 pt-1 pb-4 font-condensed-minimal text-xs md:text-sm tracking-[0.06em] uppercase text-[#3A302C] max-w-xl mx-auto"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-[#2B2523] md:text-base">NHÀ TRAI</p>
                    <p className="md:text-sm">{data.groom.fullName}</p>
                    <p className="text-[11px] md:text-xs text-[#6E625C]">VIỆT TIẾN - HƯNG YÊN</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-[#2B2523] md:text-base">NHÀ GÁI</p>
                    <p className="md:text-sm">{data.bride.fullName}</p>
                    <p className="text-[11px] md:text-xs text-[#6E625C]">TRIỆU VIỆT VƯƠNG - HƯNG YÊN</p>
                  </div>
                </motion.div>
              </section>

              {/* =====================================================================
                  PHẦN 4: CÁC THẺ SỰ KIỆN BỮA CƠM THÂN MẬT & LỄ CƯỚI (00:13 -> 00:16)
                 ===================================================================== */}
              <section id="section-events" className="px-5 md:px-8 py-6 relative max-w-3xl lg:max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                {minimalEvents.map((ev, idx) => (
                  <motion.div
                    key={ev.id}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.22 }}
                    transition={{ duration: 0.55, delay: idx * 0.05 }}
                    className="relative rounded-2xl bg-[#F4EFEA] border border-[#E5DDD3] px-5 py-6 text-center shadow-[0_10px_28px_rgba(43,37,35,0.06)] flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="font-condensed-minimal text-sm sm:text-base font-normal tracking-[0.08em] uppercase text-[#2B2523]">
                        {ev.title}
                      </h3>
                      <p className="font-condensed-minimal text-xs tracking-[0.06em] uppercase text-[#4E433E] mt-1">
                        {ev.subTime}
                      </p>

                      {/* Ngày Dương Lịch Nằm Giữa 2 Đường Kẻ Ngang */}
                      <div className="w-48 mx-auto border-y border-stone-500/70 py-1.5 my-3 font-condensed-minimal text-lg sm:text-xl tracking-[0.1em] text-[#2B2523]">
                        {ev.dateSolar}
                      </div>

                      <p className="font-condensed-minimal text-[11px] tracking-[0.06em] uppercase text-[#5C504A]">
                        {ev.dateLunar}
                      </p>

                      {/* Icon Ghim Vị Trí Đen */}
                      <div className="my-3 flex justify-center">
                        <div className="w-6 h-6 rounded-full bg-[#2B2523] text-white flex items-center justify-center">
                          <MapPin className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Tại Tư Gia Nhà Trai / Nhà Gái (Chữ ký tay mềm mại) */}
                      <p className="font-handwritten-minimal text-3xl text-[#2B2523] leading-tight">
                        {ev.venueScript}
                      </p>

                      <p className="font-condensed-minimal text-[11px] tracking-[0.05em] uppercase text-[#4E433E] mt-1 mb-4 px-2">
                        {ev.addressUpper}
                      </p>
                    </div>

                    <a
                      href={ev.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-52 mx-auto py-2 rounded-full border border-[#3A302C] font-condensed-minimal text-xs tracking-[0.12em] uppercase text-[#2B2523] hover:bg-[#2B2523] hover:text-white transition-colors"
                    >
                      XEM BẢN ĐỒ
                    </a>
                  </motion.div>
                ))}
                </div>
              </section>

              {/* =====================================================================
                  PHẦN 5: ALBUM HÌNH CƯỚI — LƯỚI 2 CỘT MOBILE / 4 CỘT DESKTOP (00:16 -> 00:19)
                 ===================================================================== */}
              <section id="section-gallery" className="px-5 md:px-8 pt-8 pb-6 relative max-w-3xl lg:max-w-4xl mx-auto">
                {/* Tiêu đề chữ ký + Đường kẻ ngang bên phải giống hệt giây 00:16 */}
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="font-handwritten-minimal text-3xl sm:text-4xl md:text-5xl text-[#2B2523] shrink-0">
                    Album Hình Cưới
                  </h2>
                  <span className="flex-1 h-[1px] bg-stone-400/80 mt-1" />
                </div>

                <p className="font-condensed-minimal text-[11px] sm:text-xs md:text-sm tracking-[0.04em] uppercase text-[#4E433E] leading-relaxed text-justify mb-6">
                  CUỐN ALBUM NÀY GHI LẠI NHỮNG KHOẢNH KHẮC ĐẸP NHẤT TRONG NGÀY ĐẶC BIỆT CỦA CHÚNG MÌNH - TRÀN ĐẦY YÊU THƯƠNG, HẠNH PHÚC VÀ NHỮNG KỶ NIỆM KHÓ QUÊN. MỖI BỨC ẢNH ĐỀU KỂ MỘT CÂU CHUYỆN VỀ HÀNH TRÌNH CỦA CHÚNG MÌNH. GIỮA VÒNG TAY CỦA GIA ĐÌNH VÀ BẠN BÈ, CHÚNG MÌNH ĐÃ CÙNG NHAU ĐÁNH DẤU MỘT TÌNH YÊU BỀN VỮNG THEO NĂM THÁNG.
                </p>

                {/* Lưới 2 cột mobile, 3 cột tablet, 4 cột desktop */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 items-start">
                  {galleryPhotos.map((url, idx) => {
                    const isRightCol = idx % 2 === 1;
                    return (
                      <motion.div
                        key={url + idx}
                        initial={{
                          opacity: 0,
                          x: isRightCol ? 28 : -28,
                          y: 24,
                          scale: 0.94,
                        }}
                        whileInView={{
                          opacity: 1,
                          x: 0,
                          y: isRightCol ? 14 : 0,
                          scale: 1,
                        }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => setLightboxUrl(url)}
                        className="cursor-pointer overflow-hidden bg-white p-1 shadow-[0_8px_22px_rgba(0,0,0,0.08)] border border-stone-200/70"
                      >
                        <div className="aspect-[3/4.2] overflow-hidden bg-stone-100">
                          <img
                            src={url}
                            alt={`Ảnh cưới ${idx + 1}`}
                            loading="lazy"
                            className="w-full h-full object-cover object-[center_22%] hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>

              {/* =====================================================================
                  PHẦN 6: FORM XÁC NHẬN & GỬI LỜI CHÚC + HỘP QUÀ MỪNG CƯỚI 3D (ẤN VÀO MỚI MỞ QR)
                 ===================================================================== */}
              <section id="section-wishes" className="px-5 md:px-8 pt-8 pb-8 relative max-w-3xl lg:max-w-4xl mx-auto">
                {/* Điểm xuyết hoa Rum ở viền cạnh phải phía trên form */}
                <MinimalCallaBouquetImg
                  flipX
                  className="absolute -top-6 -right-9 w-28 sm:w-32 opacity-90 z-10 rotate-[-12deg]"
                />

                <p className="font-condensed-minimal text-[11px] sm:text-xs md:text-sm tracking-[0.04em] uppercase text-[#3A302C] leading-relaxed mb-5 pr-12 max-w-xl mx-auto text-center sm:text-left">
                  HÃY XÁC NHẬN SỰ CÓ MẶT CỦA BẠN ĐỂ GIA ĐÌNH CHÚNG MÌNH CHUẨN BỊ ĐÓN TIẾP MỘT CÁCH CHU ĐÁO NHẤT. TRÂN TRỌNG!
                </p>

                <form onSubmit={handleSubmitForm} className="space-y-3 relative z-20 max-w-xl mx-auto">
                  <input
                    type="text"
                    required
                    value={guestInputName}
                    onChange={(e) => setGuestInputName(e.target.value)}
                    placeholder="TÊN CỦA BẠN LÀ GÌ?"
                    className="w-full rounded-full border border-stone-600/80 bg-white px-5 py-3 font-condensed-minimal text-xs tracking-[0.06em] text-[#2B2523] placeholder:text-stone-500 focus:outline-none focus:border-stone-900"
                  />

                  <input
                    type="text"
                    required
                    value={guestWish}
                    onChange={(e) => setGuestWish(e.target.value)}
                    placeholder="GỬI LỜI CHÚC ĐẾN DÂU RỂ"
                    className="w-full rounded-full border border-stone-600/80 bg-white px-5 py-3 font-condensed-minimal text-xs tracking-[0.06em] text-[#2B2523] placeholder:text-stone-500 focus:outline-none focus:border-stone-900"
                  />

                  <div className="relative">
                    <select
                      value={attendance}
                      onChange={(e) => setAttendance(e.target.value)}
                      className="w-full rounded-full border border-stone-600/80 bg-white px-5 py-3 font-condensed-minimal text-xs tracking-[0.06em] uppercase text-[#2B2523] focus:outline-none focus:border-stone-900"
                    >
                      <option value="Có, chắc chắn mình sẽ tham dự!">
                        BẠN CÓ THAM DỰ KHÔNG? — CÓ, CHẮC CHẮN THAM DỰ
                      </option>
                      <option value="Mình bận mất rồi, xin gửi lời chúc hạnh phúc!">
                        MÌNH BẬN MẤT RỒI, XIN GỬI LỜI CHÚC HẠNH PHÚC
                      </option>
                      <option value="Đang sắp xếp thời gian">ĐANG SẮP XẾP THỜI GIAN</option>
                    </select>
                  </div>

                  {wishSubmitted && (
                    <p className="text-center font-condensed-minimal text-xs text-emerald-700 py-1">
                      ✨ CẢM ƠN BẠN! LỜI CHÚC &amp; XÁC NHẬN ĐÃ ĐƯỢC GỬI THÀNH CÔNG.
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <button
                      type="submit"
                      className="cursor-pointer w-full rounded-full bg-[#1C1C1C] hover:bg-stone-800 text-white py-3.5 font-condensed-minimal text-xs tracking-[0.1em] uppercase transition-colors shadow-md"
                    >
                      GỬI LỜI CHÚC &amp; XÁC NHẬN
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleScrollToGiftBox();
                        if (!isGiftBoxOpen) {
                          handleOpenGiftBox();
                        }
                      }}
                      className="cursor-pointer w-full rounded-full bg-[#1C1C1C] hover:bg-stone-800 text-white py-3.5 font-condensed-minimal text-xs tracking-[0.1em] uppercase transition-colors shadow-md"
                    >
                      GỬI QUÀ MỪNG CƯỚI
                    </button>
                  </div>
                </form>

                {/* Danh sách lời chúc đã gửi (nếu có) */}
                {wishes.length > 0 && (
                  <div className="mt-6 space-y-2.5 relative z-20 max-w-xl mx-auto">
                    <p className="font-condensed-minimal text-xs uppercase tracking-[0.1em] text-[#5C504A]">
                      LỜI CHÚC TỪ NGƯỜI THƯƠNG ({wishes.length})
                    </p>
                    <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                      {wishes.map((w) => {
                        const parsed = parseWishItem(w);
                        return (
                          <div
                            key={w.id}
                            className="rounded-xl bg-[#F4EFEA] border border-[#E5DDD3] px-4 py-3 text-left"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-condensed-minimal text-xs uppercase font-medium text-[#2B2523]">
                                {parsed.name}
                              </span>
                              <span className="text-[10px] text-stone-500">{parsed.createdAt}</span>
                            </div>
                            <p className="text-xs text-[#4E433E] mt-1">“{parsed.cleanMessage}”</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* =====================================================================
                    TUYỆT TÁC HỘP QUÀ MỪNG CƯỚI 3D (HIỂN THỊ TRỰC TIẾP, ẤN VÀO MỚI MỞ MÃ QR)
                   ===================================================================== */}
                <div
                  id="section-qr-gift"
                  className="mt-10 pt-7 border-t border-stone-300/70 text-center relative scroll-mt-20 max-w-2xl mx-auto"
                >
                  {/* Điểm xuyết bó hoa Rum ở viền cạnh trái của khu vực Hộp Quà */}
                  <MinimalCallaBouquetImg className="absolute -top-8 -left-9 w-28 sm:w-32 opacity-95 z-10 rotate-[10deg]" />

                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F4EFEA] border border-[#DFD5C8] text-[#5A1824] font-condensed-minimal text-[11px] tracking-[0.14em] uppercase mb-1.5">
                    <Gift className="w-3.5 h-3.5" />
                    <span>WEDDING GIFT • MỪNG CƯỚI</span>
                  </div>

                  <h3 className="font-handwritten-minimal text-4xl md:text-5xl text-[#3A302C]">
                    Hộp Quà Mừng Cưới
                  </h3>
                  <p className="font-condensed-minimal text-xs tracking-[0.06em] uppercase text-[#5C504A] mt-0.5 mb-5">
                    {!isGiftBoxOpen
                      ? 'CHẠM VÀO HỘP QUÀ BÊN DƯỚI ĐỂ MỞ MÃ QR MỪNG CƯỚI'
                      : 'CHẠM VÀO MÃ QR ĐỂ PHÓNG TO HOẶC SAO CHÉP SỐ TÀI KHOẢN'}
                  </p>

                  <AnimatePresence mode="wait">
                    {!isGiftBoxOpen ? (
                      /* TRẠNG THÁI 1: PHONG BÌ CƯỚI TỐI GIẢN TRẮNG KEM MINI (MINIMAL LINEN ENVELOPE)
                         Kích thước nhỏ gọn, thanh thoát, hoàn toàn phù hợp với Tone Trắng Minimal */
                      <motion.div
                        key="minimal-closed-gift-envelope"
                        initial={{ opacity: 0, scale: 0.92, y: 14 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          scale: 1.06,
                          filter: 'blur(4px)',
                          transition: { duration: 0.35 },
                        }}
                        className="relative flex flex-col items-center justify-center py-2 select-none"
                      >
                        {/* Hào quang ấm áp dịu nhẹ phía sau */}
                        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-r from-amber-200/30 via-rose-100/25 to-amber-300/30 blur-2xl animate-pulse" />

                        <motion.div
                          onClick={handleOpenGiftBox}
                          whileHover={{ scale: 1.03, y: -3 }}
                          whileTap={{ scale: 0.96 }}
                          animate={
                            isBoxUnwrapping
                              ? { rotate: [0, -2, 2, -3, 3, 0], scale: [1, 1.04, 1.08] }
                              : { y: [0, -5, 0] }
                          }
                          transition={
                            isBoxUnwrapping
                              ? { duration: 0.5 }
                              : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                          }
                          className="cursor-pointer relative z-20 flex flex-col items-center w-full max-w-[240px] sm:max-w-[260px] group"
                        >
                          {/* VỎ PHONG BÌ CƯỚI TRẮNG KEM TINH TẾ */}
                          <div
                            className="relative w-full h-36 sm:h-40 rounded-2xl border border-[#DFD5C8] p-3.5 shadow-[0_14px_35px_rgba(43,37,35,0.08)] flex flex-col items-center justify-between overflow-hidden bg-gradient-to-br from-[#FFFEFC] via-[#FAF7F2] to-[#F2EDE4] transition-all duration-300 group-hover:border-[#C4B5A2]"
                          >
                            {/* Khung viền góc giấy mỹ thuật */}
                            <div className="pointer-events-none absolute inset-1.5 rounded-xl border border-[#DFD5C8]/50" />
                            <span className="pointer-events-none absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-[#A69784]/60" />
                            <span className="pointer-events-none absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-[#A69784]/60" />
                            <span className="pointer-events-none absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-[#A69784]/60" />
                            <span className="pointer-events-none absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-[#A69784]/60" />

                            {/* Nắp phong bì chữ V gập nhẹ trên đỉnh */}
                            <div className="pointer-events-none absolute top-0 inset-x-0 h-6 overflow-hidden">
                              <svg viewBox="0 0 100 24" className="w-full h-full" preserveAspectRatio="none">
                                <polygon points="0,0 100,0 50,22" fill="#F4EFEA" stroke="#DFD5C8" strokeWidth="0.8" />
                              </svg>
                            </div>

                            {/* Con dấu sáp vàng cánh bướm nhỏ nhắn ở tâm */}
                            <div className="relative z-10 my-auto flex flex-col items-center">
                              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FFF6D1] via-[#E5B85B] to-[#9A6D15] p-0.5 shadow-md border border-white flex items-center justify-center group-hover:scale-105 transition-transform">
                                <div className="w-full h-full rounded-full bg-[#5E1420] flex items-center justify-center text-[#FDE68A]">
                                  <Heart className="w-4 h-4 fill-current animate-pulse" />
                                </div>
                              </div>
                            </div>

                            {/* Nút hướng dẫn mở nhỏ gọn phong cách tối giản căn giữa hoàn hảo */}
                            <div className="relative z-10 w-full flex items-center justify-center pt-1">
                              <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#3A302C] text-[#FAF8F5] font-condensed-minimal text-[11px] sm:text-xs tracking-wider uppercase whitespace-nowrap shadow-sm group-hover:bg-[#1C1C1C] transition-colors text-center">
                                <LockOpen className="w-3.5 h-3.5 text-[#FDE68A] shrink-0" />
                                <span className="whitespace-nowrap font-medium">CHẠM ĐỂ MỞ MÃ QR</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    ) : (
                      /* TRẠNG THÁI 2: HỘP QUÀ ĐÃ MỞ — HIỂN THỊ 2 MÃ QR CỦA CHÚ RỂ & CÔ DÂU (2 CỘT SONG SONG TRÊN DESKTOP) */
                      <motion.div
                        key="minimal-opened-qr-cards"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl bg-[#F4EFEA] border border-[#E5DDD3] p-4 sm:p-5 md:p-6 text-center shadow-sm"
                      >
                        <div className="flex flex-col items-center justify-center gap-2 border-b border-stone-300/80 pb-3 mb-4">
                          <span className="font-condensed-minimal text-xs uppercase tracking-[0.1em] text-[#5A1824] font-medium">
                            MÃ QR MỪNG CƯỚI NHÀ TRAI &amp; NHÀ GÁI
                          </span>
                          <button
                            type="button"
                            onClick={() => setIsGiftBoxOpen(false)}
                            className="cursor-pointer inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-stone-300 text-[11px] font-condensed-minimal uppercase text-stone-700 hover:bg-stone-100 shadow-xs"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Đóng hộp quà lại</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          {[
                            {
                              key: 'groom' as const,
                              badge: 'NHÀ TRAI • CHÚ RỂ CAO THÀNH LONG',
                              scriptTitle: 'Mừng Cưới Chú Rể',
                              info: data.groomQrGift,
                              downloadName: 'QR-Chu-Re-Cao-Thanh-Long.png',
                            },
                            {
                              key: 'bride' as const,
                              badge: 'NHÀ GÁI • CÔ DÂU MAI THANH HUYỀN',
                              scriptTitle: 'Mừng Cưới Cô Dâu',
                              info: data.brideQrGift,
                              downloadName: 'QR-Co-Dau-Mai-Thanh-Huyen.png',
                            },
                          ].map((card) => (
                            <div
                              key={card.key}
                              className="rounded-xl bg-white p-4 border border-stone-200/90 shadow-sm text-center flex flex-col justify-between"
                            >
                              <div>
                                <p className="font-condensed-minimal text-xs tracking-[0.1em] uppercase text-[#5A1824] mb-0.5">
                                  {card.badge}
                                </p>
                                <p className="font-handwritten-minimal text-3xl text-[#2B2523] mb-2">
                                  {card.scriptTitle}
                                </p>

                                <div
                                  onClick={() => setLightboxUrl(card.info.qrImageUrl)}
                                  className="cursor-pointer mx-auto w-48 h-52 rounded-xl border border-stone-200 p-2.5 flex items-center justify-center bg-[#FAF8F5] hover:scale-[1.02] transition-transform"
                                >
                                  <img
                                    src={card.info.qrImageUrl}
                                    alt={card.info.accountHolder}
                                    className="max-w-full max-h-full object-contain rounded-lg"
                                  />
                                </div>

                                <p className="font-condensed-minimal text-xs text-stone-600 mt-2.5 uppercase">
                                  {card.info.bankBranch}
                                </p>
                                <p className="font-condensed-minimal text-sm font-medium text-[#2B2523] mt-0.5">
                                  {card.info.accountHolder} — STK: {card.info.accountNumber}
                                </p>
                              </div>

                              <div className="mt-3 flex items-center justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleCopyBank(card.key, card.info.accountNumber)}
                                  className="cursor-pointer px-4 py-2 rounded-full bg-[#1C1C1C] hover:bg-stone-800 text-white font-condensed-minimal text-[11px] uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
                                >
                                  {copiedKey === card.key ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                                      <span>ĐÃ CHÉP STK</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      <span>SAO CHÉP STK</span>
                                    </>
                                  )}
                                </button>
                                <a
                                  href={card.info.qrImageUrl}
                                  download={card.downloadName}
                                  className="px-4 py-2 rounded-full border border-stone-400 hover:bg-stone-100 font-condensed-minimal text-[11px] uppercase tracking-wider inline-flex items-center gap-1 transition-colors"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                  <span>TẢI QR</span>
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </section>

              {/* =====================================================================
                  PHẦN 7: BANNER LỜI CẢM ƠN CUỐI TRANG (ĐẶT Ở PHÍA TRÊN ĐỂ KHÔNG CHE ẢNH DÂU RỂ)
                 ===================================================================== */}
              <section className="relative w-full aspect-[4/4.8] md:aspect-[16/8] md:max-h-[520px] overflow-hidden">
                <img
                  src={data.sectionImages.thankYouBg}
                  alt="Lời cảm ơn"
                  className="w-full h-full object-cover object-[center_75%] md:object-[center_68%]"
                />
                {/* Dải băng trắng mờ đặt ở phía trên bức hình (vùng rèm trắng) để không che cô dâu chú rể */}
                <div className="absolute inset-x-0 top-3 md:top-5 bg-white/85 backdrop-blur-[3px] py-3.5 md:py-5 px-5 md:px-8 text-center shadow-sm max-w-2xl mx-auto md:rounded-2xl md:border md:border-stone-200/60">
                  <h2 className="font-handwritten-minimal text-3xl sm:text-4xl md:text-5xl text-[#2B2523] mb-1">
                    Lời cảm ơn!
                  </h2>
                  <p className="font-condensed-minimal text-[11px] sm:text-xs md:text-sm tracking-[0.04em] uppercase text-[#2B2523] leading-relaxed">
                    CẢM ƠN BẠN ĐÃ DÀNH TÌNH CẢM CHO GIA ĐÌNH CHÚNG MÌNH! SỰ HIỆN DIỆN CỦA BẠN CHÍNH LÀ MÓN QUÀ Ý NGHĨA NHẤT, GIA ĐÌNH CHÚNG MÌNH VÔ CÙNG TRÂN QUÝ KHI ĐƯỢC CÙNG BẠN CHIA SẺ NIỀM HẠNH PHÚC TRONG NGÀY TRỌNG ĐẠI NÀY.
                  </p>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nút Nhạc Tròn Nổi Ở Góc Dưới Phải */}
        <button
          type="button"
          onClick={onToggleMusic}
          aria-label="Bật/Tắt nhạc"
          className="cursor-pointer fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 w-11 h-11 md:w-13 md:h-13 rounded-full bg-white/92 border border-[#2B2523] shadow-lg flex items-center justify-center text-[#2B2523] hover:scale-105 transition-transform"
        >
          <Music className={`w-5 h-5 ${isMusicPlaying ? 'animate-spin-vinyl text-[#5A1824]' : ''}`} />
        </button>
      </div>

      {/* Lightbox Phóng To Ảnh / Mã QR Khi Chạm Vào */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {lightboxUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxUrl(null)}
                className="fixed inset-0 z-[100] w-screen h-[100dvh] bg-black/92 backdrop-blur-xl flex flex-col items-center justify-center p-4"
              >
                <div className="w-full max-w-md flex items-center justify-between mb-3">
                  <span className="font-condensed-minimal text-xs tracking-[0.18em] text-white/85 uppercase">
                    {data.groom.shortName} &amp; {data.bride.shortName} • 28.11.2026
                  </span>
                  <button
                    type="button"
                    onClick={() => setLightboxUrl(null)}
                    className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/15 text-white text-xs"
                  >
                    <X className="w-4 h-4" />
                    <span>Đóng</span>
                  </button>
                </div>

                <div className="relative flex items-center justify-center w-full max-w-md max-h-[76dvh]">
                  {galleryPhotos.includes(lightboxUrl) && (
                    <button
                      type="button"
                      onClick={(e) => handleStepLightbox(-1, e)}
                      className="cursor-pointer absolute left-1 z-30 w-9 h-9 rounded-full bg-black/60 border border-white/30 text-white flex items-center justify-center"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}

                  <motion.img
                    key={lightboxUrl}
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.92, opacity: 0 }}
                    src={lightboxUrl}
                    alt="Phóng to"
                    className="max-h-[75dvh] max-w-[88vw] rounded-lg bg-white p-1.5 object-contain shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  />

                  {galleryPhotos.includes(lightboxUrl) && (
                    <button
                      type="button"
                      onClick={(e) => handleStepLightbox(1, e)}
                      className="cursor-pointer absolute right-1 z-30 w-9 h-9 rounded-full bg-black/60 border border-white/30 text-white flex items-center justify-center"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};
