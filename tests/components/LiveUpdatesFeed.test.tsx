import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LiveUpdatesFeed } from '../../src/components/updates/LiveUpdatesFeed';
import { expectNoAxeViolations } from '../helpers/axe';

vi.mock('../../src/hooks/useLiveUpdates', () => ({
  useLiveUpdates: () => ({
    updatesLoading: false,
    updatesFeed: {
      destination: 'Kyoto',
      updatedAt: '2026-05-31T12:00:00.000Z',
      updates: [
        {
          id: '550e8400-e29b-41d4-a716-446655440006',
          type: 'weather',
          severity: 'info',
          title: 'Pack light layers',
          description: 'Morning and evening conditions can shift quickly.',
          source: 'Travel Engine fallback intelligence',
          destination: 'Kyoto',
          createdAt: '2026-05-31T12:00:00.000Z',
        },
      ],
    },
  }),
}));

describe('LiveUpdatesFeed', () => {
  it('renders update cards', () => {
    render(<LiveUpdatesFeed destination="Kyoto" dates="2026-08-10 to 2026-08-12" />);
    expect(screen.getByText(/pack light layers/i)).toBeInTheDocument();
  });

  it('has zero axe violations', async () => {
    const { container } = render(<LiveUpdatesFeed destination="Kyoto" dates="2026-08-10 to 2026-08-12" />);
    await expectNoAxeViolations(container);
  });
});
