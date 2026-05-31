import { buildApiUrl } from '../lib/api';
import { useRef, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useTripStore } from '../store/tripStore';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function useChat() {
  const { tripId } = useTripStore();
  const { token } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI travel concierge. Ask about logistics, neighbourhoods, or smarter budget tradeoffs.",
    },
  ]);
  const [streaming, setStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  async function send(text: string) {
    if (!text.trim() || streaming || !token) {
      return;
    }

    const userMessage: Message = { role: 'user', content: text };
    const assistantPlaceholder: Message = { role: 'assistant', content: '' };
    const history = messagesRef.current.slice(-10).map((message) => ({
      role: message.role,
      content: message.content,
    }));

    setMessages((previous) => [...previous, userMessage, assistantPlaceholder]);
    setStreaming(true);
    abortRef.current = new AbortController();

    try {
      const response = await fetch(buildApiUrl('/chat/stream'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: text, tripId, history }),
        signal: abortRef.current.signal,
      });

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No stream returned');
      }

      const decoder = new TextDecoder();
      let buffer = '';
      let doneStreaming = false;

      while (!doneStreaming) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split('\n\n');
        buffer = chunks.pop() ?? '';

        for (const chunk of chunks) {
          if (!chunk.startsWith('data: ')) {
            continue;
          }

          const payload = chunk.slice(6);
          if (payload === '[DONE]') {
            doneStreaming = true;
            break;
          }

          const parsed = JSON.parse(payload) as { text: string };
          setMessages((previous) => {
            const copy = [...previous];
            const targetIndex = copy.length - 1;
            copy[targetIndex] = {
              ...copy[targetIndex],
              content: copy[targetIndex].content + parsed.text,
            };
            return copy;
          });
        }
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        setMessages((previous) => {
          const copy = [...previous];
          copy[copy.length - 1] = {
            role: 'assistant',
            content: 'Sorry, something went wrong. Please try again.',
          };
          return copy;
        });
      }
    } finally {
      setStreaming(false);
    }
  }

  function abort() {
    abortRef.current?.abort();
  }

  return { messages, send, streaming, abort };
}
