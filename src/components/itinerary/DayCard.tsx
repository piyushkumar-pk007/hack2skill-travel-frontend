import type { ItineraryDay } from '@travel-engine/shared';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ActivityRow } from './ActivityRow';

interface Props {
  day: ItineraryDay;
  isExpanded: boolean;
  onToggle: () => void;
}

export function DayCard({ day, isExpanded, onToggle }: Props) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-black/10 bg-white/75" role="article" aria-label={`Day ${day.day}: ${day.title}`}>
      <button
        className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`day-body-${day.day}`}
      >
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <span className="font-display text-lg">
            Day {day.day} - {day.title}
          </span>
          <span className="rounded-full bg-accent/10 px-2 py-1 text-xs font-medium uppercase tracking-wide text-ink">{day.theme}</span>
          <span className="text-sm text-ink/60">{day.date}</span>
        </div>
        {isExpanded ? <ChevronUp className="h-4 w-4 text-ink/60" aria-hidden /> : <ChevronDown className="h-4 w-4 text-ink/60" aria-hidden />}
      </button>

      {isExpanded ? (
        <div id={`day-body-${day.day}`} className="space-y-3 p-4" role="list" aria-label={`Activities for day ${day.day}`}>
          {day.activities.map((activity) => (
            <ActivityRow key={activity.id} activity={activity} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
