export default function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="marquee-row flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap font-display text-3xl font-medium tracking-tight text-ink/80 md:text-5xl">
          {t}
          <span className="h-1.5 w-1.5 rounded-full bg-signal" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee flex overflow-hidden border-y border-line py-5">
      {row(false)}
      {row(true)}
    </div>
  );
}
