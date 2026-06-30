'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { GlassWater, X } from 'lucide-react';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/types';
import { normalizeImage } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
  featured?: boolean;
}

export default function ProductCard({ product, index = 0, featured = false }: ProductCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: Math.min(index, 8) * 0.04, ease: 'easeOut' }}
        onClick={() => setModalOpen(true)}
        className={`
          group relative flex flex-col overflow-hidden rounded-2xl cursor-pointer
          bg-night-card border card-glow active:scale-[0.97] transition-transform
          ${featured ? 'w-48 sm:w-52 flex-shrink-0' : 'w-full'}
          border-night-border
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
          <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2">
            {product.name}
          </h3>

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
      </motion.article>

      <AnimatePresence>
        {modalOpen && (
          <ProductModal product={product} onClose={() => setModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Modal (bottom sheet) ───────────────────────────────── */
function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const imgSrc = normalizeImage(product.image);

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Sheet */}
      <motion.div
        key="sheet"
        className="fixed bottom-0 inset-x-0 z-50 mx-auto max-w-2xl flex flex-col rounded-t-3xl overflow-hidden bg-night-card max-h-[88vh]"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-zinc-700" />
        </div>

        {/* Image */}
        {imgSrc ? (
          <div className="relative w-full flex-shrink-0 bg-zinc-950" style={{ aspectRatio: '4/3' }}>
            <Image src={imgSrc} alt={product.name} fill className="object-contain" sizes="672px" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-night-card to-transparent" />
          </div>
        ) : (
          <div className="h-36 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-night-accentDim via-night-card to-zinc-900">
            <GlassWater className="text-night-border" size={40} />
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 pt-4 pb-10">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {product.isRedeemable && (
              <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-black text-xs font-bold">
                🎟 Canjeable
              </span>
            )}
            {product.badge && (
              <span className="px-2.5 py-1 rounded-full bg-night-accent text-white text-xs font-bold badge-glow">
                Destacado
              </span>
            )}
          </div>

          <h2 className="text-white font-bold text-2xl leading-snug mb-2">
            {product.name}
          </h2>

          {product.description && (
            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
              {product.description}
            </p>
          )}

          {/* Prices */}
          <div className="flex gap-6 mt-3">
            <div>
              <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-semibold mb-1">
                Mercadopago
              </p>
              <p className="price-gradient font-display text-4xl leading-none">
                {formatPrice(product.price)}
              </p>
            </div>
            {product.cash != null && product.cash !== product.price && (
              <div>
                <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-semibold mb-1">
                  Efectivo
                </p>
                <p className="text-green-400 font-display text-4xl font-bold leading-none">
                  {formatPrice(product.cash)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </motion.div>
    </>,
    document.body
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
