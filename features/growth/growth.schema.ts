import { z } from "zod";

export function createGrowthSchema(messages: {
  babyIdRequired: string;
  recordedAtRequired: string;
  weightPositive: string;
  heightPositive: string;
  noteMax: string;
}) {
  return z.object({
    babyId: z.string().min(1, messages.babyIdRequired),
    recordedAt: z.string().min(1, messages.recordedAtRequired),
    weightKg: z.coerce.number().positive(messages.weightPositive),
    heightCm: z.coerce.number().positive(messages.heightPositive),
    note: z.string().max(500, messages.noteMax).optional()
  });
}

export type GrowthFormValues = {
  babyId: string;
  recordedAt: string;
  weightKg: number;
  heightCm: number;
  note?: string;
};
