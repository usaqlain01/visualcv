import { Zap, FlaskConical, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TopicCard } from "@/components/labs/topic-card";
import { CategorySection } from "@/components/labs/category-section";
import {
  getMomentumStarters,
  getTopicsByCategory,
  categoryOrder,
} from "@/data/labs-data";

export default function AILabsPage() {
  const starters = getMomentumStarters();

  return (
    <div className="bg-grid min-h-screen">
      <main className="max-w-[1440px] mx-auto px-4 md:px-6 py-8">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FlaskConical className="w-5 h-5 text-emerald-500" />
            <h1 className="text-xl font-bold tracking-tight">AI Labs</h1>
            <Badge
              variant="outline"
              className="text-[10px] font-mono border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
            >
              21 Topics / 63 Labs
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl">
            A structured learning path for AI systems development. Each topic includes
            hands-on labs that build on each other, progressing from fundamentals
            through orchestration to production deployment.
          </p>
        </div>

        {/* Momentum Starters hero section */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-amber-500" />
            <h2 className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              Momentum Starters
            </h2>
            <div className="h-px flex-1 bg-border/50" />
          </div>
          <p className="text-xs text-muted-foreground mb-4 max-w-xl">
            These five topics are sequenced so each one builds on the last. Start here
            to break through analysis paralysis and build tangible working systems
            within weeks.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {starters.map((topic) => (
              <TopicCard key={topic.id} topic={topic} featured />
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="flex items-center gap-2 mb-8">
          <Target className="w-4 h-4 text-muted-foreground" />
          <h2 className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
            Full Roadmap
          </h2>
          <div className="h-px flex-1 bg-border/50" />
        </div>

        {/* Category sections */}
        <div className="space-y-8">
          {categoryOrder.map((category) => {
            const categoryTopics = getTopicsByCategory(category);
            return (
              <CategorySection
                key={category}
                category={category}
                topics={categoryTopics}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}