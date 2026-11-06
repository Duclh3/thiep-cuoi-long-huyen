export type StyleId = 'fairytale' | 'editorial' | 'cinematic' | 'indochine' | 'minimal';

export interface ThemeConfig {
  id: StyleId;
  code: string;
  name: string;
  vietnameseName: string;
  tagline: string;
  badgeText: string;
  gateTitle: string;
  gateActionText: string;
  bgPrimary: string;
  bgSecondary: string;
  bgCard: string;
  textPrimary: string;
  textSecondary: string;
  textAccent: string;
  borderSubtle: string;
  borderAccent: string;
  btnPrimary: string;
  btnSecondary: string;
  accentHex: string;
  secondaryHex: string;
  confettiColors: string[];
  isDark: boolean;
}

export const THEMES: Record<StyleId, ThemeConfig> = {
  fairytale: {
    id: 'fairytale',
    code: '01',
    name: 'Fine Art Romance',
    vietnameseName: 'Thơ Mộng Fine Art',
    tagline: 'Phong bì sáp cánh bướm • Khung Polaroid • Cánh hoa 3D rơi',
    badgeText: 'FINE ART WEDDING • 28.11.2026',
    gateTitle: 'Thiệp Mời',
    gateActionText: 'Thiệp đang tự động mở dần...',
    bgPrimary: 'bg-[#FBF8F6]',
    bgSecondary: 'bg-[#F4EDE8]',
    bgCard: 'bg-white/92 backdrop-blur-xl',
    textPrimary: 'text-[#2E1F1C]',
    textSecondary: 'text-[#6E5650]',
    textAccent: 'text-[#7A283B]',
    borderSubtle: 'border-[#E8DBD5]',
    borderAccent: 'border-[#B88B7D]',
    btnPrimary: 'bg-gradient-to-r from-[#631D2C] via-[#80283B] to-[#4F1522] text-white shadow-lg shadow-rose-900/20',
    btnSecondary: 'border border-[#7A283B]/35 text-[#2E1F1C] hover:bg-[#F4EDE8]',
    accentHex: '#7A283B',
    secondaryHex: '#C5A059',
    confettiColors: ['#7A283B', '#D4AF37', '#F4ACB7', '#FFF8F0'],
    isDark: false,
  },
  editorial: {
    id: 'editorial',
    code: '02',
    name: 'Vogue Haute Couture',
    vietnameseName: 'Tạp Chí Vogue',
    tagline: 'Thời trang cao cấp • Bố cục bất đối xứng • Vàng Champagne',
    badgeText: 'VOGUE WEDDING EDITION • 28.11.2026',
    gateTitle: 'The Wedding Of',
    gateActionText: 'Thiệp đang tự động mở dần...',
    bgPrimary: 'bg-[#FAF6F0]',
    bgSecondary: 'bg-[#EFE7DA]',
    bgCard: 'bg-white/92 backdrop-blur-xl',
    textPrimary: 'text-[#181512]',
    textSecondary: 'text-[#5C5349]',
    textAccent: 'text-[#9E7B3B]',
    borderSubtle: 'border-[#E2D6C1]',
    borderAccent: 'border-[#C5A059]',
    btnPrimary: 'bg-[#181512] text-[#FAF6F0] hover:bg-[#9E7B3B] transition-colors shadow-lg',
    btnSecondary: 'border border-[#181512]/30 text-[#181512] hover:bg-[#181512] hover:text-white',
    accentHex: '#C5A059',
    secondaryHex: '#E6C687',
    confettiColors: ['#C5A059', '#181512', '#F5E1A4', '#D4AF37'],
    isDark: false,
  },
  cinematic: {
    id: 'cinematic',
    code: '03',
    name: 'Starlight & Fireworks',
    vietnameseName: 'Đêm Pháo Hoa 3D',
    tagline: 'Pháo hoa rực sáng • Bầu trời sao 3D • Điện ảnh huyền ảo',
    badgeText: 'STARLIGHT PREMIERE • LONG & HUYEN 2026',
    gateTitle: 'Đêm Hội Tình Yêu',
    gateActionText: 'Thiệp đang tự động mở dần...',
    bgPrimary: 'bg-[#0E0C0B]',
    bgSecondary: 'bg-[#171311]',
    bgCard: 'bg-[#211B18]/90 backdrop-blur-xl',
    textPrimary: 'text-[#FBF3EB]',
    textSecondary: 'text-[#C4B2A3]',
    textAccent: 'text-[#F0AD64]',
    borderSubtle: 'border-[#382E27]',
    borderAccent: 'border-[#F0AD64]/65',
    btnPrimary: 'bg-gradient-to-r from-[#E09F5A] via-[#F5C284] to-[#D4883E] text-[#14110F] font-semibold shadow-lg shadow-amber-500/25',
    btnSecondary: 'border border-[#F0AD64]/45 text-[#FBF3EB] hover:bg-[#F0AD64]/15',
    accentHex: '#F0AD64',
    secondaryHex: '#D9534F',
    confettiColors: ['#F0AD64', '#FFD700', '#FF6B8B', '#FFFFFF'],
    isDark: true,
  },
  indochine: {
    id: 'indochine',
    code: '04',
    name: 'Royal Indochine Palace',
    vietnameseName: 'Cung Đình Đông Dương',
    tagline: 'Sơn son thếp vàng • Ấn chương Song Hỷ 3D • Hoàng gia',
    badgeText: 'LỄ THÀNH HÔN & VU QUY • BÍNH NGỌ 2026',
    gateTitle: 'Song Hỷ Lâm Môn',
    gateActionText: 'Thiệp đang tự động mở dần...',
    bgPrimary: 'bg-[#4E0B10]',
    bgSecondary: 'bg-[#3B070B]',
    bgCard: 'bg-[#631017]/90 backdrop-blur-xl',
    textPrimary: 'text-[#FFF8EC]',
    textSecondary: 'text-[#E8CE9D]',
    textAccent: 'text-[#F7CE68]',
    borderSubtle: 'border-[#8C2830]',
    borderAccent: 'border-[#F7CE68]',
    btnPrimary: 'bg-gradient-to-r from-[#D4AF37] via-[#FCE181] to-[#C59B27] text-[#3B070B] font-bold shadow-lg shadow-amber-400/30',
    btnSecondary: 'border border-[#F7CE68]/55 text-[#FFF8EC] hover:bg-[#F7CE68]/15',
    accentHex: '#F7CE68',
    secondaryHex: '#D4AF37',
    confettiColors: ['#F7CE68', '#D4AF37', '#FF4D4D', '#FFF8EC'],
    isDark: true,
  },
  minimal: {
    id: 'minimal',
    code: '05',
    name: 'White Minimal Envelope',
    vietnameseName: 'Tone Trắng Minimal',
    tagline: 'Phong bì trắng sáp bướm • Lịch ảnh • Tinh tế tối giản',
    badgeText: 'THIỆP MỜI CƯỚI • 28.11.2026',
    gateTitle: 'Thiệp Mời',
    gateActionText: 'Nhấp để mở...',
    bgPrimary: 'bg-[#FAF8F5]',
    bgSecondary: 'bg-[#F4EFEA]',
    bgCard: 'bg-[#F5EFEA]',
    textPrimary: 'text-[#2B2523]',
    textSecondary: 'text-[#6E625C]',
    textAccent: 'text-[#5A1824]',
    borderSubtle: 'border-[#E6DDD4]',
    borderAccent: 'border-[#D5C7B8]',
    btnPrimary: 'bg-[#1C1C1C] text-white hover:bg-[#333333] shadow-md',
    btnSecondary: 'border border-[#2B2523] text-[#2B2523] hover:bg-[#2B2523] hover:text-white',
    accentHex: '#5A1824',
    secondaryHex: '#C5A059',
    confettiColors: ['#5A1824', '#D4AF37', '#F4ACB7', '#FFF8F0'],
    isDark: false,
  },
};

