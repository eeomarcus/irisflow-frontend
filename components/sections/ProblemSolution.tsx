"use client"

import React from "react"
import { X, Check } from "lucide-react"
import { motion } from "framer-motion"

export function ProblemSolution() {
  const problems = [
    "Soluções existentes custam entre R$ 15.000 e R$ 80.000",
    "Interface somente em inglês",
    "Hardware proprietário obrigatório",
    "Sem suporte nem treinamento para famílias",
  ]

  const solutions = [
    "Assinatura mensal a partir de R$ 79",
    "Interface 100% em português",
    "Qualquer webcam USB ou embutida",
    "Chatbot GPT-4o + WhatsApp integrado",
  ]

  return (
    <section id="problema-solucao" className="py-20 overflow-hidden bg-white dark:bg-dark-bg transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-black text-iris-blue dark:text-white mb-4">
            Democratizando o Acesso à Comunicação
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-body text-base sm:text-lg">
            Quebramos as barreiras financeiras e tecnológicas para devolver a independência a quem precisa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* PROBLEMA CARD */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-slate-900 text-slate-100 p-8 sm:p-10 flex flex-col justify-between border border-slate-800 shadow-xl"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-6">
                <X className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black mb-4 text-white">
                O problema que ninguém quer encarar
              </h3>
              <p className="text-slate-450 text-sm sm:text-base leading-relaxed mb-8">
                Mais de 5 milhões de brasileiros vivem com paralisia ou doenças neurodegenerativas que comprometem a comunicação.
              </p>
              
              <ul className="space-y-4">
                {problems.map((prob) => (
                  <li key={prob} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mt-0.5 border border-red-500/20">
                      <X className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                    <span className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">{prob}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-800/80 text-xs text-slate-500">
              * Estimativa de custo baseada em dispositivos importados.
            </div>
          </motion.div>

          {/* SOLUÇÃO CARD */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-iris-teal text-white p-8 sm:p-10 flex flex-col justify-between border border-emerald-600/30 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white mb-6 animate-pulse">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black mb-4 text-white">
                A solução que o Brasil precisava
              </h3>
              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mb-8">
                Plataforma SaaS acessível que roda direto no navegador usando qualquer webcam comum.
              </p>

              <ul className="space-y-4">
                {solutions.map((sol) => (
                  <li key={sol} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center mt-0.5 border border-white/30">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                    <span className="text-white text-sm sm:text-base font-semibold leading-relaxed">{sol}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-8 border-t border-emerald-400/20 text-xs text-emerald-100/70 relative z-10">
              ✓ Processamento local de dados (100% em conformidade com a LGPD).
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
