import { Quote } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/card";
import { TESTIMONIALS } from "@/entities/testimonial";

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Lo que dicen nuestros clubes
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Más de 500 clubes confían en EasyAgenda para gestionar sus reservas.
          </p>
        </div>

        <div className="reveal mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((testimonial) => (
            <Card key={testimonial.id} className="relative border-border/50 transition-all duration-300 hover:shadow-md">
              <CardContent className="p-6">
                <Quote className="mb-3 h-8 w-8 text-primary/20" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {testimonial.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}, {testimonial.clubName}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
