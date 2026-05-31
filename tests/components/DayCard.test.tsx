import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DayCard } from '../../src/components/itinerary/DayCard';
import { mockDay } from '../fixtures/itinerary';

describe('DayCard', () => {
  it('renders day title and theme', () => {
    render(<DayCard day={mockDay} isExpanded={false} onToggle={vi.fn()} />);
    expect(screen.getByText(/Day 1/)).toBeInTheDocument();
    expect(screen.getByText(mockDay.theme)).toBeInTheDocument();
  });

  it('hides activities when collapsed', () => {
    render(<DayCard day={mockDay} isExpanded={false} onToggle={vi.fn()} />);
    mockDay.activities.forEach((activity) => {
      expect(screen.queryByText(activity.name)).not.toBeInTheDocument();
    });
  });

  it('shows activities when expanded', () => {
    render(<DayCard day={mockDay} isExpanded={true} onToggle={vi.fn()} />);
    expect(screen.getByText(mockDay.activities[0].name)).toBeInTheDocument();
  });

  it('calls onToggle when header clicked', () => {
    const onToggle = vi.fn();
    render(<DayCard day={mockDay} isExpanded={false} onToggle={onToggle} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalledOnce();
  });

  it('has correct aria attributes', () => {
    render(<DayCard day={mockDay} isExpanded={true} onToggle={vi.fn()} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-controls', `day-body-${mockDay.day}`);
  });
});
