'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { GlassWater } from 'lucide-react';
import type { Product } from '@/lib/types';
import { BADGE_LABELS, formatPrice } from '@/lib/types';

const BADGE_STYLES: Record<string, string> = {
  mas_pedido: 'bg-night-accent text-white badge-glow',
  promo: 'bg-emerald-600/90 text-white',
  nuevo: 'bg-amber-500/90 text-black',
};

interface ProductCardProps {
  product: Product;
  index?: number;
  featured?: boolean;
}

export default function ProductCard({ product, index = 0, featured = false }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
      className={`
        group relative flex flex-col overflow-hidden rounded-2xl
        bg-night-card border border-night-border card-glow
        ${featured ? 'w-48 sm:w-52 flex-shrink-0' : 'w-full'}
      `}
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-zinc-900 to-night-card overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <ImagePlaceholder name={product.name} />
        )}

        {/* Badge */}
        {product.badge && (
          <span
            className={`
              absolute top-2 right-2 z-10
              px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase
              ${BADGE_STYLES[product.badge] ?? 'bg-zinc-700 text-white'}
            `}
          >
            {BADGE_LABELS[product.badge]}
          </span>
        )}

        {/* Gradient overlay for readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night-card to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 p-3">
        <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">
            {product.description}
          </p>
        )}

        <p className="price-gradient font-display text-2xl mt-1 leading-none">
          {formatPrice(product.price)}
        </p>
      </div>
    </motion.article>
  );
}

function ImagePlaceholder({ name }: { name: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-night-accentDim via-night-card to-zinc-900">
      <GlassWater className="text-night-border" size={28} />
      <span className="text-zinc-700 text-[10px] font-medium text-center px-2 line-clamp-2">
        {name}
      </span>
    </div>
  );
}
