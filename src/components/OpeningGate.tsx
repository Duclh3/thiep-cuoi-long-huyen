import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Crown, BookOpen } from 'lucide-react';
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
 * Con dấu sáp đỏ rượu in nổi cánh bướm vàng 3D (Phong cách 01 - Fine Art)
 */
const WaxButterflySeal: React.FC<{ isOpening: boolean }> = ({ isOpening }) => (
  <motion.div
    animate={
      isOpening
        ? { scale: [1, 1.06, 1] }
        : { scale: [1, 1.05, 1] }
    }
    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
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
  hideStyleSwitcher = false,
}) => {
  const [stage, setStage] = useState<'closed' | 'preview'>('closed');

  useEffect(() => {
    if (isOpen) return;
    setStage('closed');
    const t = setTimeout(() => {
      setStage('preview');
    }, 900);
    return () => clearTimeout(t);
  }, [isOpen, styleId]);

  const isFlapOpen = stage === 'preview';

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
      default:
        return '#FAF8F5';
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
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          }}
          onClick={() => onUnlock()}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden select-none cursor-pointer px-4 py-6 sm:py-8 transition-colors duration-700"
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
            </>
          )}

          {/* THANH CHỌN PHONG CÁCH TRÊN ĐỈNH MÀN HÌNH (Ẩn khi mở bằng link đơn phong cách) */}
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

          {/* KHU VỰC TRUNG TÂM: PHONG BÌ THIỆP MỜI TINH GỌN */}
          <div className="relative z-20 w-full max-w-md mx-auto flex flex-col items-center my-auto py-2">
            {/* Dòng hướng dẫn chạm mở phía trên phong bì */}
            <motion.p
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className={`font-script-luxury text-2xl sm:text-4xl mb-6 ${
                styleId === 'fairytale' ? 'text-[#524338]' : 'text-amber-200'
              }`}
            >
              Nhấp để mở thiệp
            </motion.p>

            {/* 1. PHONG CÁCH 01: THƠ MỘNG FINE ART (Phong bì kem + Con dấu Bướm Vàng + Polaroid) */}
            {styleId === 'fairytale' && (
              <div
                className="relative w-[300px] sm:w-[350px] h-[205px] sm:h-[235px] my-2"
                style={{ perspective: '1200px' }}
              >
                <div
                  className="absolute inset-0 rounded-[8px] shadow-[0_22px_50px_rgba(68,48,32,0.18)] border border-[#DFD5C5]"
                  style={{ background: 'linear-gradient(180deg, #EDE5D8 0%, #E5DBC9 100%)' }}
                />

                {/* Tấm ảnh bên trong trồi nhẹ lên */}
                <motion.div
                  initial={{ y: 12, scale: 0.94, opacity: 0.9 }}
                  animate={
                    isFlapOpen
                      ? { y: -48, scale: 0.98, opacity: 1 }
                      : { y: 12, scale: 0.94, opacity: 0.9 }
                  }
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-5 top-3 bottom-3 z-10 rounded-[6px] bg-[#FFFDF9] border border-[#E5DAC8] shadow-xl p-2 flex flex-col items-center justify-center overflow-hidden"
                >
                  <div className="w-full h-full rounded-[4px] overflow-hidden relative">
                    <img
                      src={data.sectionImages.kissPhoto}
                      alt="Thành Long & Thanh Huyền"
                      className="w-full h-full object-cover object-[center_28%]"
                    />
                  </div>
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
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
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
                  animate={{ rotate: -7, x: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="fine-art-polaroid absolute -left-4 sm:-left-6 -bottom-6 sm:-bottom-7 z-30 w-[108px] sm:w-[124px] p-1.5 pb-5 rounded-[3px]"
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

            {/* 2. PHONG CÁCH 02: TẠP CHÍ VOGUE */}
            {styleId === 'editorial' && (
              <div
                className="relative w-[300px] sm:w-[350px] h-[215px] sm:h-[245px] my-2"
                style={{ perspective: '1400px' }}
              >
                <motion.div
                  animate={isFlapOpen ? { y: -24, scale: 1.02 } : { y: 0, scale: 0.98 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 bg-[#FAF6F0] text-stone-950 border-2 border-[#C5A059] p-3 flex flex-col justify-between shadow-[0_25px_70px_rgba(0,0,0,0.85)] z-10"
                >
                  <div className="relative flex-1 overflow-hidden bg-stone-900">
                    <img
                      src={data.sectionImages.kissPhoto}
                      alt="Vogue Cover"
                      className="w-full h-full object-cover object-[center_26%]"
                    />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ rotateY: isFlapOpen ? -145 : 0 }}
                  transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
                  style={{ transformOrigin: 'left center', transformStyle: 'preserve-3d' }}
                  className="absolute inset-y-0 left-0 w-1/2 bg-[#141210] border-y-2 border-l-2 border-r border-[#C5A059] z-20 p-4 flex flex-col justify-center items-start text-left shadow-2xl"
                >
                  <div className="font-serif-luxury text-lg sm:text-xl font-semibold text-white tracking-[0.1em] leading-snug">
                    THÀNH
                    <br />
                    LONG
                  </div>
                </motion.div>

                <motion.div
                  animate={{ rotateY: isFlapOpen ? 145 : 0 }}
                  transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
                  style={{ transformOrigin: 'right center', transformStyle: 'preserve-3d' }}
                  className="absolute inset-y-0 right-0 w-1/2 bg-[#141210] border-y-2 border-r-2 border-l border-[#C5A059] z-20 p-4 flex flex-col justify-center items-end text-right shadow-2xl"
                >
                  <div className="font-serif-luxury text-lg sm:text-xl font-semibold text-white tracking-[0.1em] leading-snug">
                    THANH
                    <br />
                    HUYỀN
                  </div>
                </motion.div>

                <motion.div
                  animate={isFlapOpen ? { scale: 0.7, opacity: 0 } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-14 h-14 bg-gradient-to-br from-[#F5E1A4] via-[#C5A059] to-[#8A6621] p-1 shadow-2xl flex items-center justify-center"
                >
                  <div className="w-full h-full border border-stone-950 flex flex-col items-center justify-center text-stone-950">
                    <BookOpen className="w-4 h-4" />
                  </div>
                </motion.div>
              </div>
            )}

            {/* 3. PHONG CÁCH 03: ĐÊM PHÁO HOA 3D */}
            {styleId === 'cinematic' && (
              <div
                className="relative w-[300px] sm:w-[350px] h-[210px] sm:h-[240px] my-2"
                style={{ perspective: '1300px' }}
              >
                <motion.div
                  animate={isFlapOpen ? { y: -38, scale: 1.02 } : { y: 8, scale: 0.95 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-4 top-2 bottom-2 z-10 rounded-xl bg-[#1A1412] border-2 border-[#F0AD64] shadow-[0_0_40px_rgba(240,173,100,0.45)] p-2 flex flex-col justify-between overflow-hidden"
                >
                  <div className="relative flex-1 rounded-lg overflow-hidden">
                    <img
                      src={data.sectionImages.kissPhoto}
                      alt="Thành Long & Thanh Huyền"
                      className="w-full h-full object-cover object-[center_28%]"
                    />
                  </div>
                </motion.div>

                <div className="absolute inset-x-0 bottom-0 h-[72%] rounded-b-xl bg-gradient-to-b from-[#241B18] to-[#120D0B] border-2 border-[#F0AD64]/65 z-20 flex flex-col items-center justify-end pb-3 shadow-2xl" />

                <motion.div
                  animate={{ rotateX: isFlapOpen ? 175 : 0 }}
                  transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
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

            {/* 4. PHONG CÁCH 04: CUNG ĐÌNH ĐÔNG DƯƠNG */}
            {styleId === 'indochine' && (
              <div
                className="relative w-[300px] sm:w-[350px] h-[210px] sm:h-[240px] my-2"
                style={{ perspective: '1300px' }}
              >
                <motion.div
                  animate={isFlapOpen ? { y: -42, scale: 1.0 } : { y: 10, scale: 0.94 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-4 top-2 bottom-2 z-10 rounded-lg bg-[#FFF8EC] border-2 border-[#D4AF37] p-2 flex flex-col justify-between shadow-2xl"
                >
                  <div className="w-full h-full rounded overflow-hidden relative border border-[#8C1D24]/30">
                    <img
                      src={data.sectionImages.kissPhoto}
                      alt="Thành Long & Thanh Huyền"
                      className="w-full h-full object-cover object-[center_26%]"
                    />
                  </div>
                </motion.div>

                <svg
                  viewBox="0 0 360 245"
                  className="pointer-events-none absolute inset-0 w-full h-full z-20 rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
                  preserveAspectRatio="none"
                >
                  <polygon points="0,0 180,128 0,245" fill="#6E1018" stroke="#F7CE68" strokeWidth="1.5" />
                  <polygon points="360,0 180,128 360,245" fill="#630D14" stroke="#F7CE68" strokeWidth="1.5" />
                  <polygon points="0,245 180,118 360,245" fill="#7C131C" stroke="#F7CE68" strokeWidth="1.8" />
                </svg>

                <motion.div
                  animate={{ rotateX: isFlapOpen ? 180 : 0 }}
                  transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
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

                <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 z-30 w-16 h-16 rotate-45 rounded-xl bg-gradient-to-br from-[#FFF2B2] via-[#D4AF37] to-[#9A7418] p-1 shadow-[0_10px_30px_rgba(247,206,104,0.5)] border-2 border-[#FFF8EC] flex items-center justify-center">
                  <div className="-rotate-45 flex flex-col items-center justify-center text-[#4E0B10]">
                    <span className="font-serif-luxury text-2xl font-bold leading-none">囍</span>
                    <Crown className="w-3 h-3 mt-0.5" />
                  </div>
                </div>
              </div>
            )}

            {/* PHẦN CHỮ DƯỚI PHONG BÌ: CHỈ GHI THIỆP MỜI + TÊN CÔ DÂU CHÚ RỂ + NGÀY CƯỚI */}
            <motion.div
              key={`footer-${styleId}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-9 sm:mt-10 text-center"
            >
              <p
                className={`font-script-luxury text-3xl sm:text-4xl mb-1 leading-tight ${
                  styleId === 'fairytale' ? 'text-[#7A283B]' : 'text-amber-200'
                }`}
              >
                Thiệp Mời
              </p>
              <h1
                className={`font-script-luxury text-4xl sm:text-5xl leading-tight ${
                  styleId === 'fairytale' ? 'text-[#2D241E]' : 'text-white'
                }`}
              >
                {data.groom.shortName} &amp; {data.bride.shortName}
              </h1>
              <p
                className={`font-serif-italic text-sm sm:text-base tracking-[0.22em] mt-1 ${
                  styleId === 'fairytale' ? 'text-[#6E5D4F]' : 'text-amber-200/90'
                }`}
              >
                28 . 11 . 2026
              </p>
            </motion.div>
          </div>

          <div className="h-4" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
