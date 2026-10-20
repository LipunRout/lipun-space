'use client';
import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useMotion } from './MotionProvider';

export interface FlowSectionProps {
  id?: string;
  className?: string;
  /** classes for the rotating inner panel */
  innerClassName?: string;
  /** background + CSS variables for the inner panel */
  style?: React.CSSProperties;
  children: React.ReactNode;
  'aria-label'?: string;
}

/** One full-screen panel of the stack. */
export function FlowSection({ id, className = '', innerClassName = '', style, children, 'aria-label': ariaLabel }: FlowSectionProps) {
  return (
    <section id={id} data-flow-section aria-label={ariaLabel} className={`relative min-h-screen w-full overflow-hidden ${className}`}>
      <div
        data-flow-inner
        className={`flow-art-container relative flex min-h-screen w-full flex-col gap-6 px-5 pb-8 pt-24 will-change-transform sm:px-[4vw] md:pt-28 ${innerClassName}`}
        style={{ transformOrigin: 'bottom left', ...style }}
      >
        {children}
      </div>
    </section>
  );
}

/**
 * Story-scroll stack (adapted from the shadcn "story-scroll" component).
 * Each panel pins at its bottom while the next one rotates in over it (30deg -> 0).
 * With motion off the panels are simply stacked in normal flow.
 */
export default function FlowArt({ children, className = '', 'aria-label': ariaLabel = 'Story scroll' }: { children: React.ReactNode; className?: string; 'aria-label'?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { motion, ready } = useMotion();

  useEffect(() => {
    const root = ref.current;
    if (!ready || !motion || !root) return;

    const ctx = gsap.context(() => {
      const sections = Array.from(root.querySelectorAll<HTMLElement>('[data-flow-section]'));
      const angle = window.innerWidth < 768 ? 16 : 30;

      sections.forEach((section, i) => {
        gsap.set(section, { zIndex: i + 1 });
        const inner = section.querySelector<HTMLElement>('.flow-art-container');
        if (!inner) return;

        if (i > 0) {
          gsap.set(inner, { rotation: angle, transformOrigin: 'bottom left' });
          gsap.to(inner, {
            rotation: 0,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'top 25%', scrub: true },
          });
        }

        if (i < sections.length - 1) {
          ScrollTrigger.create({
            trigger: section,
            start: 'bottom bottom',
            end: 'bottom top',
            pin: true,
            pinSpacing: false,
          });
        }
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [motion, ready]);

  return (
    <div ref={ref} aria-label={ariaLabel} className={`relative isolate w-full overflow-x-clip ${className}`}>
      {children}
    </div>
  );
}