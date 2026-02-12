import { Clock, GitBranch, Circle, CircleDot, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Lab } from "@/data/labs-data";

const statusConfig = {
  "not-started": {
    icon: Circle,
    label: "Not Started",
    classes: "border-border/40 text-muted-foreground",
  },
  "in-progress": {
    icon: CircleDot,
    label: "In Progress",
    classes: "border-amber-500/30 text-amber-600 dark:text-amber-400",
  },
  complete: {
    icon: CheckCircle2,
    label: "Complete",
    classes: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
  },
};

interface LabItemProps {
  lab: Lab;
  topicLetter: string;
}

export function LabItem({ lab, topicLetter }: LabItemProps) {
  const status = statusConfig[lab.status];
  const StatusIcon = status.icon;

  return (
    <div className="p-3 rounded-lg border border-border/30 bg-muted/10 hover:bg-muted/20 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-2">
          <StatusIcon className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
          <span className="text-xs font-semibold text-foreground">
            Lab {topicLetter}{lab.id.replace(/^[a-u]/, "")} : {lab.title}
          </span>
        </div>
        <Badge variant="outline" className={`text-[9px] font-mono shrink-0 ${status.classes}`}>
          {status.label}
        </Badge>
      </div>

      <p className="text-[11px] text-muted-foreground leading-relaxed ml-5.5 pl-0.5">
        {lab.summary}
      </p>

      <div className="flex items-center gap-3 mt-2 ml-5.5 pl-0.5">
        <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
          <Clock className="w-3 h-3" /> {lab.duration}
        </span>
        {lab.prereqs.length > 0 && (
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
            <GitBranch className="w-3 h-3" /> Requires: {lab.prereqs.join(", ")}
          </span>
        )}
      </div>
    </div>
  );
}