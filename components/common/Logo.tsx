import React from "react"
import Link from "next/link"

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
      <div className="relative flex items-center justify-center text-iris-teal transition-transform duration-300 group-hover:scale-105">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Contorno do olho */}
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          {/* Pupila */}
          <circle cx="12" cy="12" r="3" fill="currentColor" className="text-iris-teal animate-pulse-dot" />
          {/* Ondas emitidas (sinal) */}
          <path d="M12 2a15.3 15.3 0 0 1 4 0" className="opacity-40" />
          <path d="M12 22a15.3 15.3 0 0 0-4 0" className="opacity-40" />
        </svg>
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
