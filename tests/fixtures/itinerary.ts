import type { ItineraryDay } from '@travel-engine/shared';

export const mockDay: ItineraryDay = {
  day: 1,
  date: '2026-08-10',
  title: 'Arrival and orientation',
  theme: 'culture',
  activities: [
    {
      id: crypto.randomUUID(),
      time: '10:00',
      name: 'Airport transfer',
      description: 'Train to the city centre.',
      type: 'transport',
      cost: '$',
      duration: '1h',
      location: 'Kyoto',
      tags: ['transfer'],
    },
  ],
};
