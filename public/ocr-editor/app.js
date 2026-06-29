/* ═══════════════════════════════════════════════════════════
   1. INITIAL DATA — pre-loaded from reference image
   ═══════════════════════════════════════════════════════════ */
const INITIAL_DATA = {
  topLine:  'VASO GLITTER $12.100',
  mainLine: 'LISTA MERCADO PAGO',
  pulsera3: 'PULSERA X3 $18.700',
  pulsera5: 'PULSERA X5 $30.250',
  categories: [
    {
      name: 'SIN ALCOHOL',
      colHeaders: ['PRECIO'],
      products: [
        { name: 'AGUA',    prices: ['$ 3.300,00'] },
        { name: 'GASEOSA', prices: ['$ 3.300,00'] },
        { name: 'SPEED',   prices: ['$ 4.400,00'] },
      ]
    },
    {
      name: 'CERVEZAS',
      colHeaders: ['PRECIO'],
      products: [
        { name: 'CORONA',    prices: ['$ 6.050,00'] },
        { name: 'BUDWEISER', prices: ['$ 3.850,00'] },
      ]
    },
    {
      name: 'VINOS',
      colHeaders: ['PRECIO'],
      products: [
        { name: 'PIEL DE CORDERO (bot)',    prices: ['$ 16.500,00'] },
        { name: 'TERMIDOR (VASO 500 CC)',   prices: ['$ 4.400,00']  },
        { name: 'BLANCO DULCE (BOT.)',      prices: ['$ 16.500,00'] },
      ]
    },
    {
      name: 'APERITIVOS',
      colHeaders: ['PRECIO', '2X'],
      products: [
        { name: 'FERNET',           prices: ['$ 7.150,00', '2 X $12.100'] },
        { name: 'GANCIA',           prices: ['$ 6.050,00', '2 X $9.900']  },
        { name: 'CAMPARI',          prices: ['$ 6.050,00', '2 X $9.900']  },
        { name: 'APEROL MEDIDA',    prices: ['$ 4.400,00', '']            },
        { name: 'APEROL + CHANDON', prices: ['$ 11.000,00','']            },
        { name: 'CYNAR + GASEOSA',  prices: ['$ 5.500,00', '']            },
        { name: 'CYNAR + SPEED',    prices: ['$ 6.600,00', '']            },
        { name: 'HOLDM. MEDIDA',    prices: ['$ 5.500,00', '']            },
        { name: 'HOLDM. + SPEED',   prices: ['$ 9.900,00', '']            },
        { name: 'DR LEMON LATA',    prices: ['$ 4.400,00', '']            },
      ]
    },
    {
      name: 'RON',
      colHeaders: ['PRECIO'],
      products: [
        { name: 'RON HABANA + GASEOSA',  prices: ['$ 7.700,00'] },
        { name: 'RON BACARDI + GASEOSA', prices: ['$ 7.700,00'] },
        { name: 'MALIBU + SPEED',        prices: ['$ 7.700,00'] },
        { name: 'MALIBU + GASEOSA',      prices: ['$ 6.600,00'] },
        { name: 'NACIONAL + GASEOSA',    prices: ['$ 4.400,00'] },
      ]
    },
    {
      name: 'CHAMPAGNE',
      colHeaders: ['MEDIDA', 'C/1 SPEED', 'C/2 SPEED'],
      products: [
        { name: 'BARON B',     prices: ['$ 49.500,00','$ 52.800,00','$ 55.000,00'] },
        { name: 'CHANDON',     prices: ['$ 27.500,00','$ 30.800,00','$ 33.000,00'] },
        { name: 'RENAISSANCE', prices: ['$ 8.800,00', '$ 12.100,00','$ 14.300,00'] },
        { name: 'CHANDON 187', prices: ['$ 8.800,00', '',            '']           },
      ]
    },
    {
      name: 'VODKA',
      colHeaders: ['MEDIDA', 'C/SPEED', 'C/JUGO'],
      products: [
        { name: 'ABSOLUT',          prices: ['$ 6.600,00','$ 9.900,00','$ 8.800,00'] },
        { name: 'SKY (2 X $12.100)',prices: ['$ 4.400,00','$ 7.150',   '$ 6.050,00'] },
        { name: 'NACIONAL',         prices: ['$ 3.300,00','$ 4.950,00','$ 4.400,00'] },
      ]
    },
    {
      name: 'WHISKY',
      colHeaders: ['MEDIDA', 'C/SPEED'],
      products: [
        { name: 'JHONIE RED',          prices: ['$ 8.800,00', '$ 12.100,00'] },
        { name: 'JHONIE BLACK',        prices: ['$ 13.200,00','$ 16.500,00'] },
        { name: 'JACK DANIELS BLACK',  prices: ['$ 13.200,00','$ 16.500,00'] },
        { name: 'J & B',               prices: ['$ 7.700,00', '$ 9.900,00']  },
        { name: 'BLENDERS / SMUGGLER', prices: ['$ 4.400,00', '$ 7.700,00']  },
      ]
    },
    {
      name: 'GIN',
      colHeaders: ['MEDIDA', 'C/GASEOSA', 'C/SPEED'],
      products: [
        { name: 'BEEFEATER',       prices: ['$ 6.600,00','$ 7.700,00','$ 8.800,00'] },
        { name: 'BEEFEATER PINK',  prices: ['$ 6.600,00','$ 7.700,00','$ 8.800,00'] },
        { name: 'BOMBAI',          prices: ['$ 8.250,00','$ 9.900,00','$ 9.900,00'] },
        { name: 'NACIONAL',        prices: ['$ 3.300,00','$ 4.400,00','$ 4.950,00'] },
      ]
    },
    {
      name: 'TRAGOS',
      colHeaders: ['PRECIO', 'EXTRA'],
      products: [
        { name: 'LO DE SIEMPRE C/ SKY', prices: ['$ 6.050,00', '']                  },
        { name: 'TIA MARIA',            prices: ['$ 7.700,00', '']                  },
        { name: 'WHISCOLA',             prices: ['$ 5.500,00', 'JUGO CAJA $8.800,00'] },
        { name: 'SHOT TEKILA',          prices: ['$ 3.300,00', 'GASEOSA BOT $11.000,00'] },
      ]
    },
  ]
};

