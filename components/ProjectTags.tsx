export default function ProjectTags({ tags, accent }: { tags: string[]; accent: string }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Project tags">
      {tags.map((t) => (
        <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-mute" style={{ borderColor: `${accent}33` }}>
          {t}
        </li>
      ))}
    </ul>
  );
}
