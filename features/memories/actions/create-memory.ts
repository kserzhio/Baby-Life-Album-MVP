"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getChildProfile } from "@/features/child/data/child.repository";
import { createMemoryFormSchema } from "@/features/memories/memory.schema";
import { db } from "@/lib/db";
import { type ActionState } from "@/lib/form-state";
import { getI18n } from "@/lib/i18n/server";

export async function createMemory(_: ActionState, formData: FormData): Promise<ActionState> {
  const { dictionary } = await getI18n();
  const child = await getChildProfile();

  if (!child) {
    return {
      status: "error",
      message: dictionary.memoryForm.createProfileFirst
    };
  }

  const parsed = createMemoryFormSchema(dictionary).safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    eventDate: formData.get("eventDate"),
    description: formData.get("description"),
    imageUrl: formData.get("imageUrl")
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: dictionary.memoryForm.validationMessage,
      errors: parsed.error.flatten().fieldErrors
    };
  }

  await db.memory.create({
    data: {
      childId: child.id,
      title: parsed.data.title,
      category: parsed.data.category,
      eventDate: new Date(parsed.data.eventDate),
      description: parsed.data.description,
      imageUrl: parsed.data.imageUrl
    }
  });

  revalidatePath("/dashboard");
  revalidatePath("/timeline");
  revalidatePath("/memories/new");
  redirect("/timeline");
}
