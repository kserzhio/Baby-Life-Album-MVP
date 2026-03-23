"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Heart, LayoutDashboard, LineChart, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";

const iconMap = {
  "/dashboard": LayoutDashboard,
  "/timeline": CalendarDays,
  "/memories/new": PlusCircle,
  "/growth": LineChart
};

export function SidebarNav({
  title,
  description,
  items
}: {
  title: string;
  description: string;
  items: Array<{ href: string; label: string }>;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="rounded-[28px] bg-gradient-to-br from-orange-100 via-amber-50 to-emerald-100 p-5 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/80 p-3 text-primary">
            <Heart className="h-6 w-6 fill-current" />
          </div>
          <div>
            <p className="font-[family-name:var(--font-heading)] text-2xl leading-none">{title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>

      <nav className="mt-8 space-y-2">
        {items.map((item) => {
          const Icon = iconMap[item.href as keyof typeof iconMap];
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:bg-white/80 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
