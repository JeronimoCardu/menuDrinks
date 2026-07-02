'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createServerClient } from '@/lib/supabase';
import { verifyCredentials, getSessionToken, SESSION_COOKIE, COOKIE_MAX_AGE } from '@/lib/auth';

/* ── Auth ────────────────────────────────────────────────── */

export async function loginAction(username: string, password: string) {
  if (!verifyCredentials(username, password)) {
    return { error: 'Usuario o contraseña incorrectos' };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, getSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });

  redirect('/admin');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect('/admin/login');
}

/* ── Products ────────────────────────────────────────────── */

function db() {
  return createServerClient();
}

export async function getAdminProducts() {
  const { data, error } = await db()
    .from('products')
    .select('*')
    .order('display_order', { ascending: true, nullsFirst: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export interface ProductPayload {
  name: string;
  description: string;
  price: number;
  cash: number | null;
  image: string;
  category: string;
  badge: boolean;
  featured: boolean;
  active: boolean;
  display_order: number;
  isRedeemable: boolean;
}

export async function createProduct(payload: ProductPayload) {
  const { data, error } = await db()
    .from('products')
    .insert([payload])
    .select();
  if (error) return { error: error.message };
  revalidatePath('/');
  revalidatePath('/admin');
  return { data: data?.[0] ?? null };
}

export async function updateProduct(id: string, payload: Partial<ProductPayload>) {
  const { error } = await db()
    .from('products')
    .update(payload)
    .eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/');
  revalidatePath('/admin');
  return { data: { id, ...payload } };
}

export async function deleteProduct(id: string) {
  const { error } = await db().from('products').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function toggleField(
  id: string,
  field: 'active' | 'featured' | 'badge' | 'isRedeemable',
  value: boolean
) {
  const { error } = await db().from('products').update({ [field]: value }).eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/');
  revalidatePath('/admin');
}