export interface CeremonyMilestone {
  id: string;
  badge: string;
  title: string;
  timeAndDateSolar: string;
  dateLunar: string;
  location: string;
  mapUrl: string;
  image: string;
  secondaryImage: string;
}

export interface PartyEventItem {
  id: string;
  type: 'groom' | 'bride';
  badge: string;
  title: string;
  address: string;
  timeText: string;
  dayOfWeek: string;
  dayMonth: string;
  year: string;
  lunarText: string;
  mapUrl: string;
  image: string;
}

export interface WishItem {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  attendance?: string;
}

export interface WeddingData {
  groom: {
    fullName: string;
    shortName: string;
    birthYear: string;
    avatar: string;
    secondaryPhoto: string;
  };
  bride: {
    fullName: string;
    shortName: string;
    birthYear: string;
    avatar: string;
    secondaryPhoto: string;
  };
  weddingDate: {
    isoDate: string;
    displayDate: string;
    dayOfWeek: string;
    day: string;
    month: string;
    year: string;
    lunarDate: string;
    heroHeadline: string;
    heroSubHeadline: string;
  };
  sectionImages: {
    hero: string;
    envelopePolaroid: string;
    kissPhoto: string;
    heroLeftFloat: string;
    heroRightFloat: string;
    countdown: string;
    loveStoryBg: string;
    wishesBg: string;
    thankYouBg: string;
  };
  groomQrGift: {
    roleLabel: string;
    qrImageUrl: string;
    accountHolder: string;
    accountNumber: string;
    bankBranch: string;
  };
  brideQrGift: {
    roleLabel: string;
    qrImageUrl: string;
    accountHolder: string;
    accountNumber: string;
    bankBranch: string;
  };
  sharedQrGift: {
    qrImageUrl: string;
    accountHolder: string;
    accountNumber: string;
    bankBranch: string;
  };
  partyEvents: PartyEventItem[];
  ceremonySection: {
    title: string;
    items: CeremonyMilestone[];
  };
  carousel3DImages: {
    id: string;
    url: string;
    caption: string;
  }[];
  album9Images: {
    id: string;
    url: string;
    alt: string;
  }[];
  thankYouText: {
    title: string;
    message: string;
  };
  initialWishes: WishItem[];
}

