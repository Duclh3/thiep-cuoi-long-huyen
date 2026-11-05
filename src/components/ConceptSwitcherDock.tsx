import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Disc3,
  VolumeX,
  MailOpen,
  SkipForward,
  Music,
  Sparkles,
  Check,
  ArrowUp,
  MapPin,
  Heart,
  Gift,
} from 'lucide-react';
import { StyleId, THEMES, WeddingData } from '../data/weddingData';
import { soundEngine, WEDDING_PLAYLIST, SongTrack } from '../utils/soundEngine';

interface ConceptSwitcherDockProps {
  styleId: StyleId;
  onSelectStyle: (id: StyleId) => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onReplayGate: () => void;
  data: WeddingData;
  onUpdateData: (updater: (prev: WeddingData) => WeddingData) => void;
  guestName: string;
  onUpdateGuestName: (name: string) => void;
  onResetDefault: () => void;
  hideStyleSwitcher?: boolean;
}

export const ConceptSwitcherDock: React.FC<ConceptSwitcherDockProps> = ({
  styleId,
  onSelectStyle,
  onReplayGate,
  hideStyleSwitcher = false,
}) => {
  const [musicState, setMusicState] = useState<{
    isPlaying: boolean;
    currentIndex: number;
    track: SongTrack;
  }>({
    isPlaying: soundEngine.getIsPlaying(),
    currentIndex: soundEngine.getCurrentIndex(),
    track: soundEngine.getCurrentTrack(),
  });

  const [showPlaylistDrawer, setShowPlaylistDrawer] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  useEffect(() => {
    return soundEngine.subscribe((st) => {
      setMusicState(st);
    });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTarget = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setShowQuickMenu(false);
  };

  return (
    <>
      {/* DYNAMIC ISLAND MUSIC PLAYER (Đỉnh màn hình iPhone/Android) */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-md">
        <div className="bg-stone-950/88 backdrop-blur-2xl border border-amber-300/35 rounded-full px-3 py-1.5 shadow-[0_12px_35px_rgba(0,0,0,0.45)] flex items-center justify-between gap-2 text-white">
          {/* Nút Bật/Tắt Nhạc + Đĩa Than Xoay */}
          <button
            type="button"
            onClick={() => soundEngine.toggleMusic()}
            className="cursor-pointer w-8 h-8 rounded-full bg-amber-400/20 border border-amber-300/50 flex items-center justify-center shrink-0"
            title={musicState.isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc'}
          >
            {musicState.isPlaying ? (
              <Disc3 className="w-4 h-4 text-amber-300 animate-spin-vinyl" />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-400" />
            )}
          </button>

          {/* Tên Bài Hát Đang Phát (Bấm mở danh sách 5 bài hát) */}
          <button
            type="button"
            onClick={() => setShowPlaylistDrawer(!showPlaylistDrawer)}
            className="cursor-pointer flex-1 min-w-0 text-left px-1 focus:outline-none"
          >
            <div className="flex items-center gap-1.5">
              {musicState.isPlaying && (
                <div className="flex items-end gap-[2px] h-3 shrink-0">
                  <span className="w-[2px] h-full bg-amber-300 animate-eq-1 origin-bottom" />
                  <span className="w-[2px] h-full bg-amber-300 animate-eq-2 origin-bottom" />
                  <span className="w-[2px] h-full bg-amber-300 animate-eq-3 origin-bottom" />
                </div>
              )}
              <p className="text-xs font-semibold text-amber-100 truncate">
                {musicState.track.title}
              </p>
            </div>
            <p className="text-[10px] text-stone-400 truncate">
              {musicState.track.artist} • Chạm đổi 5 bài hát
            </p>
          </button>

          {/* Nút Chuyển Bài Tiếp Theo */}
          <button
            type="button"
            onClick={() => soundEngine.nextTrack(true)}
            title="Chuyển bài hát tiếp theo"
            className="cursor-pointer w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center shrink-0"
          >
            <SkipForward className="w-3.5 h-3.5 text-amber-200" />
          </button>

          {/* Nút Mở Danh Sách 5 Bài Hát */}
          <button
            type="button"
            onClick={() => setShowPlaylistDrawer(!showPlaylistDrawer)}
            title="Danh sách 5 bài hát đám cưới"
            className="cursor-pointer px-2.5 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-[10px] font-semibold text-amber-200 shrink-0 flex items-center gap-1"
          >
            <Music className="w-3 h-3" />
            <span>{musicState.currentIndex + 1}/5</span>
          </button>
        </div>

        {/* Menu Thả Xuống Chọn 5 Bài Hát Thật */}
        <AnimatePresence>
          {showPlaylistDrawer && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              className="mt-2 bg-stone-950/95 backdrop-blur-2xl border border-amber-300/35 rounded-3xl p-3 shadow-2xl text-white space-y-1.5"
            >
              <div className="flex items-center justify-between px-2 py-1 text-[11px] uppercase tracking-wider text-amber-300 font-semibold border-b border-white/10">
                <span>Playlist 5 Bài Hát Đám Cưới</span>
                <button
                  type="button"
                  onClick={() => setShowPlaylistDrawer(false)}
                  className="cursor-pointer text-stone-400 hover:text-white text-xs"
                >
                  Đóng
                </button>
              </div>
              {WEDDING_PLAYLIST.map((song, idx) => {
                const isCurrent = idx === musicState.currentIndex;
                return (
                  <button
                    key={song.id}
                    type="button"
                    onClick={() => {
                      soundEngine.selectTrack(idx);
                      setShowPlaylistDrawer(false);
                    }}
                    className={`cursor-pointer w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-left transition-colors ${
                      isCurrent
                        ? 'bg-amber-400/20 border border-amber-300/40 text-amber-200'
                        : 'hover:bg-white/10 text-stone-200'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-semibold truncate">
                        {idx + 1}. {song.title}
                      </p>
                      <p className="text-[11px] opacity-70 truncate">{song.artist}</p>
                    </div>
                    {isCurrent && <Check className="w-4 h-4 text-amber-300 shrink-0" />}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* NÚT SCROLL TO TOP & QUAY LẠI MỤC ĐIỀU HƯỚNG NHANH (Góc phải dưới) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed right-3 sm:right-5 bottom-24 sm:bottom-20 z-40 flex flex-col items-end gap-2"
          >
            {/* Menu Điều Hướng Nhanh bật ra hoặc hiển thị gọn */}
            <AnimatePresence>
              {showQuickMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="bg-stone-950/92 backdrop-blur-2xl border border-amber-300/45 rounded-2xl p-2 shadow-2xl flex flex-col gap-1.5 text-white min-w-[210px]"
                >
                  <button
                    type="button"
                    onClick={() => scrollToTarget('hero-quick-nav')}
                    className="cursor-pointer w-full px-3 py-2 rounded-xl bg-white/10 hover:bg-amber-300 hover:text-stone-950 text-xs font-semibold flex items-center gap-2 transition-colors text-left"
                  >
                    <ArrowUp className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    <span>Quay lại Mục Điều Hướng</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToTarget('section-events')}
                    className="cursor-pointer w-full px-3 py-2 rounded-xl hover:bg-white/15 text-xs flex items-center gap-2 transition-colors text-left"
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    <span>Lịch trình &amp; Bản đồ</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToTarget('section-wishes')}
                    className="cursor-pointer w-full px-3 py-2 rounded-xl hover:bg-white/15 text-xs flex items-center gap-2 transition-colors text-left"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>Gửi lời chúc &amp; Mừng cưới</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToTarget('section-qr-gift')}
                    className="cursor-pointer w-full px-3 py-2 rounded-xl hover:bg-white/15 text-xs flex items-center gap-2 transition-colors text-left"
                  >
                    <Gift className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    <span>Mã QR Mừng Cưới</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nút Chính: Bấm cuộn thẳng về mục Điều hướng hoặc mở menu nhanh */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setShowQuickMenu((prev) => !prev)}
                className="cursor-pointer px-3 py-2.5 rounded-full bg-stone-950/90 backdrop-blur-xl border border-amber-300/45 text-amber-200 text-[11px] font-semibold shadow-xl hover:bg-stone-900 transition-all"
              >
                {showQuickMenu ? 'Đóng Menu' : 'Mục Lục Nhanh'}
              </button>

              <button
                type="button"
                onClick={() => scrollToTarget('hero-quick-nav')}
                title="Cuộn lên mục Điều hướng: Lịch trình & Bản đồ, Gửi lời chúc & Mừng cưới"
                aria-label="Cuộn lên đầu trang"
                className="cursor-pointer w-11 h-11 rounded-full bg-gradient-to-br from-amber-300 via-amber-200 to-amber-400 text-stone-950 border-2 border-white shadow-[0_10px_25px_rgba(0,0,0,0.45)] flex items-center justify-center hover:scale-108 transition-transform"
              >
                <ArrowUp className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THANH CHUYỂN ĐỔI 4 PHONG CÁCH 3D & PHÁO HOA Ở CẠNH DƯỚI MÀN HÌNH */}
      <div
        className={`fixed bottom-3 left-1/2 -translate-x-1/2 z-40 ${
          hideStyleSwitcher ? 'w-auto' : 'w-[96%] max-w-2xl'
        }`}
      >
        <div className="bg-stone-950/90 backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-full p-1.5 sm:p-2 shadow-[0_20px_60px_rgba(0,0,0,0.65)] flex flex-col sm:flex-row items-center gap-1.5">
          {/* 4 Nút Chọn Phong Cách (Ẩn khi mở bằng link đơn phong cách) */}
          {!hideStyleSwitcher && (
            <div className="grid grid-cols-4 gap-1 w-full sm:flex-1">
              {(Object.keys(THEMES) as StyleId[]).map((id) => {
                const t = THEMES[id];
                const active = styleId === id;
                return (
                  <button
                    key={id}
                    onClick={() => {
                      onSelectStyle(id);
                      window.triggerWeddingFireworks?.(3);
                    }}
                    className={`cursor-pointer py-2 px-1.5 sm:px-3 rounded-xl sm:rounded-full text-[10px] sm:text-xs font-medium transition-all duration-300 flex items-center justify-center gap-1 ${
                      active
                        ? 'bg-gradient-to-r from-amber-300 via-amber-100 to-white text-stone-950 font-bold shadow-md scale-[1.02]'
                        : 'text-stone-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="opacity-60 font-mono hidden md:inline">{t.code}.</span>
                    <span className="truncate">{t.vietnameseName}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Nút Pháo Hoa & Nút Mở Lại Thiệp */}
          <div
            className={`flex items-center gap-1.5 w-full sm:w-auto justify-end ${
              hideStyleSwitcher
                ? 'px-1'
                : 'border-t sm:border-t-0 sm:border-l border-white/15 pt-1 sm:pt-0 sm:pl-2'
            }`}
          >
            <button
              type="button"
              onClick={() => window.triggerWeddingFireworks?.(6)}
              className="cursor-pointer flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-xl sm:rounded-full bg-amber-400/20 hover:bg-amber-400/35 border border-amber-300/40 text-amber-200 text-[11px] font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>🎆 Pháo Hoa</span>
            </button>

            <button
              type="button"
              onClick={onReplayGate}
              className="cursor-pointer flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-xl sm:rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px]"
            >
              <MailOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>Mở Thiệp</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
