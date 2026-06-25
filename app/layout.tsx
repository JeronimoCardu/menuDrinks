import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
// @ts-ignore: allow side-effect import of global CSS without explicit type declarations
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Complejo Aeropuerto | Menú Digital",
  description:
    "Tragos, combos y promociones exclusivas. Escaneá el QR y explorá nuestra carta.",
  metadataBase: new URL("https://complejoaeropuerto.com"),
  openGraph: {
    title: "Complejo Aeropuerto | Menú Digital",
    description: "Tragos, combos y promociones exclusivas.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#060606",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="font-body bg-night-bg min-h-screen">
        {children}
      </body>
    </html>
  );
}
