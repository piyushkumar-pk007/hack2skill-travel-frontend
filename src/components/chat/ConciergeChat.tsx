import type { FormEvent } from 'react';
import { useState } from 'react';
import { useChat } from '../../hooks/useChat';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { MessageBubble } from './MessageBubble';

export function ConciergeChat() {
  const { abort, messages, send, streaming } = useChat();
  const [draft, setDraft] = useState('');

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next = draft;
    setDraft('');
    await send(next);
  }

  return (
    <Card className="flex h-full flex-col" role="region" aria-label="AI concierge chat">
      <div className="mb-5">
        <p className="text-sm uppercase tracking-[0.2em] text-ink/50">AI concierge</p>
        <h3 id="concierge-chat-heading" className="mt-2 font-display text-2xl">
          Ask for smarter sequencing, neighbourhood picks, or backup plans.
        </h3>
      </div>

      <div
        className="mb-4 flex-1 space-y-3 overflow-y-auto pr-1"
        role="log"
        aria-labelledby="concierge-chat-heading"
        aria-live="polite"
        aria-relevant="additions text"
      >
        {messages.map((message, index) => (
          <MessageBubble key={`${message.role}-${index}`} role={message.role} content={message.content} />
        ))}
      </div>

      <form className="space-y-3" onSubmit={onSubmit} aria-label="Send concierge message">
        <label htmlFor="concierge-draft" className="sr-only">
          Message the AI concierge
        </label>
        <Textarea
          id="concierge-draft"
          rows={3}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="How should I rebalance day two if it rains?"
          aria-describedby="concierge-helper"
        />
        <p id="concierge-helper" className="text-sm text-ink/60">
          Ask follow-up questions about the current itinerary, logistics, weather pivots, or budget tradeoffs.
        </p>
        <div className="flex gap-3">
          <Button type="submit" disabled={streaming} aria-describedby="concierge-helper">
            {streaming ? 'Streaming...' : 'Send'}
          </Button>
          {streaming ? (
            <Button type="button" variant="secondary" onClick={abort} aria-label="Stop streaming concierge response">
              Stop
            </Button>
          ) : null}
        </div>
      </form>
    </Card>
  );
}
