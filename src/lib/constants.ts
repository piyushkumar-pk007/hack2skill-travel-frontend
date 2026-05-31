import type { AccommodationType, GroupType, TravelStyle, TripPace } from '@travel-engine/shared';

export const travelStyles: Array<{ label: string; value: TravelStyle }> = [
  { label: 'Culture', value: 'culture' },
  { label: 'Food', value: 'food' },
  { label: 'Nature', value: 'nature' },
  { label: 'Adventure', value: 'adventure' },
  { label: 'Relaxation', value: 'relaxation' },
  { label: 'Nightlife', value: 'nightlife' },
  { label: 'Photography', value: 'photography' },
  { label: 'Shopping', value: 'shopping' },
];

export const paceOptions: TripPace[] = ['relaxed', 'moderate', 'packed'];
export const groupOptions: GroupType[] = ['solo', 'couple', 'friends', 'family'];
export const accommodationOptions: AccommodationType[] = ['budget', 'midrange', 'luxury', 'airbnb'];
