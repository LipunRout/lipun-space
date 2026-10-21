'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useMotion } from './MotionProvider';
import RollingText from './RollingText';

/** false = show on every full page load; true = only the first load of each browser tab session */
const ONCE_PER_SESSION = false;

/**
 * Page loader: the name rolls into place while a counter runs to 100, then the
 * curtain lifts and the hero takes over. Skipped when motion is off / reduced.
 */
export default function Loader() {
  const { motion, ready, finishIntro } = useMotion();
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!ready) return;
    const root = rootRef.current;
    if (!root) return;

    let seen = false;
    try {
      seen = ONCE_PER_SESSION && sessionStorage.getItem('lr-intro') === '1';
      sessionStorage.setItem('lr-intro', '1');
    } catch {}

    if (!motion || seen) {
      finishIntro();
      setDone(true);
      return;
    }

    const html = document.documentElement;
    const unlock = () => {
      html.style.overflow = '';
    };
    html.style.overflow = 'hidden';
    const failsafe = setTimeout(() => {
      unlock();
      finishIntro();
      setDone(true);
    }, 9000);

    const counter = { v: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tlRef.current = tl;
      tl.to(
        counter,
        {
          v: 100,
          duration: 2.1,
          ease: 'power1.inOut',
          onUpdate: () => {
            if (countRef.current) countRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
          },
        },
        0,
      )
        .to('.loader-meta', { opacity: 0, duration: 0.4, ease: 'power2.out' }, 2.45)
        .to('.loader-name', { yPercent: -14, opacity: 0, duration: 0.5, ease: 'power2.in' }, 2.5)
        .addLabel('lift', 2.65)
        .call(finishIntro, [], 'lift+=0.35')
        .to(root, { clipPath: 'inset(0 0 100% 0)', duration: 1.05, ease: 'power4.inOut' }, 'lift')
        .call(() => {
          unlock();
          setDone(true);
        });
    }, root);

    return () => {
      clearTimeout(failsafe);
      ctx.revert();
      unlock();
    };
    // runs once when the motion preference is known
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      role="status"
      aria-label="Loading portfolio"
      className="loader fixed inset-0 z-[100] flex flex-col bg-bg"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      <noscript>
        <style>{'.loader{display:none!important}'}</style>
      </noscript>

      <div className="loader-meta flex items-center justify-between px-5 pt-6 font-mono text-[11px] tracking-[0.16em] text-mute md:px-10">
        <span>
          LR<span className="text-signal">.</span>
        </span>
        <span>PORTFOLIO &mdash; 2026</span>
      </div>

      <div className="flex flex-1 items-center justify-center px-5">
        <p className="loader-name text-center font-serif text-[clamp(3.2rem,11.5vw,10.5rem)] leading-[0.88] tracking-[-0.03em] text-ink">
          <RollingText text="Lipun Rout" mode="load" waitForIntro={false} italicFrom={6} delay={0.1} stagger={0.07} rolls={7} duration={1.4} className="pb-[0.08em]" />
        </p>
      </div>

      <div className="loader-meta flex items-end justify-between gap-4 px-5 pb-6 font-mono text-[11px] tracking-[0.16em] text-mute md:px-10">
        <span ref={countRef} className="tabular-nums" aria-hidden>
          000
        </span>
        <button type="button" onClick={() => tlRef.current?.seek('lift')} className="transition-colors hover:text-cyan">
          SKIP
        </button>
        <span className="hidden sm:inline">SOFTWARE DEVELOPER &middot; FULL-STACK &amp; AI</span>
      </div>
    </div>
  );
}