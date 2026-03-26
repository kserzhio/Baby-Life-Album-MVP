"use server";

import { revalidatePath } from "next/cache";

import { requireCurrentUser } from "@/features/auth/data/auth.repository";
import { createGrowthEntry } from "@/features/growth/data/growth.repository";
import { createGrowthSchema, type GrowthFormValues } from "@/features/growth/growth.schema";
import { getI18n } from "@/lib/i18n/server";

export async function createGrowthEntryAction(values: GrowthFormValues) {
  const user = await requireCurrentUser();
  const { dictionary } = await getI18n();
  const schema = createGrowthSchema(dictionary.validation);
  const result = schema.safeParse(values);

  if (!result.success) {
    return {
      ok: false,
      fieldErrors: result.error.flatten().fieldErrors
    };
  }

  await createGrowthEntry(user.id, {
    babyId: result.data.babyId,
    recordedAt: new Date(result.data.recordedAt),
    weightKg: result.data.weightKg,
    heightCm: result.data.heightCm,
    note: result.data.note?.trim() || undefined
  });

  revalidatePath("/growth");
  revalidatePath("/dashboard");

  return {
    ok: true
  };
}
