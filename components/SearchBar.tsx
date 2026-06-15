'use client';

import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="px-4 py-3">
      <div className="relative flex items-center">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
          size={17}
        />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar tragos, combos..."
          className="
            w-full h-11 pl-10 pr-10
            bg-night-card border border-night-border rounded-xl
            text-white text-sm placeholder-zinc-600
            outline-none
            focus:border-night-accentLight focus:ring-1 focus:ring-night-accentLight/30
            transition-all duration-200
          "
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              onClick={() => onChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <X size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
