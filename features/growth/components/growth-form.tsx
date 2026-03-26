"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { FormMessage } from "@/components/shared/form-message";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createGrowthEntryAction } from "@/features/growth/actions/create-growth-entry";
import { createGrowthSchema, type GrowthFormValues } from "@/features/growth/growth.schema";
import { formatDateTimeLocal } from "@/lib/utils";

export function GrowthForm({
  babies,
  dictionary,
  validation
}: {
  babies: Array<{ id: string; name: string }>;
  dictionary: {
    title: string;
    description: string;
    babyLabel: string;
    recordedAtLabel: string;
    weightLabel: string;
    heightLabel: string;
    noteLabel: string;
    notePlaceholder: string;
    submit: string;
    submitting: string;
  };
  validation: {
    babyIdRequired: string;
    recordedAtRequired: string;
    weightPositive: string;
    heightPositive: string;
    noteMax: string;
  };
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<GrowthFormValues>({
    resolver: zodResolver(createGrowthSchema(validation)),
    defaultValues: {
      babyId: babies[0]?.id ?? "",
      recordedAt: formatDateTimeLocal(new Date()),
      weightKg: 4.5,
      heightCm: 55,
      note: ""
    }
  });

  return (
    <Card className="border-white/70 bg-white/85">
      <CardHeader>
        <CardTitle>{dictionary.title}</CardTitle>
        <CardDescription>{dictionary.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((values) =>
            startTransition(async () => {
              const result = await createGrowthEntryAction(values);

              if (!result.ok) {
                Object.entries(result.fieldErrors ?? {}).forEach(([fieldName, errors]) => {
                  if (errors?.[0]) {
                    form.setError(fieldName as keyof GrowthFormValues, {
                      message: errors[0]
                    });
                  }
                });

                return;
              }

              form.reset({
                babyId: values.babyId,
                recordedAt: formatDateTimeLocal(new Date()),
                weightKg: values.weightKg,
                heightCm: values.heightCm,
                note: ""
              });
              router.refresh();
            })
          )}
        >
          <div className="space-y-2">
            <Label htmlFor="babyId-growth">{dictionary.babyLabel}</Label>
            <Select id="babyId-growth" {...form.register("babyId")}>
              {babies.map((baby) => (
                <option key={baby.id} value={baby.id}>
                  {baby.name}
                </option>
              ))}
            </Select>
            <FormMessage message={form.formState.errors.babyId?.message} tone="error" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recordedAt">{dictionary.recordedAtLabel}</Label>
            <Input id="recordedAt" type="datetime-local" {...form.register("recordedAt")} />
            <FormMessage message={form.formState.errors.recordedAt?.message} tone="error" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="weightKg">{dictionary.weightLabel}</Label>
              <Input id="weightKg" type="number" step="0.01" min={0.1} {...form.register("weightKg", { valueAsNumber: true })} />
              <FormMessage message={form.formState.errors.weightKg?.message} tone="error" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heightCm">{dictionary.heightLabel}</Label>
              <Input id="heightCm" type="number" step="0.1" min={1} {...form.register("heightCm", { valueAsNumber: true })} />
              <FormMessage message={form.formState.errors.heightCm?.message} tone="error" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="growth-note">{dictionary.noteLabel}</Label>
            <Textarea id="growth-note" placeholder={dictionary.notePlaceholder} {...form.register("note")} />
            <FormMessage message={form.formState.errors.note?.message} tone="error" />
          </div>

          <Button type="submit" className="w-full" disabled={isPending || babies.length === 0}>
            {isPending ? dictionary.submitting : dictionary.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
