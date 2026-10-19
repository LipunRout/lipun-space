import Marquee from './Marquee';

const statement = "I don't just write code. I solve problems with it.";

export default function Intro() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative scroll-mt-16">
      <Marquee items={['Full-Stack', 'AI Integration', 'APIs', 'Authentication', 'Databases', 'Freelance']} />
      <div className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-44">
        <h2 id="about-title" data-scrub className="max-w-[16ch] font-display text-[clamp(2.8rem,8vw,7.5rem)] font-medium leading-[0.95] tracking-tight">
          {statement.split(' ').map((w, i, arr) => (
            <span key={i}>
              <span className={i >= arr.length - 2 ? 'w italic' : 'w'}>{w}</span>{' '}
            </span>
          ))}
        </h2>

        <div data-stagger className="mt-16 grid gap-8 md:mt-24 md:grid-cols-12">
          <p className="font-mono text-xs text-mute md:col-span-3">How I think</p>
          <div className="space-y-6 text-lg leading-relaxed text-mute md:col-span-6">
            <p>
              I like to understand the problem before choosing the technology. Whether I&rsquo;m developing a new application, integrating an AI capability, or working on a client&rsquo;s existing product, my goal is a solution that is functional, maintainable, and useful.
            </p>
            <p>
              I work across the full development process, from understanding requirements to building interfaces, integrating APIs, connecting data, and refining the final experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}