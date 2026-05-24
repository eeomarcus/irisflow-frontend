"use client"

import React, { useState, useEffect } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"

function Counter({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    const controls = animate(count, value, {
      duration: duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest).toString())
      },
    })
    return () => controls.stop()
  }, [value, duration, count])

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  )
}

export function Impact() {
  const metrics = [
    { value: 5, suffix: "M+", desc: "brasileiros que precisam de tecnologia assistiva" },
    { value: 95, suffix: "%", desc: "mais barato que as soluções concorrentes" },
    { value: 30, suffix: " dias", desc: "de trial gratuito para você testar sem cartão" },
    { value: 10, suffix: "k", desc: "usuários ativos projetados até 2030" },
  ]

  const odsBadges = [
    { id: "ODS 3", name: "Saúde e Bem-Estar", color: "bg-emerald-600 dark:bg-emerald-700" },
    { id: "ODS 9", name: "Indústria, Inovação e Infraestrutura", color: "bg-orange-600 dark:bg-orange-700" },
    { id: "ODS 10", name: "Redução das Desigualdades", color: "bg-rose-600 dark:bg-rose-700" },
    { id: "ODS 17", name: "Parcerias e Meios de Implementação", color: "bg-blue-800 dark:bg-blue-900" },
  ]

  return (
    <section id="impacto" className="py-24 bg-white dark:bg-dark-bg transition-colors duration-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Métricas (Coluna Esquerda) */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:col-span-7">
            {metrics.map((metric) => (
              <div
                key={metric.desc}
                className="bg-slate-50 dark:bg-dark-card border border-slate-200/50 dark:border-slate-800 p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:shadow-sm"
              >
                <div className="text-4xl sm:text-5xl font-display font-black text-iris-teal mb-3 tracking-tight">
                  <Counter value={metric.value} suffix={metric.suffix} />
                </div>
                <p className="text-xs sm:text-sm font-body text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  {metric.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Texto de Propósito + Badges ODS (Coluna Direita) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-iris-blue/10 border border-iris-blue/20 text-iris-blue dark:text-iris-teal dark:bg-iris-teal/10 dark:border-iris-teal/20 rounded-full text-xs font-semibold uppercase tracking-wider">
              Impacto ESG & Social
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-display font-black text-iris-blue dark:text-white leading-tight">
              Tecnologia com propósito real.
            </h2>
            
            <p className="text-slate-650 dark:text-slate-350 font-body text-base sm:text-lg leading-relaxed">
              Cada licença vendida na modalidade comercial ajuda a financiar uma licença gratuita para pacientes do SUS pelo programa <strong className="text-iris-teal font-bold">IrisFlow Doa</strong>. Porque acreditamos que o acesso à comunicação e à dignidade é um direito humano básico, não um privilégio financeiro.
            </p>

            <div className="pt-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-display">
                Alinhado com os Objetivos de Desenvolvimento Sustentável da ONU
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {odsBadges.map((ods) => (
                  <span
                    key={ods.id}
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm border border-black/10 select-none cursor-default ${ods.color}`}
                    title={ods.name}
                  >
                    {ods.id} · {ods.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
