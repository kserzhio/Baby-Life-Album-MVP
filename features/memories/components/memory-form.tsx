"use client";

import { useActionState } from "react";

import { SubmitButton } from "@/components/forms/submit-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createMemory } from "@/features/memories/actions/create-memory";
import { memoryCategoryValues } from "@/lib/constants";
import { initialActionState } from "@/lib/form-state";
import type { AppDictionary } from "@/lib/types";

export function MemoryForm({ dictionary }: { dictionary: AppDictionary }) {
  const [state, formAction] = useActionState(createMemory, initialActionState);

  return (
    <Card className="border-white/70 bg-white/85">
      <CardHeader>
        <CardTitle>{dictionary.memoryForm.cardTitle}</CardTitle>
        <CardDescription>{dictionary.memoryForm.cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">{dictionary.memoryForm.titleLabel}</Label>
              <Input id="title" name="title" placeholder={dictionary.memoryForm.titlePlaceholder} />
              {state.errors?.title ? <p className="text-sm text-red-600">{state.errors.title[0]}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">{dictionary.memoryForm.categoryLabel}</Label>
              <select
                id="category"
                name="category"
                defaultValue={memoryCategoryValues[0]}
                className="flex h-11 w-full rounded-2xl border border-input bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {memoryCategoryValues.map((value) => (
                  <option key={value} value={value}>
                    {dictionary.categories[value]}
                  </option>
                ))}
              </select>
              {state.errors?.category ? <p className="text-sm text-red-600">{state.errors.category[0]}</p> : null}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="eventDate">{dictionary.memoryForm.eventDateLabel}</Label>
              <Input id="eventDate" name="eventDate" type="date" />
              {state.errors?.eventDate ? <p className="text-sm text-red-600">{state.errors.eventDate[0]}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">{dictionary.memoryForm.imageUrlLabel}</Label>
              <Input id="imageUrl" name="imageUrl" placeholder={dictionary.memoryForm.imageUrlPlaceholder} />
              {state.errors?.imageUrl ? <p className="text-sm text-red-600">{state.errors.imageUrl[0]}</p> : null}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{dictionary.memoryForm.descriptionLabel}</Label>
            <Textarea id="description" name="description" placeholder={dictionary.memoryForm.descriptionPlaceholder} />
            {state.errors?.description ? <p className="text-sm text-red-600">{state.errors.description[0]}</p> : null}
          </div>

          {state.message ? <p className="text-sm text-red-600">{state.message}</p> : null}

          <div className="flex flex-wrap items-center gap-3">
            <SubmitButton label={dictionary.memoryForm.submit} pendingLabel={dictionary.memoryForm.submitting} />
            <Button type="reset" variant="outline">
              {dictionary.common.reset}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
