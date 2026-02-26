import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchPage } from "@/_pages/search";

export const metadata: Metadata = { title: "Resultados" };

export default function Page() {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
}
