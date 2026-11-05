export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  src: string;
}

const BASE_URL = import.meta.env.BASE_URL || '/';
const withBase = (p: string) => `${BASE_URL}${p.replace(/^\//, '')}`;

export const WEDDING_PLAYLIST: SongTrack[] = [
  {
    id: 'le-duong',
    title: 'Lễ Đường',
    artist: 'Kai Đinh',
    src: withBase('/music/le-duong.mp3'),
  },
  {
    id: 'em-dong-y',
    title: 'Em Đồng Ý (I Do)',
    artist: 'Đức Phúc ft. 911',
    src: withBase('/music/em-dong-y.mp3'),
  },
  {
    id: 'vay-cuoi',
    title: 'Váy Cưới',
    artist: 'Erik',
    src: withBase('/music/vay-cuoi.mp3'),
  },
  {
    id: 'the-gioi-cua-anh',
    title: 'Thế Giới Của Anh',
    artist: 'buitruonglinh, Dương Domic, CongB, Wean',
    src: withBase('/music/the-gioi-cua-anh.mp3'),
  },
  {
    id: 'mot-doi',
    title: 'Một Đời',
    artist: '14 Casper & Bon Nghiêm',
    src: withBase('/music/mot-doi.mp3'),
  },
];

type Listener = (state: { isPlaying: boolean; currentIndex: number; track: SongTrack }) => void;

class WeddingPlaylistEngine {
  private audio: HTMLAudioElement | null = null;
  private currentIndex = 0;
  private isPlaying = false;
  private listeners: Set<Listener> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.audio = new Audio(WEDDING_PLAYLIST[0].src);
      this.audio.preload = 'auto';
      this.audio.volume = 0.75;

      this.audio.addEventListener('ended', () => {
        this.nextTrack(true);
      });
    }
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener({
      isPlaying: this.isPlaying,
      currentIndex: this.currentIndex,
      track: WEDDING_PLAYLIST[this.currentIndex],
    });
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state = {
      isPlaying: this.isPlaying,
      currentIndex: this.currentIndex,
      track: WEDDING_PLAYLIST[this.currentIndex],
    };
    this.listeners.forEach((fn) => fn(state));
  }

  public getCurrentTrack(): SongTrack {
    return WEDDING_PLAYLIST[this.currentIndex];
  }

  public getCurrentIndex(): number {
    return this.currentIndex;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public async startMusic(index?: number) {
    if (!this.audio) return;
    if (typeof index === 'number' && index >= 0 && index < WEDDING_PLAYLIST.length) {
      if (this.currentIndex !== index) {
        this.currentIndex = index;
        this.audio.src = WEDDING_PLAYLIST[this.currentIndex].src;
      }
    }
    try {
      await this.audio.play();
      this.isPlaying = true;
      this.notify();
    } catch {
      this.isPlaying = false;
      this.notify();
    }
  }

  public stopMusic() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    this.notify();
  }

  public toggleMusic(): boolean {
    if (this.isPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public nextTrack(autoPlay = true) {
    this.currentIndex = (this.currentIndex + 1) % WEDDING_PLAYLIST.length;
    if (this.audio) {
      this.audio.src = WEDDING_PLAYLIST[this.currentIndex].src;
      if (autoPlay || this.isPlaying) {
        this.audio.play().then(() => {
          this.isPlaying = true;
          this.notify();
        }).catch(() => {
          this.notify();
        });
      } else {
        this.notify();
      }
    }
  }

  public prevTrack() {
    this.currentIndex = (this.currentIndex - 1 + WEDDING_PLAYLIST.length) % WEDDING_PLAYLIST.length;
    if (this.audio) {
      this.audio.src = WEDDING_PLAYLIST[this.currentIndex].src;
      if (this.isPlaying) {
        this.audio.play().catch(() => {});
      }
      this.notify();
    }
  }

  public selectTrack(index: number) {
    if (index < 0 || index >= WEDDING_PLAYLIST.length) return;
    this.startMusic(index);
  }

  public playOpenChime() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 1.25);
        }, idx * 80);
      });
    } catch {
      // Ignore audio context restriction
    }
  }
}

export const soundEngine = new WeddingPlaylistEngine();
