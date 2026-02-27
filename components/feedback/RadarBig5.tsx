// components/feedback/RadarBig5.tsx
"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

type Props = {
  scores: Record<string, number>;
};

export default function RadarBig5({ scores }: Props) {
  const data = Object.entries(scores).map(([trait, value]) => ({
    trait,
    value,
  }));

  return (
    <div className="card p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="70%">
            
            <PolarGrid stroke="#e5e7eb" />

            <PolarAngleAxis
              dataKey="trait"
              tick={{ fontSize: 12, fill: "#475569" }}
            />

            <PolarRadiusAxis
              domain={[0, 50]} 
              tick={false}
              axisLine={false}
            />

            <Radar
              dataKey="value"
              stroke="#64748b"
              fill="#94a3b8"
              fillOpacity={0.25}
            />

          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}