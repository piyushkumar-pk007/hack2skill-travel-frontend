import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ItineraryView } from '../../src/components/itinerary/ItineraryView';
import { mockItinerary } from '../fixtures/itinerary-full';
import { expectNoAxeViolations } from '../helpers/axe';

describe('ItineraryView', () => {
  it('renders highlights, stats, and alerts', () => {
    render(<ItineraryView itinerary={mockItinerary} />);

    expect(screen.getByText(/reserve high-demand dinners/i)).toBeInTheDocument();
    expect(screen.getByText(/gion walk/i)).toBeInTheDocument();
    expect(screen.getByText(/\$2,000 total/i)).toBeInTheDocument();
  });

  it('toggles itinerary day sections', () => {
    render(<ItineraryView itinerary={mockItinerary} />);

    const secondDayButton = screen.getByRole('button', { name: /day 2 - old kyoto/i });
    fireEvent.click(secondDayButton);

    expect(screen.getByText(/temple district walk/i)).toBeInTheDocument();
  });

  it('has zero axe violations', async () => {
    const { container } = render(<ItineraryView itinerary={mockItinerary} />);
    await expectNoAxeViolations(container);
  });
});
