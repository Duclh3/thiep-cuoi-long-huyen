import React, { useEffect, useRef } from 'react';
import { StyleId } from '../data/weddingData';

interface AmbientCanvasProps {
  styleId: StyleId;
}

type AmbientParticleKind =
  | 'heart'
  | 'petal'
  | 'butterfly'
  | 'gold-foil'
  | 'champagne-bubble'
  | 'diamond-star'
  | 'firefly'
  | 'lantern'
  | 'apricot-blossom';

interface AmbientParticle {
  kind: AmbientParticleKind;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  angle: number;
  spin: number;
  phase: number;
  phaseSpeed: number;
  color: string;
  secondaryColor?: string;
  alpha: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  alpha: number;
  decay: number;
  color: string;
}

interface FireworkSpark {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
  shape: 'circle' | 'heart' | 'star' | 'trail';
  gravity: number;
}

interface CenterSymbolFlash {
  x: number;
  y: number;
  alpha: number;
  scale: number;
  text: string;
  color: string;
}

declare global {
  interface Window {
    triggerWeddingFireworks?: (count?: number) => void;
  }
}

export const AmbientCanvas: React.FC<AmbientCanvasProps> = ({ styleId }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // ============================================================================
    // 1. KHỞI TẠO HẠT MÔI TRƯỜNG ĐẶC TRƯNG RIÊNG CHO TỪNG PHONG CÁCH (4 STYLES)
    // ============================================================================
    const particles: AmbientParticle[] = [];
    const shootingStars: ShootingStar[] = [];
    const sparks: FireworkSpark[] = [];
    const symbolFlashes: CenterSymbolFlash[] = [];

    const count = width < 768 ? 26 : 42;

    for (let i = 0; i < count; i++) {
      if (styleId === 'fairytale') {
        // Phong cách 01 (Fine Art): Trái tim lụa hồng + Cánh hoa đào + Bướm vàng vỗ cánh
        const rand = i % 7;
        const kind: AmbientParticleKind =
          rand === 0 ? 'butterfly' : rand % 2 === 0 ? 'heart' : 'petal';
        particles.push({
          kind,
          x: Math.random() * width,
          y: Math.random() * height,
          size: kind === 'butterfly' ? Math.random() * 6 + 9 : Math.random() * 6 + 6,
          vx: (Math.random() - 0.5) * 0.6,
          vy: kind === 'butterfly' ? -(Math.random() * 0.5 + 0.25) : Math.random() * 0.85 + 0.45,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.018,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: kind === 'butterfly' ? 0.14 : 0.035,
          color:
            kind === 'butterfly'
              ? '#D4AF37'
              : i % 3 === 0
              ? 'rgba(225, 95, 125, 0.78)'
              : 'rgba(248, 175, 192, 0.82)',
          secondaryColor: '#FFF0F5',
          alpha: 0.85,
        });
      } else if (styleId === 'editorial') {
        // Phong cách 02 (Tạp Chí Vogue): Lá vàng 24K + Bọt Sâm panh bay lên + Ánh kim cương 4 cạnh
        const kind: AmbientParticleKind =
          i % 3 === 0 ? 'diamond-star' : i % 2 === 0 ? 'champagne-bubble' : 'gold-foil';
        particles.push({
          kind,
          x: Math.random() * width,
          y: Math.random() * height,
          size: kind === 'diamond-star' ? Math.random() * 7 + 6 : Math.random() * 5 + 3.5,
          vx: (Math.random() - 0.5) * 0.35,
          vy: kind === 'champagne-bubble' ? -(Math.random() * 0.75 + 0.35) : Math.random() * 0.6 + 0.25,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.02,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.045,
          color: i % 2 === 0 ? '#D4AF37' : '#F5E1A4',
          secondaryColor: '#FFFFFF',
          alpha: Math.random() * 0.55 + 0.35,
        });
      } else if (styleId === 'cinematic') {
        // Phong cách 03 (Đêm Pháo Hoa 3D): Đom đóm phát quang đêm sao + Bụi thiên hà
        particles.push({
          kind: i % 4 === 0 ? 'diamond-star' : 'firefly',
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 3.5 + 2,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          angle: Math.random() * Math.PI * 2,
          spin: 0.01,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: Math.random() * 0.06 + 0.02,
          color: i % 2 === 0 ? '#FFD166' : '#FF9E64',
          alpha: 0.8,
        });
      } else if (styleId === 'garden') {
        // Phong cách 06 (Khu Vườn Xanh Ngọc): Cánh hoa hồng trắng bay lượn + lá ngọc biếc + đốm nắng lung linh
        const kind: AmbientParticleKind = i % 3 === 0 ? 'diamond-star' : 'petal';
        particles.push({
          kind,
          x: Math.random() * width,
          y: Math.random() * height,
          size: kind === 'diamond-star' ? Math.random() * 5 + 4 : Math.random() * 7 + 6,
          vx: (Math.random() - 0.5) * 0.5,
          vy: Math.random() * 0.75 + 0.35,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.02,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.035,
          color: i % 2 === 0 ? 'rgba(255, 255, 255, 0.88)' : 'rgba(235, 247, 238, 0.82)',
          secondaryColor: '#C8E6C9',
          alpha: 0.85,
        });
      } else if (styleId === 'calla') {
        // Phong cách 07 (Calla Đỏ Bordeaux): Cánh hoa hồng nhung đỏ bordeaux + bụi vàng kim 24K + trái tim
        const kind: AmbientParticleKind = i % 3 === 0 ? 'diamond-star' : i % 2 === 0 ? 'heart' : 'petal';
        particles.push({
          kind,
          x: Math.random() * width,
          y: Math.random() * height,
          size: kind === 'diamond-star' ? Math.random() * 6 + 4 : Math.random() * 7 + 6,
          vx: (Math.random() - 0.5) * 0.55,
          vy: Math.random() * 0.8 + 0.4,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.025,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.04,
          color: i % 2 === 0 ? 'rgba(168, 40, 69, 0.88)' : 'rgba(125, 30, 58, 0.92)',
          secondaryColor: '#D4AF37',
          alpha: 0.88,
        });
      } else {
        // Phong cách 04 (Đông Dương Cung Đình): Đèn lồng Hội An bay lên trời + Hoa mai vàng 5 cánh
        const isLantern = i % 3 === 0;
        particles.push({
          kind: isLantern ? 'lantern' : 'apricot-blossom',
          x: Math.random() * width,
          y: Math.random() * height,
          size: isLantern ? Math.random() * 7 + 10 : Math.random() * 5 + 5.5,
          vx: (Math.random() - 0.5) * 0.35,
          vy: isLantern ? -(Math.random() * 0.65 + 0.35) : Math.random() * 0.7 + 0.35,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.02,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.035,
          color: isLantern ? '#FF6B35' : '#F7CE68',
          secondaryColor: '#FFF3B0',
          alpha: 0.88,
        });
      }
    }

    // ============================================================================
    // 2. HÀM TẠO PHÁO HOA ĐẶC TRƯNG THEO TỪNG PHONG CÁCH
    // ============================================================================
    const spawnStyleFirework = (cx: number, cy: number) => {
      if (styleId === 'fairytale') {
        // PHÁO HOA HÌNH TRÁI TIM LÃNG MẠN (Heart Parametric Curve)
        const total = 44;
        for (let i = 0; i < total; i++) {
          const t = (Math.PI * 2 * i) / total;
          // Phương trình đường cong trái tim
          const hx = 16 * Math.pow(Math.sin(t), 3);
          const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
          const scale = 0.22 + Math.random() * 0.04;
          sparks.push({
            x: cx,
            y: cy,
            prevX: cx,
            prevY: cy,
            vx: hx * scale,
            vy: hy * scale,
            alpha: 1,
            decay: 0.013 + Math.random() * 0.006,
            color: i % 2 === 0 ? '#FF4D79' : '#FFB3C6',
            size: 3.2,
            shape: 'heart',
            gravity: 0.02,
          });
        }
        symbolFlashes.push({
          x: cx,
          y: cy,
          alpha: 1,
          scale: 0.6,
          text: '♥',
          color: '#FF4D79',
        });
      } else if (styleId === 'editorial') {
        // PHÁO HOA THÁC VÀNG SÂM PANH & SAO KIM CƯƠNG 4 CẠNH (Vogue Champagne Willow)
        const total = 48;
        const goldPalette = ['#D4AF37', '#FFF3C4', '#C5A059', '#FFFFFF'];
        for (let i = 0; i < total; i++) {
          const angle = (Math.PI * 2 * i) / total + (Math.random() - 0.5) * 0.12;
          const speed = Math.random() * 4.5 + 1.4;
          sparks.push({
            x: cx,
            y: cy,
            prevX: cx,
            prevY: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            decay: 0.011 + Math.random() * 0.007,
            color: goldPalette[i % goldPalette.length],
            size: Math.random() * 3.5 + 2.2,
            shape: 'star',
            gravity: 0.065, // Rơi rủ xuống như thác kim tuyến vàng
          });
        }
      } else if (styleId === 'cinematic') {
        // ĐẠI TIỆC PHÁO HOA ĐÊM ĐA TẦNG CÓ VỆT SÁNG DÀI (Double Ring Peony & Chrysanthemum)
        const outerCount = 46;
        const innerCount = 26;
        const palette = ['#FFD166', '#FF6B8B', '#4CC9F0', '#F72585', '#FFF3B0'];
        const mainColor = palette[Math.floor(Math.random() * palette.length)];
        const subColor = '#FFD166';

        for (let i = 0; i < outerCount; i++) {
          const angle = (Math.PI * 2 * i) / outerCount;
          const speed = 4.2 + Math.random() * 1.2;
          sparks.push({
            x: cx,
            y: cy,
            prevX: cx,
            prevY: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            decay: 0.012,
            color: mainColor,
            size: 2.6,
            shape: 'trail',
            gravity: 0.04,
          });
        }
        for (let i = 0; i < innerCount; i++) {
          const angle = (Math.PI * 2 * i) / innerCount;
          const speed = 2.1 + Math.random() * 0.6;
          sparks.push({
            x: cx,
            y: cy,
            prevX: cx,
            prevY: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            decay: 0.015,
            color: subColor,
            size: 2.2,
            shape: 'star',
            gravity: 0.03,
          });
        }
      } else if (styleId === 'garden') {
        // PHÁO HOA XANH NGỌC & VÀNG KIM (Emerald Sparkle Garden)
        const total = 46;
        const gardenPalette = ['#4E8A5E', '#83C294', '#D4AF37', '#FFFDF9', '#A8D5BA'];
        for (let i = 0; i < total; i++) {
          const angle = (Math.PI * 2 * i) / total + (Math.random() - 0.5) * 0.15;
          const speed = Math.random() * 4.2 + 1.6;
          sparks.push({
            x: cx,
            y: cy,
            prevX: cx,
            prevY: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            decay: 0.012 + Math.random() * 0.006,
            color: gardenPalette[i % gardenPalette.length],
            size: Math.random() * 3.5 + 2.2,
            shape: 'star',
            gravity: 0.045,
          });
        }
        symbolFlashes.push({
          x: cx,
          y: cy,
          alpha: 1,
          scale: 0.65,
          text: '🌿',
          color: '#83C294',
        });
      } else if (styleId === 'calla') {
        // PHÁO HOA RƯỢU BORDEAUX & VÀNG HOÀNG GIA (Burgundy Calla Romance)
        const total = 46;
        const callaPalette = ['#9B2240', '#681427', '#D4AF37', '#FCE79C', '#FFD1DC'];
        for (let i = 0; i < total; i++) {
          const angle = (Math.PI * 2 * i) / total + (Math.random() - 0.5) * 0.15;
          const speed = Math.random() * 4.4 + 1.8;
          sparks.push({
            x: cx,
            y: cy,
            prevX: cx,
            prevY: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            decay: 0.012 + Math.random() * 0.006,
            color: callaPalette[i % callaPalette.length],
            size: Math.random() * 3.6 + 2.2,
            shape: 'heart',
            gravity: 0.05,
          });
        }
        symbolFlashes.push({
          x: cx,
          y: cy,
          alpha: 1,
          scale: 0.65,
          text: '♥',
          color: '#D4AF37',
        });
      } else {
        // PHÁO HOA CUNG ĐÌNH ĐÔNG DƯƠNG: NỔ ẤN SONG HỶ (囍) VÀ HOA MAI VÀNG ĐỎ SON
        const total = 44;
        for (let i = 0; i < total; i++) {
          const angle = (Math.PI * 2 * i) / total;
          // Tạo hình bông hoa 8 cánh hoàng gia
          const petalMod = 1 + 0.35 * Math.cos(8 * angle);
          const speed = 3.2 * petalMod;
          sparks.push({
            x: cx,
            y: cy,
            prevX: cx,
            prevY: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            decay: 0.013,
            color: i % 2 === 0 ? '#F7CE68' : '#FF3B3B',
            size: 2.8,
            shape: 'trail',
            gravity: 0.03,
          });
        }
        symbolFlashes.push({
          x: cx,
          y: cy,
          alpha: 1,
          scale: 0.7,
          text: '囍',
          color: '#F7CE68',
        });
      }
    };

    // Tạo sao băng cho phong cách Cinematic
    const spawnShootingStar = () => {
      if (styleId !== 'cinematic') return;
      shootingStars.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.35,
        vx: 7 + Math.random() * 4,
        vy: 3.5 + Math.random() * 2,
        length: 65 + Math.random() * 45,
        alpha: 1,
        decay: 0.022,
        color: '#FFE599',
      });
    };

    window.triggerWeddingFireworks = (burstCount = 5) => {
      for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
          const rx = width * (0.18 + Math.random() * 0.64);
          const ry = height * (0.15 + Math.random() * 0.42);
          spawnStyleFirework(rx, ry);
          if (styleId === 'cinematic') spawnShootingStar();
        }, i * 280);
      }
    };

    const autoFireworkInterval = window.setInterval(() => {
      const rx = width * (0.15 + Math.random() * 0.7);
      const ry = height * (0.12 + Math.random() * 0.42);
      spawnStyleFirework(rx, ry);
      if (styleId === 'cinematic' && Math.random() > 0.35) {
        spawnShootingStar();
      }
    }, 3200);

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button'))
      ) {
        return;
      }
      spawnStyleFirework(e.clientX, e.clientY);
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    // ============================================================================
    // 3. CÁC HÀM VẼ HÌNH HỌC NGHỆ THUẬT TRÊN CANVAS
    // ============================================================================
    const drawHeart = (x: number, y: number, size: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = color;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, (size + topCurveHeight) / 1.4, 0, size);
      ctx.bezierCurveTo(0, (size + topCurveHeight) / 1.4, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawFourPointStar = (x: number, y: number, radius: number, color: string, rot = 0) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.fillStyle = color;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(Math.cos((i * Math.PI) / 2) * radius, Math.sin((i * Math.PI) / 2) * radius);
        ctx.lineTo(
          Math.cos(((i + 0.5) * Math.PI) / 2) * (radius * 0.28),
          Math.sin(((i + 0.5) * Math.PI) / 2) * (radius * 0.28)
        );
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // A. Vẽ các hạt môi trường theo từng phong cách
      for (const p of particles) {
        p.phase += p.phaseSpeed;
        p.angle += p.spin;
        p.x += p.vx + Math.sin(p.phase) * 0.4;
        p.y += p.vy;

        // Xử lý biên cho cả hạt rơi xuống và hạt bay lên (bướm, bọt sâm panh, đèn trời)
        if (p.vy > 0 && p.y > height + 30) {
          p.y = -25;
          p.x = Math.random() * width;
        } else if (p.vy < 0 && p.y < -30) {
          p.y = height + 25;
          p.x = Math.random() * width;
        }
        if (p.x > width + 30) p.x = -25;
        if (p.x < -30) p.x = width + 25;

        ctx.save();
        ctx.globalAlpha = p.alpha;

        if (p.kind === 'heart') {
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.sin(p.phase) * 0.35);
          ctx.scale(Math.max(0.35, Math.abs(Math.cos(p.phase * 0.7))), 1);
          drawHeart(0, 0, p.size * 1.35, p.color);
        } else if (p.kind === 'petal') {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.scale(1, Math.max(0.25, Math.abs(Math.cos(p.phase))));
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(p.size, -p.size * 0.9, p.size * 1.5, p.size * 0.5, 0, p.size * 1.45);
          ctx.bezierCurveTo(-p.size * 1.5, p.size * 0.5, -p.size, -p.size * 0.9, 0, 0);
          ctx.fill();
        } else if (p.kind === 'butterfly') {
          // Bướm vàng vỗ cánh bay lượn
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.sin(p.phase * 0.3) * 0.25);
          const wingScale = Math.abs(Math.cos(p.phase)) * 0.85 + 0.15;
          ctx.scale(wingScale, 1);
          ctx.fillStyle = p.color;
          ctx.shadowColor = '#FFD700';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.ellipse(-p.size * 0.45, 0, p.size * 0.55, p.size * 0.35, -0.3, 0, Math.PI * 2);
          ctx.ellipse(p.size * 0.45, 0, p.size * 0.55, p.size * 0.35, 0.3, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.kind === 'diamond-star') {
          const twinkle = (Math.sin(p.phase * 1.5) + 1) * 0.5;
          ctx.globalAlpha = 0.25 + twinkle * 0.75;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          drawFourPointStar(p.x, p.y, p.size * (0.7 + twinkle * 0.5), p.color, p.angle);
        } else if (p.kind === 'champagne-bubble') {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = 'rgba(255,255,255,0.45)';
          ctx.beginPath();
          ctx.arc(p.x - p.size * 0.3, p.y - p.size * 0.3, p.size * 0.25, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.kind === 'gold-foil') {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.scale(Math.cos(p.phase), Math.sin(p.phase));
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        } else if (p.kind === 'firefly') {
          const glow = (Math.sin(p.phase) + 1) * 0.5;
          ctx.globalAlpha = 0.2 + glow * 0.8;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 14;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (0.6 + glow * 0.6), 0, Math.PI * 2);
          ctx.fill();
        } else if (p.kind === 'lantern') {
          // Đèn trời Hội An phát sáng bay lên
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.sin(p.phase) * 0.08);
          ctx.shadowColor = '#FF9F1C';
          ctx.shadowBlur = 18;
          const grad = ctx.createRadialGradient(0, p.size * 0.2, 1, 0, 0, p.size);
          grad.addColorStop(0, '#FFF3B0');
          grad.addColorStop(0.5, '#FF9F1C');
          grad.addColorStop(1, '#E71D36');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.roundRect(-p.size * 0.42, -p.size * 0.55, p.size * 0.84, p.size * 1.1, [
            p.size * 0.3,
            p.size * 0.3,
            p.size * 0.1,
            p.size * 0.1,
          ]);
          ctx.fill();
        } else if (p.kind === 'apricot-blossom') {
          // Hoa mai vàng 5 cánh Đông Dương
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.fillStyle = p.color;
          for (let k = 0; k < 5; k++) {
            ctx.rotate((Math.PI * 2) / 5);
            ctx.beginPath();
            ctx.arc(0, -p.size * 0.55, p.size * 0.36, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = '#B91C1C';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // B. Vẽ Sao Băng (Shooting Stars) cho phong cách Cinematic
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const st = shootingStars[i];
        st.x += st.vx;
        st.y += st.vy;
        st.alpha -= st.decay;
        if (st.alpha <= 0.02) {
          shootingStars.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = st.alpha;
        const grad = ctx.createLinearGradient(
          st.x,
          st.y,
          st.x - st.vx * 8,
          st.y - st.vy * 8
        );
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.4, st.color);
        grad.addColorStop(1, 'transparent');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(st.x, st.y);
        ctx.lineTo(st.x - st.vx * 8, st.y - st.vy * 8);
        ctx.stroke();
        ctx.restore();
      }

      // C. Vẽ Pháo Hoa theo từng hình dạng đặc trưng (Trái tim / Sao 4 cạnh / Vệt đuôi sáng)
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.prevX = s.x;
        s.prevY = s.y;
        s.x += s.vx;
        s.y += s.vy;
        s.vy += s.gravity;
        s.vx *= 0.982;
        s.vy *= 0.982;
        s.alpha -= s.decay;

        if (s.alpha <= 0.02) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;

        if (s.shape === 'heart') {
          drawHeart(s.x, s.y, s.size * 2.2, s.color);
        } else if (s.shape === 'star') {
          drawFourPointStar(s.x, s.y, s.size * 1.6, s.color);
        } else if (s.shape === 'trail') {
          ctx.strokeStyle = s.color;
          ctx.lineWidth = s.size;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(s.prevX, s.prevY);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();
        } else {
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // D. Vẽ Biểu Tượng Tỏa Sáng Ở Tâm Pháo Hoa (♥ cho Fine Art, 囍 cho Đông Dương)
      for (let i = symbolFlashes.length - 1; i >= 0; i--) {
        const fl = symbolFlashes[i];
        fl.alpha -= 0.022;
        fl.scale += 0.025;
        if (fl.alpha <= 0.02) {
          symbolFlashes.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = fl.alpha;
        ctx.translate(fl.x, fl.y);
        ctx.scale(fl.scale, fl.scale);
        ctx.fillStyle = fl.color;
        ctx.shadowColor = fl.color;
        ctx.shadowBlur = 15;
        ctx.font = 'bold 28px "Cormorant Garamond", serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(fl.text, 0, 0);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(autoFireworkInterval);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [styleId]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      aria-hidden="true"
    />
  );
};
