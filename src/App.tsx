import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  DEFAULT_WEDDING_DATA,
  DUC_HAU_WEDDING_DATA,
  StyleId,
  THEMES,
  WeddingData,
  WishItem,
} from './data/weddingData';
import { soundEngine } from './utils/soundEngine';
import { fetchCloudWishes, saveCloudWish } from './utils/cloudWishes';
import { ThreeWeddingScene } from './components/ThreeWeddingScene';
import { AmbientCanvas } from './components/AmbientCanvas';
import { OpeningGate } from './components/OpeningGate';
import { HeroSection } from './components/HeroSection';
import { CoupleSection } from './components/CoupleSection';
import { LoveStorySection } from './components/LoveStorySection';
import { CountdownSection } from './components/CountdownSection';
import { EventsSection } from './components/EventsSection';
import { GallerySection } from './components/GallerySection';
import { RsvpWishesSection } from './components/RsvpWishesSection';
import { ConceptSwitcherDock } from './components/ConceptSwitcherDock';
import { WhiteMinimalInvitation } from './components/WhiteMinimalInvitation';
import { GardenEmeraldInvitation } from './components/GardenEmeraldInvitation';
import { BurgundyCallaInvitation } from './components/BurgundyCallaInvitation';
import { AdminGuestModal } from './components/AdminGuestModal';

gsap.registerPlugin(ScrollTrigger);

const WISHES_STORAGE_KEY = 'wedding_wishes_long_huyen_clean_v2';

function mergeUniqueWishes(...lists: WishItem[][]): WishItem[] {
  const seen = new Set<string>();
  const result: WishItem[] = [];
  for (const list of lists) {
    for (const item of list) {
      if (!item || !item.name || !item.message) continue;
      // Khử trùng lặp theo cả id hoặc cặp (name + message)
      const dedupeKey = `${item.name.trim().toLowerCase()}::${item.message.trim().toLowerCase()}`;
      if (!seen.has(item.id) && !seen.has(dedupeKey)) {
        seen.add(item.id);
        seen.add(dedupeKey);
        result.push(item);
      }
    }
  }
  return result;
}

/**
 * Nhận diện phong cách từ 5 đường dẫn public độc lập:
 * - /fine-art -> fairytale (01. Thơ Mộng Fine Art)
 * - /vogue -> editorial (02. Tạp Chí Vogue)
 * - /starlight -> cinematic (03. Đêm Pháo Hoa 3D)
 * - /indochine -> indochine (04. Cung Đình Đông Dương)
 * - /minimal hoặc /tone-trang -> minimal (05. Tone Trắng Minimal giống video mẫu)
 */
function detectInitialRouteStyle(): { style: StyleId; isLockedSingleStyle: boolean } {
  if (typeof window === 'undefined') {
    return { style: 'fairytale', isLockedSingleStyle: false };
  }

  const pathname = window.location.pathname.toLowerCase();
  const params = new URLSearchParams(window.location.search);
  const queryStyle = params.get('style')?.toLowerCase();

  // Style 1: Fine Art
  if (
    pathname.includes('/fine-art') ||
    pathname.includes('/style-1') ||
    queryStyle === 'fairytale' ||
    queryStyle === 'fine-art' ||
    queryStyle === '1'
  ) {
    return { style: 'fairytale', isLockedSingleStyle: true };
  }

  // Style 2: Vogue Editorial
  if (
    pathname.includes('/vogue') ||
    pathname.includes('/editorial') ||
    pathname.includes('/style-2') ||
    queryStyle === 'editorial' ||
    queryStyle === 'vogue' ||
    queryStyle === '2'
  ) {
    return { style: 'editorial', isLockedSingleStyle: true };
  }

  // Style 3: Starlight Cinematic
  if (
    pathname.includes('/starlight') ||
    pathname.includes('/cinematic') ||
    pathname.includes('/style-3') ||
    queryStyle === 'cinematic' ||
    queryStyle === 'starlight' ||
    queryStyle === '3'
  ) {
    return { style: 'cinematic', isLockedSingleStyle: true };
  }

  // Style 4: Indochine Đông Dương
  if (
    pathname.includes('/indochine') ||
    pathname.includes('/style-4') ||
    queryStyle === 'indochine' ||
    queryStyle === '4'
  ) {
    return { style: 'indochine', isLockedSingleStyle: true };
  }

  // Style 5: Minimal Tone Trắng
  if (
    pathname.includes('/minimal') ||
    pathname.includes('/tone-trang') ||
    pathname.includes('/style-5') ||
    queryStyle === 'minimal' ||
    queryStyle === 'tone-trang' ||
    queryStyle === '5'
  ) {
    return { style: 'minimal', isLockedSingleStyle: true };
  }

  // Style 6: Forest Emerald Garden (Khu Vườn Xanh Ngọc - Đức & Hậu)
  if (
    pathname.includes('/garden') ||
    pathname.includes('/khu-vuon') ||
    pathname.includes('/style-6') ||
    queryStyle === 'garden' ||
    queryStyle === 'khu-vuon' ||
    queryStyle === 'style-6' ||
    queryStyle === '6'
  ) {
    return { style: 'garden', isLockedSingleStyle: true };
  }

  // Style 7: Burgundy Calla Lily (Mẫu Thiệp Calla Đỏ - Đức & Hậu)
  if (
    pathname.includes('/calla') ||
    pathname.includes('/calla-do') ||
    pathname.includes('/style-7') ||
    queryStyle === 'calla' ||
    queryStyle === 'calla-do' ||
    queryStyle === 'style-7' ||
    queryStyle === '7'
  ) {
    return { style: 'calla', isLockedSingleStyle: true };
  }

  return { style: 'fairytale', isLockedSingleStyle: false };
}

