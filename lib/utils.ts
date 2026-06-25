export function normalizeImage(src: string | null | undefined): string | null {
  if (!src?.trim()) return null;
  const s = src.trim();
  if (s.startsWith('/') || s.startsWith('http://') || s.startsWith('https://')) return s;
  return `/${s}`;
}
