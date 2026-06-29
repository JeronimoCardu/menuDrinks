'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Printer, ArrowLeft } from 'lucide-react';
import type { Product } from '@/lib/types';

// Categories to include and their display order / labels
const PRINT_CATEGORIES: { key: string; label: string }[] = [
  { key: 'alcohol-free', label: 'SIN ALCOHOL' },
  { key: 'drink_500ml',  label: 'TRAGOS 500ml' },
  { key: 'bottle_combo', label: 'CHAMPAGNE Y BOTELLAS' },
];

function fmt(n: number | null | undefined): string {
  if (n == null || n === 0) return '';
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

interface Section {
  label: string;
  items: Product[];
}

interface Props {
  products: Product[];
}

export default function PrintPreviewContent({ products }: Props) {
  const { leftSections, rightSections, pulseraLine } = useMemo(() => {
    const active = products.filter((p) => p.active !== false);

    // Pulsera products: any active product with "pulsera" in the name
    const pulseras = active
      .filter((p) => p.name.toLowerCase().includes('pulsera'))
      .sort((a, b) => a.price - b.price);

    const pulseraLine =
      pulseras.length > 0
        ? pulseras.map((p) => `${p.name.toUpperCase()} ${fmt(p.price)}`).join(' / ')
        : null;

    const sections: Section[] = PRINT_CATEGORIES.map(({ key, label }) => ({
      label,
      items: active
        .filter(
          (p) =>
            (p.category as string) === key &&
            !p.name.toLowerCase().includes('pulsera')
        )
        .sort((a, b) => (a.display_order ?? 999) - (b.display_order ?? 999)),
    })).filter((s) => s.items.length > 0);

    // Split sections roughly in half (by product count) for the two columns
    let leftCount = 0;
    let splitIdx = 0;
    const total = sections.reduce((s, c) => s + c.items.length, 0);
    for (let i = 0; i < sections.length; i++) {
      leftCount += sections[i].items.length;
      splitIdx = i + 1;
      if (leftCount >= total / 2) break;
    }

    const leftSections  = sections.slice(0, splitIdx);
    const rightSections = sections.slice(splitIdx);

    return { leftSections, rightSections, pulseraLine };
  }, [products]);

  const dateStr = new Date().toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  function handlePrint() {
    const prev = document.title;
    document.title = `lista-precio-aero-${new Date().toISOString().slice(0, 10)}`;
    window.print();
    document.title = prev;
  }

  return (
    <>
      {/* ── Screen toolbar (hidden on print) ────────────────── */}
      <div
        className="print:hidden sticky top-0 z-10 flex items-center justify-between gap-4 bg-night-bg border-b border-night-border px-5 py-3"
      >
        <Link
          href="/admin"
          className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm transition-colors"
        >
          <ArrowLeft size={16} />
          Volver al admin
        </Link>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 h-9 px-4 rounded-xl bg-night-accent hover:bg-night-accentLight text-white text-sm font-semibold transition-colors"
        >
          <Printer size={16} />
          Imprimir / Guardar PDF
        </button>
      </div>

      {/* ── Screen preview wrapper ───────────────────────────── */}
      <div className="print:p-0 p-6 bg-zinc-200 min-h-screen flex justify-center print:bg-transparent print:block print:min-h-0">
        <div
          id="print-root"
          style={{
            width: '270mm',
            minHeight: '190mm',
            background: '#fff',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: '10.5px',
            color: '#000',
            padding: '6mm 8mm',
            boxSizing: 'border-box',
          }}
        >
          {/* ── Document header ─────────────────────────────── */}
          <div
            style={{
              border: '2px solid #000',
              marginBottom: '4px',
              textAlign: 'center',
              padding: '4px 8px',
              lineHeight: 1.4,
            }}
          >
            {/* Top line: pulsera / vaso info */}
            {pulseraLine && (
              <div style={{ fontSize: '9px', fontStyle: 'italic', textDecoration: 'underline', marginBottom: '1px' }}>
                {pulseraLine}
              </div>
            )}
            {/* Main header line */}
            <div style={{ fontWeight: 'bold', fontSize: '11.5px', letterSpacing: '0.04em' }}>
              LISTA MERCADOPAGO
              {pulseraLine ? ` --- ${pulseraLine} ----` : ' ----'}
              {' '}LISTA CONTADO
            </div>
          </div>

          {/* Date line */}
          <div style={{ fontSize: '8px', color: '#555', textAlign: 'right', marginBottom: '4px' }}>
            {dateStr}
          </div>

          {/* ── Two-column body ─────────────────────────────── */}
          <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
            <tbody>
              <tr style={{ verticalAlign: 'top' }}>
                {/* LEFT column */}
                <td style={{ width: '50%', paddingRight: '4mm', verticalAlign: 'top' }}>
                  {leftSections.map((sec) => (
                    <PriceSection key={sec.label} section={sec} />
                  ))}
                </td>

                {/* Vertical divider */}
                <td style={{ width: '1px', borderLeft: '1px solid #000', padding: 0 }} />

                {/* RIGHT column */}
                <td style={{ width: '50%', paddingLeft: '4mm', verticalAlign: 'top' }}>
                  {rightSections.map((sec) => (
                    <PriceSection key={sec.label} section={sec} />
                  ))}
                </td>
              </tr>
            </tbody>
          </table>

          {/* ── Footer ──────────────────────────────────────── */}
          <div
            style={{
              marginTop: '6px',
              borderTop: '1px solid #ccc',
              paddingTop: '3px',
              fontSize: '8px',
              color: '#888',
              textAlign: 'center',
              letterSpacing: '0.1em',
            }}
          >
            COMPLEJO AEROPUERTO · MENÚ DIGITAL
          </div>
        </div>
      </div>

      {/* ── Print CSS ────────────────────────────────────────── */}
      <style>{`
        @media print {
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }

          @page {
            size: A4 landscape;
            margin: 5mm 6mm;
          }

          /* Hide everything but the print root */
          body > * { display: none !important; }
          body > div { display: block !important; }
          body { background: white !important; margin: 0; padding: 0; }

          #print-root {
            width: 100% !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </>
  );
}

/* ── Category section table ──────────────────────────────── */
function PriceSection({ section }: { section: Section }) {
  const hasCash = section.items.some((p) => p.cash && p.cash > 0);

  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '6px',
        tableLayout: 'fixed',
      }}
    >
      <thead>
        {/* Category header row — dark bg like the photo */}
        <tr>
          <th
            style={{
              background: '#000',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '10.5px',
              textAlign: 'left',
              padding: '3px 5px',
              letterSpacing: '0.08em',
              border: '1px solid #000',
            }}
          >
            {section.label}
          </th>
          <th
            style={{
              background: '#000',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '9px',
              textAlign: 'center',
              padding: '3px 4px',
              letterSpacing: '0.04em',
              border: '1px solid #000',
              width: hasCash ? '26%' : '30%',
              whiteSpace: 'nowrap',
            }}
          >
            MERCADOPAGO
          </th>
          {hasCash && (
            <th
              style={{
                background: '#000',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '9px',
                textAlign: 'center',
                padding: '3px 4px',
                letterSpacing: '0.04em',
                border: '1px solid #000',
                width: '22%',
                whiteSpace: 'nowrap',
              }}
            >
              CONTADO
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {section.items.map((item, i) => (
          <tr
            key={item.id}
            style={{ background: i % 2 === 0 ? '#fff' : '#f5f5f5' }}
          >
            <td
              style={{
                padding: '2px 5px',
                border: '1px solid #000',
                fontWeight: 'normal',
                fontSize: '10px',
              }}
            >
              {item.name}
            </td>
            <td
              style={{
                padding: '2px 5px',
                border: '1px solid #000',
                textAlign: 'right',
                fontWeight: 'bold',
                fontSize: '10px',
                whiteSpace: 'nowrap',
              }}
            >
              {fmt(item.price)}
            </td>
            {hasCash && (
              <td
                style={{
                  padding: '2px 5px',
                  border: '1px solid #000',
                  textAlign: 'right',
                  fontWeight: 'bold',
                  fontSize: '10px',
                  color: item.cash ? '#000' : '#bbb',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.cash ? fmt(item.cash) : '—'}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
