import { areas } from '@/lib/expertise';

export default function ExpertiseStatic() {
  return (
    <section id="expertise" aria-labelledby="exp-title" className="scroll-mt-16 px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-xs text-cyan">THE SYSTEMS I BUILD</p>
        <h2 id="exp-title" data-rl className="mt-5 font-display text-[clamp(2.6rem,7vw,6.5rem)] font-medium leading-[0.95] tracking-tight">
          <span className="rl block overflow-hidden pb-[0.08em]"><span className="block">Four ways I</span></span>
          <span className="rl block overflow-hidden pb-[0.08em]"><span className="block">turn ideas into <em className="italic">software.</em></span></span>
        </h2>

        <p className="mt-10 flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] text-mute md:hidden">
          SWIPE <span aria-hidden>&rarr;</span>
        </p>

        <ul className="no-scrollbar -mx-5 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 md:mx-0 md:mt-24 md:block md:snap-none md:overflow-visible md:px-0 md:pb-0">
          {areas.map((a) => (
            <li key={a.n} className="exp-row group relative w-[84%] shrink-0 snap-center rounded-2xl border border-line bg-surface p-6 sm:w-[60%] md:w-auto md:shrink md:rounded-none md:border-0 md:border-t md:bg-transparent md:p-0 md:last:border-b">
              <span data-draw className="exp-line absolute left-0 top-0 hidden h-px w-full md:block" aria-hidden />
              <div className="flex h-full min-h-[22rem] flex-col gap-4 md:grid md:min-h-0 md:grid-cols-12 md:items-start md:gap-8 md:py-12">
                <span className="font-mono text-xs text-cyan md:col-span-1 md:pt-4 md:text-mute md:transition-colors md:group-hover:text-cyan">{a.n} <span className="text-mute md:hidden">/ 04</span></span>
                <h3 className="mt-6 font-display text-4xl font-medium leading-[1] tracking-tight transition-transform duration-500 md:col-span-5 md:mt-0 md:text-5xl md:group-hover:translate-x-3">
                  {a.title}
                </h3>
                <div className="mt-auto md:col-span-6 md:mt-0">
                  <p className="max-w-[52ch] leading-relaxed text-mute transition-colors group-hover:text-ink/90">{a.body}</p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${a.title} focus areas`}>
                    {a.meta.map((m) => (
                      <li key={m} className="font-mono text-[11px] text-mute/80">
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}