import { BabyForm } from "@/features/babies/components/baby-form";
import { requireCurrentUser } from "@/features/auth/data/auth.repository";
import { getBabiesByUser } from "@/features/babies/data/babies.repository";
import { GrowthForm } from "@/features/growth/components/growth-form";
import { GrowthTable } from "@/features/growth/components/growth-table";
import { getGrowthEntriesByUser } from "@/features/growth/data/growth.repository";
import { getI18n } from "@/lib/i18n/server";

type GrowthBabyItem = Awaited<ReturnType<typeof getBabiesByUser>>[number];

export async function GrowthPageContent() {
  const user = await requireCurrentUser();
  const { dictionary, locale } = await getI18n();
  const [babies, entries] = await Promise.all([getBabiesByUser(user.id), getGrowthEntriesByUser(user.id)]);

  return (
    <div className="space-y-6">
      <section className="space-y-1">
        <h1 className="font-[family-name:var(--font-heading)] text-4xl text-foreground">{dictionary.growth.title}</h1>
        <p className="text-muted-foreground">{dictionary.growth.description}</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
        {babies.length === 0 ? (
          <BabyForm dictionary={dictionary.babies} validation={dictionary.validation} />
        ) : (
          <GrowthForm
            babies={babies.map((baby: GrowthBabyItem) => ({ id: baby.id, name: baby.name }))}
            dictionary={dictionary.growth}
            validation={dictionary.validation}
          />
        )}

        <GrowthTable entries={entries} locale={locale} dictionary={dictionary.growth} />
      </section>
    </div>
  );
}
