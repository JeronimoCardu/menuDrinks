'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { GlassWater, ChevronDown } from 'lucide-react';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/types';
import { normalizeImage } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
  featured?: boolean;
}

export default function ProductCard({ product, index = 0, featured = false }: ProductCardProps) {
  const [expanded, setExpanded] = useState(false);
  const hasDescription = !!product.description;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index, 8) * 0.04, ease: 'easeOut' }}
      onClick={() => hasDescription && setExpanded((v) => !v)}
      className={`
        group relative flex flex-col overflow-hidden rounded-2xl
        bg-night-card border card-glow
        ${expanded ? 'border-night-accentLight/50' : 'border-night-border'}
        ${featured ? 'w-48 sm:w-52 flex-shrink-0' : 'w-full'}
        ${hasDescription ? 'cursor-pointer' : ''}
      `}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-zinc-900 to-night-card overflow-hidden flex-shrink-0">
        {normalizeImage(product.image) ? (
          <Image
            src={normalizeImage(product.image)!}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <ImagePlaceholder name={product.name} />
        )}

        {product.badge && (
          <span className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-night-accent text-white badge-glow">
            Destacado
          </span>
        )}

        {product.isRedeemable && (
          <span className="absolute top-2 left-2 z-10 px-2 py-1 rounded-md text-[9px] font-bold tracking-wide uppercase bg-amber-400 text-black shadow-md">
            🎟 Canjeable
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night-card to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 p-3">
        <div className="flex items-start justify-between gap-1">
          <h3 className={`text-white font-semibold text-sm leading-tight ${expanded ? '' : 'line-clamp-2'}`}>
            {product.name}
          </h3>
          {hasDescription && (
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="flex-shrink-0 mt-0.5"
            >
              <ChevronDown size={14} className="text-zinc-600" />
            </motion.span>
          )}
        </div>

        {!expanded && hasDescription && (
          <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="mt-1 flex flex-col gap-0.5">
          <p className="price-gradient font-display text-2xl leading-none">
            {formatPrice(product.price)}
          </p>
          {product.cash != null && product.cash !== product.price && (
            <p className="text-green-400 text-sm font-semibold leading-none">
              {formatPrice(product.cash)}{' '}
              <span className="text-zinc-600 text-[10px] font-normal">efectivo</span>
            </p>
          )}
        </div>
      </div>

      {/* Expanded description */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 flex flex-col gap-2">
              <div className="h-px bg-gradient-to-r from-night-border to-transparent" />
              <p className="text-zinc-400 text-xs leading-relaxed">
                {product.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
