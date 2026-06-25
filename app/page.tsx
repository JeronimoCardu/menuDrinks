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
      .order('display_order', { ascending: true, nullsFirst: false });

    if (error) {
      console.error('[Supabase] Error fetching products:', error.message);
    } else if (data) {
      // Only show products that are not explicitly disabled (null treated as active)
      products = (data as Product[]).filter((p) => p.active !== false);
    }
  } catch (err) {
    console.error('[Supabase] Connection failed:', err);
  }

  return <MenuContent initialProducts={products} />;
}
