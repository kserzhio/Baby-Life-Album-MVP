import { MemoryCategory } from "@prisma/client";
import { z } from "zod";

import type { Dictionary } from "@/lib/i18n/messages";

export function createMemoryFormSchema(dictionary: Dictionary) {
  return z.object({
    title: z.string().trim().min(2, dictionary.validation.titleMin),
    category: z.nativeEnum(MemoryCategory),
    eventDate: z.string().min(1, dictionary.validation.eventDateRequired),
    description: z.string().trim().min(10, dictionary.validation.descriptionMin),
    imageUrl: z
      .string()
      .trim()
      .optional()
      .transform((value) => value || undefined)
      .refine((value) => !value || z.string().url().safeParse(value).success, dictionary.validation.imageUrlInvalid)
  });
}

export type MemoryFormValues = z.infer<ReturnType<typeof createMemoryFormSchema>>;
