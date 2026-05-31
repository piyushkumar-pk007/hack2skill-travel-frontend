import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ConciergeChat } from '../../src/components/chat/ConciergeChat';
import { expectNoAxeViolations } from '../helpers/axe';

const sendMock = vi.hoisted(() => vi.fn());
const abortMock = vi.hoisted(() => vi.fn());

vi.mock('../../src/hooks/useChat', () => ({
  useChat: () => ({
    messages: [
      { role: 'assistant', content: 'Welcome to your travel concierge.' },
      { role: 'user', content: 'How should I rebalance the day?' },
    ],
    send: sendMock,
    abort: abortMock,
    streaming: false,
  }),
}));

describe('ConciergeChat', () => {
  beforeEach(() => {
    sendMock.mockReset();
    abortMock.mockReset();
  });

  it('sends a message from the chat form', async () => {
    render(<ConciergeChat />);

    fireEvent.change(screen.getByLabelText(/message the ai concierge/i), {
      target: { value: 'Suggest a rain backup.' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));

    expect(sendMock).toHaveBeenCalledWith('Suggest a rain backup.');
  });

  it('renders an accessible chat log', async () => {
    const { container } = render(<ConciergeChat />);
    expect(screen.getByRole('log')).toBeInTheDocument();
    await expectNoAxeViolations(container);
  });
});
