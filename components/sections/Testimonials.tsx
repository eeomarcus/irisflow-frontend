"use client"

import React from "react"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

export function Testimonials() {
  const reviews = [
    {
      initials: "AP",
      name: "Ana Paula",
      role: "Terapeuta Ocupacional — Hospital das Clínicas, SP",
      rating: 5,
      text: "Finalmente uma solução que consigo indicar para as famílias sem constrangimento pelo preço. O suporte humanizado em português fez toda a diferença na adaptação do paciente.",
    },
    {
      initials: "RA",
      name: "Dr. Renato Alves",
      role: "Neurologista — Santa Casa de Belo Horizonte",
      rating: 5,
      text: "Em apenas 3 semanas de piloto, dois pacientes com ELA avançada voltaram a se comunicar ativamente com a família. Um resultado terapêutico e emocional que não víamos há anos.",
    },
    {
      initials: "MC",
      name: "Mariana Costa",
      role: "Cuidadora Familiar — São Paulo",
      rating: 5,
      text: "Meu pai conseguiu mandar uma mensagem de WhatsApp para minha filha apenas com o olhar. Nenhum de nós na sala conseguiu conter as lágrimas. Agradeço todos os dias pelo IrisFlow.",
    },
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  } as const

  return (
    <section id="depoimentos" className="py-24 bg-slate-50 dark:bg-dark-card/50 transition-colors duration-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-4xl font-display font-black text-iris-blue dark:text-white mb-4">
            Histórias reais de autonomia e dignidade
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-body text-base sm:text-lg">
            O que dizem os profissionais de saúde e cuidadores familiares que usam o IrisFlow diariamente.
          </p>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {reviews.map((rev) => (
            <motion.div
              key={rev.name}
              variants={cardVariants}
              className="bg-white dark:bg-dark-card border border-slate-200/60 dark:border-slate-800 rounded-2xl p-8 relative shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
            >
              {/* Aspas Decorativas Gigantes */}
              <div className="absolute top-4 right-6 text-7xl font-serif text-iris-teal/15 select-none pointer-events-none font-bold">
                “
              </div>

              <div className="relative z-10 space-y-4">
                {/* Estrelas */}
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current stroke-0" />
                  ))}
                </div>

                {/* Texto */}
                <p className="text-sm font-body text-slate-600 dark:text-slate-350 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Informações do Autor */}
              <div className="flex items-center gap-3.5 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-iris-teal/10 border border-iris-teal/20 text-iris-teal flex items-center justify-center text-sm font-bold font-display select-none">
                  {rev.initials}
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-display font-bold text-slate-800 dark:text-white">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] text-slate-450 dark:text-slate-450 font-body leading-none">
                    {rev.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