/* ═══════════════════════════════════════════════════════════
   2. STATE
   ═══════════════════════════════════════════════════════════ */
// Per-document state — 'mercadopago' and 'contado' are kept independently
const states     = { mercadopago: null, contado: null };
const ocrBackups = { mercadopago: null, contado: null };
let activeDoc    = 'mercadopago';

// Convenience references — always point to the active doc
let state      = null;
let ocrBackup  = null;
let imageFile  = null;

// Image viewer state
let zoom = 1.0;
let panX = 0, panY = 0;
let isDragging = false;
let dragStartX = 0, dragStartY = 0;
let panStartX = 0, panStartY = 0;

/* ═══════════════════════════════════════════════════════════
   3. UTILITIES
   ═══════════════════════════════════════════════════════════ */
function uid() {
  return '_' + Math.random().toString(36).slice(2, 10);
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function escHtml(str) {
  return (str ?? '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Attach IDs to raw data (no IDs in INITIAL_DATA to keep it readable)
function hydrateState(raw) {
  return {
    topLine:  raw.topLine  || '',
    mainLine: raw.mainLine || '',
    pulsera3: raw.pulsera3 || '',
    pulsera5: raw.pulsera5 || '',
    categories: raw.categories.map(cat => ({
      id:         uid(),
      name:       cat.name || '',
      colHeaders: [...(cat.colHeaders || ['PRECIO'])],
      uncertain:  cat.uncertain || false,
      products:   (cat.products || []).map(p => ({
        id:        uid(),
        name:      p.name  || '',
        prices:    [...(p.prices || [''])],
        uncertain: p.uncertain || false,
      }))
    }))
  };
}

function getCatById(catId) {
  return state.categories.find(c => c.id === catId);
}

/* ═══════════════════════════════════════════════════════════
   4. RENDERING
   ═══════════════════════════════════════════════════════════ */
function renderAll() {
  document.getElementById('input-top-line').value  = state.topLine;
  document.getElementById('input-main-line').value = state.mainLine;
  document.getElementById('input-pulsera3').value  = state.pulsera3 || '';
  document.getElementById('input-pulsera5').value  = state.pulsera5 || '';
  renderCategories();
}

function renderCategories() {
  const wrap = document.getElementById('cats-wrap');
  wrap.innerHTML = state.categories.map((cat, idx) => renderCatCard(cat, idx)).join('');
}

function renderCatCard(cat, idx) {
  const numCols = cat.colHeaders.length;

  // Column header cells — each has an editable input + delete-column btn (if >1 col)
  const colHeadCells = cat.colHeaders.map((h, ci) => `
    <th class="r price-col-th">
      <div class="col-h-wrap">
        <input class="col-h-in" value="${escHtml(h)}"
               placeholder="Col ${ci+1}"
               onchange="updateColHeader('${cat.id}',${ci},this.value)">
        ${numCols > 1
          ? `<button class="col-del-btn" onclick="deleteColumn('${cat.id}',${ci})" title="Eliminar columna">✕</button>`
          : ''}
      </div>
    </th>
  `).join('');

  const prodRows = cat.products.map(p => renderProdRow(p, cat.id, numCols)).join('');

  return `
<div class="cat-card" data-cat-id="${cat.id}">
  <div class="cat-header">
    <input class="cat-name-input"
           value="${escHtml(cat.name)}"
           placeholder="CATEGORÍA"
           onchange="updateCatName('${cat.id}',this.value)">
    <div class="cat-btns">
      <button class="cat-btn" onclick="moveCat('${cat.id}',-1)" title="Subir sección">↑</button>
      <button class="cat-btn" onclick="moveCat('${cat.id}',1)"  title="Bajar sección">↓</button>
      <button class="cat-btn red" onclick="deleteCat('${cat.id}')" title="Eliminar sección">✕</button>
    </div>
  </div>

  <div class="table-scroll-wrap">
    <table class="prod-table">
      <thead>
        <tr>
          <th class="name-col"><span class="col-h-label">PRODUCTO</span></th>
          ${colHeadCells}
          <th class="act-col"></th>
        </tr>
      </thead>
      <tbody>
        ${prodRows}
      </tbody>
    </table>
  </div>

  <div class="cat-footer">
    <button class="btn-sm outline" onclick="addProduct('${cat.id}')">＋ Producto</button>
    ${numCols < 5 ? `<button class="btn-sm ghost2" onclick="addColumn('${cat.id}')">＋ Columna</button>` : ''}
  </div>
</div>`;
}

function renderProdRow(p, catId, numCols) {
  const priceCells = Array.from({ length: numCols }, (_, i) => {
    const val = p.prices[i] ?? '';
    return `<td><input class="cell-in r" value="${escHtml(val)}" placeholder="—"
               onchange="updatePrice('${catId}','${p.id}',${i},this.value)"></td>`;
  }).join('');

  const uncertainClass = p.uncertain ? ' uncertain' : '';
  const uncertainTag   = p.uncertain ? '<span class="uncertain-tag">Revisar</span>' : '';

  return `
<tr class="prod-row${uncertainClass}" data-prod-id="${p.id}">
  <td>
    <input class="cell-in" value="${escHtml(p.name)}"
           placeholder="Nombre del producto"
           onchange="updateProdName('${catId}','${p.id}',this.value)">
    ${uncertainTag}
  </td>
  ${priceCells}
  <td>
    <div class="row-actions">
      <button class="row-move-btn" onclick="moveProduct('${catId}','${p.id}',-1)" title="Subir fila">↑</button>
      <button class="row-move-btn" onclick="moveProduct('${catId}','${p.id}',1)"  title="Bajar fila">↓</button>
      <button class="del-prod-btn" onclick="deleteProduct('${catId}','${p.id}')" title="Eliminar">✕</button>
    </div>
  </td>
</tr>`;
}

/* ═══════════════════════════════════════════════════════════
   5. STATE MUTATIONS
   ═══════════════════════════════════════════════════════════ */

// Header
function updateTopLine(v) {
  // topLine (vaso glitter) is shared — keep both docs in sync
  states.mercadopago.topLine = v;
  states.contado.topLine     = v;
}
function updateMainLine(v) { state.mainLine = v; }
function updatePulsera3(v) { state.pulsera3 = v; }
function updatePulsera5(v) { state.pulsera5 = v; }

// Categories
function updateCatName(catId, val) { getCatById(catId).name = val; }
function updateColHeader(catId, colIdx, val) { getCatById(catId).colHeaders[colIdx] = val; }
function updateProdName(catId, prodId, val) {
  const cat  = getCatById(catId);
  const prod = cat.products.find(p => p.id === prodId);
  if (prod) { prod.name = val; prod.uncertain = false; }
}
function updatePrice(catId, prodId, colIdx, val) {
  const cat  = getCatById(catId);
  const prod = cat.products.find(p => p.id === prodId);
  if (prod) { prod.prices[colIdx] = val; prod.uncertain = false; }
}

function addCategory() {
  state.categories.push({
    id:         uid(),
    name:       'NUEVA CATEGORÍA',
    colHeaders: ['PRECIO'],
    uncertain:  false,
    products:   [{ id: uid(), name: '', prices: [''], uncertain: false }]
  });
  renderCategories();
  // Scroll to new card
  const last = document.querySelector('#cats-wrap .cat-card:last-child');
  if (last) last.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function deleteCat(catId) {
  if (!confirm('¿Eliminar esta categoría y todos sus productos?')) return;
  state.categories = state.categories.filter(c => c.id !== catId);
  renderCategories();
}

function moveCat(catId, dir) {
  const idx = state.categories.findIndex(c => c.id === catId);
  const next = idx + dir;
  if (next < 0 || next >= state.categories.length) return;
  [state.categories[idx], state.categories[next]] = [state.categories[next], state.categories[idx]];
  renderCategories();
}

function addColumn(catId) {
  const cat = getCatById(catId);
  if (cat.colHeaders.length >= 5) return;
  cat.colHeaders.push(`COL ${cat.colHeaders.length + 1}`);
  cat.products.forEach(p => { while (p.prices.length < cat.colHeaders.length) p.prices.push(''); });
  renderCategories();
}

function deleteColumn(catId, colIdx) {
  const cat = getCatById(catId);
  if (cat.colHeaders.length <= 1) return;
  cat.colHeaders.splice(colIdx, 1);
  cat.products.forEach(p => p.prices.splice(colIdx, 1));
  renderCategories();
}

function moveProduct(catId, prodId, dir) {
  const cat  = getCatById(catId);
  const idx  = cat.products.findIndex(p => p.id === prodId);
  const next = idx + dir;
  if (next < 0 || next >= cat.products.length) return;
  [cat.products[idx], cat.products[next]] = [cat.products[next], cat.products[idx]];
  renderCategories();
}

function addProduct(catId) {
  const cat = getCatById(catId);
  const numCols = cat.colHeaders.length;
  cat.products.push({
    id:        uid(),
    name:      '',
    prices:    Array(numCols).fill(''),
    uncertain: false,
  });
  renderCategories();
  // Focus new row name input
  setTimeout(() => {
    const card = document.querySelector(`[data-cat-id="${catId}"]`);
    const last = card?.querySelector('tbody tr:last-child input');
    if (last) last.focus();
  }, 50);
}

function deleteProduct(catId, prodId) {
  const cat = getCatById(catId);
  if (cat.products.length <= 1) {
    cat.products = cat.products.filter(p => p.id !== prodId);
    renderCategories(); return;
  }
  cat.products = cat.products.filter(p => p.id !== prodId);
  // Remove just the row from DOM instead of full re-render
  const row = document.querySelector(`[data-prod-id="${prodId}"]`);
  if (row) row.remove();
}

/* ═══════════════════════════════════════════════════════════
   6. OCR
   ═══════════════════════════════════════════════════════════ */
function setStatus(html) {
  document.getElementById('ocr-status').innerHTML = html;
}

async function runOCR(file) {
  setStatus(`<div class="status-loading"><div class="spinner"></div>Analizando imagen con OCR…</div>`);

  try {
    // Explicit CDN paths required for Tesseract.js v5 to find its worker & core from jsdelivr
    const CDN = 'https://cdn.jsdelivr.net/npm/';
    const result = await Tesseract.recognize(file, 'spa+eng', {
      workerPath: CDN + 'tesseract.js@5/dist/worker.min.js',
      langPath:   'https://tessdata.projectnaptha.com/4.0.0',
      corePath:   CDN + 'tesseract.js-core@5/tesseract-core.wasm.js',
      logger: m => {
        if (m.status === 'recognizing text') {
          const pct = Math.round((m.progress || 0) * 100);
          setStatus(`<div class="status-loading"><div class="spinner"></div>OCR: ${pct}%</div>`);
        }
      }
    });

    const parsed = parseOCRText(result.data.lines);

    if (parsed.categories.length === 0) {
      setStatus(`<div class="status-err">OCR no encontró categorías reconocibles. Los datos precargados se mantienen — editá manualmente si necesitás.</div>`);
      return;
    }

    // Quality gate: warn if OCR confidence is low before replacing state
    const totalProds    = parsed.categories.reduce((n, c) => n + c.products.length, 0);
    const uncertainProds = parsed.categories.reduce((n, c) => n + c.products.filter(p => p.uncertain).length, 0);
    const pctUncertain  = totalProds > 0 ? Math.round(uncertainProds / totalProds * 100) : 100;

    if (parsed.categories.length < 3 || pctUncertain > 70) {
      const proceed = confirm(
        `OCR detectó solo ${parsed.categories.length} categorías con ${pctUncertain}% de ítems de baja confianza.\n\n` +
        `Esto puede reemplazar los datos correctos con texto ilegible.\n\n` +
        `¿Reemplazar los datos actuales con el resultado del OCR?`
      );
      if (!proceed) {
        setStatus(`<div class="status-err">OCR cancelado — calidad insuficiente (${pctUncertain}% incierto). Los datos precargados se conservan.</div>`);
        return;
      }
    }

    const newState = hydrateState(parsed);
    newState.topLine  = state.topLine;
    newState.mainLine = state.mainLine;
    ocrBackup = deepClone(newState);
    ocrBackups[activeDoc] = ocrBackup;
    state = newState;
    states[activeDoc] = state;
    renderAll();

    const uncertain = state.categories.reduce((n, c) => n + c.products.filter(p => p.uncertain).length, 0);
    setStatus(uncertain > 0
      ? `<div class="status-ok">✓ OCR completado — ${uncertain} campo(s) para revisar (fondo amarillo)</div>`
      : `<div class="status-ok">✓ OCR completado sin advertencias</div>`
    );

    document.getElementById('btn-restore').disabled = false;
  } catch (err) {
    console.error(err);
    setStatus(`<div class="status-err">Error OCR: ${err.message}. Editá los datos manualmente.</div>`);
  }
}

function parseOCRText(lines) {
  const PRICE_RE = /\$\s*[\d\.,]+/g;
  // Characters considered "noise" (not letters, digits, price-related, or spaces)
  const NOISE_RE = /[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑüÜ\s$.,\-()\/&]/g;

  const categories = [];
  let currentCat = null;

  for (const line of lines) {
    // ── 1. Confidence gate ───────────────────────────────
    const avgConf = line.words.length > 0
      ? line.words.reduce((s, w) => s + w.confidence, 0) / line.words.length
      : 0;
    if (avgConf < 55) continue;

    const raw = line.text.trim();
    if (raw.length < 3) continue;

    // ── 2. Noise gate (skip lines that are >35% garbage chars) ──
    const noiseCount = (raw.match(NOISE_RE) || []).length;
    if (noiseCount / raw.length > 0.35) continue;

    // ── 3. Extract prices and clean name ────────────────
    const prices  = raw.match(PRICE_RE) || [];
    const nameRaw = raw
      .replace(PRICE_RE, '')
      .replace(NOISE_RE, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // ── 4. Category detection ────────────────────────────
    // Must be: all-uppercase letters (+ allowed punctuation), no digits,
    // no price sign, length 2–28 chars, starts with a letter.
    const isCategory =
      prices.length === 0 &&
      nameRaw.length >= 2 &&
      nameRaw.length <= 28 &&
      /^[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ\s\/&\.()]+$/.test(nameRaw);

    const uncertain = avgConf < 75;

    if (isCategory) {
      currentCat = {
        name:       nameRaw.trim(),
        colHeaders: ['PRECIO'],
        uncertain:  false,
        products:   [],
      };
      categories.push(currentCat);

    } else if (prices.length > 0 && nameRaw.replace(/\s/g, '').length >= 3) {
      // Only attach products to an already-detected category.
      // Never create a fallback "OTROS" bucket — it just fills with noise.
      if (!currentCat) continue;

      while (currentCat.colHeaders.length < prices.length) {
        currentCat.colHeaders.push(`COL ${currentCat.colHeaders.length + 1}`);
      }
      currentCat.products.push({ name: nameRaw, prices, uncertain });
    }
  }

  // ── 5. Remove categories that ended up with no products ──
  const validCats = categories.filter(c => c.products.length > 0);

  // ── 6. Normalize price arrays per category ──
  validCats.forEach(cat => {
    const nCols = cat.colHeaders.length || 1;
    cat.products.forEach(p => {
      while (p.prices.length < nCols) p.prices.push('');
    });
  });

  return { topLine: '', mainLine: '', categories: validCats };
}

/* ═══════════════════════════════════════════════════════════
   7. PDF GENERATION
   ═══════════════════════════════════════════════════════════ */
// Returns only the printable body content — no HTML/HEAD/BODY wrapper.
// All styles are inline so the element can be injected into the live DOM.
function buildPrintElement() {
  const cats = state.categories;

  // Balance categories into two columns by total row count
  const rowCounts = cats.map(c => c.products.length + 1);
  const total = rowCounts.reduce((a, b) => a + b, 0);
  let acc = 0, splitAt = 0;
  for (let i = 0; i < rowCounts.length; i++) {
    acc += rowCounts[i];
    splitAt = i + 1;
    if (acc >= total / 2) break;
  }
  const leftCats  = cats.slice(0, splitAt);
  const rightCats = cats.slice(splitAt);

  // HDR: white text for black header rows. TD: black text for data cells.
  const HDR  = 'font-family:Arial,sans-serif;color:#fff;';
  const TD   = 'font-family:Arial,sans-serif;font-size:11px;color:#000;';
  const CELL = 'padding:2px 5px;border:1px solid #c8c8c8;font-family:Arial,sans-serif;font-size:10.5px;';

  const catTable = (cat) => {
    const nCols = cat.colHeaders.length;
    const nameW = nCols === 1 ? '65%' : nCols === 2 ? '55%' : '42%';
    const priceW = `${Math.floor((100 - parseInt(nameW)) / nCols)}%`;

    const headerCells =
      `<td style="${HDR}font-weight:700;font-size:10px;letter-spacing:.06em;padding:3px 5px;border:1px solid #000;">` +
        escHtml(cat.name) +
      `</td>` +
      cat.colHeaders.map(h =>
        `<td style="${HDR}font-weight:700;font-size:9px;text-align:center;padding:3px 4px;border:1px solid #000;white-space:nowrap;">` +
          escHtml(h) +
        `</td>`
      ).join('');

    const prodRows = cat.products.map((p, i) => {
      const bg = i % 2 === 0 ? '#fff' : '#f5f5f5';
      const priceTds = Array.from({ length: nCols }, (_, ci) =>
        `<td style="${CELL}text-align:right;font-weight:700;font-size:10px;white-space:nowrap;background:${bg};">` +
          escHtml(p.prices[ci] ?? '') +
        `</td>`
      ).join('');
      return (
        `<tr><td style="${CELL}background:${bg};">` + escHtml(p.name) + `</td>` + priceTds + `</tr>`
      );
    }).join('');

    const cols =
      `<col style="width:${nameW}">` +
      cat.colHeaders.map(() => `<col style="width:${priceW}">`).join('');

    return (
      `<table style="width:100%;border-collapse:collapse;margin-bottom:4px;table-layout:fixed;font-family:Arial,sans-serif;">` +
        `<colgroup>${cols}</colgroup>` +
        `<thead><tr style="background:#000;color:#fff;">${headerCells}</tr></thead>` +
        `<tbody>${prodRows}</tbody>` +
      `</table>`
    );
  };

  const colHtml = (list) => list.map(catTable).join('');

  const topLine = state.topLine
    ? `<div style="text-align:center;font-style:italic;text-decoration:underline;font-size:9px;margin-bottom:2px;font-family:Arial,sans-serif;">` +
        escHtml(state.topLine) +
      `</div>`
    : '';

  const pulseraRight = [state.pulsera3, state.pulsera5].filter(Boolean).map(escHtml).join('  -  ');

  const html =
    topLine +
    `<div style="border:2.5px solid #000;display:flex;align-items:center;justify-content:space-between;padding:5px 14px;margin-bottom:5px;gap:16px;">` +
      `<strong style="font-size:15px;letter-spacing:.03em;font-family:Arial,sans-serif;white-space:nowrap;">${escHtml(state.mainLine)}</strong>` +
      (pulseraRight
        ? `<strong style="font-size:13px;letter-spacing:.02em;font-family:Arial,sans-serif;white-space:nowrap;">${pulseraRight}</strong>`
        : '') +
    `</div>` +
    `<table style="width:100%;border-collapse:collapse;table-layout:fixed;">` +
      `<tbody><tr style="vertical-align:top;">` +
        `<td style="width:49%;padding-right:5mm;">${colHtml(leftCats)}</td>` +
        `<td style="width:2%;border-left:1.5px solid #000;"></td>` +
        `<td style="width:49%;padding-left:5mm;padding-right:10mm;">${colHtml(rightCats)}</td>` +
      `</tr></tbody>` +
    `</table>`;

  const el = document.createElement('div');
  el.innerHTML = html;
  el.style.cssText = [
    'box-sizing:border-box',
    'padding:6mm 8mm',
    'background:#fff',
    'color:#000',
    'width:277mm',   // A4 landscape 297mm - 20mm total padding
    'font-family:Arial,Helvetica,sans-serif',
    'font-size:11px',
  ].join(';');
  return el;
}

async function downloadPDF() {
  const btn = document.getElementById('btn-pdf');
  btn.disabled = true;
  btn.textContent = 'Generando…';

  // Build the print element and mount it off-screen using a scroll-container trick:
  // a wrapper that is position:fixed at top-left, overflow:hidden, zero viewport size —
  // so the user never sees it — but the child el has a real layout that html2canvas reads.
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'position:fixed;top:0;left:0;width:0;height:0;overflow:visible;z-index:-1;pointer-events:none;';

  const el = buildPrintElement();
  // el needs a concrete pixel width so tables can resolve percentage widths.
  // 277mm at 96dpi ≈ 1047px; we override with px to avoid mm-in-JS quirks.
  el.style.width = '1047px';

  wrapper.appendChild(el);
  document.body.appendChild(wrapper);

  // One rAF + small timeout so layout is fully calculated before capture.
  await new Promise(r => requestAnimationFrame(() => setTimeout(r, 80)));

  try {
    // Capture with html2canvas.
    // onclone strips every <link> and <style> from the internal clone so
    // html2canvas never tries to parse the app's CSS which uses oklch() —
    // a modern color function html2canvas 1.4.x doesn't support.
    // The print element uses only inline hex/rgb styles, so nothing is lost.
    const canvas = await html2canvas(el, {
      scale:           2,
      useCORS:         false,
      allowTaint:      true,
      backgroundColor: '#ffffff',
      width:           el.offsetWidth,
      height:          el.offsetHeight,
      scrollX:         0,
      scrollY:         0,
      logging:         false,
      onclone: (clonedDoc) => {
        clonedDoc.querySelectorAll('link[rel="stylesheet"], style').forEach(n => n.remove());
      },
    });

    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error('html2canvas devolvió un canvas vacío. Intentá de nuevo.');
    }

    // Build PDF with jsPDF (UMD global: window.jspdf.jsPDF)
    const { jsPDF } = window.jspdf;
    const pdf      = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'landscape' });
    const pageW    = pdf.internal.pageSize.getWidth();   // 297
    const pageH    = pdf.internal.pageSize.getHeight();  // 210

    // Fit canvas to page maintaining aspect ratio
    const canvasW  = canvas.width  / 2; // divide by scale
    const canvasH  = canvas.height / 2;
    const ratio    = Math.min(pageW / canvasW, pageH / canvasH);
    const imgW     = canvasW * ratio;
    const imgH     = canvasH * ratio;
    const imgX     = (pageW - imgW) / 2;
    const imgY     = (pageH - imgH) / 2;

    pdf.addImage(canvas.toDataURL('image/jpeg', 0.97), 'JPEG', imgX, imgY, imgW, imgH);

    const datePart = new Date().toISOString().slice(0, 10);
    pdf.save(`lista-precios-${activeDoc}-${datePart}.pdf`);

  } catch (err) {
    console.error(err);
    alert('Error al generar PDF: ' + err.message);
  } finally {
    document.body.removeChild(wrapper);
    btn.disabled = false;
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Descargar PDF`;
  }
}

/* ═══════════════════════════════════════════════════════════
   8. IMAGE VIEWER (pan & zoom)
   ═══════════════════════════════════════════════════════════ */
function applyTransform() {
  const inner = document.getElementById('image-inner');
  inner.style.transform = `translate(${panX}px,${panY}px) scale(${zoom})`;
  document.getElementById('zoom-label').textContent = Math.round(zoom * 100) + '%';
}

function setZoom(delta, cx, cy) {
  const MIN = 0.2, MAX = 8;
  const viewport = document.getElementById('image-viewport');
  const rect     = viewport.getBoundingClientRect();
  // transform-origin is 50% 50%, so we measure offset from viewport center
  const ox = rect.width  / 2;
  const oy = rect.height / 2;
  const rx = (cx != null ? cx - rect.left : ox) - ox;
  const ry = (cy != null ? cy - rect.top  : oy) - oy;
  const oldZoom = zoom;
  zoom = Math.min(MAX, Math.max(MIN, zoom + delta));
  const ratio = zoom / oldZoom;
  panX = rx * (1 - ratio) + panX * ratio;
  panY = ry * (1 - ratio) + panY * ratio;
  applyTransform();
}

function fitImage() {
  const img = document.getElementById('preview-img');
  const viewport = document.getElementById('image-viewport');
  if (img.style.display === 'none') return;
  const vw = viewport.clientWidth,  vh = viewport.clientHeight;
  const iw = img.naturalWidth,       ih = img.naturalHeight;
  if (!iw || !ih) return;
  zoom = Math.min(vw / iw, vh / ih) * 0.92;
  panX = 0; panY = 0; // flex-centering keeps image at viewport center when pan=0
  applyTransform();
}

function setupImageViewer() {
  const viewport = document.getElementById('image-viewport');

  // Wheel zoom
  viewport.addEventListener('wheel', e => {
    e.preventDefault();
    setZoom(e.deltaY < 0 ? 0.12 : -0.12, e.clientX, e.clientY);
  }, { passive: false });

  // Mouse drag
  viewport.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    isDragging = true; viewport.classList.add('dragging');
    dragStartX = e.clientX; dragStartY = e.clientY;
    panStartX  = panX;       panStartY  = panY;
  });
  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    panX = panStartX + (e.clientX - dragStartX);
    panY = panStartY + (e.clientY - dragStartY);
    applyTransform();
  });
  document.addEventListener('mouseup', () => {
    isDragging = false;
    document.getElementById('image-viewport').classList.remove('dragging');
  });

  // Touch drag
  let lastTouch = null;
  viewport.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      lastTouch = e.touches[0]; panStartX = panX; panStartY = panY;
    }
  }, { passive: true });
  viewport.addEventListener('touchmove', e => {
    if (e.touches.length === 1 && lastTouch) {
      const t = e.touches[0];
      panX = panStartX + (t.clientX - lastTouch.clientX);
      panY = panStartY + (t.clientY - lastTouch.clientY);
      applyTransform();
    }
  }, { passive: true });

  // Buttons
  document.getElementById('btn-zoom-in').addEventListener('click', () => setZoom(0.2));
  document.getElementById('btn-zoom-out').addEventListener('click', () => setZoom(-0.2));
  document.getElementById('btn-zoom-fit').addEventListener('click', fitImage);
}

function loadImage(file) {
  imageFile = file;
  const url = URL.createObjectURL(file);
  const img = document.getElementById('preview-img');
  const ph  = document.getElementById('image-placeholder');
  img.src = url;
  img.style.display = 'block';
  ph.style.display  = 'none';
  img.onload = () => fitImage();
  document.getElementById('btn-reanalyze').disabled = false;
}

/* ═══════════════════════════════════════════════════════════
   9. EVENT BINDING & INIT
   ═══════════════════════════════════════════════════════════ */
function bindEvents() {
  // Header inputs
  document.getElementById('input-top-line').addEventListener('input',  e => updateTopLine(e.target.value));
  document.getElementById('input-main-line').addEventListener('input', e => updateMainLine(e.target.value));
  document.getElementById('input-pulsera3').addEventListener('input',  e => updatePulsera3(e.target.value));
  document.getElementById('input-pulsera5').addEventListener('input',  e => updatePulsera5(e.target.value));

  // File import
  document.getElementById('file-input').addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    loadImage(file);
    await runOCR(file);
    document.getElementById('btn-restore').disabled = (ocrBackup === null);
    e.target.value = ''; // reset so same file can be re-selected
  });

  // Re-analyze OCR
  document.getElementById('btn-reanalyze').addEventListener('click', async () => {
    if (!imageFile) return;
    if (!confirm('¿Reanalizar la imagen? Los cambios manuales actuales se reemplazarán con el resultado del OCR.')) return;
    await runOCR(imageFile);
    document.getElementById('btn-restore').disabled = (ocrBackup === null);
  });

  // Restore OCR
  document.getElementById('btn-restore').addEventListener('click', () => {
    if (!ocrBackups[activeDoc]) return;
    if (!confirm('¿Restaurar los datos del último OCR? Se perderán los cambios manuales.')) return;
    ocrBackup = ocrBackups[activeDoc];
    state = deepClone(ocrBackup);
    states[activeDoc] = state;
    renderAll();
    setStatus(`<div class="status-ok">✓ Datos restaurados al último resultado OCR</div>`);
  });

  // PDF
  document.getElementById('btn-pdf').addEventListener('click', downloadPDF);

  // Save
  document.getElementById('btn-save').addEventListener('click', saveAll);

  // Add category
  document.getElementById('btn-add-cat').addEventListener('click', addCategory);

  // Mobile: toggle image panel
  const toggleImg = document.getElementById('btn-toggle-img');
  if (toggleImg) {
    toggleImg.addEventListener('click', () => {
      document.getElementById('image-panel').classList.toggle('panel-open');
    });
  }
}

/* ═══════════════════════════════════════════════════════════
   9b. PERSISTENCE (localStorage)
   ═══════════════════════════════════════════════════════════ */
const LS = { mercadopago: 'aero-pl-v2-mp', contado: 'aero-pl-v2-ct' };

function stripState(st) {
  return {
    topLine:  st.topLine,
    mainLine: st.mainLine,
    pulsera3: st.pulsera3 || '',
    pulsera5: st.pulsera5 || '',
    categories: st.categories.map(cat => ({
      name:       cat.name,
      colHeaders: [...cat.colHeaders],
      products:   cat.products.map(p => ({ name: p.name, prices: [...p.prices] }))
    }))
  };
}

function saveAll() {
  try {
    localStorage.setItem(LS.mercadopago, JSON.stringify(stripState(states.mercadopago)));
    localStorage.setItem(LS.contado,     JSON.stringify(stripState(states.contado)));
    const btn = document.getElementById('btn-save');
    btn.textContent = '✓ Guardado';
    setTimeout(() => { btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> <span class="btn-label">Guardar</span>`; }, 1800);
  } catch (e) {
    alert('Error guardando: ' + e.message);
  }
}

