'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Product } from '@/lib/types';
import ProductCard from './ProductCard';

interface FeaturedSectionProps {
  products: Product[];
}

export default function FeaturedSection({ products }: FeaturedSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-6">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="px-4 flex items-center gap-3 mb-4"
      >
        <div className="flex items-center gap-2">
          <Star className="text-night-accentLight fill-night-accentLight" size={16} />
          <h2 className="font-display text-2xl text-white tracking-wide">MÁS PEDIDOS</h2>
          <Star className="text-night-accentLight fill-night-accentLight" size={16} />
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-night-border to-transparent" />
      </motion.div>

      {/* Horizontal scroll carousel */}
      <div className="pl-4 pr-2 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 w-max pb-2">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} featured />
          ))}
        </div>
      </div>
    </section>
  );
}
