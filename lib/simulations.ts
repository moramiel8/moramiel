import items from "../data/shaul_big5_items.json" assert { type: "json" };


export type Item = { id: number; trait: string; valence: "חיובי"|"שלילי"; text: string };


// מחזיר \"סימולציה\" דטרמיניסטית ל-id נתון ע\"י seed
export function buildSimulation(simId: number, perPairs = 40) {
const rng = mulberry32(simId);
const pool = (items as Item[]).slice();
// ערבוב
for (let i=pool.length-1;i>0;i--){ const j=Math.floor(rng()* (i+1)); [pool[i], pool[j]]=[pool[j], pool[i]]; }
// בוחרים 80 היגדים -> 40 זוגות
const selected = pool.slice(0, perPairs*2);
const pairs = [] as { left: Item; right: Item }[];
for (let i=0; i<selected.length; i+=2) pairs.push({ left: selected[i], right: selected[i+1] });
return pairs;
}


function mulberry32(a:number){return function(){var t=a+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;}};