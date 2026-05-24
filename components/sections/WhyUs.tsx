"use client"

import React from "react"
import { DollarSign, Globe, Camera, Brain, MessageSquareCode, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"

export function WhyUs() {
  const features = [
    {
      icon: DollarSign,
      title: "10x mais barato",
      description: "Tobii e concorrentes cobram de R$ 15k a 80k. Nós oferecemos planos a partir de R$ 79/mês.",
    },
    {
      icon: Globe,
      title: "Português nativo",
      description: "Toda a interface, síntese de voz calibrada e o suporte técnico são 100% em PT-BR.",
    },
    {
      icon: Camera,
      title: "Sem hardware especial",
      description: "Esqueça óculos pesados ou barras sensoras. Funciona em qualquer webcam convencional USB.",
    },
    {
      icon: Brain,
      title: "IA conversacional",
      description: "Chatbot com GPT-4o integrado para predição natural de frases complexas do cotidiano.",
    },
    {
      icon: MessageSquareCode,
      title: "WhatsApp integrado",
      description: "Envie mensagens de texto diretamente do teclado virtual para os contatos cadastrados.",
    },
    {
      icon: ShieldCheck,
      title: "Privacidade por design",
      description: "Os dados de imagem e calibração são processados 100% localmente e nunca salvos na nuvem.",
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

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as const

  return (
    <section
      id="features"
      className="py-24 bg-slate-900 dark:bg-dark-bg text-white transition-colors duration-200 relative overflow-hidden"
    >
      {/* Detalhes de iluminação no fundo */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-iris-teal/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-iris-blue/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-display font-black text-white mb-4"
          >
            Por que escolher a IrisFlow?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 font-body text-base sm:text-lg"
          >
            Uma plataforma de comunicação projetada especificamente para as necessidades das famílias brasileiras.
          </motion.p>
        </div>

        {/* Grid 2x3 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feat) => {
            const Icon = feat.icon
            return (
              <motion.div
                key={feat.title}
                variants={itemVariants}
                className="glassmorphism rounded-2xl p-8 hover:bg-white/10 dark:hover:bg-slate-900/40 hover:-translate-y-1.5 transition-all duration-300 group border border-white/10"
              >
                {/* Ícone com Glow */}
                <div className="w-12 h-12 rounded-2xl bg-iris-teal/20 text-iris-teal flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(0,166,147,0.2)] group-hover:shadow-[0_0_20px_rgba(0,166,147,0.4)]">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Título */}
                <h3 className="text-xl font-display font-bold text-white mb-3 tracking-wide">
                  {feat.title}
                </h3>
                
                {/* Descrição */}
                <p className="text-sm font-body text-slate-350 leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
