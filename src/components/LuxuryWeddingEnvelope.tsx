import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface LuxuryWeddingEnvelopeProps {
  theme?: 'emerald' | 'burgundy';
  isOpen: boolean;
  onOpen: () => void;
  guestName?: string;
  weddingDateIso: string;
  heroPhoto: string;
  kissPhoto: string;
  groomShortName: string;
  brideShortName: string;
  displayDate: string;
}

/**
 * Con Dấu Sáp 3D Nổi Khối Tinh Xảo (Wax Seal)
 */
const LuxuryWaxSeal: React.FC<{ theme: 'emerald' | 'burgundy'; isOpening?: boolean }> = ({
  theme,
  isOpening,
}) => {
  const isEmerald = theme === 'emerald';
  return (
    <motion.div
      animate={
        isOpening
          ? { scale: [1, 1.25, 0.95], rotate: [0, -12, 10] }
          : { scale: [1, 1.06, 1] }
      }
      transition={
        isOpening
          ? { duration: 0.6, ease: 'easeInOut' }
          : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
      }
      className="relative w-15 h-15 sm:w-17 sm:h-17 rounded-full flex items-center justify-center select-none shadow-[0_10px_25px_rgba(0,0,0,0.45)] cursor-pointer"
      style={{
        background: isEmerald
          ? 'radial-gradient(circle at 35% 30%, #5EA372 0%, #2D633C 55%, #15381E 100%)'
          : 'radial-gradient(circle at 35% 30%, #B82A48 0%, #751429 55%, #3B0713 100%)',
        boxShadow: isEmerald
          ? '0 10px 25px rgba(20, 50, 30, 0.45), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.6)'
          : '0 10px 25px rgba(60, 10, 20, 0.45), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.6)',
      }}
    >
      <div
        className="w-[84%] h-[84%] rounded-full border shadow-inner flex items-center justify-center"
        style={{ borderColor: isEmerald ? 'rgba(154, 230, 175, 0.7)' : 'rgba(255, 190, 205, 0.7)' }}
      >
        <div className="flex flex-col items-center justify-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
          <span className="font-serif-luxury font-bold text-xs sm:text-sm tracking-wider">Đ &amp; H</span>
          <Sparkles className="w-2.5 h-2.5 text-[#FFE082] mt-0.5 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Chùm hoa cưới và dải ruy-băng ren buông rủ ở góc phong bì
 */
const EnvelopeFloralSpray: React.FC<{ theme: 'emerald' | 'burgundy' }> = ({ theme }) => {
  const isEmerald = theme === 'emerald';
  return (
    <div className="pointer-events-none select-none">
      <svg
        viewBox="0 0 130 160"
        className="w-28 sm:w-34 h-34 sm:h-42 drop-shadow-[0_12px_24px_rgba(0,0,0,0.28)]"
      >
        <defs>
          <linearGradient id={`sprayCallaPetal-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
            {isEmerald ? (
              <>
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#F5FAF6" />
                <stop offset="100%" stopColor="#D5E8D9" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#C42A4A" />
                <stop offset="60%" stopColor="#7E1428" />
                <stop offset="100%" stopColor="#430713" />
              </>
            )}
          </linearGradient>
        </defs>

        {/* Dải ruy băng ren buông rủ dài thướt tha xuống dưới (như video frame_001/002) */}
        <path
          d="M 65 65 Q 45 110 55 155"
          fill="none"
          stroke={isEmerald ? '#FFFFFF' : '#8A152E'}
          strokeWidth="3.5"
          strokeDasharray="4,2"
          opacity="0.9"
        />
        <path
          d="M 70 65 Q 85 105 75 150"
          fill="none"
          stroke={isEmerald ? '#E2ECE3' : '#B83250'}
          strokeWidth="2.5"
          opacity="0.85"
        />
        <path
          d="M 68 65 Q 60 115 62 158"
          fill="none"
          stroke={isEmerald ? '#FFFFFF' : '#DDA0B0'}
          strokeWidth="1.8"
          opacity="0.95"
        />

        {/* Cuống hoa xanh */}
        <path d="M 65 65 Q 75 45 80 25" fill="none" stroke="#3D6846" strokeWidth="3" strokeLinecap="round" />
        <path d="M 65 65 Q 55 40 45 20" fill="none" stroke="#2E5236" strokeWidth="2.8" strokeLinecap="round" />

        {/* Bông hoa Calla 1 (chính diện vươn lên) */}
        <path
          d="M 80 25 C 98 18 104 -2 84 -8 C 68 -10 64 8 74 24 Z"
          fill={`url(#sprayCallaPetal-${theme})`}
          stroke={isEmerald ? '#C2DAC6' : '#9E1C37'}
          strokeWidth="0.8"
        />
        <path d="M 81 12 Q 82 2 83 -4" stroke="#FCE79C" strokeWidth="2" strokeLinecap="round" />

        {/* Bông hoa Calla 2 (nghiêng trái) */}
        <path
          d="M 45 20 C 30 15 22 -3 40 -8 C 54 -8 56 8 48 22 Z"
          fill={`url(#sprayCallaPetal-${theme})`}
          stroke={isEmerald ? '#C2DAC6' : '#9E1C37'}
          strokeWidth="0.8"
        />
        <path d="M 43 9 Q 41 1 39 -4" stroke="#FCE79C" strokeWidth="1.8" strokeLinecap="round" />

        {/* Chùm cẩm tú cầu & nụ hoa nhỏ ở tâm bó hoa */}
        <circle cx="62" cy="55" r="7" fill={isEmerald ? '#E0F0E3' : '#8A152E'} />
        <circle cx="70" cy="52" r="6" fill={isEmerald ? '#CDE5D2' : '#A82542'} />
        <circle cx="58" cy="62" r="5.5" fill={isEmerald ? '#FFFFFF' : '#5E0C1C'} />
        <circle cx="68" cy="63" r="6" fill={isEmerald ? '#EEF8F0' : '#BD2F4F'} />

        {/* Nơ buộc lụa ở gốc bó hoa */}
        <path
          d="M 65 65 C 50 60 50 72 65 68 C 80 72 80 60 65 65 Z"
          fill={isEmerald ? '#FFFFFF' : '#B82A48'}
          stroke={isEmerald ? '#CDE5D2' : '#E8A5B5'}
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};

export const LuxuryWeddingEnvelope: React.FC<LuxuryWeddingEnvelopeProps> = ({
  theme = 'emerald',
  isOpen,
  onOpen,
  guestName,
  weddingDateIso,
  heroPhoto,
  kissPhoto,
  groomShortName,
  brideShortName,
  displayDate,
}) => {
  const isEmerald = theme === 'emerald';

  // Live countdown timer ticking từng giây
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(weddingDateIso).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [weddingDateIso]);

  const padZero = (n: number) => String(n).padStart(2, '0');

  const handleEnvelopeClick = () => {
    if (!isOpen) {
      soundEngine.playOpenChime();
      onOpen();
    }
  };

  return (
    <section
      className={`relative w-full flex flex-col items-center justify-center transition-all duration-700 px-4 sm:px-6 ${
        isOpen ? 'py-8 border-b border-black/5' : 'py-12 my-auto'
      }`}
    >
      {/* Lời Mời Kính Mời Tên Khách Mời */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 sm:mb-8"
      >
        <p
          className={`font-serif-luxury text-xs sm:text-sm uppercase tracking-[0.24em] mb-2 font-medium ${
            isEmerald ? 'text-[#3E6547]' : 'text-[#872D43]'
          }`}
        >
          TRÂN TRỌNG KÍNH MỜI
        </p>
        <p
          className={`font-script-luxury text-3xl sm:text-4xl md:text-5xl drop-shadow-sm ${
            isEmerald ? 'text-[#2D5A3A]' : 'text-[#7D1E3A]'
          }`}
        >
          {guestName || 'Bạn & Người Thương'}
        </p>
      </motion.div>

      {/* KHỐI PHONG BÌ 3D TƯƠNG TÁC (CHẠM VÀO ĐỂ MỞ) */}
      <div
        onClick={handleEnvelopeClick}
        className="cursor-pointer relative w-[300px] sm:w-[340px] h-[200px] sm:h-[224px] my-3 select-none group"
        style={{ perspective: '1200px' }}
      >
        {/* NỀN SAU CỦA PHONG BÌ (Mặt trong bao thư) */}
        <div
          className="absolute inset-0 rounded-lg shadow-[0_22px_50px_rgba(0,0,0,0.22)] border"
          style={{
            background: isEmerald
              ? 'linear-gradient(180deg, #EDF4EE 0%, #D8E6DB 100%)'
              : 'linear-gradient(180deg, #4F0E1D 0%, #2D050E 100%)',
            borderColor: isEmerald ? '#D3E2D5' : '#6B1627',
          }}
        />

        {/* THIỆP & DẢI ẢNH POLAROID TRỒI LÊN TỪ LÒNG PHONG BÌ (Frame 002) */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* DẢI 2 ẢNH CƯỚI POLAROID LIỀN NHAU (Photo Strip) TRỒI LỆCH TRÁI */}
              <motion.div
                key="envelope-photo-strip"
                initial={{ y: 50, x: -35, rotate: 0, opacity: 0, scale: 0.8 }}
                animate={{ y: -78, x: -68, rotate: -10, opacity: 1, scale: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-1/2 top-2 -translate-x-1/2 z-15 w-[122px] sm:w-[134px] bg-white p-1.5 pb-3.5 shadow-[0_16px_36px_rgba(0,0,0,0.25)] border border-stone-200/90 rounded-[2px]"
              >
                {/* Ảnh 1: Chân dung dâu rể Đức & Hậu đưa tay làm tim bên má */}
                <div className="aspect-[4/3.8] w-full overflow-hidden bg-stone-100 mb-1 rounded-[1px]">
                  <img
                    src={heroPhoto}
                    alt={`${groomShortName} & ${brideShortName}`}
                    className="w-full h-full object-cover object-[center_28%]"
                  />
                </div>
                {/* Ảnh 2: Nụ hôn ngọt ngào */}
                <div className="aspect-[4/3.8] w-full overflow-hidden bg-stone-100 mb-1.5 rounded-[1px]">
                  <img
                    src={kissPhoto}
                    alt="Happy Wedding"
                    className="w-full h-full object-cover object-[center_22%]"
                  />
                </div>
                <p
                  className={`font-script-luxury text-base text-center leading-none mt-0.5 ${
                    isEmerald ? 'text-[#2D5A3A]' : 'text-[#7D1E3A]'
                  }`}
                >
                  {groomShortName} &amp; {brideShortName}
                </p>
              </motion.div>

              {/* THIỆP OVAL "SAVE THE DATE" TRỒI LỆCH PHẢI (Frame 002) */}
              <motion.div
                key="envelope-save-date-card"
                initial={{ y: 55, x: 20, scale: 0.85, opacity: 0 }}
                animate={{ y: -82, x: 50, scale: 1, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-1/2 top-2 -translate-x-1/2 z-16 w-[150px] sm:w-[165px] aspect-[1/1.38] rounded-[50%/42%] p-3.5 shadow-[0_18px_36px_rgba(0,0,0,0.22)] flex flex-col items-center justify-center text-center border-2 border-dashed"
                style={{
                  background: isEmerald
                    ? 'radial-gradient(circle at 50% 30%, #FFFFFF 0%, #FAFDFB 60%, #EBF4ED 100%)'
                    : 'radial-gradient(circle at 50% 30%, #FFFFFF 0%, #FFFDFC 60%, #F8ECF1 100%)',
                  borderColor: isEmerald ? '#85C396' : '#D99FB1',
                }}
              >
                <p
                  className={`font-serif-luxury text-[9px] uppercase tracking-[0.22em] font-medium ${
                    isEmerald ? 'text-[#3E6547]' : 'text-[#872D43]'
                  }`}
                >
                  SAVE THE DATE
                </p>
                <p
                  className={`font-serif-luxury font-bold text-xs my-0.5 ${
                    isEmerald ? 'text-[#2D5A3A]' : 'text-[#7D1E3A]'
                  }`}
                >
                  {displayDate}
                </p>
                <h4
                  className={`font-script-luxury text-2xl leading-tight mt-0.5 ${
                    isEmerald ? 'text-[#2D5A3A]' : 'text-[#7D1E3A]'
                  }`}
                >
                  {groomShortName}
                  <span className="block text-xs font-serif-italic opacity-70 my-0.5">&amp;</span>
                  {brideShortName}
                </h4>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* THÂN TRƯỚC PHONG BÌ (TÚI PHONG BÌ HÌNH CHỮ V CHE CHÂN ẢNH) */}
        <div className="pointer-events-none absolute inset-0 z-20 rounded-lg overflow-hidden">
          <svg viewBox="0 0 340 224" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`envLeftGrad-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
                {isEmerald ? (
                  <>
                    <stop offset="0%" stopColor="#F5F8F5" />
                    <stop offset="100%" stopColor="#E6EDE7" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="#6E1528" />
                    <stop offset="100%" stopColor="#4A0B19" />
                  </>
                )}
              </linearGradient>
              <linearGradient id={`envRightGrad-${theme}`} x1="100%" y1="0%" x2="0%" y2="100%">
                {isEmerald ? (
                  <>
                    <stop offset="0%" stopColor="#EFF4F0" />
                    <stop offset="100%" stopColor="#DFE8E0" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="#631223" />
                    <stop offset="100%" stopColor="#3F0914" />
                  </>
                )}
              </linearGradient>
              <linearGradient id={`envBottomGrad-${theme}`} x1="50%" y1="100%" x2="50%" y2="0%">
                {isEmerald ? (
                  <>
                    <stop offset="0%" stopColor="#FCFEFC" />
                    <stop offset="100%" stopColor="#E8F1EA" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="#7E192F" />
                    <stop offset="100%" stopColor="#550D1D" />
                  </>
                )}
              </linearGradient>
            </defs>

            {/* Cánh gập bên trái */}
            <polygon points="0,0 170,118 0,224" fill={`url(#envLeftGrad-${theme})`} />
            {/* Cánh gập bên phải */}
            <polygon points="340,0 170,118 340,224" fill={`url(#envRightGrad-${theme})`} />
            {/* Cánh dưới chữ V gập lên (Túi đựng) */}
            <polygon
              points="0,224 170,110 340,224"
              fill={`url(#envBottomGrad-${theme})`}
              stroke={isEmerald ? '#D3E2D5' : '#8A1F35'}
              strokeWidth="0.8"
            />
          </svg>
        </div>

        {/* NẮP PHONG BÌ TRÊN (Mở lật 180 độ 3D khi chạm) */}
        <motion.div
          initial={false}
          animate={{ rotateX: isOpen ? 180 : 0 }}
          transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
          style={{
            transformOrigin: 'top center',
            transformStyle: 'preserve-3d',
            zIndex: isOpen ? 5 : 25,
          }}
          className="pointer-events-none absolute top-0 inset-x-0 h-[118px]"
        >
          <svg viewBox="0 0 340 118" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`envFlapGrad-${theme}`} x1="50%" y1="0%" x2="50%" y2="100%">
                {isEmerald ? (
                  <>
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#EDF5EE" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="#8A1B33" />
                    <stop offset="100%" stopColor="#5C0F20" />
                  </>
                )}
              </linearGradient>
            </defs>
            {/* Nắp tam giác chữ V */}
            <polygon
              points="0,0 340,0 170,118"
              fill={`url(#envFlapGrad-${theme})`}
              stroke={isEmerald ? '#CFDFD2' : '#99223B'}
              strokeWidth="1"
            />
            {/* Viền ren móc hoa tinh xảo viền theo cạnh chữ V của nắp (frame_001) */}
            <path
              d="M 6 6 L 170 112 L 334 6"
              stroke={isEmerald ? '#FFFFFF' : '#FCE7EE'}
              strokeWidth="2.8"
              strokeDasharray="5,3"
              fill="none"
              opacity="0.9"
            />
          </svg>
        </motion.div>

        {/* CHÙM HOA CƯỚI & RUY BĂNG REN GÓC DƯỚI BÊN PHẢI PHONG BÌ (frame_001 & 002) */}
        <div className="absolute -bottom-12 -right-8 z-30 pointer-events-none">
          <EnvelopeFloralSpray theme={theme} />
        </div>

        {/* CON DẤU SÁP 3D GẮN Ở ĐỈNH V CỦA TÚI PHONG BÌ */}
        <div className="absolute top-[51%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <LuxuryWaxSeal theme={theme} isOpening={isOpen} />
        </div>

        {/* Hướng dẫn chạm mở khi phong bì chưa mở */}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0.1, 0.7] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute top-[51%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border pointer-events-none z-25 ${
              isEmerald ? 'border-[#5EA372]' : 'border-[#C42A4A]'
            }`}
          />
        )}
      </div>

      {/* DÒNG HƯỚNG DẪN HOẶC BẢNG ĐẾM NGƯỢC THỜI GIAN THỰC (BEGINS IN...) */}
      <div className="min-h-[72px] flex flex-col items-center justify-center mt-3 sm:mt-5 text-center">
        {!isOpen ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-xs font-serif-italic flex items-center justify-center gap-1.5 ${
              isEmerald ? 'text-[#2D5A3A]' : 'text-[#7D1E3A]'
            }`}
          >
            <span>Chạm vào con dấu sáp để mở thiệp cưới</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
          </motion.p>
        ) : (
          /* BẢNG ĐẾM NGƯỢC THỜI GIAN THỰC (BEGINS IN... - Frame 002) */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <p
              className={`font-serif-luxury text-[11px] sm:text-xs uppercase tracking-[0.26em] mb-1 font-medium ${
                isEmerald ? 'text-[#3E6547]' : 'text-[#872D43]'
              }`}
            >
              BEGINS IN...
            </p>
            <div
              className={`font-serif-luxury text-2xl sm:text-3xl font-light tracking-widest flex items-center gap-2 ${
                isEmerald ? 'text-[#1F3D27]' : 'text-[#5E1223]'
              }`}
            >
              <span>{padZero(timeLeft.days)}</span>
              <span className="opacity-40 text-lg">:</span>
              <span>{padZero(timeLeft.hours)}</span>
              <span className="opacity-40 text-lg">:</span>
              <span>{padZero(timeLeft.minutes)}</span>
              <span className="opacity-40 text-lg">:</span>
              <span className="font-medium text-[#D4AF37]">{padZero(timeLeft.seconds)}</span>
            </div>
            <div
              className={`flex items-center gap-6 text-[9px] uppercase tracking-wider opacity-65 mt-0.5 font-serif-luxury ${
                isEmerald ? 'text-[#3E6547]' : 'text-[#872D43]'
              }`}
            >
              <span>Ngày</span>
              <span>Giờ</span>
              <span>Phút</span>
              <span>Giây</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
