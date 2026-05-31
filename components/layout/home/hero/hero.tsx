"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16 overflow-hidden">
      {/* Background limpo */}
      <div className="absolute inset-0 bg-[#0B1629]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#185FA5]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Conteúdo */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge de contexto - aparece primeiro */}
        <ScrollReveal direction="down" duration={0.6}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111C30] border border-white/10 text-xs font-medium text-[#378ADD] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#378ADD] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#378ADD]"></span>
            </span>
            Para administradoras de consórcios
          </div>
        </ScrollReveal>

        {/* Headline - vem de baixo com delay */}
        <ScrollReveal direction="up" duration={0.8} delay={0.15}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-6 leading-[1.1]">
            Antecipe a inadimplência
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#378ADD] to-[#185FA5]">
              antes que ela aconteça
            </span>
          </h1>
        </ScrollReveal>

        {/* Descrição - vem de baixo com mais delay */}
        <ScrollReveal direction="up" duration={0.8} delay={0.3}>
          <p className="text-lg md:text-xl text-[#8A9AB5] mb-12 max-w-3xl mx-auto leading-relaxed">
            Transforme dados em decisões estratégicas. Priorize cobranças com
            inteligência, reduza perdas e aumente sua taxa de recuperação com
            uma plataforma feita para administradoras de consórcios.
          </p>
        </ScrollReveal>

        {/* CTAs - entram com efeito cascata */}
        <ScrollReveal direction="up" duration={0.7} delay={0.45}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/login">
              <Button className="bg-[#378ADD] hover:bg-[#2E75C9] text-white font-medium h-12 px-8 rounded-lg transition-all duration-200 shadow-lg shadow-[#378ADD]/20">
                Solicitar demonstração
              </Button>
            </Link>
            <a
              href="#modulos"
              className="text-[#B5C3D9] hover:text-white font-medium h-12 px-8 rounded-lg border border-white/15 hover:bg-white/5 transition-all duration-200 flex items-center"
            >
              Conhecer funcionalidades →
            </a>
          </div>
        </ScrollReveal>

        {/* Fonte dos dados - aparece por último, sutil */}
        <ScrollReveal direction="up" duration={0.6} delay={0.6}>
          <p className="mt-8 text-[10px] text-[#5C6A80] uppercase tracking-wider">
            Resultados observados em casos reais do setor
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
