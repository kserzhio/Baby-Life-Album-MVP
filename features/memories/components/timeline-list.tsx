import { EmptyState } from "@/components/shared/empty-state";
import { MemoryCard } from "@/features/memories/components/memory-card";
import type { Locale } from "@/lib/i18n/config";
import { AppDictionary, MemoryWithAge } from "@/lib/types";

export function TimelineList({
  memories,
  locale,
  dictionary
}: {
  memories: MemoryWithAge[];
  locale: Locale;
  dictionary: AppDictionary;
}) {
  if (memories.length === 0) {
    return (
      <EmptyState
        title={dictionary.timeline.emptyTitle}
        description={dictionary.timeline.emptyDescription}
        actionHref="/memories/new"
        actionLabel={dictionary.timeline.emptyAction}
      />
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {memories.map((memory) => (
        <MemoryCard key={memory.id} memory={memory} locale={locale} />
      ))}
    </div>
  );
}
