'use client';
import { useMotion } from './MotionProvider';
import ExpertiseStatic from './ExpertiseStatic';
import ExpertiseTimeline from './ExpertiseTimeline';

/** Pinned horizontal timeline when motion is on; the static layout otherwise (SSR, no-JS, motion off, reduced motion). */
export default function Expertise() {
  const { motion, ready } = useMotion();
  return ready && motion ? <ExpertiseTimeline /> : <ExpertiseStatic />;
}