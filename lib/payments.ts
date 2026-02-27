// דוגמה סכמטית – בפועל יש לשלב שרת/Route מאובטח ו-Webhooks
export async function createCheckout(amountILS: number, email: string){
// שלב יצירת קישור תשלום מול PayPlus/PayMe
// החזר URL לקופה מאובטחת
return "https://secure.payplus.co.il/payment/some-link";
}