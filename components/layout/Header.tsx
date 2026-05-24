"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, LogIn, LayoutDashboard, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/common/Logo"
import { ThemeToggle } from "@/components/common/ThemeToggle"
import { useAuth } from "@/lib/auth-context"

export function Header() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fecha o menu móvel quando a rota muda
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const links = [
    { name: "Início", path: "/" },
    { name: "Planos", path: "/planos" },
    { name: "Sobre Nós", path: "/sobre" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-8">
            {links.map((link) => {
              const isActive = pathname === link.path
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-medium transition-colors hover:text-iris-teal ${
                    isActive
                      ? "text-iris-teal font-semibold"
                      : "text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-iris-teal text-white rounded-lg text-sm font-semibold hover:bg-iris-teal/90 transition-colors shadow-sm cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Painel
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                  title="Sair"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-iris-teal transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  href="/cadastro"
                  className="inline-flex items-center justify-center px-4 py-2 bg-iris-teal text-white rounded-lg text-sm font-semibold hover:bg-iris-teal/95 hover:shadow-[0_0_20px_rgba(0,166,147,0.4)] transition-all cursor-pointer"
                >
                  Começar grátis
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-out Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-16 bg-black z-40 md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-16 right-0 bottom-0 w-72 bg-white dark:bg-dark-card border-l border-slate-200 dark:border-slate-800 p-6 z-50 shadow-xl flex flex-col justify-between md:hidden"
            >
              <div className="space-y-6">
                <nav className="flex flex-col gap-4">
                  {links.map((link) => {
                    const isActive = pathname === link.path
                    return (
                      <Link
                        key={link.path}
                        href={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`text-lg font-medium py-1 transition-colors hover:text-iris-teal ${
                          isActive
                            ? "text-iris-teal font-semibold border-l-2 border-iris-teal pl-2"
                            : "text-slate-600 dark:text-slate-300 pl-2"
                        }`}
                      >
                        {link.name}
                      </Link>
                    )
                  })}
                </nav>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 pt-6 space-y-4">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <div className="text-xs text-slate-500 px-2">
                      Logado como: <strong className="text-slate-800 dark:text-slate-200">{user.name}</strong>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-iris-teal text-white rounded-lg font-semibold hover:bg-iris-teal/90 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Ir para o Painel
                    </Link>
                    <button
                      onClick={() => {
                        setIsOpen(false)
                        logout()
                      }}
                      className="flex items-center justify-center gap-2 w-full py-2.5 border border-red-200 dark:border-red-900/30 text-red-500 hover:bg-red-500/10 rounded-lg font-semibold transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Sair da conta
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 border border-slate-200 dark:border-slate-850 text-slate-700 dark:text-slate-200 rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <LogIn className="w-4 h-4" />
                      Entrar
                    </Link>
                    <Link
                      href="/cadastro"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center w-full py-2.5 bg-iris-teal text-white rounded-lg font-semibold hover:bg-iris-teal/90 transition-colors"
                    >
                      Começar grátis
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
