import type { Activity } from '@travel-engine/shared';
import { MapPin, Wallet } from 'lucide-react';
import { Badge } from '../ui/badge';

export function ActivityRow({ activity }: { activity: Activity }) {
  return (
    <div className="rounded-2xl border border-black/8 bg-white/60 p-4" role="listitem" aria-label={`${activity.time} ${activity.name}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-lg">{activity.time}</span>
            <Badge variant="secondary">{activity.type}</Badge>
          </div>
          <h4 className="mt-2 text-base font-semibold">{activity.name}</h4>
          <p className="mt-1 text-sm text-ink/70">{activity.description}</p>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-ink/60">
            {activity.location ? (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {activity.location}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1">
              <Wallet className="h-3.5 w-3.5" />
              {activity.cost}
            </span>
            <span>{activity.duration}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {activity.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
