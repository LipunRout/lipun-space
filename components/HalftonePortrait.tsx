'use client';
import { useEffect, useRef } from 'react';
import { useMotion } from './MotionProvider';

interface Tile {
  x: number; y: number; // top-left in CSS px
  sx: number; sy: number; // source position in image px
  rnd: number; dir: number; start: number; // scroll-dissolve params
}

const TILE_MIN = 1.5; // smaller = finer dust
const MAX_TILES = 90000; // perf cap
const EASE = 0.2; // 0.05 = floaty, 0.3 = snappy

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
    let tile = TILE_MIN;
    let tiles: Tile[] = [];
    let tileSrc = 0;
    let raf = 0;
    let cancelled = false;
    let ro: ResizeObserver | undefined;
    let cur = 0; // eased progress actually rendered
    let target = 0; // raw scroll progress

    const img = new Image();
    img.src = src;

    const scrollP = () => Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.45)));

    const build = () => {
      W = box.clientWidth;
      H = box.clientHeight;
      if (!W || !H) return;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      tile = TILE_MIN;
      while ((W / tile) * (H / tile) > MAX_TILES) tile += 0.25;

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
          if (lum < 0.035) continue;
          const x = c * tile;
          const y = r * tile;
          const edge = Math.min(1, Math.hypot((x - W / 2) / (W / 2), (y - H * 0.4) / (H * 0.5)));
          tiles.push({
            x, y,
            sx: c * tileSrc,
            sy: r * tileSrc,
            rnd: Math.random(),
            dir: (Math.random() - 0.5) * 2,
            start: Math.min(0.2, (1 - edge) * 0.12 + Math.random() * 0.08),
          });
        }
      }
    };

    const render = (p: number) => {
      ctx.clearRect(0, 0, W, H);
      if (p >= 1) return;
      if (p === 0) {
        ctx.drawImage(img, 0, 0, W, H);
        return;
      }
      for (const d of tiles) {
        const q = Math.min(1, Math.max(0, (p - d.start) / (1 - d.start)));
        const e = q * q * (3 - 2 * q);
        const a = 1 - e ** 1.2;
        const size = tile * Math.max(0, 1 - e * 1.15);
        if (a < 0.03 || size < 0.2) continue;
        const px = d.x + d.dir * e * W * 0.5 + Math.sin(d.y * 0.045) * e * 26 + (tile - size) / 2;
        const py = d.y + (0.25 + d.rnd) * e * e * H * 0.3 + Math.cos(d.x * 0.05) * e * 10 + (tile - size) / 2;
        ctx.globalAlpha = a;
        ctx.drawImage(img, d.sx, d.sy, tileSrc, tileSrc, px, py, size + 0.2, size + 0.2);
      }
      ctx.globalAlpha = 1;
    };

    // chase the scroll target every frame until settled
    const tick = () => {
      raf = 0;
      const diff = target - cur;
      cur = Math.abs(diff) < 0.0005 ? target : cur + diff * EASE;
      render(cur);
      if (cur !== target) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = scrollP();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    img.onload = () => {
      if (cancelled) return;
      build();
      target = motion ? scrollP() : 0;
      cur = target; // no animation on first paint / reload mid-scroll
      render(cur);
      if (motion) window.addEventListener('scroll', onScroll, { passive: true });
      let timer: ReturnType<typeof setTimeout>;
      ro = new ResizeObserver(() => {
        clearTimeout(timer);
        timer = setTimeout(() => { build(); render(cur); }, 150);
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