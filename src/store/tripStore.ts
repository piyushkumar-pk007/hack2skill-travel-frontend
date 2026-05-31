import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Itinerary, TripPreferences, UpdatesFeed } from '@travel-engine/shared';

interface TripState {
  preferences: Partial<TripPreferences>;
  currentItinerary: Itinerary | null;
  tripId: string | null;
  isGenerating: boolean;
  generationError: string | null;
  updatesFeed: UpdatesFeed | null;
  updatesLoading: boolean;
  setPreference: <K extends keyof TripPreferences>(key: K, value: TripPreferences[K]) => void;
  resetPreferences: () => void;
  setItinerary: (itinerary: Itinerary, tripId: string) => void;
  setGenerating: (value: boolean) => void;
  setGenerationError: (value: string | null) => void;
  setUpdatesFeed: (feed: UpdatesFeed) => void;
  setUpdatesLoading: (value: boolean) => void;
}

const defaultPreferences: Partial<TripPreferences> = {
  styles: ['culture'],
  pace: 'moderate',
  groupType: 'solo',
  accommodation: 'midrange',
  budgetUSD: 2000,
};

export const useTripStore = create<TripState>()(
  persist(
    (set) => ({
      preferences: defaultPreferences,
      currentItinerary: null,
      tripId: null,
      isGenerating: false,
      generationError: null,
      updatesFeed: null,
      updatesLoading: false,
      setPreference: (key, value) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            [key]: value,
          },
        })),
      resetPreferences: () => set({ preferences: defaultPreferences }),
      setItinerary: (itinerary, tripId) => set({ currentItinerary: itinerary, tripId }),
      setGenerating: (value) => set({ isGenerating: value }),
      setGenerationError: (value) => set({ generationError: value }),
      setUpdatesFeed: (feed) => set({ updatesFeed: feed }),
      setUpdatesLoading: (value) => set({ updatesLoading: value }),
    }),
    {
      name: 'voyager-trip-store',
      partialize: (state) => ({
        preferences: state.preferences,
        tripId: state.tripId,
      }),
    },
  ),
);
