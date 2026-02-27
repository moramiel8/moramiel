import Link from "next/link";


export default function Header() {
return (
<header className="bg-white border-b">
<div className="container flex items-center justify-between py-4">
<Link href="/" className="text-xl font-bold text-base-primary">moramiel.co.il</Link>
<nav className="flex gap-4">
<Link href="/learn" className="hover:opacity-80">לימוד</Link>
<Link href="/simulations" className="hover:opacity-80">סימולציות</Link>
<Link href="/blog" className="hover:opacity-80">בלוג</Link>
<Link href="/checkout" className="btn btn-primary">קנה קורס</Link>
</nav>
</div>
</header>
);
}