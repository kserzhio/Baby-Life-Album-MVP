import { getBabiesByUser } from "@/features/babies/data/babies.repository";
import { getRecentEvents, getTodayEvents } from "@/features/events/data/events.repository";
import { getLatestGrowthEntriesByUser } from "@/features/growth/data/growth.repository";

export async function getDashboardData(userId: string) {
  const [babies, todayEvents, recentEvents, latestGrowthEntries] = await Promise.all([
    getBabiesByUser(userId),
    getTodayEvents(userId),
    getRecentEvents(userId),
    getLatestGrowthEntriesByUser(userId)
  ]);

  return {
    babies,
    todayEvents,
    recentEvents,
    latestGrowthEntries,
    summary: {
      babies: babies.length,
      feeding: todayEvents.filter((event) => event.type === "FEEDING").length,
      sleep: todayEvents.filter((event) => event.type === "SLEEP").length,
      diaper: todayEvents.filter((event) => event.type === "DIAPER").length,
      note: todayEvents.filter((event) => event.type === "NOTE").length,
      growth: latestGrowthEntries.length
    }
  };
}
