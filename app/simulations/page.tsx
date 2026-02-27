"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SimIndex() {
  const allSims = Array.from({ length: 50 }, (_, i) => i + 1);
  const visibleSims = allSims.slice(0, 6); // מציגים רק חלק
  const freeSims = new Set([1, 2]);        // 2 חינמיות

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // קריאת מצב התחברות מ-Firebase בצד לקוח
    (async () => {
      const mod = await import("@/lib/firebase");
      mod.auth.onAuthStateChanged((u) => setUser(u ?? null));
    })();
  }, []);

  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {visibleSims.map((id) => {
        const isFree = freeSims.has(id);
        return (
          <div key={id} className="card text-center">
            <h3 className="text-lg font-semibold">סימולציה {id}</h3>
            <p className="text-sm text-slate-600 mb-3">
              {isFree ? "חינמית" : "למשתמשים רשומים בלבד"}
            </p>

            {isFree ? (
              <Link href={`/simulations/${id}`} className="btn btn-primary">
                הפעל חינמית
              </Link>
            ) : user ? (
              <Link href={`/simulations/${id}`} className="btn">
                הפעל (נדרש גישה)
              </Link>
            ) : (
              <Link href="/checkout" className="btn">
                הצטרף / היכנס
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
