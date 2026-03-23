import { clsx, type ClassValue } from "clsx";
import { differenceInMonths, format } from "date-fns";
import { enUS, uk as ukLocale } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

import type { Locale } from "@/lib/i18n/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, locale: Locale = "en", pattern = "MMM d, yyyy") {
  return format(new Date(date), pattern, {
    locale: locale === "uk" ? ukLocale : enUS
  });
}

type AgeLabels = {
  newborn: string;
  month: string;
  months: string;
  year: string;
  years: string;
};

export function calculateAgeLabel(
  from: Date | string,
  to: Date | string = new Date(),
  labels: AgeLabels = {
    newborn: "Newborn",
    month: "month",
    months: "months",
    year: "year",
    years: "years"
  }
) {
  const totalMonths = Math.max(0, differenceInMonths(new Date(to), new Date(from)));

  if (totalMonths < 1) {
    return labels.newborn;
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) {
    return `${months} ${months === 1 ? labels.month : labels.months}`;
  }

  if (months === 0) {
    return `${years} ${years === 1 ? labels.year : labels.years}`;
  }

  return `${years} ${years === 1 ? labels.year : labels.years} ${months} ${months === 1 ? labels.month : labels.months}`;
}

export function formatMessage(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}
