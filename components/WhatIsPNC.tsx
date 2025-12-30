'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function WhatIsPNC() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {/* Título */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Qué es una{' '}
              <span className="gold-text-gradient">Pensión No Contributiva</span>?
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto mt-6 rounded-full" />
          </motion.div>

          {/* Descripción principal */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gold/20 rounded-2xl p-8 md:p-12 mb-12"
          >
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              Las <span className="text-gold font-semibold">Pensiones No Contributivas (PNC)</span> son prestaciones económicas que 
              la Seguridad Social otorga a las personas que se encuentran en situación de <span className="text-white font-semibold">necesidad</span> y 
              que <span className="text-white font-semibold">no han cotizado lo suficiente</span> para acceder a una pensión contributiva.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Su objetivo es garantizar un <span className="text-gold font-semibold">ingreso mínimo</span> a quienes carecen de recursos 
              suficientes para su subsistencia.
            </p>
          </motion.div>

          {/* Tipos de pensiones */}
          <motion.div variants={itemVariants} className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Tipos de Pensiones No Contributivas
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Pensión de Jubilación */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gradient-to-br from-gold/10 to-transparent border border-gold/30 rounded-xl p-8 hover:border-gold/60 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gold/20 rounded-full">
                    <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gold">Pensión de Jubilación</h4>
                </div>
                <p className="text-gray-300 mb-4">
                  Para personas de <span className="text-white font-semibold">65 años o más</span> que no han cotizado 
                  lo suficiente para una pensión contributiva.
                </p>
                <div className="flex items-start gap-2 text-sm text-gray-400">
                  <svg className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Edad mínima: 65 años</span>
                </div>
              </motion.div>

              {/* Pensión de Invalidez */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gradient-to-br from-gold/10 to-transparent border border-gold/30 rounded-xl p-8 hover:border-gold/60 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gold/20 rounded-full">
                    <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-gold">Pensión de Invalidez</h4>
                </div>
                <p className="text-gray-300 mb-4">
                  Para personas de <span className="text-white font-semibold">18 a 65 años</span> con un grado de 
                  discapacidad <span className="text-white font-semibold">igual o superior al 65%</span>.
                </p>
                <div className="flex items-start gap-2 text-sm text-gray-400">
                  <svg className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Discapacidad ≥ 65%</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Cuantía actual */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 border-2 border-gold/40 rounded-2xl p-8 text-center"
          >
            <h3 className="text-xl font-semibold text-gray-300 mb-4">
              Cuantía 2026
            </h3>
            <div className="text-5xl md:text-6xl font-bold gold-text-gradient mb-2">
              628,80€
            </div>
            <p className="text-gray-400">
              mensuales (14 pagas) · <span className="text-gold">8.803,2€</span> anuales
            </p>
            <p className="text-sm text-gray-500 mt-4">
              *La cuantía puede variar según los ingresos y la unidad de convivencia
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

