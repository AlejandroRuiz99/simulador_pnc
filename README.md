# Simulador de Pensión No Contributiva

Landing page moderna con simulador interactivo para determinar la elegibilidad para pensiones no contributivas en España.

## 🚀 Características

- ✨ Interfaz moderna con animaciones fluidas (Framer Motion)
- 📱 Diseño responsive (mobile-first)
- 🎨 Tema negro y dorado alineado con Compromiso Legal
- 🧮 Simulador paso a paso intuitivo
- 📊 Cálculo preciso basado en la legislación española 2026
- 💬 Botón flotante de WhatsApp
- ♿ Accesible (WCAG 2.1)
- 🚀 Optimizado para Vercel

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Deploy**: Vercel

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone <tu-repositorio>
cd simulador_contributivas
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## 📁 Estructura del Proyecto

```
simulador_contributivas/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx             # Página principal
│   └── globals.css          # Estilos globales
├── components/
│   ├── Hero.tsx             # Sección hero
│   ├── WhatIsPNC.tsx        # Qué es una PNC
│   ├── Requirements.tsx     # Requisitos
│   ├── Simulator.tsx        # Simulador paso a paso
│   ├── Benefits.tsx         # Beneficios
│   ├── FAQ.tsx              # Preguntas frecuentes
│   ├── Footer.tsx           # Pie de página
│   └── WhatsAppButton.tsx   # Botón flotante WhatsApp
├── lib/
│   └── calculator.ts        # Lógica de cálculo
├── types/
│   └── simulator.ts         # Tipos TypeScript
├── public/
│   └── complete_logo.png    # Logo de Compromiso Legal
└── package.json
```

## 🎨 Personalización

### Colores

Los colores principales están definidos en `tailwind.config.ts`:
- **Negro**: #000000
- **Dorado**: #FFD700

### WhatsApp

Actualiza el número de WhatsApp en `components/WhatsAppButton.tsx`:
```typescript
const whatsappNumber = '34123456789'; // Reemplazar con el número real
```

### Logo

Coloca tu logo en `public/complete_logo.png`

## 📊 Datos Legales (2026)

Los parámetros de cálculo están en `types/simulator.ts`:

- **Cuantía íntegra**: 7.250,60€/año (517,90€/mes × 14 pagas)
- **Límite ingresos individual**: 7.250,60€/año
- **Límites familiares**: Varían según número de convivientes
- **Edad jubilación**: 65 años o más
- **Edad invalidez**: 18-65 años
- **Grado discapacidad mínimo**: 65%

### Actualizar Datos

Para actualizar las cuantías y límites, modifica `PARAMETROS_2026` en `types/simulator.ts`.

## 🚀 Deploy en Vercel

1. Sube tu código a GitHub

2. Importa el proyecto en [Vercel](https://vercel.com):
   - New Project
   - Importa tu repositorio
   - Configura las variables de entorno (si las hay)
   - Deploy

3. Configura tu dominio personalizado en Vercel Settings

## 📱 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run start    # Inicia el servidor de producción
npm run lint     # Ejecuta el linter
```

## ♿ Accesibilidad

El proyecto cumple con WCAG 2.1 nivel AA:
- Navegación por teclado completa
- Contraste de colores adecuado
- Textos alternativos en imágenes
- Estructura semántica HTML5
- ARIA labels en elementos interactivos

## 📄 Aviso Legal

Este simulador tiene carácter meramente orientativo. Los resultados no constituyen un documento oficial ni garantizan el reconocimiento del derecho a la prestación. Los datos introducidos no se almacenan ni se transmiten a ningún servidor.

## 🔗 Enlaces Útiles

- [Seguridad Social](https://www.seg-social.es)
- [Sede Electrónica](https://sede.seg-social.gob.es)
- [Compromiso Legal](https://compromisolegal.com)

## 👥 Créditos

Desarrollado para **Compromiso Legal**  
© 2026 Todos los derechos reservados

## 📝 Licencia

Propiedad de Compromiso Legal. Todos los derechos reservados.

