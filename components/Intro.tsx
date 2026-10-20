import InfiniteRibbon from './InfiniteRibbon';

const ribbonA =
  'React • Next.js • TypeScript • JavaScript • Angular • Tailwind CSS • Java • Python • Node.js • Express.js • Spring Boot • REST APIs • ';
const ribbonB =
  'MongoDB • Supabase • Groq AI • Claude AI • WebSocket • gRPC • Git • GitHub • Vercel • Render • Postman • Firebase • ';

const statement = "I don't just write code. I solve problems with it.";

export default function Intro() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative scroll-mt-16">
      {/* Two crossing skill ribbons */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-line md:h-72" aria-label="Skills">
        <InfiniteRibbon
          rotation={4}
          duration={45}
          className="absolute left-[-5%] top-1/2 -mt-6 h-12 w-[110%] border-y border-white/25 bg-black font-display text-2xl text-ink shadow-[0_10px_40px_rgba(0,0,0,0.9)] md:-mt-10 md:h-20 md:text-5xl"
        >
          {ribbonA}
        </InfiniteRibbon>
        <InfiniteRibbon
          rotation={-4}
          duration={50}
          reverse
          className="relative h-12 w-[110%] border-y border-white/25 bg-black font-display text-2xl italic text-ink shadow-[0_10px_40px_rgba(0,0,0,0.9)] md:h-20 md:text-5xl"
        >
          {ribbonB}
        </InfiniteRibbon>
      </div>
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