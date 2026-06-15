-- ─────────────────────────────────────────────────────────────
-- Complejo Aeropuerto — Digital Menu Schema
-- Run this in the Supabase SQL editor
-- ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS products (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT        NOT NULL,
  description   TEXT,
  price         NUMERIC     NOT NULL CHECK (price >= 0),
  image         TEXT,                       -- path relative to /public or full URL
  category      TEXT        NOT NULL CHECK (
                  category IN ('drink_500ml', 'drink_1l', 'bottle_combo', 'promotion')
                ),
  featured      BOOLEAN     NOT NULL DEFAULT false,
  badge         TEXT        CHECK (badge IN ('mas_pedido', 'promo', 'nuevo')),
  active        BOOLEAN     NOT NULL DEFAULT true,
  display_order INTEGER     NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for common queries
CREATE INDEX IF NOT EXISTS products_active_idx        ON products (active);
CREATE INDEX IF NOT EXISTS products_category_idx      ON products (category);
CREATE INDEX IF NOT EXISTS products_featured_idx      ON products (featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS products_display_order_idx ON products (display_order);

-- Row-level security (public read-only)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read" ON products;
CREATE POLICY "Public read" ON products
  FOR SELECT USING (active = true);

-- ─────────────────────────────────────────────────────────────
-- Sample data — Tragos 500ml
-- ─────────────────────────────────────────────────────────────
INSERT INTO products (name, description, price, category, featured, badge, display_order) VALUES
  ('Fernet con Coca',        'Fernet Branca + Coca-Cola',              2800, 'drink_500ml', true,  'mas_pedido', 10),
  ('Vodka con Jugo',         'Vodka + Jugo de naranja exprimido',       2500, 'drink_500ml', true,  'mas_pedido', 20),
  ('Ron con Cola',           'Ron añejo + Coca-Cola',                   2500, 'drink_500ml', false, NULL,         30),
  ('Gin Tónico',             'Gin premium + agua tónica + limón',       3200, 'drink_500ml', false, 'nuevo',      40),
  ('Aperol Spritz',          'Aperol + Prosecco + soda',                3500, 'drink_500ml', false, NULL,         50),
  ('Whisky con Soda',        'Johnnie Walker Red + soda',               3800, 'drink_500ml', false, NULL,         60),
  ('Campari Naranja',        'Campari + jugo de naranja',               2800, 'drink_500ml', false, NULL,         70),
  ('Vodka con Energizante',  'Vodka + bebida energizante',              3200, 'drink_500ml', true,  'mas_pedido', 80);

-- ─────────────────────────────────────────────────────────────
-- Tragos 1L
-- ─────────────────────────────────────────────────────────────
INSERT INTO products (name, description, price, category, featured, badge, display_order) VALUES
  ('Fernet con Coca 1L',    'Fernet Branca + Coca-Cola — tamaño XXL',  5000, 'drink_1l', true,  'mas_pedido', 10),
  ('Vodka con Jugo 1L',     'Vodka + Jugo de naranja — tamaño XXL',    4500, 'drink_1l', false, NULL,         20),
  ('Ron con Cola 1L',       'Ron añejo + Coca-Cola — tamaño XXL',      4500, 'drink_1l', false, NULL,         30),
  ('Gin Tónico 1L',         'Gin + agua tónica + limón — tamaño XXL', 5500, 'drink_1l', false, NULL,         40);

-- ─────────────────────────────────────────────────────────────
-- Combos de Botellas
-- ─────────────────────────────────────────────────────────────
INSERT INTO products (name, description, price, category, featured, badge, display_order) VALUES
  ('Combo Vodka Premium',
   'Botella de Vodka Absolut + 4 jugos a elección + hielo',
   12000, 'bottle_combo', false, NULL, 10),

  ('Combo Whisky VIP',
   'Botella de Johnnie Walker Black + 4 sodas + hielo + vasos',
   18000, 'bottle_combo', true, 'mas_pedido', 20),

  ('Combo Ron Tropical',
   'Botella de Havana 7 Años + 4 Coca-Colas + hielo',
   14000, 'bottle_combo', false, NULL, 30),

  ('Combo VIP Doble',
   '2 botellas a elección + 8 mezclas + 2 hielos + reserva de mesa',
   32000, 'bottle_combo', false, 'nuevo', 40),

  ('Combo Gin Party',
   'Botella de Gin Beefeater + 6 tónicas + limones + hielo',
   16000, 'bottle_combo', false, NULL, 50);

-- ─────────────────────────────────────────────────────────────
-- Promociones
-- ─────────────────────────────────────────────────────────────
INSERT INTO products (name, description, price, category, featured, badge, display_order) VALUES
  ('Happy Hour 2×1',
   'De 22:00 a 00:00 · Todos los tragos 500ml al precio de uno',
   2500, 'promotion', true, 'promo', 10),

  ('Promo Fernet Noche',
   'A partir de las 00:00 · Fernet con Coca 2×1 toda la noche',
   2800, 'promotion', false, 'promo', 20),

  ('Promo Cumpleaños',
   'Presentá tu DNI · Botella de regalo + 4 mezclas + mesa reservada',
   8000, 'promotion', false, 'promo', 30),

  ('Pack Chicas Noche',
   'Viernes y sábados · 4 tragos 500ml por precio especial',
   8000, 'promotion', false, 'promo', 40);
