'use client';
import { useEffect, useRef } from 'react';
import { SplitText } from 'gsap/SplitText';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { areas } from '@/lib/expertise';

if (typeof window !== 'undefined') gsap.registerPlugin(SplitText);

const EDGE = 0.7; // viewport fraction where the progress line / reveals happen

/**
 * Pinned horizontal timeline. The section pins, the track slides sideways with scroll,
 * and each area draws its stem + dot and reveals its copy line by line as it reaches the progress edge.
 * Items alternate above / below the centre line.
 */
export default function ExpertiseTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const area = areaRef.current;
    const progress = progressRef.current;
    if (!section || !track || !area || !progress) return;

    const splits: SplitText[] = [];

    const ctx = gsap.context(() => {
      const shift = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const updateProgress = () => {
        const x = Number(gsap.getProperty(track, 'x')) || 0;
        const edge = -x + window.innerWidth * EDGE;
        const w = Math.max(0, Math.min(area.offsetWidth, edge - area.offsetLeft));
        progress.style.width = `${w}px`;
      };

      const master = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${shift()}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
          onUpdate: updateProgress,
          onRefresh: updateProgress,
        },
      });
      master.to(track, { x: () => -shift() });

      gsap.utils.toArray<HTMLElement>('[data-item]').forEach((el) => {
        const stem = el.querySelector('.stem');
        const dot = el.querySelector('.dot');
        const textEls = Array.from(el.querySelectorAll<HTMLElement>('.it-title, .it-body'));
        const itemSplits = textEls.map((t) => SplitText.create(t, { type: 'lines', mask: 'lines' }));
        splits.push(...itemSplits);
        const lines = itemSplits.flatMap((s) => s.lines as HTMLElement[]);

        gsap.set(stem, { scaleY: 0 });
        gsap.set(dot, { scale: 0 });
        gsap.set(lines, { yPercent: 110 });
        gsap.set(el.querySelectorAll('.it-fade'), { opacity: 0 });

        gsap
          .timeline({
            defaults: { ease: 'power2.out' },
            scrollTrigger: {
              trigger: el,
              containerAnimation: master,
              start: 'left 70%',
              end: 'left 38%',
              scrub: true,
            },
          })
          .to(dot, { scale: 1, duration: 0.3 }, 0)
          .to(stem, { scaleY: 1, duration: 0.5 }, 0)
          .to(lines, { yPercent: 0, stagger: 0.08, duration: 0.6 }, 0.2)
          .to(el.querySelectorAll('.it-fade'), { opacity: 1, duration: 0.4 }, 0.6);
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      cancelAnimationFrame(raf);
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="expertise"
      aria-labelledby="exp-title"
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden"
    >
      <div className="flex h-full items-center">
        <div
          ref={trackRef}
          className="relative flex h-[74vh] w-max items-stretch pl-[6vw] pr-[14vw] will-change-transform max-[600px]:pl-[7vw]"
        >
          {/* Intro */}
          <div className="flex w-[30vw] shrink-0 flex-col justify-center pr-[4vw] max-[600px]:w-[82vw]">
            <p className="font-mono text-xs text-cyan">THE SYSTEMS I BUILD</p>
            <h2
              id="exp-title"
              className="mt-5 font-display text-[clamp(2.6rem,5.4vw,6rem)] leading-[0.95] tracking-tight"
            >
              Four ways I turn ideas into <em className="italic">software.</em>
            </h2>
            <p className="mt-8 flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] text-mute">
              KEEP SCROLLING <span aria-hidden>&rarr;</span>
            </p>
          </div>

          {/* Timeline */}
          <div ref={areaRef} className="relative flex h-full shrink-0">
            <span className="absolute left-0 right-0 top-1/2 h-px bg-white/15" aria-hidden />
            <span
              ref={progressRef}
              className="absolute left-0 top-1/2 h-px bg-cyan shadow-[0_0_14px_rgba(0,229,255,0.9)]"
              style={{ width: 0 }}
              aria-hidden
            />

            <ol className="flex h-full">
              {areas.map((a, i) => {
                const top = i % 2 === 0;
                return (
                  <li key={a.n} data-item className="relative h-full w-[34vw] shrink-0 max-[600px]:w-[80vw]">
                    {/* dot on the centre line */}
                    <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden>
                      <span className="dot block size-[0.9vw] rounded-full bg-cyan max-[600px]:size-[3vw]" />
                    </span>

                    {/* stem */}
                    <span
                      className={`absolute left-0 h-[44%] w-px bg-white/10 ${top ? 'top-[6%]' : 'top-1/2'}`}
                      aria-hidden
                    >
                      <span className={`stem block h-full w-full bg-cyan ${top ? 'origin-bottom' : 'origin-top'}`} />
                    </span>

                    {/* copy */}
                    <div
                      className={`absolute left-0 flex h-[44%] w-full flex-col pl-[2.2vw] pr-[3vw] max-[600px]:pl-[6vw] max-[600px]:pr-[4vw] ${
                        top ? 'top-[6%] justify-start' : 'bottom-[6%] justify-end'
                      }`}
                    >
                      <p className="it-fade font-mono text-xs text-cyan">
                        {a.n} <span className="text-mute">/ 0{areas.length}</span>
                      </p>
                      <h3 className="it-title mt-2 font-display text-[clamp(1.9rem,2.7vw,3.4rem)] leading-[1.08] tracking-tight">
                        {a.title}
                      </h3>
                      <p className="it-body mt-3 max-w-[40ch] text-[clamp(0.95rem,1.25vw,1.2rem)] leading-[1.35] text-mute">
                        {a.body}
                      </p>
                      <ul className="it-fade mt-3 flex flex-wrap gap-x-4 gap-y-1" aria-label={`${a.title} focus areas`}>
                        {a.meta.map((m) => (
                          <li key={m} className="font-mono text-[11px] text-mute/80">
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}