export function App() {
  const routeConfig = detectInitialRouteStyle();
  const [styleId, setStyleId] = useState<StyleId>(routeConfig.style);
  const [isLockedSingleStyle] = useState<boolean>(routeConfig.isLockedSingleStyle);
  const [isGateOpen, setIsGateOpen] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [weddingData, setWeddingData] = useState<WeddingData>(() => {
    if (routeConfig.style === 'garden' || routeConfig.style === 'calla') {
      return DUC_HAU_WEDDING_DATA;
    }
    return DEFAULT_WEDDING_DATA;
  });
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  // Khởi tạo lời chúc từ localStorage (không tự động sinh dữ liệu mẫu/test)
  const [wishes, setWishes] = useState<WishItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        // Xóa bộ nhớ đệm chứa dữ liệu mẫu/test cũ nếu có
        window.localStorage.removeItem('wedding_wishes_long_huyen_persistent_v1');
        const raw = window.localStorage.getItem(WISHES_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            return mergeUniqueWishes(parsed);
          }
        }
      } catch {
        // ignore
      }
    }
    return [];
  });

  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const [guestName, setGuestName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const guest = params.get('guest');
      if (guest && guest.trim()) return guest.trim();
    }
    return 'Bạn & Người Thương';
  });

  // Đồng bộ lời chúc từ cả Cloud KV (cho GitHub Pages) và Local API (/api/wishes)
  useEffect(() => {
    let isMounted = true;

    // 1. Tải từ Cloud KV dùng chung cho 4 link GitHub Pages
    fetchCloudWishes()
      .then((cloudList) => {
        if (!isMounted || cloudList.length === 0) return;
        setWishes((prev) => {
          const merged = mergeUniqueWishes(cloudList, prev);
          try {
            window.localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(merged));
          } catch {
            // ignore
          }
          return merged;
        });
      })
      .catch(() => {});

    // 2. Tải từ /api/wishes (nếu chạy local hoặc Vercel)
    fetch('/api/wishes')
      .then((res) => (res.ok ? res.json() : null))
      .then((serverWishes) => {
        if (!isMounted || !Array.isArray(serverWishes)) return;
        setWishes((prev) => {
          const merged = mergeUniqueWishes(prev, serverWishes);
          try {
            window.localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(merged));
          } catch {
            // ignore
          }
          return merged;
        });
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // Tự động kích hoạt nhạc ở cú chạm đầu tiên nếu trình duyệt chặn autoplay khi thiệp tự mở
  useEffect(() => {
    const unlockAudioOnFirstGesture = () => {
      if (!soundEngine.getIsPlaying()) {
        soundEngine.startMusic(0);
        setIsMusicPlaying(true);
      }
      window.removeEventListener('pointerdown', unlockAudioOnFirstGesture);
      window.removeEventListener('touchstart', unlockAudioOnFirstGesture);
    };

    window.addEventListener('pointerdown', unlockAudioOnFirstGesture, { passive: true });
    window.addEventListener('touchstart', unlockAudioOnFirstGesture, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', unlockAudioOnFirstGesture);
      window.removeEventListener('touchstart', unlockAudioOnFirstGesture);
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', () => {
      ScrollTrigger.update();
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
    });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);
    return () => clearTimeout(timer);
  }, [styleId, isGateOpen]);

  const handleUnlockGate = () => {
    if (isGateOpen) return;
    soundEngine.playOpenChime();
    soundEngine.startMusic(0); // Phát ngay bài số 1: Lễ Đường - Kai Đinh
    setIsMusicPlaying(true);
    setIsGateOpen(true);
    setTimeout(() => {
      window.triggerWeddingFireworks?.(6);
    }, 300);
  };

  const handleToggleMusic = () => {
    const playing = soundEngine.toggleMusic();
    setIsMusicPlaying(playing);
  };

  // Lưu lời chúc vĩnh viễn vào Cloud KV + LocalStorage + Backend API
  const handleAddWish = (newWish: WishItem) => {
    setWishes((prev) => {
      const updated = mergeUniqueWishes([newWish], prev);
      try {
        window.localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    // Lưu lên Cloud KV (cho GitHub Pages)
    saveCloudWish(newWish).catch(() => {});

    // Lưu vào /api/wishes (cho Local / Vercel)
    fetch('/api/wishes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newWish),
    }).catch(() => {});
  };

  // Cập nhật thông tin khách mời từ Admin (sửa tên, RSVP, lời chúc)
  const handleUpdateWish = (updatedWish: WishItem) => {
    setWishes((prev) => {
      const next = prev.map((w) => (w.id === updatedWish.id ? updatedWish : w));
      try {
        window.localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Xóa khách mời khỏi danh sách từ Admin
  const handleDeleteWish = (id: string) => {
    setWishes((prev) => {
      const next = prev.filter((w) => w.id !== id);
      try {
        window.localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleResetDefault = () => {
    if (styleId === 'garden' || styleId === 'calla') {
      setWeddingData(DUC_HAU_WEDDING_DATA);
    } else {
      setWeddingData(DEFAULT_WEDDING_DATA);
    }
    setGuestName('Bạn & Người Thương');
  };

  const handleSelectStyle = (id: StyleId) => {
    setStyleId(id);
    if (id === 'garden' || id === 'calla') {
      setWeddingData(DUC_HAU_WEDDING_DATA);
    } else {
      setWeddingData(DEFAULT_WEDDING_DATA);
    }
    if (id === 'minimal' || id === 'garden' || id === 'calla') {
      setIsGateOpen(true);
    }
  };

  const theme = THEMES[styleId];

  return (
    <div className={`min-h-screen transition-colors duration-700 ${theme.bgPrimary} ${theme.textPrimary}`}>
      {/* Thanh tiến trình cuộn trang mảnh ở đỉnh màn hình */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-black/15 pointer-events-none">
        <div
          style={{
            width: `${scrollProgress}%`,
            backgroundColor: theme.accentHex,
          }}
          className="h-full transition-all duration-150 shadow-[0_0_12px_rgba(251,191,36,0.9)]"
        />
      </div>

      {/* PHONG CÁCH 05 (TONE TRẮNG MINIMAL) */}
      {styleId === 'minimal' ? (
        <>
          <WhiteMinimalInvitation
            data={weddingData}
            wishes={wishes}
            onAddWish={handleAddWish}
            isMusicPlaying={isMusicPlaying}
            onToggleMusic={handleToggleMusic}
            guestName={guestName}
            onOpenAdmin={() => setIsAdminModalOpen(true)}
            onStartMusic={() => {
              if (!soundEngine.getIsPlaying()) {
                soundEngine.startMusic(0);
                setIsMusicPlaying(true);
              }
            }}
          />
          {!isLockedSingleStyle && (
            <ConceptSwitcherDock
              styleId={styleId}
              onSelectStyle={handleSelectStyle}
              isMusicPlaying={isMusicPlaying}
              onToggleMusic={handleToggleMusic}
              onReplayGate={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              data={weddingData}
              onUpdateData={setWeddingData}
              guestName={guestName}
              onUpdateGuestName={setGuestName}
              onResetDefault={handleResetDefault}
              hideStyleSwitcher={isLockedSingleStyle}
            />
          )}
        </>
      ) : styleId === 'garden' ? (
        /* PHONG CÁCH 06: FOREST EMERALD GARDEN (VIDEO 1 - ĐỨC & HẬU) */
        <>
          <GardenEmeraldInvitation
            data={weddingData}
            wishes={wishes}
            onAddWish={handleAddWish}
            isMusicPlaying={isMusicPlaying}
            onToggleMusic={handleToggleMusic}
            guestName={guestName}
            onOpenAdmin={() => setIsAdminModalOpen(true)}
            onStartMusic={() => {
              if (!soundEngine.getIsPlaying()) {
                soundEngine.startMusic(0);
                setIsMusicPlaying(true);
              }
            }}
          />
          {!isLockedSingleStyle && (
            <ConceptSwitcherDock
              styleId={styleId}
              onSelectStyle={handleSelectStyle}
              isMusicPlaying={isMusicPlaying}
              onToggleMusic={handleToggleMusic}
              onReplayGate={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              data={weddingData}
              onUpdateData={setWeddingData}
              guestName={guestName}
              onUpdateGuestName={setGuestName}
              onResetDefault={handleResetDefault}
              hideStyleSwitcher={isLockedSingleStyle}
            />
          )}
        </>
      ) : styleId === 'calla' ? (
        /* PHONG CÁCH 07: BURGUNDY CALLA LILY (VIDEO 2 - ĐỨC & HẬU) */
        <>
          <BurgundyCallaInvitation
            data={weddingData}
            wishes={wishes}
            onAddWish={handleAddWish}
            isMusicPlaying={isMusicPlaying}
            onToggleMusic={handleToggleMusic}
            guestName={guestName}
            onOpenAdmin={() => setIsAdminModalOpen(true)}
            onStartMusic={() => {
              if (!soundEngine.getIsPlaying()) {
                soundEngine.startMusic(0);
                setIsMusicPlaying(true);
              }
            }}
          />
          {!isLockedSingleStyle && (
            <ConceptSwitcherDock
              styleId={styleId}
              onSelectStyle={handleSelectStyle}
              isMusicPlaying={isMusicPlaying}
              onToggleMusic={handleToggleMusic}
              onReplayGate={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              data={weddingData}
              onUpdateData={setWeddingData}
              guestName={guestName}
              onUpdateGuestName={setGuestName}
              onResetDefault={handleResetDefault}
              hideStyleSwitcher={isLockedSingleStyle}
            />
          )}
        </>
      ) : (
        <>
          {/* LỚP 1: CẢNH 3D WEBGL THỜI GIAN THỰC (CẶP NHẪN CƯỚI VÀNG KIM 3D & THIÊN HÀ SAO 3D) */}
          <ThreeWeddingScene styleId={styleId} />

          {/* LỚP 2: ĐỘNG CƠ PHÁO HOA & HẠT BAY ĐẶC TRƯNG CHO TỪNG PHONG CÁCH */}
          <AmbientCanvas styleId={styleId} />

          {/* Màn hình Mở Thiệp Tự Động (8.8s) */}
          <OpeningGate
            isOpen={isGateOpen}
            onUnlock={handleUnlockGate}
            styleId={styleId}
            onSelectStyle={handleSelectStyle}
            data={weddingData}
            guestName={guestName}
            hideStyleSwitcher={isLockedSingleStyle}
            onOpenAdmin={() => setIsAdminModalOpen(true)}
          />

          {/* Nội dung chính với hiệu ứng 3D Scrollytelling tối ưu Mobile-First */}
          <main className="relative z-20">
            <HeroSection styleId={styleId} data={weddingData} guestName={guestName} />
            <CoupleSection styleId={styleId} data={weddingData} />
            <CountdownSection styleId={styleId} data={weddingData} />
            <EventsSection styleId={styleId} data={weddingData} />
            <LoveStorySection styleId={styleId} data={weddingData} />
            <GallerySection styleId={styleId} data={weddingData} />
            <RsvpWishesSection
              styleId={styleId}
              data={weddingData}
              wishes={wishes}
              onAddWish={handleAddWish}
              guestName={guestName}
            />
          </main>

          {/* Dynamic Island Music Player (5 bài hát thật) & Thanh Điều Khiển */}
          <ConceptSwitcherDock
            styleId={styleId}
            onSelectStyle={handleSelectStyle}
            isMusicPlaying={isMusicPlaying}
            onToggleMusic={handleToggleMusic}
            onReplayGate={() => setIsGateOpen(false)}
            data={weddingData}
            onUpdateData={setWeddingData}
            guestName={guestName}
            onUpdateGuestName={setGuestName}
            onResetDefault={handleResetDefault}
            hideStyleSwitcher={isLockedSingleStyle}
          />
        </>
      )}

      {/* Modal Quản Trị Khách Mời & RSVP (Mật khẩu: huyducdeptrai) */}
      <AdminGuestModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        wishes={wishes}
        onAddWish={handleAddWish}
        onUpdateWish={handleUpdateWish}
        onDeleteWish={handleDeleteWish}
      />
    </div>
  );
}

export default App;
