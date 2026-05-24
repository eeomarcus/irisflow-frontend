"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { ThemeToggle } from "@/components/common/ThemeToggle"
import { Logo } from "@/components/common/Logo"
import {
  Camera,
  Volume2,
  Send,
  Sparkles,
  Settings,
  LogOut,
  RefreshCw,
  Clock,
  Zap,
  Activity,
  History,
  Trash2,
  CheckCircle,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

export default function Dashboard() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  const [typedText, setTypedText] = useState("")
  const [speechHistory, setSpeechHistory] = useState<{ id: string; text: string; time: string }[]>([])
  
  // Webcam e Canvas
  const [hasCameraAccess, setHasCameraAccess] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Estados de IA e WhatsApp
  const [isAiResponding, setIsAiResponding] = useState(false)
  const [aiChat, setAiChat] = useState<{ sender: "user" | "bot"; text: string }[]>([])

  // Métricas do usuário
  const [wpm, setWpm] = useState(12)
  const [focusLevel, setFocusLevel] = useState(98)
  const [sessionTime, setSessionTime] = useState(0)

  // Redireciona se não estiver logado
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  // Timer de sessão
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime((prev) => prev + 1)
    }, 60000) // incrementa a cada minuto
    return () => clearInterval(interval)
  }, [])

  // Inicia animação canvas do feed de câmera se não houver acesso real
  useEffect(() => {
    let animationFrameId: number
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let points: { x: number; y: number; r: number; dx: number; dy: number }[] = []
    
    // Gera alguns pontos aleatórios simulando a malha facial do MediaPipe
    for (let i = 0; i < 28; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 2,
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (!hasCameraAccess) {
        // Se sem câmera, desenha um contorno de rosto virtual
        ctx.strokeStyle = "rgba(0, 166, 147, 0.25)"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.ellipse(canvas.width / 2, canvas.height / 2, 70, 95, 0, 0, 2 * Math.PI)
        ctx.stroke()

        // Desenha olhos virtuais
        ctx.fillStyle = "rgba(0, 166, 147, 0.4)"
        ctx.beginPath()
        ctx.arc(canvas.width / 2 - 25, canvas.height / 2 - 15, 6, 0, 2 * Math.PI)
        ctx.arc(canvas.width / 2 + 25, canvas.height / 2 - 15, 6, 0, 2 * Math.PI)
        ctx.fill()

        // Linhas de escaneamento facial
        ctx.strokeStyle = "rgba(0, 166, 147, 0.4)"
        ctx.lineWidth = 1
        ctx.beginPath()
        const scanY = (Date.now() / 25) % canvas.height
        ctx.moveTo(0, scanY)
        ctx.lineTo(canvas.width, scanY)
        ctx.stroke()
      }

      // Desenha e conecta a malha de pontos simulada
      ctx.fillStyle = hasCameraAccess ? "rgba(16, 185, 129, 0.8)" : "rgba(0, 166, 147, 0.7)"
      ctx.strokeStyle = hasCameraAccess ? "rgba(16, 185, 129, 0.25)" : "rgba(0, 166, 147, 0.15)"
      ctx.lineWidth = 1

      points.forEach((point, idx) => {
        point.x += point.dx
        point.y += point.dy

        // Rebater nas bordas
        if (point.x < 0 || point.x > canvas.width) point.dx *= -1
        if (point.y < 0 || point.y > canvas.height) point.dy *= -1

        ctx.beginPath()
        ctx.arc(point.x, point.y, point.r, 0, 2 * Math.PI)
        ctx.fill()

        // Conectar pontos próximos
        for (let j = idx + 1; j < points.length; j++) {
          const dist = Math.hypot(point.x - points[j].x, point.y - points[j].y)
          if (dist < 55) {
            ctx.beginPath()
            ctx.moveTo(point.x, point.y)
            ctx.lineTo(points[j].x, points[j].y)
            ctx.stroke()
          }
        }
      })

      // Desenha ponto de mira ocular
      if (hasCameraAccess) {
        ctx.strokeStyle = "#10b981"
        ctx.lineWidth = 2
        ctx.beginPath()
        // Oscilação suave simulando foco ocular
        const gazeX = canvas.width / 2 + Math.sin(Date.now() / 300) * 15
        const gazeY = canvas.height / 2 + Math.cos(Date.now() / 400) * 10
        ctx.arc(gazeX, gazeY, 8, 0, 2 * Math.PI)
        ctx.stroke()
        ctx.fillStyle = "#10b981"
        ctx.beginPath()
        ctx.arc(gazeX, gazeY, 2, 0, 2 * Math.PI)
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [hasCameraAccess])

  // Iniciar/Parar Webcam
  const handleToggleCamera = async () => {
    if (hasCameraAccess) {
      // Desativar câmera
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
      streamRef.current = null
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
      setHasCameraAccess(false)
      toast.info("Webcam desativada.")
    } else {
      // Requisitar acesso
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 } })
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        }
        setHasCameraAccess(true)
        setFocusLevel(99)
        toast.success("Webcam ativada com sucesso! Rastreamento ocular calibrado.")
      } catch (err) {
        console.error("Acesso à câmera negado", err)
        toast.error("Não foi possível acessar a webcam. Certifique-se de dar permissão.")
      }
    }
  }

  // Desliga webcam ao sair da tela
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  // Síntese de Voz (TTS) em Português
  const handleSpeak = (textToSpeak: string) => {
    if (!textToSpeak.trim()) return

    if ("speechSynthesis" in window) {
      // Cancela qualquer fala ativa para evitar sobreposição
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(textToSpeak)
      utterance.lang = "pt-BR"
      
      // Busca vozes em PT-BR
      const voices = window.speechSynthesis.getVoices()
      const ptBrVoice = voices.find(
        (voice) => voice.lang.includes("pt-BR") || voice.lang.includes("pt_BR")
      )
      if (ptBrVoice) {
        utterance.voice = ptBrVoice
      }

      window.speechSynthesis.speak(utterance)
      
      // Registrar no histórico
      const now = new Date()
      const timeStr = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      setSpeechHistory((prev) => [{ id: Math.random().toString(), text: textToSpeak, time: timeStr }, ...prev])
      
      toast.success("Vocalizado com sucesso!")
    } else {
      toast.error("Síntese de voz não é suportada neste navegador.")
    }
  }

  // Teclado virtual: Digitação de caracteres
  const handleKeyClick = (char: string) => {
    setTypedText((prev) => prev + char)
  }

  const handleBackspace = () => {
    setTypedText((prev) => prev.slice(0, -1))
  }

  const handleClear = () => {
    setTypedText("")
  }

  // Envio de Frase Rápida (Clique direto fala)
  const handleQuickPhrase = (phrase: string) => {
    handleSpeak(phrase)
  }

  // Envio de WhatsApp Simulado
  const handleSendWhatsApp = () => {
    if (!typedText.trim()) {
      toast.warning("Digite uma mensagem primeiro para enviar.")
      return
    }

    toast.loading("Enviando WhatsApp para cuidador...")
    setTimeout(() => {
      toast.dismiss()
      toast.success("✓ Mensagem enviada para (11) 99888-7766 via WhatsApp!")
      
      // Adicionar ao histórico de fala por ser comunicação ativa
      const now = new Date()
      const timeStr = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      setSpeechHistory((prev) => [{ id: Math.random().toString(), text: `[WhatsApp] ${typedText}`, time: timeStr }, ...prev])
      setTypedText("")
    }, 1200)
  }

  // Assistência de Chatbot GPT-4o Simulada
  const handleAskAi = () => {
    if (!typedText.trim()) {
      toast.warning("Digite uma mensagem ou pergunta primeiro.")
      return
    }

    const userMsg = typedText
    setAiChat((prev) => [...prev, { sender: "user", text: userMsg }])
    setTypedText("")
    setIsAiResponding(true)

    setTimeout(() => {
      let botReply = "Compreendi o seu comando. Como posso te auxiliar melhor agora?"
      if (userMsg.toLowerCase().includes("ajuda") || userMsg.toLowerCase().includes("dor")) {
        botReply = "Alertei seu cuidador cadastrado sobre a sua necessidade de ajuda imediata."
      } else if (userMsg.toLowerCase().includes("agua") || userMsg.toLowerCase().includes("fome")) {
        botReply = "Entendi que você precisa de hidratação ou alimentação. Já deixei uma notificação pronta para sua família."
      } else {
        botReply = `GPT-4o: Entendido. Vou processar: "${userMsg}" e repassar para o seu assistente de voz.`
      }

      setAiChat((prev) => [...prev, { sender: "bot", text: botReply }])
      setIsAiResponding(false)
      
      // Automaticamente fala a resposta da IA
      handleSpeak(botReply)
    }, 1500)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-dark-bg">
        <div className="space-y-4 text-center">
          <div className="w-10 h-10 border-4 border-iris-teal border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-500 font-display">Carregando painel IrisFlow...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-bg transition-colors duration-200">
      
      {/* HEADER DO DASHBOARD */}
      <header className="bg-white dark:bg-dark-card border-b border-slate-200/60 dark:border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <Logo />
          <div className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-iris-teal/10 text-iris-teal border border-iris-teal/20">
            Plano Familiar · Trial 30 dias
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/dashboard/config"
            className="p-2 text-slate-500 hover:text-iris-teal hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Configurações e Calibração"
          >
            <Settings className="w-5 h-5" />
          </Link>
          <button
            onClick={logout}
            className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
            title="Sair do Sistema"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* PAINEL PRINCIPAL */}
      <main className="flex-grow p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-[1600px] w-full mx-auto">
        
        {/* COLUNA ESQUERDA (1/3) — WEBCAM E MÉTRICAS */}
        <div className="lg:col-span-4 space-y-6">
          {/* Webcam Simulator */}
          <div className="bg-white dark:bg-dark-card border border-slate-200/60 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-slate-850 dark:text-white flex items-center gap-2">
                <Camera className="w-4 h-4 text-iris-teal" /> Feed Ocular (Webcam)
              </h3>
              <button
                onClick={handleToggleCamera}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  hasCameraAccess
                    ? "bg-red-500/10 hover:bg-red-500/20 text-red-500"
                    : "bg-iris-teal text-white hover:bg-iris-teal/90"
                }`}
              >
                {hasCameraAccess ? "Desativar" : "Ativar Câmera"}
              </button>
            </div>

            {/* Video + Canvas Box */}
            <div className="relative aspect-[4/3] w-full bg-slate-900 rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
              {/* Vídeo real ocultado sob o canvas ou exposto sutilmente */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none transform -scale-x-100"
                playsInline
                muted
              />
              {/* Canvas para desenhar a malha de rastreamento ocular */}
              <canvas
                ref={canvasRef}
                width={320}
                height={240}
                className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
              />
              
              {/* Overlay se câmera não concedida */}
              {!hasCameraAccess && (
                <div className="absolute inset-0 z-20 bg-slate-950/80 flex flex-col items-center justify-center p-4 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-iris-teal/10 flex items-center justify-center text-iris-teal animate-pulse">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-200">Simulação de rastreamento ativa</p>
                    <p className="text-[10px] text-slate-500 max-w-[200px] leading-relaxed">
                      Conceda acesso à webcam para ver o feed e calibrar o olhar.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Status do rastreamento */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-800">
              <span className="text-slate-450">Algoritmo:</span>
              <span className="font-bold text-iris-teal uppercase font-mono">MediaPipe Iris v2</span>
            </div>
          </div>

          {/* Métricas de Performance */}
          <div className="bg-white dark:bg-dark-card border border-slate-200/60 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-sm text-slate-850 dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-iris-teal" /> Diagnósticos e Uso
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl text-center space-y-1">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-display">Digitação</span>
                <div className="text-xl font-black font-display text-slate-850 dark:text-white">{wpm} <span className="text-[10px] font-medium text-slate-400">PPM</span></div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl text-center space-y-1">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-display">Confiança Ocular</span>
                <div className="text-xl font-black font-display text-iris-teal">{hasCameraAccess ? focusLevel : 92}%</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl text-center col-span-2 flex justify-around items-center py-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-450" />
                  <div className="text-left leading-tight">
                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Tempo de Sessão</span>
                    <strong className="text-xs text-slate-800 dark:text-slate-250 font-mono">{sessionTime} minutos</strong>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-4">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <div className="text-left leading-tight">
                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase block">Fadiga Ocular</span>
                    <strong className="text-xs text-slate-800 dark:text-slate-250 font-mono">Normal (Baixa)</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUNA CENTRAL (2/3) — TECLADO E DIGITAÇÃO */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Campo de Digitação e Controles Principais */}
          <div className="bg-white dark:bg-dark-card border border-slate-200/60 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            
            {/* Input assistivo */}
            <div className="relative">
              <textarea
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                placeholder="Olhe para as letras ou digite para falar..."
                className="w-full h-28 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-lg font-semibold tracking-wide text-slate-850 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-iris-teal focus:ring-1 focus:ring-iris-teal/20 transition-all resize-none font-body"
              />
              {typedText && (
                <button
                  onClick={handleClear}
                  className="absolute right-3.5 bottom-3.5 p-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-red-500/10 text-slate-500 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                  title="Limpar texto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Ações principais */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => handleSpeak(typedText)}
                className="py-3 px-4 bg-iris-teal hover:bg-iris-teal/95 text-white font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Volume2 className="w-4.5 h-4.5" /> Falar (Síntese)
              </button>
              <button
                onClick={handleSendWhatsApp}
                className="py-3 px-4 bg-emerald-600 hover:bg-emerald-650 text-white font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Send className="w-4 h-4" /> Enviar WhatsApp
              </button>
              <button
                onClick={handleAskAi}
                className="py-3 px-4 bg-iris-blue hover:bg-iris-blue-mid text-white font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Sparkles className="w-4 h-4" /> Perguntar à IA
              </button>
            </div>
          </div>

          {/* Teclado Assistivo Digital */}
          <div className="bg-white dark:bg-dark-card border border-slate-200/60 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 select-none">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-display border-b border-slate-100 dark:border-slate-850 pb-2">
              <span>Layout Alfabético Simples</span>
              <span className="text-[10px] text-iris-teal bg-iris-teal/5 px-2 py-0.5 rounded-full border border-iris-teal/10">Foco ocular simulável</span>
            </div>

            {/* Teclado em Grid */}
            <div className="grid grid-cols-6 sm:grid-cols-7 gap-2">
              {/* A - G */}
              {["A", "B", "C", "D", "E", "F", "G"].map((char) => (
                <button
                  key={char}
                  onClick={() => handleKeyClick(char)}
                  className="h-12 sm:h-14 bg-slate-50 dark:bg-slate-900 hover:bg-iris-teal hover:text-white dark:hover:bg-iris-teal text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-xl font-bold font-display text-sm sm:text-base transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                >
                  {char}
                </button>
              ))}
              {/* H - N */}
              {["H", "I", "J", "K", "L", "M", "N"].map((char) => (
                <button
                  key={char}
                  onClick={() => handleKeyClick(char)}
                  className="h-12 sm:h-14 bg-slate-50 dark:bg-slate-900 hover:bg-iris-teal hover:text-white dark:hover:bg-iris-teal text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-xl font-bold font-display text-sm sm:text-base transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                >
                  {char}
                </button>
              ))}
              {/* O - U */}
              {["O", "P", "Q", "R", "S", "T", "U"].map((char) => (
                <button
                  key={char}
                  onClick={() => handleKeyClick(char)}
                  className="h-12 sm:h-14 bg-slate-50 dark:bg-slate-900 hover:bg-iris-teal hover:text-white dark:hover:bg-iris-teal text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-xl font-bold font-display text-sm sm:text-base transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                >
                  {char}
                </button>
              ))}
              {/* V - Z + pontuações */}
              {["V", "W", "X", "Y", "Z", ",", "."].map((char) => (
                <button
                  key={char}
                  onClick={() => handleKeyClick(char)}
                  className="h-12 sm:h-14 bg-slate-50 dark:bg-slate-900 hover:bg-iris-teal hover:text-white dark:hover:bg-iris-teal text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-xl font-bold font-display text-sm sm:text-base transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                >
                  {char}
                </button>
              ))}

              {/* Linha de comandos e utilitários */}
              <button
                onClick={() => handleKeyClick(" ")}
                className="h-12 sm:h-14 col-span-3 sm:col-span-3 bg-slate-50 dark:bg-slate-900 hover:bg-iris-teal hover:text-white dark:hover:bg-iris-teal text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-xl font-bold font-display text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-95 cursor-pointer shadow-sm uppercase"
              >
                Espaço
              </button>
              <button
                onClick={handleBackspace}
                className="h-12 sm:h-14 col-span-2 sm:col-span-2 bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-white text-slate-650 dark:text-slate-300 border border-slate-200 dark:border-slate-850 rounded-xl font-bold font-display text-xs transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                Apagar
              </button>
              <button
                onClick={() => handleSpeak(typedText)}
                className="h-12 sm:h-14 col-span-1 sm:col-span-2 bg-iris-teal/10 hover:bg-iris-teal text-iris-teal hover:text-white border border-iris-teal/20 rounded-xl font-bold font-display text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Volume2 className="w-4 h-4 hidden sm:inline" /> Falar
              </button>
            </div>
          </div>

          {/* Painel Inferior Duplo: Frases Rápidas + Histórico / IA Chat */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bloco 1: Frases Prontas */}
            <div className="bg-white dark:bg-dark-card border border-slate-200/60 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
              <h4 className="font-display font-bold text-xs text-slate-400 dark:text-slate-550 uppercase tracking-wider border-b border-slate-100 dark:border-slate-850 pb-2">
                Frases cotidianas rápidas
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  "Preciso de água",
                  "Estou com fome",
                  "Preciso de ajuda",
                  "Obrigado por tudo",
                  "Gostaria de me deitar",
                  "Quero ver TV",
                ].map((phrase) => (
                  <button
                    key={phrase}
                    onClick={() => handleQuickPhrase(phrase)}
                    className="py-2.5 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-iris-teal/40 dark:hover:border-iris-teal hover:bg-iris-teal/5 text-slate-700 dark:text-slate-350 hover:text-iris-teal font-medium text-xs rounded-xl text-left transition-all truncate cursor-pointer"
                  >
                    💬 {phrase}
                  </button>
                ))}
              </div>
            </div>

            {/* Bloco 2: Histórico de falas ou Chatbot IA */}
            <div className="bg-white dark:bg-dark-card border border-slate-200/60 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col max-h-[300px]">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-2 flex-shrink-0">
                <h4 className="font-display font-bold text-xs text-slate-400 dark:text-slate-550 uppercase tracking-wider flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5" /> Histórico de Comunicação
                </h4>
                {speechHistory.length > 0 && (
                  <button
                    onClick={() => setSpeechHistory([])}
                    className="text-[10px] text-red-500 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Lista do histórico com scroll */}
              <div className="flex-grow overflow-y-auto space-y-3 pr-1 text-xs">
                {speechHistory.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-slate-400 italic py-8">
                    Nenhuma vocalização registrada nesta sessão.
                  </div>
                ) : (
                  speechHistory.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between bg-slate-50 dark:bg-slate-900/40 p-2.5 rounded-xl border border-slate-200/30"
                    >
                      <span className="text-slate-750 dark:text-slate-350 leading-relaxed font-body pr-4 break-words max-w-[200px] sm:max-w-[320px]">
                        {item.text}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono flex-shrink-0 mt-0.5">
                        {item.time}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
      
    </div>
  )
}
