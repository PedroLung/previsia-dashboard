import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  Brain,
  Target,
  TrendingUp,
  Shield,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Zap,
  LayoutDashboard,
  Users,
  AlertTriangle,
  FileWarning,
  PhoneOff,
  Car,
  PieChart,
  LightbulbOff,
} from "lucide-react";

// Diferenciais em linguagem de negócio
const highlights = [
  {
    icon: Brain,
    title: "Antecipe a inadimplência",
    description: "Saiba quem pode deixar de pagar antes que aconteça.",
    color: "text-[#378ADD]",
  },
  {
    icon: Target,
    title: "Foco no que importa",
    description:
      "Priorize cobranças nos contratos com maior impacto financeiro.",
    color: "text-[#BA7517]",
  },
  {
    icon: TrendingUp,
    title: "Recupere mais",
    description:
      "Aumente sua taxa de recuperação com estratégias inteligentes.",
    color: "text-[#1D9E75]",
  },
  {
    icon: Shield,
    title: "Proteja seu caixa",
    description: "Previsão de receitas para um planejamento financeiro seguro.",
    color: "text-[#185FA5]",
  },
];

// Problemas do cenário atual (AS IS)
const problems = [
  {
    icon: AlertTriangle,
    title: "Inadimplência Invisível",
    desc: "O crescimento da inadimplência é notado apenas quando já impactou o caixa, sem alertas prévios.",
  },
  {
    icon: FileWarning,
    title: "Previsibilidade Zero",
    desc: "Sem mecanismos para projetar receitas futuras, o planejamento financeiro se torna uma aposta.",
  },
  {
    icon: PhoneOff,
    title: "Cobranças no Escuro",
    desc: "A equipe liga para todo mundo sem saber quem tem real probabilidade de pagar, desperdiçando esforço.",
  },
  {
    icon: Car,
    title: "Perda Pós-Contemplação",
    desc: "Muitos clientes param de pagar logo após receber o bem, e o sistema atual não identifica esse padrão.",
  },
  {
    icon: PieChart,
    title: "Dados Fragmentados",
    desc: "Dashboards desconectados que mostram números, mas não geram insights ou ações concretas.",
  },
  {
    icon: LightbulbOff,
    title: "Ausência de Inteligência",
    desc: "Decisões baseadas em intuição e planilhas, sem o suporte de modelos preditivos modernos.",
  },
];

// Módulos da plataforma (sem jargão técnico)
const modules = [
  {
    icon: BarChart3,
    title: "Análise de Risco",
    description:
      "Entenda o perfil de cada cliente e identifique quem precisa de atenção.",
  },
  {
    icon: Target,
    title: "Priorização Inteligente",
    description: "Saiba por onde começar para obter os melhores resultados.",
  },
  {
    icon: Zap,
    title: "Estratégias de Cobrança",
    description:
      "Sugestões de abordagem por canal, horário e perfil de cliente.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard Gerencial",
    description:
      "Visão completa da sua carteira em um só lugar, com indicadores claros.",
  },
  {
    icon: MessageSquare,
    title: "Assistente por Voz e Texto",
    description: "Pergunte em português e receba respostas sobre sua carteira.",
  },
  {
    icon: Users,
    title: "Gestão de Equipes",
    description:
      "Controle de acesso por perfil: diretoria, financeiro e cobrança.",
  },
];

// Como funciona (fluxo simplificado)
const steps = [
  {
    step: "01",
    title: "Conecte seus dados",
    subtitle: "Integramos com suas planilhas, sistemas ou bancos de dados.",
  },
  {
    step: "02",
    title: "Analisamos automaticamente",
    subtitle: "Nossa inteligência identifica padrões e riscos em minutos.",
  },
  {
    step: "03",
    title: "Receba insights acionáveis",
    subtitle: "Relatórios claros e recomendações práticas para sua equipe.",
  },
  {
    step: "04",
    title: "Tome decisões com confiança",
    subtitle: "Aja com base em dados, não em suposições.",
  },
];

// Exemplos de perguntas para o assistente (estáticos)
const assistantExamples = [
  {
    question: "Quais clientes têm maior risco este mês?",
    answer:
      "Identificamos 120 contratos com alta probabilidade de inadimplência, concentrados na região Nordeste. Recomendamos contato preventivo via WhatsApp.",
  },
  {
    question: "Quanto posso recuperar nos próximos 30 dias?",
    answer:
      "A projeção é de R$ 2,1M. Os contratos com score acima de 75 representam 60% desse valor e devem ser priorizados.",
  },
];

