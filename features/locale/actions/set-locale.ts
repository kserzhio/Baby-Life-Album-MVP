"use server";

import { cookies } from "next/headers";

import { defaultLocale, isLocale, localeCookieName } from "@/lib/i18n/config";

export async function setLocale(nextLocale: string) {
  const cookieStore = await cookies();
  const locale = isLocale(nextLocale) ? nextLocale : defaultLocale;

  cookieStore.set(localeCookieName, locale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365
  });
}
