# 📞 Datos de Contacto - Compromiso Legal

## ✅ Información Actualizada

### Contacto Principal
- **📧 Email**: info@compromisolegal.es
- **📱 Teléfono/WhatsApp**: +34 640 664 875
- **🌐 Sitio Web**: https://compromisolegal.es

### Dirección
**C/Manzanares 35, A**  
Bolaños de Calatrava, Ciudad Real  
C.P: 13260

### Horario de Atención
**Lunes a Jueves**  
9:00 – 14:00 | 16:30 – 18:30

**Viernes**  
9:00 – 14:00

_Se requiere cita previa (presencial u online)_

---

## 🔧 Dónde Están Configurados en el Código

### WhatsApp Button
**Archivo**: `components/WhatsAppButton.tsx`  
**Línea**: 10  
```typescript
const whatsappNumber = '34640664875';
```

### Footer
**Archivo**: `components/Footer.tsx`  
**Líneas**: 48-76  
- Email: info@compromisolegal.es (con mailto)
- Teléfono: +34 640 664 875 (con tel)
- Web: https://compromisolegal.es

### Enlaces de Redirección
Todos los botones CTA y enlaces apuntan a: `https://compromisolegal.es`

**Componentes con enlaces**:
- `components/Hero.tsx` (logo y botones)
- `components/Simulator.tsx` (botón de resultados)
- `components/FAQ.tsx` (CTA al final)
- `components/Footer.tsx` (múltiples enlaces)

---

## 📊 Integración Completa

### Botón Flotante de WhatsApp
- ✅ Número correcto configurado
- ✅ Mensaje predeterminado personalizado
- ✅ Tooltip informativo
- ✅ Animaciones y efectos

### Mensaje de WhatsApp
Cuando el usuario hace clic, se abre WhatsApp con:
```
Hola, vengo del simulador de pensión no contributiva 
y necesito asesoramiento.
```

### Footer Completo
- ✅ Email clickeable (abre cliente de correo)
- ✅ Teléfono clickeable (inicia llamada)
- ✅ Web clickeable (abre en nueva pestaña)
- ✅ Información Seguridad Social (referencia)

---

## 🌐 Redes Sociales de Compromiso Legal

Según la web oficial (compromisolegal.es):
- **WhatsApp**: Integrado en el simulador
- **TikTok**: @compromisolegal (Miriam Ruiz Acosta)
- **Instagram**: @compromisolegal
- **Telegram**: Canal de Compromiso Legal

_Nota: Los enlaces específicos de redes sociales no están integrados en el simulador actual, pero pueden añadirse fácilmente al Footer si se desea._

---

## 👥 Equipo Mencionado en la Web

### Miriam Ruiz Acosta
Abogada especializada en Seguridad Social y Extranjería

### Aristea Olmedo
Graduada Social especializada en Seguridad Social y Derecho Laboral

---

## 📝 Notas Importantes

### Ingresos en el Simulador
Se ha especificado que deben ser **ingresos NETOS** (después de impuestos):
- Paso 4: Ingresos personales NETOS
- Paso 5: Ingresos familiares NETOS
- Con advertencias visuales en dorado

### Aclaraciones Legales
- Límite ingresos: 7.250,60€ anuales
- Cuantía pensión: 517,90€/mes (2025)
- Datos basados en legislación española vigente

---

## 🔄 Si Necesitas Actualizar

### Cambiar Número de WhatsApp
1. Edita `components/WhatsAppButton.tsx`
2. Cambia la línea: `const whatsappNumber = '34NUEVO';`
3. Guarda y haz build

### Cambiar Email
1. Edita `components/Footer.tsx`
2. Busca: `info@compromisolegal.es`
3. Reemplaza por el nuevo email

### Cambiar Dominio
1. Buscar y reemplazar en todo el proyecto:
   - De: `compromisolegal.es`
   - A: `tunuevodominio.com`
2. Archivos afectados: Hero, Simulator, FAQ, Footer

---

✅ **Todos los datos de contacto están correctamente configurados y listos para producción.**

