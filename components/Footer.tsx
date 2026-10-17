import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { site } from '@/lib/site';
import Year from './Year';

const icons = { github: Github, linkedin: Linkedin, instagram: Instagram } as const;

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line px-5 py-10 md:px-10 md:py-14">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl font-semibold tracking-tight">Lipun Rout</p>
          <p className="mt-1 text-sm text-mute">Software Developer · Full-Stack &amp; AI</p>
          <p className="mt-6 text-sm text-ink/80">Designed with intent. Built with code.</p>
        </div>
        <div className="flex flex-col gap-5 md:items-end">
          <ul className="flex gap-3" aria-label="Social links">
            {site.socials.map((s) => {
              const Icon = icons[s.id];
              return (
                <li key={s.id}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-mute transition-colors hover:border-cyan/60 hover:text-cyan">
                    <Icon size={17} aria-hidden />
                  </a>
                </li>
              );
            })}
            <li>
              <a href={`mailto:${site.email}`} aria-label="Send an email" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-mute transition-colors hover:border-cyan/60 hover:text-cyan">
                <Mail size={17} aria-hidden />
              </a>
            </li>
          </ul>
          <p className="font-mono text-xs text-mute">&copy; <Year initial={year} /> Lipun Rout. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
