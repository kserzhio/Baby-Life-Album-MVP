"use client";

import { useActionState } from "react";

import { SubmitButton } from "@/components/forms/submit-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createGrowthEntry } from "@/features/growth/actions/create-growth-entry";
import { initialActionState } from "@/lib/form-state";
import type { AppDictionary } from "@/lib/types";

export function GrowthForm({ dictionary }: { dictionary: AppDictionary }) {
  const [state, formAction] = useActionState(createGrowthEntry, initialActionState);

  return (
    <Card className="border-white/70 bg-white/85">
      <CardHeader>
        <CardTitle>{dictionary.growth.formTitle}</CardTitle>
        <CardDescription>{dictionary.growth.formDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="recordedAt">{dictionary.growth.dateLabel}</Label>
              <Input id="recordedAt" name="recordedAt" type="date" />
              {state.errors?.recordedAt ? <p className="text-sm text-red-600">{state.errors.recordedAt[0]}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="heightCm">{dictionary.growth.heightLabel}</Label>
              <Input id="heightCm" name="heightCm" type="number" step="0.1" placeholder="79.4" />
              {state.errors?.heightCm ? <p className="text-sm text-red-600">{state.errors.heightCm[0]}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="weightKg">{dictionary.growth.weightLabel}</Label>
              <Input id="weightKg" name="weightKg" type="number" step="0.1" placeholder="9.8" />
              {state.errors?.weightKg ? <p className="text-sm text-red-600">{state.errors.weightKg[0]}</p> : null}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">{dictionary.growth.notesLabel}</Label>
            <Textarea id="notes" name="notes" placeholder={dictionary.growth.notesPlaceholder} />
          </div>

          {state.message ? <p className="text-sm text-red-600">{state.message}</p> : null}

          <div className="flex flex-wrap items-center gap-3">
            <SubmitButton label={dictionary.growth.submit} pendingLabel={dictionary.growth.submitting} />
            <Button type="reset" variant="outline">
              {dictionary.common.reset}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
