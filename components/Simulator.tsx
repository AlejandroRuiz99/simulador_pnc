'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FormData, PensionType, SimulationResult } from '@/types/simulator';
import { calcularElegibilidad, calcularEdad } from '@/lib/calculator';
import Link from 'next/link';

const initialFormData: FormData = {
  tipoPension: null,
  fechaNacimiento: '',
  edad: 0,
  tieneDiscapacidad: false,
  gradoDiscapacidad: 0,
  anosResidenciaEspana: 0,
  ultimosDosAnosConsecutivos: false,
  ingresosAnualesPersonales: 0,
  viveSolo: true,
  conviveConyuge: false,
  numeroConvivientes: 1,
  ingresosAnualesFamiliares: 0,
  conviveConPadresOHijos: false,
  necesitaTerceraPersona: false,
  trabajaConInvalidez: false,
};

export default function Simulator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const totalSteps = formData.tipoPension === 'invalidez' ? 6 : 5;

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calcular resultado
      const resultado = calcularElegibilidad(formData);
      setResult(resultado);
      setShowResult(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const resetSimulator = () => {
    setCurrentStep(1);
    setFormData(initialFormData);
    setResult(null);
    setShowResult(false);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.tipoPension !== null;
      case 2:
        if (formData.tipoPension === 'invalidez') {
          return formData.fechaNacimiento !== '' && 
                 (formData.tieneDiscapacidad ? formData.gradoDiscapacidad > 0 : true);
        }
        return formData.fechaNacimiento !== '';
      case 3:
        return formData.anosResidenciaEspana > 0;
      case 4:
        return true; // Los ingresos pueden ser 0
      case 5:
        return true;
      case 6:
        return true;
      default:
        return false;
    }
  };

  return (
    <section id="simulador" ref={ref} className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gold-text-gradient">Simulador</span> de Elegibilidad
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Responde las siguientes preguntas para conocer si tienes derecho a una pensión no contributiva
          </p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-gradient-to-br from-gray-900/90 to-gray-800/50 backdrop-blur-sm border border-gold/30 rounded-2xl p-8 md:p-12"
              >
                {/* Barra de progreso */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-400">
                      Paso {currentStep} de {totalSteps}
                    </span>
                    <span className="text-sm font-medium text-gold">
                      {Math.round((currentStep / totalSteps) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="h-2 bg-gradient-to-r from-gold to-yellow-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Paso 1: Tipo de pensión */}
                {currentStep === 1 && (
                  <Step1
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                )}

                {/* Paso 2: Datos personales */}
                {currentStep === 2 && (
                  <Step2
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                )}

                {/* Paso 3: Residencia */}
                {currentStep === 3 && (
                  <Step3
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                )}

                {/* Paso 4: Ingresos personales */}
                {currentStep === 4 && (
                  <Step4
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                )}

                {/* Paso 5: Unidad de convivencia */}
                {currentStep === 5 && (
                  <Step5
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                )}

                {/* Paso 6: Información adicional (solo para invalidez) */}
                {currentStep === 6 && formData.tipoPension === 'invalidez' && (
                  <Step6
                    formData={formData}
                    updateFormData={updateFormData}
                  />
                )}

                {/* Botones de navegación */}
                <div className="flex gap-4 mt-8">
                  {currentStep > 1 && (
                    <button
                      onClick={prevStep}
                      className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200"
                    >
                      Anterior
                    </button>
                  )}
                  <button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      canProceed()
                        ? 'bg-gradient-to-r from-gold to-yellow-500 text-black hover:shadow-lg hover:shadow-gold/50'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {currentStep === totalSteps ? 'Ver Resultado' : 'Siguiente'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <ResultScreen result={result!} resetSimulator={resetSimulator} formData={formData} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// Componentes de cada paso
function Step1({ formData, updateFormData }: { formData: FormData; updateFormData: (field: keyof FormData, value: any) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h3 className="text-2xl font-bold mb-2">¿Qué tipo de pensión te interesa?</h3>
      <p className="text-gray-400 mb-8">Selecciona el tipo de pensión no contributiva</p>

      <div className="grid md:grid-cols-2 gap-4">
        <button
          onClick={() => updateFormData('tipoPension', 'jubilacion')}
          className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
            formData.tipoPension === 'jubilacion'
              ? 'border-gold bg-gold/10'
              : 'border-gray-600 hover:border-gold/50'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              formData.tipoPension === 'jubilacion' ? 'border-gold' : 'border-gray-500'
            }`}>
              {formData.tipoPension === 'jubilacion' && (
                <div className="w-3 h-3 bg-gold rounded-full" />
              )}
            </div>
            <h4 className="text-xl font-bold">Pensión de Jubilación</h4>
          </div>
          <p className="text-sm text-gray-400">
            Para personas de 65 años o más que no han cotizado lo suficiente
          </p>
        </button>

        <button
          onClick={() => updateFormData('tipoPension', 'invalidez')}
          className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
            formData.tipoPension === 'invalidez'
              ? 'border-gold bg-gold/10'
              : 'border-gray-600 hover:border-gold/50'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              formData.tipoPension === 'invalidez' ? 'border-gold' : 'border-gray-500'
            }`}>
              {formData.tipoPension === 'invalidez' && (
                <div className="w-3 h-3 bg-gold rounded-full" />
              )}
            </div>
            <h4 className="text-xl font-bold">Pensión de Invalidez</h4>
          </div>
          <p className="text-sm text-gray-400">
            Para personas de 18-65 años con discapacidad ≥65%
          </p>
        </button>
      </div>
    </motion.div>
  );
}

function Step2({ formData, updateFormData }: { formData: FormData; updateFormData: (field: keyof FormData, value: any) => void }) {
  const handleFechaNacimientoChange = (fecha: string) => {
    updateFormData('fechaNacimiento', fecha);
    if (fecha) {
      const edad = calcularEdad(fecha);
      updateFormData('edad', edad);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h3 className="text-2xl font-bold mb-2">Datos personales</h3>
      <p className="text-gray-400 mb-8">Necesitamos algunos datos básicos</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Fecha de nacimiento</label>
          <input
            type="date"
            value={formData.fechaNacimiento}
            onChange={(e) => handleFechaNacimientoChange(e.target.value)}
            className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-gold focus:outline-none text-white"
            max={new Date().toISOString().split('T')[0]}
          />
          {formData.edad > 0 && (
            <p className="text-sm text-gold mt-2">Edad: {formData.edad} años</p>
          )}
        </div>

        {formData.tipoPension === 'invalidez' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">
                ¿Tienes certificado de discapacidad?
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => updateFormData('tieneDiscapacidad', true)}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                    formData.tieneDiscapacidad
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-gray-600 hover:border-gold/50'
                  }`}
                >
                  Sí
                </button>
                <button
                  onClick={() => updateFormData('tieneDiscapacidad', false)}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                    !formData.tieneDiscapacidad
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-gray-600 hover:border-gold/50'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            {formData.tieneDiscapacidad && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Grado de discapacidad (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.gradoDiscapacidad}
                  onChange={(e) => updateFormData('gradoDiscapacidad', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-gold focus:outline-none text-white"
                  placeholder="Ej: 65"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Necesitas al menos 65% para la pensión de invalidez
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

function Step3({ formData, updateFormData }: { formData: FormData; updateFormData: (field: keyof FormData, value: any) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h3 className="text-2xl font-bold mb-2">Residencia en España</h3>
      <p className="text-gray-400 mb-8">Información sobre tu residencia</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            ¿Cuántos años llevas residiendo legalmente en España?
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={formData.anosResidenciaEspana || ''}
            onChange={(e) => updateFormData('anosResidenciaEspana', parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-gold focus:outline-none text-white"
            placeholder="Ej: 15"
          />
          <p className="text-xs text-gray-400 mt-2">
            {formData.tipoPension === 'jubilacion' 
              ? 'Necesitas al menos 10 años de residencia'
              : 'Necesitas al menos 5 años de residencia'}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            ¿Has residido en España de forma consecutiva los últimos 2 años inmediatamente anteriores a la solicitud?
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => updateFormData('ultimosDosAnosConsecutivos', true)}
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                formData.ultimosDosAnosConsecutivos
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-gray-600 hover:border-gold/50'
              }`}
            >
              Sí
            </button>
            <button
              onClick={() => updateFormData('ultimosDosAnosConsecutivos', false)}
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                !formData.ultimosDosAnosConsecutivos
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-gray-600 hover:border-gold/50'
              }`}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Step4({ formData, updateFormData }: { formData: FormData; updateFormData: (field: keyof FormData, value: any) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h3 className="text-2xl font-bold mb-2">Ingresos personales</h3>
      <p className="text-gray-400 mb-8">Información sobre tus ingresos anuales</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            ¿Cuáles son tus ingresos anuales personales NETOS? (€)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={formData.ingresosAnualesPersonales || ''}
            onChange={(e) => updateFormData('ingresosAnualesPersonales', parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-gold focus:outline-none text-white"
            placeholder="Ej: 5000"
          />
          <p className="text-xs text-gray-400 mt-2">
            Incluye: pensiones, salarios, rentas, y otros ingresos económicos (después de impuestos)
          </p>
          <p className="text-xs text-gold mt-1">
            ⚠️ Importante: Indica los ingresos NETOS (no brutos). El límite es de 7.250,60€ anuales
          </p>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-blue-300">
              Si no tienes ingresos o son muy bajos, escribe 0. El simulador considerará también los ingresos de tu unidad familiar en el siguiente paso.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Step5({ formData, updateFormData }: { formData: FormData; updateFormData: (field: keyof FormData, value: any) => void }) {
  const [localNumConvivientes, setLocalNumConvivientes] = useState<string>(String(formData.numeroConvivientes));

  // Sincronizar el estado local cuando cambia formData (ej: cuando el usuario selecciona "vivo solo")
  useEffect(() => {
    setLocalNumConvivientes(String(formData.numeroConvivientes));
  }, [formData.viveSolo]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h3 className="text-2xl font-bold mb-2">Unidad de convivencia</h3>
      <p className="text-gray-400 mb-8">Información sobre con quién vives</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            ¿Vives solo/a?
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => {
                updateFormData('viveSolo', true);
                updateFormData('numeroConvivientes', 1);
                updateFormData('conviveConyuge', false);
                setLocalNumConvivientes('1');
              }}
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                formData.viveSolo
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-gray-600 hover:border-gold/50'
              }`}
            >
              Sí, vivo solo/a
            </button>
            <button
              onClick={() => {
                updateFormData('viveSolo', false);
                if (formData.numeroConvivientes < 2) {
                  updateFormData('numeroConvivientes', 2);
                  setLocalNumConvivientes('2');
                }
              }}
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                !formData.viveSolo
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-gray-600 hover:border-gold/50'
              }`}
            >
              No, convivo con otras personas
            </button>
          </div>
        </div>

        {!formData.viveSolo && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">
                ¿Convives con tu cónyuge o pareja de hecho?
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => updateFormData('conviveConyuge', true)}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                    formData.conviveConyuge
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-gray-600 hover:border-gold/50'
                  }`}
                >
                  Sí
                </button>
                <button
                  onClick={() => updateFormData('conviveConyuge', false)}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                    !formData.conviveConyuge
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-gray-600 hover:border-gold/50'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Número total de personas en tu unidad familiar (incluyéndote)
              </label>
              <input
                type="number"
                min="2"
                max="10"
                value={localNumConvivientes}
                onChange={(e) => {
                  const value = e.target.value;
                  setLocalNumConvivientes(value);
                  
                  // Solo actualizar formData si es un número válido
                  const numValue = parseInt(value);
                  if (!isNaN(numValue) && numValue >= 2 && numValue <= 10) {
                    updateFormData('numeroConvivientes', numValue);
                  }
                }}
                onBlur={(e) => {
                  // Al perder el foco, asegurar que el valor esté en el rango correcto
                  const value = parseInt(e.target.value);
                  let finalValue = formData.numeroConvivientes;
                  
                  if (isNaN(value) || value < 2) {
                    finalValue = 2;
                  } else if (value > 10) {
                    finalValue = 10;
                  } else {
                    finalValue = value;
                  }
                  
                  setLocalNumConvivientes(String(finalValue));
                  updateFormData('numeroConvivientes', finalValue);
                }}
                className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-gold focus:outline-none text-white"
                placeholder="Ej: 3"
              />
              <p className="text-xs text-gray-400 mt-2">
                Mínimo 2 personas, máximo 10
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                ¿Entre las personas con las que convives están tus padres o hijos?
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => updateFormData('conviveConPadresOHijos', true)}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                    formData.conviveConPadresOHijos
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-gray-600 hover:border-gold/50'
                  }`}
                >
                  Sí
                </button>
                <button
                  onClick={() => updateFormData('conviveConPadresOHijos', false)}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                    !formData.conviveConPadresOHijos
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-gray-600 hover:border-gold/50'
                  }`}
                >
                  No
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Esto afecta al límite de ingresos permitidos
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Ingresos anuales totales NETOS de tu unidad familiar (€)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.ingresosAnualesFamiliares || ''}
                onChange={(e) => updateFormData('ingresosAnualesFamiliares', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-gold focus:outline-none text-white"
                placeholder="Ej: 15000"
              />
              <p className="text-xs text-gray-400 mt-2">
                Suma de todos los ingresos NETOS (después de impuestos) de las personas que conviven contigo
              </p>
              <p className="text-xs text-gold mt-1">
                ⚠️ Incluye también tus propios ingresos en este total
              </p>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

function Step6({ formData, updateFormData }: { formData: FormData; updateFormData: (field: keyof FormData, value: any) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h3 className="text-2xl font-bold mb-2">Información adicional</h3>
      <p className="text-gray-400 mb-8">Preguntas específicas para la pensión de invalidez</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            ¿Necesitas ayuda de una tercera persona para realizar actividades básicas de la vida diaria?
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => updateFormData('necesitaTerceraPersona', true)}
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                formData.necesitaTerceraPersona
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-gray-600 hover:border-gold/50'
              }`}
            >
              Sí
            </button>
            <button
              onClick={() => updateFormData('necesitaTerceraPersona', false)}
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                !formData.necesitaTerceraPersona
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-gray-600 hover:border-gold/50'
              }`}
            >
              No
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Si necesitas asistencia de otra persona, podrías tener derecho a un complemento adicional
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            ¿Actualmente estás trabajando o has empezado a trabajar en los últimos 4 años mientras cobrabas la pensión de invalidez?
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => updateFormData('trabajaConInvalidez', true)}
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                formData.trabajaConInvalidez
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-gray-600 hover:border-gold/50'
              }`}
            >
              Sí
            </button>
            <button
              onClick={() => updateFormData('trabajaConInvalidez', false)}
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                !formData.trabajaConInvalidez
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-gray-600 hover:border-gold/50'
              }`}
            >
              No
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Los primeros 4 años trabajando con invalidez tienen un límite de ingresos especial más alto
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ResultScreen({ result, resetSimulator, formData }: { result: SimulationResult; resetSimulator: () => void; formData: FormData }) {
  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-gradient-to-br from-gray-900/90 to-gray-800/50 backdrop-blur-sm border-2 border-gold/50 rounded-2xl p-8 md:p-12"
    >
      {/* Resultado principal */}
      <div className="text-center mb-8">
        {result.elegible ? (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center"
            >
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="text-3xl font-bold text-green-500 mb-4">¡Enhorabuena!</h3>
            <p className="text-xl text-gray-300 mb-2">
              Cumples con todos los requisitos para solicitar una
            </p>
            <p className="text-2xl font-bold gold-text-gradient mb-6">
              Pensión No Contributiva de {formData.tipoPension === 'jubilacion' ? 'Jubilación' : 'Invalidez'}
            </p>
            
            {/* Cuantía */}
            <div className="bg-gold/10 border-2 border-gold/30 rounded-xl p-6 mb-6">
              <p className="text-sm text-gray-400 mb-2">Cuantía estimada mensual</p>
              <p className="text-5xl font-bold gold-text-gradient mb-2">
                {result.cuantiaEstimada.toFixed(2)}€
              </p>
              <p className="text-sm text-gray-400">
                {result.cuantiaAnual.toFixed(2)}€ anuales (14 pagas)
              </p>
            </div>
          </>
        ) : (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center"
            >
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.div>
            <h3 className="text-3xl font-bold text-red-500 mb-4">Requisitos no cumplidos</h3>
            <p className="text-xl text-gray-300">
              Actualmente no cumples con todos los requisitos necesarios
            </p>
          </>
        )}
      </div>

      {/* Detalle de requisitos */}
      <div className="mb-8">
        <h4 className="text-xl font-bold mb-4">Detalle de requisitos</h4>
        <div className="space-y-3">
          {Object.entries(result.requisitos).map(([key, req]) => (
            <div
              key={key}
              className={`p-4 rounded-lg border-2 ${
                req.met
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-red-500/10 border-red-500/30'
              }`}
            >
              <div className="flex items-start gap-3">
                <svg
                  className={`w-6 h-6 flex-shrink-0 mt-0.5 ${
                    req.met ? 'text-green-500' : 'text-red-500'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {req.met ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  )}
                </svg>
                <div className="flex-1">
                  <p className="font-semibold mb-1">{req.label}</p>
                  <p className="text-sm text-gray-400">Requerido: {req.required}</p>
                  <p className="text-sm text-gray-300">Tu situación: {req.actual}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recomendaciones */}
      {result.recomendaciones.length > 0 && (
        <div className="mb-8 bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {result.elegible ? 'Próximos pasos' : 'Recomendaciones'}
          </h4>
          <ul className="space-y-2">
            {result.recomendaciones.map((recomendacion, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-gold mt-1">•</span>
                <span>{recomendacion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={resetSimulator}
          className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Hacer otra simulación
        </button>
        
        {result.elegible && (
          <Link
            href="https://compromisolegal.es"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-gold to-yellow-500 text-black rounded-lg font-medium hover:shadow-lg hover:shadow-gold/50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Contactar con expertos
          </Link>
        )}
      </div>
    </motion.div>
  );
}