const BASE_URL = import.meta.env.BASE_URL || '/';
const imgPath = (p: string) => `${BASE_URL}${p.replace(/^\//, '')}`;

export const DEFAULT_WEDDING_DATA: WeddingData = {
  groom: {
    fullName: 'Cao Thành Long',
    shortName: 'Thành Long',
    birthYear: '2000',
    avatar: imgPath('/images/LVT08419.jpg'),
    secondaryPhoto: imgPath('/images/LVT07240.jpg'),
  },
  bride: {
    fullName: 'Mai Thanh Huyền',
    shortName: 'Thanh Huyền',
    birthYear: '2000',
    avatar: imgPath('/images/LVT08470.jpg'),
    secondaryPhoto: imgPath('/images/LVT07318.jpg'),
  },
  weddingDate: {
    isoDate: '2026-11-28T11:15:00',
    displayDate: '28.11.2026',
    dayOfWeek: 'Thứ Bảy',
    day: '28',
    month: 'Tháng 11',
    year: 'Năm 2026',
    lunarDate: 'Tức ngày 20 tháng 10 năm Bính Ngọ',
    heroHeadline: 'Ngày chung đôi',
    heroSubHeadline: 'Sự góp mặt của bạn chính là sự chúc phúc to lớn nhất!',
  },
  sectionImages: {
    hero: imgPath('/images/LVT07284.jpg'),
    envelopePolaroid: imgPath('/images/LVT07284.jpg'),
    kissPhoto: imgPath('/images/LVT07972.jpg'),
    heroLeftFloat: imgPath('/images/LVT07240.jpg'),
    heroRightFloat: imgPath('/images/LVT07318.jpg'),
    countdown: imgPath('/images/LVT08589.jpg'),
    loveStoryBg: imgPath('/images/LVT07908.jpg'),
    wishesBg: imgPath('/images/LVT08653.jpg'),
    thankYouBg: imgPath('/images/LVT08639.jpg'),
  },
  groomQrGift: {
    roleLabel: 'Mừng Cưới Nhà Trai • Chú Rể',
    qrImageUrl: imgPath('/images/qr-chu-re.png'),
    accountHolder: 'CAO THANH LONG',
    accountNumber: '2220182776868',
    bankBranch: 'MB Bank (Ngân hàng Quân Đội)',
  },
  brideQrGift: {
    roleLabel: 'Mừng Cưới Nhà Gái • Cô Dâu',
    qrImageUrl: imgPath('/images/qr-co-dau.png'),
    accountHolder: 'MAI THANH HUYEN',
    accountNumber: '2601112143',
    bankBranch: 'BIDV - PGD Lạc Long Quân',
  },
  sharedQrGift: {
    qrImageUrl: imgPath('/images/qr-co-dau.png'),
    accountHolder: 'MAI THANH HUYEN',
    accountNumber: '2601112143',
    bankBranch: 'BIDV - PGD Lạc Long Quân',
  },
  partyEvents: [
    {
      id: 'tiec-nha-trai',
      type: 'groom',
      badge: 'Nhà Trai • Bữa Cơm Thân Mật',
      title: 'Tiệc Cưới Nhà Trai',
      address: 'Tại Tư Gia - Thôn An Bình, xã Việt Tiến, tỉnh Hưng Yên',
      timeText: 'Vào lúc 16 giờ 30 phút',
      dayOfWeek: 'Thứ 6',
      dayMonth: '27/11',
      year: '2026',
      lunarText: 'Nhằm ngày 19 tháng 10 năm Bính Ngọ',
      mapUrl: 'https://maps.app.goo.gl/WDerErbiJRg7TZNJ6?g_st=ic',
      image: imgPath('/images/LVT08736.jpg'),
    },
    {
      id: 'tiec-nha-gai',
      type: 'bride',
      badge: 'Nhà Gái • Bữa Cơm Thân Mật',
      title: 'Tiệc Cưới Nhà Gái',
      address: 'Tại Tư Gia - Xóm 16, thôn Bãi Sậy 2, xã Triệu Việt Vương, tỉnh Hưng Yên',
      timeText: 'Vào lúc 17 giờ 00 phút',
      dayOfWeek: 'Thứ 6',
      dayMonth: '27/11',
      year: '2026',
      lunarText: 'Nhằm ngày 19 tháng 10 năm Bính Ngọ',
      mapUrl: 'https://maps.app.goo.gl/jdfuUia47BASgpRA9?g_st=ic',
      image: imgPath('/images/LVT08570.jpg'),
    },
  ],
  ceremonySection: {
    title: 'Ngày nên duyên',
    items: [
      {
        id: 'le-vu-quy',
        badge: 'Nghi Lễ Nhà Gái • 11:15 Sáng',
        title: 'Lễ Vu Quy',
        timeAndDateSolar: 'Thứ 7, 11h15 ngày 28/11/2026',
        dateLunar: 'Tức ngày 20 tháng 10 năm Bính Ngọ',
        location: 'Tại Tư Gia Nhà Gái - Xóm 16, thôn Bãi Sậy 2, xã Triệu Việt Vương, tỉnh Hưng Yên',
        mapUrl: 'https://maps.app.goo.gl/jdfuUia47BASgpRA9?g_st=ic',
        image: imgPath('/images/LVT07972.jpg'),
        secondaryImage: imgPath('/images/LVT07604.jpg'),
      },
      {
        id: 'le-thanh-hon',
        badge: 'Nghi Lễ Nhà Trai • 13:05 Chiều',
        title: 'Lễ Thành Hôn',
        timeAndDateSolar: 'Thứ 7, 13h05 ngày 28/11/2026',
        dateLunar: 'Tức ngày 20 tháng 10 năm Bính Ngọ',
        location: 'Tại Tư Gia Nhà Trai - Thôn An Bình, xã Việt Tiến, tỉnh Hưng Yên',
        mapUrl: 'https://maps.app.goo.gl/WDerErbiJRg7TZNJ6?g_st=ic',
        image: imgPath('/images/LVT08013.jpg'),
        secondaryImage: imgPath('/images/LVT08362.jpg'),
      },
    ],
  },
  carousel3DImages: [
    { id: 'c1', url: imgPath('/images/LVT07240.jpg'), caption: 'Khoảnh khắc định mệnh' },
    { id: 'c2', url: imgPath('/images/LVT07318.jpg'), caption: 'Nắm tay đi hết cuộc đời' },
    { id: 'c3', url: imgPath('/images/LVT08362.jpg'), caption: 'Khúc giao hưởng tình yêu' },
    { id: 'c4', url: imgPath('/images/LVT07604.jpg'), caption: 'Ánh mắt trao trọn vẹn' },
    { id: 'c5', url: imgPath('/images/LVT07638.jpg'), caption: 'Nụ cười ngày nắng ấm' },
    { id: 'c6', url: imgPath('/images/LVT08535.jpg'), caption: 'Lời hẹn ước trăm năm' },
    { id: 'c7', url: imgPath('/images/LVT08030.jpg'), caption: 'Bình yên bên người thương' },
    { id: 'c8', url: imgPath('/images/LVT07284.jpg'), caption: 'Ngày chung đôi hạnh phúc' },
  ],
  album9Images: [
    { id: 'alb-1', url: imgPath('/images/LVT07562.jpg'), alt: 'Thành Long & Thanh Huyền - Ảnh 1' },
    { id: 'alb-2', url: imgPath('/images/LVT07482.jpg'), alt: 'Thành Long & Thanh Huyền - Ảnh 2' },
    { id: 'alb-3', url: imgPath('/images/LVT07617.jpg'), alt: 'Thành Long & Thanh Huyền - Ảnh 3' },
    { id: 'alb-4', url: imgPath('/images/LVT07933.jpg'), alt: 'Thành Long & Thanh Huyền - Ảnh 4' },
    { id: 'alb-5', url: imgPath('/images/LVT07972.jpg'), alt: 'Thành Long & Thanh Huyền - Ảnh 5' },
    { id: 'alb-6', url: imgPath('/images/LVT07996.jpg'), alt: 'Thành Long & Thanh Huyền - Ảnh 6' },
    { id: 'alb-7', url: imgPath('/images/LVT08282.jpg'), alt: 'Thành Long & Thanh Huyền - Ảnh 7' },
    { id: 'alb-8', url: imgPath('/images/LVT08529.jpg'), alt: 'Thành Long & Thanh Huyền - Ảnh 8' },
    { id: 'alb-9', url: imgPath('/images/LVT08216.jpg'), alt: 'Thành Long & Thanh Huyền - Ảnh 9' },
  ],
  thankYouText: {
    title: 'Thank you!',
    message:
      'Sự xuất hiện của bạn sẽ làm cho ngày cưới của chúng mình trở nên đặc biệt hơn bao giờ hết. Chúng mình rất mong được đón tiếp bạn trong ngày trọng đại, để cùng nhau chứng kiến và sẻ chia niềm hạnh phúc trọn vẹn.',
  },
  initialWishes: [],
};
