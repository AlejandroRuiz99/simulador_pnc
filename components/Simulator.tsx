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

  const totalSteps = formData.tipoPension === 'invalidez' ? 6 : 5;

  const nextStep = () => {
    if (currentStep === totalSteps) {
      // Calcular resultado
      const resultado = calcularElegibilidad(formData);
      setResult(resultado);
    } else {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetSimulator = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setResult(null);
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Calcular edad automáticamente cuando se cambia fecha de nacimiento
      if (field === 'fechaNacimiento' && value) {
        updated.edad = calcularEdad(value);
      }
      
      return updated;
    });
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
            {!result ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8"
              >
                {/* Indicador de progreso */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">
                      Paso {currentStep} de {totalSteps}
                    </span>
                    <span className="text-sm text-gold font-semibold">
                      {Math.round((currentStep / totalSteps) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-gold to-yellow-500 h-2 rounded-full"
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
          className={`p-6 rounded-lg border-2 transition-all text-left ${
            formData.tipoPension === 'jubilacion'
              ? 'border-gold bg-gold/10'
              : 'border-gray-700 hover:border-gold/50'
          }`}
        >
          <div className="text-3xl mb-3">👴</div>
          <h4 className="text-xl font-bold mb-2">Jubilación</h4>
          <p className="text-gray-400 text-sm">
            Para personas de 65 años o más que no han cotizado lo suficiente
          </p>
        </button>

        <button
          onClick={() => updateFormData('tipoPension', 'invalidez')}
          className={`p-6 rounded-lg border-2 transition-all text-left ${
            formData.tipoPension === 'invalidez'
              ? 'border-gold bg-gold/10'
              : 'border-gray-700 hover:border-gold/50'
          }`}
        >
          <div className="text-3xl mb-3">♿</div>
          <h4 className="text-xl font-bold mb-2">Invalidez</h4>
          <p className="text-gray-400 text-sm">
            Para personas de 18-65 años con discapacidad ≥65%
          </p>
        </button>
      </div>
    </motion.div>
  );
}

function Step2({ formData, updateFormData }: { formData: FormData; updateFormData: (field: keyof FormData, value: any) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h3 className="text-2xl font-bold mb-2">Datos personales</h3>
      <p className="text-gray-400 mb-8">Necesitamos conocer tu edad{formData.tipoPension === 'invalidez' ? ' y grado de discapacidad' : ''}</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Fecha de nacimiento
          </label>
          <input
            type="date"
            value={formData.fechaNacimiento}
            onChange={(e) => updateFormData('fechaNacimiento', e.target.value)}
            className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-gold focus:outline-none text-white"
          />
          {formData.edad > 0 && (
            <p className="text-sm text-gray-400 mt-2">
              Tienes {formData.edad} años
            </p>
          )}
        </div>

        {formData.tipoPension === 'invalidez' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">
                ¿Tienes reconocido un grado de discapacidad?
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
                  value={formData.gradoDiscapacidad || ''}
                  onChange={(e) => updateFormData('gradoDiscapacidad', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-gold focus:outline-none text-white"
                  placeholder="Ej: 65"
                />
                <p className="text-xs text-gray-400 mt-2">
                  Se requiere un mínimo del 65% para la pensión de invalidez
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
      <p className="text-gray-400 mb-8">Información sobre tu residencia legal en España</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            ¿Cuántos años has residido legalmente en España?
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
              ? 'Se requieren al menos 10 años para jubilación'
              : 'Se requieren al menos 5 años para invalidez'}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            ¿Has residido en España de forma consecutiva e ininterrumpida los últimos 2 años?
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
      <p className="text-gray-400 mb-8">Tus ingresos anuales</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            ¿Cuáles son tus ingresos anuales NETOS? (€)
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
            Incluye pensiones, salarios, rentas, ayudas y cualquier otro ingreso después de impuestos
          </p>
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
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8"
    >
      <div className="text-center mb-8">
        {result.elegible ? (
          <>
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-3xl font-bold mb-2 text-gold">
              ¡Buenas noticias!
            </h3>
            <p className="text-xl text-gray-300">
              Cumples con los requisitos
            </p>
          </>
        ) : (
          <>
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-3xl font-bold mb-2 text-yellow-500">
              Requisitos no cumplidos
            </h3>
            <p className="text-xl text-gray-300">
              Según los datos proporcionados
            </p>
          </>
        )}
      </div>

      {/* Cuantía estimada */}
      {result.elegible && result.cuantiaEstimada > 0 && (
        <div className="bg-gold/10 border border-gold/30 rounded-lg p-6 mb-6">
          <p className="text-sm text-gray-300 mb-2">Cuantía estimada mensual:</p>
          <p className="text-4xl font-bold gold-text-gradient mb-2">
            {result.cuantiaEstimada.toFixed(2)}€
          </p>
          <p className="text-sm text-gray-400">
            Aproximadamente {result.cuantiaAnual.toFixed(2)}€ anuales (14 pagas)
          </p>
        </div>
      )}

      {/* Requisitos detallados */}
      <div className="space-y-4 mb-8">
        <h4 className="font-semibold text-lg mb-4">Requisitos evaluados:</h4>
        
        {Object.entries(result.requisitos).map(([key, req]) => (
          <div
            key={key}
            className={`p-4 rounded-lg border-2 ${
              req.met
                ? 'bg-green-900/20 border-green-500/50'
                : 'bg-red-900/20 border-red-500/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">
                {req.met ? '✓' : '✗'}
              </div>
              <div className="flex-1">
                <h5 className="font-semibold mb-1">{req.label}</h5>
                <p className="text-sm text-gray-400">
                  Requerido: {req.required}
                </p>
                <p className="text-sm text-gray-300">
                  Tu situación: {req.actual}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mensajes */}
      {result.mensajes.length > 0 && (
        <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-6 mb-6">
          {result.mensajes.map((msg, idx) => (
            <p key={idx} className="text-gray-300 mb-2 last:mb-0">
              {msg}
            </p>
          ))}
        </div>
      )}

      {/* Recomendaciones */}
      {result.recomendaciones.length > 0 && (
        <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-6 mb-6">
          <h5 className="font-semibold mb-3 text-yellow-400">Recomendaciones:</h5>
          <ul className="space-y-2">
            {result.recomendaciones.map((rec, idx) => (
              <li key={idx} className="text-gray-300 flex items-start gap-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={resetSimulator}
          className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200"
        >
          Nueva simulación
        </button>
        {result.elegible && (
          <Link
            href="https://sede.seg-social.gob.es/wps/portal/sede/sede/Inicio"
            target="_blank"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-gold to-yellow-500 text-black rounded-lg font-medium text-center hover:shadow-lg hover:shadow-gold/50 transition-all duration-200"
          >
            Solicitar en INSS
          </Link>
        )}
      </div>
    </motion.div>
  );
}

