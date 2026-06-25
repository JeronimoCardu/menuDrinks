'use client';

import { motion } from 'framer-motion';
import type { ActiveCategory } from '@/lib/types';

export type SortOption = 'price_asc' | 'price_desc' | 'alpha_asc' | 'alpha_desc' | null;

export interface SortFilterState {
  sort: SortOption;
  redeemable: boolean;
  alcoholFree: boolean;
}

interface SortFilterBarProps {
  state: SortFilterState;
  onChange: (next: SortFilterState) => void;
  activeCategory: ActiveCategory;
}

// Which categories can have alcohol-free products
const DRINK_CATEGORIES: ActiveCategory[] = ['all', 'drink_500ml', 'drink_1l'];

export default function SortFilterBar({ state, onChange, activeCategory }: SortFilterBarProps) {
  const showAlcoholFree = DRINK_CATEGORIES.includes(activeCategory);

  function cyclePrice() {
    const next: SortOption =
      state.sort === 'price_asc' ? 'price_desc' :
      state.sort === 'price_desc' ? null :
      'price_asc';
    onChange({ ...state, sort: next });
  }

  function cycleAlpha() {
    const next: SortOption =
      state.sort === 'alpha_asc' ? 'alpha_desc' :
      state.sort === 'alpha_desc' ? null :
      'alpha_asc';
    onChange({ ...state, sort: next });
  }

  const priceLabel =
    state.sort === 'price_asc' ? 'Precio ↑' :
    state.sort === 'price_desc' ? 'Precio ↓' :
    'Precio';

  const alphaLabel =
    state.sort === 'alpha_asc' ? 'A → Z' :
    state.sort === 'alpha_desc' ? 'Z → A' :
    'A-Z';

  const priceActive = state.sort === 'price_asc' || state.sort === 'price_desc';
  const alphaActive = state.sort === 'alpha_asc' || state.sort === 'alpha_desc';

  const anyActive = priceActive || alphaActive || state.redeemable || state.alcoholFree;

  return (
    <div className="px-4 pb-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
      {/* Price sort */}
      <Chip
        label={priceLabel}
        active={priceActive}
        onClick={cyclePrice}
        emoji="💰"
      />

      {/* Alpha sort */}
      <Chip
        label={alphaLabel}
        active={alphaActive}
        onClick={cycleAlpha}
        emoji="🔤"
      />

      {/* Redeemable filter */}
      <Chip
        label="Canjeables"
        active={state.redeemable}
        onClick={() => onChange({ ...state, redeemable: !state.redeemable })}
        emoji="🎟️"
      />

      {/* Alcohol-free filter — only for drink categories */}
      {showAlcoholFree && (
        <Chip
          label="Sin alcohol"
          active={state.alcoholFree}
          onClick={() => onChange({ ...state, alcoholFree: !state.alcoholFree })}
          emoji="🧃"
        />
      )}

      {/* Clear all */}
      {anyActive && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => onChange({ sort: null, redeemable: false, alcoholFree: false })}
          className="flex-shrink-0 text-zinc-600 hover:text-zinc-400 text-xs underline underline-offset-2 transition-colors ml-1"
        >
          Limpiar
        </motion.button>
      )}
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
  emoji,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  emoji: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex-shrink-0 flex items-center gap-1.5
        px-3 py-1.5 rounded-full text-xs font-medium
        whitespace-nowrap transition-all duration-200
        ${active
          ? 'bg-night-accent text-white'
          : 'bg-night-card border border-night-border text-zinc-500 hover:text-zinc-300'
        }
      `}
    >
      <span>{emoji}</span>
      <span>{label}</span>
    </button>
  );
}
