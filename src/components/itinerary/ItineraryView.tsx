import { useState } from 'react';
import type { Itinerary } from '@travel-engine/shared';
import { Alert } from '../ui/alert';
import { Badge } from '../ui/badge';
import { DayCard } from './DayCard';

export function ItineraryView({ itinerary }: { itinerary: Itinerary }) {
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1]));

  function toggleDay(dayNumber: number) {
    setExpandedDays((previous) => {
      const next = new Set(previous);
      if (next.has(dayNumber)) {
        next.delete(dayNumber);
      } else {
        next.add(dayNumber);
      }
      return next;
    });
  }

  return (
    <div role="region" aria-label="Trip itinerary">
      <div className="mb-5 space-y-3" aria-label="Trip alerts">
        {itinerary.alerts.map((alert, index) => (
          <Alert key={`${alert.type}-${index}`} variant={alert.type === 'warning' ? 'destructive' : 'default'}>
            {alert.message}
          </Alert>
        ))}
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-4" role="list" aria-label="Trip statistics">
        {[
          { label: 'Duration', value: `${itinerary.stats.days} days` },
          { label: 'Budget', value: itinerary.stats.budgetEstimate },
          { label: 'Activities', value: String(itinerary.stats.activities) },
          { label: 'Stay', value: itinerary.stats.accommodation },
        ].map((stat) => (
          <div key={stat.label} className="rounded-3xl bg-white/70 p-4" role="listitem">
            <p className="text-xs uppercase tracking-wide text-ink/50">{stat.label}</p>
            <p className="mt-1 text-sm font-medium">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap gap-2" aria-label="Trip highlights" role="list">
        {itinerary.highlights.map((highlight, index) => (
          <span key={`${highlight}-${index}`} role="listitem">
            <Badge variant="secondary">{highlight}</Badge>
          </span>
        ))}
      </div>

      <div className="space-y-3">
        {itinerary.days.map((day) => (
          <DayCard key={day.day} day={day} isExpanded={expandedDays.has(day.day)} onToggle={() => toggleDay(day.day)} />
        ))}
      </div>
    </div>
  );
}
