"use client";

import { useState } from "react";
import { api, type PortfolioSummary as PortfolioSummaryType } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, RefreshCw } from "lucide-react";

export function PortfolioSummary() {
  const [summary, setSummary] = useState<PortfolioSummaryType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getPortfolioSummary();
      setSummary(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao gerar resumo");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#A78BFA]" />
            Resumo Executivo
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchSummary}
            disabled={isLoading}
            className="text-xs"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-1" />
                Gerar
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ) : summary ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {summary.summary_pt}
            </p>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground">
                  {summary.kpis.total_contratos.toLocaleString("pt-BR")}
                </p>
                <p className="text-xs text-muted-foreground">Contratos</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-[#1D9E75]">
                  {(summary.kpis.taxa_recuperacao * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground">Recuperação</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-primary">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    notation: "compact",
                  }).format(summary.kpis.valor_inadimplente)}
                </p>
                <p className="text-xs text-muted-foreground">Inadimplente</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <Sparkles className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-3">
              Clique em "Gerar" para criar um resumo executivo da sua carteira
              usando IA
            </p>
            <Button
              onClick={fetchSummary}
              size="sm"
              className="bg-primary hover:bg-primary/90"
            >
              Gerar Resumo
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
