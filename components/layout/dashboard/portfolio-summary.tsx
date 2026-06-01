// components/layout/dashboard/portfolio-summary.tsx
"use client";

import { useState } from "react";
import {
  fetchPortfolioSummary,
  fmtBRL,
  fmtPct,
  fmtNum,
} from "@/hooks/use-previsia";
import type { PortfolioSummaryResponse } from "@/hooks/use-previsia";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, RefreshCw } from "lucide-react";

export function PortfolioSummary() {
  const [summary, setSummary] = useState<PortfolioSummaryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPortfolioSummary();
      setSummary(data);
    } catch (err: any) {
      setError(err.message || "Erro ao gerar resumo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-400" />
            Resumo Executivo
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={generate}
            disabled={loading}
            className="text-xs gap-1"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            {summary ? "Atualizar" : "Gerar"}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {error && <p className="text-sm text-destructive">{error}</p>}

        {loading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        )}

        {!loading && summary && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {summary.summary_pt}
            </p>

            {summary.kpis && (
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground tabular-nums">
                    {fmtNum(summary.kpis.total_contratos)}
                  </p>
                  <p className="text-xs text-muted-foreground">Contratos</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-emerald-500 tabular-nums">
                    {fmtPct(summary.kpis.taxa_recuperacao)}
                  </p>
                  <p className="text-xs text-muted-foreground">Recuperação</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-primary tabular-nums">
                    {fmtBRL(summary.kpis.valor_inadimplente)}
                  </p>
                  <p className="text-xs text-muted-foreground">Inadimplente</p>
                </div>
              </div>
            )}
          </div>
        )}

        {!loading && !summary && !error && (
          <div className="text-center py-6">
            <Sparkles className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-3">
              Clique em "Gerar" para criar um resumo executivo com IA
            </p>
            <Button onClick={generate} size="sm">
              Gerar Resumo
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
