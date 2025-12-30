# Guía de Despliegue en Vercel

## 🚀 Pasos para Desplegar

### 1. Preparar el Repositorio

```bash
# Inicializa Git (si no lo has hecho)
git init

# Añade todos los archivos
git add .

# Crea el primer commit
git commit -m "Initial commit: Simulador de Pensión No Contributiva"

# Crea un repositorio en GitHub y súbelo
git remote add origin <tu-repositorio-github>
git branch -M main
git push -u origin main
```

### 2. Configurar Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Click en "Add New..." → "Project"
3. Importa tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto Next.js

### 3. Configuración del Proyecto

**Framework Preset**: Next.js (detectado automáticamente)

**Build Command**: 
```bash
npm run build
```

**Output Directory**: 
```
.next
```

**Install Command**: 
```bash
npm install
```

### 4. Variables de Entorno (Opcional)

Si quieres personalizar valores sin modificar el código:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=34123456789
NEXT_PUBLIC_COMPROMISO_LEGAL_URL=https://compromisolegal.com
```

### 5. Despliegue

1. Click en "Deploy"
2. Espera unos 2-3 minutos
3. ¡Tu sitio estará en línea!

### 6. Dominio Personalizado

1. Ve a tu proyecto en Vercel
2. Settings → Domains
3. Añade tu dominio personalizado
4. Configura los DNS según las instrucciones de Vercel

## 📝 Configuración DNS

Para un dominio personalizado, añade estos registros DNS:

**Para dominio raíz (ejemplo.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**Para subdominios (www.ejemplo.com):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 🔄 Actualizaciones Automáticas

Una vez configurado:
- Cada push a `main` desplegará automáticamente
- Los pull requests crearán previews automáticas
- Rollback fácil desde el dashboard de Vercel

## 🎨 Personalización Post-Despliegue

### Actualizar Número de WhatsApp

Edita `components/WhatsAppButton.tsx`:
```typescript
const whatsappNumber = '34TU_NUMERO_AQUI';
```

### Actualizar Cuantías (Cada Año)

Edita `types/simulator.ts` → `PARAMETROS_2026`:
```typescript
export const PARAMETROS_2026 = {
  cuantiaIntegra: {
    anual: 8803.2,  // ← Actualizar aquí
    mensual: 628.80,  // ← Y aquí
    pagas: 14,
  },
  // ...
}
```

## 🐛 Troubleshooting

### Error: "Module not found"
```bash
npm install
npm run build
```

### Error: "Image optimization"
Vercel optimiza imágenes automáticamente, no necesitas configuración adicional.

### Error en Build
Verifica en el log de Vercel y asegúrate de que localmente funciona:
```bash
npm run build
npm run start
```

## 📊 Analytics (Opcional)

Habilita Vercel Analytics (gratuito) en:
Settings → Analytics → Enable

## 🔒 Seguridad

Headers de seguridad están configurados en `vercel.json`:
- X-Content-Type-Options
- X-Frame-Options  
- X-XSS-Protection

## ✅ Checklist Pre-Despliegue

- [ ] Logo correcto en `public/complete_logo.png`
- [ ] Número de WhatsApp actualizado
- [ ] Build local exitoso (`npm run build`)
- [ ] Sin errores de TypeScript
- [ ] Repositorio en GitHub
- [ ] Cuenta de Vercel creada

## 🎉 ¡Listo!

Tu simulador estará disponible en:
- URL de Vercel: `https://tu-proyecto.vercel.app`
- Dominio personalizado: `https://tu-dominio.com`

---

**Necesitas ayuda?** Consulta la [documentación de Vercel](https://vercel.com/docs)

