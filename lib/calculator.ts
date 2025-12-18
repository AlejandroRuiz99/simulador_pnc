import { FormData, SimulationResult, PARAMETROS_2025, Requirement } from '@/types/simulator';

export function calcularElegibilidad(formData: FormData): SimulationResult {
  const resultado: SimulationResult = {
    elegible: false,
    requisitos: {
      edad: {
        met: false,
        label: 'Edad',
        required: '',
        actual: `${formData.edad} años`,
      },
      residencia: {
        met: false,
        label: 'Residencia',
        required: '',
        actual: `${formData.anosResidenciaEspana} años en España`,
      },
      ingresos: {
        met: false,
        label: 'Ingresos',
        required: '',
        actual: `${formData.ingresosAnualesPersonales.toFixed(2)}€ anuales`,
      },
    },
    cuantiaEstimada: 0,
    cuantiaAnual: 0,
    mensajes: [],
    recomendaciones: [],
  };

  if (!formData.tipoPension) {
    return resultado;
  }

  // Verificar requisitos según tipo de pensión
  if (formData.tipoPension === 'jubilacion') {
    // PENSIÓN DE JUBILACIÓN
    const { edadMinima, anosResidencia, anosConsecutivos } = PARAMETROS_2025.requisitos.jubilacion;

    // 1. Verificar edad
    resultado.requisitos.edad.required = `${edadMinima} años o más`;
    resultado.requisitos.edad.met = formData.edad >= edadMinima;

    // 2. Verificar residencia
    resultado.requisitos.residencia.required = `${anosResidencia} años (${anosConsecutivos} consecutivos)`;
    resultado.requisitos.residencia.met =
      formData.anosResidenciaEspana >= anosResidencia &&
      formData.ultimosDosAnosConsecutivos;

  } else if (formData.tipoPension === 'invalidez') {
    // PENSIÓN DE INVALIDEZ
    const { edadMinima, edadMaxima, gradoDiscapacidadMinimo, anosResidencia, anosConsecutivos } =
      PARAMETROS_2025.requisitos.invalidez;

    // 1. Verificar edad
    resultado.requisitos.edad.required = `Entre ${edadMinima} y ${edadMaxima} años`;
    resultado.requisitos.edad.met =
      formData.edad >= edadMinima && formData.edad <= edadMaxima;

    // 2. Verificar discapacidad
    resultado.requisitos.discapacidad = {
      met: false,
      label: 'Grado de Discapacidad',
      required: `${gradoDiscapacidadMinimo}% o más`,
      actual: `${formData.gradoDiscapacidad}%`,
    };
    resultado.requisitos.discapacidad.met =
      formData.tieneDiscapacidad && formData.gradoDiscapacidad >= gradoDiscapacidadMinimo;

    // 3. Verificar residencia
    resultado.requisitos.residencia.required = `${anosResidencia} años (${anosConsecutivos} consecutivos)`;
    resultado.requisitos.residencia.met =
      formData.anosResidenciaEspana >= anosResidencia &&
      formData.ultimosDosAnosConsecutivos;
  }

  // 3. Verificar límite de ingresos
  const limiteIngresos = calcularLimiteIngresos(formData);
  resultado.requisitos.ingresos.required = `Menos de ${limiteIngresos.toFixed(2)}€ anuales`;
  
  const ingresosAComparar = formData.viveSolo 
    ? formData.ingresosAnualesPersonales 
    : formData.ingresosAnualesFamiliares;
    
  resultado.requisitos.ingresos.actual = formData.viveSolo
    ? `${formData.ingresosAnualesPersonales.toFixed(2)}€ anuales (personal)`
    : `${formData.ingresosAnualesFamiliares.toFixed(2)}€ anuales (familiar)`;
    
  resultado.requisitos.ingresos.met = ingresosAComparar <= limiteIngresos;

  // Determinar elegibilidad
  const todosRequisitos = Object.values(resultado.requisitos).every(req => req.met);
  resultado.elegible = todosRequisitos;

  // Calcular cuantía estimada
  if (resultado.elegible) {
    const cuantia = calcularCuantia(formData);
    resultado.cuantiaEstimada = cuantia.mensual;
    resultado.cuantiaAnual = cuantia.anual;

    resultado.mensajes.push(
      '¡Felicidades! Según los datos proporcionados, cumples con todos los requisitos para solicitar una Pensión No Contributiva.',
      `La cuantía estimada sería de ${cuantia.mensual.toFixed(2)}€ mensuales (${cuantia.anual.toFixed(2)}€ anuales).`
    );

    resultado.recomendaciones.push(
      'Solicita cita previa en tu oficina de la Seguridad Social más cercana.',
      'Prepara la documentación necesaria: DNI, certificado de empadronamiento, certificados de ingresos.',
      'Si tienes dudas, nuestro equipo de Compromiso Legal puede asesorarte.'
    );
  } else {
    resultado.mensajes.push(
      'Según los datos proporcionados, actualmente no cumples con todos los requisitos necesarios.'
    );

    // Añadir recomendaciones específicas
    if (!resultado.requisitos.edad.met) {
      if (formData.tipoPension === 'jubilacion') {
        resultado.recomendaciones.push(
          `Debes tener al menos ${PARAMETROS_2025.requisitos.jubilacion.edadMinima} años para la pensión de jubilación.`
        );
      } else {
        resultado.recomendaciones.push(
          `La pensión de invalidez es para personas entre ${PARAMETROS_2025.requisitos.invalidez.edadMinima} y ${PARAMETROS_2025.requisitos.invalidez.edadMaxima} años.`
        );
      }
    }

    if (!resultado.requisitos.residencia.met) {
      resultado.recomendaciones.push(
        'Debes cumplir con los requisitos de residencia en España.',
        'Asegúrate de tener los años necesarios de residencia y que los últimos 2 años sean consecutivos.'
      );
    }

    if (!resultado.requisitos.ingresos.met) {
      resultado.recomendaciones.push(
        'Tus ingresos superan el límite establecido para acceder a la pensión.',
        'El límite varía según tu unidad de convivencia.'
      );
    }

    if (resultado.requisitos.discapacidad && !resultado.requisitos.discapacidad.met) {
      resultado.recomendaciones.push(
        `Necesitas un grado de discapacidad de al menos ${PARAMETROS_2025.requisitos.invalidez.gradoDiscapacidadMinimo}% para la pensión de invalidez.`,
        'Si no tienes el certificado de discapacidad, solicita una valoración en tu centro de salud.'
      );
    }

    resultado.recomendaciones.push(
      'Consulta con un trabajador social o con nuestro equipo de Compromiso Legal para explorar otras ayudas disponibles.'
    );
  }

  return resultado;
}

