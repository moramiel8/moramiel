export default function Footer() {
return (
<footer className="mt-12 border-t">
<div className="container py-6 text-sm text-slate-600 flex flex-wrap gap-2 justify-between">
<p>© {new Date().getFullYear()} shaul.co.il</p>
<p>התכנים אינם תחליף לייעוץ מקצועי. השימוש אישי.</p>
</div>
</footer>
);
}