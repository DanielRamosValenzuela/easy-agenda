import { User } from "lucide-react";
import { Separator } from "@/shared/ui/separator";
import { BOOKINGS } from "@/entities/booking";
import { DashboardOverview } from "@/widgets/dashboard-overview";

// Simulated authenticated user
const CURRENT_USER = {
  name: "Carlos",
  email: "carlos@email.com",
};

export function DashboardPage() {
  return (
    <div className="py-10 sm:py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Hola, {CURRENT_USER.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              Aquí encontrarás un resumen de tus reservas.
            </p>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Dashboard Content */}
        <DashboardOverview bookings={BOOKINGS} />
      </div>
    </div>
  );
}
