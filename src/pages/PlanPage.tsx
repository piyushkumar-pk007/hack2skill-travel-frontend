import { Compass, Sparkles } from 'lucide-react';
import { TripPlannerForm } from '../components/planner/TripPlannerForm';
import { Card } from '../components/ui/card';

export function PlanPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 grid gap-4 lg:grid-cols-[1.6fr_0.8fr]">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-[size:26px_26px] opacity-25" />
          <div className="relative">
            <div className="mb-5 inline-flex rounded-full bg-ember/15 px-4 py-2 text-sm font-medium text-ink">
              <Sparkles className="mr-2 h-4 w-4" />
              AI itinerary generation with live travel intelligence
            </div>
            <h1 className="max-w-3xl font-display text-5xl leading-none text-ink">Plan a trip like a producer, not a spreadsheet.</h1>
            <p className="mt-5 max-w-2xl text-lg text-ink/70">
              Build a practical itinerary, keep constraints explicit, and let the system keep watching for real-world signals that matter.
            </p>
          </div>
        </Card>

        <Card className="bg-ink text-white">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white/10 p-3">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-white/55">What’s built in</p>
              <p className="mt-1 font-display text-2xl">Constraints stay visible.</p>
            </div>
          </div>
          <div className="mt-5 space-y-3 text-sm text-white/75">
            <p>Budget pressure affects activity mix.</p>
            <p>Pace controls day density.</p>
            <p>Chat and live updates stay attached to the same trip context.</p>
          </div>
        </Card>
      </div>

      <TripPlannerForm />
    </div>
  );
}
