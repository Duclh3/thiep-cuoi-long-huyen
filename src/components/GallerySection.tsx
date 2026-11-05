import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Expand, X, ChevronLeft, ChevronRight, Sparkles, Pause, Play, Film, Crown, BookOpen } from 'lucide-react';
import { StyleId, THEMES, WeddingData } from '../data/weddingData';

interface GallerySectionProps {
  styleId: StyleId;
  data: WeddingData;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ styleId, data }) => {
  const [rotationY, setRotationY] = useState(0);
  // Luôn tự động xoay liên tục, chỉ dừng khi người dùng bấm trực tiếp vào nút Dừng
  const [autoRotate, setAutoRotate] = useState(true);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const theme = THEMES[styleId];
  const carouselCount = data.carousel3DImages.length;
  const angleStep = 360 / carouselCount;

  // Danh sách toàn bộ ảnh trong Gallery để hỗ trợ bấm Qua/Lại khi xem ảnh phóng to trên điện thoại
  const allGalleryUrls = React.useMemo(() => {
    const urls = [
      ...data.carousel3DImages.map((item) => item.url),
      ...data.album9Images.map((item) => item.url),
    ];
    return Array.from(new Set(urls));
  }, [data.carousel3DImages, data.album9Images]);

  const handleStepLightbox = (dir: -1 | 1, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxUrl || allGalleryUrls.length === 0) return;
    const idx = allGalleryUrls.indexOf(lightboxUrl);
    const nextIdx = (idx + dir + allGalleryUrls.length) % allGalleryUrls.length;
    setLightboxUrl(allGalleryUrls[nextIdx]);
  };

  // Tốc độ xoay chậm rãi, êm dịu (~0.13 độ/frame)
  useEffect(() => {
    if (!autoRotate) return;
    let rafId: number;
    const tick = () => {
      setRotationY((prev) => prev - 0.13);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [autoRotate]);

  return (
    <section
      id="section-gallery"
      className={`relative py-24 md:py-32 overflow-hidden perspective-1500 ${theme.bgPrimary} ${
        styleId === 'cinematic' ? 'film-grain' : styleId === 'indochine' ? 'indochine-pattern' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header thay đổi theo 4 Phong Cách */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
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
                ? 'VOGUE LOOKBOOK ARCHIVE • 2026'
                : styleId === 'cinematic'
                ? '35MM MOTION PICTURE GALLERY'
                : styleId === 'indochine'
                ? 'CHÂU BÁU HOÀNG GIA • BỘ ẢNH CƯỚI'
                : '3D HOLOGRAPHIC GALLERY • BỘ ẢNH CƯỚI'}
            </span>
          </div>
          <p className={`font-script-luxury text-4xl sm:text-5xl ${theme.textAccent} -mb-2`}>
            Khoảnh Khắc Tình Yêu
          </p>
          <h2 className={`font-serif-luxury text-4xl sm:text-6xl font-normal mb-3 ${theme.textPrimary}`}>
            Album Kỷ Niệm 3D
          </h2>
          <p className={`font-serif-italic text-base sm:text-lg leading-relaxed ${theme.textSecondary}`}>
            Vòng xoay 3D tự động chuyển động êm dịu — chạm vào bất kỳ bức hình nào để phóng to toàn màn hình.
          </p>
        </div>

        {/* TẦNG 1: VÒNG XOAY KHÔNG GIAN 3D */}
        <div className="flex flex-col items-center">
          <div
            className="relative h-[320px] sm:h-[390px] w-full flex items-center justify-center select-none overflow-visible"
            style={{ perspective: '1300px' }}
          >
            <div
              className="relative w-44 sm:w-56 h-60 sm:h-74 preserve-3d"
              style={{
                transform: `rotateX(-3deg) rotateY(${rotationY}deg)`,
              }}
            >
              {data.carousel3DImages.map((img, i) => {
                const angle = i * angleStep;
                return (
                  <div
                    key={img.id}
                    onClick={() => setLightboxUrl(img.url)}
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(var(--carousel-z, 240px))`,
                    }}
                    className={`cursor-pointer absolute inset-0 p-2 pb-7 shadow-[0_20px_45px_rgba(0,0,0,0.4)] group [--carousel-z:205px] sm:[--carousel-z:310px] ${
                      styleId === 'editorial'
                        ? 'bg-stone-950 text-white border-2 border-[#C5A059] rounded-none'
                        : styleId === 'cinematic'
                        ? 'bg-[#171210] text-amber-200 border-2 border-[#F0AD64] rounded-xl'
                        : styleId === 'indochine'
                        ? 'bg-[#5E0E15] text-[#F7CE68] border-2 border-[#F7CE68] rounded-md'
                        : 'fine-art-polaroid text-stone-800 rounded-[4px]'
                    }`}
                  >
                    <div className="w-full h-full overflow-hidden rounded-[2px] bg-stone-900 relative">
                      <img
                        src={img.url}
                        alt={img.caption}
                        className="w-full h-full object-cover object-[center_22%] group-hover:scale-108 transition-transform duration-500"
                      />
                    </div>
                    <p className="font-script-luxury text-lg sm:text-xl text-center mt-1 truncate">
                      {img.caption}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* THANH ĐIỀU KHIỂN ĐẶT TÁCH BIỆT BÊN DƯỚI VÒNG XOAY */}
          <div className="mt-10 sm:mt-14 flex items-center justify-center gap-3 z-20">
            <button
              type="button"
              onClick={() => setRotationY((prev) => prev + 45)}
              className={`cursor-pointer w-9 h-9 rounded-full border ${theme.borderAccent} ${theme.bgCard} flex items-center justify-center shadow-md hover:scale-105 transition-transform`}
              aria-label="Xoay sang trái"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setAutoRotate((prev) => !prev)}
              className={`cursor-pointer px-5 py-2.5 rounded-full text-[11px] uppercase tracking-[0.15em] font-semibold flex items-center justify-center gap-2 whitespace-nowrap shadow-lg transition-transform hover:scale-105 ${theme.btnPrimary}`}
            >
              {autoRotate ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current shrink-0" />
                  <span className="whitespace-nowrap">Tạm Dừng Xoay</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current shrink-0" />
                  <span className="whitespace-nowrap">Tiếp Tục Xoay 3D</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setRotationY((prev) => prev - 45)}
              className={`cursor-pointer w-9 h-9 rounded-full border ${theme.borderAccent} ${theme.bgCard} flex items-center justify-center shadow-md hover:scale-105 transition-transform`}
              aria-label="Xoay sang phải"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* =====================================================================
            TẦNG 2: TRIỂN LÃM ẢNH CƯỚI VỚI HIỆU ỨNG XOÈ BÀI 3D & VỆT SÁNG LỤA VÀNG
           ===================================================================== */}
        <div className="mt-20 sm:mt-26">
          <div className="text-center mb-12 sm:mb-16">
            <p className={`font-script-luxury text-3xl sm:text-4xl ${theme.textAccent} -mb-1`}>
              {styleId === 'editorial'
                ? 'Editorial Lookbook'
                : styleId === 'cinematic'
                ? 'Director’s Cut Frames'
                : styleId === 'indochine'
                ? 'Bách Niên Giai Lão'
                : 'Sweet Memories'}
            </p>
            <h3 className={`font-serif-luxury text-2xl sm:text-5xl font-semibold uppercase tracking-[0.06em] sm:tracking-wider ${theme.textPrimary}`}>
              {styleId === 'editorial'
                ? 'ẤN PHẨM THỜI TRANG VOGUE'
                : styleId === 'cinematic'
                ? 'THƯỚC PHIM KỶ NIỆM 35MM'
                : styleId === 'indochine'
                ? 'TRIỂN LÃM CUNG ĐÌNH ĐÔNG DƯƠNG'
                : 'TRIỂN LÃM ẢNH CƯỚI FINE ART'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 sm:gap-9">
            {data.album9Images.map((item, idx) => {
              const col = idx % 3;
              // Hiệu ứng Xoè Bài Nghệ Thuật (3D Fan-Out) sinh động từ tâm ra 2 cánh
              const initialAnim =
                col === 0
                  ? { opacity: 0, x: 55, y: 55, rotate: 9, scale: 0.85 }
                  : col === 1
                  ? { opacity: 0, x: 0, y: 75, rotate: 0, scale: 0.82 }
                  : { opacity: 0, x: -55, y: 55, rotate: -9, scale: 0.85 };

              const targetRotate =
                styleId === 'fairytale'
                  ? col === 0
                    ? -1.8
                    : col === 2
                    ? 1.8
                    : 0
                  : 0;

              const targetY = col === 1 ? 14 : 0;

              return (
                <motion.div
                  key={`${styleId}-${item.id}`}
                  initial={initialAnim}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: targetY,
                    rotate: targetRotate,
                    scale: 1,
                  }}
                  whileHover={{
                    y: targetY - 10,
                    rotate: 0,
                    scale: 1.03,
                    transition: { duration: 0.3 },
                  }}
                  viewport={{ once: false, amount: 0.18 }}
                  transition={{
                    type: 'spring',
                    stiffness: 95,
                    damping: 16,
                    mass: 0.85,
                    delay: col * 0.09,
                  }}
                  onClick={() => setLightboxUrl(item.url)}
                  className={`cursor-pointer group relative overflow-hidden ${
                    styleId === 'editorial'
                      ? 'bg-white text-stone-950 rounded-none p-3 pb-5 border-2 border-stone-950 shadow-[12px_12px_0px_#C5A059]'
                      : styleId === 'cinematic'
                      ? 'bg-[#161210] text-amber-100 rounded-2xl p-3 pb-4 border-2 border-[#F0AD64]/75 shadow-[0_20px_50px_rgba(0,0,0,0.75)]'
                      : styleId === 'indochine'
                      ? 'bg-[#5E0E15] text-[#FFF8EC] rounded-xl p-3 pb-5 border-2 border-[#F7CE68] shadow-[0_22px_50px_rgba(0,0,0,0.6)]'
                      : 'bg-[#FFFDF9] text-stone-900 rounded-[8px] p-3 pb-5 shadow-[0_22px_50px_rgba(0,0,0,0.18)] border border-[#E4D9C8]'
                  }`}
                >
                  {/* Băng dính Washi Tape cho phong cách Fine Art */}
                  {styleId === 'fairytale' && (
                    <div
                      className={`washi-tape -top-2.5 left-1/2 -translate-x-1/2 ${
                        idx % 2 === 0 ? 'rotate-[-3deg]' : 'rotate-[3deg]'
                      }`}
                    />
                  )}

                  {/* Thanh mã số Tạp Chí Vogue ở đỉnh nếu là phong cách Editorial */}
                  {styleId === 'editorial' && (
                    <div className="flex items-center justify-between text-[9px] font-tall-editorial tracking-[0.28em] uppercase text-stone-500 pb-2 mb-2 border-b border-stone-900">
                      <span>VOGUE ARCHIVE</span>
                      <span className="text-[#9E7B3B] font-bold">PLATE 0{idx + 1}</span>
                    </div>
                  )}

                  {/* Dải lỗ phim 35mm trên đầu nếu là phong cách Điện Ảnh */}
                  {styleId === 'cinematic' && (
                    <div className="flex items-center justify-between px-1 pb-2 mb-1">
                      {[...Array(7)].map((_, k) => (
                        <span key={k} className="w-3 h-1.5 rounded-[1px] bg-[#F0AD64]/50" />
                      ))}
                    </div>
                  )}

                  {/* Khung chứa ảnh kèm hiệu ứng ống kính Zoom-Out & Vệt sáng lụa vàng quét ngang */}
                  <div className="relative aspect-[4/4.6] rounded-[3px] overflow-hidden bg-stone-900">
                    <motion.img
                      initial={{ scale: 1.22, filter: 'blur(4px)' }}
                      whileInView={{ scale: 1, filter: 'blur(0px)' }}
                      viewport={{ once: false, amount: 0.18 }}
                      transition={{ duration: 0.85, delay: col * 0.09, ease: [0.22, 1, 0.36, 1] }}
                      src={item.url}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-full object-cover object-[center_22%] transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    {/* Vệt ánh sáng lụa vàng quét chéo qua bức ảnh khi xuất hiện */}
                    <motion.div
                      initial={{ x: '-130%', skewX: -25 }}
                      whileInView={{ x: '160%', skewX: -25 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 1.05, delay: 0.15 + col * 0.1, ease: 'easeInOut' }}
                      className="pointer-events-none absolute inset-0 w-2/3 bg-gradient-to-r from-transparent via-white/45 to-transparent z-10"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-30 group-hover:opacity-75 transition-opacity" />

                    {/* Nút phóng to */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                      <Expand className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Chân khung ảnh đặc trưng theo từng phong cách */}
                  <div className="mt-3 px-1 flex items-center justify-between gap-2 whitespace-nowrap">
                    <span
                      className={`font-script-luxury text-2xl whitespace-nowrap ${
                        styleId === 'cinematic' || styleId === 'indochine'
                          ? 'text-amber-200'
                          : 'text-[#5A4638]'
                      }`}
                    >
                      Thành Long &amp; Thanh Huyền
                    </span>
                    <span className="font-tall-editorial text-[11px] tracking-[0.2em] opacity-75 whitespace-nowrap">
                      {styleId === 'indochine'
                        ? `囍 0${idx + 1}`
                        : styleId === 'cinematic'
                        ? `SCENE 0${idx + 1}`
                        : `NO.0${idx + 1}`}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Xem Ảnh Toàn Màn Hình — Render qua Portal ra ngoài body để không bị lỗi perspective trên iOS/Android */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {lightboxUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] w-screen h-[100dvh] bg-black/92 backdrop-blur-xl flex flex-col items-center justify-center p-4 select-none"
                onClick={() => setLightboxUrl(null)}
              >
                {/* Thanh đỉnh: Số thứ tự ảnh & Nút Đóng nổi bật */}
                <div className="w-full max-w-4xl flex items-center justify-between px-2 mb-3 z-20">
                  <span className="font-tall-editorial text-xs tracking-[0.22em] text-amber-200 uppercase">
                    ALBUM ẢNH CƯỚI • {allGalleryUrls.indexOf(lightboxUrl) + 1} / {allGalleryUrls.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setLightboxUrl(null)}
                    className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/15 hover:bg-white/30 border border-white/25 text-white text-xs font-semibold"
                    aria-label="Đóng"
                  >
                    <X className="w-4 h-4" />
                    <span>Đóng</span>
                  </button>
                </div>

                {/* Khung Ảnh Chính Giữa Màn Hình + Nút Chuyển Ảnh Trái/Phải */}
                <div className="relative flex items-center justify-center w-full max-w-4xl max-h-[76dvh]">
                  <button
                    type="button"
                    onClick={(e) => handleStepLightbox(-1, e)}
                    className="cursor-pointer absolute left-1 sm:left-4 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/65 hover:bg-black/85 border border-white/30 text-white flex items-center justify-center shadow-xl"
                    aria-label="Ảnh trước"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <motion.img
                    key={lightboxUrl}
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.92, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    src={lightboxUrl}
                    alt="Ảnh cưới phóng to"
                    className="max-h-[75dvh] max-w-[90vw] rounded-xl object-contain shadow-[0_25px_70px_rgba(0,0,0,0.85)] border-2 border-white/90"
                    onClick={(e) => e.stopPropagation()}
                  />

                  <button
                    type="button"
                    onClick={(e) => handleStepLightbox(1, e)}
                    className="cursor-pointer absolute right-1 sm:right-4 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/65 hover:bg-black/85 border border-white/30 text-white flex items-center justify-center shadow-xl"
                    aria-label="Ảnh tiếp theo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <p className="mt-3 text-[11px] text-white/70 tracking-wider">
                  Chạm vào nền tối hoặc nút Đóng để quay lại thiệp
                </p>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};
