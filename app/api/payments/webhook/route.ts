import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    // TODO: אימות חתימה לפי הספק
    const uid = payload?.metadata?.uid; // את ה-uid תעביר בעת יצירת עסקה
    const success = payload?.status === "success";

    if (uid && success) {
      await db.collection("purchases").doc(uid).set({ active: true, ts: Date.now() }, { merge: true });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