function loadSaved() {
  for (const doc of ['mercadopago', 'contado']) {
    const raw = localStorage.getItem(LS[doc]);
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw);
      // Migrate old saves where pulseras were embedded in mainLine
      if (!parsed.pulsera3 && parsed.mainLine && parsed.mainLine.includes('PULSERA')) {
        const m3 = parsed.mainLine.match(/PULSERA\s+X3[^/]*/i);
        const m5 = parsed.mainLine.match(/PULSERA\s+X5[^-]*/i);
        if (m3) parsed.pulsera3 = m3[0].trim();
        if (m5) parsed.pulsera5 = m5[0].trim();
        parsed.mainLine = parsed.mainLine.replace(/\s*---.*$/i, '').trim();
      }
      states[doc] = hydrateState(parsed);
    } catch (_) { /* keep default */ }
  }
  // topLine is shared — sync contado from mercadopago if it was saved empty
  if (!states.contado.topLine && states.mercadopago.topLine) {
    states.contado.topLine = states.mercadopago.topLine;
  }
}

function switchDoc(docType) {
  if (docType === activeDoc) return;
  activeDoc = docType;
  state     = states[activeDoc];
  ocrBackup = ocrBackups[activeDoc];
  // Update tab UI
  document.querySelectorAll('.doc-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.doc === activeDoc);
  });
  // Restore button depends on whether this doc has an OCR backup
  document.getElementById('btn-restore').disabled = !ocrBackup;
  renderAll();
}

function init() {
  // Default data — used only if nothing is saved in localStorage
  const mpData = deepClone(INITIAL_DATA);
  states.mercadopago = hydrateState(mpData);

  const ctData = deepClone(INITIAL_DATA);
  ctData.mainLine = 'LISTA CONTADO';
  ctData.categories.forEach(cat => {
    cat.products.forEach(p => { p.prices = p.prices.map(() => ''); });
  });
  states.contado = hydrateState(ctData);

  // Override with saved data if it exists
  loadSaved();

  state     = states.mercadopago;
  ocrBackup = null;

  setupImageViewer();
  renderAll();
  bindEvents();
  setStatus(`<div style="color:rgba(255,255,255,.45);font-size:11px;">Datos precargados — importá una imagen para analizar con OCR, o editá directamente</div>`);
}

document.addEventListener('DOMContentLoaded', init);
