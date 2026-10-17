'use client';
import { useEffect, useRef } from 'react';
import { useMotion } from './MotionProvider';

/** Lightweight 2D canvas particle field. Static when motion is off; fewer particles on small screens. */
export default function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { motion, ready } = useMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const count = window.innerWidth < 768 ? 26 : 64;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ps = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.14,
      vy: -(Math.random() * 0.22 + 0.04),
      r: Math.random() * 1.3 + 0.3,
      c: Math.random() < 0.14 ? '255,36,79' : '0,229,255',
      a: Math.random() * 0.5 + 0.2,
    }));

    const draw = (step: boolean) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        if (step) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -4) p.y = h + 4;
          if (p.x < -4) p.x = w + 4;
          if (p.x > w + 4) p.x = -4;
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.c},${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    draw(false);
    if (!ready || !motion) return;

    const loop = () => {
      if (visible) draw(true);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([e]) => (visible = !!e?.isIntersecting));
    io.observe(canvas);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [motion, ready]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
