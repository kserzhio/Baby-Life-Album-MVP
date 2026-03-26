import { Baby, Cookie, MoonStar, NotebookPen, RotateCcw, Ruler } from "lucide-react";
import Link from "next/link";

import { requireCurrentUser } from "@/features/auth/data/auth.repository";
import { BabyForm } from "@/features/babies/components/baby-form";
import { getDashboardData } from "@/features/dashboard/data/dashboard.repository";
import { EventForm } from "@/features/events/components/event-form";
import { EventList } from "@/features/events/components/event-list";
import { getI18n } from "@/lib/i18n/server";

const iconMap = {
  babies: Baby,
  feeding: Cookie,
  sleep: MoonStar,
  diaper: RotateCcw,
  note: NotebookPen,
  growth: Ruler
};

export async function DashboardContent() {
  const user = await requireCurrentUser();
  const { dictionary, locale } = await getI18n();
  const data = await getDashboardData(user.id);

  const cards = [
    { key: "babies", label: dictionary.dashboard.totalBabies, value: data.summary.babies },
    { key: "feeding", label: dictionary.dashboard.feedingCount, value: data.summary.feeding },
    { key: "sleep", label: dictionary.dashboard.sleepCount, value: data.summary.sleep },
    { key: "diaper", label: dictionary.dashboard.diaperCount, value: data.summary.diaper },
    { key: "note", label: dictionary.dashboard.noteCount, value: data.summary.note },
    { key: "growth", label: dictionary.dashboard.growthCount, value: data.summary.growth }
  ] as const;

  return (
    <div className="space-y-6">
      <section className="space-y-1">
        <h1 className="font-[family-name:var(--font-heading)] text-4xl text-foreground">{dictionary.dashboard.title}</h1>
        <p className="text-muted-foreground">{dictionary.dashboard.description}</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {cards.map((card) => {
          const Icon = iconMap[card.key];

          return (
            <article key={card.key} className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-muted-foreground">{card.label}</p>
                <div className="rounded-2xl bg-secondary p-3 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-6 font-[family-name:var(--font-heading)] text-5xl text-foreground">{card.value}</p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
        {data.babies.length === 0 ? (
          <div className="space-y-4 rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-soft">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                {dictionary.dashboard.quickActionsTitle}
              </p>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl text-foreground">
                {dictionary.dashboard.onboardingTitle}
              </h2>
              <p className="text-sm leading-6 text-muted-foreground">{dictionary.dashboard.onboardingDescription}</p>
            </div>
            <div className="rounded-3xl bg-secondary/70 p-4">
              <ul className="space-y-2 text-sm text-foreground">
                <li>{dictionary.dashboard.onboardingStepOne}</li>
                <li>{dictionary.dashboard.onboardingStepTwo}</li>
              </ul>
            </div>
            <BabyForm dictionary={dictionary.babies} validation={dictionary.validation} />
          </div>
        ) : (
          <EventForm
            babies={data.babies.map((baby) => ({ id: baby.id, name: baby.name }))}
            dictionary={dictionary.eventForm}
            validation={dictionary.validation}
          />
        )}

        <div className="space-y-6">
          <div className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-soft">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl text-foreground">
              {dictionary.dashboard.babiesTitle}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{dictionary.dashboard.summarySubtitle}</p>
            {data.babies.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">{dictionary.dashboard.addBabyHint}</p>
            ) : (
              <div className="mt-4 flex flex-wrap gap-3">
                {data.babies.map((baby) => (
                  <div key={baby.id} className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-foreground">
                    {baby.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <section className="space-y-3">
            <div className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-[family-name:var(--font-heading)] text-3xl text-foreground">
                    {dictionary.dashboard.growthTitle}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">{dictionary.dashboard.growthDescription}</p>
                </div>
                <Link href="/growth" className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-foreground">
                  {dictionary.dashboard.openGrowth}
                </Link>
              </div>
              {data.latestGrowthEntries.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">{dictionary.dashboard.noGrowthYet}</p>
              ) : (
                <div className="mt-4 grid gap-3">
                  {data.latestGrowthEntries.map((item) => (
                    <div key={item.babyId} className="rounded-3xl bg-secondary/70 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{item.babyName}</p>
                        <p className="text-xs font-medium text-muted-foreground">
                          {new Date(item.entry.recordedAt).toLocaleDateString(locale === "uk" ? "uk-UA" : "en-US")}
                        </p>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-foreground">
                          {item.entry.weightKg} {dictionary.growth.weightUnit}
                        </span>
                        <span className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-foreground">
                          {item.entry.heightCm} {dictionary.growth.heightUnit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <section className="space-y-3">
              <h2 className="font-[family-name:var(--font-heading)] text-3xl text-foreground">
                {dictionary.dashboard.recentTitle}
              </h2>
              <EventList
                events={data.babies.length === 0 ? data.todayEvents : data.recentEvents}
                emptyTitle={dictionary.dashboard.emptyTitle}
                emptyDescription={dictionary.dashboard.emptyDescription}
                dictionary={dictionary}
                locale={locale}
              />
            </section>
          </section>
        </div>
      </section>
    </div>
  );
}
