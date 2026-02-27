import type { Item } from "./simulations";


export type Tally = Record<string, number>;


export function tallyChoices(choices: { side: "left"|"right"; pair: {left: Item; right: Item} }[]): Tally {
const t: Tally = {};
for (const {side, pair} of choices){
const chosen = side === "left" ? pair.left : pair.right;
t[chosen.trait] = (t[chosen.trait] ?? 0) + 1 * (chosen.valence === "חיובי" ? 1 : 0.9);
}
return t;
}


export function toReport(t: Tally){
const traits = Object.keys(t);
const max = Math.max(...traits.map(k=>t[k]));
const norm = Object.fromEntries(traits.map(k=>[k, +( (t[k]/max)*6 ).toFixed(1) ])); // 1..6 מדרג פנימי
return {
norm,
tips: Object.entries(norm).map(([trait, score]) => ({ trait, score, advice: adviceFor(trait, score) }))
};
}


function adviceFor(trait:string, score:number){
const hi = score >= 4.5;
switch(trait){
case "מצפוניות": return hi? "המשכ/י בשגרות קבועות והצבת אבני דרך." : "הגדל/י עקביות: צ\"ק ליסט יומי, סגירת מסיחים, מועד קבוע לסקירה.";
case "נעימות": return hi? "שמר/י על גבולות בריאים תוך הקשבה." : "תרגל/י הקשבה פעילה וסיכום בע\"פ בסוף שיחה.";
case "מוחצנות": return hi? "נצלי אנרגיה להובלה רכה." : "תרגל/י הבעה קצרה וברורה בפגישות קטנות.";
case "פתיחות מחשבתית": return hi? "המשך/י לנסות זוויות חדשות." : "בחר/י חומר חדש קצר כל יום (5 דק\") להרחבת חשיבה.";
case "יציבות רגשית": return hi? "כלי נשימה/רפלקציה קצרים ישמרו ביציבות." : "עצור/י \"דקה לשקט\" לפני בחירה; נהלי \"אם-אז\" ללחץ.";
default: return "";
}
}