import { notFound } from "next/navigation";


const content: Record<string, {title: string, body: string[]}> = {
"conscientiousness": {
title: "מצפוניות",
body: [
"מצפוניות היא הנטייה להתארגן, לתכנן ולעמוד במשימות – אחד הממדים המשמעותיים בשאו\"ל.",
"למה זה חשוב? ברפואה יש עומס, דדליינים, ומעקב שיטתי – מצפוניות גבוהה מנבאת ביצועים עקביים.",
"איך להתכונן: הרגלי ניהול זמן קצרים (Pomodoro), רשימות יומיות, נעילת מסיחים, ושגרות בוקר/ערב.",
"שגיאות נפוצות: לבחור תמיד היגדים \"מושלמים\" לא אותנטיים; סתירות בין בחירות; תגובת יתר ללחץ הזמן.",
]
},
"agreeableness": { title: "נעימות", body: ["אמפתיה, שיתוף פעולה, הקשבה – תרומה לקשרי צוות וקשר מטפל-מטופל."] },
"extraversion": { title: "מוחצנות", body: ["אנרגיה חברתית, אסרטיביות והובלה – במידה הנכונה."] },
"openness": { title: "פתיחות מחשבתית", body: ["סקרנות וגמישות קוגניטיבית – למידה וחדשנות."] },
"emotional-stability": { title: "יציבות רגשית", body: ["וויסות רגשי והתאוששות מלחץ – קריטי בתקופות עומס."] }
};


export default function TraitPage({ params }: { params: { trait: string } }) {
const data = content[params.trait];
if (!data) return notFound();
return (
<article className="card">
<h1 className="text-2xl font-bold mb-3">{data.title}</h1>
{data.body.map((p, i) => (<p key={i} className="mb-3">{p}</p>))}
</article>
);
}