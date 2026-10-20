'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { navLinks } from '@/lib/site';
import { useMotion } from './MotionProvider';
import RollingText from './RollingText';

const links = navLinks.filter((l) => l.href !== '#contact');

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { motion, toggle, ready } = useMotion();
  const btnRef = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-5 md:px-6">
        <nav aria-label="Primary" className="flex h-[56px] w-full max-w-[1120px] items-center justify-between rounded-[22px] border border-white/10 bg-white/[0.05] px-5 backdrop-blur-xl md:h-[68px] md:rounded-[26px] md:px-8">
          <a href="#top" className="font-serif text-[1.6rem] leading-none tracking-tight md:text-3xl" aria-label="Lipun Rout, back to top">
            <RollingText text="Lipun Rout" mode="hover" />
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-underline text-sm text-ink/85 transition-colors hover:text-ink">
                  <RollingText text={l.label} mode="hover" />
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="btn-ghost inline-flex h-11 items-center gap-6 rounded-xl border border-white/15 bg-white/[0.06] px-4 text-sm">
                <RollingText text="Let's talk" mode="hover" /> <ArrowUpRight size={15} aria-hidden />
              </a>
            </li>
          </ul>

          <button
            ref={btnRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-10 items-center gap-3 font-mono text-[11px] tracking-[0.08em] text-ink md:hidden"
          >
            {open ? 'Close' : 'Menu'}
            {open ? <X size={18} aria-hidden /> : <span className="flex flex-col gap-[5px]" aria-hidden><i className="block h-px w-5 bg-ink" /><i className="block h-px w-3 self-end bg-ink" /></span>}
          </button>
        </nav>

        <div
          id="mobile-menu"
          hidden={!open}
          className="absolute inset-x-3 top-[68px] rounded-[22px] border border-white/10 bg-[#0b0d10]/95 p-5 shadow-2xl backdrop-blur-xl md:hidden"
        >
          <ul>
            {links.map((l, i) => (
              <li key={l.href} className="border-b border-white/10 last:border-0">
                <a
                  ref={i === 0 ? firstLink : undefined}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-serif text-[2rem] leading-none"
                >
                  {l.label}
                  <ArrowUpRight size={16} className="text-cyan/70" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 flex h-12 items-center justify-between rounded-xl border border-white/15 bg-white/[0.06] px-4 text-sm"
          >
            Let&rsquo;s talk <ArrowUpRight size={15} aria-hidden />
          </a>
        </div>
      </header>

      <button
        type="button"
        onClick={toggle}
        aria-pressed={!motion}
        aria-label={motion ? 'Reduce motion' : 'Enable motion'}
        className="fixed bottom-4 right-4 z-50 inline-flex h-11 items-center gap-3 rounded-md border border-white/15 bg-bg/80 px-4 font-mono text-[10px] tracking-[0.14em] text-ink/80 backdrop-blur transition-colors hover:border-cyan/60"
      >
        <span className="flex gap-[3px]" aria-hidden>
          <i className={`block h-3 w-[2px] ${motion ? 'bg-cyan' : 'bg-mute'}`} />
          <i className={`block h-3 w-[2px] ${motion ? 'bg-cyan' : 'bg-mute'}`} />
        </span>
        MOTION {ready && !motion ? 'OFF' : 'ON'}
      </button>
    </>
  );
}