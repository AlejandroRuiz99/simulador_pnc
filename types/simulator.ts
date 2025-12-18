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

export const PARAMETROS_2025 = {
  cuantiaIntegra: {
    anual: 7250.60,
    mensual: 517.90,
    pagas: 14,
  },
  cuantiaMinima: {
    anual: 1812.65,
  },
  limitesIngresos: {
    individual: 7250.60,
    familiar: {
      2: 12326.02,
      3: 17401.44,
      4: 22476.86,
      5: 27552.28,
    },
    conyugeAmbosRequisitos: 23551.53,
  },
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

