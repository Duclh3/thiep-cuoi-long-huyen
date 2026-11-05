import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Crown, Film, BookOpen } from 'lucide-react';
import { StyleId, THEMES, WeddingData } from '../data/weddingData';

interface CoupleSectionProps {
  styleId: StyleId;
  data: WeddingData;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ styleId, data }) => {
  const theme = THEMES[styleId];

  return (
    <section
      className={`relative py-20 md:py-32 overflow-hidden perspective-1500 ${theme.bgSecondary} ${
        styleId === 'cinematic' ? 'film-grain' : styleId === 'indochine' ? 'indochine-pattern' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Nghệ Thuật */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-1 max-w-full">
            {styleId === 'indochine' ? (
              <Crown className="w-4 h-4 text-[#F7CE68] shrink-0" />
            ) : styleId === 'cinematic' ? (
              <Film className="w-4 h-4 text-[#F0AD64] shrink-0" />
            ) : styleId === 'editorial' ? (
              <BookOpen className="w-4 h-4 text-[#9E7B3B] shrink-0" />
            ) : (
              <Sparkles className="w-4 h-4 shrink-0" style={{ color: theme.accentHex }} />
            )}
            <span className={`font-tall-editorial text-[10px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.28em] whitespace-nowrap ${theme.textAccent}`}>
              {styleId === 'editorial'
                ? 'VOGUE PROFILES // GROOM & BRIDE'
                : styleId === 'cinematic'
                ? 'STARRING CAST // THE LEADING COUPLE'
                : styleId === 'indochine'
                ? 'TÂN LANG & TÂN NƯƠNG • BÍNH NGỌ 2026'
                : 'THE GROOM & THE BRIDE'}
            </span>
          </div>
          <p className={`font-script-luxury text-4xl sm:text-5xl ${theme.textAccent} -mb-2`}>
            Hạnh Phúc Trăm Năm
          </p>
          <h2 className={`font-serif-luxury text-4xl sm:text-6xl font-normal ${theme.textPrimary}`}>
            Đôi Uyên Ương
          </h2>
        </div>

        {/* =========================================================================
            STYLE 02: TẠP CHÍ VOGUE (Bố Cục Bài Phỏng Vấn Tạp Chí Xen Kẽ Z-Pattern)
           ========================================================================= */}
        {styleId === 'editorial' && (
          <div className="space-y-12">
            {/* Hàng 1: Chú Rể (Ảnh Trái - Hồ Sơ Báo Chí Phải) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-12 bg-white text-stone-950 border-2 border-stone-950 shadow-[14px_14px_0px_#C5A059]"
            >
              <div className="md:col-span-5 p-4 border-b-2 md:border-b-0 md:border-r-2 border-stone-950">
                <div className="relative aspect-[3/3.8] overflow-hidden bg-stone-900">
                  <img src={data.groom.avatar} alt={data.groom.fullName} className="w-full h-full object-cover object-[center_18%]" />
                </div>
              </div>
              <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between text-left">
                <div>
                  <div className="flex items-center justify-between border-b border-stone-300 pb-3 mb-5">
                    <span className="font-tall-editorial text-xs tracking-[0.3em] uppercase text-[#9E7B3B] font-bold">
                      PROFILE NO. 01 // THE GROOM
                    </span>
                    <span className="font-serif-luxury text-5xl font-bold text-stone-200 leading-none">01</span>
                  </div>
                  <p className="font-script-luxury text-4xl text-[#9E7B3B] -mb-1">The Groom</p>
                  <h3 className="font-serif-luxury text-4xl sm:text-5xl font-bold uppercase tracking-tight text-stone-950 mb-3">
                    {data.groom.fullName}
                  </h3>
                  <p className="font-serif-italic text-lg text-stone-600 leading-relaxed mb-6">
                    “Chàng trai sinh năm {data.groom.birthYear} ấm áp, chân thành — người luôn dành trọn ánh nhìn dịu dàng nhất cho người thương của mình trên hành trình trăm năm.”
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                  <div>
                    <span className="font-tall-editorial text-[10px] tracking-[0.25em] text-stone-500 block">YEAR OF BIRTH</span>
                    <span className="font-serif-luxury text-2xl font-bold">{data.groom.birthYear}</span>
                  </div>
                  <div className="w-20 h-24 border border-stone-900 p-1 bg-stone-50">
                    <img src={data.groom.secondaryPhoto} alt="Groom 2" className="w-full h-full object-cover object-[center_20%]" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hàng 2: Cô Dâu (Hồ Sơ Báo Chí Trái - Ảnh Phải) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-12 bg-white text-stone-950 border-2 border-stone-950 shadow-[14px_14px_0px_#181512]"
            >
              <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between text-left order-2 md:order-1">
                <div>
                  <div className="flex items-center justify-between border-b border-stone-300 pb-3 mb-5">
                    <span className="font-tall-editorial text-xs tracking-[0.3em] uppercase text-[#9E7B3B] font-bold">
                      PROFILE NO. 02 // THE BRIDE
                    </span>
                    <span className="font-serif-luxury text-5xl font-bold text-stone-200 leading-none">02</span>
                  </div>
                  <p className="font-script-luxury text-4xl text-[#9E7B3B] -mb-1">The Bride</p>
                  <h3 className="font-serif-luxury text-4xl sm:text-5xl font-bold uppercase tracking-tight text-stone-950 mb-3">
                    {data.bride.fullName}
                  </h3>
                  <p className="font-serif-italic text-lg text-stone-600 leading-relaxed mb-6">
                    “Cô gái sinh năm {data.bride.birthYear} dịu dàng, rạng rỡ — nàng thơ mang đến nụ cười tỏa nắng và nguồn cảm hứng bất tận cho tổ ấm nhỏ.”
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                  <div className="w-20 h-24 border border-stone-900 p-1 bg-stone-50">
                    <img src={data.bride.secondaryPhoto} alt="Bride 2" className="w-full h-full object-cover object-[center_20%]" />
                  </div>
                  <div className="text-right">
                    <span className="font-tall-editorial text-[10px] tracking-[0.25em] text-stone-500 block">YEAR OF BIRTH</span>
                    <span className="font-serif-luxury text-2xl font-bold">{data.bride.birthYear}</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-5 p-4 border-b-2 md:border-b-0 md:border-l-2 border-stone-950 order-1 md:order-2">
                <div className="relative aspect-[3/3.8] overflow-hidden bg-stone-900">
                  <img src={data.bride.avatar} alt={data.bride.fullName} className="w-full h-full object-cover object-[center_18%]" />
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* =========================================================================
            STYLE 03: ĐÊM PHÁO HOA 3D (Bố Cục Thẻ Phân Vai Điện Ảnh 2 Ảnh Song Song)
           ========================================================================= */}
        {styleId === 'cinematic' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {[
              {
                role: 'STARRING // LEADING GROOM',
                scriptTitle: 'The Groom',
                person: data.groom,
              },
              {
                role: 'STARRING // LEADING BRIDE',
                scriptTitle: 'The Bride',
                person: data.bride,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-3xl bg-[#181311] border-2 border-[#F0AD64]/80 p-5 sm:p-7 shadow-[0_0_50px_rgba(240,173,100,0.2)] text-white flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#F0AD64]/25 font-mono text-xs text-[#F0AD64]">
                    <span>★ {item.role}</span>
                    <span>CAST #{idx + 1}</span>
                  </div>

                  {/* 2 Khung hình điện ảnh đặt cạnh nhau */}
                  <div className="grid grid-cols-12 gap-3 mb-5">
                    <div className="col-span-7 relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#F0AD64]/50">
                      <img src={item.person.avatar} alt={item.person.fullName} className="w-full h-full object-cover object-[center_18%]" />
                    </div>
                    <div className="col-span-5 flex flex-col justify-between gap-3">
                      <div className="relative flex-1 rounded-2xl overflow-hidden border border-[#F0AD64]/40">
                        <img src={item.person.secondaryPhoto} alt={item.person.shortName} className="w-full h-full object-cover object-[center_20%]" />
                      </div>
                      <div className="p-3 rounded-2xl bg-black/50 border border-[#F0AD64]/30 text-center">
                        <span className="font-mono text-[10px] text-amber-200/80 block">BORN IN</span>
                        <span className="font-tall-editorial text-2xl font-bold text-[#F0AD64]">{item.person.birthYear}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-end justify-between">
                  <div>
                    <p className="font-script-luxury text-3xl text-amber-200 leading-none">{item.scriptTitle}</p>
                    <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white mt-1">{item.person.fullName}</h3>
                  </div>
                  <Film className="w-6 h-6 text-[#F0AD64]/70" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* =========================================================================
            STYLE 01 (FINE ART) & STYLE 04 (ĐÔNG DƯƠNG): Khung Chân Dung Đôi Sang Trọng
           ========================================================================= */}
        {(styleId === 'fairytale' || styleId === 'indochine') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-stretch">
            {[
              {
                no: styleId === 'indochine' ? '囍 TÂN LANG • CHÚ RỂ' : 'NO. 01 // THE GROOM',
                role: 'CHÚ RỂ',
                script: 'The Groom',
                person: data.groom,
                tilt: '-rotate-1',
              },
              {
                no: styleId === 'indochine' ? '囍 TÂN NƯƠNG • CÔ DÂU' : 'NO. 02 // THE BRIDE',
                role: 'CÔ DÂU',
                script: 'The Bride',
                person: data.bride,
                tilt: 'rotate-1',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className="relative group h-full"
              >
                <div
                  className={`relative h-full flex flex-col justify-between p-4 sm:p-6 ${
                    styleId === 'indochine'
                      ? 'bg-[#5E0E15] text-[#FFF8EC] rounded-2xl border-2 border-[#F7CE68] shadow-[0_20px_50px_rgba(0,0,0,0.55)]'
                      : 'bg-[#FFFDF9] text-stone-900 rounded-[10px] border border-[#B88B7D] shadow-[0_25px_60px_rgba(0,0,0,0.18)]'
                  }`}
                >
                  {styleId === 'fairytale' && (
                    <div className={`washi-tape -top-3 left-1/2 -translate-x-1/2 ${item.tilt}`} />
                  )}

                  <div>
                    <div
                      className={`flex items-center justify-between gap-2 mb-3 pb-2 border-b whitespace-nowrap ${
                        styleId === 'indochine' ? 'border-[#F7CE68]/30' : 'border-stone-200'
                      }`}
                    >
                      <span
                        className={`font-tall-editorial text-[11px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.22em] font-medium whitespace-nowrap ${
                          styleId === 'indochine' ? 'text-[#F7CE68]' : 'text-[#7C2334]'
                        }`}
                      >
                        {item.no}
                      </span>
                      <span className="font-tall-editorial text-[11px] sm:text-xs tracking-[0.16em] opacity-75 whitespace-nowrap">
                        BORN • {item.person.birthYear}
                      </span>
                    </div>

                    <div
                      className={`relative overflow-hidden aspect-[3/3.8] bg-stone-900 p-1.5 ${
                        styleId === 'indochine'
                          ? 'border-2 border-[#F7CE68] rounded-xl'
                          : 'border border-[#D4AF37]/45 rounded-[4px]'
                      }`}
                    >
                      <img
                        src={item.person.avatar}
                        alt={item.person.fullName}
                        className="w-full h-full object-cover object-[center_18%] transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                      <div
                        className={`fine-art-polaroid absolute top-3 ${
                          idx === 0 ? 'right-3 rotate-6' : 'left-3 -rotate-6'
                        } w-20 sm:w-24 p-1 pb-3 rounded-[2px] group-hover:rotate-0 transition-transform duration-500`}
                      >
                        <div className="aspect-[3/3.6] overflow-hidden">
                          <img
                            src={item.person.secondaryPhoto}
                            alt={item.person.shortName}
                            className="w-full h-full object-cover object-[center_20%]"
                          />
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <p className="font-script-luxury text-3xl sm:text-4xl text-amber-200 leading-none">
                          {item.script}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`pt-4 mt-2 flex items-end justify-between border-t ${
                      styleId === 'indochine' ? 'border-[#F7CE68]/30' : 'border-stone-200/80'
                    }`}
                  >
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] opacity-65 mb-0.5">
                        {item.role}
                      </p>
                      <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-wide">
                        {item.person.fullName}
                      </h3>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-[4px] font-tall-editorial text-xs tracking-[0.2em] border ${
                        styleId === 'indochine'
                          ? 'bg-[#3B070B] border-[#F7CE68] text-[#F7CE68]'
                          : 'bg-[#7C2334]/10 border-[#7C2334]/25 text-[#7C2334]'
                      }`}
                    >
                      {item.person.birthYear}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Biểu tượng Kết Đôi Đồng Tuổi 2000 */}
        <div className="mt-14 text-center">
          <div
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border ${theme.borderAccent} ${theme.bgCard} shadow-lg`}
          >
            <span className={`font-script-luxury text-2xl sm:text-3xl ${theme.textPrimary}`}>
              {data.groom.shortName}
            </span>
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
            <span className={`font-script-luxury text-2xl sm:text-3xl ${theme.textPrimary}`}>
              {data.bride.shortName}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
