'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useMotion } from './MotionProvider';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export interface RollingTextProps {
  text: string;
  /**
   * load  - letters roll into place once when the page loads (hero name)
   * view  - letters roll into place once when scrolled into view (headings)
   * hover - letters roll up to a copy of themselves on hover/focus of the parent link or button
   */
  mode?: 'load' | 'view' | 'hover';
  className?: string;
  /** seconds before a load/view roll starts */
  delay?: number;
  /** seconds between each letter */
  stagger?: number;
  /** number of random letters each column rolls through before landing (load/view) */
  rolls?: number;
  duration?: number;
  /** row height in em; raise it if descenders or italics get clipped */
  lineHeight?: number;
  /** character index from which letters are italic (e.g. 6 for the "Rout" in "Lipun Rout") */
  italicFrom?: number;
  /** load mode only: hold until the page loader has finished (default true) */
  waitForIntro?: boolean;
}

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';

/** Deterministic decoys (no Math.random) so server and client markup match. */
function decoy(ch: string, i: number, k: number) {
  const n = (ch.charCodeAt(0) * 3 + i * 7 + k * 5 + 1) % 26;
  return ch === ch.toUpperCase() ? UPPER[n]! : LOWER[n]!;
}

const isLetter = (c: string) => /[A-Za-z]/.test(c);

/**
 * Reusable rolling-text effect built on GSAP.
 * Server markup shows the final text (works without JS); with motion off it simply stays that way.
 */
export default function RollingText({
  text,
  mode = 'hover',
  className = '',
  delay = 0,
  stagger = 0.06,
  rolls = 6,
  duration = 1.2,
  lineHeight = 1.18,
  italicFrom,
  waitForIntro = true,
}: RollingTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const { motion, ready, intro } = useMotion();
  const [pending, setPending] = useState(mode === 'load');

  const hover = mode === 'hover';
  const count = hover ? 2 : rolls + 1;
  const finalPct = hover ? 0 : -((count - 1) / count) * 100;
  const staticTransform = hover ? undefined : `translateY(${finalPct}%)`;

  useIsoLayoutEffect(() => {
    if (!ready) return;
    if (mode === 'load' && waitForIntro && intro) return;
    const root = rootRef.current;
    if (!root) return;
    setPending(false);
    if (!motion) return;

    const cols = Array.from(root.querySelectorAll<HTMLElement>('.rt-col'));
    if (!cols.length) return;

    if (hover) {
      const trigger = root.closest<HTMLElement>('a, button') ?? root;
      const enter = () =>
        gsap.fromTo(
          cols,
          { yPercent: 0 },
          {
            yPercent: -50,
            duration: 0.55,
            ease: 'power3.inOut',
            stagger: 0.018,
            overwrite: true,
            onComplete: () => {
              gsap.set(cols, { yPercent: 0 });
            },
          },
        );
      trigger.addEventListener('pointerenter', enter);
      trigger.addEventListener('focusin', enter);
      return () => {
        trigger.removeEventListener('pointerenter', enter);
        trigger.removeEventListener('focusin', enter);
        gsap.killTweensOf(cols);
        gsap.set(cols, { yPercent: 0 });
      };
    }

    // load / view: start on the first row, roll down to the final letter
    gsap.set(cols, { clearProps: 'transform' });
    const play = () =>
      gsap.fromTo(
        cols,
        { yPercent: 0 },
        { yPercent: finalPct, duration, delay, ease: 'power4.inOut', stagger: { each: stagger } },
      );

    let tween: gsap.core.Tween | undefined;
    let st: ScrollTrigger | undefined;
    if (mode === 'load') {
      tween = play();
    } else {
      st = ScrollTrigger.create({ trigger: root, start: 'top 90%', once: true, onEnter: () => (tween = play()) });
    }

    return () => {
      st?.kill();
      tween?.kill();
      cols.forEach((c) => {
        gsap.set(c, { clearProps: 'transform' });
        if (staticTransform) c.style.transform = staticTransform;
      });
    };
  }, [ready, motion, intro, waitForIntro, mode, delay, stagger, duration, finalPct]);

  const chars = Array.from(text);

  return (
    <span
      ref={rootRef}
      className={`rt relative inline-block ${pending ? 'rt-hidden' : ''} ${className}`}
      style={{ marginBlock: `${(1 - lineHeight) / 2}em` }}
    >
      {mode === 'load' && (
        <noscript>
          <style>{'.rt-hidden{visibility:visible!important}'}</style>
        </noscript>
      )}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex">
        {chars.map((ch, i) => {
          const italic = italicFrom !== undefined && i >= italicFrom ? 'italic' : '';
          if (ch === ' ') {
            return (
              <span key={i} className="inline-block" style={{ height: `${lineHeight}em`, lineHeight }}>
                &nbsp;
              </span>
            );
          }
          if (!isLetter(ch) && !hover) {
            return (
              <span key={i} className={`inline-block ${italic}`} style={{ height: `${lineHeight}em`, lineHeight }}>
                {ch}
              </span>
            );
          }
          const rows = hover
            ? [ch, ch]
            : [...Array.from({ length: rolls }, (_, k) => (isLetter(ch) ? decoy(ch, i, k) : ch)), ch];
          return (
            <span
              key={i}
              className={`inline-block overflow-hidden align-top ${italic}`}
              style={{ height: `${lineHeight}em`, paddingInline: '0.04em', marginInline: '-0.04em' }}
            >
              <span className="rt-col flex flex-col will-change-transform" style={{ transform: staticTransform }}>
                {rows.map((c, k) => (
                  <span key={k} className="block" style={{ height: `${lineHeight}em`, lineHeight }}>
                    {c}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}