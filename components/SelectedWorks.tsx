import { projects } from '@/lib/projects';
import ProjectCard from './ProjectCard';

export default function SelectedWorks() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative scroll-mt-16 px-5 py-20 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-8">
          <div>
            <p className="font-mono text-[11px] text-cyan md:text-xs">SELECTED WORKS · 2023—2026</p>
            <h2 id="work-title" data-rl className="mt-4 font-display text-[clamp(2.4rem,11vw,8.5rem)] font-medium leading-[0.95] tracking-tight md:mt-5 md:leading-[0.92]">
              <span className="rl block overflow-hidden pb-[0.1em]"><span className="block">Ideas into</span></span>
              <span className="rl block overflow-hidden pb-[0.1em]"><span className="block">digital <em className="italic">reality.</em></span></span>
            </h2>
          </div>
          <div className="flex items-baseline gap-3 md:block md:text-right">
            <p className="font-display text-4xl font-light leading-none tracking-tight md:text-6xl">05</p>
            <p className="font-mono text-xs text-mute md:mt-2">Featured Projects</p>
          </div>
        </div>

        <p className="mt-6 max-w-[56ch] text-base leading-relaxed text-mute md:mt-10 md:text-lg">
          From AI-powered concepts to production-ready platforms, I build digital experiences that solve real problems through thoughtful engineering and design.
        </p>

        {/* Phone: one swipeable row. Desktop: wraps as before. */}
        <nav
          aria-label="Projects"
          className="-mx-5 mt-8 flex snap-x gap-x-6 overflow-x-auto border-y border-line px-5 [scrollbar-width:none] md:mx-0 md:mt-12 md:flex-wrap md:gap-x-8 md:gap-y-3 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((p) => (
            <a
              key={p.slug}
              href={`#${p.slug}`}
              className="link-underline inline-flex min-h-12 shrink-0 snap-start items-center whitespace-nowrap font-mono text-xs text-mute transition-colors hover:text-ink md:min-h-0 md:py-4"
            >
              <span style={{ color: p.accent }}>{p.number}</span>&nbsp; {p.title}
            </a>
          ))}
        </nav>

        <div className="mt-10 space-y-16 md:mt-24 md:space-y-0">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} flip={i % 2 === 1} priority={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}