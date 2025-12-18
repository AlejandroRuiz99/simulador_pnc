# Plan de Desarrollo: Landing Web con Simulador de Pensión No Contributiva en España

## 📋 Resumen Ejecutivo

Desarrollo de una landing page moderna con un simulador interactivo que permita a cualquier ciudadano en España determinar si cumple los requisitos para acceder a una **Pensión No Contributiva (PNC)** según la legislación española vigente en 2025.

---

## 🎯 Objetivo Principal

Crear una herramienta accesible, intuitiva y precisa que:
- Evalúe la elegibilidad para pensiones no contributivas (jubilación e invalidez)
- Proporcione resultados claros y comprensibles
- Estime la cuantía aproximada de la pensión
- Informe sobre los pasos siguientes para solicitar la prestación

---

## 📚 Marco Legal y Requisitos (Actualizado 2025)

### Tipos de Pensiones No Contributivas

#### 1. **Pensión de Jubilación No Contributiva**
**Requisitos:**
- ✅ **Edad:** 65 años o más
- ✅ **Residencia:** Haber residido en España durante al menos 10 años entre los 16 años y la edad de devengo, de los cuales 2 deben ser consecutivos e inmediatamente anteriores a la solicitud
- ✅ **Ingresos:** Carecer de ingresos suficientes

#### 2. **Pensión de Invalidez No Contributiva**
**Requisitos:**
- ✅ **Edad:** Entre 18 y 65 años
- ✅ **Grado de discapacidad:** Igual o superior al 65%
- ✅ **Residencia:** Haber residido en España durante al menos 5 años, de los cuales 2 deben ser consecutivos e inmediatamente anteriores a la solicitud
- ✅ **Ingresos:** Carecer de ingresos suficientes

### Límites de Ingresos 2025

| Situación | Límite de ingresos anuales |
|-----------|---------------------------|
| **Individual** | 7.250,60 € |
| **Unidad familiar de 2 personas** | 12.326,02 € |
| **Unidad familiar de 3 personas** | 17.401,44 € |
| **Unidad familiar de 4 personas** | 22.476,86 € |
| **Unidad familiar de 5 o más personas** | 27.552,28 € |

**Notas importantes:**
- Si convive solo con cónyuge/pareja: límite de 23.551,53 € (si ambos cumplen requisitos excepto ingresos)
- Los ingresos se calculan sumando todos los ingresos de la unidad de convivencia

### Cuantía de la Pensión 2025

- **Cuantía íntegra:** 7.250,60 € anuales (517,90 €/mes × 14 pagas)
- **Cuantía mínima:** 1.812,65 € anuales (cuando hay convivientes con rentas)
- La cuantía puede variar según los ingresos de la unidad familiar

---

## 🏗️ Estructura del Proyecto

```
simulador-pension-nc/
├── index.html              # Landing page principal
├── simulador.html          # Página del simulador
├── resultados.html         # Página de resultados (opcional, puede ser modal)
├── css/
│   ├── styles.css          # Estilos principales
│   ├── simulador.css       # Estilos del simulador
│   └── responsive.css      # Media queries
├── js/
│   ├── simulador.js        # Lógica principal del simulador
│   ├── calculos.js         # Funciones de cálculo de elegibilidad
│   ├── validaciones.js     # Validación de formularios
│   └── utils.js            # Utilidades generales
├── assets/
│   ├── images/             # Imágenes y iconos
│   └── fonts/              # Fuentes personalizadas
├── data/
│   └── parametros.json     # Parámetros actualizables (límites, cuantías)
├── docs/
│   ├── referencias.md      # Referencias legales
│   └── metodologia.md      # Metodología de cálculo
└── README.md               # Documentación del proyecto
```

---

## 🎨 Diseño de la Landing Page

### Secciones Principales

#### 1. **Hero Section**
- Título impactante: "¿Tienes derecho a una Pensión No Contributiva?"
- Subtítulo explicativo
- CTA principal: "Calcular mi elegibilidad" (botón destacado)
- Imagen/ilustración moderna relacionada con pensiones

