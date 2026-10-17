'use client';
import { useEffect, useRef } from 'react';
import { useMotion } from './MotionProvider';

interface Dot {
  ox: number; oy: number; // position
  r: number; // half-size of the square micro-particle
  col: string;
  sx: number; rnd: number; start: number; // scroll-dissolve params
}

/**
 * Micro-particle portrait on a canvas (tiny square pixels, not round dots).
 *  - scans in top to bottom on load
 *  - dissolves into drifting dust as the page scrolls (the wrapper is fixed, so it blends away in place)
 * Motion off: one static frame, no loop.
 */
export default function HalftonePortrait({ src, label }: { src: string; label: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { motion, ready } = useMotion();

  useEffect(() => {
    if (!ready) return;
    const box = boxRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!box || !canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let dots: Dot[] = [];
    let raf = 0;
    let cancelled = false;
    let start = 0;
    let lastP = -1;
    let ro: ResizeObserver | undefined;

    const img = new Image();
    img.src = src;

    const build = () => {
      W = box.clientWidth;
      H = box.clientHeight;
      if (!W || !H) return;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const pitch = Math.max(1.8, W / 250);
      const cols = Math.floor(W / pitch);
      const rows = Math.floor(H / pitch);
      const off = document.createElement('canvas');
      off.width = cols;
      off.height = rows;
      const o = off.getContext('2d', { willReadFrequently: true });
      if (!o) return;
      o.drawImage(img, 0, 0, cols, rows);
      const data = o.getImageData(0, 0, cols, rows).data;

      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = (r * cols + c) * 4;
          const R = data[i] ?? 0;
          const G = data[i + 1] ?? 0;
          const B = data[i + 2] ?? 0;
          const lum = Math.min(1, ((0.299 * R + 0.587 * G + 0.114 * B) / 255) * 1.55) ** 0.65;
          if (lum < 0.05) continue;
          const x = (c + (r % 2 ? 0.5 : 0) + 0.5) * pitch;
          const y = (r + 0.5) * pitch;
          const edge = Math.min(1, Math.hypot((x - W / 2) / (W / 2), (y - H * 0.4) / (H * 0.5)));
          const k = 0.25;
          const cr = Math.min(255, R * 1.3 * (1 - k) + 236 * k) | 0;
          const cg = Math.min(255, G * 1.3 * (1 - k) + 231 * k) | 0;
          const cb = Math.min(255, B * 1.3 * (1 - k) + 222 * k) | 0;
          dots.push({
            ox: x, oy: y,
            r: pitch * 0.56 * Math.sqrt(lum) + 0.15,
            col: `rgb(${cr},${cg},${cb})`,
            sx: (Math.random() - 0.5) * 2,
            rnd: Math.random(),
            start: Math.min(0.6, (1 - edge) * 0.35 + Math.random() * 0.12),
          });
        }
      }
    };

    const render = (t: number, p: number) => {
      ctx.clearRect(0, 0, W, H);
      if (p >= 1) return;
      const scanY = Math.min(1, t / 1.7) * H * 1.25;

      for (const d of dots) {
        const behind = scanY - d.oy;
        if (behind < 0) continue;
        let s = Math.min(1, behind / (H * 0.22));
        let px = d.ox;
        let py = d.oy;
        let a = 1;
        if (p > 0) {
          const q = Math.min(1, Math.max(0, (p - d.start) / (1 - d.start)));
          if (q > 0) {
            const e = q * q * (3 - 2 * q);
            px += d.sx * e * W * 0.55 + Math.sin(d.oy * 0.045 + t * 1.2) * e * 26;
            py += (0.25 + d.rnd) * e * e * H * 0.3 + Math.cos(d.ox * 0.05 + t) * e * 10;
            s *= Math.max(0, 1 - e * 0.85);
            a = 1 - e ** 1.2;
          }
        }
        const rad = d.r * s;
        if (rad < 0.22 || a < 0.03) continue;
        ctx.globalAlpha = a;
        ctx.fillStyle = behind < 22 ? '#ffffff' : d.col;
        ctx.fillRect(px - rad, py - rad, rad * 2, rad * 2);
      }
      ctx.globalAlpha = 1;
    };

    const scrollP = () => Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.85)));

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      const t = (now - start) / 1000;
      const p = scrollP();
      // idle: nothing changes once the reveal has finished and scroll is still
      if (t > 1.9 && p === lastP) return;
      lastP = p;
      render(t, p);
    };

    img.onload = () => {
      if (cancelled) return;
      build();
      if (!motion) {
        render(10, 0);
        ro = new ResizeObserver(() => { build(); render(10, 0); });
        ro.observe(box);
        return;
      }
      start = performance.now();
      raf = requestAnimationFrame(loop);
      let timer: ReturnType<typeof setTimeout>;
      ro = new ResizeObserver(() => {
        clearTimeout(timer);
        timer = setTimeout(() => { build(); lastP = -1; }, 150);
      });
      ro.observe(box);
    };

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro?.disconnect();
    };
  }, [motion, ready, src]);

  return (
    <div ref={boxRef} className="absolute inset-0">
      <canvas ref={canvasRef} role="img" aria-label={label} className="portrait-dots h-full w-full" />
    </div>
  );
}