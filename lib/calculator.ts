import { FormData, SimulationResult, PARAMETROS_2026, Requirement } from '@/types/simulator';

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
    const { edadMinima, anosResidencia, anosConsecutivos } = PARAMETROS_2026.requisitos.jubilacion;

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
      PARAMETROS_2026.requisitos.invalidez;

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
      '¡Déjanos ayudarte! En Compromiso Legal gestionamos todo el proceso de solicitud por ti.',
      'Recopilamos tu documentación, la revisamos, presentamos tu solicitud y hacemos seguimiento.',
      'Tú solo te relajas mientras nosotros nos encargamos de todo el papeleo y trámites.'
    );
  } else {
    resultado.mensajes.push(
      'Según los datos proporcionados, actualmente no cumples con todos los requisitos necesarios.'
    );

    // Añadir recomendaciones específicas
    if (!resultado.requisitos.edad.met) {
      if (formData.tipoPension === 'jubilacion') {
        resultado.recomendaciones.push(
          `Debes tener al menos ${PARAMETROS_2026.requisitos.jubilacion.edadMinima} años para la pensión de jubilación.`
        );
      } else {
        resultado.recomendaciones.push(
          `La pensión de invalidez es para personas entre ${PARAMETROS_2026.requisitos.invalidez.edadMinima} y ${PARAMETROS_2026.requisitos.invalidez.edadMaxima} años.`
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
        `Necesitas un grado de discapacidad de al menos ${PARAMETROS_2026.requisitos.invalidez.gradoDiscapacidadMinimo}% para la pensión de invalidez.`,
        'Si no tienes el certificado de discapacidad, solicita una valoración en tu centro de salud.'
      );
    }

    resultado.recomendaciones.push(
      '¿No cumples todos los requisitos? Nuestro equipo puede analizar tu caso y encontrar ayudas alternativas a las que sí puedas acceder. Contacta con nosotros para un análisis personalizado gratuito.'
    );
  }

  return resultado;
}

function calcularLimiteIngresos(formData: FormData): number {
  // Si vive solo
  if (formData.viveSolo) {
    // Si tiene invalidez con complemento de tercera persona
    if (formData.tipoPension === 'invalidez' && formData.necesitaTerceraPersona) {
      return PARAMETROS_2026.limitesIngresos.invalidezTerceraPersona.individual;
    }
    // Si tiene invalidez y trabaja (primeros 4 años)
    if (formData.tipoPension === 'invalidez' && formData.trabajaConInvalidez) {
      return PARAMETROS_2026.limitesIngresos.invalidezConTrabajo;
    }
    return PARAMETROS_2026.limitesIngresos.individual;
  }

  // Si convive con otras personas
  const numConvivientes = formData.numeroConvivientes;
  const numConvivientesKey = Math.min(numConvivientes, 5) as 2 | 3 | 4 | 5;

  // Determinar si es Tipo A o Tipo B
  const esConvivenciaTipoB = formData.conviveConPadresOHijos;

  // Si tiene invalidez con complemento de tercera persona
  if (formData.tipoPension === 'invalidez' && formData.necesitaTerceraPersona) {
    if (esConvivenciaTipoB) {
      return PARAMETROS_2026.limitesIngresos.invalidezTerceraPersona.tipoB[numConvivientesKey];
    } else {
      return PARAMETROS_2026.limitesIngresos.invalidezTerceraPersona.tipoA[numConvivientesKey];
    }
  }

  // Si tiene invalidez y trabaja (primeros 4 años)
  if (formData.tipoPension === 'invalidez' && formData.trabajaConInvalidez) {
    return PARAMETROS_2026.limitesIngresos.invalidezConTrabajo;
  }

  // Límites normales según tipo de convivencia
  if (esConvivenciaTipoB) {
    return PARAMETROS_2026.limitesIngresos.familiarTipoB[numConvivientesKey];
  } else {
    return PARAMETROS_2026.limitesIngresos.familiarTipoA[numConvivientesKey];
  }
}

function calcularCuantia(formData: FormData): { mensual: number; anual: number } {
  const { cuantiaIntegra, cuantiaMinima, ingresoExento } = PARAMETROS_2026;

  // Determinar ingresos a considerar (personal o familiar)
  const ingresosBase = formData.viveSolo 
    ? formData.ingresosAnualesPersonales 
    : formData.ingresosAnualesFamiliares;

  // Si no tiene ingresos, recibe la cuantía íntegra
  if (ingresosBase === 0) {
    return {
      mensual: cuantiaIntegra.mensual,
      anual: cuantiaIntegra.anual,
    };
  }

  // Los primeros 3.081,12€ están exentos
  const ingresosComputables = Math.max(0, ingresosBase - ingresoExento);

  // Fórmula oficial: Cuantía = Pensión anual íntegra - Ingresos computables
  const cuantiaAnual = cuantiaIntegra.anual - ingresosComputables;

  // Aplicar límite mínimo de 2.200,8€ anuales
  const cuantiaFinal = Math.max(cuantiaMinima.anual, cuantiaAnual);

  // Si la cuantía calculada es menor al mínimo establecido, se asigna el mínimo
  const cuantiaMensual = cuantiaFinal / 14;

  return {
    mensual: cuantiaMensual,
    anual: cuantiaFinal,
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

