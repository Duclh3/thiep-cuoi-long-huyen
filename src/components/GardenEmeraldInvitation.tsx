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
  Camera,
  Utensils,
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
  Volume2,
  VolumeX,
} from 'lucide-react';
import { WeddingData, WishItem } from '../data/weddingData';
import { soundEngine } from '../utils/soundEngine';
import { AmbientCanvas } from './AmbientCanvas';

interface GardenEmeraldInvitationProps {
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
 * Con Dấu Sáp Xanh Ngọc Bích 3D (Emerald Green Wax Seal)
 */
const EmeraldWaxSeal: React.FC<{ isOpening?: boolean }> = ({ isOpening }) => (
  <motion.div
    animate={
      isOpening
        ? { scale: [1, 1.25, 0.2], rotate: [0, -15, 25], opacity: [1, 1, 0] }
        : { scale: [1, 1.06, 1] }
    }
    transition={
      isOpening
        ? { duration: 0.6, ease: 'easeInOut' }
        : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
    }
    className="relative w-15 h-15 sm:w-18 sm:h-18 rounded-full flex items-center justify-center select-none shadow-[0_10px_25px_rgba(20,45,28,0.55)] cursor-pointer"
    style={{
      background: 'radial-gradient(circle at 35% 30%, #529664 0%, #2A5A37 55%, #14351C 100%)',
      boxShadow:
        '0 10px 25px rgba(18, 48, 25, 0.55), inset 0 2px 4px rgba(255,255,255,0.35), inset 0 -3px 6px rgba(0,0,0,0.6)',
    }}
  >
    <div className="w-[84%] h-[84%] rounded-full border border-[#8FE0A4]/70 shadow-inner flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-[#EAF7EE] drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
        <span className="font-serif-luxury font-bold text-xs sm:text-sm tracking-wider">Đ &amp; H</span>
        <Sparkles className="w-2.5 h-2.5 text-[#FFE082] mt-0.5 animate-pulse" />
      </div>
    </div>
  </motion.div>
);

/**
 * Chùm hoa Calla trắng & Lá xanh ngọc trang trí góc phong bì
 */
const WhiteCallaBouquetDecoration: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 100 110" className="w-24 sm:w-28 h-24 sm:h-28 drop-shadow-[0_6px_14px_rgba(0,0,0,0.25)]">
      <defs>
        <linearGradient id="whitePetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="65%" stopColor="#F4F8F4" />
          <stop offset="100%" stopColor="#D5E6D8" />
        </linearGradient>
        <linearGradient id="greenStem" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7DAE84" />
          <stop offset="100%" stopColor="#3E6B47" />
        </linearGradient>
        <linearGradient id="yellowSpadix" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF176" />
          <stop offset="100%" stopColor="#FBC02D" />
        </linearGradient>
      </defs>
      {/* Lá xanh */}
      <path d="M 30 50 Q 15 20 40 10 Q 50 30 35 55" fill="#4D7C55" opacity="0.85" />
      <path d="M 60 55 Q 85 30 65 15 Q 50 35 58 60" fill="#3E6B47" opacity="0.9" />
      {/* Cuống hoa */}
      <path d="M 45 40 Q 40 75 30 105" stroke="url(#greenStem)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M 52 45 Q 50 80 45 108" stroke="url(#greenStem)" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Hoa Calla trắng 1 */}
      <path d="M 46 42 C 30 38 25 15 48 8 C 65 6 72 25 58 40 Z" fill="url(#whitePetal)" stroke="#E0ECE2" strokeWidth="0.8" />
      <path d="M 48 20 Q 49 14 50 10" stroke="url(#yellowSpadix)" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Hoa Calla trắng 2 */}
      <path d="M 32 50 C 20 44 18 26 35 20 C 48 18 52 33 42 48 Z" fill="url(#whitePetal)" stroke="#E0ECE2" strokeWidth="0.8" opacity="0.95" />
      {/* Dải ren trắng rủ */}
      <path d="M 35 90 Q 25 105 32 110 M 42 95 Q 50 108 45 110" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="2,2" fill="none" />
    </svg>
  </div>
);

/**
 * Khung Oval Ren Hoa & Hạt Ngọc Trai Trắng (Khung Lễ Thành Hôn giống video mẫu 1)
 */
const EmeraldLaceOvalFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[390px] p-5 sm:p-7">
    {/* Vòng chuỗi ngọc trai 3D quấn quanh góc ngoài */}
    <div className="pointer-events-none absolute -top-5 -right-5 sm:-top-7 sm:-right-7 w-32 sm:w-40 h-32 sm:h-40 opacity-75">
      <svg viewBox="0 0 140 140" className="w-full h-full">
        {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135].map((pos, idx) => (
          <circle
            key={idx}
            cx={20 + idx * 10}
            cy={120 - idx * 9}
            r={idx % 2 === 0 ? 4.5 : 3.5}
            fill="url(#pearlGreenGrad)"
            stroke="#BDD9C1"
            strokeWidth="0.5"
            className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)]"
          />
        ))}
        <defs>
          <radialGradient id="pearlGreenGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F5FAF6" />
            <stop offset="90%" stopColor="#D5E8D9" />
            <stop offset="100%" stopColor="#9EBEA3" />
          </radialGradient>
        </defs>
      </svg>
    </div>

    {/* Viền ren hoa Oval chính */}
    <div
      className="relative rounded-[50%/42%] p-5 sm:p-7 border-2 border-dashed border-[#83B98E]/70 bg-gradient-to-b from-[#FFFDFB] via-[#F8FAF7] to-[#EEF5EF] shadow-[0_16px_36px_rgba(30,70,40,0.12)]"
      style={{
        boxShadow:
          '0 14px 34px rgba(25, 65, 35, 0.12), inset 0 0 0 6px #FFFFFF, inset 0 0 0 8px rgba(131, 185, 142, 0.4)',
      }}
    >
      {/* Vòng chấm ren hoa văn viền oval */}
      <div className="pointer-events-none absolute inset-2 rounded-[50%/42%] border border-dotted border-[#4D8259]/40" />

      {/* Nội dung bên trong khung oval */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {children}
      </div>

      {/* Bông hoa Calla trắng điểm xuyết góc dưới phải (giống frame_004) */}
      <div className="pointer-events-none absolute -bottom-5 -right-3 sm:-bottom-7 sm:-right-4 w-18 sm:w-22 h-20 sm:h-24">
        <svg viewBox="0 0 90 100" className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
          <path d="M 25 85 Q 45 55 52 28" stroke="#3E6B47" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path
            d="M 52 28 C 68 22 72 8 54 4 C 40 2 36 18 47 30 Z"
            fill="url(#whitePetalSingle)"
            stroke="#D3E4D6"
            strokeWidth="0.8"
          />
          <path d="M 53 14 Q 54 10 55 7" stroke="#FBC02D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <defs>
            <linearGradient id="whitePetalSingle" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#F5F9F6" />
              <stop offset="100%" stopColor="#D5E8D9" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  </div>
);

