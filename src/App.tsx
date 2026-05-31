import type { ReactNode } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { ItineraryPage } from './pages/ItineraryPage';
import { PlanPage } from './pages/PlanPage';
import { useAuthStore } from './store/authStore';

function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { logout, user } = useAuthStore();

  if (pathname === '/auth') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-white/40 bg-white/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link to="/dashboard" className="font-display text-2xl text-ink">
            Voyager Engine
          </Link>
          <nav className="flex items-center gap-2">
            <Link className="rounded-full px-4 py-2 text-sm text-ink/75 hover:bg-black/5" to="/dashboard">
              Dashboard
            </Link>
            <Link className="rounded-full px-4 py-2 text-sm text-ink/75 hover:bg-black/5" to="/plan">
              Plan
            </Link>
            <Link className="rounded-full px-4 py-2 text-sm text-ink/75 hover:bg-black/5" to="/itinerary">
              Itinerary
            </Link>
            <button className="rounded-full bg-ink px-4 py-2 text-sm text-white" onClick={logout}>
              {user ? `Logout ${user.name}` : 'Logout'}
            </button>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = useAuthStore((state) => state.token);
  return token ? <>{children}</> : <Navigate to="/auth" replace />;
}

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plan"
          element={
            <ProtectedRoute>
              <PlanPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/itinerary"
          element={
            <ProtectedRoute>
              <ItineraryPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppShell>
  );
}
