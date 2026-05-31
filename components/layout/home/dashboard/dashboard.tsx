"use client";

import { KPICards } from "../kpi-cards/kpi-cards";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function DashboardSection() {
  return (
    <section className="py-16 px-6 bg-[#0B1629]">
      <div className="max-w-7xl mx-auto">
        {/* KPI Cards com animação */}
        <ScrollReveal direction="up" duration={0.8}>
          <KPICards />
        </ScrollReveal>

        {/* Gráficos e Visualizações */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Gráfico 1: Recuperação por Região */}
          <ScrollReveal direction="left" duration={0.7}>
            <div className="bg-[#0A1525] rounded-xl p-6 border border-[#112035]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-medium text-[#7BA8D4]">
                    Recuperação por Região
                  </h3>
                  <p className="text-xs text-[#4A6A80] mt-1">
                    Taxa de recuperação por região geográfica
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#185FA5]" />
                  <span className="text-xs text-[#4A6A80]">Previsto</span>
                  <div className="w-3 h-3 rounded-full bg-[#378ADD] ml-2" />
                  <span className="text-xs text-[#4A6A80] ml-1">Realizado</span>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { region: "Sudeste", previsto: 85, realizado: 78 },
                  { region: "Nordeste", previsto: 70, realizado: 65 },
                  { region: "Sul", previsto: 80, realizado: 82 },
                  { region: "Centro-Oeste", previsto: 75, realizado: 68 },
                  { region: "Norte", previsto: 65, realizado: 58 },
                ].map((item, index) => (
                  <ScrollReveal
                    key={item.region}
                    direction="right"
                    delay={index * 0.08}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#B5C3D9] font-medium">
                          {item.region}
                        </span>
                        <span className="text-[#4A6A80]">
                          {item.realizado}%
                        </span>
                      </div>
                      <div className="relative h-2 bg-[#0C1828] rounded-full overflow-hidden">
                        <div
                          className="absolute top-0 left-0 h-full bg-[#185FA5]/30 rounded-full"
                          style={{ width: `${item.previsto}%` }}
                        />
                        <div
                          className="absolute top-0 left-0 h-full bg-[#378ADD] rounded-full"
                          style={{ width: `${item.realizado}%` }}
                        />
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Gráfico 2: Evolução da Inadimplência */}
          <ScrollReveal direction="right" duration={0.7}>
            <div className="bg-[#0A1525] rounded-xl p-6 border border-[#112035]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-medium text-[#7BA8D4]">
                    Evolução da Inadimplência
                  </h3>
                  <p className="text-xs text-[#4A6A80] mt-1">Últimos 6 meses</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#E24B4A]" />
                  <span className="text-xs text-[#4A6A80]">Inadimplência</span>
                </div>
              </div>

              <svg viewBox="0 0 400 150" className="w-full h-32">
                {/* Grid lines */}
                <line
                  x1="0"
                  y1="120"
                  x2="400"
                  y2="120"
                  stroke="#112035"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1="90"
                  x2="400"
                  y2="90"
                  stroke="#112035"
                  strokeWidth="1"
                  opacity="0.5"
                />
                <line
                  x1="0"
                  y1="60"
                  x2="400"
                  y2="60"
                  stroke="#112035"
                  strokeWidth="1"
                  opacity="0.5"
                />
                <line
                  x1="0"
                  y1="30"
                  x2="400"
                  y2="30"
                  stroke="#112035"
                  strokeWidth="1"
                  opacity="0.5"
                />

                {/* Area under the line */}
                <path
                  d="M 0,100 Q 80,80 160,90 T 320,60 T 400,40 L 400,120 L 0,120 Z"
                  fill="#E24B4A"
                  opacity="0.1"
                />

                {/* Line chart */}
                <path
                  d="M 0,100 Q 80,80 160,90 T 320,60 T 400,40"
                  fill="none"
                  stroke="#E24B4A"
                  strokeWidth="2"
                />

                {/* Data points */}
                <circle cx="0" cy="100" r="4" fill="#E24B4A" />
                <circle cx="80" cy="80" r="4" fill="#E24B4A" />
                <circle cx="160" cy="90" r="4" fill="#E24B4A" />
                <circle cx="240" cy="75" r="4" fill="#E24B4A" />
                <circle cx="320" cy="60" r="4" fill="#E24B4A" />
                <circle cx="400" cy="40" r="4" fill="#E24B4A" />
              </svg>

              <div className="flex justify-between mt-2 text-[10px] text-[#4A6A80]">
                <span>Jan</span>
                <span>Fev</span>
                <span>Mar</span>
                <span>Abr</span>
                <span>Mai</span>
                <span>Jun</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Gráfico 3: Distribuição por Status */}
          <ScrollReveal direction="left" duration={0.7}>
            <div className="bg-[#0A1525] rounded-xl p-6 border border-[#112035]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-medium text-[#7BA8D4]">
                    Distribuição por Status
                  </h3>
                  <p className="text-xs text-[#4A6A80] mt-1">
                    Situação atual dos contratos
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center mb-6">
                <svg viewBox="0 0 120 120" className="w-32 h-32">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#0C1828"
                    strokeWidth="20"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#1D9E75"
                    strokeWidth="20"
                    strokeDasharray="157 314"
                    transform="rotate(-90 60 60)"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#BA7517"
                    strokeWidth="20"
                    strokeDasharray="94 314"
                    transform="rotate(-36 60 60)"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#E24B4A"
                    strokeWidth="20"
                    strokeDasharray="63 314"
                    transform="rotate(72 60 60)"
                  />
                  <circle cx="60" cy="60" r="30" fill="#0A1525" />
                </svg>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Adimplentes", value: "50%", color: "#1D9E75" },
                  { label: "Em Atraso", value: "30%", color: "#BA7517" },
                  { label: "Crítico", value: "20%", color: "#E24B4A" },
                ].map((stat, index) => (
                  <ScrollReveal
                    key={stat.label}
                    direction="up"
                    delay={index * 0.1}
                  >
                    <div className="text-center">
                      <div
                        className="w-3 h-3 rounded-full mx-auto mb-1"
                        style={{ backgroundColor: stat.color }}
                      />
                      <p className="text-xs text-[#4A6A80]">{stat.label}</p>
                      <p className="text-sm font-semibold text-white">
                        {stat.value}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Gráfico 4: Top Assessorias */}
          <ScrollReveal direction="right" duration={0.7}>
            <div className="bg-[#0A1525] rounded-xl p-6 border border-[#112035]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-medium text-[#7BA8D4]">
                    Top Assessorias
                  </h3>
                  <p className="text-xs text-[#4A6A80] mt-1">
                    Melhores taxas de recuperação
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { name: "Vértice", recovery: 92, volume: "R$ 18,5M" },
                  { name: "Fênix", recovery: 87, volume: "R$ 15,2M" },
                  { name: "Aurora", recovery: 81, volume: "R$ 12,8M" },
                  { name: "Atlas", recovery: 76, volume: "R$ 10,1M" },
                ].map((item, index) => (
                  <ScrollReveal
                    key={item.name}
                    direction="up"
                    delay={index * 0.1}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#112035] flex items-center justify-center text-[10px] font-medium text-[#7BA8D4]">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-[#B5C3D9] font-medium">
                            {item.name}
                          </span>
                          <span className="text-xs text-[#4A6A80]">
                            {item.volume}
                          </span>
                        </div>
                        <div className="relative h-1.5 bg-[#0C1828] rounded-full overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#378ADD] to-[#185FA5] rounded-full"
                            style={{ width: `${item.recovery}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#1D9E75] w-10 text-right">
                        {item.recovery}%
                      </span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
