'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { CATEGORY_META, type ActiveCategory } from '@/lib/types';

interface CategoryTabsProps {
  active: ActiveCategory;
  onChange: (c: ActiveCategory) => void;
}

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const handleSelect = (id: ActiveCategory) => {
    onChange(id);
    // scroll selected chip into view
    const el = listRef.current?.querySelector(`[data-cat="${id}"]`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  return (
    <div className="px-4 pb-3">
      <div
        ref={listRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide"
        role="tablist"
        aria-label="Categorías"
      >
        {CATEGORY_META.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              data-cat={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleSelect(cat.id)}
              className={`
                relative flex-shrink-0 flex items-center gap-1.5
                px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-200 whitespace-nowrap
                ${isActive
                  ? 'text-white'
                  : 'text-zinc-500 hover:text-zinc-300 bg-night-card border border-night-border'
                }
              `}
            >
              {isActive && (
                <motion.span
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-night-accent to-night-accentLight"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
