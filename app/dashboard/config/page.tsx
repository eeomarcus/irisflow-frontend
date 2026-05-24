"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Logo } from "@/components/common/Logo"
import { ThemeToggle } from "@/components/common/ThemeToggle"
import { ArrowLeft, Sliders, Volume2, Target, Save, CheckCircle, HelpCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

export default function Config() {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Configurações do Rastreamento
  const [sensitivity, setSensitivity] = useState(75)
  const [dwellTime, setDwellTime] = useState(1.5)
  const [cursorSpeed, setCursorSpeed] = useState(60)

  // Configurações de Voz
  const [selectedVoice, setSelectedVoice] = useState("")
  const [voiceRate, setVoiceRate] = useState(1.0)
  const [voiceVolume, setVoiceVolume] = useState(90)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

  // Estado da calibração ocular simulada
  const [calibrationStep, setCalibrationStep] = useState(0) // 0: não iniciada, 1-5: pontos, 6: concluída
  const [calibrationPoint, setCalibrationPoint] = useState({ x: 50, y: 50 })

  // Redirecionamento se deslogado
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  // Carregar vozes do navegador
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices()
        const ptVoices = availableVoices.filter(
          (v) => v.lang.includes("pt-BR") || v.lang.includes("pt_BR")
        )
        setVoices(ptVoices.length > 0 ? ptVoices : availableVoices)
        if (ptVoices.length > 0) {
          setSelectedVoice(ptVoices[0].name)
        }
      }
      loadVoices()
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
  }, [])

  // Gerencia passos de calibração
  const startCalibration = () => {
    setCalibrationStep(1)
    setCalibrationPoint({ x: 10, y: 10 }) // Superior Esquerdo
    toast.info("Olhe fixamente para o ponto vermelho e clique nele para calibrar.")
  }

  const handleCalibrationClick = () => {
    if (calibrationStep === 1) {
      setCalibrationStep(2)
      setCalibrationPoint({ x: 90, y: 10 }) // Superior Direito
    } else if (calibrationStep === 2) {
      setCalibrationStep(3)
      setCalibrationPoint({ x: 90, y: 90 }) // Inferior Direito
    } else if (calibrationStep === 3) {
      setCalibrationStep(4)
      setCalibrationPoint({ x: 10, y: 90 }) // Inferior Esquerdo
    } else if (calibrationStep === 4) {
      setCalibrationStep(5)
      setCalibrationPoint({ x: 50, y: 50 }) // Centro
    } else if (calibrationStep === 5) {
      setCalibrationStep(6)
      toast.success("✓ Calibração concluída! Precisão ajustada para 99%.")
    }
  }

  const resetCalibration = () => {
    setCalibrationStep(0)
  }

  const handleSave = () => {
    toast.success("Configurações salvas no perfil com sucesso!")
    router.push("/dashboard")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-dark-bg">
        <div className="w-10 h-10 border-4 border-iris-teal border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg transition-colors duration-200">
      
      {/* Header */}
      <header className="bg-white dark:bg-dark-card border-b border-slate-200/60 dark:border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <Logo />
          <Link
            href="/dashboard"
            className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-iris-teal flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao Painel
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="w-8 h-8 rounded-full bg-iris-teal/10 border border-iris-teal/20 text-iris-teal flex items-center justify-center text-xs font-bold font-display select-none">
            {user?.name.charAt(0)}
          </div>
        </div>
      </header>

      {/* Painel Principal */}
      <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-6">
        
        {/* Titulo */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-850 dark:text-white">
              Configurações do Perfil
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-body">
              Ajuste a calibração ocular, sensibilidade de digitação e voz assistiva.
            </p>
          </div>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-iris-teal hover:bg-iris-teal/90 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md cursor-pointer transition-colors"
          >
            <Save className="w-4 h-4" /> Salvar Ajustes
          </button>
        </div>

        {/* MÓDULO 1: CALIBRAÇÃO OCULAR */}
        <section className="bg-white dark:bg-dark-card border border-slate-200/60 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-3">
            <h3 className="font-display font-bold text-sm sm:text-base text-slate-850 dark:text-white flex items-center gap-2">
              <Target className="w-4.5 h-4.5 text-iris-teal" /> Calibração do Rastreamento
            </h3>
            {calibrationStep > 0 && (
              <button
                onClick={resetCalibration}
                className="text-xs text-red-500 hover:underline cursor-pointer"
              >
                Reiniciar
              </button>
            )}
          </div>

          {calibrationStep === 0 ? (
            /* Tela Inicial de Calibração */
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-iris-teal/10 flex items-center justify-center text-iris-teal">
                <Target className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm sm:text-base text-slate-800 dark:text-white">Alinhamento do Olhar</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-body leading-relaxed">
                  Para precisão ideal, é recomendado recalibrar sempre que mudar de posição ou iluminação. O processo leva menos de um minuto.
                </p>
              </div>
              <button
                onClick={startCalibration}
                className="px-5 py-2.5 bg-iris-teal hover:bg-iris-teal/95 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer transition-all"
              >
                Iniciar Calibração
              </button>
            </div>
          ) : calibrationStep <= 5 ? (
            /* Pontos de Calibração ativos */
            <div className="relative w-full aspect-[2/1] bg-slate-950 rounded-xl overflow-hidden border border-slate-900 shadow-inner flex items-center justify-center">
              <p className="text-[10px] text-slate-500 absolute top-4 select-none font-mono">
                Calibrando ponto {calibrationStep} de 5...
              </p>
              
              {/* Ponto Ocular interativo */}
              <button
                onClick={handleCalibrationClick}
                className="absolute w-8 h-8 rounded-full bg-red-600 border-4 border-white cursor-crosshair transform -translate-x-1/2 -translate-y-1/2 shadow-lg flex items-center justify-center hover:bg-red-500 hover:scale-115 transition-transform"
                style={{ left: `${calibrationPoint.x}%`, top: `${calibrationPoint.y}%` }}
                aria-label="Calibrar este ponto"
              >
                <div className="w-2.5 h-2.5 bg-white rounded-full animate-ping" />
              </button>
            </div>
          ) : (
            /* Calibração concluída */
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-500">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm sm:text-base text-slate-800 dark:text-white">Rastreamento Otimizado</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-body leading-relaxed">
                  Os coeficientes de calibração foram aplicados ao seu navegador. Nível de precisão ocular estimado: <strong className="text-emerald-500">99.2%</strong>.
                </p>
              </div>
              <button
                onClick={startCalibration}
                className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 font-bold text-xs rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition-colors"
              >
                Recalibrar
              </button>
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* MÓDULO 2: SENSIBILIDADE E TEMPO */}
          <section className="bg-white dark:bg-dark-card border border-slate-200/60 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-sm sm:text-base text-slate-850 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-3">
              <Sliders className="w-4.5 h-4.5 text-iris-teal" /> Ajustes do Rastreamento
            </h3>

            <div className="space-y-5">
              {/* Sensibilidade de piscar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <label htmlFor="sensitivity" className="flex items-center gap-1">
                    Sensibilidade de piscar
                  </label>
                  <span className="font-mono font-bold text-iris-teal">{sensitivity}%</span>
                </div>
                <input
                  id="sensitivity"
                  type="range"
                  min="10"
                  max="100"
                  value={sensitivity}
                  onChange={(e) => setSensitivity(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-850 rounded-full appearance-none cursor-pointer accent-iris-teal"
                />
              </div>

              {/* Dwell Time (Tempo de fixação) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <label htmlFor="dwell" className="flex items-center gap-1">
                    Dwell Time (Fixação do Olhar)
                  </label>
                  <span className="font-mono font-bold text-iris-teal">{dwellTime}s</span>
                </div>
                <input
                  id="dwell"
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.1"
                  value={dwellTime}
                  onChange={(e) => setDwellTime(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-850 rounded-full appearance-none cursor-pointer accent-iris-teal"
                />
              </div>

              {/* Velocidade do cursor */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <label htmlFor="cursor-speed" className="flex items-center gap-1">
                    Velocidade do cursor óptico
                  </label>
                  <span className="font-mono font-bold text-iris-teal">{cursorSpeed}%</span>
                </div>
                <input
                  id="cursor-speed"
                  type="range"
                  min="10"
                  max="100"
                  value={cursorSpeed}
                  onChange={(e) => setCursorSpeed(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-850 rounded-full appearance-none cursor-pointer accent-iris-teal"
                />
              </div>
            </div>
          </section>

          {/* MÓDULO 3: CONFIGURAÇÃO DE ÁUDIO */}
          <section className="bg-white dark:bg-dark-card border border-slate-200/60 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-sm sm:text-base text-slate-850 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-3">
              <Volume2 className="w-4.5 h-4.5 text-iris-teal" /> Configurações da Voz
            </h3>

            <div className="space-y-5">
              {/* Vozes Disponíveis */}
              <div className="space-y-1.5">
                <label htmlFor="voice-select" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-display">
                  Voz de Síntese (TTS)
                </label>
                <select
                  id="voice-select"
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-iris-teal"
                >
                  {voices.length === 0 ? (
                    <option>Nenhuma voz PT-BR carregada</option>
                  ) : (
                    voices.map((v) => (
                      <option key={v.name} value={v.name}>
                        {v.name} ({v.lang})
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* Velocidade da fala */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <label htmlFor="voice-rate" className="flex items-center gap-1">
                    Velocidade da fala
                  </label>
                  <span className="font-mono font-bold text-iris-teal">{voiceRate.toFixed(1)}x</span>
                </div>
                <input
                  id="voice-rate"
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={voiceRate}
                  onChange={(e) => setVoiceRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-850 rounded-full appearance-none cursor-pointer accent-iris-teal"
                />
              </div>

              {/* Volume da voz */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <label htmlFor="voice-vol" className="flex items-center gap-1">
                    Volume da voz
                  </label>
                  <span className="font-mono font-bold text-iris-teal">{voiceVolume}%</span>
                </div>
                <input
                  id="voice-vol"
                  type="range"
                  min="10"
                  max="100"
                  value={voiceVolume}
                  onChange={(e) => setVoiceVolume(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-850 rounded-full appearance-none cursor-pointer accent-iris-teal"
                />
              </div>
            </div>
          </section>
        </div>

      </main>
      
    </div>
  )
}
