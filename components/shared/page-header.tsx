export function PageHeader({
  eyebrow,
  title,
  description
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-2">
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">{eyebrow}</p> : null}
      <div>
        <h1 className="font-[family-name:var(--font-heading)] text-4xl leading-tight text-foreground">{title}</h1>
        <p className="mt-2 max-w-2xl text-base text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
