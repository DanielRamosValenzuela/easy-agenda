import Link from "next/link";
import { CalendarDays, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import { Separator } from "@/shared/ui/separator";
import { siteConfig } from "@/shared/config/site";

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
} as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <CalendarDays className="h-5 w-5 text-primary" />
              <span>{siteConfig.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex gap-3">
              {Object.entries(siteConfig.social).map(([key, url]) => {
                const Icon = socialIcons[key as keyof typeof socialIcons];
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                    aria-label={key}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Producto */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Producto</h3>
            <ul className="space-y-2">
              {siteConfig.footerLinks.producto.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Deportes */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Deportes</h3>
            <ul className="space-y-2">
              {siteConfig.footerLinks.deportes.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa & Contacto */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Empresa</h3>
            <ul className="space-y-2">
              {siteConfig.footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-2 space-y-1 text-sm text-muted-foreground">
              <p>{siteConfig.contact.email}</p>
              <p>{siteConfig.contact.phone}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Hecho con dedicación en Santiago, Chile
          </p>
        </div>
      </div>
    </footer>
  );
}
