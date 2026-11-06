import React, { useEffect, useState } from 'react';
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
} from 'lucide-react';
import { WeddingData, WishItem } from '../data/weddingData';
import { parseWishItem } from '../utils/wishHelper';

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
    animate={isOpening ? { scale: [1, 1.1, 0.4], opacity: [1, 1, 0] } : { scale: [1, 1.05, 1] }}
    transition={isOpening ? { duration: 0.55 } : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
    className="relative w-15 h-15 sm:w-18 sm:h-18 rounded-full flex items-center justify-center select-none shadow-[0_8px_20px_rgba(20,45,28,0.45)]"
    style={{
      background: 'radial-gradient(circle at 35% 30%, #4E8A5E 0%, #2D5A3A 55%, #183822 100%)',
      boxShadow:
        '0 8px 20px rgba(18, 48, 25, 0.45), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -3px 6px rgba(0,0,0,0.5)',
    }}
  >
    <div className="w-[82%] h-[82%] rounded-full border border-[#83C294]/60 shadow-inner flex items-center justify-center">
      <div className="flex flex-col items-center justify-center text-[#E3F4E8] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
        <span className="font-serif-luxury font-bold text-xs sm:text-sm tracking-wider">Đ &amp; H</span>
        <Sparkles className="w-2.5 h-2.5 text-[#F5E6B3] mt-0.5" />
      </div>
    </div>
  </motion.div>
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
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2D5A3A', '#8EA891', '#D4AF37', '#FFFDF9'],
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
      particleCount: 70,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#2D5A3A', '#D4AF37', '#E8F2EA'],
    });
    setWishSubmitted(true);
    setGuestWish('');
    setTimeout(() => setWishSubmitted(false), 4000);
  };

  // Timeline sự kiện (giống 100% Video 1)
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

  // Dress code 4 màu (giống Video 1)
  const dressCodeColors = [
    { name: 'Đen Sang Trọng', hex: '#1C1C1C', border: 'border-stone-400' },
    { name: 'Xanh Olive', hex: '#3E5C3B', border: 'border-[#3E5C3B]' },
    { name: 'Nâu Đất', hex: '#5E4A35', border: 'border-[#5E4A35]' },
    { name: 'Be Sữa', hex: '#E7DFD3', border: 'border-[#D1C6B7]' },
  ];

  // Danh sách ảnh album của Đức & Hậu
  const galleryPhotos = data.album9Images.map((img) => img.url);

  return (
    <div className="min-h-screen w-full bg-[#18261C] text-[#1F2E23] flex justify-center items-start overflow-x-hidden md:py-10 md:px-6 relative">
      {/* Background toàn màn hình: Tranh sơn dầu hoa hồng trong vườn xanh nghệ thuật */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none opacity-40 filter blur-[2px]"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=1600&auto=format&fit=crop")',
        }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#18261C]/85 via-[#18261C]/75 to-[#18261C]/95 pointer-events-none" />

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
        className={`w-full max-w-[460px] md:max-w-3xl lg:max-w-4xl bg-[#FAFBF9] shadow-[0_25px_80px_rgba(0,0,0,0.5)] md:rounded-3xl md:border md:border-[#D6E0D4] relative z-10 overflow-hidden transition-all duration-500 ${
          isEnvelopeOpen ? 'pb-12' : 'min-h-[100dvh] md:min-h-[780px] flex flex-col justify-center'
        }`}
      >
        {/* Thanh Tiêu Đề Mảnh Căn Giữa */}
        <div className="sticky top-0 z-40 bg-[#FAFBF9]/95 backdrop-blur-md border-b border-[#E0E8DE] px-4 md:px-8 py-3 flex items-center justify-center text-[#2D5A3A]">
          <span className="font-serif-luxury text-xs sm:text-sm tracking-[0.14em] uppercase font-semibold text-center">
            THIỆP MỜI CƯỚI {data.groom.shortName} &amp; {data.bride.shortName}
          </span>
        </div>

        {/* =====================================================================
            PHẦN 1: PHONG BÌ TƯƠNG TÁC MỞ ĐẦU (GARDEN EMERALD ENVELOPE)
           ===================================================================== */}
        <section
          className={`px-5 md:px-10 flex flex-col items-center text-center relative transition-all duration-700 ${
            isEnvelopeOpen
              ? 'pt-8 md:pt-12 pb-6'
              : 'flex-1 min-h-[calc(100dvh-52px)] md:min-h-[720px] justify-center py-8'
          }`}
        >
          {/* Dòng chữ tay bay bổng phía trên phong bì */}
          <motion.p
            animate={{ scale: isEnvelopeOpen ? 1 : [1, 1.04, 1] }}
            transition={{ duration: 2.2, repeat: isEnvelopeOpen ? 0 : Infinity, ease: 'easeInOut' }}
            onClick={handleOpenEnvelope}
            className="cursor-pointer font-script-luxury text-4xl sm:text-5xl text-[#2D5A3A] mb-8 select-none"
          >
            {isEnvelopeOpen ? 'Save our date!' : 'Nhấp để mở'}
          </motion.p>

          {/* Khối Phong Bì Tương Tác */}
          <div
            onClick={handleOpenEnvelope}
            className="relative cursor-pointer w-full max-w-[310px] sm:max-w-[340px] aspect-[1.48/1] select-none group"
          >
            {/* Lớp nền phong bì trắng kem viền ren hoa */}
            <div className="absolute inset-0 bg-[#FFFDF9] rounded-2xl border-2 border-[#D3DFD1] shadow-[0_16px_45px_rgba(25,50,30,0.18)] overflow-hidden">
              <div className="absolute inset-1.5 rounded-xl border border-[#DCE8DB]/70" />
              {/* Họa tiết ren hoa mỹ thuật ở các góc */}
              <span className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-[#8EA891]" />
              <span className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-[#8EA891]" />
              <span className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-[#8EA891]" />
              <span className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-[#8EA891]" />
            </div>

            {/* Hai cánh phong bì gập vào giữa */}
            <svg viewBox="0 0 340 230" className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <polygon points="0,0 170,120 0,230" fill="#FBF8F2" stroke="#D3DFD1" strokeWidth="1.2" />
              <polygon points="340,0 170,120 340,230" fill="#F7F4EE" stroke="#D3DFD1" strokeWidth="1.2" />
              <polygon points="0,230 170,110 340,230" fill="#FFFDF9" stroke="#D3DFD1" strokeWidth="1.5" />
            </svg>

            {/* Nắp trên phong bì mở lật lên khi isEnvelopeOpen = true */}
            <motion.div
              animate={{ rotateX: isEnvelopeOpen ? 180 : 0 }}
              transition={{ duration: 1.1, ease: [0.35, 0, 0.2, 1] }}
              style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d', zIndex: isEnvelopeOpen ? 5 : 25 }}
              className="absolute top-0 inset-x-0 h-[115px] pointer-events-none"
            >
              <svg viewBox="0 0 340 115" className="w-full h-full">
                <polygon points="0,0 340,0 170,115" fill="#F2EFE8" stroke="#D3DFD1" strokeWidth="1.5" />
              </svg>
            </motion.div>

            {/* Con dấu sáp xanh ngọc bích ở trung tâm */}
            <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
              <EmeraldWaxSeal isOpening={isEnvelopeOpen} />
            </div>

            {/* Bàn tay chỉ dẫn chạm mở (khi chưa mở) */}
            {!isEnvelopeOpen && (
              <motion.div
                animate={{ y: [0, -6, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-1/2 top-[68%] -translate-x-1/2 z-35 pointer-events-none flex flex-col items-center"
              >
                <span className="text-xl drop-shadow">👆</span>
                <span className="text-[10px] uppercase tracking-wider text-[#2D5A3A] font-semibold bg-white/90 px-2 py-0.5 rounded-full shadow-sm mt-1 whitespace-nowrap">
                  Chạm để mở
                </span>
              </motion.div>
            )}
          </div>

          {/* Dưới phong bì: Tên dâu rể & ngày cưới */}
          <div className="mt-7 text-center">
            <h1 className="font-script-luxury text-4xl sm:text-5xl text-[#1E3E27] mb-1">
              {data.groom.shortName} &amp; {data.bride.shortName}
            </h1>
            <p className="font-serif-luxury text-xs sm:text-sm tracking-[0.2em] uppercase text-[#485E4F]">
              {data.weddingDate.displayDate}
            </p>
          </div>
        </section>

        {/* =====================================================================
            PHẦN 2: NỘI DUNG CHÍNH (CHỈ HIỂN THỊ KHI ĐÃ MỞ PHONG BÌ)
           ===================================================================== */}
        {isEnvelopeOpen && (
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-12"
          >
            {/* 1. WE ARE GETTING MARRIED & ẢNH CƯỚI CHÍNH */}
            <section className="px-5 md:px-12 text-center pt-4">
              <div className="inline-block mb-3 px-3.5 py-1 rounded-full bg-[#EBF3EC] border border-[#C5DAC8] text-[#2D5A3A] font-serif-luxury text-[11px] tracking-[0.14em] uppercase">
                WE ARE GETTING MARRIED
              </div>

              {/* Bức ảnh cưới đứng lớn của Huy Đức & Phan Hậu */}
              <div className="relative mx-auto w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100 mb-6 group">
                <img
                  src={data.sectionImages.hero}
                  alt="Lê Huy Đức & Phan Thị Hậu"
                  className="w-full h-auto aspect-[3/4.4] object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 inset-x-0 text-white text-center">
                  <p className="font-script-luxury text-2xl drop-shadow">Huy Đức &amp; Phan Hậu</p>
                  <p className="text-[10px] tracking-widest uppercase opacity-90">03 . 03 . 2024</p>
                </div>
              </div>

              {/* Lời mời trân trọng */}
              <p className="font-serif-luxury text-xs sm:text-sm tracking-[0.08em] uppercase text-[#3C5743] max-w-md mx-auto leading-relaxed">
                TRÂN TRỌNG KÍNH MỜI BẠN DÀNH THỜI GIAN QUÝ GIÁ THAM DỰ LỄ THÀNH HÔN CỦA GIA ĐÌNH CHÚNG MÌNH
              </p>
            </section>

            {/* 2. HAI BÊN GIA ĐÌNH NHÀ TRAI & NHÀ GÁI */}
            <section className="px-5 md:px-12">
              <div className="max-w-lg mx-auto bg-[#F4F8F3] rounded-3xl p-6 border border-[#D5E3D3] shadow-sm text-center">
                <div className="grid grid-cols-2 gap-4 divide-x divide-[#D0DFCE]">
                  <div className="pr-2">
                    <p className="font-serif-luxury font-bold text-xs uppercase text-[#2D5A3A] tracking-wider mb-2">
                      NHÀ TRAI
                    </p>
                    <p className="text-xs text-stone-700 font-medium">Bố: Lê Huy ...</p>
                    <p className="text-xs text-stone-700 font-medium mt-0.5">Mẹ: Nguyễn Thị ...</p>
                    <p className="font-script-luxury text-xl text-[#2D5A3A] mt-2">Chú rể: Huy Đức</p>
                  </div>

                  <div className="pl-4">
                    <p className="font-serif-luxury font-bold text-xs uppercase text-[#2D5A3A] tracking-wider mb-2">
                      NHÀ GÁI
                    </p>
                    <p className="text-xs text-stone-700 font-medium">Bố: Phan Văn ...</p>
                    <p className="text-xs text-stone-700 font-medium mt-0.5">Mẹ: Trần Thị ...</p>
                    <p className="font-script-luxury text-xl text-[#2D5A3A] mt-2">Cô dâu: Phan Hậu</p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#D5E3D3] text-center">
                  <div className="w-10 h-10 mx-auto rounded-full bg-[#E5EFE4] border border-[#B9D3BC] flex items-center justify-center text-[#2D5A3A] font-serif-luxury font-bold text-sm">
                    Đ &amp; H
                  </div>
                </div>
              </div>
            </section>

            {/* 3. TIMELINE SỰ KIỆN LỊCH TRÌNH NGÀY CƯỚI (GIỐNG 100% VIDEO 1) */}
            <section className="px-5 md:px-12">
              <div className="max-w-md mx-auto text-center">
                <h3 className="font-script-luxury text-4xl text-[#2D5A3A] mb-8">
                  Timeline
                </h3>

                {/* Trục dọc kết ngọc trai */}
                <div className="relative pl-6 sm:pl-8 text-left space-y-7 before:content-[''] before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#8EA891]">
                  {timelineEvents.map((ev, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Hạt ngọc trai phát sáng trên trục */}
                      <div className="absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full bg-white border-2 border-[#2D5A3A] shadow-md flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#2D5A3A]" />
                      </div>

                      <div className="bg-[#F4F8F3] border border-[#D5E3D3] rounded-2xl p-3.5 flex-1 shadow-sm">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-serif-luxury font-bold text-sm text-[#2D5A3A]">
                            {ev.time} • {ev.title}
                          </span>
                          <span className="p-1 rounded-lg bg-white/80 border border-[#D5E3D3]">{ev.icon}</span>
                        </div>
                        <p className="text-xs text-[#526D59] mt-1">{ev.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 4. DRESS CODE GỢI Ý TRANG PHỤC (GIỐNG VIDEO 1) */}
            <section className="px-5 md:px-12">
              <div className="max-w-md mx-auto text-center bg-[#F4F8F3] rounded-3xl p-6 border border-[#D5E3D3] shadow-sm">
                <h4 className="font-script-luxury text-3xl text-[#2D5A3A] mb-4">
                  Dress code
                </h4>
                <p className="text-xs text-[#526D59] mb-5">
                  Để những bức ảnh kỷ niệm thêm phần hài hòa và trang trọng, bạn có thể lựa chọn trang phục theo bảng màu gợi ý:
                </p>

                <div className="flex items-center justify-center gap-3 sm:gap-5">
                  {dressCodeColors.map((c, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1.5">
                      <div
                        style={{ backgroundColor: c.hex }}
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 ${c.border} shadow-md transition-transform hover:scale-110`}
                      />
                      <span className="text-[10px] text-stone-600 font-medium">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. ALBUM ẢNH CƯỚI NGHỆ THUẬT CỦA ĐỨC & HẬU */}
            <section className="px-5 md:px-12">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="font-script-luxury text-4xl text-[#2D5A3A] mb-2">
                  Album Hình Cưới
                </h3>
                <p className="font-serif-luxury text-xs uppercase tracking-wider text-[#526D59] mb-6">
                  Khoảnh khắc hạnh phúc của Huy Đức &amp; Phan Hậu
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {galleryPhotos.slice(0, 9).map((photo, idx) => (
                    <div
                      key={idx}
                      onClick={() => setLightboxUrl(photo)}
                      className="cursor-pointer aspect-[3/4.2] rounded-xl overflow-hidden shadow-sm border border-stone-200 group bg-stone-100"
                    >
                      <img
                        src={photo}
                        alt={`Ảnh cưới Đức & Hậu ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 6. HỘP QUÀ MỪNG CƯỚI XANH NGỌC MINI */}
            <section id="section-gift" className="px-5 md:px-12">
              <div className="max-w-md mx-auto text-center bg-[#F4F8F3] rounded-3xl p-6 border border-[#D5E3D3] shadow-sm">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E5EFE4] text-[#2D5A3A] text-[11px] font-semibold tracking-wider uppercase mb-2">
                  <Gift className="w-3.5 h-3.5" />
                  <span>MỪNG CƯỚI DÂU RỂ</span>
                </div>

                <h3 className="font-script-luxury text-4xl text-[#2D5A3A] mb-1">
                  Hộp Quà Mừng Cưới
                </h3>
                <p className="text-xs text-[#526D59] mb-5">
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
                          <LockOpen className="w-3.5 h-3.5 text-[#F5E6B3] shrink-0" />
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
                          <p className="text-xs font-semibold text-stone-800">{data.groomQrGift.accountHolder}</p>
                          <div
                            onClick={() => setLightboxUrl(data.groomQrGift.qrImageUrl)}
                            className="cursor-pointer w-32 h-32 mx-auto my-2 rounded-xl overflow-hidden border border-stone-200 p-1 bg-stone-50"
                          >
                            <img src={data.groomQrGift.qrImageUrl} alt="QR Chú Rể" className="w-full h-full object-contain" />
                          </div>
                          <p className="text-[11px] font-mono text-stone-600">{data.groomQrGift.accountNumber}</p>
                          <p className="text-[10px] text-stone-500 mb-2">{data.groomQrGift.bankBranch}</p>
                          <button
                            type="button"
                            onClick={() => handleCopy('groom', data.groomQrGift.accountNumber)}
                            className="cursor-pointer inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#EBF3EC] hover:bg-[#D9EADC] text-[#2D5A3A] text-[11px] font-medium transition-colors"
                          >
                            {copiedKey === 'groom' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedKey === 'groom' ? 'Đã chép' : 'Sao chép STK'}</span>
                          </button>
                        </div>

                        {/* QR Cô dâu */}
                        <div className="bg-white rounded-2xl p-4 border border-[#C5DAC8] shadow-sm text-center">
                          <p className="font-serif-luxury font-bold text-xs text-[#2D5A3A] mb-1">
                            {data.brideQrGift.roleLabel}
                          </p>
                          <p className="text-xs font-semibold text-stone-800">{data.brideQrGift.accountHolder}</p>
                          <div
                            onClick={() => setLightboxUrl(data.brideQrGift.qrImageUrl)}
                            className="cursor-pointer w-32 h-32 mx-auto my-2 rounded-xl overflow-hidden border border-stone-200 p-1 bg-stone-50"
                          >
                            <img src={data.brideQrGift.qrImageUrl} alt="QR Cô Dâu" className="w-full h-full object-contain" />
                          </div>
                          <p className="text-[11px] font-mono text-stone-600">{data.brideQrGift.accountNumber}</p>
                          <p className="text-[10px] text-stone-500 mb-2">{data.brideQrGift.bankBranch}</p>
                          <button
                            type="button"
                            onClick={() => handleCopy('bride', data.brideQrGift.accountNumber)}
                            className="cursor-pointer inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#EBF3EC] hover:bg-[#D9EADC] text-[#2D5A3A] text-[11px] font-medium transition-colors"
                          >
                            {copiedKey === 'bride' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedKey === 'bride' ? 'Đã chép' : 'Sao chép STK'}</span>
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsGiftBoxOpen(false)}
                        className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-[#C5DAC8] text-xs text-[#2D5A3A] hover:bg-[#F0F5F1] transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Đóng hộp quà</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* 7. FORM GỬI LỜI CHÚC & DANH SÁCH LỜI CHÚC */}
            <section className="px-5 md:px-12">
              <div className="max-w-md mx-auto bg-[#F4F8F3] rounded-3xl p-6 border border-[#D5E3D3] shadow-sm text-center">
                <h3 className="font-script-luxury text-4xl text-[#2D5A3A] mb-1">
                  Gửi Lời Chúc
                </h3>
                <p className="text-xs text-[#526D59] mb-5">
                  Hãy gửi lời chúc mừng hạnh phúc đến Huy Đức &amp; Phan Hậu
                </p>

                <form onSubmit={handleSubmitForm} className="space-y-3 text-left">
                  <input
                    type="text"
                    required
                    value={guestInputName}
                    onChange={(e) => setGuestInputName(e.target.value)}
                    placeholder="Tên của bạn là gì?"
                    className="w-full rounded-xl border border-[#C5DAC8] bg-white px-4 py-2.5 text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[#2D5A3A]"
                  />

                  <textarea
                    rows={3}
                    required
                    value={guestWish}
                    onChange={(e) => setGuestWish(e.target.value)}
                    placeholder="Nhập lời chúc tốt đẹp nhất gửi đến dâu rể..."
                    className="w-full rounded-xl border border-[#C5DAC8] bg-white p-3 text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[#2D5A3A] resize-none"
                  />

                  <select
                    value={attendance}
                    onChange={(e) => setAttendance(e.target.value)}
                    className="w-full rounded-xl border border-[#C5DAC8] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#2D5A3A] focus:outline-none focus:border-[#2D5A3A]"
                  >
                    <option value="Có, chắc chắn mình sẽ tham dự!">Bạn có tham dự không? — Có, chắc chắn tham dự</option>
                    <option value="Mình bận mất rồi, xin gửi lời chúc hạnh phúc!">Mình bận mất rồi, xin gửi lời chúc hạnh phúc</option>
                    <option value="Đang sắp xếp thời gian">Đang sắp xếp thời gian</option>
                  </select>

                  {wishSubmitted && (
                    <p className="text-center text-xs text-emerald-700 py-1 font-medium">
                      ✨ Cảm ơn bạn! Lời chúc đã được gửi thành công.
                    </p>
                  )}

                  <button
                    type="submit"
                    className="cursor-pointer w-full py-3 rounded-full bg-[#2D5A3A] hover:bg-[#1E3E27] text-white font-serif-luxury text-xs sm:text-sm tracking-wider uppercase transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi Lời Chúc Mừng</span>
                  </button>
                </form>

                {/* Danh sách lời chúc đã gửi (ẩn thông tin tham dự) */}
                {wishes.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-[#D5E3D3] text-left">
                    <p className="font-serif-luxury text-xs uppercase text-[#2D5A3A] font-semibold mb-2">
                      Lời Chúc Từ Người Thương ({wishes.length})
                    </p>
                    <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                      {wishes.map((w) => {
                        const parsed = parseWishItem(w);
                        return (
                          <div key={w.id} className="rounded-xl bg-white border border-[#D5E3D3] p-3 text-xs">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-serif-luxury font-bold text-[#2D5A3A]">{parsed.name}</span>
                              <span className="text-[10px] text-stone-400">{parsed.createdAt}</span>
                            </div>
                            <p className="text-stone-700 italic">“{parsed.cleanMessage}”</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* 8. LỜI CẢM ƠN CHÂN THÀNH */}
            <section className="px-5 md:px-12 text-center pb-6">
              <div className="max-w-md mx-auto">
                <h3 className="font-script-luxury text-4xl text-[#2D5A3A] mb-2">
                  Lời cảm ơn!
                </h3>
                <p className="font-serif-luxury text-xs text-[#485E4F] uppercase tracking-wider leading-relaxed">
                  CẢM ƠN BẠN ĐÃ DÀNH TÌNH CẢM CHO GIA ĐÌNH CHÚNG MÌNH! SỰ HIỆN DIỆN CỦA BẠN CHÍNH LÀ MÓN QUÀ Ý NGHĨA NHẤT, GIA ĐÌNH CHÚNG MÌNH VÔ CÙNG TRÂN QUÝ KHI ĐƯỢC CÙNG BẠN CHIA SẺ NIỀM HẠNH PHÚC TRONG NGÀY TRỌNG ĐẠI NÀY.
                </p>
              </div>
            </section>
          </motion.div>
        )}
      </div>

      {/* Lightbox Phóng To Ảnh */}
      {lightboxUrl &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxUrl(null)}
          >
            <button
              type="button"
              onClick={() => setLightboxUrl(null)}
              className="cursor-pointer absolute top-4 right-4 z-50 p-2 text-white/80 hover:text-white rounded-full bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={lightboxUrl}
              alt="Ảnh phóng to"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body
        )}
    </div>
  );
};
export default GardenEmeraldInvitation;
