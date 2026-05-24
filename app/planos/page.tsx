"use client"

import React, { useState } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Pricing } from "@/components/sections/Pricing"
import { ChevronDown, ChevronUp, Check, Minimize2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FAQItem {
  question: string
  answer: string
}

function FAQAccordion({ question, answer }: FAQItem) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-slate-200/60 dark:border-slate-800/80 py-4 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left font-display font-bold text-slate-800 dark:text-slate-200 hover:text-iris-teal transition-colors py-2 cursor-pointer focus:outline-none"
      >
        <span className="text-sm sm:text-base pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-iris-teal flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400 dark:text-slate-650 flex-shrink-0" />
        )}
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-body pt-2 pb-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Planos() {
  const faqs = [
    {
      question: "Preciso comprar uma câmera especial para usar o IrisFlow?",
      answer: "Não! Esse é o nosso maior diferencial. O IrisFlow foi otimizado para rodar em webcams comuns (embutidas de notebooks ou modelos USB simples de R$ 80). Não há necessidade de óculos especiais, barras sensoras infravermelhas caras ou computadores potentes.",
    },
    {
      question: "Como funciona a calibração ocular?",
      answer: "Ao iniciar o aplicativo, o usuário passa por um processo de calibração rápido de 1 minuto: basta olhar fixamente para alguns pontos coloridos que piscam nos cantos da tela. O algoritmo mapeia os contornos faciais e ajusta a sensibilidade para o padrão de olhar daquele usuário.",
    },
    {
      question: "Posso cancelar minha assinatura a qualquer momento?",
      answer: "Sim. Nossos planos são mensais ou anuais sem contratos de fidelidade ou taxas de cancelamento. Você pode cancelar sua assinatura na área de configurações do dashboard com apenas um clique e continuará com acesso até o fim do ciclo já pago.",
    },
    {
      question: "O IrisFlow é compatível com quais sistemas?",
      answer: "Como nossa plataforma roda inteiramente direto no navegador (Chrome, Edge ou Safari), ela é compatível com praticamente qualquer computador: Windows, macOS, Linux ou até mesmo tablets, desde que possuam uma webcam conectada e conexão ativa com a internet.",
    },
    {
      question: "Como funciona o suporte para cuidadores e famílias?",
      answer: "Sabemos que a adaptação a um software assistivo exige paciência. Por isso, oferecemos tutoriais guiados por vídeo e um canal dedicado de suporte via WhatsApp para os planos Clínica e Familiar, ajudando na configuração inicial e no treinamento.",
    },
  ]

  const comparison = [
    { feature: "Teclado virtual em PT-BR", familiar: true, clinica: true, hospitalar: true },
    { feature: "Síntese de voz (TTS)", familiar: true, clinica: true, hospitalar: true },
    { feature: "Processamento local (LGPD)", familiar: true, clinica: true, hospitalar: true },
    { feature: "Predição com GPT-4o", familiar: true, clinica: true, hospitalar: true },
    { feature: "Dispositivos ativos", familiar: "1", clinica: "Até 10", hospitalar: "Ilimitados" },
    { feature: "Relatórios de uso diário", familiar: false, clinica: true, hospitalar: true },
    { feature: "Painel de gestão multi-perfil", familiar: false, clinica: true, hospitalar: true },
    { feature: "SLA de suporte 24/7", familiar: false, clinica: false, hospitalar: true },
    { feature: "Integração Prontuário Eletrônico", familiar: false, clinica: false, hospitalar: true },
    { feature: "API de Integração", familiar: false, clinica: false, hospitalar: true },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Reaproveita o componente de visualização de preços básico */}
        <Pricing />

        {/* Tabela Comparativa de Recursos */}
        <section className="py-16 bg-slate-50 dark:bg-dark-card/30 border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-display font-black text-iris-blue dark:text-white mb-3">
                Comparativo detalhado de recursos
              </h2>
              <p className="text-slate-450 dark:text-slate-500 font-body text-sm sm:text-base">
                Veja as especificações completas de cada modalidade de plano.
              </p>
            </div>

            {/* Tabela Responsiva */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-dark-card shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
                    <th className="p-4 sm:p-5 text-xs font-bold text-slate-450 uppercase font-display tracking-wider">Recurso</th>
                    <th className="p-4 sm:p-5 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase font-display tracking-wider text-center">Familiar</th>
                    <th className="p-4 sm:p-5 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase font-display tracking-wider text-center">Clínica</th>
                    <th className="p-4 sm:p-5 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase font-display tracking-wider text-center">Hospitalar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {comparison.map((item) => (
                    <tr key={item.feature} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                      <td className="p-4 sm:p-5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 font-body">
                        {item.feature}
                      </td>
                      <td className="p-4 sm:p-5 text-center">
                        {typeof item.familiar === "boolean" ? (
                          item.familiar ? (
                            <Check className="w-5 h-5 text-iris-teal mx-auto stroke-[2.5]" />
                          ) : (
                            <span className="text-slate-300 dark:text-slate-700">—</span>
                          )
                        ) : (
                          <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 font-body">{item.familiar}</span>
                        )}
                      </td>
                      <td className="p-4 sm:p-5 text-center">
                        {typeof item.clinica === "boolean" ? (
                          item.clinica ? (
                            <Check className="w-5 h-5 text-iris-teal mx-auto stroke-[2.5]" />
                          ) : (
                            <span className="text-slate-300 dark:text-slate-700">—</span>
                          )
                        ) : (
                          <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 font-body">{item.clinica}</span>
                        )}
                      </td>
                      <td className="p-4 sm:p-5 text-center">
                        {typeof item.hospitalar === "boolean" ? (
                          item.hospitalar ? (
                            <Check className="w-5 h-5 text-iris-teal mx-auto stroke-[2.5]" />
                          ) : (
                            <span className="text-slate-300 dark:text-slate-700">—</span>
                          )
                        ) : (
                          <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 font-body">{item.hospitalar}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Perguntas Frequentes (FAQ) */}
        <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-display font-black text-iris-blue dark:text-white mb-3">
                Dúvidas frequentes
              </h2>
              <p className="text-slate-450 dark:text-slate-500 font-body text-sm sm:text-base">
                Tem alguma pergunta sobre o funcionamento do IrisFlow? Nós respondemos.
              </p>
            </div>

            <div className="border-t border-slate-200/60 dark:border-slate-800/80 mt-8">
              {faqs.map((faq) => (
                <FAQAccordion key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
