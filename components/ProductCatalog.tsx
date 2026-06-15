'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SearchX } from 'lucide-react';
import type { Product, ProductCategory } from '@/lib/types';
import { CATEGORY_LABELS, CATEGORY_ORDER } from '@/lib/types';
import ProductCard from './ProductCard';

const CATEGORY_EMOJI: Record<ProductCategory, string> = {
  drink_500ml: '🥃',
  drink_1l: '🍹',
  bottle_combo: '🍾',
  promotion: '⚡',
};

interface ProductCatalogProps {
  products: Product[];
  searchQuery: string;
}

export default function ProductCatalog({ products, searchQuery }: ProductCatalogProps) {
  if (products.length === 0) {
    return <EmptyState searchQuery={searchQuery} />;
  }

  // Group by category, preserving CATEGORY_ORDER
  const grouped = CATEGORY_ORDER.reduce<Record<ProductCategory, Product[]>>(
    (acc, cat) => {
      const items = products.filter((p) => p.category === cat);
      if (items.length > 0) acc[cat] = items;
      return acc;
    },
    {} as Record<ProductCategory, Product[]>
  );

  const sections = Object.entries(grouped) as [ProductCategory, Product[]][];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={searchQuery}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col gap-8 px-4 pb-12"
      >
        {sections.map(([category, items]) => (
          <CategorySection key={category} category={category} items={items} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

function CategorySection({ category, items }: { category: ProductCategory; items: Product[] }) {
  const isWideLayout = category === 'bottle_combo' || category === 'promotion';

  return (
    <section>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl">{CATEGORY_EMOJI[category]}</span>
        <h2 className="font-display text-2xl text-white tracking-wide">
          {CATEGORY_LABELS[category].toUpperCase()}
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-night-border to-transparent" />
        <span className="text-zinc-600 text-xs font-medium">{items.length} opciones</span>
      </div>

      {isWideLayout ? (
        /* Single-column wide cards for combos & promos */
        <div className="flex flex-col gap-3">
          {items.map((product, i) => (
            <WideProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      ) : (
        /* 2-column grid for drinks */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}

/* ── Wide card (combos & promotions) ─────────────────── */
import Image from 'next/image';
import { GlassWater } from 'lucide-react';
import { BADGE_LABELS, formatPrice } from '@/lib/types';

const BADGE_STYLES: Record<string, string> = {
  mas_pedido: 'bg-night-accent text-white badge-glow',
  promo: 'bg-emerald-600/90 text-white',
  nuevo: 'bg-amber-500/90 text-black',
};

function WideProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
      className="group flex overflow-hidden rounded-2xl bg-night-card border border-night-border card-glow"
    >
      {/* Thumbnail */}
      <div className="relative w-28 sm:w-36 flex-shrink-0 bg-gradient-to-br from-zinc-900 to-night-card overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
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
        {/* Left edge accent */}
        <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-night-accent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-4 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-semibold text-sm leading-snug flex-1">
            {product.name}
          </h3>
          {product.badge && (
            <span
              className={`
                flex-shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase
                ${BADGE_STYLES[product.badge] ?? 'bg-zinc-700 text-white'}
              `}
            >
              {BADGE_LABELS[product.badge]}
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

/* ── Empty state ─────────────────────────────────────── */
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
