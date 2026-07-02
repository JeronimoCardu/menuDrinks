'use client';

import { useState, useTransition, useMemo } from 'react';
import { Plus, LogOut, Pencil, Trash2, Search, LayoutGrid, LayoutList, FileText } from 'lucide-react';
import { logoutAction, deleteProduct, toggleField } from '@/app/admin/actions';
import { formatPrice, CATEGORY_LABELS } from '@/lib/types';
import { normalizeImage } from '@/lib/utils';
import type { Product } from '@/lib/types';
import ProductForm from './ProductForm';

const CATEGORY_COLOR: Record<string, string> = {
  drink_500ml: 'bg-violet-900/50 text-violet-300',
  drink_1l: 'bg-blue-900/50 text-blue-300',
  bottle_combo: 'bg-amber-900/50 text-amber-300',
  promotion: 'bg-emerald-900/50 text-emerald-300',
  'alcohol-free': 'bg-teal-900/50 text-teal-300',
  pulsera: 'bg-amber-900/50 text-amber-200',
};

function catLabel(cat: string): string {
  return (CATEGORY_LABELS as Record<string, string>)[cat] ?? cat;
}

type FormMode = { type: 'create' } | { type: 'edit'; product: Product } | null;
type ViewMode = 'cards' | 'table';

interface AdminShellProps {
  initialProducts: Product[];
}

function normalizeProductForForm(p: Product) {
  return {
    id: p.id,
    name: p.name,
    description: p.description ?? '',
    price: p.price,
    cash: p.cash ?? null,
    image: p.image ?? '',
    category: p.category as string,
    badge: p.badge ?? false,
    featured: p.featured ?? false,
    active: p.active ?? true,
    display_order: p.display_order ?? 0,
    isRedeemable: p.isRedeemable ?? false,
  };
}

