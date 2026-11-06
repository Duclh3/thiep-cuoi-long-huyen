import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Unlock,
  Users,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Search,
  Edit3,
  Trash2,
  X,
  Download,
  Plus,
  Save,
  LogOut,
  AlertTriangle,
} from 'lucide-react';
import { WishItem } from '../data/weddingData';
import { parseWishItem, AttendanceStatus, CleanedWish } from '../utils/wishHelper';

interface AdminGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishes: WishItem[];
  onAddWish: (wish: WishItem) => void;
  onUpdateWish: (wish: WishItem) => void;
  onDeleteWish: (id: string) => void;
}

const ADMIN_PASSWORD = 'huyducdeptrai';
const AUTH_STORAGE_KEY = 'wedding_admin_auth_v1';

export const AdminGuestModal: React.FC<AdminGuestModalProps> = ({
  isOpen,
  onClose,
  wishes,
  onAddWish,
  onUpdateWish,
  onDeleteWish,
}) => {
  // Trạng thái đăng nhập: Đọc từ sessionStorage
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    }
    return false;
  });

  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Bộ lọc & tìm kiếm
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | AttendanceStatus>('all');

  // Trạng thái modal con: Sửa khách hoặc Thêm khách
  const [editingWish, setEditingWish] = useState<CleanedWish | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestAttendance, setNewGuestAttendance] = useState('Có, chắc chắn mình sẽ tham dự!');
  const [newGuestMessage, setNewGuestMessage] = useState('Chúc hai bạn trăm năm hạnh phúc!');

  // Form edit
  const [editName, setEditName] = useState('');
  const [editAttendance, setEditAttendance] = useState('');
  const [editMessage, setEditMessage] = useState('');

  // Xác nhận xóa
  const [wishToDelete, setWishToDelete] = useState<CleanedWish | null>(null);

  // Phân tích toàn bộ danh sách khách mời
  const parsedWishes: CleanedWish[] = useMemo(() => {
    return wishes.map(parseWishItem);
  }, [wishes]);

  // Thống kê nhanh
  const stats = useMemo(() => {
    let yesCount = 0;
    let noCount = 0;
    let maybeCount = 0;

    parsedWishes.forEach((w) => {
      if (w.attendanceStatus === 'yes') yesCount++;
      else if (w.attendanceStatus === 'no') noCount++;
      else maybeCount++;
    });

    return {
      total: parsedWishes.length,
      yesCount,
      noCount,
      maybeCount,
    };
  }, [parsedWishes]);

  // Danh sách sau khi lọc & tìm kiếm
  const filteredList = useMemo(() => {
    return parsedWishes.filter((item) => {
      const matchSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.cleanMessage.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'all' || item.attendanceStatus === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [parsedWishes, searchQuery, statusFilter]);

  // Xử lý đăng nhập
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError('');
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
    } else {
      setLoginError('Mật khẩu quản trị chưa chính xác. Vui lòng thử lại!');
    }
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  };

  // Mở modal sửa
  const handleStartEdit = (item: CleanedWish) => {
    setEditingWish(item);
    setEditName(item.name);
    setEditAttendance(item.attendanceText);
    setEditMessage(item.cleanMessage);
  };

  // Lưu sửa đổi
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWish || !editName.trim()) return;

    const updatedItem: WishItem = {
      id: editingWish.id,
      name: editName.trim(),
      message: editMessage.trim(),
      attendance: editAttendance.trim(),
      createdAt: editingWish.createdAt,
    };

    onUpdateWish(updatedItem);
    setEditingWish(null);
  };

  // Lưu thêm mới
  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;

    const now = new Date();
    const formattedTime = `${now.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    })} • ${now.toLocaleDateString('vi-VN')}`;

    const newItem: WishItem = {
      id: `wish-${Date.now()}`,
      name: newGuestName.trim(),
      message: newGuestMessage.trim() || 'Chúc hai bạn trăm năm hạnh phúc!',
      attendance: newGuestAttendance.trim(),
      createdAt: formattedTime,
    };

    onAddWish(newItem);
    setIsAddingNew(false);
    setNewGuestName('');
    setNewGuestMessage('Chúc hai bạn trăm năm hạnh phúc!');
  };

  // Xác nhận và thực hiện xóa
  const handleConfirmDelete = () => {
    if (!wishToDelete) return;
    onDeleteWish(wishToDelete.id);
    setWishToDelete(null);
  };

  // Xuất file CSV danh sách khách
  const handleExportCSV = () => {
    if (parsedWishes.length === 0) {
      alert('Chưa có dữ liệu khách mời để xuất file.');
      return;
    }

    const headers = ['STT', 'Tên khách mời', 'Trạng thái tham dự', 'Thời gian gửi', 'Lời chúc'];
    const rows = parsedWishes.map((w, idx) => [
      idx + 1,
      `"${w.name.replace(/"/g, '""')}"`,
      `"${w.attendanceText.replace(/"/g, '""')}"`,
      `"${w.createdAt.replace(/"/g, '""')}"`,
      `"${w.cleanMessage.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Danh-Sach-Khach-Moi-Long-Huyen-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Nền mờ Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#1A1816] border border-amber-500/30 text-stone-100 shadow-[0_25px_70px_rgba(0,0,0,0.85)] z-10 overflow-hidden"
        >
          {/* Header Modal */}
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-stone-900/80">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300">
                {isAuthenticated ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              </div>
              <div>
                <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-amber-200">
                  Quản Trị Khách Mời &amp; RSVP
                </h3>
                <p className="text-[11px] text-stone-400">
                  {isAuthenticated
                    ? 'Thành Long & Mai Huyền • Bảng điều khiển Admin'
                    : 'Khu vực quản trị dành riêng cho dâu rể'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={handleLogout}
                  title="Đăng xuất"
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-rose-300 hover:text-rose-100 hover:bg-rose-500/20 border border-rose-500/30 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Đăng xuất</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer p-2 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition-colors"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {!isAuthenticated ? (
              /* =========================================================================
                 MÀN HÌNH ĐĂNG NHẬP ADMIN (MẬT KHẨU: huyducdeptrai)
                 ========================================================================= */
              <div className="py-8 max-w-sm mx-auto text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 mb-4 shadow-lg shadow-amber-500/10">
                  <Lock className="w-7 h-7" />
                </div>
                <h4 className="font-serif-luxury text-xl font-semibold text-amber-100 mb-1">
                  Đăng Nhập Quản Trị Viên
                </h4>
                <p className="text-xs text-stone-400 mb-6">
                  Vui lòng nhập mật khẩu quản trị để truy cập và quản lý danh sách khách mời.
                </p>

                <form onSubmit={handleLogin} className="space-y-3.5 text-left">
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-stone-400 mb-1.5">
                      Mật khẩu quản trị
                    </label>
                    <input
                      type="password"
                      autoFocus
                      required
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        setLoginError('');
                      }}
                      placeholder="Nhập mật khẩu..."
                      className="w-full rounded-xl border border-white/20 bg-stone-900/90 px-4 py-3 text-sm text-amber-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-400 shadow-inner"
                    />
                  </div>

                  {loginError && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/25 rounded-lg px-3 py-2"
                    >
                      {loginError}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    className="cursor-pointer w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-stone-950 font-semibold text-sm hover:brightness-110 transition-all shadow-lg shadow-amber-500/20"
                  >
                    Đăng Nhập
                  </button>
                </form>
              </div>
            ) : (
              /* =========================================================================
                 DASHBOARD QUẢN TRỊ ADMIN (KHI ĐÃ ĐĂNG NHẬP THÀNH CÔNG)
                 ========================================================================= */
              <>
                {/* 1. Hàng Thống Kê 4 Thẻ KPI */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-stone-400 text-xs mb-1">
                      <Users className="w-3.5 h-3.5 text-amber-300" />
                      <span>Tổng phản hồi</span>
                    </div>
                    <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-amber-200">
                      {stats.total}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-emerald-300 text-xs mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Có tham dự</span>
                    </div>
                    <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-emerald-300">
                      {stats.yesCount}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-rose-300 text-xs mb-1">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Không tham dự</span>
                    </div>
                    <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-rose-300">
                      {stats.noCount}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-amber-300 text-xs mb-1">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Đang sắp xếp</span>
                    </div>
                    <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-amber-300">
                      {stats.maybeCount}
                    </span>
                  </div>
                </div>

                {/* 2. Thanh Công Cụ: Tìm kiếm, Bộ lọc và Các Nút Hành Động */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                  {/* Ô tìm kiếm */}
                  <div className="relative flex-1 max-w-sm">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm kiếm theo tên hoặc lời chúc..."
                      className="w-full rounded-xl border border-white/15 bg-stone-900/90 pl-9 pr-3 py-2 text-xs sm:text-sm text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Nút Xuất Excel & Thêm Khách */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingNew(true)}
                      className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-medium transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thêm khách</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleExportCSV}
                      className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-stone-200 text-xs font-medium transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Xuất Excel/CSV</span>
                    </button>
                  </div>
                </div>

                {/* 3. Tab Lọc Trạng Thái */}
                <div className="flex items-center gap-1.5 border-b border-white/10 pb-2 text-xs overflow-x-auto">
                  <button
                    type="button"
                    onClick={() => setStatusFilter('all')}
                    className={`cursor-pointer px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                      statusFilter === 'all'
                        ? 'bg-amber-300 text-stone-950 font-bold'
                        : 'text-stone-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Tất cả ({parsedWishes.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('yes')}
                    className={`cursor-pointer px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                      statusFilter === 'yes'
                        ? 'bg-emerald-400 text-stone-950 font-bold'
                        : 'text-stone-400 hover:text-emerald-300 hover:bg-white/5'
                    }`}
                  >
                    Có tham dự ({stats.yesCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('no')}
                    className={`cursor-pointer px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                      statusFilter === 'no'
                        ? 'bg-rose-400 text-stone-950 font-bold'
                        : 'text-stone-400 hover:text-rose-300 hover:bg-white/5'
                    }`}
                  >
                    Không tham dự ({stats.noCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('maybe')}
                    className={`cursor-pointer px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                      statusFilter === 'maybe'
                        ? 'bg-amber-400 text-stone-950 font-bold'
                        : 'text-stone-400 hover:text-amber-300 hover:bg-white/5'
                    }`}
                  >
                    Đang sắp xếp ({stats.maybeCount})
                  </button>
                </div>

                {/* 4. Danh Sách Khách Mời */}
                {filteredList.length === 0 ? (
                  <div className="py-12 text-center text-stone-400 text-xs">
                    Không tìm thấy khách mời nào phù hợp với bộ lọc hiện tại.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {filteredList.map((item) => {
                      const isYes = item.attendanceStatus === 'yes';
                      const isNo = item.attendanceStatus === 'no';

                      return (
                        <div
                          key={item.id}
                          className="rounded-2xl bg-white/5 hover:bg-white/[0.08] border border-white/10 p-3.5 sm:p-4 transition-all"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2">
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <span className="font-serif-luxury italic text-base sm:text-lg font-bold text-amber-200">
                                {item.name}
                              </span>

                              {/* Badge Trạng thái RSVP */}
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                                  isYes
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : isNo
                                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                }`}
                              >
                                {isYes ? (
                                  <CheckCircle2 className="w-3 h-3" />
                                ) : isNo ? (
                                  <XCircle className="w-3 h-3" />
                                ) : (
                                  <HelpCircle className="w-3 h-3" />
                                )}
                                <span>{item.attendanceText}</span>
                              </span>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-auto">
                              <span className="text-[10px] text-stone-400">{item.createdAt}</span>

                              <button
                                type="button"
                                onClick={() => handleStartEdit(item)}
                                className="cursor-pointer p-1.5 rounded-lg bg-white/10 hover:bg-amber-400/20 text-stone-300 hover:text-amber-200 transition-colors"
                                title="Sửa thông tin khách"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => setWishToDelete(item)}
                                className="cursor-pointer p-1.5 rounded-lg bg-white/10 hover:bg-rose-500/20 text-stone-300 hover:text-rose-300 transition-colors"
                                title="Xóa khách mời này"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <p className="font-serif-italic text-xs sm:text-sm text-stone-200 leading-relaxed bg-black/20 rounded-xl p-2.5 border border-white/5">
                            “{item.cleanMessage}”
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* =========================================================================
          MODAL CON 1: SỬA THÔNG TIN KHÁCH MỜI
          ========================================================================= */}
      {editingWish && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setEditingWish(null)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md rounded-2xl bg-stone-900 border border-amber-500/40 p-5 text-stone-100 shadow-2xl z-10"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h4 className="font-serif-luxury text-lg font-bold text-amber-200 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-amber-400" />
                <span>Sửa Thông Tin Khách Mời</span>
              </h4>
              <button
                type="button"
                onClick={() => setEditingWish(null)}
                className="cursor-pointer text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-stone-400 mb-1 font-medium">Tên khách mời:</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-stone-800 px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-medium">
                  Trạng thái tham dự (RSVP):
                </label>
                <select
                  value={editAttendance}
                  onChange={(e) => setEditAttendance(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-stone-800 px-3.5 py-2.5 text-amber-200 focus:outline-none focus:border-amber-400 text-sm"
                >
                  <option value="Có, chắc chắn mình sẽ tham dự!">
                    Có, chắc chắn mình sẽ tham dự!
                  </option>
                  <option value="Mình bận mất rồi, xin gửi lời chúc hạnh phúc!">
                    Mình bận mất rồi, xin gửi lời chúc hạnh phúc!
                  </option>
                  <option value="Đang sắp xếp thời gian">Đang sắp xếp thời gian</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-medium">Lời chúc:</label>
                <textarea
                  rows={3}
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-stone-800 p-3 text-stone-100 focus:outline-none focus:border-amber-400 resize-none text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingWish(null)}
                  className="cursor-pointer px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-stone-300 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Lưu Thay Đổi</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* =========================================================================
          MODAL CON 2: THÊM KHÁCH MỜI MỚI THỦ CÔNG
          ========================================================================= */}
      {isAddingNew && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsAddingNew(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md rounded-2xl bg-stone-900 border border-amber-500/40 p-5 text-stone-100 shadow-2xl z-10"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h4 className="font-serif-luxury text-lg font-bold text-amber-200 flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Thêm Khách Mời Mới</span>
              </h4>
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="cursor-pointer text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNew} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-stone-400 mb-1 font-medium">Tên khách mời:</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Anh Nam & Chị Trang"
                  value={newGuestName}
                  onChange={(e) => setNewGuestName(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-stone-800 px-3.5 py-2.5 text-stone-100 focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-medium">
                  Trạng thái tham dự:
                </label>
                <select
                  value={newGuestAttendance}
                  onChange={(e) => setNewGuestAttendance(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-stone-800 px-3.5 py-2.5 text-amber-200 focus:outline-none focus:border-amber-400 text-sm"
                >
                  <option value="Có, chắc chắn mình sẽ tham dự!">
                    Có, chắc chắn mình sẽ tham dự!
                  </option>
                  <option value="Mình bận mất rồi, xin gửi lời chúc hạnh phúc!">
                    Mình bận mất rồi, xin gửi lời chúc hạnh phúc!
                  </option>
                  <option value="Đang sắp xếp thời gian">Đang sắp xếp thời gian</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-400 mb-1 font-medium">Ghi chú / Lời chúc:</label>
                <textarea
                  rows={2}
                  value={newGuestMessage}
                  onChange={(e) => setNewGuestMessage(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-stone-800 p-3 text-stone-100 focus:outline-none focus:border-amber-400 resize-none text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="cursor-pointer px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-stone-300 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm Vào Danh Sách</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* =========================================================================
          MODAL CON 3: XÁC NHẬN XÓA KHÁCH MỜI
          ========================================================================= */}
      {wishToDelete && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setWishToDelete(null)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-sm rounded-2xl bg-stone-900 border border-rose-500/40 p-5 text-stone-100 shadow-2xl z-10 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="font-serif-luxury text-lg font-bold text-stone-100 mb-1">
              Xác Nhận Xóa
            </h4>
            <p className="text-xs text-stone-300 mb-4">
              Bạn có chắc chắn muốn xóa khách mời{' '}
              <strong className="text-amber-300">"{wishToDelete.name}"</strong> khỏi danh sách không?
              Thao tác này không thể hoàn tác.
            </p>

            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setWishToDelete(null)}
                className="cursor-pointer px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-stone-300 text-xs transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xác Nhận Xóa</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
