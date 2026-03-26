import { Ruler, Scale } from "lucide-react";

import type { Locale } from "@/lib/i18n/config";
import { formatDate } from "@/lib/utils";

type GrowthEntryItem = Awaited<ReturnType<typeof import("@/features/growth/data/growth.repository").getGrowthEntriesByUser>>[number];

export function GrowthTable({
  entries,
  locale,
  dictionary
}: {
  entries: GrowthEntryItem[];
  locale: Locale;
  dictionary: {
    historyTitle: string;
    emptyTitle: string;
    emptyDescription: string;
    weightUnit: string;
    heightUnit: string;
    noteFallback: string;
  };
}) {
  if (entries.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-border bg-white/70 p-8 text-center shadow-soft">
        <p className="font-semibold text-foreground">{dictionary.emptyTitle}</p>
        <p className="mt-2 text-sm text-muted-foreground">{dictionary.emptyDescription}</p>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="font-[family-name:var(--font-heading)] text-3xl text-foreground">{dictionary.historyTitle}</h2>
      <div className="space-y-3">
        {entries.map((entry) => (
          <article key={entry.id} className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-soft">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{entry.baby.name}</p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{formatDate(entry.recordedAt, locale, "MMM d, yyyy • HH:mm")}</h3>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-2 text-sm font-semibold text-foreground">
                  <Scale className="h-4 w-4 text-primary" />
                  {entry.weightKg} {dictionary.weightUnit}
                </div>
                <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-2 text-sm font-semibold text-foreground">
                  <Ruler className="h-4 w-4 text-primary" />
                  {entry.heightCm} {dictionary.heightUnit}
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{entry.note || dictionary.noteFallback}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
