"use client"

import React from "react"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

export function Testimonials() {
  const reviews = [
    {
      initials: "AP",
      name: "Ana Paula",
      role: "Terapeuta Ocupacional — Hospital das Clínicas, SP",
      rating: 5,
      text: "Finalmente uma solução que consigo indicar para as famílias sem constrangimento pelo preço. O suporte humanizado em português fez toda a diferença na adaptação do paciente.",
    },
    {
      initials: "RA",
      name: "Dr. Renato Alves",
      role: "Neurologista — Santa Casa de Belo Horizonte",
      rating: 5,
      text: "Em apenas 3 semanas de piloto, dois pacientes com ELA avançada voltaram a se comunicar ativamente com a família. Um resultado terapêutico e emocional que não víamos há anos.",
    },
    {
      initials: "MC",
      name: "Mariana Costa",
      role: "Cuidadora Familiar — São Paulo",
      rating: 5,
      text: "Meu pai conseguiu mandar uma mensagem de WhatsApp para minha filha apenas com o olhar. Nenhum de nós na sala conseguiu conter as lágrimas. Agradeço todos os dias pelo IrisFlow.",
    },
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  } as const

  return (
    <section id="depoimentos" className="py-24 bg-slate-50 dark:bg-dark-card/50 transition-colors duration-200 overflow-hidden">
    </section >
  )
}
