"use client";

import { useState, useEffect } from "react";

interface SkillBarProps {
  name: string;
  level: number;
  delay: number;
}

export function SkillBar({ name, level, delay }: SkillBarProps) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(level), delay);
    return () => clearTimeout(t);
  }, [level, delay]);

  const barColor =
    level >= 90
      ? "bg-emerald-500"
      : level >= 80
        ? "bg-teal-500"
        : level >= 70
          ? "bg-sky-500"
          : "bg-violet-500";

  return (
    <div className="group mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-mono tracking-wide text-foreground/80 group-hover:text-foreground transition-colors">
          {name}
        </span>
        <span className="text-[10px] font-mono text-muted-foreground tabular-nums">
          {animated}%
        </span>
      </div>
      <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${barColor}`}
          style={{ width: `${animated}%` }}
        />
      </div>
    </div>
  );
}
