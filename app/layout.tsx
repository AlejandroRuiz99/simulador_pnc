import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import StructuredData from "@/components/StructuredData";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://tu-dominio.vercel.app'), // Cambiar por tu dominio real
  title: {
    default: "Simulador de Pensión No Contributiva 2026 | Compromiso Legal",
    template: "%s | Compromiso Legal"
  },
  description: "✓ Simulador gratuito de Pensión No Contributiva en España 2026. Calcula si tienes derecho a jubilación o invalidez no contributiva. Resultados inmediatos basados en la ley vigente. 628,80€/mes.",
  keywords: [
    "pensión no contributiva",
    "PNC España",
    "simulador pensión",
    "jubilación no contributiva",
    "invalidez no contributiva",
    "seguridad social",
    "pensión 2026",
    "requisitos pensión",
    "calcular pensión",
    "ayuda jubilación",
    "prestación no contributiva",
    "Compromiso Legal",
    "abogados seguridad social",
    "asesoría pensiones"
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
    url: "https://tu-dominio.vercel.app",
    siteName: "Simulador Pensión No Contributiva",
    title: "Simulador de Pensión No Contributiva 2026 - Calcula tu Elegibilidad",
    description: "Descubre en minutos si tienes derecho a una pensión no contributiva en España. Simulador gratuito, privado y actualizado a 2026. Cuantía: 628,80€/mes.",
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
    title: "Simulador de Pensión No Contributiva 2026",
    description: "✓ Calcula si tienes derecho a una pensión no contributiva en España. Gratuito, privado y actualizado. 628,80€/mes",
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: "https://tu-dominio.vercel.app",
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

