import Link from "next/link";


export default function LearnIndex() {
const traits = [
{ title: "מצפוניות", slug: "conscientiousness" },
{ title: "נעימות", slug: "agreeableness" },
{ title: "מוחצנות", slug: "extraversion" },
{ title: "פתיחות מחשבתית", slug: "openness" },
{ title: "יציבות רגשית", slug: "emotional-stability" },
];
return (
<div className="grid sm:grid-cols-2 gap-4">
{traits.map((t) => (
<Link key={t.slug} href={`/learn/${t.slug}`} className="card hover:shadow-md">
<h3 className="text-xl font-semibold">{t.title}</h3>
<p className="text-sm text-slate-600">תמצית, דוגמאות היגדים, ותרגול מכוון.</p>
</Link>
))}
</div>
);
}