#### 2. **¿Qué es una Pensión No Contributiva?**
- Explicación clara y sencilla
- Diferencia entre contributiva y no contributiva
- Tipos: Jubilación e Invalidez
- Iconos ilustrativos

#### 3. **¿Quién puede acceder?**
- Tarjetas con requisitos principales:
  - Edad y residencia
  - Situación económica
  - Grado de discapacidad (para invalidez)

#### 4. **Simulador (Área principal)**
- Formulario interactivo paso a paso
- Barra de progreso
- Validación en tiempo real
- Diseño limpio y moderno

#### 5. **Beneficios**
- Cuantía actual
- Complementos disponibles
- Prestaciones adicionales

#### 6. **Preguntas Frecuentes (FAQ)**
- Acordeón con preguntas comunes
- Respuestas claras y concisas

#### 7. **Recursos Adicionales**
- Enlaces a:
  - INSS (Instituto Nacional de la Seguridad Social)
  - Ministerio de Inclusión, Seguridad Social y Migraciones
  - Oficinas de la Seguridad Social
  - Teléfonos de información

#### 8. **Footer**
- Aviso legal
- Política de privacidad (RGPD)
- Disclaimer sobre el carácter orientativo del simulador
- Contacto

---

## 🔧 Funcionalidades del Simulador

### Flujo del Usuario

```
Inicio
  ↓
Tipo de pensión (Jubilación/Invalidez)
  ↓
Datos personales básicos
  ↓
Situación de residencia
  ↓
Datos de ingresos
  ↓
Unidad de convivencia
  ↓
Cálculo y Resultados
  ↓
Información sobre próximos pasos
```

### Formulario Paso a Paso

#### **Paso 1: Tipo de Pensión**
```
□ Pensión de Jubilación No Contributiva
□ Pensión de Invalidez No Contributiva
```

#### **Paso 2: Datos Personales**
- Fecha de nacimiento (para calcular edad)
- Nacionalidad / Situación legal en España
- ¿Tiene certificado de discapacidad? (si es invalidez)
  - Grado de discapacidad (%)

#### **Paso 3: Residencia**
- ¿Cuántos años lleva residiendo en España?
- ¿Ha residido los últimos 2 años de forma consecutiva en España?
- Para jubilación: ¿Ha residido al menos 10 años entre los 16 años y la actualidad?
- Para invalidez: ¿Ha residido al menos 5 años?

#### **Paso 4: Situación Económica Personal**
- Ingresos anuales personales (€)
  - Pensiones
  - Salarios
  - Rentas
  - Otros ingresos

#### **Paso 5: Unidad de Convivencia**
- ¿Vive solo/a?
- Si no: ¿Con quién convive?
  - □ Cónyuge/pareja de hecho
  - □ Hijos menores de 25 años
  - □ Hijos mayores de 25 años con discapacidad ≥65%
  - □ Padres/hermanos/otros familiares
- Número total de personas en la unidad familiar
- Ingresos totales de la unidad familiar (€/año)

#### **Paso 6: Resultados**

**Pantalla de resultados con 3 posibles escenarios:**

1. **✅ CUMPLE TODOS LOS REQUISITOS**
   ```
   ¡Buenas noticias!
   Según los datos proporcionados, cumples los requisitos para solicitar
   una Pensión No Contributiva de [Jubilación/Invalidez].
   
   Cuantía estimada: XXX,XX € mensuales (aproximadamente)
   
   Próximos pasos:
   - Solicitar cita en tu oficina de la Seguridad Social
   - Preparar documentación necesaria
   - Presentar solicitud
   
   [Botón: Ver documentación necesaria]
   [Botón: Solicitar cita previa INSS]
   ```

2. **⚠️ CUMPLE PARCIALMENTE**
   ```
   Según los datos proporcionados, cumples algunos requisitos pero
   necesitas cumplir los siguientes:
   
   ❌ [Requisito no cumplido 1]
   ❌ [Requisito no cumplido 2]
   
   Recomendaciones:
   - [Consejo específico]
   - Te recomendamos consultar con un trabajador social
   
   [Botón: Encontrar oficina de servicios sociales]
   ```

