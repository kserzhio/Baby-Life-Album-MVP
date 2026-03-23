"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getChildProfile } from "@/features/child/data/child.repository";
import { createGrowthFormSchema } from "@/features/growth/growth.schema";
import { db } from "@/lib/db";
import { type ActionState } from "@/lib/form-state";
import { getI18n } from "@/lib/i18n/server";

export async function createGrowthEntry(_: ActionState, formData: FormData): Promise<ActionState> {
  const { dictionary } = await getI18n();
  const child = await getChildProfile();

  if (!child) {
    return {
      status: "error",
      message: dictionary.growth.createProfileFirst
    };
  }

  const parsed = createGrowthFormSchema(dictionary).safeParse({
    recordedAt: formData.get("recordedAt"),
    heightCm: formData.get("heightCm"),
    weightKg: formData.get("weightKg"),
    notes: formData.get("notes")
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: dictionary.growth.validationMessage,
      errors: parsed.error.flatten().fieldErrors
    };
  }

  await db.growthEntry.create({
    data: {
      childId: child.id,
      recordedAt: new Date(parsed.data.recordedAt),
      heightCm: parsed.data.heightCm,
      weightKg: parsed.data.weightKg,
      notes: parsed.data.notes
    }
  });

  revalidatePath("/dashboard");
  revalidatePath("/growth");
  redirect("/growth");
}