function calcularLimiteIngresos(formData: FormData): number {
  if (formData.viveSolo) {
    return PARAMETROS_2025.limitesIngresos.individual;
  }

  // Si convive con cónyuge y ambos cumplen requisitos (caso especial)
  if (formData.conviveConyuge && formData.numeroConvivientes === 2) {
    // Simplificación: se podría añadir lógica más compleja aquí
    return PARAMETROS_2025.limitesIngresos.conyugeAmbosRequisitos;
  }

  // Límite según número de convivientes
  const numConvivientes = formData.numeroConvivientes;
  if (numConvivientes >= 5) {
    return PARAMETROS_2025.limitesIngresos.familiar[5];
  }
  
  return PARAMETROS_2025.limitesIngresos.familiar[numConvivientes as 2 | 3 | 4] || 
         PARAMETROS_2025.limitesIngresos.individual;
}

function calcularCuantia(formData: FormData): { mensual: number; anual: number } {
  const { cuantiaIntegra, cuantiaMinima } = PARAMETROS_2025;

  // Si no tiene ingresos, recibe la cuantía íntegra
  if (formData.ingresosAnualesPersonales === 0 && formData.viveSolo) {
    return {
      mensual: cuantiaIntegra.mensual,
      anual: cuantiaIntegra.anual,
    };
  }

  // Calcular cuantía según ingresos
  // Fórmula simplificada: Cuantía = Cuantía Íntegra - Ingresos Personales
  const cuantiaAnual = Math.max(
    cuantiaMinima.anual,
    cuantiaIntegra.anual - formData.ingresosAnualesPersonales
  );

  // Si la cuantía es menor al mínimo, no hay derecho
  if (cuantiaAnual < cuantiaMinima.anual) {
    return { mensual: 0, anual: 0 };
  }

  const cuantiaMensual = cuantiaAnual / 14;

  return {
    mensual: cuantiaMensual,
    anual: cuantiaAnual,
  };
}

export function calcularEdad(fechaNacimiento: string): number {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  
  return edad;
}

