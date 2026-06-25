'use client';

import { useState, useMemo } from 'react';
import type { Product, ActiveCategory } from '@/lib/types';
import Header from './Header';
import SearchBar from './SearchBar';
import CategoryTabs from './CategoryTabs';
import SortFilterBar, { type SortFilterState } from './SortFilterBar';
import FeaturedSection from './FeaturedSection';
import ProductCatalog from './ProductCatalog';
import Footer from './Footer';

const DEFAULT_SORT_FILTER: SortFilterState = {
  sort: null,
  redeemable: false,
  alcoholFree: false,
};

interface MenuContentProps {
  initialProducts: Product[];
}

export default function MenuContent({ initialProducts }: MenuContentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>('all');
  const [sortFilter, setSortFilter] = useState<SortFilterState>(DEFAULT_SORT_FILTER);

  // Reset sort/filter when category changes
  function handleCategoryChange(cat: ActiveCategory) {
    setActiveCategory(cat);
    setSortFilter(DEFAULT_SORT_FILTER);
  }

  const featuredProducts = useMemo(
    () => initialProducts.filter((p) => p.featured),
    [initialProducts]
  );

  const visibleProducts = useMemo(() => {
    let result = initialProducts;

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description ?? '').toLowerCase().includes(q)
      );
    }

    // Redeemable filter
    if (sortFilter.redeemable) {
      result = result.filter((p) => p.isRedeemable === true);
    }

    // Alcohol-free filter
    if (sortFilter.alcoholFree) {
      result = result.filter((p) => (p.category as string) === 'alcohol-free');
    }

    // Sorting — clone before sorting to avoid mutating
    if (sortFilter.sort) {
      result = [...result];
      switch (sortFilter.sort) {
        case 'price_asc':
          result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
          break;
        case 'price_desc':
          result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
          break;
        case 'alpha_asc':
          result.sort((a, b) => a.name.localeCompare(b.name, 'es'));
          break;
        case 'alpha_desc':
          result.sort((a, b) => b.name.localeCompare(a.name, 'es'));
          break;
      }
    }

    return result;
  }, [initialProducts, searchQuery, activeCategory, sortFilter]);

  const isFiltered =
    !!searchQuery.trim() ||
    activeCategory !== 'all' ||
    !!sortFilter.sort ||
    sortFilter.redeemable ||
    sortFilter.alcoholFree;

  const showFeatured = !isFiltered && featuredProducts.length > 0;

  return (
    <div className="min-h-screen flex flex-col max-w-2xl mx-auto">
      <Header />

      {/* Sticky nav */}
      <div className="sticky top-0 z-20 backdrop-blur-md bg-night-bg/90 border-b border-night-border/50">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <CategoryTabs active={activeCategory} onChange={handleCategoryChange} />
        <SortFilterBar
          state={sortFilter}
          onChange={setSortFilter}
          activeCategory={activeCategory}
        />
      </div>

      <main className="flex-1">
        {showFeatured && (
          <div>
            <FeaturedSection products={featuredProducts} />
            <div className="mx-4 mb-6 h-px bg-gradient-to-r from-transparent via-night-border to-transparent" />
          </div>
        )}

        <ProductCatalog products={visibleProducts} searchQuery={searchQuery} />
      </main>

      <Footer />
    </div>
  );
}
