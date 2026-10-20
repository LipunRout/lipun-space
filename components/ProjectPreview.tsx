'use client';
import { useRef, useState } from 'react';
import type { Project } from '@/lib/projects';
import { useMotion } from './MotionProvider';

/** Live screenshot service (no key). Replace by setting `image` on a project in lib/projects.ts. */
const shot = (url: string) => `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=1440&h=900`;

function Bars({ accent }: { accent: string }) {
  return (
    <>
      <div className="h-2 w-1/3 rounded-full" style={{ background: accent, opacity: 0.8 }} />
      <div className="mt-2 h-2 w-2/3 rounded-full bg-white/10" />
      <div className="mt-2 h-2 w-1/2 rounded-full bg-white/10" />
    </>
  );
}

function Placeholder({ p }: { p: Project }) {
  const light = p.kind === 'school';
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: light
          ? 'linear-gradient(160deg, #FFF8E7, #FFE9B8)'
          : `radial-gradient(120% 90% at 85% 0%, ${p.accent}33, transparent 60%), #0A0F17`,
      }}
    >
      <div className="absolute inset-0 grid-bg opacity-60" />
      {p.kind === 'dashboard' ? (
        <div className="absolute inset-4 grid grid-cols-[18%_1fr] gap-3">
          <div className="rounded-lg bg-white/[0.04] p-3"><Bars accent={p.accent} /></div>
          <div className="rounded-lg bg-white/[0.04] p-3"><Bars accent={p.accent} /></div>
        </div>
      ) : (
        <div className="absolute inset-6 flex flex-col justify-center">
          <div className={`h-4 w-3/4 rounded-full ${light ? 'bg-black/70' : 'bg-white/85'}`} />
          <div className={`mt-3 h-4 w-1/2 rounded-full ${light ? 'bg-black/70' : 'bg-white/85'}`} />
          <div className="mt-6 h-8 w-28 rounded-full" style={{ background: p.accent }} />
        </div>
      )}
      <div className="absolute bottom-3 right-4 font-display text-2xl font-semibold" style={{ color: light ? '#3a2a00' : p.accent }}>
        {p.title}
      </div>
    </div>
  );
}

export default function ProjectPreview({ project, priority = false }: { project: Project; priority?: boolean }) {
  const host = project.url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const { motion } = useMotion();
  const tilt = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const src = project.image ?? shot(project.url);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = tilt.current;
    if (!el || !motion || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 9}deg) scale(1.015)`;
  };
  const onLeave = () => {
    if (tilt.current) tilt.current.style.transform = '';
  };

  return (
    <div className="relative" style={{ perspective: '1400px' }} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div
        className="absolute -inset-3 -z-10 hidden rounded-[40px] opacity-60 blur-3xl md:-inset-6 md:block"
        style={{ background: `radial-gradient(closest-side, ${project.accent}55, transparent)` }}
        aria-hidden
      />
      <div
        ref={tilt}
        className="preview-frame overflow-hidden rounded-xl border border-line bg-surface will-change-transform md:rounded-[14px]"
        style={{ transition: 'transform 0.25s ease-out' }}
      >
        <div className="flex h-8 items-center gap-1.5 border-b border-line bg-bg2 px-3 md:h-9 md:gap-2">
          <span className="h-2 w-2 rounded-full bg-signal/70 md:h-2.5 md:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-white/15 md:h-2.5 md:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-white/15 md:h-2.5 md:w-2.5" />
          <span className="ml-2 truncate rounded-full bg-white/[0.05] px-3 py-0.5 font-mono text-[10px] text-mute md:ml-3 md:py-1 md:text-[11px]">{host}</span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <div className="preview-img absolute inset-0">
            <Placeholder p={project} />
            {!failed && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={`Screenshot of the ${project.title} website`}
                loading={priority ? 'eager' : 'lazy'}
                decoding="async"
                onLoad={() => setLoaded(true)}
                onError={() => setFailed(true)}
                className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}