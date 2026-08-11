"use client"

import React, { useState, useEffect } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"

function Counter({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    const controls = animate(count, value, {
      duration: duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest).toString())
      },
    })
    return () => controls.stop()
  }, [value, duration, count])

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  )
}

export function Impact() {
  const metrics = [
    { value: 5, suffix: "M+", desc: "brasileiros que precisam de tecnologia assistiva" },
    { value: 95, suffix: "%", desc: "mais barato que as soluções concorrentes" },
    { value: 30, suffix: " dias", desc: "de trial gratuito para você testar sem cartão" },
    { value: 10, suffix: "k", desc: "usuários ativos projetados até 2030" },
  ]

  const odsBadges = [
    { id: "ODS 3", name: "Saúde e Bem-Estar", color: "bg-emerald-600 dark:bg-emerald-700" },
    { id: "ODS 9", name: "Indústria, Inovação e Infraestrutura", color: "bg-orange-600 dark:bg-orange-700" },
    { id: "ODS 10", name: "Redução das Desigualdades", color: "bg-rose-600 dark:bg-rose-700" },
    { id: "ODS 17", name: "Parcerias e Meios de Implementação", color: "bg-blue-800 dark:bg-blue-900" },
  ]



}