3. **❌ NO CUMPLE LOS REQUISITOS**
   ```
   Según los datos proporcionados, actualmente no cumples los requisitos
   para acceder a una Pensión No Contributiva porque:
   
   ❌ [Razón específica]
   
   Otras ayudas que podrías solicitar:
   - Renta Mínima de Inserción (según CCAA)
   - Prestaciones por discapacidad
   - Ayudas de emergencia social
   
   [Botón: Ver otras ayudas disponibles]
   ```

---

## 💻 Tecnologías Propuestas

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: 
  - Variables CSS para theming
  - Flexbox/Grid para layouts
  - Animaciones suaves
- **JavaScript (ES6+)**:
  - Vanilla JS o framework ligero (Vue.js/React)
  - Validación de formularios
  - Lógica de cálculo

### Librerías Recomendadas
- **Formularios**: 
  - Alpine.js (ligero) o Vue.js
  - Validación: Joi o Yup
- **UI/UX**:
  - TailwindCSS o Bootstrap 5
  - Font Awesome (iconos)
  - Animate.css (animaciones)
- **Gráficos** (opcional):
  - Chart.js para visualizar datos

### Hosting Sugerido
- **GitHub Pages**: Gratuito, fácil deploy
- **Netlify/Vercel**: CI/CD automático
- **Cloudflare Pages**: Rápido y seguro

---

## 🧮 Lógica de Cálculo

### Algoritmo de Elegibilidad

```javascript
function evaluarElegibilidad(datosUsuario) {
  let resultado = {
    elegible: false,
    requisitos: {
      edad: false,
      residencia: false,
      ingresos: false,
      discapacidad: false // solo para invalidez
    },
    cuantiaEstimada: 0,
    mensajes: []
  };
  
  // 1. Verificar tipo de pensión
  if (datosUsuario.tipo === 'jubilacion') {
    // Verificar edad >= 65
    resultado.requisitos.edad = datosUsuario.edad >= 65;
    
    // Verificar residencia (10 años, 2 consecutivos)
    resultado.requisitos.residencia = 
      datosUsuario.anosResidencia >= 10 &&
      datosUsuario.ultimosDosAnosConsecutivos === true;
      
  } else if (datosUsuario.tipo === 'invalidez') {
    // Verificar edad 18-65
    resultado.requisitos.edad = 
      datosUsuario.edad >= 18 && datosUsuario.edad < 65;
    
    // Verificar grado discapacidad >= 65%
    resultado.requisitos.discapacidad = 
      datosUsuario.gradoDiscapacidad >= 65;
    
    // Verificar residencia (5 años, 2 consecutivos)
    resultado.requisitos.residencia = 
      datosUsuario.anosResidencia >= 5 &&
      datosUsuario.ultimosDosAnosConsecutivos === true;
  }
  
  // 2. Verificar límite de ingresos
  const limiteIngresos = calcularLimiteIngresos(
    datosUsuario.unidadFamiliar
  );
  
  resultado.requisitos.ingresos = 
    datosUsuario.ingresosUnidadFamiliar <= limiteIngresos;
  
  // 3. Determinar elegibilidad
  resultado.elegible = Object.values(resultado.requisitos)
    .every(req => req === true);
  
  // 4. Calcular cuantía estimada
  if (resultado.elegible) {
    resultado.cuantiaEstimada = calcularCuantia(
      datosUsuario.ingresosPersonales,
      datosUsuario.ingresosUnidadFamiliar,
      datosUsuario.numeroConvivientes
    );
  }
  
  return resultado;
}
```

### Cálculo de Cuantía

