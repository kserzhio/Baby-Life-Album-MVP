import { PageHeader } from "@/components/shared/page-header";
import { MemoryForm } from "@/features/memories/components/memory-form";
import { getI18n } from "@/lib/i18n/server";

export default async function AddMemoryPage() {
  const { dictionary } = await getI18n();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow={dictionary.memoryForm.eyebrow}
        title={dictionary.memoryForm.title}
        description={dictionary.memoryForm.description}
      />
      <MemoryForm dictionary={dictionary} />
    </div>
  );
}
