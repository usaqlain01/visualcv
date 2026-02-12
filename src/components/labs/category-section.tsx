import { TopicCard } from "@/components/labs/topic-card";
import type { Topic, TopicCategory } from "@/data/labs-data";
import { categoryLabels } from "@/data/labs-data";

interface CategorySectionProps {
  category: TopicCategory;
  topics: Topic[];
}

export function CategorySection({ category, topics }: CategorySectionProps) {
  if (topics.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
        {categoryLabels[category]}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </section>
  );
}