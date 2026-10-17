import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/projects';
import ProjectPreview from './ProjectPreview';
import ProjectTags from './ProjectTags';

interface Props {
  project: Project;
  flip?: boolean;
  priority?: boolean;
}

export default function ProjectCard({ project: p, flip = false, priority }: Props) {
  return (
    <article
      id={p.slug}
      aria-labelledby={`p-${p.slug}`}
      className="project group mb-10 scroll-mt-20 lg:sticky lg:top-20 lg:mb-[14vh]"
      style={{ ['--accent' as string]: p.accent }}
    >
      <div
        className="stack-card relative isolate overflow-hidden rounded-3xl border border-line bg-bg2 p-6 md:p-12 lg:min-h-[calc(100svh-7rem)]"
        style={{ transformOrigin: 'top center' }}
      >
        <div
          className="pointer-events-none absolute -top-1/3 h-full w-2/3 opacity-40 blur-3xl"
          style={{ [flip ? 'left' : 'right']: '-15%', background: `radial-gradient(closest-side, ${p.accent}40, transparent)` } as React.CSSProperties}
          aria-hidden
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-[0.18em] select-none font-display text-[clamp(12rem,34vw,34rem)] font-bold leading-none tracking-tighter"
          style={{ [flip ? 'right' : 'left']: '-0.04em', color: 'transparent', WebkitTextStroke: `1px ${p.accent}30` } as React.CSSProperties}
        >
          {p.number}
        </span>

        <div className="relative grid gap-10 lg:min-h-[inherit] lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className={`lg:col-span-5 ${flip ? 'lg:order-2' : ''}`} data-stagger>
            <p className="font-mono text-xs text-mute">
              <span style={{ color: p.accent }}>{p.number}</span> / 05 &nbsp;{p.category}
            </p>
            <h3 id={`p-${p.slug}`} className="mt-4 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.03em] md:text-7xl">
              {p.title}
            </h3>
            <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-mute">{p.summary}</p>
            {p.role ? (
              <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-ink">
                <span className="font-mono text-xs text-mute">My role&nbsp; </span>
                {p.role}
              </p>
            ) : null}
            <div className="mt-6">
              <ProjectTags tags={p.tags} accent={p.accent} />
            </div>
            {p.stack && p.stack.length > 0 ? (
              <p className="mt-4 font-mono text-xs text-mute">Built with {p.stack.join(', ')}</p>
            ) : null}
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.cta} (opens in a new tab)`}
              className="cta-link mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all"
            >
              {p.cta}
              <ArrowUpRight size={16} aria-hidden />
            </a>
          </div>

          <div className={`lg:col-span-7 ${flip ? 'lg:order-1' : ''}`}>
            <ProjectPreview project={p} priority={priority} />
          </div>
        </div>
      </div>
    </article>
  );
}