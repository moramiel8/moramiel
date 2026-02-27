//components/feedback/ScoringAccordion.tsx

"use client";

import { useState } from "react";

export default function ScoringAccordion() {
  const [open, setOpen] = useState(false);

  return (
    <div className="card p-6 rounded-2xl border border-slate-200 shadow-sm">
      
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="font-semibold">
          כיצד מחושבים הציונים והמדדים?
        </h3>
        <span className="text-sm text-slate-500">
          {open ? "סגור" : "פתח"}
        </span>
      </button>

      {open && (
        <div className="mt-4 space-y-4 text-sm text-slate-600 leading-relaxed">
          
          <div>
            <h4 className="font-bold mb-1 ">חישוב הציונים</h4>
            <p>
              בכל סימולציה נספר מספר הבחירות המשויכות לכל אחת מחמש התכונות.
              הציון מוצג בטווח 0-50 ומשקף את העוצמה היחסית של אותה תכונה בפרופיל שלך.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-1">מדד פער בין תכונות</h4>
            <p>
              המדד מחושב כהפרש בין התכונה הגבוהה ביותר לבין הנמוכה ביותר.
              פער נמוך מצביע על איזון וגמישות יחסית,
              בעוד שפער גבוה עשוי להעיד על קיצוניות או חד ממדיות.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-1">חשוב לדעת</h4>
            <p>
              אין ציון "טוב" או "רע".
              המטרה היא לזהות דפוסי נטייה והשפעה אפשרית על האופן שבו תיתפס בתחנות הערכה.
            </p>
          </div>

        </div>
      )}
    </div>
  );
}