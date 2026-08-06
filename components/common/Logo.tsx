import React from "react"
import Link from "next/link"
import Image from "next/image"

interface LogoProps {
  className?: string
  iconSize?: number
  textSize?: string
  showText?: boolean
}

export function Logo({
  className = "",
  iconSize = 32,
  textSize = "text-xl",
  showText = true,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 font-display font-black tracking-tight select-none group ${className}`}
    >
      <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/logo.png"
          alt="IrisFlow"
          width={iconSize}
          height={iconSize}
          className="object-contain"
          priority
        />
        <span className="absolute inset-0 rounded-full bg-iris-teal/10 scale-150 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {showText && (
        <span className={`font-display font-black tracking-tight ${textSize}`}>
          <span className="text-iris-blue dark:text-white transition-colors duration-200">Iris</span>
          <span className="text-iris-teal">Flow</span>
        </span>
      )}
    </Link>
  )
}