export default function AdminShell({ initialProducts }: AdminShellProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description ?? '').toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [products, search]);

  const stats = useMemo(() => ({
    total: products.length,
    active: products.filter((p) => p.active !== false).length,
    featured: products.filter((p) => p.featured).length,
  }), [products]);

  function handleDelete(id: string, name: string) {
    if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return;
    startTransition(async () => {
      const result = await deleteProduct(id);
      if (result?.error) {
        alert('Error al eliminar: ' + result.error);
      } else {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    });
  }

  function handleToggle(
    id: string,
    field: 'active' | 'featured' | 'badge' | 'isRedeemable',
    currentValue: boolean | null
  ) {
    const newValue = !currentValue;
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: newValue } : p))
    );
    startTransition(async () => {
      const result = await toggleField(id, field, newValue);
      if (result?.error) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, [field]: currentValue } : p))
        );
        alert('Error: ' + result.error);
      }
    });
  }

  function handleLogout() {
    startTransition(() => logoutAction());
  }

  return (
    <div className="min-h-screen bg-night-bg text-white">

      {/* ── Top bar ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-night-bg/95 backdrop-blur-md border-b border-night-border">
        <div className="px-4 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-display text-xl sm:text-2xl tracking-wide text-white shrink-0">AEROPUERTO</span>
            <span className="text-zinc-700 text-xs hidden md:block">Panel de gestión</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-4 text-xs text-zinc-500 mr-1">
              <span><b className="text-white">{stats.total}</b> productos</span>
              <span><b className="text-emerald-400">{stats.active}</b> activos</span>
              <span><b className="text-night-accentLight">{stats.featured}</b> destacados</span>
            </div>

            <a
              href="/ocr-editor/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 h-9 px-3 rounded-xl border border-night-border text-zinc-400 hover:text-white text-xs font-medium transition-colors shrink-0"
            >
              <FileText size={15} />
              <span className="hidden sm:inline">Lista de Precios</span>
            </a>

            <button
              onClick={() => setFormMode({ type: 'create' })}
              className="flex items-center gap-1.5 h-9 px-3 rounded-xl bg-night-accent hover:bg-night-accentLight text-white text-xs font-semibold transition-colors shrink-0"
            >
              <Plus size={15} />
              <span className="hidden sm:inline">Nuevo producto</span>
              <span className="sm:hidden">Nuevo</span>
            </button>

            <button
              onClick={handleLogout}
              title="Cerrar sesión"
              className="flex items-center justify-center h-9 w-9 rounded-xl border border-night-border text-zinc-500 hover:text-white transition-colors shrink-0"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>

        {/* Stats row — mobile only */}
        <div className="md:hidden flex items-center gap-4 px-4 pb-2.5 text-xs text-zinc-500">
          <span><b className="text-white">{stats.total}</b> productos</span>
          <span><b className="text-emerald-400">{stats.active}</b> activos</span>
          <span><b className="text-night-accentLight">{stats.featured}</b> destacados</span>
        </div>
      </header>

      {/* ── Toolbar ─────────────────────────────────────────── */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" size={15} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full h-10 pl-9 pr-4 rounded-xl bg-night-card border border-night-border text-sm text-white placeholder-zinc-600 outline-none focus:border-night-accentLight transition-colors"
          />
        </div>

        <div className="flex rounded-xl border border-night-border overflow-hidden shrink-0">
          <button
            onClick={() => setViewMode('cards')}
            title="Vista tarjetas"
            className={`h-10 w-10 flex items-center justify-center transition-colors ${viewMode === 'cards' ? 'bg-night-accent text-white' : 'text-zinc-500 hover:text-white'}`}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setViewMode('table')}
            title="Vista lista"
            className={`h-10 w-10 flex items-center justify-center transition-colors ${viewMode === 'table' ? 'bg-night-accent text-white' : 'text-zinc-500 hover:text-white'}`}
          >
            <LayoutList size={16} />
          </button>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────── */}
      <div className="px-4 pb-16">
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-zinc-600 text-sm">
            {search ? `Sin resultados para "${search}"` : 'No hay productos'}
          </div>
        ) : viewMode === 'cards' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtered.map((p) => (
              <AdminProductCard
                key={p.id}
                product={p}
                onEdit={() => setFormMode({ type: 'edit', product: p })}
                onDelete={() => handleDelete(p.id, p.name)}
                onToggle={handleToggle}
                isPending={isPending}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-night-border overflow-hidden">
            {/* Table header — desktop only */}
            <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto_auto_auto_auto] gap-3 items-center px-4 py-2.5 bg-night-card border-b border-night-border text-zinc-600 text-[11px] font-medium uppercase tracking-wider">
              <span>Producto</span>
              <span>Precio</span>
              <span className="text-center w-10">Act.</span>
              <span className="text-center w-10">Dest.</span>
              <span className="text-center w-10">Badge</span>
              <span className="text-center w-10">Canj.</span>
              <span className="text-right">Acciones</span>
            </div>
            {filtered.map((p) => (
              <AdminTableRow
                key={p.id}
                product={p}
                onEdit={() => setFormMode({ type: 'edit', product: p })}
                onDelete={() => handleDelete(p.id, p.name)}
                onToggle={handleToggle}
                isPending={isPending}
              />
            ))}
          </div>
        )}

        <p className="text-zinc-700 text-xs text-center mt-5">
          {filtered.length} de {products.length} productos
        </p>
      </div>

      {/* ── Form slide-over ──────────────────────────────────── */}
      {formMode && (
        <ProductForm
          mode={formMode.type}
          initialData={formMode.type === 'edit' ? normalizeProductForForm(formMode.product) : undefined}
          onClose={() => setFormMode(null)}
          onSuccess={(saved) => {
            if (formMode.type === 'create') {
              const product = saved as unknown as Product;
              if (product?.id) {
                setProducts((prev) => [...prev, product]);
              }
            } else {
              const updated = {
                ...formMode.product,
                ...(saved as unknown as Partial<Product>),
              } as Product;
              setProducts((prev) =>
                prev.map((p) => (p.id === updated.id ? updated : p))
              );
            }
            setFormMode(null);
          }}
        />
      )}
    </div>
  );
}

