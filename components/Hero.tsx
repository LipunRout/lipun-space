import { ArrowDown, ArrowUpRight, Github, Instagram, Linkedin } from 'lucide-react';
import { site } from '@/lib/site';
import HalftonePortrait from './HalftonePortrait';

const icons = { github: Github, linkedin: Linkedin, instagram: Instagram } as const;

export default function Hero() {
  return (
    <section id="top" className="hero relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <div className="hero-cols pointer-events-none absolute inset-0 -z-20" aria-hidden />
      <div className="hero-sweep pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />

      {/* Halftone portrait */}
      <div className="pointer-events-none fixed inset-x-0 top-[78px] -z-10 flex justify-center md:top-[92px]">
        <div className="hero-photo">
          <div className="hero-photo-inner portrait relative">
            <HalftonePortrait src="/lipun.jpg" label="Portrait of Lipun Rout" />
          </div>
        </div>
      </div>

      {/* Corner labels */}
      <p className="hero-fade absolute left-5 top-[104px] hidden font-mono text-[11px] tracking-[0.12em] text-ink/80 md:left-10 md:top-[132px] md:block">
        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-signal align-middle" />
        ENGINEER. FREELANCER. BUILDER.
      </p>
      <p className="hero-fade absolute right-5 top-[104px] hidden font-mono text-[11px] tracking-[0.12em] text-mute md:right-10 md:top-[132px] md:block">
        FULL-STACK &middot; AI &middot; FREELANCE
      </p>
      <div className="hero-fade absolute left-10 top-[34%] hidden font-mono text-[11px] tracking-[0.12em] lg:block">
        <p className="text-signal">01 / PRESENCE</p>
        <p className="mt-10 text-xl text-cyan">+</p>
        <ul className="mt-5 space-y-2 text-mute">
          <li>ENGINEERING</li>
          <li>AI PRODUCTS</li>
          <li>REAL REQUIREMENTS</li>
        </ul>
      </div>

      <div className="mt-auto px-5 pb-6 pt-[46svh] md:px-10 md:pt-[52svh]">
        <p className="hero-fade mb-2 text-center font-mono text-[11px] tracking-[0.18em] text-mute md:mb-0">
          SOFTWARE DEVELOPER @ {site.employer.toUpperCase()}
        </p>

        <h1 className="text-center font-serif text-[clamp(3.2rem,11.5vw,10.5rem)] leading-[0.88] tracking-[-0.03em] text-ink">
          <span className="hero-line block overflow-hidden px-[0.06em] pb-[0.14em]">
            <span className="block">
              Lipun <em className="italic">Rout</em>
            </span>
          </span>
        </h1>

        <p className="hero-fade mx-auto mt-3 max-w-[40ch] text-center text-base leading-relaxed text-ink/90 md:text-lg">
          I turn ideas into intelligent digital products, from the first requirement to the final deploy.
        </p>

        <div className="hero-fade mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <a href="#work" className="btn-ghost inline-flex min-h-12 items-center gap-3 rounded-full border border-white/25 px-6 text-sm font-medium">
            Explore my work <ArrowDown size={16} aria-hidden />
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 border-b border-white/50 pb-1 text-sm transition-colors hover:border-cyan hover:text-cyan">
            Start a conversation <ArrowUpRight size={14} aria-hidden />
          </a>
        </div>

        <ul className="hero-fade mt-6 flex justify-center gap-2 md:hidden" aria-label="Social profiles">
          {site.socials.map((s) => {
            const Icon = icons[s.id];
            return (
              <li key={s.id}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-mute">
                  <Icon size={17} aria-hidden />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hero-fade mt-8 hidden items-center justify-between font-mono text-[11px] tracking-[0.14em] text-mute md:flex md:pr-44">
          <a href="#about" className="inline-flex items-center gap-3 transition-colors hover:text-ink">
            SCROLL TO DISCOVER <ArrowDown size={13} aria-hidden />
          </a>
          <span>BUILDING SINCE 2023</span>
          <ul className="flex items-center gap-3" aria-label="Social profiles">
            {site.socials.map((s) => {
              const Icon = icons[s.id];
              return (
                <li key={s.id}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`} className="transition-colors hover:text-cyan">
                    <Icon size={15} aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}