import { z } from "zod";

import type { Dictionary } from "@/lib/i18n/messages";

export function createGrowthFormSchema(dictionary: Dictionary) {
  return z.object({
    recordedAt: z.string().min(1, dictionary.validation.recordedAtRequired),
    heightCm: z.coerce.number().positive(dictionary.validation.heightPositive),
    weightKg: z.coerce.number().positive(dictionary.validation.weightPositive),
    notes: z
      .string()
      .trim()
      .optional()
      .transform((value) => value || undefined)
  });
}

export type GrowthFormValues = z.infer<ReturnType<typeof createGrowthFormSchema>>;
