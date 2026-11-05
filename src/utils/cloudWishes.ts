import { WishItem } from '../data/weddingData';

const KV_APP_KEY = 'emhu1twl';
const KV_BASE = `https://keyvalue.immanuel.co/api/KeyVal`;

function toBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(b64url: string): string {
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/');
  const pad = b64.length % 4 === 0 ? '' : '='.repeat(4 - (b64.length % 4));
  const binary = atob(b64 + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

async function kvGet(key: string): Promise<string | null> {
  try {
    const res = await fetch(`${KV_BASE}/GetValue/${KV_APP_KEY}/${key}`);
    if (!res.ok) return null;
    const val = await res.json();
    return typeof val === 'string' && val.length > 0 ? val : null;
  } catch {
    return null;
  }
}

async function kvSet(key: string, val: string): Promise<boolean> {
  try {
    const res = await fetch(`${KV_BASE}/UpdateValue/${KV_APP_KEY}/${key}/${val}`, {
      method: 'POST',
      body: '',
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Đọc toàn bộ lời chúc đã lưu trên Cloud KV (phục vụ cho cả 4 link GitHub Pages)
 */
export async function fetchCloudWishes(): Promise<WishItem[]> {
  try {
    const countStr = await kvGet('w_cnt');
    const count = countStr ? parseInt(countStr, 10) : 0;
    if (!count || isNaN(count) || count <= 0) return [];

    const maxToFetch = Math.min(count, 40);
    const promises: Promise<WishItem | null>[] = [];

    for (let i = count; i > count - maxToFetch && i >= 1; i--) {
      promises.push(
        (async () => {
          const [n, m1, m2, t] = await Promise.all([
            kvGet(`w_${i}_n`),
            kvGet(`w_${i}_m1`),
            kvGet(`w_${i}_m2`),
            kvGet(`w_${i}_t`),
          ]);
          if (!n || !m1) return null;
          const fullB64Msg = m2 && m2 !== 'NONE' ? m1 + m2 : m1;
          return {
            id: `cloud-wish-${i}`,
            name: fromBase64Url(n),
            message: fromBase64Url(fullB64Msg),
            createdAt: t ? fromBase64Url(t) : 'Hôm nay',
          };
        })()
      );
    }

    const items = await Promise.all(promises);
    return items.filter((x): x is WishItem => x !== null);
  } catch {
    return [];
  }
}

/**
 * Lưu lời chúc mới lên Cloud KV để mọi người vào bất kỳ link nào trong 4 link đều thấy
 */
export async function saveCloudWish(wish: WishItem): Promise<void> {
  try {
    const countStr = await kvGet('w_cnt');
    const currentCount = countStr ? parseInt(countStr, 10) : 0;
    const nextIdx = (isNaN(currentCount) ? 0 : currentCount) + 1;

    const nameB64 = toBase64Url(wish.name.slice(0, 60));
    const msgB64 = toBase64Url(wish.message.slice(0, 220));
    const part1 = msgB64.slice(0, 140);
    const part2 = msgB64.length > 140 ? msgB64.slice(140, 280) : 'NONE';
    const timeB64 = toBase64Url(wish.createdAt.slice(0, 35));

    await Promise.all([
      kvSet(`w_${nextIdx}_n`, nameB64),
      kvSet(`w_${nextIdx}_m1`, part1),
      kvSet(`w_${nextIdx}_m2`, part2),
      kvSet(`w_${nextIdx}_t`, timeB64),
    ]);
    await kvSet('w_cnt', String(nextIdx));
  } catch {
    // Fallback localStorage vẫn hoạt động
  }
}
