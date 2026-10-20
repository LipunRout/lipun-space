'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface MotionState {
  /** true when nonessential animation is allowed */
  motion: boolean;
  /** true once the stored/system preference has been read (avoids hydration mismatch) */
  ready: boolean;
  toggle: () => void;
  /** true while the page loader is on screen; hero animations wait for it */
  intro: boolean;
  finishIntro: () => void;
}

const MotionContext = createContext<MotionState>({ motion: true, ready: false, toggle: () => {}, intro: false, finishIntro: () => {} });
export const useMotion = () => useContext(MotionContext);

const KEY = 'lr-motion';

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const [motion, setMotion] = useState(true);
  const [ready, setReady] = useState(false);
  const [intro, setIntro] = useState(true);
  const finishIntro = useCallback(() => setIntro(false), []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {}
    setMotion(stored ? stored === 'on' : !reduced);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.motion = motion ? 'on' : 'off';
  }, [motion, ready]);

  const toggle = useCallback(() => {
    setMotion((m) => {
      const next = !m;
      try {
        localStorage.setItem(KEY, next ? 'on' : 'off');
      } catch {}
      return next;
    });
  }, []);

  const value = useMemo(() => ({ motion, ready, toggle, intro, finishIntro }), [motion, ready, toggle, intro, finishIntro]);
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}