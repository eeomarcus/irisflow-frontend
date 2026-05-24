"use client"

import React from "react"
import { Eye, Keyboard, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Eye,
      title: "Detecção da Íris",
      description:
        "Sua webcam comum captura o movimento dos olhos em tempo real. Nosso algoritmo inteligente mapeia os pontos do rosto com baixíssima latência.",
    },
    {
      number: "02",
      icon: Keyboard,
      title: "Teclado Virtual Inteligente",
      description:
        "O olhar fixa nas letras, palavras ou frases rápidas no teclado digital. O sistema aprende seus padrões para acelerar a digitação gradualmente.",
    },
    {
      number: "03",
      icon: MessageSquare,
      title: "Voz, Chat e WhatsApp",
      description:
        "O texto é vocalizado em português nativo, alimenta um assistente de IA com GPT-4o e envia mensagens direto pelo WhatsApp sem usar as mãos.",
    },
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as const

  return (
    <section id="como-funciona" className="py-20 bg-slate-50 dark:bg-dark-card/50 transition-colors duration-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-black text-iris-blue dark:text-white mb-4">
            Como o IrisFlow funciona
          </h2>
          <p className="text-slate-550 dark:text-slate-400 font-body text-base sm:text-lg">
            Três passos simples para devolver a autonomia e conectar as pessoas novamente com o mundo.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {/* Linha Conectora em Desktop */}
          <div className="hidden md:block absolute top-[4.5rem] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-iris-teal/10 via-iris-teal/30 to-iris-teal/10 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                variants={cardVariants}
                className="bg-white dark:bg-dark-card border border-slate-200/60 dark:border-slate-800 rounded-2xl p-8 relative shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 z-10 border-l-2 hover:border-l-iris-teal"
              >
                {/* Cabeçalho do Card */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-iris-teal/10 dark:bg-iris-teal/5 border border-iris-teal/20 text-iris-teal flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-4xl font-display font-black text-slate-100 dark:text-slate-800 select-none">
                    {step.number}
                  </span>
                </div>

                {/* Conteúdo */}
                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-slate-100 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm font-body text-slate-500 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
