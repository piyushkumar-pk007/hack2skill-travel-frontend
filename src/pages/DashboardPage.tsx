import { Link } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { useAuthStore } from '../store/authStore';
import { useTripStore } from '../store/tripStore';

export function DashboardPage() {
  const { user } = useAuthStore();
  const { currentItinerary, tripId } = useTripStore();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <p className="text-sm uppercase tracking-[0.2em] text-ink/50">Welcome back</p>
          <h1 className="mt-2 font-display text-4xl">{user?.name ?? 'Traveler'}</h1>
          <p className="mt-3 max-w-2xl text-ink/70">
            Continue the current trip or start a new itinerary with fresh constraints and destination intelligence.
          </p>
          <div className="mt-6 flex gap-3">
            <Link className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white" to="/plan">
              New trip
            </Link>
            {currentItinerary ? (
              <Link className="rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-ink ring-1 ring-black/10" to="/itinerary">
                View itinerary
              </Link>
            ) : null}
          </div>
        </Card>

        <Card>
          <p className="text-sm uppercase tracking-[0.2em] text-ink/50">Current session</p>
          <div className="mt-4 space-y-3 text-sm text-ink/70">
            <p>Trip ID: {tripId ?? 'No trip generated yet'}</p>
            <p>Destination: {currentItinerary?.destination ?? 'Not set'}</p>
            <p>Days planned: {currentItinerary?.stats.days ?? 0}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
