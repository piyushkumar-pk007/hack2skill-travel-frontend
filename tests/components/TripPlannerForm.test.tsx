import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useTripStore } from '../../src/store/tripStore';
import { TripPlannerForm } from '../../src/components/planner/TripPlannerForm';
import { expectNoAxeViolations } from '../helpers/axe';

const navigateMock = vi.hoisted(() => vi.fn());
const generateMock = vi.hoisted(() => vi.fn());

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('../../src/hooks/useTripPlanner', () => ({
  useTripPlanner: () => ({
    generate: generateMock,
    generationError: null,
    isGenerating: false,
    currentItinerary: null,
    preferences: {},
  }),
}));

describe('TripPlannerForm', () => {
  beforeEach(() => {
    navigateMock.mockReset();
    generateMock.mockReset();
    useTripStore.setState({
      preferences: {
        destination: 'Kyoto, Japan',
        origin: 'New Delhi',
        startDate: '2026-08-10',
        endDate: '2026-08-12',
        styles: ['culture'],
        pace: 'moderate',
        groupType: 'solo',
        accommodation: 'midrange',
        budgetUSD: 2000,
      },
      currentItinerary: null,
      tripId: null,
      isGenerating: false,
      generationError: null,
      updatesFeed: null,
      updatesLoading: false,
    });
  });

  it('submits the planner and navigates on success', async () => {
    generateMock.mockResolvedValue(true);
    render(<TripPlannerForm />);

    fireEvent.click(screen.getByRole('button', { name: /generate itinerary/i }));

    expect(generateMock).toHaveBeenCalledOnce();
  });

  it('renders an accessible planner form', async () => {
    const { container } = render(<TripPlannerForm />);
    expect(screen.getByRole('form', { name: /shape the trip/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /culture/i })).toHaveAttribute('aria-pressed', 'true');
    await expectNoAxeViolations(container);
  });
});
