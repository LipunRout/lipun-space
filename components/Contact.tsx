import { ArrowUpRight, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { site } from '@/lib/site';
import CopyEmail from './CopyEmail';

const icons = { github: Github, linkedin: Linkedin, instagram: Instagram } as const;

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="contact relative isolate scroll-mt-16 overflow-hidden border-t border-line px-5 py-28 md:px-10 md:py-44">
      <div className="contact-glow pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3" aria-hidden />
      <span data-draw className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan to-transparent" aria-hidden />
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-xs text-cyan">HAVE A PROJECT IN MIND?</p>
        <h2 id="contact-title" data-rl className="mt-6 font-display text-[clamp(3rem,10.5vw,10rem)] font-semibold leading-[0.9] tracking-[-0.035em]">
          <span className="rl block overflow-hidden pb-[0.08em]"><span className="block">Let&rsquo;s build</span></span>
          <span className="rl block overflow-hidden pb-[0.08em]"><span className="block">something</span></span>
          <span className="rl block overflow-hidden pb-[0.08em]"><span className="block">extraordinary.</span></span>
        </h2>

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="max-w-[52ch] text-lg leading-relaxed text-mute">
              I&rsquo;m always interested in exciting ideas, meaningful collaborations, full-stack development opportunities, and AI-powered digital products. Have a project in mind? Let&rsquo;s connect.
            </p>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent('Project inquiry')}`}
              className="btn-primary mt-8 inline-flex min-h-12 items-center gap-2 rounded-full px-7 text-base font-semibold"
            >
              Let&rsquo;s Talk <ArrowUpRight size={18} aria-hidden />
            </a>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <p className="font-mono text-xs text-mute">Email</p>
            <div className="mt-3">
              <CopyEmail email={site.email} />
            </div>

            <p className="mt-10 font-mono text-xs text-mute">Elsewhere</p>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {site.socials.map((s) => {
                const Icon = icons[s.id];
                return (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.label} (opens in a new tab)`}
                      className="social-row group flex min-h-14 items-center justify-between gap-4 py-3 transition-colors hover:text-cyan"
                    >
                      <span className="flex items-center gap-3 font-display text-xl tracking-tight">
                        <Icon size={18} aria-hidden /> {s.label}
                      </span>
                      <ArrowUpRight size={18} className="text-mute transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" aria-hidden />
                    </a>
                  </li>
                );
              })}
              <li>
                <a href={`mailto:${site.email}`} aria-label="Send an email" className="social-row group flex min-h-14 items-center justify-between gap-4 py-3 transition-colors hover:text-cyan">
                  <span className="flex items-center gap-3 font-display text-xl tracking-tight">
                    <Mail size={18} aria-hidden /> Email
                  </span>
                  <ArrowUpRight size={18} className="text-mute transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" aria-hidden />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
