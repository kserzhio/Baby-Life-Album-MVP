import { MemoryCategory } from "@prisma/client";

import { db } from "@/lib/db";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/messages";
import { calculateAgeLabel } from "@/lib/utils";

export async function getMemories(locale: Locale = "en") {
  const child = await db.child.findFirst({
    include: {
      memories: {
        orderBy: {
          eventDate: "desc"
        }
      }
    }
  });

  if (!child) {
    return [];
  }

  const dictionary = getDictionary(locale);

  return child.memories.map((memory) => ({
    ...memory,
    ageLabel: calculateAgeLabel(child.birthDate, memory.eventDate, dictionary.age),
    categoryLabel: dictionary.categories[memory.category]
  }));
}

export async function getRecentMemories(locale: Locale = "en", limit = 4) {
  const memories = await getMemories(locale);
  return memories.slice(0, limit);
}

export async function getMemoryHighlights(locale: Locale = "en") {
  const memories = await db.memory.groupBy({
    by: ["category"],
    _count: {
      _all: true
    }
  });

  const dictionary = getDictionary(locale);

  return memories.map((item) => ({
    category: item.category as MemoryCategory,
    total: item._count._all,
    label: dictionary.categories[item.category as MemoryCategory]
  }));
}
