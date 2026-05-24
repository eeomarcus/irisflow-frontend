"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Check } from "lucide-react"
import { motion } from "framer-motion"

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: "Familiar",
      price: isAnnual ? 63 : 79,
      period: "mês",
      description: "Para pacientes e famílias em casa",
      features: [
        "1 dispositivo ativo",
        "Acesso ao dashboard web completo",
        "Teclado virtual + voz PT-BR nativa",
        "Chatbot com IA GPT-4o",
        "Integração de envio WhatsApp",
        "Suporte por e-mail e tutoriais",
      ],
      cta: "Começar grátis",
      ctaLink: "/cadastro",
      popular: false,
      variant: "familiar",
    },
    {
      name: "Clínica",
      price: isAnnual ? 279 : 349,
      period: "mês",
      description: "Para clínicas e consultórios",
      features: [
        "Até 10 dispositivos ativos",
        "Painel B2B de gestão de pacientes",
        "Calibração por perfil de paciente",
        "Relatórios de uso e progressão clínica",
        "Suporte por WhatsApp prioritário",
        "Tudo do plano Familiar",
      ],
      cta: "Começar grátis",
      ctaLink: "/cadastro",
      popular: true,
      variant: "clinica",
    },
    {
      name: "Hospitalar",
      price: isAnnual ? 1192 : 1490,
      period: "mês",
      description: "Para hospitais e redes de saúde",
      features: [
        "Dispositivos ilimitados",
        "Integração com prontuário eletrônico",
        "SLA de suporte dedicado 24/7",
        "Treinamento presencial de equipes",
        "Painel analítico customizado",
        "Acesso completo à API de integração",
      ],
      cta: "Falar com o time",
      ctaLink: "/sobre",
      popular: false,
      variant: "hospitalar",
    },
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  } as const

  return (
    <section id="planos" className="py-24 bg-white dark:bg-dark-bg transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-display font-black text-iris-blue dark:text-white mb-4">
            Planos para cada realidade
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-body text-base sm:text-lg mb-8">
            Comece com 30 dias de teste gratuito completo. Sem cartão de crédito necessário.
          </p>

          {/* Toggle de Faturamento */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-semibold transition-colors ${!isAnnual ? "text-iris-teal font-bold" : "text-slate-500"}`}>
              Mensal
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 flex items-center bg-slate-200 dark:bg-slate-800 rounded-full p-1 cursor-pointer transition-colors focus:outline-none"
              aria-label="Alternar faturamento mensal/anual"
            >
              <div
                className={`w-6 h-6 rounded-full bg-iris-teal transition-transform duration-300 ${
                  isAnnual ? "transform translate-x-6" : ""
                }`}
              />
            </button>
            <span className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${isAnnual ? "text-iris-teal font-bold" : "text-slate-500"}`}>
              Anual
              <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-bold">
                Economize 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-stretch"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={`rounded-3xl p-8 flex flex-col justify-between border transition-all duration-300 relative ${
                plan.popular
                  ? "bg-slate-50 dark:bg-dark-card border-iris-teal shadow-xl lg:-translate-y-4 hover:-translate-y-6"
                  : "bg-white dark:bg-dark-card border-slate-200/70 dark:border-slate-800 hover:-translate-y-2"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-iris-teal text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                  Mais popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-display font-bold text-slate-800 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-body">
                  {plan.description}
                </p>

                {/* Preço */}
                <div className="flex items-baseline text-slate-900 dark:text-white mb-8">
                  <span className="text-2xl font-bold tracking-tight">R$</span>
                  <span className="text-5xl font-black tracking-tight font-display mx-1">{plan.price}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">/{plan.period}</span>
                </div>

                {/* Features List */}
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-iris-teal/10 dark:bg-iris-teal/5 text-iris-teal flex items-center justify-center mt-0.5 border border-iris-teal/20">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span className="text-sm font-body text-slate-650 dark:text-slate-350 leading-tight">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botão de Ação */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <Link
                  href={plan.ctaLink}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm text-center flex items-center justify-center transition-all cursor-pointer ${
                    plan.popular
                      ? "bg-iris-teal text-white hover:bg-iris-teal/90 shadow-md hover:shadow-iris-teal/10"
                      : plan.variant === "hospitalar"
                      ? "border border-iris-blue text-iris-blue dark:border-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      : "border border-iris-teal text-iris-teal hover:bg-iris-teal/5"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Rodapé Pricing */}
        <div className="text-center mt-12 text-xs text-slate-550 dark:text-slate-400">
          Planos customizados para o SUS, hospitais públicos e ONGs estão disponíveis via editais.{" "}
          <Link href="/sobre" className="text-iris-teal hover:underline font-semibold">
            Fale com a nossa equipe comercial.
          </Link>
        </div>
      </div>
    </section>
  )
}
