'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Requirements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const requirements = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Edad',
      jubilacion: '65 años o más',
      invalidez: 'Entre 18 y 65 años',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: 'Residencia en España',
      jubilacion: 'Al menos 10 años (2 consecutivos antes de solicitar)',
      invalidez: 'Al menos 5 años (2 consecutivos antes de solicitar)',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Ingresos',
      jubilacion: 'Menos de 7.250,60€ anuales',
      invalidez: 'Menos de 7.250,60€ anuales',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Requisito Especial (Invalidez)',
      jubilacion: 'No aplica',
      invalidez: 'Grado de discapacidad ≥ 65%',
      onlyInvalidez: true,
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Requisitos para Acceder
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Estos son los requisitos que debes cumplir según el tipo de pensión
          </p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-gold/20 border border-gold/50 rounded-full px-6 py-3">
              <div className="w-3 h-3 bg-gold rounded-full animate-pulse" />
              <span className="font-semibold">Pensión de Jubilación</span>
            </div>
            <div className="flex items-center gap-2 bg-gold/20 border border-gold/50 rounded-full px-6 py-3">
              <div className="w-3 h-3 bg-gold rounded-full animate-pulse" />
              <span className="font-semibold">Pensión de Invalidez</span>
            </div>
          </div>

          {/* Comparativa de requisitos */}
          <div className="grid md:grid-cols-2 gap-8">
            {requirements.map((req, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-gold/20 rounded-xl p-6 hover:border-gold/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gold/20 rounded-lg text-gold">
                    {req.icon}
                  </div>
                  <h3 className="text-xl font-bold">{req.title}</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-black/30 rounded-lg p-4 border-l-4 border-blue-500">
                    <p className="text-sm text-gray-400 mb-1">Jubilación:</p>
                    <p className="text-white font-medium">{req.jubilacion}</p>
                  </div>
                  <div className={`bg-black/30 rounded-lg p-4 border-l-4 ${req.onlyInvalidez ? 'border-gold' : 'border-purple-500'}`}>
                    <p className="text-sm text-gray-400 mb-1">Invalidez:</p>
                    <p className="text-white font-medium">{req.invalidez}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Nota importante */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border border-gold/30 rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <svg className="w-6 h-6 text-gold flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="font-bold text-gold mb-2">Importante</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Los límites de ingresos pueden variar si convives con familiares. Si vives con tu cónyuge, 
                  hijos menores de 25 años, o hijos con discapacidad, se aplican límites diferentes. 
                  El simulador te ayudará a calcular tu situación específica.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

