import Link from "next/link";


export default function Home() {
return (
<section className="grid gap-6">
<div className="card">
<h1 className="text-3xl font-bold mb-2">הדרך החכמה לשפר בשאו"ל</h1>
<p className="mb-4">למד את Big Five בצורה קלילה, תרגל ב-50 סימולציות עם טיימר, וקבל ניתוח תוצאות בסוף. נבנה ע"י סטודנט לרפואה שהעלה מ-179 ל-219.</p>
<div className="flex gap-3">
<Link href="/simulations" className="btn btn-primary">התחל סימולציה</Link>
<Link href="/learn" className="btn bg-white border">לימוד מרכיבי האישיות</Link>
</div>
</div>
<div className="grid md:grid-cols-3 gap-4">
{[
{title: "מצפוניות", href: "/learn/conscientiousness"},
{title: "נעימות", href: "/learn/agreeableness"},
{title: "מוחצנות", href: "/learn/extraversion"},
{title: "פתיחות מחשבתית", href: "/learn/openness"},
{title: "יציבות רגשית", href: "/learn/emotional-stability"},
].map((t) => (
<Link key={t.href} href={t.href} className="card hover:shadow-md">
<h3 className="text-xl font-semibold">{t.title}</h3>
<p className="text-sm text-slate-600">הבנה מעשית + טיפים לשיפור.</p>
</Link>
))}
</div>
</section>
);
}