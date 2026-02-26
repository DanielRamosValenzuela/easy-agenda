export const siteConfig = {
  name: "EasyAgenda",
  description:
    "Reserva canchas deportivas de pádel, tenis, squash y racquetball en los mejores clubes de Chile.",
  url: "https://easyagenda.cl",
  ogImage: "/og-image.png",
  contact: {
    email: "contacto@easyagenda.cl",
    phone: "+56 2 2345 6789",
    address: "Av. Providencia 1234, Oficina 501, Providencia, Santiago, Chile",
    openingHours: "Lunes a Viernes: 09:00 - 18:00",
  },
  social: {
    instagram: "https://instagram.com/easyagenda",
    facebook: "https://facebook.com/easyagenda",
    twitter: "https://twitter.com/easyagenda",
    linkedin: "https://linkedin.com/company/easyagenda",
  },
  navLinks: [
    { label: "Inicio", href: "/" },
    { label: "Clubes", href: "/clubes" },
    { label: "Canchas", href: "/canchas" },
    { label: "Precios", href: "/precios" },
    { label: "Contacto", href: "/contacto" },
  ],
  footerLinks: {
    producto: [
      { label: "Clubes", href: "/clubes" },
      { label: "Canchas", href: "/canchas" },
      { label: "Precios", href: "/precios" },
      { label: "Mi Panel", href: "/dashboard" },
    ],
    empresa: [
      { label: "Contacto", href: "/contacto" },
      { label: "Términos de Servicio", href: "#" },
      { label: "Política de Privacidad", href: "#" },
    ],
    deportes: [
      { label: "Pádel", href: "/canchas?deporte=padel" },
      { label: "Tenis", href: "/canchas?deporte=tenis" },
      { label: "Squash", href: "/canchas?deporte=squash" },
      { label: "Racquetball", href: "/canchas?deporte=racquetball" },
    ],
  },
} as const;
