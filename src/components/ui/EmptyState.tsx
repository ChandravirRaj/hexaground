import type { LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  hint,
  children,
}: {
  icon: LucideIcon;
  title: string;
  hint: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 py-5 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="text-sm font-semibold text-neutral-700">{title}</p>
      <p className="max-w-[220px] text-xs text-neutral-500">{hint}</p>
      {children}
    </div>
  );
}
