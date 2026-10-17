'use client';
import { useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState('copied');
    } catch {
      setState('failed');
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), 2200);
  };

  return (
    <div className="inline-flex flex-wrap items-center gap-3">
      <a
        href={`mailto:${email}`}
        className="font-mono text-base text-ink underline decoration-line decoration-1 underline-offset-8 transition-colors hover:decoration-cyan md:text-lg"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className="inline-flex h-9 items-center gap-2 rounded-full border border-line px-3 font-mono text-xs text-mute transition-colors hover:border-cyan/60 hover:text-ink"
      >
        {state === 'copied' ? <Check size={14} className="text-cyan" aria-hidden /> : <Copy size={14} aria-hidden />}
        {state === 'copied' ? 'Copied' : 'Copy'}
      </button>
      <span role="status" aria-live="polite" className="font-mono text-xs text-cyan">
        {state === 'copied' && 'Email copied to clipboard'}
        {state === 'failed' && <span className="text-signal">Copy failed. Select the address instead.</span>}
      </span>
    </div>
  );
}
