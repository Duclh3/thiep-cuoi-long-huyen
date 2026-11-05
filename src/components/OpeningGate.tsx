import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Film, Crown, BookOpen } from 'lucide-react';
import { StyleId, THEMES, WeddingData } from '../data/weddingData';

interface OpeningGateProps {
  isOpen: boolean;
  onUnlock: () => void;
  styleId: StyleId;
  onSelectStyle: (id: StyleId) => void;
  data: WeddingData;
  guestName: string;
  hideStyleSwitcher?: boolean;
}

/**
 * Bó hoa Rum (Calla Lily) đỏ rượu & trắng kem vẽ bằng SVG nghệ thuật
 * dành riêng cho Phong cách 01: Thơ Mộng Fine Art
 */
const CallaLilyBouquet: React.FC<{ className?: string; flip?: boolean }> = ({
  className = '',
  flip = false,
}) => (
  <svg
    viewBox="0 0 140 190"
    className={`${className} ${flip ? 'scale-x-[-1]' : ''}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M62 182C64 148 56 112 46 72" stroke="#5B7043" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M68 184C72 145 74 105 76 54" stroke="#4A5D32" strokeWidth="3.8" strokeLinecap="round" />
    <path d="M74 182C80 148 92 115 104 78" stroke="#697E4E" strokeWidth="3.2" strokeLinecap="round" />
    <path d="M58 180C56 154 44 128 32 96" stroke="#76895B" strokeWidth="2.8" strokeLinecap="round" />
    <path d="M52 146C62 150 76 150 84 145" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" />
    <circle cx="48" cy="112" r="10" fill="#8FA86A" fillOpacity="0.85" />
    <circle cx="62" cy="118" r="11" fill="#A5BC82" fillOpacity="0.9" />
    <circle cx="84" cy="116" r="10" fill="#7D9659" fillOpacity="0.85" />
    <circle cx="72" cy="104" r="9" fill="#B5C994" fillOpacity="0.9" />
    <path d="M36 92C26 80 34 66 48 72C60 76 56 94 36 92Z" fill="#FBF8F3" stroke="#E5DCCB" strokeWidth="1.2" />
    <path d="M66 96C58 82 68 68 82 74C94 80 86 98 66 96Z" fill="#FFFDF9" stroke="#E5DCCB" strokeWidth="1.2" />
    <path d="M44 68C30 48 34 26 52 30C66 33 62 56 44 68Z" fill="url(#burgundyLily1)" />
    <path d="M47 42L51 33" stroke="#F4D06F" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M75 56C63 34 72 14 90 20C104 25 95 48 75 56Z" fill="url(#burgundyLily2)" />
    <path d="M80 32L85 22" stroke="#F4D06F" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M102 80C94 60 105 44 120 52C131 58 120 76 102 80Z" fill="url(#burgundyLily3)" />
    <path d="M108 62L114 54" stroke="#F4D06F" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M28 96C14 82 16 62 32 66C44 69 40 88 28 96Z" fill="url(#burgundyLily1)" />
    <defs>
      <linearGradient id="burgundyLily1" x1="30" y1="26" x2="58" y2="68" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7C2334" />
        <stop offset="0.6" stopColor="#4F121D" />
        <stop offset="1" stopColor="#2E070E" />
      </linearGradient>
      <linearGradient id="burgundyLily2" x1="65" y1="16" x2="96" y2="56" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8C293C" />
        <stop offset="0.6" stopColor="#581522" />
        <stop offset="1" stopColor="#330810" />
      </linearGradient>
      <linearGradient id="burgundyLily3" x1="94" y1="45" x2="125" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7A2031" />
        <stop offset="1" stopColor="#3B0B14" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * Con dấu sáp đỏ rượu in nổi cánh bướm vàng 3D (Phong cách 01 - Fine Art)
 */
const WaxButterflySeal: React.FC<{ isOpening: boolean }> = ({ isOpening }) => (
  <motion.div
    animate={
      isOpening
        ? { scale: [1, 1.16, 0.88], rotate: [0, -8, 12], opacity: [1, 1, 0] }
        : { scale: [1, 1.04, 1] }
    }
    transition={
      isOpening
        ? { duration: 1.1, ease: 'easeInOut' }
        : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
    }
    className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(46,7,14,0.45)] select-none"
    style={{
      background: 'radial-gradient(circle at 32% 28%, #6D2331 0%, #4A141F 58%, #2B0910 100%)',
      boxShadow:
        '0 8px 22px rgba(45, 10, 18, 0.45), inset 0 2px 4px rgba(255,255,255,0.22), inset 0 -4px 8px rgba(0,0,0,0.6)',
    }}
  >
    <div className="w-[82%] h-[82%] rounded-full border border-[#8E3B4B]/70 shadow-inner flex items-center justify-center">
      <svg viewBox="0 0 64 64" className="w-9 h-9 sm:w-11 sm:h-11 drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]">
        <defs>
          <linearGradient id="goldButterfly" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FCE79C" />
            <stop offset="0.45" stopColor="#D4AF37" />
            <stop offset="0.8" stopColor="#9E7618" />
            <stop offset="1" stopColor="#F7DF8B" />
          </linearGradient>
        </defs>
        <path
          d="M30 31C23 19 10 14 8 23C6 30 14 36 25 36C15 39 11 47 16 51C21 55 28 48 31 39L32 35L33 39C36 48 43 55 48 51C53 47 49 39 39 36C50 36 58 30 56 23C54 14 41 19 34 31L32 33L30 31Z"
          fill="url(#goldButterfly)"
        />
        <path
          d="M32 22V45M32 24C29 19 26 17 24 17M32 24C35 19 38 17 40 17"
          stroke="#FFF3C4"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  </motion.div>
);

export const OpeningGate: React.FC<OpeningGateProps> = ({
  isOpen,
  onUnlock,
  styleId,
  onSelectStyle,
  data,
  guestName,
  hideStyleSwitcher = false,
}) => {
  /**
   * Thời gian tự động mở thiệp đã được tăng thêm 4 giây (tổng cộng 8.8 giây):
   * - 0s -> 3.6s: Hoạt cảnh Chú Rể & Cô Dâu tiến lại trao nụ hôn ngọt ngào
   * - 3.6s -> 6.3s: Nắp phong bì / Bìa tạp chí / Hộp sao / Ấn Song Hỷ tự động mở dần
   * - 6.3s -> 8.8s: Tấm thiệp bên trong trồi lên cao rồi mới mở vào web
   */
  const [stage, setStage] = useState<'kiss' | 'envelope-opening' | 'card-rising'>('kiss');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) return;

    setStage('kiss');
    setProgress(0);

    const startTime = Date.now();
    const totalDuration = 8800; // 8.8 giây (tăng thêm hơn 4 giây so với trước)

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / totalDuration) * 100);
      setProgress(pct);
    }, 45);

    const t1 = setTimeout(() => {
      setStage('envelope-opening');
    }, 3600);

    const t2 = setTimeout(() => {
      setStage('card-rising');
    }, 6300);

    const t3 = setTimeout(() => {
      onUnlock();
    }, totalDuration);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isOpen, styleId]); // Reset lại bộ đếm khi người dùng chuyển đổi phong cách để thoải mái ngắm

  const isFlapOpen = stage === 'envelope-opening' || stage === 'card-rising';
  const isCardRising = stage === 'card-rising';

  // Cấu hình màu nền riêng biệt hoàn toàn cho 4 phong cách mở thiệp
  const getScreenBackground = () => {
    switch (styleId) {
      case 'fairytale':
        return 'radial-gradient(circle at 50% 25%, #FFFDF9 0%, #F8F3EB 55%, #EFE7DC 100%)';
      case 'editorial':
        return 'linear-gradient(180deg, #12100E 0%, #1C1917 48%, #0E0C0A 100%)';
      case 'cinematic':
        return 'radial-gradient(circle at 50% 20%, #24192C 0%, #0E0B14 55%, #060508 100%)';
      case 'indochine':
        return 'radial-gradient(circle at 50% 25%, #5C0D14 0%, #3A060A 60%, #1F0204 100%)';
    }
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="opening-envelope-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: 'blur(8px)',
            transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
          }}
          onClick={() => onUnlock()}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden select-none cursor-pointer px-4 py-4 sm:py-7 transition-colors duration-700"
          style={{ background: getScreenBackground() }}
        >
          {/* Họa tiết nền riêng cho từng phong cách */}
          {styleId === 'fairytale' && (
            <div
              className="pointer-events-none absolute inset-0 opacity-35"
              style={{
                backgroundImage: 'radial-gradient(#C8B294 0.6px, transparent 0.6px)',
                backgroundSize: '20px 20px',
              }}
            />
          )}

          {styleId === 'editorial' && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-15 flex flex-col justify-between p-6">
              <div className="font-serif-luxury text-[110px] sm:text-[180px] leading-none tracking-tighter text-white/25 text-center select-none">
                VOGUE
              </div>
              <div className="font-tall-editorial text-[90px] sm:text-[140px] leading-none tracking-[0.25em] text-amber-200/20 text-center select-none">
                28.11.26
              </div>
            </div>
          )}

          {styleId === 'cinematic' && (
            <div
              className="pointer-events-none absolute inset-0 opacity-45"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(240,173,100,0.45) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)',
                backgroundSize: '36px 36px, 22px 22px',
                backgroundPosition: '0 0, 14px 18px',
              }}
            />
          )}

          {styleId === 'indochine' && (
            <>
              <div className="pointer-events-none absolute inset-3 sm:inset-6 border-2 border-[#F7CE68]/35 rounded-lg" />
              <div className="pointer-events-none absolute inset-5 sm:inset-8 border border-[#F7CE68]/20 rounded-md" />
              {/* Câu đối Á Đông hai bên màn hình */}
              <div className="hidden md:flex flex-col items-center justify-center absolute left-10 top-1/2 -translate-y-1/2 text-[#F7CE68]/45 font-serif-luxury text-2xl space-y-2 border-x border-[#F7CE68]/25 px-3 py-6">
                <span>TRĂM</span>
                <span>NĂM</span>
                <span>TÌNH</span>
                <span>VIÊN</span>
                <span>MÃN</span>
              </div>
              <div className="hidden md:flex flex-col items-center justify-center absolute right-10 top-1/2 -translate-y-1/2 text-[#F7CE68]/45 font-serif-luxury text-2xl space-y-2 border-x border-[#F7CE68]/25 px-3 py-6">
                <span>BẠC</span>
                <span>ĐẦU</span>
                <span>NGHĨA</span>
                <span>PHU</span>
                <span>THÊ</span>
              </div>
            </>
          )}

          {/* THANH CHỌN 4 PHONG CÁCH ĐẶC TRƯNG TRÊN ĐỈNH MÀN HÌNH (Ẩn khi mở bằng link đơn phong cách) */}
          {!hideStyleSwitcher ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative z-30 w-full max-w-lg mx-auto"
            >
              <div
                className={`rounded-full p-1 flex items-center justify-between shadow-lg border backdrop-blur-xl ${
                  styleId === 'fairytale'
                    ? 'bg-white/85 border-stone-300/80'
                    : 'bg-black/65 border-white/20'
                }`}
              >
                {(Object.keys(THEMES) as StyleId[]).map((id) => {
                  const t = THEMES[id];
                  const active = styleId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => onSelectStyle(id)}
                      className={`cursor-pointer flex-1 py-1.5 px-2 rounded-full text-[10px] sm:text-xs font-medium transition-all duration-300 ${
                        active
                          ? styleId === 'fairytale'
                            ? 'bg-[#5A1824] text-white shadow'
                            : 'bg-gradient-to-r from-amber-300 to-amber-500 text-stone-950 font-bold shadow'
                          : styleId === 'fairytale'
                          ? 'text-stone-600 hover:text-stone-900'
                          : 'text-stone-300 hover:text-white'
                      }`}
                    >
                      <span className="truncate">{t.vietnameseName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="h-2" />
          )}

          {/* KHU VỰC TRUNG TÂM: HOẠT CẢNH CÔ DÂU CHÚ RỂ HÔN NHAU & 4 KIỂU MỞ THIỆP KHÁC BIỆT */}
          <div className="relative z-20 w-full max-w-md mx-auto flex flex-col items-center my-auto py-1">
            {/* Tiêu đề trạng thái phía trên */}
            <motion.div
              key={`title-${styleId}-${stage}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-2 sm:mb-3"
            >
              {styleId === 'fairytale' && (
                <p className="font-script-luxury text-3xl sm:text-4xl text-[#524338]">
                  {stage === 'kiss' ? 'Nụ hôn mở lời hẹn ước...' : 'Phong bì tình yêu đang mở...'}
                </p>
              )}
              {styleId === 'editorial' && (
                <div>
                  <span className="font-tall-editorial text-[10px] tracking-[0.38em] text-[#C5A059] uppercase block">
                    VOGUE EXCLUSIVE EDITION • NOVEMBER 2026
                  </span>
                  <p className="font-serif-luxury text-2xl sm:text-3xl text-white tracking-wider uppercase mt-0.5">
                    {stage === 'kiss' ? 'THE COUTURE KISS' : 'UNFOLDING THE ISSUE'}
                  </p>
                </div>
              )}
              {styleId === 'cinematic' && (
                <div>
                  <span className="font-tall-editorial text-[10px] tracking-[0.35em] text-[#F0AD64] uppercase block">
                    ★ A STARLIGHT MOTION PICTURE ★
                  </span>
                  <p className="font-script-luxury text-3xl sm:text-4xl text-amber-200">
                    {stage === 'kiss' ? 'Dưới bầu trời pháo hoa rực sáng...' : 'Màn nhung điện ảnh đang mở...'}
                  </p>
                </div>
              )}
              {styleId === 'indochine' && (
                <div>
                  <span className="font-tall-editorial text-[10px] tracking-[0.35em] text-[#F7CE68] uppercase block">
                    ✦ LỄ THÀNH HÔN &amp; VU QUY • BÍNH NGỌ 2026 ✦
                  </span>
                  <p className="font-serif-luxury text-2xl sm:text-3xl text-[#FFF8EC] font-bold tracking-widest mt-0.5">
                    {stage === 'kiss' ? 'DUYÊN TIỀN ĐỊNH • TƠ HỒNG KẾT' : 'KHAI MỞ ẤN SONG HỶ'}
                  </p>
                </div>
              )}
            </motion.div>

            {/* HOẠT CẢNH CHÚ RỂ & CÔ DÂU TIẾN LẠI GẦN HÔN NHAU (0s -> 3.6s) */}
            <div className="relative w-full flex items-center justify-center mb-3 h-20 sm:h-22">
              {/* Chú rể tiến từ bên trái vào giữa */}
              <motion.div
                key={`groom-${styleId}`}
                initial={{ x: -75, opacity: 0, rotate: -8 }}
                animate={{
                  x: stage === 'kiss' ? -8 : -3,
                  opacity: 1,
                  rotate: stage === 'kiss' ? 4 : 0,
                  scale: stage === 'kiss' ? 1.02 : 0.94,
                }}
                transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
                className={`relative z-10 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden shadow-xl ${
                  styleId === 'editorial'
                    ? 'rounded-none border-2 border-[#C5A059]'
                    : styleId === 'indochine'
                    ? 'rounded-xl border-2 border-[#F7CE68]'
                    : 'rounded-full border-2 border-[#D4AF37]'
                }`}
              >
                <img
                  src={data.groom.avatar}
                  alt={data.groom.shortName}
                  className="w-full h-full object-cover object-[center_18%]"
                />
              </motion.div>

              {/* Điểm chạm nụ hôn & trái tim lan tỏa */}
              <motion.div
                key={`heart-${styleId}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.35, 1.08],
                  opacity: [0, 1, 1],
                }}
                transition={{ delay: 1.3, duration: 1.0, ease: 'backOut' }}
                className={`relative z-30 -mx-2.5 w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center shadow-xl ${
                  styleId === 'indochine'
                    ? 'bg-[#8C1D24] border-[#F7CE68] text-[#F7CE68]'
                    : styleId === 'editorial'
                    ? 'bg-stone-950 border-[#C5A059] text-[#C5A059]'
                    : 'bg-gradient-to-br from-[#7C2334] to-[#4A121D] border-[#F5E1A4] text-[#FCE79C]'
                }`}
              >
                {styleId === 'indochine' ? (
                  <span className="font-serif-luxury text-lg font-bold leading-none">囍</span>
                ) : (
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current animate-pulse" />
                )}
                {[...Array(5)].map((_, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 0, x: 0, scale: 0.4 }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: -30 - idx * 8,
                      x: (idx - 2) * 15,
                      scale: [0.5, 1.15, 0.7],
                    }}
                    transition={{
                      delay: 1.5 + idx * 0.18,
                      duration: 1.8,
                      repeat: Infinity,
                      repeatDelay: 0.8,
                    }}
                    className="pointer-events-none absolute text-rose-400 text-xs"
                  >
                    ♥
                  </motion.span>
                ))}
              </motion.div>

              {/* Cô dâu tiến từ bên phải vào giữa */}
              <motion.div
                key={`bride-${styleId}`}
                initial={{ x: 75, opacity: 0, rotate: 8 }}
                animate={{
                  x: stage === 'kiss' ? 8 : 3,
                  opacity: 1,
                  rotate: stage === 'kiss' ? -4 : 0,
                  scale: stage === 'kiss' ? 1.02 : 0.94,
                }}
                transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
                className={`relative z-10 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden shadow-xl ${
                  styleId === 'editorial'
                    ? 'rounded-none border-2 border-[#C5A059]'
                    : styleId === 'indochine'
                    ? 'rounded-xl border-2 border-[#F7CE68]'
                    : 'rounded-full border-2 border-[#D4AF37]'
                }`}
              >
                <img
                  src={data.bride.avatar}
                  alt={data.bride.shortName}
                  className="w-full h-full object-cover object-[center_18%]"
                />
              </motion.div>
            </div>

            {/* =====================================================================
                4 KIẾN TRÚC PHONG BÌ / BÌA TẠP CHÍ / HỘP ĐIỆN ẢNH / THIỆP ĐÔNG DƯƠNG
               ===================================================================== */}

            {/* 1. PHONG CÁCH 01: THƠ MỘNG FINE ART (Phong bì kem + Hoa Rum + Con dấu Bướm Vàng + Polaroid) */}
            {styleId === 'fairytale' && (
              <div
                className="relative w-[300px] sm:w-[360px] h-[205px] sm:h-[240px] my-1"
                style={{ perspective: '1200px' }}
              >
                <CallaLilyBouquet className="pointer-events-none absolute -top-12 -left-8 sm:-top-14 sm:-left-10 w-28 sm:w-32 z-30 drop-shadow-md" />
                <CallaLilyBouquet
                  flip
                  className="pointer-events-none absolute -bottom-10 -right-7 sm:-bottom-12 sm:-right-9 w-28 sm:w-32 z-30 drop-shadow-md"
                />

                <div
                  className="absolute inset-0 rounded-[8px] shadow-[0_22px_50px_rgba(68,48,32,0.18)] border border-[#DFD5C5]"
                  style={{ background: 'linear-gradient(180deg, #EDE5D8 0%, #E5DBC9 100%)' }}
                />

                {/* Tấm thiệp nụ hôn bên trong trồi lên */}
                <motion.div
                  initial={{ y: 12, scale: 0.94, opacity: 0.9 }}
                  animate={
                    isCardRising
                      ? { y: -85, scale: 1.06, opacity: 1 }
                      : isFlapOpen
                      ? { y: -36, scale: 0.98, opacity: 1 }
                      : { y: 12, scale: 0.94, opacity: 0.9 }
                  }
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-4 top-3 bottom-3 z-10 rounded-[6px] bg-[#FFFDF9] border border-[#E5DAC8] shadow-xl p-2.5 flex flex-col items-center justify-between overflow-hidden"
                >
                  <div className="w-full h-[76%] rounded-[4px] overflow-hidden relative">
                    <img
                      src={data.sectionImages.kissPhoto}
                      alt="Nụ hôn Thành Long & Thanh Huyền"
                      className="w-full h-full object-cover object-[center_28%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    <span className="absolute bottom-1.5 left-0 right-0 text-center font-script-luxury text-xl text-white drop-shadow">
                      Sweet Kiss • Forever Love
                    </span>
                  </div>
                  <p className="font-tall-editorial text-[11px] tracking-[0.22em] text-[#4A3B31] uppercase">
                    THÀNH LONG &amp; THANH HUYỀN • 28.11.2026
                  </p>
                </motion.div>

                <svg
                  viewBox="0 0 360 240"
                  className="pointer-events-none absolute inset-0 w-full h-full z-20 rounded-[8px] overflow-hidden"
                  preserveAspectRatio="none"
                >
                  <polygon points="0,0 180,126 0,240" fill="#F3ECE1" stroke="#E2D8C7" strokeWidth="1" />
                  <polygon points="360,0 180,126 360,240" fill="#EFE7DA" stroke="#E2D8C7" strokeWidth="1" />
                  <polygon points="0,240 180,118 360,240" fill="#F7F1E7" stroke="#DFD4C2" strokeWidth="1.2" />
                </svg>

                <motion.div
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: isFlapOpen ? 180 : 0 }}
                  transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    transformOrigin: 'top center',
                    transformStyle: 'preserve-3d',
                    zIndex: isFlapOpen ? 5 : 25,
                  }}
                  className="pointer-events-none absolute top-0 left-0 right-0 h-[134px]"
                >
                  <svg viewBox="0 0 360 134" className="w-full h-full" preserveAspectRatio="none">
                    <polygon points="0,0 360,0 180,130" fill="#FBF7F0" stroke="#DDD1BE" strokeWidth="1.4" />
                  </svg>
                </motion.div>

                <div className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 z-30">
                  <WaxButterflySeal isOpening={isFlapOpen} />
                </div>

                <motion.div
                  initial={{ rotate: -8, y: 10, opacity: 0 }}
                  animate={
                    isCardRising
                      ? { rotate: -10, x: -12, y: 6, opacity: 1 }
                      : { rotate: -7, x: 0, y: 0, opacity: 1 }
                  }
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                  className="fine-art-polaroid absolute -left-5 sm:-left-8 -bottom-7 sm:-bottom-8 z-30 w-[112px] sm:w-[132px] p-1.5 pb-5 sm:p-2 sm:pb-6 rounded-[3px]"
                >
                  <div className="aspect-[3/3.8] w-full overflow-hidden bg-stone-100">
                    <img
                      src={data.sectionImages.heroLeftFloat}
                      alt="Thành Long & Thanh Huyền"
                      className="w-full h-full object-cover object-[center_20%]"
                    />
                  </div>
                </motion.div>
              </div>
            )}

            {/* 2. PHONG CÁCH 02: TẠP CHÍ VOGUE (Bìa Đôi Tạp Chí Thời Trang Đen Tuyền & Vàng Champagne) */}
            {styleId === 'editorial' && (
              <div
                className="relative w-[300px] sm:w-[360px] h-[215px] sm:h-[250px] my-1"
                style={{ perspective: '1400px' }}
              >
                {/* Khung bìa trong Tạp Chí Vogue */}
                <motion.div
                  animate={
                    isCardRising
                      ? { y: -55, scale: 1.07 }
                      : isFlapOpen
                      ? { y: -20, scale: 1.02 }
                      : { y: 0, scale: 0.98 }
                  }
                  transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 bg-[#FAF6F0] text-stone-950 border-2 border-[#C5A059] p-3 flex flex-col justify-between shadow-[0_25px_70px_rgba(0,0,0,0.85)] z-10"
                >
                  <div className="flex items-center justify-between border-b border-stone-900 pb-1">
                    <span className="font-serif-luxury text-lg font-bold tracking-tighter">VOGUE</span>
                    <span className="font-tall-editorial text-[9px] tracking-[0.28em]">WEDDING ISSUE • 28.11</span>
                  </div>
                  <div className="relative flex-1 my-2 overflow-hidden bg-stone-900">
                    <img
                      src={data.sectionImages.kissPhoto}
                      alt="Vogue Cover"
                      className="w-full h-full object-cover object-[center_26%] grayscale-[20%] contrast-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 text-white flex items-end justify-between">
                      <span className="font-serif-luxury text-xl italic">Long &amp; Huyền</span>
                      <span className="font-tall-editorial text-[10px] tracking-[0.2em] text-[#F5E1A4]">EXCLUSIVE</span>
                    </div>
                  </div>
                </motion.div>

                {/* 2 Cánh Cổng Bìa Tạp Chí Đen Nhám Viền Vàng Mở Ngang (Bố cục chéo không bao giờ bị khóa giữa che chữ) */}
                <motion.div
                  animate={{ rotateY: isFlapOpen ? -145 : 0 }}
                  transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                  style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
                  className="absolute inset-y-0 left-0 w-1/2 bg-[#141210] border-y-2 border-l-2 border-r border-[#C5A059] z-20 p-3.5 sm:p-4 flex flex-col justify-between items-start text-left shadow-2xl"
                >
                  <div className="w-full">
                    <span className="font-tall-editorial text-[9px] tracking-[0.28em] text-[#C5A059] block mb-1">
                      NO. 28 // GROOM
                    </span>
                    <div className="font-serif-luxury text-lg sm:text-xl font-semibold text-white tracking-[0.12em] leading-snug pr-4">
                      THÀNH
                      <br />
                      LONG
                    </div>
                  </div>
                  <div className="w-8 h-[1px] bg-[#C5A059]/50" />
                  <span className="font-tall-editorial text-[9px] tracking-[0.25em] text-stone-400">
                    BORN • 2000
                  </span>
                </motion.div>

                <motion.div
                  animate={{ rotateY: isFlapOpen ? 145 : 0 }}
                  transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                  style={{ transformOrigin: 'right center', transformStyle: 'preserve-3d' }}
                  className="absolute inset-y-0 right-0 w-1/2 bg-[#141210] border-y-2 border-r-2 border-l border-[#C5A059] z-20 p-3.5 sm:p-4 flex flex-col justify-between items-end text-right shadow-2xl"
                >
                  <span className="font-tall-editorial text-[9px] tracking-[0.28em] text-[#C5A059]">
                    NOV 2026
                  </span>
                  <div className="w-8 h-[1px] bg-[#C5A059]/50" />
                  <div className="w-full">
                    <div className="font-serif-luxury text-lg sm:text-xl font-semibold text-white tracking-[0.12em] leading-snug pl-4 mb-1">
                      THANH
                      <br />
                      HUYỀN
                    </div>
                    <span className="font-tall-editorial text-[9px] tracking-[0.25em] text-stone-400 block">
                      BRIDE • 2000
                    </span>
                  </div>
                </motion.div>

                {/* Khóa Vàng Couture ở tâm điểm (Nằm giữa khoảng thoáng của bố cục chéo) */}
                <motion.div
                  animate={isFlapOpen ? { scale: 0.7, opacity: 0 } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-gradient-to-br from-[#F5E1A4] via-[#C5A059] to-[#8A6621] p-1 shadow-2xl flex items-center justify-center"
                >
                  <div className="w-full h-full border border-stone-950 flex flex-col items-center justify-center text-stone-950">
                    <BookOpen className="w-3.5 h-3.5 mb-0.5" />
                    <span className="font-tall-editorial text-[8px] font-bold tracking-[0.2em]">VOGUE</span>
                  </div>
                </motion.div>
              </div>
            )}

            {/* 3. PHONG CÁCH 03: ĐÊM PHÁO HOA 3D (Hộp Điện Ảnh Đêm Sao & Cuộn Phim 35mm) */}
            {styleId === 'cinematic' && (
              <div
                className="relative w-[300px] sm:w-[360px] h-[210px] sm:h-[245px] my-1"
                style={{ perspective: '1300px' }}
              >
                {/* Khung Phim Điện Ảnh Trồi Lên */}
                <motion.div
                  animate={
                    isCardRising
                      ? { y: -70, scale: 1.07 }
                      : isFlapOpen
                      ? { y: -28, scale: 1.01 }
                      : { y: 8, scale: 0.95 }
                  }
                  transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-3 top-2 bottom-2 z-10 rounded-xl bg-[#1A1412] border-2 border-[#F0AD64] shadow-[0_0_40px_rgba(240,173,100,0.45)] p-2.5 flex flex-col justify-between overflow-hidden"
                >
                  {/* Dải lỗ cuộn phim 35mm trên/dưới */}
                  <div className="flex items-center justify-between px-1 py-0.5">
                    {[...Array(8)].map((_, i) => (
                      <span key={i} className="w-3 h-1.5 rounded-[1px] bg-[#F0AD64]/50" />
                    ))}
                  </div>
                  <div className="relative flex-1 my-1 rounded-lg overflow-hidden">
                    <img
                      src={data.sectionImages.kissPhoto}
                      alt="Cinema Scene"
                      className="w-full h-full object-cover object-[center_28%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-0 right-0 text-center font-script-luxury text-2xl text-amber-200">
                      Episode 01: Forever With You
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-1 py-0.5">
                    {[...Array(8)].map((_, i) => (
                      <span key={i} className="w-3 h-1.5 rounded-[1px] bg-[#F0AD64]/50" />
                    ))}
                  </div>
                </motion.div>

                {/* Thân hộp nhung đêm ánh vàng đồng */}
                <div className="absolute inset-x-0 bottom-0 h-[72%] rounded-b-xl bg-gradient-to-b from-[#241B18] to-[#120D0B] border-2 border-[#F0AD64]/65 z-20 flex flex-col items-center justify-end pb-3 shadow-2xl">
                  <span className="font-tall-editorial text-[10px] tracking-[0.35em] text-[#F0AD64]">
                    ★ VIP PREMIERE TICKET • 28.11.2026 ★
                  </span>
                </div>

                {/* Nắp hộp sao lật mở lên */}
                <motion.div
                  animate={{ rotateX: isFlapOpen ? 175 : 0 }}
                  transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    transformOrigin: 'top center',
                    transformStyle: 'preserve-3d',
                    zIndex: isFlapOpen ? 5 : 25,
                  }}
                  className="absolute top-0 inset-x-0 h-[55%] rounded-t-xl bg-gradient-to-b from-[#33241B] to-[#1F1612] border-2 border-[#F0AD64] flex items-center justify-center shadow-xl"
                >
                  <div className="w-14 h-14 rounded-full bg-[#120E0C] border-2 border-[#F0AD64] flex items-center justify-center text-[#F0AD64] shadow-[0_0_20px_rgba(240,173,100,0.6)]">
                    <Film className="w-6 h-6" />
                  </div>
                </motion.div>
              </div>
            )}

            {/* 4. PHONG CÁCH 04: CUNG ĐÌNH ĐÔNG DƯƠNG (Thiệp Sơn Mài Đỏ Son & Ấn Chương Song Hỷ Vàng) */}
            {styleId === 'indochine' && (
              <div
                className="relative w-[300px] sm:w-[360px] h-[210px] sm:h-[245px] my-1"
                style={{ perspective: '1300px' }}
              >
                {/* Thiệp Hoàng Gia bên trong trồi lên */}
                <motion.div
                  animate={
                    isCardRising
                      ? { y: -75, scale: 1.06 }
                      : isFlapOpen
                      ? { y: -32, scale: 1.0 }
                      : { y: 10, scale: 0.94 }
                  }
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-4 top-2 bottom-2 z-10 rounded-lg bg-[#FFF8EC] border-2 border-[#D4AF37] p-2.5 flex flex-col justify-between shadow-2xl"
                >
                  <div className="w-full h-[78%] rounded overflow-hidden relative border border-[#8C1D24]/30">
                    <img
                      src={data.sectionImages.kissPhoto}
                      alt="Lễ Thành Hôn & Vu Quy"
                      className="w-full h-full object-cover object-[center_26%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3B070B]/80 via-transparent to-transparent" />
                    <span className="absolute bottom-1.5 left-0 right-0 text-center font-serif-luxury text-sm font-bold text-[#F7CE68] tracking-widest">
                      BÁCH NIÊN GIAI LÃO
                    </span>
                  </div>
                  <p className="font-serif-luxury text-xs font-bold text-[#5C0D14] text-center tracking-wider">
                    THÀNH LONG 囍 THANH HUYỀN
                  </p>
                </motion.div>

                {/* Thân phong bì Gấm Đỏ Thêu Chỉ Vàng */}
                <svg
                  viewBox="0 0 360 245"
                  className="pointer-events-none absolute inset-0 w-full h-full z-20 rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
                  preserveAspectRatio="none"
                >
                  <polygon points="0,0 180,128 0,245" fill="#6E1018" stroke="#F7CE68" strokeWidth="1.5" />
                  <polygon points="360,0 180,128 360,245" fill="#630D14" stroke="#F7CE68" strokeWidth="1.5" />
                  <polygon points="0,245 180,118 360,245" fill="#7C131C" stroke="#F7CE68" strokeWidth="1.8" />
                </svg>

                {/* Nắp phong bì Gấm Đỏ lật mở */}
                <motion.div
                  animate={{ rotateX: isFlapOpen ? 180 : 0 }}
                  transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    transformOrigin: 'top center',
                    transformStyle: 'preserve-3d',
                    zIndex: isFlapOpen ? 5 : 25,
                  }}
                  className="pointer-events-none absolute top-0 inset-x-0 h-[132px]"
                >
                  <svg viewBox="0 0 360 132" className="w-full h-full" preserveAspectRatio="none">
                    <polygon points="0,0 360,0 180,128" fill="#851620" stroke="#F7CE68" strokeWidth="2" />
                  </svg>
                </motion.div>

                {/* Ấn Ngọc Tỷ Song Hỷ Vàng Ròng ở tâm phong bì */}
                <motion.div
                  animate={
                    isFlapOpen
                      ? { scale: [1, 1.2, 0.85], opacity: [1, 1, 0] }
                      : { scale: [1, 1.05, 1] }
                  }
                  transition={
                    isFlapOpen ? { duration: 1.0 } : { duration: 2.2, repeat: Infinity }
                  }
                  className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 z-30 w-16 h-16 rotate-45 rounded-xl bg-gradient-to-br from-[#FFF2B2] via-[#D4AF37] to-[#9A7418] p-1 shadow-[0_10px_30px_rgba(247,206,104,0.5)] border-2 border-[#FFF8EC] flex items-center justify-center"
                >
                  <div className="-rotate-45 flex flex-col items-center justify-center text-[#4E0B10]">
                    <span className="font-serif-luxury text-2xl font-bold leading-none">囍</span>
                    <Crown className="w-3 h-3 mt-0.5" />
                  </div>
                </motion.div>
              </div>
            )}

            {/* PHẦN CHỮ TÊN CẶP ĐÔI & KHÁCH MỜI DƯỚI PHONG BÌ (Tùy biến theo 4 phong cách) */}
            <motion.div
              key={`footer-${styleId}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-7 sm:mt-9 text-center"
            >
              <p
                className={`font-script-luxury text-4xl sm:text-5xl mb-0.5 leading-tight ${
                  styleId === 'fairytale' ? 'text-[#4A3B31]' : 'text-amber-200'
                }`}
              >
                {styleId === 'editorial'
                  ? 'The Wedding Issue'
                  : styleId === 'cinematic'
                  ? 'Starlight Invitation'
                  : styleId === 'indochine'
                  ? 'Thiệp Hồng Báo Hỷ'
                  : 'Thiệp Mời'}
              </p>
              <h1
                className={`font-tall-editorial text-2xl sm:text-3xl font-normal tracking-[0.14em] uppercase ${
                  styleId === 'fairytale' ? 'text-[#2D241E]' : 'text-white'
                }`}
              >
                {data.groom.shortName} &amp; {data.bride.shortName}
              </h1>
              <p
                className={`font-tall-editorial text-sm sm:text-base tracking-[0.25em] mt-1 ${
                  styleId === 'fairytale' ? 'text-[#6E5D4F]' : 'text-amber-200/80'
                }`}
              >
                28.11.2026
              </p>

              {/* Tên khách mời */}
              <div
                className={`mt-2.5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-sm ${
                  styleId === 'fairytale'
                    ? 'bg-white/80 border-[#DED2C1] text-[#5A493E]'
                    : 'bg-white/10 border-amber-300/40 text-amber-100 backdrop-blur-md'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs">
                  Kính mời:{' '}
                  <strong className="font-serif-luxury text-sm">
                    {guestName}
                  </strong>
                </span>
              </div>
            </motion.div>
          </div>

          {/* Thanh tiến trình tự động mở thiệp (8.8s) ở đáy màn hình */}
          <div className="relative z-20 w-full max-w-xs mx-auto text-center pb-1">
            <div
              className={`w-full h-1.5 rounded-full overflow-hidden mb-1.5 ${
                styleId === 'fairytale' ? 'bg-[#E2D7C5]' : 'bg-white/20'
              }`}
            >
              <div
                style={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-[#7C2334] via-[#D4AF37] to-[#7C2334] transition-all duration-75"
              />
            </div>
            <p
              className={`text-[11px] tracking-wider ${
                styleId === 'fairytale' ? 'text-[#7A6858]' : 'text-white/75'
              }`}
            >
              Thiệp tự động mở sau ít giây • Chạm vào màn hình để mở ngay
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
