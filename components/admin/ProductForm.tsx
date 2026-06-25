'use client';

import { useState, useTransition, useRef } from 'react';
import { X, Upload, ImageOff, Loader2 } from 'lucide-react';
import { createProduct, updateProduct, type ProductPayload } from '@/app/admin/actions';
import { createBrowserClient } from '@/lib/supabase';
import { formatPrice } from '@/lib/types';

const STORAGE_BUCKET = 'product-images';

const CATEGORIES = [
  { value: 'drink_500ml', label: 'Tragos 500ml' },
  { value: 'drink_1l', label: 'Tragos 1L' },
  { value: 'bottle_combo', label: 'Combos de Botellas' },
  { value: 'promotion', label: 'Promociones' },
  { value: 'alcohol-free', label: 'Sin Alcohol' },
];

type Mode = 'create' | 'edit';

interface ProductFormProps {
  mode: Mode;
  initialData?: Partial<ProductPayload> & { id?: string };
  onClose: () => void;
  onSuccess: () => void;
}

const EMPTY: ProductPayload = {
  name: '',
  description: '',
  price: 0,
  cash: null,
  image: '',
  category: 'drink_500ml',
  badge: false,
  featured: false,
  active: true,
  display_order: 0,
  isRedeemable: false,
};

async function uploadToStorage(file: File): Promise<string> {
  const supabase = createBrowserClient();
  const ext = file.name.split('.').pop() ?? 'jpg';
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filename, file, { cacheControl: '3600', upsert: false });

  if (error) throw new Error(error.message);

  const { data: urlData } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