export const GardenEmeraldInvitation: React.FC<GardenEmeraldInvitationProps> = ({
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

  // Gallery ảnh dâu rể
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);

  // Đếm ngược trực tiếp (Begins in... giống frame_002)
  const [countdownSeconds, setCountdownSeconds] = useState(33 * 86400 + 6 * 3600 + 50 * 60 + 28);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSec: number) => {
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    const pad = (n: number) => String(n).padStart(2, '0');
    return {
      days: pad(days),
      hours: pad(hours),
      minutes: pad(minutes),
      seconds: pad(seconds),
    };
  };

  const timeParts = formatCountdown(countdownSeconds);

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
    soundEngine.playOpenChime();
    onStartMusic();
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#2D5A3A', '#83C294', '#D4AF37', '#FFFDF9'],
    });
  };

  const handleOpenGiftBox = () => {
    if (isGiftBoxOpen || isBoxUnwrapping) return;
    setIsBoxUnwrapping(true);
    soundEngine.playOpenChime();
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
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#2D5A3A', '#D4AF37', '#E8F2EA'],
    });
    setWishSubmitted(true);
    setGuestWish('');
    setTimeout(() => setWishSubmitted(false), 4000);
  };

  // Timeline sự kiện (giống 100% Video 1 frame_006)
  const timelineEvents = [
    {
      time: '09:00',
      title: 'ĐÓN KHÁCH',
      desc: 'Chụp hình kỷ niệm & Thưởng thức trà bánh',
      icon: <Camera className="w-4 h-4 text-[#2D5A3A]" />,
      side: 'left',
    },
    {
      time: '10:00',
      title: 'LỄ THÀNH HÔN',
      desc: 'Trao nhẫn cưới & Nguyện ước trăm năm',
      icon: <Sparkles className="w-4 h-4 text-[#2D5A3A]" />,
      side: 'right',
    },
    {
      time: '10:15',
      title: 'KHAI TIỆC MỪNG',
      desc: 'Nâng ly chúc mừng hạnh phúc dâu rể',
      icon: <Utensils className="w-4 h-4 text-[#2D5A3A]" />,
      side: 'left',
    },
    {
      time: '11:30',
      title: 'ÂM NHẠC & CHỤP ẢNH',
      desc: 'Lưu giữ những khoảnh khắc đáng nhớ',
      icon: <Music className="w-4 h-4 text-[#2D5A3A]" />,
      side: 'right',
    },
  ];

  // Dress code 4 màu (giống Video 1 frame_006)
  const dressCodeColors = [
    { name: 'Đen Sang Trọng', hex: '#1C1C1C', border: 'border-stone-400' },
    { name: 'Xanh Olive', hex: '#3E5C3B', border: 'border-[#3E5C3B]' },
    { name: 'Nâu Đất', hex: '#5E4A35', border: 'border-[#5E4A35]' },
    { name: 'Be Sữa', hex: '#E7DFD3', border: 'border-[#D1C6B7]' },
  ];

  // Danh sách ảnh album của Đức & Hậu
  const galleryPhotos = data.album9Images.map((img) => img.url);

  return (
    <div className="min-h-screen w-full bg-[#16271B] text-[#1F2E23] flex justify-center items-start overflow-x-hidden md:py-10 md:px-6 relative">
      {/* LỚP 1: TRANH SƠN DẦU VƯỜN HOA HỒNG TRẮNG NGHỆ THUẬT TOÀN MÀN HÌNH */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none opacity-45 filter blur-[1.5px]"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1600&auto=format&fit=crop")',
        }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#16271B]/85 via-[#16271B]/70 to-[#16271B]/95 pointer-events-none" />

      {/* LỚP 2: ĐỘNG CƠ CÁNH HOA HỒNG TRẮNG BAY & BỤI SAO XANH NGỌC LUNG LINH */}
      <AmbientCanvas styleId="garden" />

      {/* Nút Admin kín đáo ngoài màn hình khi thiệp chưa mở */}
      {!isEnvelopeOpen && onOpenAdmin && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenAdmin();
          }}
          title="Quản trị"
          className="cursor-pointer fixed top-2.5 left-2.5 z-50 p-2 text-white/35 hover:text-white opacity-35 hover:opacity-100 transition-all rounded-full"
          aria-label="Admin"
        >
          <Lock className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Nút Bật/Tắt Nhạc Tròn Nhỏ Gọn Ở Góc Trên Phải */}
      <div className="fixed top-3 right-3 z-50 flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleMusic}
          className="cursor-pointer w-10 h-10 rounded-full bg-stone-900/80 backdrop-blur-md border border-[#83C294]/50 shadow-lg flex items-center justify-center text-white hover:scale-105 transition-transform"
          title={isMusicPlaying ? 'Tắt nhạc' : 'Phát nhạc'}
          aria-label="Nhạc nền"
        >
          {isMusicPlaying ? (
            <Music className="w-4 h-4 text-[#83C294] animate-spin" style={{ animationDuration: '4s' }} />
          ) : (
            <VolumeX className="w-4 h-4 text-stone-300" />
          )}
        </button>
      </div>

      {/* Khung Thiệp Dọc Mobile-First */}
      <div
        className={`w-full max-w-[460px] md:max-w-3xl lg:max-w-4xl bg-[#FAFBF9] shadow-[0_25px_80px_rgba(0,0,0,0.55)] md:rounded-3xl md:border md:border-[#D6E0D4] relative z-10 overflow-hidden transition-all duration-500 ${
          isEnvelopeOpen ? 'pb-14' : 'min-h-[100dvh] md:min-h-[780px] flex flex-col justify-center'
        }`}
      >
        {/* Thanh Tiêu Đề Mảnh Căn Giữa */}
        <div className="sticky top-0 z-40 bg-[#FAFBF9]/95 backdrop-blur-md border-b border-[#E0E8DE] px-4 md:px-8 py-3 flex items-center justify-center text-[#2D5A3A]">
          <span className="font-serif-luxury text-xs sm:text-sm tracking-[0.14em] uppercase font-semibold text-center">
            THIỆP MỜI CƯỚI {data.groom.shortName} &amp; {data.bride.shortName}
          </span>
        </div>

        {/* =====================================================================
            PHẦN 1: PHONG BÌ 3D TƯƠNG TÁC MỞ ĐẦU (GARDEN EMERALD 3D ENVELOPE)
            Mô phỏng 100% video mẫu 1: Chạm sáp -> Nắp mở 3D -> Thiệp & Polaroid trồi lên -> Countdown Begins in
           ===================================================================== */}
        <section
          className={`relative w-full flex flex-col items-center justify-center transition-all duration-700 px-4 sm:px-6 ${
            isEnvelopeOpen ? 'py-8 border-b border-[#E0E8DE]' : 'py-12 my-auto'
          }`}
        >
          {/* Lời Mời Trang Trọng & Tên Khách Mời */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 sm:mb-8"
          >
            <p className="font-serif-luxury text-xs sm:text-sm uppercase tracking-[0.24em] text-[#44684E] mb-2 font-medium">
              TRÂN TRỌNG KÍNH MỜI
            </p>
            <p className="font-script-luxury text-3xl sm:text-4xl md:text-5xl text-[#2D5A3A]">
              {guestName || 'Bạn & Người Thương'}
            </p>
          </motion.div>

          {/* VỎ PHONG BÌ 3D MÀU TRẮNG KEM REN HOA (EMERALD WAX SEAL) */}
          <div
            onClick={handleOpenEnvelope}
            className="cursor-pointer relative w-[295px] sm:w-[335px] h-[198px] sm:h-[220px] my-3 select-none group"
            style={{ perspective: '1200px' }}
          >
            {/* Chùm hoa trắng & lá xanh góc trên trái phong bì (frame_001) */}
            <WhiteCallaBouquetDecoration className="absolute -top-12 -left-8 z-30 -rotate-6" />

            {/* Chùm hoa calla trắng & ren góc dưới phải (frame_002) */}
            {isEnvelopeOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute -bottom-14 -right-8 z-30"
              >
                <WhiteCallaBouquetDecoration className="rotate-12" />
              </motion.div>
            )}

            {/* Nền mặt trong phong bì */}
            <div
              className="absolute inset-0 rounded-lg shadow-[0_18px_45px_rgba(25,50,30,0.18)] border border-[#E3ECE3]"
              style={{ background: 'linear-gradient(180deg, #F3F7F3 0%, #E6EFE6 100%)' }}
            />

            {/* THIỆP OVAL & 2 TẤM POLAROID TRỒI LÊN TỪ TRONG PHONG BÌ KHI MỞ (GIỐNG HỆT FRAME 002) */}
            <AnimatePresence>
              {isEnvelopeOpen && (
                <>
                  {/* Polaroid 1 (Nụ hôn dâu rể) trồi lệch sang trái */}
                  <motion.div
                    key="garden-polaroid-1"
                    initial={{ y: 30, x: -10, rotate: 0, opacity: 0, scale: 0.8 }}
                    animate={{ y: -65, x: -75, rotate: -8, opacity: 1, scale: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 top-2 -translate-x-1/2 z-15 w-[125px] sm:w-[138px] bg-white p-1.5 pb-4 shadow-[0_12px_26px_rgba(0,0,0,0.18)] border border-stone-200"
                  >
                    <div className="aspect-[3/3.6] w-full overflow-hidden bg-stone-100">
                      <img
                        src={data.sectionImages.kissPhoto}
                        alt="Đức & Hậu"
                        className="w-full h-full object-cover object-[center_24%]"
                      />
                    </div>
                    <p className="font-script-luxury text-base text-[#2D5A3A] text-center mt-1 leading-none">
                      Đức &amp; Hậu
                    </p>
                  </motion.div>

                  {/* Polaroid 2 (Chân dung) trồi lệch nhẹ */}
                  <motion.div
                    key="garden-polaroid-2"
                    initial={{ y: 30, x: 0, rotate: 0, opacity: 0, scale: 0.8 }}
                    animate={{ y: -58, x: -28, rotate: -3, opacity: 1, scale: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 top-2 -translate-x-1/2 z-16 w-[125px] sm:w-[138px] bg-white p-1.5 pb-4 shadow-[0_12px_26px_rgba(0,0,0,0.18)] border border-stone-200"
                  >
                    <div className="aspect-[3/3.6] w-full overflow-hidden bg-stone-100">
                      <img
                        src={data.sectionImages.hero}
                        alt="03.03.2024"
                        className="w-full h-full object-cover object-[center_20%]"
                      />
                    </div>
                    <p className="font-serif-luxury text-[10px] tracking-wider text-[#3E6B47] text-center mt-1.5 leading-none">
                      03.03.2024
                    </p>
                  </motion.div>

                  {/* Thiệp Oval "SAVE THE DATE" Trồi Lên Ở Giữa Lệch Phải (frame_002) */}
                  <motion.div
                    key="garden-open-oval-card"
                    initial={{ y: 35, x: 15, scale: 0.85, opacity: 0 }}
                    animate={{ y: -62, x: 55, scale: 1, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 top-2 -translate-x-1/2 z-18 w-[145px] sm:w-[160px] rounded-[50%/42%] bg-gradient-to-b from-white via-[#FAFDFB] to-[#EEF7F0] p-3 border-2 border-dashed border-[#83C294] shadow-[0_14px_30px_rgba(30,70,40,0.18)] flex flex-col items-center text-center"
                  >
                    <p className="font-serif-luxury text-[9px] uppercase tracking-[0.2em] text-[#44684E]">
                      SAVE THE DATE
                    </p>
                    <p className="font-serif-luxury font-bold text-xs text-[#2D5A3A] my-0.5">
                      03 | 03 | 2024
                    </p>
                    <p className="font-script-luxury text-xl text-[#2D5A3A] leading-tight">
                      Huy Đức
                      <span className="block text-xs font-serif-italic text-[#5C8563]">&amp;</span>
                      Phan Hậu
                    </p>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Thân trước phong bì (2 cánh bên + cánh dưới chữ V) */}
            <svg
              viewBox="0 0 360 240"
              className="pointer-events-none absolute inset-0 w-full h-full z-20 rounded-lg overflow-hidden"
              preserveAspectRatio="none"
            >
              <polygon points="0,0 180,126 0,240" fill="#FAFBF9" stroke="#DDE7DD" strokeWidth="1" />
              <polygon points="360,0 180,126 360,240" fill="#F4F7F4" stroke="#DDE7DD" strokeWidth="1" />
              <polygon points="0,240 180,118 360,240" fill="#FCFEFC" stroke="#D8E3D8" strokeWidth="1.2" />
            </svg>

            {/* Nắp trên phong bì (Lật mở 3D 180 độ khi mở thiệp) */}
            <motion.div
              initial={false}
              animate={{ rotateX: isEnvelopeOpen ? 180 : 0 }}
              transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
              style={{
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d',
                zIndex: isEnvelopeOpen ? 5 : 25,
              }}
              className="pointer-events-none absolute top-0 inset-x-0 h-[126px]"
            >
              <svg viewBox="0 0 360 126" className="w-full h-full" preserveAspectRatio="none">
                <polygon points="0,0 360,0 180,126" fill="#F6FAF6" stroke="#D3E0D3" strokeWidth="1.2" />
                {/* Viền ren hoa mềm mại dọc mép chữ V của nắp (frame_001) */}
                <path
                  d="M 10 10 L 180 120 L 350 10"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeDasharray="4,3"
                  fill="none"
                />
              </svg>
            </motion.div>

            {/* Con Dấu Sáp Xanh Ngọc Bích ở Tâm Phong Bì */}
            <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <EmeraldWaxSeal isOpening={isEnvelopeOpen} />
            </div>

            {/* Vòng sóng hướng dẫn chạm mở thiệp */}
            {!isEnvelopeOpen && (
              <motion.div
                animate={{ scale: [1, 1.45, 1], opacity: [0.8, 0.15, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="pointer-events-none absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-[#83C294]/70 z-20"
              />
            )}
          </div>

          {/* DÒNG ĐẾM NGƯỢC THỜI GIAN "BEGINS IN..." (GIỐNG HỆT FRAME 002 TRONG VIDEO) */}
          <div className="text-center mt-5">
            <p className="font-serif-luxury text-xs tracking-[0.24em] uppercase text-[#44684E] mb-1 font-semibold">
              BEGINS IN...
            </p>
            <div className="flex items-center justify-center gap-2 sm:gap-3 text-lg sm:text-2xl font-serif-luxury font-bold text-[#2D5A3A]">
              <div className="flex flex-col items-center">
                <span className="bg-white/90 px-2.5 py-1 rounded-lg border border-[#D5E6D8] shadow-xs">
                  {timeParts.days}
                </span>
                <span className="text-[9px] font-normal text-[#5C8563] uppercase mt-0.5">Ngày</span>
              </div>
              <span className="text-[#83C294] font-normal -mt-3">:</span>
              <div className="flex flex-col items-center">
                <span className="bg-white/90 px-2.5 py-1 rounded-lg border border-[#D5E6D8] shadow-xs">
                  {timeParts.hours}
                </span>
                <span className="text-[9px] font-normal text-[#5C8563] uppercase mt-0.5">Giờ</span>
              </div>
              <span className="text-[#83C294] font-normal -mt-3">:</span>
              <div className="flex flex-col items-center">
                <span className="bg-white/90 px-2.5 py-1 rounded-lg border border-[#D5E6D8] shadow-xs">
                  {timeParts.minutes}
                </span>
                <span className="text-[9px] font-normal text-[#5C8563] uppercase mt-0.5">Phút</span>
              </div>
              <span className="text-[#83C294] font-normal -mt-3">:</span>
              <div className="flex flex-col items-center">
                <span className="bg-white/90 px-2.5 py-1 rounded-lg border border-[#D5E6D8] shadow-xs text-emerald-700">
                  {timeParts.seconds}
                </span>
                <span className="text-[9px] font-normal text-[#5C8563] uppercase mt-0.5">Giây</span>
              </div>
            </div>

            {!isEnvelopeOpen && (
              <motion.p
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="text-xs text-[#2D5A3A] font-serif-italic mt-3 flex items-center justify-center gap-1.5"
              >
                <span>Chạm vào con dấu sáp để mở thiệp</span>
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              </motion.p>
            )}
          </div>
        </section>

        {/* =====================================================================
            PHẦN 2: NỘI DUNG THIỆP CHÍNH KHI ĐÃ MỞ (GARDEN EMERALD STYLE)
           ===================================================================== */}
        {isEnvelopeOpen && (
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-12 sm:space-y-16"
          >
            {/* HERO ẢNH CƯỚI ĐỨC & HẬU TRÀN VIỀN + DÒNG CHỮ "WE ARE Getting Married" */}
            <section className="relative w-full aspect-[4/5] sm:aspect-[16/10] overflow-hidden bg-stone-100">
              <motion.img
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                src={data.sectionImages.hero}
                alt="Lê Huy Đức & Phan Thị Hậu"
                className="w-full h-full object-cover object-[center_22%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#142B1A]/85 via-transparent to-black/25 flex flex-col justify-end p-6 sm:p-10 text-white text-center">
                <p className="font-serif-luxury text-xs sm:text-sm tracking-[0.28em] uppercase text-[#D2EBD7] mb-1">
                  WE ARE
                </p>
                <h2 className="font-script-luxury text-4xl sm:text-6xl text-[#E8F8EC] drop-shadow-md">
                  Getting Married
                </h2>
                <p className="font-serif-luxury text-xs sm:text-sm tracking-[0.16em] text-white/90 mt-2">
                  {data.groom.fullName} &amp; {data.bride.fullName}
                </p>
              </div>
            </section>

            {/* THÔNG TIN HAI BÊN GIA ĐÌNH & KHUNG OVAL LỄ THÀNH HÔN (GIỐNG FRAME 004) */}
            <section className="px-4 sm:px-8 space-y-6">
              {/* Hai bên gia đình */}
              <div className="grid grid-cols-2 gap-4 text-center max-w-md mx-auto py-2">
                <div className="space-y-1">
                  <p className="font-serif-luxury font-bold text-xs sm:text-sm tracking-wider text-[#2D5A3A]">
                    NHÀ TRAI
                  </p>
                  <p className="text-xs sm:text-sm text-[#1F2E23]">Ông. Lê Huy Báu</p>
                  <p className="text-xs sm:text-sm text-[#1F2E23]">Bà. Nguyễn Thị Nga</p>
                </div>
                <div className="space-y-1">
                  <p className="font-serif-luxury font-bold text-xs sm:text-sm tracking-wider text-[#2D5A3A]">
                    NHÀ GÁI
                  </p>
                  <p className="text-xs sm:text-sm text-[#1F2E23]">Ông. Phan Văn Hùng</p>
                  <p className="text-xs sm:text-sm text-[#1F2E23]">Bà. Vũ Thị Mai</p>
                </div>
              </div>

              {/* Lời mời hôn lễ */}
              <div className="text-center">
                <p className="font-serif-luxury text-xs sm:text-sm uppercase tracking-[0.18em] text-[#44684E]">
                  TRÂN TRỌNG KÍNH MỜI TỚI DỰ
                </p>
                <p className="font-serif-luxury font-bold text-sm sm:text-base text-[#2D5A3A] tracking-wider mt-0.5">
                  LỄ THÀNH HÔN CỦA GIA ĐÌNH CHÚNG MÌNH
                </p>
              </div>

              {/* KHUNG OVAL REN HOA NGỌC TRAI TINH XẢO (frame_004) */}
              <EmeraldLaceOvalFrame>
                {/* Tên dâu rể bằng chữ script mềm mại bay bổng */}
                <h3 className="font-script-luxury text-4xl sm:text-5xl text-[#2D5A3A] leading-tight mb-2">
                  Lê Huy Đức
                  <span className="block text-2xl sm:text-3xl font-serif-italic text-[#4D8259] my-0.5">&amp;</span>
                  Phan Thị Hậu
                </h3>

                <p className="font-serif-luxury text-[11px] sm:text-xs uppercase tracking-[0.16em] text-[#44684E] mt-1">
                  ĐƯỢC TỔ CHỨC VÀO LÚC
                </p>
                <p className="font-serif-luxury font-bold text-sm sm:text-base text-[#1F2E23] tracking-wider">
                  11:00, CHỦ NHẬT
                </p>

                {/* Bảng ô lịch Ngày - Tháng - Năm */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 my-3 text-xs sm:text-sm font-serif-luxury text-[#2D5A3A] border-y border-[#83C294]/50 py-1.5 w-full max-w-[240px]">
                  <span>THÁNG 03</span>
                  <span className="font-bold text-xl sm:text-2xl text-[#2D5A3A] px-2 border-x border-[#83C294]/50">
                    03
                  </span>
                  <span>NĂM 2024</span>
                </div>

                <p className="text-xs sm:text-sm font-serif-italic text-[#4F6C55] mb-3">
                  (Tức ngày 23 tháng 01 năm Giáp Thìn)
                </p>

                <p className="font-serif-luxury font-bold text-xs sm:text-sm uppercase tracking-wider text-[#2D5A3A]">
                  TẠI TƯ GIA NHÀ TRAI
                </p>
                <p className="text-xs sm:text-sm text-[#1F2E23] mt-0.5 mb-4">
                  Thôn Phú Xá - Xã Văn Môn - Huyện Yên Phong - Bắc Ninh
                </p>

                {/* Nút Chỉ Đường Google Maps */}
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://maps.google.com/?q=V%C4%83n+M%C3%B4n,+Y%C3%AAn+Phong,+B%E1%BA%AFc+Ninh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-[#2D5A3A] text-white text-xs font-serif-luxury uppercase tracking-wider font-semibold shadow-md hover:bg-[#1E3F27] transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#FFE082]" />
                  <span>CHỈ ĐƯỜNG</span>
                </motion.a>
              </EmeraldLaceOvalFrame>

              {/* Dòng chữ "Hân hạnh được đón tiếp" (frame_004) */}
              <div className="text-center pt-1">
                <p className="font-script-luxury text-3xl sm:text-4xl text-[#2D5A3A]">
                  Hân hạnh được đón tiếp
                </p>
              </div>
            </section>

            {/* =====================================================================
                PHẦN 3: TIMELINE LỊCH TRÌNH & DRESS CODE (GIỐNG HỆT FRAME 006 TRONG VIDEO 1)
               ===================================================================== */}
            <section className="px-4 sm:px-8 space-y-8">
              {/* Tiêu đề Timeline */}
              <div className="text-center">
                <h3 className="font-script-luxury text-4xl sm:text-5xl text-[#2D5A3A]">
                  Timeline
                </h3>
              </div>

              {/* TRỤC DỌC KẾT CHUỖI HẠT NGỌC TRAI 3D & 4 SỰ KIỆN */}
              <div className="relative max-w-sm mx-auto py-2">
                {/* Đường dây trục màu xanh ngọc ở tâm */}
                <div className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-0.5 bg-[#4D8259]" />

                <div className="space-y-8 relative z-10">
                  {timelineEvents.map((evt, idx) => {
                    const isLeft = evt.side === 'left';
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: isLeft ? -25 : 25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="flex items-center justify-between w-full"
                      >
                        {/* Cột trái */}
                        <div className={`w-[42%] text-right ${!isLeft ? 'opacity-0 pointer-events-none' : ''}`}>
                          <div className="inline-flex items-center justify-end gap-1.5 mb-0.5">
                            <span className="font-serif-luxury font-bold text-xs sm:text-sm text-[#1F2E23]">
                              {evt.time}
                            </span>
                            <span className="p-1 rounded-full bg-[#EAF5EC] border border-[#BDD9C1]">
                              {evt.icon}
                            </span>
                          </div>
                          <p className="font-serif-luxury font-bold text-xs text-[#2D5A3A] tracking-wider">
                            {evt.title}
                          </p>
                          <p className="text-[10px] text-[#4F6C55] mt-0.5 leading-snug">{evt.desc}</p>
                        </div>

                        {/* HẠT NGỌC TRAI 3D TRẮNG BÓNG Ở TRỌNG TÂM */}
                        <div className="relative z-20 shrink-0 w-5 h-5 rounded-full p-0.5 bg-gradient-to-br from-white via-[#E8F5EB] to-[#83C294] shadow-[0_2px_8px_rgba(30,70,40,0.3)] border border-white flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[#2D5A3A]" />
                        </div>

                        {/* Cột phải */}
                        <div className={`w-[42%] text-left ${isLeft ? 'opacity-0 pointer-events-none' : ''}`}>
                          <div className="inline-flex items-center justify-start gap-1.5 mb-0.5">
                            <span className="p-1 rounded-full bg-[#EAF5EC] border border-[#BDD9C1]">
                              {evt.icon}
                            </span>
                            <span className="font-serif-luxury font-bold text-xs sm:text-sm text-[#1F2E23]">
                              {evt.time}
                            </span>
                          </div>
                          <p className="font-serif-luxury font-bold text-xs text-[#2D5A3A] tracking-wider">
                            {evt.title}
                          </p>
                          <p className="text-[10px] text-[#4F6C55] mt-0.5 leading-snug">{evt.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* DRESS CODE 4 MÀU (GIỐNG FRAME 006) */}
              <div className="text-center pt-4">
                <h4 className="font-script-luxury text-3xl sm:text-4xl text-[#2D5A3A] mb-3">
                  Dress code
                </h4>
                <div className="flex items-center justify-center gap-3 sm:gap-4">
                  {dressCodeColors.map((color, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.15, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex flex-col items-center group cursor-pointer"
                    >
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 ${color.border} shadow-[0_4px_12px_rgba(0,0,0,0.18)] transition-transform`}
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[10px] text-[#3E5C44] mt-1.5 font-medium opacity-90 group-hover:opacity-100">
                        {color.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* =====================================================================
                PHẦN 4: "SAVE THE DATE" POSTAGE STAMP PHOTO CARD (GIỐNG HỆT FRAME 014)
               ===================================================================== */}
            <section className="px-4 sm:px-8 space-y-4">
              <div className="text-center">
                <h3 className="font-script-luxury text-4xl sm:text-5xl text-[#2D5A3A]">
                  Save the date
                </h3>
              </div>

              {/* Phong bì trồi bức ảnh nụ hôn có viền tem răng cưa & dán sáp xanh */}
              <div className="relative max-w-sm mx-auto h-[260px] sm:h-[300px] flex items-center justify-center">
                {/* Vỏ phong bì nền dưới */}
                <div
                  className="absolute bottom-2 inset-x-2 h-36 rounded-xl border border-[#D5E6D8] shadow-md"
                  style={{ background: 'linear-gradient(180deg, #F9FAF8 0%, #EEF5EF 100%)' }}
                >
                  <WhiteCallaBouquetDecoration className="absolute -top-10 -left-6 z-20" />
                </div>

                {/* Bức ảnh viền tem răng cưa trồi lên */}
                <motion.div
                  initial={{ y: 20, rotate: -3 }}
                  whileInView={{ y: -20, rotate: 2 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="relative z-15 w-64 sm:w-72 bg-white p-2.5 pb-4 shadow-[0_16px_36px_rgba(20,50,30,0.2)] border-2 border-dashed border-[#83C294] rounded-sm"
                >
                  <div className="aspect-[16/11] overflow-hidden bg-stone-100">
                    <img
                      src={data.sectionImages.kissPhoto}
                      alt="Save the date"
                      className="w-full h-full object-cover object-[center_35%]"
                    />
                  </div>
                  {/* Con dấu sáp xanh ghim trên đỉnh ảnh tem */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#529664] via-[#2A5A37] to-[#14351C] border border-[#A5DEB3] flex items-center justify-center shadow-md">
                      <Heart className="w-3.5 h-3.5 text-[#FFE082] fill-current" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* =====================================================================
                PHẦN 5: OUR STORY & 2 POLAROID DÂU RỂ (GIỐNG HỆT FRAME 008)
               ===================================================================== */}
            <section className="px-4 sm:px-8 space-y-6">
              <div className="text-center">
                <h3 className="font-script-luxury text-4xl sm:text-5xl text-[#2D5A3A]">
                  Our story
                </h3>
              </div>

              {/* Lời tự sự xúc động của Đức & Hậu */}
              <div className="max-w-md mx-auto text-center px-4">
                <p className="font-serif-italic text-xs sm:text-sm leading-relaxed text-[#3B5A42]">
                  Tình yêu của Đức và Hậu là một hành trình kỳ diệu, vượt qua bao thử thách để cùng nhau bước đến ngày trọng đại - đám cưới của chúng mình.
                </p>
                <p className="font-serif-italic text-xs sm:text-sm leading-relaxed text-[#3B5A42] mt-2.5">
                  Đám cưới này là lời cam kết chân thành, là sự bắt đầu của một chương mới - nơi chúng mình cùng vun đắp tổ ấm, cùng sẻ chia mọi vui buồn và cùng nắm tay nhau đi đến cuối con đường mang tên hạnh phúc.
                </p>
              </div>

              {/* 2 TẤM ẢNH POLAROID NGHIÊNG NỐI DẤU SÁP XANH Ở TÂM (frame_008) */}
              <div className="relative max-w-sm mx-auto h-[320px] sm:h-[360px] flex items-center justify-center">
                {/* Polaroid Chú Rể (Nghiêng trái) */}
                <motion.div
                  initial={{ rotate: -8, x: -30, opacity: 0 }}
                  whileInView={{ rotate: -6, x: -35, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="absolute top-2 left-6 sm:left-10 w-40 sm:w-48 bg-white p-2.5 pb-5 rounded shadow-[0_14px_28px_rgba(20,50,30,0.18)] border border-stone-200 z-10"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-stone-100 mb-2">
                    <img
                      src={data.groom.avatar}
                      alt={data.groom.fullName}
                      className="w-full h-full object-cover object-[center_20%]"
                    />
                  </div>
                  <p className="font-script-luxury text-xl text-[#2D5A3A] text-center leading-none">
                    Chú rể
                  </p>
                  <p className="font-serif-luxury text-[10px] sm:text-xs uppercase tracking-wider text-[#1F2E23] text-center mt-0.5">
                    {data.groom.fullName}
                  </p>
                </motion.div>

                {/* Polaroid Cô Dâu (Nghiêng phải) */}
                <motion.div
                  initial={{ rotate: 8, x: 30, opacity: 0 }}
                  whileInView={{ rotate: 7, x: 35, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="absolute bottom-2 right-6 sm:right-10 w-40 sm:w-48 bg-white p-2.5 pb-5 rounded shadow-[0_14px_28px_rgba(20,50,30,0.18)] border border-stone-200 z-10"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-stone-100 mb-2">
                    <img
                      src={data.bride.avatar}
                      alt={data.bride.fullName}
                      className="w-full h-full object-cover object-[center_20%]"
                    />
                  </div>
                  <p className="font-script-luxury text-xl text-[#2D5A3A] text-center leading-none">
                    Cô dâu
                  </p>
                  <p className="font-serif-luxury text-[10px] sm:text-xs uppercase tracking-wider text-[#1F2E23] text-center mt-0.5">
                    {data.bride.fullName}
                  </p>
                </motion.div>

                {/* Con Dấu Sáp Xanh Ghim Ở Tâm Nối 2 Bức Ảnh */}
                <div className="relative z-20 pointer-events-none drop-shadow-md">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#529664] via-[#2A5A37] to-[#14351C] border border-[#C5DAC8] flex items-center justify-center">
                    <Heart className="w-4 h-4 text-[#FFE082] fill-current" />
                  </div>
                </div>
              </div>
            </section>

            {/* =====================================================================
                PHẦN 6: ALBUM ẢNH CƯỚI ĐỨC & HẬU (ẢNH LỚN + THUMBNAILS TRƯỢT NGANG)
               ===================================================================== */}
            <section className="px-4 sm:px-8 space-y-4">
              <div className="text-center">
                <p className="font-serif-luxury text-xs uppercase tracking-[0.2em] text-[#44684E]">
                  SWEET MEMORIES
                </p>
                <h3 className="font-script-luxury text-4xl sm:text-5xl text-[#2D5A3A]">
                  Album Ảnh Cưới
                </h3>
              </div>

              {/* KHUNG ẢNH LỚN NỔI BẬT */}
              <div
                onClick={() => setLightboxUrl(galleryPhotos[selectedGalleryIdx])}
                className="cursor-zoom-in relative w-full aspect-[4/5] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-stone-100 shadow-[0_16px_36px_rgba(20,50,30,0.18)] border-2 border-white group"
              >
                <img
                  src={galleryPhotos[selectedGalleryIdx]}
                  alt="Ảnh cưới Đức & Hậu"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-1.5 rounded-full bg-black/60 text-white text-xs font-serif-luxury">
                    Chạm để phóng to
                  </span>
                </div>
              </div>

              {/* THANH TRƯỢT THUMBNAIL NGANG BÊN DƯỚI */}
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
                        ? 'border-[#2D5A3A] scale-105 shadow-md shadow-[#2D5A3A]/30'
                        : 'border-white opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={photo} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </section>

            {/* =====================================================================
                PHẦN 7: HỘP QUÀ MỪNG CƯỚI (EMERALD BOX STYLE)
               ===================================================================== */}
            <section className="px-4 sm:px-8 space-y-4">
              <div className="text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D5A3A]/10 text-[#2D5A3A] text-xs font-serif-luxury tracking-wider uppercase mb-1">
                  <Gift className="w-3.5 h-3.5" />
                  <span>MỪNG CƯỚI DÂU RỂ</span>
                </div>

                <h3 className="font-script-luxury text-4xl text-[#2D5A3A] mb-1">
                  Hộp Quà Mừng Cưới
                </h3>
                <p className="text-xs text-[#4F6C55] mb-5">
                  {!isGiftBoxOpen
                    ? 'Chạm vào phong bao bên dưới để mở mã QR mừng cưới'
                    : 'Chạm vào mã QR để phóng to hoặc sao chép số tài khoản'}
                </p>

                <AnimatePresence mode="wait">
                  {!isGiftBoxOpen ? (
                    /* Hộp quà đóng nhỏ gọn */
                    <motion.div
                      key="closed-emerald-box"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      onClick={handleOpenGiftBox}
                      className="cursor-pointer relative mx-auto w-full max-w-[240px] sm:max-w-[260px] h-36 sm:h-40 rounded-2xl border border-[#9BB89D] p-3.5 shadow-lg flex flex-col items-center justify-between overflow-hidden bg-gradient-to-br from-[#E8F3EA] via-[#D5E8D8] to-[#BCD6C1] group hover:border-[#2D5A3A]"
                    >
                      <div className="pointer-events-none absolute inset-1.5 rounded-xl border border-white/60" />
                      <div className="relative z-10 my-auto">
                        <EmeraldWaxSeal />
                      </div>

                      <div className="relative z-10 w-full flex items-center justify-center pt-1">
                        <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#2D5A3A] text-white text-xs font-serif-luxury italic whitespace-nowrap shadow-sm group-hover:bg-[#1C3D26] transition-colors text-center">
                          <LockOpen className="w-3.5 h-3.5 text-[#FFE082] shrink-0" />
                          <span className="whitespace-nowrap font-semibold">Chạm Để Mở Mã QR</span>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    /* Thẻ QR mở ra */
                    <motion.div
                      key="opened-emerald-cards"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* QR Chú rể */}
                        <div className="bg-white rounded-2xl p-4 border border-[#C5DAC8] shadow-sm text-center">
                          <p className="font-serif-luxury font-bold text-xs text-[#2D5A3A] mb-1">
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
                          <p className="text-xs font-semibold text-[#1F2E23]">
                            {data.groomQrGift.accountHolder}
                          </p>
                          <div className="flex items-center justify-center gap-1 text-xs text-[#4F6C55] mt-0.5">
                            <span>STK: {data.groomQrGift.accountNumber}</span>
                            <button
                              type="button"
                              onClick={() => handleCopy('groom', data.groomQrGift.accountNumber)}
                              className="cursor-pointer p-1 text-[#2D5A3A] hover:text-[#193F25]"
                              title="Sao chép STK"
                            >
                              {copiedKey === 'groom' ? (
                                <Check className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                          <p className="text-[11px] text-[#5C8563] mt-0.5">
                            {data.groomQrGift.bankBranch}
                          </p>
                        </div>

                        {/* QR Cô dâu */}
                        <div className="bg-white rounded-2xl p-4 border border-[#C5DAC8] shadow-sm text-center">
                          <p className="font-serif-luxury font-bold text-xs text-[#2D5A3A] mb-1">
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
                          <p className="text-xs font-semibold text-[#1F2E23]">
                            {data.brideQrGift.accountHolder}
                          </p>
                          <div className="flex items-center justify-center gap-1 text-xs text-[#4F6C55] mt-0.5">
                            <span>STK: {data.brideQrGift.accountNumber}</span>
                            <button
                              type="button"
                              onClick={() => handleCopy('bride', data.brideQrGift.accountNumber)}
                              className="cursor-pointer p-1 text-[#2D5A3A] hover:text-[#193F25]"
                              title="Sao chép STK"
                            >
                              {copiedKey === 'bride' ? (
                                <Check className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                          <p className="text-[11px] text-[#5C8563] mt-0.5">
                            {data.brideQrGift.bankBranch}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsGiftBoxOpen(false)}
                        className="cursor-pointer text-xs text-[#2D5A3A] hover:underline"
                      >
                        Đóng hộp quà mừng
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* =====================================================================
                PHẦN 8: GỬI LỜI CHÚC (YOUR WISHES GIỐNG FRAME 010)
               ===================================================================== */}
            <section className="px-4 sm:px-8 space-y-6">
              <div className="text-center">
                <h3 className="font-serif-luxury font-bold text-lg sm:text-xl tracking-[0.14em] text-[#2D5A3A] uppercase">
                  YOUR WISHES
                </h3>
                <p className="font-serif-italic text-xs text-[#4F6C55] mt-0.5">
                  Messages from our loved ones
                </p>
              </div>

              {/* Form gửi lời nhắn & xác nhận tham dự */}
              <form
                onSubmit={handleSubmitForm}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-[#D5E6D8] shadow-sm max-w-md mx-auto space-y-3.5"
              >
                <div>
                  <label className="block text-xs font-medium text-[#38553E] mb-1">
                    Tên của bạn
                  </label>
                  <input
                    type="text"
                    required
                    value={guestInputName}
                    onChange={(e) => setGuestInputName(e.target.value)}
                    placeholder="Nhập họ và tên của bạn..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-[#2D5A3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#38553E] mb-1">
                    Gửi lời nhắn đến cô dâu chú rể
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={guestWish}
                    onChange={(e) => setGuestWish(e.target.value)}
                    placeholder="Viết lời chúc ngọt ngào gửi tặng Đức & Hậu..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-[#2D5A3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#38553E] mb-1">
                    Bạn sẽ đến tham dự chung vui chứ?
                  </label>
                  <select
                    value={attendance}
                    onChange={(e) => setAttendance(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-[#2D5A3A] bg-white"
                  >
                    <option value="Có, chắc chắn mình sẽ tham dự!">Có, chắc chắn mình sẽ tham dự!</option>
                    <option value="Rất tiếc, mình bận việc không thể tham dự được">
                      Rất tiếc, mình bận việc không thể tham dự được
                    </option>
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="cursor-pointer w-full py-3 rounded-xl bg-[#2D5A3A] text-white text-xs sm:text-sm font-serif-luxury font-bold uppercase tracking-wider shadow-md hover:bg-[#1E3F27] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>GỬI LỜI NHẮN &amp; XÁC NHẬN</span>
                </motion.button>

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

              {/* Danh sách lời chúc hiển thị công khai */}
              <div className="max-w-md mx-auto space-y-3 pt-2">
                {wishes.slice(0, 8).map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-white/80 border border-[#D5E6D8] text-left shadow-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-serif-luxury font-bold text-xs sm:text-sm text-[#2D5A3A]">
                        {item.name}
                      </p>
                      <Heart className="w-3 h-3 text-[#3E6B47] fill-current" />
                    </div>
                    <p className="text-xs text-[#1F2E23] leading-relaxed">{item.message}</p>
                    {item.createdAt && (
                      <p className="text-[10px] text-stone-400 mt-1">{item.createdAt}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* =====================================================================
                PHẦN 9: LỜI CẢM ƠN (THANK YOU)
               ===================================================================== */}
            <section className="px-6 sm:px-12 py-8 text-center bg-gradient-to-b from-transparent via-[#F0F6F1] to-[#E3EFE5] rounded-3xl mx-4 sm:mx-8">
              <h4 className="font-script-luxury text-4xl sm:text-5xl text-[#2D5A3A] mb-2">
                Lời cảm ơn!
              </h4>
              <p className="font-serif-italic text-xs sm:text-sm leading-relaxed text-[#3B5A42] max-w-md mx-auto">
                {data.thankYouText.message}
              </p>
              <p className="font-serif-luxury text-xs tracking-[0.2em] text-[#44684E] mt-4 font-semibold uppercase">
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
            className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex items-center justify-center p-4"
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
