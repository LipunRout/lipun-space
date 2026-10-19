const groups = [
  { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'] },
  { label: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs', 'Authentication', 'Integrations'] },
  { label: 'Data', items: ['MongoDB', 'Supabase', 'SQL fundamentals'] },
  { label: 'AI', items: ['Groq AI', 'AI API integration'] },
  { label: 'Tools', items: ['Git', 'GitHub', 'Vercel', 'Render', 'API testing & debugging'] },
];

export default function TechLab() {
  return (
    <section aria-labelledby="tech-title" className="px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-xs text-cyan">THE TECHNOLOGY LAB</p>
        <h2 id="tech-title" data-rl className="mt-5 font-display text-[clamp(2.6rem,7vw,6.5rem)] font-medium leading-[0.95] tracking-tight">
          <span className="rl block overflow-hidden pb-[0.08em]"><span className="block">What I build <em className="italic">with.</em></span></span>
        </h2>
        <div data-stagger className="mt-16 grid gap-x-10 gap-y-12 md:mt-20 md:grid-cols-2 lg:grid-cols-5">
          {groups.map((g) => (
            <div key={g.label}>
              <h3 className="border-b border-line pb-3 font-mono text-xs text-mute">{g.label}</h3>
              <ul className="mt-5 space-y-2">
                {g.items.map((i) => (
                  <li key={i} className="tech-item font-display text-xl tracking-tight text-ink/80 transition-all duration-300 hover:translate-x-2 hover:text-cyan">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}