```javascript
function calcularCuantia(ingresosPersonales, ingresosFamiliares, numConvivientes) {
  const CUANTIA_INTEGRA_ANUAL = 7250.60;
  const CUANTIA_MENSUAL = 517.90; // 14 pagas
  
  // Si no tiene ingresos ni convivientes
  if (ingresosPersonales === 0 && numConvivientes === 1) {
    return CUANTIA_MENSUAL;
  }
  
  // Calcular según fórmula oficial
  // (Simplificado - la fórmula real es más compleja)
  const cuantiaAnual = CUANTIA_INTEGRA_ANUAL - ingresosPersonales;
  const cuantiaMensual = cuantiaAnual / 14;
  
  // Mínimo garantizado
  const CUANTIA_MINIMA_ANUAL = 1812.65;
  if (cuantiaAnual < CUANTIA_MINIMA_ANUAL) {
    return 0; // No hay derecho si la cuantía sería inferior al mínimo
  }
  
  return Math.max(0, cuantiaMensual);
}
```

---

## 📊 Datos Actualizables

### Archivo `data/parametros.json`

```json
{
  "version": "2025.1",
  "fechaActualizacion": "2025-01-01",
  "parametros": {
    "cuantiaIntegra": {
      "anual": 7250.60,
      "mensual": 517.90,
      "pagas": 14
    },
    "cuantiaMinima": {
      "anual": 1812.65
    },
    "limitesIngresos": {
      "individual": 7250.60,
      "familiar": {
        "2personas": 12326.02,
        "3personas": 17401.44,
        "4personas": 22476.86,
        "5omaspersonas": 27552.28
      },
      "conyugeAmbosRequisitos": 23551.53
    },
    "requisitos": {
      "jubilacion": {
        "edadMinima": 65,
        "anosResidencia": 10,
        "anosConsecutivos": 2
      },
      "invalidez": {
        "edadMinima": 18,
        "edadMaxima": 65,
        "gradoDiscapacidadMinimo": 65,
        "anosResidencia": 5,
        "anosConsecutivos": 2
      }
    }
  }
}
```

---

## ✅ Checklist de Desarrollo

### Fase 1: Investigación y Planificación (Completado)
- [x] Investigar requisitos legales actualizados
- [x] Analizar simuladores existentes (Junta de Andalucía)
- [x] Definir estructura del proyecto
- [x] Crear plan de desarrollo

### Fase 2: Diseño
- [ ] Crear wireframes de la landing page
- [ ] Diseñar mockups de alta fidelidad
- [ ] Definir paleta de colores y tipografía
- [ ] Crear guía de estilo
- [ ] Diseñar flujo del simulador (UX)
- [ ] Revisar accesibilidad (WCAG 2.1)

### Fase 3: Desarrollo Frontend
- [ ] Configurar estructura de archivos
- [ ] Desarrollar HTML de la landing page
- [ ] Implementar estilos CSS responsive
- [ ] Crear componentes del formulario paso a paso
- [ ] Desarrollar lógica JavaScript del simulador
- [ ] Implementar validaciones de formulario
- [ ] Crear sistema de navegación entre pasos
- [ ] Desarrollar página de resultados

### Fase 4: Lógica de Negocio
- [ ] Implementar algoritmo de elegibilidad
- [ ] Desarrollar cálculo de cuantías
- [ ] Crear función de validación de residencia
- [ ] Implementar cálculo de límites de ingresos familiares
- [ ] Añadir manejo de casos especiales
- [ ] Crear sistema de mensajes personalizados

### Fase 5: Testing
- [ ] Pruebas de validación de formularios
- [ ] Pruebas de cálculos con casos reales
- [ ] Pruebas de responsive en diferentes dispositivos
- [ ] Pruebas de accesibilidad
- [ ] Pruebas de navegadores (Chrome, Firefox, Safari, Edge)
- [ ] Pruebas de usabilidad con usuarios reales
- [ ] Verificación legal con expertos

### Fase 6: Contenido
- [ ] Redactar textos explicativos
- [ ] Crear sección de FAQ
- [ ] Documentar metodología de cálculo
- [ ] Añadir disclaimer legal
- [ ] Crear política de privacidad (RGPD)
- [ ] Preparar recursos descargables (PDF con requisitos)

