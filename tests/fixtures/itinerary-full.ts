import type { Itinerary } from '@travel-engine/shared';

export const mockItinerary: Itinerary = {
  id: '550e8400-e29b-41d4-a716-446655440001',
  tripId: '550e8400-e29b-41d4-a716-446655440002',
  destination: 'Kyoto, Japan',
  summary: 'A weeklong Kyoto itinerary with practical transport buffers and food-first planning.',
  highlights: ['Gion walk', 'Market lunch', 'Temple district sunrise'],
  stats: {
    days: 3,
    budgetEstimate: '$2,000 total',
    activities: 9,
    accommodation: 'midrange',
  },
  alerts: [{ type: 'info', message: 'Reserve high-demand dinners in advance.' }],
  days: [
    {
      day: 1,
      date: '2026-08-10',
      title: 'Arrival',
      theme: 'culture',
      activities: [
        {
          id: '550e8400-e29b-41d4-a716-446655440003',
          time: '10:00',
          name: 'Airport transfer',
          description: 'Train to central Kyoto.',
          type: 'transport',
          cost: '$',
          duration: '1h',
          location: 'Kyoto',
          tags: ['transfer'],
        },
      ],
    },
    {
      day: 2,
      date: '2026-08-11',
      title: 'Old Kyoto',
      theme: 'food',
      activities: [
        {
          id: '550e8400-e29b-41d4-a716-446655440004',
          time: '09:00',
          name: 'Temple district walk',
          description: 'Morning heritage circuit.',
          type: 'culture',
          cost: '$',
          duration: '2h',
          location: 'Kyoto',
          tags: ['heritage'],
        },
      ],
    },
    {
      day: 3,
      date: '2026-08-12',
      title: 'Departure',
      theme: 'nature',
      activities: [
        {
          id: '550e8400-e29b-41d4-a716-446655440005',
          time: '08:00',
          name: 'Riverside breakfast',
          description: 'Breakfast before checkout.',
          type: 'food',
          cost: '$$',
          duration: '1h',
          location: 'Kyoto',
          tags: ['breakfast'],
        },
      ],
    },
  ],
  generatedAt: '2026-05-31T12:00:00.000Z',
};
