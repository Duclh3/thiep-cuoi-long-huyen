import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Sparkles, Crown, Film, BookOpen } from 'lucide-react';
import { StyleId, THEMES, WeddingData } from '../data/weddingData';

interface EventsSectionProps {
  styleId: StyleId;
  data: WeddingData;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ styleId, data }) => {
  const theme = THEMES[styleId];

  return (
    <section
      id="section-events"
      className={`relative py-20 md:py-32 overflow-hidden perspective-1500 scroll-mt-16 ${theme.bgSecondary} ${
        styleId === 'cinematic' ? 'film-grain' : styleId === 'indochine' ? 'indochine-pattern' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-1">
            {styleId === 'indochine' ? (
              <Crown className="w-4 h-4 text-[#F7CE68]" />
            ) : styleId === 'cinematic' ? (
              <Film className="w-4 h-4 text-[#F0AD64]" />
            ) : styleId === 'editorial' ? (
              <BookOpen className="w-4 h-4 text-[#9E7B3B]" />
            ) : (
              <Sparkles className="w-4 h-4" style={{ color: theme.accentHex }} />
            )}
            <span className={`font-tall-editorial text-[10px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.3em] whitespace-nowrap ${theme.textAccent}`}>
              THỨ SÁU • 27 . 11 . 2026 (19/10 BÍNH NGỌ)
            </span>
          </div>
          <p className={`font-script-luxury text-4xl sm:text-5xl ${theme.textAccent} -mb-2`}>
            Trân Trọng Kính Mời
          </p>
          <h2 className={`font-serif-luxury italic text-4xl sm:text-6xl font-normal mb-3 ${theme.textPrimary}`}>
            Đêm Tiệc Thân Mật
          </h2>
          <p className={`font-serif-italic text-base sm:text-lg leading-relaxed ${theme.textSecondary}`}>
            Hai bên gia đình trân trọng kính mời Quý khách tới dự bữa cơm thân mật chung vui cùng gia đình chúng tôi.
          </p>
        </div>

        {/* =========================================================================
            STYLE 02: TẠP CHÍ VOGUE (Bố Cục Vé Mời Sàn Diễn Thời Trang Ngang VIP)
           ========================================================================= */}
        {styleId === 'editorial' ? (
          <div className="space-y-8">
            {data.partyEvents.map((ev, index) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-12 bg-white text-stone-950 border-2 border-stone-950 shadow-[14px_14px_0px_#C5A059]"
              >
                {/* Cột Ảnh (4/12) */}
                <div className="lg:col-span-4 p-4 border-b-2 lg:border-b-0 lg:border-r-2 border-stone-950">
                  <div className="relative aspect-[4/4.2] overflow-hidden bg-stone-900">
                    <img src={ev.image} alt={ev.title} className="w-full h-full object-cover object-[center_22%]" />
                  </div>
                </div>

                {/* Cột Thông Tin Chính (5/12) */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between text-left border-b-2 lg:border-b-0 lg:border-r-2 border-dashed border-stone-400">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 bg-stone-950 text-[#F5E1A4] font-tall-editorial text-[10px] tracking-[0.08em] sm:tracking-[0.2em] uppercase whitespace-nowrap shrink-0">
                        {ev.badge}
                      </span>
                      <span className="font-tall-editorial text-[11px] sm:text-xs tracking-[0.14em] sm:tracking-[0.22em] text-stone-500 whitespace-nowrap shrink-0">
                        VIP // 0{index + 1}
                      </span>
                    </div>
                    <h3 className="font-serif-luxury italic text-3xl sm:text-4xl font-medium tracking-wide text-stone-950 mb-2">
                      {ev.title}
                    </h3>
                    <p className="font-tall-editorial text-sm tracking-[0.2em] text-[#9E7B3B] uppercase mb-4">
                      {ev.timeText} • {ev.dayOfWeek}, {ev.dayMonth}.{ev.year}
                    </p>
                    <p className="font-serif-italic text-base text-stone-600 mb-4">
                      ({ev.lunarText})
                    </p>
                  </div>

                  <div className="p-3.5 bg-stone-100 border border-stone-300 flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#9E7B3B] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-stone-900">{ev.address}</span>
                  </div>
                </div>

                {/* Cuống Vé VIP & Nút Bản Đồ (3/12) */}
                <div className="lg:col-span-3 p-6 bg-stone-50 flex flex-col items-center justify-between text-center">
                  <div>
                    <span className="font-tall-editorial text-[10px] tracking-[0.28em] text-stone-500 block">
                      ADMIT ONE
                    </span>
                    <span className="font-serif-luxury text-5xl font-bold text-stone-950 block my-1">
                      {ev.dayMonth}
                    </span>
                    <span className="font-tall-editorial text-xs tracking-[0.3em] text-[#9E7B3B]">
                      {ev.year}
                    </span>
                  </div>

                  <a
                    href={ev.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer mt-4 w-full py-3.5 px-4 bg-stone-950 hover:bg-[#9E7B3B] text-white font-tall-editorial text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Chỉ Đường</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* =========================================================================
              STYLE 01, 03, 04: 2 Thẻ Tiệc Cưới Cân Đối 100% Chiều Cao Theo Từng Chủ Đề
             ========================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-stretch">
            {data.partyEvents.map((ev, index) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className={`group relative h-full p-5 sm:p-8 shadow-2xl flex flex-col justify-between overflow-hidden ${
                  styleId === 'indochine'
                    ? 'rounded-2xl border-2 border-[#F7CE68] bg-[#5E0E15] text-[#FFF8EC]'
                    : styleId === 'cinematic'
                    ? 'rounded-3xl border-2 border-[#F0AD64]/80 bg-[#181311] text-white shadow-[0_0_50px_rgba(240,173,100,0.2)]'
                    : `rounded-[16px] border ${theme.borderAccent} ${theme.bgCard}`
                }`}
              >
                <div>
                  {/* Nhãn trên cùng — Luôn nằm gọn trên 1 hàng ngang, không bao giờ rớt dòng trên Mobile */}
                  <div className="flex items-center justify-between gap-2 mb-5 pb-3 border-b border-current/10">
                    <span
                      className={`px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.08em] sm:tracking-[0.16em] whitespace-nowrap shrink-0 ${theme.btnPrimary}`}
                    >
                      {ev.badge}
                    </span>
                    <span className={`font-tall-editorial text-xs sm:text-sm tracking-[0.18em] whitespace-nowrap shrink-0 ${theme.textAccent}`}>
                      {styleId === 'indochine' ? `囍 0${index + 1}` : `NO. 0${index + 1}`}
                    </span>
                  </div>

                  {/* Khung Ảnh Đặc Trưng Theo Phong Cách */}
                  <div
                    className={`relative mx-auto w-full max-w-sm mb-7 p-2.5 pb-6 shadow-[0_18px_40px_rgba(0,0,0,0.25)] ${
                      styleId === 'indochine'
                        ? 'bg-[#3B070B] border-2 border-[#F7CE68] rounded-xl'
                        : styleId === 'cinematic'
                        ? 'bg-black border border-[#F0AD64]/60 rounded-2xl'
                        : 'bg-[#FFFDF9] rounded-[6px] border border-[#E2D6C3]'
                    }`}
                  >
                    {styleId === 'fairytale' && (
                      <div className="washi-tape -top-2.5 left-1/2 -translate-x-1/2 rotate-[-2deg]" />
                    )}
                    <div className="relative aspect-[4/4.2] rounded-[3px] overflow-hidden bg-stone-900">
                      <img
                        src={ev.image}
                        alt={ev.title}
                        className="w-full h-full object-cover object-[center_22%] transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                      <div className="absolute bottom-3 left-3 right-3 text-center text-white">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/30 text-xs font-medium">
                          <Clock className="w-3.5 h-3.5 text-amber-300" />
                          {ev.timeText}
                        </span>
                      </div>
                    </div>
                    <p
                      className={`font-script-luxury text-2xl text-center mt-2 leading-none ${
                        styleId === 'indochine' || styleId === 'cinematic'
                          ? 'text-amber-200'
                          : 'text-stone-700'
                      }`}
                    >
                      {ev.type === 'groom' ? 'Gia Đình Nhà Trai' : 'Gia Đình Nhà Gái'}
                    </p>
                  </div>

                  {/* Nội dung chi tiết */}
                  <div className="text-center space-y-4">
                    <h3 className={`font-script-luxury text-4xl sm:text-5xl font-normal ${theme.textPrimary}`}>
                      {ev.title}
                    </h3>

                    <div className="max-w-xs mx-auto grid grid-cols-11 items-center gap-2 py-2">
                      <div className={`col-span-4 border-y ${theme.borderAccent} py-2 font-tall-editorial text-xs sm:text-sm tracking-[0.2em] uppercase`}>
                        {ev.dayOfWeek}
                      </div>
                      <div className={`col-span-3 font-tall-editorial text-3xl sm:text-4xl font-medium ${theme.textAccent}`}>
                        {ev.dayMonth}
                      </div>
                      <div className={`col-span-4 border-y ${theme.borderAccent} py-2 font-tall-editorial text-xs sm:text-sm tracking-[0.2em] uppercase`}>
                        {ev.year}
                      </div>
                    </div>

                    <p className={`font-serif-italic text-base sm:text-lg ${theme.textSecondary}`}>
                      ({ev.lunarText})
                    </p>

                    <div className={`p-4 rounded-xl border ${theme.borderSubtle} flex items-start justify-center gap-2.5 text-left min-h-[76px]`}>
                      <MapPin className="w-5 h-5 shrink-0 mt-0.5" style={{ color: theme.accentHex }} />
                      <p className={`text-xs sm:text-sm leading-relaxed font-medium ${theme.textPrimary}`}>
                        {ev.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <a
                    href={ev.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`cursor-pointer w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-full text-[11px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.18em] font-semibold flex items-center justify-center gap-2 whitespace-nowrap text-center shadow-xl ${theme.btnPrimary}`}
                  >
                    <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span className="whitespace-nowrap">
                      Mở Bản Đồ Chỉ Đường ({ev.type === 'groom' ? 'Nhà Trai' : 'Nhà Gái'})
                    </span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
