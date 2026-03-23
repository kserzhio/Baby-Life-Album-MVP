import { ArrowUpRight, Minus } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/lib/i18n/config";
import { formatDate } from "@/lib/utils";
import { AppDictionary, GrowthEntryWithTrend } from "@/lib/types";

export function GrowthTable({
  entries,
  locale,
  dictionary
}: {
  entries: GrowthEntryWithTrend[];
  locale: Locale;
  dictionary: AppDictionary;
}) {
  if (entries.length === 0) {
    return (
      <EmptyState
        title={dictionary.growth.emptyTitle}
        description={dictionary.growth.emptyDescription}
      />
    );
  }

  return (
    <Card className="border-white/70 bg-white/85">
      <CardHeader>
        <CardTitle>{dictionary.growth.historyTitle}</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="pb-3 font-semibold">{dictionary.table.date}</th>
              <th className="pb-3 font-semibold">{dictionary.table.height}</th>
              <th className="pb-3 font-semibold">{dictionary.table.weight}</th>
              <th className="pb-3 font-semibold">{dictionary.growth.trend}</th>
              <th className="pb-3 font-semibold">{dictionary.table.notes}</th>
            </tr>
          </thead>
          <tbody>
            {entries
              .slice()
              .reverse()
              .map((entry) => (
                <tr key={entry.id} className="border-b border-border/70 last:border-b-0">
                  <td className="py-4 font-semibold">{formatDate(entry.recordedAt, locale)}</td>
                  <td className="py-4">{entry.heightCm.toFixed(1)} cm</td>
                  <td className="py-4">{entry.weightKg.toFixed(1)} kg</td>
                  <td className="py-4">
                    {entry.heightDelta || entry.weightDelta ? (
                      <div className="flex flex-wrap gap-2">
                        {entry.heightDelta ? (
                          <Badge variant="outline">
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                            +{entry.heightDelta.toFixed(1)} cm
                          </Badge>
                        ) : null}
                        {entry.weightDelta ? (
                          <Badge variant="outline">
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                            +{entry.weightDelta.toFixed(1)} kg
                          </Badge>
                        ) : null}
                      </div>
                    ) : (
                      <Badge variant="outline">
                        <Minus className="mr-1 h-3 w-3" />
                        {dictionary.growth.baseline}
                      </Badge>
                    )}
                  </td>
                  <td className="py-4 text-muted-foreground">{entry.notes ?? dictionary.growth.noNotes}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
