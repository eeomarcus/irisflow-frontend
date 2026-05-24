"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"

export function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-iris-blue to-iris-teal text-white relative overflow-hidden transition-colors duration-200">
      {/* Background circles decoration */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -ml-20 -mt-20" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-20 -mb-20" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-3xl sm:text-5xl font-display font-black leading-tight max-w-3xl mx-auto">
            Pronto para devolver a voz a quem você ama?
          </h2>
          <p className="text-emerald-50 dark:text-emerald-100/90 font-body text-base sm:text-xl max-w-xl mx-auto leading-relaxed">
            Comece seu teste gratuito hoje mesmo. Sem necessidade de cartão de crédito. Cancele a qualquer momento.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center justify-center gap-4"
        >
          <Link
            href="/cadastro"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-iris-blue font-bold rounded-xl shadow-lg hover:shadow-white/10 transition-all text-base group cursor-pointer"
          >
            Criar conta gratuita
            <ArrowRight className="w-5 h-5 text-iris-teal transition-transform group-hover:translate-x-1" />
          </Link>
          
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-emerald-105 font-medium pt-2 opacity-90">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-white" />
              30 dias de acesso completo
            </span>
            <span>•</span>
            <span>Suporte em português</span>
            <span>•</span>
            <span>LGPD compliant</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
