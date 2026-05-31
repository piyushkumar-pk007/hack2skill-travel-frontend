import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginSchema, RegisterSchema } from '../lib/validators';
import { api } from '../lib/api';
import { useAuthStore } from '../store/authStore';
import { Alert } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export function AuthPage() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    const schema = mode === 'register' ? RegisterSchema : LoginSchema;
    const payload = mode === 'register' ? form : { email: form.email, password: form.password };
    const result = schema.safeParse(payload);

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? 'Invalid form');
      return;
    }

    try {
      const endpoint = mode === 'register' ? '/auth/register' : '/auth/login';
      const response = await api.post(endpoint, result.data);
      setAuth(response.data.data.token, response.data.data.user);
      navigate('/plan');
    } catch (requestError: any) {
      setError(requestError?.response?.data?.error?.message ?? 'Authentication failed');
    }
  }

  return (
    <div className="grid min-h-screen place-items-center px-4 py-10">
      <Card className="w-full max-w-md">
        <p className="text-sm uppercase tracking-[0.25em] text-ink/50">Voyager Engine</p>
        <h1 className="mt-3 font-display text-4xl leading-tight">Turn travel preferences into a living trip plan.</h1>
        <p className="mt-3 text-sm text-ink/65">Register once, then build an itinerary that keeps reacting to live travel signals.</p>

        <div className="mt-6 flex gap-2">
          <Button type="button" variant={mode === 'register' ? 'default' : 'secondary'} onClick={() => setMode('register')}>
            Register
          </Button>
          <Button type="button" variant={mode === 'login' ? 'default' : 'secondary'} onClick={() => setMode('login')}>
            Login
          </Button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={submit}>
          {mode === 'register' ? (
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
            </div>
          ) : null}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={form.password} onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))} />
          </div>
          {error ? <Alert variant="destructive">{error}</Alert> : null}
          <Button type="submit" className="w-full">
            {mode === 'register' ? 'Create account' : 'Sign in'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
