"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Eye, EyeOff, ShieldCheck, Mail, Lock, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Logo } from "@/components/common/Logo"
import { useAuth } from "@/lib/auth-context"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function Login() {
  const { login, user } = useAuth()
  const router = useRouter()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  // Redireciona se já estiver autenticado
  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}
    if (!email) {
      newErrors.email = "E-mail é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "E-mail inválido"
    }
    if (!password) {
      newErrors.password = "Senha é obrigatória"
    } else if (password.length < 6) {
      newErrors.password = "A senha deve ter no mínimo 6 caracteres"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await login(email)
    } catch (err) {
      console.error(err)
      toast.error("Erro ao autenticar. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsSubmitting(true)
    toast.loading("Conectando com o Google...")
    await new Promise((resolve) => setTimeout(resolve, 1500))
    toast.dismiss()
    await login("usuario.google@gmail.com")
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen flex items-stretch bg-white dark:bg-dark-bg transition-colors duration-200">
      
      {/* BRANDING PANEL (Esquerda - Oculto em Mobile) */}
      <div className="hidden lg:flex lg:w-[40%] bg-gradient-to-br from-iris-blue to-iris-teal text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Círculos decorativos */}
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
            <p className="text-base text-emerald-50 leading-relaxed font-body">
              "Comunicar vai além das palavras."
            </p>
          </div>

          <div className="space-y-5 pt-8">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center mt-0.5 border border-white/30">
                ✓
              </span>
              <span className="text-sm font-body text-emerald-50 leading-normal">Interface 100% em português nativo</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center mt-0.5 border border-white/30">
                ✓
              </span>
              <span className="text-sm font-body text-emerald-50 leading-normal">Dados biométricos nunca saem do seu computador</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center mt-0.5 border border-white/30">
                ✓
              </span>
              <span className="text-sm font-body text-emerald-50 leading-normal">Suporte humanizado para pacientes e cuidadores</span>
            </div>
          </div>
        </div>

        {/* Depoimento curto no rodapé do panel */}
        <div className="relative z-10 border-t border-white/20 pt-6">
          <p className="text-xs italic text-emerald-100/90 leading-relaxed font-body">
            "Meu pai conseguiu mandar uma mensagem de WhatsApp para minha filha apenas com o olhar. Nenhum de nós conseguiu conter as lágrimas."
          </p>
          <span className="block text-[10px] font-bold text-white mt-2 font-display uppercase tracking-wider">
            — Mariana Costa, Cuidadora
          </span>
        </div>
      </div>

      {/* FORMULÁRIO (Direita) */}
      <div className="w-full lg:w-[60%] flex flex-col justify-center px-4 sm:px-12 lg:px-20 py-12 relative">
        <Link href="/" className="lg:hidden absolute top-6 left-6 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 text-xs font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full mx-auto space-y-8"
        >
          {/* Cabeçalho */}
          <div className="space-y-2">
            <h2 className="text-3xl font-display font-black text-slate-850 dark:text-white tracking-tight">
              Entrar na sua conta
            </h2>
            <p className="text-sm font-body text-slate-500 dark:text-slate-400">
              Novo por aqui?{" "}
              <Link href="/cadastro" className="text-iris-teal hover:underline font-bold transition-colors">
                Criar conta grátis
              </Link>
            </p>
          </div>

          {/* Login Social (Google) */}
          <button
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
          >
            {/* Ícone simplificado do Google */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuar com o Google
          </button>

          {/* Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink mx-4 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-white dark:bg-dark-bg px-2">
              ou continue com e-mail
            </span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo E-mail */}
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
                    errors.email
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-slate-200 dark:border-slate-800 focus:border-iris-teal dark:focus:border-iris-teal focus:bg-white dark:focus:bg-dark-bg focus:ring-1 focus:ring-iris-teal/30"
                  }`}
                  disabled={isSubmitting}
                  autoComplete="email"
                  autoFocus
                />
              </div>
              {errors.email && (
                <p className="text-xs font-bold text-red-500 flex items-center gap-1 pl-1">
                  ⚠ {errors.email}
                </p>
              )}
            </div>

            {/* Campo Senha */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-11 pr-11 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900/50 text-sm focus:outline-none transition-all ${
                    errors.password
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-slate-200 dark:border-slate-800 focus:border-iris-teal dark:focus:border-iris-teal focus:bg-white dark:focus:bg-dark-bg focus:ring-1 focus:ring-iris-teal/30"
                  }`}
                  disabled={isSubmitting}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:text-iris-teal text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs font-bold text-red-500 flex items-center gap-1 pl-1">
                  ⚠ {errors.password}
                </p>
              )}
            </div>

            {/* Ações adicionais */}
            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold select-none">
              <label className="flex items-center gap-2 text-slate-650 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 border border-slate-300 dark:border-slate-800 rounded text-iris-teal focus:ring-iris-teal cursor-pointer"
                />
                Lembrar de mim
              </label>
              <Link href="#" className="text-iris-teal hover:underline transition-colors">
                Esqueci a senha
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-iris-teal hover:bg-iris-teal/95 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-iris-teal/15 flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          {/* Footer do formulário */}
          <div className="text-[10px] text-slate-400 text-center leading-relaxed font-body">
            Ao entrar, você concorda com os{" "}
            <Link href="#" className="text-iris-teal hover:underline font-semibold">
              Termos de Uso
            </Link>{" "}
            e a{" "}
            <Link href="#" className="text-iris-teal hover:underline font-semibold">
              Política de Privacidade
            </Link>{" "}
            da IrisFlow.
          </div>
        </motion.div>
      </div>

    </div>
  )
}
