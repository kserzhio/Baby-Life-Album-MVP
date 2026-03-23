import { getChildProfile } from "@/features/child/data/child.repository";
import { getLatestGrowthEntry } from "@/features/growth/data/growth.repository";
import { getMemoryHighlights, getRecentMemories } from "@/features/memories/data/memories.repository";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/messages";
import { calculateAgeLabel } from "@/lib/utils";

export async function getDashboardData(locale: Locale = "en") {
  const [child, recentMemories, latestGrowth, memoryHighlights] = await Promise.all([
    getChildProfile(),
    getRecentMemories(locale),
    getLatestGrowthEntry(),
    getMemoryHighlights(locale)
  ]);

  if (!child) {
    return null;
  }

  const dictionary = getDictionary(locale);

  return {
    child,
    childAge: calculateAgeLabel(child.birthDate, new Date(), dictionary.age),
    recentMemories,
    latestGrowth,
    memoryHighlights,
    stats: {
      totalMemories: child.memories.length,
      totalGrowthEntries: child.growthLogs.length
    }
  };
}
