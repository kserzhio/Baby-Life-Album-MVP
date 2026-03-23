import Link from "next/link";
import { ArrowRight, Baby, Cake, HeartHandshake, Ruler } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MemoryCard } from "@/features/memories/components/memory-card";
import { getDashboardData } from "@/features/dashboard/data/dashboard.repository";
import { getI18n } from "@/lib/i18n/server";
import { formatDate, formatMessage } from "@/lib/utils";

export async function DashboardContent() {
  const { locale, dictionary } = await getI18n();
  const data = await getDashboardData(locale);

  if (!data) {
    return (
      <EmptyState
        title={dictionary.dashboard.noChildProfile}
        description={dictionary.dashboard.noChildProfileDescription}
      />
    );
  }

  const childName = [data.child.firstName, data.child.lastName].filter(Boolean).join(" ");

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={dictionary.dashboard.eyebrow}
        title={formatMessage(dictionary.dashboard.title, { name: data.child.firstName })}
        description={dictionary.dashboard.description}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label={dictionary.dashboard.currentAge}
          value={data.childAge}
          hint={formatMessage(dictionary.dashboard.bornOn, { date: formatDate(data.child.birthDate, locale) })}
        />
        <StatCard
          label={dictionary.dashboard.memoriesSaved}
          value={String(data.stats.totalMemories)}
          hint={dictionary.dashboard.memoriesSavedHint}
        />
        <StatCard
          label={dictionary.dashboard.growthEntries}
          value={String(data.stats.totalGrowthEntries)}
          hint={dictionary.dashboard.growthEntriesHint}
        />
        <StatCard
          label={dictionary.dashboard.latestWeight}
          value={data.latestGrowth ? `${data.latestGrowth.weightKg.toFixed(1)} kg` : dictionary.common.noData}
          hint={
            data.latestGrowth
              ? formatMessage(dictionary.dashboard.loggedOn, { date: formatDate(data.latestGrowth.recordedAt, locale) })
              : dictionary.dashboard.addGrowthToBegin
          }
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="overflow-hidden border-white/70 bg-white/85">
          <CardContent className="grid gap-6 p-0 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5 p-6">
              <Badge variant="accent" className="w-fit">
                {dictionary.dashboard.familySnapshot}
              </Badge>
              <div>
                <h2 className="font-[family-name:var(--font-heading)] text-4xl leading-tight">{childName}</h2>
                <p className="mt-3 max-w-xl text-muted-foreground">{dictionary.dashboard.snapshotDescription}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-secondary p-4">
                  <Cake className="h-5 w-5 text-primary" />
                  <p className="mt-3 font-semibold">{dictionary.dashboard.birthDate}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(data.child.birthDate, locale)}</p>
                </div>
                <div className="rounded-3xl bg-secondary p-4">
                  <Ruler className="h-5 w-5 text-primary" />
                  <p className="mt-3 font-semibold">{dictionary.dashboard.latestHeight}</p>
                  <p className="text-sm text-muted-foreground">
                    {data.latestGrowth ? `${data.latestGrowth.heightCm.toFixed(1)} cm` : dictionary.growth.addGrowthEntry}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/memories/new">
                    {dictionary.common.addMemory}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/growth">{dictionary.dashboard.viewGrowthTracker}</Link>
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-200 via-amber-50 to-emerald-100 p-6">
              <div className="grid gap-4">
                <div className="rounded-3xl bg-white/80 p-5">
                  <Baby className="h-6 w-6 text-primary" />
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {dictionary.dashboard.currentAge}
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-heading)] text-3xl">{data.childAge}</p>
                </div>
                <div className="rounded-3xl bg-white/80 p-5">
                  <HeartHandshake className="h-6 w-6 text-primary" />
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {dictionary.dashboard.topCategories}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {data.memoryHighlights.slice(0, 4).map((item) => (
                      <Badge key={item.category} variant="outline">
                        {item.label}: {item.total}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/70 bg-white/85">
          <CardHeader>
            <CardTitle>{dictionary.dashboard.recentActivity}</CardTitle>
            <CardDescription>{dictionary.dashboard.recentActivityDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.recentMemories.length === 0 ? (
              <EmptyState
                title={dictionary.dashboard.noRecentMemories}
                description={dictionary.dashboard.noRecentMemoriesDescription}
                actionHref="/memories/new"
                actionLabel={dictionary.common.addMemory}
              />
            ) : (
              data.recentMemories.map((memory) => (
                <div key={memory.id} className="rounded-3xl bg-secondary/70 p-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge>{memory.categoryLabel}</Badge>
                    <Badge variant="accent">{memory.ageLabel}</Badge>
                  </div>
                  <p className="mt-3 text-lg font-semibold">{memory.title}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(memory.eventDate, locale)}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl">{dictionary.dashboard.featuredMemories}</h2>
            <p className="text-muted-foreground">{dictionary.dashboard.featuredMemoriesDescription}</p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/timeline">{dictionary.dashboard.openFullTimeline}</Link>
          </Button>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {data.recentMemories.slice(0, 2).map((memory) => (
            <MemoryCard key={memory.id} memory={memory} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}
