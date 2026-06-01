// app/(dashboard)/dashboard/agencies/page.tsx
"use client";

import useSWR from "swr";
import { api, type Agency } from "@/lib/api";
import { DashboardHeader } from "@/components/layout/dashboard/header";
import { DashboardSidebar } from "@/components/layout/dashboard/sidebar";
import { AgencyRanking } from "@/components/layout/dashboard/agency-ranking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, TrendingUp, Users, Award, RefreshCw } from "lucide-react";

const fetcher = () => api.getAgencies();

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export default function AgenciesPage() {
  const {
    data: agencies,
    error,
    isLoading,
    mutate,
  } = useSWR<Agency[]>("agencies", fetcher, { refreshInterval: 60000 });

  // Calcula stats a partir dos dados reais
  const totalContratos =
    agencies?.reduce((sum, a) => sum + a.total_contratos, 0) || 0;
  const totalRecuperado =
    agencies?.reduce((sum, a) => sum + a.valor_recuperado, 0) || 0;
  const mediaRecuperacao =
    agencies && agencies.length > 0
      ? agencies.reduce((sum, a) => sum + a.taxa_recuperacao, 0) /
        agencies.length
      : 0;

  const getPerformanceColor = (rate: number) => {
    if (rate >= 0.75) return "bg-[#1D9E75] text-white";
    if (rate >= 0.65) return "bg-[#378ADD] text-white";
    if (rate >= 0.55) return "bg-[#BA7517] text-white";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">
                  Assessorias
                </h1>
                <p className="text-muted-foreground mt-1">
                  Acompanhe o desempenho de cada assessoria parceira
                </p>
              </div>
              <button
                onClick={() => mutate()}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                disabled={isLoading}
              >
                <RefreshCw
                  className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
                />
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-8 h-8 text-primary" />
                    <div>
                      {isLoading ? (
                        <Skeleton className="h-7 w-8" />
                      ) : (
                        <p className="text-2xl font-bold">
                          {agencies?.length || 0}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Assessorias
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-[#1D9E75]" />
                    <div>
                      {isLoading ? (
                        <Skeleton className="h-7 w-16" />
                      ) : (
                        <p className="text-2xl font-bold">
                          {totalContratos.toLocaleString("pt-BR")}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">Contratos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-[#BA7517]" />
                    <div>
                      {isLoading ? (
                        <Skeleton className="h-7 w-14" />
                      ) : (
                        <p className="text-2xl font-bold">
                          {(mediaRecuperacao * 100).toFixed(1)}%
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Média Recuperação
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-[#A78BFA]" />
                    <div>
                      {isLoading ? (
                        <Skeleton className="h-7 w-20" />
                      ) : (
                        <p className="text-2xl font-bold">
                          {formatCurrency(totalRecuperado)}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Total Recuperado
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Agency List */}
            <div className="grid gap-6">
              {error ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-destructive">Erro ao carregar dados</p>
                    <button
                      onClick={() => mutate()}
                      className="text-primary text-sm mt-2 hover:underline"
                    >
                      Tentar novamente
                    </button>
                  </CardContent>
                </Card>
              ) : isLoading ? (
                [...Array(4)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <Skeleton className="h-24 w-full" />
                    </CardContent>
                  </Card>
                ))
              ) : (
                agencies?.map((agency, index) => (
                  <Card key={agency.nome_assessoria}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {agency.nome_assessoria}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {agency.total_contratos} contratos
                            </p>
                          </div>
                        </div>
                        <Badge
                          className={getPerformanceColor(
                            agency.taxa_recuperacao,
                          )}
                        >
                          {(agency.taxa_recuperacao * 100).toFixed(1)}%
                          recuperação
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Taxa de Recuperação
                          </p>
                          <p className="text-2xl font-bold text-[#1D9E75]">
                            {(agency.taxa_recuperacao * 100).toFixed(1)}%
                          </p>
                          <Progress
                            value={agency.taxa_recuperacao * 100}
                            className="h-2 mt-2"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Valor Recuperado
                          </p>
                          <p className="text-2xl font-bold text-foreground">
                            {formatCurrency(agency.valor_recuperado)}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Média:{" "}
                            {formatCurrency(
                              agency.valor_recuperado / agency.total_contratos,
                            )}{" "}
                            por contrato
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Performance
                          </p>
                          <p className="text-2xl font-bold text-foreground">
                            #{index + 1} no ranking
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Entre {agencies?.length || 0} assessorias
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Ranking Component */}
            <AgencyRanking />
          </div>
        </main>
      </div>
    </div>
  );
}
