import { ArrowUp, ArrowUpRight, Github, Instagram, Linkedin } from 'lucide-react';
import { navLinks, site } from '@/lib/site';
import Year from './Year';

const icons = { github: Github, linkedin: Linkedin, instagram: Instagram } as const;

const heading = 'font-mono text-[11px] tracking-[0.16em] text-mute';
const linkCls =
  'group inline-flex min-h-11 items-center gap-2 py-1 text-[15px] md:min-h-0 md:py-1.5 text-ink/85 transition-colors hover:text-cyan';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg">
      <span className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan/60 to-transparent" aria-hidden />
      <div className="footer-glow pointer-events-none absolute inset-x-0 top-0 h-64" aria-hidden />

      <div className="relative mx-auto max-w-[1400px] px-5 pt-16 md:px-10 md:pt-24">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-5">
            <p className="font-serif text-4xl leading-none tracking-tight md:text-5xl">
              Lipun <em className="italic">Rout</em>
            </p>
            <p className="mt-3 text-[15px] text-mute md:mt-4">Software Developer · Full-Stack &amp; AI</p>
            <p className="mt-6 max-w-[40ch] text-sm leading-relaxed text-mute">
              I turn ideas and requirements into functional, intelligent web products, from the first conversation to the final deploy.
            </p>
            <a
              href="#contact"
              className="btn-ghost mt-6 inline-flex min-h-12 md:mt-8 md:min-h-11 items-center gap-3 rounded-full border border-white/20 px-5 text-sm"
            >
              Start a project <ArrowUpRight size={15} aria-hidden />
            </a>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer" className="col-span-1 md:col-span-2 md:col-start-7">
            <h2 className={heading}>NAVIGATE</h2>
            <ul className="mt-4">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkCls}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Elsewhere */}
          <div className="col-span-1 md:col-span-2">
            <h2 className={heading}>ELSEWHERE</h2>
            <ul className="mt-4">
              {site.socials.map((s) => {
                const Icon = icons[s.id];
                return (
                  <li key={s.id}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`} className={linkCls}>
                      <Icon size={15} aria-hidden className="text-mute transition-colors group-hover:text-cyan" />
                      {s.label}
                      <ArrowUpRight size={13} aria-hidden className="text-mute opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 border-t border-line pt-8 md:col-span-3 md:col-start-10 md:border-0 md:pt-0">
            <h2 className={heading}>GET IN TOUCH</h2>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 inline-block break-all font-mono text-sm text-ink underline decoration-white/20 underline-offset-8 transition-colors hover:decoration-cyan md:break-normal"
            >
              {site.email}
            </a>
            <p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-mute">
              Open to full-stack work, AI-powered products and freelance collaborations.
            </p>
          </div>
        </div>

        {/* Wordmark */}
        <div className="pointer-events-none mt-12 select-none md:mt-24" aria-hidden>
          <p className="footer-wordmark whitespace-nowrap text-center font-serif leading-[0.78] tracking-[-0.04em]">
            Lipun <em className="italic">Rout</em>
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-line">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-5 pb-24 pt-6 md:flex-row md:items-center md:justify-between md:px-10 md:py-6 md:pr-44">
          <p className="font-mono text-[11px] tracking-[0.08em] text-mute">
            &copy; <Year initial={year} /> Lipun Rout. All rights reserved.
          </p>
          <p className="font-mono text-[11px] tracking-[0.08em] text-mute">Designed with intent. Built with code.</p>
          <a
            href="#top"
            aria-label="Back to top"
            className="inline-flex w-fit items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-mute transition-colors hover:text-cyan"
          >
            BACK TO TOP <ArrowUp size={13} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}