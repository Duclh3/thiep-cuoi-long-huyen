import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../utils/soundEngine';
import {
  BotanicalWaxSeal,
  ClickHandIndicator,
  decorAsset,
} from './VintageFloralArtwork';

interface LuxuryWeddingEnvelopeProps {
  theme?: 'emerald' | 'burgundy';
  isOpen: boolean;
  onOpen: () => void;
  guestName?: string;
  weddingDateIso: string;
  heroPhoto: string; // Ảnh 1 trên dải photostrip (DSC_9032.jpg)
  kissPhoto: string; // Ảnh 2 dưới dải photostrip (couple-hero.jpg)
  groomShortName: string;
  brideShortName: string;
  displayDate: string;
}

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

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(weddingDateIso).getTime();
    const updateTimer = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [weddingDateIso]);

  const padZero = (n: number) => String(n).padStart(2, '0');

  // Định dạng ngày kiểu "03 | 03 | 2024" cho thiệp Oval Save the date giống hệt frame_002
  const pipeDate = displayDate.replace(/\./g, ' | ');

  // Tạo bèo vải ren cho nắp phong bì đóng (chạy từ 0,0 xuống 170,124 rồi lên 340,0)
  const { closedFlapLacePath, closedFlapEyelets } = useMemo(() => {
    const segs = 13;
    const dots: Array<{ x: number; y: number }> = [];
    let dLeft = 'M 0 0 ';
    for (let i = 0; i < segs; i++) {
      const t2 = (i + 1) / segs;
      const tm = (i + 0.5) / segs;
      const x2 = 170 * t2;
      const y2 = 124 * t2;
      const xm = 170 * tm - 7.5;
      const ym = 124 * tm + 11.5;
      dLeft += `Q ${xm.toFixed(1)} ${ym.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)} `;
      dots.push({ x: 170 * tm - 3.2, y: 124 * tm + 4.8 });
    }
    let dRight = 'M 170 124 ';
    for (let i = 0; i < segs; i++) {
      const t2 = (i + 1) / segs;
      const tm = (i + 0.5) / segs;
      const x2 = 170 + 170 * t2;
      const y2 = 124 - 124 * t2;
      const xm = 170 + 170 * tm + 7.5;
      const ym = 124 - 124 * tm + 11.5;
      dRight += `Q ${xm.toFixed(1)} ${ym.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)} `;
      dots.push({ x: 170 + 170 * tm + 3.2, y: 124 - 124 * tm + 4.8 });
    }
    return {
      closedFlapLacePath: `${dLeft} L 170 106 Z ${dRight} L 170 106 Z`,
      closedFlapEyelets: dots,
    };
  }, []);

  // Tạo bèo vải ren Oval cho tấm thiệp Save The Date trồi lên khi mở phong bì (frame_002)
  const ovalCardLacePath = useMemo(() => {
    const cx = 105;
    const cy = 140;
    const rx = 90;
    const ry = 122;
    const n = 38;
    let d = '';
    for (let i = 0; i < n; i++) {
      const t1 = (i / n) * 2 * Math.PI;
      const t2 = ((i + 1) / n) * 2 * Math.PI;
      const tm = (t1 + t2) / 2;
      const x1 = cx + rx * Math.cos(t1);
      const y1 = cy + ry * Math.sin(t1);
      const x2 = cx + rx * Math.cos(t2);
      const y2 = cy + ry * Math.sin(t2);
      const xm = cx + (rx + 9) * Math.cos(tm);
      const ym = cy + (ry + 9) * Math.sin(tm);
      if (i === 0) d += `M ${x1.toFixed(1)} ${y1.toFixed(1)} `;
      d += `Q ${xm.toFixed(1)} ${ym.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)} `;
    }
    return d + 'Z';
  }, []);

  const handleOpenClick = () => {
    if (!isOpen) {
      soundEngine.playOpenChime();
      onOpen();
    }
  };

  // ============================================================================
  // TRẠNG THÁI 1: MÀN HÌNH PHONG BÌ ĐÓNG CHƯA MỞ THIỆP (GIỐNG 100% FRAME_001 VIDEO 1 & 2)
  // ============================================================================
  if (!isOpen) {
    return (
      <section className="relative w-full min-h-[calc(100dvh-48px)] md:min-h-[760px] flex flex-col items-center justify-center px-5 pt-10 pb-24 sm:pb-28 overflow-hidden select-none">
        {/* NỀN MÀN HÌNH CHƯA MỞ THIỆP:
            - Emerald (Style 6): Tranh sơn dầu hoa hồng trắng & lá xanh thẫm (garden-roses-bg.jpg) y hệt Video 1
            - Burgundy (Style 7): Nền hồng kem mịn điểm chuỗi ngọc trai mờ sang trọng y hệt Video 2 */}
        {isEmerald ? (
          <>
            <div
              className="pointer-events-none absolute inset-0 bg-cover bg-center scale-105"
              style={{ backgroundImage: `url("${decorAsset('garden-roses-bg.jpg')}")` }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/12 to-black/38" />
          </>
        ) : (
          <>
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 50% 35%, #FCF7F9 0%, #F7ECEF 58%, #EFE0E5 100%)',
              }}
            />
            {/* Chuỗi ngọc trai mờ tinh tế ở góc màn hình chờ Style 7 */}
            <svg
              viewBox="0 0 120 180"
              className="pointer-events-none absolute top-6 left-0 w-24 opacity-45"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <circle
                  key={i}
                  cx={78 - i * 9}
                  cy={14 + i * 13}
                  r="4.5"
                  fill="#FFFFFF"
                  stroke="#D8B8C4"
                  strokeWidth="0.6"
                />
              ))}
            </svg>
          </>
        )}

        {/* LỜI MỜI & TÊN KHÁCH MỜI PHÍA TRÊN PHONG BÌ */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center mb-9 sm:mb-11"
        >
          <p
            className={`font-serif-luxury text-xs sm:text-sm uppercase tracking-[0.26em] mb-2 font-medium ${
              isEmerald
                ? 'text-[#F6F3EB] drop-shadow-[0_2px_6px_rgba(0,0,0,0.65)]'
                : 'text-[#843045]'
            }`}
          >
            TRÂN TRỌNG KÍNH MỜI
          </p>
          <p
            className={`font-script-luxury text-4xl sm:text-5xl leading-tight ${
              isEmerald
                ? 'text-[#FFFDF7] drop-shadow-[0_3px_10px_rgba(0,0,0,0.7)]'
                : 'text-[#6D1326]'
            }`}
          >
            {guestName || 'Bạn & Người Thương'}
          </p>
        </motion.div>

        {/* KHỐI PHONG BÌ ĐÓNG NẮP TƯƠNG TÁC (CHUẨN 100% FRAME_001) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpenClick}
          className="cursor-pointer relative z-20 w-[295px] sm:w-[345px] h-[196px] sm:h-[228px] my-2 group"
        >
          {/* THÂN PHONG BÌ CHỮ NHẬT ĐÓNG KÍN */}
          <div className="absolute inset-0 rounded-[3px] shadow-[0_22px_50px_rgba(0,0,0,0.38)] overflow-hidden">
            <svg viewBox="0 0 340 224" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`closedBody-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  {isEmerald ? (
                    <>
                      <stop offset="0%" stopColor="#F6F3EB" />
                      <stop offset="55%" stopColor="#EDE8DC" />
                      <stop offset="100%" stopColor="#E2DDD0" />
                    </>
                  ) : (
                    <>
                      <stop offset="0%" stopColor="#650E1E" />
                      <stop offset="55%" stopColor="#520917" />
                      <stop offset="100%" stopColor="#3D0510" />
                    </>
                  )}
                </linearGradient>
                <linearGradient id={`closedFlap-${theme}`} x1="50%" y1="0%" x2="50%" y2="100%">
                  {isEmerald ? (
                    <>
                      <stop offset="0%" stopColor="#FAF8F2" />
                      <stop offset="100%" stopColor="#ECE7DB" />
                    </>
                  ) : (
                    <>
                      <stop offset="0%" stopColor="#721124" />
                      <stop offset="100%" stopColor="#560A18" />
                    </>
                  )}
                </linearGradient>
              </defs>

              {/* Nền thân phong bì */}
              <rect width="340" height="224" fill={`url(#closedBody-${theme})`} />

              {/* Hai đường gấp chéo cánh dưới phong bì */}
              <polygon
                points="0,224 170,112 340,224"
                fill={isEmerald ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.03)'}
                stroke={isEmerald ? 'rgba(180,172,155,0.45)' : 'rgba(130,25,45,0.4)'}
                strokeWidth="0.9"
              />

              {/* Bèo vải ren thêu lỗ chạy dọc 2 cạnh chéo của nắp chữ V (Y hệt Ảnh 5 & frame_001) */}
              <path
                d={closedFlapLacePath}
                fill={isEmerald ? '#FFFFFF' : '#450511'}
                stroke={isEmerald ? '#DCD6C8' : '#2D020A'}
                strokeWidth="0.9"
                opacity={isEmerald ? 0.95 : 0.94}
              />
              {closedFlapEyelets.map((pt, idx) => (
                <circle
                  key={idx}
                  cx={pt.x.toFixed(1)}
                  cy={pt.y.toFixed(1)}
                  r="1.35"
                  fill={isEmerald ? '#DFD9CB' : '#6A1122'}
                  opacity="0.75"
                />
              ))}

              {/* Nắp tam giác chữ V chúc xuống đè lên trên bèo ren */}
              <polygon
                points="0,0 340,0 170,120"
                fill={`url(#closedFlap-${theme})`}
                stroke={isEmerald ? '#DFD9CB' : '#85182C'}
                strokeWidth="0.9"
              />
            </svg>
          </div>

          {/* HOA CƯỚI THẬT ĐÍNH TRÊN PHONG BÌ ĐÓNG (CHUẨN XÁC 100% ẢNH 5 & VIDEO 1) */}
          {isEmerald ? (
            /* Video 1 (frame_001): Cụm lá hồng môn xanh + hoa trắng + dải ren & chuỗi ngọc rủ dọc cạnh trái phong bì */
            <img
              src={decorAsset('garden-floral-cluster.png')}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -top-9 -left-8 sm:-top-11 sm:-left-9 w-28 sm:w-32 z-30 object-contain -rotate-[6deg] drop-shadow-[0_12px_20px_rgba(0,0,0,0.35)]"
            />
          ) : (
            /* Ảnh 5 (Calla Đỏ): Cụm Hồng môn đỏ rượu + Calla tím sẫm + Hoa dền rủ & dây ngọc trai ở góc dưới trái VÀ góc trên phải */
            <>
              <img
                src={decorAsset('burgundy-floral-tassel.png')}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute top-[35%] -left-9 sm:-left-10 w-[114px] sm:w-[130px] z-30 object-contain drop-shadow-[0_14px_22px_rgba(35,3,10,0.45)]"
              />
              <img
                src={decorAsset('burgundy-floral-corner.png')}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -top-11 -right-4 sm:-top-12 sm:-right-5 w-[68px] sm:w-[78px] z-30 object-contain drop-shadow-[0_10px_16px_rgba(35,3,10,0.38)]"
              />
            </>
          )}

          {/* CON DẤU SÁP DẬP NỔI HOA Ở ĐỈNH NẮP V + ICON BÀN TAY TRẮNG NHẤP NHÁY */}
          <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <BotanicalWaxSeal theme={theme} size="lg" />
            <div className="absolute -bottom-4 -right-5 z-40">
              <ClickHandIndicator />
            </div>
          </div>
        </motion.div>

        {/* NGÀY CƯỚI PHÍA DƯỚI PHONG BÌ (GIỐNG FRAME_001) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="relative z-20 mt-12 sm:mt-14 text-center"
        >
          <p
            className={`font-serif-luxury text-base sm:text-lg tracking-[0.28em] font-normal ${
              isEmerald
                ? 'text-[#F8F5EE] drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]'
                : 'text-[#843045]/85'
            }`}
          >
            {displayDate}
          </p>
          <p
            className={`text-[11px] font-serif-italic mt-1.5 ${
              isEmerald ? 'text-white/80' : 'text-[#7D2C3F]/75'
            }`}
          >
            Chạm vào dấu sáp để mở thiệp cưới
          </p>
        </motion.div>
      </section>
    );
  }

  // ============================================================================
  // TRẠNG THÁI 2: PHONG BÌ ĐÃ MỞ NẮP Ở ĐẦU TRANG THIỆP + THIỆP OVAL REN + DẢI 2 ẢNH + COUNTDOWN
  // Mô phỏng 100% giây 00:05 - 00:09 (v1_frames/frame_002.jpg & v2_frames/frame_002.jpg)
  // ============================================================================
  return (
    <section className="relative w-full flex flex-col items-center pt-10 sm:pt-14 pb-12 px-4 sm:px-6 overflow-hidden select-none">
      {/* Hoa văn Baroque chìm trang nhã ở đỉnh trang thiệp giống hệt đầu frame_002 */}
      <svg
        viewBox="0 0 400 44"
        className="pointer-events-none absolute top-0 inset-x-0 w-full h-10 opacity-20"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 12 Q 50 38 100 12 T 200 12 T 300 12 T 400 12"
          fill="none"
          stroke={isEmerald ? '#7A9174' : '#B58292'}
          strokeWidth="1.2"
        />
        <path
          d="M 0 22 Q 50 44 100 22 T 200 22 T 300 22 T 400 22"
          fill="none"
          stroke={isEmerald ? '#7A9174' : '#B58292'}
          strokeWidth="0.8"
        />
      </svg>

      {/* KHỐI PHONG BÌ ĐÃ MỞ NẮP (NẮP NHỌN HƯỚNG LÊN TRÊN) */}
      <div className="relative w-[305px] sm:w-[350px] h-[340px] sm:h-[380px] flex items-end justify-center mt-2">
        {/* Dải ruy băng ren (Emerald) hoặc Chuỗi ngọc trai uốn cong hai bên (Burgundy) như frame_002 */}
        {isEmerald ? (
          <>
            <svg
              viewBox="0 0 90 160"
              className="pointer-events-none absolute right-[-22px] top-12 w-20 opacity-85 z-5"
            >
              <path
                d="M 10 130 C 38 105 32 52 78 24"
                fill="none"
                stroke="#EAE7DF"
                strokeWidth="13"
                strokeLinecap="round"
              />
              <path
                d="M 10 130 C 38 105 32 52 78 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="9"
                strokeDasharray="2,4"
                strokeLinecap="round"
              />
            </svg>
            <svg
              viewBox="0 0 90 140"
              className="pointer-events-none absolute left-[-24px] bottom-8 w-18 opacity-85 z-5"
            >
              <path
                d="M 72 20 C 42 45 48 92 8 118"
                fill="none"
                stroke="#EAE7DF"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 72 20 C 42 45 48 92 8 118"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="8"
                strokeDasharray="2,4"
                strokeLinecap="round"
              />
            </svg>
          </>
        ) : (
          <>
            {/* Chuỗi ngọc trai bên phải & bên trái phong bì (frame_002 Video 2) */}
            <svg
              viewBox="0 0 80 140"
              className="pointer-events-none absolute -right-7 top-16 w-16 z-5 opacity-90"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <circle
                  key={i}
                  cx={58 - Math.sin((i / 8) * Math.PI) * 26}
                  cy={14 + i * 13}
                  r="4"
                  fill="#FFFFFF"
                  stroke="#D3B1BE"
                  strokeWidth="0.6"
                />
              ))}
            </svg>
            <svg
              viewBox="0 0 80 140"
              className="pointer-events-none absolute -left-7 bottom-4 w-16 z-5 opacity-90"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <circle
                  key={i}
                  cx={22 + Math.sin((i / 7) * Math.PI) * 22}
                  cy={18 + i * 13}
                  r="4"
                  fill="#FFFFFF"
                  stroke="#D3B1BE"
                  strokeWidth="0.6"
                />
              ))}
            </svg>
          </>
        )}

        {/* 1. NẮP PHONG BÌ MỞ NHỌN HƯỚNG LÊN TRÊN (Lớp sau cùng của phong bì) */}
        <div className="pointer-events-none absolute bottom-[172px] sm:bottom-[192px] inset-x-0 h-[112px] sm:h-[126px] z-8">
          <svg viewBox="0 0 340 125" className="w-full h-full" preserveAspectRatio="none">
            <polygon
              points="0,125 170,6 340,125"
              fill={isEmerald ? '#EFECE3' : '#580B1A'}
              stroke={isEmerald ? '#DDD7C8' : '#7A1428'}
              strokeWidth="1"
            />
            <polygon
              points="14,125 170,18 326,125"
              fill={isEmerald ? '#E7E2D6' : '#460713'}
            />
          </svg>
        </div>

        {/* 2. LÒNG TRONG THÂN PHONG BÌ */}
        <div
          className="pointer-events-none absolute bottom-0 inset-x-0 h-[174px] sm:h-[194px] rounded-b-[4px] shadow-[0_18px_40px_rgba(0,0,0,0.16)] z-10"
          style={{
            background: isEmerald ? '#E6E1D5' : '#420612',
          }}
        />

        {/* 3. THIỆP OVAL VIỀN VẢI REN "SAVE THE DATE" TRỒI CAO Ở GIỮA - LỆCH PHẢI (Y HỆT FRAME_002) */}
        <motion.div
          initial={{ y: 75, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-[68px] sm:bottom-[76px] right-[14px] sm:right-[18px] w-[196px] sm:w-[222px] z-15"
        >
          <div className="relative w-full">
            <svg
              viewBox="0 0 210 280"
              className="w-full h-auto drop-shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
            >
              {/* Viền bèo vải ren trắng xốp */}
              <path
                d={ovalCardLacePath}
                fill="#FFFFFF"
                stroke={isEmerald ? '#E2DDD2' : '#EAD9DF'}
                strokeWidth="1"
              />
              {/* Lòng thiệp Oval */}
              <ellipse
                cx="105"
                cy="140"
                rx="82"
                ry="114"
                fill={isEmerald ? '#FCFBF8' : '#FFFDFD'}
                stroke={isEmerald ? '#E5E0D5' : '#EFE0E5'}
                strokeWidth="1"
              />
              {/* Hai chiếc lá Calla dập nổi trắng ngà ở đáy thiệp Oval (chi tiết đắt giá trong frame_002!) */}
              <g opacity="0.85">
                <path
                  d="M 104 228 C 118 206 142 195 158 205 C 145 224 126 232 104 228 Z"
                  fill="#F5F3EE"
                  stroke="#DCD7CC"
                  strokeWidth="1"
                />
                <path
                  d="M 104 228 Q 128 214 148 207"
                  fill="none"
                  stroke="#E3DFD5"
                  strokeWidth="0.9"
                />
                <path
                  d="M 96 232 C 84 214 82 196 93 188 C 103 198 104 216 96 232 Z"
                  fill="#F5F3EE"
                  stroke="#DCD7CC"
                  strokeWidth="1"
                />
              </g>
            </svg>

            {/* Chữ bên trong Thiệp Oval */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-5 pb-5 text-center">
              <p
                className={`font-serif-luxury text-[9px] sm:text-[10px] uppercase tracking-[0.2em] mb-1 ${
                  isEmerald ? 'text-[#4A6642]' : 'text-[#7A283B]'
                }`}
              >
                SAVE THE DATE
              </p>
              <p
                className={`font-serif-luxury text-xs sm:text-sm font-semibold tracking-wider mb-2.5 ${
                  isEmerald ? 'text-[#334F2C]' : 'text-[#5C1022]'
                }`}
              >
                {pipeDate}
              </p>
              <h4
                className={`font-script-luxury text-[28px] sm:text-[33px] leading-[1.15] ${
                  isEmerald ? 'text-[#3A5A32]' : 'text-[#6B1326]'
                }`}
              >
                <span className="block">{groomShortName}</span>
                <span className="block mt-0.5">{brideShortName}</span>
              </h4>
            </div>
          </div>
        </motion.div>

        {/* 4. DẢI PHOTOBOOTH 2 ẢNH CƯỚI NGHIÊNG BÊN TRÁI TRỒI LÊN TỪ PHONG BÌ (Y HỆT FRAME_002) */}
        <motion.div
          initial={{ y: 80, rotate: -3, opacity: 0 }}
          animate={{ y: 0, rotate: -11, opacity: 1 }}
          transition={{ duration: 0.95, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-[64px] sm:bottom-[74px] left-[22px] sm:left-[26px] w-[104px] sm:w-[118px] z-18"
        >
          {/* Hoa hồng môn & Calla điểm xuyết lấp ló phía trên đỉnh dải ảnh Photobooth (y hệt frame_002) */}
          <img
            src={
              isEmerald
                ? decorAsset('garden-floral-cluster.png')
                : decorAsset('burgundy-floral-head.png')
            }
            alt=""
            aria-hidden="true"
            className={`pointer-events-none absolute object-contain drop-shadow-md ${
              isEmerald
                ? '-top-8 left-4 w-14 h-16 rotate-[22deg] object-top z-20'
                : '-top-11 -right-2 w-16 sm:w-[72px] rotate-[10deg] z-0'
            }`}
          />

          <div className="relative z-10 bg-white p-1.5 pb-2.5 shadow-[0_14px_28px_rgba(0,0,0,0.2)] rounded-[2px]">
            {/* Ảnh 1 (trên): Phong bao ban đầu dùng Ảnh 2 (DSC_9032.jpg - sạch 100%) */}
            <div className="aspect-[4/4.3] w-full overflow-hidden bg-stone-100 mb-1.5">
              <img
                src={heroPhoto}
                alt={`${groomShortName} & ${brideShortName}`}
                className="w-full h-full object-cover object-[center_20%]"
              />
            </div>
            {/* Ảnh 2 (dưới): Ảnh đôi tình cảm thứ 2 (couple-hero.jpg) */}
            <div className="aspect-[4/4.3] w-full overflow-hidden bg-stone-100">
              <img
                src={kissPhoto}
                alt={`${groomShortName} & ${brideShortName}`}
                className="w-full h-full object-cover object-[center_24%]"
              />
            </div>
          </div>
        </motion.div>

        {/* 5. MẶT TRƯỚC TÚI PHONG BÌ CHỮ V GẬP LÊN CHE CHÂN DẢI ẢNH & THIỆP OVAL */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-[174px] sm:h-[194px] rounded-b-[4px] overflow-hidden z-20">
          <svg viewBox="0 0 340 194" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`openLeft-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
                {isEmerald ? (
                  <>
                    <stop offset="0%" stopColor="#F6F3EB" />
                    <stop offset="100%" stopColor="#EAE5D8" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="#690F20" />
                    <stop offset="100%" stopColor="#4D0816" />
                  </>
                )}
              </linearGradient>
              <linearGradient id={`openRight-${theme}`} x1="100%" y1="0%" x2="0%" y2="100%">
                {isEmerald ? (
                  <>
                    <stop offset="0%" stopColor="#F3EFE6" />
                    <stop offset="100%" stopColor="#E6E0D2" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="#610C1D" />
                    <stop offset="100%" stopColor="#470713" />
                  </>
                )}
              </linearGradient>
              <linearGradient id={`openBottom-${theme}`} x1="50%" y1="100%" x2="50%" y2="0%">
                {isEmerald ? (
                  <>
                    <stop offset="0%" stopColor="#F9F7F1" />
                    <stop offset="100%" stopColor="#EFECE2" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="#721225" />
                    <stop offset="100%" stopColor="#580B1A" />
                  </>
                )}
              </linearGradient>
            </defs>

            {/* Cánh trái */}
            <polygon points="0,0 170,104 0,194" fill={`url(#openLeft-${theme})`} />
            {/* Cánh phải */}
            <polygon points="340,0 170,104 340,194" fill={`url(#openRight-${theme})`} />
            {/* Túi chữ V dưới */}
            <polygon
              points="0,194 170,88 340,194"
              fill={`url(#openBottom-${theme})`}
              stroke={isEmerald ? '#DFD9CB' : '#86192E'}
              strokeWidth="0.9"
            />
          </svg>
        </div>

        {/* 6. CON DẤU SÁP DẬP NỔI HOA GẮN Ở TÂM TÚI PHONG BÌ */}
        <div className="pointer-events-none absolute bottom-[64px] sm:bottom-[72px] left-1/2 -translate-x-1/2 z-25">
          <BotanicalWaxSeal theme={theme} size="md" />
        </div>

        {/* 7. CỤM HOA CƯỚI THẬT & DẢI REN / HOA DỀN RỦ + DÂY NGỌC TRAI Ở GÓC DƯỚI BÊN PHẢI PHONG BÌ (Y HỆT FRAME_002) */}
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.15 }}
          src={
            isEmerald
              ? decorAsset('garden-floral-cluster.png')
              : decorAsset('burgundy-floral-tassel.png')
          }
          alt=""
          aria-hidden="true"
          className={`pointer-events-none absolute z-30 object-contain drop-shadow-[0_14px_24px_rgba(0,0,0,0.24)] ${
            isEmerald
              ? '-bottom-24 -right-6 sm:-bottom-28 sm:-right-8 w-30 sm:w-36'
              : 'top-[54%] -right-5 sm:-right-6 w-[94px] sm:w-[108px]'
          }`}
        />
      </div>

      {/* BẢNG ĐẾM NGƯỢC THỜI GIAN THỰC "BEGINS IN..." (CHUẨN TYPOGRAPHY FRAME_002) */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-10 sm:mt-12 flex flex-col items-center text-center relative z-10"
      >
        <p
          className={`font-serif-luxury text-xs sm:text-sm uppercase tracking-[0.22em] mb-2 ${
            isEmerald ? 'text-[#3F5E37]' : 'text-[#6E1629]'
          }`}
        >
          BEGINS IN...
        </p>
        <div
          className={`font-serif-luxury text-3xl sm:text-4xl font-normal tracking-[0.14em] flex items-center gap-2.5 sm:gap-3.5 ${
            isEmerald ? 'text-[#3B5933]' : 'text-[#591120]'
          }`}
        >
          <span>{padZero(timeLeft.days)}</span>
          <span className="opacity-55 text-xl">:</span>
          <span>{padZero(timeLeft.hours)}</span>
          <span className="opacity-55 text-xl">:</span>
          <span>{padZero(timeLeft.minutes)}</span>
          <span className="opacity-55 text-xl">:</span>
          <span>{padZero(timeLeft.seconds)}</span>
        </div>
      </motion.div>
    </section>
  );
};
