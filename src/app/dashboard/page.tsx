import type { Metadata } from "next";
import { DashboardPage } from "@/_pages/dashboard";

export const metadata: Metadata = {
  title: "Mi Panel",
  description:
    "Gestiona tus reservas de canchas deportivas desde tu panel personal en EasyAgenda.",
};

export default function DashboardRoutePage() {
  return <DashboardPage />;
}
