import { MemoryCategory } from "@prisma/client";

export const memoryCategoryValues: MemoryCategory[] = [
  MemoryCategory.FIRST_SMILE,
  MemoryCategory.FIRST_TOOTH,
  MemoryCategory.FIRST_STEPS,
  MemoryCategory.FIRST_WORD,
  MemoryCategory.DOCTOR_VISIT,
  MemoryCategory.PHOTO_MEMORY,
  MemoryCategory.MILESTONE
];

export const navigationItems = [
  { href: "/dashboard", key: "dashboard" },
  { href: "/timeline", key: "timeline" },
  { href: "/memories/new", key: "addMemory" },
  { href: "/growth", key: "growth" }
] as const;
