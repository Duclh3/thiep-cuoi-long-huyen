import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarPlus, Heart, Sparkles, Clock } from 'lucide-react';
import { StyleId, THEMES, WeddingData } from '../data/weddingData';

gsap.registerPlugin(ScrollTrigger);

interface CountdownSectionProps {
  styleId: StyleId;
  data: WeddingData;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ styleId, data }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftBlockRef = useRef<HTMLDivElement | null>(null);
  const rightCalendarRef = useRef<HTMLDivElement | null>(null);
  const theme = THEMES[styleId];

  const calculateTimeLeft = () => {
    const target = new Date(data.weddingDate.isoDate).getTime();
    const now = new Date().getTime();
    const diff = Math.max(0, target - now);

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [data.weddingDate.isoDate]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftBlockRef.current) {
        gsap.fromTo(
          leftBlockRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftBlockRef.current,
              start: 'top 84%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (rightCalendarRef.current) {
        gsap.fromTo(
          rightCalendarRef.current,
          { opacity: 0, y: 60, rotateY: 15 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rightCalendarRef.current,
              start: 'top 84%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [styleId]);

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Đám Cưới ${data.groom.shortName} & ${data.bride.shortName}`);
    const details = encodeURIComponent(
      `Trân trọng kính mời bạn tới dự Lễ Cưới của ${data.groom.fullName} & ${data.bride.fullName} tại Hưng Yên.`
    );
    const location = encodeURIComponent('Hưng Yên, Việt Nam');
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20261128T041500Z/20261128T080000Z`;
    window.open(googleCalUrl, '_blank', 'noopener,noreferrer');
  };

  // Tháng 11 năm 2026: Ngày 1/11/2026 là Chủ Nhật (6 ô trống đầu nếu tuần bắt đầu từ Thứ 2)
  const daysOfWeek = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const emptyLeadingDays = 6;
  const daysInMonth = 30;

  return (
    <section
      id="section-countdown"
      ref={sectionRef}
      className={`relative py-20 md:py-32 overflow-hidden perspective-1500 ${theme.bgPrimary} ${
        styleId === 'cinematic' ? 'film-grain' : styleId === 'indochine' ? 'indochine-pattern' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Cột Trái: Khung Ảnh Lễ Đường 3D (LVT08589.jpg) + Đồng Hồ Lật Số */}
          <div ref={leftBlockRef} className="lg:col-span-7 space-y-6">
            <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden border-2 border-amber-300/50 shadow-2xl min-h-[340px] sm:min-h-0 sm:aspect-[16/10]">
              <img
                src={data.sectionImages.countdown}
                alt="Save the Date"
                className="w-full h-full object-cover object-[center_26%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />

              {/* Nội dung nổi trên ảnh */}
              <div className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/25 text-[10px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.24em] whitespace-nowrap">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    CÙNG ĐẾM NGƯỢC THỜI GIAN
                  </span>
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-rose-500 text-rose-500 animate-bounce shrink-0" />
                </div>

                <div>
                  <p className="font-script-luxury text-3xl sm:text-4xl text-amber-200 -mb-1">
                    Counting every heartbeat...
                  </p>
                  <h2 className="font-serif-luxury italic text-4xl sm:text-6xl font-normal tracking-wide mb-3 sm:mb-4 whitespace-nowrap">
                    Save The Date
                  </h2>

                  {/* 4 Ô Đếm Ngược Kính Mờ 3D Flip */}
                  <div className="grid grid-cols-4 gap-2 sm:gap-4">
                    {[
                      { label: 'Ngày', value: timeLeft.days },
                      { label: 'Giờ', value: timeLeft.hours },
                      { label: 'Phút', value: timeLeft.minutes },
                      { label: 'Giây', value: timeLeft.seconds },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl bg-white/15 backdrop-blur-xl border border-white/35 py-3 sm:py-5 px-1.5 sm:px-2 text-center shadow-lg"
                      >
                        <AnimatePresence mode="popLayout">
                          <motion.span
                            key={item.value}
                            initial={{ y: -12, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 12, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="block font-serif-luxury text-2xl sm:text-5xl font-bold leading-none"
                          >
                            {String(item.value).padStart(2, '0')}
                          </motion.span>
                        </AnimatePresence>
                        <span className="block text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-amber-200 mt-1.5 whitespace-nowrap">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Nút Lưu Lịch Điện Thoại */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                type="button"
                onClick={handleAddToCalendar}
                className={`cursor-pointer inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full text-[11px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.2em] font-semibold whitespace-nowrap ${theme.btnPrimary}`}
              >
                <CalendarPlus className="w-4 h-4 shrink-0" />
                <span>Lưu Ngày Cưới Vào Điện Thoại</span>
              </button>

              <span className={`inline-flex items-center gap-1.5 text-xs whitespace-nowrap ${theme.textSecondary}`}>
                <Clock className="w-4 h-4 shrink-0" style={{ color: theme.accentHex }} />
                <span>27 &amp; 28/11/2026 (19 &amp; 20/10 Bính Ngọ)</span>
              </span>
            </div>
          </div>

          {/* Cột Phải: Tờ Lịch Pha Lê Tháng 11 / 2026 (Đánh dấu cả ngày 27 & 28) */}
          <div ref={rightCalendarRef} className="lg:col-span-5">
            <div
              className={`rounded-[32px] border-2 ${theme.borderAccent} ${theme.bgCard} p-6 sm:p-8 shadow-2xl max-w-md mx-auto`}
            >
              <div className={`text-center pb-4 mb-4 border-b ${theme.borderSubtle}`}>
                <p className={`font-serif-italic text-xs tracking-[0.22em] font-semibold mb-1 ${theme.textAccent}`}>
                  Tháng 11 • Năm 2026
                </p>
                <h3 className={`font-script-luxury text-3xl sm:text-4xl font-normal ${theme.textPrimary}`}>
                  {data.groom.shortName} &amp; {data.bride.shortName}
                </h3>
                <p className={`text-xs mt-1 opacity-75 ${theme.textSecondary}`}>
                  Tháng 10 năm Bính Ngọ (Âm lịch)
                </p>
              </div>

              {/* Thứ trong tuần */}
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {daysOfWeek.map((d) => (
                  <div
                    key={d}
                    className={`text-[11px] font-bold uppercase tracking-wider py-1 ${theme.textAccent}`}
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Lưới ngày trong tháng 11/2026 */}
              <div className="grid grid-cols-7 gap-1.5 text-center">
                {Array.from({ length: emptyLeadingDays }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-9" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const isPartyDay = dayNum === 27;
                  const isWeddingDay = dayNum === 28;

                  return (
                    <div
                      key={dayNum}
                      className="relative h-9 sm:h-10 flex items-center justify-center text-xs sm:text-sm font-medium"
                    >
                      {isWeddingDay ? (
                        <div
                          style={{ backgroundColor: theme.accentHex }}
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg scale-110 relative"
                          title="28/11: Lễ Vu Quy & Lễ Thành Hôn"
                        >
                          <span>{dayNum}</span>
                          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 absolute -top-1 -right-1 animate-bounce" />
                        </div>
                      ) : isPartyDay ? (
                        <div
                          style={{ borderColor: theme.accentHex }}
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center font-bold ${theme.textAccent}`}
                          title="27/11: Tiệc Cưới Thân Mật"
                        >
                          <span>{dayNum}</span>
                        </div>
                      ) : (
                        <span className={theme.textPrimary}>{dayNum}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Chú thích 2 ngày trọng đại */}
              <div className={`mt-5 pt-4 border-t ${theme.borderSubtle} space-y-2 text-[11px] sm:text-xs`}>
                <div className="flex items-center justify-between gap-2 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 font-medium shrink-0">
                    <span
                      style={{ borderColor: theme.accentHex }}
                      className="w-3 h-3 rounded-full border-2 inline-block shrink-0"
                    />
                    Thứ 6 (27/11):
                  </span>
                  <span className={`${theme.textSecondary} truncate`}>Tiệc Thân Mật (16h30 &amp; 17h00)</span>
                </div>
                <div className="flex items-center justify-between gap-2 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 font-semibold shrink-0">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 shrink-0" />
                    Thứ 7 (28/11):
                  </span>
                  <span className={`font-semibold ${theme.textAccent} truncate`}>
                    Lễ Vu Quy (11h15) &amp; Thành Hôn (13h05)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
