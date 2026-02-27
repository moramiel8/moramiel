"use client";
import { useState } from "react";
import { createCheckout } from "@/lib/payments";


export default function Checkout(){
const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);


const onPay = async ()=>{
setLoading(true);
const url = await createCheckout(149, email); // מחיר תחרותי לדוגמה
window.location.href = url;
};


return (
<div className="card max-w-lg mx-auto grid gap-4">
<h1 className="text-2xl font-bold">הצטרפות לקורס המלא</h1>
<p>50 סימולציות + ניתוח תוצאות + תוכן לימודי. תשלום מאובטח.</p>
<input className="border rounded-2xl px-3 py-2" placeholder="אימייל" value={email} onChange={(e)=>setEmail(e.target.value)} />
<button className="btn btn-primary" disabled={!email || loading} onClick={onPay}>לתשלום</button>
</div>
);
}