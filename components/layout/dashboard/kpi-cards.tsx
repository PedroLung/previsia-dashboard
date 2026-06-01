"use client";

import useSWR from "swr";
import { api, type PortfolioKPIs } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Wallet,
  TrendingUp,
  FileText,
  CheckCircle2,
  XCircle,
  Scale,
  Target,
  BarChart3,
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

function formatNumber(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(value);
}

function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function KPICards() {
  const { data, error, isLoading } = useSWR<PortfolioKPIs>(
    "portfolio",
    fetcher,
    {
      refreshInterval: 60000,
    },
  );

  if (error) {
    return (
      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
        <p className="text-sm text-destructive">
          Erro ao carregar dados: {error.message}
        </p>
      </div>
    );
  }

  const kpis = [
    {
      title: "Valor Inadimplente",
      value: data ? formatCurrency(data.valor_total_inadimplente) : "-",
      icon: Wallet,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      title: "Valor Recuperado",
      value: data ? formatCurrency(data.valor_total_recuperado) : "-",
      icon: TrendingUp,
      color: "text-[#1D9E75]",
      bgColor: "bg-[#1D9E75]/10",
    },
    {
      title: "Taxa de Recuperação",
      value: data ? formatPercent(data.taxa_recuperacao) : "-",
      icon: Target,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Total de Contratos",
      value: data ? formatNumber(data.total_contratos) : "-",
      icon: FileText,
      color: "text-muted-foreground",
      bgColor: "bg-muted",
    },
    {
      title: "Em Aberto",
      value: data ? formatNumber(data.contratos_em_aberto) : "-",
      icon: BarChart3,
      color: "text-[#BA7517]",
      bgColor: "bg-[#BA7517]/10",
    },
    {
      title: "Acordos Firmados",
      value: data ? formatNumber(data.contratos_acordo) : "-",
      icon: CheckCircle2,
      color: "text-[#1D9E75]",
      bgColor: "bg-[#1D9E75]/10",
    },
    {
      title: "Insucesso",
      value: data ? formatNumber(data.contratos_insucesso) : "-",
      icon: XCircle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      title: "Ajuizados",
      value: data ? formatNumber(data.contratos_ajuizados) : "-",
      icon: Scale,
      color: "text-[#A78BFA]",
      bgColor: "bg-[#A78BFA]/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {kpis.map((kpi, i) => (
        <Card key={i} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">{kpi.title}</p>
                {isLoading ? (
                  <Skeleton className="h-7 w-20" />
                ) : (
                  <p className="text-xl font-semibold text-foreground">
                    {kpi.value}
                  </p>
                )}
              </div>
              <div
                className={`w-9 h-9 rounded-lg ${kpi.bgColor} flex items-center justify-center`}
              >
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
