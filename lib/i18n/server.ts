import { cookies } from "next/headers";

import { defaultLocale, isLocale, type Locale, localeCookieName } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/messages";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get(localeCookieName)?.value;

  return isLocale(locale) ? locale : defaultLocale;
}

export async function getI18n() {
  const locale = await getLocale();

  return {
    locale,
    dictionary: getDictionary(locale)
  };
}
