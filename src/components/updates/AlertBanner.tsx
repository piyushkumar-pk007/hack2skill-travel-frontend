import type { TravelUpdate } from '@travel-engine/shared';
import { AlertTriangle, Info, ShieldAlert } from 'lucide-react';

const iconMap = {
  info: Info,
  warning: AlertTriangle,
  alert: ShieldAlert,
};

export function AlertBanner({ update }: { update: TravelUpdate }) {
  const Icon = iconMap[update.severity];

  return (
    <div className="rounded-2xl border border-black/10 bg-white/75 p-4" role="listitem" aria-label={`${update.severity} update: ${update.title}`}>
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-black/5 p-2">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold">{update.title}</p>
          <p className="mt-1 text-sm text-ink/70">{update.description}</p>
          <p className="mt-2 text-xs uppercase tracking-wide text-ink/45">{update.source}</p>
        </div>
      </div>
    </div>
  );
}
