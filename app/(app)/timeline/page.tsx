import { PageHeader } from "@/components/shared/page-header";
import { getMemories } from "@/features/memories/data/memories.repository";
import { TimelineList } from "@/features/memories/components/timeline-list";
import { getI18n } from "@/lib/i18n/server";

export default async function TimelinePage() {
  const { locale, dictionary } = await getI18n();
  const memories = await getMemories(locale);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={dictionary.timeline.eyebrow}
        title={dictionary.timeline.title}
        description={dictionary.timeline.description}
      />
      <TimelineList memories={memories} locale={locale} dictionary={dictionary} />
    </div>
  );
}
