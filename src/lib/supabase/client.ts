import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null | undefined;

/**
 * Returnerer en konfigurert Supabase-klient dersom miljøvariablene er satt,
 * ellers null slik at applikasjonen sømløst bruker lokal demodata + localStorage.
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (cachedClient !== undefined) {
    return cachedClient;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey || url.includes('ditt-prosjekt')) {
    cachedClient = null;
    return null;
  }

  cachedClient = createClient(url, anonKey);
  return cachedClient;
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseClient() !== null;
}
