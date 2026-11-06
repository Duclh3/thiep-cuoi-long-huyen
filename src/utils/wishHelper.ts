import { WishItem } from '../data/weddingData';

export type AttendanceStatus = 'yes' | 'no' | 'maybe';

export interface CleanedWish extends WishItem {
  cleanMessage: string;
  attendanceStatus: AttendanceStatus;
  attendanceText: string;
}

/**
 * Phân tích và làm sạch lời chúc:
 * Tách riêng nội dung lời chúc thuần túy và trạng thái tham dự (RSVP).
 * Tuyệt đối không để lộ trạng thái tham dự ở phần hiển thị lời chúc công khai!
 */
export function parseWishItem(wish: WishItem): CleanedWish {
  const rawMsg = wish.message || '';
  const explicitAttendance = wish.attendance?.trim();

  // Kiểm tra đuôi " — [...]" trong lời chúc cũ nếu có
  const bracketMatch = rawMsg.match(/\s*—\s*\[(.*?)\]\s*$/);
  const inlineAttendance = bracketMatch ? bracketMatch[1].trim() : '';

  // Nội dung lời chúc sạch (đã cắt bỏ phần [Có tham dự...] nếu có)
  const cleanMessage = bracketMatch
    ? rawMsg.replace(bracketMatch[0], '').trim()
    : rawMsg.trim();

  const finalAttendanceText =
    explicitAttendance || inlineAttendance || 'Có, chắc chắn mình sẽ tham dự!';

  let attendanceStatus: AttendanceStatus = 'yes';
  const lower = finalAttendanceText.toLowerCase();
  if (lower.includes('bận') || lower.includes('không') || lower.includes('tiếc')) {
    attendanceStatus = 'no';
  } else if (lower.includes('sắp xếp') || lower.includes('chưa')) {
    attendanceStatus = 'maybe';
  } else {
    attendanceStatus = 'yes';
  }

  return {
    ...wish,
    cleanMessage: cleanMessage || 'Chúc hai bạn trăm năm hạnh phúc!',
    attendance: finalAttendanceText,
    attendanceStatus,
    attendanceText: finalAttendanceText,
  };
}
