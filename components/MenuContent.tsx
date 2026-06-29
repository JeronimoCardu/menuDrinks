"use client";

import { useState, useMemo } from "react";
import type { Product, ActiveCategory } from "@/lib/types";
import { formatPrice } from "@/lib/types";
import Header from "./Header";
import SearchBar from "./SearchBar";
import CategoryTabs from "./CategoryTabs";
import SortFilterBar, { type SortFilterState } from "./SortFilterBar";
import FeaturedSection from "./FeaturedSection";
import ProductCatalog from "./ProductCatalog";
import Footer from "./Footer";

const DEFAULT_SORT_FILTER: SortFilterState = {
  sort: null,
  redeemable: false,
  alcoholFree: false,
};

interface MenuContentProps {
  initialProducts: Product[];
}

export default function MenuContent({ initialProducts }: MenuContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("all");
  const [sortFilter, setSortFilter] =
    useState<SortFilterState>(DEFAULT_SORT_FILTER);

  // Reset sort/filter when category changes
  function handleCategoryChange(cat: ActiveCategory) {
    setActiveCategory(cat);
    setSortFilter(DEFAULT_SORT_FILTER);
  }

  const pulseraProducts = useMemo(
    () => initialProducts.filter((p) => p.category === "pulsera"),
    [initialProducts],
  );

  const nonPulseraProducts = useMemo(
    () => initialProducts.filter((p) => p.category !== "pulsera"),
    [initialProducts],
  );

  const featuredProducts = useMemo(
    () => nonPulseraProducts.filter((p) => p.featured),
    [nonPulseraProducts],
  );

  const visibleProducts = useMemo(() => {
    let result = nonPulseraProducts;

    // Category filter
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q),
      );
    }

    // Redeemable filter
    if (sortFilter.redeemable) {
      result = result.filter((p) => p.isRedeemable === true);
    }

    // Alcohol-free filter
    if (sortFilter.alcoholFree) {
      result = result.filter((p) => (p.category as string) === "alcohol-free");
    }

    // Sorting — clone before sorting to avoid mutating
    if (sortFilter.sort) {
      result = [...result];
      switch (sortFilter.sort) {
        case "price_asc":
          result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
          break;
        case "price_desc":
          result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
          break;
        case "alpha_asc":
          result.sort((a, b) => a.name.localeCompare(b.name, "es"));
          break;
        case "alpha_desc":
          result.sort((a, b) => b.name.localeCompare(a.name, "es"));
          break;
      }
    }

    return result;
  }, [initialProducts, searchQuery, activeCategory, sortFilter]);

  const isFiltered =
    !!searchQuery.trim() ||
    activeCategory !== "all" ||
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

      <main className="flex-1 py-4">
        {showFeatured && (
          <div>
            <FeaturedSection products={featuredProducts} />
            <div className="mx-4 mb-6 h-px bg-gradient-to-r from-transparent via-night-border to-transparent" />
          </div>
        )}

        {pulseraProducts.length > 0 && (
          <PulseraBanner products={pulseraProducts} />
        )}

        <ProductCatalog products={visibleProducts} searchQuery={searchQuery} />
      </main>

      <Footer />
    </div>
  );
}

/* ── Pulsera banner ─────────────────────────────────────── */
function PulseraBanner({ products }: { products: Product[] }) {
  const x3 = products.find((p) => p.name.toLowerCase().includes("x3"));
  const x5 = products.find((p) => p.name.toLowerCase().includes("x5"));
  const items = [x3, x5].filter(Boolean) as Product[];
  if (items.length === 0) return null;

  return (
    <div className="mx-4 mt-1 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-950/40 to-night-card overflow-hidden">
      <div className="px-4 py-3 flex items-center gap-4">
        <span className="text-2xl select-none">💎</span>
        <div className="flex-1 min-w-0">
          <p className="text-amber-400/70 text-[16px] uppercase tracking-widest font-bold mb-2">
            Pulseras
          </p>
          <div className="flex flex-wrap gap-5">
            {items.map((p) => (
              <div key={p.id} className="flex flex-col gap-0.5">
                <span className="text-zinc-500 text-[10px] uppercase tracking-wide">
                  {p.name}
                </span>
                <span className="text-white font-bold text-xl tracking-wider font-display">
                  {formatPrice(p.price)}
                </span>
                {p.cash != null && p.cash !== p.price && (
                  <span className="text-green-400 text-xs font-semibold">
                    {formatPrice(p.cash)}{" "}
                    <span className="text-zinc-600 font-normal">efectivo</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
