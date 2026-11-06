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

  // Tính toán trước đường cong ren móc (Scalloped Crochet Lace Path) cho elip
  const { scallopedPath, eyelets, innerPearls, pearlDrapesRight, pearlDrapesLeft } = useMemo(() => {
    const cx = 200;
    const cy = 290;
    const rx = 152;
    const ry = 240;
    const n = 40;

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

      const bump = 11;
      const xm = cx + (rx + bump) * Math.cos(tm);
      const ym = cy + (ry + bump) * Math.sin(tm);

      if (i === 0) d += `M ${x1.toFixed(1)} ${y1.toFixed(1)} `;
      d += `Q ${xm.toFixed(1)} ${ym.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)} `;

      // Lỗ ren kim thêu (needlepoint eyelet)
      eyeletPoints.push({
        x: cx + (rx + 4) * Math.cos(tm),
        y: cy + (ry + 4) * Math.sin(tm),
      });

      // Vòng ngọc trai nhỏ đính viền trong
      pearlPoints.push({
        x: cx + (rx - 8) * Math.cos(tm),
        y: cy + (ry - 8) * Math.sin(tm),
        r: 2.2,
      });
    }
    d += 'Z';

    // Chuỗi ngọc trai 3D rủ xuống từ góc trên bên phải (như trong video frame_004)
    const rightStrand = [
      { x: 315, y: 75, r: 7.5 },
      { x: 326, y: 92, r: 8.5 },
      { x: 332, y: 112, r: 7.5 },
      { x: 334, y: 132, r: 6.5 },
      { x: 332, y: 152, r: 5.5 },
      { x: 326, y: 172, r: 5.0 },
      { x: 322, y: 192, r: 4.5 },
      { x: 321, y: 212, r: 4.0 },
      { x: 323, y: 232, r: 3.8 },
      { x: 326, y: 250, r: 3.5 },
    ];

    // Chuỗi ngọc trai 3D rủ cong ở góc dưới bên trái (như trong video frame_004)
    const leftStrand = [
      { x: 95, y: 440, r: 4.0 },
      { x: 88, y: 458, r: 4.5 },
      { x: 86, y: 478, r: 5.0 },
      { x: 90, y: 498, r: 5.5 },
      { x: 102, y: 516, r: 6.0 },
      { x: 120, y: 530, r: 6.5 },
      { x: 142, y: 540, r: 6.0 },
      { x: 165, y: 544, r: 5.0 },
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
      initial={{ opacity: 0, scale: 0.92, y: 35 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-[350px] sm:max-w-[400px] select-none"
    >
      {/* Hiệu ứng lơ lửng nhẹ nhàng tự nhiên (Floating Animation) */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-full"
      >
        {/* LỚP NỀN SVG KHUNG GƯƠNG REN HOA & CHUỖI NGỌC TRAI 3D */}
        <svg
          viewBox="0 0 400 580"
          className="w-full h-auto drop-shadow-[0_20px_45px_rgba(0,0,0,0.12)]"
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
            cx="200"
            cy="290"
            rx="148"
            ry="236"
            fill="none"
            stroke={isEmerald ? '#A9CFB0' : '#E2B8C6'}
            strokeWidth="0.8"
            strokeDasharray="3,2"
          />

          {/* 4. MẶT GƯƠNG OVAL CHÍNH (Mirror Body) */}
          <ellipse
            cx="200"
            cy="290"
            rx="144"
            ry="232"
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

          {/* 6. CHUỖI NGỌC TRAI 3D RỦ TỰ NHIÊN GÓC TRÊN BÊN PHẢI (frame_004) */}
          <g className="filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.18)]">
            {/* Dây xâu ngọc mảnh mờ */}
            <path
              d="M 315 75 Q 335 125 321 212"
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

          {/* 7. CHUỖI NGỌC TRAI 3D RỦ CONG GÓC DƯỚI BÊN TRÁI (frame_004) */}
          <g className="filter drop-shadow-[0_3px_6px_rgba(0,0,0,0.15)]">
            <path
              d="M 95 440 Q 75 490 165 544"
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

          {/* 8. BÔNG HOA CALLA SỐNG ĐỘNG GÓC DƯỚI PHẢI (frame_004) */}
          <g className="filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.22)]">
            {/* Cuống hoa dài uốn lượn tự nhiên */}
            <path
              d="M 326 550 Q 346 510 328 440"
              fill="none"
              stroke={`url(#callaStemGrad-${theme})`}
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Cánh hoa Calla hình phễu mềm mại */}
            <path
              d="M 328 440 C 352 430 365 398 338 388 C 314 382 304 410 318 442 Z"
              fill={`url(#callaPetalGrad-${theme})`}
              stroke={isEmerald ? '#BDD9C2' : '#8A152E'}
              strokeWidth="0.8"
            />
            {/* Nhị vàng óng ánh bên trong cánh hoa */}
            <path
              d="M 328 418 Q 330 405 333 394"
              fill="none"
              stroke="#FAD02C"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
          </g>
        </svg>

        {/* LỚP ÁNH SÁNG LƯỚT QUA MẶT GƯƠNG (Shimmer Reflection Sweep) */}
        <div className="pointer-events-none absolute inset-x-8 inset-y-12 rounded-[50%/42%] overflow-hidden">
          <motion.div
            animate={{ x: ['-120%', '220%'] }}
            transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
          />
        </div>

        {/* NỘI DUNG CHÍNH NẰM LỌNG TRONG KHUNG GƯƠNG */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 sm:px-11 py-10 text-center z-10">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};
