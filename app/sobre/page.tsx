"use client"

import React from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Shield, Users, Heart, Award } from "lucide-react"
import { motion } from "framer-motion"

export default function Sobre() {
  const values = [
    {
      icon: Heart,
      title: "Empatia e Dignidade",
      description: "Colocamos o paciente e a família em primeiro lugar. A comunicação não é apenas texto, é conexão afetiva.",
    },
    {
      icon: Shield,
      title: "Privacidade por Design",
      description: "Processamos todos os dados ópticos localmente no navegador. Respeitamos a LGPD e a privacidade absoluta do usuário.",
    },
    {
      icon: Users,
      title: "Inclusão Social",
      description: "Trabalhamos para democratizar a acessibilidade no Brasil. Criamos tecnologia que todos possam pagar.",
    },
    {
      icon: Award,
      title: "Excelência Científica",
      description: "Unimos Inteligência Artificial, visão computacional e fonoaudiologia para criar a melhor experiência assistiva.",
    },
  ]

  const team = [
    {
      name: "Dr. Thiago Dias",
      role: "Fundador & CEO",
      bio: "Doutor em Visão Computacional pela USP. Especialista em interfaces cérebro-computador e tecnologia assistiva.",
      initials: "TD",
    },
    {
      name: "Amanda Souza",
      role: "Diretora de UX & Acessibilidade",
      bio: "Designer especialista em interfaces acessíveis e fonoaudiologia clínica com 8 anos de experiência em reabilitação.",
      initials: "AS",
    },
    {
      name: "Ricardo Mendes",
      role: "Líder de IA",
      bio: "Ex-pesquisador de IA aplicada à saúde. Responsável pelo algoritmo de rastreamento ocular e calibração inteligente.",
      initials: "RM",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-gradient-mesh">
        {/* Hero Section */}
        <section className="py-20 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-3 py-1 bg-iris-teal/10 border border-iris-teal/20 text-iris-teal rounded-full text-xs font-semibold uppercase tracking-wider"
            >
              Nossa Missão
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-display font-black text-iris-blue dark:text-white leading-tight"
            >
              Comunicar vai além <br />
              <span className="text-iris-teal">das palavras.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-body leading-relaxed max-w-2xl mx-auto"
            >
              A IrisFlow nasceu em São Paulo com o objetivo claro de quebrar as barreiras financeiras das tecnologias de comunicação assistiva. Acreditamos que a voz e a autonomia de expressar sentimentos são direitos humanos fundamentais.
            </motion.p>
          </div>
        </section>

        {/* História / Contexto */}
        <section className="py-16 bg-white dark:bg-dark-card/30 border-y border-slate-200/50 dark:border-slate-800/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-display font-black text-iris-blue dark:text-white">
                Como tudo começou
              </h2>
              <p className="text-sm sm:text-base text-slate-550 dark:text-slate-400 leading-relaxed font-body">
                Em 2024, ao acompanhar o avanço da Esclerose Lateral Amiotrófica (ELA) em um familiar de nosso fundador, nos deparamos com uma realidade assustadora: os equipamentos importados de rastreamento ocular custavam mais do que um carro popular, além de estarem em inglês e sem assistência técnica local.
              </p>
              <p className="text-sm sm:text-base text-slate-550 dark:text-slate-400 leading-relaxed font-body">
                Com base nisso, decidimos criar uma solução brasileira. Utilizando inteligência artificial, fomos capazes de transferir a necessidade de sensores infravermelhos caros para qualquer webcam USB de R$ 80 já presente nas casas das pessoas.
              </p>
            </div>
            
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800 p-8 bg-slate-50 dark:bg-dark-card relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-iris-teal/5 rounded-full blur-2xl" />
              <div className="text-4xl font-display font-black text-iris-teal mb-2">2026</div>
              <h4 className="font-bold text-slate-850 dark:text-white mb-2">Impacto consolidado</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-body">
                Hoje atendemos centenas de famílias brasileiras em suas casas, além de hospitais parceiros e clínicas de reabilitação. Nosso compromisso é o suporte humanizado e o constante aperfeiçoamento das ferramentas.
              </p>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-2xl sm:text-3xl font-display font-black text-iris-blue dark:text-white mb-3">
                Valores que nos guiam
              </h2>
              <p className="text-slate-450 dark:text-slate-500 font-body text-sm sm:text-base">
                Nossa atuação diária é pautada pelo respeito ao usuário e pela responsabilidade social.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val) => {
                const Icon = val.icon
                return (
                  <div
                    key={val.title}
                    className="bg-white dark:bg-dark-card border border-slate-200/60 dark:border-slate-800 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-xl bg-iris-teal/10 text-iris-teal flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-display font-bold text-slate-850 dark:text-white mb-2">
                      {val.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-body">
                      {val.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Time */}
        <section className="py-20 bg-slate-50 dark:bg-dark-card/50 border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-2xl sm:text-3xl font-display font-black text-iris-blue dark:text-white mb-3">
                Conheça a nossa equipe
              </h2>
              <p className="text-slate-450 dark:text-slate-500 font-body text-sm sm:text-base">
                Um time apaixonado por usar a tecnologia como ponte para a acessibilidade.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="bg-white dark:bg-dark-card border border-slate-200/60 dark:border-slate-800 rounded-2xl p-8 text-center space-y-4 hover:shadow-sm"
                >
                  <div className="w-16 h-16 rounded-full bg-iris-blue/15 text-iris-blue dark:text-iris-teal dark:bg-iris-teal/10 flex items-center justify-center text-xl font-bold font-display mx-auto border border-iris-blue/20">
                    {member.initials}
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-display font-bold text-slate-850 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-xs text-iris-teal font-semibold font-body">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-body">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
