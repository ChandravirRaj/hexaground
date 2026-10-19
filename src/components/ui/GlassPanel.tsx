import { cn } from "@/lib/cn";

interface GlassPanelProps {
  id?: string;
  title?: string;
  /** Optional control shown on the right of the title bar. */
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function GlassPanel({
  id,
  title,
  action,
  children,
  className,
  contentClassName,
}: GlassPanelProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-16 rounded-3xl bg-white/70 shadow-soft ring-1 ring-white/60 backdrop-blur-xl",
        className
      )}
    >
      {title && (
        <div className="flex items-center justify-between gap-2 border-b border-white/50 px-4 py-2.5">
          <h2 className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-400">
            {title}
          </h2>
          {action}
        </div>
      )}
      <div className={cn("p-4", contentClassName)}>{children}</div>
    </section>
  );
}