export function LandingPage() {
  return (
    <div className="bg-[#0B1629]">
      {/* SEÇÃO 1: PROBLEMA */}
      <section id="problema" className="py-20 px-6 bg-[#0C1828]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" duration={0.8}>
            <div className="text-center mb-16">
              <span className="text-xs text-[#E24B4A] uppercase tracking-widest font-semibold mb-4 block">
                O Cenário Atual
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                Por que sua carteira está em risco?
              </h2>
              <p className="text-[#8A9AB5] text-lg max-w-3xl mx-auto">
                A maioria das administradoras opera no escuro, reagindo aos
                problemas em vez de preveni-los.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.1}>
                <div className="bg-[#111C30] rounded-xl p-6 border border-[#112035] hover:border-[#E24B4A]/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-[#0B1629] flex items-center justify-center mb-4 text-[#E24B4A]">
                    <problem.icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-[#8A9AB5] text-sm">{problem.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#112035] to-transparent" />

      {/* SEÇÃO 2: DIFERENCIAIS */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" duration={0.8}>
            <div className="text-center mb-16">
              <span className="text-xs text-[#378ADD] uppercase tracking-widest font-semibold mb-4 block">
                Por que a Previsia?
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                Inteligência que transforma sua gestão de inadimplência
              </h2>
              <p className="text-[#8A9AB5] text-lg max-w-2xl mx-auto">
                Resultados comprovados por administradoras que já usam nossa
                plataforma.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, i) => (
              <ScrollReveal
                key={i}
                direction={i % 2 === 0 ? "left" : "right"}
                delay={i * 0.15}
              >
                <div className="group bg-[#111C30] rounded-xl p-6 border border-[#112035] hover:border-[#378ADD]/50 transition-all duration-300">
                  <div
                    className={`w-10 h-10 rounded-lg bg-[#0B1629] flex items-center justify-center mb-4 ${item.color}`}
                  >
                    <item.icon size={20} />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#8A9AB5] text-sm">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#112035] to-transparent" />

      {/* SEÇÃO 3: COMO FUNCIONA */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" duration={0.8}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                Simples de usar, poderoso de verdade
              </h2>
              <p className="text-[#8A9AB5]">
                Em 4 passos, transforme dados em decisões estratégicas.
              </p>
            </div>
          </ScrollReveal>

          {/* Grid simples sem setas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.15}>
                <div className="bg-[#111C30] rounded-xl p-6 border border-[#112035] h-full">
                  <span className="text-xs font-bold text-[#378ADD] block mb-3">
                    {item.step}
                  </span>
                  <h3 className="text-base font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#8A9AB5]">{item.subtitle}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#112035] to-transparent" />

      {/* SEÇÃO 4: MÓDULOS DA PLATAFORMA */}
      <section id="modulos" className="py-20 px-6 bg-[#0C1828]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" duration={0.8}>
            <div className="text-center mb-16">
              <span className="text-xs text-[#378ADD] uppercase tracking-widest font-semibold mb-4 block">
                Tudo em um só lugar
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                Módulos que se complementam
              </h2>
              <p className="text-[#8A9AB5] text-lg max-w-2xl mx-auto">
                Cada funcionalidade foi pensada para resolver um desafio
                específico da sua operação.
              </p>
            </div>
          </ScrollReveal>

          {/* Grid com items-stretch para igualar alturas */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {modules.map((mod, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.1}>
                {/* Card com h-full e flex flex-col para distribuir conteúdo */}
                <div className="bg-[#111C30] rounded-xl p-6 border border-[#112035] hover:border-[#378ADD]/30 transition-colors h-full flex flex-col">
                  <div className="w-10 h-10 rounded-lg bg-[#0B1629] flex items-center justify-center mb-4 text-[#378ADD]">
                    <mod.icon size={20} />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    {mod.title}
                  </h3>
                  {/* flex-1 empurra o texto para baixo mantendo alinhamento */}
                  <p className="text-[#8A9AB5] text-sm flex-1">
                    {mod.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#112035] to-transparent" />

      {/* SEÇÃO 5: ASSISTENTE */}
      <section id="assistente" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left" duration={0.8}>
              <div>
                <span className="text-xs text-[#A78BFA] uppercase tracking-widest font-semibold mb-4 block">
                  Inteligência Conversacional
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                  Converse com seus dados como se fosse uma pessoa
                </h2>
                <p className="text-[#8A9AB5] text-lg mb-8">
                  Sem dashboards complexos. Sem SQL. Apenas faça perguntas em
                  português e receba respostas claras sobre sua carteira.
                </p>
                <ul className="space-y-3">
                  {[
                    "Pergunte sobre regiões, períodos ou perfis de cliente",
                    "Receba recomendações práticas em linguagem natural",
                    "Gere relatórios executivos com um clique",
                  ].map((item, i) => (
                    <ScrollReveal key={i} direction="left" delay={i * 0.1}>
                      <li className="flex items-start gap-3 text-sm text-[#B5C3D9]">
                        <CheckCircle2 className="w-4 h-4 text-[#1D9E75] mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    </ScrollReveal>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" duration={0.8} delay={0.2}>
              <div className="bg-[#111C30] rounded-2xl border border-[#112035] overflow-hidden">
                <div className="px-6 py-4 border-b border-[#112035] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#378ADD] to-[#185FA5] flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-white">
                      Assistente Previsia
                    </span>
                    <p className="text-xs text-[#1D9E75]">● Online</p>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {assistantExamples.map((example, i) => (
                    <div key={i} className="space-y-4">
                      <div className="flex justify-end">
                        <div className="bg-[#378ADD] rounded-2xl rounded-br-md px-4 py-3 max-w-[90%]">
                          <p className="text-sm text-white">
                            {example.question}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#378ADD] to-[#185FA5] flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-white">
                            P
                          </span>
                        </div>
                        <div className="bg-[#0B1629] rounded-2xl rounded-bl-md px-4 py-3 max-w-[90%] border border-[#112035]">
                          <p className="text-sm text-[#B5C3D9]">
                            {example.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-6 py-4 border-t border-[#112035] bg-[#0B1629]">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Pergunte algo sobre sua carteira..."
                      className="flex-1 bg-transparent text-sm text-[#B5C3D9] placeholder-[#5C6A80] outline-none"
                      disabled
                    />
                    <button className="p-2 text-[#378ADD]" disabled>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#112035] to-transparent" />

      {/* SEÇÃO 6: SEGURANÇA */}
      <section className="py-20 px-6 bg-[#0C1828]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal direction="up" duration={0.8}>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-12">
              Segurança e conformidade em primeiro lugar
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Shield,
                title: "Dados criptografados",
                desc: "Em trânsito e em repouso",
              },
              {
                icon: CheckCircle2,
                title: "LGPD compliant",
                desc: "Anonimização de dados pessoais",
              },
              {
                icon: Users,
                title: "Acesso por perfil",
                desc: "Cada usuário vê apenas o que precisa",
              },
              {
                icon: Zap,
                title: "Disponibilidade 99,5%",
                desc: "Infraestrutura monitorada 24/7",
              },
            ].map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.1}>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-[#111C30] border border-[#112035]">
                  <div className="w-10 h-10 rounded-lg bg-[#0B1629] flex items-center justify-center text-[#1D9E75]">
                    <item.icon size={20} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#8A9AB5]">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#112035] to-transparent" />

      {/* SEÇÃO 7: CTA FINAL */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] bg-[#185FA5]/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal direction="up" duration={0.8}>
            <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6 leading-tight">
              Pronto para transformar <br />
              <span className="text-[#378ADD]">dados em previsibilidade?</span>
            </h2>
            <p className="text-[#8A9AB5] text-lg mb-10 max-w-2xl mx-auto">
              Junte-se a administradoras que já reduzem inadimplência com
              inteligência preditiva.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login">
                <Button className="bg-[#378ADD] hover:bg-[#2E75C9] text-white font-medium h-12 px-8 rounded-lg transition-all duration-200 shadow-lg shadow-[#378ADD]/20">
                  Solicitar demonstração
                </Button>
              </Link>
              <a
                href="#modulos"
                className="text-[#B5C3D9] hover:text-white font-medium h-12 px-8 rounded-lg border border-white/15 hover:bg-white/5 transition-all duration-200 flex items-center gap-2"
              >
                Ver funcionalidades
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="mt-12 flex items-center justify-center gap-6 text-xs text-[#5C6A80]">
              <span>● Implementação rápida</span>
              <span>● Suporte dedicado</span>
              <span>● Sem fidelidade</span>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
