'use client';
import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useMotion } from './MotionProvider';

/**
 * All scroll-driven animation lives here, keyed off data-attributes, so the
 * sections themselves stay server-rendered and fully readable without JS/motion.
 *   [data-rl]        line-mask headline reveal (children `.rl > span`)
 *   [data-scrub]     word-by-word brightness scrubbed to scroll (children `.w`)
 *   [data-parallax]  image drift inside its frame
 *   [data-clip]      clip-path reveal on project frames
 *   [data-stagger]   children fade-up in sequence
 *   [data-draw]      horizontal rule draws in
 */
export default function PageMotion() {
  const { motion, ready, intro } = useMotion();

  // Hero opening sequence: starts as the page loader lifts away
  useEffect(() => {
    if (!ready || !motion || intro) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('.hero-photo', { opacity: 0, scale: 1.06, duration: 1.8, ease: 'power2.out' }, 0)
        .fromTo('.hero-sweep', { xPercent: -130, opacity: 0.9 }, { xPercent: 130, opacity: 0, duration: 1.9, ease: 'power2.inOut' }, 0)
        .from('.hero-fade', { opacity: 0, y: 14, duration: 0.8, stagger: 0.08 }, 1.5);
    });
    return () => ctx.revert();
  }, [motion, ready, intro]);

  useEffect(() => {
    if (!ready || !motion) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-rl]').forEach((el) => {
        gsap.from(el.querySelectorAll('.rl > span'), {
          yPercent: 115,
          duration: 1.1,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-scrub]').forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll('.w'),
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.12,
            scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 50%', scrub: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const frame = el.parentElement ?? el;
        gsap.fromTo(
          el,
          { yPercent: -5 },
          { yPercent: 5, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-clip]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(12% 8% 12% 8% round 14px)', opacity: 0.4 },
          {
            clipPath: 'inset(0% 0% 0% 0% round 14px)',
            opacity: 1,
            duration: 1.3,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 24,
          duration: 0.9,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });

      // Stacking showcase: earlier cards recede as the next one slides over them (desktop only)
      if (window.innerWidth >= 1024) {
        const cards = gsap.utils.toArray<HTMLElement>('.project');
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          const inner = card.querySelector('.stack-card');
          if (!next || !inner) return;
          gsap.to(inner, {
            scale: 0.92,
            opacity: 0.35,
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top 85%', end: 'top 15%', scrub: true },
          });
        });
      }

      gsap.utils.toArray<HTMLElement>('[data-draw]').forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.4,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        });
      });
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, [motion, ready]);

  return null;
}