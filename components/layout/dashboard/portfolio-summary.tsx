"use client";

import { useState } from "react";
import {
  usePortfolio,
  fetchPortfolioSummary,
  fmtBRL,
  fmtPct,
  fmtNum,
} from "@/hooks/use-previsia";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";

export function PortfolioSummary() {
  const { data: portfolio, isLoading: portfolioLoading } = usePortfolio();
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPortfolioSummary();

      // Se vier string pura, usa direto. Se vier objeto, pega o summary_pt
      const summaryText = typeof data === "string" ? data : data?.summary_pt;

      if (!summaryText || summaryText.trim() === "") {
        // Fallback: gera um resumo básico baseado nos dados
        const fallbackSummary = gerarResumoFallback();
        setAiSummary(fallbackSummary);
      } else {
        setAiSummary(summaryText);
      }
    } catch (err: any) {
      console.error("Erro ao gerar resumo IA:", err);
      setError(err.message || "API de IA indisponível");

      // Em desenvolvimento, mostra um exemplo
      if (process.env.NODE_ENV === "development") {
        const mockSummary = `📊 **Análise da Carteira**\n\n• Total de ${fmtNum(portfolio?.total_contratos)} contratos analisados\n• Taxa de acordo de ${fmtPct(portfolio?.taxa_acordo)} - ${getPerformanceLabel(portfolio?.taxa_acordo || 0)}\n• Valor inadimplente de ${fmtBRL(portfolio?.total_inadimplente_brl)}\n• Score médio de risco: ${portfolio?.score_risco_medio?.toFixed(1) || "N/A"}/100\n\n💡 **Recomendações:**\n• Focar nos contratos com score médio-alto\n• Revisar estratégias para contratos em aberto há mais de 90 dias\n• Considerar propostas diferenciadas por faixa de valor`;
        setAiSummary(mockSummary);
      }
    } finally {
      setLoading(false);
    }
  };

  // Gera resumo básico quando a IA falha
  const gerarResumoFallback = (): string => {
    if (!portfolio) return "Sem dados disponíveis";

    const performance = getPerformanceLabel(portfolio.taxa_acordo || 0);
    const riscoLevel = getRiscoLevel(portfolio.score_risco_medio || 0);

    return `📊 **Resumo da Carteira**\n\n• ${fmtNum(portfolio.total_contratos)} contratos na carteira\n• ${fmtPct(portfolio.taxa_acordo)} de taxa de acordo (${performance})\n• ${fmtBRL(portfolio.total_inadimplente_brl)} em valor inadimplente\n• Score médio de risco: ${portfolio.score_risco_medio?.toFixed(1) || "N/A"}/100 (${riscoLevel})\n\n💡 **Ações Recomendadas:**\n• Priorizar contratos com menor score de risco\n• Intensificar cobrança nos contratos em aberto\n• Avaliar renegociação para valores elevados`;
  };

  const getPerformanceLabel = (taxa: number): string => {
    if (taxa >= 0.4) return "✅ Excelente";
    if (taxa >= 0.25) return "👍 Boa";
    if (taxa >= 0.15) return "⚠️ Regular";
    return "❌ Baixa";
  };

  const getRiscoLevel = (score: number): string => {
    if (score <= 30) return "Baixo Risco";
    if (score <= 60) return "Médio Risco";
    return "Alto Risco";
  };

  // Se não tem dados do portfolio ainda
  if (portfolioLoading) {
    return (
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-violet-400" />
              Resumo Executivo
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }

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
            {aiSummary ? "Atualizar" : "Gerar IA"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* KPIs Reais do Portfolio */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-muted/50 border border-border/50">
            <p className="text-2xl font-bold text-foreground tabular-nums">
              {fmtNum(portfolio?.total_contratos)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Contratos</p>
          </div>

          <div className="text-center p-4 rounded-lg bg-muted/50 border border-border/50">
            <p
              className={`text-2xl font-bold tabular-nums ${getPerformanceColor(portfolio?.taxa_acordo || 0)}`}
            >
              {fmtPct(portfolio?.taxa_acordo)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Taxa Acordo</p>
          </div>

          <div className="text-center p-4 rounded-lg bg-muted/50 border border-border/50">
            <p className="text-2xl font-bold text-primary tabular-nums">
              {fmtBRL(portfolio?.total_inadimplente_brl)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Inadimplente</p>
          </div>
        </div>

        {/* Erro */}
        {error && (
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-500 mb-1">
                  API de IA indisponível
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  {error}. Mostrando análise automática baseada nos dados.
                </p>
                <Button
                  onClick={generate}
                  size="sm"
                  variant="outline"
                  className="text-xs"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Tentar Novamente
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="p-6 bg-violet-500/5 border border-violet-500/20 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-medium text-violet-400">
                  Gerando análise com IA...
                </p>
                <p className="text-xs text-muted-foreground">
                  Processando dados da carteira
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          </div>
        )}

        {/* Resumo da IA (ou fallback) */}
        {aiSummary && !loading && (
          <div
            className={`p-5 rounded-lg border ${error ? "bg-amber-500/5 border-amber-500/20" : "bg-violet-500/10 border-violet-500/20"}`}
          >
            <div className="flex items-center gap-2 mb-3">
              {error ? (
                <>
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <p className="text-sm font-semibold text-amber-500">
                    Análise Automática
                  </p>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <p className="text-sm font-semibold text-emerald-500">
                    Análise IA Concluída
                  </p>
                </>
              )}
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap font-mono text-xs">
              {aiSummary}
            </div>
          </div>
        )}

        {/* Estado inicial */}
        {!aiSummary && !loading && !error && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-violet-400" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Análise Inteligente da Carteira
            </h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
              Nossa IA vai analisar {fmtNum(portfolio?.total_contratos)}{" "}
              contratos e gerar insights personalizados
            </p>
            <Button onClick={generate} size="sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Gerar Análise com IA
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function getPerformanceColor(taxa: number): string {
  if (taxa >= 0.4) return "text-emerald-500";
  if (taxa >= 0.25) return "text-emerald-400";
  if (taxa >= 0.15) return "text-amber-500";
  return "text-destructive";
}
