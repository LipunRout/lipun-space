'use client';
import { useEffect, useRef } from 'react';
import { useMotion } from './MotionProvider';

/** Cursor-reactive glow for fine pointers only. */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const { motion, ready } = useMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !ready || !motion) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    let raf = 0;
    let x = window.innerWidth * 0.6;
    let y = window.innerHeight * 0.4;
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          el.style.transform = `translate3d(${x - 260}px, ${y - 260}px, 0)`;
        });
    };
    el.style.opacity = '1';
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
      el.style.opacity = '0';
    };
  }, [motion, ready]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[520px] w-[520px] rounded-full opacity-0 transition-opacity duration-700"
      style={{ background: 'radial-gradient(closest-side, rgba(0,229,255,0.09), rgba(52,120,255,0.04) 55%, transparent)' }}
    />
  );
}
