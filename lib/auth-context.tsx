"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface User {
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string) => Promise<boolean>
  register: (name: string, email: string, role: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Carregar usuário do localStorage se existir
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("irisflow_user")
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (e) {
          console.error("Erro ao carregar usuário salvo", e)
        }
      }
      setLoading(false)
    }
  }, [])

  const login = async (email: string): Promise<boolean> => {
    setLoading(true)
    // Simula atraso de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    // Usuário padrão de demonstração baseado no e-mail
    const name = email.split("@")[0]
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1)
    const newUser = {
      name: formattedName,
      email,
      role: "Paciente / Família",
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("irisflow_user", JSON.stringify(newUser))
    }
    setUser(newUser)
    setLoading(false)
    toast.success(`Bem-vindo de volta, ${formattedName}!`)
    router.push("/dashboard")
    return true
  }

  const register = async (name: string, email: string, role: string): Promise<boolean> => {
    setLoading(true)
    // Simula atraso de rede
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const newUser = {
      name,
      email,
      role,
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("irisflow_user", JSON.stringify(newUser))
    }
    setUser(newUser)
    setLoading(false)
    toast.success("Conta criada com sucesso! Aproveite seus 30 dias grátis.")
    router.push("/dashboard")
    return true
  }

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("irisflow_user")
    }
    setUser(null)
    toast.info("Você saiu da sua conta.")
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}
