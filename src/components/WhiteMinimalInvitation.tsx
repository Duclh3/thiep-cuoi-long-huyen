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
  MoreHorizontal,
  Check,
  Copy,
  Download,
  Gift,
  LockOpen,
  RotateCcw,
  X,
  Heart,
} from 'lucide-react';
import { WeddingData, WishItem } from '../data/weddingData';
import { soundEngine } from '../utils/soundEngine';

interface WhiteMinimalInvitationProps {
  data: WeddingData;
  wishes: WishItem[];
  onAddWish: (wish: WishItem) => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onStartMusic: () => void;
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

  // Form gửi lời chúc & xác nhận tham dự (4 ô tròn giống hệt video)
  const [guestInputName, setGuestInputName] = useState('');
  const [guestRelation, setGuestRelation] = useState('');
  const [guestWish, setGuestWish] = useState('');
  const [attendance, setAttendance] = useState('Có, chắc chắn mình sẽ tham dự!');
  const [wishSubmitted, setWishSubmitted] = useState(false);

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

    const displayName = guestRelation.trim()
      ? `${guestInputName.trim()} (${guestRelation.trim()})`
      : guestInputName.trim();

    const newWish: WishItem = {
      id: `wish-${Date.now()}`,
      name: displayName,
      message: `${guestWish.trim()} — [${attendance}]`,
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
    setGuestInputName('');
    setGuestRelation('');
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
    <div className="min-h-screen w-full bg-[#EFECE6] text-[#2B2523] flex justify-center overflow-x-hidden">
      {/* Khung Thiệp Dọc Chuẩn Mobile-First Giống Hệt Video Mẫu */}
      <div
        className={`w-full max-w-[460px] bg-[#FAF8F5] shadow-[0_0_60px_rgba(0,0,0,0.09)] relative overflow-hidden ${
          isEnvelopeOpen ? 'pb-10' : 'min-h-[100dvh] flex flex-col'
        }`}
      >
        {/* Thanh Tiêu Đề Mảnh Trên Đỉnh Giống Hệt Video */}
        <div className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 px-4 py-3 flex items-center justify-between text-[#2B2523]">
          <ChevronLeft className="w-4 h-4 opacity-60 shrink-0" />
          <span className="font-condensed-minimal text-xs sm:text-sm tracking-[0.08em] uppercase font-normal truncate px-2">
            THIỆP MỜI CƯỚI {data.groom.shortName} &amp; {data.bride.shortName}
          </span>
          <MoreHorizontal className="w-4 h-4 opacity-60 shrink-0" />
        </div>

        {/* =====================================================================
            PHẦN 1: PHONG BÌ TƯƠNG TÁC MỞ ĐẦU (00:00 -> 00:05)
            - Khi chưa mở (!isEnvelopeOpen): Chiếm trọn màn hình đầu tiên, khóa nội dung bên dưới.
            - Khi ấn mở (isEnvelopeOpen): Mở nắp phong bì, đẩy 2 ảnh Polaroid lên và mở khóa toàn bộ thiệp!
           ===================================================================== */}
        <section
          className={`px-5 flex flex-col items-center text-center relative transition-all duration-700 ${
            isEnvelopeOpen
              ? 'pt-10 pb-8'
              : 'flex-1 min-h-[calc(100dvh-52px)] justify-center py-8'
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
              className="cursor-pointer font-handwritten-minimal text-3xl sm:text-4xl text-[#3A302C] mb-12 select-none"
            >
              {isEnvelopeOpen ? 'Save our date!' : 'Nhấp để mở'}
            </motion.p>
          </AnimatePresence>

          {/* Khối Phong Bì Trắng Kem + Ảnh Hoa Rum Thật Ở 2 Viền Góc + Con Dấu Sáp Bướm Vàng */}
          <div
            onClick={handleOpenEnvelope}
            className="cursor-pointer relative w-[286px] sm:w-[320px] h-[192px] sm:h-[212px] my-2 select-none group"
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
                    style={{ fontFamily: "'Lobster Two', cursive" }}
                    className="text-2xl sm:text-3xl font-normal tracking-wide text-[#2B2523]"
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
                  className="font-handwritten-minimal text-3xl sm:text-4xl text-center text-[#3A302C] mb-2"
                >
                  Tháng 11 - 2026
                </motion.p>

                {/* Khung Lịch Đè Lên Ảnh Cưới Có Viền Mờ Trắng Trên/Dưới Giống Hệt Video */}
                <div className="relative w-full aspect-[4/3.1] overflow-hidden">
                  <img
                    src={data.sectionImages.countdown}
                    alt="Tháng 11 - 2026"
                    className="w-full h-full object-cover object-[center_28%] opacity-85"
                  />
                  {/* Lớp sương mờ trắng ở mép trên & mép dưới giống hệt video */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-white/25 to-[#FAF8F5]" />

                  {/* Lưới Lịch Tháng 11/2026 */}
                  <div className="absolute inset-0 px-6 sm:px-8 py-4 flex flex-col justify-center">
                    <div className="grid grid-cols-7 text-center mb-2">
                      {weekDays.map((wd) => (
                        <span
                          key={wd}
                          className="font-condensed-minimal text-[10px] sm:text-[11px] tracking-[0.08em] text-[#3A302C] font-normal"
                        >
                          {wd}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-y-1.5 text-center">
                      {Array.from({ length: emptyLeading }).map((_, idx) => (
                        <div key={`empty-${idx}`} className="h-6 sm:h-7" />
                      ))}
                      {Array.from({ length: totalDays }).map((_, idx) => {
                        const day = idx + 1;
                        const isSpecial = day === 27 || day === 28;
                        return (
                          <div
                            key={day}
                            className="relative h-6 sm:h-7 flex items-center justify-center"
                          >
                            {isSpecial && (
                              <Heart
                                className={`pointer-events-none absolute w-7 h-7 sm:w-8 sm:h-8 ${
                                  day === 28
                                    ? 'fill-white text-white drop-shadow-[0_2px_6px_rgba(90,24,36,0.35)] scale-110'
                                    : 'fill-white/85 text-white/90 drop-shadow-sm'
                                }`}
                              />
                            )}
                            <span
                              className={`relative z-10 font-condensed-minimal text-xs sm:text-sm ${
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
                <div className="relative px-6 pt-5 pb-4 text-center">
                  {/* ẢNH HOA VIỀN CẠNH PHẢI XOAY RỦ XUỐNG (Giống hệt giây 00:08 - 00:10 trong video) */}
                  <MinimalCallaBouquetImg
                    flipY
                    className="absolute -top-16 -right-8 w-36 sm:w-40 z-20 rotate-[14deg]"
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

                  <p className="font-condensed-minimal text-xs tracking-[0.14em] uppercase text-[#3A302C] mb-4">
                    HAPPILY EVER AFTER STARTS IN...
                  </p>

                  {/* 4 Ô Đếm Ngược Kem Mịn (NGÀY | GIỜ | PHÚT | GIÂY) */}
                  <div className="grid grid-cols-4 gap-2.5 max-w-xs mx-auto relative z-10">
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
                        className="rounded-xl bg-[#F3ECE4] border border-[#E6DDD2] py-3 px-1.5 text-center shadow-sm"
                      >
                        <span className="block font-condensed-minimal text-lg sm:text-xl font-normal text-[#2B2523]">
                          {String(item.val).padStart(2, '0')}
                        </span>
                        <span className="block font-condensed-minimal text-[10px] tracking-[0.1em] uppercase text-[#6E625C] mt-0.5">
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
              <section className="px-5 py-6 text-center relative">
                {/* Ảnh Đôi Đứng Chính Giữa Có Bó Hoa Rum Thật Ở Viền Cạnh Trái Dưới (Giống hệt giây 00:10 - 00:12) */}
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.65 }}
                  className="relative mx-auto w-[78%] max-w-[295px] bg-white p-2.5 shadow-[0_14px_35px_rgba(0,0,0,0.08)] border border-stone-200/80 mb-10"
                >
                  <div className="aspect-[3/4.1] overflow-hidden bg-stone-100">
                    <img
                      src={data.sectionImages.hero}
                      alt="Thành Long & Thanh Huyền"
                      className="w-full h-full object-cover object-[center_22%]"
                    />
                  </div>
                  {/* ẢNH HOA VIỀN CẠNH TRÁI DƯỚI KHUNG ẢNH ĐÔI */}
                  <MinimalCallaBouquetImg className="absolute -bottom-12 -left-12 w-34 sm:w-38 z-20 rotate-[8deg]" />
                </motion.div>

                {/* Lời Kính Mời */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  className="font-condensed-minimal text-xs sm:text-sm tracking-[0.08em] uppercase text-[#3A302C] leading-relaxed mb-7"
                >
                  <p>TRÂN TRỌNG KÍNH MỜI QUÝ KHÁCH</p>
                  <p>DÀNH THỜI GIAN QUÝ GIÁ THAM DỰ LỄ CƯỚI CỦA</p>
                </motion.div>

                {/* 2 Khung Polaroid Chú Rể & Cô Dâu Đặt Cạnh Nhau Giống Hệt Giây 00:12 */}
                <div className="grid grid-cols-2 gap-3.5 items-start px-1 relative z-10">
                  {/* Polaroid Chú Rể */}
                  <motion.div
                    initial={{ opacity: 0, x: -28, rotate: -3 }}
                    whileInView={{ opacity: 1, x: 0, rotate: -1.5 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white p-2 pb-4 shadow-[0_12px_28px_rgba(0,0,0,0.09)] border border-stone-200/80"
                  >
                    <div className="aspect-[3/3.8] overflow-hidden bg-stone-100 mb-2">
                      <img
                        src={data.groom.avatar}
                        alt={data.groom.fullName}
                        className="w-full h-full object-cover object-[center_18%]"
                      />
                    </div>
                    <p className="font-handwritten-minimal text-2xl text-[#3A302C] leading-none">
                      Chú rể
                    </p>
                    <p className="font-condensed-minimal text-xs sm:text-sm tracking-[0.1em] uppercase text-[#2B2523] mt-1">
                      {data.groom.shortName}
                    </p>
                  </motion.div>

                  {/* Polaroid Cô Dâu (Nghiêng nhẹ sang phải giống hệt video) */}
                  <motion.div
                    initial={{ opacity: 0, x: 28, rotate: 6 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 3.5 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.6, delay: 0.08 }}
                    className="bg-white p-2 pb-4 shadow-[0_12px_28px_rgba(0,0,0,0.09)] border border-stone-200/80 mt-2"
                  >
                    <div className="aspect-[3/3.8] overflow-hidden bg-stone-100 mb-2">
                      <img
                        src={data.bride.avatar}
                        alt={data.bride.fullName}
                        className="w-full h-full object-cover object-[center_18%]"
                      />
                    </div>
                    <p className="font-handwritten-minimal text-2xl text-[#3A302C] leading-none">
                      Cô dâu
                    </p>
                    <p className="font-condensed-minimal text-xs sm:text-sm tracking-[0.1em] uppercase text-[#2B2523] mt-1">
                      {data.bride.shortName}
                    </p>
                  </motion.div>
                </div>

                {/* ẢNH 2 CÀNH HOA RUM ĐỎ RƯỢU NẰM NGHIÊNG BÊN DƯỚI ẢNH CÔ DÂU RA VIỀN CẠNH PHẢI (Giống hệt giây 00:13) */}
                <div className="relative h-16 -mt-3 mb-2 flex justify-end">
                  <DiagonalCallaStemsImg className="w-48 sm:w-56 -mr-4 rotate-[-6deg] z-20" />
                </div>

                {/* Thông Tin Hai Bên Gia Đình (NHÀ TRAI | NHÀ GÁI) */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  className="grid grid-cols-2 gap-4 pt-1 pb-4 font-condensed-minimal text-xs tracking-[0.06em] uppercase text-[#3A302C]"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-[#2B2523]">NHÀ TRAI</p>
                    <p>{data.groom.fullName}</p>
                    <p className="text-[11px] text-[#6E625C]">VIỆT TIẾN - HƯNG YÊN</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-[#2B2523]">NHÀ GÁI</p>
                    <p>{data.bride.fullName}</p>
                    <p className="text-[11px] text-[#6E625C]">TRIỆU VIỆT VƯƠNG - HƯNG YÊN</p>
                  </div>
                </motion.div>
              </section>

              {/* =====================================================================
                  PHẦN 4: CÁC THẺ SỰ KIỆN BỮA CƠM THÂN MẬT & LỄ CƯỚI (00:13 -> 00:16)
                 ===================================================================== */}
              <section id="section-events" className="px-5 py-4 space-y-5 relative">
                {minimalEvents.map((ev, idx) => (
                  <motion.div
                    key={ev.id}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.22 }}
                    transition={{ duration: 0.55, delay: idx * 0.05 }}
                    className="relative rounded-2xl bg-[#F4EFEA] border border-[#E5DDD3] px-5 py-6 text-center shadow-[0_10px_28px_rgba(43,37,35,0.06)]"
                  >
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

                    <a
                      href={ev.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-52 py-2 rounded-full border border-[#3A302C] font-condensed-minimal text-xs tracking-[0.12em] uppercase text-[#2B2523] hover:bg-[#2B2523] hover:text-white transition-colors"
                    >
                      XEM BẢN ĐỒ
                    </a>
                  </motion.div>
                ))}
              </section>

              {/* =====================================================================
                  PHẦN 5: ALBUM HÌNH CƯỚI — LƯỚI 2 CỘT SO LE KÈM ANIMATION CUỘN (00:16 -> 00:19)
                 ===================================================================== */}
              <section id="section-gallery" className="px-5 pt-8 pb-6 relative">
                {/* Tiêu đề chữ ký + Đường kẻ ngang bên phải giống hệt giây 00:16 */}
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="font-handwritten-minimal text-3xl sm:text-4xl text-[#2B2523] shrink-0">
                    Album Hình Cưới
                  </h2>
                  <span className="flex-1 h-[1px] bg-stone-400/80 mt-1" />
                </div>

                <p className="font-condensed-minimal text-[11px] sm:text-xs tracking-[0.04em] uppercase text-[#4E433E] leading-relaxed text-justify mb-6">
                  CUỐN ALBUM NÀY GHI LẠI NHỮNG KHOẢNH KHẮC ĐẸP NHẤT TRONG NGÀY ĐẶC BIỆT CỦA CHÚNG TÔI - TRÀN ĐẦY YÊU THƯƠNG, HẠNH PHÚC VÀ NHỮNG KỶ NIỆM KHÓ QUÊN. MỖI BỨC ẢNH ĐỀU KỂ MỘT CÂU CHUYỆN VỀ HÀNH TRÌNH CỦA CHÚNG TÔI. GIỮA VÒNG TAY CỦA GIA ĐÌNH VÀ BẠN BÈ, CHÚNG TÔI ĐÃ CÙNG NHAU ĐÁNH DẤU MỘT TÌNH YÊU BỀN VỮNG THEO NĂM THÁNG.
                </p>

                {/* Lưới 2 Cột So Le (Staggered Masonry-style Grid) */}
                <div className="grid grid-cols-2 gap-3 items-start">
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
              <section id="section-wishes" className="px-5 pt-8 pb-8 relative">
                {/* Điểm xuyết hoa Rum ở viền cạnh phải phía trên form */}
                <MinimalCallaBouquetImg
                  flipX
                  className="absolute -top-6 -right-9 w-28 sm:w-32 opacity-90 z-10 rotate-[-12deg]"
                />

                <p className="font-condensed-minimal text-[11px] sm:text-xs tracking-[0.04em] uppercase text-[#3A302C] leading-relaxed mb-5 pr-12">
                  HÃY XÁC NHẬN SỰ CÓ MẶT CỦA QUÝ KHÁCH ĐỂ GIA ĐÌNH CHÚNG TÔI CHUẨN BỊ ĐÓN TIẾP MỘT CÁCH CHU ĐÁO NHẤT. TRÂN TRỌNG!
                </p>

                <form onSubmit={handleSubmitForm} className="space-y-3 relative z-20">
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
                    value={guestRelation}
                    onChange={(e) => setGuestRelation(e.target.value)}
                    placeholder="BẠN LÀ GÌ CỦA DÂU RỂ?"
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

                  <button
                    type="submit"
                    className="cursor-pointer w-full rounded-full bg-[#1C1C1C] hover:bg-stone-800 text-white py-3.5 font-condensed-minimal text-xs tracking-[0.1em] uppercase transition-colors shadow-md"
                  >
                    GỬI LỜI CHÚC &amp; XÁC NHẬN THAM DỰ
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
                </form>

                {/* Danh sách lời chúc đã gửi (nếu có) */}
                {wishes.length > 0 && (
                  <div className="mt-6 space-y-2.5 relative z-20">
                    <p className="font-condensed-minimal text-xs uppercase tracking-[0.1em] text-[#5C504A]">
                      LỜI CHÚC TỪ NGƯỜI THƯƠNG ({wishes.length})
                    </p>
                    <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                      {wishes.map((w) => (
                        <div
                          key={w.id}
                          className="rounded-xl bg-[#F4EFEA] border border-[#E5DDD3] px-4 py-3 text-left"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-condensed-minimal text-xs uppercase font-medium text-[#2B2523]">
                              {w.name}
                            </span>
                            <span className="text-[10px] text-stone-500">{w.createdAt}</span>
                          </div>
                          <p className="text-xs text-[#4E433E] mt-1">“{w.message}”</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* =====================================================================
                    TUYỆT TÁC HỘP QUÀ MỪNG CƯỚI 3D (HIỂN THỊ TRỰC TIẾP, ẤN VÀO MỚI MỞ MÃ QR)
                   ===================================================================== */}
                <div
                  id="section-qr-gift"
                  className="mt-10 pt-7 border-t border-stone-300/70 text-center relative scroll-mt-20"
                >
                  {/* Điểm xuyết bó hoa Rum ở viền cạnh trái của khu vực Hộp Quà */}
                  <MinimalCallaBouquetImg className="absolute -top-8 -left-9 w-28 sm:w-32 opacity-95 z-10 rotate-[10deg]" />

                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F4EFEA] border border-[#DFD5C8] text-[#5A1824] font-condensed-minimal text-[11px] tracking-[0.14em] uppercase mb-1.5">
                    <Gift className="w-3.5 h-3.5" />
                    <span>WEDDING GIFT • MỪNG CƯỚI</span>
                  </div>

                  <h3 className="font-handwritten-minimal text-4xl text-[#3A302C]">
                    Hộp Quà Mừng Cưới
                  </h3>
                  <p className="font-condensed-minimal text-xs tracking-[0.06em] uppercase text-[#5C504A] mt-0.5 mb-5">
                    {!isGiftBoxOpen
                      ? 'CHẠM VÀO HỘP QUÀ BÊN DƯỚI ĐỂ MỞ MÃ QR MỪNG CƯỚI'
                      : 'CHẠM VÀO MÃ QR ĐỂ PHÓNG TO HOẶC SAO CHÉP SỐ TÀI KHOẢN'}
                  </p>

                  <AnimatePresence mode="wait">
                    {!isGiftBoxOpen ? (
                      /* TRẠNG THÁI 1: HỘP QUÀ 3D ĐÓNG KÍN — ẤN VÀO MỚI BUNG NẮP HIỆN QR */
                      <motion.div
                        key="minimal-closed-gift-box"
                        initial={{ opacity: 0, scale: 0.92, y: 14 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          scale: 1.06,
                          filter: 'blur(4px)',
                          transition: { duration: 0.35 },
                        }}
                        className="relative flex flex-col items-center justify-center py-3 select-none"
                      >
                        {/* Hào quang ấm áp phía sau hộp quà */}
                        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-gradient-to-r from-amber-300/25 via-rose-300/20 to-amber-400/25 blur-2xl animate-pulse" />

                        <motion.div
                          onClick={handleOpenGiftBox}
                          whileHover={{ scale: 1.03, y: -3 }}
                          whileTap={{ scale: 0.96 }}
                          animate={
                            isBoxUnwrapping
                              ? { rotate: [0, -3, 3, -4, 4, 0], scale: [1, 1.05, 1.1] }
                              : { y: [0, -6, 0] }
                          }
                          transition={
                            isBoxUnwrapping
                              ? { duration: 0.55 }
                              : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                          }
                          className="cursor-pointer relative z-20 flex flex-col items-center w-full max-w-[250px] sm:max-w-[270px] group"
                        >
                          {/* 1. Nơ lụa vàng kim 3D trên đỉnh */}
                          <MinimalSilkBow3D isUnwrapping={isBoxUnwrapping} />

                          {/* 2. Nắp hộp quà 3D */}
                          <motion.div
                            animate={
                              isBoxUnwrapping
                                ? { y: -65, rotateX: 45, rotateZ: -6, scale: 1.08, opacity: 0 }
                                : { y: 0, rotateX: 0, rotateZ: 0, scale: 1, opacity: 1 }
                            }
                            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                              background:
                                'linear-gradient(135deg, #7A2032 0%, #561321 55%, #360913 100%)',
                            }}
                            className="relative z-20 w-[106%] h-12 rounded-2xl border-2 border-[#F5D77F] shadow-[0_12px_26px_rgba(45,10,18,0.4)] flex items-center justify-center overflow-hidden"
                          >
                            <div className="pointer-events-none absolute inset-1.5 rounded-xl border border-[#FDE68A]/35" />
                            <div className="pointer-events-none absolute inset-x-0 h-2.5 bg-gradient-to-r from-[#B88728] via-[#FFF2B2] to-[#B88728] opacity-85" />
                            <div className="pointer-events-none relative z-10 w-9 h-full bg-gradient-to-r from-[#B88728] via-[#FFF4C2] to-[#B88728] border-x border-white/50 shadow-md" />
                          </motion.div>

                          {/* 3. Thân hộp quà 3D tinh gọn — chỉ có nút hướng dẫn chạm để mở */}
                          <div
                            style={{
                              background:
                                'linear-gradient(160deg, #6B1A2A 0%, #480F1B 55%, #2B070E 100%)',
                            }}
                            className="relative z-10 w-full h-44 rounded-b-[26px] rounded-t-[6px] border-2 border-t-0 border-[#F5D77F] p-5 shadow-[0_22px_50px_rgba(45,10,18,0.38)] flex flex-col items-center justify-center overflow-hidden"
                          >
                            <div className="pointer-events-none absolute inset-2 rounded-[18px] border border-[#FDE68A]/35" />
                            {/* Ruy-băng dọc & ngang */}
                            <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-9 bg-gradient-to-r from-[#B88728] via-[#FFF4C2] to-[#B88728] border-x border-white/50 shadow-md" />
                            <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-7 bg-gradient-to-b from-[#B88728] via-[#FFF4C2] to-[#B88728] border-y border-white/40 shadow-md" />

                            {/* Nút hướng dẫn ấn để mở */}
                            <div className="relative z-20 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFF6D6] via-[#FDE68A] to-[#F59E0B] text-stone-950 font-condensed-minimal text-xs font-medium tracking-[0.12em] uppercase shadow-[0_10px_25px_rgba(0,0,0,0.45)] border-2 border-white group-hover:scale-105 transition-transform">
                              <LockOpen className="w-3.5 h-3.5 text-amber-950 animate-bounce shrink-0" />
                              <span>CHẠM ĐỂ MỞ HỘP QUÀ</span>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    ) : (
                      /* TRẠNG THÁI 2: HỘP QUÀ ĐÃ MỞ — HIỂN THỊ 2 MÃ QR CỦA CHÚ RỂ & CÔ DÂU */
                      <motion.div
                        key="minimal-opened-qr-cards"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl bg-[#F4EFEA] border border-[#E5DDD3] p-4 sm:p-5 text-center shadow-sm"
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

                        <div className="grid grid-cols-1 gap-4">
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
                              className="rounded-xl bg-white p-4 border border-stone-200/90 shadow-sm text-center"
                            >
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
              <section className="relative w-full aspect-[4/4.8] overflow-hidden">
                <img
                  src={data.sectionImages.thankYouBg}
                  alt="Lời cảm ơn"
                  className="w-full h-full object-cover object-[center_75%]"
                />
                {/* Dải băng trắng mờ đặt ở phía trên bức hình (vùng rèm trắng) để không che cô dâu chú rể */}
                <div className="absolute inset-x-0 top-3 bg-white/78 backdrop-blur-[2px] py-3.5 px-5 text-center shadow-sm">
                  <h2 className="font-handwritten-minimal text-3xl sm:text-4xl text-[#2B2523] mb-1">
                    Lời cảm ơn!
                  </h2>
                  <p className="font-condensed-minimal text-[11px] sm:text-xs tracking-[0.04em] uppercase text-[#2B2523] leading-relaxed">
                    CẢM ƠN QUÝ KHÁCH ĐÃ DÀNH TÌNH CẢM CHO GIA ĐÌNH CHÚNG TÔI! SỰ HIỆN DIỆN CỦA QUÝ KHÁCH CHÍNH LÀ MÓN QUÀ Ý NGHĨA NHẤT, GIA ĐÌNH CHÚNG TÔI VÔ CÙNG TRÂN QUÝ KHI ĐƯỢC CÙNG QUÝ KHÁCH CHIA SẺ NIỀM HẠNH PHÚC TRONG NGÀY TRỌNG ĐẠI NÀY.
                  </p>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nút Nhạc Tròn Nổi Ở Góc Dưới Phải Giống Hệt Video Mẫu */}
        <button
          type="button"
          onClick={onToggleMusic}
          aria-label="Bật/Tắt nhạc"
          className="cursor-pointer fixed bottom-20 right-4 z-40 w-11 h-11 rounded-full bg-white/92 border border-[#2B2523] shadow-lg flex items-center justify-center text-[#2B2523] hover:scale-105 transition-transform"
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
