import type { Child, GrowthEntry, Memory, MemoryCategory } from "@prisma/client";
import type { Dictionary } from "@/lib/i18n/messages";

export type ChildProfile = Child;

export type MemoryWithAge = Memory & {
  ageLabel: string;
  categoryLabel: string;
};

export type GrowthEntryWithTrend = GrowthEntry & {
  heightDelta?: number;
  weightDelta?: number;
};

export type MemoryCategoryOption = {
  label: string;
  value: MemoryCategory;
};

export type AppDictionary = Dictionary;
