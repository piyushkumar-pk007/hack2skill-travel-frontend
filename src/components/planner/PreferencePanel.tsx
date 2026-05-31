import type { TripPreferences, TravelStyle } from '@travel-engine/shared';
import { accommodationOptions, groupOptions, paceOptions, travelStyles } from '../../lib/constants';
import { useTripStore } from '../../store/tripStore';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';

export function PreferencePanel() {
  const { preferences, setPreference } = useTripStore();
  const selectedStyles = preferences.styles ?? [];

  function toggleStyle(style: TravelStyle) {
    const next = selectedStyles.includes(style)
      ? selectedStyles.filter((entry) => entry !== style)
      : [...selectedStyles, style];
    setPreference('styles', next as TripPreferences['styles']);
  }

  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-2 block text-sm font-medium text-ink/80">Travel style</legend>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Travel style preferences">
          {travelStyles.map((style) => {
            const active = selectedStyles.includes(style.value);
            return (
              <button
                key={style.value}
                type="button"
                aria-pressed={active}
                aria-label={`${style.label}${active ? ' selected' : ''}`}
                className={`rounded-full px-3 py-2 text-sm transition ${active ? 'bg-ink text-white' : 'bg-white/70 text-ink ring-1 ring-black/10'}`}
                onClick={() => toggleStyle(style.value)}
              >
                {style.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="pace">Pace</Label>
          <select
            id="pace"
            value={preferences.pace}
            onChange={(event) => setPreference('pace', event.target.value as TripPreferences['pace'])}
            className="w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm"
          >
            {paceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="groupType">Group</Label>
          <select
            id="groupType"
            value={preferences.groupType}
            onChange={(event) => setPreference('groupType', event.target.value as TripPreferences['groupType'])}
            className="w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm"
          >
            {groupOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="accommodation">Stay</Label>
          <select
            id="accommodation"
            value={preferences.accommodation}
            onChange={(event) => setPreference('accommodation', event.target.value as TripPreferences['accommodation'])}
            className="w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm"
          >
            {accommodationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-2xl bg-black/5 p-4" role="status" aria-live="polite">
        <p className="mb-2 text-sm font-medium" id="current-tone-heading">Current tone</p>
        <div className="flex flex-wrap gap-2" aria-labelledby="current-tone-heading">
          {selectedStyles.map((style) => (
            <Badge key={style} variant="secondary">
              {style}
            </Badge>
          ))}
          <Badge variant="secondary">{preferences.pace}</Badge>
          <Badge variant="secondary">{preferences.groupType}</Badge>
        </div>
      </div>
    </div>
  );
}
