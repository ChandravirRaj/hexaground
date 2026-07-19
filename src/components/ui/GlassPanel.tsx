import { cn } from "@/lib/cn";

interface GlassPanelProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function GlassPanel({
  title,
  children,
  className,
  contentClassName,
}: GlassPanelProps) {
  return (
    <section
      className={cn(
        "rounded-xl bg-white/70 shadow-soft ring-1 ring-white/60 backdrop-blur-xl",
        className
      )}
    >
      {title && (
        <div className="border-b border-white/50 px-4 py-2.5">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
            {title}
          </h2>
        </div>
      )}
      <div className={cn("p-4", contentClassName)}>{children}</div>
    </section>
  );
}
