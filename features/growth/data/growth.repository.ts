import { db } from "@/lib/db";

export async function createGrowthEntry(
  userId: string,
  input: {
    babyId: string;
    recordedAt: Date;
    weightKg: number;
    heightCm: number;
    note?: string;
  }
) {
  return db.growthEntry.create({
    data: {
      ...input,
      userId
    }
  });
}

export async function getGrowthEntriesByUser(userId: string) {
  return db.growthEntry.findMany({
    where: { userId },
    include: {
      baby: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: {
      recordedAt: "desc"
    }
  });
}

export async function getLatestGrowthEntriesByUser(userId: string) {
  const babies = await db.baby.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      growthEntries: {
        orderBy: {
          recordedAt: "desc"
        },
        take: 1
      }
    }
  });

  return babies
    .map((baby) => ({
      babyId: baby.id,
      babyName: baby.name,
      entry: baby.growthEntries[0] ?? null
    }))
    .filter((item) => item.entry !== null);
}
