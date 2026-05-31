import { useLiveUpdates } from '../../hooks/useLiveUpdates';
import { Card } from '../ui/card';
import { Spinner } from '../ui/spinner';
import { AlertBanner } from './AlertBanner';

export function LiveUpdatesFeed({ destination, dates }: { destination?: string; dates?: string }) {
  const { updatesFeed, updatesLoading } = useLiveUpdates(destination, dates);

  return (
    <Card role="region" aria-label="Live travel updates" aria-busy={updatesLoading}>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-ink/50">Live intelligence</p>
          <h3 id="live-updates-heading" className="mt-2 font-display text-2xl">Signals that may reshape the plan.</h3>
        </div>
        {updatesLoading ? <span role="status" aria-live="polite"><Spinner /></span> : null}
      </div>

      <div className="space-y-3" role="list" aria-labelledby="live-updates-heading" aria-live="polite">
        {updatesFeed?.updates.length ? (
          updatesFeed.updates.map((update) => <AlertBanner key={update.id} update={update} />)
        ) : (
          <p className="text-sm text-ink/60">Updates will appear here after we fetch destination intelligence.</p>
        )}
      </div>
    </Card>
  );
}
