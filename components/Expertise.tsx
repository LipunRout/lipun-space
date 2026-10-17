const areas = [
  {
    n: '01',
    title: 'Full-Stack Engineering',
    body: 'Complete web applications with responsive interfaces, backend services, databases, authentication, APIs and integrated user workflows.',
    meta: ['React', 'Node.js', 'REST APIs', 'Auth'],
  },
  {
    n: '02',
    title: 'AI-Powered Applications',
    body: 'Language models and AI APIs woven into useful products: intelligent workflows, personalised experiences and application features.',
    meta: ['Groq AI', 'LLM APIs', 'Workflows'],
  },
  {
    n: '03',
    title: 'Product Development',
    body: 'Translating requirements into features, choosing sound technical approaches, integrating third-party services, debugging and improving existing products.',
    meta: ['Features', 'Integrations', 'Debugging'],
  },
  {
    n: '04',
    title: 'Freelance Solutions',
    body: 'Working with clients to understand their goals, clarify requirements, weigh constraints and turn ideas into working digital solutions.',
    meta: ['Requirements', 'Scoping', 'Delivery'],
  },
];

export default function Expertise() {
  return (
    <section id="expertise" aria-labelledby="exp-title" className="scroll-mt-16 px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-xs text-cyan">THE SYSTEMS I BUILD</p>
        <h2 id="exp-title" data-rl className="mt-5 font-display text-[clamp(2.6rem,7vw,6.5rem)] font-medium leading-[0.95] tracking-tight">
          <span className="rl block overflow-hidden pb-[0.08em]"><span className="block">Four ways I</span></span>
          <span className="rl block overflow-hidden pb-[0.08em]"><span className="block">turn ideas into software.</span></span>
        </h2>

        <ul className="mt-16 md:mt-24">
          {areas.map((a) => (
            <li key={a.n} className="exp-row group relative border-t border-line last:border-b">
              <span data-draw className="exp-line absolute left-0 top-0 h-px w-full" aria-hidden />
              <div className="grid gap-4 py-8 md:grid-cols-12 md:items-start md:gap-8 md:py-12">
                <span className="font-mono text-xs text-mute transition-colors group-hover:text-cyan md:col-span-1 md:pt-4">{a.n}</span>
                <h3 className="font-display text-3xl font-medium tracking-tight transition-transform duration-500 md:col-span-5 md:text-5xl md:group-hover:translate-x-3">
                  {a.title}
                </h3>
                <div className="md:col-span-6">
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
