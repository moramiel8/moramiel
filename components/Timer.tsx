"use client";
import { useEffect, useState } from "react";

export default function Timer({ minutes = 60, onFinish }: { minutes?: number; onFinish: () => void }) {
  const [sec, setSec] = useState(minutes * 60);
  useEffect(() => {
    const id = setInterval(() => setSec((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => { if (sec === 0) onFinish(); }, [sec, onFinish]);

  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");

  return (
    // השתמש ב-classes שישתלבו עם הפונט הגלובלי; אם תרצה ניתן להוסיף size/weight
    <div className="text-lg font-medium text-slate-800">
      נותרו <span aria-live="polite" className="font-semibold">{m}:{s}</span> דקות
    </div>
  );
}
