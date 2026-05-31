import { Navigate } from 'react-router-dom';
import { ConciergeChat } from '../components/chat/ConciergeChat';
import { ItineraryView } from '../components/itinerary/ItineraryView';
import { LiveUpdatesFeed } from '../components/updates/LiveUpdatesFeed';
import { Card } from '../components/ui/card';
import { useTripStore } from '../store/tripStore';

export function ItineraryPage() {
  const { currentItinerary, preferences } = useTripStore();

  if (!currentItinerary) {
    return <Navigate to="/plan" replace />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.2em] text-ink/50">Generated itinerary</p>
        <h1 className="mt-2 font-display text-5xl leading-none">{currentItinerary.destination}</h1>
        <p className="mt-4 max-w-3xl text-lg text-ink/70">{currentItinerary.summary}</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <Card>
          <ItineraryView itinerary={currentItinerary} />
        </Card>

        <div className="space-y-6">
          <LiveUpdatesFeed
            destination={preferences.destination ?? currentItinerary.destination}
            dates={
              preferences.startDate && preferences.endDate
                ? `${preferences.startDate} to ${preferences.endDate}`
                : undefined
            }
          />
          <ConciergeChat />
        </div>
      </div>
    </div>
  );
}
