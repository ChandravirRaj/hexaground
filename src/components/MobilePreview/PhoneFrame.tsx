import type { CSSProperties } from "react";

interface PhoneFrameProps {
  label: string;
  style: CSSProperties;
  children: React.ReactNode;
}

export function PhoneFrame({ label, style, children }: PhoneFrameProps) {
  return (
    <figure className="flex shrink-0 flex-col items-center gap-2">
      <div className="rounded-[2.4rem] bg-neutral-900 p-2 shadow-xl">
        <div
          style={style}
          className="relative flex h-[560px] w-[270px] flex-col overflow-hidden rounded-[1.9rem] bg-m-bg text-m-text"
        >
          <div className="flex shrink-0 items-center justify-between px-5 pb-1 pt-2.5 text-[10px] font-semibold">
            <span>9:41</span>
            <span className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-neutral-900" />
            <span aria-hidden="true">●●●</span>
          </div>
          {children}
        </div>
      </div>
      <figcaption className="text-xs font-medium text-white/90">{label}</figcaption>
    </figure>
  );
}
