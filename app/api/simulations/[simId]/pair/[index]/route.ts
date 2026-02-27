import { NextResponse } from "next/server";
import { authAdmin, db } from "@/lib/firebaseAdmin";
import { buildSimulation } from "@/lib/simulations.server";
import { FREE_SIM_IDS, PAIRS_COUNT } from "@/lib/constants"; // ← אותו מקור

export async function GET(req: Request, { params }: { params: { simId: string; index: string } }) {
  const simId = Number(params.simId);
  const idx = Number(params.index);

  // אימות מותנה: אם לא חינמי → חייב טוקן + רכישה
  let uid: string | null = null;
  const authHeader = req.headers.get("authorization") || "";
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    const decoded = await authAdmin.verifyIdToken(token).catch(() => null);
    uid = decoded?.uid ?? null;
  }

  if (!FREE_SIM_IDS.has(simId)) {
    if (!uid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const doc = await db.collection("purchases").doc(uid).get();
    if (!doc.exists || doc.data()?.active !== true)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const pairs = buildSimulation(simId, PAIRS_COUNT);
  if (idx < 0 || idx >= pairs.length)
    return NextResponse.json({ error: "Invalid index" }, { status: 400 });

  const pair = pairs[idx];
  return NextResponse.json({
    pair: {
      left: { text: pair.left.text, trait: pair.left.trait },
      right: { text: pair.right.text, trait: pair.right.trait },
    },
  });
}
