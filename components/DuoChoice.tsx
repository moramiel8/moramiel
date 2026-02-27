"use client";
import { useState } from "react";


export type Duo = { left: string; right: string; leftTrait: string; rightTrait: string };


export default function DuoChoice({ duo, onChoose }: { duo: Duo; onChoose: (side: "left"|"right") => void }) {
const [sel, setSel] = useState<"left"|"right"|null>(null);
return (
<div className="grid gap-4">
<button onClick={() => { setSel("left"); onChoose("left"); }} className={`card text-center ${sel==='left'?'ring-2 ring-base-primary':''}`}>{duo.left}</button>
<button onClick={() => { setSel("right"); onChoose("right"); }} className={`card text-center ${sel==='right'?'ring-2 ring-base-primary':''}`}>{duo.right}</button>
</div>
);
}