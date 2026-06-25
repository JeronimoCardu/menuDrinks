'use client';

import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';
import Image from 'next/image';
import { GlassWater } from 'lucide-react';
import type { Product, ProductCategory } from '@/lib/types';
import { CATEGORY_LABELS, CATEGORY_ORDER, formatPrice } from '@/lib/types';
import { normalizeImage } from '@/lib/utils';
import ProductCard from './ProductCard';

const CATEGORY_EMOJI: Record<string, string> = {
  drink_500ml: '🥃',
  drink_1l: '🍹',
  bottle_combo: '🍾',
  promotion: '⚡',
  'alcohol-free': '🧃',
};

const WIDE_LAYOUT_CATEGORIES = new Set(['bottle_combo', 'promotion']);

interface ProductCatalogProps {
  products: Product[];
  searchQuery: string;
}

export default function ProductCatalog({ products, searchQuery }: ProductCatalogProps) {
  if (products.length === 0) {
    return <EmptyState searchQuery={searchQuery} />;
  }

  // Group by actual category value — never drop a product
  const grouped = products.reduce<Record<string, Product[]>>((acc, p) => {
    const key = p.category?.trim() || 'sin-categoria';
    if (!acc[key]) acc[key] = [];
    acc[key].push(p);
    return acc;
  }, {});

  // Known categories first (in order), then whatever else exists
  const knownFirst = CATEGORY_ORDER.filter((c) => grouped[c]);
  const rest = Object.keys(grouped).filter(
    (c) => !CATEGORY_ORDER.includes(c as ProductCategory)
  );
  const orderedKeys = [...knownFirst, ...rest];

  return (
    <div className="flex flex-col gap-8 px-4 pb-12">
      {orderedKeys.map((category) => (
        <CategorySection
          key={category}
          category={category}
          items={grouped[category]}
        />
      ))}
    </div>
  );
}

function categoryLabel(cat: string): string {
  return CATEGORY_LABELS[cat as ProductCategory] ?? cat.replace(/-/g, ' ').replace(/_/g, ' ');
}

function CategorySection({ category, items }: { category: string; items: Product[] }) {
  const isWide = WIDE_LAYOUT_CATEGORIES.has(category);
  const emoji = CATEGORY_EMOJI[category] ?? '🍸';

  return (
    <section className="my-4">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl">{emoji}</span>
        <h2 className="font-display text-2xl text-white tracking-wide">
          {categoryLabel(category).toUpperCase()}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-night-border to-transparent" />
        <span className="text-zinc-600 text-xs font-medium">{items.length} opciones</span>
      </div>

      {category === 'drink_1l' && <OneLiterBanner />}

      {isWide ? (
        <div className="flex flex-col gap-3">
          {items.map((product, i) => (
            <WideProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}

/* ── Wide card ──────────────────────────────────────────── */
const BADGE_STYLE = 'bg-night-accent text-white badge-glow';

function WideProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
      className="group flex overflow-hidden rounded-2xl bg-night-card border border-night-border card-glow"
    >
      <div className="relative w-28 sm:w-36 flex-shrink-0 bg-gradient-to-br from-zinc-900 to-night-card overflow-hidden">
        {normalizeImage(product.image) ? (
          <Image
            src={normalizeImage(product.image)!}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="120px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-night-accentDim via-night-card to-zinc-900">
            <GlassWater className="text-night-border" size={28} />
          </div>
        )}
        <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-night-accent to-transparent opacity-60" />
      </div>

      <div className="flex flex-col justify-between flex-1 p-4 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-semibold text-sm leading-snug flex-1">
            {product.name}
          </h3>
          {product.badge && (
            <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${BADGE_STYLE}`}>
              Destacado
            </span>
          )}
        </div>

        {product.description && (
          <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">
            {product.description}
          </p>
        )}

        <p className="price-gradient font-display text-2xl leading-none">
          {formatPrice(product.price)}
        </p>
      </div>
    </motion.article>
  );
}

/* ── 1L info banner ────────────────────────────────────── */
function OneLiterBanner() {
  return (
    <div className="mb-4 flex items-start gap-3 rounded-xl border border-night-accentLight/30 bg-night-accentDim px-4 py-3">
      <span className="text-lg leading-none mt-0.5">💡</span>
      <p className="text-zinc-300 text-xs leading-relaxed">
        <span className="text-night-accentLight font-semibold">Todos los tragos 500ml </span>
        también se pueden pedir en{' '}
        <span className="text-white font-semibold">1 Litro</span> al{' '}
        <span className="text-night-accentLight font-semibold">doble del precio</span>.
        Consultale al mozo.
      </p>
    </div>
  );
}

/* ── Empty state ────────────────────────────────────────── */
function EmptyState({ searchQuery }: { searchQuery: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center gap-4 py-20 px-6 text-center"
    >
      <SearchX className="text-zinc-700" size={48} />
      {searchQuery ? (
        <>
          <p className="text-zinc-400 font-semibold text-lg">Sin resultados</p>
          <p className="text-zinc-600 text-sm">
            No encontramos nada para{' '}
            <span className="text-night-accentLight">"{searchQuery}"</span>
          </p>
        </>
      ) : (
        <p className="text-zinc-600 text-sm">No hay productos disponibles en este momento.</p>
      )}
    </motion.div>
  );
}