### Fase 7: Optimización
- [ ] Optimizar imágenes
- [ ] Minificar CSS y JavaScript
- [ ] Implementar lazy loading
- [ ] Configurar caché
- [ ] Optimizar SEO
- [ ] Añadir meta tags y Open Graph

### Fase 8: Deploy y Mantenimiento
- [ ] Configurar hosting
- [ ] Configurar dominio
- [ ] Deploy a producción
- [ ] Configurar analytics (opcional)
- [ ] Configurar sistema de feedback
- [ ] Documentar proceso de actualización
- [ ] Crear calendario de revisión de datos

---

## 🔒 Consideraciones de Seguridad y Privacidad

### RGPD (Reglamento General de Protección de Datos)

1. **No almacenar datos personales**
   - El simulador no debe guardar ni enviar datos a servidores
   - Todos los cálculos se realizan en el navegador del usuario
   - Opciones: LocalStorage solo si el usuario lo autoriza explícitamente

2. **Disclaimer obligatorio**
   ```
   IMPORTANTE: Este simulador tiene carácter meramente orientativo.
   Los datos introducidos no se almacenan ni se envían a ningún servidor.
   Todos los cálculos se realizan localmente en su navegador.
   Para una evaluación oficial, debe consultar con la Seguridad Social.
   ```

3. **Consentimiento para cookies**
   - Si se usan cookies (analytics), banner de consentimiento
   - Política de cookies clara

4. **Aviso legal**
   - El simulador es orientativo, no vinculante
   - Los resultados pueden variar según la situación personal
   - Se recomienda consulta presencial

---

## 📱 Diseño Responsive

### Breakpoints

```css
/* Mobile First */
/* Extra small devices (phones, 320px and up) */
@media (min-width: 320px) { }

/* Small devices (phones, 576px and up) */
@media (min-width: 576px) { }

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { }

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) { }

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) { }
```

---

## ♿ Accesibilidad

### Cumplir con WCAG 2.1 Nivel AA

- ✅ Contraste de color adecuado (mínimo 4.5:1)
- ✅ Navegación por teclado completa
- ✅ Etiquetas ARIA en formularios
- ✅ Alt text en todas las imágenes
- ✅ Textos de error claros y descriptivos
- ✅ Focus visible en elementos interactivos
- ✅ Tamaño de fuente legible (mínimo 16px)
- ✅ Formularios con labels asociados
- ✅ Orden lógico de tabulación

---

## 📈 Métricas de Éxito

### KPIs a Medir (opcional)

1. **Usabilidad**
   - Tasa de finalización del simulador
   - Tiempo medio para completar
   - Tasa de abandono por paso

2. **Precisión**
   - Feedback de usuarios sobre precisión de resultados
   - Consultas de usuarios con dudas

3. **Accesibilidad**
   - Puntuación Lighthouse (> 90)
   - Pruebas con lectores de pantalla

---

## 🔄 Plan de Actualización

### Frecuencia de Revisión

- **Anualmente (enero)**: Actualizar cuantías y límites de ingresos
- **Trimestral**: Revisar cambios legislativos
- **Mensual**: Revisar feedback de usuarios

### Fuentes Oficiales a Consultar

1. **Instituto Nacional de la Seguridad Social (INSS)**
   - https://www.seg-social.es

2. **BOE (Boletín Oficial del Estado)**
   - Publicación de actualizaciones de cuantías

3. **Ministerio de Inclusión, Seguridad Social y Migraciones**
   - Normativa actualizada

---

## 🎯 Diferenciadores vs Simulador de Andalucía

### Mejoras Propuestas

1. **Ámbito Nacional**: Válido para toda España
2. **Diseño Moderno**: UI/UX actualizada
3. **Mobile First**: Optimizado para móviles
4. **Accesibilidad Mejorada**: WCAG 2.1 AA
5. **Explicaciones Contextuales**: Tooltips y ayudas inline
6. **Resultados Detallados**: Desglose completo
7. **Recursos Adicionales**: Enlaces directos a trámites
8. **Multiidioma** (opcional): Castellano, catalán, euskera, gallego

