import { MapPin, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Experience } from "@/data/resume-data";

interface ExperienceCardProps {
  exp: Experience;
}

export function ExperienceCard({ exp }: ExperienceCardProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="font-semibold text-sm text-foreground">
            {exp.company}
          </h4>
          <p className="text-xs text-emerald-500 dark:text-emerald-400 font-mono">
            {exp.role}
          </p>
        </div>
        {exp.type && (
          <Badge
            variant="outline"
            className="text-[10px] shrink-0 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
          >
            {exp.type}
          </Badge>
        )}
      </div>
      <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-mono">
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {exp.location}
        </span>
        <span>{exp.period}</span>
      </div>
      <p className="text-xs text-foreground/70 leading-relaxed">
        {exp.summary}
      </p>
      <ul className="space-y-1.5">
        {exp.highlights.map((h, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-xs text-foreground/60"
          >
            <ChevronRight className="w-3 h-3 mt-0.5 shrink-0 text-emerald-500" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
