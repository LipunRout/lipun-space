'use client';
import { useEffect, useRef } from 'react';
import { useMotion } from './MotionProvider';

interface Tile {
  x: number; y: number; // top-left in CSS px
  sx: number; sy: number; // source position in image px
  rnd: number; dir: number; start: number; // scroll-dissolve params
}

let tile = 6; // CSS px per dust particle while dissolving (larger on phones = far fewer draws)

/**
 * Raw portrait on a canvas. At rest it is the plain, sharp photo.
 * Scrolling dissolves it in place into drifting dust (edges break first), then it is gone.
 * The wrapper is fixed, so it vanishes where it stands. Motion off: plain photo, no dissolve.
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

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let W = 0;
    let H = 0;
    let tiles: Tile[] = [];
    let tileSrc = 0;
    let raf = 0;
    let cancelled = false;
    let ro: ResizeObserver | undefined;

    const img = new Image();
    img.src = src;

    const scrollP = () => Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.85)));

    const build = () => {
      W = box.clientWidth;
      H = box.clientHeight;
      if (!W || !H) return;
      tile = W < 600 ? 10 : 6;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(W / tile);
      const rows = Math.ceil(H / tile);
      tileSrc = img.naturalWidth / (W / tile);
      const off = document.createElement('canvas');
      off.width = cols;
      off.height = rows;
      const o = off.getContext('2d', { willReadFrequently: true });
      if (!o) return;
      o.drawImage(img, 0, 0, cols, rows);
      const data = o.getImageData(0, 0, cols, rows).data;

      tiles = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = (r * cols + c) * 4;
          const lum = (0.299 * (data[i] ?? 0) + 0.587 * (data[i + 1] ?? 0) + 0.114 * (data[i + 2] ?? 0)) / 255;
          if (lum < 0.035) continue; // pure background: nothing to draw
          const x = c * tile;
          const y = r * tile;
          const edge = Math.min(1, Math.hypot((x - W / 2) / (W / 2), (y - H * 0.4) / (H * 0.5)));
          tiles.push({
            x, y,
            sx: c * tileSrc,
            sy: r * tileSrc,
            rnd: Math.random(),
            dir: (Math.random() - 0.5) * 2,
            start: Math.min(0.6, (1 - edge) * 0.35 + Math.random() * 0.12),
          });
        }
      }
    };

    const render = () => {
      const p = motion ? scrollP() : 0;
      ctx.clearRect(0, 0, W, H);
      if (p >= 1) return;
      if (p === 0) {
        ctx.drawImage(img, 0, 0, W, H); // plain sharp photo
        return;
      }
      for (const d of tiles) {
        const q = Math.min(1, Math.max(0, (p - d.start) / (1 - d.start)));
        const e = q * q * (3 - 2 * q);
        const a = 1 - e ** 1.2;
        const size = tile * Math.max(0, 1 - e * 0.8);
        if (a < 0.03 || size < 0.4) continue;
        const px = d.x + d.dir * e * W * 0.5 + Math.sin(d.y * 0.045) * e * 26 + (tile - size) / 2;
        const py = d.y + (0.25 + d.rnd) * e * e * H * 0.3 + Math.cos(d.x * 0.05) * e * 10 + (tile - size) / 2;
        ctx.globalAlpha = a;
        ctx.drawImage(img, d.sx, d.sy, tileSrc, tileSrc, px, py, size + 0.4, size + 0.4);
      }
      ctx.globalAlpha = 1;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        render();
      });
    };

    img.onload = () => {
      if (cancelled) return;
      build();
      render();
      if (motion) window.addEventListener('scroll', onScroll, { passive: true });
      let timer: ReturnType<typeof setTimeout>;
      ro = new ResizeObserver(() => {
        clearTimeout(timer);
        timer = setTimeout(() => { build(); render(); }, 150);
      });
      ro.observe(box);
    };

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      ro?.disconnect();
    };
  }, [motion, ready, src]);

  return (
    <div ref={boxRef} className="absolute inset-0">
      <canvas ref={canvasRef} role="img" aria-label={label} className="h-full w-full" />
    </div>
  );
}