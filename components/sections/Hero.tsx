"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Play, ArrowRight, Eye, Check } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  const [typedText, setTypedText] = useState("")
  const [activeKey, setActiveKey] = useState<string | null>(null)
  
  // Teclas do teclado assistivo simulado
  const keysRow1 = ["A", "B", "C", "D", "E"]
  const keysRow2 = ["F", "G", "H", "I", "J"]
  const keysRow3 = ["L", "M", "N", "O", "P"]
  const keysRow4 = ["Q", "R", "S", "T", "U"]
  
  const textToType = "OI FAMILIA"

  // Simular rastreamento ocular digitando "OI FAMILIA"
  useEffect(() => {
    let charIndex = 0
    let typingTimeout: NodeJS.Timeout
    let activeKeyTimeout: NodeJS.Timeout

    const simulateTyping = () => {
      if (charIndex < textToType.length) {
        const nextChar = textToType[charIndex]
        
        // Ativar animação da tecla correspondente
        if (nextChar !== " ") {
          setActiveKey(nextChar)
          activeKeyTimeout = setTimeout(() => {
            setActiveKey(null)
          }, 300)
        } else {
          setActiveKey("SPACE")
          activeKeyTimeout = setTimeout(() => {
            setActiveKey(null)
          }, 300)
        }

        // Escrever o caractere no input
        setTypedText((prev) => prev + nextChar)
        charIndex++

        // Agendar próximo caractere
        typingTimeout = setTimeout(simulateTyping, 1200)
      } else {
        // Reiniciar após alguns segundos
        typingTimeout = setTimeout(() => {
          setTypedText("")
          charIndex = 0
          simulateTyping()
        }, 3000)
      }
    }

    // Iniciar loop de simulação
    const startTimeout = setTimeout(simulateTyping, 1500)

    return () => {
      clearTimeout(startTimeout)
      clearTimeout(typingTimeout)
      clearTimeout(activeKeyTimeout)
    }
  }, [])

  return (
    <section className="relative pt-8 pb-16 md:py-24 overflow-hidden bg-gradient-mesh">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* TEXT (Left column) */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-iris-teal/10 border border-iris-teal/30 text-iris-teal rounded-full text-xs font-semibold uppercase tracking-wider animate-pulse"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-iris-teal inline-block" />
              Tecnologia assistiva brasileira
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-black leading-tight text-iris-blue dark:text-white"
            >
              Devolva a voz a <br className="hidden sm:inline" />
              quem <span className="text-iris-teal relative">não pode mais falar.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg font-body text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              IrisFlow usa o movimento da íris via webcam comum para traduzir olhares em palavras, voz e mensagens — sem hardware caro, sem barreiras.
            </motion.p>

            {/* Destaque Numérico */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 text-xs font-semibold"
            >
              {[
                "95% mais barato",
                "PT-BR nativo",
                "Webcam a partir de R$ 80",
              ].map((chip) => (
                <div
                  key={chip}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-full text-slate-700 dark:text-slate-300 shadow-sm"
                >
                  <Check className="w-3.5 h-3.5 text-iris-teal stroke-[3]" />
                  {chip}
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href="/cadastro"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-iris-teal hover:bg-iris-teal/95 text-white font-bold rounded-xl shadow-lg hover:shadow-iris-teal/20 transition-all group cursor-pointer text-base"
              >
                Teste grátis por 30 dias
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-350 dark:border-slate-700 hover:border-iris-blue dark:hover:border-iris-teal text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-colors cursor-pointer text-base bg-white/20 dark:bg-transparent"
              >
                <Play className="w-5 h-5 text-iris-teal fill-iris-teal" />
                Ver demonstração
              </Link>
            </motion.div>

            {/* Micro-copy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xs text-slate-500 dark:text-slate-400"
            >
              Sem cartão de crédito · Cancele quando quiser · Suporte em português
            </motion.p>
          </div>

          {/* VISUAL / MOCKUP (Right column) */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-[500px] aspect-[4/3] rounded-2xl bg-white dark:bg-dark-card border border-slate-200/80 dark:border-slate-800 shadow-2xl relative p-5 select-none transition-all duration-500 hover:shadow-iris-teal/5 border-l border-t"
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Header do software simulado */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-slate-400 font-mono ml-2">IrisFlow Desktop v1.4</span>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-200/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                  ● Rastreando íris — 98% confiança
                </div>
              </div>

              {/* Caixa de Texto Digitado */}
              <div className="w-full h-14 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 flex items-center justify-between mb-4">
                <div className="font-display font-semibold text-lg text-slate-800 dark:text-white tracking-wide">
                  {typedText}
                  <span className="animate-pulse text-iris-teal font-bold ml-0.5">|</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-iris-teal/10 flex items-center justify-center text-iris-teal">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Teclado Virtual */}
              <div className="grid grid-cols-5 gap-2">
                {/* Fileira 1 */}
                {keysRow1.map((char) => (
                  <div
                    key={char}
                    className={`h-11 sm:h-12 flex items-center justify-center rounded-lg font-bold text-sm transition-all border ${
                      activeKey === char
                        ? "bg-iris-teal text-white border-iris-teal shadow-[0_0_15px_rgba(0,166,147,0.5)] scale-95"
                        : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-iris-teal/50"
                    }`}
                  >
                    {char}
                  </div>
                ))}
                {/* Fileira 2 */}
                {keysRow2.map((char) => (
                  <div
                    key={char}
                    className={`h-11 sm:h-12 flex items-center justify-center rounded-lg font-bold text-sm transition-all border ${
                      activeKey === char
                        ? "bg-iris-teal text-white border-iris-teal shadow-[0_0_15px_rgba(0,166,147,0.5)] scale-95"
                        : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-iris-teal/50"
                    }`}
                  >
                    {char}
                  </div>
                ))}
                {/* Fileira 3 */}
                {keysRow3.map((char) => (
                  <div
                    key={char}
                    className={`h-11 sm:h-12 flex items-center justify-center rounded-lg font-bold text-sm transition-all border ${
                      activeKey === char
                        ? "bg-iris-teal text-white border-iris-teal shadow-[0_0_15px_rgba(0,166,147,0.5)] scale-95"
                        : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-iris-teal/50"
                    }`}
                  >
                    {char}
                  </div>
                ))}
                {/* Fileira 4 */}
                {keysRow4.map((char) => (
                  <div
                    key={char}
                    className={`h-11 sm:h-12 flex items-center justify-center rounded-lg font-bold text-sm transition-all border ${
                      activeKey === char
                        ? "bg-iris-teal text-white border-iris-teal shadow-[0_0_15px_rgba(0,166,147,0.5)] scale-95"
                        : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-iris-teal/50"
                    }`}
                  >
                    {char}
                  </div>
                ))}
                
                {/* Teclas Especiais */}
                <div
                  className={`h-11 sm:h-12 col-span-3 flex items-center justify-center rounded-lg font-bold text-xs transition-all border ${
                    activeKey === "SPACE"
                      ? "bg-iris-teal text-white border-iris-teal shadow-[0_0_15px_rgba(0,166,147,0.5)] scale-95"
                      : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800"
                  }`}
                >
                  ESPAÇO
                </div>
                <div className="h-11 sm:h-12 col-span-2 flex items-center justify-center rounded-lg font-bold text-xs bg-slate-100 dark:bg-slate-800/80 text-slate-650 dark:text-slate-400 border border-slate-200 dark:border-slate-850">
                  APAGAR
                </div>
              </div>

              {/* Ponto de foco flutuante simulando o olhar */}
              <motion.div
                animate={{
                  x: activeKey ? 0 : [80, 220, 150, 20, 240],
                  y: activeKey ? 0 : [90, 160, 200, 120, 150],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
                className={`absolute w-5 h-5 rounded-full border-2 border-iris-teal bg-iris-teal/20 backdrop-blur-[1px] pointer-events-none ${
                  activeKey ? "hidden" : "block"
                }`}
                style={{ left: "5%", top: "35%" }}
              >
                <div className="w-1.5 h-1.5 bg-iris-teal rounded-full m-auto absolute inset-0 animate-ping" />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