---

## 📝 Documentación Necesaria (para mostrar al usuario)

### Al finalizar el simulador con resultado positivo

**Documentación necesaria para solicitar la PNC:**

✅ **Documentación personal**
- DNI, NIE o Pasaporte
- Certificado de empadronamiento (histórico)
- Libro de familia (si procede)

✅ **Documentación económica**
- Declaración de la renta (si se ha presentado)
- Certificados de ingresos de todos los miembros de la unidad familiar
- Certificados bancarios (saldos y movimientos)

✅ **Para invalidez**
- Certificado de discapacidad (grado igual o superior al 65%)
- Informes médicos actualizados

✅ **Otros**
- Modelo de solicitud (disponible en oficinas de la Seguridad Social)
- Certificado de convivencia
- Documentación adicional según caso particular

---

## 💡 Preguntas Frecuentes a Incluir

### FAQ Esenciales

**1. ¿Qué es una pensión no contributiva?**
> Es una prestación económica para personas sin recursos que no han cotizado lo suficiente para una pensión contributiva.

**2. ¿Cuánto se cobra?**
> En 2025, la cuantía máxima es de 517,90 € mensuales (14 pagas). La cantidad puede variar según ingresos y convivencia.

**3. ¿Es compatible con trabajar?**
> Sí, pero los ingresos del trabajo se tienen en cuenta y pueden reducir la cuantía o causar la suspensión de la pensión.

**4. ¿Se puede cobrar junto a otras ayudas?**
> Depende del tipo de ayuda. No es compatible con otras pensiones de la Seguridad Social, pero sí con algunas ayudas autonómicas.

**5. ¿Cuánto tarda la resolución?**
> El plazo máximo es de 90 días desde la presentación de la solicitud completa.

**6. ¿Puedo solicitarla desde el extranjero?**
> Sí, si eres español en el extranjero, puedes solicitarla a través de consulados.

**7. ¿La pensión incluye asistencia sanitaria?**
> Sí, da derecho a la tarjeta sanitaria y asistencia médica gratuita.

**8. ¿Se actualiza cada año?**
> Sí, las cuantías se actualizan anualmente en los Presupuestos Generales del Estado.

---

## 🚀 Roadmap Futuro (Post-Launch)

### V1.0 (MVP - Mínimo Producto Viable)
- Simulador básico de elegibilidad
- Cálculo de cuantía estimada
- Diseño responsive
- FAQ básico

### V1.1
- Mejoras de UX basadas en feedback
- Más casos especiales contemplados
- Información sobre complementos (ayuda a tercera persona)

### V1.2
- Multiidioma (catalán, euskera, gallego)
- Comparador con otras ayudas disponibles
- Mapa de oficinas de la Seguridad Social

### V2.0
- Base de conocimiento ampliada
- Chatbot de ayuda (IA)
- Generador de documentación personalizada
- Integración con cita previa INSS

---

## 🔍 Referencias Legales

### Normativa Principal

1. **Ley 26/1990, de 20 de diciembre**
   - Por la que se establecen en la Seguridad Social prestaciones no contributivas
   - BOE: https://www.boe.es/buscar/act.php?id=BOE-A-1990-30939

2. **Real Decreto 357/1991, de 15 de marzo**
   - Desarrollo de la Ley 26/1990 sobre prestaciones no contributivas

3. **Ley General de la Seguridad Social (Real Decreto Legislativo 8/2015)**
   - Texto refundido

4. **Presupuestos Generales del Estado 2025**
   - Actualización de cuantías

### Fuentes de Consulta

- **INSS**: https://www.seg-social.es
- **Sede Electrónica Seguridad Social**: https://sede.seg-social.gob.es
- **IMSERSO**: http://www.imserso.es
- **Tu Seguridad Social** (App móvil oficial)

---

## 📞 Información de Contacto a Incluir

### Teléfonos de Atención

