import React from 'react';
import { motion } from 'framer-motion';
import { StyleId, THEMES, WeddingData } from '../data/weddingData';

interface CoupleSectionProps {
  styleId: StyleId;
  data: WeddingData;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ styleId, data }) => {
  const theme = THEMES[styleId];

  const coupleItems = [
    {
      role: 'CHÚ RỂ',
      person: data.groom,
      tilt: '-rotate-1',
    },
    {
      role: 'CÔ DÂU',
      person: data.bride,
      tilt: 'rotate-1',
    },
  ];

  return (
    <section
      className={`relative py-12 md:py-20 overflow-hidden perspective-1500 ${theme.bgSecondary} ${
        styleId === 'cinematic' ? 'film-grain' : styleId === 'indochine' ? 'indochine-pattern' : ''
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {coupleItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative group h-full"
            >
              <div
                className={`relative h-full flex flex-col justify-between p-4 sm:p-5 ${
                  styleId === 'editorial'
                    ? 'bg-white text-stone-950 border-2 border-stone-950 shadow-[12px_12px_0px_#C5A059]'
                    : styleId === 'cinematic'
                    ? 'rounded-3xl bg-[#181311] border-2 border-[#F0AD64]/80 shadow-[0_0_45px_rgba(240,173,100,0.18)] text-white'
                    : styleId === 'indochine'
                    ? 'bg-[#5E0E15] text-[#FFF8EC] rounded-2xl border-2 border-[#F7CE68] shadow-[0_20px_50px_rgba(0,0,0,0.55)]'
                    : 'bg-[#FFFDF9] text-stone-900 rounded-[10px] border border-[#B88B7D] shadow-[0_22px_50px_rgba(0,0,0,0.16)]'
                }`}
              >
                {styleId === 'fairytale' && (
                  <div className={`washi-tape -top-3 left-1/2 -translate-x-1/2 ${item.tilt}`} />
                )}

                {/* Khung Ảnh Chân Dung Sạch Sẽ (Đã bỏ chữ đè & ảnh nhỏ góc trên) */}
                <div
                  className={`relative overflow-hidden aspect-[3/3.8] bg-stone-900 ${
                    styleId === 'editorial'
                      ? 'border border-stone-950'
                      : styleId === 'cinematic'
                      ? 'rounded-2xl border border-[#F0AD64]/45'
                      : styleId === 'indochine'
                      ? 'border-2 border-[#F7CE68] rounded-xl'
                      : 'border border-[#D4AF37]/45 rounded-[4px] p-1.5'
                  }`}
                >
                  <img
                    src={item.person.avatar}
                    alt={item.person.fullName}
                    className="w-full h-full object-cover object-[center_18%] transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Phần Tên Chú Rể / Cô Dâu Tinh Gọn */}
                <div
                  className={`pt-4 mt-3 text-center border-t ${
                    styleId === 'indochine' || styleId === 'cinematic'
                      ? 'border-white/15'
                      : 'border-stone-200/80'
                  }`}
                >
                  <p className="font-serif-italic text-xs tracking-[0.22em] opacity-75 mb-0.5 uppercase">
                    {item.role}
                  </p>
                  <h3 className="font-script-luxury text-3xl sm:text-4xl font-normal">
                    {item.person.fullName}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
