// lib/simulations.server.ts
import items from "../data/shaul_big5_items.json";

export type Item = { id: number; trait: string; valence: "חיובי"|"שלילי"; text: string };
export type Pair = { left: Item; right: Item };

export function buildSimulation(simId: number, perPairs = 40): Pair[] {
  const rng = mulberry32(simId);
  const pool = (items as Item[]).slice();
  // ערבוב דטרמיניסטי
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  // בחירת N*2 היגדים לזוגות
  const sel = pool.slice(0, perPairs * 2);
  const pairs: Pair[] = [];
  for (let i = 0; i < sel.length; i += 2) pairs.push({ left: sel[i], right: sel[i + 1] });
  return pairs;
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
