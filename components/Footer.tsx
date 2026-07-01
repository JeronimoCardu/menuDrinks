'use client';

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/complejoaeropuerto' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61564676623968' },
  { label: 'X (Twitter)', href: 'https://x.com/AeroComplejo' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@complejoaeropuerto' },
  { label: 'YouTube', href: 'https://www.youtube.com/@ComplejoAeropuerto' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-night-border mt-8">
      <div className="px-4 py-8 flex flex-col items-center gap-5 text-center">
        {/* Logo */}
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-zinc-600 text-[10px] tracking-[0.3em] uppercase">Complejo</span>
          <span className="font-display text-2xl text-zinc-400 tracking-wide">AEROPUERTO</span>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-night-border to-transparent" />

        {/* Social links */}
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label="Redes sociales">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-night-accentLight text-xs transition-colors duration-200"
            >
              {s.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-zinc-700 text-[11px]">
          © {year} Complejo Aeropuerto. Todos los derechos reservados.
        </p>

        {/* QR reminder */}
        <p className="text-zinc-800 text-[10px]">
          Menú digital · Escaneá el QR en el local
        </p>
        {/* Author */}
        <p className="text-zinc-800 text-[10px]">
          Desarrollado por <a href="https://www.linkedin.com/in/jeronimocardu" target="_blank" rel="noopener noreferrer" className="text-night-accentLight hover:text-night-accentDark ">
            Jeronimo Cardu
          </a>
        </p>
      </div>
    </footer>
  );
}
