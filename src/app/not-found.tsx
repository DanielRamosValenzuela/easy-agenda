import Link from "next/link";
import { CalendarDays, ArrowLeft } from "lucide-react";
import { Button } from "@/shared/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <CalendarDays className="h-16 w-16 text-primary/30" />
      <h1 className="mt-6 text-4xl font-bold tracking-tight">404</h1>
      <p className="mt-2 text-lg text-muted-foreground">
        La página que buscas no existe o fue movida.
      </p>
      <Button asChild className="mt-8 gap-2">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          Volver al Inicio
        </Link>
      </Button>
    </div>
  );
}
