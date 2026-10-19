'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';

const groups = [
  { label: 'Languages', items: ['JavaScript (ES6+)', 'TypeScript', 'Java', 'Python'] },
  { label: 'Frontend', items: ['React', 'Next.js', 'Angular', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'PWA'] },
  { label: 'Backend', items: ['Node.js', 'Express.js', 'Spring Boot', 'REST APIs', 'WebSocket', 'gRPC', 'Authentication', 'Integrations'] },
  { label: 'Data', items: ['MongoDB', 'Supabase (PostgreSQL)', 'SQL fundamentals'] },
  { label: 'AI', items: ['Groq AI', 'Claude AI', 'ChatGPT', 'Cursor', 'AI API integration'] },
  { label: 'Tools', items: ['Git', 'GitHub', 'GitLab', 'Vercel', 'Render', 'Postman', 'IntelliJ', 'Firebase Cloud Messaging', 'API testing & debugging'] },
  { label: 'Core', items: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networking'] },
];

export default function TechLab() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section aria-labelledby="tech-title" className="px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono text-xs text-cyan">THE TECHNOLOGY LAB</p>
        <h2 id="tech-title" data-rl className="mt-5 font-display text-[clamp(2.6rem,7vw,6.5rem)] font-medium leading-[0.95] tracking-tight">
          <span className="rl block overflow-hidden pb-[0.08em]"><span className="block">What I build <em className="italic">with.</em></span></span>
        </h2>

        <div data-stagger className="mt-16 border-t border-line md:mt-20">
          {groups.map((g, idx) => {
            const isOpen = open === idx;
            const panelId = `tech-panel-${idx}`;
            const btnId = `tech-btn-${idx}`;
            return (
              <div key={g.label} className="border-b border-line">
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="group flex w-full items-center gap-5 py-6 text-left md:gap-8 md:py-8"
                  >
                    <span className="w-8 font-mono text-xs text-mute">{String(idx + 1).padStart(2, '0')}</span>
                    <span className={`flex-1 font-display text-[clamp(1.6rem,3.6vw,3rem)] tracking-tight transition-colors duration-300 group-hover:text-cyan ${isOpen ? 'text-cyan' : 'text-ink'}`}>
                      {g.label}
                    </span>
                    <span className="hidden font-mono text-xs text-mute sm:block">{g.items.length} SKILLS</span>
                    <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? 'rotate-45 border-cyan text-cyan' : 'border-line text-mute group-hover:border-cyan group-hover:text-cyan'}`}>
                      <Plus size={18} aria-hidden />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <ul className="flex flex-wrap gap-3 pb-8 pl-0 md:pl-[3.25rem] md:pr-16">
                      {g.items.map((i) => (
                        <li
                          key={i}
                          className="tech-item rounded-full border border-line px-4 py-2 font-display text-lg tracking-tight text-ink/80 transition-colors duration-300 hover:border-cyan hover:text-cyan md:text-xl"
                        >
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}