/* ── Card ───────────────────────────────────────────────── */
function AdminProductCard({
  product: p, onEdit, onDelete, onToggle, isPending,
}: {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: (id: string, field: 'active' | 'featured' | 'badge' | 'isRedeemable', val: boolean | null) => void;
  isPending: boolean;
}) {
  const img = normalizeImage(p.image);
  const isInactive = p.active === false;

  return (
    <div className={`rounded-2xl border overflow-hidden bg-night-card transition-opacity ${isInactive ? 'border-night-border/40 opacity-55' : 'border-night-border'}`}>
      {/* Image */}
      <div className="relative h-32 bg-gradient-to-br from-zinc-900 to-night-bg overflow-hidden">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt={p.name} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl select-none">🍸</div>
        )}
        <span className={`absolute bottom-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLOR[p.category] ?? 'bg-zinc-800 text-zinc-400'}`}>
          {catLabel(p.category)}
        </span>
        <div className="absolute top-2 right-2 flex gap-1.5">
          <button onClick={onEdit} className="w-7 h-7 rounded-lg bg-black/60 backdrop-blur-sm text-zinc-300 hover:text-white flex items-center justify-center transition-colors">
            <Pencil size={13} />
          </button>
          <button onClick={onDelete} disabled={isPending} className="w-7 h-7 rounded-lg bg-black/60 backdrop-blur-sm text-zinc-400 hover:text-red-400 flex items-center justify-center transition-colors">
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-3 flex flex-col gap-2.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className={`text-sm font-semibold leading-snug flex-1 ${isInactive ? 'line-through text-zinc-500' : 'text-white'}`}>
            {p.name}
          </h3>
          <span className="price-gradient font-display text-xl leading-none shrink-0">
            {formatPrice(p.price)}
          </span>
        </div>

        {/* Toggles */}
        <div className="grid grid-cols-2 gap-1.5">
          <MiniToggle label="Activo"  value={p.active !== false} color="emerald" onToggle={() => onToggle(p.id, 'active', p.active)}       disabled={isPending} />
          <MiniToggle label="Dest."   value={!!p.featured}       color="purple"  onToggle={() => onToggle(p.id, 'featured', p.featured)}    disabled={isPending} />
          <MiniToggle label="Badge"   value={!!p.badge}          color="amber"   onToggle={() => onToggle(p.id, 'badge', p.badge)}          disabled={isPending} />
          <MiniToggle label="Canj."   value={!!p.isRedeemable}   color="sky"     onToggle={() => onToggle(p.id, 'isRedeemable', p.isRedeemable)} disabled={isPending} />
        </div>
      </div>
    </div>
  );
}

