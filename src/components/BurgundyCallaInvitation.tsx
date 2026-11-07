import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Music,
  Gift,
  LockOpen,
  Lock,
  X,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Send,
  VolumeX,
} from 'lucide-react';
import { WeddingData, WishItem } from '../data/weddingData';
import { soundEngine } from '../utils/soundEngine';
import { AmbientCanvas } from './AmbientCanvas';
import { CrochetLaceMirrorFrame } from './CrochetLaceMirrorFrame';
import { LuxuryWeddingEnvelope } from './LuxuryWeddingEnvelope';
import {
  BotanicalWaxSeal,
  CameraLineIcon,
  WeddingRingsLineIcon,
  BanquetPlateLineIcon,
  MusicNotesLineIcon,
  WeeklySaveTheDateSection,
  ThankYouOpenEnvelopeSection,
  decorAsset,
} from './VintageFloralArtwork';

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

  // Gallery ảnh cưới (các ảnh chưa sử dụng được xếp lên đầu)
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);

  // Form gửi lời chúc & xác nhận tham dự
  const [guestInputName, setGuestInputName] = useState(() => getInitialGuestName(guestName));
  const [guestWish, setGuestWish] = useState('');
  const [attendance, setAttendance] = useState('Có, chắc chắn mình sẽ tham dự!');
  const [wishSubmitted, setWishSubmitted] = useState(false);

  useEffect(() => {
    const initial = getInitialGuestName(guestName);
    if (initial) setGuestInputName(initial);
  }, [guestName]);

  // Tối ưu hiệu năng: Tải ngầm toàn bộ ảnh chính ngay khi ở màn hình chờ mở phong bì
  useEffect(() => {
    const imagesToPreload = [
      data.sectionImages.hero,
      data.sectionImages.loveStoryBg,
      ...(data.sectionImages.dressCodePhotos || [data.sectionImages.countdown]),
      data.sectionImages.envelopePolaroid,
      data.sectionImages.heroLeftFloat,
      data.sectionImages.kissPhoto,
      data.groom.avatar,
      data.bride.avatar,
      decorAsset('burgundy-floral-tassel.png'),
      decorAsset('burgundy-calla-single.png'),
      decorAsset('burgundy-anthurium-main.png'),
      decorAsset('burgundy-floral-corner.png'),
    ];

    imagesToPreload.forEach((src) => {
      if (!src) return;
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
    });
  }, [data]);

  const handleOpenEnvelope = () => {
    if (isEnvelopeOpen) return;
    setIsEnvelopeOpen(true);
    soundEngine.playOpenChime();
    onStartMusic();
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#721428', '#B83350', '#D4AF37', '#FFFDF9'],
    });
  };

  const handleOpenGiftBox = () => {
    if (isGiftBoxOpen || isBoxUnwrapping) return;
    setIsBoxUnwrapping(true);
    soundEngine.playOpenChime();
    setTimeout(() => {
      setIsGiftBoxOpen(true);
      setIsBoxUnwrapping(false);
    }, 450);
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
      attendance,
      createdAt: formattedTime,
    };

    onAddWish(newWish);
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#721428', '#D4AF37', '#FADCE6'],
    });
    setWishSubmitted(true);
    setGuestWish('');
    setTimeout(() => setWishSubmitted(false), 4000);
  };

  const galleryPhotos = data.album9Images.map((img) => img.url);

  const goPrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedGalleryIdx((prev) => (prev === 0 ? galleryPhotos.length - 1 : prev - 1));
  };

  const goNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedGalleryIdx((prev) => (prev === galleryPhotos.length - 1 ? 0 : prev + 1));
  };

  // Timeline chuẩn 100% v2_frames/frame_005
  const timelineRows = [
    {
      time: '9:00',
      title: 'ĐÓN KHÁCH',
      iconLeft: true,
      icon: <CameraLineIcon color="#6A1427" />,
    },
    {
      time: '10:00',
      title: 'LỄ THÀNH HÔN',
      iconLeft: false,
      icon: <WeddingRingsLineIcon color="#6A1427" />,
    },
    {
      time: '10:15',
      title: 'KHAI TIỆC',
      iconLeft: true,
      icon: <BanquetPlateLineIcon color="#6A1427" />,
    },
    {
      time: '11:30',
      title: 'ÂM NHẠC',
      iconLeft: false,
      icon: <MusicNotesLineIcon color="#6A1427" />,
    },
  ];

  // 4 hình tròn màu Dress code chuẩn v2_frames/frame_005
  const dressCodeColors = [
    { hex: '#080808' },
    { hex: '#630B1A' },
    { hex: '#644E2A' },
    { hex: '#DCCDC7' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#240811] text-[#331B23] flex justify-center items-start overflow-x-hidden md:py-8 md:px-6 relative">
      {/* NỀN LỤA ĐỎ BORDEAUX TRẦM SANG TRỌNG BÊN NGOÀI KHUNG THIỆP DESKTOP */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, #3F101E 0%, #260710 60%, #170309 100%)',
        }}
      />

      {/* ANIMATION HOA RƠI & TRÁI TIM RƠI LÃNG MẠN */}
      <AmbientCanvas styleId="calla" />

      {/* Nút Admin kín đáo ngoài màn hình khi chưa mở thiệp */}
      {!isEnvelopeOpen && onOpenAdmin && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenAdmin();
          }}
          title="Quản trị"
          className="cursor-pointer fixed top-2.5 left-2.5 z-50 p-2 text-[#843045]/45 md:text-white/40 hover:opacity-100 opacity-45 transition-all rounded-full"
          aria-label="Admin"
        >
          <Lock className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Nút Bật/Tắt Nhạc Nền */}
      <div className="fixed top-3 right-3 z-50">
        <button
          type="button"
          onClick={onToggleMusic}
          className="cursor-pointer w-10 h-10 rounded-full bg-[#FAF4F6]/90 backdrop-blur-md border border-[#DFC4CE] shadow-lg flex items-center justify-center text-[#6A1427] hover:scale-105 transition-transform"
          title={isMusicPlaying ? 'Tắt nhạc' : 'Phát nhạc'}
          aria-label="Nhạc nền"
        >
          {isMusicPlaying ? (
            <Music className="w-4 h-4 text-[#6A1427] animate-spin" style={{ animationDuration: '4s' }} />
          ) : (
            <VolumeX className="w-4 h-4 text-stone-500" />
          )}
        </button>
      </div>

      {/* KHUNG THIỆP CƯỚI CHÍNH */}
      <div className="w-full max-w-[450px] md:max-w-[480px] bg-[#FAF4F6] shadow-[0_25px_80px_rgba(0,0,0,0.6)] md:rounded-2xl relative z-10 overflow-hidden transition-all duration-500">
        {/* Thanh Tiêu Đề Mảnh Ở Đỉnh Thiệp */}
        <div className="sticky top-0 z-40 bg-[#FAF4F6]/95 backdrop-blur-md border-b border-[#EAD7DF] px-4 py-3 flex items-center justify-center text-[#6A1427]">
          <span className="font-serif-luxury text-xs sm:text-sm tracking-[0.14em] uppercase font-semibold text-center">
            {data.groom.shortName} &amp; {data.bride.shortName} Wedding
          </span>
        </div>

        {/* =====================================================================
            PHẦN 1: PHONG BÌ ĐỎ RƯỢU NHUNG TƯƠNG TÁC MỞ ĐẦU (CHUẨN VIDEO 2)
           ===================================================================== */}
        <LuxuryWeddingEnvelope
          theme="burgundy"
          isOpen={isEnvelopeOpen}
          onOpen={handleOpenEnvelope}
          guestName={guestName}
          weddingDateIso={data.weddingDate.isoDate}
          heroPhoto={data.sectionImages.envelopePolaroid}
          kissPhoto={data.sectionImages.heroLeftFloat}
          groomShortName={data.groom.shortName}
          brideShortName={data.bride.shortName}
          displayDate={data.weddingDate.displayDate}
        />

        {/* =====================================================================
            PHẦN 2: TOÀN BỘ NỘI DUNG THIỆP KHI ĐÃ MỞ PHONG BÌ (GIỐNG Y HỆT VIDEO 2)
           ===================================================================== */}
        {isEnvelopeOpen && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="space-y-12"
          >
            {/* 1. ẢNH HERO LỚN TRÀN NGANG "WE ARE Getting Married" (KHÁC ẢNH PHONG BÌ TRÊN) */}
            <section
              onClick={() => setLightboxUrl(data.sectionImages.hero)}
              className="cursor-zoom-in relative z-35 w-full aspect-[3/3.9] overflow-hidden bg-stone-100"
            >
              <motion.img
                initial={{ scale: 1.06 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                src={data.sectionImages.hero}
                alt={`${data.groom.fullName} & ${data.bride.fullName}`}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-[center_24%]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#24060E]/65 via-black/20 to-transparent flex flex-col items-center justify-end pb-7 px-4 text-white text-center">
                <p className="font-serif-luxury text-sm sm:text-base tracking-[0.26em] uppercase text-white/95 mb-0.5">
                  WE ARE
                </p>
                <h2 className="font-script-luxury text-5xl sm:text-6xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] leading-none">
                  Getting Married
                </h2>
              </div>
            </section>

            {/* 2. THÔNG TIN HAI BÊN GIA ĐÌNH & KHUNG GƯƠNG OVAL VIỀN VẢI REN + NGỌC TRAI + HOA CALLA ĐỎ */}
            <section className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className="grid grid-cols-2 gap-3 text-center max-w-sm mx-auto px-4 sm:px-6"
              >
                <div className="space-y-1">
                  <p className="font-serif-luxury font-bold text-xs tracking-[0.12em] text-[#6A1427]">
                    NHÀ TRAI
                  </p>
                  <p className="font-serif-luxury text-xs sm:text-[13px] text-[#3B1822]">
                    Ông. {data.groom.fatherName || 'Lê Minh Hải'}
                  </p>
                  <p className="font-serif-luxury text-xs sm:text-[13px] text-[#3B1822]">
                    Bà. {data.groom.motherName || 'Đỗ Thị Vân Lĩnh'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-serif-luxury font-bold text-xs tracking-[0.12em] text-[#6A1427]">
                    NHÀ GÁI
                  </p>
                  <p className="font-serif-luxury text-xs sm:text-[13px] text-[#3B1822]">
                    Ông. {data.bride.fatherName || 'Phan Văn Đồng'}
                  </p>
                  <p className="font-serif-luxury text-xs sm:text-[13px] text-[#3B1822]">
                    Bà. {data.bride.motherName || 'Trịnh Thị Nga'}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center space-y-0.5 px-4 sm:px-6"
              >
                <p className="font-serif-luxury text-xs uppercase tracking-[0.14em] text-[#6A1427]">
                  TRÂN TRỌNG KÍNH MỜI TỚI DỰ
                </p>
                <p className="font-serif-luxury text-xs sm:text-sm uppercase tracking-[0.1em] font-semibold text-[#6A1427]">
                  LỄ THÀNH HÔN CỦA GIA ĐÌNH CHÚNG MÌNH
                </p>
              </motion.div>

              {/* KHUNG GƯƠNG OVAL PHÓNG LỚN ÔM TRỌN NỘI DUNG + NGỌC TRAI + CÀNH HOA CALLA ĐỎ THẬT */}
              <div className="px-1.5 sm:px-2.5">
                <CrochetLaceMirrorFrame theme="burgundy">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.13, delayChildren: 0.15 },
                      },
                    }}
                    className="flex flex-col items-center justify-center text-center w-full"
                  >
                    {/* Tên dâu rể chữ thư pháp lớn mềm mại nằm gọn trong lòng gương */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                      }}
                      className="mb-3 px-2"
                    >
                      <h3 className="font-script-luxury text-[35px] sm:text-[41px] text-[#6A1427] leading-[1.18]">
                        <span className="block whitespace-nowrap">{data.groom.fullName}</span>
                        <span className="block mt-0.5 whitespace-nowrap">{data.bride.fullName}</span>
                      </h3>
                    </motion.div>

                    {/* Giờ & Thứ */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 8 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
                      }}
                      className="space-y-0.5 mb-2"
                    >
                      <p className="font-serif-luxury text-[11px] uppercase tracking-[0.14em] text-[#7D2C3F]">
                        ĐƯỢC TỔ CHỨC VÀO LÚC
                      </p>
                      <p className="font-serif-luxury text-xs sm:text-sm font-semibold tracking-[0.12em] text-[#591120]">
                        11:00, THỨ TƯ
                      </p>
                    </motion.div>

                    {/* Cụm Ngày Tháng: [THÁNG 03 kẻ trên dưới]  03  [NĂM 2027 kẻ trên dưới] */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, scale: 0.94 },
                        visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
                      }}
                      className="flex items-center justify-center gap-2.5 my-1.5 w-full max-w-[232px] sm:max-w-[260px]"
                    >
                      <span className="flex-1 py-1 border-y border-[#B26E80]/65 font-serif-luxury text-[11px] sm:text-xs tracking-[0.08em] text-[#6A1427]">
                        THÁNG 03
                      </span>
                      <span className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#6A1427] leading-none px-1">
                        03
                      </span>
                      <span className="flex-1 py-1 border-y border-[#B26E80]/65 font-serif-luxury text-[11px] sm:text-xs tracking-[0.08em] text-[#6A1427]">
                        NĂM 2027
                      </span>
                    </motion.div>

                    <motion.p
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { duration: 0.5 } },
                      }}
                      className="font-serif-italic text-xs text-[#7D2C3F] mt-1 mb-2"
                    >
                      ( Tức ngày 26 tháng 01 năm Đinh Mùi )
                    </motion.p>

                    {/* Thông tin ngày ăn cỗ trước trang nhã */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, scale: 0.96 },
                        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
                      }}
                      className="my-1.5 px-3 py-1 rounded-full bg-[#7D1E3A]/10 border border-[#7D1E3A]/20 text-[10.5px] sm:text-[11.5px] font-serif-luxury text-[#591120] shadow-2xs"
                    >
                      <span className="font-semibold text-[#7D1E3A]">Ăn cỗ trước:</span> Thứ Ba, 02.03.2027 (25.01 ÂL)
                    </motion.div>

                    {/* Địa điểm */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 8 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
                      }}
                      className="space-y-0.5 mb-3.5"
                    >
                      <p className="font-serif-luxury font-bold text-xs uppercase tracking-[0.1em] text-[#6A1427]">
                        TẠI TƯ GIA NHÀ TRAI
                      </p>
                      <p className="font-serif-luxury text-xs sm:text-[13px] text-[#4F1624]">
                        Phú Xá - Văn Môn - Bắc Ninh
                      </p>
                    </motion.div>

                    {/* Cụm Icon Pin Định Vị đặt trên chữ CHỈ ĐƯỜNG */}
                    <motion.a
                      variants={{
                        hidden: { opacity: 0, y: 6 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                      }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://maps.google.com/?q=Ph%C3%BA+X%C3%A1,+V%C4%83n+M%C3%B4n,+Y%C3%AAn+Phong,+B%E1%BA%AFc+Ninh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer inline-flex flex-col items-center gap-1 text-[#6A1427] hover:text-[#4A0B19] transition-colors group"
                    >
                      <svg viewBox="0 0 24 28" className="w-5 h-6 fill-current">
                        <path d="M12 1C6.48 1 2 5.48 2 11c0 7.25 10 16 10 16s10-8.75 10-16c0-5.52-4.48-10-10-10zm0 13.5c-1.93 0-3.5-1.57-3.5-3.5S10.07 7.5 12 7.5s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
                      </svg>
                      <span className="font-serif-luxury text-xs font-semibold uppercase tracking-[0.14em] border-b border-transparent group-hover:border-[#6A1427]">
                        CHỈ ĐƯỜNG
                      </span>
                    </motion.a>
                  </motion.div>
                </CrochetLaceMirrorFrame>
              </div>

              <div className="text-center pt-1 px-4 sm:px-6">
                <p className="font-script-luxury text-3xl sm:text-4xl text-[#6A1427]">
                  Hân hạnh được đón tiếp!
                </p>
              </div>
            </section>

            {/* 3. ẢNH DƯỚI HÂN HẠNH ĐÓN TIẾP (ẢNH 3 DSC_8923.JPG) + TIMELINE + DRESS CODE */}
            <section className="space-y-9">
              <div
                onClick={() => setLightboxUrl(data.sectionImages.loveStoryBg)}
                className="cursor-zoom-in relative z-35 w-full aspect-[2/3] overflow-hidden bg-stone-100"
              >
                <img
                  src={data.sectionImages.loveStoryBg}
                  alt="Where Love Begins"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex flex-col items-start justify-end pl-6 sm:pl-8 pb-6 text-white">
                  <span className="font-script-luxury text-3xl sm:text-4xl leading-none -mb-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                    Where
                  </span>
                  <span className="font-serif-luxury text-xs sm:text-sm tracking-[0.26em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                    LOVE BEGINS
                  </span>
                </div>
              </div>

              {/* TIMELINE NGHỆ THUẬT */}
              <div className="px-4 sm:px-8 space-y-7 relative overflow-hidden">
                <div className="text-center">
                  <h3 className="font-script-luxury text-5xl text-[#6A1427]">Timeline</h3>
                </div>

                <div className="relative max-w-[330px] mx-auto py-3">
                  {/* Trục dọc mảnh màu đỏ rượu ở chính tâm */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-[#7D2438]" />

                  <div className="space-y-9 relative z-10">
                    {timelineRows.map((row, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="grid grid-cols-[1fr_24px_1fr] items-center gap-3"
                      >
                        {/* Cột Trái */}
                        <div className="flex justify-end items-center text-right">
                          {row.iconLeft ? (
                            row.icon
                          ) : (
                            <div>
                              <p className="font-serif-luxury font-semibold text-sm text-[#591120]">
                                {row.time}
                              </p>
                              <p className="font-serif-luxury text-xs sm:text-[13px] tracking-[0.08em] uppercase text-[#6A1427]">
                                {row.title}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Viên Ngọc Trai 3D Ở Tâm Trục */}
                        <div className="flex items-center justify-center">
                          <div
                            className="w-3.5 h-3.5 rounded-full shadow-[0_2px_5px_rgba(70,12,24,0.25)]"
                            style={{
                              background:
                                'radial-gradient(circle at 32% 30%, #FFFFFF 0%, #FAF0F4 55%, #C9AAB7 100%)',
                            }}
                          />
                        </div>

                        {/* Cột Phải */}
                        <div className="flex justify-start items-center text-left">
                          {row.iconLeft ? (
                            <div>
                              <p className="font-serif-luxury font-semibold text-sm text-[#591120]">
                                {row.time}
                              </p>
                              <p className="font-serif-luxury text-xs sm:text-[13px] tracking-[0.08em] uppercase text-[#6A1427]">
                                {row.title}
                              </p>
                            </div>
                          ) : (
                            row.icon
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* DRESS CODE 4 HÌNH TRÒN MÀU */}
                <div className="text-center pt-2">
                  <h4 className="font-script-luxury text-4xl sm:text-5xl text-[#6A1427] mb-4">
                    Dress code
                  </h4>
                  <div className="flex items-center justify-center gap-3.5">
                    {dressCodeColors.map((c, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.12, y: -3 }}
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.16)] border border-black/10"
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 4. CẶP 2 ẢNH NGAY BÊN DƯỚI DRESS CODE (DSC_9037 & DSC_9112) + LỊCH TUẦN THÁNG 03 + PHONG BAO ĐỎ RƯỢU SAVE THE DATE */}
            <div>
              {data.sectionImages.dressCodePhotos ? (
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 px-3 sm:px-4 mb-5 relative z-35">
                  {data.sectionImages.dressCodePhotos.map((photoUrl, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.65, delay: idx * 0.12 }}
                      onClick={() => setLightboxUrl(photoUrl)}
                      className="cursor-zoom-in aspect-[2/3] w-full overflow-hidden rounded-lg bg-stone-100 shadow-[0_8px_20px_rgba(70,12,24,0.14)] group"
                    >
                      <img
                        src={photoUrl}
                        alt={`Huy Đức & Phan Hậu ${idx + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div
                  onClick={() => setLightboxUrl(data.sectionImages.countdown)}
                  className="cursor-zoom-in relative z-35 w-full aspect-[16/11] overflow-hidden bg-stone-100 mb-4"
                >
                  <img
                    src={data.sectionImages.countdown}
                    alt="Huy Đức & Phan Hậu"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-[center_20%]"
                  />
                </div>
              )}

              <WeeklySaveTheDateSection
                theme="burgundy"
                kissPhoto={data.sectionImages.kissPhoto}
                onImageClick={(url) => setLightboxUrl(url)}
              />
            </div>

            {/* 5. OUR STORY + 2 KHUNG POLAROID DÂU RỂ ĐÍNH DẤU SÁP ĐỎ + CÀNH HOA CALLA ĐỎ BÊN PHẢI (CHUẨN FRAME_007) */}
            <section className="px-4 sm:px-6 space-y-6 relative overflow-hidden">
              <div className="text-center">
                <h3 className="font-script-luxury text-5xl text-[#6A1427]">Our story</h3>
              </div>

              <div className="max-w-sm mx-auto text-center px-2 space-y-2.5">
                <p className="font-serif-luxury text-xs sm:text-[13px] leading-relaxed text-[#4F2531]">
                  Tình yêu của Đức và Hậu là một hành trình kỳ diệu, vượt qua bao thử thách để cùng
                  nhau bước đến ngày trọng đại - đám cưới của chúng mình.
                </p>
                <p className="font-serif-luxury text-xs sm:text-[13px] leading-relaxed text-[#4F2531]">
                  Đám cưới này là lời cam kết chân thành, là sự bắt đầu của một chương mới - nơi
                  chúng mình cùng vun đắp tổ ấm, cùng sẻ chia mọi vui buồn và cùng nắm tay nhau đi
                  đến cuối con đường mang tên hạnh phúc.
                </p>
              </div>

              {/* Cặp Polaroid Cô dâu & Chú rể đính dấu sáp đỏ ở tâm + Cành Calla đỏ nghiêng bên phải (y hệt v2_frames/frame_007) */}
              <div className="relative z-35 max-w-[360px] mx-auto h-[410px] sm:h-[435px] mt-4">
                {/* Cành hoa Calla đỏ rượu nghiêng ở góc phải trên */}
                <img
                  src={decorAsset('burgundy-calla-single.png')}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none select-none absolute -top-2 -right-6 w-28 sm:w-32 -rotate-[55deg] z-20 object-contain drop-shadow-md"
                />

                {/* Khung ảnh Cô dâu (bên trái trên, nghiêng nhẹ) + Tên bên phải */}
                <motion.div
                  initial={{ opacity: 0, x: -24, rotate: -8 }}
                  whileInView={{ opacity: 1, x: 0, rotate: -7 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  onClick={() => setLightboxUrl(data.bride.avatar)}
                  className="cursor-zoom-in absolute top-3 left-2 w-[172px] sm:w-[186px] bg-white p-2 pb-3.5 shadow-[0_12px_28px_rgba(70,12,24,0.16)] z-10"
                >
                  <div className="aspect-[3/3.6] overflow-hidden bg-stone-100">
                    <img
                      src={data.bride.avatar}
                      alt={data.bride.fullName}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-[center_18%]"
                    />
                  </div>
                </motion.div>

                <div className="absolute top-[110px] right-3 text-center z-15">
                  <p className="font-script-luxury text-2xl sm:text-3xl text-[#6A1427] leading-none">
                    Cô dâu
                  </p>
                  <p className="font-serif-luxury text-xs sm:text-sm uppercase tracking-[0.12em] text-[#4F1624] font-semibold mt-1">
                    {data.bride.fullName}
                  </p>
                </div>

                {/* Con dấu sáp đỏ rượu đính nối ở tâm giao điểm 2 khung Polaroid */}
                <div className="pointer-events-none absolute top-[186px] left-[48%] -translate-x-1/2 -translate-y-1/2 z-30">
                  <BotanicalWaxSeal theme="burgundy" size="md" />
                </div>

                {/* Khung ảnh Chú rể (bên phải dưới, nghiêng phải) + Tên bên trái */}
                <motion.div
                  initial={{ opacity: 0, x: 24, rotate: 8 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 6 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.12 }}
                  onClick={() => setLightboxUrl(data.groom.avatar)}
                  className="cursor-zoom-in absolute bottom-3 right-2 w-[172px] sm:w-[186px] bg-white p-2 pb-3.5 shadow-[0_12px_28px_rgba(70,12,24,0.16)] z-15"
                >
                  <div className="aspect-[3/3.6] overflow-hidden bg-stone-100">
                    <img
                      src={data.groom.avatar}
                      alt={data.groom.fullName}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-[center_18%]"
                    />
                  </div>
                </motion.div>

                <div className="absolute bottom-[78px] left-3 text-center z-15">
                  <p className="font-script-luxury text-2xl sm:text-3xl text-[#6A1427] leading-none">
                    Chú rể
                  </p>
                  <p className="font-serif-luxury text-xs sm:text-sm uppercase tracking-[0.12em] text-[#4F1624] font-semibold mt-1">
                    {data.groom.fullName}
                  </p>
                </div>
              </div>
            </section>

            {/* 6. ALBUM ẢNH CƯỚI (ĐƯA TOÀN BỘ ẢNH CHƯA SỬ DỤNG LÊN ĐẦU + NÚT CHUYỂN TRÁI/PHẢI + THUMBNAILS) */}
            <section className="px-4 sm:px-6 space-y-4">
              <div className="text-center">
                <p className="font-serif-luxury text-[11px] uppercase tracking-[0.22em] text-[#843045]">
                  SWEET MEMORIES
                </p>
                <h3 className="font-script-luxury text-4xl sm:text-5xl text-[#6A1427]">
                  Album Ảnh Cưới
                </h3>
              </div>

              {/* Khung ảnh lớn kèm nút điều hướng < > */}
              <div
                onClick={() => setLightboxUrl(galleryPhotos[selectedGalleryIdx])}
                className="cursor-zoom-in relative z-35 w-full aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 shadow-[0_14px_32px_rgba(70,12,24,0.18)] border-4 border-white group"
              >
                <img
                  src={galleryPhotos[selectedGalleryIdx]}
                  alt={`Ảnh cưới ${selectedGalleryIdx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-[center_22%] transition-all duration-500"
                />

                <button
                  type="button"
                  onClick={goPrevPhoto}
                  className="cursor-pointer absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#6A1427] shadow-md flex items-center justify-center transition-transform active:scale-90"
                  aria-label="Ảnh trước"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={goNextPhoto}
                  className="cursor-pointer absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#6A1427] shadow-md flex items-center justify-center transition-transform active:scale-90"
                  aria-label="Ảnh tiếp"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Thanh trượt Thumbnails bên dưới */}
              <div
                ref={thumbnailScrollRef}
                className="flex items-center gap-2 overflow-x-auto py-1.5 px-0.5 scroll-smooth relative z-35"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {galleryPhotos.map((photo, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedGalleryIdx(idx)}
                    className={`cursor-pointer shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedGalleryIdx === idx
                        ? 'border-[#6A1427] scale-105 shadow-md'
                        : 'border-white opacity-65 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={photo}
                      alt={`Thumbnail ${idx + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-[center_20%]"
                    />
                  </button>
                ))}
              </div>
            </section>

            {/* 7. HỘP QUÀ MỪNG CƯỚI (MÃ QR CĂN GIỮA GỌN ĐẸP) */}
            <section className="px-4 sm:px-6">
              <div className="text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6A1427]/10 text-[#6A1427] text-[11px] font-serif-luxury tracking-wider uppercase mb-1">
                  <Gift className="w-3.5 h-3.5" />
                  <span>MỪNG CƯỚI DÂU RỂ</span>
                </div>

                <h3 className="font-script-luxury text-4xl text-[#6A1427] mb-1">
                  Hộp Quà Mừng Cưới
                </h3>
                <p className="text-xs text-[#7D2C3F] mb-4">
                  {!isGiftBoxOpen
                    ? 'Chạm vào phong bao bên dưới để mở mã QR mừng cưới'
                    : 'Chạm vào mã QR để phóng to hoặc sao chép số tài khoản'}
                </p>

                <AnimatePresence mode="wait">
                  {!isGiftBoxOpen ? (
                    <motion.div
                      key="closed-calla-gift"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.04 }}
                      onClick={handleOpenGiftBox}
                      className="cursor-pointer relative mx-auto w-full max-w-[250px] h-40 rounded-2xl border border-[#D9A8B8] p-3.5 shadow-md flex flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#6C1022] to-[#4A0714] group hover:border-[#FCE79C]"
                    >
                      <div className="pointer-events-none absolute inset-1.5 rounded-xl border border-white/20" />
                      <div className="relative z-10 my-auto">
                        <BotanicalWaxSeal theme="burgundy" size="sm" />
                      </div>
                      <div className="relative z-10 w-full flex items-center justify-center">
                        <div className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FAF4F6] text-[#6A1427] text-xs font-serif-luxury whitespace-nowrap shadow-xs group-hover:bg-[#FCE79C] group-hover:text-[#3B0715] transition-colors">
                          <LockOpen className="w-3.5 h-3.5 shrink-0" />
                          <span className="font-semibold">Chạm Để Mở Mã QR</span>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="opened-calla-gift"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {/* QR Chú rể */}
                        <div className="bg-white rounded-2xl p-4 border border-[#EAD7DF] shadow-xs text-center">
                          <p className="font-serif-luxury font-bold text-xs text-[#6A1427] mb-2">
                            {data.groomQrGift.roleLabel}
                          </p>
                          <div
                            onClick={() => setLightboxUrl(data.groomQrGift.qrImageUrl)}
                            className="cursor-zoom-in w-34 h-34 mx-auto rounded-xl overflow-hidden border border-stone-200 p-2 bg-stone-50 mb-2"
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
                              className="cursor-pointer p-1 text-[#6A1427]"
                              title="Sao chép STK"
                            >
                              {copiedKey === 'groom' ? (
                                <Check className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                          <p className="text-[11px] text-[#843045] mt-0.5">
                            {data.groomQrGift.bankBranch}
                          </p>
                        </div>

                        {/* QR Cô dâu */}
                        <div className="bg-white rounded-2xl p-4 border border-[#EAD7DF] shadow-xs text-center">
                          <p className="font-serif-luxury font-bold text-xs text-[#6A1427] mb-2">
                            {data.brideQrGift.roleLabel}
                          </p>
                          <div
                            onClick={() => setLightboxUrl(data.brideQrGift.qrImageUrl)}
                            className="cursor-zoom-in w-34 h-34 mx-auto rounded-xl overflow-hidden border border-stone-200 p-2 bg-stone-50 mb-2"
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
                              className="cursor-pointer p-1 text-[#6A1427]"
                              title="Sao chép STK"
                            >
                              {copiedKey === 'bride' ? (
                                <Check className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                          <p className="text-[11px] text-[#843045] mt-0.5">
                            {data.brideQrGift.bankBranch}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsGiftBoxOpen(false)}
                        className="cursor-pointer text-xs text-[#6A1427] hover:underline"
                      >
                        Thu gọn hộp quà
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* 8. FORM XÁC NHẬN THAM DỰ & GỬI LỜI CHÚC (CHUẨN THIẾT KẾ VIDEO 2) */}
            <section className="px-5 sm:px-8 space-y-6">
              <div className="text-center max-w-xs mx-auto">
                <p className="font-serif-luxury text-xs sm:text-sm leading-relaxed text-[#6A1427]">
                  Hãy xác nhận sự có mặt của bạn để chúng mình chuẩn bị đón tiếp một cách chu đáo
                  nhất. Trân trọng!
                </p>
              </div>

              <form onSubmit={handleSubmitForm} className="max-w-sm mx-auto space-y-3">
                <input
                  type="text"
                  required
                  value={guestInputName}
                  onChange={(e) => setGuestInputName(e.target.value)}
                  placeholder="Tên của bạn"
                  className="w-full px-4 py-2.5 rounded-full border border-[#AD687A] bg-white/90 text-xs sm:text-sm text-[#331B23] placeholder:text-[#8E6270] focus:outline-none focus:ring-1 focus:ring-[#6A1427]"
                />

                <textarea
                  required
                  rows={3}
                  value={guestWish}
                  onChange={(e) => setGuestWish(e.target.value)}
                  placeholder="Gửi lời nhắn đến cô dâu chú rể"
                  className="w-full px-4 py-3 rounded-2xl border border-[#AD687A] bg-white/90 text-xs sm:text-sm text-[#331B23] placeholder:text-[#8E6270] focus:outline-none focus:ring-1 focus:ring-[#6A1427]"
                />

                <select
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full border border-[#AD687A] bg-white/90 text-xs sm:text-sm text-[#331B23] focus:outline-none focus:ring-1 focus:ring-[#6A1427]"
                >
                  <option value="Có, chắc chắn mình sẽ tham dự!">
                    Có, chắc chắn mình sẽ tham dự!
                  </option>
                  <option value="Rất tiếc, mình bận việc không thể tham dự được">
                    Rất tiếc, mình bận việc không thể tham dự được
                  </option>
                </select>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="cursor-pointer w-full py-3 rounded-full bg-[#6A1427] hover:bg-[#520C1C] text-white text-xs sm:text-sm font-serif-luxury uppercase tracking-[0.12em] font-semibold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>GỬI LỜI NHẮN &amp; XÁC NHẬN</span>
                </motion.button>

                {wishSubmitted && (
                  <p className="text-xs text-center text-[#6A1427] font-medium pt-1">
                    Cảm ơn bạn! Lời chúc ngọt ngào của bạn đã được gửi tới dâu rể.
                  </p>
                )}
              </form>

              {/* Danh sách lời chúc công khai (Ẩn trạng thái tham dự theo yêu cầu, kẻ dòng tinh tế như frame_011) */}
              {wishes.length > 0 && (
                <div className="max-w-sm mx-auto pt-3">
                  <h4 className="font-serif-luxury font-bold text-center text-sm tracking-[0.18em] uppercase text-[#6A1427] mb-3">
                    YOUR WISHES
                  </h4>
                  <div className="divide-y divide-[#E5CFD7] border-y border-[#E5CFD7] max-h-72 overflow-y-auto px-1">
                    {wishes.slice(0, 12).map((item) => (
                      <div key={item.id} className="py-3 text-left">
                        <p className="font-serif-luxury font-bold text-xs sm:text-sm text-[#591120]">
                          {item.name}
                        </p>
                        <p className="font-serif-luxury text-xs text-[#593944] leading-relaxed mt-0.5">
                          {item.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* 9. PHẦN CUỐI TRANG: LỜI CẢM ƠN & PHONG BÌ ĐỎ RƯỢU MỞ NẮP NHỌN LỒNG ẢNH CÔNG CHÚA (CHUẨN FRAME_011) */}
            <ThankYouOpenEnvelopeSection
              theme="burgundy"
              photoUrl={data.sectionImages.thankYouBg}
              thankYouTitle={data.thankYouText.title}
              thankYouMessage={data.thankYouText.message}
              groomShortName={data.groom.shortName}
              brideShortName={data.bride.shortName}
              displayDate={data.weddingDate.displayDate}
              onImageClick={(url) => setLightboxUrl(url)}
            />
          </motion.div>
        )}
      </div>

      {/* Lightbox phóng to xem ảnh rõ nét 100% */}
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
