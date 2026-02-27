// app/simulations/[id]/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Timer from "@/components/Timer";
import DuoChoice from "@/components/DuoChoice";
import { fetchPair } from "@/lib/fetchPair";
import { FREE_SIM_IDS } from "@/lib/constants";
import { generateFeedback } from "@/lib/feedback/engine";
import RadarBig5 from "@/components/feedback/RadarBig5";
import ScoringAccordion from "@/components/feedback/ScoringAccordion";

export default function Simulation({ params }: { params: { id: string } }) {
  const simId = useMemo(() => Number(params.id), [params.id]);
  const TOTAL_PAIRS = 40;

  const [index, setIndex] = useState(0);
  const [pair, setPair] = useState<{
    left: { text: string; trait: string };
    right: { text: string; trait: string };
  } | null>(null);

  const [tally, setTally] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  // טעינת זוג ראשון
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const p = await fetchPair(simId, 0);
        if (!cancelled) setPair(p);
      } catch (e: any) {
        setError(e.message || "שגיאה בטעינה");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [simId]);

  const onChoose = async (side: "left" | "right") => {
    if (!pair) return;

    const chosenTrait =
      side === "left" ? pair.left.trait : pair.right.trait;

    setTally((prev) => ({
      ...prev,
      [chosenTrait]: (prev[chosenTrait] || 0) + 1,
    }));

    const nextIndex = index + 1;
    setIndex(nextIndex);

    if (nextIndex >= TOTAL_PAIRS) {
      setDone(true);
      return;
    }

    try {
      const nextPair = await fetchPair(simId, nextIndex);
      setPair(nextPair);
    } catch (e: any) {
      setError(e.message || "שגיאה בטעינת הפריט הבא");
    }
  };

  // =====================
  // מסך תוצאות
  // =====================
  if (done) {
    const feedback = generateFeedback({
      traitCounts: tally,
      totalChoices: TOTAL_PAIRS,
    });

    return (
      <div className="grid gap-6">
        <h1 className="text-2xl font-bold">
          סיכום סימולציה {simId}
        </h1>

        {/* פרופיל BIG-5 (גרף + מספרים באותו כרטיס) */}
        <div className="card p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          
          <div>
            <h2 className="text-lg font-semibold">
              פרופיל BIG-5
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              התפלגות יחסית בין התכונות
            </p>
          </div>

          <RadarBig5 scores={feedback.scores} />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center pt-4 border-t border-slate-100">
            {Object.entries(feedback.scores).map(([trait, score]) => (
              <div key={trait} className="space-y-1">
                <div className="text-xs text-slate-500">
                  {trait}
                </div>
                <div className="text-base font-semibold tracking-tight">
                  {Math.round(score)}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* רמת איזון כללית */}
        <div className="card p-6 rounded-2xl border border-slate-200 shadow-sm">

          <div className="mb-5">
            <h2 className="text-lg font-semibold">
              רמת איזון מבני
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              מדד אנליטי לאיזון בין חמש התכונות
            </p>
          </div>

          <div className="flex items-end gap-3 mb-5">
            <div className="text-4xl font-semibold tracking-tight">
              {feedback.overall.imbalanceIndex.toFixed(0)}
            </div>
            <div className="text-sm text-slate-500 mb-1">
              מדד פער
            </div>
          </div>

          <div className="mb-4">
            <div className="h-[4px] bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-600 transition-all duration-500"
                style={{
                  width: `${Math.min(
                    feedback.overall.imbalanceIndex,
                    60
                  ) / 60 * 100}%`,
                }}
              />
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            המדד מחושב כהפרש בין התכונה הגבוהה ביותר לבין הנמוכה ביותר בפרופיל שלך.
            פער נמוך מצביע על פרופיל מאוזן וגמיש יותר, בעוד שפער גבוה עשוי להעיד על קיצוניות יחסית.
          </p>
        </div>

        {/* כיצד מחושבים הציונים */}
        <ScoringAccordion />

        {/* ניתוח מתקדם – נעול */}
        <div className="card relative overflow-hidden p-6 rounded-2xl border border-slate-200 shadow-sm">

          <h3 className="font-semibold mb-4">
            ניתוח מתקדם
          </h3>

          <div className="blur-sm opacity-70 pointer-events-none select-none space-y-2 text-sm text-slate-700">
            <p>קשיחות תפקודית אפשרית בין מצפוניות לנעימות.</p>
            <p>זיהוי קיצוניות בבחירות חיוביות.</p>
            <p>השפעה אפשרית בתחנת דינמיקה קבוצתית.</p>
            <p>תרגול מותאם לאיזון בין תכונות.</p>
          </div>

          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />

          <div className="absolute inset-0 flex items-center justify-center">
            <button className="btn px-6 py-2 text-sm">
              פתח ניתוח מלא
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =====================
  // שגיאה
  // =====================
  if (error) {
    return (
      <div className="card p-6">
        <h1 className="text-xl font-semibold mb-2">
          בעיה בטעינה
        </h1>
        <p className="text-slate-700 mb-3">{error}</p>
        {!FREE_SIM_IDS.has(simId) && (
          <p className="text-sm">
            ייתכן ונדרש להיכנס/לרכוש גישה.
          </p>
        )}
      </div>
    );
  }

  if (!pair) {
    return <div className="card p-6">טוען…</div>;
  }

  // =====================
  // מהלך סימולציה רגיל
  // =====================
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          סימולציה {simId}
        </h1>
        <Timer minutes={60} onFinish={() => setDone(true)} />
      </div>

      <DuoChoice
        duo={{
          left: pair.left.text,
          right: pair.right.text,
          leftTrait: pair.left.trait,
          rightTrait: pair.right.trait,
        }}
        onChoose={onChoose}
      />

      <p className="text-sm text-slate-600 text-center">
        בחר/י את ההיגד שמתאר אותך יותר. אין תשובה “נכונה”.
      </p>

      <p className="text-sm text-slate-500 text-center">
        {index + 1} / {TOTAL_PAIRS}
      </p>
    </div>
  );
}