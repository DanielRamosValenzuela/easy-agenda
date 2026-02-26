import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/widgets/navbar";
import { Footer } from "@/widgets/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "EasyAgenda — Reserva Canchas Deportivas",
    template: "%s — EasyAgenda",
  },
  description:
    "Reserva canchas de pádel, tenis, squash y racquetball en los mejores clubes de Chile. Encuentra disponibilidad y agenda en segundos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Navbar />
        <main className="min-h-[calc(100dvh-4rem)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
