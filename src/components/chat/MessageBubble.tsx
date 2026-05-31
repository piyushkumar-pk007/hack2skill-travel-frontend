import { cn } from '../../lib/utils';

export function MessageBubble({ role, content }: { role: 'user' | 'assistant'; content: string }) {
  return (
    <div className={cn('flex', role === 'user' ? 'justify-end' : 'justify-start')} aria-label={`${role} message`}>
      <div
        className={cn(
          'max-w-[85%] rounded-3xl px-4 py-3 text-sm shadow-sm',
          role === 'user' ? 'bg-ink text-white' : 'bg-white/80 text-ink ring-1 ring-black/10',
        )}
      >
        {content}
      </div>
    </div>
  );
}
