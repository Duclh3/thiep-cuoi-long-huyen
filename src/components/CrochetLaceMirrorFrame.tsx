import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface CrochetLaceMirrorFrameProps {
  theme?: 'emerald' | 'burgundy';
  children: React.ReactNode;
}

export const CrochetLaceMirrorFrame: React.FC<CrochetLaceMirrorFrameProps> = ({
  theme = 'emerald',
  children,
}) => {
  const isEmerald = theme === 'emerald';

  // Tính toán trước đường cong ren móc (Scalloped Crochet Lace Path) cho elip khổ lớn
  const { scallopedPath, eyelets, innerPearls, pearlDrapesRight, pearlDrapesLeft } = useMemo(() => {
    const cx = 215;
    const cy = 315;
    const rx = 175;
    const ry = 265;
    const n = 44;

    let d = '';
    const eyeletPoints: Array<{ x: number; y: number }> = [];
    const pearlPoints: Array<{ x: number; y: number; r: number }> = [];

    for (let i = 0; i < n; i++) {
      const t1 = (i / n) * 2 * Math.PI;
      const t2 = ((i + 1) / n) * 2 * Math.PI;
      const tm = (t1 + t2) / 2;

      const x1 = cx + rx * Math.cos(t1);
      const y1 = cy + ry * Math.sin(t1);
      const x2 = cx + rx * Math.cos(t2);
      const y2 = cy + ry * Math.sin(t2);

      const bump = 11.5;
      const xm = cx + (rx + bump) * Math.cos(tm);
      const ym = cy + (ry + bump) * Math.sin(tm);

      if (i === 0) d += `M ${x1.toFixed(1)} ${y1.toFixed(1)} `;
      d += `Q ${xm.toFixed(1)} ${ym.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)} `;

      // Lỗ ren kim thêu (needlepoint eyelet)
      eyeletPoints.push({
        x: cx + (rx + 4.2) * Math.cos(tm),
        y: cy + (ry + 4.2) * Math.sin(tm),
      });

      // Vòng ngọc trai nhỏ đính viền trong
      pearlPoints.push({
        x: cx + (rx - 9) * Math.cos(tm),
        y: cy + (ry - 9) * Math.sin(tm),
        r: 2.2,
      });
    }
    d += 'Z';

    // Chuỗi ngọc trai 3D rủ xuống từ góc trên bên phải (khổ lớn)
    const rightStrand = [
      { x: 342, y: 80, r: 7.5 },
      { x: 355, y: 100, r: 8.5 },
      { x: 362, y: 122, r: 7.5 },
      { x: 364, y: 145, r: 6.5 },
      { x: 362, y: 168, r: 5.5 },
      { x: 356, y: 190, r: 5.0 },
      { x: 351, y: 212, r: 4.5 },
      { x: 349, y: 234, r: 4.0 },
      { x: 351, y: 256, r: 3.8 },
      { x: 355, y: 275, r: 3.5 },
    ];

    // Chuỗi ngọc trai 3D rủ cong ở góc dưới bên trái (khổ lớn)
    const leftStrand = [
      { x: 92, y: 480, r: 4.0 },
      { x: 84, y: 502, r: 4.5 },
      { x: 82, y: 524, r: 5.0 },
      { x: 86, y: 546, r: 5.5 },
      { x: 100, y: 566, r: 6.0 },
      { x: 120, y: 582, r: 6.5 },
      { x: 145, y: 592, r: 6.0 },
      { x: 172, y: 596, r: 5.0 },
    ];

    return {
      scallopedPath: d,
      eyelets: eyeletPoints,
      innerPearls: pearlPoints,
      pearlDrapesRight: rightStrand,
      pearlDrapesLeft: leftStrand,
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-[385px] sm:max-w-[440px] md:max-w-[465px] select-none"
    >
      {/* Hiệu ứng lơ lửng nhẹ nhàng tự nhiên (Floating Animation) */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-full"
      >
        {/* LỚP NỀN SVG KHUNG GƯƠNG REN HOA & CHUỖI NGỌC TRAI 3D */}
        <svg
          viewBox="0 0 430 630"
          className="w-full h-auto drop-shadow-[0_24px_50px_rgba(0,0,0,0.14)]"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Gradient Mặt Gương Trong Suốt Nhẹ */}
            <radialGradient id={`mirrorGlassGrad-${theme}`} cx="40%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="55%" stopColor={isEmerald ? '#FAFDFB' : '#FFFDFC'} />
              <stop offset="85%" stopColor={isEmerald ? '#F2F7F3' : '#FBF3F6'} />
              <stop offset="100%" stopColor={isEmerald ? '#E5EFE7' : '#F6E4EB'} />
            </radialGradient>

            {/* Gradient Ngọc Trai 3D Ánh Xà Cừ Cao Cấp */}
            <radialGradient id={`pearl3DGrad-${theme}`} cx="32%" cy="28%" r="68%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor={isEmerald ? '#F6FAF7' : '#FDF6F8'} />
              <stop offset="85%" stopColor={isEmerald ? '#D8E8DC' : '#E8CBD6'} />
              <stop offset="100%" stopColor={isEmerald ? '#A6C6AD' : '#BA91A2'} />
            </radialGradient>

            {/* Gradient Cánh Hoa Calla */}
            <linearGradient id={`callaPetalGrad-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
              {isEmerald ? (
                <>
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="60%" stopColor="#F5FAF6" />
                  <stop offset="100%" stopColor="#D5E8D9" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#B32442" />
                  <stop offset="50%" stopColor="#7E1428" />
                  <stop offset="100%" stopColor="#450813" />
                </>
              )}
            </linearGradient>

            {/* Gradient Cuống Hoa Xanh Ngọc / Xanh Rêu */}
            <linearGradient id={`callaStemGrad-${theme}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#558A60" />
              <stop offset="100%" stopColor="#2E5236" />
            </linearGradient>
          </defs>

          {/* 1. LỚP ĐỆM REN NGOÀI CÙNG (Crochet Scalloped Ruffle) */}
          <path
            d={scallopedPath}
            fill="#FFFFFF"
            stroke={isEmerald ? '#9AC4A1' : '#D9AAB9'}
            strokeWidth="1.2"
            className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
          />

          {/* 2. CÁC LỖ REN THÊU TAY (Eyelets) */}
          {eyelets.map((pt, idx) => (
            <circle
              key={`eyelet-${idx}`}
              cx={pt.x.toFixed(1)}
              cy={pt.y.toFixed(1)}
              r="1.4"
              fill={isEmerald ? '#6B9D73' : '#B87289'}
              opacity="0.45"
            />
          ))}

          {/* 3. VIỀN OVAL KÉP TRONG SUỐT (Lace Inner Ring) */}
          <ellipse
            cx="215"
            cy="315"
            rx="170"
            ry="260"
            fill="none"
            stroke={isEmerald ? '#A9CFB0' : '#E2B8C6'}
            strokeWidth="0.8"
            strokeDasharray="3,2"
          />

          {/* 4. MẶT GƯƠNG OVAL CHÍNH (Mirror Body) */}
          <ellipse
            cx="215"
            cy="315"
            rx="166"
            ry="256"
            fill={`url(#mirrorGlassGrad-${theme})`}
            stroke={isEmerald ? '#6E9E76' : '#9E3C56'}
            strokeWidth="1"
            className="drop-shadow-inner"
          />

          {/* 5. VÒNG CHUỖI NGỌC TRAI NHỎ CHẠY QUANH MẶT TRONG */}
          {innerPearls.map((pt, idx) => (
            <circle
              key={`inner-pearl-${idx}`}
              cx={pt.x.toFixed(1)}
              cy={pt.y.toFixed(1)}
              r={pt.r}
              fill={`url(#pearl3DGrad-${theme})`}
              stroke={isEmerald ? '#97BFA0' : '#D6A6B7'}
              strokeWidth="0.3"
            />
          ))}

          {/* 6. CHUỖI NGỌC TRAI 3D RỦ TỰ NHIÊN GÓC TRÊN BÊN PHẢI */}
          <g className="filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.18)]">
            <path
              d="M 342 80 Q 365 140 349 234"
              fill="none"
              stroke="#E8E8E8"
              strokeWidth="0.6"
              opacity="0.6"
            />
            {pearlDrapesRight.map((p, idx) => (
              <circle
                key={`pearl-r-${idx}`}
                cx={p.x}
                cy={p.y}
                r={p.r}
                fill={`url(#pearl3DGrad-${theme})`}
                stroke={isEmerald ? '#BDD9C2' : '#DEB7C6'}
                strokeWidth="0.4"
              />
            ))}
          </g>

          {/* 7. CHUỖI NGỌC TRAI 3D RỦ CONG GÓC DƯỚI BÊN TRÁI */}
          <g className="filter drop-shadow-[0_3px_6px_rgba(0,0,0,0.15)]">
            <path
              d="M 92 480 Q 75 540 172 596"
              fill="none"
              stroke="#E8E8E8"
              strokeWidth="0.6"
              opacity="0.6"
            />
            {pearlDrapesLeft.map((p, idx) => (
              <circle
                key={`pearl-l-${idx}`}
                cx={p.x}
                cy={p.y}
                r={p.r}
                fill={`url(#pearl3DGrad-${theme})`}
                stroke={isEmerald ? '#BDD9C2' : '#DEB7C6'}
                strokeWidth="0.4"
              />
            ))}
          </g>

          {/* 8. BÔNG HOA CALLA SỐNG ĐỘNG GÓC DƯỚI PHẢI */}
          <g className="filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.22)]">
            <path
              d="M 355 600 Q 375 555 352 480"
              fill="none"
              stroke={`url(#callaStemGrad-${theme})`}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 352 480 C 378 470 392 436 363 424 C 336 418 325 448 341 482 Z"
              fill={`url(#callaPetalGrad-${theme})`}
              stroke={isEmerald ? '#BDD9C2' : '#8A152E'}
              strokeWidth="0.8"
            />
            <path
              d="M 352 456 Q 354 442 358 430"
              fill="none"
              stroke="#FAD02C"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
          </g>
        </svg>

        {/* LỚP ÁNH SÁNG LƯỚT QUA MẶT GƯƠNG (Shimmer Reflection Sweep) */}
        <div className="pointer-events-none absolute inset-x-8 inset-y-12 rounded-[50%/44%] overflow-hidden">
          <motion.div
            animate={{ x: ['-120%', '220%'] }}
            transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
          />
        </div>

        {/* NỘI DUNG CHÍNH NẰM TRỌN TRONG KHUNG GƯƠNG VỚI KHÔNG GIAN THOÁNG ĐÃNG */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-10 py-8 sm:py-10 text-center z-10">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};
