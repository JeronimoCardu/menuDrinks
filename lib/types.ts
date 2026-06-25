export type ProductCategory =
  | 'drink_500ml'
  | 'drink_1l'
  | 'bottle_combo'
  | 'promotion'
  | 'alcohol-free';

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  cash: number | null;
  image: string | null;
  category: ProductCategory;
  featured: boolean | null;
  badge: boolean | null;
  active: boolean | null;
  display_order: number | null;
  isRedeemable: boolean | null;
  created_at: string;
}

export type ActiveCategory = ProductCategory | 'all';

export interface CategoryMeta {
  id: ActiveCategory;
  label: string;
  emoji: string;
}

export const CATEGORY_META: CategoryMeta[] = [
  { id: 'all', label: 'Todos', emoji: '✦' },
  { id: 'drink_500ml', label: 'Tragos 500ml', emoji: '🥃' },
  { id: 'drink_1l', label: 'Tragos 1L', emoji: '🍹' },
  { id: 'bottle_combo', label: 'Combos de Botellas', emoji: '🍾' },
  { id: 'promotion', label: 'Promociones', emoji: '⚡' },
  { id: 'alcohol-free', label: 'Sin Alcohol', emoji: '🧃' },
];

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  drink_500ml: 'Tragos 500ml',
  drink_1l: 'Tragos 1L',
  bottle_combo: 'Combos de Botellas',
  promotion: 'Promociones',
  'alcohol-free': 'Sin Alcohol',
};

export const CATEGORY_ORDER: ProductCategory[] = [
  'drink_500ml',
  'drink_1l',
  'bottle_combo',
  'promotion',
  'alcohol-free',
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
