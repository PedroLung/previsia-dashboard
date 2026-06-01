// app/(dashboard)/dashboard/risk/page.tsx
"use client";

import useSWR from "swr";
import { api, type PortfolioKPIs } from "@/lib/api";
import { DashboardHeader } from "@/components/layout/dashboard/header";
import { DashboardSidebar } from "@/components/layout/dashboard/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertTriangle,
  TrendingUp,
  Shield,
  Search,
  Filter,
  Download,
  ArrowUpRight,
  Info,
} from "lucide-react";

const fetcher = () => api.getPortfolio();

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export default function RiskAnalysisPage() {
  const {
    data: kpis,
    error,
    isLoading,
  } = useSWR<PortfolioKPIs>("portfolio", fetcher, { refreshInterval: 60000 });

  // Stats derivados dos KPIs reais
  const stats = {
    total_contratos: kpis?.total_contratos || 0,
    valor_total_inadimplente: kpis?.valor_total_inadimplente || 0,
    taxa_recuperacao: kpis?.taxa_recuperacao || 0,
    valor_recuperavel:
      (kpis?.valor_total_inadimplente || 0) * (kpis?.taxa_recuperacao || 0),
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
                  Análise de Risco
                </h1>
                <p className="text-muted-foreground mt-1">
                  Priorize cobranças com base em IA preditiva
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrar
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>

            {/* Stats Cards - COM DADOS REAIS */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total de Contratos
                      </p>
                      {isLoading ? (
                        <Skeleton className="h-7 w-20 mt-1" />
                      ) : (
                        <p className="text-2xl font-bold text-foreground mt-1">
                          {stats.total_contratos.toLocaleString("pt-BR")}
                        </p>
                      )}
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Valor Inadimplente
                      </p>
                      {isLoading ? (
                        <Skeleton className="h-7 w-24 mt-1" />
                      ) : (
                        <p className="text-2xl font-bold text-foreground mt-1">
                          {formatCurrency(stats.valor_total_inadimplente)}
                        </p>
                      )}
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-[#BA7517]/10 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-[#BA7517]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Taxa de Recuperação
                      </p>
                      {isLoading ? (
                        <Skeleton className="h-7 w-16 mt-1" />
                      ) : (
                        <p className="text-2xl font-bold text-[#1D9E75] mt-1">
                          {(stats.taxa_recuperacao * 100).toFixed(1)}%
                        </p>
                      )}
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-[#1D9E75]/10 flex items-center justify-center">
                      <ArrowUpRight className="w-6 h-6 text-[#1D9E75]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Valor Recuperável
                      </p>
                      {isLoading ? (
                        <Skeleton className="h-7 w-20 mt-1" />
                      ) : (
                        <p className="text-2xl font-bold text-primary mt-1">
                          {formatCurrency(stats.valor_recuperavel)}
                        </p>
                      )}
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por contrato, cliente..."
                      className="pl-10"
                      disabled
                    />
                  </div>
                  <Button variant="outline" disabled>
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Risk List - FEATURE FUTURA */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#378ADD]" />
                  Contratos por Nível de Risco
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    Funcionalidade em desenvolvimento
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
                    A listagem detalhada de contratos por risco será
                    disponibilizada em breve. Por enquanto, utilize os KPIs
                    acima para análise macro.
                  </p>
                  <Button variant="outline" size="sm">
                    Ver documentação da API
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
