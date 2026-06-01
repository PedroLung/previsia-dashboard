// app/(dashboard)/dashboard/risk/page.tsx
"use client";

import {
  usePortfolio,
  useAgencies,
  fmtBRL,
  fmtPct,
  fmtNum,
} from "@/hooks/use-previsia";
import { DashboardHeader } from "@/components/layout/dashboard/header";
import { DashboardSidebar } from "@/components/layout/dashboard/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, TrendingUp, Shield, BarChart3 } from "lucide-react";

export default function RiskAnalysisPage() {
  const {
    data: kpis,
    error: kpisError,
    isLoading: kpisLoading,
  } = usePortfolio();
  const {
    data: agencies,
    error: agError,
    isLoading: agLoading,
  } = useAgencies();

  const error = kpisError || agError;

  const riskBreakdown = kpis
    ? [
        {
          label: "Em Aberto",
          value: kpis.taxa_em_aberto,
          color: "bg-amber-500",
          textColor: "text-amber-500",
        },
        {
          label: "Acordo",
          value: kpis.taxa_acordo,
          color: "bg-emerald-500",
          textColor: "text-emerald-500",
        },
        {
          label: "Insucesso",
          value: kpis.taxa_insucesso,
          color: "bg-destructive",
          textColor: "text-destructive",
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Análise de Risco
              </h1>
              <p className="text-muted-foreground mt-1">
                Visão consolidada da carteira por status e assessoria
              </p>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm">
                  Erro: {error.message}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-primary text-sm mt-2 hover:underline"
                >
                  Recarregar
                </button>
              </div>
            )}

            {/* KPIs */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  label: "Total de Contratos",
                  value: fmtNum(kpis?.total_contratos),
                  icon: Shield,
                  color: "text-primary",
                  bg: "bg-primary/10",
                },
                {
                  label: "Total Inadimplente",
                  value: fmtBRL(kpis?.total_inadimplente_brl),
                  icon: AlertTriangle,
                  color: "text-amber-500",
                  bg: "bg-amber-500/10",
                },
                {
                  label: "Taxa de Acordo",
                  value: fmtPct(kpis?.taxa_acordo),
                  icon: TrendingUp,
                  color: "text-emerald-500",
                  bg: "bg-emerald-500/10",
                },
                {
                  label: "Score Médio de Risco",
                  value: kpis?.score_risco_medio?.toFixed(1) ?? "—",
                  icon: BarChart3,
                  color: "text-primary",
                  bg: "bg-primary/10",
                },
              ].map((item) => (
                <Card key={item.label}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {item.label}
                        </p>
                        {kpisLoading ? (
                          <Skeleton className="h-7 w-24 mt-1" />
                        ) : (
                          <p className="text-2xl font-bold text-foreground mt-1 tabular-nums">
                            {item.value}
                          </p>
                        )}
                      </div>
                      <div
                        className={`w-12 h-12 rounded-lg ${item.bg} flex items-center justify-center`}
                      >
                        <item.icon className={`w-6 h-6 ${item.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Distribuição por status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Distribuição por Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {kpisLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-8 w-full" />
                    ))}
                  </div>
                ) : (
                  riskBreakdown.map((item) => (
                    <div key={item.label} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.label}
                        </span>
                        <span
                          className={`font-semibold tabular-nums ${item.textColor}`}
                        >
                          {fmtPct(item.value)}
                        </span>
                      </div>
                      <Progress
                        value={(item.value ?? 0) * 100}
                        className="h-2"
                      />
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Desempenho por assessoria */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Desempenho por Assessoria
                </CardTitle>
              </CardHeader>
              <CardContent>
                {agLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                ) : !agencies?.length ? (
                  <p className="text-sm text-muted-foreground">Sem dados</p>
                ) : (
                  <div className="space-y-3">
                    {[...agencies]
                      .sort((a, b) => b.taxa_sucesso - a.taxa_sucesso)
                      .map((agency) => (
                        <div
                          key={agency.nome_assessoria}
                          className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium truncate">
                                {agency.nome_assessoria}
                              </span>
                              <span className="text-sm font-semibold text-emerald-500 tabular-nums ml-2">
                                {fmtPct(agency.taxa_sucesso)}
                              </span>
                            </div>
                            <Progress
                              value={(agency.taxa_sucesso ?? 0) * 100}
                              className="h-1.5"
                            />
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xs text-muted-foreground">
                              score {agency.score_medio?.toFixed(1) ?? "—"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {(agency.casos ?? 0).toLocaleString("pt-BR")}{" "}
                              casos
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
