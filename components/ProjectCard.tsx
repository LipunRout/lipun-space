import { ArrowDown, ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Project } from '@/lib/projects';
import { FlowSection } from './FlowArt';
import ProjectPreview from './ProjectPreview';
import ProjectTags from './ProjectTags';

interface Props {
  project: Project;
  index: number;
  total: number;
  next?: string;
  priority?: boolean;
}

const surfaces = ['#05080c', '#070a10', '#04060a', '#080b12', '#05070b'];

/** "Web Journal" -> Web <i>Journal</i>; "SocietyConnect.ai" -> SocietyConnect<i>.ai</i> */
function Title({ text }: { text: string }) {
  if (text.includes('.')) {
    const at = text.indexOf('.');
    return (
      <>
        {text.slice(0, at)}
        <em className="italic">{text.slice(at)}</em>
      </>
    );
  }
  const words = text.split(' ');
  if (words.length < 2) return <>{text}</>;
  return (
    <>
      {words.slice(0, -1).join(' ')} <em className="italic">{words[words.length - 1]}</em>
    </>
  );
}

export default function ProjectCard({ project: p, index, total, next, priority }: Props) {
  const side = index % 2 === 0 ? '100%' : '0%';
  const style = {
    ['--accent' as string]: p.accent,
    background: `radial-gradient(90% 70% at ${side} 0%, ${p.accent}26, transparent 60%), ${surfaces[index % surfaces.length]}`,
  } as CSSProperties;
  const num = String(index + 1).padStart(2, '0');

  return (
    <FlowSection id={p.slug} aria-label={p.title} innerClassName="project group border-t border-white/10" style={style}>
      {/* outlined number */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-[0.14em] right-[-0.02em] select-none font-display text-[clamp(10rem,32vw,30rem)] leading-none tracking-tighter"
        style={{ color: 'transparent', WebkitTextStroke: `1px ${p.accent}2e` }}
      >
        {num}
      </span>

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] tracking-[0.14em] text-mute md:text-xs">
        <span>
          <span style={{ color: p.accent }}>{num}</span> / {String(total).padStart(2, '0')}
        </span>
        <span className="text-right">{p.category}</span>
      </div>
      <hr className="relative z-10 border-0 border-t border-white/15" />

      <div className="relative z-10 grid flex-1 content-center gap-8 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-6">
        <h3 id={`p-${p.slug}`} className="break-words font-display text-[clamp(2.6rem,7vw,7.5rem)] leading-[0.9] tracking-[-0.03em] lg:col-span-7 lg:row-start-1">
          <Title text={p.title} />
        </h3>

        <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-center">
          <ProjectPreview project={p} priority={priority} />
        </div>

        <div className="lg:col-span-7 lg:row-start-2">
          <p className="max-w-[52ch] text-[15px] leading-relaxed text-mute md:text-lg">{p.summary}</p>
          {p.role ? (
            <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-ink">
              <span className="font-mono text-xs text-mute">My role&nbsp; </span>
              {p.role}
            </p>
          ) : null}
          <div className="mt-5">
            <ProjectTags tags={p.tags} accent={p.accent} />
          </div>
          {p.stack && p.stack.length > 0 ? (
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-mute md:text-xs">Built with {p.stack.join(', ')}</p>
          ) : null}
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${p.cta} (opens in a new tab)`}
            className="cta-link mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all active:scale-[0.98] sm:inline-flex sm:w-auto"
          >
            {p.cta}
            <ArrowUpRight size={16} aria-hidden />
          </a>
        </div>
      </div>

      <hr className="relative z-10 border-0 border-t border-white/15" />
      <div className="relative z-10 flex items-center justify-between font-mono text-[11px] tracking-[0.14em] text-mute">
        <span>{next ? `NEXT — ${next.toUpperCase()}` : 'END OF SELECTED WORKS'}</span>
        {next ? <ArrowDown size={14} aria-hidden /> : null}
      </div>
    </FlowSection>
  );
}