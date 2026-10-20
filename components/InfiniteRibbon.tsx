import type * as React from 'react';

export interface InfiniteRibbonProps {
  /** how many times the text repeats per half of the loop */
  repeat?: number;
  /** seconds for one full loop */
  duration?: number;
  reverse?: boolean;
  /** degrees */
  rotation?: number;
  children: React.ReactNode;
  className?: string;
}

const styles = `
@keyframes ribbon-run { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes ribbon-run-reverse { from { transform: translateX(-50%); } to { transform: translateX(0); } }
@media (prefers-reduced-motion: reduce) { .ribbon-track { animation: none !important; } }
`;

/**
 * Endless scrolling ribbon (adapted from the shadcn "infinite-ribbon" component).
 * Colours / size come from `className`; it freezes when the site's Motion toggle is off
 * (globals.css kills animations under html[data-motion='off']).
 */
export default function InfiniteRibbon({
  repeat = 5,
  duration = 30,
  reverse = false,
  rotation = 0,
  children,
  className = '',
}: InfiniteRibbonProps) {
  const count = Math.max(1, Math.floor(repeat));
  const name = reverse ? 'ribbon-run-reverse' : 'ribbon-run';

  return (
    <div className={`overflow-hidden ${className}`} style={{ transform: `rotate(${rotation}deg)` }}>
      <span className="sr-only">{children}</span>
      <div
        aria-hidden="true"
        className="ribbon-track flex h-full w-max items-center whitespace-nowrap"
        style={{ animation: `${name} ${Math.max(0.1, duration)}s linear infinite` }}
      >
        {Array.from({ length: count * 2 }, (_, i) => (
          <span className="mr-8 inline-block select-none" key={i}>
            {children}
          </span>
        ))}
      </div>
      <style>{styles}</style>
    </div>
  );
}