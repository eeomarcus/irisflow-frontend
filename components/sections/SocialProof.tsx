import React from "react"

export function SocialProof() {
  const technologies = [
    { name: "Google MediaPipe", tech: "Google MediaPipe" },
    { name: "OpenAI GPT-4o", tech: "OpenAI GPT-4o" },
    { name: "Supabase DB", tech: "Supabase DB" },
    { name: "Stripe Connect", tech: "Stripe" },
    { name: "Vercel Hosting", tech: "Vercel" },
    { name: "Next.js App", tech: "Next.js" },
  ]

  // Duplicamos a lista para criar o efeito contínuo sem saltos
  const techList = [...technologies, ...technologies, ...technologies]

  return (
    <section className="py-10 bg-slate-50 dark:bg-dark-card border-y border-slate-200/60 dark:border-slate-800/80 transition-colors duration-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-display mb-6">
          Desenvolvido com tecnologias de ponta
        </p>
        
        <div className="marquee-container w-full relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent dark:from-dark-card z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent dark:from-dark-card z-10 pointer-events-none" />
          
          <div className="marquee-content flex items-center">
            {techList.map((tech, idx) => (
              <div
                key={`${tech.name}-${idx}`}
                className="flex items-center justify-center font-display font-bold text-lg sm:text-xl text-slate-400 dark:text-slate-600 hover:text-iris-teal dark:hover:text-iris-teal transition-colors duration-300 cursor-default px-4 select-none whitespace-nowrap"
              >
                <span className="text-iris-teal/30 dark:text-iris-teal/10 mr-2 text-xs">◆</span>
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
