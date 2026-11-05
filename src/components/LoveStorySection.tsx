import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation, Sparkles, Heart, MapPin } from 'lucide-react';
import { StyleId, WeddingData } from '../data/weddingData';

gsap.registerPlugin(ScrollTrigger);

interface LoveStorySectionProps {
  styleId: StyleId;
  data: WeddingData;
}

export const LoveStorySection: React.FC<LoveStorySectionProps> = ({ styleId, data }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLImageElement | null>(null);
  const redThreadRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bgRef.current && sectionRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.12, y: -30 },
          {
            scale: 1.0,
            y: 30,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // Hiệu ứng Sợi Dây Tơ Hồng Ánh Kim tự vẽ dọc theo nhịp vuốt
      if (redThreadRef.current && sectionRef.current) {
        gsap.fromTo(
          redThreadRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              end: 'bottom 70%',
              scrub: 0.7,
            },
          }
        );
      }

      const items = gsap.utils.toArray<HTMLElement>('.ceremony-3d-showcase');
      items.forEach((item, idx) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 80,
            rotateY: idx % 2 === 0 ? -15 : 15,
            scale: 0.92,
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 1.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 84%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [styleId, data.ceremonySection]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden text-white perspective-1500"
    >
      {/* Ảnh nền toàn phân cảnh: LVT07908.jpg */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-stone-950">
        <img
          ref={bgRef}
          src={data.sectionImages.loveStoryBg}
          alt={data.ceremonySection.title}
          className="w-full h-full object-cover object-[center_35%] opacity-80"
        />
        <div
          className={`absolute inset-0 ${
            styleId === 'indochine'
              ? 'bg-gradient-to-b from-[#3B070B]/85 via-black/65 to-[#3B070B]/90'
              : 'bg-gradient-to-b from-black/75 via-black/60 to-black/85'
          }`}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Tiêu đề lớn: Ngày nên duyên (Thứ 7, 28/11/2026) */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-amber-300/40 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-amber-200 font-semibold">
              THỨ BẢY • 28 . 11 . 2026 (20/10 BÍNH NGỌ)
            </span>
          </div>

          <h2 className="font-serif-luxury text-5xl sm:text-6xl md:text-7xl font-bold tracking-wide shimmer-gold-text mb-3">
            {data.ceremonySection.title}
          </h2>
          <p className="text-xs sm:text-sm text-white/85 font-light">
            Khoảnh khắc thiêng liêng khi hai gia đình chính thức đón dâu hiền, rể thảo về chung một nhà.
          </p>
        </div>

        {/* Trục Sợi Dây Tơ Hồng Ánh Kim nối 2 đại lễ: LỄ VU QUY & LỄ THÀNH HÔN */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-[2px] -translate-x-1/2 bg-white/15" />
          <div
            ref={redThreadRef}
            style={{ transformOrigin: 'top center' }}
            className="hidden md:block absolute left-1/2 top-8 bottom-8 w-[3px] -translate-x-1/2 bg-gradient-to-b from-amber-300 via-rose-400 to-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.9)] z-10"
          />

          <div className="space-y-20 md:space-y-28 relative z-20">
            {data.ceremonySection.items.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`ceremony-3d-showcase flex flex-col ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } items-center gap-8 md:gap-14`}
                >
                  {/* Nút Trái Tim Vàng ở giữa trục */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-amber-400 text-stone-950 items-center justify-center shadow-[0_0_25px_rgba(251,191,36,0.8)] z-30 border-2 border-white">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>

                  {/* Khung Ảnh Đôi 3D (Ảnh lớn + Ảnh vệ tinh xếp chồng) */}
                  <div className="w-full md:w-1/2 relative">
                    <div className="relative rounded-[32px] overflow-hidden border-4 border-amber-300/75 shadow-[0_30px_80px_rgba(0,0,0,0.75)] aspect-[4/3.7] bg-stone-900">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-[center_26%] transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-amber-200">
                        <span className="uppercase tracking-[0.22em] font-semibold bg-black/55 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-300/30">
                          {item.badge}
                        </span>
                      </div>
                    </div>

                    {/* Ảnh nhỏ xếp chồng tạo hiệu ứng 3D Layer */}
                    <div
                      className={`hidden sm:block absolute -bottom-6 ${
                        isEven ? '-right-5 rotate-6' : '-left-5 -rotate-6'
                      } w-32 sm:w-40 aspect-square rounded-2xl overflow-hidden border-4 border-white shadow-2xl z-20`}
                    >
                      <img
                        src={item.secondaryImage}
                        alt={item.title}
                        className="w-full h-full object-cover object-[center_22%]"
                      />
                    </div>
                  </div>

                  {/* Thẻ Thông Tin Lớn Rõ Ràng */}
                  <div className="w-full md:w-1/2">
                    <div className="rounded-[32px] bg-black/45 backdrop-blur-2xl border border-amber-300/40 p-7 sm:p-10 shadow-2xl space-y-4">
                      <span className="inline-block text-[11px] uppercase tracking-[0.28em] text-amber-300 font-semibold">
                        {item.badge}
                      </span>

                      <h3 className="font-serif-luxury text-4xl sm:text-5xl font-bold tracking-wider uppercase text-white">
                        {item.title}
                      </h3>

                      <div className="py-2 border-y border-white/15">
                        <p className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-amber-200">
                          {item.timeAndDateSolar}
                        </p>
                        <p className="font-serif-luxury italic text-base sm:text-lg text-white/80 mt-1">
                          {item.dateLunar}
                        </p>
                      </div>

                      <div className="flex items-start gap-2.5 text-sm sm:text-base text-white/95 leading-relaxed pt-1">
                        <MapPin className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                        <span>{item.location}</span>
                      </div>

                      <div className="pt-3">
                        <a
                          href={item.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 text-stone-950 font-bold text-xs uppercase tracking-[0.2em] shadow-lg hover:brightness-110 transition-all"
                        >
                          <Navigation className="w-4 h-4" />
                          <span>Chỉ Đường Tới Lễ Đường</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
