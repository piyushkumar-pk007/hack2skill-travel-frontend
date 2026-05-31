import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTripPlanner } from '../../hooks/useTripPlanner';
import { useTripStore } from '../../store/tripStore';
import { Alert } from '../ui/alert';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Spinner } from '../ui/spinner';
import { Textarea } from '../ui/textarea';
import { PreferencePanel } from './PreferencePanel';

export function TripPlannerForm() {
  const navigate = useNavigate();
  const { preferences, setPreference } = useTripStore();
  const { generate, generationError, isGenerating } = useTripPlanner();

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const success = await generate();
    if (success) {
      navigate('/itinerary');
    }
  }

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-ember via-accent to-ink" />
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.2em] text-ink/55">Trip brief</p>
        <h2 id="trip-planner-heading" className="mt-2 font-display text-3xl text-ink">
          Shape the trip before the AI books the story beats.
        </h2>
      </div>

      <form className="space-y-6" onSubmit={onSubmit} aria-labelledby="trip-planner-heading" aria-busy={isGenerating}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              placeholder="Lisbon, Portugal"
              value={preferences.destination ?? ''}
              onChange={(event) => setPreference('destination', event.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="origin">Origin</Label>
            <Input
              id="origin"
              placeholder="New Delhi"
              value={preferences.origin ?? ''}
              onChange={(event) => setPreference('origin', event.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="startDate">Start date</Label>
            <Input
              id="startDate"
              type="date"
              value={preferences.startDate ?? ''}
              onChange={(event) => setPreference('startDate', event.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="endDate">End date</Label>
            <Input
              id="endDate"
              type="date"
              value={preferences.endDate ?? ''}
              onChange={(event) => setPreference('endDate', event.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="budgetUSD">Budget in USD</Label>
            <Input
              id="budgetUSD"
              type="number"
              min={100}
              value={preferences.budgetUSD ?? 2000}
              onChange={(event) => setPreference('budgetUSD', Number(event.target.value))}
            />
          </div>
        </div>

        <PreferencePanel />

        <div>
          <Label htmlFor="specialRequirements">Special requirements</Label>
          <Textarea
            id="specialRequirements"
            rows={4}
            placeholder="Mobility needs, food restrictions, kid-friendly pace, photography goals..."
            value={preferences.specialRequirements ?? ''}
            onChange={(event) => setPreference('specialRequirements', event.target.value)}
          />
        </div>

        {generationError ? <Alert variant="destructive">{generationError}</Alert> : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" className="min-w-40" disabled={isGenerating} aria-describedby="trip-planner-helper">
            {isGenerating ? (
              <span className="inline-flex items-center gap-2" role="status" aria-live="polite">
                <Spinner />
                Generating
              </span>
            ) : (
              'Generate itinerary'
            )}
          </Button>
          <p id="trip-planner-helper" className="max-w-xl text-sm text-ink/60">
            The planner balances pacing, style, budget, and logistics, then keeps feeding live travel intelligence into the itinerary view.
          </p>
        </div>
      </form>
    </Card>
  );
}
