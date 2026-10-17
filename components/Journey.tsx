const steps = [
  { when: '2023', title: 'Started building software', body: 'Began my development journey, learning the fundamentals of the web and building my first applications.' },
  { when: 'Growing', title: 'Across the stack', body: 'Moved from interfaces into Node.js, databases, authentication and API integration, working on increasingly real requirements.' },
  { when: 'Alongside', title: 'Freelance work', body: 'Working directly with clients to understand what they need, scope it, and deliver working solutions.' },
  { when: 'Now', title: `Software Developer @ Ohhpro`, body: 'Contributing to software products professionally while exploring AI-powered applications in my own projects.' },
];

export default function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-title" className="scroll-mt-16 border-y border-line bg-bg2 px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-xs text-cyan">THE DEVELOPER JOURNEY</p>
        <h2 id="journey-title" data-rl className="mt-5 font-display text-[clamp(2.6rem,7vw,6.5rem)] font-medium leading-[0.95] tracking-tight">
          <span className="rl block overflow-hidden pb-[0.08em]"><span className="block">Learning by</span></span>
          <span className="rl block overflow-hidden pb-[0.08em]"><span className="block">shipping.</span></span>
        </h2>

        <ol className="relative mt-16 grid gap-10 md:mt-24 lg:grid-cols-4 lg:gap-8">
          <span data-draw className="journey-rail absolute left-[5px] top-2 hidden h-px w-full lg:block" aria-hidden />
          {steps.map((s) => (
            <li key={s.title} className="relative border-l border-line pl-6 lg:border-l-0 lg:pl-0 lg:pt-10">
              <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_14px_rgba(0,229,255,0.7)] lg:left-0 lg:top-[3px]" aria-hidden />
              <p className="font-mono text-xs text-cyan">{s.when}</p>
              <h3 className="mt-3 font-display text-2xl font-medium tracking-tight">{s.title}</h3>
              <p className="mt-3 max-w-[40ch] leading-relaxed text-mute">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
