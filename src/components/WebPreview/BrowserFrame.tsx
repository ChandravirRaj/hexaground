import type { CSSProperties } from "react";

interface BrowserFrameProps {
  label: string;
  url: string;
  style: CSSProperties;
  children: React.ReactNode;
}

/** A desktop-size page (1280×800) shown at half scale inside a browser window. */
export function BrowserFrame({ label, url, style, children }: BrowserFrameProps) {
  return (
    <figure className="flex shrink-0 flex-col items-center gap-2">
      <div className="rounded-xl bg-neutral-800 p-1.5 shadow-xl">
        <div style={style} className="overflow-hidden rounded-lg">
          <div className="flex items-center gap-3 bg-neutral-700 px-3 py-2" aria-hidden="true">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="flex-1 truncate rounded-md bg-neutral-800 px-3 py-0.5 text-center text-[10px] text-neutral-300">
              {url}
            </span>
          </div>
          <div className="relative h-[400px] w-[640px] overflow-hidden bg-m-bg text-m-text">
            <div className="absolute left-0 top-0 h-[800px] w-[1280px] origin-top-left scale-50">
              {children}
            </div>
          </div>
        </div>
      </div>
      <figcaption className="text-xs font-medium text-white/90">{label}</figcaption>
    </figure>
  );
}
