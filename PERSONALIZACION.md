# 🎨 Guía de Personalización

## 📞 Actualizar Número de WhatsApp

### Ubicación
`components/WhatsAppButton.tsx` - Línea 10

### Cambio Necesario
```typescript
// Número correcto ya configurado:
const whatsappNumber = '34640664875'; // Compromiso Legal

// Si necesitas cambiarlo en el futuro:
const whatsappNumber = '34TUNUMERO'; // Sin espacios ni guiones
```

### Formato del Número
- ✅ Correcto: `34612345678` (código país + número)
- ❌ Incorrecto: `+34 612 34 56 78`
- ❌ Incorrecto: `612345678` (falta código país)

### Mensaje Predeterminado
Si quieres cambiar el mensaje que se envía:
```typescript
const message = encodeURIComponent('Tu mensaje personalizado aquí');
```

---

## 🎨 Colores y Branding

### Colores Principales
`tailwind.config.ts` - Líneas 16-28

```typescript
colors: {
  gold: {
    DEFAULT: '#FFD700', // ← Cambia el dorado principal
  },
}
```

### Variables CSS
`app/globals.css` - Líneas 3-7

```css
:root {
  --background: #000000;  /* Negro de fondo */
  --foreground: #ffffff;  /* Texto blanco */
  --gold: #FFD700;        /* Dorado principal */
  --gold-dark: #B8860B;   /* Dorado oscuro */
}
```

---

## 🖼️ Logo

### Reemplazar Logo
1. Coloca tu logo en `public/` con el nombre `complete_logo.png`
2. Formato recomendado: PNG con fondo transparente
3. Tamaño sugerido: 400x160px (máximo)

### Si Cambias el Nombre del Archivo
Actualiza en:
- `components/Hero.tsx` - Línea 48
- `components/Footer.tsx` - Línea 10

```typescript
<Image
  src="/tu-logo.png"  // ← Cambia aquí
  alt="Tu Empresa"
  width={200}
  height={80}
/>
```

---

## 🔗 Enlaces a Compromiso Legal

### Hero Section
`components/Hero.tsx` - Línea 45
```typescript
<Link href="https://compromisolegal.com" target="_blank">
```

### Botón de Resultados
`components/Simulator.tsx` - Línea 656
```typescript
<Link href="https://compromisolegal.com" target="_blank">
```

### FAQ
`components/FAQ.tsx` - Línea 190
```typescript
<a href="https://compromisolegal.com" target="_blank">
```

### Footer
`components/Footer.tsx` - Líneas múltiples con enlaces

**Si tienes un dominio diferente**, busca y reemplaza en todos los archivos:
```bash
# En VS Code: Ctrl+Shift+H (Windows) o Cmd+Shift+H (Mac)
Buscar: compromisolegal.es
Reemplazar: tudominio.com
```

---

## 💰 Actualizar Cuantías (Anualmente)

### Ubicación
`types/simulator.ts` - Líneas 40-60

### Parámetros a Actualizar
```typescript
export const PARAMETROS_2026 = {
  cuantiaIntegra: {
    anual: 7250.60,    // ← Nueva cuantía anual
    mensual: 517.90,   // ← Nueva cuantía mensual
    pagas: 14,         // ← Número de pagas
  },
  cuantiaMinima: {
    anual: 1812.65,    // ← Cuantía mínima
  },
  limitesIngresos: {
    individual: 7250.60,  // ← Límite individual
    familiar: {
      2: 12326.02,        // ← 2 personas
      3: 17401.44,        // ← 3 personas
      4: 22476.86,        // ← 4 personas
      5: 27552.28,        // ← 5+ personas
    },
    conyugeAmbosRequisitos: 23551.53, // ← Caso especial
  },
  // Requisitos legales (cambiar solo si cambia la ley)
  requisitos: {
    jubilacion: {
      edadMinima: 65,
      anosResidencia: 10,
      anosConsecutivos: 2,
    },
    invalidez: {
      edadMinima: 18,
      edadMaxima: 64,
      gradoDiscapacidadMinimo: 65,
      anosResidencia: 5,
      anosConsecutivos: 2,
    },
  },
};
```

