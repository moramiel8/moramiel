// lib/fetchPair.ts
import { getIdTokenOpt } from "./authClient";

export async function fetchPair(simId: number, index: number) {
  const headers: Record<string, string> = {};
  const token = await getIdTokenOpt();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`/api/simulations/${simId}/pair/${index}`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || "שגיאה בקבלת זוג היגדים");
  }
  const data = await res.json();
  return data.pair as {
    left: { text: string; trait: string };
    right: { text: string; trait: string };
  };
}
