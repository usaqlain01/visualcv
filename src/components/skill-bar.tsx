// src/components/skill-bar.tsx
"use client";

import { useEffect, useState } from "react";

interface SkillBarProps {
  name: string;
  level: number;
  unit?: string;
  delay?: number;
}

const MAX_YEARS = 15;

function getBarColor(years: number): string {
  if (years >= 10) return "bg-emerald-500";
  if (years >= 6) return "bg-teal-500";
  if (years >= 3) return "bg-sky-500";
  return "bg-violet-500";
}

function formatLevel(level: number): string {
  if (level < 1) return "< 1 yr";
  if (level === 1) return "1 yr";
  return `${level} yrs`;
}

export function SkillBar({ name, level, unit = "years", delay = 0 }: SkillBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const percent = Math.min((level / MAX_YEARS) * 100, 100);
      setWidth(percent);
    }, delay);
    return () => clearTimeout(timer);
  }, [level, delay]);

  return (
    <div className="mb-3 last:mb-0">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-mono text-foreground/80 truncate pr-2">
          {name}
        </span>
        <span className="text-[10px] font-mono text-muted-foreground shrink-0">
          {formatLevel(level)}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${getBarColor(level)}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