### ⚠️ Importante
Después de actualizar, cambia el nombre de la constante:
```typescript
// Si actualizas para 2026
export const PARAMETROS_2026 = { /* ... */ }
```

Y actualiza la importación en `lib/calculator.ts`:
```typescript
import { PARAMETROS_2026 } from '@/types/simulator';
```

---

## 📝 Textos y Contenido

### Título Principal
`components/Hero.tsx` - Líneas 40-46

```typescript
<h1>
  ¿Tienes derecho a una{' '}
  <span className="gold-text-gradient">
    Tu Título Personalizado
  </span>?
</h1>
```

### Subtítulos y Descripciones
Busca y modifica en cada componente:
- `Hero.tsx` - Subtítulo hero
- `WhatIsPNC.tsx` - Explicación de PNC
- `Requirements.tsx` - Requisitos
- `Benefits.tsx` - Beneficios
- `FAQ.tsx` - Preguntas frecuentes

---

## 🌐 Metadatos SEO

### Ubicación
`app/layout.tsx` - Líneas 8-16

```typescript
export const metadata: Metadata = {
  title: "Tu Título SEO",
  description: "Tu descripción SEO",
  keywords: ["palabra1", "palabra2"],
  // ...
};
```

---

## 📱 FAQ - Preguntas Frecuentes

### Ubicación
`components/FAQ.tsx` - Líneas 10-92

### Formato
```typescript
{
  question: '¿Tu pregunta?',
  answer: 'Tu respuesta detallada aquí.',
},
```

### Añadir/Quitar Preguntas
Simplemente edita el array `faqs`:
- Añade: Copia un objeto existente y modifica
- Quita: Elimina el objeto completo

---

## 🎭 Animaciones

### Velocidad de Animaciones
`tailwind.config.ts` - Personaliza duraciones

### Desactivar Animaciones (Opcional)
En cada componente, comenta las líneas de `motion`:
```typescript
// motion.div -> div
// initial={{ ... }}
// animate={{ ... }}
```

---

## 📊 Analytics (Opcional)

### Google Analytics
1. Crea una cuenta en [Google Analytics](https://analytics.google.com)
2. Obtén tu ID (ej: G-XXXXXXXXXX)
3. Añade a `app/layout.tsx`:

```typescript
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
```

### Vercel Analytics
En el dashboard de Vercel:
Settings → Analytics → Enable

---

## 🔒 Disclaimer Legal

### Ubicación
`components/Footer.tsx` - Líneas 77-95

Personaliza el texto según tus necesidades legales.

---

## ✅ Checklist de Personalización

### Esencial
- [ ] Número de WhatsApp actualizado
- [ ] Logo reemplazado
- [ ] Enlaces a tu dominio
- [ ] Metadatos SEO personalizados

### Recomendado
- [ ] Colores ajustados (si necesario)
- [ ] Textos adaptados a tu marca
- [ ] FAQ personalizado
- [ ] Disclaimer legal revisado

### Opcional
- [ ] Analytics configurado
- [ ] Animaciones ajustadas
- [ ] Preguntas FAQ expandidas

---

## 🚀 Después de Personalizar

1. **Probar localmente**:
```bash
npm run dev
```

2. **Verificar build**:
```bash
npm run build
```

3. **Desplegar**:
```bash
git add .
git commit -m "Personalización completada"
git push
```

4. Vercel desplegará automáticamente

---

## 💡 Consejos

1. **Hace cambios graduales**: Personaliza una cosa a la vez
2. **Prueba siempre localmente**: Antes de desplegar
3. **Guarda backups**: Haz commits frecuentes en Git
4. **Documenta cambios**: Añade comentarios en el código

---

¿Necesitas más ayuda? Consulta los otros archivos .md del proyecto.