- **Información General Seguridad Social**: 901 16 65 65
- **Atención a personas con discapacidad auditiva**: 901 12 31 23
- **Desde el extranjero**: +34 915 41 25 30

### Oficinas

- **Buscador de oficinas**: https://sede.seg-social.gob.es/wps/portal/sede/sede/Inicio/ofipre

### Cita Previa

- **Online**: https://sede.seg-social.gob.es (con certificado digital o Cl@ve)
- **Teléfono**: 901 10 65 70

---

## ⚠️ Información Importante para el Usuario Final

### Disclaimer Principal

```
AVISO IMPORTANTE:

Este simulador es una herramienta orientativa para ayudarle a conocer
si podría tener derecho a una Pensión No Contributiva según la legislación
española vigente.

Los resultados obtenidos NO constituyen un documento oficial ni garantizan
el reconocimiento del derecho a la prestación.

Para una evaluación definitiva de su situación particular, debe solicitar
cita en su oficina de la Seguridad Social más cercana.

Los datos introducidos en este simulador no se almacenan, no se transmiten
a ningún servidor y no se utilizan para ningún fin más allá del cálculo
orientativo en su navegador.

Última actualización: [FECHA]
Base legal: Ley 26/1990 y modificaciones vigentes
```

---

## ✨ Características Adicionales Opcionales

### Nice to Have

1. **Comparador de Ayudas**
   - Comparar PNC con Ingreso Mínimo Vital
   - Comparar con Rentas Mínimas autonómicas

2. **Calculadora de Diferencia**
   - "¿Cuánto me falta para cumplir los requisitos?"
   - Proyección temporal

3. **Modo Asistente Social**
   - Versión extendida para profesionales
   - Casos múltiples simultáneos

4. **Exportación de Resultados**
   - Descargar PDF con resultados
   - Enviar por email (sin almacenar datos)

5. **Sistema de Notificaciones**
   - "Avísame cuando se actualicen las cuantías"
   - Newsletter con cambios legislativos

6. **Modo Accesibilidad Avanzado**
   - Alto contraste
   - Texto simplificado (lectura fácil)
   - Audio explicativo

---

## 📚 Material de Apoyo a Desarrollar

### Para Usuarios
- [ ] Guía rápida en PDF
- [ ] Infografía de requisitos
- [ ] Vídeo tutorial del simulador
- [ ] Checklist de documentación

### Para Desarrolladores
- [ ] Documentación técnica completa
- [ ] Guía de actualización de parámetros
- [ ] Tests automatizados
- [ ] Manual de despliegue

---

## 🎓 Conocimientos Técnicos Necesarios

### Desarrollador Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Responsive Design
- Accesibilidad web (WCAG)
- Git/GitHub

### Conocimientos Adicionales (Recomendados)
- Framework JS (Vue.js/React) - Opcional
- TailwindCSS o Bootstrap
- RGPD y protección de datos
- SEO básico
- Testing (Jest, Cypress)

---

## 🏁 Cronograma Estimado

| Fase | Duración Estimada | Entregables |
|------|------------------|-------------|
| **Fase 1: Investigación** | ✅ Completada | Plan.md |
| **Fase 2: Diseño** | 1-2 semanas | Wireframes, Mockups, Guía de estilo |
| **Fase 3: Desarrollo** | 3-4 semanas | Código funcional, Simulador operativo |
| **Fase 4: Testing** | 1 semana | Informe de pruebas, Correcciones |
| **Fase 5: Contenido** | 1 semana | Textos finales, FAQ, Legal |
| **Fase 6: Deploy** | 3-5 días | Sitio en producción |
| **TOTAL** | **6-8 semanas** | Landing web completa |

*Nota: Los tiempos son aproximados para un desarrollador trabajando a tiempo parcial*

---

## 💰 Presupuesto Estimado (Opcional)

### Costes de Desarrollo (si se externaliza)

| Concepto | Coste Estimado |
|----------|---------------|
| Diseño UX/UI | 500-1.000 € |
| Desarrollo Frontend | 1.500-3.000 € |
| Testing y QA | 300-500 € |
| Contenidos y textos | 200-400 € |
| **TOTAL DESARROLLO** | **2.500-4.900 €** |

