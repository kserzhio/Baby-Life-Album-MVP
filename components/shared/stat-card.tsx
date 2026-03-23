import { Card, CardContent } from "@/components/ui/card";

export function StatCard({
  label,
  value,
  hint
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <Card className="border-white/70 bg-white/80">
      <CardContent className="space-y-2 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
        <p className="font-[family-name:var(--font-heading)] text-4xl text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  );
}
