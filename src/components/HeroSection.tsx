import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Heart, ChevronDown, Film, Crown, BookOpen, Gift } from 'lucide-react';
import { StyleId, THEMES, WeddingData } from '../data/weddingData';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  styleId: StyleId;
  data: WeddingData;
  guestName: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ styleId, data, guestName }) => {
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
          y: -22,
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
      className={`relative min-h-screen pt-14 pb-20 overflow-hidden flex flex-col justify-between perspective-1500 ${theme.bgPrimary} ${
        styleId === 'cinematic' ? 'film-grain' : styleId === 'indochine' ? 'indochine-pattern' : ''
      }`}
    >
      {/* Hào quang ánh sáng 3D hậu cảnh */}
      <div
        style={{ background: `radial-gradient(circle, ${theme.accentHex}28 0%, transparent 70%)` }}
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[760px] h-[480px] sm:h-[760px] rounded-full blur-3xl z-0"
      />

      <div ref={heroVisualRef} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        {/* =========================================================================
            STYLE 01: THƠ MỘNG FINE ART (Collage Polaroid & Khung Passepartout)
           ========================================================================= */}
        {styleId === 'fairytale' && (
          <div>
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${theme.borderAccent} ${theme.bgCard} mb-3 shadow-sm`}
              >
                <Sparkles className="w-3.5 h-3.5" style={{ color: theme.accentHex }} />
                <span className={`text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold ${theme.textAccent}`}>
                  {theme.badgeText}
                </span>
              </motion.div>
              <p className={`font-script-luxury text-4xl sm:text-5xl mb-1 ${theme.textAccent}`}>
                Thiệp Mời Cưới • {data.weddingDate.heroHeadline}
              </p>
              <h1 className={`font-serif-luxury text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight leading-[1.08] mb-3 ${theme.textPrimary}`}>
                <span>{data.groom.shortName}</span>
                <span className={`font-script-luxury text-5xl sm:text-7xl mx-3 inline-block -translate-y-1 ${theme.textAccent}`}>
                  &amp;
                </span>
                <span>{data.bride.shortName}</span>
              </h1>
              <p className={`font-serif-italic text-base sm:text-xl max-w-lg mx-auto leading-relaxed ${theme.textSecondary}`}>
                “{data.weddingDate.heroSubHeadline}”
              </p>
            </div>

            <div className="relative max-w-lg mx-auto my-4 sm:my-6 flex items-center justify-center">
              <div className="pointer-events-none absolute -top-10 sm:-top-14 left-1/2 -translate-x-1/2 w-72 h-72 sm:w-96 sm:h-96 opacity-45 z-0">
                <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-halo">
                  <defs>
                    <path id="circlePathHero" d="M 100, 100 m -82, 0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0" />
                  </defs>
                  <text fill={theme.accentHex} fontSize="8.5" fontWeight="600" letterSpacing="3.2px">
                    <textPath href="#circlePathHero">
                      ✦ THÀNH LONG &amp; THANH HUYỀN ✦ 28.11.2026 ✦ FOREVER LOVE
                    </textPath>
                  </text>
                </svg>
              </div>

              <div className="fine-art-polaroid absolute -left-2 sm:-left-16 -bottom-6 z-20 w-32 sm:w-44 p-2 pb-6 sm:p-2.5 sm:pb-8 rounded-[4px] rotate-[-6deg]">
                <div className="washi-tape -top-2.5 left-1/2 -translate-x-1/2 rotate-[-4deg]" />
                <div className="aspect-[3/3.8] w-full overflow-hidden bg-stone-100">
                  <img src={data.sectionImages.heroLeftFloat} alt="Thành Long" className="w-full h-full object-cover object-[center_20%]" />
                </div>
                <p className="font-script-luxury text-lg sm:text-xl text-stone-700 text-center mt-1.5 leading-none">
                  Sweet Love
                </p>
              </div>

              <div className="fine-art-polaroid absolute -right-2 sm:-right-16 top-6 z-20 w-32 sm:w-44 p-2 pb-6 sm:p-2.5 sm:pb-8 rounded-[4px] rotate-[6deg]">
                <div className="washi-tape -top-2.5 left-1/2 -translate-x-1/2 rotate-[5deg]" />
                <div className="aspect-[3/3.8] w-full overflow-hidden bg-stone-100">
                  <img src={data.sectionImages.heroRightFloat} alt="Thanh Huyền" className="w-full h-full object-cover object-[center_20%]" />
                </div>
                <p className="font-tall-editorial text-[10px] tracking-[0.25em] text-stone-600 text-center mt-2 uppercase">
                  28 . 11 . 2026
                </p>
              </div>

              <div className="relative z-10 w-[84%] sm:w-[400px] rounded-[8px] p-3 sm:p-4 pb-6 sm:pb-7 border border-[#B88B7D] bg-[#FFFDF9] text-stone-900 shadow-[0_30px_90px_rgba(0,0,0,0.32)]">
                <div className="pointer-events-none absolute inset-2 border border-[#D4AF37]/45 rounded-[4px] z-20" />
                <div className="flex items-center justify-between px-1 mb-2.5 text-[10px] tracking-[0.24em] uppercase font-tall-editorial text-stone-600">
                  <span>FINE ART EDITION</span>
                  <span>HƯNG YÊN • 2026</span>
                </div>
                <div className="relative overflow-hidden rounded-[4px] aspect-[3/4] bg-stone-900">
                  <img src={data.sectionImages.hero} alt="Hero" className="w-full h-full object-cover object-[center_22%]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-center text-white z-20">
                    <p className="font-script-luxury text-3xl sm:text-4xl text-amber-200 leading-none mb-1">
                      Thành Long &amp; Thanh Huyền
                    </p>
                    <p className="font-tall-editorial text-xs tracking-[0.28em] uppercase text-white/95">
                      {data.weddingDate.dayOfWeek} • 28 . 11 . 2026
                    </p>
                  </div>
                </div>
                <div className="mt-3.5 flex items-center justify-between px-2">
                  <span className="font-script-luxury text-2xl text-[#6E5A48]">Forever &amp; Always</span>
                  <span className="font-tall-editorial text-xs tracking-[0.22em] uppercase text-stone-600">27 - 28.11.2026</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STYLE 02: TẠP CHÍ VOGUE (Bố Cục Trang Đôi Tạp Chí Bất Đối Xứng 2 Cột)
           ========================================================================= */}
        {styleId === 'editorial' && (
          <div className="mt-2">
            {/* Thanh Masthead Tạp Chí Vogue Toàn Chiều Ngang */}
            <div className="border-y-2 border-stone-950 py-3 mb-8 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-tall-editorial text-xs tracking-[0.3em] uppercase text-stone-700">
                <BookOpen className="w-4 h-4 text-[#9E7B3B]" />
                <span>VOGUE WEDDING • ISSUE NO. 28</span>
              </div>
              <span className="font-serif-luxury text-3xl sm:text-4xl font-bold tracking-tighter">
                VOGUE HAUTE COUTURE
              </span>
              <span className="font-tall-editorial text-xs tracking-[0.3em] uppercase text-[#9E7B3B] font-semibold">
                NOVEMBER 28, 2026 • HƯNG YÊN
              </span>
            </div>

            {/* Lưới Bất Đối Xứng 12 Cột Kiểu Tạp Chí Thời Trang */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Cột Trái (5/12): Typography Báo Chí Cỡ Lớn & Editorial Story */}
              <div className="lg:col-span-5 text-left space-y-5 border-l-4 border-stone-950 pl-5 sm:pl-7">
                <span className="inline-block px-3 py-1 bg-stone-950 text-[#F5E1A4] font-tall-editorial text-[11px] tracking-[0.3em] uppercase">
                  EXCLUSIVE COVER STORY
                </span>

                <h1 className="font-serif-luxury text-5xl sm:text-6xl font-bold uppercase tracking-tight leading-[0.98] text-stone-950">
                  {data.groom.shortName}
                  <span className="block font-script-luxury text-5xl text-[#9E7B3B] lowercase my-1">
                    and
                  </span>
                  {data.bride.shortName}
                </h1>

                <p className="font-serif-italic text-lg text-stone-700 leading-relaxed">
                  “Một bản giao hưởng thời trang và tình yêu vĩnh cửu. Sự hiện diện của bạn là mảnh ghép hoàn hảo nhất trong ngày chung đôi của chúng tôi.”
                </p>

                {/* Khối Ngày Cưới Kiểu Mã Vạch Tạp Chí */}
                <div className="p-4 bg-white border-2 border-stone-950 shadow-[8px_8px_0px_#C5A059] flex items-center justify-between">
                  <div>
                    <p className="font-tall-editorial text-[10px] tracking-[0.28em] text-stone-500 uppercase">
                      SAVE THE DATE • THỨ BẢY
                    </p>
                    <p className="font-serif-luxury text-3xl font-bold text-stone-950">
                      28 . 11 . 2026
                    </p>
                    <p className="text-xs text-stone-600">{data.weddingDate.lunarDate}</p>
                  </div>
                  {/* Mã vạch tạp chí trang trí */}
                  <div className="flex items-stretch gap-[2px] h-12 pl-3 border-l border-stone-300">
                    {[2, 4, 1, 3, 2, 1, 4, 2, 1, 3].map((w, i) => (
                      <span key={i} style={{ width: `${w}px` }} className="bg-stone-950 block" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Cột Phải (7/12): Bố Cục 3 Ảnh Ghép Lookbook (Bento Grid) */}
              <div className="lg:col-span-7 grid grid-cols-12 gap-4 items-stretch">
                {/* Ảnh chính lớn bên trái (7/12) */}
                <div className="col-span-7 bg-white p-2.5 border-2 border-stone-950 shadow-[12px_12px_0px_#181512] flex flex-col justify-between">
                  <div className="relative aspect-[3/4.2] overflow-hidden bg-stone-900">
                    <img
                      src={data.sectionImages.hero}
                      alt="Vogue Main"
                      className="w-full h-full object-cover object-[center_22%]"
                    />
                  </div>
                  <div className="pt-2 flex items-center justify-between text-[10px] font-tall-editorial tracking-[0.25em] uppercase">
                    <span>PLATE 01 // THE COUPLE</span>
                    <span className="text-[#9E7B3B] font-bold">2026</span>
                  </div>
                </div>

                {/* 2 Ảnh phụ xếp dọc bên phải (5/12) */}
                <div className="col-span-5 flex flex-col justify-between gap-4">
                  <div className="bg-stone-950 text-white p-2 border-2 border-[#C5A059] flex-1 flex flex-col justify-between">
                    <div className="relative aspect-[4/4.3] overflow-hidden">
                      <img
                        src={data.sectionImages.heroLeftFloat}
                        alt="Look 02"
                        className="w-full h-full object-cover object-[center_20%]"
                      />
                    </div>
                    <span className="font-tall-editorial text-[9px] tracking-[0.24em] text-[#F5E1A4] uppercase pt-1.5 block text-center">
                      LOOK 02 // GROOM &amp; BRIDE
                    </span>
                  </div>

                  <div className="bg-white text-stone-950 p-2 border-2 border-stone-950 shadow-[8px_8px_0px_#C5A059] flex-1 flex flex-col justify-between">
                    <div className="relative aspect-[4/4.3] overflow-hidden">
                      <img
                        src={data.sectionImages.heroRightFloat}
                        alt="Look 03"
                        className="w-full h-full object-cover object-[center_20%]"
                      />
                    </div>
                    <span className="font-tall-editorial text-[9px] tracking-[0.24em] text-stone-700 uppercase pt-1.5 block text-center">
                      LOOK 03 // HAUTE COUTURE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STYLE 03: ĐÊM PHÁO HOA 3D (Bố Cục Màn Chiếu Điện Ảnh & Dải Cuộn Phim 35mm Ngang)
           ========================================================================= */}
        {styleId === 'cinematic' && (
          <div>
            <div className="text-center max-w-3xl mx-auto mb-7">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#F0AD64]/60 mb-3 shadow-[0_0_25px_rgba(240,173,100,0.3)]">
                <Film className="w-3.5 h-3.5 text-[#F0AD64]" />
                <span className="font-tall-editorial text-xs tracking-[0.28em] uppercase text-[#F0AD64]">
                  ★ A STARLIGHT MOTION PICTURE PREMIERE ★
                </span>
              </div>
              <p className="font-script-luxury text-4xl sm:text-5xl text-[#F0AD64] mb-1">
                Đêm Hội Pháo Hoa &amp; Tình Yêu
              </p>
              <h1 className="font-serif-luxury text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight shimmer-gold-text leading-tight">
                {data.groom.shortName} <span className="font-script-luxury text-5xl sm:text-7xl mx-2 text-[#F0AD64]">&amp;</span> {data.bride.shortName}
              </h1>
            </div>

            {/* Màn Chiếu Điện Ảnh Chính + Dải Cuộn Phim 35mm 3 Cảnh Bên Dưới */}
            <div className="max-w-4xl mx-auto space-y-5">
              {/* Khung Chiếu Phim Lớn */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#F0AD64] bg-[#161210] p-3 sm:p-4 shadow-[0_0_70px_rgba(240,173,100,0.3)]">
                <div className="flex items-center justify-between px-2 pb-2 text-[10px] font-mono text-[#F0AD64]">
                  <span>REC ● [4K HDR CINEMA]</span>
                  <span>PREMIERE: 28.11.2026</span>
                  <span>TC 00:28:11:26</span>
                </div>

                <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-stone-950">
                  <img
                    src={data.sectionImages.hero}
                    alt="Cinema Main"
                    className="w-full h-full object-cover object-[center_24%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-white">
                    <div>
                      <span className="px-3 py-1 rounded-full bg-[#F0AD64] text-stone-950 font-tall-editorial text-[10px] font-bold tracking-[0.22em] uppercase">
                        STARRING THE COUPLE
                      </span>
                      <h2 className="font-script-luxury text-3xl sm:text-5xl text-amber-200 mt-1">
                        Thành Long &amp; Thanh Huyền
                      </h2>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-tall-editorial text-lg sm:text-2xl tracking-[0.22em] text-amber-300">
                        27 &amp; 28 . 11 . 2026
                      </p>
                      <p className="font-serif-italic text-xs text-white/80">
                        ({data.weddingDate.lunarDate})
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dải Cuộn Phim 35mm Chạy Ngang Gồm 3 Khung Cảnh (Film Strip) */}
              <div className="rounded-2xl bg-[#14100E] border border-[#F0AD64]/50 p-3 shadow-2xl">
                <div className="flex items-center justify-between px-1 pb-2">
                  {[...Array(16)].map((_, i) => (
                    <span key={i} className="w-3.5 h-2 rounded-[1px] bg-[#F0AD64]/45" />
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { img: data.sectionImages.heroLeftFloat, label: 'SCENE 01 // THE PROMISE' },
                    { img: data.sectionImages.kissPhoto, label: 'SCENE 02 // SWEET KISS' },
                    { img: data.sectionImages.heroRightFloat, label: 'SCENE 03 // FOREVER' },
                  ].map((sc, i) => (
                    <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#F0AD64]/40">
                      <img src={sc.img} alt={sc.label} className="w-full h-full object-cover object-[center_22%]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-2">
                        <span className="font-mono text-[9px] sm:text-[10px] text-amber-200 tracking-wider truncate">
                          {sc.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between px-1 pt-2">
                  {[...Array(16)].map((_, i) => (
                    <span key={i} className="w-3.5 h-2 rounded-[1px] bg-[#F0AD64]/45" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STYLE 04: CUNG ĐÌNH ĐÔNG DƯƠNG (Bức Trướng Hoàng Gia & Đôi Liễn Câu Đối Vàng)
           ========================================================================= */}
        {styleId === 'indochine' && (
          <div>
            <div className="text-center max-w-3xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#8C1D24] border-2 border-[#F7CE68] mb-3 shadow-lg">
                <Crown className="w-4 h-4 text-[#F7CE68]" />
                <span className="font-tall-editorial text-xs tracking-[0.28em] uppercase text-[#F7CE68]">
                  SONG HỶ LÂM MÔN • BÍNH NGỌ 2026
                </span>
              </div>
              <p className="font-script-luxury text-4xl sm:text-5xl text-[#F7CE68] mb-1">
                Lễ Thành Hôn &amp; Lễ Vu Quy
              </p>
              <h1 className="font-serif-luxury text-5xl sm:text-7xl md:text-8xl font-bold tracking-wide shimmer-gold-text leading-tight">
                {data.groom.shortName} <span className="inline-block mx-2 text-4xl sm:text-6xl align-middle">囍</span> {data.bride.shortName}
              </h1>
            </div>

            {/* Bố cục Cung Đình: Câu đối Trái + Bức Trướng Trung Tâm + Câu đối Phải */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Vế Câu Đối Trái + Ảnh Tròn Tân Lang */}
              <div className="lg:col-span-3 flex lg:flex-col items-center justify-center gap-4 bg-[#5E0E15]/90 border-2 border-[#F7CE68] rounded-2xl p-4 shadow-2xl">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#F7CE68] shadow-lg shrink-0">
                  <img src={data.sectionImages.heroLeftFloat} alt="Tân Lang" className="w-full h-full object-cover object-[center_20%]" />
                </div>
                <div className="text-center">
                  <span className="font-tall-editorial text-[10px] tracking-[0.25em] text-[#F7CE68] uppercase block">
                    TÂN LANG • 2000
                  </span>
                  <p className="font-serif-luxury text-lg font-bold text-white mt-0.5">
                    {data.groom.fullName}
                  </p>
                  <div className="mt-2 px-3 py-1.5 rounded-lg bg-[#3B070B] border border-[#F7CE68]/50 font-serif-luxury text-xs sm:text-sm text-[#F7CE68] tracking-widest">
                    “TRĂM NĂM TÌNH VIÊN MÃN”
                  </div>
                </div>
              </div>

              {/* Bức Trướng Hoàng Gia Trung Tâm (6/12) */}
              <div className="lg:col-span-6 relative bg-[#630E15] rounded-2xl p-4 sm:p-5 border-2 border-[#F7CE68] shadow-[0_25px_80px_rgba(0,0,0,0.75)]">
                {/* Huy hiệu Song Hỷ Vàng Ròng trên đỉnh */}
                <div className="mx-auto -mt-9 mb-3 w-14 h-14 rotate-45 rounded-xl bg-gradient-to-br from-[#FFF2B2] via-[#D4AF37] to-[#9A7418] border-2 border-white flex items-center justify-center shadow-xl">
                  <span className="-rotate-45 font-serif-luxury text-2xl font-bold text-[#4E0B10]">囍</span>
                </div>

                <div className="relative aspect-[3/3.7] rounded-xl overflow-hidden border-2 border-[#F7CE68]">
                  <img src={data.sectionImages.hero} alt="Song Hỷ" className="w-full h-full object-cover object-[center_22%]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3B070B]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-center text-[#FFF8EC]">
                    <p className="font-tall-editorial text-xs tracking-[0.3em] text-[#F7CE68] uppercase">
                      LỄ THÀNH HÔN &amp; VU QUY • 28.11.2026
                    </p>
                    <p className="font-serif-italic text-sm text-[#F7CE68]/90 mt-0.5">
                      ({data.weddingDate.lunarDate})
                    </p>
                  </div>
                </div>
              </div>

              {/* Vế Câu Đối Phải + Ảnh Tròn Tân Nương */}
              <div className="lg:col-span-3 flex lg:flex-col items-center justify-center gap-4 bg-[#5E0E15]/90 border-2 border-[#F7CE68] rounded-2xl p-4 shadow-2xl">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#F7CE68] shadow-lg shrink-0">
                  <img src={data.sectionImages.heroRightFloat} alt="Tân Nương" className="w-full h-full object-cover object-[center_20%]" />
                </div>
                <div className="text-center">
                  <span className="font-tall-editorial text-[10px] tracking-[0.25em] text-[#F7CE68] uppercase block">
                    TÂN NƯƠNG • 2000
                  </span>
                  <p className="font-serif-luxury text-lg font-bold text-white mt-0.5">
                    {data.bride.fullName}
                  </p>
                  <div className="mt-2 px-3 py-1.5 rounded-lg bg-[#3B070B] border border-[#F7CE68]/50 font-serif-luxury text-xs sm:text-sm text-[#F7CE68] tracking-widest">
                    “BẠC ĐẦU NGHĨA PHU THÊ”
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            KHỐI ĐIỀU HƯỚNG NHANH (Đích đến của nút Scroll To Top)
           ============================================================ */}
        <div
          id="hero-quick-nav"
          className={`mt-12 max-w-2xl mx-auto p-5 sm:p-6 shadow-xl text-center scroll-mt-24 ${
            styleId === 'editorial'
              ? 'bg-white border-2 border-stone-950 shadow-[10px_10px_0px_#C5A059] rounded-none'
              : styleId === 'indochine'
              ? 'bg-[#5E0E15] border-2 border-[#F7CE68] rounded-2xl'
              : `rounded-2xl border ${theme.borderAccent} ${theme.bgCard}`
          }`}
        >
          <p className={`text-[11px] uppercase tracking-[0.28em] opacity-75 mb-1 ${theme.textSecondary}`}>
            TRÂN TRỌNG KÍNH MỜI
          </p>
          <p className={`font-script-luxury text-3xl sm:text-4xl mb-4 ${theme.textPrimary}`}>
            {guestName}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('section-events')}
              className={`cursor-pointer inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.16em] font-semibold ${theme.btnPrimary}`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Lịch Trình &amp; Bản Đồ</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('section-wishes')}
              className={`cursor-pointer inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.16em] font-semibold ${theme.btnSecondary}`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Gửi Lời Chúc &amp; Mừng Cưới</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('section-qr-gift')}
              className={`cursor-pointer inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] ${theme.btnSecondary}`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Mã QR Mừng Cưới</span>
            </button>

            <button
              type="button"
              onClick={() => window.triggerWeddingFireworks?.(6)}
              className={`cursor-pointer inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] ${theme.btnSecondary}`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>🎆 Bắn Pháo Hoa</span>
            </button>
          </div>
        </div>

        {/* Chỉ dẫn vuốt xuống trên điện thoại */}
        <div className="mt-8 flex flex-col items-center justify-center opacity-75">
          <span className={`text-[10px] uppercase tracking-[0.28em] mb-1.5 ${theme.textSecondary}`}>
            Vuốt nhẹ xuống để khám phá không gian 3D
          </span>
          <ChevronDown className={`w-5 h-5 animate-bounce ${theme.textAccent}`} />
        </div>
      </div>

      {/* Dải Ruy Băng Chữ Chạy Vô Tận */}
      <div className={`mt-10 border-y ${theme.borderSubtle} py-3 overflow-hidden select-none opacity-85`}>
        <div className="animate-marquee flex items-center space-x-8 text-xs tracking-[0.28em] uppercase">
          {Array.from({ length: 6 }).map((_, idx) => (
            <React.Fragment key={idx}>
              <span className={`font-tall-editorial font-normal ${theme.textPrimary}`}>
                CAO THÀNH LONG (2000) &amp; MAI THANH HUYỀN (2000)
              </span>
              <span style={{ color: theme.accentHex }}>✦</span>
              <span className={theme.textSecondary}>27 &amp; 28 . 11 . 2026</span>
              <span style={{ color: theme.accentHex }}>✦</span>
              <span className={theme.textAccent}>HƯNG YÊN</span>
              <span style={{ color: theme.accentHex }}>✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
