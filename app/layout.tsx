import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export const metadata = {
title: "moramiel.co.il – סימולציות שאו\"ל ו-Big Five",
description: "לימוד + סימולציות שאו\"ל (של\"ו) עם ניתוח תוצאות, בלוג סטודנט לרפואה."
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="he" dir="rtl">
<body className="min-h-screen flex flex-col">
<Header />
<main className="flex-1 container py-8">{children}</main>
<Footer />
</body>
</html>
);
}