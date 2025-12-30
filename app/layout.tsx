import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import StructuredData from "@/components/StructuredData";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://simuladorpensionnocontributiva.com'),
  title: {
    default: "Simulador Pensión No Contributiva 2026 - Calcula tu Elegibilidad Gratis",
    template: "%s | Simulador Pensión No Contributiva 2026"
  },
  description: "🎯 Simulador Pensión No Contributiva 2026 ✓ Calcula GRATIS si tienes derecho ✓ Resultados inmediatos ✓ Actualizado 2026 ✓ Jubilación e Invalidez ✓ 628,80€/mes ✓ Gestión completa incluida",
  keywords: [
    "simulador pension no contributiva 2026",
    "simulador pensión no contributiva",
    "calculadora pension no contributiva 2026",
    "pension no contributiva 2026",
    "pensión no contributiva",
    "simulador pension no contributiva España",
    "simulador PNC 2026",
    "calcular pension no contributiva 2026",
    "requisitos pension no contributiva 2026",
    "PNC España",
    "simulador pensión",
    "jubilación no contributiva 2026",
    "invalidez no contributiva 2026",
    "cuantía pensión no contributiva 2026",
    "seguridad social",
    "pensión 2026",
    "simulador gratuito pension",
    "calcular elegibilidad pensión",
    "prestación no contributiva",
    "Compromiso Legal"
  ],
  authors: [
    { name: "Compromiso Legal" },
    { name: "Miriam Ruiz Acosta", url: "https://compromisolegal.es" }
  ],
  creator: "Compromiso Legal",
  publisher: "Compromiso Legal",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/favicon-16x16.png',
    apple: '/favicon-16x16.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://simuladorpensionnocontributiva.com",
    siteName: "Simulador Pensión No Contributiva",
    title: "Simulador Pensión No Contributiva 2026 - Calcula Gratis tu Elegibilidad",
    description: "🎯 Simulador oficial Pensión No Contributiva 2026. Descubre en 2 minutos si tienes derecho. Gratuito, privado y actualizado. Cuantía: 628,80€/mes. Gestión completa incluida.",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Simulador Pensión No Contributiva - Compromiso Legal',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@compromisolegal',
    creator: '@compromisolegal',
    title: "Simulador Pensión No Contributiva 2026",
    description: "🎯 Simulador Pensión No Contributiva 2026 ✓ Calcula GRATIS tu elegibilidad ✓ Resultados inmediatos ✓ Actualizado 2026",
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: "https://simuladorpensionnocontributiva.com",
  },
  category: 'Legal Services',
  classification: 'Pension Calculator',
  other: {
    'contact:email': 'info@compromisolegal.es',
    'contact:phone_number': '+34640664875',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <StructuredData />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}

