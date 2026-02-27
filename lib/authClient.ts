// lib/authClient.ts
export async function getIdTokenOpt(): Promise<string | null> {
  // נטען דינמית כדי לא לשבור SSR
  const mod = await import("./firebase");
  const auth = mod.auth;
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken(/* forceRefresh? */ false);
}
