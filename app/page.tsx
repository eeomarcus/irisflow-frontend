import React from "react"
import { Header } from "@/components/layout/Header"
import { Hero } from "@/components/sections/Hero"
import { SocialProof } from "@/components/sections/SocialProof"
import { ProblemSolution } from "@/components/sections/ProblemSolution"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { WhyUs } from "@/components/sections/WhyUs"
import { Pricing } from "@/components/sections/Pricing"
import { Testimonials } from "@/components/sections/Testimonials"
import { Impact } from "@/components/sections/Impact"
import { FinalCTA } from "@/components/sections/FinalCTA"
import { Footer } from "@/components/layout/Footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <SocialProof />
        <ProblemSolution />
        <HowItWorks />
        <WhyUs />
        <Pricing />
        <Testimonials />
        <Impact />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
