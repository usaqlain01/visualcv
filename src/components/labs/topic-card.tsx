"use client";

import { useState } from "react";
import { ChevronDown, Flame, TrendingUp, Zap } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LabItem } from "@/components/labs/lab-item";
import type { Topic } from "@/data/labs-data";
import { categoryColors } from "@/data/labs-data";

interface TopicCardProps {
  topic: Topic;
  featured?: boolean;
}

function DifficultyDots({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${
            i < level ? "bg-foreground/60" : "bg-foreground/15"
          }`}
        />
      ))}
    </div>
  );
}

function DemandBar({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-16 h-1.5 rounded-full bg-foreground/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-emerald-500/70 transition-all duration-500"
          style={{ width: `${level * 10}%` }}
        />
      </div>
      <span className="text-[9px] font-mono text-muted-foreground">{level}/10</span>
    </div>
  );
}

export function TopicCard({ topic, featured = false }: TopicCardProps) {
  const [expanded, setExpanded] = useState(false);
  const accentColor = categoryColors[topic.category];
  const completedLabs = topic.labs.filter((l) => l.status === "complete").length;

  return (
    <Card
      className={`border-border/50 bg-card/50 backdrop-blur transition-all ${
        featured ? "glow-card" : ""
      }`}
    >
      <CardHeader className="pb-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-3">
              <span
                className={`font-mono text-lg font-bold leading-none text-${accentColor}-500`}
              >
                {topic.letter}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground leading-tight">
                  {topic.name}
                </h3>
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                  {topic.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {topic.isMomentumStarter && (
                <Badge
                  variant="outline"
                  className="text-[9px] font-mono border-amber-500/30 text-amber-600 dark:text-amber-400 gap-1"
                >
                  <Zap className="w-2.5 h-2.5" /> Start Here
                </Badge>
              )}
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-4 mt-2.5 ml-7">
            <div className="flex items-center gap-1.5">
              <Flame className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground font-mono">Difficulty</span>
              <DifficultyDots level={topic.difficulty} />
            </div>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground font-mono">Demand</span>
              <DemandBar level={topic.jobDemand} />
            </div>
            <span className="text-[10px] text-muted-foreground font-mono">
              {topic.timeToMidLevel} to proficiency
            </span>
            <span className="text-[10px] text-muted-foreground font-mono ml-auto">
              {completedLabs}/{topic.labs.length} labs
            </span>
          </div>
        </button>
      </CardHeader>

      {expanded && (
        <CardContent className="pt-0">
          <div className="space-y-2 mt-1">
            {topic.labs.map((lab) => (
              <LabItem key={lab.id} lab={lab} topicLetter={topic.letter} />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}