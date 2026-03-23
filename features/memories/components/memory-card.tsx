import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Locale } from "@/lib/i18n/config";
import { formatDate } from "@/lib/utils";
import { MemoryWithAge } from "@/lib/types";

export function MemoryCard({
  memory,
  locale
}: {
  memory: MemoryWithAge;
  locale: Locale;
}) {
  return (
    <Card className="overflow-hidden border-white/70 bg-white/85">
      {memory.imageUrl ? (
        <img src={memory.imageUrl} alt={memory.title} className="h-56 w-full object-cover" />
      ) : null}
      <CardContent className="p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{memory.categoryLabel}</Badge>
          <Badge variant="accent">{memory.ageLabel}</Badge>
        </div>
        <h3 className="mt-4 font-[family-name:var(--font-heading)] text-3xl leading-tight">{memory.title}</h3>
        <p className="mt-2 text-sm font-semibold text-primary">{formatDate(memory.eventDate, locale)}</p>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{memory.description}</p>
      </CardContent>
    </Card>
  );
}