export default function ProductForm({ mode, initialData, onClose, onSuccess }: ProductFormProps) {
  const [form, setForm] = useState<ProductPayload>({ ...EMPTY, ...initialData });
  const [error, setError] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof ProductPayload>(key: K, value: ProductPayload[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type and size (max 5MB)
    if (!file.type.startsWith('image/')) {
      setUploadError('Solo se permiten imágenes.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('La imagen no puede superar 5MB.');
      return;
    }

    setUploadError('');
    setIsUploading(true);
    try {
      const url = await uploadToStorage(file);
      set('image', url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al subir la imagen';
      setUploadError(msg);
    } finally {
      setIsUploading(false);
      // Reset input so same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    startTransition(async () => {
      const result =
        mode === 'create'
          ? await createProduct(form)
          : await updateProduct(initialData!.id!, form);

      if (result?.error) {
        setError(result.error);
      } else {
        onSuccess();
        onClose();
      }
    });
  }

  const isBusy = isPending || isUploading;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative ml-auto w-full max-w-md h-full bg-night-card border-l border-night-border flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-night-border flex-shrink-0">
          <h2 className="font-display text-2xl text-white tracking-wide">
            {mode === 'create' ? 'NUEVO PRODUCTO' : 'EDITAR PRODUCTO'}
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">

          {/* ── Image uploader ─────────────────────────────── */}
          <Field label="Imagen del producto">
            <div className="flex flex-col gap-2">
              {/* Preview */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-night-bg border border-night-border flex items-center justify-center">
                {isUploading ? (
                  <div className="flex flex-col items-center gap-2 text-night-accentLight">
                    <Loader2 size={28} className="animate-spin" />
                    <span className="text-xs">Subiendo imagen...</span>
                  </div>
                ) : form.image ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={form.image.startsWith('http') ? form.image : form.image.startsWith('/') ? form.image : `/${form.image}`}
                      alt="preview"
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => set('image', '')}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-zinc-700">
                    <ImageOff size={28} />
                    <span className="text-xs">Sin imagen</span>
                  </div>
                )}
              </div>

              {/* Upload button */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center justify-center gap-2 h-10 rounded-xl border border-night-border text-zinc-400 hover:text-white hover:border-night-accentLight text-sm transition-colors disabled:opacity-40"
              >
                <Upload size={15} />
                {form.image ? 'Cambiar imagen' : 'Subir imagen'}
              </button>

              {uploadError && (
                <p className="text-red-400 text-xs">{uploadError}</p>
              )}

              {/* URL manual fallback */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-night-border" />
                <span className="text-zinc-700 text-[10px] uppercase tracking-wide">o ingresá una URL</span>
                <div className="flex-1 h-px bg-night-border" />
              </div>
              <input
                value={form.image ?? ''}
                onChange={(e) => set('image', e.target.value)}
                className={INPUT}
                placeholder="https://... o nombre-archivo.png"
              />
            </div>
          </Field>

          {/* ── Rest of fields ─────────────────────────────── */}
          <Field label="Nombre *">
            <input
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              required
              className={INPUT}
              placeholder="Fernet con Coca"
            />
          </Field>

          <Field label="Descripción">
            <textarea
              value={form.description ?? ''}
              onChange={(e) => set('description', e.target.value)}
              rows={2}
              className={`${INPUT} resize-none`}
              placeholder="Descripción breve del producto"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Precio *">
              <input
                type="number"
                value={form.price}
                onChange={(e) => set('price', Number(e.target.value))}
                required
                min={0}
                className={INPUT}
                placeholder="0"
              />
            </Field>
            <Field label="Precio efectivo">
              <input
                type="number"
                value={form.cash ?? ''}
                onChange={(e) => set('cash', e.target.value ? Number(e.target.value) : null)}
                min={0}
                className={INPUT}
                placeholder="0"
              />
            </Field>
          </div>

          <Field label="Categoría *">
            <select
              value={form.category}
              onChange={(e) => set('category', e.target.value)}
              className={INPUT}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Orden de visualización">
            <input
              type="number"
              value={form.display_order}
              onChange={(e) => set('display_order', Number(e.target.value))}
              className={INPUT}
              placeholder="0"
            />
          </Field>

          {/* Toggles */}
          <div className="grid grid-cols-2 gap-3">
            <Toggle label="Activo" value={form.active} onChange={(v) => set('active', v)} />
            <Toggle label="Destacado" value={form.featured} onChange={(v) => set('featured', v)} />
            <Toggle label="Badge" value={form.badge} onChange={(v) => set('badge', v)} />
            <Toggle label="Canjeable" value={form.isRedeemable} onChange={(v) => set('isRedeemable', v)} />
          </div>

          {/* Price preview */}
          {form.price > 0 && (
            <div className="rounded-xl bg-night-bg border border-night-border p-3 text-center">
              <span className="text-zinc-600 text-xs">Vista previa: </span>
              <span className="price-gradient font-display text-xl">{formatPrice(form.price)}</span>
            </div>
          )}

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* Actions */}
          <div className="flex gap-3 pt-2 pb-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-xl border border-night-border text-zinc-400 hover:text-white text-sm font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isBusy}
              className="flex-1 h-11 rounded-xl bg-night-accent hover:bg-night-accentLight text-white text-sm font-semibold transition-colors disabled:opacity-50"
            >
              {isPending ? 'Guardando...' : mode === 'create' ? 'Crear producto' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── Helpers ──────────────────────────────────────────────── */

const INPUT =
  'w-full h-10 px-3 rounded-xl bg-night-bg border border-night-border text-white text-sm outline-none focus:border-night-accentLight transition-colors';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-zinc-500 text-xs font-medium uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

function Toggle({
  label, value, onChange,
}: {
  label: string; value: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
        value
          ? 'bg-night-accentDim border-night-accentLight/50 text-night-accentLight'
          : 'bg-night-bg border-night-border text-zinc-600'
      }`}
    >
      <span className="text-xs">{label}</span>
      <span className={`w-8 h-4 rounded-full transition-colors flex items-center ${value ? 'bg-night-accent' : 'bg-zinc-700'}`}>
        <span className={`w-3 h-3 rounded-full bg-white transition-transform mx-0.5 ${value ? 'translate-x-4' : 'translate-x-0'}`} />
      </span>
    </button>
  );
}
