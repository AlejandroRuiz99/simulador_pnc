# 🚀 Inicio Rápido - Simulador Pensión No Contributiva

## ⚡ En 3 pasos

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar servidor de desarrollo
```bash
npm run dev
```

### 3. Abrir navegador
Abre [http://localhost:3000](http://localhost:3000)

---

## 🎨 Personalización Esencial

### ✅ Número de WhatsApp ya Configurado

El número de WhatsApp ya está actualizado a: **+34 640 664 875**

Si necesitas cambiarlo, edita `components/WhatsAppButton.tsx` (línea 10)

### 💰 Actualizar Cuantías (Anualment)

Edita `types/simulator.ts` (líneas 40-60):
```typescript
export const PARAMETROS_2026 = {
  cuantiaIntegra: {
    anual: 7250.60,  // ← Nueva cuantía anual
    mensual: 517.90, // ← Nueva cuantía mensual
    pagas: 14,
  },
  // ...
}
```

---

## 📋 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar producción local
npm run start

# Linter
npm run lint
```

---

## 🌐 Desplegar en Vercel

### Opción 1: Desde GitHub
1. Sube tu código a GitHub
2. Importa en [vercel.com](https://vercel.com)
3. Click "Deploy"
4. ¡Listo!

### Opción 2: CLI
```bash
# Instala Vercel CLI
npm i -g vercel

# Despliega
vercel
```

---

## 🎯 Estructura del Proyecto

```
simulador_contributivas/
├── app/
│   ├── layout.tsx          # Layout con WhatsApp button
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos tema negro/dorado
├── components/
│   ├── Hero.tsx            # Sección principal
│   ├── Simulator.tsx       # 🎯 Simulador paso a paso
│   ├── FAQ.tsx             # Preguntas frecuentes
│   └── ...
├── lib/
│   └── calculator.ts       # Lógica de cálculo
├── types/
│   └── simulator.ts        # Parámetros legales 2025
└── public/
    └── complete_logo.png   # Logo Compromiso Legal
```

---

## ✅ Checklist Pre-Deploy

- [ ] Logo actualizado en `public/complete_logo.png`
- [ ] Número WhatsApp correcto
- [ ] Build exitoso (`npm run build`)
- [ ] Probado en localhost
- [ ] Código en GitHub
- [ ] Desplegado en Vercel

---

## 🆘 Soporte

**Build falla?**
```bash
rm -rf node_modules .next
npm install
npm run build
```

**Imágenes no cargan?**
- Verifica que estén en `public/`
- Usa `/nombre-imagen.png` en el código

**Más ayuda?**
- Ver `README.md` completo
- Ver `DEPLOY.md` para despliegue
- Documentación Next.js: [nextjs.org/docs](https://nextjs.org/docs)

---

¡Tu simulador está listo! 🎉

