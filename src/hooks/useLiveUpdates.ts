import { useEffect } from 'react';
import { io, type Socket } from 'socket.io-client';
import { API_BASE_URL, api } from '../lib/api';
import { useAuthStore } from '../store/authStore';
import { useTripStore } from '../store/tripStore';

let socket: Socket | null = null;

export function useLiveUpdates(destination?: string, dates?: string) {
  const { token } = useAuthStore();
  const { updatesFeed, updatesLoading, setUpdatesFeed, setUpdatesLoading } = useTripStore();

  useEffect(() => {
    if (!destination || !token) {
      return;
    }

    let active = true;
    let pollTimer: number | undefined;
    const socketUpdatesEnabled =
      import.meta.env.VITE_ENABLE_SOCKET_UPDATES === 'true' ||
      (!import.meta.env.PROD && import.meta.env.VITE_ENABLE_SOCKET_UPDATES !== 'false');

    const fetchUpdates = async (showLoading = false) => {
      if (showLoading) {
        setUpdatesLoading(true);
      }

      try {
        const response = await api.get('/updates', { params: { destination, dates } });
        if (active) {
          setUpdatesFeed(response.data.data);
        }
      } catch {
        return;
      } finally {
        if (active && showLoading) {
          setUpdatesLoading(false);
        }
      }
    };

    void fetchUpdates(true);

    if (socketUpdatesEnabled) {
      if (!socket) {
        const socketUrl =
          import.meta.env.VITE_SOCKET_URL ??
          (API_BASE_URL.startsWith('http') ? API_BASE_URL.replace(/\/api$/, '') : window.location.origin);

        socket = io(socketUrl, {
          auth: { token },
        });
      }

      socket.emit('subscribe:updates', { destination, dates: dates ?? 'upcoming travel' });
      const handler = (feed: unknown) => {
        setUpdatesFeed(feed as any);
      };
      socket.on('updates:feed', handler);

      return () => {
        active = false;
        socket?.off('updates:feed', handler);
      };
    }

    // Vercel Functions do not provide native WebSocket support, so production
    // deployments can fall back to periodic refreshes of the cached updates API.
    pollTimer = window.setInterval(() => {
      void fetchUpdates(false);
    }, 5 * 60 * 1000);

    return () => {
      active = false;
      if (pollTimer) {
        window.clearInterval(pollTimer);
      }
    };
  }, [dates, destination, setUpdatesFeed, setUpdatesLoading, token]);

  return { updatesFeed, updatesLoading };
}
