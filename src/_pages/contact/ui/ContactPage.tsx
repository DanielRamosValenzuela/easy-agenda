import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/features/contact-form";
import { siteConfig } from "@/shared/config/site";

const INFO_ITEMS = [
  {
    icon: Mail,
    label: "Correo electrónico",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Dirección",
    value: siteConfig.contact.address,
    href: null,
  },
  {
    icon: Clock,
    label: "Horario de atención",
    value: siteConfig.contact.openingHours,
    href: null,
  },
];

export function ContactPage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Contacto
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            ¿Tienes preguntas, comentarios o quieres saber más sobre
            EasyAgenda? Estamos aquí para ayudarte.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left: Contact Form */}
          <div>
            <h2 className="text-xl font-semibold">Envíanos un mensaje</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Completa el formulario y te responderemos en menos de 24 horas
              hábiles.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          {/* Right: Company Info + Map */}
          <div className="flex flex-col gap-8">
            {/* Company Info */}
            <div>
              <h2 className="text-xl font-semibold">Información de contacto</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                También puedes comunicarte con nosotros directamente.
              </p>

              <ul className="mt-6 space-y-5">
                {INFO_ITEMS.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="mt-0.5 text-sm font-medium hover:text-primary hover:underline underline-offset-4 transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map Placeholder */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Ubicación
              </h3>
              <div className="mt-3 flex h-56 items-center justify-center rounded-xl border border-border bg-muted/40">
                <div className="text-center">
                  <MapPin className="mx-auto h-8 w-8 text-muted-foreground/50" />
                  <p className="mt-2 text-sm font-medium text-muted-foreground">
                    Mapa
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/70">
                    {siteConfig.contact.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Redes sociales
              </h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {Object.entries(siteConfig.social).map(([network, url]) => (
                  <a
                    key={network}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-border px-3 py-1.5 text-sm capitalize transition-colors hover:bg-muted"
                  >
                    {network}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
