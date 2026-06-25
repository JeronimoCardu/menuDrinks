'use client';

import { useState, useTransition } from 'react';
import { loginAction } from '../actions';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const username = (form.elements.namedItem('username') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    startTransition(async () => {
      const result = await loginAction(username, password);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="min-h-screen bg-night-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <span className="font-display text-4xl text-white tracking-wide">AEROPUERTO</span>
          <span className="text-zinc-600 text-xs tracking-[0.2em] uppercase mt-1">Panel de gestión</span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-night-card border border-night-border rounded-2xl p-6 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-zinc-400 text-xs font-medium uppercase tracking-wide">
              Usuario
            </label>
            <input
              name="username"
              type="text"
              required
              autoComplete="username"
              className="h-11 px-3 rounded-xl bg-night-bg border border-night-border text-white text-sm outline-none focus:border-night-accentLight transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-zinc-400 text-xs font-medium uppercase tracking-wide">
              Contraseña
            </label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="h-11 px-3 rounded-xl bg-night-bg border border-night-border text-white text-sm outline-none focus:border-night-accentLight transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="h-11 rounded-xl bg-night-accent hover:bg-night-accentLight text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}
