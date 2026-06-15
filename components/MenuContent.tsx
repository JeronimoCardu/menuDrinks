'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product, ActiveCategory } from '@/lib/types';
import { CATEGORY_ORDER } from '@/lib/types';
import Header from './Header';
import SearchBar from './SearchBar';
import CategoryTabs from './CategoryTabs';
import FeaturedSection from './FeaturedSection';
import ProductCatalog from './ProductCatalog';
import Footer from './Footer';

interface MenuContentProps {
  initialProducts: Product[];
}

export default function MenuContent({ initialProducts }: MenuContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>('all');

  const featuredProducts = useMemo(
    () => initialProducts.filter((p) => p.featured),
    [initialProducts]
  );

  const visibleProducts = useMemo(() => {
    let result = initialProducts;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description ?? '').toLowerCase().includes(q)
      );
    }

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    return result;
  }, [initialProducts, searchQuery, activeCategory]);

  // Show featured section only when browsing everything unfiltered
  const showFeatured = !searchQuery.trim() && activeCategory === 'all';

  // When filtering by category, only show catalog (no featured row)
  const catalogProducts = useMemo(() => {
    if (showFeatured) return visibleProducts;
    return visibleProducts;
  }, [visibleProducts, showFeatured]);

  return (
    <div className="min-h-screen flex flex-col max-w-2xl mx-auto">
      {/* ── Static header ─────────────────────────────── */}
      <Header />

      {/* ── Sticky search + tabs ──────────────────────── */}
      <div className="sticky top-0 z-20 backdrop-blur-md bg-night-bg/90 border-b border-night-border/50">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
      </div>

      {/* ── Main content ──────────────────────────────── */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {showFeatured && featuredProducts.length > 0 && (
            <motion.div
              key="featured"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <FeaturedSection products={featuredProducts} />
              {/* Divider between featured and catalog */}
              <div className="mx-4 mb-6 h-px bg-gradient-to-r from-transparent via-night-border to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        <ProductCatalog products={catalogProducts} searchQuery={searchQuery} />
      </main>

      {/* ── Footer ────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
