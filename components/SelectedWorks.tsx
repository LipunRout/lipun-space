import { projects } from '@/lib/projects';
import ProjectCard from './ProjectCard';

export default function SelectedWorks() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative scroll-mt-16 px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs text-cyan">SELECTED WORKS · 2023—2026</p>
            <h2 id="work-title" data-rl className="mt-5 font-display text-[clamp(3rem,9vw,8.5rem)] font-medium leading-[0.92] tracking-tight">
              <span className="rl block overflow-hidden pb-[0.08em]"><span className="block">Ideas into</span></span>
              <span className="rl block overflow-hidden pb-[0.08em]"><span className="block">digital reality.</span></span>
            </h2>
          </div>
          <div className="md:text-right">
            <p className="font-display text-6xl font-light leading-none tracking-tight">05</p>
            <p className="mt-2 font-mono text-xs text-mute">Featured Projects</p>
          </div>
        </div>
        <p className="mt-10 max-w-[56ch] text-lg leading-relaxed text-mute">
          From AI-powered concepts to production-ready platforms, I build digital experiences that solve real problems through thoughtful engineering and design.
        </p>

        <nav aria-label="Projects" className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-y border-line py-4">
          {projects.map((p) => (
            <a key={p.slug} href={`#${p.slug}`} className="link-underline font-mono text-xs text-mute transition-colors hover:text-ink">
              <span style={{ color: p.accent }}>{p.number}</span>&nbsp; {p.title}
            </a>
          ))}
        </nav>

        <div className="mt-16 md:mt-24">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} flip={i % 2 === 1} priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}