"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Eye, EyeOff, ShieldCheck, Mail, Lock, User, ArrowLeft, Home, Stethoscope, Building } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/common/Logo"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function Cadastro() {
  const { register, user } = useAuth()
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [profileType, setProfileType] = useState("Familiar") // Familiar, Profissional, Clinica
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [receiveNews, setReceiveNews] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
  }>({})

  // Medição da força da senha
  const [passwordStrength, setPasswordStrength] = useState<{ score: number; label: string; color: string }>({
    score: 0,
    label: "Muito fraca",
    color: "bg-red-500",
  })

  // Redireciona se logado
  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  // Avaliar força da senha
  useEffect(() => {
    if (!password) {
      setPasswordStrength({ score: 0, label: "Muito fraca", color: "bg-slate-200" })
      return
    }

    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    let label = "Fraca"
    let color = "bg-red-500"

    if (score === 2) {
      label = "Média"
      color = "bg-yellow-500"
    } else if (score === 3) {
      label = "Forte"
      color = "bg-emerald-500"
    } else if (score === 4) {
      label = "Excelente"
      color = "bg-teal-500"
    }

    setPasswordStrength({ score, label, color })
  }, [password])

  const validateStep1 = () => {
    const newErrors: typeof errors = {}
    if (!name) {
      newErrors.name = "Nome completo é obrigatório"
    } else if (name.length < 3) {
      newErrors.name = "Nome muito curto"
    }

    if (!email) {
      newErrors.email = "E-mail é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "E-mail inválido"
    }

    if (!password) {
      newErrors.password = "Senha é obrigatória"
    } else if (password.length < 8) {
      newErrors.password = "A senha deve conter no mínimo 8 caracteres"
    } else if (passwordStrength.score < 2) {
      newErrors.password = "Sua senha deve conter números ou letras maiúsculas"
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptTerms) {
      toast.warning("Você precisa aceitar os Termos de Uso e a Política de Privacidade.")
      return
    }

    setIsSubmitting(true)
    try {
      const displayRole =
        profileType === "Familiar"
          ? "Paciente / Família"
          : profileType === "Profissional"
          ? "Profissional de Saúde"
          : "Clínica / Hospital"

      await register(name, email, displayRole)
    } catch (err) {
      console.error(err)
      toast.error("Erro ao criar conta. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-stretch bg-white dark:bg-dark-bg transition-colors duration-200">
      
      {/* BRANDING PANEL (Esquerda) */}
      <div className="hidden lg:flex lg:w-[40%] bg-gradient-to-br from-iris-blue to-iris-teal text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -ml-24 -mt-24" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-24 -mb-24" />

        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-1.5">
            <Link href="/" className="text-white hover:text-emerald-100 flex items-center gap-2 text-sm font-semibold transition-colors">
              <ArrowLeft className="w-4 h-4" /> Voltar para o site
            </Link>
          </div>

          <div className="space-y-4 pt-12">
            <Logo showText={true} iconSize={40} textSize="text-3xl" className="text-white" />
            <p className="text-base text-emerald-50 leading-relaxed font-body font-semibold">
              Junte-se a quem já transformou vidas.
            </p>
          </div>

          <div className="space-y-5 pt-8">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center mt-0.5 border border-white/30 font-bold">
                ✓
              </span>
              <span className="text-sm font-body text-emerald-50 leading-normal">
                <strong>30 dias de trial completo</strong> sem cartão de crédito
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center mt-0.5 border border-white/30 font-bold">
                ✓
              </span>
              <span className="text-sm font-body text-emerald-50 leading-normal">
                Suporte de onboarding via WhatsApp para famílias
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center mt-0.5 border border-white/30 font-bold">
                ✓
              </span>
              <span className="text-sm font-body text-emerald-50 leading-normal">
                Cancelamento com apenas um clique na área logada
              </span>
            </div>
          </div>
        </div>

        {/* Depoimento curto */}
        <div className="relative z-10 border-t border-white/20 pt-6">
          <p className="text-xs italic text-emerald-100/90 leading-relaxed font-body">
            "Finalmente uma solução que consigo indicar para as famílias sem constrangimento pelo preço. O suporte fez toda a diferença."
          </p>
          <span className="block text-[10px] font-bold text-white mt-2 font-display uppercase tracking-wider">
            — Ana Paula, Terapeuta Ocupacional
          </span>
        </div>
      </div>

      {/* FORMULÁRIO (Direita) */}
      <div className="w-full lg:w-[60%] flex flex-col justify-center px-4 sm:px-12 lg:px-20 py-12 relative">
        <Link href="/" className="lg:hidden absolute top-6 left-6 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 text-xs font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar
        </Link>

        <div className="max-w-md w-full mx-auto space-y-8">
          
          {/* Progress Indicator */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold font-display uppercase text-slate-400 dark:text-slate-500 tracking-wider">
              <span>Passo {step} de 2</span>
              <span>{step === 1 ? "Dados de Acesso" : "Perfil de Uso"}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-850 rounded-full overflow-hidden">
              <div
                className="h-full bg-iris-teal transition-all duration-300"
                style={{ width: `${step * 50}%` }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              /* PASSO 1: DADOS DE ACESSO */
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-display font-black text-slate-850 dark:text-white tracking-tight">
                    Crie sua conta gratuita
                  </h2>
                  <p className="text-sm font-body text-slate-500 dark:text-slate-400">
                    Já tem conta?{" "}
                    <Link href="/login" className="text-iris-teal hover:underline font-bold transition-colors">
                      Entrar
                    </Link>
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Nome */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display">
                      Nome completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        id="name"
                        type="text"
                        placeholder="Seu nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900/50 text-sm focus:outline-none transition-all ${
                          errors.name ? "border-red-500" : "border-slate-200 dark:border-slate-800 focus:border-iris-teal focus:bg-white focus:ring-1 focus:ring-iris-teal/30"
                        }`}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-red-500 font-semibold pl-1">⚠ {errors.name}</p>}
                  </div>

                  {/* E-mail */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display">
                      E-mail
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900/50 text-sm focus:outline-none transition-all ${
                          errors.email ? "border-red-500" : "border-slate-200 dark:border-slate-800 focus:border-iris-teal focus:bg-white focus:ring-1 focus:ring-iris-teal/30"
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-500 font-semibold pl-1">⚠ {errors.email}</p>}
                  </div>

                  {/* Senha */}
                  <div className="space-y-1.5">
                    <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display">
                      Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Crie uma senha forte"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full pl-11 pr-11 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900/50 text-sm focus:outline-none transition-all ${
                          errors.password ? "border-red-500" : "border-slate-200 dark:border-slate-800 focus:border-iris-teal focus:bg-white focus:ring-1 focus:ring-iris-teal/30"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:text-iris-teal text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Strength Meter */}
                    {password && (
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase text-slate-450 font-display tracking-wider">
                          <span>Força da senha:</span>
                          <span className={
                            passwordStrength.score >= 3
                              ? "text-emerald-500 font-black"
                              : passwordStrength.score === 2
                              ? "text-yellow-500 font-black"
                              : "text-red-500 font-black"
                          }>
                            {passwordStrength.label}
                          </span>
                        </div>
                        <div className="flex gap-1 h-1.5">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <div
                              key={i}
                              className={`flex-1 h-full rounded-full transition-all duration-305 ${
                                i < passwordStrength.score
                                  ? passwordStrength.color
                                  : "bg-slate-100 dark:bg-slate-800/80"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {errors.password && <p className="text-xs text-red-500 font-semibold pl-1">⚠ {errors.password}</p>}
                  </div>

                  {/* Confirmar Senha */}
                  <div className="space-y-1.5">
                    <label htmlFor="confirmPassword" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display">
                      Confirmar Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Repita sua senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900/50 text-sm focus:outline-none transition-all ${
                          errors.confirmPassword ? "border-red-500" : "border-slate-200 dark:border-slate-800 focus:border-iris-teal focus:bg-white focus:ring-1 focus:ring-iris-teal/30"
                        }`}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-500 font-semibold pl-1">⚠ {errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-4 bg-iris-teal hover:bg-iris-teal/95 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-iris-teal/15 flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  Continuar
                </button>
              </motion.div>
            ) : (
              /* PASSO 2: PERFIL DE USO */
              <motion.form
                key="step2"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-display font-black text-slate-850 dark:text-white tracking-tight">
                    Como você vai usar o IrisFlow?
                  </h2>
                  <p className="text-sm font-body text-slate-500 dark:text-slate-400">
                    Selecione o perfil de uso que melhor se adapta à sua realidade.
                  </p>
                </div>

                {/* Radio Cards */}
                <div className="space-y-3">
                  {/* Card A: Familiar */}
                  <div
                    onClick={() => setProfileType("Familiar")}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      profileType === "Familiar"
                        ? "border-iris-teal bg-iris-teal/5"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      profileType === "Familiar" ? "bg-iris-teal text-white" : "bg-slate-100 dark:bg-slate-800/80 text-slate-500"
                    }`}>
                      <Home className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-slate-850 dark:text-white leading-tight">Paciente / Família</h4>
                      <p className="font-body text-xs text-slate-500 dark:text-slate-400">Para uso em residência com um familiar</p>
                    </div>
                  </div>

                  {/* Card B: Profissional */}
                  <div
                    onClick={() => setProfileType("Profissional")}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      profileType === "Profissional"
                        ? "border-iris-teal bg-iris-teal/5"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      profileType === "Profissional" ? "bg-iris-teal text-white" : "bg-slate-100 dark:bg-slate-800/80 text-slate-500"
                    }`}>
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-slate-850 dark:text-white leading-tight">Profissional de Saúde</h4>
                      <p className="font-body text-xs text-slate-500 dark:text-slate-400">Terapeuta, fonoaudiólogo, fisioterapeuta, médico</p>
                    </div>
                  </div>

                  {/* Card C: Clinica */}
                  <div
                    onClick={() => setProfileType("Clinica")}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      profileType === "Clinica"
                        ? "border-iris-teal bg-iris-teal/5"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      profileType === "Clinica" ? "bg-iris-teal text-white" : "bg-slate-100 dark:bg-slate-800/80 text-slate-500"
                    }`}>
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-slate-850 dark:text-white leading-tight">Clínica / Hospital</h4>
                      <p className="font-body text-xs text-slate-500 dark:text-slate-400">Para clínicas de reabilitação e redes de saúde B2B</p>
                    </div>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3 font-semibold select-none pt-2">
                  <label className="flex items-start gap-2.5 text-xs text-slate-650 dark:text-slate-400 cursor-pointer leading-normal">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="w-4 h-4 border border-slate-300 dark:border-slate-800 rounded text-iris-teal focus:ring-iris-teal cursor-pointer mt-0.5"
                    />
                    <span>
                      Li e aceito os{" "}
                      <Link href="#" className="text-iris-teal hover:underline font-bold">
                        Termos de Uso
                      </Link>{" "}
                      e a{" "}
                      <Link href="#" className="text-iris-teal hover:underline font-bold">
                        Política de Privacidade
                      </Link>{" "}
                      da IrisFlow.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 text-xs text-slate-650 dark:text-slate-400 cursor-pointer leading-normal">
                    <input
                      type="checkbox"
                      checked={receiveNews}
                      onChange={(e) => setReceiveNews(e.target.checked)}
                      className="w-4 h-4 border border-slate-300 dark:border-slate-800 rounded text-iris-teal focus:ring-iris-teal cursor-pointer mt-0.5"
                    />
                    <span>Quero receber novidades, tutoriais e dicas sobre tecnologia assistiva e acessibilidade.</span>
                  </label>
                </div>

                {/* Ações e Submit */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-sm cursor-pointer"
                    disabled={isSubmitting}
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] py-4 bg-iris-teal hover:bg-iris-teal/95 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-iris-teal/15 flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Criando conta...
                      </>
                    ) : (
                      "Criar conta gratuita →"
                    )}
                  </button>
                </div>

                {/* LGPD Warning */}
                <div className="text-[10px] text-slate-450 dark:text-slate-550 text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-iris-teal inline" />
                  Seus dados biométricos nunca saem do seu computador (100% LGPD compliant)
                </div>
              </motion.form>
            )}
          </AnimatePresence>

        </div>
      </div>

    </div>
  )
}
