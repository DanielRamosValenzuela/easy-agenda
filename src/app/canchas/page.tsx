import { Suspense } from "react";
import type { Metadata } from "next";
import { CourtsPage } from "@/_pages/courts";

export const metadata: Metadata = { title: "Canchas" };

export default function Page() {
  return (
    <Suspense>
      <CourtsPage />
    </Suspense>
  );
}
