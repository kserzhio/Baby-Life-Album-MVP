import type { ReactNode } from "react";
import Link from "next/link";

import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/features/locale/components/language-switcher";
import { navigationItems } from "@/lib/constants";
import { getI18n } from "@/lib/i18n/server";

export async function AppShell({ children }: { children: ReactNode }) {
  const { locale, dictionary } = await getI18n();
  const navigation = navigationItems.map((item) => ({
    href: item.href,
    label: dictionary.navigation[item.key]
  }));

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r border-white/60 bg-white/50 px-6 py-8 backdrop-blur lg:block">
        <SidebarNav
          title={dictionary.sidebar.title}
          description={dictionary.sidebar.description}
          items={navigation}
        />
      </aside>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/70 bg-background/80 px-4 py-4 backdrop-blur lg:px-8">
          <div>
            <p className="font-[family-name:var(--font-heading)] text-2xl text-foreground">{dictionary.common.appName}</p>
            <p className="text-sm text-muted-foreground">{dictionary.common.appDescription}</p>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher
              currentLocale={locale}
              label={dictionary.common.language}
              options={[
                { value: "en", label: dictionary.common.english },
                { value: "uk", label: dictionary.common.ukrainian }
              ]}
            />
            <Button asChild variant="outline" className="hidden sm:inline-flex lg:hidden">
              <Link href="/memories/new">{dictionary.common.addMemory}</Link>
            </Button>
          </div>
        </header>
        <div className="border-b border-white/60 bg-white/60 px-4 py-3 backdrop-blur lg:hidden">
          <nav className="flex gap-2 overflow-x-auto">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
