import Hero from "@/components/Hero";
import WhatIsPNC from "@/components/WhatIsPNC";
import Requirements from "@/components/Requirements";
import Simulator from "@/components/Simulator";
import Benefits from "@/components/Benefits";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulador de Pensión No Contributiva 2026 - Calcula tu Elegibilidad Gratis",
  description: "✓ Simulador oficial de Pensión No Contributiva en España 2026. Calcula en 2 minutos si cumples requisitos para jubilación o invalidez no contributiva. Gratuito, privado y basado en la ley vigente. Cuantía actual: 628,80€/mes.",
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

