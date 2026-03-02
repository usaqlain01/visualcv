// src/components/construction-overlay.tsx
"use client";

import { useState, useEffect } from "react";
import { HardHat, Wrench, Construction } from "lucide-react";

export function ConstructionOverlay() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(67), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/90 dark:bg-zinc-800/95 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
      <div className="flex flex-col items-center gap-4 px-6 py-5 max-w-[260px]">
        {/* Icon row */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 dark:bg-amber-500/15 flex items-center justify-center">
            <HardHat className="w-5 h-5 text-amber-500" />
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/15 flex items-center justify-center">
            <Construction className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="w-10 h-10 rounded-lg bg-sky-500/10 dark:bg-sky-500/15 flex items-center justify-center">
            <Wrench className="w-5 h-5 text-sky-500" />
          </div>
        </div>

        {/* Caution tape */}
        <div className="w-full h-3 rounded-sm overflow-hidden relative">
          <div
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(-45deg, hsl(var(--foreground) / 0.15), hsl(var(--foreground) / 0.15) 6px, hsl(var(--muted)) 6px, hsl(var(--muted)) 12px)",
            }}
          />
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="font-mono text-sm font-semibold text-foreground">
            Under Construction
          </p>
          <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
            The AI assistant is being trained on Usman&apos;s expertise. Something great is on the way.
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div className="h-2 rounded-full bg-muted/40 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] font-mono text-muted-foreground text-center mt-1.5">
            67% trained
          </p>
        </div>
      </div>
    </div>
  );
}
