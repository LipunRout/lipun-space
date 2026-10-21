'use client';
import { useEffect, useState } from 'react';
import { useMotion } from './MotionProvider';
import ExpertiseStatic from './ExpertiseStatic';
import ExpertiseTimeline from './ExpertiseTimeline';

/**
 * Pinned horizontal timeline only on desktop with a mouse and motion on.
 * Phones/tablets, motion off, reduced motion, SSR and no-JS get the lightweight static layout (swipe cards on phones).
 */
export default function Expertise() {
  const { motion, ready } = useMotion();
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)');
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return ready && motion && desktop ? <ExpertiseTimeline /> : <ExpertiseStatic />;
}