### Costes Recurrentes

| Concepto | Coste Anual |
|----------|-------------|
| Dominio (.es) | 10-15 € |
| Hosting (básico) | 0-50 € (GitHub Pages gratis) |
| Mantenimiento | 200-500 € |
| **TOTAL ANUAL** | **210-565 €** |

*Nota: Si lo desarrollas tú mismo, solo necesitas dominio y hosting*

---

## 🤝 Preguntas para el Cliente

Antes de comenzar el desarrollo, sería útil aclarar:

### Preguntas Técnicas
1. ¿Tienes preferencia por algún framework o prefieres JavaScript vanilla?
2. ¿Ya tienes un dominio registrado o hay que adquirir uno?
3. ¿Tienes acceso a servicios de hosting o usamos GitHub Pages (gratuito)?
4. ¿Necesitas integración con algún sistema de analytics (Google Analytics, Matomo)?

### Preguntas de Diseño
5. ¿Tienes alguna preferencia de colores o imagen corporativa?
6. ¿Quieres un diseño sobrio/institucional o más moderno/informal?
7. ¿Hay algún simulador que te guste especialmente su diseño?

### Preguntas de Contenido
8. ¿Quieres incluir multiidioma desde el principio o solo castellano?
9. ¿Necesitas alguna sección adicional (blog, noticias, etc.)?
10. ¿Quieres incluir testimonios de usuarios (si están disponibles)?

### Preguntas Legales
11. ¿Tienes asesor legal para revisar disclaimer y política de privacidad?
12. ¿La web es para uso personal, ONG, institución pública u otro?

### Preguntas de Alcance
13. ¿Solo pensiones no contributivas o también quieres incluir información sobre otras prestaciones?
14. ¿Quieres fase de beta con usuarios de prueba o lanzamiento directo?
15. ¿Hay fecha límite o deadline específico?

---

## 📋 Próximos Pasos

### Acción Inmediata

1. **Revisar este plan** y confirmar si se ajusta a tus necesidades
2. **Responder las preguntas** de la sección anterior
3. **Proporcionar información adicional** si consideras necesaria algo más
4. **Decidir stack tecnológico** (vanilla JS, Vue, React, etc.)
5. **Comenzar con wireframes** o pasar directamente a desarrollo

### Una vez aprobado el plan:

✅ Comenzaré con el desarrollo si me lo indicas
✅ Puedo crear los wireframes/mockups primero
✅ Puedo desarrollar una versión demo simplificada
✅ Puedo comenzar por el módulo que prefieras

---

## 📞 Contacto y Consultas

Si necesitas:
- Aclarar algún punto de este plan
- Información adicional sobre requisitos legales
- Modificar el alcance del proyecto
- Añadir/quitar funcionalidades
- Consultar dudas técnicas

**¡No dudes en preguntar! El plan es flexible y adaptable a tus necesidades.**

---

## 📝 Notas Finales

Este plan está diseñado para ser:
- ✅ **Completo**: Cubre todos los aspectos del desarrollo
- ✅ **Flexible**: Se puede adaptar según necesidades
- ✅ **Realista**: Tiempos y recursos viables
- ✅ **Legal**: Basado en normativa vigente 2025
- ✅ **Accesible**: Cumple estándares de accesibilidad
- ✅ **Mantenible**: Fácil de actualizar en el futuro

---

**Versión del plan:** 1.0  
**Fecha de creación:** Diciembre 2025  
**Última actualización:** Diciembre 2025  
**Estado:** ✅ Completo y listo para desarrollo

---

## 🎯 Conclusión

Este proyecto tiene un **gran valor social** al facilitar el acceso a información sobre pensiones no contributivas de manera clara y accesible. Con este plan detallado, tienes una hoja de ruta completa para desarrollar una herramienta útil para miles de personas en España.

**¿Listo para empezar? ¡Adelante!** 🚀

