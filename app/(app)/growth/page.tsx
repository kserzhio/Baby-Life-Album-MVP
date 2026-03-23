import { PageHeader } from "@/components/shared/page-header";
import { GrowthForm } from "@/features/growth/components/growth-form";
import { GrowthTable } from "@/features/growth/components/growth-table";
import { getGrowthEntries } from "@/features/growth/data/growth.repository";
import { getI18n } from "@/lib/i18n/server";

export default async function GrowthPage() {
  const { locale, dictionary } = await getI18n();
  const entries = await getGrowthEntries();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={dictionary.growth.eyebrow}
        title={dictionary.growth.title}
        description={dictionary.growth.description}
      />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <GrowthForm dictionary={dictionary} />
        <GrowthTable entries={entries} locale={locale} dictionary={dictionary} />
      </div>
    </div>
  );
}
