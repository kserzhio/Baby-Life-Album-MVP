import { db } from "@/lib/db";

export async function getGrowthEntries() {
  const child = await db.child.findFirst({
    include: {
      growthLogs: {
        orderBy: {
          recordedAt: "asc"
        }
      }
    }
  });

  if (!child) {
    return [];
  }

  return child.growthLogs.map((entry, index, entries) => {
    const previous = index > 0 ? entries[index - 1] : undefined;

    return {
      ...entry,
      heightDelta: previous ? Number((entry.heightCm - previous.heightCm).toFixed(1)) : undefined,
      weightDelta: previous ? Number((entry.weightKg - previous.weightKg).toFixed(1)) : undefined
    };
  });
}

export async function getLatestGrowthEntry() {
  const entries = await getGrowthEntries();
  return entries[entries.length - 1];
}
