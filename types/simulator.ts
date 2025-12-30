export type PensionType = 'jubilacion' | 'invalidez' | null;

export interface FormData {
  // Paso 1: Tipo de pensión
  tipoPension: PensionType;
  
  // Paso 2: Datos personales
  fechaNacimiento: string;
  edad: number;
  tieneDiscapacidad: boolean;
  gradoDiscapacidad: number;
  
  // Paso 3: Residencia
  anosResidenciaEspana: number;
  ultimosDosAnosConsecutivos: boolean;
  
  // Paso 4: Ingresos personales
  ingresosAnualesPersonales: number;
  
  // Paso 5: Unidad de convivencia
  viveSolo: boolean;
  conviveConyuge: boolean;
  numeroConvivientes: number;
  ingresosAnualesFamiliares: number;
  conviveConPadresOHijos: boolean; // Para límite tipo B
  
  // Paso 6: Información adicional (solo para invalidez)
  necesitaTerceraPersona: boolean; // Complemento de tercera persona
  trabajaConInvalidez: boolean; // Si trabaja y tiene invalidez (primeros 4 años)
}

export interface Requirement {
  met: boolean;
  label: string;
  required: string;
  actual: string;
}

export interface SimulationResult {
  elegible: boolean;
  requisitos: {
    edad: Requirement;
    residencia: Requirement;
    ingresos: Requirement;
    discapacidad?: Requirement;
  };
  cuantiaEstimada: number;
  cuantiaAnual: number;
  mensajes: string[];
  recomendaciones: string[];
}

export const PARAMETROS_2026 = {
  cuantiaIntegra: {
    anual: 8803.2,
    mensual: 628.80, // 8803.2 / 14
    pagas: 14,
  },
  cuantiaMinima: {
    anual: 2200.8,
    mensual: 157.2, // 2200.8 / 14
  },
  ingresoExento: 3081.12, // Los primeros 3081,12€ no computan
  limitesIngresos: {
    individual: 8803.2,
    // Tipo A: Convivencia solo con cónyuge y/o parientes consanguíneos de segundo grado
    familiarTipoA: {
      2: 14965.44,
      3: 21127.68,
      4: 27289.92,
      5: 33452.16, // Extrapolado (incremento de 6137.76 por persona)
    },
    // Tipo B: Si entre los parientes hay padres o hijos
    familiarTipoB: {
      2: 37413.6,
      3: 52819.2,
      4: 68224.8,
      5: 83630.4, // Extrapolado (incremento de 15405.6 por persona)
    },
    // Para invalidez con complemento de tercera persona
    invalidezTerceraPersona: {
      individual: 13204.8,
      tipoA: {
        2: 19367.4,
        3: 25529.28,
        4: 31691.52,
        5: 37853.76, // Extrapolado
      },
      tipoB: {
        2: 48418.5,
        3: 63823.2,
        4: 79228.8,
        5: 94634.4, // Extrapolado
      },
    },
    // Especialidad: invalidez con trabajo (primeros 4 años)
    invalidezConTrabajo: 16003.2,
  },
  requisitos: {
    jubilacion: {
      edadMinima: 65,
      anosResidencia: 10,
      anosConsecutivos: 2,
    },
    invalidez: {
      edadMinima: 18,
      edadMaxima: 65, // Hasta 65 años inclusive
      gradoDiscapacidadMinimo: 65,
      anosResidencia: 5,
      anosConsecutivos: 2,
    },
  },
};

