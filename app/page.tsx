import Hero from "@/components/Hero";
import WhatIsPNC from "@/components/WhatIsPNC";
import Requirements from "@/components/Requirements";
import Simulator from "@/components/Simulator";
import Benefits from "@/components/Benefits";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulador Pensión No Contributiva 2026 - Calcula Gratis tu Elegibilidad Online",
  description: "🎯 SIMULADOR PENSIÓN NO CONTRIBUTIVA 2026 ✓ Calcula GRATIS en 2 minutos ✓ Jubilación e Invalidez ✓ Actualizado 2026 ✓ Cuantía: 628,80€/mes ✓ Gestión completa incluida ✓ Resultados inmediatos",
  alternates: {
    canonical: "https://simuladorpensionnocontributiva.com",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <WhatIsPNC />
      <Requirements />
      <Simulator />
      <Benefits />
      <FAQ />
      <Footer />
    </main>
  );
}

