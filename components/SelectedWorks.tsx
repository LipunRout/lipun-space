import type { CSSProperties } from 'react';
import { projects } from '@/lib/projects';
import FlowArt, { FlowSection } from './FlowArt';
import ProjectCard from './ProjectCard';

const introStyle: CSSProperties = {
  background: 'radial-gradient(80% 60% at 85% 0%, rgba(0,229,255,0.12), transparent 60%), radial-gradient(60% 50% at 0% 100%, rgba(255,36,79,0.08), transparent 60%), #030406',
};

export default function SelectedWorks() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative scroll-mt-0">
      <FlowArt aria-label="Selected works">
        <FlowSection aria-label="Selected works introduction" style={introStyle}>
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] tracking-[0.14em] md:text-xs">
            <span className="text-cyan">SELECTED WORKS · 2023—2026</span>
            <span className="text-mute">{String(projects.length).padStart(2, '0')} FEATURED PROJECTS</span>
          </div>
          <hr className="border-0 border-t border-white/15" />

          <h2 id="work-title" className="font-display text-[clamp(3.4rem,11.5vw,12.5rem)] leading-[0.88] tracking-[-0.03em]">
            Ideas into
            <br />
            <em className="italic">digital reality.</em>
          </h2>

          <hr className="border-0 border-t border-white/15" />
          <div className="mt-auto grid gap-8 md:grid-cols-12 md:items-end">
            <p className="max-w-[52ch] text-base leading-relaxed text-mute md:col-span-6 md:text-lg">
              From AI-powered concepts to production-ready platforms, I build digital experiences that solve real problems through thoughtful engineering and design.
            </p>
            <nav aria-label="Projects" className="flex flex-wrap gap-x-8 gap-y-3 md:col-span-6 md:justify-end">
              {projects.map((p, i) => (
                <a key={p.slug} href={`#${p.slug}`} className="link-underline font-mono text-xs text-mute transition-colors hover:text-ink">
                  <span style={{ color: p.accent }}>{String(i + 1).padStart(2, '0')}</span>&nbsp; {p.title}
                </a>
              ))}
            </nav>
          </div>
        </FlowSection>

        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} total={projects.length} next={projects[i + 1]?.title} priority={i === 0} />
        ))}
      </FlowArt>
    </section>
  );
}