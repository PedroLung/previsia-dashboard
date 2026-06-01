// components/layout/dashboard/kpi-cards.tsx
"use client";

import { usePortfolio, fmtBRL, fmtPct, fmtNum } from "@/hooks/use-previsia";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Wallet,
  CheckCircle2,
  XCircle,
  Clock,
  BarChart3,
  FileText,
} from "lucide-react";

const kpiConfig = [
  {
    key: "total_inadimplente_brl" as const,
    title: "Total Inadimplente",
    icon: Wallet,
    color: "text-destructive",
    bg: "bg-destructive/10",
    fmt: (v: number) => fmtBRL(v),
  },
  {
    key: "total_contratos" as const,
    title: "Total Contratos",
    icon: FileText,
    color: "text-muted-foreground",
    bg: "bg-muted",
    fmt: (v: number) => fmtNum(v),
  },
  {
    key: "score_risco_medio" as const,
    title: "Score Médio de Risco",
    icon: BarChart3,
    color: "text-primary",
    bg: "bg-primary/10",
    fmt: (v: number) => v.toFixed(1),
  },
  {
    key: "taxa_acordo" as const,
    title: "Taxa de Acordo",
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    fmt: (v: number) => fmtPct(v),
  },
  {
    key: "taxa_em_aberto" as const,
    title: "Em Aberto",
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    fmt: (v: number) => fmtPct(v),
  },
  {
    key: "taxa_insucesso" as const,
    title: "Taxa de Insucesso",
    icon: XCircle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    fmt: (v: number) => fmtPct(v),
  },
];

export function KPICards() {
  const { data, error, isLoading } = usePortfolio();

  if (error) {
    return (
      <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
        <p className="text-sm text-destructive">
          Erro ao carregar KPIs: {error.message}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-primary text-sm mt-2 hover:underline"
        >
          Recarregar
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpiConfig.map((kpi) => (
        <Card key={kpi.key} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1 min-w-0">
                <p className="text-xs text-muted-foreground truncate">
                  {kpi.title}
                </p>
                {isLoading ? (
                  <Skeleton className="h-7 w-20" />
                ) : (
                  <p className="text-xl font-semibold text-foreground tabular-nums">
                    {kpi.fmt(data?.[kpi.key] ?? 0)}
                  </p>
                )}
              </div>
              <div
                className={`w-9 h-9 rounded-lg ${kpi.bg} flex items-center justify-center shrink-0`}
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
