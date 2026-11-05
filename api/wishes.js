import fs from 'node:fs';
import path from 'node:path';

const wishesFilePath = path.join(process.cwd(), 'data', 'wishes.json');
let memoryWishes = null;

function loadWishes() {
  if (memoryWishes) return memoryWishes;
  try {
    if (fs.existsSync(wishesFilePath)) {
      memoryWishes = JSON.parse(fs.readFileSync(wishesFilePath, 'utf-8'));
      return memoryWishes;
    }
  } catch {
    // ignore
  }
  memoryWishes = [];
  return memoryWishes;
}

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method === 'GET') {
    return res.status(200).json(loadWishes());
  }
  if (req.method === 'POST') {
    const wish = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const current = loadWishes();
    memoryWishes = [wish, ...current];
    try {
      fs.writeFileSync(wishesFilePath, JSON.stringify(memoryWishes, null, 2), 'utf-8');
    } catch {
      // On read-only serverless container, memoryWishes + client storage keeps it alive
    }
    return res.status(200).json(memoryWishes);
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
