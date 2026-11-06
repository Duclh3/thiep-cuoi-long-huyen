import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, MapPin, Heart, Gift } from 'lucide-react';
import { StyleId, THEMES, WeddingData } from '../data/weddingData';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  styleId: StyleId;
  data: WeddingData;
  guestName: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ styleId, data }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroVisualRef = useRef<HTMLDivElement | null>(null);
  const theme = THEMES[styleId];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !heroVisualRef.current) return;
      gsap.fromTo(
        heroVisualRef.current,
        { y: 10 },
        {
          y: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [styleId]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="section-hero"
      ref={sectionRef}
      className={`relative pt-10 pb-14 overflow-hidden flex flex-col justify-between perspective-1500 ${theme.bgPrimary} ${
        styleId === 'cinematic' ? 'film-grain' : styleId === 'indochine' ? 'indochine-pattern' : ''
      }`}
    >
      {/* Hào quang ánh sáng 3D hậu cảnh */}
      <div
        style={{ background: `radial-gradient(circle, ${theme.accentHex}28 0%, transparent 70%)` }}
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[760px] h-[480px] sm:h-[760px] rounded-full blur-3xl z-0"
      />

      <div ref={heroVisualRef} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        {/* TIÊU ĐỀ ĐẦU TRANG TINH GỌN CHO TẤT CẢ CÁC STYLE (1–4):
            Chỉ ghi: Thiệp Mời + Tên Cô Dâu Chú Rể + Ngày Cưới */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-9">
          <p className={`font-script-luxury text-3xl sm:text-5xl mb-1 ${theme.textAccent}`}>
            Thiệp Mời
          </p>
          <h1
            className={`font-script-luxury text-[32px] sm:text-7xl md:text-8xl font-normal leading-[1.2] mb-1.5 whitespace-nowrap ${
              styleId === 'cinematic' || styleId === 'indochine'
                ? 'shimmer-gold-text'
                : theme.textPrimary
            }`}
          >
            <span>{data.groom.shortName}</span>
            <span className={`font-script-luxury text-2xl sm:text-6xl mx-1.5 sm:mx-3 inline-block ${theme.textAccent}`}>
              {styleId === 'indochine' ? '囍' : '&'}
            </span>
            <span>{data.bride.shortName}</span>
          </h1>
          <p className={`font-tall-editorial text-sm sm:text-lg tracking-[0.26em] uppercase ${theme.textSecondary}`}>
            28 . 11 . 2026
          </p>
        </div>

        {/* =========================================================================
            STYLE 01: THƠ MỘNG FINE ART
           ========================================================================= */}
        {styleId === 'fairytale' && (
          <div className="relative max-w-lg mx-auto my-2 flex flex-col sm:flex-row items-center justify-center">
            {/* Khung ảnh chính Fine Art */}
            <div className="relative z-10 w-full max-w-[340px] sm:max-w-none sm:w-[390px] rounded-[8px] p-3 sm:p-4 border border-[#B88B7D] bg-[#FFFDF9] text-stone-900 shadow-[0_25px_70px_rgba(0,0,0,0.22)]">
              <div className="pointer-events-none absolute inset-2 border border-[#D4AF37]/45 rounded-[4px] z-20" />
              <div className="relative overflow-hidden rounded-[4px] aspect-[3/4] bg-stone-900">
                <img
                  src={data.sectionImages.hero}
                  alt="Thành Long & Thanh Huyền"
                  className="w-full h-full object-cover object-[center_22%]"
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STYLE 02: TẠP CHÍ VOGUE
           ========================================================================= */}
        {styleId === 'editorial' && (
          <div className="max-w-3xl mx-auto grid grid-cols-12 gap-3 sm:gap-4 items-stretch">
            <div className="col-span-7 bg-white p-2 sm:p-2.5 border-2 border-stone-950 shadow-[10px_10px_0px_#C5A059]">
              <div className="relative aspect-[3/4.1] overflow-hidden bg-stone-900">
                <img
                  src={data.sectionImages.hero}
                  alt="Thành Long & Thanh Huyền"
                  className="w-full h-full object-cover object-[center_22%]"
                />
              </div>
            </div>

            <div className="col-span-5 flex flex-col justify-between gap-3 sm:gap-4">
              <div className="bg-stone-950 p-1.5 sm:p-2 border-2 border-[#C5A059] flex-1">
                <div className="relative h-full aspect-[4/4.2] overflow-hidden">
                  <img
                    src={data.sectionImages.heroLeftFloat}
                    alt="Thành Long"
                    className="w-full h-full object-cover object-[center_20%]"
                  />
                </div>
              </div>

              <div className="bg-white p-1.5 sm:p-2 border-2 border-stone-950 shadow-[6px_6px_0px_#C5A059] flex-1">
                <div className="relative h-full aspect-[4/4.2] overflow-hidden">
                  <img
                    src={data.sectionImages.heroRightFloat}
                    alt="Thanh Huyền"
                    className="w-full h-full object-cover object-[center_20%]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STYLE 03: ĐÊM PHÁO HOA 3D
           ========================================================================= */}
        {styleId === 'cinematic' && (
          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#F0AD64] bg-[#161210] p-2.5 sm:p-3.5 shadow-[0_0_60px_rgba(240,173,100,0.28)]">
              <div className="relative aspect-[4/4.2] sm:aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-stone-950">
                <img
                  src={data.sectionImages.hero}
                  alt="Thành Long & Thanh Huyền"
                  className="w-full h-full object-cover object-[center_24%]"
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STYLE 04: CUNG ĐÌNH ĐÔNG DƯƠNG
           ========================================================================= */}
        {styleId === 'indochine' && (
          <div className="max-w-md mx-auto relative bg-[#630E15] rounded-2xl p-3.5 sm:p-4 border-2 border-[#F7CE68] shadow-[0_25px_70px_rgba(0,0,0,0.7)]">
            <div className="relative aspect-[3/3.8] rounded-xl overflow-hidden border-2 border-[#F7CE68]">
              <img
                src={data.sectionImages.hero}
                alt="Thành Long & Thanh Huyền"
                className="w-full h-full object-cover object-[center_22%]"
              />
            </div>
          </div>
        )}

        {/* ============================================================
            KHỐI ĐIỀU HƯỚNG NHANH GỌN GÀNG
           ============================================================ */}
        <div
          id="hero-quick-nav"
          className={`mt-8 sm:mt-10 max-w-2xl mx-auto p-4 sm:p-5 shadow-xl text-center scroll-mt-24 ${
            styleId === 'editorial'
              ? 'bg-white border-2 border-stone-950 shadow-[10px_10px_0px_#C5A059] rounded-none'
              : styleId === 'indochine'
              ? 'bg-[#5E0E15] border-2 border-[#F7CE68] rounded-2xl'
              : `rounded-2xl border ${theme.borderAccent} ${theme.bgCard}`
          }`}
        >
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('section-events')}
              className={`cursor-pointer col-span-2 sm:col-span-1 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-2.5 rounded-full text-xs uppercase tracking-[0.12em] sm:tracking-[0.15em] font-semibold whitespace-nowrap ${theme.btnPrimary}`}
            >
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>Lịch Trình &amp; Bản Đồ</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('section-wishes')}
              className={`cursor-pointer col-span-2 sm:col-span-1 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-2.5 rounded-full text-xs uppercase tracking-[0.12em] sm:tracking-[0.15em] font-semibold whitespace-nowrap ${theme.btnSecondary}`}
            >
              <Heart className="w-3.5 h-3.5 shrink-0" />
              <span>Gửi Lời Chúc &amp; Mừng Cưới</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('section-qr-gift')}
              className={`cursor-pointer col-span-1 w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-4 py-2.5 rounded-full text-[10px] sm:text-xs uppercase tracking-[0.05em] sm:tracking-[0.14em] font-medium whitespace-nowrap ${theme.btnSecondary}`}
            >
              <Gift className="w-3.5 h-3.5 shrink-0" />
              <span>Mã QR Mừng Cưới</span>
            </button>

            <button
              type="button"
              onClick={() => window.triggerWeddingFireworks?.(6)}
              className={`cursor-pointer col-span-1 w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-4 py-2.5 rounded-full text-[10px] sm:text-xs uppercase tracking-[0.05em] sm:tracking-[0.14em] font-medium whitespace-nowrap ${theme.btnSecondary}`}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Bắn Pháo Hoa 🎆</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
