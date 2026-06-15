import { createServerClient } from '@/lib/supabase';
import MenuContent from '@/components/MenuContent';
import type { Product } from '@/lib/types';

export const revalidate = 60;

export default async function Home() {
  let products: Product[] = [];

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });

    if (!error && data) {
      products = data as Product[];
    }
  } catch {
    // Supabase not configured — render with empty state
  }

  return <MenuContent initialProducts={products} />;
}
