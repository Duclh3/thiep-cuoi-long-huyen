import React from 'react';
import { motion } from 'framer-motion';

const BASE_URL = import.meta.env.BASE_URL || '/';
export const decorAsset = (fileName: string) =>
  `${BASE_URL}images/decor/${fileName}`.replace(/([^:]\/)\/+/g, '$1');

/**
 * Con Dấu Sáp Thực Vật Cổ Điển 3D (Botanical Embossed Wax Seal)
 * - emerald: Dáng bầu dục dọc xanh rêu ngọc thạch dập nổi nhành hoa (y hệt Video 1)
 * - burgundy: Dáng tròn viền sáp chảy tự nhiên màu đỏ rượu vang dập nổi cành hồng (y hệt Video 2)
 */
export const BotanicalWaxSeal: React.FC<{
  theme: 'emerald' | 'burgundy';
  size?: 'sm' | 'md' | 'lg';
  isOpening?: boolean;
}> = ({ theme, size = 'md', isOpening = false }) => {
  const isEmerald = theme === 'emerald';

  const dims =
    size === 'sm'
      ? isEmerald
        ? 'w-9 h-11'
        : 'w-10 h-10'
      : size === 'lg'
      ? isEmerald
        ? 'w-14 h-[68px] sm:w-16 sm:h-[76px]'
        : 'w-15 h-15 sm:w-17 sm:h-17'
      : isEmerald
      ? 'w-12 h-[58px] sm:w-13 sm:h-[64px]'
      : 'w-13 h-13 sm:w-14 sm:h-14';

  return (
    <motion.div
      animate={
        isOpening
          ? { scale: [1, 1.15, 0.96], rotate: [0, -6, 4] }
          : { scale: [1, 1.04, 1] }
      }
      transition={
        isOpening
          ? { duration: 0.65, ease: 'easeInOut' }
          : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
      }
      className={`relative ${dims} flex items-center justify-center select-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.38)]`}
    >
      {isEmerald ? (
        /* Con dấu sáp Oval Xanh Rêu (Video 1) */
        <svg viewBox="0 0 80 100" className="w-full h-full">
          <defs>
            <radialGradient id="emeraldWaxOuter" cx="35%" cy="28%" r="72%">
              <stop offset="0%" stopColor="#6D8B58" />
              <stop offset="45%" stopColor="#466335" />
              <stop offset="82%" stopColor="#2F4622" />
              <stop offset="100%" stopColor="#1E2F15" />
            </radialGradient>
            <radialGradient id="emeraldWaxInner" cx="38%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#5D7B49" />
              <stop offset="65%" stopColor="#3B552B" />
              <stop offset="100%" stopColor="#263A1B" />
            </radialGradient>
          </defs>
          {/* Viền sáp chảy tự nhiên hình oval */}
          <path
            d="M 40 3 C 62 3 76 20 76 49 C 77 78 61 97 40 97 C 18 97 3 79 4 50 C 4 21 19 3 40 3 Z"
            fill="url(#emeraldWaxOuter)"
          />
          {/* Gờ nổi lòng sáp */}
          <ellipse
            cx="40"
            cy="50"
            rx="27"
            ry="38"
            fill="url(#emeraldWaxInner)"
            stroke="#7F9E69"
            strokeWidth="1.6"
            opacity="0.92"
          />
          <ellipse
            cx="40"
            cy="50"
            rx="25.5"
            ry="36.5"
            fill="none"
            stroke="#203216"
            strokeWidth="1"
            opacity="0.65"
          />
          {/* Họa tiết nhành hoa dập nổi 3D ở trung tâm */}
          <g
            fill="none"
            stroke="#89A873"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          >
            <path d="M 38 76 Q 43 55 39 27" />
            <path d="M 40 62 Q 30 55 29 46" />
            <path d="M 41 52 Q 51 45 52 36" />
            <ellipse cx="39" cy="25" rx="4" ry="6" fill="#5A7847" />
            <ellipse cx="28" cy="44" rx="3.5" ry="5" transform="rotate(-22 28 44)" fill="#5A7847" />
            <ellipse cx="52" cy="34" rx="3.5" ry="5" transform="rotate(24 52 34)" fill="#5A7847" />
            <circle cx="34" cy="34" r="2.2" fill="#7D9C67" />
            <circle cx="46" cy="29" r="2" fill="#7D9C67" />
            <path d="M 34 68 Q 40 64 46 68" />
          </g>
          {/* Vệt bóng sáng sáp ong */}
          <path
            d="M 20 24 Q 28 11 43 11"
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        /* Con dấu sáp Tròn Viền Chảy Tự Nhiên Đỏ Rượu Vang (Video 2) */
        <svg viewBox="0 0 92 92" className="w-full h-full">
          <defs>
            <radialGradient id="burgundyWaxOuter" cx="34%" cy="28%" r="72%">
              <stop offset="0%" stopColor="#9E2238" />
              <stop offset="48%" stopColor="#6B0F20" />
              <stop offset="85%" stopColor="#460712" />
              <stop offset="100%" stopColor="#2B030A" />
            </radialGradient>
            <radialGradient id="burgundyWaxInner" cx="38%" cy="32%" r="68%">
              <stop offset="0%" stopColor="#87192D" />
              <stop offset="65%" stopColor="#580B19" />
              <stop offset="100%" stopColor="#38050E" />
            </radialGradient>
          </defs>
          {/* Viền sáp chảy bất đối xứng tự nhiên */}
          <path
            d="M 46 4 C 60 3 74 9 82 21 C 89 33 90 50 84 64 C 79 78 65 88 49 88 C 33 89 17 82 9 69 C 2 56 3 38 10 24 C 18 11 32 5 46 4 Z"
            fill="url(#burgundyWaxOuter)"
          />
          {/* Lòng con dấu dập lõm */}
          <circle
            cx="46"
            cy="46"
            r="30"
            fill="url(#burgundyWaxInner)"
            stroke="#B64057"
            strokeWidth="1.6"
            opacity="0.9"
          />
          <circle
            cx="46"
            cy="46"
            r="28.2"
            fill="none"
            stroke="#2E040C"
            strokeWidth="1.1"
            opacity="0.7"
          />
          {/* Bông hoa hồng dập nổi ở tâm */}
          <g
            fill="none"
            stroke="#C85A70"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.92"
          >
            <path d="M 45 70 Q 48 55 46 40" />
            <path d="M 46 58 Q 36 53 35 46" />
            <path d="M 47 54 Q 56 49 58 42" />
            <path
              d="M 46 25 C 39 25 36 32 40 37 C 44 41 50 40 53 36 C 56 31 52 25 46 25 Z"
              fill="#7A1426"
            />
            <path d="M 42 31 Q 46 28 50 32 Q 47 36 43 34 Z" />
          </g>
          {/* Ánh bóng sáp */}
          <path
            d="M 22 24 Q 32 13 48 13"
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </motion.div>
  );
};

/**
 * Icon bàn tay chạm có tia sáng nhấp nháy ngay trên con dấu sáp (giống hệt giây 00:02 của 2 video)
 */
export const ClickHandIndicator: React.FC = () => (
  <motion.div
    animate={{ scale: [1, 0.9, 1], y: [0, -3, 0] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    className="pointer-events-none select-none drop-shadow-[0_3px_8px_rgba(0,0,0,0.55)]"
  >
    <svg viewBox="0 0 56 56" className="w-11 h-11 sm:w-12 sm:h-12">
      {/* Tia nhấp nháy quanh đầu ngón trỏ */}
      <g stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round">
        <line x1="22" y1="6" x2="22" y2="11" />
        <line x1="11" y1="11" x2="15" y2="14" />
        <line x1="33" y1="11" x2="29" y2="14" />
        <line x1="8" y1="21" x2="13" y2="21" />
      </g>
      {/* Bàn tay vẽ nét trắng mảnh thanh lịch */}
      <path
        d="M 22 15 C 20 15 18.5 16.5 18.5 18.5 L 18.5 31 L 15.2 28.5 C 13.6 27.3 11.3 27.7 10.3 29.3 C 9.5 30.6 9.8 32.3 10.9 33.4 L 20.5 43 C 22.4 44.9 25 46 27.8 46 L 34.5 46 C 39.5 46 43.5 42 43.5 37 L 43.5 27.5 C 43.5 25.7 42 24.2 40.2 24.2 C 39.4 24.2 38.6 24.5 38 25 C 37.6 23.4 36.2 22.2 34.5 22.2 C 33.6 22.2 32.8 22.5 32.2 23.1 C 31.7 21.6 30.3 20.6 28.7 20.6 C 27.6 20.6 26.6 21.1 26 21.9 L 26 18.5 C 26 16.5 24.2 15 22 15 Z"
        fill="rgba(255,255,255,0.16)"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  </motion.div>
);

/**
 * 4 Icon Line-Art Nghệ Thuật Cho Timeline (Giống 100% frame_006 Video 1 & frame_005 Video 2)
 */
export const CameraLineIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="0 0 84 62" className="w-16 sm:w-20 h-12 sm:h-14" fill="none" stroke={color}>
    <rect x="8" y="16" width="68" height="40" rx="5" strokeWidth="1.4" />
    <path d="M 25 16 L 30 9 L 54 9 L 59 16" strokeWidth="1.4" strokeLinejoin="round" />
    <rect x="14" y="11" width="8" height="5" rx="1" strokeWidth="1.2" />
    <circle cx="42" cy="36" r="13.5" strokeWidth="1.4" />
    <circle cx="42" cy="36" r="9.5" strokeWidth="1.1" />
    <circle cx="42" cy="36" r="4" strokeWidth="1" />
    <circle cx="64" cy="24" r="2.5" strokeWidth="1.2" />
    <line x1="8" y1="26" x2="27" y2="26" strokeWidth="1" opacity="0.7" />
    <line x1="57" y1="26" x2="76" y2="26" strokeWidth="1" opacity="0.7" />
    <rect x="14" y="34" width="4" height="14" rx="1" strokeWidth="1" opacity="0.75" />
  </svg>
);

export const WeddingRingsLineIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="0 0 88 64" className="w-16 sm:w-20 h-12 sm:h-14" fill="none" stroke={color}>
    {/* Nhẫn nữ đính viên kim cương lớn */}
    <ellipse cx="34" cy="39" rx="17" ry="13" transform="rotate(-18 34 39)" strokeWidth="1.5" />
    <ellipse cx="34" cy="39" rx="13.5" ry="9.8" transform="rotate(-18 34 39)" strokeWidth="1" />
    {/* Viên kim cương trên nhẫn */}
    <polygon points="22,19 31,14 38,18 34,27 24,27" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M 22 19 L 38 18 M 27 16 L 29 27 M 34 16 L 31 27" strokeWidth="0.9" />
    {/* Tia sáng kim cương */}
    <line x1="29" y1="7" x2="29" y2="11" strokeWidth="1.1" strokeLinecap="round" />
    <line x1="18" y1="11" x2="21" y2="14" strokeWidth="1.1" strokeLinecap="round" />
    <line x1="40" y1="10" x2="37" y2="13" strokeWidth="1.1" strokeLinecap="round" />
    {/* Nhẫn nam lồng vào nhau */}
    <ellipse cx="53" cy="42" rx="18" ry="11.5" transform="rotate(20 53 42)" strokeWidth="1.5" />
    <ellipse cx="53" cy="42" rx="14.2" ry="8.5" transform="rotate(20 53 42)" strokeWidth="1" />
  </svg>
);

export const BanquetPlateLineIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="0 0 92 60" className="w-18 sm:w-22 h-12 sm:h-14" fill="none" stroke={color}>
    {/* Dĩa bên trái */}
    <path d="M 12 14 L 12 26 C 12 29 17 29 17 26 L 17 14 M 14.5 14 L 14.5 48" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M 13.2 31 L 15.8 31 L 16.5 48 C 16.5 50 12.5 50 12.5 48 Z" strokeWidth="1.1" />
    {/* Đĩa lớn & Khăn ăn thắt nơ ở tâm */}
    <ellipse cx="46" cy="34" rx="24" ry="15" strokeWidth="1.4" />
    <ellipse cx="46" cy="34" rx="18" ry="10.5" strokeWidth="1" />
    {/* Khăn ăn gấp & nơ trên đĩa */}
    <polygon points="34,34 46,25 58,34 46,42" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M 46 33 C 41 29 40 36 46 34 C 52 36 51 29 46 33 Z" strokeWidth="1.2" />
    {/* Dao bên phải */}
    <path d="M 76 14 C 80 18 80 28 76 32 L 76 48 C 76 50 73.5 50 73.5 48 L 73.5 14 Z" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

export const MusicNotesLineIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="0 0 88 64" className="w-16 sm:w-20 h-12 sm:h-14" fill="none" stroke={color}>
    {/* Dải khuông nhạc uốn sóng mềm */}
    <path d="M 10 38 Q 32 24 52 34 T 80 28" strokeWidth="1" opacity="0.55" />
    <path d="M 12 44 Q 34 30 54 40 T 82 34" strokeWidth="1" opacity="0.55" />
    {/* Nốt nhạc đôi chính */}
    <ellipse cx="32" cy="44" rx="5.5" ry="4" transform="rotate(-18 32 44)" strokeWidth="1.5" />
    <ellipse cx="52" cy="39" rx="5.5" ry="4" transform="rotate(-18 52 39)" strokeWidth="1.5" />
    <path d="M 37 43 L 37 17 L 57 12 L 57 38" strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="37" y1="22" x2="57" y2="17" strokeWidth="1.4" />
    {/* Nốt đơn bay xung quanh */}
    <ellipse cx="67" cy="49" rx="4" ry="3" transform="rotate(-18 67 49)" strokeWidth="1.3" />
    <path d="M 70.5 48 L 70.5 30 Q 76 32 77 37" strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="20" cy="24" r="2" strokeWidth="1.2" />
    <circle cx="68" cy="18" r="1.8" strokeWidth="1.2" />
  </svg>
);

/**
 * Lịch Tuần Tháng 03 + Trái Tim Vẽ Tay Khoanh Ngày Chủ Nhật 03/03/2024 + Phong Bao Nhỏ Save The Date Viền Tem Răng Cưa
 * Mô phỏng 100% giây 00:31 - 00:35 của cả 2 video mẫu!
 */
export const WeeklySaveTheDateSection: React.FC<{
  theme: 'emerald' | 'burgundy';
  kissPhoto: string;
  onImageClick?: (url: string) => void;
}> = ({ theme, kissPhoto, onImageClick }) => {
  const isEmerald = theme === 'emerald';
  const primaryColor = isEmerald ? '#3B5933' : '#6A1427';
  const subTextColor = isEmerald ? '#4C6744' : '#7D2C3F';

  // Tuần lễ thực tế của Tháng 03 năm 2027 (Ngày 02/03 Thứ Ba ăn cỗ trước, Ngày 03/03 Thứ Tư Lễ thành hôn)
  const weekDays = [
    { label: 'MON', num: '1', isWedding: false, isEve: false },
    { label: 'TUE', num: '2', isWedding: false, isEve: true },
    { label: 'WED', num: '3', isWedding: true, isEve: false },
    { label: 'THU', num: '4', isWedding: false, isEve: false },
    { label: 'FRI', num: '5', isWedding: false, isEve: false },
    { label: 'SAT', num: '6', isWedding: false, isEve: false },
    { label: 'SUN', num: '7', isWedding: false, isEve: false },
  ];

  // Răng cưa tem thư (Postage Stamp Perforated Border) bằng CSS radial-gradient mask chuẩn xác
  const stampBgStyle: React.CSSProperties = {
    backgroundImage: `radial-gradient(circle at 6px 6px, transparent 4px, #FFFFFF 4.5px)`,
    backgroundSize: '12px 12px',
    backgroundPosition: '-6px -6px',
  };

  return (
    <section className="relative px-4 sm:px-8 pt-4 pb-12 overflow-hidden">
      {/* Dải ngọc trai / dải ren trang trí mép phải như trong video */}
      {!isEmerald && (
        <svg
          viewBox="0 0 90 190"
          className="pointer-events-none absolute right-0 top-32 w-14 sm:w-18 opacity-85"
        >
          <defs>
            <radialGradient id="sidePearlSaveDate" cx="35%" cy="30%" r="68%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#F9EEF2" />
              <stop offset="100%" stopColor="#C49EAE" />
            </radialGradient>
          </defs>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((idx) => {
            const angle = (idx / 10) * Math.PI;
            const cx = 86 - Math.sin(angle) * 44;
            const cy = 20 + idx * 14;
            return <circle key={idx} cx={cx} cy={cy} r="4.5" fill="url(#sidePearlSaveDate)" />;
          })}
        </svg>
      )}

      {/* 1. TIÊU ĐỀ THÁNG 03 & DÃY LỊCH 7 NGÀY */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-sm mx-auto"
      >
        <h3
          className="font-serif-luxury text-2xl sm:text-3xl tracking-[0.14em] uppercase font-normal mb-5"
          style={{ color: primaryColor }}
        >
          THÁNG 03
        </h3>

        <div className="grid grid-cols-7 gap-1 items-start text-center relative">
          {weekDays.map((d) => (
            <div key={d.label} className="flex flex-col items-center">
              <span
                className="font-serif-luxury text-[10px] sm:text-xs tracking-wider uppercase mb-2 font-medium"
                style={{ color: subTextColor }}
              >
                {d.label}
              </span>

              {d.isWedding ? (
                <div className="relative flex flex-col items-center -mt-1.5">
                  {/* Trái tim vẽ tay mảnh khoanh số 3 + đường kẻ thẳng nối xuống chữ Save the date */}
                  <motion.svg
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    viewBox="0 0 48 80"
                    className="w-10 sm:w-11 h-16 sm:h-18 overflow-visible"
                  >
                    <path
                      d="M 24 12 C 18 3 4 6 5 18 C 6 29 24 38 24 41 C 24 38 42 29 43 18 C 44 6 30 3 24 12 Z"
                      fill="none"
                      stroke={primaryColor}
                      strokeWidth="1.4"
                    />
                    <text
                      x="24"
                      y="25"
                      textAnchor="middle"
                      fill={primaryColor}
                      className="font-serif-luxury font-semibold"
                      fontSize="14"
                    >
                      {d.num}
                    </text>
                    <line
                      x1="24"
                      y1="41"
                      x2="24"
                      y2="78"
                      stroke={primaryColor}
                      strokeWidth="1"
                    />
                  </motion.svg>
                </div>
              ) : d.isEve ? (
                /* Ngày ăn cỗ trước 02/03/2027 */
                <div className="relative flex flex-col items-center">
                  <div
                    className="w-7 h-7 rounded-full border flex items-center justify-center font-serif-luxury text-sm sm:text-base font-semibold shadow-xs"
                    style={{
                      borderColor: primaryColor,
                      backgroundColor: isEmerald ? '#EDF4EB' : '#FBF0F3',
                      color: primaryColor,
                    }}
                    title="Bữa cơm thân mật (Ăn cỗ trước)"
                  >
                    {d.num}
                  </div>
                  <span
                    className="text-[9px] font-serif-luxury font-medium mt-1 leading-tight whitespace-nowrap"
                    style={{ color: primaryColor }}
                  >
                    Ăn cỗ trước
                  </span>
                </div>
              ) : (
                <span
                  className="font-serif-luxury text-sm sm:text-base mt-0.5"
                  style={{ color: primaryColor }}
                >
                  {d.num}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Chữ thư pháp Save the date nằm ngay dưới chân đường thẳng trái tim */}
        <h4
          className="font-script-luxury text-4xl sm:text-5xl -mt-1 mb-2.5"
          style={{ color: primaryColor }}
        >
          Save the date
        </h4>

        {/* Bảng chi tiết 2 ngày: 02/03 Ăn cỗ trước & 03/03 Lễ Thành Hôn */}
        <div
          className="inline-flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl border text-center mb-6 max-w-[320px] mx-auto shadow-xs"
          style={{
            borderColor: isEmerald ? 'rgba(59,89,51,0.2)' : 'rgba(106,20,39,0.2)',
            backgroundColor: isEmerald ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.7)',
          }}
        >
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-serif-luxury">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: primaryColor }}
            />
            <span className="font-semibold" style={{ color: primaryColor }}>
              Ăn cỗ trước:
            </span>
            <span style={{ color: subTextColor }}>
              Thứ Ba, 02.03.2027 (25.01 ÂL)
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-serif-luxury">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: primaryColor }}
            />
            <span className="font-semibold" style={{ color: primaryColor }}>
              Lễ thành hôn:
            </span>
            <span style={{ color: subTextColor }}>
              11:00, Thứ Tư, 03.03.2027 (26.01 ÂL)
            </span>
          </div>
        </div>
      </motion.div>

      {/* 2. PHONG BAO NGANG ĐÍNH HOA THẬT + KHUNG ẢNH VIỀN TEM RĂNG CƯA NGHIÊNG ĐÍNH SÁP */}
      <div className="relative max-w-[350px] sm:max-w-[390px] mx-auto h-[265px] sm:h-[295px] flex items-center justify-center mt-2">
        {/* Phong bao nhỏ nằm ngang lệch trái bên dưới */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="absolute left-3 sm:left-4 bottom-4 w-[76%] h-[155px] sm:h-[175px] rounded-[3px] shadow-[0_16px_35px_rgba(0,0,0,0.16)] overflow-hidden"
          style={{
            background: isEmerald
              ? 'linear-gradient(165deg, #F6F3EC 0%, #EAE4D8 100%)'
              : 'linear-gradient(165deg, #680E20 0%, #460612 100%)',
          }}
        >
          {/* Đường chéo gập phong bì tinh tế */}
          <svg viewBox="0 0 280 175" className="w-full h-full" preserveAspectRatio="none">
            <polygon
              points="0,0 140,98 0,175"
              fill={isEmerald ? 'rgba(225,218,205,0.45)' : 'rgba(48,4,13,0.45)'}
            />
            <polygon
              points="280,0 140,98 280,175"
              fill={isEmerald ? 'rgba(218,210,196,0.35)' : 'rgba(58,6,16,0.35)'}
            />
            <polygon
              points="0,175 140,88 280,175"
              fill={isEmerald ? '#F3EFE6' : '#580B1A'}
              stroke={isEmerald ? 'rgba(185,176,160,0.5)' : 'rgba(138,30,52,0.45)'}
              strokeWidth="0.8"
            />
            {!isEmerald && (
              <>
                <path
                  d="M 28 0 Q 52 28 70 44 Q 90 64 112 80 Q 128 92 140 102 Q 152 92 168 80 Q 190 64 210 44 Q 228 28 252 0 Z"
                  fill="#440510"
                  stroke="#2B0209"
                  strokeWidth="0.9"
                />
                <polygon
                  points="36,0 140,92 244,0"
                  fill="#6B1022"
                  stroke="#87192E"
                  strokeWidth="0.8"
                />
              </>
            )}
          </svg>
        </motion.div>

        {/* Cụm Hoa Cưới Thật (Photorealistic PNG) Đính Bên Trái Phong Bao */}
        <motion.img
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.15 }}
          src={
            isEmerald
              ? decorAsset('garden-floral-cluster.png')
              : decorAsset('burgundy-floral-tassel.png')
          }
          alt=""
          aria-hidden="true"
          className={`pointer-events-none select-none absolute z-25 object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.25)] ${
            isEmerald
              ? '-left-1 sm:left-0 bottom-0 w-24 sm:w-28'
              : 'left-0.5 sm:left-1 top-[68px] sm:top-[76px] w-[86px] sm:w-[98px]'
          }`}
        />

        {/* Khung Ảnh Viền Tem Răng Cưa (Postage Stamp) Nghiêng Nhẹ Đính Con Dấu Sáp Trên Đỉnh */}
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -9 }}
          whileInView={{ opacity: 1, y: -12, rotate: -7 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => onImageClick?.(kissPhoto)}
          className="cursor-zoom-in relative z-35 ml-8 sm:ml-10 w-[235px] sm:w-[268px] p-[9px] drop-shadow-[0_14px_28px_rgba(0,0,0,0.22)] group"
          style={stampBgStyle}
        >
          <div className="bg-white p-1.5 shadow-xs">
            <div className="aspect-[4/3.1] w-full overflow-hidden bg-stone-100">
              <img
                src={kissPhoto}
                alt="Save the date"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-[center_22%] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Con Dấu Sáp Ghim Ngay Giữa Cạnh Trên Của Tấm Ảnh Tem */}
          <div className="pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2 z-30">
            <BotanicalWaxSeal theme={theme} size="sm" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/**
 * PHẦN CUỐI TRANG: LỜI CẢM ƠN & PHONG BÌ MỞ NẮP NHỌN LỒNG ẢNH CÔNG CHÚA (GIỐNG 100% GIÂY 00:52 - 00:54 TRONG 2 VIDEO)
 * - Đoạn lời cảm ơn nằm thoáng đãng hoàn toàn phía trên nền giấy (không che ảnh!)
 * - Bên dưới là phong bì mở nắp nhọn viền ren sò, gài cành hoa Calla thật bên phải, lồng bức ảnh công chúa sáng rõ!
 */
export const ThankYouOpenEnvelopeSection: React.FC<{
  theme: 'emerald' | 'burgundy';
  photoUrl: string;
  thankYouTitle: string;
  thankYouMessage: string;
  groomShortName: string;
  brideShortName: string;
  displayDate: string;
  onImageClick?: (url: string) => void;
}> = ({
  theme,
  photoUrl,
  thankYouMessage,
  groomShortName,
  brideShortName,
  displayDate,
  onImageClick,
}) => {
  const isEmerald = theme === 'emerald';
  const primaryColor = isEmerald ? '#2D5A3A' : '#721428';
  const bodyColor = isEmerald ? '#3B5A42' : '#593944';

  // Tạo dải ren sò chạy dọc 2 cạnh chéo của nắp phong bì nhọn (từ 0,150 lên đỉnh 200,12 rồi xuống 400,150)
  const buildFlapScallops = () => {
    const segs = 14;
    let dLeft = 'M 0 150 ';
    for (let i = 0; i < segs; i++) {
      const t1 = i / segs;
      const t2 = (i + 1) / segs;
      const tm = (t1 + t2) / 2;
      const x2 = 200 * t2;
      const y2 = 150 - 138 * t2;
      const xm = 200 * tm - 7;
      const ym = 150 - 138 * tm - 8;
      dLeft += `Q ${xm.toFixed(1)} ${ym.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)} `;
    }
    let dRight = 'M 200 12 ';
    for (let i = 0; i < segs; i++) {
      const t1 = i / segs;
      const t2 = (i + 1) / segs;
      const tm = (t1 + t2) / 2;
      const x2 = 200 + 200 * t2;
      const y2 = 12 + 138 * t2;
      const xm = 200 + 200 * tm + 7;
      const ym = 12 + 138 * tm - 8;
      dRight += `Q ${xm.toFixed(1)} ${ym.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)} `;
    }
    return `${dLeft} L 200 28 Z ${dRight} L 200 28 Z`;
  };

  const laceFlapPath = buildFlapScallops();

  return (
    <section className="relative pt-4 pb-0 overflow-hidden">
      {/* 1. LỜI NHẮN CẢM ƠN NẰM THOÁNG ĐÃNG TRÊN NỀN GIẤY PHÍA TRÊN PHONG BÌ (KHÔNG CHE ẢNH) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="px-6 sm:px-10 pb-7 text-center max-w-md mx-auto"
      >
        <h3
          className="font-script-luxury text-4xl sm:text-5xl mb-2.5"
          style={{ color: primaryColor }}
        >
          Lời cảm ơn!
        </h3>
        <p
          className="font-serif-italic text-xs sm:text-sm leading-relaxed"
          style={{ color: bodyColor }}
        >
          {thankYouMessage}
        </p>
        <p
          className="font-serif-luxury text-[11px] tracking-[0.22em] uppercase font-semibold mt-3 opacity-85"
          style={{ color: primaryColor }}
        >
          {groomShortName} &amp; {brideShortName} • {displayDate}
        </p>
      </motion.div>

      {/* 2. CHIẾC PHONG BÌ MỞ NẮP NHỌN LỒNG ẢNH CÔNG CHÚA Ở ĐÁY THIỆP (Y HỆT FRAME 011) */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[430px] mx-auto pt-2"
      >
        {/* NẮP PHONG BÌ NHỌN HƯỚNG LÊN TRÊN CÓ VIỀN REN SÒ (Lớp nền phía sau ảnh) */}
        <svg viewBox="0 0 400 155" className="w-full h-auto block -mb-1" preserveAspectRatio="none">
          {/* Dải ren sò dọc 2 cạnh nắp chữ V */}
          <path
            d={laceFlapPath}
            fill={isEmerald ? '#FFFFFF' : '#7A1226'}
            stroke={isEmerald ? '#D5DDD3' : '#520816'}
            strokeWidth="1"
          />
          {/* Tam giác nắp mở chính */}
          <polygon
            points="0,155 200,20 400,155"
            fill={isEmerald ? '#F3EFE6' : '#6A0E1F'}
            stroke={isEmerald ? '#DFD9CC' : '#85182D'}
            strokeWidth="1"
          />
          {/* Lòng trong phong bì */}
          <polygon
            points="18,155 200,36 382,155"
            fill={isEmerald ? '#EBE5D8' : '#530917'}
          />
        </svg>

        {/* THÂN PHONG BÌ CHỨA BỨC ẢNH CÔNG CHÚA LỒNG BÊN TRONG */}
        <div
          className="relative w-full px-4 sm:px-5 pb-16 pt-0"
          style={{
            background: isEmerald ? '#F3EFE6' : '#6A0E1F',
          }}
        >
          {/* BỨC ẢNH CƯỚI CÔNG CHÚA TRỒI LÊN SÁNG RÕ TRỌN VẸN GƯƠNG MẶT DÂU RỂ */}
          <div
            onClick={() => onImageClick?.(photoUrl)}
            className="cursor-zoom-in relative z-35 -mt-14 sm:-mt-16 mx-auto w-[92%] aspect-[3/3.6] rounded-t-xl overflow-hidden bg-white p-1.5 shadow-[0_-8px_28px_rgba(0,0,0,0.18)] group"
          >
            <div className="w-full h-full overflow-hidden rounded-t-lg relative">
              <img
                src={photoUrl}
                alt={`${groomShortName} & ${brideShortName} - Thank you`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-[center_28%] transition-transform duration-700 group-hover:scale-105"
              />
              {/* Chữ thư pháp mảnh "Thank you!" đặt thật nhẹ ở mép dưới chân váy trắng - KHÔNG CHE MẶT HAY THÂN NGƯỜI */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 via-black/15 to-transparent flex items-end justify-center pb-6">
                <span className="font-script-luxury text-4xl sm:text-5xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
                  Thank you!
                </span>
              </div>
            </div>
          </div>

          {/* CÀNH HOA CALLA THẬT GÀI Ở CẠNH PHẢI PHONG BÌ (Y HỆT FRAME 011) */}
          <img
            src={
              isEmerald
                ? decorAsset('white-calla-single.png')
                : decorAsset('burgundy-calla-single.png')
            }
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none absolute -top-20 -right-3 sm:-right-4 w-28 sm:w-34 z-25 object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.28)]"
          />

          {/* TÚI PHONG BÌ CHỮ V GẬP LÊN Ở ĐÁY ÔM CHÂN ẢNH + DẤU SÁP Ở TÂM */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 z-20">
            <svg viewBox="0 0 400 115" className="w-full h-full" preserveAspectRatio="none">
              {/* Cánh gập trái */}
              <polygon
                points="0,0 200,62 0,115"
                fill={isEmerald ? '#EFEAE0' : '#5D0B1B'}
              />
              {/* Cánh gập phải */}
              <polygon
                points="400,0 200,62 400,115"
                fill={isEmerald ? '#EAE4D8' : '#540918'}
              />
              {/* Nắp dưới gập lên */}
              <polygon
                points="0,115 200,48 400,115"
                fill={isEmerald ? '#F7F4EC' : '#731124'}
                stroke={isEmerald ? '#DFD8CA' : '#8C1B31'}
                strokeWidth="1"
              />
            </svg>

            {/* Con dấu sáp gắn ở đỉnh túi chữ V */}
            <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <BotanicalWaxSeal theme={theme} size="md" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