/* ── Table row ──────────────────────────────────────────── */
function AdminTableRow({
  product: p, onEdit, onDelete, onToggle, isPending,
}: {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: (id: string, field: 'active' | 'featured' | 'badge' | 'isRedeemable', val: boolean | null) => void;
  isPending: boolean;
}) {
  const isInactive = p.active === false;

  return (
    <div className="border-b border-night-border/50 last:border-0 hover:bg-night-cardHover transition-colors">
      {/* Mobile version */}
      <div className="sm:hidden flex items-center gap-3 px-3 py-3">
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium truncate ${isInactive ? 'line-through text-zinc-600' : 'text-white'}`}>{p.name}</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${CATEGORY_COLOR[p.category] ?? 'bg-zinc-800 text-zinc-400'}`}>
              {catLabel(p.category)}
            </span>
            <span className="price-gradient font-display text-base leading-none">{formatPrice(p.price)}</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            <MiniToggle label="Activo" value={p.active !== false} color="emerald" onToggle={() => onToggle(p.id, 'active', p.active)}           disabled={isPending} />
            <MiniToggle label="Dest."  value={!!p.featured}       color="purple"  onToggle={() => onToggle(p.id, 'featured', p.featured)}       disabled={isPending} />
            <MiniToggle label="Badge"  value={!!p.badge}          color="amber"   onToggle={() => onToggle(p.id, 'badge', p.badge)}             disabled={isPending} />
            <MiniToggle label="Canj."  value={!!p.isRedeemable}   color="sky"     onToggle={() => onToggle(p.id, 'isRedeemable', p.isRedeemable)} disabled={isPending} />
          </div>
        </div>
        <div className="flex gap-1 shrink-0">
          <button onClick={onEdit} className="p-2 rounded-xl text-zinc-500 hover:text-white hover:bg-night-card transition-colors"><Pencil size={15} /></button>
          <button onClick={onDelete} disabled={isPending} className="p-2 rounded-xl text-zinc-600 hover:text-red-400 hover:bg-red-900/20 transition-colors"><Trash2 size={15} /></button>
        </div>
      </div>

      {/* Desktop version */}
      <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto_auto_auto_auto] gap-3 items-center px-4 py-3">
        <div className="min-w-0">
          <p className={`text-sm font-medium truncate ${isInactive ? 'line-through text-zinc-600' : 'text-white'}`}>{p.name}</p>
          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${CATEGORY_COLOR[p.category] ?? 'bg-zinc-800 text-zinc-400'}`}>
            {catLabel(p.category)}
          </span>
        </div>
        <span className="price-gradient font-display text-lg leading-none">{formatPrice(p.price)}</span>
        <SlimToggle value={p.active !== false} onToggle={() => onToggle(p.id, 'active', p.active)} activeClass="bg-emerald-500" disabled={isPending} />
        <SlimToggle value={!!p.featured} onToggle={() => onToggle(p.id, 'featured', p.featured)} activeClass="bg-night-accent" disabled={isPending} />
        <SlimToggle value={!!p.badge} onToggle={() => onToggle(p.id, 'badge', p.badge)} activeClass="bg-amber-500" disabled={isPending} />
        <SlimToggle value={!!p.isRedeemable} onToggle={() => onToggle(p.id, 'isRedeemable', p.isRedeemable)} activeClass="bg-sky-500" disabled={isPending} />
        <div className="flex items-center gap-1 justify-end">
          <button onClick={onEdit} className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-night-card transition-colors"><Pencil size={14} /></button>
          <button onClick={onDelete} disabled={isPending} className="p-1.5 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-900/20 transition-colors"><Trash2 size={14} /></button>
        </div>
      </div>
    </div>
  );
}

/* ── Slim toggle (table) ────────────────────────────────── */
function SlimToggle({ value, onToggle, activeClass, disabled }: { value: boolean; onToggle: () => void; activeClass: string; disabled: boolean }) {
  return (
    <button onClick={onToggle} disabled={disabled} className="flex justify-center w-10">
      <span className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${value ? activeClass : 'bg-zinc-700'}`}>
        <span className={`absolute top-1 w-3 h-3 rounded-full bg-white shadow transition-all duration-200 ${value ? 'left-5' : 'left-1'}`} />
      </span>
    </button>
  );
}

/* ── Mini toggle (card/mobile) ──────────────────────────── */
const COLOR_MAP: Record<string, string> = {
  emerald: 'bg-emerald-700 border-emerald-600 text-emerald-200',
  purple:  'bg-night-accentDim border-night-accentLight/50 text-night-accentLight',
  amber:   'bg-amber-900/60 border-amber-600/50 text-amber-300',
  sky:     'bg-sky-900/60 border-sky-600/50 text-sky-300',
};

function MiniToggle({ label, value, color, onToggle, disabled }: { label: string; value: boolean; color: string; onToggle: () => void; disabled: boolean }) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`px-2 py-1.5 rounded-lg text-[10px] font-medium transition-all border flex flex-col items-center gap-0.5 ${
        value ? COLOR_MAP[color] ?? 'bg-night-accent border-transparent text-white' : 'border-night-border text-zinc-600 bg-night-bg'
      }`}
    >
      <span className={`w-6 h-3 rounded-full relative transition-colors ${value ? 'bg-white/25' : 'bg-zinc-700'}`}>
        <span className={`absolute top-0.5 w-2 h-2 rounded-full bg-white transition-all duration-150 ${value ? 'left-3.5' : 'left-0.5'}`} />
      </span>
      <span>{label}</span>
    </button>
  );
}
