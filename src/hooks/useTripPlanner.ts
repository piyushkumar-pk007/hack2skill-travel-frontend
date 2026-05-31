import { TripPreferencesSchema } from '@travel-engine/shared';
import { api } from '../lib/api';
import { useTripStore } from '../store/tripStore';

export function useTripPlanner() {
  const {
    preferences,
    currentItinerary,
    generationError,
    isGenerating,
    setGenerating,
    setGenerationError,
    setItinerary,
  } = useTripStore();

  async function generate() {
    const result = TripPreferencesSchema.safeParse(preferences);
    if (!result.success) {
      setGenerationError(result.error.issues.map((issue) => issue.message).join('. '));
      return false;
    }

    setGenerating(true);
    setGenerationError(null);

    try {
      const response = await api.post('/itinerary/generate', result.data);
      setItinerary(response.data.data.itinerary, response.data.data.tripId);
      return true;
    } catch (error: any) {
      setGenerationError(error?.response?.data?.error?.message ?? 'Failed to generate itinerary');
      return false;
    } finally {
      setGenerating(false);
    }
  }

  return {
    preferences,
    currentItinerary,
    generationError,
    isGenerating,
    generate,
  };
}
