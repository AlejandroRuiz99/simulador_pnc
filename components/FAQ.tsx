'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: '¿Qué es una pensión no contributiva?',
      answer: 'Es una prestación económica que otorga la Seguridad Social a personas en situación de necesidad que no han cotizado lo suficiente para acceder a una pensión contributiva. Su objetivo es garantizar un ingreso mínimo.',
    },
    {
      question: '¿Cuánto se cobra en 2025?',
      answer: 'La cuantía máxima para 2025 es de 517,90€ mensuales (7.250,60€ anuales en 14 pagas). La cantidad puede variar según tus ingresos personales y familiares. Si vives en familia, la cuantía se calcula proporcionalmente.',
    },
    {
      question: '¿Es compatible con trabajar?',
      answer: 'Sí, puedes trabajar y mantener la pensión no contributiva. Sin embargo, los ingresos del trabajo se tendrán en cuenta y pueden reducir la cuantía de la pensión o incluso suspenderla si superas los límites establecidos.',
    },
    {
      question: '¿Se puede cobrar junto a otras ayudas?',
      answer: 'No es compatible con otras pensiones de la Seguridad Social del sistema español o de otros países, excepto con las pensiones de viudedad. Sí puede ser compatible con algunas ayudas autonómicas o locales. Consulta tu caso específico.',
    },
    {
      question: '¿Cuánto tarda la resolución?',
      answer: 'El plazo máximo legal es de 90 días desde la presentación de la solicitud completa con toda la documentación. Si en ese plazo no hay resolución expresa, se entiende desestimada (silencio administrativo negativo).',
    },
    {
      question: '¿Puedo solicitarla desde el extranjero?',
      answer: 'Sí, si eres español en el extranjero, puedes presentar la solicitud a través de los consulados o embajadas de España. Debes cumplir igualmente con todos los requisitos de residencia previa en España.',
    },
    {
      question: '¿La pensión incluye asistencia sanitaria?',
      answer: 'Sí, al reconocerse la pensión no contributiva, automáticamente tienes derecho a la tarjeta sanitaria y a la asistencia médica y farmacéutica gratuita de la Seguridad Social.',
    },
    {
      question: '¿Se actualiza cada año?',
      answer: 'Sí, las cuantías de las pensiones no contributivas se actualizan anualmente en los Presupuestos Generales del Estado, generalmente para mantener el poder adquisitivo frente a la inflación.',
    },
    {
      question: '¿Qué documentación necesito?',
      answer: 'Necesitarás: DNI/NIE, certificado de empadronamiento histórico, libro de familia (si procede), declaración de la renta o certificados de ingresos de todos los miembros de la unidad familiar, certificados bancarios y, para invalidez, certificado de discapacidad del 65% o superior.',
    },
    {
      question: '¿Dónde presento la solicitud?',
      answer: 'Puedes presentar la solicitud en: oficinas de la Seguridad Social (con cita previa), centros de atención e información de la Seguridad Social, oficinas de registro, o por internet si dispones de certificado digital o Cl@ve.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Preguntas <span className="gold-text-gradient">Frecuentes</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Resuelve tus dudas sobre las pensiones no contributivas
          </p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-gradient-to-br from-gray-900/90 to-gray-800/50 backdrop-blur-sm border border-gold/20 rounded-xl overflow-hidden hover:border-gold/50 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold text-lg pr-4">{faq.question}</span>
                <motion.svg
                  className="w-6 h-6 text-gold flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-300 leading-relaxed border-t border-gold/10 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA de contacto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-300 mb-6">
            ¿Tienes más preguntas? Nuestro equipo de expertos puede ayudarte
          </p>
          <a
            href="https://compromisolegal.es"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-yellow-500 text-black rounded-lg font-bold hover:shadow-lg hover:shadow-gold/50 transition-all duration-300"
          >
            Contactar con expertos
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

