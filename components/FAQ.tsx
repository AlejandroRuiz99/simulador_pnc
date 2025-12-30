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
      question: '¿Cuánto se cobra en 2026?',
      answer: 'La cuantía máxima para 2026 es de 628,80€ mensuales (8.803,2€ anuales en 14 pagas). La cantidad puede variar según tus ingresos personales y familiares. Si vives en familia, la cuantía se calcula proporcionalmente.',
    },
    {
      question: '¿Es compatible con trabajar?',
      answer: 'Solo la pensión de invalidez no contributiva es compatible con trabajar. Durante los primeros 4 años trabajando, se aplica un límite de ingresos especial más alto (16.003,2€ anuales). La pensión de jubilación no contributiva no es compatible con trabajo. ¿Tu caso es específico? Nuestros expertos te asesoran personalmente y te ayudamos a maximizar tus derechos.',
    },
    {
      question: '¿Se puede cobrar junto a otras ayudas?',
      answer: 'No es compatible con otras pensiones de la Seguridad Social del sistema español o de otros países, excepto con las pensiones de viudedad. Sí puede ser compatible con algunas ayudas autonómicas o locales. Déjanos estudiar tu caso: analizamos todas las ayudas que puedes solicitar simultáneamente.',
    },
    {
      question: '¿Cuánto tarda la resolución?',
      answer: 'El plazo máximo legal es de 90 días desde la presentación de la solicitud completa con toda la documentación. Si en ese plazo no hay resolución expresa, se entiende desestimada (silencio administrativo negativo).',
    },
    {
      question: '¿Puedo solicitarla o cobrarla desde el extranjero?',
      answer: 'Las pensiones no contributivas están pensadas para residentes en España. Sin embargo, existen las pensiones de ancianidad (modalidad no contributiva especial) que se reconocen a españoles de origen que viven en el extranjero y cumplen ciertos requisitos específicos. ¿Vives fuera de España? Nuestro equipo te asesora sobre las opciones disponibles y gestiona todo el proceso contigo, sin importar dónde estés.',
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
      question: '¿Qué documentación necesito y dónde la presento?',
      answer: '¡Deja que nosotros nos encarguemos! En Compromiso Legal gestionamos todo el proceso por ti: recopilamos la documentación necesaria, revisamos que esté completa y correcta, presentamos tu solicitud ante la Seguridad Social y hacemos el seguimiento hasta la resolución. Tú solo tienes que sentarte y esperar. Contacta con nosotros y te lo ponemos fácil.',
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
            Todo lo que necesitas saber sobre las pensiones no contributivas
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
            ¿Listo para solicitar tu pensión sin complicaciones?
          </p>
          <a
            href="https://compromisolegal.es"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-yellow-500 text-black rounded-lg font-bold hover:shadow-lg hover:shadow-gold/50 transition-all duration-300"
          >
            Nosotros gestionamos tu solicitud
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

